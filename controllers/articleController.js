const { Article } = require("../model/Article");
const { User } = require("../model/User");
const { Bookmark } = require("../model/Bookmark");
const { Rating } = require("../model/Rating");

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

  let rating = await Rating.findOne({ userId, articleId: article.id, });
  if (rating) {
    var isLike = rating.isLike
  }
  
  return {
    id: article.id,
    src: article.src,
    title: article.title,
    subtitle: subtitle,
    tags: article.tags,
    views: article.views,
    image: article.image,

    isLike,
    marked: !!bookmark,
    isMyArticle: article.author.toString() === userId,
    publish: article.publish,
  }
}

let getList = async (req, res) => {
  const userId = req.user.id
  const tags = (req.query.tags) ? Array.from(req.query.tags).map((tag) => tag.toLowerCase()) : null

  let articleList = await Article.find({ 
    publish: true, 
    author: { $ne : userId },  
  }).exec()
  
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
  const articleId = req.params.id
  let article = await Article.findById(articleId).exec()
  
  if (article) {
    const userId = req.user.id
    let { blocks, version, time, title, image, author, dislikes, likes, views, tags } = article

    if (author.toString() !== userId) {
      article.views++
      await article.save()
    }
    
    let rating = await Rating.findOne({ userId, articleId, });
    if (rating) {
      var isLike = rating.isLike
    }

    const data = { blocks, version, time, 
      title, image, isLike, dislikes, likes, views, tags,
      isMyArticle: article.author.toString() === userId 
    }
    
    res.status(200).json(data);
  } else {
    res.status(404).json('Статья не найдена');
  }
}

let update = async (req, res) => {
  const articleId = req.params.articleId
  const updatedArticle = req.body
  console.log(updatedArticle)

  const ratings = updatedArticle.tags.reduce((map, tag) => {
    map[tag] = 0;
    return map;
  }, {})
  updatedArticle.ratings = ratings
  delete updatedArticle.tags

  console.log(updatedArticle)

  try{
    const article = await Article.findByIdAndUpdate(articleId, updatedArticle)
    res.status(200).json(article)
  } catch(err) {
    return res.status(500).json({err})
  }
};

let remove = async (req, res) => {
  const articleId = req.params.articleId
  try{
    await Article.findByIdAndRemove(articleId)
    res.status(200).json({ deleted: true })
  } catch(err) {
    return res.status(500).json({err})
  }
};

let dislike = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  const article = await Article.findById(articleId).exec()
  const user = await User.findById(userId).exec()
  const author = await User.findById(article.author).exec()

  if ( user._id.equals(author._id) ) {
    return res.status(403).json({ msg: 'Вы не можете оценить свою статью ))' })
  }

  let rating = await Rating.findOne({ userId: user.id, articleId: article.id, });
  if (rating) {
    return res.status(400).json({ msg: "Вы не можете оценить статью повторно ((" });
  }

  const userSkills = user.skills
  rating = new Rating({
    isLike:  false,
    userId: user.id,
    userSkills: userSkills,
    articleId: article.id,
  })

  await rating.save()

  const articleRatings = article.ratings

  articleRatings.forEach((rating, key) => {
    const up = ( userSkills.has(key) ) ? 1 + Math.floor(userSkills.get(key) / 100) : 1
    
    articleRatings.set(key, rating - up)

    const authorSkills = author.skills
    if ( authorSkills.has(key) ) {
      let skillVal = authorSkills.get(key)
      authorSkills.set(key, skillVal - up)
    } else {
      authorSkills.set(key, -up)
    }
  });

  article.dislikes++
  await author.save()
  await article.save()
  
  res.status(200).json({ articleId, userId, isLike: false, articleRatings, userSkills })
};

let like = async (req, res) => {
  const articleId = req.params.articleId
  const userId = req.user.id

  const article = await Article.findById(articleId).exec()
  const user = await User.findById(userId).exec()
  const author = await User.findById(article.author).exec()

  if ( user._id.equals(author._id) ) {
    return res.status(403).json({ msg: 'Вы не можете оценить свою статью ))' })
  }

  let rating = await Rating.findOne({ userId: user.id, articleId: article.id, });
  if (rating) {
    return res.status(400).json({ msg: "Вы не можете оценить статью повторно ((" });
  }

  const userSkills = user.skills
  rating = new Rating({
    isLike:  true,
    userId: user.id,
    userSkills: userSkills,
    articleId: article.id,
  })

  await rating.save()

  const articleRatings = article.ratings

  articleRatings.forEach((rating, key) => {
    const up = ( userSkills.has(key) ) ? 1 + Math.floor(userSkills.get(key) / 100) : 1
    
    articleRatings.set(key, rating + up)

    const authorSkills = author.skills
    if ( authorSkills.has(key) ) {
      let skillVal = authorSkills.get(key)
      authorSkills.set(key, skillVal + up)
    } else {
      authorSkills.set(key, up)
    }
  });

  article.likes++
  await author.save()
  await article.save()
  
  res.status(200).json({ articleId, userId, isLike: true, articleRatings, userSkills })
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