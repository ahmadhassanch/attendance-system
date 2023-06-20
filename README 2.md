<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Setting up environment variables](#setting-up-environment-variables)
    - [Basic Environment](#basic-environment)
    - [Tenant Configuration](#tenant-configuration)
  - [Prisma Migrations](#prisma-migrations)
    - [Baselining your database](#baselining-your-database)
    - [Applying a new migration](#applying-a-new-migration)
    - [Applying all migrations](#applying-all-migrations)
- [Running the app](#running-the-app)

# Installation

Run in root directory:

```bash
$ yarn install
```

## Setting up environment variables

### Basic Environment

Create a `.env` file in the root directory of the repository and add the following lines:

```
DATABASE_URL=mysql://<username>:<password>@<host-address:port>/<db-name>
URL_PREFIX=<url-prefix>
AUTH_COOKIE_SECRET=<your-secret>
JWT_SECRET=<your-secret>

LOG_QUERIES=<0 or 1>
LOG_REQUESTS=<0 or 1>

SMS_ENABLED=<0 or 1>
SMS_LOGIN_ID=<login-id-for-Zong>
SMS_PASSWORD=<zong-password>

SMS_METHOD=<eclinic or bizsms or twilio>

TWILIO_ACCOUNT_SID=<twilio-sid>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
TWILIO_PHONE_NUMBER=<twilio-phone-no>

NOTIFICATION_SERVER_URL=<host-address-for-notification-server>
SEND_NOTIFICATIONS=<0 or 1>

```

E.g.

```
DATABASE_URL=mysql://root:1234@localhost:3306/rms-backend
URL_PREFIX=rms/v1
AUTH_COOKIE_SECRET=secret-time
JWT_SECRET=secret

LOG_QUERIES=0
LOG_REQUESTS=1

SMS_ENABLED=<0 or 1>
SMS_LOGIN_ID=<login-id-for-Zong>
SMS_PASSWORD=<zong-password>

SMS_METHOD=eclinic

TWILIO_ACCOUNT_SID=AC5c67e60cf55127c7b88ef3c40cd8e766
TWILIO_AUTH_TOKEN=eb35ba5bf30fba957d85ee6029bc0a9b
TWILIO_PHONE_NUMBER=+16206341741

NOTIFICATION_SERVER_URL=https://dev01.cognitivehealthintl.com
SEND_NOTIFICATIONS=0

SEND_CALL_DATA=1
CALL_SERVER_URL=http://localhost:8084
```

Remember, the `DATABASE_URL` environment variable should refer to your dev database and is only present for use with the Prisma CLI. To see how to configure the database(s) you wish to use when running the server, see Tenant Configuration below.

Of special importance is the `URL_PREFIX` environment variable. This is the string which shall be applied as a global prefix to **all** routes in the server. For example, if `URL_PREFIX` contains `"rms/v2"`, a controller mapped to the route `"/patients"` will be routed at runtime to `"/rms/v2/patients"`.

The value of `URL_PREFIX`, when not set, defaults to `"rms/v1"`. Leading or trailing slashes must **not** be applied.

**Note (optional reading):** The purpose of this variable is to simplify API versioning. More fine-grained control may be gained by shortening this value and prepending it instead to all relevant controllers. However, this approach is recommended against except in the greatest need due to the manual work and potential for bugs it introduces. Perhaps a better alternative may be to use multiple prefix environment variables, and, instead of using `app.setGlobalPrefix()`, prepend it to each controller's route.

### Tenant Configuration

This application is designed to be multi-tenant. That is, multiple users will use a single deployment, with the services provided being distinguished by the host address.

A tenant configuration file needs to be added for this. Create `env.conf` in the root directory of the repository as follows:

```
[<host-address>]

SITE_CODE=qa
BASE_URL=http://<host-address>
AUTH_COOKIE_NAME=<cookie-name>

# DATABASE
DB_HOST_MAIN=<db-host>:<db-port>
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
DB_DEBUG=0 or 1

# Data
DATA_STORAGE_ROOT=<directory-store-uploaded-files>
```

E.g.

```
[localhost:3000]

SITE_CODE=qa
BASE_URL=http://localhost:3000
AUTH_COOKIE_NAME=_qa_

# DATABASE
DB_HOST_MAIN=localhost:3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=rms-backend
DB_DEBUG=0

# Data
DATA_STORAGE_ROOT=uploads
```

Copy paste the above as many times as you wish to serve multiple tenants. Make sure to update their host addresses and environment details accordingly.

## Prisma Migrations

Prisma migration tools are used to manage the database for this repository. This requires prisma to maintain a record of past migrations, which must be in sync with the database.

### Baselining your database

The following command is used to baseline a database.

```bash
$ yarn prisma migrate resolve --applied <migration-name>
```

This step is not required to work in this repository, and has been left in purely for educational purposes.

### Applying a new migration

To make any modification to the database after having baselined it, simply update the prisma schema as desired. Next, stage your migration using:

```bash
$ yarn prisma migrate dev --name <migration-name> --create-only
```

This will generate the appropriate migration files and sql required, but will **not** apply the migration to your database. If you wish, you can inspect and edit the generate files at this point (in case you need to insert data into a new column, for example). Finally, once you are satisfied that this is the migration you wish to apply, use the following command:

```bash
$ yarn prisma migrate dev
```

See [Prisma's custom migration instructions](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations) for more information.

### Applying all migrations

When deploying to production/making a new deployment, you will want
to deploy all migrations created uptil now after successfully
baselining your database. To do this, run the following command:

```bash
$ yarn prisma migrate deploy
```

# Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

The app is hosted at `localhost:3000`. Go to [Swagger http://localhost:3000/rms/v1/swagger](http://localhost:3000/rms/v1/swagger) to view documentation of endpoints.
