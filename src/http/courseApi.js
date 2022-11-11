import { $authhost, $host } from ".";


export const createCourse = async (item, options)=>{
    const {data} = await $authhost.post('api/admin/create-course', item, options)
    return data
}
export const createVideo = async (item, options)=>{
    const {data} = await $authhost.post('api/admin/create-video', item, options)
    return data

}

export const getAllCourse = async ()=>{
    const {data} = await $host.get('api/admin/get-all-course')
    return data
}

export const getFavouriteCourse = async ()=>{
    const {data} = await $host.get('api/admin/get-favourite-course')
    return data
}

export const getMyCourse = async (id)=>{
    const {data} = await $authhost.get(`api/user/my-courses?userId=${id}`)
    return data
}
export const getAllVideosByCourseId = async (id)=>{
    const {data} = await $host.get(`api/admin/getvideo?id=${id}`)
    return data
}

export const getOneCourse = async (id)=>{
    const {data} = await $host.get(`api/video/list?id=${id}`)
    return data
}

export const getOneCourseAndVideo = async (id)=>{
    const {data} = await $host.get(`api/video/list?videoId=${id}`)
    return data
}

export const removeCourse = async (id)=>{
    const {data} = await $authhost.delete(`api/admin/remove-course?id=${id}`)
    return data
}

export const removeVideo = async (id)=>{
    const {data} = await $authhost.delete(`api/admin/remove-video?id=${id}`)
    return data
}

export const updateCourse = async (item)=>{
    const {data} = await $authhost.put('api/admin/update-course', item)
    return data
}