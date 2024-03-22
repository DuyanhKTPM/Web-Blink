<template>
  <main class="mb-8">
    <div class="mt-4">
      <div class="container max-w-4xl mx-auto px-8">
        <h1 class="text-center text-4xl font-semibold capitalize my-5">
          Statistical
        </h1>
        <div>
          <div class="grid grid-cols-4 gap-2">
            <div class="border-2 border-black p-10 bg-pink-100 rounded">
              <div>
                <p class="text-xl font-bold">Total Money:</p>
              </div>
              <div>
                <p class="text-center text-3xl">
                  {{
                    receipts
                      .reduce(
                        (acc, receipt) =>
                          acc +
                          receipt.carts.reduce(
                            (acc, cart) => acc + cart.price,
                            0
                          ),
                        0
                      )
                      .toLocaleString()
                  }}
                  <u class="no-underline">VND</u>
                </p>
              </div>
            </div>
            <div class="border-2 border-black p-10 bg-pink-100 rounded">
              <div>
                <p class="text-xl font-bold">Number Of Orders:</p>
              </div>
              <div>
                <p class="text-center text-3xl">
                  {{ receipts.length }}
                </p>
              </div>
            </div>

            <div class="border-2 border-black p-10 bg-pink-100 rounded">
              <div>
                <p class="text-xl font-bold">Number Of Products Sold:</p>
              </div>
              <div>
                <p class="text-center text-3xl">
                  {{
                    receipts.reduce(
                      (acc, receipt) =>
                        acc +
                        receipt.carts.reduce(
                          (acc, cart) => acc + cart.quantity,
                          0
                        ),
                      0
                    )
                  }}
                </p>
              </div>
            </div>
            <div class="border-2 border-black p-10 bg-pink-100 rounded">
              <div>
                <p class="text-xl font-bold">Remaining Number Of Products:</p>
              </div>
              <div>
                <p class="text-center text-3xl">
                  {{
                    products.reduce(
                      (acc, product) => acc + product.quantitySum,
                      0
                    ) -
                    receipts.reduce(
                      (acc, receipt) =>
                        acc +
                        receipt.carts.reduce(
                          (acc, cart) => acc + cart.quantity,
                          0
                        ),
                      0
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { receiptApi } from "@/api/receiptApi";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import CardProduct from "@/components/Product/CardProduct.vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormAction from "@/components/Admin/FormAction.vue";
import CardAction from "@/components/Admin/CardAction.vue";

export default {
  setup() {
    // Hooks
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // Ref
    const loading = ref(false);
    const currentPage = ref(Number(route.query.page) || 1);
    const type = ref("");
    // Actions
    store.dispatch("products/getProducts", {
      // Page
      page: currentPage.value,
    });
    // Data
    const receipts = computed(() => store.state.receipts.receipts);
    const products = computed(() => {
      return store.state.products.products;
    });

    const pagination = computed(() => {
      return store.state.products.pagination;
    });
    // Actions
    store.dispatch("receipts/getReceipts");

    // Func global
    const nextPage = (pagination) => {
      const maxPage = Math.ceil(pagination.total / pagination.limit);
      if (Number(currentPage.value) === maxPage) return;
      // Increase Page
      currentPage.value++;
      // Navigate query
      router.push({
        name: "Admin-product",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };
    const prevPage = () => {
      if (Number(currentPage.value) === 1) return;
      // Decrease Page
      currentPage.value--;
      // Navigate query
      router.push({
        name: "Admin-product",
        query: {
          ...route.query,
          page: currentPage.value,
        },
      });
    };

    const handleConfirm = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        if (window.confirm("Bạn chắc chắn xác nhận đơn hàng này?")) {
          // Call api
          await receiptApi.confirmReceipt(idReceipt);

          // Get again data
          store.dispatch("receipts/getReceipts");

          alert("Xác nhận đơn hàng thành công");
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };

    const handleDelete = async (idReceipt) => {
      // Submit data
      try {
        loading.value = true;
        if (window.confirm("You confirm delete cart?")) {
          // Call api
          await receiptApi.deleteReceipt(idReceipt);

          // Get again data
          store.dispatch("receipts/getReceipts");

          alert("Delete successfully");
        }
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
    };
    // Listen when page change
    watch(route, () => {
      store.dispatch("products/getProducts", {
        page: currentPage.value,
      });
    });
    return {
      // Data
      receipts,

      loading,

      // Func
      handleConfirm,
      products,
      pagination,

      // Ref
      currentPage,
      type,

      // Func
      nextPage,
      prevPage,
      handleDelete,
    };
  },
  components: { CardProduct, FormAction, CardAction },
};
</script>

<style></style>
