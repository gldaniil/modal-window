require('dotenv').config()

const express = require('express'),
  morgan = require('morgan'),
  path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT ?? 3000;

app.use(morgan(process.env.LOG_LEVEL));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', require('./routes'))

app.post('/api/form', async (req, res) => {
  const formData = req.body;
  console.log(formData); // выводим данные формы в консоль для проверки
  res.status(200).send('Данные успешно отправлены!');
});

// Если пользователь перейдет на несуществующую страницу, то он получит HTTP-статус 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

app.listen(PORT, () => {
  console.log(`Сервер был запущен на ${process.env.DOMAIN}:${PORT}...`)
})