import { Meta } from '@/decorator/types'

export function getMeta(total_items = 0, page_size = 10, page = 1): Meta {
  return {
    page_size: +page_size,
    page: +page,
    total_items: +total_items,
    total_pages: Math.ceil(total_items / page_size),
  }
}
