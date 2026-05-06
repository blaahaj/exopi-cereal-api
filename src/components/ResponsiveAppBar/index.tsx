import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { type Dispatch, useState } from "react";

import ApiKeyBox from "./apiKeyBox";
import LogoButtonsMedium from "./logoButtonsMedium";
import LogoButtonsSmall from "./logoButtonsSmall";
import ProfileAndSettings from "./ProfileAndSettings";
import type { Pages } from "./types";

function ResponsiveAppBar({
  hasApiKey,
  onNewProduct,
  onUploadCSV,
}: {
  hasApiKey: boolean;
  onNewProduct: Dispatch<void>;
  onUploadCSV: Dispatch<void>;
}) {
  const pages: Pages = [
    { text: "New product", handler: onNewProduct, disabled: !hasApiKey },
    { text: "Upload CSV", handler: onUploadCSV, disabled: !hasApiKey },
    { text: "Support", handler: () => null },
  ];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For medium displays: the buttons sit directly on the toolbar */}
          <LogoButtonsMedium
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            pages={pages}
          />

          {/* For small displays: the buttons sit behind a burger menu */}
          <LogoButtonsSmall
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            pages={pages}
          />

          <Box sx={{ marginInline: "2em" }}>
            <ApiKeyBox />
          </Box>

          {/* Profile icon with settings menu */}
          <ProfileAndSettings
            anchorElUser={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
