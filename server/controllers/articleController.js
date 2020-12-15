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

let getAll = async (req, res) => {

}

let getOne = async (req, res) => {

}

let update = async (req, res) => {

};

let remove = async (req, res) => {

};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}