const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default formatIDR = (num) => formatCurrency.format(num)