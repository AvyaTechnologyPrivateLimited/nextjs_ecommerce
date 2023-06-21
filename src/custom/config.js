let dev_url = 'http://127.0.0.1:8000/';
let server_url = 'https://av-ecom-cms.avdemosites.com/';

const dev = {
    API_URL: dev_url+"api/",
    ASSET_URL: dev_url+"public/"
}

const server = {
    API_URL: server_url+"api/",
    ASSET_URL: server_url+"api/"
}
const config = process.env.NODE_ENV === 'development' ? dev : server;
//console.log(config);
export default config;