import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: '',
        all:'',

    },
    getters: {
        getAll(state){
            return state.all;

        },
        getData(state){
            return state.data;
        }
    },
    mutations: {
        set(state, {type, items}) {
            state[type] = items;
        }

    },
    actions: {}
});

export default store;
