import dataRequest from '@/libs/request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return dataRequest('post', '/login', data)
}

export const getUserInfo = (token) => {
  return dataRequest('get', '/get_info', { token })
}

export const logout = (token) => {
  return dataRequest('post', '/logout')
}