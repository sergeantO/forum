const { Article } = require("../model/Article");
const { User } = require("../model/User");

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

let articleProcessing = (article) => {
  const firstParagraph = article.blocks.find((block) => block.type === 'paragraph')
  let subtitle
  if (firstParagraph) {
    const words = firstParagraph.data.text.split(' ')
    subtitle = (words.length > 80) ? words.slice(0, 80).join(' ')+'...' : words.join(' ')
  } else {
    subtitle = ''
  }

  return {
    id: article.id,
    src: article.src,
    title: article.title,
    subtitle: subtitle,
    tags: article.tags,
    views: article.views,
    image: article.image
  }
}

let getList = async (req, res) => {
  const tags = (req.query.tags) ? Array.from(req.query.tags).map((tag) => tag.toLowerCase()) : null

  let articleList = await Article.find({ publish: true }).exec()
  
  // filter
  if (tags) {
    articleList = articleList
      .filter((article) => {
        return tags.every(element => {
          return article.tags
            .map((tag) => tag.toLowerCase())
            .indexOf(element) > -1
        })
      })
  } 
  
  articleList = articleList.map((article) => articleProcessing(article))

  res.status(200).json(articleList);
}

let getMy = async (req, res) => {
  const author = req.user.id
  let articles = await Article.find({author}).exec()
  articles = articles.map(article => articleProcessing(article))
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

let dislike = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  const user = await User.findById(userId);
  console.log(user);

  res.status(200).json({ articleId, userId, isLike: false })

};

let like = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  let article = await Article.findById(articleId).exec()
  const user = await User.findById(userId);

  // let intersection = arrA.filter(x => arrB.includes(x))

  // article.ratings
  // console.log(user.skills);
  // console.log(article);

  // for (let vegetable of recipeMap.keys()) {
  //   alert(vegetable); // огурец, помидор, лук
  // }

  // let intersection = arrA.filter(x => arrB.includes(x));
  
  res.status(200).json({ articleId, userId, isLike: true })
};

module.exports = {
  create,
  getList,
  getOne,
  update,
  remove,
  getMy,
  dislike,
  like,
}