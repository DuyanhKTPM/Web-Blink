<template>
  <div class="card p-2">
    <div class="cursor-pointer w-full h-full relative group">
      <div
        class="hover:transition-all hover:duration-700 hover:ease-in-out relative"
      >
        <div
          class="absolute w-full h-full bg-black bg-opacity-10 group-hover:block hidden"
        ></div>
        <img
          class="rounded-md w-full h-[150px] object-cover"
          :src="product.image"
          alt=""
        />
      </div>

      <div class="my-2">
        <p class="text-base hover:text-coffee-400 font-semibold truncate">
          {{ product.title }}
        </p>
      </div>
      <div class="my-2">
        <span class="font-medium">Price: </span>
        <span
          class="text-base text-red-600 hover:text-coffee-400 font-semibold truncate"
        >
          {{ product.price.toLocaleString() }} <u class="no-underline">VND</u>
        </span>
      </div>
      <div class="my-2">
        <span class="font-bold">Quantity Total: </span>
        <span class="text-base hover:text-coffee-400 font-semibold truncate">
          {{ product.quantitySum }}
        </span>
      </div>

      <div class="flex gap-2">
        <button
          @click="toggleModal(product)"
          class="py-2 flex gap-2 items-center px-2 rounded-md text-white text-sm bg-cyan-500 shadow-lg shadow-cyan-500/50"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </span>
          <span>Update</span>
        </button>
        <button
          @click="deleteProduct"
          class="py-2 z-50 px-2 flex gap-2 items-center rounded-md text-white text-sm bg-red-500 shadow-lg shadow-red-500/50 ..."
        >
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["product"],
  setup({ product }, context) {
    const toggleModal = (product) => {
      context.emit("toggle-modal", product);
    };

    const deleteProduct = () => {
      context.emit("delete-product", product._id);
    };
    const store = useStore();

    // Lấy danh sách sản phẩm được xác nhận để tính toán tổng số lượng
    const confirmedOrders = computed(() =>
      store.state.receipts.receipts.filter((receipt) => receipt.checked)
    );

    // Tính toán tổng số lượng và giá trị của mỗi sản phẩm
    const productTotals = computed(() => {
      const totals = {};

      confirmedOrders.value.forEach((receipt) => {
        receipt.carts.forEach((cart) => {
          const productName = cart.product.title;

          if (!totals[productName]) {
            totals[productName] = {
              totalQuantity: cart.quantity,
              totalPrice: cart.price,
            };
          } else {
            totals[productName].totalQuantity += cart.quantity;
            totals[productName].totalPrice += cart.price;
          }
        });
      });

      return totals;
    });

    // Hàm trợ giúp để lấy thông tin tổng của sản phẩm
    const getProductTotal = (productName) => {
      return productTotals.value[productName];
    };

    return {
      toggleModal,
      deleteProduct,

      getProductTotal,
    };
  },
};
</script>

<style></style>
