import Stream from "./components/Stream";
import Upload from "./components/Upload";
import Admin from "./pages/admin/Admin";
import AdminBanner from "./pages/adminBanner/AdminBanner";
import AdminCity from "./pages/adminCity/AdminCity";
import AdminCollage from "./pages/adminCollage/AdminCollage";
import AdminCourse from "./pages/adminCourse/AdminCourse";
import AdminCourseWideo from "./pages/adminCourseWideo/adminCourseWideo";
import AdminDirection from "./pages/adminDirections/AdminDirections";
import AdminTransaction from "./pages/adminTransactions/AdminTransactions";
import AdminUsers from "./pages/adminUsers/AdminUsers";
import Auth from "./pages/auth/Auth";
import CoursePage from "./pages/coursePage/CoursePage";
import EducationCollagePage from "./pages/educationCollagePage/EducationPage";
import EducationDirectionPage from "./pages/educationDirectionPage/EducationPage";
import EducationPage from "./pages/educationPage/EducationPage";
import MainPage from "./pages/mainPage/MainPage";
import MyCourses from "./pages/myCourses/MyCourses";

import { UPLOAD_ROUTE,ADMIN_EDUCATION_COLLAGE_ROUTE, EDUCATION_DIRECTION_ROUTE, EDUCATION_COLLAGE_ROUTE, STREAM_ROUTE, MAIN_PAGE,AUTH_PAGE, ADMIN_ROUTE, ADMIN_COURSE_ROUTE, ADMIN_COURSE_WIDEO_ROUTE, MY_COURSES, ADMIN_ROUTE_USERS, COURSE_ROUTE, EDUCATION_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_EDUCATION_DIRECTION_ROUTE, ADMIN_TRANSACTION_ROUTE, ADMIN_BANNER_ROUTE } from "./utils/pathConsts";


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
        Element: <CoursePage/>
    },
    {
        path: EDUCATION_ROUTE,
        Element: <EducationPage/>
    },
    {
        path: `${EDUCATION_COLLAGE_ROUTE}/:id`,
        Element: <EducationCollagePage/>
    },
    {
        path: `${EDUCATION_DIRECTION_ROUTE}/:id`,
        Element: <EducationDirectionPage/>
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
    {
        path: EDUCATION_ROUTE,
        Element: <EducationPage/>
    },
    {
        path: `${EDUCATION_COLLAGE_ROUTE}/:id`,
        Element: <EducationCollagePage/>
    },
    {
        path: `${EDUCATION_DIRECTION_ROUTE}/:id`,
        Element: <EducationDirectionPage />
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
        Element: <CoursePage/>
    },
    {
        path: EDUCATION_ROUTE,
        Element: <EducationPage/>
    },
    {
        path: `${EDUCATION_COLLAGE_ROUTE}/:id`,
        Element: <EducationCollagePage />
    },
    {
        path: ADMIN_EDUCATION_ROUTE,
        Element: <AdminCity/>
    },
    {
        path: ADMIN_EDUCATION_COLLAGE_ROUTE,
        Element: <AdminCollage/>
    },
    {
        path: `${ADMIN_EDUCATION_DIRECTION_ROUTE}/:id`,
        Element: <AdminDirection/>
    },
    {
        path: `${EDUCATION_DIRECTION_ROUTE}/:id`,
        Element: <EducationDirectionPage />
    },
    {
        path: ADMIN_TRANSACTION_ROUTE,
        Element: <AdminTransaction />
    },
    {
        path: ADMIN_BANNER_ROUTE,
        Element: <AdminBanner />
    },
]

