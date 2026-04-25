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
  accentColor = "var(--brand)",
  icon,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        mb: 4,
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
            width: 42,
            height: 8,
            background: `linear-gradient(90deg, ${accentColor} 0%, #16a085 100%)`,
            borderRadius: 99,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "var(--text-main)",
            fontSize: { xs: 24, md: 30 },
            fontFamily: "Sora, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>
        {icon}
      </Box>
      {subtitle && (
        <Typography
          sx={{
            color: "var(--text-muted)",
            ml: 7,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
