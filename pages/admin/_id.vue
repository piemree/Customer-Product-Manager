<template>
  <section class="section">
    <h3 class="title">{{ productName }}</h3>
    <b-table
      :data="history"
      :paginated="true"
      :per-page="10"
      :mobile-cards="false"
      :row-class="
        (row, index) => (row.type === 'sold' ? 'is-danger' : 'is-success')
      "
    >
      <b-table-column field="company" label="Firma" searchable v-slot="props">
        {{ props.row.company }}
      </b-table-column>
      <b-table-column field="count" label="Adet" v-slot="props">
        {{ props.row.count }}
      </b-table-column>
      <b-table-column field="remaingStock" label="Kalan" v-slot="props">
        {{ props.row.remaingStock }}
      </b-table-column>
      <b-table-column
        width="150"
        field="updateDate"
        label="Tarih"
        sortable
        v-slot="props"
      >
        {{ $convert(props.row.updateDate) }}
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
export default {
  middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      return ctx.redirect("/auth/login");
    } else if (!ctx.store.getters["auth2/GET_İSADMİN"]) {
      return ctx.redirect("/");
    }
  },
  computed: {
    history() {
      /*  let history = new Array(
        ...this.$store.getters["product/GET_PRODUCT_HİSTORY"]
      );
      return history.sort(function (a, b) {
  return b.updateDate - a.updateDate;
}); */
      return this.$store.getters["product/GET_PRODUCT_HİSTORY"];
    },
    productName() {
      return this.$store.getters["product/GET_PRODUCT_NAME"];
    },
  },
};
</script>
<style>
tr.is-success {
  background: #48c774;
  color: rgb(255, 255, 255);
}
tr.is-danger {
  background: #f14668;
  color: rgb(255, 255, 255);
}
</style>