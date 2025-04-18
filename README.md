# cloud-config-toolbox-ui
The dCloud Colud Configuration web portal UI project. It is
built on Vue.js 3.x using Vite

## Development
### Usage
`npm i` to install dependency packages
`npm run dev` to build libraries and start development environment with hot-reload
`npm run build-only` to build production files and start an express web server to test production files

### JWT
The Sign In function on the development website will prompt you for a JWT,
since it cannot redirect you the real SSO provider. You can get a valid JWT by
going to https://dcloud-collab-toolbox-rtp.cisco.com and logging in, then
opening your browser javascript console and entering `localStorage.jwt`.

## Production
### Installation
`./install.sh` to build and install to the /var/www/toolbox/cloud-config folder
