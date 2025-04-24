import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logo.png";
import Button from "../Button/Button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../provider/CartContext";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["logo-container"]}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles["logo-image"]} />
        </Link>
      </div>

      <button
        className={styles["menu-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`${styles["nav-links"]} ${isOpen ? styles["show"] : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={styles["cart-link"]}
          >
            <div className={styles["cart-icon"]}>
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className={styles["cart-count"]}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </Link>
        </li>
      </ul>

      <div className={styles["button-group"]}>
        <Button color="primary">Sign Up</Button>
        <Button color="danger">Try it For Free</Button>
      </div>
    </nav>
  );
};

export default Navbar;
