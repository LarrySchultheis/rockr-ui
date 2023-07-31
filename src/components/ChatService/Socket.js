import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://18.220.27.37:5000';

export const Socket = io(URL);