<template>
  <div class="container max-w-4xl mx-auto my-6" v-if="user">
    <!-- Start: Render cart -->
    <div class="bg-slate-300 p-3 rounded">
      <h1 class="text-center capitalize text-2xl">Your Cart</h1>
      <div
        class="flex justify-between w-full p-3 my-2 bg-slate-100"
        v-for="cart in carts"
        :key="cart._id"
      >
        <!-- Info -->
        <div class="flex gap-4">
          <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
            <img
              class="w-full h-full object-cover border rounded"
              :src="cart.product.image"
              alt=""
            />
          </div>

          <div class="">
            <h1 class="text-base font-semibold">{{ cart.product.title }}</h1>
            <p class="text-coffee-600 text-sm my-2">
              <span class="text-gray-600">Quantity : </span>
              {{ cart.quantity }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2 justify-center">
          <p class="text-base text-red-500 pl-10">
            {{ cart.price.toLocaleString() }} VND
          </p>
          <!-- Action -->
          <div class="flex gap-2 items-center justify-center">
            <button
              :disabled="loading"
              @click="
                handleQuantityChange({
                  idCart: cart._id,
                  quantity: cart.quantity - 1,
                })
              "
              class="border-[1px] py-0.5 px-2 rounded-sm w-8"
            >
              {{ loading ? "..." : "-" }}</button
            ><span class="">{{ cart.quantity }}</span>
            <button
              :disabled="loading"
              @click="
                handleQuantityChange({
                  idCart: cart._id,
                  quantity: cart.quantity + 1,
                })
              "
              class="border-[1px] py-0.5 px-2 rounded-sm w-8"
            >
              {{ loading ? "..." : "+" }}
            </button>
          </div>
          <div
            @click="handleDeleteCart(cart._id)"
            class="p-1 bg-red-500 hover:opacity-80 cursor-pointer rounded-sm text-white w-44"
          >
            <p class="text-center text-sm">Delete</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: Render when not product -->
    <div class="my-4" v-if="carts.length === 0">
      <img src="../assets/images/empty-cart.png" alt="" class="w-96 mx-auto" />
      <h1 class="text-center text-xl">Your cart is empty!</h1>
      <router-link :to="{ name: 'Product' }" class="text-center">
        <p class="text-center hover:underline capitalize text-blue-700 my-2">
          Buy product
        </p>
      </router-link>
    </div>

    <div class="" v-if="carts.length > 0">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Order price:</p>
        <p class="font-semibold text-red-600">
          {{
            carts
              .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
              .toLocaleString()
          }}
          <u class="no-underline">VND</u>
        </p>
      </div>
      <div class="border-b-2 border-black mb-2"></div>
      <div class="flex">
        <router-link
          to="/checkout"
          class="w-full bg-blue-800 hover:opacity-80 capitalize p-3 rounded-md text-white text-center no-underline"
          >Pay</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref } from "vue";
import { cartApi } from "@/api/cartApi";
import { receiptApi } from "@/api/receiptApi";
export default {
  setup() {
    // Hooks
    const store = useStore();

    // Handle get cart for user in component Header

    // Ref
    const loading = ref(false);
    //const isPendingSubmiting = ref(false);

    const carts = computed(() => store.getters["carts/cartOrdering"]);
    const user = computed(() => store.state.user.user);

    // Function global
    const handleQuantityChange = async (data) => {
      // data = {idCart:"",quantity:""}
      if (data.quantity === 0) return;
      // Get the cart item
      const cartItem = carts.value.find((cart) => cart._id === data.idCart);
      // Submit data
      loading.value = true;
      if (cartItem.quantity + data.quantity > cartItem.product.quantitySum) {
        alert("Requested quantity exceeds available stock");
        return;
      }
      try {
        // Call api
        await cartApi.editCart(data);
        // Update data in vuex store
        store.dispatch("carts/getCarts");
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDeleteCart = async (idCart) => {
      if (window.confirm("Remove this product in cart?")) {
        loading.value = true;
        try {
          // Call api
          await cartApi.deleteCart(idCart);
          // Update data in vuex store
          store.dispatch("carts/getCarts");
        } catch (err) {
          console.log(err);
        }
        loading.value = false;
      }
    };

    return {
      carts,
      user,
      loading,
      // isPendingSubmiting,
      handleQuantityChange,
      handleDeleteCart,
      // handleOrder,
    };
  },
};
</script>

<style></style>
