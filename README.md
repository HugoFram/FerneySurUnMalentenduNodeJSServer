# FerneySurUnMalentenduServer

## Development

### Run server locally
To run the server locally on port 3002 (HTTP) and 3445 (HTTPS), run `npm run start`. Don't forget to update the baseURL entry to http://localhost:3002 in config.json of the Frontend code. 

## Operations

### Start server

To run the server on with pm2 (for logs) run `pm2 start www` 

### Deploy & Start server

To deploy the server, copy the entire repository in the desired location (for me it is /srv/nodejs/FerneySurUnMalentendu/<ENV>).
To run the server on with pm2 (for logs) run `pm2 start bin/www` from the repo root (/srv/nodejs/FerneySurUnMalentendu/<ENV>/FerneySurUnMalentenduNodeJSServer/).
To stream the server logs run `pm2 list` to identify the id of the log stream and then `pm2 log <stream id>`  
