<template>
  <div>
    <b-navbar v-if="user">
      <template #brand>
         <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >DM</b-navbar-item
        >
        <b-navbar-item v-if="admin">
          <b>Total:</b><span>{{ totalBalance }} TL</span>
        </b-navbar-item>
        <b-navbar-item>
          <b>Tahsilat:</b><span>{{ endOfDay }} TL</span>
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
    <b-button
      v-if="user"
      style="position: absolute; z-index: 1; right: 1rem"
      class="is-small"
      @click="$router.go(-1)"
      >Geri</b-button
    >
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
    let start = Date.now() - 48 * 60 * 60 * 1000;
    this.$store.dispatch("customer/getAllCustomersRealTime");
    this.$store.dispatch("customer/getShopingHistory", {
      start: start,
      end: Date.now()
    });
    this.$store.dispatch("product/getAllProductsRealTime");
  },

  computed: {
    totalBalance() {
      let balance = this.$store.getters["customer/GET_TOTAL_BALANCE"];

      var total = numeral(balance).format("0,0");
      return total;
    },
    endOfDay() {
      const today = new Date().getDate();
      let history = this.$store.getters["customer/GET_CUSTOMERS_HİSTORY"];

      const todayShopping = history.filter(
        el => new Date(el.date).getDate() === today
      );
      
      let allTotal = 0;
      todayShopping.forEach(shopping => (shopping.seller=='dagitim' ? allTotal += parseFloat(shopping.quantity):false));

   
      return allTotal;
    },
    user() {
      return this.$store.getters["auth2/GET_USER"];
    },
    admin() {
      return this.$store.getters["auth2/GET_İSADMİN"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth2/signout");
    }
  }
};
</script>
