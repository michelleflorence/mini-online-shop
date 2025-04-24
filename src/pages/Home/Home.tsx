import ProductCard from "../../components/ProductCard/ProductCard";
import { productOne, productTwo } from "../../data/product";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles["home"]}>
      <h2 className={styles["title"]}>Our Pet Store Products</h2>
      <div className={styles["card-container"]}>
        <div className={styles["grid"]}>
          {productOne.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className={styles["grid"]}>
          {productTwo.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
