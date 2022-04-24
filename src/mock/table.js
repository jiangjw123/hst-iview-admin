import Mock from 'mockjs'
import { getParams } from '@/utils/util'
const Random = Mock.Random
Random.integer()
export const getTableList = (req) => {
  console.log(req)
  let params = getParams(req.url)
  let pageSize = params.pageSize
  let obj = {}
  obj[`result|${pageSize}`] =  [
    {
    'id|+1': 1,
     createTime: '@date',
     title: '@cword(3, 5)',
     email: '@email',
     'roomId': '@integer(10001, 11000)'
    },
  ]
  obj.total = parseInt(pageSize) * 30
  const data = Mock.mock(obj)
  return {
    code: 0,
    data: data
  }
}