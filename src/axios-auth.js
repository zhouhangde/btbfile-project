import axios from 'axios'

const instance = axios.create({
  baseURL:"http://btbfire.com/"
})

// instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'

export default instance