# test-beautiful-form

### Идея

1. Реализовать форму аутентификации через почту и пароль.
2. Не использовать библиотеки компонентов.
3. Замокать [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) для эмуляции работы сервера.
4. Обеспечить высокую скорость работы приложения (сетевые запросы эмулируются с задержкой 1 сек.).
5. Обеспечить высокую надёжность работы приложения 🛡💪
6. Результат выложить на [GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages).

### Результат

[> Test beautiful form <](https://ekb1zh.github.io/test-beautiful-form/)

### Установка и запуск

Установка пакетов

```bash
npm i
```

Запуск приложения

```bash
npm start
```

Запуск тестов 🛡💪

```bash
npm test
```

> Покрытие тестами реализовано пока не полностью. Работы продолжаются.

### Возможности приложения

1. `Sign Up`

   Регистрация нового пользователя и вход на страницу пользователя.

2. `Sign In`

   Вход на страницу пользователя.

3. `Ping`

   Отправка пустого запроса на бекенд и получение случайной строки в ответе.

4. `Sign Out`

   Выход.

### Язык проекта

Основным языком проекта является [TypeScript](https://www.typescriptlang.org/) 🛡💪

### Стили

Инструменты для стилизации

- [Sass (SCSS)](https://create-react-app.dev/docs/adding-a-sass-stylesheet) для продвинутого синтаксиса
- [CSS modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) для инкапсуляции стилей
- [Clsx](https://github.com/lukeed/clsx) для объединения классов
- [Inline styles](https://legacy.reactjs.org/docs/faq-styling.html#can-i-use-inline-styles) для добавления стиля, значение которого можно получить только в процессе выполнения приложения.

> Для наглядности, скоро будет создан клон этого приложения с использованием [styled-components](https://styled-components.com/).

### Файловая структура

Файлы и папки хранятся в соответствии с требованиями [create-react-app](https://create-react-app.dev/docs/folder-structure).

Если папка является модулем, то такая папка включает `index` файл для определения экспортов доступных для данного модуля. В остальных случаях, папка просто используется для группировки других файлов и папок.

### Фронтенд и бекенд

Проект одновременно включает код фронтенда, а также минимальный и достаточный объём кода для эмуляции работы бекенда.

Весь код бекенда хранится в папке `_mocks`. Остальной код принадлежит фронтенду.

И фронтенд и бекенд совместно используют `localStorage` для хранения данных между сеансами пользователя. Утилита `src/utils/LocalStorageItem` предоставляет обёртку, которая упрощает работу с `localStorage`.

В папке `src/api` хранится тип `Schema`. Этот тип описывает исчерпывающий контракт о взаимодействии фронтенда с бекендом. Нарушение условий контракта с любой стороны, немедленно приведёт к ошибке компиляции проекта 🛡💪

### Перехват ошибок

Перехватчики ошибок размещаются на двух уровнях:

1. Перехват на уровне `React` (`ErrorBoundary`)
2. Любые неперехваченные ошибки будут перехвачены `глобально` (`applyGlobalErrorCatching`)

Оба перехватчика включены в файле `src/index.tsx` 🛡💪

### Глобальные настройки

В папке `src/settings` хранятся настройки, которые применяются глобально ко всему проекту. Каждая настройка выделена в отдельную функцию и вызывается один раз из файла `src/index.tsx`.

### ФП и ООП

Практически весь код написан в стиле ФП.

Стиль ООП используется в следующих случаях:

- Если инструмент предполагает создание экземпляров с внутренним состоянием, и методы для управления этим состоянием.
- Если требуются возможности ООП которых нет в ФП.

### Interface и type

В проекте используются [рекомендации из официальной документации TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

### Проверка кода

В файле `.lintstagedrc.mjs` описаны проверки, которые выполняются перед каждым коммитом 🛡💪
