import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.scss";
import { useEffect, useState } from "react";
import { productOne, productTwo } from "../../data/product";
import Button from "../../components/Button/Button";

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

  useEffect(() => {
    const found = allProducts.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className={styles.notFound}>❌ Produk tidak ditemukan</div>;
  }

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.name} />
      <div className={styles.info}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>Rp {product.price.toLocaleString("id-ID")}</h3>
        <Button color="primary">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetail;
