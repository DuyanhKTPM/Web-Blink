<template>
  <div id="home-page" class="">
    <div class="banner">
      <div class="ms-5 title position-absolute">
        <h1 class="fw-bolder">Shine Your Light</h1>
        <p class="fw-lighter fs-5">
          View the Jewelry Collection and discover the latest trends in fashion
          and accessories. We have everything you need to look your best this
          season.
        </p>
        <router-link to="/product"
          ><button type="button" class="btn btn-dark fw-bolder">
            Shop now
          </button></router-link
        >
      </div>
      <img
        src="/img/banner2.webp"
        alt="h"
        style="height: 600px; width: 100%; object-fit: cover"
      />
    </div>
    <div class="category">
      <div class="title-cate mx-5">
        <p class="fw-semibold fs-3">Shop by Category</p>
        <router-link to="/product">
          <p class="fw-normal"><u>View all</u></p>
        </router-link>
      </div>
      <div class="thumbnail-cate mx-5">
        <div class="ring-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Rings</p>
          <img
            src="/img/ring-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="ring-thumbnail"
          />
        </div>
        <div class="necklace-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Necklace</p>
          <img
            src="/img/necklace-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="necklace-thumbnail"
          />
        </div>
        <div class="earring-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Earring</p>
          <img
            src="/img/earring-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="earring-thumbnail"
          />
        </div>
        <div class="bracelet-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Bracelet</p>
          <img
            src="/img/bracelet-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="bracelet-thumbnail"
          />
        </div>
        <div class="anklet-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Anklet</p>
          <img
            src="/img/anklet-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="anklet-thumbnail"
          />
        </div>
        <div class="glasses-thumbnail position-relative">
          <p class="position-absolute fw-bold bottom-0">Glasses</p>
          <img
            src="/img/glasses-thumbnail.jpg"
            class="rounded mx-auto d-block"
            alt="glasses-thumbnail"
          />
        </div>
      </div>
      <div class="more mx-5">
        <div class="more-item rounded">
          <img src="/icon/box.svg" alt="freeship" />
          <p>
            <span class="fw-bold fs-5">Free Shipping</span> <br />
            Free shipping on order over €50
          </p>
        </div>
        <div class="more-item rounded">
          <img src="/icon/moneyback.svg" alt="peaceofmind" />
          <p>
            <span class="fw-bold fs-5">Peace of Mind</span> <br />
            30 days money back guarantee
          </p>
        </div>
        <div class="more-item rounded">
          <img src="/icon/secure.svg" alt="secure" />
          <p>
            <span class="fw-bold fs-5">100% Payment Secure</span> <br />
            Your payment are safe with us.
          </p>
        </div>
        <div class="more-item rounded">
          <img src="/icon/support.svg" alt="support" />
          <p>
            <span class="fw-bold fs-5">Support 24/7</span> <br />
            24/7 Online support
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  align-items: center;
}

.title {
  width: 40%;
  text-align: center;
}

.title-cate {
  display: flex;
  justify-content: space-between;
}

.title-cate u {
  color: rgb(35, 184, 230);
}

.category {
  padding-top: 20px;
  background-color: rgb(241, 241, 241);
}

.thumbnail-cate {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
}

.thumbnail-cate img {
  object-fit: cover;
  width: 200px;
  height: 300px;
}

.thumbnail-cate p {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.more {
  display: flex;
  justify-content: space-between;
  padding-top: 100px;
  padding-bottom: 100px;
}

.more-item {
  display: grid;
  background-color: rgb(255, 255, 255);
  grid-template-columns: auto auto;
  justify-content: space-around;
  align-items: center;
  width: 24%;
  height: 150px;
}

@media (min-width: 768px) {
  .thumbnail-cate {
    grid-template-columns: auto auto auto;
  }
}

@media (min-width: 992px) {
  .thumbnail-cate {
    grid-template-columns: auto auto auto auto;
  }
}

@media (min-width: 1200px) {
  .thumbnail-cate {
    grid-template-columns: auto auto auto auto auto auto;
  }
}
</style>

<script>
import Banner from "@/components/Home/Banner.vue";
import Advertisement from "@/components/Home/OurProduct.vue";
import FeaturedProduct from "@/components/Home/FeaturedProduct.vue";
import Parallax from "@/components/Home/Parallax.vue";
import Subheadline from "../components/common/Subheadline.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  components: {
    Banner,
    Advertisement,
    FeaturedProduct,

    Parallax,
    Subheadline,
  },
  setup() {
    // Hooks
    const store = useStore();

    // Actions
    store.dispatch("products/getProducts", { page: 1 });

    // Data
    const featureProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 2);
    });

    const moreProduct = computed(() => {
      const data = store.state.products.products;

      return data.slice(0, 6);
    });

    const error = computed(() => {
      return store.state.products.error;
    });
    return {
      featureProduct,
      moreProduct,
      error,
    };
  },
};
</script>

<style></style>
