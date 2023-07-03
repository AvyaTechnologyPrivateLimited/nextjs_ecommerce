let dev_url = process.env.NEXT_PUBLIC_LOCAL_API_URL;
let server_url = process.env.NEXT_PUBLIC_SERVER_API_URL;

const dev = {
    API_URL: dev_url+"api/",
    ASSET_URL: dev_url+"public/"
}

const server = {
    API_URL: server_url+"api/",
    ASSET_URL: server_url+"api/"
}

const config = process.env.NODE_ENV === 'development' ? dev : server;
export default config;