import { Alert, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Category, Inventory2 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../utils/auth";

const AdminDashboard = () => {
  const user = getAuthUser();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="warning">Please login to access admin pages.</Alert>
      </Container>
    );
  }

  if (user.role !== "admin") {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error">Access denied. Admin role is required.</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        py: 5,
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(170deg, #f7fbfa 0%, #f6f4ef 100%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            border: "1px solid #d5e3e0",
            background: "linear-gradient(135deg, #0f766e 0%, #155e75 100%)",
            color: "#fff",
            boxShadow: "0 16px 34px rgba(15, 118, 110, 0.24)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "Sora, sans-serif" }}>
            Admin Panel
          </Typography>
          <Typography sx={{ mt: 1, opacity: 0.9 }}>
            Categories and products are now separated into dedicated pages.
          </Typography>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} sx={{ mt: 3 }}>
          <Paper
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              border: "1px solid #d8e4e2",
              boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)",
            }}
          >
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 1 }}>
              <Category sx={{ color: "#0f766e" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: "var(--text-main)" }}>
                Categories
              </Typography>
            </Stack>
            <Typography sx={{ color: "var(--text-muted)", mb: 2 }}>
              Create and manage categories in one place.
            </Typography>
            <Button
              component={Link}
              to="/admin/categories"
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--brand)", "&:hover": { bgcolor: "#0b5f59" } }}
            >
              Open Categories Page
            </Button>
          </Paper>

          <Paper
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              border: "1px solid #d8e4e2",
              boxShadow: "0 8px 20px rgba(19, 35, 40, 0.06)",
            }}
          >
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 1 }}>
              <Inventory2 sx={{ color: "#c2410c" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: "var(--text-main)" }}>
                Products
              </Typography>
            </Stack>
            <Typography sx={{ color: "var(--text-muted)", mb: 2 }}>
              Add products and review latest product rows.
            </Typography>
            <Button
              component={Link}
              to="/admin/products"
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--brand)", "&:hover": { bgcolor: "#0b5f59" } }}
            >
              Open Products Page
            </Button>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
