import Api from '@/services/Api'

export default {
    signup (data) {
      return Api().post('users/signup', data)
    },
    login (credentials) {
      return Api().post('users/login', credentials)
    }
  }