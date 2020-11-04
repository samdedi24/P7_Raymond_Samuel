const token = require('../middleware/token')
const db = require('../models')

exports.createPost = async (req, res) => {
    const userId = token.getUserId(req);
    let imageUrl;
    try {
      const user = await db.User.findOne({
        attributes: ["username", "id", "photo"],
        where: { id: userId },
      });
      if (user !== null) {
        if (req.file) {
          imageUrl = `${req.protocol}://${req.get("host")}/upload/${
            req.file.filename
          }`;
        } else {
          imageUrl = null;
        }
        const post = await db.Post.create({
          include: [
            {
              model: db.User,
              attributes: ["username", "photo", "id"],
            },
          ],
          title: req.body.title,
          message: req.body.message,
          imageUrl: imageUrl,
          UserId: user.id,
        });
  
        res
          .status(201)
          .json({ post: post, messageRetour: "Votre post est ajouté" });
      } else {
        res.status(400).send({ error: "Erreur " });
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await db.Post.findAll({
        attributes: ["id", "title", "message", "imageUrl", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.User,
            attributes: ["username", "id", "photo"],
          },
          {
            model: db.Comment,
            attributes: ["message", "username", "UserId", "id"],
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: db.User,
                attributes: ["photo", "username"],
              },
            ],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
        console.log(error)
      return res.status(500).send({
        error: "Erreur de recup",
      });
    }
  };

  exports.updatePost = async (req, res) => {
    try {
      let newImageUrl;
      const userId = token.getUserId(req);
      let post = await db.Post.findOne({ where: { id: req.params.id } });
      if (userId === post.UserId) {
        if (req.file) {
          newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
            req.file.filename
          }`;
          if (post.imageUrl) {
            const filename = post.imageUrl.split("/upload")[1];
            fs.unlink(`upload/${filename}`, (err) => {
              if (err) console.log(err);
              else {
                console.log(`Deleted file: upload/${filename}`);
              }
            });
          }
        }
        if (req.body.message) {
          post.message = req.body.message;
        }
        post.title = req.body.title;
        post.imageUrl = newImageUrl;
        const newPost = await post.save({
          fields: ["message", "title", "imageUrl"],
        });
        res.status(200).json({ newPost: newPost, messageRetour: "Message modifié" });
      } else {
        res.status(400).json({ message: "Droits requis" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };