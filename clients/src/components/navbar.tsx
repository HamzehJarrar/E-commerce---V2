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
  Button,
  Drawer,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Favorite,
  FavoriteBorder,
  Close,
  DeleteOutlined,
  ArrowDropDown,
  CategoryOutlined,
  ChevronRight,
  Checkroom,
  Devices,
  FaceRetouchingNatural,
  Home,
  Kitchen,
  LocalOffer,
  Pets,
  SportsEsports,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProducts, type Product } from "../api/product";
import { getCategories, type Category } from "../api/category";
import {
  getWishlistIds,
  isProductWishlisted,
  toggleWishlistProduct,
} from "../utils/wishlist";
import { clearAuthSession, getAuthUser, type AuthUser } from "../utils/auth";
import {
  clearCart,
  getMyCart,
  removeFromCart,
  type CartItem,
  updateCartQuantity,
} from "../api/cart";
import { formatPrice } from "../utils/formatPrice";
import { notify } from "../utils/notify";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
];

const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes("fashion") || name.includes("cloth")) {
    return <Checkroom sx={{ fontSize: 18 }} />;
  }
  if (name.includes("elect") || name.includes("phone") || name.includes("laptop")) {
    return <Devices sx={{ fontSize: 18 }} />;
  }
  if (name.includes("beauty") || name.includes("skin")) {
    return <FaceRetouchingNatural sx={{ fontSize: 18 }} />;
  }
  if (name.includes("home") || name.includes("furniture")) {
    return <Home sx={{ fontSize: 18 }} />;
  }
  if (name.includes("kitchen") || name.includes("food")) {
    return <Kitchen sx={{ fontSize: 18 }} />;
  }
  if (name.includes("pet")) {
    return <Pets sx={{ fontSize: 18 }} />;
  }
  if (name.includes("game") || name.includes("toy")) {
    return <SportsEsports sx={{ fontSize: 18 }} />;
  }

  return <LocalOffer sx={{ fontSize: 18 }} />;
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [catalogAnchorEl, setCatalogAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const loadCatalogCategories = async () => {
    setCatalogLoading(true);
    try {
      const response = await getCategories();
      setCategories(response);
    } catch {
      notify("Could not load catalog", "error");
    } finally {
      setCatalogLoading(false);
    }
  };

  const loadWishlistProducts = async () => {
    if (products.length > 0) {
      return;
    }

    setWishlistLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
    } catch {
      notify("Could not load wishlist products", "error");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleMobileMenuOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
    await loadCatalogCategories();
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleCatalogMenuOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setCatalogAnchorEl(event.currentTarget);

    await loadCatalogCategories();
  };

  const handleCatalogMenuClose = () => {
    setCatalogAnchorEl(null);
  };

  const openCategoryPage = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const handleSearchSubmit = () => {
    const query = searchQuery.trim();
    if (!query) {
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
  };

  useEffect(() => {
    const syncWishlistCount = () => {
      setWishlistCount(getWishlistIds().length);
    };

    syncWishlistCount();
    window.addEventListener("wishlist-updated", syncWishlistCount);
    window.addEventListener("storage", syncWishlistCount);

    return () => {
      window.removeEventListener("wishlist-updated", syncWishlistCount);
      window.removeEventListener("storage", syncWishlistCount);
    };
  }, []);

  useEffect(() => {
    const syncAuthUser = () => {
      setAuthUser(getAuthUser());
    };

    syncAuthUser();
    window.addEventListener("auth-updated", syncAuthUser);
    window.addEventListener("storage", syncAuthUser);

    return () => {
      window.removeEventListener("auth-updated", syncAuthUser);
      window.removeEventListener("storage", syncAuthUser);
    };
  }, []);

  const loadCart = async () => {
    if (!getAuthUser()) {
      setCartItems([]);
      return;
    }

    setCartLoading(true);
    try {
      const items = await getMyCart();
      setCartItems(items);
    } catch {
      notify("Could not load cart", "error");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      setCartItems([]);
      return;
    }
    loadCart();
  }, [authUser]);

  useEffect(() => {
    const onCartUpdated = () => {
      if (getAuthUser()) {
        loadCart();
      }
    };

    window.addEventListener("cart-updated", onCartUpdated);
    return () => {
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.qnt || 0), 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qnt, 0),
    [cartItems],
  );

  const openWishlistDrawer = async () => {
    setWishlistOpen(true);

    await loadWishlistProducts();
  };

  const openCartDrawer = async () => {
    if (!getAuthUser()) {
      notify("Please login to add items to cart.", "warning");
      navigate("/login");
      return;
    }

    setCartOpen(true);
    await loadCart();
  };

  const wishlistProducts = useMemo(() => {
    const ids = getWishlistIds();
    const byId = new Map(products.map((product) => [product._id, product]));
    return ids
      .map((id) => byId.get(id))
      .filter((product): product is Product => Boolean(product));
  }, [products, wishlistCount]);

  const categoryOptions = useMemo(() => {
    return categories
      .map((category) => ({ name: category.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  const catalogIsActive =
    location.pathname === "/products" &&
    new URLSearchParams(location.search).has("category");

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(14px)",
        bgcolor: "rgba(246, 244, 239, 0.9)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
            gap: 2,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(140deg, var(--brand) 0%, #16a085 100%)",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontFamily: "Sora, sans-serif",
                }}
              >
                S
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--text-main)",
                  fontFamily: "Sora, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                ShopSpring
              </Typography>
            </Box>
          </Link>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                px: 1,
                py: 0.5,
                borderRadius: 99,
                bgcolor: "var(--bg-surface)",
                border: "1px solid var(--border-soft)",
              }}
            >
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
                        location.pathname === link.path
                          ? "var(--brand)"
                          : "var(--text-muted)",
                      fontWeight: location.pathname === link.path ? 700 : 500,
                      position: "relative",
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 99,
                      fontSize: 15,
                      "&:hover": {
                        color: "var(--brand)",
                        bgcolor: "var(--brand-soft)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 2,
                        left: 8,
                        height: 2,
                        bgcolor: "var(--brand)",
                        transition: "width 0.2s ease",
                        width:
                          location.pathname === link.path
                            ? "calc(100% - 16px)"
                            : "0%",
                      },
                      "&:hover::after": {
                        width: "calc(100% - 16px)",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
              <Button
                onClick={handleCatalogMenuOpen}
                endIcon={<ArrowDropDown />}
                sx={{
                  color: catalogIsActive ? "var(--brand)" : "var(--text-muted)",
                  fontWeight: catalogIsActive ? 700 : 500,
                  textTransform: "none",
                  borderRadius: 99,
                  px: 1.25,
                  minWidth: "auto",
                  "&:hover": {
                    color: "var(--brand)",
                    bgcolor: "var(--brand-soft)",
                  },
                }}
              >
                Catalog
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  bgcolor: "var(--bg-surface)",
                  borderRadius: 99,
                  px: 1.8,
                  py: 0.65,
                  border: "1px solid var(--border-soft)",
                  minWidth: 220,
                }}
              >
                <Search sx={{ color: "var(--text-muted)", mr: 1, fontSize: 20 }} />
                <InputBase
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                  sx={{
                    fontSize: 14,
                    width: "100%",
                    "& input": { padding: 0 },
                  }}
                />
              </Box>
            )}

            <IconButton
              size="small"
              onClick={openWishlistDrawer}
              sx={{
                color: wishlistCount > 0 ? "#dc2626" : "var(--text-muted)",
                bgcolor: "var(--bg-surface)",
                border: "1px solid var(--border-soft)",
                "&:hover": {
                  bgcolor: "#ffecee",
                  color: "#dc2626",
                },
              }}
            >
              <Badge badgeContent={wishlistCount} color="error">
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton
              size="small"
              onClick={openCartDrawer}
              sx={{
                color: cartCount > 0 ? "var(--brand)" : "var(--text-muted)",
                bgcolor: "var(--bg-surface)",
                border: "1px solid var(--border-soft)",
                "&:hover": { bgcolor: "var(--brand-soft)", color: "var(--brand)" },
              }}
            >
              <Badge badgeContent={cartCount} color="success">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              size="small"
              sx={{
                color: "var(--text-muted)",
                bgcolor: "var(--bg-surface)",
                border: "1px solid var(--border-soft)",
                "&:hover": { bgcolor: "var(--brand-soft)", color: "var(--brand)" },
              }}
              onClick={handleMenuOpen}
            >
              <Person />
            </IconButton>

            {isMobile && (
              <IconButton
                size="small"
                sx={{
                  color: "var(--text-muted)",
                  bgcolor: "var(--bg-surface)",
                  border: "1px solid var(--border-soft)",
                }}
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>

      <Menu
        anchorEl={catalogAnchorEl}
        open={Boolean(catalogAnchorEl)}
        onClose={handleCatalogMenuClose}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 4,
            border: "1px solid #cfe3df",
            minWidth: 290,
            overflow: "hidden",
            boxShadow: "0 18px 34px rgba(21, 45, 50, 0.14)",
            background:
              "linear-gradient(160deg, #f8fcfb 0%, #f4f7f7 50%, #fdf8f2 100%)",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 1.7,
            pb: 1.2,
            borderBottom: "1px solid #d9e5e3",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 2,
              bgcolor: "var(--brand-soft)",
              color: "var(--brand)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CategoryOutlined sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "var(--text-main)", fontSize: 14 }}>
              Browse Catalog
            </Typography>
            <Typography sx={{ color: "var(--text-muted)", fontSize: 12 }}>
              Pick a category to filter products
            </Typography>
          </Box>
        </Box>

        {catalogLoading ? (
          <Box sx={{ py: 2.5, px: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={22} sx={{ color: "var(--brand)" }} />
          </Box>
        ) : categoryOptions.length === 0 ? (
          <Box sx={{ px: 2, py: 2 }}>
            <Typography sx={{ color: "var(--text-muted)", fontSize: 13 }}>
              No categories yet
            </Typography>
          </Box>
        ) : (
          categoryOptions.map((category, index) => (
            <MenuItem
              key={category.name}
              onClick={() => {
                handleCatalogMenuClose();
                openCategoryPage(category.name);
              }}
              sx={{
                mx: 1,
                mt: index === 0 ? 1 : 0.5,
                mb: 0.5,
                borderRadius: 2,
                px: 1.2,
                py: 0.9,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  bgcolor: "var(--brand-soft)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1.5,
                    bgcolor: "#e8f4f2",
                    color: "#0f766e",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {getCategoryIcon(category.name)}
                </Box>
                <Typography sx={{ color: "var(--text-main)", fontWeight: 600, fontSize: 14 }}>
                  {category.name}
                </Typography>
              </Box>
              <ChevronRight sx={{ color: "var(--text-muted)", fontSize: 20 }} />
            </MenuItem>
          ))
        )}
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 3,
            border: "1px solid var(--border-soft)",
            minWidth: 180,
          },
        }}
      >
        {authUser ? (
          <Box sx={{ py: 0.5 }}>
            <MenuItem disabled sx={{ opacity: "1 !important" }}>
              <Box>
                <Typography sx={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Signed in as
                </Typography>
                <Typography sx={{ fontWeight: 700, color: "var(--text-main)" }}>
                  {authUser.userName}
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
            {authUser.role === "admin" && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/admin/products");
                }}
              >
                Admin Dashboard
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                clearAuthSession();
                handleMenuClose();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Box>
        ) : (
          <Box sx={{ py: 0.5 }}>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/login");
              }}
            >
              Sign In
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/register");
              }}
            >
              Register
            </MenuItem>
          </Box>
        )}
      </Menu>

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 3,
            border: "1px solid var(--border-soft)",
          },
        }}
      >
        <Box sx={{ px: 1.5, py: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Search />}
            sx={{
              borderRadius: 99,
              borderColor: "var(--border-soft)",
              color: "var(--text-muted)",
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          >
            Search products
          </Button>
        </Box>
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
        {catalogLoading ? (
          <MenuItem disabled>Loading catalog...</MenuItem>
        ) : categoryOptions.length > 0 ? (
          categoryOptions.map((category) => (
            <MenuItem
              key={`mobile-${category.name}`}
              onClick={() => {
                handleMobileMenuClose();
                openCategoryPage(category.name);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 1.2,
                    bgcolor: "#e8f4f2",
                    color: "#0f766e",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {getCategoryIcon(category.name)}
                </Box>
                <Typography sx={{ fontSize: 14 }}>Catalog: {category.name}</Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Catalog: No categories</MenuItem>
        )}
        <Link
          to="#"
          style={{ textDecoration: "none" }}
          onClick={(event) => {
            event.preventDefault();
            handleMobileMenuClose();
            openWishlistDrawer();
          }}
        >
          <MenuItem sx={{ width: "100%" }}>Wishlist ({wishlistCount})</MenuItem>
        </Link>
        <Link
          to="#"
          style={{ textDecoration: "none" }}
          onClick={(event) => {
            event.preventDefault();
            handleMobileMenuClose();
            openCartDrawer();
          }}
        >
          <MenuItem sx={{ width: "100%" }}>Cart ({cartCount})</MenuItem>
        </Link>
        {!authUser ? (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={handleMobileMenuClose}
            >
              <MenuItem sx={{ width: "100%" }}>Sign In</MenuItem>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none" }}
              onClick={handleMobileMenuClose}
            >
              <MenuItem sx={{ width: "100%" }}>Register</MenuItem>
            </Link>
          </>
        ) : (
          <MenuItem
            sx={{ width: "100%" }}
            onClick={() => {
              clearAuthSession();
              handleMobileMenuClose();
              navigate("/");
            }}
          >
            Logout ({authUser.userName})
          </MenuItem>
        )}
        {authUser?.role === "admin" && (
          <MenuItem
            sx={{ width: "100%" }}
            onClick={() => {
              handleMobileMenuClose();
              navigate("/admin/products");
            }}
          >
            Admin Dashboard
          </MenuItem>
        )}
      </Menu>

      <Drawer
        anchor="right"
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 420 },
              bgcolor: "#fbfbf9",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 20, color: "var(--text-main)", fontFamily: "Sora, sans-serif" }}>
              Wishlist
            </Typography>
            <Typography sx={{ color: "var(--text-muted)", fontSize: 13 }}>
              {wishlistCount} saved {wishlistCount === 1 ? "item" : "items"}
            </Typography>
          </Box>
          <IconButton onClick={() => setWishlistOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>
          {wishlistLoading ? (
            <Box sx={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "var(--brand)" }} />
            </Box>
          ) : wishlistProducts.length === 0 ? (
            <Box sx={{ minHeight: 220, display: "flex", flexDirection: "column", gap: 1, alignItems: "center", justifyContent: "center", textAlign: "center", px: 2 }}>
              <FavoriteBorder sx={{ fontSize: 34, color: "var(--text-muted)" }} />
              <Typography sx={{ color: "var(--text-main)", fontWeight: 700 }}>No items in wishlist</Typography>
              <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>Tap hearts on products to save them here.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {wishlistProducts.map((product) => {
                const hasDiscount = product.discount > 0;
                const finalPrice = hasDiscount ? product.finalPrice : product.price;

                return (
                  <Box key={product._id} sx={{ display: "flex", gap: 1.5, p: 1.2, borderRadius: 3, bgcolor: "var(--bg-surface)", border: "1px solid var(--border-soft)" }}>
                    <Box component={Link} to={`/product/${product._id}`} onClick={() => setWishlistOpen(false)} sx={{ width: 74, height: 74, borderRadius: 2, overflow: "hidden", display: "block", bgcolor: "#f3f7f6" }}>
                      <Box component="img" src={product.mainImage?.url || "https://via.placeholder.com/300x300"} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography component={Link} to={`/product/${product._id}`} onClick={() => setWishlistOpen(false)} sx={{ textDecoration: "none", color: "var(--text-main)", fontWeight: 600, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.name}
                      </Typography>
                      <Typography sx={{ mt: 0.5, color: hasDiscount ? "var(--accent)" : "var(--text-main)", fontWeight: 700 }}>
                        {formatPrice(finalPrice)}
                      </Typography>
                    </Box>

                    <IconButton onClick={() => toggleWishlistProduct(product._id)} sx={{ color: "#dc2626", alignSelf: "flex-start" }}>
                      <Favorite />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {!wishlistLoading && wishlistProducts.length > 0 && (
          <Box sx={{ p: 2, borderTop: "1px solid var(--border-soft)" }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                wishlistProducts.forEach((product) => {
                  if (isProductWishlisted(product._id)) {
                    toggleWishlistProduct(product._id);
                  }
                });
              }}
              sx={{
                borderColor: "#f5c7c7",
                color: "#b91c1c",
                textTransform: "none",
                borderRadius: 2.5,
                "&:hover": { borderColor: "#ef9a9a", bgcolor: "#ffecec" },
              }}
            >
              Clear Wishlist
            </Button>
          </Box>
        )}
      </Drawer>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 430 },
              bgcolor: "#f7f8f6",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 20, color: "var(--text-main)", fontFamily: "Sora, sans-serif" }}>
              Shopping Cart
            </Typography>
            <Typography sx={{ color: "var(--text-muted)", fontSize: 13 }}>
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
            </Typography>
          </Box>
          <IconButton onClick={() => setCartOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>
          {cartLoading ? (
            <Box sx={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "var(--brand)" }} />
            </Box>
          ) : cartItems.length === 0 ? (
            <Box sx={{ minHeight: 220, display: "flex", flexDirection: "column", gap: 1, alignItems: "center", justifyContent: "center", textAlign: "center", px: 2 }}>
              <ShoppingCart sx={{ fontSize: 34, color: "var(--text-muted)" }} />
              <Typography sx={{ color: "var(--text-main)", fontWeight: 700 }}>Your cart is empty</Typography>
              <Typography sx={{ color: "var(--text-muted)", fontSize: 14 }}>Add products and review them here before checkout.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {cartItems.map((item) => {
                const info =
                  typeof item.productId === "object" && item.productId
                    ? item.productId
                    : null;
                const productId =
                  typeof item.productId === "string"
                    ? item.productId
                    : item.productId?._id;

                return (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      p: 1.2,
                      borderRadius: 3,
                      bgcolor: "var(--bg-surface)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    <Box
                      component={Link}
                      to={productId ? `/product/${productId}` : "#"}
                      onClick={() => setCartOpen(false)}
                      sx={{
                        width: 76,
                        height: 76,
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "block",
                        bgcolor: "#f3f7f6",
                      }}
                    >
                      <Box
                        component="img"
                        src={info?.mainImage?.url || "https://via.placeholder.com/300x300"}
                        alt={info?.name || "Product"}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        component={Link}
                        to={productId ? `/product/${productId}` : "#"}
                        onClick={() => setCartOpen(false)}
                        sx={{
                          textDecoration: "none",
                          color: "var(--text-main)",
                          fontWeight: 600,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {info?.name || "Product"}
                      </Typography>
                      <Typography sx={{ mt: 0.5, color: "var(--text-main)", fontWeight: 700 }}>
                        {formatPrice(item.price)}
                      </Typography>

                      <Box sx={{ mt: 1.1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid var(--border-soft)", borderRadius: 2, bgcolor: "#fbfdfc" }}>
                          <Button
                            onClick={async () => {
                              try {
                                if (item.qnt <= 1) {
                                  await removeFromCart(item._id);
                                } else {
                                  await updateCartQuantity(item._id, item.qnt - 1);
                                }
                              } catch {
                                notify("Could not update cart", "error");
                              }
                            }}
                            sx={{ minWidth: 34, color: "var(--text-main)" }}
                          >
                            -
                          </Button>
                          <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>
                            {item.qnt}
                          </Typography>
                          <Button
                            onClick={async () => {
                              try {
                                await updateCartQuantity(item._id, item.qnt + 1);
                              } catch {
                                notify("Could not update cart", "error");
                              }
                            }}
                            sx={{ minWidth: 34, color: "var(--text-main)" }}
                          >
                            +
                          </Button>
                        </Box>

                        <IconButton
                          onClick={async () => {
                            try {
                              await removeFromCart(item._id);
                            } catch {
                              notify("Could not remove item", "error");
                            }
                          }}
                          sx={{ color: "#b91c1c" }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {!cartLoading && cartItems.length > 0 && (
          <Box sx={{ p: 2, borderTop: "1px solid var(--border-soft)", bgcolor: "var(--bg-surface)" }}>
            <Typography sx={{ color: "#0f5132", fontSize: 13, mb: 1.3 }}>
              Eligible for FREE shipping on select items.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.3 }}>
              <Typography sx={{ color: "var(--text-muted)", fontWeight: 600 }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: 800, color: "var(--text-main)", fontFamily: "Sora, sans-serif" }}>
                {formatPrice(cartSubtotal)}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#f59e0b",
                color: "#101010",
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 3,
                py: 1.2,
                "&:hover": { bgcolor: "#d97706" },
              }}
              onClick={() => notify("Checkout flow can be connected next.", "info")}
            >
              Proceed to Checkout
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={async () => {
                try {
                  await clearCart();
                } catch {
                  notify("Could not clear cart", "error");
                }
              }}
              sx={{ mt: 0.6, textTransform: "none", color: "#b91c1c" }}
            >
              Clear Cart
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Navbar;
