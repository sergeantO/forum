const { Article } = require("../model/Article");

let create = async (req, res) => {
  const {time, version, title, tags, image, publish } = req.body
  let { blocks } = req.body
  const author = req.user.id

  if (publish) {
    blocks = blocks.map(block => { 
      return {
        ...block, 
        id: Math.random().toString(36).substring(2,9)
      }
    })
  }
  
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
  const { tags } = req.body

  let articles
  if (!tags) {
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

let getMy = async (req, res) => {
  const author = req.user.id
  console.log('getMy', author)
  let articles = await Article.find({author}).exec()
  
  articles = articles.map(article => {
    return {
      id: article.id,
      src: article.src,
      title: article.title,
      subtitle: article.blocks.find((block) => block.type === 'paragraph').data.text.split(' ').slice(0, 100).join(' ')+'...',
      tags: article.tags,
      views: article.views,
      image: article.image,
      publish: article.publish,
    }
  })

  res.status(200).json(articles);
}

let getOne = async (req, res) => {
  const articleID = req.params.id
  let article = await Article.findById(articleID).exec()
  
  if (article) {
    const user = req.user.id
    let { blocks, version, time, title, image, author } = article

    if (author.toString() !== user) {
      article.views++
      await article.save()
    }
    
    res.status(200).json({ blocks, version, time, title, image });
  } else {
    res.status(404).json('Статья не найдена');
  }
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
  remove,
  getMy
}