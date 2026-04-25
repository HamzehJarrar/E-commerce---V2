import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddPhotoAlternate, ArrowBack, Inventory2, Storefront } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createProduct,
  getAdminProducts,
  getCategories,
  type AdminProduct,
  type CategoryOption,
} from "../../api/admin";
import { getAuthUser } from "../../utils/auth";
import { notify } from "../../utils/notify";

const AdminProducts = () => {
  const user = getAuthUser();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("0");
  const [productStock, setProductStock] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = user?.role === "admin";

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedCategories, fetchedProducts] = await Promise.all([
        getCategories(),
        getAdminProducts(),
      ]);

      setCategories(fetchedCategories);
      setProducts(fetchedProducts);

      if (!productCategoryId && fetchedCategories.length > 0) {
        setProductCategoryId(fetchedCategories[0]._id);
      }
    } catch {
      notify("Could not load products page data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const productRows = useMemo(() => products.slice(0, 12), [products]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productImage) {
      notify("Product image is required", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({
        name: productName.trim(),
        price: Number(productPrice),
        discount: Number(productDiscount) || 0,
        stock: Number(productStock),
        categoryId: productCategoryId,
        mainImage: productImage,
      });
      notify("Product added", "success");
      setProductName("");
      setProductPrice("");
      setProductDiscount("0");
      setProductStock("");
      setProductImage(null);
      await loadData();
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { error?: string } } }).response?.data
          ?.error === "string"
          ? (error as { response?: { data?: { error?: string } } }).response!.data!
              .error!
          : "Could not create product";
      notify(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="warning">Please login to access admin pages.</Alert>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error">Access denied. Admin role is required.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 5, minHeight: "calc(100vh - 80px)", background: "linear-gradient(170deg, #f7fbfa 0%, #f6f4ef 100%)" }}>
      <Container maxWidth="lg">
        <Button component={Link} to="/admin" startIcon={<ArrowBack />} sx={{ textTransform: "none", mb: 2 }}>
          Back to Admin
        </Button>

        <Paper
          sx={{
            p: 0.8,
            mb: 2,
            borderRadius: 3,
            border: "1px solid #d8e4e2",
            boxShadow: "0 6px 14px rgba(19, 35, 40, 0.05)",
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            component={Link}
            to="/admin/categories"
            variant="text"
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              color: "var(--text-muted)",
            }}
          >
            Categories
          </Button>
          <Button
            component={Link}
            to="/admin/products"
            variant="contained"
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "var(--brand)",
              "&:hover": { bgcolor: "#0b5f59" },
            }}
          >
            Products
          </Button>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #d8e4e2", boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)" }}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 2 }}>
                <Inventory2 sx={{ color: "#c2410c" }} />
                <Typography sx={{ fontSize: 22, fontWeight: 700, color: "var(--text-main)" }}>
                  Add Product
                </Typography>
              </Stack>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    select
                    label="Category"
                    value={productCategoryId}
                    onChange={(event) => setProductCategoryId(event.target.value)}
                    required
                    fullWidth
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Price"
                    type="number"
                    value={productPrice}
                    onChange={(event) => setProductPrice(event.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Discount %"
                    type="number"
                    value={productDiscount}
                    onChange={(event) => setProductDiscount(event.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Stock"
                    type="number"
                    value={productStock}
                    onChange={(event) => setProductStock(event.target.value)}
                    required
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternate />}
                    sx={{ textTransform: "none", borderStyle: "dashed", justifyContent: "flex-start", py: 1.1 }}
                  >
                    {productImage ? productImage.name : "Choose Product Main Image"}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setProductImage(file);
                      }}
                    />
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting || categories.length === 0}
                    sx={{ textTransform: "none", py: 1.1, fontWeight: 700, borderRadius: 2.5, bgcolor: "var(--brand)", "&:hover": { bgcolor: "#0b5f59" } }}
                  >
                    {submitting ? "Saving..." : "Add Product"}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #d8e4e2", boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)" }}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 1 }}>
                <Storefront sx={{ color: "#1d4ed8" }} />
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "var(--text-main)" }}>
                  Existing Products
                </Typography>
              </Stack>

              <Typography sx={{ color: "var(--text-muted)", mb: 2 }}>
                Showing latest {productRows.length} of {products.length} products.
              </Typography>

              {loading ? (
                <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
                  <CircularProgress sx={{ color: "var(--brand)" }} />
                </Box>
              ) : productRows.length === 0 ? (
                <Typography sx={{ color: "var(--text-muted)" }}>No products yet.</Typography>
              ) : (
                <Stack spacing={1.2}>
                  {productRows.map((product) => {
                    const categoryName =
                      typeof product.category === "string"
                        ? product.category
                        : product.category?.name || "No category";

                    return (
                      <Box
                        key={product._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 1,
                          p: 1.5,
                          borderRadius: 2.5,
                          bgcolor: "#fcfdfd",
                          border: "1px solid #e0ece9",
                        }}
                      >
                        <Typography sx={{ color: "var(--text-main)", fontWeight: 600 }}>{product.name}</Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
                          <Typography sx={{ color: "#155e75", fontSize: 13, fontWeight: 600, bgcolor: "#e8f2f4", px: 1.2, py: 0.4, borderRadius: 99 }}>
                            {categoryName}
                          </Typography>
                          <Typography sx={{ color: "#065f46", fontSize: 13, fontWeight: 600, bgcolor: "#e6f7ef", px: 1.2, py: 0.4, borderRadius: 99 }}>
                            Price {product.price}
                          </Typography>
                          <Typography sx={{ color: "#9a3412", fontSize: 13, fontWeight: 600, bgcolor: "#fff2e8", px: 1.2, py: 0.4, borderRadius: 99 }}>
                            Stock {product.stock}
                          </Typography>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminProducts;
