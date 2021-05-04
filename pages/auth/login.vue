<template>
  <section class="section is-flex is-justify-content-center">
    <section>
      <header>
        <h3 class="title mb-3" style="text-align: center">Giriş</h3>
      </header>
      <form class="box" @submit.prevent="signin">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="user.email"
              class="input"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Şifre</label>
          <div class="control">
            <input
              v-model="user.password"
              class="input"
              type="password"
              placeholder="Şifre"
            />
          </div>
        </div>

        <button type="submit" class="button">Giriş yap</button>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signin() {
      this.$store.dispatch("auth2/login", this.user);
    },
  },
  beforeCreate() {
    this.$isauth();
  },
 
};
</script>

<style>
</style>