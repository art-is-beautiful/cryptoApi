import 'dotenv/config';
import { WebSocket } from 'ws';


export const liveSocketCurrencRate = async (currency1: string | 'BTC', currency2: string | 'USD') => {

    const ws = new WebSocket('wss://ws-sandbox.coinapi.io/v1/');

    ws.on('open', () => {
        ws.send(JSON.stringify({
            type: 'hello',
            apikey: process.env.COIN_APP_API,
            heartbeat: false,
            subscribe_data_type: ['exrate'],
            subscribe_filter_asset_id: [`${currency1}/${currency2}`]
        }));
    });

    // ws.close()

    ws.on('message', (data: any) => {
        if(JSON.parse(data).type === 'error') {
            console.log('yes')
             close();
        }
        console.log('received: %s', JSON.parse(data));
    });

    const close = async () => {
        ws.close();
    };
};