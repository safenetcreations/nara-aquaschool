// src/components/Layout/Layout.jsx - Main application layout with navigation
import React, { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  TrendingUp,
  MenuBook,
  AutoAwesome
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { signOutUser } from '../../services/authService';
import toast from 'react-hot-toast';

const drawerWidth = 280;

const LANGUAGE_OPTIONS = [
  { code: 'en', translationKey: 'languages.en' },
  { code: 'si', translationKey: 'languages.si' },
  { code: 'ta', translationKey: 'languages.ta' }
];

const BASE_MENU_ITEMS = [
  {
    key: 'home',
    translationKey: 'nav.home',
    icon: Home,
    path: '/',
    public: true
  },
  {
    key: 'dashboard',
    translationKey: 'nav.dashboard',
    icon: TrendingUp,
    path: '/dashboard',
    public: true
  },
  {
    key: 'content',
    translationKey: 'nav.contentPillars',
    icon: Science,
    public: true,
    children: [
      { key: 'marine-life', translationKey: 'nav.marineLife', icon: Waves, path: '/marine-life' },
      { key: 'freshwater', translationKey: 'nav.freshwater', icon: Water, path: '/freshwater' },
      { key: 'heritage', translationKey: 'nav.heritage', icon: AccountBalance, path: '/heritage' },
      { key: 'nara', translationKey: 'nav.naraScience', icon: Science, path: '/nara' },
      { key: 'school-directory', translationKey: 'nav.schoolDirectory', icon: School, path: '/school-directory' }
    ]
  },
  {
    key: 'interactive',
    translationKey: 'nav.interactive',
    icon: Games,
    public: true,
    children: [
      { key: 'games', translationKey: 'nav.gamesHub', icon: Games, path: '/games' },
      { key: 'quiz', translationKey: 'nav.quizCenter', icon: Quiz, path: '/quiz' },
      { key: 'challenges', translationKey: 'nav.challenges', icon: EmojiEvents, path: '/challenges' },
      { key: 'citizen-science', translationKey: 'nav.citizenScience', icon: Groups, path: '/citizen-science' }
    ]
  },
  {
    key: 'live-data',
    translationKey: 'nav.liveData',
    icon: LiveTv,
    public: true,
    children: [
      { key: 'ocean-data', translationKey: 'nav.oceanData', icon: Waves, path: '/live-data' },
      { key: 'live-cameras', translationKey: 'nav.liveCameras', icon: LiveTv, path: '/live-data/cameras' }
    ]
  },
  {
    key: 'field-visits',
    translationKey: 'nav.fieldVisits',
    icon: Map,
    path: '/field-visits',
    public: true
  },
  {
    key: 'resources',
    translationKey: 'nav.resources',
    icon: School,
    public: true,
    children: [
      { key: 'downloads', translationKey: 'nav.downloads', icon: CloudDownload, path: '/resources/downloads' },
      { key: 'gallery', translationKey: 'nav.gallery', icon: PhotoLibrary, path: '/resources/gallery' },
      { key: 'showcase', translationKey: 'nav.showcase', icon: EmojiEvents, path: '/resources/showcase' }
    ]
  },
  {
    key: 'leaderboard',
    translationKey: 'nav.leaderboard',
    icon: EmojiEvents,
    path: '/leaderboard',
    public: true
  }
];

const TEACHER_MENU = {
  key: 'teacher',
  translationKey: 'nav.teacherPortal',
  icon: School,
  public: true,
  children: [
    { key: 'teacher-dashboard', translationKey: 'nav.teacherDashboard', icon: TrendingUp, path: '/teacher' },
    { key: 'class-management', translationKey: 'nav.classManagement', icon: Groups, path: '/teacher/class' },
    { key: 'lesson-plans', translationKey: 'nav.lessonPlans', icon: MenuBook, path: '/teacher/lessons' },
    { key: 'student-progress', translationKey: 'nav.studentProgress', icon: TrendingUp, path: '/teacher/progress' }
  ]
};

const ADMIN_MENU = {
  key: 'admin',
  translationKey: 'nav.admin',
  icon: AdminPanelSettings,
  public: true,
  children: [
    { key: 'admin-dashboard', translationKey: 'nav.adminDashboard', icon: TrendingUp, path: '/admin' },
    { key: 'admin-content', translationKey: 'nav.contentManager', icon: Science, path: '/admin/content' },
    { key: 'admin-users', translationKey: 'nav.userManagement', icon: Groups, path: '/admin/users' },
    { key: 'admin-analytics', translationKey: 'nav.analytics', icon: TrendingUp, path: '/admin/analytics' },
    { key: 'admin-schools', translationKey: 'nav.schoolsManager', icon: School, path: '/admin/schools' },
    { key: 'admin-ai-generator', translationKey: 'nav.aiContentGenerator', icon: AutoAwesome, path: '/admin/ai-generator' },
    { key: 'admin-image-generator', translationKey: 'nav.imageGenerator', icon: PhotoLibrary, path: '/admin/image-generator' }
  ]
};

const Layout = ({ user, userProfile }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const currentLanguage = (i18n.language || 'en').split('-')[0];

  const menuItems = useMemo(() => {
    const items = [...BASE_MENU_ITEMS];

    // Always show Teacher and Admin menus (authentication disabled for testing)
    items.push(TEACHER_MENU);
    items.push(ADMIN_MENU);

    return items;
  }, []);

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
      toast.success(t('messages.success.signedOut'));
      navigate('/');
    } catch (error) {
      toast.error(t('messages.error.signOut'));
    }
  };

  const handleLanguageChange = (lang) => {
    if (currentLanguage === lang) {
      setLanguageAnchor(null);
      return;
    }
    i18n.changeLanguage(lang);
    setLanguageAnchor(null);
    if (user) {
      // Update user preference in database
    }
    toast.success(t('messages.success.languageUpdated'));
  };

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
          
          const isActive = item.path
            ? location.pathname === item.path
            : item.children?.some(child => location.pathname.startsWith(child.path));
          const isExpanded = expandedMenus[item.key];
          const IconComponent = item.icon;
          
          return (
            <React.Fragment key={item.key}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleMenuExpand(item.key);
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
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t(item.translationKey)}
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
                      const isChildActive = location.pathname.startsWith(child.path);
                      const ChildIcon = child.icon;
                      return (
                        <ListItemButton
                          key={child.key}
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
                            <ChildIcon />
                          </ListItemIcon>
                          <ListItemText 
                            primary={t(child.translationKey)}
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
                  label={t('layout.levelLabel', { level: userProfile.level || 1 })}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {t('layout.pointsLabel', { points: userProfile.points || 0 })}
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
              {location.pathname === '/' ? t('layout.welcomeMessage') : ''}
            </Typography>
          </Box>
          
          {/* Language Selector */}
          <Tooltip title={t('common.changeLanguage')}>
            <Button
              onClick={(e) => setLanguageAnchor(e.currentTarget)}
              startIcon={<Language />}
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'uppercase',
                minWidth: '80px',
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              {currentLanguage}
            </Button>
          </Tooltip>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={() => setLanguageAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {LANGUAGE_OPTIONS.map(({ code, translationKey }) => (
              <MenuItem
                key={code}
                selected={currentLanguage === code}
                onClick={() => handleLanguageChange(code)}
                sx={{
                  fontWeight: currentLanguage === code ? 600 : 400,
                  backgroundColor: currentLanguage === code ? 'action.selected' : 'transparent'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                    {code}
                  </Typography>
                  <Typography>-</Typography>
                  <Typography>{t(translationKey)}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Theme Toggle */}
          <Tooltip title={t('common.toggleTheme')}>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
          
          {/* Search */}
          <Tooltip title={t('common.search')}>
            <IconButton onClick={() => setSearchOpen(true)}>
              <Search />
            </IconButton>
          </Tooltip>
          
          {/* Notifications */}
          {user && (
            <Tooltip title={t('common.notifications')}>
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
                {t('nav.profile')}
              </MenuItem>
              <MenuItem onClick={() => { navigate('/profile/achievements'); setProfileAnchor(null); }}>
                <ListItemIcon><EmojiEvents /></ListItemIcon>
                {t('common.achievements')}
              </MenuItem>
              <MenuItem onClick={() => { navigate('/settings'); setProfileAnchor(null); }}>
                <ListItemIcon><Settings /></ListItemIcon>
                {t('common.settings')}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon><Logout /></ListItemIcon>
                {t('nav.signOut')}
              </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="primary" 
              onClick={() => navigate('/login')}
            >
              {t('auth.signIn')}
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/register')}
            >
              {t('auth.signUp')}
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
