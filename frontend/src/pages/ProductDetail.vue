<template>
  <div
    class="container-fluid px-5 py-5"
    v-if="product"
    style="background-color: rgb(241, 241, 241)"
  >
    <h3 class="text-2xl font-semibold uppercase text-coffee-400">
      {{ product.title }}
    </h3>
    <div class="flex gap-4 mt-6 items-center">
      <div class="w-[20%] h-[300px]">
        <img
          class="rounded-md w-full h-full object-cover"
          :src="product.image"
          alt=""
        />
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="">
          <p class="leading-10">
            {{ product.description }}
          </p>

          <div class="flex mb-2 gap-2 items-center mt-4">
            <span class="">Price: </span>
            <span class="font-semibold text-red-600">
              {{ (product.price * quantity).toLocaleString() }}
              VND</span
            >
          </div>
          <div class="flex mb-2 gap-2 items-center mt-4">
            <div class="flex gap-2">
              <span class="">Quantity: </span>
              <button
                @click="onQuantityChange('decrease')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold w-8"
                style="border: solid 0.5px black"
              >
                -
              </button>
              <div class="">
                <span class="font-semibold">{{ quantity }}</span>
              </div>
              <button
                @click="onQuantityChange('increase')"
                class="border-[1px] py-1 px-2 rounded-md font-semibold w-8"
                style="border: solid 0.5px black"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            :disabled="loading"
            @click="
              handleAddToCart({
                product,

                quantity,
                price: product.price * quantity,
              })
            "
            class="bg-slate-100 capitalize hover:opacity-90 flex gap-4 p-4 rounded-md mt-2"
            style="border: solid 0.5px black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            Add to cart
          </button>
          <router-link :to="{ name: 'Cart' }" style="text-decoration: none">
            <button
              class="bg-red-500 capitalize hover:opacity-90 text-white flex gap-4 p-4 rounded-md mt-2"
              style="border: solid 0.5px black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              Buy Now
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/Product/CardProduct.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import { cartApi } from "@/api/cartApi";
import { productsApi } from "@/api/productsApi";

export default {
  components: { CardProduct },
  setup() {
    // Hooks
    const store = useStore();
    const route = useRoute();

    // Ref
    //const size = ref("S"); // "S", "M" , "L"
    const quantity = ref(1);

    // Status before call api
    const loading = ref(false);

    // Actions
    store.dispatch("products/getProductDetail", { id: route.params.id });

    // Data
    const productDetail = computed(() => store.state.products.productDetail);

    const onQuantityChange = (type) => {
      if (type === "increase") {
        // Check if increasing quantity exceeds available stock
        if (quantity.value < productDetail.value.quantitySum) {
          quantity.value++;
        } else {
          alert("Requested quantity exceeds available stock");
        }
      } else {
        if (quantity.value > 1) quantity.value--;
      }
    };

    // Submit
    const handleAddToCart = async () => {
      // Check if the requested quantity exceeds available stock
      if (quantity.value > productDetail.value.quantitySum) {
        alert("Requested quantity exceeds available stock");
        return;
      }

      // Submit data
      loading.value = true;
      try {
        // Add the product to the cart
        await cartApi.addToCart({
          product: productDetail.value,
          quantity: quantity.value,
          price: productDetail.value.price * quantity.value,
        });

        // Update data in vuex store
        store.dispatch("carts/getCarts");

        // Update quantitySum in the product
        await productsApi.updateProductQuantity({
          id: productDetail.value._id,
          quantity: productDetail.value.quantitySum - quantity.value,
        });

        alert("Add to cart successfully");
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    };
    return {
      product: productDetail,
      //size,
      quantity,
      //onSizeClick,
      onQuantityChange,
      handleAddToCart,
      loading,
    };
  },
};
</script>

<style></style>
