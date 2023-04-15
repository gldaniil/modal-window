require('dotenv').config()

const express = require('express'),
  morgan = require('morgan'),
  path = require('path'),
  dbModule = require('./db');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan(process.env.LOG_LEVEL));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', require('./routes'));

app.post('/api/form', async (req, res) => {
  try {
    const formData = req.body;
    const now = new Date().toLocaleString();
    const ip = req.ip.split(":").pop();
    console.log(`Имя: ${formData.clientName}, Номер: ${formData.clientPhone}, Время: ${now}, IP: ${ip}`)
    dbModule.addClient(formData.clientName, formData.clientPhone, now, ip)
    return res.status(200).send('Данные успешно отправлены!');
  } catch (err) {
    console.log(`Ошибка: ${err}`)
    return res.status(401).send('Возникла ошибка...');
  }
});

// Если пользователь перейдет на несуществующую страницу, то он получит HTTP-статус 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

app.listen(PORT, () => {
  console.log(`Сервер был запущен на ${process.env.DOMAIN}:${PORT}...`)
})