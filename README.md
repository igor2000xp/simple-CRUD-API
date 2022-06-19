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

Режим разработки

```
npm run start:dev
```
Режим релиза

```
npm run start:prod
```
Приложение запускает порт, указанный в .env (5000 по умолчанию). 

Можно указать другой (PORT=5000 в файле .env).

Проверять работу приложения удобно с помощью Postman.

#### Тестирование не реализовано

## Масштабирование - clusters
```
npm run start:multi
```
