import express from "express";
const fs = require('fs');
const { BASE_PATH } = process.env;

const router = express.Router();

router.get("/projects", (req, res) => {
  try {
    return res.json(JSON.parse(fs.readFileSync(BASE_PATH + '/projects/projects.json')))
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/categories", (req, res) => {
  try {
    const categories = fs.readdirSync(BASE_PATH + '/projects').filter(c => !c.endsWith('.json'))
    const data = []
    categories.forEach(category =>
      data.push(JSON.parse(fs.readFileSync(BASE_PATH + '/projects/' + category + '/category.json')))
    )
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/category/:category", (req, res) => {
  const { category } = req.params;
  try {
    return res.json(JSON.parse(fs.readFileSync(BASE_PATH + '/projects/' + category + '/category.json')));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/projects/:category", (req, res) => {
  const { category } = req.params;
  try {
    const sub_categories = fs.readdirSync(BASE_PATH + '/projects/' + category).filter(c => !c.endsWith('.json'))
    const data = []
    sub_categories.forEach(sub_category => {
      const projects = fs.readdirSync(BASE_PATH + '/projects/' + category + "/" + sub_category).filter(c => !c.endsWith('.json'))
      projects.forEach(project =>
        data.push(JSON.parse(fs.readFileSync(BASE_PATH + '/projects/' + category + "/" + sub_category + "/" + project + '/info.json')))
      )
    })
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/projects/:category/:sub_category", (req, res) => {
  const { category, sub_category } = req.params;
  try {
    const projects = fs.readdirSync(BASE_PATH + '/projects/' + category + "/" + sub_category).filter(c => !c.endsWith('.json'))
    const data = []
    projects.forEach(project =>
      data.push(JSON.parse(fs.readFileSync(BASE_PATH + '/projects/' + category + "/" + sub_category + "/" + project + '/info.json')))
    )
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/projects/:category/:sub_category/:project", (req, res) => {
  const { category, sub_category, project } = req.params;
  try {
    return res.json({
      detail: fs.readFileSync(BASE_PATH + '/projects/' + category + "/" + sub_category + "/" + project + '/detail.md', "utf-8"),
      logo: fs.readFileSync(BASE_PATH + '/projects/' + category + "/" + sub_category + "/" + project + '/logo.png'),
      info: JSON.parse(fs.readFileSync(BASE_PATH + '/projects/' + category + "/" + sub_category + "/" + project + '/info.json'))
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { router }