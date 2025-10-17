// src/components/Layout/Layout.jsx - Main application layout with navigation
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Collapse,
  Divider,
  useTheme,
  useMediaQuery,
  Container,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Waves,
  Water,
  AccountBalance,
  Science,
  Games,
  Quiz,
  EmojiEvents,
  School,
  Map,
  LiveTv,
  CloudDownload,
  PhotoLibrary,
  Person,
  AdminPanelSettings,
  Logout,
  Settings,
  Notifications,
  ExpandLess,
  ExpandMore,
  Language,
  DarkMode,
  LightMode,
  Search,
  Groups,
  TrendingUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { signOutUser } from '../../services/authService';
import toast from 'react-hot-toast';

const drawerWidth = 280;

const Layout = ({ user, userProfile }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Load user preferences
    if (userProfile?.preferences) {
      setDarkMode(userProfile.preferences.theme === 'dark');
      i18n.changeLanguage(userProfile.preferences.language || 'en');
    }
  }, [userProfile, i18n]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuExpand = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    if (user) {
      // Update user preference in database
    }
  };

  const menuItems = [
    {
      title: 'Home',
      icon: <Home />,
      path: '/',
      public: true
    },
    {
      title: 'Dashboard',
      icon: <TrendingUp />,
      path: '/dashboard',
      requireAuth: true
    },
    {
      title: 'Content Pillars',
      icon: <Science />,
      requireAuth: true,
      children: [
        { title: 'Marine Life', icon: <Waves />, path: '/marine-life' },
        { title: 'Freshwater', icon: <Water />, path: '/freshwater' },
        { title: 'Water Heritage', icon: <AccountBalance />, path: '/heritage' },
        { title: 'NARA Science', icon: <Science />, path: '/nara' }
      ]
    },
    {
      title: 'Interactive',
      icon: <Games />,
      requireAuth: true,
      children: [
        { title: 'Games Hub', icon: <Games />, path: '/games' },
        { title: 'Quiz Center', icon: <Quiz />, path: '/quiz' },
        { title: 'Challenges', icon: <EmojiEvents />, path: '/challenges' },
        { title: 'Citizen Science', icon: <Groups />, path: '/citizen-science' }
      ]
    },
    {
      title: 'Live Data',
      icon: <LiveTv />,
      requireAuth: true,
      children: [
        { title: 'Ocean Data', icon: <Waves />, path: '/live-data' },
        { title: 'Live Cameras', icon: <LiveTv />, path: '/live-data/cameras' }
      ]
    },
    {
      title: 'Field Visits',
      icon: <Map />,
      path: '/field-visits',
      requireAuth: true
    },
    {
      title: 'Resources',
      icon: <School />,
      requireAuth: true,
      children: [
        { title: 'Downloads', icon: <CloudDownload />, path: '/resources/downloads' },
        { title: 'Gallery', icon: <PhotoLibrary />, path: '/resources/gallery' },
        { title: 'Showcase', icon: <EmojiEvents />, path: '/resources/showcase' }
      ]
    },
    {
      title: 'Leaderboard',
      icon: <EmojiEvents />,
      path: '/leaderboard',
      requireAuth: true
    }
  ];

  // Add teacher menu if user is teacher
  if (userProfile?.role === 'teacher') {
    menuItems.push({
      title: 'Teacher Portal',
      icon: <School />,
      requireAuth: true,
      children: [
        { title: 'Dashboard', icon: <TrendingUp />, path: '/teacher' },
        { title: 'Class Management', icon: <Groups />, path: '/teacher/class' },
        { title: 'Lesson Plans', icon: <School />, path: '/teacher/lessons' },
        { title: 'Student Progress', icon: <TrendingUp />, path: '/teacher/progress' }
      ]
    });
  }

  // Add admin menu if user is admin
  if (userProfile?.role === 'admin') {
    menuItems.push({
      title: 'Admin',
      icon: <AdminPanelSettings />,
      requireAuth: true,
      children: [
        { title: 'Dashboard', icon: <TrendingUp />, path: '/admin' },
        { title: 'Content', icon: <Science />, path: '/admin/content' },
        { title: 'Users', icon: <Groups />, path: '/admin/users' },
        { title: 'Analytics', icon: <TrendingUp />, path: '/admin/analytics' }
      ]
    });
  }

  const drawer = (
    <Box>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img 
            src="/logo.png" 
            alt="NARA AquaSchool" 
            style={{ height: 40 }}
          />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
            AquaSchool
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => {
          // Skip items that require auth if not logged in
          if (item.requireAuth && !user) return null;
          
          const isActive = location.pathname === item.path;
          const isExpanded = expandedMenus[item.title];
          
          return (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleMenuExpand(item.title);
                    } else if (item.path) {
                      navigate(item.path);
                      if (isMobile) setMobileOpen(false);
                    }
                  }}
                  selected={isActive}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.light + '20',
                      borderLeft: `4px solid ${theme.palette.primary.main}`
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400
                    }}
                  />
                  {item.children && (
                    isExpanded ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              
              {item.children && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <ListItemButton
                          key={child.title}
                          sx={{ 
                            pl: 4,
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover
                            }
                          }}
                          selected={isChildActive}
                          onClick={() => {
                            navigate(child.path);
                            if (isMobile) setMobileOpen(false);
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: '0.9rem',
                              fontWeight: isChildActive ? 600 : 400
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
      
      {user && userProfile && (
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={userProfile.avatar}
              sx={{ width: 32, height: 32 }}
            >
              {userProfile.displayName?.[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {userProfile.displayName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={`Level ${userProfile.level || 1}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {userProfile.points || 0} pts
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" noWrap component="div">
              {location.pathname === '/' ? 'Welcome to NARA AquaSchool' : ''}
            </Typography>
          </Box>
          
          {/* Language Selector */}
          <Tooltip title="Change Language">
            <IconButton onClick={(e) => setNotificationAnchor(e.currentTarget)}>
              <Language />
            </IconButton>
          </Tooltip>
          
          {/* Theme Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
          
          {/* Search */}
          <Tooltip title="Search">
            <IconButton onClick={() => setSearchOpen(true)}>
              <Search />
            </IconButton>
          </Tooltip>
          
          {/* Notifications */}
          {user && (
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          
          {/* User Menu */}
          {user ? (
            <>
              <IconButton
                onClick={(e) => setProfileAnchor(e.currentTarget)}
                sx={{ ml: 2 }}
              >
                <Avatar 
                  src={userProfile?.avatar}
                  sx={{ width: 32, height: 32 }}
                >
                  {userProfile?.displayName?.[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
              >
                <MenuItem onClick={() => { navigate('/profile'); setProfileAnchor(null); }}>
                  <ListItemIcon><Person /></ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile/achievements'); setProfileAnchor(null); }}>
                  <ListItemIcon><EmojiEvents /></ListItemIcon>
                  Achievements
                </MenuItem>
                <MenuItem onClick={() => { navigate('/settings'); setProfileAnchor(null); }}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon><Logout /></ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="primary" 
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ py: 3, px: { xs: 2, md: 3 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
