<template>
  <div class="">
    <h1 class="text-center text-xl font-semibold">
      {{ type === "add" ? "Add Product" : "Update Product" }}
    </h1>
    <form @submit.prevent="handleSubmit" class="px-6 py-4">
      <div class="row">
        <label class="flex flex-col mb-3" for="email">
          <span class="font-semibold">Title</span>
          <input
            v-model="title"
            id="title"
            class="px-4 py-2 rounded-lg border border-gray-100 mt-1"
            type="text"
            placeholder="Enter title product"
          />
        </label>
      </div>
      <div class="row">
        <label class="flex flex-col mb-3">
          <span class="font-semibold">Description</span>
          <textarea
            v-model="description"
            placeholder="Enter description"
            class="resize rounded-md border p-2"
          >
          </textarea>
        </label>
      </div>
      <div class="row">
        <label class="flex flex-col mb-3" for="password">
          <span class="font-semibold">Link Image</span>
          <input
            v-model="image"
            autocomplete="on"
            id="image"
            class="px-4 py-2 rounded-lg border border-gray-100 mt-1"
            type="text"
            placeholder="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"
          />
        </label>
      </div>
      <div class="row">
        <label class="flex flex-col mb-3" for="password">
          <span class="font-semibold">totalQuantity:</span>
          <input
            v-model="quantitySum"
            autocomplete="on"
            id="quantitySum"
            class="px-4 py-2 rounded-lg border border-gray-100 mt-1"
            type="number"
            placeholder="50"
          />
        </label>
      </div>
      <div class="row">
        <label class="flex flex-col mb-3" for="password">
          <span class="font-semibold">Price</span>
          <input
            v-model="price"
            autocomplete="on"
            class="px-4 py-1 rounded-lg border border-gray-800 mt-1"
            type="number"
            placeholder="99.0000"
          />
        </label>
      </div>

      <!-- Start: Error Or Success -->
      <div class="row">
        <h1
          v-if="statusResponse.message"
          class="text-center mb-4"
          :class="statusResponse.success ? 'text-green-500' : 'text-red-500'"
        >
          {{ statusResponse.message }}
        </h1>
      </div>

      <!-- Start: Submit -->
      <div class="row">
        <button
          :disabled="loading"
          class="py-3 text-center text-white bg-orange-400 font-bold rounded-lg w-full bg-primary"
          type="submit"
        >
          {{ type === "add" ? "Add Product" : "Update Product" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { productsApi } from "@/api/productsApi";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  props: ["type", "productEdit"],
  setup({ type, productEdit }, context) {
    // Hooks
    const store = useStore();
    const route = useRoute();
    // Data
    const title = ref(productEdit?.title || "");
    const description = ref(productEdit?.description || "");
    const image = ref(productEdit?.image || "");
    const price = ref(productEdit?.price || "");
    const quantitySum = ref(productEdit?.quantitySum || "");

    // Ref
    const loading = ref(false);
    // status after calling api
    const statusResponse = ref({
      success: false,
      message: "",
    });
    // Func global
    const handleSubmit = async () => {
      const data = {
        title: title.value,
        description: description.value,
        image: image.value,
        price: price.value,
        quantitySum: quantitySum.value,
      };
      // Simple validate
      if (
        !title.value ||
        !description.value ||
        !image.value ||
        !price.value ||
        !quantitySum.value
      )
        return alert("Please enter enough information");

      // Submit data
      try {
        loading.value = true;

        // Call api
        if (type === "add") {
          await productsApi.addProduct(data);
          // Info
          statusResponse.value.success = true;
          statusResponse.value.message = "Add Product Successfully";
        } else {
          await productsApi.editProduct({
            ...data,
            idProduct: productEdit._id, // Need to provide id because in case add doesn't id
          });
          // Info
          statusResponse.value.success = true;
          statusResponse.value.message = "Update Product Successfully";
        }

        // Get data
        store.dispatch("products/getProducts", {
          // Page
          page: route.query.page || 1,
        });
        await updateProductQuantitiesAfterAddOrUpdate();
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }

      loading.value = false;
    };
    ///////////////////
    const updateProductQuantitiesAfterAddOrUpdate = async () => {
      try {
        // Assuming you have the product details available in your component
        const productDetails = {
          _id: "productId", // Replace with the actual product ID
          quantity: 10, // Replace with the desired quantity
        };

        await productsApi.updateProductQuantity(productDetails);
      } catch (err) {
        console.error("Failed to update product quantity after add or update");
      }
    };
    return {
      // Data binding
      title,
      description,
      image,
      price,
      quantitySum,
      // Ref
      loading,
      statusResponse,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style></style>
