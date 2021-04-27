<template >
  <div class="section">
    <b-field label="Firma Adı">
      <b-input :value="customer.firma_adı.toString()" disabled></b-input>
    </b-field>
    <b-field label="Firma Sahibi">
      <b-input :value="customer.yetkili.toString()" disabled></b-input>
    </b-field>
    <b-field label="Son Tahsilat Tarihi">
      <b-input :value="customer.date.toString()" disabled></b-input>
    </b-field>
    <b-field label="Son Tahsilat">
      <b-input :value="customer.son_tahsilat.toString()" disabled></b-input>
    </b-field>
    <b-field label="Son Bakiye">
      <b-input :value="customer.bakiye.toString()" disabled></b-input>
    </b-field>

    <b-field label="Tahsilat Al">
      <b-field grouped>
        <b-numberinput :controls="false" v-model="decreaseCount" />
        <p class="control">
          <b-button @click="decreaseBacance" label="Tahsilat" />
        </p>
      </b-field>
    </b-field>
    <b-field label="Bakiye Ekle">
      <b-field grouped>
        <b-numberinput :controls="false" v-model="addCount" />
        <p class="control">
          <b-button @click="addBalance" label="Ekle" />
        </p>
      </b-field>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addCount: 0,
      decreaseCount: 0,
    };
  },
  methods: {
    addBalance() {
      this.$store.dispatch("customer/updateBacalance", {
        id: this.customer.id,
        balance: parseFloat(this.addCount).toFixed(2),
        date: new Date().toLocaleString("tr"),
      });
    },
    decreaseBacance() {
      this.$store.dispatch("customer/updateBacalance", {
        id: this.customer.id,
        balance: parseFloat(this.decreaseCount).toFixed(2) * -1,
        date: new Date().toLocaleString(),
      });
    },
  },
  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
  },
  created() {
    this.$store.getters["customer/GET_CUSTOMERS"].length === 0
      ? this.$router.push("/")
      : false;
  },
};
</script>
