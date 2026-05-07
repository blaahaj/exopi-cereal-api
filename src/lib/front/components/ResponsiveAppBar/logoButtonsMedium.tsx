import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import Logo from "./logo";
import type { Pages } from "./types";

export default function LogoButtonsMedium({
  anchorElNav,
  handleCloseNavMenu,
  handleOpenNavMenu,
  pages,
}: {
  anchorElNav: HTMLElement | null;
  handleCloseNavMenu: (..._ignored: never[]) => void;
  handleOpenNavMenu: (..._ignored: never[]) => void;
  pages: Pages;
}) {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: "2em" }}>
        <Logo />
      </Box>

      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          position: "relative",
          top: "-2px",
        }}
      >
        μs.ly
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleCloseNavMenu();
                page.handler();
              }}
              disabled={page.disabled}
            >
              <Typography sx={{ textAlign: "center" }}>{page.text}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}
