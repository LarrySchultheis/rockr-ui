import { io } from 'socket.io-client';
const settings = require("../../settings.json");

// "undefined" means the URL will be computed from the `window.location` object
const URL = settings.apiUrl;

export const Socket = io(URL);