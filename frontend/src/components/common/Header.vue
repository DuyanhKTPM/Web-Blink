<template>
  <header class="px-6 py-2 border-b-[1px] mb-2">
    <nav class="flex justify-between flex-row items-center relative">
      <div
        class="logo basis-1/6 text-xl uppercase text-center font-semibold cursor-pointer"
      >
        <router-link
          :to="{ name: 'Home', params: {} }"
          class="flex items-center"
          style="text-decoration: none"
        >
          <img
            src="/img/logo4.png"
            alt="logo"
            style="object-fit: cover; height: 40px"
          />
          <span
            class="navbar-brand"
            style="font-family: YoungSerif; color: black"
            >BlinkBlink</span
          >
        </router-link>
      </div>

      <ul
        id="ct-top-menu"
        class="basis-5/6 hidden lg:flex lg:items-center lg:justify-end gap-8 uppercase text-sm text-gray-500"
      >
        <li>
          <form @submit.prevent="handleSearch" class="d-flex" role="search">
            <input
              v-model="searchText"
              id="name"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button
              @click="handleSearch"
              class="btn btn-outline-success"
              type="submit"
            >
              Search
            </button>
            <!-- </div> -->
          </form>
        </li>
        <li
          class="ct-top-menu-item"
          :class="pathName === '/' ? 'ct-top-menu-item-active' : ''"
        >
          <router-link
            :to="{ name: 'Home', params: {} }"
            style="text-decoration: none; color: black"
          >
            <span class="mx-2">HOME</span>
          </router-link>
        </li>
        <li
          class="ct-top-menu-item"
          :class="pathName === '/product' ? 'ct-top-menu-item-active' : ''"
        >
          <router-link
            :to="{ name: 'Product', params: {} }"
            style="text-decoration: none; color: black"
          >
            <span class="mx-2">PRODUCT</span>
          </router-link>
        </li>
        <li
          class="ct-top-menu-item"
          :class="pathName === '/about' ? 'ct-top-menu-item-active' : ''"
        >
          <router-link
            :to="{ name: 'About', params: {} }"
            style="text-decoration: none; color: black"
          >
            <span class="mx-2">ABOUT</span>
          </router-link>
        </li>
        <li class="ct-top-menu-cart">
          <div class="flex items-center" @click="navigateCart">
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
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span class="mx-2">CART</span>
            <span
              class="ct-badge-circle bg-orange-400 text-white"
              v-if="quantityCart > 0"
              >{{ quantityCart }}</span
            >
          </div>
        </li>
        <li class="ct-top-menu-profile flex gap-4">
          <div href="" class="flex items-center" v-if="!user">
            <router-link
              :to="{ name: 'Login', params: {} }"
              style="text-decoration: none; color: black"
            >
              <span class="mx-2">LOGIN</span>
            </router-link>
          </div>
          <div class="flex items-center relative group" v-else>
            <span
              class="text-coffee-600 font-semibold"
              v-if="user.role === 'ADMIN'"
              >Admin</span
            >
            <span class="mx-1">
              <img src="../../assets/images/user.jpg" class="w-8 h-8" alt="" />
            </span>
            <ul
              class="absolute z-20 w-[200px] bg-slate-100 rounded-md right-0 top-[100%] overflow-hidden hidden group-hover:block"
            >
              <li
                v-if="user.role === 'ADMIN'"
                class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Admin-receipt', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Mangement receipt order</p>
                </router-link>
                <hr />
              </li>
              <li
                v-if="user.role === 'ADMIN'"
                class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Admin-product', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Mangement products</p>
                </router-link>
                <hr />
              </li>
              <li class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link
                  :to="{ name: 'Profile', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Your Infomation</p>
                </router-link>
                <hr />
              </li>
              <li class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white">
                <router-link
                  :to="{ name: 'History-cart', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Order History</p>
                </router-link>
                <hr />
              </li>
              <li
                v-if="user.role === 'ADMIN'"
                class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Statistical', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">Statistical</p>
                </router-link>
                <hr />
              </li>

              <li
                v-if="user.role === 'ADMIN'"
                class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <router-link
                  :to="{ name: 'Statisticald', params: {} }"
                  style="text-decoration: none; color: black"
                >
                  <p class="capitalize">StatisticalTotal</p>
                </router-link>
                <hr />
              </li>

              <li
                @click="handleLogout"
                class="px-4 hover:bg-blue-500 text-gray-600 hover:text-white"
              >
                <p class="capitalize">Logout</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { ACCESS_TOKEN_WEB_BLINKBLINK } from "@/utils/settingSystem";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
export default {
  setup() {
    // hooks
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // ref
    const searchText = ref("");

    const user = computed(() => store.state.user.user);
    const quantityCart = computed(() => {
      let count = 0;
      store.state.carts.carts.forEach((item) => {
        if (!item.ordered) count++;
      });
      return count;
    });

    // Func global
    const handleSearch = () => {
      router.push({
        name: "Product-search",
        query: {
          title: searchText.value,
        },
      });
    };

    // Handle clear search text
    watch(route, () => {
      // When navigate diffrent search page => clear search text
      if (!route.path.includes("search")) {
        searchText.value = "";
      }
    });

    // Handle token when route change login -> homepage
    // Use this way because when auto change route login to home page not re-render same react
    watch(route, () => {
      // Handle token + save info user when route change
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_BLINKBLINK);
      if (token) {
        const { user } = jwt_decode(token);
        store.commit("user/setUser", user);
      }
    });

    // Handle token when route change login -> homepage -> update cart
    watch(route, () => {
      // Handle token + save info user when route change
      const token = localStorage.getItem(ACCESS_TOKEN_WEB_BLINKBLINK);
      if (token) {
        store.dispatch("carts/getCarts");
      } else {
        store.commit("carts/setCarts", []);
      }
    });

    // Handle token when first time to enter web
    const token = localStorage.getItem(ACCESS_TOKEN_WEB_BLINKBLINK);
    if (token) {
      const { user } = jwt_decode(token);
      store.commit("user/setUser", user);
    }

    // Handle get cart of user
    if (token) {
      store.dispatch("carts/getCarts");
    }

    // Logout
    const handleLogout = () => {
      // Clear token
      localStorage.removeItem(ACCESS_TOKEN_WEB_BLINKBLINK);
      store.commit("user/setUser", null);

      router.push("/login");
    };

    // Handle navigate to cart
    const navigateCart = () => {
      const { user } = store.state.user;
      if (!user) return router.push({ name: "Login" });

      router.push({
        name: "Cart",
      });
    };

    return {
      pathName: computed(() => route.path),
      searchText,
      handleSearch,
      handleLogout,
      navigateCart,
      user,
      quantityCart,
    };
  },
};
</script>

<style></style>
