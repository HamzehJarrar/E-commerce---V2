import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder, Favorite, ArrowBack, Star } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, type Product } from "../../api/product";
import { addToCart } from "../../api/cart";
import { getAuthUser } from "../../utils/auth";
import { formatPrice } from "../../utils/formatPrice";
import { notify } from "../../utils/notify";
import { isProductWishlisted, toggleWishlistProduct } from "../../utils/wishlist";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

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

  useEffect(() => {
    if (!product?._id) return;

    const syncWishlist = () => {
      setWishlisted(isProductWishlisted(product._id));
    };

    syncWishlist();
    window.addEventListener("wishlist-updated", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, [product?._id]);

  if (loading || !product) {
    return (
      <Box sx={{ minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <CircularProgress sx={{ color: "var(--brand)" }} />
          </Box>
        </Container>
      </Box>
    );
  }

  const images = [product.mainImage, ...(product.subImages || [])];
  const hasDiscount = product.discount > 0;

  const handleAddToCart = async () => {
    if (!getAuthUser()) {
      notify("Please login to add items to cart.", "warning");
      return;
    }

    try {
      await addToCart(product._id, quantity);
      notify("Added to cart", "success");
    } catch {
      notify("Could not add this item to cart.", "error");
    }
  };

  const handleWishlistClick = () => {
    const updatedState = toggleWishlistProduct(product._id);
    setWishlisted(updatedState);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{
              mb: 3,
              color: "var(--text-muted)",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { bgcolor: "var(--bg-surface)" },
            }}
          >
            Back to Products
          </Button>
        </Link>

        <Box
          sx={{
            bgcolor: "var(--bg-surface)",
            borderRadius: 6,
            p: { xs: 3, md: 5 },
            boxShadow: "0 18px 36px rgba(19, 35, 40, 0.1)",
            border: "1px solid var(--border-soft)",
          }}
        >
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    bgcolor: "#f5f9f8",
                    borderRadius: 4,
                    p: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={images[selectedImage]?.url || "https://via.placeholder.com/400"}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      maxWidth: 450,
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                
                {hasDiscount && (
                  <Chip
                    label={`-${product.discount}% OFF`}
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      bgcolor: "var(--accent)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      px: 1,
                    }}
                  />
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, mt: 3, justifyContent: "center" }}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedImage === index
                          ? "2px solid var(--brand)"
                          : "2px solid transparent",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: "var(--brand)" },
                    }}
                  >
                    <Box
                      component="img"
                      src={img?.url || "https://via.placeholder.com/70"}
                      alt=""
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} sx={{ fontSize: 18, color: s <= 4 ? "#f59e0b" : "#e5e7eb" }} />)}
                  <Typography sx={{ ml: 1, color: "var(--text-muted)", fontSize: 14 }}>(24)</Typography>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "var(--text-main)",
                    lineHeight: 1.3,
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {product.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: hasDiscount ? "var(--accent)" : "var(--text-main)",
                      fontWeight: 800,
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {formatPrice(product.finalPrice)}
                  </Typography>
                  {hasDiscount && (
                    <Typography
                      variant="h5"
                      sx={{ color: "var(--text-muted)", textDecoration: "line-through" }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                  )}
                </Box>

                <Typography sx={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                  Premium quality product with excellent craftsmanship. 
                  Perfect for everyday use with guaranteed satisfaction and lasting durability.
                </Typography>

                <Box sx={{ my: 1 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1.5, color: "var(--text-main)" }}>
                    Quantity
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#eff4f3",
                        borderRadius: 2,
                      }}
                    >
                      <Button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        sx={{ minWidth: 44, color: "var(--text-main)" }}
                      >
                        -
                      </Button>
                      <Typography sx={{ px: 3, fontWeight: 700, minWidth: 44, textAlign: "center" }}>
                        {quantity}
                      </Typography>
                      <Button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        sx={{ minWidth: 44, color: "var(--text-main)" }}
                      >
                        +
                      </Button>
                    </Box>
                    <Typography sx={{ color: product.stock > 0 ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                      {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    disabled={product.stock === 0}
                    onClick={handleAddToCart}
                    sx={{
                      bgcolor: "var(--brand)",
                      color: "#fff",
                      borderRadius: 3,
                      py: 1.75,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: 16,
                      boxShadow: "0 8px 24px rgba(15, 118, 110, 0.3)",
                      "&:hover": { bgcolor: "#0b5f59" },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={wishlisted ? <Favorite /> : <FavoriteBorder />}
                    onClick={handleWishlistClick}
                    sx={{
                      borderColor: "var(--border-soft)",
                      color: wishlisted ? "#dc2626" : "var(--text-main)",
                      borderRadius: 3,
                      px: 3,
                      "&:hover": {
                        borderColor: wishlisted ? "#dc2626" : "var(--brand)",
                        bgcolor: wishlisted ? "#ffecee" : "var(--bg-surface)",
                      },
                    }}
                  >
                    {wishlisted ? "Wishlisted" : "Wishlist"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
