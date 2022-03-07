<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Borc ekle</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Miktar">
          <b-input
            v-model="debt_amount"
            type="number"
            placeholder="Borc miktarı"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Kapat" @click="$emit('close')" />
        <b-button label="Borc ekle" type="is-success" @click="addDebtMethod" />
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["debtProp"],
  data() {
    return {
      debt_amount: null
    };
  },
  methods: {
    ...mapActions("debt", ["addDebt"]),

    async addDebtMethod() {
      const new_current_balance =
        Number(this.debtProp.current_balance) + Number(this.debt_amount);

      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: `<b>Borclu Adı: </b> ${this.debtProp.company_name}
                       <br/>
                <b>Eski Bakiye: </b> ${this.debtProp.current_balance}
                     <br/>
                <b>Alınan borc: </b> ${this.debt_amount}
                <br/>
                <b>Yeni Bakiye: </b> ${new_current_balance}
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.debtPayment({
              id: this.debtProp.id,
              new_current_balance: new_current_balance,
              debt_amount: this.debt_amount
            });

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Ödeme yapıldı",
              type: "is-success"
            });
            this.$emit("close");
          } catch (error) {
            loadingComponent.close();
            this.$buefy.dialog.alertError(
              "is-danger",
              "HATA!!!",
              "BİRŞEYLER TERS GİTTİ"
            );
          }
          this.debt_amount = null;
        }
      });
    },
    alertError(type, title, message) {
      this.$buefy.dialog.alert({
        title: title,
        message: message,
        type: type,
        hasIcon: false,
        icon: "exclamation",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true
      });
    }
  }
};
</script>
