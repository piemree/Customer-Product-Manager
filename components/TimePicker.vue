<template>
  <section>
    <div
      class="is-flex is-justify-content-space-around is-align-items-flex-end"
      style="max-width: 24rem"
    >
      <b-field style="min-width: 8rem" class="mb-0" label="Başlangıç">
        <b-datepicker
          v-model="start"
          :locale="locale"
          placeholder="Seçmek için basın."
          trap-focus
        >
        </b-datepicker>
      </b-field>
      <b-field class="mb-0" style="min-width: 8rem" label="Bitiş">
        <b-datepicker
          v-model="end"
          :locale="locale"
          placeholder="Seçmek için basın."
          trap-focus
        >
        </b-datepicker>
      </b-field>
      <b-field>
        <b-button @click="getByDate" class="is-warning is-light">
          Tarihe git
        </b-button>
      </b-field>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      start: new Date(Date.now()-1000*60*60*24),
      end: new Date(),
      locale: "tr-TR",
    };
  },

  methods: {
    getByDate() {
      this.$store.dispatch("customer/getShopingHistory", {
        start: this.start.getTime(),
        end: this.end.getTime(),
      });
    },
  },
};
</script>