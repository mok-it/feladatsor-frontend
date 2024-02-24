# feladatsor-frontend

A MÖK feladatbeküldő és feladatsor-összeállító rendszere.

## Setup

- Install dependencies: `yarn`
- Run locally: `yarn dev`. The application runs on [http://localhost:5173/](http://localhost:5173/) by default.

## File structure

- src
  - components: reusable React components
  - generated: don't touch this
  - graphql: query and mutation definitions
  - pages: React page components
  - theme: MUI themes
  - util
- functions: Firebase functions

## Code formatting

Install prettier extension for VSCode. See `.prettierrc` for styling configuration.

## Graphql

Use the sandbox at [https://api.febe.anton.areba.hu/graphql](https://api.febe.anton.areba.hu/graphql) to write queries, then copy them into src/graphql/queries or src/graphql/mutations

Names of queries/mutaitons should start with `select`, `insert`, `update` or `delete`, then the entity name e.g. `Exercise`. If the query/mutation handles multiple entities, use plural form.

Examples:

- selectExercises
- insertComment
- selectUsersByRole

After writing graphql, generate hooks and types: `yarn generate`.

## CI/CD

GitHub actions are set to deploy automatically when main brach updates or a PR is opened.
