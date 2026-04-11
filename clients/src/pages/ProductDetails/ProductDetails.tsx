import { Link as RouterLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { Product } from "../../types";
import { productApi } from "../../api/productApi";
import { useCart, useWishlist } from "../../context";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const fav = id ? isFavorite(id) : false;
  const formattedPrice = product ? currencyFormatter.format(product.price) : "";

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError("");
        const response = await productApi.getById(id);
        setProduct(response.data);
      } catch (err: unknown) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!id || !product) return;
    try {
      await addToCart(id, quantity);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Skeleton variant="rounded" height={460} sx={{ borderRadius: 4 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Skeleton variant="text" height={68} width="80%" />
            <Skeleton variant="text" height={36} width="40%" />
            <Skeleton variant="rounded" height={120} sx={{ mt: 2.5, borderRadius: 3 }} />
            <Skeleton variant="rounded" height={56} sx={{ mt: 2.5, borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Product unavailable
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.72)", mb: 3 }}>
            {error}
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" startIcon={<ArrowBackIcon />}>
            Back to home
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Product not found
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.72)", mb: 3 }}>
            The item you selected is no longer available.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" startIcon={<ArrowBackIcon />}>
            Continue shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2.5, fontWeight: 700, color: "text.secondary" }}
        >
          Back
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
          }}
        >
          <Grid container spacing={{ xs: 3, md: 6 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  position: "relative",
                  bgcolor: "white",
                  borderRadius: 4,
                  p: 3,
                  height: { xs: 320, md: 500 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(0,0,0,0.04)",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.02)",
                }}
              >
                <IconButton
                  onClick={() => id && toggleFavorite(id)}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    color: fav ? "#FF3366" : "text.secondary",
                    "&:hover": { bgcolor: "white", transform: "scale(1.08)" },
                  }}
                >
                  {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <Chip
                  label={product.inStock === false ? "Out of stock" : "In stock"}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    bgcolor: product.inStock === false ? "rgba(211,47,47,0.12)" : "rgba(46,125,50,0.12)",
                    color: product.inStock === false ? "error.main" : "success.main",
                    fontWeight: 800,
                  }}
                />

                <Box
                  component="img"
                  src={product.mainImage?.url}
                  alt={product.name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.15))",
                    transition: "transform 0.35s ease",
                    "&:hover": { transform: "scale(1.04)" },
                    borderRadius: 4,
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Chip
                  label={product.categoryLabel || "Product"}
                  size="small"
                  sx={{
                    mb: 2,
                    bgcolor: "rgba(26,35,126,0.1)",
                    color: "#1a237e",
                    fontWeight: 700,
                  }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 1,
                    fontSize: { xs: "1.9rem", md: "2.5rem" },
                    letterSpacing: "-0.4px",
                  }}
                >
                  {product.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
                  <Rating
                    value={product.rating || 4.5}
                    precision={0.5}
                    readOnly
                    size="large"
                    sx={{ color: "#FFD700" }}
                  />
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    ({product.rating || 4.5})
                  </Typography>
                </Box>

                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  {product.description || "Clean product details with price and core information to help you decide quickly."}
                </Typography>
              </Box>

              {product.specs && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Specifications:
                  </Typography>
                  <Chip label={product.specs} variant="outlined" sx={{ borderRadius: 2 }} />
                </Box>
              )}

              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 51, 102, 0.04)",
                  borderRadius: 4,
                  mb: 3,
                  border: "1px solid rgba(255, 51, 102, 0.1)",
                }}
              >
                <Typography variant="overline" sx={{ color: "#FFB84D" }}>
                  Current price
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mt: 0.5,
                    color: "success.main",
                    letterSpacing: "-0.6px",
                  }}
                >
                  {formattedPrice}
                </Typography>
              </Box>

              {product.inStock !== false && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Quantity:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ px: 2, fontWeight: 700 }}>{quantity}</Typography>
                    <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartOutlinedIcon />}
                  disabled={product.inStock === false}
                  onClick={handleAddToCart}
                  sx={{
                    py: 1.8,
                    bgcolor: "#FF3366",
                    fontSize: "1rem",
                    fontWeight: 800,
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(255,51,102,0.3)",
                    "&:hover": {
                      bgcolor: "#E62E5C",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 28px rgba(255,51,102,0.4)",
                    },
                  }}
                >
                  {product.inStock === false ? "Out of stock" : "Add to cart"}
                </Button>
              </Box>

              <Button
                component={RouterLink}
                to="/"
                variant="text"
                size="large"
                sx={{ mt: 1.5, alignSelf: "flex-start", fontWeight: 700 }}
              >
                Continue shopping
              </Button>

              <Grid container spacing={2} sx={{ mt: 3.5 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        bgcolor: "rgba(26, 35, 126, 0.08)",
                        borderRadius: 2,
                        color: "#1a237e",
                      }}
                    >
                      <LocalShippingOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Fast delivery
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        bgcolor: "rgba(46, 125, 50, 0.08)",
                        borderRadius: 2,
                        color: "#2e7d32",
                      }}
                    >
                      <VerifiedUserOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Secure checkout
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}