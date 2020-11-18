import Api from '@/services/Api'

export default {
    signup (data) {
      return Api().post('users/signup', data)
    },
    login (data) {
      return Api().post('users/login', data)
    },
    getUserById(id) {
        return Api().get("users/accounts/" + id);
      },
  } 