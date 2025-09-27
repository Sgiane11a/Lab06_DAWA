import postService from "../services/postService.js";
import User from "../models/User.js"; // 👈 importa el modelo User

class PostController {
  async createForm(req, res) {
    try {
      const users = await User.find(); // 👈 traemos todos los usuarios
      res.render("posts_form", { post: null, users });
    } catch (error) {
      res.status(500).send("Error al cargar formulario");
    }
  }

  async create(req, res) {
    try {
      const { title, content, hashtags, imageUrl, user } = req.body; // 👈 ahora también viene el autor
      const postData = {
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(t => t.trim()) : [],
        imageUrl,
        user // 👈 se guarda el autor seleccionado en el select
      };
      await postService.createPost(user, postData);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      res.render("posts", { posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editForm(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);
      const users = await User.find(); // 👈 también mandamos usuarios
      res.render("posts_form", { post, users });
    } catch (error) {
      res.status(404).send("Post no encontrado");
    }
  }

  async update(req, res) {
    try {
      const { title, content, hashtags, imageUrl, user } = req.body;
      const postData = {
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(t => t.trim()) : [],
        imageUrl,
        user
      };
      await postService.updatePost(req.params.id, postData);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PostController();
