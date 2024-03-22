import { productsApi } from "@/api/productsApi";

// initial state
const state = () => ({
  products: [],
  searchProducts: [],
  pagination: null,
  paginationSearch: null,
  productDetail: null,
  error: "",
});

// getters
const getters = {};

// actions
const actions = {
  async updateProductQuantity({ commit }, payload) {
    try {
      // Call your API to update the product quantity
      await productsApi.updateProductQuantity(payload);

      // Commit the mutation to update the quantity in the state
      commit("updateProductQuantity", payload);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  },
  async getProducts({ commit }, { page, sort }) {
    try {
      const { data, pagination } = await productsApi.getProducts(page, sort);

      commit("setProducts", data);
      commit("setPagination", pagination);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
  async getProductDetail({ commit }, { id }) {
    try {
      const data = await productsApi.getDetailProduct(id);
      commit("setProductDetail", data);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
  async searchProduct({ commit }, { title, page }) {
    try {
      const { data, pagination } = await productsApi.searchProduct(title, page);
      commit("setSearchProducts", data);
      commit("setPaginationSearch", pagination);
    } catch (err) {
      console.log(err);
      commit("setError", err.message);
    }
  },
};

// mutations
const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setSearchProducts(state, payload) {
    state.searchProducts = payload;
  },
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setPaginationSearch(state, payload) {
    state.paginationSearch = payload;
  },
  setProductDetail(state, payload) {
    state.productDetail = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  updateProductQuantity(state, payload) {
    const productIndex = state.products.findIndex(
      (product) => product._id === payload.id
    );
    if (productIndex !== -1) {
      state.products[productIndex].quantitySum = payload.quantity;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
