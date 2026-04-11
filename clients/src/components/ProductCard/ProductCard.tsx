import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  ShoppingCartOutlined as CartIcon,
} from "@mui/icons-material";
import type { Product } from "../../types";
import { useWishlist, useCart } from "../../context";

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useWishlist();
  const { addToCart } = useCart();
  const isFav = isFavorite(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product._id, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product._id);
  };

  return (
    <Card
      component={RouterLink}
      to={`/product/${product._id}`}
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 3,
        overflow: "visible",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(255, 51, 102, 0.3)",
          "& .product-image": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", p: 2, pb: 0 }}>
        <Chip
          label={product.inStock === false ? "Out of stock" : "In stock"}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 1,
            bgcolor:
              product.inStock === false
                ? "rgba(211, 47, 47, 0.9)"
                : "rgba(46, 125, 50, 0.9)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.7rem",
          }}
        />

        {showActions && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                color: isFav ? "#FF3366" : "white",
                width: 36,
                height: 36,
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                  color: "#FF3366",
                },
              }}
            >
              {isFav ? <FavoriteFilledIcon fontSize="small" /> : <FavoriteIcon fontSize="small" />}
            </IconButton>
          </Box>
        )}

        <CardMedia
          component="img"
          className="product-image"
          image={product.mainImage?.url}
          alt={product.name}
          sx={{
            height: 200,
            objectFit: "contain",
            borderRadius: 2,
            transition: "transform 0.3s ease",
            background: "rgba(255, 255, 255, 0.03)",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
        <Chip
          label={product.categoryLabel || "Product"}
          size="small"
          variant="outlined"
          sx={{
            mb: 1,
            alignSelf: "flex-start",
            fontSize: "0.65rem",
            height: 22,
            borderColor: "rgba(255, 255, 255, 0.15)",
            color: "text.secondary",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "text.primary",
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.5 }}>
          <Rating
            value={product.rating || 4.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              color: "#FFD700",
              fontSize: "0.9rem",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount || 0})
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: "success.main",
              mb: showActions ? 1.5 : 0,
            }}
          >
            {currencyFormatter.format(product.price)}
          </Typography>

          {showActions && (
            <Button
              onClick={handleAddToCart}
              fullWidth
              variant="contained"
              disabled={product.inStock === false}
              sx={{
                bgcolor: "#FF3366",
                color: "white",
                py: 1,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#E62E5C",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <CartIcon />
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}