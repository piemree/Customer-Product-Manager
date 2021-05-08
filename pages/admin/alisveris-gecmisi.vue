<template>
  <section class="section">
    <h3 class="title">Satış/Tahsilat Geçmişi</h3>

    <b-table
      :data="history"
      :paginated="true"
      :per-page="10"
      :narrowed="true"
      :mobile-cards="false"
      :row-class="
        (row, index) => (row.type === 'satış' ? 'is-danger' : 'is-success')
      "
    >
      <b-table-column field="company" label="Firma" searchable v-slot="props">
        {{ props.row.company }}
      </b-table-column>
      <b-table-column
        width="80"
        field="quantity"
        label="Miktar"
        sortable
        v-slot="props"
      >
        {{ props.row.quantity }} TL
      </b-table-column>
      <b-table-column
        width="150"
        field="date"
        label="Tarih"
        sortable
        v-slot="props"
      >
        {{ $convert(props.row.date) }}
      </b-table-column>
      <b-table-column width="30" v-slot="props" field="details">
        <b-button
          @click="showDetails(props.row.details)"
          v-if="props.row.details.length > 0"
          class="is-small"
          >D</b-button
        >
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
  methods: {
    showDetails(details) {
      this.$buefy.dialog.alert({
        title: "Detay",
        message: `${details.map((el) => {
          return `
            <p>
                    <b>Ürün: </b>${el.product.name}
                    </p>
                    <p>
                    <b>Adet: </b>${el.count}
                    </p>
                    <p>
                    <b>Ara toplam: </b>${el.total} TL
                    </p>
                    <hr class="my-2"/>
            `;
        })} `,
        confirmText: "OK",
      });
    },
  },
  computed: {
    history() {
      return this.$store.getters["customer/GET_CUSTOMERS_HİSTORY"];
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