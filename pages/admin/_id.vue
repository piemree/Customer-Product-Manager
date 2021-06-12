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
        <p class="state has-text-weight-semibold">{{ props.row.type === "sold" ? "-" : "+" }}{{ props.row.count }}</p>
      </b-table-column>
      <b-table-column field="remaingStock" label="Kalan" v-slot="props">
        <p class="state has-text-weight-semibold">{{ props.row.remaingStock }}</p>
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
      return this.$store.getters["product/GET_PRODUCT_HİSTORY"];
    },
    productName() {
      return this.$store.getters["product/GET_PRODUCT_NAME"];
    }
  }
};
</script>
<style>
tr.is-success .state {
  background-color: rgb(98, 255, 98);
  border-radius: 7px;
  padding: 1px 5px;
  font-size: 13px;
  text-align: center;
}
tr.is-danger .state {
  background-color: rgb(252, 107, 107);
  border-radius: 7px;
  padding: 1px 5px;
  font-size: 13px;
  text-align: center;
}
</style>
