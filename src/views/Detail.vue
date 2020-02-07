<template>
    <div>
        <div class="blockWeather">
            <div class="weather">
                <table>
                    <tr>
                        <td>CITY : {{$store.getters.getData.city.name}}</td>
                        <td>COUNTRY : {{$store.getters.getData.city.country}}</td>
                        <td>
                            <a :href="`/`">BACK</a>
                            <a @click="Update">REFRESH</a>
                        </td>
                    </tr>
                    <tr v-for="(weather,idx) in $store.getters.getData.list" :key="idx">
                        <td>{{weather.dt_txt}}</td>

                        <td v-for="(buffer,idx) in weather.weather" :key="idx"> {{buffer.main}}</td>
                        <td v-for="(buffer,idx) in weather.weather" :key="idx"><img
                                :src=" `https://openweathermap.org/img/wn/${buffer.icon}.png`"
                        ></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name: "Detail",
        methods: {

            Update(){
                axios
                    .get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.$route.params.city}&APPID=2e6c186fe7c73137b1b5d687225645a8
`)
                    .then((response) => {
                            if (response.status === 200) {
                                /* eslint-disable no-console */
                                console.log(response.data)
                                this.$store.commit('set', {
                                    type: "all",
                                    items: response.data,

                                });
                            }
                        }
                        /* eslint-disable no-console */
                    ).catch(error => console.log(error))
                /* eslint-disable no-console */

            }


        },
        mounted() {
            axios
                .get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.$route.params.city}&APPID=2e6c186fe7c73137b1b5d687225645a8
`)
                .then((response) => {
                        if (response.status === 200) {
                            /* eslint-disable no-console */
                            console.log(response.data)
                            this.$store.commit('set', {
                                type: "data",
                                items: response.data,

                            });
                        }
                    }
                    /* eslint-disable no-console */
                ).catch(error => console.log(error))


        }
    }
</script>

<style scoped>

    a {
        text-decoration: none;
        color: #dddddd;
        padding: 9px 10px;
        background: #0d0c09;
        border-radius: 8px;
    }

    a:hover {
        color: #0d0c09;
        background-color: #dddddd;

    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>