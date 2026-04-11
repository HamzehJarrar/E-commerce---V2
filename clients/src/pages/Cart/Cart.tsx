import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "../../context";
import { Loading, Empty, Error } from "../../components";
import type { CartItem } from "../../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart() {
  const { cart, loading, error, updateQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");

  if (loading) {
    return <Loading message="Loading cart..." />;
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Empty
          title="Your cart is empty"
          message="Looks like you haven't added any items to your cart yet."
          actionText="Start Shopping"
          actionLink="/"
        />
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, mb: 3, background: "linear-gradient(135deg, #FF3366 0%, #FF9933 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Shopping Cart ({cart.items.length} items)
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {cart.items.map((item: CartItem) => (
                <Box key={item._id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 2,
                    }}
                  >
                    <Box
                      component={RouterLink}
                      to={`/product/${item.product._id}`}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={item.product.mainImage?.url}
                        alt={item.product.name}
                        sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                        component={RouterLink}
                        to={`/product/${item.product._id}`}
                        color="inherit"
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.product.categoryLabel}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "success.main" }}>
                        {currencyFormatter.format(item.price)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        sx={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 1 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 30, textAlign: "center", fontWeight: 700 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        sx={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 1 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <IconButton
                      onClick={() => removeFromCart(item._id)}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Divider />
                </Box>
              ))}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="text" onClick={clearCart} sx={{ color: "text.secondary" }}>
                  Clear Cart
                </Button>
                <Button component={RouterLink} to="/" variant="outlined">
                  Continue Shopping
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  component="input"
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  sx={{
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {currencyFormatter.format(cart.totalAmount)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography sx={{ fontWeight: 600 }}>Free</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {currencyFormatter.format(0)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "success.main" }}>
                  {currencyFormatter.format(cart.totalAmount)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                component={RouterLink}
                to="/checkout"
                sx={{
                  py: 1.5,
                  bgcolor: "#FF3366",
                  fontWeight: 800,
                  boxShadow: "0 8px 24px rgba(255,51,102,0.3)",
                  "&:hover": { bgcolor: "#E62E5C" },
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}