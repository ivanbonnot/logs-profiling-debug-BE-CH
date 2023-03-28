const { Router } = require('express');
const Cart = require("../../Class/Product")
const cartController = require("../../controllers/productMongoDB")

const cartRouter = Router();


cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;

  const cart = await dbController.getCartById(id);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }
  res.json(cart.productos);
});


cartRouter.post("/", async (req, res) => {
  const cartToAdd = new Cart();

  await dbController.saveCart(cartToAdd);

  res.json("cart saved");
});


cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await dbController.getCartById(id);
  const product = await dbController.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  await dbController.addProductInCart(id, id_prod);

  res.json(id);
});


cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const cart = await dbController.getCartById(id);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  await dbController.deleteCart(id);

  res.json(id);
});


cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await dbController.getCartById(id);
  const product = await dbController.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  const productToDelete = cart.productos.find(
    (product) => product.id === id_prod
  );

  if (!productToDelete) {
    res
      .status(404)
      .json({ error: "Producto no se encuentra dentro del carrito" });
    return;
  }

  await dbController.deleteProductInCart(id, id_prod);

  res.json(id);
});


module.exports = cartRouter;
