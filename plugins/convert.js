import moment from "moment";

export default (context, inject) => {
  const convert = date => {
    if (date !== 0) {
      //console.log(new Date(date));
      return moment(date).locale("tr").format("lll")
    }

    return "-";
  };
  inject("convert", convert);
};
