const Publication = require("../models/publication.model");


exports.publication_create = function(req, res) {
  let publication = new Publication({
    creator_id: req.body.creator_id,
    content: req.body.content,
  });

  publication.save(function(err) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Publication Created successfully!", publication });
  });
};

exports.publications_list = function(req, res) {
  Publication.find({}, function(err, publications) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(publications);
  });
};

exports.publications_details = function(req, res) {
  Publication.findById(req.params.id, function(err, publication) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(publication);
  });
};

exports.publication_update = function(req, res) {
  Publication.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    publication
  ) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Publication Udpated successfully!", publication });
  });
};

exports.publication_delete = function(req, res) {
  Publication.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "Publication Deleted successfully!", result });
  });
};
