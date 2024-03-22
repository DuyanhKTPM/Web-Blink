import { createStore } from "vuex";
import products from "../modules/products";
import user from "../modules/user";
import carts from "../modules/cart";
import receipts from "../modules/receipt";
//import order from "../modules/order";

const store = createStore({
  modules: {
    products,
    user,
    carts,
    receipts,
   // order,
  },
});

export default store;
