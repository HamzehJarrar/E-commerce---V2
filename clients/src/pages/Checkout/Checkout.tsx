import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useCart } from "../../context";
import { Empty } from "../../components";
import type { CartItem } from "../../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const steps = ["Cart", "Shipping", "Payment", "Confirm"];

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setActiveStep(3);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePlaceOrder = () => {
    clearCart();
    setActiveStep(4);
  };

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Empty
          title="Your cart is empty"
          message="Add items to your cart to proceed with checkout."
          actionText="Browse Products"
          actionLink="/"
        />
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 3 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Shipping Address
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      component="input"
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={shippingData.fullName}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      component="input"
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={shippingData.street}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      component="input"
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      component="input"
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      component="input"
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={shippingData.zipCode}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      component="input"
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={shippingData.country}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      component="input"
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      required
                      sx={{
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontSize: "1rem",
                        outline: "none",
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button variant="outlined" onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={handlePayment}>
                    Continue to Payment
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

                {cart.items.map((item: CartItem) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.product.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {currencyFormatter.format(item.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

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

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "success.main" }}>
                    {currencyFormatter.format(cart.totalAmount)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Payment Method
                </Typography>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CreditCardIcon /> Credit/Debit Card
                      </Box>
                    }
                    sx={{ mb: 2, p: 2, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, width: "100%" }}
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PaymentsIcon /> PayPal
                      </Box>
                    }
                    sx={{ mb: 2, p: 2, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, width: "100%" }}
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccountBalanceIcon /> Cash on Delivery
                      </Box>
                    }
                    sx={{ mb: 2, p: 2, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, width: "100%" }}
                  />
                </RadioGroup>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button variant="outlined" onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
<Button variant="contained" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeStep === 4 && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for your order. You will receive a confirmation email shortly.
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}