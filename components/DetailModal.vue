<template class="">
  <form action="" class="is-flex is-justify-content-center">
    <div class="modal-card " style="width:20rem; ">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
            type="email"
           
            placeholder="Your email"
            required
          >
          </b-input>
          
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button @click="update" label="Login" type="is-primary" />
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ["customer"],
  methods: {
      update(){
      console.log(this.customer);
  }
  },
};
</script>

