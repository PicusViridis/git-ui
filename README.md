# Git UI

Git UI is a minimal UI for Git.

## Installation

### With Docker

`docker pull saramorillon/git-ui:latest`

### With docker-compose

You can use the [docker-compose.yml](./docker-compose.yml) provided as an example.

### Using source code (production)

-   Download the latest release of git-ui
-   Install packages using command `yarn install --production`
-   Make sure that your system is configured with the appropriate environment variables (see below)
-   Run project using command `yarn start`

### Using source code (development)

-   Download the latest release of git-ui
-   Install packages using command `yarn install`
-   Rename [.env.template](./.env.template) to `.env` and fill it with appropriate values
-   Run project using command `yarn start:dev`

## Running Git UI

Git UI listens to port 3000

The default credentials are admin/admin.

Make sure that `git` is installed on your server as git command are used by the backend (git is installed by default in the Dockerfile).

## Environment variables

| Variable    | Value type                     | Description                     |
| ----------- | ------------------------------ | ------------------------------- |
| NODE_ENV    | development \| production      | Environment of the application  |
| APP_KEY     | string                         | App key for session             |
| COOKIE_NAME | string                         | Cookie name for storing session |
| LOG_LEVEL   | debug \| info \| warn \| error | Level of the loger              |
