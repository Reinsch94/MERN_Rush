const Comment = require("../models/comment.model");

exports.comment_create = function(req, res) {
  let comment = new Comment({
    content: req.body.content,
    creator_id: req.body.creator_id,
    article_id: req.body.article_id,
    
  });

  comment.save(function(err) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Comment Created successfully!", comment });
  });
};

exports.comments_list = function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(comments);
  });
};

exports.comment_details = function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(comment);
  });
};

exports.comment_update = function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    comment
  ) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Comment Udpated successfully!", comment });
  });
};

exports.comment_delete = function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Comment Deleted successfully!", result });
  });
};
