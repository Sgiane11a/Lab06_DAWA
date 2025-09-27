import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        return await postRepository.create({ ...postData, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    // 👇 Nuevo método para buscar un post por ID
    async getPostById(postId) {
        return await postRepository.findById(postId);
    }

    // 👇 Nuevo método para actualizar
    async updatePost(postId, postData) {
        return await postRepository.update(postId, postData);
    }

    // 👇 Nuevo método para eliminar
    async deletePost(postId) {
        return await postRepository.delete(postId);
    }

    // 👇 Para traer todos los usuarios (autores)
    async getUsers() {
        return await userRepository.findAll();
    }
}

export default new PostService();
