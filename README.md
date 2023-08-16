# test-beautiful-form

### Задача

1. Реализовать удобную и красивую форму аутентификации через почту и пароль.
2. Не использовать библиотеки.
3. Замокать [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) для эмуляции работы сервера.
4. Результат выложить на [GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages).

### Установка и запуск

Установка пакетов

```bash
npm i
```

Запуск приложения

```bash
npm start
```

### Возможности приложения

1. `Sign Up`

   Регистрация нового пользователя и последующий вход на страницу пользователя.

2. `Sign In`

   Вход на страницу пользователя.

3. `Ping`

   Отправка пустого запроса на бекенд и получение случайной строки в ответе.

4. `Sign Out`

   Выход.

### Язык проекта

Основным языком проекта является [TypeScript](https://www.typescriptlang.org/).

### Стили

Основные инструменты для стилизации

- [Sass (SCSS)](https://create-react-app.dev/docs/adding-a-sass-stylesheet)
- [CSS modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)
- [Inline styles](https://legacy.reactjs.org/docs/faq-styling.html#can-i-use-inline-styles) используется когда значение стиля можно получить только в процессе выполнения приложения.

Именование классов

- Элемент разметки получает основной класс в стиле `PascalCase`.
- Помимо основного класса, элемент разметки может получить любое кол-во дополнительных модифицирующих классов в стиле `_camelCase`.
- Как обычно, классы можно объединять в цепочки.

Например, следующие стили

```scss
.Button {
  background: green;

  &_loading {
    opacity: 0.5;
  }

  &_hidden {
    display: none;
  }

  /* ... */
}
```

можно представить так

```ts
import styles from './Button.module.scss'

const Button = () => {
  const className = `${styles.Button} ${styles.Button_loading} `

  return (
    <button type='button' className={className}>
      Click
    </button>
  )
}
```

### Тесты

Ещё в работе...

### Файловая структура

Файлы и папки хранятся в соответствии с требованиями [create-react-app](https://create-react-app.dev/docs/folder-structure).

Если папка может рассматриваться как самостоятельный модуль, то такая папка включает `index` файл для определения экспортов доступных для данного модуля. В остальных случаях, папка просто используется для группировки других файлов и папок.

В отдельных файлах модуля также могут храниться: типы, константы, вспомогательные функции, и др.

### Frontend & backend

Проект одновременно включает код фронтенда, а также минимальный и достаточный объём кода для эмуляции работы бекенда.

Весь код бекенда хранится в папке `_mocks`. Остальной код принадлежит фронтенду.

И фронтенд и бекенд совместно используют `localStorage` для хранения данных между сеансами. Утилита `src/utils/LocalStorageItem` предоставляет обёртку, которая упрощает работу с `localStorage`.

В папке `src/api` хранится тип `Schema`. Этот тип описывает исчерпывающий контракт о взаимодействии фронтенда с бекендом.

### Перехват ошибок

Перехватчики ошибок размещаются на двух уровнях

1. Перехватчики ошибок которые перехватывает `React` (хранятся в папке `src/errors`)
2. Любые неперехваченные ошибки будут перехвачены `глобально` (хранятся в файле `settings/applyGlobalErrorCatching`)

### Глобальные настройки

В папке `src/settings` хранятся настройки, которые применяются глобально ко всему проекту. Каждая настройка выделена в отдельную функцию и вызывается один раз из файла `src/index.tsx`.

### ФП | ООП

Весь React-код написан в стиле ФП (исключая [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) в папке `src/errors`, т.к. сейчас React не предоставляет аналогичную возможность в стиле ФП).

Стиль ООП используется в случаях

- Если инструмент предполагает создание экземпляров с внутренним состоянием, и методы для управления состоянием.
- Если требуются возможности ООП которых нет в ФП.

### Interface | Type

В проекте используются [рекомендации из официальной документации TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).
