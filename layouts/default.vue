<template>
  <div>
    <b-navbar v-if="user">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1>DMGARAGE</h1>
        </b-navbar-item>
        <b-navbar-item v-if="admin">
          <b>Total:</b><span>{{ totalBalance }} TL</span>
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >Müşteriler</b-navbar-item
        >
        <b-navbar-item tag="router-link" :to="{ path: '/musteri-ekle' }">
          Müşteri Ekle
        </b-navbar-item>
        <b-navbar-item
          v-if="admin"
          tag="router-link"
          :to="{ path: '/admin/yonetim' }"
        >
          Ürün Yönetim
        </b-navbar-item>
        <b-navbar-item
          v-if="admin"
          tag="router-link"
          :to="{ path: '/admin/alisveris-gecmisi' }"
        >
          Alışveriş Takip
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div" :to="{ path: '/auth/login' }">
          <div class="buttons">
            <b-button @click="logout" class="is-danger is-light"
              >Çıkış yap</b-button
            >
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
export default {
  name: "default",

  created() {
    this.$store.dispatch("customer/getAllCustomersRealTime");
    this.$store.dispatch("customer/getShopingHistory");
    this.$store.dispatch("product/getAllProductsRealTime");
  },

  computed: {
    totalBalance() {
      let balance = this.$store.getters["customer/GET_TOTAL_BALANCE"];

      var total = numeral(balance).format("0,0");
      return total;
    },
    user() {
      return this.$store.getters["auth2/GET_USER"];
    },
    admin() {
      return this.$store.getters["auth2/GET_İSADMİN"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth2/signout");
    },
  },
};
</script>

