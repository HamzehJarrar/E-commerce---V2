import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowForward, Percent, ShoppingBag, Bolt, Verified } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { type Product } from "../../api/product";

interface HeroSectionProps {
  topDiscount: Product | undefined;
  formatPrice: (value: number) => string;
}

export default function HeroSection({
  topDiscount,
  formatPrice,
}: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
       "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)
          `,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.01) 50px,
              rgba(255, 255, 255, 0.01) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.01) 50px,
              rgba(255, 255, 255, 0.01) 51px
            )
          `,
        },
      }}
    >
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 4, md: 10 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  px: 2.5,
                  py: 1,
                  borderRadius: 3,
                }}
              >
                <Bolt sx={{ fontSize: 18, color: "#818cf8" }} />
                <Typography sx={{ color: "#a5b4fc", fontSize: 13, fontWeight: 600 }}>
                  Flash Deals Every Day
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  px: 2.5,
                  py: 1,
                  borderRadius: 3,
                }}
              >
                <Verified sx={{ fontSize: 18, color: "#22c55e" }} />
                <Typography sx={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
                  100% Original
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 38, md: 56, lg: 60 },
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Discover
              <br />
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Premium Products
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #22c55e 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                At Unbeatable Prices
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: { xs: 16, md: 18 },
                mb: 4,
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              Shop the hottest deals on premium products. Unbeatable prices on
              everything you love, with fast delivery and easy returns.
            </Typography>

            <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "#6366f1",
                  color: "#fff",
                  fontWeight: 700,
                  px: 5,
                  py: 1.75,
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                  fontSize: 16,
                  "&:hover": {
                    bgcolor: "#4f46e5",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 32px rgba(99, 102, 241, 0.5)",
                  },
                  transition: "all 200ms ease",
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ShoppingBag />}
                component={Link}
                to="/products"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: 600,
                  px: 5,
                  py: 1.75,
                  borderRadius: 3,
                  fontSize: 16,
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                Browse All
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                position: "relative",
              }}
            >
              {topDiscount && (
                <Box
                  sx={{
                    position: "relative",
                    animation: "float 6s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-20px)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      left: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)",
                      filter: "blur(40px)",
                      opacity: 0.4,
                    }}
                  />
                  <Card
                    sx={{
                      maxWidth: 340,
                      mx: "auto",
                      borderRadius: 5,
                      overflow: "hidden",
                      boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Box sx={{ position: "relative", pt: "70%" }}>
                      <CardMedia
                        component="img"
                        image={
                          topDiscount.mainImage?.url ||
                          "https://via.placeholder.com/400x300?text=Product"
                        }
                        sx={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: 4,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          bgcolor: "#ef4444",
                          color: "#fff",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          fontWeight: 800,
                          fontSize: 22,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          boxShadow: "0 4px 16px rgba(239, 68, 68, 0.5)",
                        }}
                      >
                        <Percent sx={{ fontSize: 18 }} />
                        {topDiscount.discount}% Off
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#fff" }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: 17,
                          color: "#1f2937",
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {topDiscount.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}
                      >
                        <Typography
                          sx={{ fontWeight: 800, fontSize: 28, color: "#ef4444" }}
                        >
                          {formatPrice(topDiscount.finalPrice)}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 16,
                            color: "#9ca3af",
                            textDecoration: "line-through",
                          }}
                        >
                          {formatPrice(topDiscount.price)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}