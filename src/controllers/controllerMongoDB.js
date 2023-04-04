const Product = require("../models/productoModel")
const Cart = require("../models/cartModel")
const User = require("../models/userModel")

class ControllerMongoDb {

    //___USER__//

    saveUser = async (userToAdd) => {
        const user = new User(userToAdd);
        await user.save();
        console.log("guardado", user)
    };

    getAll = async () => await User.find({});

    getUser = async (email) => await User.findOne({ email: email });

    updateUser = async (id, userToUpdate) => {
        return await User.updateOne(
            { _id: id },
            { $set: { ...userToUpdate } }
        );
    };

    deleteUser = async (id) => await User.deleteOne({ _id: id });


    //___PRODUCT___//
   
    saveProduct = async (productToAdd) => {
        const product = new productoModel(productToAdd);
        await product.save();
        console.log("guardado", product)
    };

    getAll = async () => await productoModel.find({});

    getProductById = async (id) => await productoModel.findOne({ _id: id });

    updateProduct = async (id, productToUpdate) => {
        return await productoModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

    deleteProduct = async (id) => await productoModel.deleteOne({ _id: id });


    //___CART___//
    
    saveCart = async (cartToAdd) => {
        const cart = new Cart(cartToAdd);
        return await cart.save();
    };

    getCarts = async () => await Cart.find({});

    getCartById = async (id) => await Cart.findOne({ _id: id });

    deleteCart = async (id) => await Cart.deleteOne({ _id: id });

    addProductInCart = async (id, id_prod) => {
        const cart = await this.getCartById(id);

        const isInCart = () =>
            cart.productos.find((product) => product.id === id_prod) ? true : false;

        if (!isInCart()) {
            await Cart.updateOne(
                { _id: id },
                {
                    $set: {
                        productos: [...cart.productos, { id: id_prod }],
                    },
                }
            );
            return;
        }

        const indexProductUpdate = cart.productos.findIndex(
            (product) => product.id === id_prod
        );

        cart.productos[indexProductUpdate].quantity += quantity;

        await Cart.updateOne(
            { _id: id },
            { $set: { productos: [...cart.productos] } }
        );
    };

    deleteProductInCart = async (id_cart, id_prod) => {
        const cart = await Cart.findOne({ _id: id_cart });

        const productsUpdate = cart.productos.filter(
            (product) => product.id !== id_prod
        );

        await Cart.updateOne(
            { _id: id_cart },
            { $set: { productos: [...productsUpdate] } }
        );
    };

}

const dbController = new ControllerMongoDb();

module.exports = dbController;
