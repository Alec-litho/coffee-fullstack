# coffee-test-task frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for developmenta
```
npm run dev
```

# coffee-test-task backend

## Compile and run the project

```bash
# download dependencies
$ npm i

# run migration and seeding
$ npx prisma migrate dev

# run server
$ npm run start:dev
```

# API

- swagger: http://localhost:3002/api

# .env variables:

DATABASE_URL=mongodb+srv://nojo7021:20052020@cluster1.qnjfntt.mongodb.net/fullstack-coffee?retryWrites=true&w=majority

# Note

## 1. Сервис Auth:
Функции:
 - login(email, password) – аутентификация пользователя, генерация JWT-токена.
 - register(email, password) – регистрация нового пользователя с хешированием парода (bcrypt).
Почему так:
 - Использован @nestjs/jwt и passport-jwt для стандартной и надежной J-аутентификации.
 - Stateless-подход JWT упрощает интеграцию между микросервисами и фронтендом.
## 2. Сервис Products:
Функции:
 - getAll(page, pageSize) – пагинация через page/pageSize
 - updateProduct(id, data) 
 - createProduct(data) – модификация товаров с валидацией через class-validator.

class-validator гарантирует корректность входных данных, снижая риск ошибок.
Swagger-документация (@nestjs/swagger) упрощает тестирование и интеграцию для фронтенда.

## 3. Сервис Users:
Функции:
getUser(id) – получение данных пользователя.
getUsers() – получение данных пользователей.


## 4. Frontend (Nuxt3):
Компоненты:
 - InfinityScroller: Динамическая подгрузка товаров при скролле
 - ProductModal: Редактирование/создание товаров без перезагрузки страницы.

Сторы Pinia:
 - AuthStore: Управление JWT-токеном, редиректы на логин при истечении сессии.
 - ProductsStore: Кэширование товаров, обработка пагинации и фильтров.

Почему так:

 - Бесконечный скролл улучшает UX при больших данных.
 - Модальные окна минимизируют переходы между страницами.
 - Сторы централизуют логику состояния, упрощая повторное использование.

 Страницы:

 - Login - Форма авторизации/регистрации 
    1. (Переключение между режимами "Login" и "Register" через кнопку)
    2. Валидация полей
    Почему так: Единая страница для Login/Register упрощает UX – пользователь не переключается между URL.
 - Products - главная страница
    1. Просмотр продуктов
    2. Бесконечный скролл
    3. Модальное окно
