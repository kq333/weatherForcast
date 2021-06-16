import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {

    results:[],

  },

  mutations: {

    returnResults (state, results) {
      state.results = results

    } ,

  },

  getters:{


  },
  actions: {

    async  getSearchResults({commit}, query){
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=027ee07fafd9a678d925c3a9220c1289`
      )
      commit('returnResults', {res})

      },

    async getLocation({commit}) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position=>{
            const lats = position.coords.latitude
            const lons =  position.coords.longitude

            const getData =  axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lats}&lon=${lons}&appid=027ee07fafd9a678d925c3a9220c1289`)
            .then(res=>{
             return  res
            })

            const printAddress = () => {
              getData.then((data) => {
                const res = data
                commit('returnResults', {res})
              });
            };

             printAddress();

          });
        }
      },
  },
})
