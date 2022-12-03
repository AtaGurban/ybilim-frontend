import { $authhost, $host } from ".";

export const createBanner = async (item, options)=>{
    const {data} = await $authhost.post('api/admin/banner', item, options)
    return data
}

export const getBanner = async ()=>{
    const {data} = await $authhost.get('api/admin/banner')
    return data
}

export const deleteBanner = async (id)=>{
    const {data} = await $authhost.delete(`api/admin/banner?id=${id}`)
    return data
}