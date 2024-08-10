export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://builtongno.var-meta.com/api'
export const DEFAULT_API_RETURN = {
  data: [],
  pagination: {
    total_items: 0,
    total_pages: 0,
  },
}
