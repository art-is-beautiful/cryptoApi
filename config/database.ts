module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    logging: false,
    ssl: false,
    entities: ['src/**/entities/*.ts'],
    migrations: ['./build/migrations/*.js'],
    cli: {
      migrationsDir: './migrations',
    },
  };