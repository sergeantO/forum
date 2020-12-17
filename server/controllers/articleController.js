const { Article } = require("../model/Article");

let create = async (req, res) => {
  const {time, blocks, version, title, tags, image, publish } = req.body
  const author = req.user.id
  
  let article
  try {
    article = new Article({
      time, blocks, version, title, tags, author, image, publish
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
    articles = await Article.find({ publish: true }).exec()
  } else {
    articles = await Article.find({ author: userID, publish: true }).exec()
  }

  articles = articles.map(article => {
    return {
      id: article.id,
      src: article.src,
      title: article.title,
      subtitle: article.blocks.find((block) => block.type === 'paragraph').data.text.split(' ').slice(0, 100).join(' ')+'...',
      tags: article.tags,
      views: article.views,
      image: article.image
    }
  })

  res.status(200).json(articles);
}

let getOne = async (req, res) => {
  const articleID = req.params.id
  let article = await Article.findById(articleID).exec()
  let { blocks, version, time, title, image } = article
  res.status(200).json({ blocks, version, time, title, image });
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