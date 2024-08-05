import 'dotenv/config'
import 'reflect-metadata'
import App from './App'
import CategoriesRoute from './routes/categories.route'
import ProjectsRoute from './routes/projects.route'
import TagsRoute from './routes/tags.route'
import { CrawlRoute } from './routes/crawl.route'

const app = new App([
  new CategoriesRoute(),
  new ProjectsRoute(),
  new TagsRoute(),
  new CrawlRoute(),
])

app.listen()
