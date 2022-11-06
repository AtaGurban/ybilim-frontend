import Stream from "./components/Stream";
import Upload from "./components/Upload";
import Admin from "./pages/admin/Admin";
import AdminCourse from "./pages/adminCourse/AdminCourse";
import AdminCourseWideo from "./pages/adminCourseWideo/adminCourseWideo";
import AdminUsers from "./pages/adminUsers/AdminUsers";
import Auth from "./pages/auth/Auth";
import MainPage from "./pages/mainPage/MainPage";
import MyCourses from "./pages/myCourses/MyCourses";

import { UPLOAD_ROUTE, STREAM_ROUTE, MAIN_PAGE,AUTH_PAGE, ADMIN_ROUTE, ADMIN_COURSE_ROUTE, ADMIN_COURSE_WIDEO_ROUTE, MY_COURSES, ADMIN_ROUTE_USERS, COURSE_ROUTE } from "./utils/pathConsts";


// export const authRoutes = [
//     {
//         path: BASKET_ROUTE,
//         Element: <Basket/>
//     },

// ]

export const authRoutes = [
    {
        path: STREAM_ROUTE,
        Element: <Stream/>
    },
    {
        path: MAIN_PAGE,
        Element: <MainPage/>
    },
    {
        path: MY_COURSES,
        Element: <MyCourses/>
    },
    {
        path: COURSE_ROUTE,
        Element: <MyCourses/>
    },

]
export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Element: <MainPage/>
    },
    {
        path: AUTH_PAGE,
        Element: <Auth/>
    },


]
export const adminRoutes = [
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
        path: ADMIN_ROUTE,
        Element: <Admin/>
    },
    {
        path: ADMIN_COURSE_ROUTE,
        Element: <AdminCourse/>
    },
    {
        path: ADMIN_COURSE_WIDEO_ROUTE,
        Element: <AdminCourseWideo/>
    },
    {
        path: MY_COURSES,
        Element: <MyCourses/>
    },
    {
        path: ADMIN_ROUTE_USERS,
        Element: <AdminUsers/>
    },
    {
        path: COURSE_ROUTE,
        Element: <MyCourses/>
    },

]


// export const adminRoutes = [
//     {
//         path: BASKET_ROUTE,
//         Element: <Basket/>
//     },

// ]