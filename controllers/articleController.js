const { Article } = require("../model/Article");
const { User } = require("../model/User");
const { Bookmark } = require("../model/Bookmark");

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
    return res.status(500).json(err);
  }
  
  res.status(201).json({
    id: article.id
  });
}

let articleProcessing = async (article, userId) => {
  const firstParagraph = article.blocks.find((block) => block.type === 'paragraph')
  let subtitle
  if (firstParagraph) {
    const words = firstParagraph.data.text.split(' ')
    subtitle = (words.length > 80) ? words.slice(0, 80).join(' ')+'...' : words.join(' ')
  } else {
    subtitle = ''
  }

  const bookmark = await Bookmark.findOne({
    articleId: article.id, 
    userId,
  })
  
  return {
    id: article.id,
    src: article.src,
    title: article.title,
    subtitle: subtitle,
    tags: article.tags,
    views: article.views,
    image: article.image,
    marked: !!bookmark
  }
}

let getList = async (req, res) => {
  const userId = req.user.id
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

  articleList = await Promise.all( articleList.map( async (article) => articleProcessing(article, userId) ) );

  res.status(200).json(articleList);
}

let getMy = async (req, res) => {
  const author = req.user.id
  let articleList = await Article.find({author}).exec()
  articleList = await Promise.all( articleList.map( async (article) => articleProcessing(article, author) ) );
  res.status(200).json(articleList);
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

let bookmark = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  try {
    let bookmark = await Bookmark.findOne({
      articleId, 
      userId,
    })

    if (bookmark) {
      return res.status(400).json({ msg: "Bookmark already exist"})
    }
  } catch (e) {
    return res.status(400).json({ msg: "Bookmark already exist", e });
  }

  let bookmark
  try {
    bookmark = new Bookmark({
      articleId, 
      userId,
    })
    await bookmark.save()
  } catch (err) {
    res.status(500).json(err);
  }
  
  res.status(201).json({
    id: bookmark.id
  });
}

let unbookmark = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  let bookmark
  try {
    bookmark = await Bookmark.findOneAndDelete({
      articleId, 
      userId,
    })
  } catch (err) {
    res.status(500).json(err);
  }
  
  res.status(200).json({
    id: bookmark.id
  })
}

let getBookmarks = async (req, res) => {
  const userId = req.user.id

  let bookmarkIdList = await Bookmark.find({ userId }).exec()
  bookmarkIdList = bookmarkIdList.map((bm) => bm.articleId)
  
  let bookmarkList = await Article.find({
    '_id': { $in: bookmarkIdList }
  })

  bookmarkList = await Promise.all( bookmarkList.map( async (article) => articleProcessing(article, userId) ) );

  res.status(200).json(bookmarkList);
}

module.exports = {
  create,
  getList,
  getOne,
  update,
  remove,
  getMy,
  dislike,
  like,
  unbookmark,
  bookmark,
  getBookmarks
}