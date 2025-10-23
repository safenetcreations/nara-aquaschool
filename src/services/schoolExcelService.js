// Service to fetch and parse school data from Firebase Storage Excel file
import * as XLSX from 'xlsx';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

// Firebase Storage configuration
const EXCEL_FILE_PATH = 'Tbl20200101.xlsx';
const ACCESS_TOKEN = 'd211f254-5d39-415c-ade5-524031d9287a';

/**
 * Fetch and parse schools from Excel file in Firebase Storage
 * @returns {Promise<Array>} Array of school objects
 */
export const getSchoolsFromExcel = async () => {
  try {
    // Create reference to the file
    const fileRef = ref(storage, EXCEL_FILE_PATH);
    
    // Get download URL with access token
    const downloadURL = await getDownloadURL(fileRef);
    
    // Fetch the file
    const response = await fetch(downloadURL);
    const arrayBuffer = await response.arrayBuffer();
    
    // Parse Excel file
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log('✅ Successfully loaded schools from Excel:', rawData.length);
    
    // Transform data to match our school format
    const schools = transformExcelData(rawData);
    
    return schools;
  } catch (error) {
    console.error('Error loading schools from Excel:', error);
    throw error;
  }
};

/**
 * Transform raw Excel data to school object format
 * @param {Array} rawData - Raw data from Excel
 * @returns {Array} Transformed school objects
 */
const transformExcelData = (rawData) => {
  return rawData.map((row, index) => {
    // Extract data from Excel columns
    // Adjust these field names based on your actual Excel structure
    const schoolId = row['School ID'] || row['ID'] || `school-${index + 1}`;
    const schoolName = row['School Name'] || row['Name'] || row['பள்ளி பெயர்'] || 'Unknown School';
    const schoolType = row['Type'] || row['School Type'] || 'Government';
    const province = row['Province'] || row['மாகாணம்'] || '';
    const district = row['District'] || row['மாவட்டம்'] || '';
    const grades = row['Grades'] || row['Grade Range'] || '1-13';
    const medium = row['Medium'] || row['Language'] || 'Sinhala';
    const studentCount = parseInt(row['Students'] || row['Total Students'] || row['Student Count'] || 0);
    const teacherCount = parseInt(row['Teachers'] || row['Total Teachers'] || 0);
    const address = row['Address'] || row['முகவரி'] || '';
    const phone = row['Phone'] || row['Contact'] || '';
    const email = row['Email'] || '';
    const yearEstablished = row['Year Established'] || row['Founded'] || '';
    const latitude = parseFloat(row['Latitude'] || row['Lat'] || 0);
    const longitude = parseFloat(row['Longitude'] || row['Lng'] || row['Long'] || 0);

    // Parse medium (could be comma-separated)
    const mediumArray = typeof medium === 'string' 
      ? medium.split(',').map(m => m.trim())
      : [medium];

    return {
      id: generateSchoolId(schoolName, district),
      name: schoolName,
      type: normalizeSchoolType(schoolType),
      province: normalizeProvince(province),
      provinceName: getProvinceName(province),
      district: normalizeDistrict(district),
      districtName: getDistrictName(district),
      grades: grades,
      medium: mediumArray,
      studentCount: studentCount,
      teacherCount: teacherCount,
      address: address,
      phone: phone,
      email: email,
      establishedYear: yearEstablished,
      location: {
        lat: latitude,
        lng: longitude
      },
      status: 'active',
      source: 'excel',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
};

/**
 * Generate unique school ID from name and district
 */
const generateSchoolId = (name, district) => {
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 30);
  const cleanDistrict = district.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 5);
  return `${cleanDistrict}-${cleanName}`;
};

/**
 * Normalize school type
 */
const normalizeSchoolType = (type) => {
  const typeMap = {
    'national': 'National',
    'government': 'Government',
    'provincial': 'Provincial',
    '1ab': '1AB',
    '1c': '1C',
    'type 1ab': '1AB',
    'type 1c': '1C',
    'private': 'Private',
    'international': 'International'
  };
  
  return typeMap[type?.toLowerCase()] || type || 'Government';
};

/**
 * Normalize province code
 */
const normalizeProvince = (province) => {
  const provinceMap = {
    'western': 'WP',
    'western province': 'WP',
    'மேல் மாகாணம்': 'WP',
    'central': 'CP',
    'central province': 'CP',
    'மத்திய மாகாணம்': 'CP',
    'southern': 'SP',
    'southern province': 'SP',
    'தென் மாகாணம்': 'SP',
    'northern': 'NP',
    'northern province': 'NP',
    'வடக்கு மாகாணம்': 'NP',
    'eastern': 'EP',
    'eastern province': 'EP',
    'கிழக்கு மாகாணம்': 'EP',
    'north western': 'NWP',
    'north western province': 'NWP',
    'வட மேல் மாகாணம்': 'NWP',
    'north central': 'NCP',
    'north central province': 'NCP',
    'வட மத்திய மாகாணம்': 'NCP',
    'uva': 'UP',
    'uva province': 'UP',
    'ஊவா மாகாணம்': 'UP',
    'sabaragamuwa': 'SGP',
    'sabaragamuwa province': 'SGP',
    'சப்பரகமுவ மாகாணம்': 'SGP'
  };
  
  return provinceMap[province?.toLowerCase()] || province || 'WP';
};

/**
 * Get province name in all languages
 */
const getProvinceName = (province) => {
  const provinceNames = {
    'WP': { en: 'Western Province', si: 'බස්නාහිර පළාත', ta: 'மேல் மாகாணம்' },
    'CP': { en: 'Central Province', si: 'මධ්‍යම පළාත', ta: 'மத்திய மாகாணம்' },
    'SP': { en: 'Southern Province', si: 'දකුණු පළාත', ta: 'தென் மாகாணம்' },
    'NP': { en: 'Northern Province', si: 'උතුරු පළාත', ta: 'வடக்கு மாகாணம்' },
    'EP': { en: 'Eastern Province', si: 'නැගෙනහිර පළාත', ta: 'கிழக்கு மாகாணம்' },
    'NWP': { en: 'North Western Province', si: 'වයඹ පළාත', ta: 'வட மேல் மாகாணம்' },
    'NCP': { en: 'North Central Province', si: 'උතුරු මැද පළාත', ta: 'வட மத்திய மாகாணம்' },
    'UP': { en: 'Uva Province', si: 'ඌව පළාත', ta: 'ஊவா மாகாணம்' },
    'SGP': { en: 'Sabaragamuwa Province', si: 'සබරගමුව පළාත', ta: 'சப்பரகமுவ மாகாணம்' }
  };
  
  const code = normalizeProvince(province);
  return provinceNames[code] || { en: province, si: province, ta: province };
};

/**
 * Normalize district code
 */
const normalizeDistrict = (district) => {
  const districtMap = {
    'colombo': 'COL',
    'கொழும்பு': 'COL',
    'gampaha': 'GAM',
    'கம்பஹா': 'GAM',
    'kalutara': 'KAL',
    'களுத்துறை': 'KAL',
    'kandy': 'KAN',
    'கண்டி': 'KAN',
    'matale': 'MAT',
    'மாத்தளை': 'MAT',
    'nuwara eliya': 'NUE',
    'நுவரெலியா': 'NUE',
    'galle': 'GAL',
    'காலி': 'GAL',
    'matara': 'MTR',
    'மாத்தறை': 'MTR',
    'hambantota': 'HAM',
    'அம்பாந்தோட்டை': 'HAM',
    'jaffna': 'JAF',
    'யாழ்ப்பாணம்': 'JAF',
    'kilinochchi': 'KIL',
    'கிளிநொச்சி': 'KIL',
    'mannar': 'MAN',
    'மன்னார்': 'MAN',
    'vavuniya': 'VAV',
    'வவுனியா': 'VAV',
    'mullaitivu': 'MUL',
    'முல்லைத்தீவு': 'MUL',
    'batticaloa': 'BAT',
    'மட்டக்களப்பு': 'BAT',
    'ampara': 'AMP',
    'அம்பாறை': 'AMP',
    'trincomalee': 'TRI',
    'திருகோணமலை': 'TRI',
    'kurunegala': 'KUR',
    'குருநாகல்': 'KUR',
    'puttalam': 'PUT',
    'புத்தளம்': 'PUT',
    'anuradhapura': 'ANU',
    'அனுராதபுரம்': 'ANU',
    'polonnaruwa': 'POL',
    'பொலன்னறுவை': 'POL',
    'badulla': 'BAD',
    'பதுளை': 'BAD',
    'monaragala': 'MON',
    'மொனராகலை': 'MON',
    'ratnapura': 'RAT',
    'இரத்தினபுரி': 'RAT',
    'kegalle': 'KEG',
    'கேகாலை': 'KEG'
  };
  
  return districtMap[district?.toLowerCase()] || district || 'COL';
};

/**
 * Get district name in all languages
 */
const getDistrictName = (district) => {
  const districtNames = {
    'COL': { en: 'Colombo', si: 'කොළඹ', ta: 'கொழும்பு' },
    'GAM': { en: 'Gampaha', si: 'ගම්පහ', ta: 'கம்பஹா' },
    'KAL': { en: 'Kalutara', si: 'කලුතර', ta: 'களுத்துறை' },
    'KAN': { en: 'Kandy', si: 'මහනුවර', ta: 'கண்டி' },
    'MAT': { en: 'Matale', si: 'මාතලේ', ta: 'மாத்தளை' },
    'NUE': { en: 'Nuwara Eliya', si: 'නුවරඑළිය', ta: 'நுவரெலியா' },
    'GAL': { en: 'Galle', si: 'ගාල්ල', ta: 'காலி' },
    'MTR': { en: 'Matara', si: 'මාතර', ta: 'மாத்தறை' },
    'HAM': { en: 'Hambantota', si: 'හම්බන්තොට', ta: 'அம்பாந்தோட்டை' },
    'JAF': { en: 'Jaffna', si: 'යාපනය', ta: 'யாழ்ப்பாணம்' },
    'KIL': { en: 'Kilinochchi', si: 'කිලිනොච්චිය', ta: 'கிளிநொச்சி' },
    'MAN': { en: 'Mannar', si: 'මන්නාරම', ta: 'மன்னார்' },
    'VAV': { en: 'Vavuniya', si: 'වවුනියාව', ta: 'வவுனியா' },
    'MUL': { en: 'Mullaitivu', si: 'මුලතිව්', ta: 'முல்லைத்தீவு' },
    'BAT': { en: 'Batticaloa', si: 'මඩකලපුව', ta: 'மட்டக்களப்பு' },
    'AMP': { en: 'Ampara', si: 'අම්පාර', ta: 'அம்பாறை' },
    'TRI': { en: 'Trincomalee', si: 'ත්‍රිකුණාමලය', ta: 'திருகோணமலை' },
    'KUR': { en: 'Kurunegala', si: 'කුරුණෑගල', ta: 'குருநாகல்' },
    'PUT': { en: 'Puttalam', si: 'පුත්තලම', ta: 'புத்தளம்' },
    'ANU': { en: 'Anuradhapura', si: 'අනුරාධපුරය', ta: 'அனுராதபுரம்' },
    'POL': { en: 'Polonnaruwa', si: 'පොළොන්නරුව', ta: 'பொலன்னறுவை' },
    'BAD': { en: 'Badulla', si: 'බදුල්ල', ta: 'பதுளை' },
    'MON': { en: 'Monaragala', si: 'මොණරාගල', ta: 'மொனராகலை' },
    'RAT': { en: 'Ratnapura', si: 'රත්නපුර', ta: 'இரத்தினபுரி' },
    'KEG': { en: 'Kegalle', si: 'කෑගල්ල', ta: 'கேகாலை' }
  };
  
  const code = normalizeDistrict(district);
  return districtNames[code] || { en: district, si: district, ta: district };
};

/**
 * Calculate statistics from school data
 * @param {Array} schools - Array of school objects
 * @returns {Object} Statistics
 */
export const calculateSchoolStatistics = (schools) => {
  const totalSchools = schools.length;
  const totalStudents = schools.reduce((sum, school) => sum + (school.studentCount || 0), 0);
  const totalTeachers = schools.reduce((sum, school) => sum + (school.teacherCount || 0), 0);
  const uniqueDistricts = new Set(schools.map(s => s.district)).size;
  const uniqueProvinces = new Set(schools.map(s => s.province)).size;
  const avgStudents = totalSchools > 0 ? Math.round(totalStudents / totalSchools) : 0;
  const avgTeachers = totalSchools > 0 ? Math.round(totalTeachers / totalSchools) : 0;

  // Schools by type
  const schoolsByType = schools.reduce((acc, school) => {
    acc[school.type] = (acc[school.type] || 0) + 1;
    return acc;
  }, {});

  // Schools by province
  const schoolsByProvince = schools.reduce((acc, school) => {
    const provinceName = school.provinceName?.en || school.province;
    acc[provinceName] = (acc[provinceName] || 0) + 1;
    return acc;
  }, {});

  return {
    totalSchools,
    totalStudents,
    totalTeachers,
    uniqueDistricts,
    uniqueProvinces,
    avgStudents,
    avgTeachers,
    schoolsByType,
    schoolsByProvince
  };
};

/**
 * Export schools data back to Excel
 * @param {Array} schools - Array of school objects
 * @param {String} filename - Output filename
 */
export const exportSchoolsToExcel = (schools, filename = 'schools_export.xlsx') => {
  const exportData = schools.map(school => ({
    'School ID': school.id,
    'School Name': school.name,
    'Type': school.type,
    'Province': school.provinceName?.en || school.province,
    'District': school.districtName?.en || school.district,
    'Grades': school.grades,
    'Medium': school.medium ? school.medium.join(', ') : '',
    'Students': school.studentCount || 0,
    'Teachers': school.teacherCount || 0,
    'Address': school.address || '',
    'Phone': school.phone || '',
    'Email': school.email || '',
    'Year Established': school.establishedYear || '',
    'Latitude': school.location?.lat || '',
    'Longitude': school.location?.lng || '',
    'Status': school.status || 'active'
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Schools');
  
  // Auto-size columns
  const colWidths = Object.keys(exportData[0] || {}).map(key => ({
    wch: Math.max(key.length, 15)
  }));
  ws['!cols'] = colWidths;
  
  XLSX.writeFile(wb, filename);
};

export default {
  getSchoolsFromExcel,
  calculateSchoolStatistics,
  exportSchoolsToExcel
};
