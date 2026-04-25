import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../api/product";
import { formatPrice } from "../../utils/formatPrice";
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  const discountedProducts = products.filter((product) => product.discount > 0);
  const regularProducts = products.filter((product) => product.discount <= 0);

  let topDiscount: Product | undefined;
  discountedProducts.forEach((product) => {
    if (!topDiscount || product.discount > topDiscount.discount) {
      topDiscount = product;
    }
  });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "var(--bg-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={60}
              sx={{ color: "var(--brand)" }}
              thickness={4}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "var(--brand)",
                  animation: "pulse 1.5s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.3 },
                  },
                }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              color: "var(--text-muted)",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Loading products...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <HeroSection topDiscount={topDiscount} formatPrice={formatPrice} />

      {discountedProducts.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 7 }}>
          <SectionHeader
            title="Hot Deals"
            subtitle="Best discounts selected for you today."
            accentColor="var(--accent)"
            icon={<span style={{ fontSize: 22 }}>%</span>}
          />
          <Grid container spacing={4}>
            {discountedProducts.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} formatPrice={formatPrice} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {regularProducts.length > 0 && (
        <Container maxWidth="xl" sx={{ pb: 9 }}>
          <SectionHeader
            title="All Products"
            subtitle="Simple browsing with clear prices and stock info."
            accentColor="var(--brand)"
          />
          <Grid container spacing={4}>
            {regularProducts.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} formatPrice={formatPrice} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {discountedProducts.length === 0 && regularProducts.length === 0 && (
        <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
          <Typography sx={{ color: "var(--text-muted)", fontSize: 18 }}>
            No products available at the moment.
          </Typography>
        </Container>
      )}
    </Box>
  );
}
