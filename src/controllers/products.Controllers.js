import Product from '../models/products'

export const createProduct = async (req, res) =>  {
    
    const { name, description, price, imgURL } = req.body;

    const nuevoProducto = new Product({ name, description, price, imgURL });

    const prodCopia =   await nuevoProducto.save();

    res.status(201).json(prodCopia)

}
export const getProducts = async (req, res) => {
    
    const products = await Product.find();

    res.json(products);
    
}
export const getProductById = async (req, res) => {

    const product = await Product.findById(req.params.productId);
    
    
    
    res.status(200).json(product);
    
}
export const updateProductById = async (req, res) => {

    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true})
    res.status(200).json(updateProduct);
}
export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(204).json();
    
}