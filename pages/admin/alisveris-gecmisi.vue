<template>
  <section class="section">
    <h3 class="title">Satış/Tahsilat Geçmişi</h3>
    <TimePicker />
    <div
      @change="onChanged"
      class="is-flex is-justify-content-space-evenly is-flex-wrap-wrap py-4"
    >
      <div style="min-width:5rem;" class="my-2">
        <b>Yonetim:</b> <input ref="yonetim" type="checkbox" value="yonetim" />
      </div>
      <div style="min-width:5rem;" class="my-2">
        <b>Dagıtım:</b> <input ref="dagitim" type="checkbox" value="dagitim" />
      </div>
    </div>
    <b-table
      :data="checkeds.length === 0 ? history : filteredHistory"
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
      <b-table-column field="quantity" label="Miktar" sortable v-slot="props">
        {{ props.row.quantity }} TL
      </b-table-column>
      <b-table-column field="date" label="Tarih" sortable v-slot="props">
        {{ $convert(props.row.date) }}
      </b-table-column>
      <b-table-column width="100" label="Satıcı" v-slot="props">
        <p
          @click="props.row.details.length > 0 ? showDetails(props.row.details) : false"
          class="seller has-text-weight-semibold"
        >
          {{ props.row.seller ? props.row.seller.toUpperCase() : "-" }}
        </p>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import TimePicker from "@/components/TimePicker";
export default {
  middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      return ctx.redirect("/auth/login");
    } else if (!ctx.store.getters["auth2/GET_İSADMİN"]) {
      return ctx.redirect("/");
    }
  },
  components: {
    TimePicker
  },
  data() {
    return {
      filteredHistory: [],
      checkeds: []
    };
  },
  methods: {
    onChanged() {
      this.checkeds = [this.$refs.yonetim, this.$refs.dagitim].filter(el => {
        if (el.checked) return true;
      });

      const filteredHistory = this.history.filter(row => {
        return this.checkeds.some(input => {
          return input.value === row.seller;
        });
      });
      this.filteredHistory = [...filteredHistory];
    },
    showDetails(details) {
      this.$buefy.dialog.alert({
        title: "Detay",
        message: `${details
          .map(el => {
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
          })
          .join("")} `,
        confirmText: "OK"
      });
    }
  },
  computed: {
    history() {
      return this.$store.getters["customer/GET_CUSTOMERS_HİSTORY"];
    }
  },
};
</script>

<style>
tr.is-success .seller {
  background-color: rgb(98, 255, 98);

  border-radius: 7px;
  padding: 1px 5px;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
}
tr.is-danger .seller {
  background-color: rgb(252, 107, 107);
  border-radius: 7px;
  padding: 1px 5px;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
}
</style>
