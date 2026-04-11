import { Box, Container, Grid, Typography } from "@mui/material";
import { useWishlist } from "../../context";
import { ProductCard, Loading, Empty, Error } from "../../components";
import type { Product as ProductType } from "../../types";

export default function Wishlist() {
  const { wishlist, loading, error } = useWishlist();

  if (loading) {
    return <Loading message="Loading wishlist..." />;
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Empty
          title="Your wishlist is empty"
          message="Save items you love by clicking the heart icon."
          actionText="Browse Products"
          actionLink="/"
        />
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 3,
            background: "linear-gradient(135deg, #FF3366 0%, #FF9933 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Wishlist ({wishlist.products.length} items)
        </Typography>

        <Grid container spacing={3}>
          {wishlist.products.map((product: ProductType) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}