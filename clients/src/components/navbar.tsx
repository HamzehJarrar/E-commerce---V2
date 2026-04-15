import {
  Box,
  Container,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Favorite,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#1a1a1a",
                letterSpacing: "-0.5px",
              }}
            >
              SHOP
            </Typography>
          </Link>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        location.pathname === link.path ? "#1a1a1a" : "#666",
                      fontWeight: location.pathname === link.path ? 600 : 500,
                      position: "relative",
                      "&:hover": { color: "#1a1a1a" },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: location.pathname === link.path ? "100%" : "0%",
                        height: 2,
                        bgcolor: "#1a1a1a",
                        transition: "width 0.2s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                px: 2,
                py: 0.5,
              }}
            >
              <Search sx={{ color: "#999", mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                sx={{
                  fontSize: "0.875rem",
                  width: 150,
                  "& input": { padding: 0 },
                }}
              />
            </Box>

            <IconButton size="small" sx={{ color: "#666" }}>
              <Favorite />
            </IconButton>

            <IconButton size="small" sx={{ color: "#666" }}>
              <Badge color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              size="small"
              sx={{ color: "#666" }}
              onClick={handleMenuOpen}
            >
              <Person />
            </IconButton>

            {isMobile && (
              <IconButton
                size="small"
                sx={{ color: "#666" }}
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
        <MenuItem onClick={handleMenuClose}>Register</MenuItem>
      </Menu>

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{ mt: 1 }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{ textDecoration: "none" }}
            onClick={handleMobileMenuClose}
          >
            <MenuItem sx={{ width: "100%" }}>{link.label}</MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default Navbar;
