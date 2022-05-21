import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-joi-router';
import * as bodyParser from 'koa-body';
import * as config from 'config';
import * as cors from '@koa/cors';
import { SwaggerAPI } from 'koa-joi-router-docs';
import { koaSwagger } from 'koa2-swagger-ui';
import { createConnection } from 'typeorm';
import cryptoRouter from './crypto/router';


const databaseConfig: any = config.get('database');

createConnection(databaseConfig)
    .then(async () => {

        const app = new Koa();
        const router = Router();

        const docsRouter = Router();
        const generator = new SwaggerAPI();

        generator.addJoiRouter(cryptoRouter);

        const spec = generator.generateSpec(
            {
                info: {
                    title: 'Crypto API',
                    description: 'Documentation for Crypto APIs',
                    version: '0.0.1',
                },
                basePath: config.get('basePath'),
                tags: [
                    {
                        name: 'crypto',
                        description: 'Group of API for crypto routes',
                    }
                ],
            },
            {
                defaultResponses: {},
            }
        );

        app.use(
            koaSwagger({
                routePrefix: '/docs',
                hideTopbar: true,
                swaggerOptions: {
                    url: `${config.get('server.baseUrl')}/api.json`,
                },
            })
        );

        docsRouter.get('/api.json', async (ctx) => {
            ctx.body = JSON.stringify(spec, null, '  ');
        });

        router.get('/health', async (ctx) => {
            ctx.body = 'OK';
        });

        app.use(cors());
        app.use(
            bodyParser({
                multipart: true,
                urlencoded: true,
            })
        );

        router.use(cryptoRouter.middleware());

        app.use(router.middleware());
        app.use(docsRouter.middleware());

        app.listen(process.env.PORT, () => {
            console.log(`Running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => console.log(error));