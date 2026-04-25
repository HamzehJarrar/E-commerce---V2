import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Percent,
  ShoppingBag,
  LocalShipping,
  WorkspacePremium,
} from "@mui/icons-material";
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
        background:
          "linear-gradient(130deg, #f0f7f5 0%, #f6f4ef 45%, #fff6ec 100%)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-soft)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -120,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(15, 118, 110, 0.1)",
          filter: "blur(6px)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -140,
          left: -100,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.12)",
          filter: "blur(8px)",
        },
      }}
    >
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          px: { xs: 2.5, md: 6 },
          maxWidth: 1280,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{ alignItems: "center" }}
        >
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                mb: 2.5,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  bgcolor: "var(--brand-soft)",
                  border: "1px solid #b9ddd9",
                  px: 1.75,
                  py: 0.65,
                  borderRadius: 99,
                }}
              >
                <WorkspacePremium
                  sx={{ fontSize: 16, color: "var(--brand)" }}
                />
                <Typography
                  sx={{ color: "var(--brand)", fontSize: 13, fontWeight: 700 }}
                >
                  Trusted quality picks
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  bgcolor: "var(--accent-soft)",
                  border: "1px solid #ffd2b0",
                  px: 1.75,
                  py: 0.65,
                  borderRadius: 99,
                }}
              >
                <LocalShipping sx={{ fontSize: 16, color: "var(--accent)" }} />
                <Typography
                  sx={{ color: "#b45309", fontSize: 13, fontWeight: 700 }}
                >
                  Fast delivery support
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 34, sm: 42, md: 56 },
                fontWeight: 800,
                color: "var(--text-main)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                mb: 2.5,
                fontFamily: "Sora, sans-serif",
              }}
            >
              Fresh finds for
              <Box
                component="span"
                sx={{ color: "var(--brand)", display: "block" }}
              >
                everyday shopping
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: { xs: 15, md: 18 },
                mb: 3.5,
                maxWidth: 560,
                lineHeight: 1.7,
              }}
            >
              Explore curated products, clearer prices, and easier browsing. We
              redesigned everything to help you find what you need faster.
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "var(--brand)",
                  color: "#fff",
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 3,
                  textTransform: "none",
                  boxShadow: "0 12px 28px rgba(15, 118, 110, 0.28)",
                  "&:hover": {
                    bgcolor: "#0b5f59",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Start Shopping
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ShoppingBag />}
                component={Link}
                to="/products"
                sx={{
                  borderColor: "#cbd7da",
                  color: "var(--text-main)",
                  fontWeight: 600,
                  px: 3,
                  py: 1.4,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "var(--brand)",
                    bgcolor: "var(--bg-surface)",
                  },
                }}
              >
                Browse Catalog
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
              <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>
                7-day return policy
              </Typography>
              <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>
                Secure checkout
              </Typography>
              <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>
                Live stock updates
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            {topDiscount && (
              <Link
                to={`/product/${topDiscount._id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    maxWidth: 370,
                    mx: "auto",
                    animation: "floatCard 6s ease-in-out infinite",
                    "@keyframes floatCard": {
                      "0%,100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-8px)" },
                    },
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 6,
                      overflow: "hidden",
                      border: "1px solid #d7e2e4",
                      boxShadow: "0 26px 54px rgba(19, 35, 40, 0.15)",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        pt: "73%",
                        bgcolor: "#f9fbfa",
                      }}
                    >
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
                          p: 3,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          bgcolor: "var(--accent)",
                          color: "#fff",
                          px: 1.6,
                          py: 0.8,
                          borderRadius: 2,
                          fontWeight: 800,
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Percent sx={{ fontSize: 16 }} />
                        {topDiscount.discount}% OFF
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2.5, bgcolor: "var(--bg-surface)" }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 18,
                          color: "var(--text-main)",
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {topDiscount.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 1.2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: 26,
                            color: "var(--brand)",
                          }}
                        >
                          {formatPrice(topDiscount.finalPrice)}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "var(--text-muted)",
                            textDecoration: "line-through",
                          }}
                        >
                          {formatPrice(topDiscount.price)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
