import { Box, Container, Typography, Grid, Button, Chip, IconButton } from "@mui/material";
import { ShoppingCart, FavoriteBorder, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, type Product } from "../../api/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 8 }}>
        <Container maxWidth="lg">
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 8 }}>
        <Container maxWidth="lg">
          <Typography>Product not found</Typography>
        </Container>
      </Box>
    );
  }

  const images = [product.mainImage, ...(product.subImages || [])];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button startIcon={<ArrowBack />} sx={{ mb: 3, color: "#666", textTransform: "none" }}>
            Back to Products
          </Button>
        </Link>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#f8f9fa",
              }}
            >
              {product.discount > 0 && (
                <Chip
                  label={`-${product.discount}% OFF`}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    bgcolor: "#e53935",
                    color: "#fff",
                    fontWeight: 600,
                    zIndex: 1,
                  }}
                />
              )}
              <Box
                component="img"
                src={images[selectedImage]?.url || "https://via.placeholder.com/400"}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
              {images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: selectedImage === index ? "2px solid #1a1a1a" : "2px solid transparent",
                    opacity: selectedImage === index ? 1 : 0.7,
                    transition: "all 0.2s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Box
                    component="img"
                    src={img?.url || "https://via.placeholder.com/80"}
                    alt={`${product.name} ${index + 1}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2 }}>
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                <Typography variant="h3" sx={{ color: product.discount > 0 ? "#e53935" : "#1a1a1a", fontWeight: 700 }}>
                  ${product.finalPrice}
                </Typography>
                {product.discount > 0 && (
                  <>
                    <Typography variant="h5" sx={{ color: "#999", textDecoration: "line-through" }}>
                      ${product.price}
                    </Typography>
                    <Chip label={`Save $${product.price - product.finalPrice}`} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32" }} />
                  </>
                )}
              </Box>
              <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8 }}>
                Premium quality product with excellent craftsmanship. Perfect for everyday use with guaranteed satisfaction.
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Quantity:</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #dee2e6",
                    borderRadius: 2,
                  }}
                >
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ minWidth: 40, borderRadius: "8px 0 0 8px" }}
                  >
                    -
                  </Button>
                  <Typography sx={{ px: 2, fontWeight: 600 }}>{quantity}</Typography>
                  <Button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    sx={{ minWidth: 40, borderRadius: "0 8px 8px 0" }}
                  >
                    +
                  </Button>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: product.stock > 0 ? "#2e7d32" : "#d32f2f",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: product.stock > 0 ? "#2e7d32" : "#d32f2f",
                  }}
                />
                {product.stock > 0 ? `${product.stock} pieces available` : "Out of stock"}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  disabled={product.stock === 0}
                  onClick={() => {
                   
                  }}
                  sx={{
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  sx={{
                    border: "1px solid #dee2e6",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#f8f9fa" },
                  }}
                >
                  <FavoriteBorder />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;