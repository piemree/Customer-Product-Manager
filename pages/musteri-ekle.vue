<template>
  <section class="section">
    <h3 class="subtitle">Müşteri Ekle</h3>
    <b-field>
      <b-input
        placeholder="Firma Adı"
        type="search"
        icon="magnify"
        icon-clickable
        @icon-click="searchIconClick"
      >
      </b-input>
    </b-field>

    <b-field>
      <b-input placeholder="Email" v-model="email" type="email" icon="email">
      </b-input>
    </b-field>

    <b-field>
      <b-input placeholder="Credit card" icon="credit-card"> </b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    searchIconClick() {
      alert("You wanna make a search?");
    },
    clearIconClick() {
      this.email = "";
      alert("Email cleared!");
    },
  },
};
</script>
