import moment from "moment";

export default (context, inject) => {
  const convert = date => {
    if (date == 0 || undefined || null) return "-";

    return moment(date)
      .locale("tr")
      .format("lll");
  };
  inject("convert", convert);
};
