# Lark

A Drupal administration theme.

[![Mobomo](https://circleci.com/gh/mobomo/lark.svg?style=shield)](https://app.circleci.com/pipelines/github/mobomo/lark)


## Contributing

This project tracks changes and adjustments in the `develop` branch. Compiled
release branches are created and pushed to [Drupal.org](http://drupal.org/project/lark).

### Requirements

1. gulp-cli
2. node (>= 12.18.0)

### Compiling

To build the Lark theme run:

```bash
npm run build
```

To have the task runner watch for changes and recompile itself run:

```bash
npm run watch
```

### Linting

To check code style against the project standards run:

```bash
npm run lint
```

The `build` and `watch` tasks both include the `lint` task.
