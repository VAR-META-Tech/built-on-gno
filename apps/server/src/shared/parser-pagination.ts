export const orderParser = (orderStr: string) => {
  try {
    if (!orderStr) return
    let query = {}
    orderStr &&
      String(orderStr)
        .split('|')
        .forEach((order: string) => {
          query[order.split(':')[0]] = (
            order.split(':')[1] ?? 'ASC'
          ).toUpperCase()
        })
    return query
  } catch (error) {
    return null
  }
}
