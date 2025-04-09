import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useWindowScrollToTop();

  // ✅ Fetch Product Details & All Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        const allProducts = response.data;

        // ✅ Find the selected product
        const currentProduct = allProducts.find((product) => product._id === id);
        setSelectedProduct(currentProduct);

        // ✅ Filter related products (same category, exclude current product)
        if (currentProduct) {
          const related = allProducts.filter(
            (product) =>
              product.category.toLowerCase() === currentProduct.category.toLowerCase() &&
              product._id !== id
          );
          setRelatedProducts(related);
        }
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;
  if (!selectedProduct) return <h2 className="not-found">Product not found!</h2>;

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 ? (
        <section className="related-products">
          <Container>
            <h3>You May Also Like This</h3>
          </Container>
          <ShopList productItems={relatedProducts} />
        </section>
      ) : (
        <h4>No related products found</h4>
      )}
    </Fragment>
  );
};

export default Product;
