import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return;
    }
    if (form.password.length < 6) {
      return;
    }

    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch {
      // Error handled by context
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0a1929",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textAlign: "center",
              mb: 0.5,
              color: "#FF3366",
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.6)"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Join us to start shopping
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center", fontSize: 14 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                bgcolor: "#FF3366",
                fontWeight: 700,
                "&:hover": { bgcolor: "#E62E5C" },
                "&:disabled": { bgcolor: "rgba(255,51,102,0.5)" },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Create Account"}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, color: "rgba(255,255,255,0.6)" }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#FF3366", fontWeight: 700 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}