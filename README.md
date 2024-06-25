# Minesweeper
This project demonstrates headless components and the separation of responsibility between logic and rendering. The implementation is entirely in React, so the state is managed in the `useGrid` hook. The App component uses the hook to render a grid of cells.

### Headless components
To take it a step further, one could convert `useGrid` to a framework-agnostic headless component and create an adapter to expose the functionality in a React hook (or another pattern for any other framework). My favorite example of this pattern is [TanStack Table](https://tanstack.com/table/).

## Tools used
- [Vite](https://vitejs.dev/) - bundler + development server
- [React](https://react.dev/) - JS library
- [React Router](https://reactrouter.com/) - client-side routing
- [Bootstrap 5 and React-Bootstrap](https://getbootstrap.com/) - CSS framework and supporting React components

## Quick start
Prerequisite: requires [Node.js](https://nodejs.org/) to use the `npm` command line tool. I recommend using [nvm-windows](https://github.com/coreybutler/nvm-windows) to install Node.

To run this project:\
`npm install`\
`npm run dev`
