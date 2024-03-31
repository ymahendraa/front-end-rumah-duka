/**
 * @description trimDate: function for trimming date string
 * @param date date string
 * @returns trimmed date string
 *
 * @example
 * const date = '2021-08-12T00:00:00.000Z'
 * const trimmedDate = trimDate(date)
 * console.log(trimmedDate) // '2021-08-12'
 */
export const trimDate = (date: string): string => {
  return date.split("T")[0];
};
