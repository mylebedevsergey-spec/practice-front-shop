# Интернет-магазин садовых принадлежностей

Учебная практика по фронтенду. Приложение на React, данные берутся с готового бэкенда
telran-backend, его код не менял.

## Как запустить

Сначала бэкенд, это отдельный репозиторий:

```
git clone https://github.com/Ray3en/telran-backend.git backend
cd backend && npm install && npm run dev
```

Он поднимается на порту 3333. Потом фронтенд:

```
cd app
npm install
npm run dev
```

Фронтенд на 5174, адрес API по умолчанию http://localhost:3333, при необходимости меняется
переменной VITE_API_URL.

## Стек

React 18, Redux Toolkit (createSlice и createAsyncThunk), React Router DOM 6, react-hook-form,
axios, Vite, CSS Modules.

## Структура

```
app/src/
  api/            client.js с axios и baseURL, endpoints.js со всеми запросами
  store/          configureStore и три слайса: products, categories, cart
  components/     Header, Footer, ProductCard, CategoryCard, SaleForm, OrderForm
  pages/          HomePage, CategoriesPage, CategoryPage, ProductPage, CartPage, NotFoundPage
  App.jsx         маршруты
  index.jsx       Provider и BrowserRouter
  index.css       общие стили и переменные
```

Каждый компонент лежит в своей папке: файл компонента, модульный CSS и index.js для реэкспорта.
Имена с постфиксами Page, Card и Form. ProductCard используется на главной и на странице категории,
CategoryCard на главной и на странице всех категорий.

## Что реализовано

Маршрутов шесть: главная, все категории, товары категории, карточка товара, корзина и 404.
Данные загружаются с бэкенда через createAsyncThunk, в каждом слайсе есть статусы загрузки
и ошибки.

Корзина хранится в Redux и дублируется в localStorage, счётчик выводится в шапке, количество
меняется, позиция удаляется, после успешного заказа корзина очищается.

Две формы на react-hook-form: заявка на скидку и оформление заказа. Валидация имени, телефона
и почты, отправка на /sale/send и /order/send.

Стили сверял с макетом из Figma: первый экран, ряд категорий, блок распродажи, карточки с процентом
скидки, зелёный баннер, форма заявки, контакты с картой, подвал. Адаптив до 820 пикселей.

## Что проверял

Сборка проходит. Главная получает пять категорий и тридцать пять товаров, картинки идут с бэкенда.
В первой категории восемь товаров. Добавление в корзину увеличивает счётчик, на странице корзины
видно позицию и итог. Форма заказа отправляет POST и очищает корзину. Неизвестный адрес даёт 404.
