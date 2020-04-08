import { login } from '@/api/user'
import { setToken, getToken, setUser } from '@/lib/util'

export default {
  state: {
    user: {
      phone: '',
      name: '',
      address: '',
      rider: '',
      riderPhone: '',
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    login ({ commit }, { phone, password }) {
      return new Promise((resolve, reject) => {
        login({ phone, password }).then(res => {
          commit('SET_USER', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        setUser({})
        resolve()
      })
    }
  }
}
