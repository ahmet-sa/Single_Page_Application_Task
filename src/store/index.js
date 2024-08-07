// store/index.js
import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            itemsPerPage: 10, // Default value
        };
    },
    mutations: {
        setItemsPerPage(state, items) {
            state.itemsPerPage = items;
        },
    },
    actions: {
        updateItemsPerPage({ commit }, items) {
            commit('setItemsPerPage', items);
        },
    },
    getters: {
        itemsPerPage: state => state.itemsPerPage,
    },
});
