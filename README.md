Веб-интерфейс для локального git репозитория
============================================

[![Build Status](https://travis-ci.org/bakoushin/shri-node.svg?branch=master)](https://travis-ci.org/bakoushin/shri-node)

Быстрый старт
-------------

`npm install` # установка пакетов

`npm run build` # сборка интерфейса

`npm run clone-repo` # загрузка эталонного репозитория

`npm run start` # запуск

Демо
----

https://shri-node-staging.herokuapp.com/

Показ файлов
------------

Приложение понимает распространённые форматы текстовых файлов (html, css, js и др.) и картинок (jpeg, png и др.).

Текстовые файлы выводятся для просмотра с подсветкой синтаксиса (библиотека Highlight.js).

Картинки также отображаются при просмотре.

Содержимое остальных файлов не отображается.

Показ коммитов
--------------

Коммиты выводятся плоским списком. Отображается дата коммита и коммиттер.

Работа с git
------------

Работа с git ведется с помощью `child_process.spawn`.

Форматирование дат
------------------

Даты форматируются с помощью библиотеки Moment. Даты выводятся только в списке коммитов.

Конфигурационный файл
---------------------

Конфигурационный файл: `config.js`.

Модульные и интеграционные тесты
================================

Для тестирования используется эталонный репозиторий (клон репозитория [TodoMVC](https://github.com/tastejs/todomvc)).

Модульные тесты
---------------

Поскольку в основе приложения лежит http-сервер, модульные тесты покрывают корректный ответ сервера на типовой набор запросов для ветки `master` и ветки  `gh-pages`. Корректным считается ответ с кодом 200 и телом в виде html.

Также реализовано несколько тестов для парсера вывода git с помощью пакета `rewire`: тестируется парсинг списка веток, списка файлов и списка коммитов.

Покрытие 80% (по отчету утилиты Istanbul).

Тесты расположены в папке `test`.

Запуск тестов:

`npm install` # установка пакетов

`npm run clone-repo` # загрузка эталонного репозитория

`npm run test` # загрузка эталонного репозитория

Отчет о покрытии в html: `npm run test-coverage`

Интеграционные тесты
--------------------

Интеграционные тесты проводятся в бразуерах Chrome и Firefox.

Тесты расположены в папке `hermione`.

Для запуска тестов требуется запущенный Selenium.

Запуск тестов:

`npm install` # установка пакетов

`npm run clone-repo` # загрузка эталонного репозитория

`npm run build` # сборка интерфейса

`npm run start` # запуск приложения

`npm run hermione` # запуск интеграционных тестов

Инфраструктура
==============

Линтеры
-------

Для JavaScript используется ESLint с конфигом [eslint-config-yandex](https://www.npmjs.com/package/eslint-config-yandex). Дополнительно установлено правило индентации в 2 пробела (в конфиге Яндекса 4).

Для SCSS используется Stylelint с конфигом [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss).

Сборка
------

Для сборки используется webpack.

Поскльку приложение на Node, dev-сборка реализована с помощью webpack-dev-middleware и webpack-hot-middleware для обеспечения возможности hot reload.

В production-сборке результирующие файлы JS и CSS минифицируются, CSS обрабатывается автопрефиксером.

Запуск production-сборки:

`npm run build`

Continious Integration
----------------------

**Коммит в master**

С помощью Travis CI выполняется следующие операции:
* линтинг (ESlint, Stylelint)
* юнит-тесты
* интеграционные тесты (интеграция с [SauceLabs](https://saucelabs.com))
* собирается контейнер

Собранный контейнер деплоится в staging-приложение на Heroku.

Пример: https://travis-ci.org/bakoushin/shri-node/builds/359057251

Staging-приложение: https://shri-node-staging.herokuapp.com/

**Выставление тега**

Аналогично коммиту в мастер, только деплой происходит в production-приложение на Heroku.

Пример: https://travis-ci.org/bakoushin/shri-node/builds/359062190

Production-приложение: https://shri-node-production.herokuapp.com/

**Pull request**

С помощью Travis CI выполняется линтинг, запускаются юнит-тесты и интеграционные тесты.
Одновременно Heroku поднимает стенд в review разделе pipeline.

Пример PR: https://github.com/bakoushin/shri-node/pull/6

Пример интеграции: https://travis-ci.org/bakoushin/shri-node/builds/359501065

Развернутый стенд: https://shri-node-staging-pr-6.herokuapp.com/

Была идея разворачивать стенд также из Travis CI. После эксперимента от неё было решено отказаться в пользу штатной интеграции, т.к. у нее есть несколько преимуществ:

1. В интерфейсе Heroku отображается ссылка на PR.
2. В интерфейсе GitHub отображается ссылка на стенд (пример: https://github.com/bakoushin/shri-node/pull/6).

Big thanks
----------

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).

SauceLabs позволяет производить кроссбраузерное интеграционное тестирование прямо в Travis CI. [Бесплатно](https://saucelabs.com/open-source) для опенсорс проектов.
