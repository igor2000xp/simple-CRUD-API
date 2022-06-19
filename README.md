# simple-CRUD-API

# simple-crud-api

Приложение представляет CRUD API сервер для работы с объектами Users:

```
id —  идентфикатор (используется библиотека uuid)
username — имя (string, required)
age — возраст (number, required)
hobbies — список хобби (array of strings or empty array, required)
```

## Endpoints

- **GET** `/api/person` получить всех users;
- **GET** `/api/person/${personId}` получить a user by ID;
- **POST** `/api/person` создать user и добавить в database;
- **PUT** `/api/person/{Id}` обновить существующего user;
- **DELETE** `/api/person/${personId}` удалить существующего user.

## Установка приложения

```
git clone https://github.com/igor2000xp/simple-CRUD-API.git
```

```
npm install
```

#### Запуск приложения

```
node src/index.js 

```

Приложение запускает порт, указанный в .env (5000 по умолчанию). 

Можно указать другой (PORT=5000 в файле .env).

Проверять работу приложения удобно с помощью Postman или браузера.

```
http://localhost:5000/api/users

```

И далее проверить запросы POST, PUT, DELETE и Обработку ошибок.

#### Тестирование не реализовано

## Масштабирование - clusters не реализовано
