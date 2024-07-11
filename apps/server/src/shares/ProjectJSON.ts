export class ProjectJSON {
  industry: Array<string>
  display_term: string
  term: string
  tags: Array<string>
  short_description: string
  partnerships: Array<{
    name: string
    image: string
  }>
  author: string
  social: any
}
