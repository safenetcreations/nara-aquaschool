import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Notifications,
  Language,
  Palette,
  Security,
  AccountCircle,
  Email,
  Lock,
  Delete,
  Edit,
  PhotoCamera
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

/**
 * Settings Component
 * User preferences and account settings
 */
const Settings = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    // Profile
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    bio: 'Marine biology enthusiast',
    
    // Preferences
    language: 'en',
    theme: 'light',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    achievementAlerts: true,
    challengeReminders: true,
    
    // Privacy
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true
  });

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile changes
    toast.success(t('messages.success.profileUpdated'));
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error(t('messages.error.passwordMismatch'));
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error(t('messages.error.passwordLength'));
      return;
    }
    // Change password logic
    toast.success(t('messages.success.passwordChanged'));
    setPasswordDialog(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    toast.success(t('messages.success.accountDeletionRequested'));
    setDeleteDialog(false);
  };

  const handleLanguageChange = (lang) => {
    handleSettingChange('language', lang);
    i18n.changeLanguage(lang);
    toast.success(t('messages.success.languageUpdated'));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          {t('settings.header.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('settings.header.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <AccountCircle color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {t('settings.profile.title')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={settings.avatar}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  >
                    {settings.displayName[0]}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    size="small"
                  >
                    <PhotoCamera fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <TextField
                fullWidth
                label={t('settings.profile.displayName')}
                value={settings.displayName}
                onChange={(e) => handleSettingChange('displayName', e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label={t('settings.profile.email')}
                type="email"
                value={settings.email}
                disabled
                sx={{ mb: 2 }}
                helperText={t('settings.profile.emailHelper')}
              />

              <TextField
                fullWidth
                label={t('settings.profile.bio')}
                multiline
                rows={3}
                value={settings.bio}
                onChange={(e) => handleSettingChange('bio', e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleSaveProfile}
              >
                {t('settings.profile.saveButton')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Security color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {t('settings.security.title')}
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary={t('settings.security.password.title')}
                    secondary={t('settings.security.password.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      startIcon={<Lock />}
                      onClick={() => setPasswordDialog(true)}
                    >
                      {t('settings.security.actions.change')}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider />

                <ListItem>
                  <ListItemText
                    primary={t('settings.security.twoFactor.title')}
                    secondary={t('settings.security.twoFactor.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider />

                <ListItem>
                  <ListItemText
                    primary={t('settings.security.delete.title')}
                    secondary={t('settings.security.delete.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => setDeleteDialog(true)}
                    >
                      {t('common.delete')}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Palette color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {t('settings.preferences.title')}
                </Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t('settings.preferences.language.label')}</InputLabel>
                <Select
                  value={settings.language}
                  label={t('settings.preferences.language.label')}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  startAdornment={<Language sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="en">{t('languages.en')}</MenuItem>
                  <MenuItem value="si">{t('languages.si')}</MenuItem>
                  <MenuItem value="ta">{t('languages.ta')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t('settings.preferences.theme.label')}</InputLabel>
                <Select
                  value={settings.theme}
                  label={t('settings.preferences.theme.label')}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                >
                  <MenuItem value="light">{t('settings.preferences.theme.options.light')}</MenuItem>
                  <MenuItem value="dark">{t('settings.preferences.theme.options.dark')}</MenuItem>
                  <MenuItem value="auto">{t('settings.preferences.theme.options.auto')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>{t('settings.preferences.visibility.label')}</InputLabel>
                <Select
                  value={settings.profileVisibility}
                  label={t('settings.preferences.visibility.label')}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                >
                  <MenuItem value="public">{t('settings.preferences.visibility.options.public')}</MenuItem>
                  <MenuItem value="friends">{t('settings.preferences.visibility.options.friends')}</MenuItem>
                  <MenuItem value="private">{t('settings.preferences.visibility.options.private')}</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Notifications color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {t('settings.notifications.title')}
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary={t('settings.notifications.items.email.title')}
                    secondary={t('settings.notifications.items.email.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={t('settings.notifications.items.push.title')}
                    secondary={t('settings.notifications.items.push.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={t('settings.notifications.items.weekly.title')}
                    secondary={t('settings.notifications.items.weekly.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.weeklyDigest}
                      onChange={(e) => handleSettingChange('weeklyDigest', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={t('settings.notifications.items.achievements.title')}
                    secondary={t('settings.notifications.items.achievements.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.achievementAlerts}
                      onChange={(e) => handleSettingChange('achievementAlerts', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={t('settings.notifications.items.challenges.title')}
                    secondary={t('settings.notifications.items.challenges.subtitle')}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.challengeReminders}
                      onChange={(e) => handleSettingChange('challengeReminders', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {t('settings.privacy.title')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                    <Switch
                      checked={settings.showProgress}
                      onChange={(e) => handleSettingChange('showProgress', e.target.checked)}
                    />
                  }
                    label={t('settings.privacy.items.showProgress')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                    <Switch
                      checked={settings.showAchievements}
                      onChange={(e) => handleSettingChange('showAchievements', e.target.checked)}
                    />
                  }
                    label={t('settings.privacy.items.showAchievements')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                    <Switch
                      checked={settings.allowMessages}
                      onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
                    />
                  }
                    label={t('settings.privacy.items.allowMessages')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('settings.security.changePassword.title')}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label={t('settings.security.changePassword.current')}
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label={t('settings.security.changePassword.new')}
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label={t('settings.security.changePassword.confirm')}
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            {t('settings.security.changePassword.submit')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('settings.security.delete.dialogTitle')}</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {t('settings.security.delete.warning')}
          </Alert>
          <Typography variant="body2" color="text.secondary">
            {t('settings.security.delete.description')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>{t('common.cancel')}</Button>
          <Button variant="contained" color="error" onClick={handleDeleteAccount}>
            {t('settings.security.delete.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
