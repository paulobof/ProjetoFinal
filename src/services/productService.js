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

    // Restante do código do ProductService...

    // Não se esqueça de exportar a classe ProductService
}

module.exports = new ProductService();
/*
class ProductService {
    async createProduct(productData) {
        const { name, type, model, description, picture } = productData;
        const connection = await this.createConnection();

        try {
            const [results] = await connection.query(
                'INSERT INTO produtos (name, type, model, description, picture) VALUES (?, ?, ?, ?, ?)',
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
        } finally {
            await connection.end();
        }
    }

    async getProducts() {
        const connection = await this.createConnection();

        try {
            const [rows] = await connection.query('SELECT * FROM produtos');
            return rows;
        } finally {
            await connection.end();
        }
    }

    async getProductById(productId) {
        const connection = await this.createConnection();

        try {
            const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [productId]);
            return rows.length ? rows[0] : null;
        } finally {
            await connection.end();
        }
    }

    async deleteProduct(productId) {
        const connection = await this.createConnection();

        try {
            const [results] = await connection.query('DELETE FROM produtos WHERE id = ?', [productId]);
            return results.affectedRows > 0;
        } finally {
            await connection.end();
        }
    }

    async updateProduct(productId, productData) {
        const existingProduct = await this.getProductById(productId);

        if (!existingProduct) {
            return null; // Product not found
        }

        // Atualizar os campos necessários com os dados fornecidos
        existingProduct.name = productData.name || existingProduct.name;
        existingProduct.type = productData.type || existingProduct.type;
        existingProduct.model = productData.model || existingProduct.model;
        existingProduct.description = productData.description || existingProduct.description;
        existingProduct.picture = productData.picture || existingProduct.picture;

        const connection = await this.createConnection();

        try {
            await connection.query(
                'UPDATE produtos SET name=?, type=?, model=?, description=?, picture=? WHERE id=?',
                [
                    existingProduct.name,
                    existingProduct.type,
                    existingProduct.model,
                    existingProduct.description,
                    existingProduct.picture,
                    productId
                ]
            );

            return existingProduct;
        } finally {
            await connection.end();
        }
    }

    async createConnection() {
        return await mysql.createConnection({
            // Configurações de conexão com o banco de dados
            host: 'localhost',
            user: 'seu_usuario',
            password: 'sua_senha',
            database: 'seu_banco_de_dados',
        });
    }
}

module.exports = new ProductService();
*/