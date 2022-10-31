import { $authhost, $host } from ".";
import jwt_decode from 'jwt-decode'


export const createCourse = async (item, options)=>{
    console.log($host);
    const {data} = await $host.post('api/video/upload', item, options)
    return data
}

export const getAllCourse = async ()=>{
    const {data} = await $host.get('api/video/list')
    return data
}

export const getOneCourse = async (id)=>{
    const {data} = await $host.get(`api/video/list?id=${id}`)
    return data
}

export const removeCourse = async (id)=>{
    const {data} = await $host.delete(`api/video/remove?id=${id}`)
    return data
}