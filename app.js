require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require('node-fetch');
const flash = require('connect-flash');
const moment = require('moment');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

const { registration: UserModel, connectToDatabase } = require('./models/registration');
const { Posts } = require('./models/posts');
const Document = require('./models/document');
const About = require('./models/about');
const Officers = require('./models/officers');
const Delegates = require('./models/delegates');
const Faq = require('./models/faq');
const Education = require('./models/education');
const History = require('./models/history');
const Privacy = require('./models/privacy');
const Disclaimer = require('./models/disclaimer');
const Tools = require('./models/tools');
const Regulations = require('./models/regulations');
const Guidelines = require('./models/guidelines');
const Competition = require('./models/competition');

const saltRounds = 10;

const app = express();

connectToDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Increase the limit to, for example, 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Настройка сессий
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 86400000 }
}));

// Now use the flash middleware
app.use(flash());

// Middleware to attach flash messages to locals to make them available to the views
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.error_messages = req.flash('error'); // Переменная для хранения сообщений об ошибках
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files (if you have any, like CSS, JS, images, etc.)
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const latestPost = await Posts.findOne().sort({ createdAt: -1 });
        res.render('index', { user: req.user, posts: [], latestPost: latestPost });
    } catch (error) {
        console.error('Failed to fetch the latest post:', error);
        res.status(500).send('Error fetching the latest post');
    }
});

app.get('/index', async (req, res) => {
    try {
        const posts = await Posts.find({}).select('title _id').limit(10);
        const latestPost = await Posts.findOne().sort({ createdAt: -1 });
        console.log(posts);  // Вывод данных в консоль для проверки
        res.render('index', { user: req.user, posts: posts, latestPost: latestPost });
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

app.get('/users/sign_up', (req, res) => {
    res.render('users/sign_up', { user: req.user });
});

app.get('/users/sign_in', (req, res) => {
    // Это временно, чтобы проверить, что сообщения сохраняются в flash
    req.flash('error', 'Test error message');
    res.render('users/sign_in', { user: req.user });
});

app.post('/users/sign_in', (req, res, next) => {
    const { login, password } = req.body.user;
    if (!login || !password) {
        req.flash('error', 'Необходимо ввести логин и пароль.');
        return res.redirect('/users/sign_in');
    }
    next();
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/sign_in',
    failureFlash: true // Разрешить сообщения flash
}));


app.get('/users/live-sub/index', (req, res) => {
    res.render('users/live-sub/index', { user: req.user });
});

app.get('/contact', (req, res) => {
    res.render('contact', { user: req.user });
});

app.get('/profile/contact', (req, res) => {
    res.render('contact', { user: req.user });
});

app.get('/profile/documents', function (req, res) {
    res.render('documents', { user: req.user });
});

app.get('/create-post', (req, res) => {
    res.render('create-post', { user: req.user });
});

app.get('/live-sub/index', (req, res) => {
    res.render('live-sub/index', { user: req.user });
});

app.get('/users/live-sub/index', (req, res) => {
    res.render('live-sub/index', { user: req.user });
});

app.get('/profile/edit', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/users/sign_in');
    } else {
        try {
            const user = await UserModel.findById(req.user._id);
            console.log("Rendering profile/edit with user data:", user);
            console.log("Avatar URL:", user.avatarUrl);  // This should show the correct file name

            res.render('profile/edit', { user: user });
        } catch (error) {
            console.error('Error fetching user from database:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

app.on('error', function (err) {
    console.error('Server error: ', err);
});

app.use(function (err, req, res, next) {
    console.error(err.stack); // Log error stack for debugging
    res.status(500).send('Something broke!'); // Send a response to the client
});

/* ----------------------------- USER REGISTRATION ----------------------------- */

// Конфигурация транспорта для nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// проверка, занят ли email
app.post('/check-email', async (req, res) => {
    const email = req.body.email;
    try {
        const user = await UserModel.findOne({ email: email }).exec(); // Использование async/await
        if (user) {
            res.send({ isAvailable: false });
        } else {
            res.send({ isAvailable: true });
        }
    } catch (err) {
        console.error('Ошибка при поиске пользователя:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Send verification email function
async function sendVerificationEmail(userEmail, verificationLink) {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'Подтвердите ваш email',
        html: `<p>Пожалуйста, нажмите на следующую ссылку, чтобы подтвердить ваш email: <a href="${verificationLink}">${verificationLink}</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', userEmail);
    } catch (error) {
        console.error('Failed to send verification email:', error);
    }
}

app.post('/users', async (req, res) => {
    console.log('Received data:', req.body);

    const { email, password, name, dob, gender, country_iso2 } = req.body.user;

    if (req.body.section === 'delete') {
        try {
            // Delete the user
            await UserModel.findByIdAndDelete(req.user._id);
            console.log('User deleted successfully');

            // Redirect to index or any other page
            return res.redirect('/');
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send('An error occurred while deleting the user.');
        }
    }

    // For registration process
    try {
        // Check if the email is already used
        const userExists = await UserModel.findOne({ email: email }).exec();
        if (userExists) {
            return res.status(409).send({ error: 'Email already in use.' });
        }

        // Hash the password before storing it in the database
        const saltRounds = 10; // Number of salt rounds
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({
            email, password: hash, name, birthday: new Date(dob), sex: gender, country: country_iso2, emailVerified: false
        });

        // Save the new user
        await newUser.save();
        console.log('User successfully registered');

        // Send verification email
        const verificationLink = `http://${req.headers.host}/verify-email?token=${newUser._id}`;
        await sendVerificationEmail(newUser.email, verificationLink);

        res.status(200).send('Registration successful, please check your email for verification.');
    } catch (error) {
        console.error('Error in registration process:', error);
        res.status(500).json({ error: 'An error occurred in the registration process.' });
    }
});


app.get('/verify-email', async (req, res) => {
    try {
        const user = await UserModel.findById(req.query.token);
        if (!user) return res.status(400).send('Invalid verification link.');

        user.emailVerified = true;
        await user.save();
        res.send('Email successfully verified.');
    } catch (error) {
        res.status(500).send('Failed to verify email.');
    }
});

/* ----------------------------- USER LOGIN ----------------------------- */

// Конфигурация стратегии Passport
passport.use(new LocalStrategy({
    usernameField: 'user[login]',
    passwordField: 'user[password]'
}, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ email: username }).exec();
        if (!user) {
            return done(null, false, { message: 'Неверный email.' });
        }
        if (!user.emailVerified) {
            return done(null, false, { message: 'Email не подтвержден. Пожалуйста, проверьте вашу почту.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Неверный пароль.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Сериализация и десериализация пользователей
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        console.log("Deserialized user:", user);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

app.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.error('Logout error:', err);
            return next(err);
        }
        // destroy session data
        req.session.destroy(() => {
            // clear the session cookie
            res.clearCookie('connect.sid');
            // redirect to the home page
            res.redirect('/');
        });
    });
});

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign_in');
    }
    res.send('Welcome to your Dashboard!');
});

/* ----------------------------- confirmation email send again ----------------------------- */

// app.get('/users/confirmation', (req, res) => {
//     // Set a test message
//     // req.flash('error', 'This is a test error message.');
//     res.render('users/confirmation', {
//         messages: {
//             error: req.flash('error'),
//             success: req.flash('success')
//         }
//     });
// });
app.get('/users/confirmation', (req, res) => {
    res.render('users/confirmation', {
        messages: {
            error: req.flash('error'),
            success: req.flash('success')
        }
    });
});

app.post('/users/confirmation', async (req, res) => {
    const email = req.body.user.email;

    if (!email) {
        console.log("No email provided");
        req.flash('error', 'Пожалуйста, введите email.');
        res.redirect('/users/confirmation');
        return;
    }    

    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            req.flash('error', 'Нет пользователя с таким email или вы не зарегистрированы.');
            res.redirect('/users/confirmation');
            return;
        }

        if (user.emailVerified) {
            req.flash('error', 'Email уже подтвержден.');
            res.redirect('/users/confirmation');
            return;
        }

        const verificationLink = `http://${req.headers.host}/verify-email?token=${user._id}`;
        await sendVerificationEmail(user.email, verificationLink);
        req.flash('success', 'Письмо с подтверждением было повторно отправлено.');
        res.redirect('/users/confirmation');
    } catch (error) {
        console.error('Ошибка сервера:', error);
        req.flash('error', 'Ошибка сервера при отправке письма.');
        res.redirect('/users/confirmation');
    }
});

/* ----------------------------- file upload (avatar) ----------------------------- */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/uploads/';
        // Проверка существования директории, и создание если не существует
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // создать директорию, если её нет
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/',
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
            // Include user ID in the filename
            const userId = req.user._id;
            cb(null, userId + '-' + cleanFileName + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    })
});

app.post('/profile/update-avatar', upload.single('user[pending_avatar]'), async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const user = await UserModel.findById(req.user._id);
        if (req.file) {
            console.log('File uploaded:', req.file.filename);  // Check the filename
            user.avatarUrl = req.file.filename;  // Set the avatar URL

            await user.save();
            console.log('User after saving:', user);  // Verify that the user has been updated

            // Update the session user object
            req.user.avatarUrl = user.avatarUrl;
            req.session.user = req.user;

            req.session.save(err => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).send('Failed to save session');
                }
                res.redirect('/profile/edit');
            });
        } else {
            throw new Error('File upload failed');
        }
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).send('Error updating avatar: ' + error.message);
    }
});

/* ----------------------------- edit personal data on /profile/edit ----------------------------- */

// Маршрут для обновления профиля пользователя
app.post('/profile/update', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized'); // Проверка на аутентификацию пользователя
    }

    try {
        // Получаем данные из запроса
        const { name, birthday, sex, country } = req.body;

        // Находим и обновляем пользователя в базе данных
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, {
            name,
            birthday: new Date(birthday), // Убедитесь, что дата преобразуется корректно
            sex,
            country
        }, { new: true }); // Возвращаем обновленный документ

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send('Profile updated successfully');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Failed to update profile');
    }
});

// Обновление Email
app.post('/profile/update-email', async (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized' });

    const { password, newEmail } = req.body;

    try {
        // Verify the password first
        const isMatch = await bcrypt.compare(password, req.user.password);
        if (!isMatch) {
            return res.status(403).send({ message: 'Неверный пароль.' });
        }

        // Update the email if the password is correct
        await UserModel.findByIdAndUpdate(req.user._id, { email: newEmail });
        res.send({ success: true, message: 'Email успешно обновлен.' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).send({ message: 'Ошибка сервера при обновлении email.' });
    }
});

app.post('/profile/change-password', async (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized' });

    const { oldPassword, newPassword } = req.body;
    try {
        const isMatch = await bcrypt.compare(oldPassword, req.user.password);
        if (!isMatch) {
            return res.status(403).send({ message: 'Старый пароль не верен.' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(req.user._id, { password: hashedNewPassword });
        res.send({ message: 'Пароль успешно обновлен.' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send({ message: 'Ошибка сервера при обновлении пароля.' });
    }
});

/* ----------------------------- file upload (documents) ----------------------------- */

app.get('/documents', async function (req, res) {
    console.log(Document);  // Должен показать конструктор Mongoose модели
    try {
        const documents = await Document.find();
        res.render('documents', { user: req.user, documents: documents });
    } catch (error) {
        console.error('Failed to fetch documents:', error);
        res.status(500).send('Error fetching documents');
    }
});

app.post('/admin/documents/add', async (req, res) => {
    if (req.user && req.user.isAdmin) {
        const { name, url } = req.body;
        try {
            const newDocument = new Document({ name, url });
            await newDocument.save();
            res.status(200).send("Документ добавлен");
        } catch (error) {
            console.error("Ошибка при добавлении документа:", error);
            res.status(500).send("Ошибка при добавлении документа");
        }
    } else {
        res.status(403).send("Нет прав доступа");
    }
});

app.delete('/admin/documents/delete/:id', async (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ success: false, message: "Нет прав доступа" });
    }

    try {
        const result = await Document.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Документ не найден" });
        }
        res.json({ success: true, message: "Документ удален" });
    } catch (error) {
        console.error("Ошибка при удалении документа:", error);
        res.status(500).json({ success: false, message: "Ошибка при удалении документа" });
    }
});

/* ----------------------------- file upload (/education) ----------------------------- */

app.get('/education', async function (req, res) {
    try {
        const education = await Education.find();
        console.log('Retrieved education documents:', education); // Check what is being fetched
        res.render('education', { user: req.user, education: education });
    } catch (error) {
        console.error('Failed to fetch education:', error);
        res.status(500).send('Error fetching education');
    }
});

app.post('/admin/education/add', async (req, res) => {
    console.log(req.body); // Log the incoming request body
    if (req.user && req.user.isAdmin) {
        const { name, url } = req.body;
        try {
            const newEducation = new Education({ name, url });
            await newEducation.save();
            res.status(200).send("Документ Education добавлен");
        } catch (error) {
            console.error("Ошибка при добавлении документа Education:", error);
            res.status(500).send("Ошибка при добавлении документа Education");
        }
    } else {
        res.status(403).send("Нет прав доступа");
    }
});

app.delete('/admin/education/delete/:id', async (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ success: false, message: "Нет прав доступа" });
    }

    try {
        const result = await Education.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Документ не найден" });
        }
        res.json({ success: true, message: "Документ удален" });
    } catch (error) {
        console.error("Ошибка при удалении документа:", error);
        res.status(500).json({ success: false, message: "Ошибка при удалении документа" });
    }
});

/* ----------------------------- edit /about page ----------------------------- */

app.get('/about', async (req, res) => {
    try {
        const aboutData = await About.findOne();
        // Установка значения по умолчанию, если в базе данных пусто
        const defaultContent = '<p>Здесь пока ничего нет.</p>';
        res.render('about', {
            user: req.user,
            existingContent: aboutData ? aboutData.content : defaultContent
        });
    } catch (error) {
        console.error('Failed to fetch about content:', error);
        res.status(500).send('Error fetching about content');
    }
});

app.post('/save-content', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        // Поиск существующего содержимого или создание нового
        let aboutData = await About.findOne();
        if (aboutData) {
            // Обновление существующего содержимого
            aboutData.content = content;
            aboutData.updatedAt = new Date();
        } else {
            // Создание нового содержимого, если оно еще не существует
            aboutData = new About({ content });
        }

        await aboutData.save();
        res.status(200).json({ message: 'Content saved successfully' });
    } catch (error) {
        console.error('Failed to save content:', error);
        res.status(500).json({ error: 'Failed to save content' });
    }
});

/* ----------------------------- edit officers page ----------------------------- */

app.post('/upload-image', upload.single('image'), (req, res) => {
    // Возвращает URL к загруженному изображению, чтобы его можно было использовать в редакторе
    res.json({ location: '/path/to/images/' + req.file.filename });
});

app.get('/officers-and-board', async (req, res) => {
    try {
        const officersData = await Officers.findOne();
        res.render('officers-and-board', {
            user: req.user,
            existingContent: officersData ? officersData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch officers content:', error);
        res.status(500).send('Error fetching officers content');
    }
});

app.post('/save-officers-content', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let officersData = await Officers.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Officers content saved successfully', content: officersData.content });
    } catch (error) {
        console.error('Failed to save officers content:', error);
        res.status(500).json({ error: 'Failed to save officers content' });
    }
});

/* ----------------------------- edit delegates page ----------------------------- */

app.get('/delegates', async (req, res) => {
    try {
        const delegatesData = await Delegates.findOne();
        res.render('delegates', {
            user: req.user,
            existingContent: delegatesData ? delegatesData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch delegates content:', error);
        res.status(500).send('Error fetching delegates content');
    }
});

app.post('/save-delegates', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let delegatesData = await Delegates.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Delegates content saved successfully', content: delegatesData.content });
    } catch (error) {
        console.error('Failed to save delegates content:', error);
        res.status(500).json({ error: 'Failed to save delegates content' });
    }
});

/* ----------------------------- edit history page ----------------------------- */

app.get('/speedcubing-history', async (req, res) => {
    try {
        const historyData = await History.findOne();
        res.render('speedcubing-history', {
            user: req.user,
            existingContent: historyData ? historyData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch history content:', error);
        res.status(500).send('Error fetching history content');
    }
});

app.post('/save-history', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let historyData = await History.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'History content saved successfully', content: historyData.content });
    } catch (error) {
        console.error('Failed to save history content:', error);
        res.status(500).json({ error: 'Failed to save history content' });
    }
});

/* ----------------------------- edit privacy page ----------------------------- */

app.get('/privacy', async (req, res) => {
    try {
        const privacyData = await Privacy.findOne();
        res.render('privacy', {
            user: req.user,
            existingContent: privacyData ? privacyData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch privacy content:', error);
        res.status(500).send('Error fetching privacy content');
    }
});

app.post('/save-privacy', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let privacyData = await Privacy.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Privacy content saved successfully', content: privacyData.content });
    } catch (error) {
        console.error('Failed to save privacy content:', error);
        res.status(500).json({ error: 'Failed to save privacy content' });
    }
});

/* ----------------------------- edit disclaimer page ----------------------------- */

app.get('/disclaimer', async (req, res) => {
    try {
        const disclaimerData = await Disclaimer.findOne();
        res.render('disclaimer', {
            user: req.user,
            existingContent: disclaimerData ? disclaimerData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch disclaimer content:', error);
        res.status(500).send('Error fetching disclaimer content');
    }
});

app.post('/save-disclaimer', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let disclaimerData = await Disclaimer.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Disclaimer content saved successfully', content: disclaimerData.content });
    } catch (error) {
        console.error('Failed to save disclaimer content:', error);
        res.status(500).json({ error: 'Failed to save disclaimer content' });
    }
});

/* ----------------------------- edit regulations page ----------------------------- */

app.get('/regulations', async (req, res) => {
    try {
        const regulationsData = await Regulations.findOne();
        res.render('regulations', {
            user: req.user,
            existingContent: regulationsData ? regulationsData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch regulations content:', error);
        res.status(500).send('Error fetching regulations content');
    }
});

app.post('/save-regulations', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let regulationsData = await Regulations.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Regulations content saved successfully', content: regulationsData.content });
    } catch (error) {
        console.error('Failed to save regulations content:', error);
        res.status(500).json({ error: 'Failed to save regulations content' });
    }
});

/* ----------------------------- edit guidelines page ----------------------------- */

app.get('/guidelines', async (req, res) => {
    try {
        const guidelinesData = await Guidelines.findOne();
        res.render('guidelines', {
            user: req.user,
            existingContent: guidelinesData ? guidelinesData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch guidelines content:', error);
        res.status(500).send('Error fetching guidelines content');
    }
});

app.post('/save-guidelines', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let guidelinesData = await Guidelines.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Guidelines content saved successfully', content: guidelinesData.content });
    } catch (error) {
        console.error('Failed to save guidelines content:', error);
        res.status(500).json({ error: 'Failed to save guidelines content' });
    }
});

/* ----------------------------- edit tools page ----------------------------- */

app.get('/score-tools', async (req, res) => {
    try {
        const toolsData = await Tools.findOne();
        res.render('score-tools', {
            user: req.user,
            existingContent: toolsData ? toolsData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch tools content:', error);
        res.status(500).send('Error fetching tools content');
    }
});

app.post('/save-tools', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let toolsData = await Tools.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Tools content saved successfully', content: toolsData.content });
    } catch (error) {
        console.error('Failed to save tools content:', error);
        res.status(500).json({ error: 'Failed to save tools content' });
    }
});

/* ----------------------------- edit faq page ----------------------------- */

app.get('/faq', async (req, res) => {
    try {
        const faqData = await Faq.findOne();
        res.render('faq', {
            user: req.user,
            existingContent: faqData ? faqData.content : '<p>No content available yet.</p>'
        });
    } catch (error) {
        console.error('Failed to fetch faq content:', error);
        res.status(500).send('Error fetching faq content');
    }
});

app.post('/save-faq', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        let faqData = await Faq.findOneAndUpdate({}, { content: content, updatedAt: new Date() }, { new: true, upsert: true });
        res.status(200).json({ message: 'Faq content saved successfully', content: faqData.content });
    } catch (error) {
        console.error('Failed to save faq content:', error);
        res.status(500).json({ error: 'Failed to save faq content' });
    }
});

/* ----------------------------- new competition ----------------------------- */

app.get('/competitions/new', (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        // Redirect non-admin users to the sign-in page
        res.redirect('/users/sign_in');
    } else {
        // Render the form to create a new competition for admins
        res.render('competitions/new', { user: req.user });
    }
});

app.get('/profile/competitions/new', (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        // Если пользователь не авторизован или не админ, перенаправляем на страницу входа
        res.redirect('/users/sign_in');
    } else {
        // Пользователь авторизован и является админом, отображаем форму создания соревнований
        res.render('competitions/new', { user: req.user }); // Предполагается, что у вас есть шаблон 'competitions/new.ejs'
    }
});

app.post('/create-competition', async (req, res) => {
    console.log(req.body); // Log the entire request body to see what is being received
    try {
        const competition = new Competition(req.body);
        await competition.save();
        res.json({ message: "Соревнование успешно создано!" });
    } catch (error) {
        console.error('Ошибка при создании соревнования:', error);
        res.status(400).send('Ошибка при создании соревнования: ' + error.message);
    }
});

/* ----------------------------- all competitions ----------------------------- */

app.get('/competitions/all', async (req, res) => {
    try {
        const now = new Date();
        let competitions = await Competition.find().sort({ startDate: -1 });

        res.render('competitions/all', {
            user: req.user, // Add this line to pass the user object to the template
            competitions,
            formatDate: function (date) {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(date).toLocaleDateString('ru-RU', options);
            }
        });
    } catch (error) {
        console.error('Failed to fetch competitions:', error);
        res.status(500).send('Server error');
    }
});

app.get('/competitions/:id', async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id);
        if (!competition) {
            return res.status(404).send('Соревнование не найдено');
        }
        res.render('competition-detail', { competition, user: req.user });
    } catch (error) {
        console.error('Ошибка при получении соревнования:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/competitions/:id/delete', async (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).send('Нет доступа');
    }
    try {
        await Competition.deleteOne({ _id: req.params.id });
        res.redirect('/competitions/all'); // Redirect to the competitions list or a confirmation page
    } catch (error) {
        console.error('Ошибка при удалении соревнования:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/competitions/:id/edit', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // This would receive data in the form { nameReason: "new reason", city: "new city" }

    try {
        const competition = await Competition.findByIdAndUpdate(id, updateData, { new: true });
        if (!competition) {
            return res.status(404).json({ message: 'Соревнование не найдено' });
        }
        res.json({ message: 'Соревнование обновлено', competition });
    } catch (error) {
        console.error('Ошибка при обновлении соревнования:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

/* ----------------------------- contact form ----------------------------- */

// Настройка транспорта для Nodemailer
const transporterContact = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true для порта 465, false для других портов
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const inquiryDescriptions = {
    competition: "Связь с организаторами конкретного соревнования",
    competitions_in_general: "Соревнования вообще (организация, правила и т.д.)",
    wca_id_or_profile: "ID или профиль",
    different: "Другое"
};

// Обработчик маршрута для отправки письма
app.post('/contact', (req, res) => {
    const { name, your_email, message, inquiry } = req.body.website_contact;
    // Берем последнее значение из массива, если оно приходит как массив
    const finalInquiry = Array.isArray(inquiry) ? inquiry[inquiry.length - 1] : inquiry;
    const inquiryText = inquiryDescriptions[finalInquiry] || "Неизвестная категория";

    console.log(`Категория запроса: ${inquiryText}`);
    console.log(`Отправитель: ${name}`);
    console.log(`Email: ${your_email}`);
    console.log(`Сообщение: ${message}`);

    const mailOptions = {
        from: `"${name}" <${your_email}>`,
        to: process.env.EMAIL_BOARD,
        subject: 'Новое сообщение с контактной формы',
        text: `Категория запроса: ${inquiryText}\nИмя: ${name}\nEmail: ${your_email}\nСообщение: ${message}`,
        html: `<p><b>Категория запроса:</b> ${inquiryText}</p>
               <p><b>Отправитель:</b> ${name}</p>
               <p><b>Email:</b> ${your_email}</p>
               <p><b>Сообщение:</b> ${message}</p>`
    };

    transporterContact.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Ошибка при отправке: " + error.message);
        }
        res.send('Сообщение отправлено: ' + info.response);
    });
});

/* ----------------------------- posts ----------------------------- */

// Route to display the form for creating a new post
app.get('/posts/new', (req, res) => {
    // Check if the user is authenticated and email verified
    if (req.user && req.user.isAdmin) {
        res.render('create-post', { user: req.user }); // Assuming you have a view named 'create-post.ejs'
    }
});

// Route to display a single post
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('post', { user: req.user, post: post });  // Assuming you have a view named 'post.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching post');
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find({});  // Fetch all posts
        res.render('posts', { posts: posts, user: req.user });  // Pass posts to the view
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

// Route to handle delete
app.delete('/posts/:id', async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id);
        res.status(200).send('Post deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting post');
    }
});

// Route to handle creating new posts
app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (req.user && req.user.emailVerified) {
            const newPost = new Posts({
                title: title,
                content: content,
                author: req.user.username // Adjust based on your user model
            });
            await newPost.save();
            res.redirect('/posts', { post: post, user: req.user });
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// Route to display the form for editing an existing post
app.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        // Only allow editing if the user is authenticated and verified
        if (req.user && req.user.emailVerified) {
            res.render('edit-post', { post: post, user: req.user });
        } else {
            res.status(403).send('Unauthorized access');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving post');
    }
});

// Route to handle updating a post
app.post('/posts/update/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (req.user && req.user.emailVerified) {
            await Posts.findByIdAndUpdate(req.params.id, { title, content });
            res.redirect('/posts'); // Remove the { user: req.user } argument
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update post');
    }
});

// /* ----------------------------- recaptcha ----------------------------- */

// // Make sure to import the required module at the top of your file
// const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

// // Instantiate the reCAPTCHA Enterprise client
// const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// // Function to create an assessment
// // Async function to create an assessment of a user action
// async function createAssessment({ projectID, recaptchaKey, token, recaptchaAction }) {
//     const client = new RecaptchaEnterpriseServiceClient();
//     const projectPath = client.projectPath(projectID);

//     // Prepare the request for creating the assessment
//     const request = {
//         parent: projectPath,
//         assessment: {
//             event: {
//                 token: token,
//                 siteKey: recaptchaKey
//             }
//         }
//     };

//     try {
//         // Attempt to create the assessment
//         const [response] = await client.createAssessment(request);

//         // Check if the token was valid
//         if (!response.tokenProperties.valid) {
//             console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
//             return null;
//         }

//         // Check if the expected action was executed
//         if (response.tokenProperties.action === recaptchaAction) {
//             // Get the risk score and the reasons
//             console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
//             response.riskAnalysis.reasons.forEach(reason => console.log(reason));

//             return {
//                 score: response.riskAnalysis.score,
//                 reasons: response.riskAnalysis.reasons.map(reason => reason.reason)
//             };
//         } else {
//             console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
//             return null;
//         }
//     } catch (err) {
//         console.error('Failed to create assessment:', err);
//         throw err;
//     }
// }

// // An example endpoint in Express that handles the reCAPTCHA verification
// app.post('/verify-recaptcha', async (req, res) => {
//     // The token you get from the client side
//     const tokenFromClient = req.body['g-recaptcha-response'];

//     // Ensure that you have a token from the client
//     if (!tokenFromClient) {
//         return res.status(400).send("No reCAPTCHA token provided");
//     }

//     try {
//         // Call your assessment function
//         const result = await createAssessment({
//             projectID: "your-google-cloud-project-id",  // Replace with your actual Google Cloud project ID
//             recaptchaKey: "your-recaptcha-site-key",    // Replace with your actual site key
//             token: tokenFromClient,
//             recaptchaAction: 'login' // Ensure this matches the action expected from the client
//         });

//         // Handle the assessment result
//         if (result && result.score >= 0.5) {  // Check if the score is high enough to consider it a pass
//             res.send({
//                 success: true,
//                 message: "ReCAPTCHA verification passed",
//                 score: result.score
//             });
//         } else {
//             // Consider reCAPTCHA verification as failed if score is too low or no score was returned
//             res.send({
//                 success: false,
//                 message: "ReCAPTCHA verification failed",
//                 score: result ? result.score : null
//             });
//         }
//     } catch (error) {
//         console.error("Error creating assessment:", error);
//         res.status(500).send("Server Error");
//     }
// });

/* ----------------------------- SERVER ----------------------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));