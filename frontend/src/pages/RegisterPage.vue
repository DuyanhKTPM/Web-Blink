<template>
  <main
    class="mb-8"
    style="background-color: rgb(241, 241, 241); padding: 100px 0px"
  >
    <div class="mt-4">
      <div class="container mx-auto px-8 w-1/2">
        <div style="display: flex; justify-content: center">
          <router-link to="/">
            <img
              src="/img/logo4.png"
              alt="logo"
              style="object-fit: cover; height: 40px"
            />
          </router-link>
          <router-link
            to="/"
            class="navbar-brand fs-4"
            style="font-family: YoungSerif"
            >BlinkBlink</router-link
          >
        </div>
        <!-- Start: Direction -->
        <div style="text-align: center">
          <h3>Log in to your account</h3>
          <p>
            Already have an account?
            <router-link
              :to="{ name: 'Login', params: {} }"
              class="text-primary font-bold"
              >Sign In</router-link
            >.
          </p>
        </div>
        <!-- Start: Form -->
        <form
          @submit.prevent="handleSubmit"
          class="mt-4"
          style="width: 40%; margin: 0 auto"
        >
          <div class="row">
            <label class="flex flex-col mb-3" for="fullname">
              <span class="font-semibold">FullName</span>
              <input
                v-model="fullName"
                id="fullname"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="text"
                placeholder="abc@gmail.com"
              />
              <span
                v-if="errors.fullName"
                class="font-semibold text-red-500 mt-2"
                >{{ errors.fullName }}</span
              >
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="phone">
              <span class="font-semibold">Phone</span>
              <input
                v-model="phone"
                id="phone"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="text"
                placeholder="abc@gmail.com"
              />
              <span
                v-if="errors.phone"
                class="font-semibold text-red-500 mt-2"
                >{{ errors.phone }}</span
              >
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="email">
              <span class="font-semibold">Address</span>
              <input
                v-model="address"
                id="address"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="text"
                placeholder="Can tho..."
              />
              <span
                v-if="errors.address"
                class="font-semibold text-red-500 mt-2"
                >{{ errors.address }}</span
              >
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="email">
              <span class="font-semibold">Email Address</span>
              <input
                v-model="email"
                id="email"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="email"
                placeholder="abc@gmail.com"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col mb-3" for="password">
              <span class="font-semibold">Password</span>
              <input
                v-model="password"
                autocomplete="on"
                id="password"
                class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
                type="password"
                placeholder="Enter your password..."
              />
              <span
                v-if="errors.password"
                class="font-semibold text-red-500 mt-2"
                >{{ errors.password }}</span
              >
            </label>
          </div>
          <div class="row">
            <!-- Start: Error -->
            <h1
              v-if="statusResponse.message"
              class="fs-6"
              :class="
                statusResponse.success
                  ? 'alert alert-success'
                  : 'alert alert-warning'
              "
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
              {{ !loading ? "Sign Up" : "Loading..." }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { authApi } from "@/api/authApi";
import {
  validateFullName,
  validatePhone,
  validateAddress,
  validatePassword,
} from "@/utils/validateForm";

export default {
  setup() {
    // Data
    const fullName = ref("");
    const phone = ref("");
    const address = ref("");
    const email = ref("");
    const password = ref("");

    // status before submiting
    const errors = ref({
      fullName: "",
      phone: "",
      address: "",
      password: "",
    });
    // Status before call api
    const loading = ref(false);
    // status after calling api
    const statusResponse = ref({
      success: false,
      message: "",
    });

    // Func global
    const handleSubmit = async () => {
      // Data
      let data = {
        fullName: fullName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        password: password.value,
      };

      // Simple validate
      if (
        !fullName.value ||
        !phone.value ||
        !address.value ||
        !email.value ||
        !password.value
      )
        return alert("Please fill all information");

      // Validate detail field
      const errFullName = validateFullName(fullName.value);
      const errPhone = validatePhone(phone.value);
      const errAdress = validateAddress(address.value);
      const errPassword = validatePassword(password.value);
      errors.value.fullName = errFullName;
      errors.value.phone = errPhone;
      errors.value.address = errAdress;
      errors.value.password = errPassword;

      if (errFullName || errPhone || errAdress || errPassword) return;

      // Submit data
      try {
        loading.value = true;
        // Call api
        const user = await authApi.register(data);

        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Register Successfully";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      fullName,
      phone,
      address,
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Validate
      errors,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style></style>
