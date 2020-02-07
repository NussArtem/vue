<template>
    <div>


        <div>
            <form action="">
                <span>Please input your city</span>
                <input type="text" v-model="name">
                <button type="reset" class="btn btn-primary " @click="search">Search</button>


            </form>
        </div>


        <table v-if="this.storageCity.city">
            LIST
            <tr>

                <td v-for="city in this.storageCity.city" :key="city">
                    <router-link :to="`/detail/${city}`">
                        {{city}}
                    </router-link>
                </td>
            </tr>
            <tr>
                <td v-for="id in this.storageCity.id" :key="id">{{id}}</td>
            </tr>
            <button type="button" class="btn-danger btn-primary " @click="RemoveC">Delete</button>

        </table>
        <div class="list" v-if="list">
            <router-link :to="`/detail/${$store.getters.getAll.name}`">
                <p>CITY : {{$store.getters.getAll.name}}</p>
                <p> ID : {{$store.getters.getAll.id}}</p>
            </router-link>
            <button type="button" class="btn-danger btn-primary " @click="Remove">Delete</button>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import VueCookies from 'vue-cookies'
    import Vue from 'vue'

    Vue.use(VueCookies);

    export default {
        name: "Home",
        data() {
            return {

                name: '',
                list: false,
                storageCity: {
                    id: [],
                    city: []
                },
            }

        },
        methods: {
            search() {


                axios
                    .get(`http://api.openweathermap.org/data/2.5/weather?q=${this.name}&APPID=2e6c186fe7c73137b1b5d687225645a8
`)
                    .then((response) => {
                            if (response.status === 200) {
                                /* eslint-disable no-console */
                                console.log(response.data)

                                this.$store.commit('set', {
                                    type: "all",
                                    items: response.data,
                                });
                                Vue.$cookies.set('City', this.$store.getters.getAll.name);
                                Vue.$cookies.set('ID', this.$store.getters.getAll.id);
                                this.storageCity.city.push(Vue.$cookies.get('City'));
                                this.storageCity.id.push(Vue.$cookies.get('ID'));
                                Vue.$cookies.set('City', this.storageCity.city);
                                Vue.$cookies.set('ID', this.storageCity.id);
                            }

                        }
                        /* eslint-disable no-console */
                    ).catch(error => console.log(error));
                this.list = true;
            },
            Remove() {
                this.list = false;
            }, RemoveC() {
                this.storageCity.city = Vue.$cookies.remove('City')
                this.storageCity.id = Vue.$cookies.remove('ID')
                this.storageCity.city = null
            },


        },
        mounted() {

            this.storageCity.city.push(Vue.$cookies.get('City'));
            this.storageCity.id.push(Vue.$cookies.get('ID'));
            console.log(this.storageCity.city)

        }
    }
</script>

<style scoped>

    .list {
        border-radius: 3px;
        border: 1px solid greenyellow;
        width: 200px;
        height: 150px;
    }

    table {
        font-family: arial, sans-serif;
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