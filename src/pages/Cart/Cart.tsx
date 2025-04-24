import { useCart } from "../../provider/CartContext";
import styles from "./Cart.module.scss";
import Button from "../../components/Button/Button";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles["cart-empty"]}>🛒 Keranjang belanja kosong.</div>
    );
  }

  const totalHarga = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles["cart-container"]}>
      <h2 className={styles["title"]}>Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className={styles["cart-item"]}>
          <img src={item.image} alt={item.name} className={styles["image"]} />
          <div className={styles["details"]}>
            <div className={styles["item-name"]}>{item.name}</div>
            <p className={styles["item-price"]}>
              Harga: Rp {item.price.toLocaleString("id-ID")}
            </p>

            <div className={styles["quantity-control"]}>
              <Button color="danger" onClick={() => decreaseQty(item.id)}>
                -
              </Button>
              <span className={styles["quantity"]}>{item.quantity}</span>
              <Button color="primary" onClick={() => increaseQty(item.id)}>
                +
              </Button>
            </div>
            <div className={styles["total-price"]}>
              <strong>
                Total Harga: Rp{" "}
                {(item.price * item.quantity).toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          <div className={styles["remove-button"]}>
            <Button color="danger" onClick={() => removeFromCart(item.id)}>
              Hapus
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
