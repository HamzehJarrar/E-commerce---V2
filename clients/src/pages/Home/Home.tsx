import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getProducts, type Product } from "../../api/product";
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

  const discountedProducts = useMemo(
    () => products.filter((product) => product.discount > 0),
    [products],
  );

  const regularProducts = useMemo(
    () => products.filter((product) => product.discount <= 0),
    [products],
  );

  const topDiscount = useMemo(() => {
    return [...discountedProducts].sort((a, b) => b.discount - a.discount)[0];
  }, [discountedProducts]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(Number(value));

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={60}
              sx={{ color: "#6366f1" }}
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
                  bgcolor: "#fff",
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
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Loading amazing deals...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <HeroSection topDiscount={topDiscount} formatPrice={formatPrice} />

      {discountedProducts.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionHeader
            title="Hot Deals"
            subtitle="Limited time offers - grab them before they are gone!"
            accentColor="#ef4444"
            icon={<span style={{ fontSize: 24 }}>🔥</span>}
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
        <Container maxWidth="xl" sx={{ pb: 10 }}>
          <SectionHeader
            title="All Products"
            subtitle="Browse our complete collection of products."
            accentColor="#1e1b4b"
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
          <Typography sx={{ color: "#6b7280", fontSize: 18 }}>
            No products available at the moment.
          </Typography>
        </Container>
      )}
    </Box>
  );
}