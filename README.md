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

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][https://saucelabs.com]

SauceLabs позволяет производить кроссбраузерное интеграционное тестирование прямо в Travis CI. [Бесплатно](https://saucelabs.com/open-source) для опенсорс проектов.

<img width="250" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 166 54'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bisolation:isolate;%7D.cls-2%7Bopacity:0.15;mix-blend-mode:multiply;%7D.cls-3%7Bfill:%23fff;%7D.cls-4%7Bfill:%23e1251b;%7D.cls-5%7Bfill:%23474c55;%7D.cls-6%7Bfont-size:6.14px;fill:%23484c55;font-family:MuseoSans-500, Museo Sans;letter-spacing:0.18em;%7D.cls-7%7Bletter-spacing:0.18em;%7D.cls-8%7Bletter-spacing:0.17em;%7D.cls-9%7Bletter-spacing:0.18em;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3EPowered by Sauce Labs badges white%3C/title%3E%3Cg class='cls-1'%3E%3Cg id='white'%3E%3Cimage class='cls-2' width='172' height='60' transform='translate(-3 -3)' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAAA8CAYAAAD7V1GbAAAACXBIWXMAAAsSAAALEgHS3X78AAADB0lEQVR4Xu3dTU/bQBCH8WcDAURBVV8OiPbS7/+9qh4KKm9RISHTw+w4G9tBreSkGun/k1aAndweLWtfppgZY0opZfSGyAHYjjBL/3oNNWJtfxc5BKsLvNutQLtgmx11NrJA4cp+RZjrkdXtuMe9L83qtXmzjlG0sl9trCtg2axVvQ7UYOvuGrGeAufAu7pO2USrYGUfjE2sz8BTXYt6f1VKWZuZxQ4bwc7xWD8Cn+rPSzzaI3SmlenFmfUVj/UBuAVu6v04Fhhgx72z6xy4AD4DX4FrPNrzei+OBiJTWuP//hd4rN/xjfEFj3gJvJZSyls77DXwDbjCd9kTdCyQ6cVx4AXfXX/U6wvgF3DPprvBkSDOsBd4tFfAF+A9cIaClelFsL+Bu3rtDm9w8Py06y1BPHhd4rF+YPscKzKV9vwKvqOesx1rpw02HqhmeJhz/BhwWtcZClamF8GCd3aCt3fEZmftmuvvsLCJto23XQpWphTvYKOvtr1Ba2PBhvLGEpnSXzem11SSioKVVBSspKJgJRUFK6koWElFwUoqClZSUbCSioKVVBSspKJgJRUFK6koWElFwUoqClZSUbCSioKVVBSspKJgJRUFK6koWElFwUoqClZSUbCSioKVVBSspKJgJRUFK6koWElFwUoqClZSUbCSioKVVBSspPLWjAPbsUSm9E+djQUbg77i52uzQEM5ZFox9ihW294g3DbYKDsiXbKZ9RlDvzT2SKbWDpZ7xptbsh1vF25/h21HgC/w2Z8xTlGjO2Uf+qM7H/D2nvEW1+2HI9j+vPpHfKpyDKq9R8ORZT/GhiPf4g220RoMg+2PAAevXuPnZZ/G2rutfy9pgzUzK6WU5kuPwM/6gSd8QHI7GFk7rEwpzqhxjn3AY73BW4xgMTPbtcNSv3zHyAhwkYn1j6RPdQ122GLmD2B1l53hcc6b1Y4AV7CyD/EWIKJdNmsFrK2GuustQey2MxSrHEYbbX91uh22u+A7bcSpM6scWvve1awX6CDY7oaHK/Jf9EMNfwC26Q1uGODl8wAAAABJRU5ErkJggg=='/%3E%3Crect class='cls-3' x='3' y='3' width='160' height='48' rx='3' ry='3'/%3E%3Cpath class='cls-4' d='M13.33,36.05a8,8,0,0,1-.54-2.92A8.17,8.17,0,0,1,21,25a8.77,8.77,0,0,1,1.15.08l-.92.93h-.25a7.15,7.15,0,0,0-6.88,9.1h6.26L17.7,40,24,33.62h-8.6L25.09,24a9.94,9.94,0,0,0-4.15-.9,10.07,10.07,0,0,0-5.25,18.66l3-5.67Z'/%3E%3Cpath class='cls-4' d='M26.19,24.54l-3,5.67h5.37a8.15,8.15,0,0,1-7.61,11.07,9.39,9.39,0,0,1-1.19-.08l.91-.92h.28a7.15,7.15,0,0,0,7.15-7.15,7.83,7.83,0,0,0-.27-1.94H21.57l2.61-4.93-6.42,6.39h8.62L16.8,42.31a10.07,10.07,0,0,0,9.39-17.77Z'/%3E%3Cpath class='cls-5' d='M36,39.35l.86-1.27a.44.44,0,0,1,.69-.09,4.09,4.09,0,0,0,2.76,1.16,1.94,1.94,0,0,0,2-1.89c0-1-.66-1.62-1.91-2.44-1.46-1-3.2-2.22-3.2-4.44s1.54-4.62,5-4.62a6.11,6.11,0,0,1,4,1.44.63.63,0,0,1,.06.89l-.86,1.22c-.18.27-.47.29-.78.05a3.67,3.67,0,0,0-2.51-1,1.82,1.82,0,0,0-1.89,1.73c0,.89.6,1.33,1.93,2.22s3.42,2.2,3.42,4.64c0,2.6-2,4.78-5.3,4.78A6.21,6.21,0,0,1,36,40C35.86,39.88,35.75,39.68,36,39.35Z'/%3E%3Cpath class='cls-5' d='M46.92,41l8.35-15a.42.42,0,0,1,.38-.24h.2a.32.32,0,0,1,.31.24l4.09,15a.44.44,0,0,1-.42.58H57.9c-.34,0-.52-.12-.58-.45l-.56-2.46H51.23l-1.29,2.46a.79.79,0,0,1-.71.45h-2C46.88,41.53,46.77,41.24,46.92,41Zm9.13-4.73-1-4.84h0l-2.42,4.84Z'/%3E%3Cpath class='cls-5' d='M64.51,26.4A.51.51,0,0,1,65,26h2.2a.35.35,0,0,1,.33.42l-1.33,9.35a3.54,3.54,0,0,0,0,.71,2.09,2.09,0,0,0,2.27,2.36c1.82,0,2.84-1.18,3.11-3l1.33-9.37a.47.47,0,0,1,.44-.42h2.2a.37.37,0,0,1,.34.42l-1.36,9.51c-.47,3.37-2.82,5.84-6.28,5.84a4.81,4.81,0,0,1-5.07-5,6.94,6.94,0,0,1,.07-.89Z'/%3E%3Cpath class='cls-5' d='M86.5,25.76a6,6,0,0,1,4.62,2.11.46.46,0,0,1-.09.62l-1.2,1.15a.49.49,0,0,1-.73,0,4,4,0,0,0-2.75-1.11c-2.67,0-5,2.76-5,5.93,0,2.36,1.27,4.38,3.4,4.38a4.6,4.6,0,0,0,3-1.31c.29-.25.53-.2.71,0L89.68,39a.53.53,0,0,1-.11.6,7.11,7.11,0,0,1-5,2.16c-3.84,0-6.33-3.09-6.33-6.91C78.22,29.62,81.9,25.76,86.5,25.76Z'/%3E%3Cpath class='cls-5' d='M95.3,26.4a.47.47,0,0,1,.42-.42h8.22a.35.35,0,0,1,.33.42L104,28.22a.47.47,0,0,1-.44.43H97.87l-.51,3.64h4.71a.36.36,0,0,1,.33.42l-.26,1.84a.49.49,0,0,1-.45.42H97l-.55,3.89h5.71c.22,0,.33.2.31.42l-.25,1.82a.47.47,0,0,1-.44.43H93.54a.34.34,0,0,1-.31-.43Z'/%3E%3Cpath class='cls-4' d='M109.56,26.4A.49.49,0,0,1,110,26h1a.37.37,0,0,1,.34.42L109.36,40H115a.35.35,0,0,1,.31.42l-.09.64a.49.49,0,0,1-.44.43h-7a.36.36,0,0,1-.33-.43Z'/%3E%3Cpath class='cls-4' d='M117.15,41l8.2-15a.42.42,0,0,1,.37-.24h.2a.32.32,0,0,1,.31.24l4,15a.47.47,0,0,1-.42.58h-.94a.32.32,0,0,1-.33-.25l-.89-3.66h-6.93l-1.89,3.66a.47.47,0,0,1-.42.25h-1C117.11,41.53,117,41.24,117.15,41Zm10-4.71L125.44,29h-.14l-3.8,7.28Z'/%3E%3Cpath class='cls-4' d='M140.94,33.71a3.37,3.37,0,0,1,1.88,3,4.67,4.67,0,0,1-5,4.8h-4.6a.36.36,0,0,1-.33-.43L135,26.4a.51.51,0,0,1,.45-.42h4.42a3.42,3.42,0,0,1,3.57,3.53,4.44,4.44,0,0,1-2.46,4.13ZM138.14,40A3,3,0,0,0,141,36.88a2.33,2.33,0,0,0-2.38-2.39h-3.11L134.7,40Zm.67-7.09c1.64,0,2.7-1.31,2.7-3.26,0-1.29-.66-2.18-1.95-2.18H136.5L135.72,33Z'/%3E%3Cpath class='cls-4' d='M145.56,39.19l.35-.37c.27-.27.45-.36.71-.11a4.32,4.32,0,0,0,3.29,1.55,2.65,2.65,0,0,0,2.8-2.69c0-1.4-1.05-2.22-2.89-3.28s-3-2-3-4.05c0-1.86,1.17-4.48,4.81-4.48a5.7,5.7,0,0,1,3.45,1.13c.11.09.31.33,0,.76l-.25.35c-.22.31-.44.4-.73.2a4.52,4.52,0,0,0-2.64-.95,2.88,2.88,0,0,0-3,2.79c0,1.25.85,2.07,2.25,2.82,2.13,1.16,3.75,2.25,3.75,4.54,0,2.46-1.78,4.35-4.86,4.35a5.69,5.69,0,0,1-4.16-1.91C145.36,39.68,145.27,39.48,145.56,39.19Z'/%3E%3Ctext class='cls-6' transform='translate(70.41 17.62)'%3ETESTING P%3Ctspan class='cls-7' x='40.52' y='0'%3EO%3C/tspan%3E%3Ctspan x='46.65' y='0'%3EWERED %3C/tspan%3E%3Ctspan class='cls-8' x='76.21' y='0'%3EB%3C/tspan%3E%3Ctspan class='cls-9' x='81.16' y='0'%3EY%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E">