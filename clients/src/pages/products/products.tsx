import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../api/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const formatPrice = (value: number) => `$${Number(value).toFixed(2)}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Fetched products:", response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f6f8fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <CircularProgress />
          <Typography sx={{ color: "#5f6368" }}>Loading products...</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fb", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{ mb: 1, fontWeight: 800, color: "#111827" }}
          >
            All Products
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280", maxWidth: 640 }}>
            Browse the latest items, compare prices quickly, and open any
            product for more details.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1.5, color: "#8a8f98" }}>
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            available
          </Typography>
        </Box>

        {products.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              borderStyle: "dashed",
              bgcolor: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              No products found
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              We could not find any products to display right now.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => {
              const isInStock = product.stock > 0;
              const imageUrl =
                product.mainImage?.url ||
                "https://via.placeholder.com/600x400?text=Product";

              return (
                <Grid key={product._id} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
                      transition: "transform 180ms ease, box-shadow 180ms ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.14)",
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/product/${product._id}`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        sx={{ position: "relative", width: "100%", pt: "75%" }}
                      >
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          alt={product.name}
                          sx={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            bgcolor: "#eef2f7",
                          }}
                        />
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            right: 12,
                            justifyContent: "space-between",
                          }}
                        >
                          {product.discount > 0 ? (
                            <Chip
                              label={`${product.discount}% off`}
                              color="error"
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          ) : (
                            <Chip
                              label="New arrival"
                              size="small"
                              sx={{ bgcolor: "rgba(255,255,255,0.92)" }}
                            />
                          )}
                          <Chip
                            label={
                              isInStock
                                ? `In stock (${product.stock})`
                                : "Sold out"
                            }
                            color={isInStock ? "success" : "default"}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: isInStock
                                ? undefined
                                : "rgba(255,255,255,0.92)",
                            }}
                          />
                        </Stack>
                      </Box>

                      <CardContent sx={{ flexGrow: 1, width: "100%", pb: 1.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#111827",
                            mb: 1,
                            minHeight: 56,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#6b7280",
                              textDecoration:
                                product.discount > 0 ? "line-through" : "none",
                              fontWeight: 500,
                            }}
                          >
                            {formatPrice(product.price)}
                          </Typography>
                          {product.discount > 0 && (
                            <Typography
                              variant="body1"
                              sx={{ color: "#dc2626", fontWeight: 800 }}
                            >
                              {formatPrice(product.finalPrice)}
                            </Typography>
                          )}
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: isInStock ? "#166534" : "#991b1b" }}
                        >
                          {isInStock
                            ? "Ready to ship"
                            : "Currently unavailable"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        component={Link}
                        to={`/product/${product._id}`}
                        fullWidth
                        variant="contained"
                        disabled={!isInStock}
                        sx={{
                          textTransform: "none",
                          borderRadius: 999,
                          py: 1.1,
                          fontWeight: 700,
                        }}
                      >
                        {isInStock ? "View details" : "Out of stock"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;
