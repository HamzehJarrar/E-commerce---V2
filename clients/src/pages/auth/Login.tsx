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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { setAuthSession } from "../../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await loginUser({
        email: email.trim(),
        password,
      });

      setAuthSession(result.token, result.user);
      navigate("/");
    } catch (submitError: unknown) {
      const message =
        typeof submitError === "object" &&
        submitError !== null &&
        "response" in submitError &&
        typeof (submitError as { response?: { data?: { error?: string } } }).response
          ?.data?.error === "string"
          ? (submitError as { response?: { data?: { error?: string } } }).response!.data!
              .error!
          : "Login failed. Please check your email and password.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            border: "1px solid var(--border-soft)",
            boxShadow: "0 16px 36px rgba(19, 35, 40, 0.08)",
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--text-main)",
                }}
              >
                Welcome back
              </Typography>
              <Typography sx={{ mt: 0.75, color: "var(--text-muted)" }}>
                Sign in to continue shopping.
              </Typography>
            </Box>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    mt: 1,
                    py: 1.3,
                    bgcolor: "var(--brand)",
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#0b5f59" },
                  }}
                >
                  {submitting ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Stack>
            </Box>

            <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>
              Don&apos;t have an account?{" "}
              <Link to="/register" style={{ color: "var(--brand)", fontWeight: 600 }}>
                Register
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
