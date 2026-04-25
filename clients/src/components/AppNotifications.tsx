import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import type { AppNoticeDetail } from "../utils/notify";

const AppNotifications = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">(
    "info",
  );

  useEffect(() => {
    const onNotify = (event: Event) => {
      const custom = event as CustomEvent<AppNoticeDetail>;
      setMessage(custom.detail?.message || "");
      setSeverity(custom.detail?.type || "info");
      setOpen(true);
    };

    window.addEventListener("app-notify", onNotify);
    return () => {
      window.removeEventListener("app-notify", onNotify);
    };
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2800}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        sx={{ width: "100%", borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppNotifications;
