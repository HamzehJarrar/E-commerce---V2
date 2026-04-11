import { Box, Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Pagination } from "@mui/material";
import { useState } from "react";
import type { SearchParams } from "../../types";
import { ProductCard, Loading, Error } from "../../components";
import { useProducts } from "../../hooks";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 12,
    sort: "newest",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { products, loading, error, pagination } = useProducts({
    ...searchParams,
    q: searchQuery || undefined,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (e: any) => {
    setSearchParams((prev: SearchParams) => ({ ...prev, sort: e.target.value, page: 1 }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (_: any, page: number) => {
    setSearchParams((prev: SearchParams) => ({ ...prev, page }));
  };

  if (error && !loading) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 1,
              background: "linear-gradient(135deg, #FF3366 0%, #FF9933 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.4px",
            }}
          >
            Discover Amazing Products
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Browse our collection of quality products at unbeatable prices.
            Find exactly what you need with our powerful search.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 4,
            alignItems: "center",
          }}
        >
          <Box
            component="input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              "&:focus": {
                borderColor: "#FF3366",
                boxShadow: "0 0 0 3px rgba(255,51,102,0.2)",
              },
            }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={searchParams.sort || "newest"}
              label="Sort by"
              onChange={handleSortChange}
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Loading message="Loading products..." />
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {pagination.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}