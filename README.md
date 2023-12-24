### Idea

1. Implement an authentication form through email and password.
2. Do not use component libraries.
3. Mock [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to emulate server operation.
4. Ensure the high speed of the application.
5. Ensure high reliability of the application 🛡💪
6. Post the result on [GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages).

### Result

[> Test beautiful form <](https://ekb1zh.github.io/test-beautiful-form/)

### Installation and launch

Installing packages

```bash
npm i
```

Launching the application

```bash
npm start
```

Running tests, lints and formatter 🛡💪

```bash
npm test
```

> Tests is not fully implemented yet. Work continues.

### Application features

1. `Sign Up`

   Registering a new user and entering the user page.

2. `Sign In`

   Login to the user page.

3. `Ping`

   Sending an empty request to the backend and getting a random string in the response.

4. `Sign Out`

   Exit.

### Project language

The main language of the project is [TypeScript](https://www.typescriptlang.org/) 🛡💪

### Styles

Styling tools.

- [Sass (SCSS)](https://create-react-app.dev/docs/adding-a-sass-stylesheet) for advanced syntax
- [CSS modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) for style encapsulation
- [Clsx](https://github.com/lukeed/clsx) for combining classes
- [Inline styles](https://legacy.reactjs.org/docs/faq-styling.html#can-i-use-inline-styles) to add a style whose value can only be retrieved during application execution.

Naming of classes.

Project uses implicit BEM.

- B (block) - `.scss` file name (adding automatically on the compile time).
- E (element) - className defined on the top level of `.scss` file (`PascalCase` as like in examples in [create-react-app](https://create-react-app.dev/docs/adding-a-stylesheet/)).
- M (modifier) - className nested inside of element (`camelCase`).
- Hash - add automatically on the compile time.

The result className will be looks like this:

`Input_Root_disabled__aw4S2`

### File structure

Files and folders are stored as required by [create-react-app](https://create-react-app.dev/docs/folder-structure).

If the folder is a module, then that folder includes an `index` file to define the exports available for that module. Otherwise, the folder is simply used to group other files and folders.

### Frontend and backend

The project simultaneously includes the frontend code, as well as the minimum amount of code required to emulate the backend.

All API code is stored in `src/api` folder (`src/api/back` for backend, `src/api/front` for frontend).

The `src/api/schema` folder contains types that describes a comprehensive contract about how the frontend interacts with the backend. Violation of the terms of the contract from any side will immediately lead to a compilation error of the project 🛡💪

Both the frontend and backend share `localStorage` to store data between user sessions. The `src/utils/LocalStorageItem` utility provides a wrapper that makes working with `localStorage` easier.

### Split UI and logic.

The project uses pattern `ui-logic`.

Every component define `useLogic` hook with all logic of component. This hook prepare props for everything inside of component file. This pattern makes more simple read, refactoring and testing.

### Paths

The project uses absolute paths.

### Error catching

Error interceptors are located at two levels:

1. Interception at the `React` level (`ErrorBoundary`)
2. Any uncaught errors will be caught `globally` (`applyGlobalErrorCatching`)

Both interceptors are included in the `src/index.tsx` file 🛡💪

### Global settings

The `src/settings` folder stores settings that apply globally to the entire project. Each setting is separated into a separate function and is called once from the `src/index.tsx` file.

### FP and OOP

Almost all code is written in FP style.

The OOP style is used in the following cases:

- If the tool involves creating instances with internal state, and methods to manage this state.
- If OOP features are required that are not in the FP.

### Interface and type

The project uses [recommendations from the official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

### Code checks

The `.lintstagedrc.mjs` file describes the checks that are performed before each commit 🛡💪
