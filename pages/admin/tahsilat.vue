<template>
  <section class="section">
    <b-table :data="workerCollectedList" :bordered="false">
      <b-table-column field="workerName" label="Kullanıcı" v-slot="props">
        {{ props.row.workerName}}
      </b-table-column>
      <b-table-column field="cash" label="Nakit" v-slot="props">
        {{ props.row.cash }} TL
      </b-table-column>
      <b-table-column field="card" label="Kart" v-slot="props">
        {{ props.row.card }} TL
      </b-table-column>
      <b-table-column label="Toplam Tahsilat" v-slot="props">
        {{ props.row.card + props.row.cash }} TL
      </b-table-column>
      <b-table-column field="totalSell" label="Toplam Satış" v-slot="props">
        {{ props.row.totalSell }} TL
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      workers: ["yonetim", "dagitim", "dagitim1", "Toplam"],
      workerCollectedList: []
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let totalCash = 0;
      let totalCard = 0;
      let totalSellSum = 0;
      this.workerCollectedList = this.workers.map((worker, i) => {
        totalCash += this.cashCollected(worker);
        totalCard += this.cardCollected(worker);
        totalSellSum += this.totalSellsAmount(worker);
        if (i == this.workers.length - 1) {
          return {
            workerName: worker,
            cash: totalCash,
            card: totalCard,
            totalSell: totalSellSum
          };
        }
        return {
          workerName: worker,
          cash: this.cashCollected(worker),
          card: this.cardCollected(worker),
          totalSell: this.totalSellsAmount(worker)
        };
      });
    },
    cashCollected(worker) {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (
          shopping.seller == worker &&
          shopping.details.length === 0 &&
          shopping.card === false
        ) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    },
    cardCollected(worker) {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (
          shopping.seller == worker &&
          shopping.details.length === 0 &&
          shopping.card === true
        ) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    },
    totalSellsAmount(worker) {
      let allTotal = 0;
      this.todayShopping.forEach(shopping => {
        if (shopping.seller == worker && shopping.details.length > 0) {
          allTotal += parseFloat(shopping.quantity);
        }
      });

      return allTotal;
    }
  },
  computed: {
    todayShopping() {
      const today = new Date().getDate();
      let history = this.$store.getters["customer/GET_CUSTOMERS_HİSTORY"];
      return history.filter(el => new Date(el.date).getDate() === today);
    }
  },
  watch: {
    todayShopping() {
      this.updateData();
    }
  }
};
</script>
