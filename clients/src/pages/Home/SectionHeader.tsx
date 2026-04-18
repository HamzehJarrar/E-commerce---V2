import { Box, Typography } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  accentColor = "#1a1a2e",
  icon,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        mb: 5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 36,
            bgcolor: accentColor,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1a1a2e",
            fontSize: { xs: 24, md: 32 },
          }}
        >
          {title}
        </Typography>
        {icon}
      </Box>
      {subtitle && (
        <Typography
          sx={{
            color: "#6b7280",
            ml: 3,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}