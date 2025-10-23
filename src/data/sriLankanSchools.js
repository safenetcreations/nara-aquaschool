// REAL SRI LANKAN SCHOOLS DATABASE - Organized by Province > District > School
// Data based on Ministry of Education records
// Focusing on schools with Grades 5-10 (secondary education)

export const SL_PROVINCES = [
  { code: 'WP', name: { en: 'Western Province', si: 'බස්නාහිර පළාත', ta: 'மேல் மாகாணம்' } },
  { code: 'CP', name: { en: 'Central Province', si: 'මධ්‍යම පළාත', ta: 'மத்திய மாகாணம்' } },
  { code: 'SP', name: { en: 'Southern Province', si: 'දකුණු පළාත', ta: 'தென் மாகாணம்' } },
  { code: 'NP', name: { en: 'Northern Province', si: 'උතුරු පළාත', ta: 'வடக்கு மாகாணம்' } },
  { code: 'EP', name: { en: 'Eastern Province', si: 'නැගෙනහිර පළාත', ta: 'கிழக்கு மாகாணம்' } },
  { code: 'NWP', name: { en: 'North Western Province', si: 'වයඹ පළාත', ta: 'வட மேல் மாகாணம்' } },
  { code: 'NCP', name: { en: 'North Central Province', si: 'උතුරු මැද පළාත', ta: 'வட மத்திய மாகாணம்' } },
  { code: 'UP', name: { en: 'Uva Province', si: 'ඌව පළාත', ta: 'ஊவா மாகாணம்' } },
  { code: 'SGP', name: { en: 'Sabaragamuwa Province', si: 'සබරගමුව පළාත', ta: 'சப்பரகமுவ மாகாணம்' } }
];

export const SL_SCHOOLS_BY_PROVINCE = {
  // ==================== WESTERN PROVINCE ====================
  WP: {
    districts: [
      {
        code: 'COL',
        name: { en: 'Colombo', si: 'කොළඹ', ta: 'கொழும்பு' },
        schools: [
          { id: 'wp-col-001', name: 'Royal College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-002', name: 'Ananda College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-003', name: 'Nalanda College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-004', name: 'Visakha Vidyalaya', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-005', name: 'Ladies\' College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-006', name: 'Musaeus College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-007', name: 'D.S. Senanayake College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-008', name: 'Thurstan College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-009', name: 'Wesley College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-010', name: 'St. Joseph\'s College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-011', name: 'Holy Family Convent', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-012', name: 'Gateway College', type: 'Private', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-013', name: 'Colombo International School', type: 'Private', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-014', name: 'Lyceum International School', type: 'Private', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-015', name: 'Sivali Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-016', name: 'Devi Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-017', name: 'Mahanama College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-018', name: 'Zahira College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-019', name: 'Isipathana College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-020', name: 'St. Thomas\' College', type: 'National', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-021', name: 'Bishop\'s College', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-022', name: 'Sri Sumangala College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-023', name: 'Rahula College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-024', name: 'Devapathiraja College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-025', name: 'Sujatha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-026', name: 'Ananda Balika Vidyalaya', type: '1AB', grades: '6-13', medium: ['Sinhala'] },
          { id: 'wp-col-027', name: 'Gothami Balika Vidyalaya', type: '1AB', grades: '6-13', medium: ['Sinhala'] },
          { id: 'wp-col-028', name: 'Kotahena Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-029', name: 'Hameed Al Husseinie College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-030', name: 'Vivekananda College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'wp-col-031', name: 'Lumbini College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-032', name: 'St. Pauls Girls School Milagiriya', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-033', name: 'Sirimavo Bandaranaike Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-034', name: 'Muslim Ladies College', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-035', name: 'St. Mathews College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-036', name: 'St. John\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-037', name: 'Seevali Madya Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-038', name: 'Susamayawardhana Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-039', name: 'Anuruddha Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-040', name: 'Colombo Yasodara Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-041', name: 'Presbyterian Girl\'s School', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'wp-col-042', name: 'Rathnawali Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-043', name: 'All Saints\' Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-044', name: 'Veluwana College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-045', name: 'Colombo Asoka Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-046', name: 'C.W.W. Kannangara Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-047', name: 'Vipulanantha Tamil Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'wp-col-048', name: 'Al Hijra Muslim Vidyalaya', type: '1C', grades: '1-11', medium: ['Sinhala'] },
          { id: 'wp-col-049', name: 'Sri Sangaraja M.M.V.', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-050', name: 'Mahabodhi Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-051', name: 'Dematagoda Rajasinghe Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-052', name: 'Mihindu Mawatha Sinhala Maha Vidyalaya', type: '1C', grades: '1-11', medium: ['Sinhala'] },
          { id: 'wp-col-053', name: 'Siri Saripuththa Maha Vidyalaya', type: '1C', grades: '1-11', medium: ['Sinhala'] },
          { id: 'wp-col-054', name: 'Vijayaba Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-055', name: 'Grandpass St.Joseph\'s Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-056', name: 'Grandpass St. Joseph\'s Boys Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-057', name: 'Wolfendhal Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-058', name: 'Clifton Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-059', name: 'Viharamaha Devi Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-060', name: 'Hemamali Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-061', name: 'Al Hidhaya Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-062', name: 'Al Nasser Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-063', name: 'Dharussalaam Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-064', name: 'T.B.Jayah Zahira Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-065', name: 'Fathima Mus. Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-066', name: 'Dematagoda Khairiya Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-067', name: 'St. Lucia\'s Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-col-068', name: 'St. Anthony\'s Tamil Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'wp-col-069', name: 'Mahawatta Muslim Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-col-070', name: 'St. Joseph\'s Tamil Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Tamil'] }
        ]
      },
      {
        code: 'GAM',
        name: { en: 'Gampaha', si: 'ගම්පහ', ta: 'கம்பஹா' },
        schools: [
          { id: 'wp-gam-001', name: 'Bandaranayake College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-gam-002', name: 'Maliyadeva College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-gam-003', name: 'Yasodara Devi Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-gam-004', name: 'Richmond College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-gam-005', name: 'Ferguson High School', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'wp-gam-006', name: 'Negombo Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-gam-007', name: 'Kelaniya Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-gam-008', name: 'Mahanama College', type: '1AB', grades: '1-13', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'KAL',
        name: { en: 'Kalutara', si: 'කලුතර', ta: 'களுத்துறை' },
        schools: [
          { id: 'wp-kal-001', name: 'Kalutara Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-kal-002', name: 'Mahinda Rajapaksa Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-kal-003', name: 'Horana Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'wp-kal-004', name: 'Panadura Royal College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'wp-kal-005', name: 'Siri Dhamma Maha Vidyalaya', type: '1C', grades: '1-13', medium: ['Sinhala'] }
        ]
      }
    ]
  },

  // ==================== CENTRAL PROVINCE ====================
  CP: {
    districts: [
      {
        code: 'KAN',
        name: { en: 'Kandy', si: 'මහනුවර', ta: 'கண்டி' },
        schools: [
          { id: 'cp-kan-001', name: 'Trinity College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-002', name: 'Kingswood College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-003', name: 'Dharmaraja College', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-004', name: 'Girls\' High School Kandy', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-005', name: 'Mahamaya Girls\' College', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-006', name: 'Hillwood College', type: '1AB', grades: '1-13', medium: ['English'] },
          { id: 'cp-kan-007', name: 'St. Anthony\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-008', name: 'Pushpadana Girls\' College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-009', name: 'Vidyartha College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-010', name: 'Sri Rahula Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-011', name: 'Sangamitta Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-012', name: 'Swarnamali Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-013', name: 'St. Sylvester\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-014', name: 'Sirimavo Bandaranaike Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-015', name: 'Maliyadeva Girls\' College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-016', name: 'Wariyapola Sri Sumangala College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-017', name: 'Nugawela Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-018', name: 'Kadugannawa National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-019', name: 'Sri Swarnajothi National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-020', name: 'Wickramabahu Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-021', name: 'Zahira College, Gampola', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'cp-kan-022', name: 'Teldeniya National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-023', name: 'Alapalawala M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-024', name: 'Al-Aqsha Muslim Vidyalaya', type: '1C', grades: '1-11', medium: ['Sinhala'] },
          { id: 'cp-kan-025', name: 'Ambanwala K.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'cp-kan-026', name: 'Arafa Muslim Maha Vidyalaya', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-kan-027', name: 'As Shums M.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'MAT',
        name: { en: 'Matale', si: 'මාතලේ', ta: 'மாத்தளை' },
        schools: [
          { id: 'cp-mat-001', name: 'Matale Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-mat-002', name: 'Vijaya College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-mat-003', name: 'Gamini Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-mat-004', name: 'Matale Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'NUE',
        name: { en: 'Nuwara Eliya', si: 'නුවරඑළිය', ta: 'நுவரெலியா' },
        schools: [
          { id: 'cp-nue-001', name: 'St. Bridget\'s Convent', type: '1AB', grades: '1-13', medium: ['English', 'Sinhala'] },
          { id: 'cp-nue-002', name: 'Nuwara Eliya Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'cp-nue-003', name: 'Talawakelle Tamil Maha Vidyalayam', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'cp-nue-004', name: 'Hatton National School', type: '1C', grades: '1-13', medium: ['Tamil'] }
        ]
      }
    ]
  },

  // ==================== SOUTHERN PROVINCE ====================
  SP: {
    districts: [
      {
        code: 'GAL',
        name: { en: 'Galle', si: 'ගාල්ල', ta: 'காலி' },
        schools: [
          { id: 'sp-gal-001', name: 'Richmond College Galle', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sp-gal-002', name: 'Mahinda College', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-003', name: 'Southlands College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sp-gal-004', name: 'Sanghamitta Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-005', name: 'Dharmasoka Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-006', name: 'St. Aloysius\' College, Galle', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sp-gal-007', name: 'Sanghamitta Girls College, Galle', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-008', name: 'Vidyaloka College Galle', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-009', name: 'Siridhamma College, Labuduwa', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-010', name: 'Dharmasoka College, Ambalangoda', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-011', name: 'Sri Devananda College, Ambalangoda', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-012', name: 'Revatha College, Balapitiya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-013', name: 'Hennatota Vidyawardana M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-014', name: 'Gintota Sri Medankara M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-015', name: 'Hikkaduwa Mahamaya B.M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-016', name: 'Boossa M.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sp-gal-017', name: 'Bodiraja M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-018', name: 'Sri Kalyanatissa K.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sp-gal-019', name: 'P.De S.Kularathna M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-gal-020', name: 'Batapola M.M.V', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'sp-gal-021', name: 'Heenatiya Sri Rahula K.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sp-gal-022', name: 'Gonapinuwala Saralankara M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'MAT2',
        name: { en: 'Matara', si: 'මාතර', ta: 'மாத்தறை' },
        schools: [
          { id: 'sp-mat-001', name: 'Rahula College', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-mat-002', name: 'Sujatha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-mat-003', name: 'St. Thomas\' College Matara', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sp-mat-004', name: 'St. Mary\'s Convent', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] }
        ]
      },
      {
        code: 'HAM',
        name: { en: 'Hambantota', si: 'හම්බන්තොට', ta: 'அம்பாந்தோட்டை' },
        schools: [
          { id: 'sp-ham-001', name: 'Mahinda Rajapaksa College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-ham-002', name: 'Hambantota Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sp-ham-003', name: 'Tangalle Central College', type: '1C', grades: '1-13', medium: ['Sinhala'] }
        ]
      }
    ]
  },

  // ==================== NORTHERN PROVINCE ====================
  NP: {
    districts: [
      {
        code: 'JAF',
        name: { en: 'Jaffna', si: 'යාපනය', ta: 'யாழ்ப்பாணம்' },
        schools: [
          { id: 'np-jaf-001', name: 'Jaffna Hindu College', type: 'National', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-jaf-002', name: 'Jaffna Central College', type: 'National', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-jaf-003', name: 'Chundikuli Girls\' College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-jaf-004', name: 'Vembadi Girls\' High School', type: '1AB', grades: '6-13', medium: ['Tamil'] },
          { id: 'np-jaf-005', name: 'Kokuvil Hindu College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-jaf-006', name: 'Jaffna Holy Family Convent National School', type: 'National', grades: '1-13', medium: ['Tamil', 'English'] },
          { id: 'np-jaf-007', name: 'Chavakachcheri Hindu College', type: '1AB', grades: '6-13', medium: ['Tamil'] },
          { id: 'np-jaf-008', name: 'Nelliady Central College', type: '1AB', grades: '6-13', medium: ['Tamil'] },
          { id: 'np-jaf-009', name: 'Manipay Hindu College', type: 'National', grades: '6-13', medium: ['Tamil'] },
          { id: 'np-jaf-010', name: 'Delft Maha Vidyalayam', type: '1C', grades: '6-13', medium: ['Tamil'] },
          { id: 'np-jaf-011', name: 'Delft Mangaiyatkarasi Vidyalayam', type: 'Type 2', grades: '1-11', medium: ['Tamil'] },
          { id: 'np-jaf-012', name: 'Pungudutivu Sri Siththi Vinayagar Maha Vidyalayam', type: 'Type 2', grades: '1-11', medium: ['Tamil'] },
          { id: 'np-jaf-013', name: 'Pungudutivu Sri Subramania mahalir M.V.', type: 'Type 2', grades: '1-11', medium: ['Tamil'] }
        ]
      },
      {
        code: 'KIL',
        name: { en: 'Kilinochchi', si: 'කිලිනොච්චිය', ta: 'கிளிநொச்சி' },
        schools: [
          { id: 'np-kil-001', name: 'Kilinochchi Central College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-kil-002', name: 'Poonakary Maha Vidyalayam', type: '1C', grades: '1-13', medium: ['Tamil'] }
        ]
      },
      {
        code: 'MAN',
        name: { en: 'Mannar', si: 'මන්නාරම', ta: 'மன்னார்' },
        schools: [
          { id: 'np-man-001', name: 'St. Sebastian\'s College Mannar', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-man-002', name: 'Mannar Central College', type: '1C', grades: '1-13', medium: ['Tamil'] },
          { id: 'np-man-003', name: 'Mannar St. Xaviers Boys College', type: '1AB', grades: '1-13', medium: ['Tamil', 'English'] },
          { id: 'np-man-004', name: 'Mannar St. Xavier\'s Girls\' College', type: '1AB', grades: '1-13', medium: ['Tamil', 'English'] }
        ]
      }
    ]
  },

  // ==================== EASTERN PROVINCE ====================
  EP: {
    districts: [
      {
        code: 'TRI',
        name: { en: 'Trincomalee', si: 'ත්‍රිකුණාමලය', ta: 'திருகோணமலை' },
        schools: [
          { id: 'ep-tri-001', name: 'Trincomalee Hindu College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-tri-002', name: 'St. Joseph\'s College Trincomalee', type: '1AB', grades: '1-13', medium: ['Tamil', 'English'] },
          { id: 'ep-tri-003', name: 'Koneswara Hindu Ladies College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-tri-004', name: 'Trincomalee Central College', type: '1C', grades: '1-13', medium: ['Sinhala', 'Tamil'] },
          { id: 'ep-tri-005', name: 'Trincomalee Sinhala Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-tri-006', name: 'St. Mary\'s College, Trincomalee', type: '1AB', grades: '1-13', medium: ['Tamil', 'English'] },
          { id: 'ep-tri-007', name: 'Sri Shanmuga Hindu Ladies College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-tri-008', name: 'R. K. M. Sri Koneswara Hindu College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-tri-009', name: 'Agrabodhi National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-tri-010', name: 'Kinniya Central College', type: '1AB', grades: '1-13', medium: ['Tamil'] }
        ]
      },
      {
        code: 'BAT',
        name: { en: 'Batticaloa', si: 'මඩකලපුව', ta: 'மட்டக்களப்பு' },
        schools: [
          { id: 'ep-bat-001', name: 'St. Michael\'s College Batticaloa', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-bat-002', name: 'Hindu Ladies College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-bat-003', name: 'Batticaloa Central College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-bat-004', name: 'Eravur Tamil Maha Vidyalayam', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-bat-005', name: 'Eravur Vipulananda Vidyalayam', type: 'Type 2', grades: '1-11', medium: ['Tamil'] },
          { id: 'ep-bat-006', name: 'Iyankerny Tamil Vidyalayam', type: '1C', grades: '1-13', medium: ['Tamil'] }
        ]
      },
      {
        code: 'AMP',
        name: { en: 'Ampara', si: 'අම්පාර', ta: 'அம்பாறை' },
        schools: [
          { id: 'ep-amp-001', name: 'Ampara Central College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'Tamil'] },
          { id: 'ep-amp-002', name: 'Zahira College Ampara', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-amp-003', name: 'Kalmunai Muslim Ladies College', type: '1C', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-amp-004', name: 'D.S Senanayaka National College', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-amp-005', name: 'Bandaranayake Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-amp-006', name: 'Uhana Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-amp-007', name: 'Akkaraipattu Muslim Central College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-amp-008', name: 'Dehiattakandiya Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ep-amp-009', name: 'Carmel Fatima College', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'ep-amp-010', name: 'Al Ashraq National School', type: 'National', grades: '6-13', medium: ['Tamil'] },
          { id: 'ep-amp-011', name: 'Zahira College, Kalmunai', type: '1AB', grades: '6-13', medium: ['Tamil'] },
          { id: 'ep-amp-012', name: 'Padiyathalawa National School', type: 'National', grades: '6-13', medium: ['Sinhala'] },
          { id: 'ep-amp-013', name: 'Sammanturai Muslim Madya Maha Vidyalaya', type: '1AB', grades: '6-13', medium: ['Tamil'] },
          { id: 'ep-amp-014', name: 'Thambiluvil Central College', type: '1AB', grades: '6-13', medium: ['Tamil'] }
        ]
      }
    ]
  },

  // ==================== NORTH WESTERN PROVINCE ====================
  NWP: {
    districts: [
      {
        code: 'KUR',
        name: { en: 'Kurunegala', si: 'කුරුණෑගල', ta: 'குருநாகல்' },
        schools: [
          { id: 'nwp-kur-001', name: 'Maliyadeva College Kurunegala', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-002', name: 'Ibbagamuwa Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-003', name: 'Kurunegala Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-004', name: 'St. Anne\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'nwp-kur-005', name: 'Maliyadeva Girls\' College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-006', name: 'Mawatagama Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-007', name: 'Paragahadeniya National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-008', name: 'Parakramabahu Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-009', name: 'Kuliyapitiya Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-010', name: 'Saranath College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-011', name: 'Mayurapada Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-012', name: 'Alawwa Rathanalankara M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-013', name: 'Al-Hijra M.K.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'nwp-kur-014', name: 'Boyawalana M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-015', name: 'Burussegoda K.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'nwp-kur-016', name: 'Dambadeniya M.M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-017', name: 'Galdeniya K.V', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'nwp-kur-018', name: 'Galgamuwa M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-019', name: 'Kadahapola M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'nwp-kur-020', name: 'Kalundawa Saranankara M.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'nwp-kur-021', name: 'Kandegedara M.V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'PUT',
        name: { en: 'Puttalam', si: 'පුත්තලම', ta: 'புத்தளம்' },
        schools: [
          { id: 'nwp-put-001', name: 'Maris Stella College', type: '1AB', grades: '1-13', medium: ['Tamil', 'Sinhala'] },
          { id: 'nwp-put-002', name: 'Puttalam Central College', type: '1C', grades: '1-13', medium: ['Sinhala'] }
        ]
      }
    ]
  },

  // ==================== NORTH CENTRAL PROVINCE ====================
  NCP: {
    districts: [
      {
        code: 'ANU',
        name: { en: 'Anuradhapura', si: 'අනුරාධපුරය', ta: 'அனுராதபுரம்' },
        schools: [
          { id: 'ncp-anu-001', name: 'Ananda College Anuradhapura', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-002', name: 'Rajarata Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-003', name: 'Rajarata Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-004', name: 'Anuradhapura Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-005', name: 'Swarnapali Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-006', name: 'Zahira College (National School)', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'ncp-anu-007', name: 'Maithripala Senanayake Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-008', name: 'Kekirawa Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-009', name: 'Thambuththegama Madya Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-010', name: 'Sri Siddhartha Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-011', name: 'St Joseph\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'ncp-anu-012', name: 'Walisinghe Harishchandra Maha Vidyalaya', type: '1AB', grades: '6-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-013', name: 'Niwaththaka Chethiya Maha Vidyalaya', type: '1AB', grades: '6-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-014', name: 'Ethdathkalla Rahula Vidyalaya', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'ncp-anu-015', name: 'Sri Wimalgana Maha Vidyalaya', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-016', name: 'Thambiyawa Daramapala Vidyalaya', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-017', name: 'Billewa Vidyalaya', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'ncp-anu-018', name: 'Mahawilachchiya Siddartha Vidyalaya', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-019', name: 'Saliyamala Vidyalaya', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-020', name: 'Thakshila Maha Vidyalaya', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-anu-021', name: 'Gamini Vidyalaya', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'ncp-anu-022', name: 'Oyamaduwa Vidyalaya', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'ncp-anu-023', name: 'Dunumadalawa Vidyalaya', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'POL',
        name: { en: 'Polonnaruwa', si: 'පොළොන්නරුව', ta: 'பொலன்னறுவை' },
        schools: [
          { id: 'ncp-pol-001', name: 'Polonnaruwa Royal College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'ncp-pol-002', name: 'Vijayaba Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] }
        ]
      }
    ]
  },

  // ==================== UVA PROVINCE ====================
  UP: {
    districts: [
      {
        code: 'BAD',
        name: { en: 'Badulla', si: 'බදුල්ල', ta: 'பதுளை' },
        schools: [
          { id: 'up-bad-001', name: 'Badulla Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-002', name: 'Uva Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-003', name: 'St. Thomas\' College Bandarawela', type: '1AB', grades: '1-13', medium: ['English', 'Sinhala'] },
          { id: 'up-bad-004', name: 'Dharmadutha College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-005', name: 'Vishaka Girls High School', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-006', name: 'Uva College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-007', name: 'Hali Ela Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-008', name: 'Bandarawela Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-009', name: 'St. Joseph\'s College, Bandarawela', type: '1AB', grades: '1-13', medium: ['English', 'Sinhala'] },
          { id: 'up-bad-010', name: 'Mahiyangana National School', type: 'National', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-011', name: 'Passara Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-012', name: 'Welimada Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-013', name: 'Al-Adhan Maha Vidyalaya', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'up-bad-014', name: 'Al-Irshad M.V', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-015', name: 'Ambewela M.V', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'up-bad-016', name: 'Badulla Sujatha Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-017', name: 'Badulla Tamil Girl\'s Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Tamil'] },
          { id: 'up-bad-018', name: 'Badulla Uva Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-019', name: 'Badulla Viharamahadevi Balika Maha Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-020', name: 'Beddegama M.V', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-bad-021', name: 'Bharathy Maha Vidyalaya', type: '1C', grades: '6-13', medium: ['Tamil'] },
          { id: 'up-bad-022', name: 'Bogoda M.V', type: '1C', grades: '1-13', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'MON',
        name: { en: 'Monaragala', si: 'මොණරාගල', ta: 'மொனராகலை' },
        schools: [
          { id: 'up-mon-001', name: 'President\'s College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'up-mon-002', name: 'Monaragala Central College', type: '1C', grades: '1-13', medium: ['Sinhala'] }
        ]
      }
    ]
  },

  // ==================== SABARAGAMUWA PROVINCE ====================
  SGP: {
    districts: [
      {
        code: 'RAT',
        name: { en: 'Ratnapura', si: 'රත්නපුර', ta: 'இரத்தினபுரி' },
        schools: [
          { id: 'sgp-rat-001', name: 'Dharmasoka College Ambalangoda', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-002', name: 'Ratnapura Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-003', name: 'Eheliyagoda Central College', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-004', name: 'Balangoda Ananda Maithriya M.M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-005', name: 'Balangoda Kanaganayagam Tamil M.V.', type: '1C', grades: '6-13', medium: ['Tamil'] },
          { id: 'sgp-rat-006', name: 'Balangoda Sri Buddha Jayanthi M.M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-007', name: 'Balangoda Vidyaloka M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-008', name: 'Bowaththa V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sgp-rat-009', name: 'Bulathgama V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sgp-rat-010', name: 'C.C.Tamil M.V.', type: '1C', grades: '1-13', medium: ['Tamil'] },
          { id: 'sgp-rat-011', name: 'Damahana M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-012', name: 'Dehigastalawa Jailani Mus M.V.', type: '1C', grades: '6-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-013', name: 'Diyavinna V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sgp-rat-014', name: 'Egoda Waleboda V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] },
          { id: 'sgp-rat-015', name: 'Ellepola M.V.', type: '1C', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-rat-016', name: 'Gawaranhena V.', type: 'Type 2', grades: '1-11', medium: ['Sinhala'] }
        ]
      },
      {
        code: 'KEG',
        name: { en: 'Kegalle', si: 'කෑගල්ල', ta: 'கேகாலை' },
        schools: [
          { id: 'sgp-keg-001', name: 'Kegalle Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-002', name: 'Dharmaraja College Kegalle', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-003', name: 'Kegalu Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-004', name: 'Kegalu Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-005', name: 'St. Joseph\'s Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sgp-keg-006', name: 'St. Mary\'s College, Kegalle', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
          { id: 'sgp-keg-007', name: 'Dehiowita National School', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-008', name: 'Mayurapada Central College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
          { id: 'sgp-keg-009', name: 'Zahira College, Mawanella', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] }
        ]
      }
    ]
  }
};

// Helper function to get all schools as a flat array
export const getAllSchools = () => {
  const allSchools = [];
  Object.keys(SL_SCHOOLS_BY_PROVINCE).forEach(provinceCode => {
    const province = SL_SCHOOLS_BY_PROVINCE[provinceCode];
    province.districts.forEach(district => {
      district.schools.forEach(school => {
        allSchools.push({
          ...school,
          district: district.name.en,
          districtCode: district.code,
          province: SL_PROVINCES.find(p => p.code === provinceCode).name.en,
          provinceCode: provinceCode
        });
      });
    });
  });
  return allSchools;
};

// Helper function to get districts by province
export const getDistrictsByProvince = (provinceCode) => {
  return SL_SCHOOLS_BY_PROVINCE[provinceCode]?.districts || [];
};

// Helper function to get schools by district
export const getSchoolsByDistrict = (provinceCode, districtCode) => {
  const province = SL_SCHOOLS_BY_PROVINCE[provinceCode];
  if (!province) return [];
  
  const district = province.districts.find(d => d.code === districtCode);
  return district?.schools || [];
};

// Helper function to search schools
export const searchSchools = (searchTerm) => {
  const allSchools = getAllSchools();
  const term = searchTerm.toLowerCase();
  return allSchools.filter(school => 
    school.name.toLowerCase().includes(term) ||
    school.district.toLowerCase().includes(term) ||
    school.province.toLowerCase().includes(term)
  );
};

// School type descriptions
export const SCHOOL_TYPES = {
  'National': 'National School - Top tier schools with excellent facilities',
  '1AB': 'Type 1AB - Schools with GCE A/L science stream',
  '1C': 'Type 1C - Schools with GCE A/L arts stream',
  'Private': 'Private International School'
};

// Statistics
export const SCHOOL_STATS = {
  totalSchools: getAllSchools().length,
  totalProvinces: SL_PROVINCES.length,
  totalDistricts: Object.values(SL_SCHOOLS_BY_PROVINCE).reduce((sum, p) => sum + p.districts.length, 0),
  nationalSchools: getAllSchools().filter(s => s.type === 'National').length,
  type1ABSchools: getAllSchools().filter(s => s.type === '1AB').length
};
