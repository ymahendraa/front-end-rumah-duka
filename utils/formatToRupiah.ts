/**
 * @description format number to rupiah
 * @param amount number of amount
 * @returns string of formatted rupiah
 */
export const formatToRupiah = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};
