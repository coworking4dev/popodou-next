export const euroFormat = (price: number | null) => {
  if (price === null) {
    return 'Free'
  }

  return price.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'EUR',
  })
}
