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

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
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
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.6)"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Sign in to continue
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center", fontSize: 14 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Sign In"}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, color: "rgba(255,255,255,0.6)" }}
            >
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#FF3366", fontWeight: 700 }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}