// School Directory Page - Comprehensive view of partner schools
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Chip,
  IconButton,
  Paper,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Divider,
  CircularProgress,
  Badge,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import {
  Search,
  ViewModule,
  ViewList,
  Map as MapIcon,
  School,
  LocationOn,
  People,
  Phone,
  Email,
  Download,
  FilterList,
  Sort,
  Public,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  MyLocation,
  Science,
  Computer,
  LibraryBooks
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAllSchools } from '../../services/schoolService';
import { SL_PROVINCES } from '../../data/sriLankanSchools';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import SchoolMap from '../../components/SchoolMap/SchoolMap';

// NEW: Import Priority 1 utilities
import { 
  getFavorites, 
  toggleFavorite, 
  isFavorite, 
  getFavoriteCount 
} from '../../utils/favoritesManager';
import { 
  getUserLocation, 
  calculateDistance, 
  formatDistance, 
  estimateTravelTime 
} from '../../utils/distanceCalculator';

const SchoolDirectory = () => {
  const { t, i18n } = useTranslation();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [focusSchoolId, setFocusSchoolId] = useState(null);
  
  // NEW: Priority 1 features state
  const [favorites, setFavorites] = useState(getFavorites());
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedCoeducation, setSelectedCoeducation] = useState('all');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [maxDistance, setMaxDistance] = useState('all');
  const [schoolsWithDistance, setSchoolsWithDistance] = useState([]);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      console.log('🏫 School Directory: Starting to load schools...');
      setLoading(true);
      const data = await getAllSchools();
      console.log('🏫 School Directory: Received data:', data?.length || 0, 'schools');
      console.log('🏫 First school sample:', data?.[0]);
      setSchools(data || []);
      if (data && data.length > 0) {
        toast.success(`Loaded ${data.length} schools successfully!`);
      }
    } catch (error) {
      console.error('❌ Error loading schools:', error);
      toast.error(t('schoolDirectory.errors.loadFailed') || 'Failed to load schools');
      // Set empty array on error
      setSchools([]);
    } finally {
      setLoading(false);
      console.log('🏫 School Directory: Loading complete');
    }
  };

  // Get unique districts from filtered schools
  const availableDistricts = useMemo(() => {
    if (selectedProvince === 'all') {
      return [...new Set(schools.map(s => s.district))];
    }
    return [...new Set(schools.filter(s => s.province === selectedProvince).map(s => s.district))];
  }, [schools, selectedProvince]);

  // Filter and sort schools
  const filteredSchools = useMemo(() => {
    let filtered = schools;

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(search) ||
        school.districtName?.en?.toLowerCase().includes(search) ||
        school.type?.toLowerCase().includes(search)
      );
    }

    // Province filter
    if (selectedProvince !== 'all') {
      filtered = filtered.filter(school => school.province === selectedProvince);
    }

    // District filter
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(school => school.district === selectedDistrict);
    }

    // Year filter (if applicable)
    if (selectedYear !== 'all') {
      filtered = filtered.filter(school => school.establishedYear === selectedYear);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'students':
          aVal = a.studentCount || 0;
          bVal = b.studentCount || 0;
          break;
        case 'year':
          aVal = a.establishedYear || 0;
          bVal = b.establishedYear || 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [schools, searchTerm, selectedProvince, selectedDistrict, selectedYear, sortBy, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSchools = schools.length;
    const totalStudents = schools.reduce((sum, s) => sum + (s.studentCount || 0), 0);
    const uniqueDistricts = new Set(schools.map(s => s.district)).size;
    const avgStudents = totalSchools > 0 ? Math.round(totalStudents / totalSchools) : 0;

    return {
      totalSchools,
      totalStudents,
      uniqueDistricts,
      avgStudents
    };
  }, [schools]);

  // Download Excel
  const handleDownloadExcel = () => {
    try {
      const exportData = filteredSchools.map(school => ({
        'School Name': school.name,
        'Type': school.type,
        'Province': school.provinceName?.en || school.province,
        'District': school.districtName?.en || school.district,
        'Grades': school.grades,
        'Medium': school.medium ? school.medium.join(', ') : '',
        'Students': school.studentCount || 0,
        'Teachers': school.teacherCount || 0,
        'Status': school.status || 'active'
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Schools');
      XLSX.writeFile(wb, 'NARA_AquaSchool_Directory.xlsx');
      
      toast.success(t('schoolDirectory.downloadSuccess') || 'Directory downloaded successfully!');
    } catch (error) {
      console.error('Error downloading Excel:', error);
      toast.error(t('schoolDirectory.errors.downloadFailed') || 'Failed to download');
    }
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // View specific school on map
  const viewSchoolOnMap = (schoolId) => {
    setFocusSchoolId(schoolId);
    setViewMode('map');
    console.log('🎯 Viewing school on map:', schoolId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProvince('all');
    setSelectedDistrict('all');
    setSelectedYear('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 6 }}>
      {/* Hero Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          pt: 8,
          pb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'rgba(255,255,255,0.2)'
                }}
              >
                <School sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {t('schoolDirectory.title')}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                {t('schoolDirectory.subtitle')}
              </Typography>

              {/* Statistics */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.totalSchools}+
                    </Typography>
                    <Typography variant="body2">
                      {t('schoolDirectory.stats.schools')}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.totalStudents.toLocaleString()}+
                    </Typography>
                    <Typography variant="body2">
                      {t('schoolDirectory.stats.students')}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.uniqueDistricts}
                    </Typography>
                    <Typography variant="body2">
                      {t('schoolDirectory.stats.districts')}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.avgStudents}
                    </Typography>
                    <Typography variant="body2">
                      {t('schoolDirectory.stats.avgStudents')}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Container>

        {/* Wave decoration */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 60,
            backgroundImage: 'url(/images/wave.svg)',
            backgroundRepeat: 'repeat-x'
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4 }}>
        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder={t('schoolDirectory.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Province Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label={t('schoolDirectory.filters.province')}
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict('all');
                }}
              >
                <MenuItem value="all">{t('schoolDirectory.filters.allProvinces')}</MenuItem>
                {SL_PROVINCES.map(province => (
                  <MenuItem key={province.code} value={province.code}>
                    {province.name[i18n.language] || province.name.en}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* District Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label={t('schoolDirectory.filters.district')}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={selectedProvince === 'all'}
              >
                <MenuItem value="all">{t('schoolDirectory.filters.allDistricts')}</MenuItem>
                {availableDistricts.map(district => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Sort */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label={t('schoolDirectory.sort.label')}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Sort />
                    </InputAdornment>
                  )
                }}
              >
                <MenuItem value="name">{t('schoolDirectory.sort.name')}</MenuItem>
                <MenuItem value="students">{t('schoolDirectory.sort.students')}</MenuItem>
                <MenuItem value="year">{t('schoolDirectory.sort.year')}</MenuItem>
              </TextField>
            </Grid>

            {/* Actions */}
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Tooltip title={t('schoolDirectory.download')}>
                  <IconButton
                    color="primary"
                    onClick={handleDownloadExcel}
                    sx={{ border: '1px solid', borderColor: 'primary.main' }}
                  >
                    <Download />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearFilters}
                  startIcon={<FilterList />}
                >
                  {t('schoolDirectory.clearFilters')}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Results Counter and View Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('schoolDirectory.resultsCount', {
                count: filteredSchools.length,
                total: schools.length
              }) || `Showing ${filteredSchools.length} of ${schools.length} schools`}
            </Typography>
            
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="grid">
                <Tooltip title={t('schoolDirectory.views.grid')}>
                  <ViewModule />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="list">
                <Tooltip title={t('schoolDirectory.views.list')}>
                  <ViewList />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="map">
                <Tooltip title={t('schoolDirectory.views.map')}>
                  <MapIcon />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        {/* Content Views */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {viewMode === 'grid' && (
              <GridView schools={filteredSchools} t={t} i18n={i18n} viewSchoolOnMap={viewSchoolOnMap} />
            )}
            {viewMode === 'list' && (
              <ListView 
                schools={filteredSchools} 
                t={t} 
                i18n={i18n}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSortChange}
                viewSchoolOnMap={viewSchoolOnMap}
              />
            )}
            {viewMode === 'map' && (
              <Box>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h6" gutterBottom>
                    🗺️ Interactive School Map of Sri Lanka
                  </Typography>
                  <Typography variant="body2">
                    Showing {filteredSchools.length} schools • Click markers for details • Zoom and pan to explore
                  </Typography>
                </Paper>
                <SchoolMap schools={filteredSchools} t={t} i18n={i18n} focusSchoolId={focusSchoolId} />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

// Grid View Component
const GridView = ({ schools, t, i18n, viewSchoolOnMap }) => {
  if (schools.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          {t('schoolDirectory.noResults')}
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3}>
      <AnimatePresence>
        {schools.map((school, index) => (
          <Grid item xs={12} sm={6} md={4} key={school.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 50,
                        height: 50,
                        mr: 2
                      }}
                    >
                      <School />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {school.name}
                      </Typography>
                      <Chip
                        label={school.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {school.districtName?.[i18n.language] || school.districtName?.en || school.district}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <School fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {t('schoolDirectory.card.grades')}: {school.grades}
                      </Typography>
                    </Box>

                    {school.studentCount > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {school.studentCount.toLocaleString()} {t('schoolDirectory.card.students')}
                        </Typography>
                      </Box>
                    )}

                    {school.medium && school.medium.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {school.medium.map(medium => (
                          <Chip
                            key={medium}
                            label={medium}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                    <Button
                      size="small"
                      startIcon={<MapIcon />}
                      onClick={() => viewSchoolOnMap(school.id)}
                      sx={{ width: '100%' }}
                      variant="outlined"
                      color="primary"
                    >
                      View on Map
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};

// List View Component
const ListView = ({ schools, t, i18n, sortBy, sortOrder, onSort, viewSchoolOnMap }) => {
  if (schools.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          {t('schoolDirectory.noResults')}
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? sortOrder : 'asc'}
                onClick={() => onSort('name')}
              >
                {t('schoolDirectory.table.name')}
              </TableSortLabel>
            </TableCell>
            <TableCell>{t('schoolDirectory.table.type')}</TableCell>
            <TableCell>{t('schoolDirectory.table.district')}</TableCell>
            <TableCell>{t('schoolDirectory.table.grades')}</TableCell>
            <TableCell>{t('schoolDirectory.table.medium')}</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'students'}
                direction={sortBy === 'students' ? sortOrder : 'asc'}
                onClick={() => onSort('students')}
              >
                {t('schoolDirectory.table.students')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schools.map((school) => (
            <TableRow
              key={school.id}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    <School fontSize="small" />
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {school.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={school.type} size="small" variant="outlined" />
              </TableCell>
              <TableCell>
                {school.districtName?.[i18n.language] || school.districtName?.en || school.district}
              </TableCell>
              <TableCell>{school.grades}</TableCell>
              <TableCell>
                {school.medium && school.medium.join(', ')}
              </TableCell>
              <TableCell>
                {school.studentCount > 0 ? school.studentCount.toLocaleString() : '-'}
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  startIcon={<MapIcon />}
                  onClick={() => viewSchoolOnMap(school.id)}
                  variant="outlined"
                  color="primary"
                >
                  Map
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchoolDirectory;
