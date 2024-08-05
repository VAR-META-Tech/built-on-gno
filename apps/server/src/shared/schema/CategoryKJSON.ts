export class CategoryJSON {
  name: string
  description: string
  pathname: string
  status: string
  tags: Array<string>
  sub_categories: Array<{
    name: string
    pathname: string
    status: string
    description: string
  }>
}
