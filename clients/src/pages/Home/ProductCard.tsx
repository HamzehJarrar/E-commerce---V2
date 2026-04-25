import { Box, Card, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart, FavoriteBorder, Favorite, Star } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { type Product } from "../../api/product";
import { addToCart } from "../../api/cart";
import { getAuthUser } from "../../utils/auth";
import { notify } from "../../utils/notify";
import { isProductWishlisted, toggleWishlistProduct } from "../../utils/wishlist";

interface ProductCardProps {
  product: Product;
  formatPrice: (value: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
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
  }, [product._id]);

  const hasDiscount = product.discount > 0;
  const imageUrl =
    product.mainImage?.url ||
    "https://via.placeholder.com/600x450?text=Product";
  const finalPrice = hasDiscount ? product.finalPrice : product.price;

  return (
    <Card
      sx={{
        borderRadius: 5,
        bgcolor: "var(--bg-surface)",
        boxShadow: "0 8px 24px rgba(19, 35, 40, 0.06)",
        border: "1px solid var(--border-soft)",
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 20px 42px rgba(19, 35, 40, 0.14)",
          transform: "translateY(-5px)",
          "& .card-image": {
            transform: "scale(1.06)",
          },
          "& .card-actions": {
            opacity: 1,
          },
        },
      }}
      >
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ position: "relative", bgcolor: "#f5f9f8", pt: "80%", overflow: "hidden" }}>
          <Box
            component="img"
            src={imageUrl}
            alt={product.name}
            className="card-image"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 2,
              transition: "transform 0.4s",
            }}
          />

          {hasDiscount && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                bgcolor: "var(--accent)",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              -{product.discount}%
            </Box>
          )}

          <Box
            className="card-actions"
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              display: "flex",
              gap: 1,
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          >
            <Button
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (!getAuthUser()) {
                  notify("Please login to add items to cart.", "warning");
                  return;
                }

                try {
                  await addToCart(product._id, 1);
                  notify("Added to cart", "success");
                } catch {
                  notify("Could not add this item to cart.", "error");
                }
              }}
              disabled={product.stock === 0}
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "var(--bg-surface)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                color: "var(--text-muted)",
                "&:hover": { bgcolor: "var(--brand-soft)", color: "var(--brand)" },
              }}
            >
              <ShoppingCart sx={{ fontSize: 20 }} />
            </Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setWishlisted(toggleWishlistProduct(product._id));
              }}
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "var(--bg-surface)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                color: wishlisted ? "#dc2626" : "var(--text-muted)",
                "&:hover": { bgcolor: "#ffecee", color: "#dc2626" },
              }}
            >
              {wishlisted ? (
                <Favorite sx={{ fontSize: 20 }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 20 }} />
              )}
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
            {[1,2,3,4,5].map((s) => (
              <Star key={s} sx={{ fontSize: 14, color: s <= 4 ? "#fbbf24" : "#e5e7eb" }} />
            ))}
          </Box>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              color: "var(--text-main)",
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              minHeight: 42,
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 1 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 21,
                  color: hasDiscount ? "var(--accent)" : "var(--text-main)",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                {formatPrice(finalPrice)}
              </Typography>
              {hasDiscount && (
                <Typography sx={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "line-through" }}>
                  {formatPrice(product.price)}
                </Typography>
              )}
            </Box>

            {product.stock === 0 && (
              <Typography sx={{ color: "#dc2626", fontWeight: 700, fontSize: 13 }}>
                Out of stock
              </Typography>
            )}
          </Box>
        </Box>
      </Link>
    </Card>
  );
}
