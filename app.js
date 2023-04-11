import express from 'express'
import path from 'path'

// const cors = require('cors')
const __dirname = path.resolve()
// Все, что находится в переменной окружения PORT, или 3000, если там ничего нет.
const PORT = process.env.PORT ?? 3000
const app = express()

// app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = express.json();
// app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'ejs'))

// Добавление middleware. Отталкиваемся от текущей директории и смотрит на папку static
app.use(express.static(path.resolve(__dirname)))


// Обработка запроса по url '/'
app.get('/', (req, res) => {
  // res.render(__dirname, 'index.html')
})

// Обработка запроса по url '/features'
app.get('/features', (req, res) => {
  // console.log(req.requestTime)
  res.sendFile(path.resolve(__dirname, 'static', 'features.html'))
})

app.post('/api/form', jsonParser, async (req, res) => {
  const formData = req.body;
  console.log(formData); // выводим данные формы в консоль для проверки
  res.status(200).send('Данные успешно отправлены!');
});

app.get('/haha/dalekiy/put/ura', (req, res) => {
  console.log()
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

// Если пользователь перейдет на несуществующую страницу, то он получит HTTP-статус 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

// Запуск сервера, порт
app.listen(PORT, () => {
  console.log(`Сервер был запущен на ${PORT} порту...`)
})