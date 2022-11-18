import { $authhost, $host } from ".";

export const getAllCityes = async ()=>{
    const {data} = await $host.get(`api/education/city`)
    return data
}

export const createCity = async (item, options)=>{
    const {data} = await $host.post(`api/education/city`, item, options)
    return data
}

export const removeCity = async (id)=>{
    const {data} = await $host.delete(`api/education/city?id=${id}`)
    return data
}