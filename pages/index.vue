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
      @click="show"
    >
    </b-table>
  </section>
</template>
<script>
export default {
  methods: {
    show(e) {
      console.log(e);
    },
  },
  computed: {
    customers() {
      const regex = new RegExp(`^${this.name}`, "g");
      return this.data.filter(
        ({ firma_adı, yetkili }) =>
          firma_adı.toLowerCase().match(regex) ||
          yetkili.toLowerCase().match(regex)
      );
    },
  },
  data() {
    return {
      name: "",
      data: [
        {
          id: 1,
          firma_adı: "Güneş Yıkama",
          yetkili: "Barış çelik",
          date: "2016-10-15 13:43:27",
          son_tahsilat: "50",
          bakiye: "450",
        },
        {
          id: 2,
          firma_adı: "Ay Yıkama",
          yetkili: "Mahmut kel",
          date: "2016-10-15 13:43:27",
          son_tahsilat: "100",
          bakiye: "800",
        },
        {
          id: 3,
          firma_adı: "Yıldız Yıkama",
          yetkili: "Şaban çapa",
          date: "2016-10-15 13:43:27",
          son_tahsilat: "250",
          bakiye: "1350",
        },
        
      ],
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
