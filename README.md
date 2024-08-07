# Quizy

Quiz app to create and resolve quizzes

## Deploy

[quizy-pin.netlify.app/](https://quizy.college/)

## Description

In 'Quizy' is implemented firebase to save the quizzes that have been created in it, also to consume the firebase server to resolve the diferent quizzes. When you create a quiz, should at least have the author, the title, the description, the theme and one question, also que questions cannot have less than 2 answers. The main banner of the app is a forest that show a parallax effect (made with "react-scroll-parallax").

## Libraries

- [Create React App][cra] - Project setup
- [React Router][router] - Routing and navigation
- [react-scroll-parallax][parallax] - Parallax scrolling effect
- [Sass][ss] - Organized design
- [Bootstrap][bts] -  Project design

## Scripts

- `npm start`
    Start the project in the development enviroment.
- `npm build`
    Build the project for production.
- `npm test`
    Start the project and run tests.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org)

## Contact

- https://twitter.com/SimonPine2
- simonpineda0521@gmail.com
- https://www.linkedin.com/in/simon-pineda-0b8abb251

## Folder Structure

- `src`: Contains all the source code.
    - `components`: General components used across the app.
    - `views`: Specific components organized by view.
    - `context`: React context providers.
    - `scss`: Design components.
    - `router`: The navigation of the app.
- `App.js`: Main component.

[deploy]: https://quizy-pin.netlify.app/
[status]: https://api.netlify.com/api/v1/badges/a253097a-2925-4d33-bb21-7eb6cf663ab0/deploy-status
[netlify]: https://app.netlify.com/sites/quizy-pin/deploys
[cra]: https://github.com/facebook/create-react-app
[router]: https://github.com/remix-run/react-router
[ss]: https://sass-lang.com/
[parallax]: https://react-scroll-parallax.damnthat.tv/docs/intro
[bts]: https://getbootstrap.com/
