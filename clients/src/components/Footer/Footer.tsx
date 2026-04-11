import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "rgba(10, 25, 41, 0.95)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                background: "linear-gradient(135deg, #FF3366 0%, #FF9933 100%)",
                fontWeight: 900,
                color: "white",
                letterSpacing: "0.5px",
                borderRadius: 4,
                px: 1.5,
                py: 0.5,
                display: "inline-block",
                mb: 2,
              }}
            >
              MegaMark
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your one-stop shop for the best products at amazing prices.
              We deliver quality products directly to your doorstep.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <FacebookIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                All Products
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Featured
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                New Arrivals
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Best Sellers
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                Help Center
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Contact Us
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Shipping Info
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Returns
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationIcon sx={{ color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  123 Store Street, City, Country
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  support@megamark.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon sx={{ color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  +1 234 567 890
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            mt: 4,
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 MegaMark. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FavoriteIcon sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">
              Made with love
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}