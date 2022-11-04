import Stream from "./components/Stream";
import Upload from "./components/Upload";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/mainPage/MainPage";

import { UPLOAD_ROUTE, STREAM_ROUTE, MAIN_PAGE,AUTH_PAGE } from "./utils/pathConsts";


// export const authRoutes = [
//     {
//         path: BASKET_ROUTE,
//         Element: <Basket/>
//     },

// ]

export const publicRoutes = [
    {
        path: UPLOAD_ROUTE,
        Element: <Upload/>
    },
    {
        path: STREAM_ROUTE,
        Element: <Stream/>
    },
    {
        path: MAIN_PAGE,
        Element: <MainPage/>
    },
    {
        path: AUTH_PAGE,
        Element: <Auth/>
    },

]


// export const adminRoutes = [
//     {
//         path: BASKET_ROUTE,
//         Element: <Basket/>
//     },

// ]