const db = require('../db/dbConfig');

class ProductService {
    async createProduct(productData) {
        const { name, type, model, description, picture } = productData;

        try {
            const [results] = await db.query(
                'INSERT INTO products (name, type, model, description, picture) VALUES (?, ?, ?, ?, ?)',
                [name, type, model, description, picture]
            );

            const newProduct = {
                id: results.insertId,
                name,
                type,
                model,
                description,
                picture
            };

            return newProduct;
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error; // Rejeita a promessa e passa o erro para a próxima captura
        }
    }
}

module.exports = new ProductService();