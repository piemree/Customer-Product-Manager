<template>
  <div>
    <b-navbar v-if="user">
      <template #brand>
        <b-navbar-item v-if="admin">
          <b>Total:</b><span>{{ totalBalance }} TL</span>
        </b-navbar-item>
        <b-navbar-item v-if="admin" tag="router-link" :to="{ path: '/admin/tahsilat' }">
          <b>Tahsilat:</b><span>{{ totalCollected() }} TL</span>
        </b-navbar-item>
        <b-navbar-item>
          <b-dropdown v-if="!admin" aria-role="list">
            <template #trigger="{ active }">
              <b-button :icon-right="active ? 'menu-up' : 'menu-down'"
                >{{ cardCollected() + cashCollected() }} TL</b-button
              >
            </template>

            <b-dropdown-item aria-role="listitem">
              <b>Nakit tahsilat:</b><span>{{ cashCollected() }} TL</span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <b>Kart tahsilat:</b><span>{{ cardCollected() }} TL</span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <b>Toplam tahsilat:</b
              ><span>{{ cardCollected() + cashCollected() }} TL</span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem"
              ><b>Satış miktarı:</b
              ><span>{{ totalSellsAmount() }} TL</span></b-dropdown-item
            >
          </b-dropdown>
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
        <b-navbar-item
          v-if="admin"
          tag="router-link"
          :to="{ path: '/admin/tahsilat' }"
        >
          Tahsilat Takip
        </b-navbar-item>
             <b-navbar-item tag="router-link" :to="{ path: '/admin/debt-list' }">
          Borc Listesi
        </b-navbar-item>
             <b-navbar-item tag="router-link" :to="{ path: '/admin/new-debt' }">
          Borclu Ekle
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
    <div class="container pt-5">
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
    this.$store.dispatch("debt/getAllDebtsRealTime");
    this.$store.dispatch("customer/getAllCustomersRealTime");
    this.$store.dispatch("customer/getShopingHistory", {
      start: start,
      end: Date.now()
    });
    this.$store.dispatch("product/getAllProductsRealTime");
  },

  computed: {
    todayShopping() {
      const today = new Date().getDate();
      let history = this.$store.getters["customer/GET_CUSTOMERS_HİSTORY"];

      return history.filter(el => new Date(el.date).getDate() === today);
    },

    totalBalance() {
      let balance = this.$store.getters["customer/GET_TOTAL_BALANCE"];

      var total = numeral(balance).format("0,0");
      return total;
    },
    user() {
      return this.$store.getters["auth2/GET_USER"]?.split("@")[0];
    },
    admin() {
      return this.$store.getters["auth2/GET_İSADMİN"];
    }
  },
  methods: {
    totalCollected() {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (shopping.details.length === 0)
          allTotal += parseFloat(shopping.quantity);
      });

      return allTotal;
    },
    cashCollected() {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (
          shopping.seller == this.user &&
          shopping.details.length === 0 &&
          shopping.card === false
        ) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    },
    cardCollected() {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (
          shopping.seller == this.user &&
          shopping.details.length === 0 &&
          shopping.card === true
        ) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    },
    totalSellsAmount() {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (shopping.seller == this.user && shopping.details.length > 0) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    },
    logout() {
      this.$store.dispatch("auth2/signout");
    }
  }
};
</script>
