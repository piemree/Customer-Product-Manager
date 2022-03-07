<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ isPayment ? "Ödeme" : "Borc" }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Miktar">
          <b-input
            v-model="payment_amount"
            type="number"
            :placeholder="isPayment ? 'Ödeme miktarı' : 'Borc mıktarı'"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Kapat" @click="$emit('close')" />
        <b-button
          v-if="isPayment"
          label="Borc Öde"
          type="is-success"
          @click="payment"
        />
        <b-button
          v-else
          label="Bakiye ekle"
          type="is-success"
          @click="addDebt"
        />
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["debtProp", "isPayment"],
  data() {
    return {
      payment_amount: null,
      debt_amount: null
    };
  },
  methods: {
    ...mapActions("debt", ["updateDebt"]),

    async payment() {
      const new_current_balance =
        Number(this.debtProp.current_balance) - Number(this.payment_amount);

      if (new_current_balance < 0) {
        return this.alertError(
          "is-danger",
          "HATA!!!",
          "Ödeme bakiyeden büyük olamaz"
        );
      }

      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: `<b>Borclu Adı: </b> ${this.debtProp.company_name}
                       <br/>
                <b>Eski Bakiye: </b> ${this.debtProp.current_balance}
                     <br/>
                <b>Ödenen Tutar: </b> ${this.payment_amount}
                <br/>
                <b>Yeni Bakiye: </b> ${new_current_balance}
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.updateDebt({
              id: this.debtProp.id,
              updatedData: {
                current_balance: new_current_balance,
                final_payment_date: Date.now(),
                final_payment_amount: this.payment_amount
              }
            });

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Ödeme yapıldı",
              type: "is-success"
            });
            this.$emit("close");
            this.payment_amount = null;
          } catch (error) {
            loadingComponent.close();
            this.$buefy.dialog.alertError(
              "is-danger",
              "HATA!!!",
              "BİRŞEYLER TERS GİTTİ"
            );
          }
          this.payment_amount = null;
        }
      });
    },
    async addDebt() {
      const new_current_balance =
        Number(this.debtProp.current_balance) + Number(this.payment_amount);

      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: `<b>Borclu Adı: </b> ${this.debtProp.company_name}
                       <br/>
                <b>Eski Bakiye: </b> ${this.debtProp.current_balance}
                     <br/>
                <b>Alınan Tutar: </b> ${this.payment_amount}
                <br/>
                <b>Yeni Bakiye: </b> ${new_current_balance}
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.updateDebt({
              id: this.debtProp.id,
              updatedData: {
                current_balance: new_current_balance,
                final_debt_amount: this.debt_amount,
                final_debt_date: Date.now()
              }
            });

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Borç eklendi",
              type: "is-success"
            });
            this.$emit("close");
            this.debt_amount = null;
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
