<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1>DMGARAGE</h1>
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >Müşteriler</b-navbar-item
        >
        <b-navbar-item tag="router-link" :to="{ path: '/musteri-ekle' }">
          Müşteri Ekle
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/urun-ekle' }">
          Ürün Ekle
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Çıkış yap</strong>
            </a>
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
export default {
  created() {
    this.$store.dispatch("customer/getAllCustomersRealTime");
    
  },
};
</script>

