import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.overlay} />
        <div className={styles.textBox}>
          <h3>{name}</h3>
          <p>Rp {price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
