import { $authhost, $host } from ".";

export const getAllCityes = async ()=>{
    const {data} = await $host.get(`api/education/city`)
    return data
}
export const getAllCollages = async (id)=>{
    const {data} = await $host.get(`api/education/collage?id=${id}`)
    return data
}

export const getAllDirections = async (id)=>{
    const {data} = await $host.get(`api/education/direction?id=${id}`)
    return data
}

export const createCity = async (item, options)=>{
    const {data} = await $host.post(`api/education/city`, item, options)
    return data
}

export const createCollage = async (item, options)=>{
    const {data} = await $host.post(`api/education/collage`, item, options)
    return data
}

export const createDirection = async (item, options)=>{
    const {data} = await $host.post(`api/education/direction`, item, options)
    return data
}

export const removeCity = async (id)=>{
    const {data} = await $host.delete(`api/education/city?id=${id}`)
    return data
}

export const removeCollage = async (id)=>{
    const {data} = await $host.delete(`api/education/collage?id=${id}`)
    return data
}

export const removeDirection = async (id)=>{
    const {data} = await $host.delete(`api/education/direction?id=${id}`)
    return data
}

export const updateCollage = async (item, options)=>{
    const {data} = await $host.put(`api/education/collage`, item, options)
    return data
}

export const updateCity = async (item, options)=>{
    const {data} = await $host.put(`api/education/city`, item, options)
    return data
}

export const updateDirection = async (item, options)=>{
    const {data} = await $host.put(`api/education/direction`, item, options)
    return data
}