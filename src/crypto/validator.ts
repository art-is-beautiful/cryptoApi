import * as Router from 'koa-joi-router';

const joi = Router.Joi;

class Validators {
    static retrieveListCryptoCurrency: Router.Config = {
        meta: {
            swagger: {
                summary: 'Get list of supported crypto currencies',
                description: 'Add "page" and "limit" as query params. Default "page" = 1, "limit" = 10',
                tags: ['crypto']
            }
        },
        validate: {
            query: joi.object({
                page: joi.number(),
                limit: joi.number()
            }).options({ abortEarly: false }),
        }
    };

    static retrieveWSCryptoCurrency: Router.Config = {
        meta: {
            swagger: {
                summary: 'Get live price for crypto currency',
                description: 'Get live price in node console for crypto currency. Example: "currency1" = BTC, "currency2" = USD',
                tags: ['crypto']
            }
        },
    };

    static createCryptoCurrencyAsset: Router.Config = {
        meta: {
            swagger: {
                summary: 'Save crypto currency name and assetId to database',
                description: 'Save crypto currency name and assetId to database. You can take these fields from list of supported crypto currencies',
                tags: ['crypto']
            }
        },
        validate: {
            type: 'json',
            body: joi.object({
                name: joi.string().required(),
                assetId: joi.string().required()
            }).options({ abortEarly: false }),
        }
    };

    static updateCryptoCurrencyAsset: Router.Config = {
        meta: {
            swagger: {
                summary: 'Update crypto currency name or assetId in database',
                description: 'Update crypto currency name or assetId in database. You can take these fields from list of supported crypto currencies',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required()
            },
            type: 'json',
            body: joi.object({
                name: joi.string(),
                assetId: joi.string()
            }).options({ abortEarly: false }),
        }
    };

    static retrieveCryptoCurrencyAsset: Router.Config = {
        meta: {
            swagger: {
                summary: 'Retrieve crypto currency from database',
                description: 'Retrieve crypto currency from database by param id.',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required()
            }
        }
    };

    static deleteCryptoCurrencyAsset: Router.Config = {
        meta: {
            swagger: {
                summary: 'Delete crypto currency from database',
                description: 'Delete crypto currency from database by param id.',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required()
            }
        }
    };

    static createCryptoCurrencyHistoryPriceExrate: Router.Config = {
        meta: {
            swagger: {
                summary: 'Save exrate for couple crypto currencies with date to database',
                description: 'Save exrate for couple crypto currencies with date to database. Have to specify dateFrom, dateTo and cryptoMainId with cryptoAdditionalId',
                tags: ['crypto']
            }
        },
        validate: {
            type: 'json',
            body: joi.object({
                price: joi.number().required(),
                dateFrom: joi.date().required(),
                dateTo: joi.date().required(),
                cryptoMainId: joi.number().required(),
                cryptoAdditionalId: joi.number().required(),
            }).options({ abortEarly: false }),
        }
    };

    static updateCryptoCurrencyHistoryPriceExrate: Router.Config = {
        meta: {
            swagger: {
                summary: 'Update exrate or date for couple crypto currencies with date to database',
                description: 'Update exrate or date for couple crypto currencies with date to database.',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required(),
            },
            type: 'json',
            body: joi.object({
                price: joi.number(),
                dateFrom: joi.date(),
                dateTo: joi.date(),
            }).options({ abortEarly: false }),
        }
    };

    static retrieveCryptoCurrencyHistoryPriceExrate: Router.Config = {
        meta: {
            swagger: {
                summary: 'Retrieve crypto currency history price from database',
                description: 'Retrieve crypto currency history price from database by param id.',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required()
            }
        }
    };

    static deleteCryptoCurrencyHistoryPriceExrate: Router.Config = {
        meta: {
            swagger: {
                summary: 'Delete crypto currency history price from database',
                description: 'Delete crypto currency history price from database by param id.',
                tags: ['crypto']
            }
        },
        validate: {
            params: {
                id: joi.number().required()
            }
        }
    };
}


export default Validators;