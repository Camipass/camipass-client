import io from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io(process.env.REACT_APP_SERVER_ADDRESS_WEBSOCKET, {
    withCredentials: true,
    extraHeaders: {
        'x-auth-token': Cookies.get(process.env.REACT_APP_COOKIENAME)
    },
    transportOptions: {
        polling: {
            extraHeaders: {
                'x-auth-token': Cookies.get(process.env.REACT_APP_COOKIENAME)
            }
        }
    },
});
