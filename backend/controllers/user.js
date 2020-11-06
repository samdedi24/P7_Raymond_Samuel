const bcrypt = require("bcrypt");
const db = require("../models");
const token = require("../middleware/token");
const { Op } = require("sequelize");
const fs = require("fs");

exports.signup = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      });
      if (user !== null) {
        if (user.username === req.body.username) {
          return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
        }
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.User.create({
          email: req.body.email,
          username: req.body.username,
          password: hash,
          bio: req.body.bio,
          isAdmin: false,
        });
  
        const tokenObject = await token.issueJWT(newUser);
        res.status(201).send({
          user: newUser,
          token: tokenObject.token,
          expires: tokenObject.expiresIn,
          message: `Votre compte est bien créé ${newUser.username} !`,
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error: "email déjà utilisé" });
    }
  };


exports.login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      }); 
      if (user === null) {
        return res.status(403).send({ error: "Connexion échouée" });
      } else {
        const hash = await bcrypt.compare(req.body.password, user.password); 
        if (!hash) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
          const tokenObject = await token.issueJWT(user);
          res.status(200).send({
            user: user,
            token: tokenObject.token,
            sub: tokenObject.sub,
            expires: tokenObject.expiresIn,
            message: "Bonjour " + user.username + " !",
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: ["username", "id", "bio", "email"],
        where: {
          id: {
            [Op.ne]: 1,
          },
        },
      });
      res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  exports.getAccount = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  exports.updateAccount = async (req, res) => {
    const id = req.params.id;
    try {
      const userId = token.getUserId(req);
      let newPhoto;
      let user = await db.User.findOne({ where: { id: id } }); 
      if (userId === user.id) {
        if (req.file && user.photo) {
          newPhoto = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          const filename = user.photo.split("/images")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: images/${filename}`);
            }
          });
        } else if (req.file) {
          newPhoto = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }
        if (newPhoto) {
          user.photo = newPhoto;
        }
        if (req.body.bio) {
          user.bio = req.body.bio;
        }
        if (req.body.username) {
          user.username = req.body.username;
        }
        const newUser = await user.save({ fields: ["username", "bio", "photo"] }); 
        res.status(200).json({
          user: newUser,
          messageRetour: "Le profil a bien été modifié",
        });
      } else {
        res
          .status(400)
          .json({ messageRetour: "Droits requis" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await db.User.findOne({ where: { id: id } });
      if (user.photo !== null) {
        const filename = user.photo.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          db.User.destroy({ where: { id: id } });
          res.status(200).json({ messageRetour: "User supprimé" });
        });
      } else {
        db.User.destroy({ where: { id: id } }); 
        res.status(200).json({ messageRetour: "User supprimé" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };