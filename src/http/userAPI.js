import { $authhost, $host } from ".";
import jwt_decode from 'jwt-decode'

export const registration = async (email, name, password, phone)=>{

    const {data} = await $host.post('api/user/registration', {email, password, name, phone,  role: 'USER'})
    
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (phone, password)=>{
    const {data} = await $host.post('api/user/login', {phone, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async ()=>{
    const {data} = await $authhost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const update = async (item)=>{
    const {data} = await $authhost.put('api/user/update', item)
    return data
}

export const getAllUsers = async (page)=>{
    const {data} = await $authhost.get(`api/admin/get-users?page=${page}`)
    return data
}
export const getAllTransactions = async (page)=>{
    const {data} = await $authhost.get(`api/user/transaction?page=${page}`)
    return data
}

export const deleteTransaction = async (id)=>{
    const {data} = await $authhost.delete(`api/user/transaction?id=${id}`)
    return data
}
export const getOneUsers = async (id)=>{
    const {data} = await $authhost.get(`api/user/get-user?id=${id}`)
    return data
}

export const removeUser = async (id)=>{
    const {data} = await $authhost.delete(`api/user/remove?id=${id}`)
    return data
}

export const buyCourse = async (item)=>{
    const {data} = await $authhost.post(`api/admin/buy-course`, item)
    return data
}