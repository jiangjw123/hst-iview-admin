import { getParams } from '@/utils/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    token: 'super_admin'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    token: 'admin',
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return { 
    code: 0,
    data: {
      token: USER_MAP[req.userName].token 
    }
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return {
    code: 0,
    data: USER_MAP[params.token]
  }
  
}

export const logout = () => {
  return {
    code: 0,
    msg: 'success'
  }
}
