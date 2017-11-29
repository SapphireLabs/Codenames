## Table of Contents
- [File Structure](#file-structure)
- [Reactive Programming with RxJS and redux-observable](#reactive-programming-with-rxjs-and-redux-observable)
- [React/Redux Libraries](#react-redux-libraries)
- [Testing](#testing)
- [Useful Links](#useful-links)
- [Setting Up Apricot with Node Server (local development)](#setting-up-apricot-with-node-server-local-development)
- [Running Node/NPM Commands](#running-node-npm-commands)

## File Structure
Organize by feature, create strict module boundaries, and avoid circular dependencies

***Modules and Components***
- **api** - API calls to Express back-end
- **common** - shared components and modules (layout, socket events)
- **menu** - start menu, create game, and join game
- **lobby** - waiting lobby to assign teams and start game when all players are ready
- **game** - word board with spymaster chat, and separate team chats
- **utils** - utility functions

## Reactive Programming with RxJS and redux-observable
See [rxjs](docs/rxjs.md) docs.

## React/Redux Libraries
- [react-router](https://reacttraining.com/react-router/)
- [reselect](https://github.com/reactjs/reselect)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [redux-observable](https://redux-observable.js.org/)

## Testing
- Minimal component tests - verify component actually renders
  - Verify important callbacks are triggered via spies
  - Test certain number of items are rendered when passing in certain props
  - Do not test React itself - implementation details like tags, elements, or attributes tend to change often
  - Avoid putting logic inside a component - they should simply render a given input
- Testing reducers
  - Use action creators when creating the action for the reducer under test, so we don't need to explicitly test any action creators
- Test Async Action Creators, in cases such as Redux-Thunk, by mocking the store or mocking a specific call. See [Redux Docs](http://redux.js.org/docs/recipes/WritingTests.html)
- Test redux-observable Epics directly by injecting a mock API into the epic. See [redux-observable issue #194](https://github.com/redux-observable/redux-observable/issues/194)
- Services and utility functions should be fully tested

## Useful Links
- [Organizing Redux Applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/)
- [Some Thoughts on Testing React/Redux Apps](https://medium.com/javascript-inside/some-thoughts-on-testing-react-redux-applications-8571fbc1b78f)
- [RxJS + Redux + React Video](https://www.youtube.com/watch?v=AslncyG8whg)

## Getting Started
```
docker-compose up
```

### Running Node / NPM Commands
It's best to use Docker when running commands (instead of a local version).
Basically all that needs to be done is prepend whatever command you want with the following:
```
docker-compose exec node
```
then together:
```
docker-compose exec node npm install
or
docker-compose exec node npm run test
```

If for whatever reason the node service cannot start but you need to run a command then use _run_.
```
docker-compose run node npm install
```
> Use this sparingly as it creates another instance of this container instead of executing a command in an existing instance.
