<template>
  <v-container class='container'>
   <v-row justify="center"  >
   <v-col lg="6" >
            <v-text-field id="input_field" ref="value"  clearable placeholder="search the weather" type="text" lg="4" md='4' sm='6' xs="6"  style=" white--text" v-model="query"></v-text-field>
    </v-col>
      <v-col lg='1' >
        <v-btn id="btn" outlined @click="getSearchResults(query)" class="mt-4" lg="1" md='1' sm='1' xs='1'><v-icon>mdi-card-search</v-icon></v-btn>
      </v-col>

 </v-row>
   <v-row justify="center">
    <v-col >
      <div    v-for="result in results" :key="result.id" >
        <v-row justify="center">
          <v-col lg='6' >
            <h1  id="text1">{{result.data.name }}</h1>
          </v-col>
        </v-row>
          <v-row justify="center">
            <v-col  lg='1' md="3" sm='3' xs='3'>
               <img class="img"  :src=" `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`" >
            </v-col>
              <v-col  lg='3' md="3" sm='3' xs='3'>
                <span  >{{(result.data.main.temp-273).toFixed(0)}} C</span>
              </v-col>
          </v-row>
            <v-row class="justify-space-around">
              <v-col  lg='4' md="4" sm='4' xs='4'>
                <span class="content_details_description" >{{result.data.weather[0].description}}</span>
              </v-col>
            </v-row>
              <v-row justify="center">
                <v-col lg='6' md="6" sm='6' xs='6'>
                      <v-card id='card' >
                <v-row  >
                <v-col >
                  <h2>Details:</h2>
                </v-col>
              </v-row>
                <v-row class="justify-space-around" >
                  <v-col lg='6'>
                       <div class="content_details_temp_min" ><div class='span_color'>Temp. max:</div>  {{(result.data.main.temp_max-273).toFixed(0)}} C</div>
                    </v-col>
                    <v-col>
                       <div class="content_details_temp_min" ><div class='span_color'>Temp. min:</div>  {{(result.data.main.temp_min-273).toFixed(0)}} C</div>
                    </v-col>
                </v-row>
                  <v-row>
                    <v-col  >
                       <div   class="content_details_pressure"><div class='span_color'>Pressure: </div> {{result.data.main.pressure}} hPa</div>
                    </v-col >
                      <v-col  >
                         <div class="content_details_humidity"><div class='span_color'>humidity: </div> {{result.data.main.humidity}} %</div>
                      </v-col>
                  </v-row>
                    <v-row >
                      <v-col  >
                        <div  class="content_details_wind"><div class='span_color'> Wind: </div> {{result.data.wind.speed}} km/h</div>
                      </v-col>
                        <v-col  >
                           <div class="content_details_visibility"> <div class='span_color'>visibility: </div> {{(result.data.visibility)/1000}} km </div>
                        </v-col>
                    </v-row>
                      <v-row  >
                        <v-col >
                           <div                       class="content_details_sunrise"><div class='span_color'>sunrise:</div><div class="span_text">{{ (new Date(result.data.sys.sunrise*1000).toLocaleTimeString().slice(0,10))  }}</div>
                          </div>
                        </v-col>
                          <v-col >
                               <div  class="content_details_sunset"><div class='span_color'>sunset: </div><div class="span_text">{{ (new Date( result.data.sys.sunset*1000).toLocaleTimeString().slice(0,10))  }} </div>
                                    </div>
                          </v-col>
                      </v-row>
            </v-card>
                </v-col>
              </v-row>

      </div>
    </v-col>
  </v-row>


  </v-container>
</template>

<script>

import { mapActions, mapState} from "vuex"
  export default {

    name: 'weatherApp',

    data(){

      return{
        query:''

      }

    },

    methods: {

 ...mapActions(["getSearchResults"]),

  },

mounted () {

  this.$store.dispatch('getLocation')

},

computed:{

    ...mapState(["results"]),

  },

  }
</script>

<style lang="scss" scoped>

.content_details_description{
  letter-spacing: 7px;
  font-size: 2em;

}

#card{
  margin-top:40px;
  background-color: rgba(0, 225, 255, 0.274);




}

#btn{
  border:none;

}

.img{
  font-size: 5em;
}

#input_field{
  background-color: transparent;
}

span{
  font-size: 4em;
}
.container{
  box-sizing: border-box;
  background-image: url("https://www.pixelstalk.net/wp-content/uploads/images1/Best-cloud-wallpapers.jpg");
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
   overflow-y: hidden;
}

.content_details_temp_max{

        font-size: 2em;
        margin-left:21%;


      }

      .content_details_temp_min{
       @extend .content_details_temp_max;

      }

      .content_details_pressure{

        @extend .content_details_temp_max

      }

      .content_details_humidity{
         @extend .content_details_temp_max

      }

      .content_details_wind{
         @extend .content_details_temp_max
      }

      .content_details_visibility{
         @extend .content_details_temp_max
      }

       .content_details_sunrise{
         @extend .content_details_temp_max;

      }

      .content_details_sunset{
        @extend .content_details_temp_max
      }

      .span_color{
        color:rgba(56, 54, 54, 0.699);
        font-size: 20px;
        padding: 5px;
      }



</style>
