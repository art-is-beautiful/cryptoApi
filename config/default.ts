import 'dotenv/config';


export = {
    server: {
        baseUrl: process.env.SERVER_BASE_URL,
        port: process.env.SERVER_PORT || 3002,
    },
    basePath: '/',
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: false,
        logging: false,
        ssl: false,
        entities: ['src/**/entities/*.ts', 'build/src/**/entities/*.js'],
        migrations: ['./build/migrations/*.js'],
        cli: {
            migrationsDir: './migrations',
        },
    }
};