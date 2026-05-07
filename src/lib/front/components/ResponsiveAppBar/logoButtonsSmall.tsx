import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Logo from "./logo";
import type { Pages } from "./types";

export default function LogoButtonsSmall({
  handleCloseNavMenu,
  pages,
}: {
  anchorElNav: HTMLElement | null;
  handleCloseNavMenu: (..._ignored: never[]) => void;
  handleOpenNavMenu: (..._ignored: never[]) => void;
  pages: Pages;
}) {
  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, height: "2em" }}>
        <Logo />
      </Box>

      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        μs.ly
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={() => {
              handleCloseNavMenu();
              page.handler();
            }}
            disabled={page.disabled}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.text}
          </Button>
        ))}
      </Box>
    </>
  );
}
