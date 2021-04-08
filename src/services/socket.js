import io from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io('http://localhost:8000', {
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
