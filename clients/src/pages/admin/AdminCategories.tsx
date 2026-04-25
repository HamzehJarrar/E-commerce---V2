import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddPhotoAlternate, Category, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createCategory, getCategories, type CategoryOption } from "../../api/admin";
import { getAuthUser } from "../../utils/auth";
import { notify } from "../../utils/notify";

const AdminCategories = () => {
  const user = getAuthUser();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = user?.role === "admin";

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      notify("Could not load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadCategories();
    }
  }, [isAdmin]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!categoryImage) {
      notify("Category image is required", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await createCategory({ name: categoryName.trim(), image: categoryImage });
      notify("Category added", "success");
      setCategoryName("");
      setCategoryImage(null);
      await loadCategories();
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { error?: string } } }).response?.data
          ?.error === "string"
          ? (error as { response?: { data?: { error?: string } } }).response!.data!
              .error!
          : "Could not create category";
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
      <Container maxWidth="md">
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
            Categories
          </Button>
          <Button
            component={Link}
            to="/admin/products"
            variant="text"
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              color: "var(--text-muted)",
            }}
          >
            Products
          </Button>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #d8e4e2", boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)", mb: 3 }}>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 2 }}>
            <Category sx={{ color: "#0f766e" }} />
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: "var(--text-main)" }}>
              Categories
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Category Name"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                required
                fullWidth
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternate />}
                sx={{ textTransform: "none", borderStyle: "dashed", justifyContent: "flex-start", py: 1.1 }}
              >
                {categoryImage ? categoryImage.name : "Choose Category Image"}
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setCategoryImage(file);
                  }}
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{ textTransform: "none", py: 1.1, fontWeight: 700, borderRadius: 2.5, bgcolor: "var(--brand)", "&:hover": { bgcolor: "#0b5f59" } }}
              >
                {submitting ? "Saving..." : "Add Category"}
              </Button>
            </Stack>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #d8e4e2", boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)" }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: "var(--text-main)", mb: 1 }}>
            Existing Categories
          </Typography>
          <Typography sx={{ color: "var(--text-muted)", mb: 2 }}>{categories.length} categories</Typography>

          {loading ? (
            <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "var(--brand)" }} />
            </Box>
          ) : categories.length === 0 ? (
            <Typography sx={{ color: "var(--text-muted)" }}>No categories yet.</Typography>
          ) : (
            <Stack spacing={1.2}>
              {categories.map((category) => (
                <Box key={category._id} sx={{ p: 1.4, borderRadius: 2.5, bgcolor: "#fcfdfd", border: "1px solid #e0ece9" }}>
                  <Typography sx={{ color: "var(--text-main)", fontWeight: 600 }}>{category.name}</Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminCategories;
