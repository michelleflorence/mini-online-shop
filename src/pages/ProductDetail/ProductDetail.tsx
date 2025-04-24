import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.scss";
import { useEffect, useState } from "react";
import { productOne, productTwo } from "../../data/product";
import Button from "../../components/Button/Button";
import { useCart } from "../../provider/CartContext";

const allProducts = [...productOne, ...productTwo];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const { cart, increaseQty, decreaseQty, addToCart } = useCart();
  const cartItem = product
    ? cart.find((item) => item.id === product.id)
    : undefined;
  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    const found = allProducts.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className={styles["not-found"]}>❌ Produk tidak ditemukan</div>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["back-button"]}>
        <Button color="secondary">Kembali</Button>
      </div>
      <img src={product.image} alt={product.name} />
      <div className={styles["info"]}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>Rp {product.price.toLocaleString("id-ID")}</h3>
        {quantity > 0 ? (
          <div className={styles["quantity-control"]}>
            <Button color="danger" onClick={() => decreaseQty(product.id)}>
              -
            </Button>
            <span className={styles["quantity"]}>{quantity}</span>
            <Button color="primary" onClick={() => increaseQty(product.id)}>
              +
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
