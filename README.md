## Executing it

Having Node.js installed is a prerequisite. The app was developed and tested using Node.js version 14.16.0. Access the app directory in Terminal and type the following commands to execute the solution.

### First of all, install dependencies

$ npm install

### Run the tests

$ npm test

### Run the API

Create a `.env` file in root folder and populate the following environment variables:

MONGODB_DATABASE=
MONGODB_URI=
CACHE_KEYS_LIMIT=
CACHE_KEYS_TTL_IN_SECONDS=

$ npm start

### Example to use

See the endpoints in `routes/cache.js`
