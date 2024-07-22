export const API_URL = process.env.API_URL || 'http://localhost:3001/api'
export const DEFAULT_API_RETURN = {
  data: [],
  pagination: {
    total_items: 0,
    total_pages: 0,
  },
}
