<template>
  <div class="container max-w-4xl mx-auto my-6" v-if="user">
    <h1 class="text-center capitalize text-3xl bg-slate-200 p-3 rounded">
      Order History
    </h1>

    <!-- Start: Render each order -->
    <div v-for="order in orders" :key="order.orderId">
      <h2 class="text-xl font-semibold mt-4">
        Order {{ order.orderId }} - {{ formatOrderTime(order.orderTime) }}
      </h2>

      <!-- Start: Render cart items in the order -->
      <div
        class="flex justify-between w-full my-1 bg-slate-100 p-3 rounded"
        v-for="cart in order.carts"
        :key="cart._id"
      >
        <div class="flex gap-4">
          <div class="w-[100px] h-[100px] rounded-md overflow-hidden">
            <img
              class="w-full h-full object-cover"
              :src="cart.product.image"
              alt=""
            />
          </div>
          <div>
            <h1 class="text-base font-semibold">{{ cart.product.title }}</h1>
            <p class="text-coffee-600 text-sm my-2">
              <span class="text-gray-600">Quantity : </span> {{ cart.quantity }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-base text-red-500">
            {{ cart.price.toLocaleString() }} VND
          </p>
          <!-- Action -->
        </div>
      </div>
      <!-- End: Render cart items in the order -->

      <!-- Display Total Order Price for the current order -->
      <div
        class="flex items-center justify-between border-t-2 border-b-2 border-black"
      >
        <p class="text-sm font-medium text-gray-900">Total order price:</p>
        <p class="font-semibold text-red-600">
          {{ order.totalOrderPrice.toLocaleString() }}
          <u class="no-underline">VND</u>
        </p>
      </div>

      <!-- Display Total Quantity for the current order -->
      <div
        class="flex items-center justify-between border-t-2 border-b-2 border-black"
      >
        <p class="text-sm font-medium text-gray-900">Total quantity:</p>
        <p class="font-semibold text-red-600">{{ order.totalQuantity }}</p>
      </div>
    </div>
    <!-- End: Render each order -->

    <!-- Render when no orders are available -->
    <div class="my-4" v-if="orders.length === 0">
      <h1 class="text-center text-xl">You don't have any order history</h1>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const carts = computed(() => store.getters["carts/cartOrdered"]);
    const user = computed(() => store.state.user.user);

    // Separate orders based on orderId
    const orders = computed(() => {
      const separatedOrders = carts.value.reduce((acc, cart) => {
        if (!acc[cart.orderId]) {
          acc[cart.orderId] = {
            orderId: cart.orderId,
            orderTime: cart.orderTime,
            carts: [],
            totalOrderPrice: 0,
            totalQuantity: 0,
          };
        }

        acc[cart.orderId].carts.push(cart);
        acc[cart.orderId].totalOrderPrice += cart.price * cart.quantity;
        acc[cart.orderId].totalQuantity += cart.quantity;

        return acc;
      }, {});

      // Convert the object back to an array
      return Object.values(separatedOrders);
    });

    const formatOrderTime = (dateTime) => {
      const options = {
        weekday: "long", // 'short', 'narrow' are also options
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(dateTime).toLocaleString(undefined, options);
    };

    return {
      carts,
      user,
      orders,
      formatOrderTime,
    };
  },
};
</script>

<style></style>
