<template>
  <div>
    <b-navbar v-if="islogged">
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
          :to="{ path: '/admin/urun-ekle' }"
        >
          Ürün Yönetim
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
  beforeCreate() {
    this.$isauth();
  },
  created() {
    this.$store.dispatch("customer/getAllCustomersRealTime");
    this.$store.dispatch("product/getAllProductsRealTime");
  },

  computed: {
    totalBalance() {
      let balance = this.$store.getters["customer/GET_TOTAL_BALANCE"];

      var total = numeral(balance).format("0,0");
      return total;
    },
    islogged() {
      return this.$store.getters["auth2/GET_LOGGEDIN"];
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
  watch: {
    $router() {
      this.$isauth();
    },
  },
};
</script>

