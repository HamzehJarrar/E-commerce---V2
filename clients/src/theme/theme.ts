import { createTheme, alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF3366",
      light: "#FF6699",
      dark: "#E62E5C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF9933",
      light: "#FFB366",
      dark: "#E68A2E",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#2E7D32",
      light: "#4CAF50",
      dark: "#1B5E20",
    },
    error: {
      main: "#D32F2F",
      light: "#EF5350",
      dark: "#C62828",
    },
    warning: {
      main: "#FFB84D",
      light: "#FFCC80",
      dark: "#FF9800",
    },
    background: {
      default: "#0A1929",
      paper: "#0D2137",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.72)",
    },
    neutral: {
      main: "rgba(255, 255, 255, 0.08)",
      light: "rgba(255, 255, 255, 0.12)",
      dark: "rgba(255, 255, 255, 0.04)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: "-0.4px",
    },
    h2: {
      fontWeight: 900,
      letterSpacing: "-0.3px",
    },
    h3: {
      fontWeight: 900,
      letterSpacing: "-0.2px",
    },
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, ${alpha("#FF3366", 0.15)} 0%, transparent 50%),
            radial-gradient(circle at 100% 50%, ${alpha("#FF9933", 0.1)} 0%, transparent 40%)
          `,
          backgroundAttachment: "fixed",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.04)",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: "rgba(255, 255, 255, 0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            bgcolor: "rgba(255,255,255,0.05)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FF3366",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});

export default theme;