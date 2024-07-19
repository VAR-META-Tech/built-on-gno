import 'dotenv/config'
import 'reflect-metadata'
import App from './App'
import CategoriesRoute from './routes/categories.route'
import TagsRoute from './routes/tags.route'
import ProjectsRoute from './routes/projects.route'

const app = new App([
  new CategoriesRoute(),
  new TagsRoute(),
  new ProjectsRoute(),
])

app.listen()
