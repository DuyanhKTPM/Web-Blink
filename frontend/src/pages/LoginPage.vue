<template>
  <main
    class=""
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
            Don't have an account?
            <router-link :to="{ name: 'Register', params: {} }" class=""
              >Sign Up</router-link
            >
          </p>
        </div>
        <!-- Start: Form -->
        <form
          @submit.prevent="handleSubmit"
          class="mt-4"
          style="width: 40%; margin: 0 auto"
        >
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
            <div class="row">
              <button
                :disabled="loading"
                class="py-3 text-center text-white bg-orange-400 font-bold rounded-lg w-full bg-primary"
                type="submit"
              >
                {{ !loading ? "Sign In" : "Loading..." }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { authApi } from "@/api/authApi";
import { useRouter } from "vue-router";
import { ACCESS_TOKEN_WEB_BLINKBLINK } from "@/utils/settingSystem";

export default {
  setup() {
    // Hooks
    const router = useRouter();
    // Data
    const email = ref("");
    const password = ref("");

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
        email: email.value,
        password: password.value,
      };

      // Simple validate
      if (!email.value || !password.value)
        return alert("Please fill all information");

      // Submit data
      try {
        loading.value = true;
        // Call api
        const { accessToken } = await authApi.login(data);

        // Save accessToken to localStorage
        localStorage.setItem(ACCESS_TOKEN_WEB_BLINKBLINK, accessToken);

        // Navigate to home page
        router.push({ name: "Home" });

        // Info
        statusResponse.value.success = true;
        statusResponse.value.message = "Login Successfully";
      } catch (err) {
        console.log(err);
        statusResponse.value.success = false;
        statusResponse.value.message = err?.response?.data.message;
      }
      loading.value = false;
    };
    return {
      // Data binding
      email,
      password,

      // Status
      loading,
      statusResponse,

      // Func
      handleSubmit,
    };
  },
};
</script>

<style></style>
