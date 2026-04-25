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
import { registerUser } from "../../api/auth";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      setSuccess("Registration successful. You can now login.");
      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (submitError: unknown) {
      const message =
        typeof submitError === "object" &&
        submitError !== null &&
        "response" in submitError &&
        typeof (submitError as { response?: { data?: { error?: string } } }).response
          ?.data?.error === "string"
          ? (submitError as { response?: { data?: { error?: string } } }).response!.data!
              .error!
          : "Registration failed. Please try again.";
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
                Create account
              </Typography>
              <Typography sx={{ mt: 0.75, color: "var(--text-muted)" }}>
                Register and start saving your favorite products.
              </Typography>
            </Box>

            {error ? <Alert severity="error">{error}</Alert> : null}
            {success ? <Alert severity="success">{success}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  fullWidth
                />
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
                  helperText="Minimum 8 characters"
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
                    "Register"
                  )}
                </Button>
              </Stack>
            </Box>

            <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "var(--brand)", fontWeight: 600 }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
