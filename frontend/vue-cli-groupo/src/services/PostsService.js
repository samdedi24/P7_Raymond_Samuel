import Api from '@/services/Api'

export default {
    getAllPosts () {
      return Api().get('post/all')
    },
    createPost (message) {
      return Api().post('post/add', message)
    }
  }