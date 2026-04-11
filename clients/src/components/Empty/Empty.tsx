import { Box, Button, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { Link as RouterLink } from "react-router-dom";

interface EmptyProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export default function Empty({
  icon = <InboxIcon sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }} />,
  title = "Nothing here yet",
  message = "Start shopping to add items here",
  actionText = "Browse Products",
  actionLink = "/",
  onAction,
}: EmptyProps) {
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
        minHeight: 300,
      }}
    >
      {icon}
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        {message}
      </Typography>
      {onAction ? (
        <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
          {actionText}
        </Button>
      ) : (
        <Button component={RouterLink} to={actionLink} variant="contained" sx={{ mt: 1 }}>
          {actionText}
        </Button>
      )}
    </Box>
  );
}