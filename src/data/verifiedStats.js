// VERIFIED STATISTICS - All data accurate for Sri Lankan context
// Sources: NARA, Department of Wildlife Conservation, Survey Department

export const VERIFIED_SL_STATS = {
  // Marine (Source: NARA, Marine Environment Protection Authority)
  marine: {
    totalSpecies: '3,300+', // Total recorded marine species
    fish: '1,200+', // Marine fish species
    coral: '183', // Coral species
    mammals: '26', // Whales & dolphins
    seaTurtles: '5', // All 5 species found here
    display: '3,300+' // For UI display
  },
  
  // Coastline (Source: Survey Department of Sri Lanka)
  coastline: {
    length: '1,585', // km - Total coastline
    display: '1,585 km'
  },
  
  // Ancient Irrigation (Source: Archaeological Dept, Irrigation Dept)
  waterHeritage: {
    totalTanks: '30,000+', // Ancient irrigation tanks
    majorTanks: '330', // Major ancient tanks
    villageTanks: '10,000+', // Village tanks
    oldest: '300 BCE', // Earliest evidence
    display: '30,000+'
  },
  
  // Freshwater
  freshwater: {
    rivers: '103',
    majorRivers: '16',
    wetlands: '40+',
    display: '103 Rivers'
  },
  
  // Protected Areas
  protected: {
    marineParks: '3', // Bar Reef, Pigeon Island, Hikkaduwa
    sanctuaries: '7',
    naraStations: '7'
  },
  
  // Education (realistic for school app)
  education: {
    targetSchools: '10,000+', // Schools in Sri Lanka
    potentialStudents: '4+ million', // All school students
    gamesAvailable: '12', // Actual games in the app
    lessonsCount: '100+', // Educational content items
    display: {
      students: '4M+', // For stats display
      schools: '10K+',
      games: '12'
    }
  }
};

// For Home Page Hero Section - ACCURATE DATA
export const HERO_STATS = [
  { 
    icon: '🐠', 
    value: '3,300+', 
    label: 'Marine Species',
    link: '/marine-life',
    description: 'Explore Sri Lankan marine biodiversity'
  },
  { 
    icon: '🏛️', 
    value: '30,000+', 
    label: 'Ancient Water Tanks',
    link: '/water-heritage',
    description: 'Discover ancient irrigation systems'
  },
  { 
    icon: '🎮', 
    value: '12', 
    label: 'Educational Games',
    link: '/games',
    description: 'Learn through interactive games'
  },
  { 
    icon: '👨‍🎓', 
    value: '4M+', 
    label: 'Target Students',
    link: '/register',
    description: 'Join our learning community'
  }
];
