// SchoolSelector Component - Hierarchical school selection (Province → District → School)
import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Typography,
  Chip,
  Alert,
  FormHelperText
} from '@mui/material';
import { School, LocationOn, Map } from '@mui/icons-material';
import {
  SL_PROVINCES,
  SL_SCHOOLS_BY_PROVINCE,
  getDistrictsByProvince,
  getSchoolsByDistrict,
  searchSchools,
  SCHOOL_TYPES
} from '../../data/sriLankanSchools';
import { useTranslation } from 'react-i18next';

const SchoolSelector = ({ 
  value, 
  onChange, 
  error, 
  helperText,
  required = true,
  disabled = false 
}) => {
  const { t, i18n } = useTranslation();
  
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  // Load initial value if provided
  useEffect(() => {
    if (value && typeof value === 'object') {
      setSelectedProvince(value.provinceCode || '');
      setSelectedDistrict(value.districtCode || '');
      setSelectedSchool(value);
    }
  }, [value]);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districtList = getDistrictsByProvince(selectedProvince);
      setDistricts(districtList);
      // Reset district and school if province changes
      if (selectedDistrict && !districtList.find(d => d.code === selectedDistrict)) {
        setSelectedDistrict('');
        setSchools([]);
        setSelectedSchool(null);
      }
    } else {
      setDistricts([]);
      setSchools([]);
    }
  }, [selectedProvince]);

  // Update schools when district changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const schoolList = getSchoolsByDistrict(selectedProvince, selectedDistrict);
      setSchools(schoolList);
    } else {
      setSchools([]);
    }
  }, [selectedProvince, selectedDistrict]);

  // Notify parent component of changes
  useEffect(() => {
    if (selectedSchool && onChange) {
      const province = SL_PROVINCES.find(p => p.code === selectedProvince);
      const district = districts.find(d => d.code === selectedDistrict);
      
      onChange({
        ...selectedSchool,
        provinceCode: selectedProvince,
        province: province?.name[i18n.language] || province?.name.en,
        districtCode: selectedDistrict,
        district: district?.name[i18n.language] || district?.name.en
      });
    }
  }, [selectedSchool, onChange]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
    setSelectedSchool(null);
    setSearchMode(false);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedSchool(null);
  };

  const handleSchoolChange = (event, newValue) => {
    setSelectedSchool(newValue);
  };

  const handleSearchModeToggle = () => {
    setSearchMode(!searchMode);
    if (searchMode) {
      // Reset to selection mode
      setSelectedSchool(null);
    }
  };

  const getLanguageName = (nameObj) => {
    return nameObj[i18n.language] || nameObj.en;
  };

  return (
    <Box>
      {/* Mode Toggle */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {searchMode ? 'Search Mode' : 'Selection Mode'}
        </Typography>
        <Chip
          label={searchMode ? 'Switch to Selection' : 'Search by Name'}
          onClick={handleSearchModeToggle}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ cursor: 'pointer' }}
        />
      </Box>

      {!searchMode ? (
        // SELECTION MODE: Province → District → School
        <Box>
          {/* Province Selector */}
          <FormControl fullWidth sx={{ mb: 2 }} required={required} disabled={disabled}>
            <InputLabel id="province-label">
              <Map sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('registration.province') || 'Province'}
            </InputLabel>
            <Select
              labelId="province-label"
              value={selectedProvince}
              label={t('registration.province') || 'Province'}
              onChange={handleProvinceChange}
            >
              {SL_PROVINCES.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {getLanguageName(province.name)}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select your province first</FormHelperText>
          </FormControl>

          {/* District Selector */}
          <FormControl 
            fullWidth 
            sx={{ mb: 2 }} 
            required={required} 
            disabled={!selectedProvince || disabled}
          >
            <InputLabel id="district-label">
              <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('registration.district') || 'District'}
            </InputLabel>
            <Select
              labelId="district-label"
              value={selectedDistrict}
              label={t('registration.district') || 'District'}
              onChange={handleDistrictChange}
            >
              {districts.map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {getLanguageName(district.name)}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {selectedProvince ? 'Select your district' : 'Please select province first'}
            </FormHelperText>
          </FormControl>

          {/* School Autocomplete */}
          <Autocomplete
            options={schools}
            getOptionLabel={(option) => option.name || ''}
            value={selectedSchool}
            onChange={handleSchoolChange}
            disabled={!selectedDistrict || disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ mr: 1 }} />
                    {t('registration.school') || 'School'}
                  </Box>
                }
                required={required}
                error={error}
                helperText={
                  helperText || 
                  (selectedDistrict ? `${schools.length} schools available` : 'Please select district first')
                }
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1">{option.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip label={option.type} size="small" color="primary" variant="outlined" />
                    <Chip label={option.grades} size="small" />
                    <Chip 
                      label={option.medium.join(', ')} 
                      size="small" 
                      color="secondary" 
                      variant="outlined" 
                    />
                  </Box>
                </Box>
              </li>
            )}
          />

          {/* School Info Display */}
          {selectedSchool && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>{selectedSchool.name}</strong>
              </Typography>
              <Typography variant="body2">
                Type: {SCHOOL_TYPES[selectedSchool.type]}
              </Typography>
              <Typography variant="body2">
                Medium: {selectedSchool.medium.join(', ')}
              </Typography>
              <Typography variant="body2">
                Grades: {selectedSchool.grades}
              </Typography>
            </Alert>
          )}
        </Box>
      ) : (
        // SEARCH MODE: Direct search
        <Box>
          <Autocomplete
            options={searchSchools('')}
            getOptionLabel={(option) => `${option.name} - ${option.district}, ${option.province}`}
            value={selectedSchool}
            onChange={handleSchoolChange}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search School by Name"
                placeholder="Type school name..."
                required={required}
                error={error}
                helperText={helperText || 'Search across all schools in Sri Lanka'}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.district}, {option.province}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip label={option.type} size="small" color="primary" variant="outlined" />
                    <Chip label={option.medium.join(', ')} size="small" />
                  </Box>
                </Box>
              </li>
            )}
          />

          {selectedSchool && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>{selectedSchool.name}</strong>
              </Typography>
              <Typography variant="body2">
                Location: {selectedSchool.district}, {selectedSchool.province}
              </Typography>
              <Typography variant="body2">
                Type: {SCHOOL_TYPES[selectedSchool.type]}
              </Typography>
              <Typography variant="body2">
                Medium: {selectedSchool.medium.join(', ')}
              </Typography>
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SchoolSelector;
