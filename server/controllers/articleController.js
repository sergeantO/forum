const { Article } = require("../model/Article");

let create = async (req, res) => {
  const {time, blocks, version, title, tags } = req.body
  const author = req.user.id
  
  let article
  try {
    article = new Article({
      time, blocks, version, title, tags, author
    })
  
    await article.save()
  } catch (err) {
    res.status(500).json(err);
  }
  
  res.status(201).json({
    id: article.id
  });
}

let getList = async (req, res) => {
  const { tags, userID } = req.body
  let articles
  if (!tags && !userID) {
    articles = await Article.find()
  } else {
    articles = await Article.find({ author:userID })
  }

  articles = articles.map(article => {
    return {
      id: article.id,
      src: article.src,
      title: article.title,
      subtitle: article.blocks.find((block) => block.type === 'paragraph').data.text,
      tags: article.tags,
      views: article.views,
    }
  })
  console.log(articles)

  res.status(200).json(articles);
}

let getOne = async (req, res) => {

}

let update = async (req, res) => {

};

let remove = async (req, res) => {

};

module.exports = {
  create,
  getList,
  getOne,
  update,
  remove
}