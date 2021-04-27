<template>
  <section class="section">
    <b-field label="Firma Adı">
      <b-input v-model="name" style="width: 20rem"></b-input>
    </b-field>
    <b-table
      :data="customers"
      :columns="columns"
      paginated
      per-page="5"
      focusable
      bordered
      hoverable
      
      @click="payment"
    >
    </b-table>
  </section>
</template>
<script>

export default {
  
  methods: {
    payment(e) {
      this.$router.push(`/${e.id}`)
    },
  },
  
  computed: {
    customers() {
     let all= this.$store.getters["customer/GET_CUSTOMERS"]
      const regex = new RegExp(`^${this.name.toLowerCase()}`, "g");
      return all.filter(
        ({ firma_adı, yetkili }) =>
          firma_adı.toLowerCase().match(regex) ||
          yetkili.toLowerCase().match(regex)
      );
    },
    
  },
  data() {
    return {
      showCustomerUpdate:false,
      name: "",
    
      columns: [
        {
          field: "firma_adı",
          label: "Firma",
        },
        {
          field: "yetkili",
          label: "Yetkili",
        },
        {
          field: "date",
          label: "Son tahsilat tarihi",
          centered: true,
        },
        {
          field: "son_tahsilat",
          label: "Son tahsilat miktarı",
        },
        {
          field: "bakiye",
          label: "Bakiye",
        },
      ],
    };
  },
};
</script>
