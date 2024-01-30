const productService = require('../services/productService');

function renderRegisterProductPage(req, res){
    res.render('productRegister.ejs');
}

// Cria um novo produto
async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Obtém todos os produtos
async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Obtém um produto pelo ID
async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Deleta um produto pelo ID
async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);

        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Atualiza um produto pelo ID
async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const updatedProduct = await productService.updateProduct(productId, req.body);

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Exporta as funções do controlador
module.exports = {
    renderRegisterProductPage,
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
};
