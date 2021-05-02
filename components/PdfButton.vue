<template >
  <div class="mt-5 is-flex is-justify-content-center">
    <b-button @click="downloadPdf" class="is-danger">PDF İNDİR</b-button>
  </div>
</template>
<script>
/* import jsPDF from "jspdf";
import "jspdf-autotable"; */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: ["customer"],
  methods: {
    downloadPdf() {
      let productsBody = [
        [
          { style: "tableHeader", text: "Ürün Adı" },
          { style: "tableHeader", text: "Adet" },
          { style: "tableHeader", text: "Fiyat" },
          { style: "tableHeader", text: "Ara Toplam" },
        ],
      ];

      this.customer.final_shopping_info.forEach((element) => {
        let subbody = [
          {
            style: "item",
            text: `${element.product}`,
          },
          {
            style: "item",
            text: `${element.count}`,
          },
          {
            style: "item",
            text: `${element.price} TL`,
          },
          {
            style: "item",
            text: `${element.total} TL`,
          },
        ];
        productsBody.push(subbody);
      });

      let docDefinition = {
        content: [
          {
            text: "DM KİMYA MÜŞTERİ BİLGİLENDİRME BELGESİ",
            style: "header",
            alignment: "center",
          },

          { text: "Firma Bilgileri", style: "subheader" },

          {
            style: "tableExample",
            table: {
              body: [
                [
                  { style: "tableHeader", text: "Firma" },
                  { style: "tableHeader", text: "Son Ödeme Tarihi" },
                  { style: "tableHeader", text: "Son Ödeme Miktarı" },
                  { style: "tableHeader", text: "Son Satış Tarihi" },
                  { style: "tableHeader", text: "Son Satış Miktarı" },
                  { style: "tableHeader", text: "Güncel Bakiye" },
                ],
                [
                  { style: "item", text: `${this.customer.company_name}` },
                  {
                    style: "item",
                    text: `${this.customer.final_payment_date}`,
                  },
                  {
                    style: "item",
                    text: `${this.customer.final_payment_amount} TL`,
                  },
                  { style: "item", text: `${this.customer.final_sales_date}` },
                  {
                    style: "item",
                    text: `${this.customer.final_sales_amount} TL`,
                  },
                  {
                    style: "item",
                    text: `${this.customer.current_balance} TL`,
                  },
                ],
              ],
            },
          },

          { text: `Satış bilgileri`, style: "subheader" },
          { text: `Tarih: ${this.customer.final_sales_date}`, style: "tableHeader" },

          {
            style: "tableExample",
            table: {
              body: productsBody,
            },
          },
          {
            text: `Toplam: ${this.customer.final_sales_amount} TL`,
            style: "productTotal",
          },
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: "black",
          },
          item: {
            bold: false,
            fontSize: 8,
            color: "black",
          },
          productTotal: {
            bold: false,
            fontSize: 8,
            color: "black",
             margin: [86, -10, 0, 0],
          },
        },
      };

      pdfMake.createPdf(docDefinition).open();
      pdfMake.createPdf(docDefinition).download()
    },
  },
};
</script>
