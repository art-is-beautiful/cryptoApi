import * as Router from 'koa-joi-router';
import CryptoController from './controllers/crypto';
import CryptoPriceHistoryController from './controllers/cryptoPriceHistory';
import Validator from './validator';


const router = Router();
router.prefix('/crypto');

router.get('/assets', Validator.retrieveListCryptoCurrency, CryptoController.retrieveListCryptoCurrency);
router.get('/ws-live/:currency1/:currency2', Validator.retrieveWSCryptoCurrency, CryptoController.retrieveWSCryptoCurrency);

router.post('/api/assets', Validator.createCryptoCurrencyAsset, CryptoController.createCryptoCurrencyAsset);
router.patch('/api/assets/:id', Validator.updateCryptoCurrencyAsset, CryptoController.updateCryptoCurrencyAsset);
router.get('/api/assets/:id', Validator.retrieveCryptoCurrencyAsset, CryptoController.retrieveCryptoCurrencyAsset);
router.delete('/api/assets/:id', Validator.deleteCryptoCurrencyAsset, CryptoController.deleteCryptoCurrencyAsset);

router.post('/api/exrate', Validator.createCryptoCurrencyHistoryPriceExrate, CryptoPriceHistoryController.createCryptoCurrencyHistoryPriceExrate);
router.patch('/api/exrate/:id', Validator.updateCryptoCurrencyHistoryPriceExrate, CryptoPriceHistoryController.updateCryptoCurrencyHistoryPriceExrate);
router.get('/api/exrate/:id', Validator.retrieveCryptoCurrencyHistoryPriceExrate, CryptoPriceHistoryController.retrieveCryptoCurrencyHistoryPriceExrate);
router.delete('/api/exrate/:id', Validator.deleteCryptoCurrencyHistoryPriceExrate, CryptoPriceHistoryController.deleteCryptoCurrencyHistoryPriceExrate);

export default router;