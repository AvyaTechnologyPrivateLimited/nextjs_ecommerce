let dev_url = 'http://127.0.0.1:8000/';
let server_url = 'https://av-ecom-cms.avdemosites.com/';
const mode = 'development';

const dev = {
    API_URL: dev_url+"api/",
    ASSET_URL: dev_url+"public/"
}

const server = {
    API_URL: server_url+"api/",
    ASSET_URL: server_url+"api/"
}
const config = mode === 'development' ? dev : server;
export default config;