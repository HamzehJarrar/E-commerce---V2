import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, type Product } from "../../api/product";
import { formatPrice } from "../../utils/formatPrice";
import ProductCard from "../Home/ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const searchValue = (queryParams.get("search") || "").trim().toLowerCase();
  const categoryValue = (queryParams.get("category") || "").trim().toLowerCase();

  const visibleProducts = products.filter((product) => {
    const matchesSearch =
      searchValue === "" || product.name.toLowerCase().includes(searchValue);

    const categoryName =
      typeof product.category === "string"
        ? product.category
        : product.category?.name || "";

    const matchesCategory =
      categoryValue === "" || categoryName.toLowerCase() === categoryValue;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress sx={{ color: "var(--brand)" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 800,
              color: "var(--text-main)",
              fontFamily: "Sora, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            All Products
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--text-muted)" }}>
            {visibleProducts.length} products available
            {searchValue ? ` for "${searchValue}"` : ""}
            {categoryValue ? ` in ${categoryValue}` : ""}
          </Typography>
        </Box>

        {visibleProducts.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 5,
              border: "1px dashed var(--border-soft)",
              bgcolor: "var(--bg-surface)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--text-main)" }}>
              No products found
            </Typography>
            <Typography sx={{ mt: 1, color: "var(--text-muted)" }}>
              Try a different search or clear filters.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3.2}>
            {visibleProducts.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} formatPrice={formatPrice} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;
