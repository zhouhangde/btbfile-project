import axios from 'axios'

const instance = axios.create({
  // baseURL:"http://btbfire.com/"
  baseURL:"http://91bilong.com/"
})

// instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'
// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';    //将json数据变成form data 
export default instance