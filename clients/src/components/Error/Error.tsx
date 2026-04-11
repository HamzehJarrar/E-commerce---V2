import { Box, Button, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Link as RouterLink } from "react-router-dom";

interface ErrorProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
}

export default function Error({ 
  message = "Something went wrong. Please try again.", 
  title = "Oops! something went wrong",
  onRetry 
}: ErrorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 4,
        textAlign: "center",
      }}
    >
      <ReportProblemIcon sx={{ fontSize: 64, color: "error.main", opacity: 0.7 }} />
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        {message}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        {onRetry && (
          <Button variant="contained" onClick={onRetry}>
            Try Again
          </Button>
        )}
        <Button component={RouterLink} to="/" variant="outlined">
          Go Home
        </Button>
      </Box>
    </Box>
  );
}