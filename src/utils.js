export const getPriceInEuros = (price) => {
  // convert a normal integer to currency format
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};
