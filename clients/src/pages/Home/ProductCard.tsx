import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LocalFireDepartment, Star } from "@mui/icons-material";
import { type Product } from "../../api/product";

interface ProductCardProps {
  product: Product;
  formatPrice: (value: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  const hasDiscount = product.discount > 0;
  const imageUrl =
    product.mainImage?.url ||
    "https://via.placeholder.com/600x450?text=Product";
  const finalPrice = hasDiscount ? product.finalPrice : product.price;
  const savedAmount = Math.max(product.price - finalPrice, 0);

  return (
    <Card
      sx={{
        borderRadius: 5,
        backgroundColor: "#fff",
        border: "1px solid #f0f0f5",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        height: "100%",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
          borderColor: "#6366f1",
          "& .product-image": {
            transform: "scale(1.08)",
          },
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/product/${product._id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#fafafa",
            pt: "75%",
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={product.name}
            className="product-image"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 3,
              transition: "transform 400ms ease",
            }}
          />

          {hasDiscount && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                bgcolor: "#ef4444",
                color: "#fff",
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                -{product.discount}%
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 0.5,
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                sx={{
                  fontSize: 16,
                  color: star <= 4 ? "#fbbf24" : "#e5e7eb",
                }}
              />
            ))}
          </Box>
        </Box>

        <CardContent sx={{ p: 3, pt: 2.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: 15,
              lineHeight: 1.4,
              color: "#1f2937",
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 42,
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 24,
                color: hasDiscount ? "#ef4444" : "#1f2937",
              }}
            >
              {formatPrice(finalPrice)}
            </Typography>

            {hasDiscount && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#9ca3af",
                  textDecoration: "line-through",
                  fontWeight: 500,
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: hasDiscount ? "#ef4444" : "#9ca3af",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {hasDiscount && (
                <>
                  <LocalFireDepartment sx={{ fontSize: 16 }} />
                  <span>Hot Deal</span>
                </>
              )}
            </Box>

            {hasDiscount && (
              <Box
                sx={{
                  bgcolor: "#fef2f2",
                  color: "#ef4444",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1.5,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Save {formatPrice(savedAmount)}
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}