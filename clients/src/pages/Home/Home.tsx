import { Box, Container } from "@mui/material";
import Products from "../products/products";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
      <Container maxWidth="lg" sx={{ py: 8, flex: 1 }}>
        <Products />
      </Container>
    </Box>
  );
}