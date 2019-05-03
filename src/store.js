import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
	SET_AUTHENTICATED: "SET_AUTHENTICATED",
	SET_USER: "SET_USER"
}

let store =  new Vuex.Store({
  state: {
  	isAuthenticated: sessionStorage.getItem('IS_AUTHENTICATED'),
  	user: JSON.parse(sessionStorage.getItem('USER'))
  },
  getters: {
  	isAuthenticated: state => {
  		return state.isAuthenticated
  	},
  	user: state => {
  		return state.user
  	}
  },
  mutations: {
  	[types.SET_AUTHENTICATED](state, isAuthenticated){
  		state.isAuthenticated = isAuthenticated 
  	},
  	[types.SET_USER](state, user){
  		state.user = user
  	}
  },
  actions: {
  	setAuthenticated: ({commit}, isAuthenticated) => {
  		commit(types.SET_AUTHENTICATED, isAuthenticated)
  	},
  	setUser: ({commit}, user) => {
  		commit(types.SET_USER, user)
  	},
    logout: ({commit}) => {
      commit(types.SET_AUTHENTICATED, false)
      commit(types.SET_USER, null)
    }

  }
})

store.subscribe((mutations, state)=>{
  sessionStorage.setItem('IS_AUTHENTICATED',state.isAuthenticated)
  sessionStorage.setItem('USER',JSON.stringify(state.user))
})


export default store


