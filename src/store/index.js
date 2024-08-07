import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            itemsPerPage: 10,
            selectedRows: [],
        };
    },
    mutations: {
        setItemsPerPage(state, items) {
            state.itemsPerPage = items;
        },
        setSelectedRows(state, selectedRows) {
            state.selectedRows = selectedRows;
        },
    },
    actions: {
        updateItemsPerPage({ commit }, items) {
            commit('setItemsPerPage', items);
        },
        updateSelectedRows({ commit }, selectedRows) {
            commit('setSelectedRows', selectedRows);
        },
    },
    getters: {
        itemsPerPage: state => state.itemsPerPage,
        selectedRows: state => state.selectedRows,
    },
});
