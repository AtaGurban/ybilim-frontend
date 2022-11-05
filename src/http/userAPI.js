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

export const getAllUsers = async (page)=>{
    const {data} = await $authhost.get(`api/admin/get-users?page=${page}`)
    return data
}