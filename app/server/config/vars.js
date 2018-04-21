const path = require('path');

// import .env variables
// We only want this to run if we are NOT running in Docker.
// If this runs in Docker the variables are obtained through secrets and .env and .env.example are NOT contained in the image.
if (process.env.NODE_ENV != 'production_docker'){
    require('dotenv-safe').load({
        path: path.join(__dirname, '../.env'),
        sample: path.join(__dirname, '../.env.example'),
    });
}

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    tenant: process.env.O365_TENANT,
    clientId: process.env.O365_CLIENT_ID,
    clientSecret: process.env.O365_CLIENT_SECRET,
    tokenEndpoint: process.env.O365_TOKEN_URI,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    apiBase: process.env.O365_API_BASE,
    apiVersion: process.env.O365_API_VERSION,
};