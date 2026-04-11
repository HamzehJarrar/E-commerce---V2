import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Badge,
  CircularProgress,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as CartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import type { Product } from "../../types";
import { useDebounce, useOnClickOutside } from "../../hooks";
import { productApi } from "../../api/productApi";
import { useCart, useWishlist, useAuth } from "../../context";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { getItemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const debouncedQuery = useDebounce(query, 300);

  useOnClickOutside(searchRef, () => setShowResults(false));

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await productApi.search(debouncedQuery);
        setResults(response.data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [debouncedQuery]);

  const cartCount = getItemCount();
  const wishlistCount = wishlist?.products.length || 0;

  const handleResultClick = (productId: string) => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    navigate(`/product/${productId}`);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/");
  };

  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : "User";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(10, 25, 41, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1, px: 1, gap: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              edge="start"
              sx={{ color: "white", display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  background: "linear-gradient(135deg, #FF3366 0%, #FF9933 100%)",
                  boxShadow: "0 4px 14px 0 rgba(255, 51, 102, 0.39)",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "0.5px",
                  borderRadius: 4,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                MegaMark
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: "relative" }} ref={searchRef}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#fff",
                borderRadius: "999px",
                px: 1.25,
                py: 0.3,
                width: { xs: "160px", sm: "220px", md: "300px" },
                border: "1px solid rgba(255, 255, 255, 0.18)",
                transition: "all 0.2s ease",
                "&:focus-within": {
                  borderColor: "rgba(255, 255, 255, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  boxShadow: "0 0 0 3px rgba(255, 51, 102, 0.39)",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: 18, opacity: 0.85, mr: 1 }} />
              <InputBase
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                inputProps={{ "aria-label": "search" }}
                sx={{
                  width: "100%",
                  color: "inherit",
                  fontSize: 14,
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.78)",
                    opacity: 1,
                  },
                }}
              />
              {loading && (
                <CircularProgress size={16} sx={{ color: "white", ml: 1 }} />
              )}
            </Box>

            {showResults && results.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  mt: 1,
                  backgroundColor: "rgba(10, 25, 41, 0.95)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  borderRadius: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  maxHeight: "350px",
                  overflowY: "auto",
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "column",
                  py: 1,
                }}
              >
                {results.map((product) => (
                  <Box
                    key={product._id}
                    onClick={() => handleResultClick(product._id)}
                    sx={{
                      px: 1.5,
                      py: 1.25,
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                      transition: "background-color 0.2s, transform 0.2s ease",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                      mx: 0.5,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.mainImage?.url}
                      alt={product.name}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    />

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, lineHeight: 1.2 }}
                        noWrap
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255, 255, 255, 0.72)",
                          display: "block",
                          mt: 0.25,
                        }}
                      >
                        Tap to view details
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "#FFB84D",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${product.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1.5 },
            }}
          >
            <IconButton
              component={RouterLink}
              to="/wishlist"
              sx={{
                color: "white",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              component={RouterLink}
              to="/cart"
              sx={{
                color: "white",
                background: "rgba(255, 51, 102, 0.1)",
                border: "1px solid rgba(255, 51, 102, 0.3)",
                borderRadius: "12px",
                px: { xs: 1.5, sm: 2.5 },
                py: 1,
                marginLeft: { xs: 0, sm: 1 },
                "&:hover": { background: "rgba(255, 51, 102, 0.2)" },
                display: "flex",
                gap: 1.5,
                transition: "all 0.2s ease",
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <CartIcon />
              </Badge>

              <Typography
                variant="body2"
                sx={{
                  display: { xs: "none", md: "block" },
                  fontWeight: "bold",
                }}
              >
                Cart
              </Typography>
            </IconButton>

            {isAuthenticated ? (
              <Box sx={{ ml: 1 }}>
                <IconButton
                  onClick={handleUserMenuClick}
                  sx={{
                    color: "white",
                    "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: "#FF3366",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleUserMenuClose}
                  onClick={handleUserMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1,
                        bgcolor: "rgba(10, 25, 41, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                        minWidth: 180,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    sx={{
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
                    }}
                  >
                    <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
                    My Profile
                  </MenuItem>
                  {user?.role === "admin" && (
                    <MenuItem
                      onClick={() => navigate("/admin")}
                      sx={{
                        color: "white",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      color: "#f44336",
                      "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" },
                    }}
                  >
                    <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                    Sign Out
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: "#FF3366",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#E62E5C" },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            pb: 2,
            pt: 0.5,
            position: "relative",
          }}
        ></Box>
      </Container>
    </AppBar>
  );
}