import Stream from "./components/Stream";
import Upload from "./components/Upload";
import ListCourses from "./pages/ListCourses/ListCourses";

import { UPLOAD_ROUTE, STREAM_ROUTE, COURSE_LIST } from "./utils/pathConsts";


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
        path: COURSE_LIST,
        Element: <ListCourses/>
    },

]


// export const adminRoutes = [
//     {
//         path: BASKET_ROUTE,
//         Element: <Basket/>
//     },

// ]