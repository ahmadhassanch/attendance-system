<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [SETTING UP ENVIRONMENT VARIABLES](#setting-up-environment-variables)
  - [RESET DATABASE AND GENERATE CLIENT](#reset-database-and-generate-client)
  - [SEEDING DATABASE](#seeding-database)

## SETTING UP ENVIRONMENT VARIABLES

Copy these files(.env, env.conf) from this path `./scripts/config/ahmad` to root directory(charms-rms-backend).

This setup ups the environment variables for `database`, etc., for more details please refer to [Readme](./README.md)

To run on flutter find your ipaddress and paste it in first line of env.conf only

## RESET DATABASE AND GENERATE CLIENT

Make sure your datbase and phpMyAdmin are running. Delete code-craft using phpMyAdmin.
Delete the prisma/migration directory.

Now generate client and migrate database using following

```bash
yarn prisma generate
yarn prisma migrate dev

```

## SEEDING DATABASE

To seed the database with users and charms data, just use:

```bash
$ yarn data:reset
```

```bash
"data:reset": "time ./scripts/data-reset.sh",
```

Now run the server

```bash
$ yarn start:dev
```

To run all workflows, use

```bash
$ yarn run:workflows
```

Please note that this deletes data selectively (does not delete CHAMRS data)

> Please note that to populate the database with CHARMS data, you don't need to run the server (since it uses prisma directly). But to run workflows, you need to run the server also since it calls APIs directly.

## Debugging NestJs apps

- To debug the app, add the following debug configuration to `launch.json`.
- For auth token related debugging using swagger, will need to use the top `Authorize` button, and put the login token there.

```json
{
  "type": "node",
  "request": "launch",
  "name": "Nest Debug",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "start:debug", "--", "--inspect-brk"],
  "console": "integratedTerminal",
  "restart": true,
  "protocol": "auto",
  "port": 9229,
  "autoAttachChildProcesses": true
}
```
