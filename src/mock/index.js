import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableList } from './table'
// import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData } from './data'
// import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/getTable/, getTableList)
export default Mock
