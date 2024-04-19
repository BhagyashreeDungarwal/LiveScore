import React, { useState } from 'react';
import { Container, AppBar, Toolbar, IconButton, Typography, Badge, InputBase, Drawer, List, ListItem, ListItemText, Divider, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Search, Menu as MenuIcon, Notifications, GitHub } from '@mui/icons-material';

const drawerWidth = 300;


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: 'auto',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

const HeaderNew = () => {
 const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
 <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Your App Name
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={1} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <GitHub />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
            <Toolbar/>
         Live Scores
        </Box>
      </Drawer>
      <main style={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          {/* Your main content goes here */}
        </Container>
      </main>
    </Box>
   
)
}

export default HeaderNew
