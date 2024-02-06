# price-converter-api

___

### Инструкция по запуску:
* Установить [Node.js](https://nodejs.org/ru/)
* Клонировать репозиторий ``` git clone 'https://github.com/Andrey-Grishkov/price-converter-api.git'```
* Установить зависимости ``` npm i```
* Запустить приложение ```npx nodemon```

___

### Реализованные функции:
* При направлении GET запроса на url ```http://localhost:3000/product```:
  * По текущей дате из API ЦБ РФ узнам текущий Id доллара США (в описании сказано, что он может быть изменен).
  * По дате и Id узнаем текущий курс валюты из API ЦБ РФ.
  * Берем все данные из ```product.json```, в котором жестко закодированы данные о товарах.
  * Рассчитываем стоимость в рублях по текущему курсу с применением скидки, соответствующего товара, и надбавки 10% (округляем до целого).
  * Меняем поле стоимости в рублях, на полученное значение и отправляем json в ответ на запрос.
* При направлении POST запроса мы также получим в ответ json с актуальной ценой в рублях на другие товары (если есть необходимость узнать текущий курс на товары, которых нет в хардкоде), если в теле запроса отправить json следующего вида:
  ```{
      "products": [
        {
          "id": 19,
          "title": "Motorola",
          "description": "Hello Moto!!!",
          "price": 52,
          "price_rub": 47656,
          "discountPercentage": 50,
          "rating": 8,
          "stock": 194,
          "brand": "Motorola",
          "category": "smartphones",
          "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
          "images": [
            "https://cdn.dummyjson.com/product-images/1/1.jpg",
            "https://cdn.dummyjson.com/product-images/1/2.jpg",
            "https://cdn.dummyjson.com/product-images/1/3.jpg",
            "https://cdn.dummyjson.com/product-images/1/4.jpg",
            "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
          ]
        }]
    }
  ```
* Для направления запросов можно воспользоваться программой Postman.

___
### Структура проекта:
* В корне проекта лежат фаилы настроек и конфигураций, папка с модулями, папка со сборкой, а также **src** – каталог, содержащий исходный код приложения.
* В корне **src** лежит app.ts - точка входа с основной логикой, фаил для тестов app.test.js (не реализовано), а также папки **controllers**, **middlewares**, **types**, **utils**.
* В папке **controllers** содержится фаил **ProductController.ts**, содержащий логику обработки запросов get и post.
* В папке **middlewares** содержится фаил **cors.ts** (добавлен шаблоный фаил, для тестирования запросов с фронтенд части, размещенной на порту 3001).
* В папке **types** лежит вспомогательный фаил с интерфейсами **interfaces.ts**, для определения типов оперируемыми данными.
* В папке **utils** лежат вспомогательные модули:
  * **ArrayHandler.ts** - служит для обработки данных. Метод findDollarId перебирает массив данных для поиска Id доллара США на текущую дату,
  метод findDollarRate перебирает массив данных для поиска текущего курса доллара на текущую дату по id, метод setPrice устанавливает цену в рублях
  для каждого товара в отдаваемых пользователю данных.
  * **constans.ts** - содержит url для запроса к API ЦБ РФ (для тестового задания не стал добавлять их в переменные окружения)
  * **DataHandler.ts** - предоставляет текущую дату в необходимом формате для запроса на API ЦБ РФ.
  * **product.json** - данные товаров.
  * **RateApi** - Api для обращения к API ЦБ РФ, реализованные через fetch-запросы.
