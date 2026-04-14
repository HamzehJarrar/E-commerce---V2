import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../api/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Fetched products:", response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 8 }}>
        <Container maxWidth="lg">
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
          All Products
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, color: "#666" }}>
          Browse our collection
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 6, sm: 4, md: 3 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.mainImage?.url || "https://via.placeholder.com/200"}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                    <Typography variant="body1" sx={{ color: "#666", textDecoration: product.discount > 0 ? "line-through" : "none" }}>
                      ${product.price}
                    </Typography>
                    {product.discount > 0 && (
                      <Typography variant="body1" sx={{ color: "#e53935", fontWeight: 600 }}>
                        ${product.finalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: product.stock >= 0 ? "#2e7d32" : "#d32f2f" }}>
                    {product.stock >= 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" disabled={product.stock === 0}>
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;