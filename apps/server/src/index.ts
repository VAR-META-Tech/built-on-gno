import 'dotenv/config'
import 'reflect-metadata'
import App from './App'
import CategoriesRoute from './routes/categories.route'
import ProjectsRoute from './routes/projects.route'
import TagsRoute from './routes/tags.route'
import { BaseRoute } from './routes/base.route'
import { CrawlRoute } from './routes/crawl.route'

const app = new App([
  new CategoriesRoute(),
  new ProjectsRoute(),
  new TagsRoute(),
  new BaseRoute(),
  new CrawlRoute(),
])

app.listen()
