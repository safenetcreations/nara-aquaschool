// Comprehensive freshwater dataset for Sri Lanka
// Sources compiled from Survey Department, Irrigation Department, Mahaweli Authority, and Ramsar Secretariat records.

export const freshwaterCategories = {
  river: { label: 'Rivers', color: '#1565c0' },
  reservoir: { label: 'Reservoirs & Dams', color: '#ef6c00' },
  lake: { label: 'Natural Lakes & Lagoons', color: '#2e7d32' },
  waterfall: { label: 'Waterfalls', color: '#6a1b9a' },
  wetland: { label: 'Wetlands & Marshes', color: '#00897b' }
};

export const freshwaterStatsSummary = [
  {
    id: 'riverBasins',
    value: 103,
    label: 'River basins draining the island',
    source: 'Survey Department of Sri Lanka'
  },
  {
    id: 'majorReservoirs',
    value: 350,
    label: 'Major reservoirs & dams in operation',
    source: 'Irrigation Department (2023)'
  },
  {
    id: 'villageTanks',
    value: 12000,
    label: 'Village irrigation tanks supporting farming communities',
    source: 'Department of Agrarian Development'
  },
  {
    id: 'ramsarSites',
    value: 6,
    label: 'Wetlands protected under the Ramsar Convention',
    source: 'Department of Wildlife Conservation'
  }
];

export const riverSystems = [
  {
    id: 'mahaweli',
    type: 'river',
    name: 'Mahaweli River',
    provinces: ['Central', 'North Central', 'Eastern', 'Uva'],
    lengthKm: 335,
    basinAreaSqKm: 10448,
    annualFlowMcm: 8340,
    description:
      "Sri Lanka's longest river delivers hydropower and irrigation water across the Mahaweli development zones.",
    notableInfrastructure: ['Victoria Dam', 'Randenigala Reservoir', 'Polgolla Barrage'],
    coordinates: { lat: 7.322, lng: 80.628 }
  },
  {
    id: 'kelani',
    type: 'river',
    name: 'Kelani River',
    provinces: ['Sabaragamuwa', 'Western'],
    lengthKm: 145,
    basinAreaSqKm: 2292,
    annualFlowMcm: 5740,
    description:
      'Primary drinking water source for Greater Colombo and a key catchment for hydropower stations.',
    notableInfrastructure: ['Laxapana Hydropower Complex', 'Kelani Right Bank Water Supply'],
    coordinates: { lat: 6.957, lng: 79.925 }
  },
  {
    id: 'kalu',
    type: 'river',
    name: 'Kalu Ganga',
    provinces: ['Sabaragamuwa', 'Western'],
    lengthKm: 129,
    basinAreaSqKm: 2719,
    annualFlowMcm: 4060,
    description:
      'Rainforest-fed river draining the Sinharaja Reserve; vital for flood regulation in Kalutara District.',
    notableInfrastructure: ['Kukule Ganga Hydropower Plant', 'Ratnapura Flood Control Scheme'],
    coordinates: { lat: 6.585, lng: 80.385 }
  },
  {
    id: 'deduroya',
    type: 'river',
    name: 'Deduru Oya',
    provinces: ['Central', 'North Western'],
    lengthKm: 142,
    basinAreaSqKm: 2616,
    annualFlowMcm: 2310,
    description:
      'Largest river in the North Western Province supporting paddy, coconut, and livestock farming.',
    notableInfrastructure: ['Deduru Oya Reservoir', 'Tidal Regulator at Chilaw'],
    coordinates: { lat: 7.559, lng: 79.795 }
  },
  {
    id: 'walawe',
    type: 'river',
    name: 'Walawe River',
    provinces: ['Central', 'Uva', 'Southern'],
    lengthKm: 138,
    basinAreaSqKm: 2442,
    annualFlowMcm: 2680,
    description:
      'Feeds Udawalawe National Park and irrigates sugarcane, rice, and vegetable farms in the south.',
    notableInfrastructure: ['Samanalawewa Reservoir', 'Udawalawe Reservoir'],
    coordinates: { lat: 6.342, lng: 80.883 }
  },
  {
    id: 'malwathu',
    type: 'river',
    name: 'Malwathu Oya',
    provinces: ['North Central', 'Northern'],
    lengthKm: 164,
    basinAreaSqKm: 3284,
    annualFlowMcm: 1180,
    description:
      'Historic river of the Anuradhapura Kingdom, connecting ancient tanks before reaching the Mannar coast.',
    notableInfrastructure: ['Nachchaduwa Wewa', 'Malwathu Oya Bridge'],
    coordinates: { lat: 8.457, lng: 80.380 }
  },
  {
    id: 'yanoya',
    type: 'river',
    name: 'Yan Oya',
    provinces: ['North Central', 'Eastern'],
    lengthKm: 142,
    basinAreaSqKm: 1520,
    annualFlowMcm: 960,
    description:
      'Dry-zone river rejuvenated through the Yan Oya reservoir project for irrigation and water security.',
    notableInfrastructure: ['Yan Oya Reservoir'],
    coordinates: { lat: 8.639, lng: 80.932 }
  },
  {
    id: 'galo',
    type: 'river',
    name: 'Gal Oya',
    provinces: ['Uva', 'Eastern'],
    lengthKm: 108,
    basinAreaSqKm: 3842,
    annualFlowMcm: 1730,
    description:
      'Feeds the Senanayake Samudraya and sustains paddy lands in the Ampara district under the Gal Oya scheme.',
    notableInfrastructure: ['Senanayake Samudraya', 'Gal Oya Left Bank Canal'],
    coordinates: { lat: 7.255, lng: 81.618 }
  },
  {
    id: 'nilwala',
    type: 'river',
    name: 'Nilwala River',
    provinces: ['Southern'],
    lengthKm: 72,
    basinAreaSqKm: 1007,
    annualFlowMcm: 1750,
    description:
      'Short, steep river draining into the Indian Ocean at Matara; noted for mangroves and flood-control bunds.',
    notableInfrastructure: ['Nilwala Flood Protection Scheme'],
    coordinates: { lat: 5.952, lng: 80.548 }
  },
  {
    id: 'mahaoya',
    type: 'river',
    name: 'Maha Oya',
    provinces: ['Western', 'North Western'],
    lengthKm: 134,
    basinAreaSqKm: 1620,
    annualFlowMcm: 1530,
    description:
      'Supplies drinking water to Gampaha District and supports sand mining, which requires strict regulation.',
    notableInfrastructure: ['Minipe Diversion', 'Maha Oya Water Supply Network'],
    coordinates: { lat: 7.239, lng: 80.081 }
  }
];

export const reservoirSystems = [
  {
    id: 'victoriaReservoir',
    type: 'reservoir',
    name: 'Victoria Reservoir',
    river: 'Mahaweli Ganga',
    capacityMcm: 722,
    surfaceAreaSqKm: 22,
    catchmentSqKm: 1890,
    yearCompleted: 1985,
    provinces: ['Central'],
    purpose: ['Hydropower', 'Irrigation'],
    description:
      'Tallest dam in Sri Lanka; produces 210 MW of hydropower and stabilises downstream irrigation seasons.',
    coordinates: { lat: 7.214, lng: 80.828 }
  },
  {
    id: 'randenigalaReservoir',
    type: 'reservoir',
    name: 'Randenigala Reservoir',
    river: 'Mahaweli Ganga',
    capacityMcm: 861,
    surfaceAreaSqKm: 26,
    catchmentSqKm: 2860,
    yearCompleted: 1986,
    provinces: ['Uva'],
    purpose: ['Hydropower', 'Irrigation', 'Flood control'],
    description:
      'Upper Mahaweli storage reservoir regulating flows to the Rantembe and Polgolla power stations.',
    coordinates: { lat: 7.206, lng: 81.056 }
  },
  {
    id: 'kotmaleReservoir',
    type: 'reservoir',
    name: 'Kotmale Reservoir',
    river: 'Kotmale Oya',
    capacityMcm: 174,
    surfaceAreaSqKm: 6,
    catchmentSqKm: 568,
    yearCompleted: 1985,
    provinces: ['Central'],
    purpose: ['Hydropower', 'Irrigation'],
    description:
      'Forms part of the Accelerated Mahaweli Project, diverting water to dry-zone command areas.',
    coordinates: { lat: 7.004, lng: 80.632 }
  },
  {
    id: 'maduruOyaReservoir',
    type: 'reservoir',
    name: 'Maduru Oya Reservoir',
    river: 'Maduru Oya',
    capacityMcm: 596,
    surfaceAreaSqKm: 24,
    catchmentSqKm: 453,
    yearCompleted: 1983,
    provinces: ['Eastern'],
    purpose: ['Irrigation', 'Water supply'],
    description:
      'Supplies Mahaweli System B; key source for paddy and cash crops in Polonnaruwa and Batticaloa districts.',
    coordinates: { lat: 7.497, lng: 81.245 }
  },
  {
    id: 'senanayakeSamudraya',
    type: 'reservoir',
    name: 'Senanayake Samudraya',
    river: 'Gal Oya',
    capacityMcm: 950,
    surfaceAreaSqKm: 91,
    catchmentSqKm: 3842,
    yearCompleted: 1953,
    provinces: ['Eastern'],
    purpose: ['Irrigation', 'Hydropower', 'Fisheries'],
    description:
      'Largest man-made lake in Sri Lanka; cornerstone of the Gal Oya development programme.',
    coordinates: { lat: 7.225, lng: 81.665 }
  },
  {
    id: 'kalawawa',
    type: 'reservoir',
    name: 'Kala Wewa',
    river: 'Kala Oya',
    capacityMcm: 123,
    surfaceAreaSqKm: 18,
    catchmentSqKm: 303,
    yearCompleted: 460,
    provinces: ['North Central'],
    purpose: ['Irrigation', 'Heritage'],
    description:
      '5th-century twin reservoir complex built by King Dhatusena, feeding the Jaya Ganga to Anuradhapura.',
    coordinates: { lat: 8.041, lng: 80.538 }
  },
  {
    id: 'parakramaSamudra',
    type: 'reservoir',
    name: 'Parakrama Samudra',
    river: 'Ambanganga Basin',
    capacityMcm: 134,
    surfaceAreaSqKm: 25,
    catchmentSqKm: 427,
    yearCompleted: 1153,
    provinces: ['North Central'],
    purpose: ['Irrigation', 'Flood control', 'Cultural heritage'],
    description:
      "Restored by King Parakramabahu I with the famed maxim, “Not even a drop of water must flow to the sea without serving the people.”",
    coordinates: { lat: 7.931, lng: 80.988 }
  },
  {
    id: 'samanalawewa',
    type: 'reservoir',
    name: 'Samanalawewa Reservoir',
    river: 'Walawe River',
    capacityMcm: 278,
    surfaceAreaSqKm: 9,
    catchmentSqKm: 352,
    yearCompleted: 1992,
    provinces: ['Sabaragamuwa'],
    purpose: ['Hydropower', 'Irrigation'],
    description:
      'Supports a 120 MW power plant and diversions to the Udawalawe irrigation command area.',
    coordinates: { lat: 6.714, lng: 80.785 }
  },
  {
    id: 'kukuleReservoir',
    type: 'reservoir',
    name: 'Kukule Ganga Reservoir',
    river: 'Kukule Ganga',
    capacityMcm: 124,
    surfaceAreaSqKm: 4,
    catchmentSqKm: 312,
    yearCompleted: 2003,
    provinces: ['Sabaragamuwa'],
    purpose: ['Hydropower'],
    description:
      'Run-of-river hydropower scheme utilising the steep drops of the Kalu Ganga basin.',
    coordinates: { lat: 6.537, lng: 80.361 }
  }
];

export const naturalLakes = [
  {
    id: 'bolgodaLake',
    type: 'lake',
    name: 'Bolgoda Lake',
    provinces: ['Western'],
    areaHectares: 3740,
    maxDepthM: 5,
    description:
      "Sri Lanka's largest natural lake and lagoon complex stretching across Colombo and Kalutara districts.",
    ecosystems: ['Mangroves', 'Brackish lagoons', 'Freshwater marshes'],
    coordinates: { lat: 6.705, lng: 79.922 }
  },
  {
    id: 'koggalaLagoon',
    type: 'lake',
    name: 'Koggala Lagoon',
    provinces: ['Southern'],
    areaHectares: 728,
    maxDepthM: 3,
    description:
      'Coastal lagoon famed for stilt fishermen and cinnamon islets connected by the Koggala Oya.',
    ecosystems: ['Seagrass beds', 'Mangroves', 'Small islands'],
    coordinates: { lat: 5.994, lng: 80.338 }
  },
  {
    id: 'maduganga',
    type: 'lake',
    name: 'Maduganga Estuary',
    provinces: ['Southern'],
    areaHectares: 915,
    maxDepthM: 8,
    description:
      'Ramsar-listed wetland complex with 15 islands supporting traditional cinnamon cultivation.',
    ecosystems: ['Freshwater marsh', 'Riparian forests'],
    coordinates: { lat: 6.297, lng: 80.031 }
  },
  {
    id: 'gregoryLake',
    type: 'lake',
    name: 'Gregory Lake',
    provinces: ['Central'],
    areaHectares: 91,
    maxDepthM: 6,
    description:
      'Highland reservoir constructed during the British era; centerpiece of Nuwara Eliya recreational zone.',
    ecosystems: ['Urban park habitat'],
    coordinates: { lat: 6.957, lng: 80.770 }
  },
  {
    id: 'kandyLake',
    type: 'lake',
    name: 'Kandy Lake',
    provinces: ['Central'],
    areaHectares: 18,
    maxDepthM: 18,
    description:
      'Man-made lake built in 1807 bordering the Temple of the Tooth; protected for its cultural and ecological value.',
    ecosystems: ['Urban wetland'],
    coordinates: { lat: 7.293, lng: 80.641 }
  },
  {
    id: 'beiraLake',
    type: 'lake',
    name: 'Beira Lake',
    provinces: ['Western'],
    areaHectares: 65,
    maxDepthM: 5,
    description:
      'Historic lake network in central Colombo, now restored with floating wetlands and public parks.',
    ecosystems: ['Urban wetland', 'Bird habitat'],
    coordinates: { lat: 6.923, lng: 79.854 }
  }
];

export const waterfalls = [
  {
    id: 'bambarakanda',
    type: 'waterfall',
    name: 'Bambarakanda Falls',
    provinces: ['Uva'],
    heightM: 263,
    river: 'Kalupahana Oya',
    description: "Sri Lanka's tallest waterfall with montane forest catchments feeding the Walawe River.",
    coordinates: { lat: 6.716, lng: 80.892 }
  },
  {
    id: 'diyaluma',
    type: 'waterfall',
    name: 'Diyaluma Falls',
    provinces: ['Uva'],
    heightM: 220,
    river: 'Punagala Oya',
    description: 'Second-highest waterfall forming natural infinity pools along the Koslanda escarpment.',
    coordinates: { lat: 6.757, lng: 81.005 }
  },
  {
    id: 'dunhinda',
    type: 'waterfall',
    name: 'Dunhinda Falls',
    provinces: ['Uva'],
    heightM: 64,
    river: 'Badulu Oya',
    description:
      'Iconic misty waterfall near Badulla where the Badulu Oya drops into a circular plunge pool.',
    coordinates: { lat: 6.989, lng: 81.056 }
  },
  {
    id: 'stClairs',
    type: 'waterfall',
    name: "St. Clair's Falls",
    provinces: ['Central'],
    heightM: 80,
    river: 'Kotmale Oya',
    description:
      'Twin cascade surrounded by tea estates; part of the Kotmale river system within the Mahaweli basin.',
    coordinates: { lat: 6.932, lng: 80.641 }
  },
  {
    id: 'ravana',
    type: 'waterfall',
    name: 'Ravana Falls',
    provinces: ['Uva'],
    heightM: 25,
    river: 'Illa Oya',
    description:
      'Waterfall linked to the Ravana legend, showcasing the rapid drop from the Ella Gap into the southern plains.',
    coordinates: { lat: 6.840, lng: 81.051 }
  }
];

export const wetlands = [
  {
    id: 'muthurajawela',
    type: 'wetland',
    name: 'Muthurajawela Marsh & Negombo Lagoon',
    provinces: ['Western'],
    areaHectares: 3069,
    designation: 'Ramsar Site (2018)',
    ecosystems: ['Mangrove', 'Salt marsh', 'Peat bog'],
    description:
      'Natural flood buffer for Colombo metropolitan region with rich mangrove biodiversity and migratory birds.',
    coordinates: { lat: 7.103, lng: 79.884 },
    translations: {
      si: {
        name: 'මුතුරාජවෙල මඩල සහ නෙගොම්බු ලැගුන',
        description:
          'කොළඹ මහ නගර ප්‍රදේශයට ගංවතුර හා කැළඹීම් වලින් ආරක්ෂාව ලබාදෙන, මැන්ග්‍රෝව් ජීව විවිධත්වයෙන් හා ගමන්කරුවන්ගෙන් පිරි මහා මඩලකි.',
        provinces: ['බස්නාහිර'],
        ecosystems: ['මැන්ග්‍රෝව්', 'ලුණු මැටි මඩල', 'පීට් තෙත් භූමිය'],
        designation: 'රාම්සාර් ස්ථානය (2018)'
      },
      ta: {
        name: 'முத்துராஜவேல சதுப்பு நிலம் & நெகோம்போ கடல்சுனை',
        description:
          'கொழும்பு மாநகரப் பகுதிக்கு வெள்ளக் கட்டுப்பாட்டை வழங்கும், பல்வகை மாந்தை வனம் மற்றும் இடம்பெயரும் பறவைகளுக்கான முக்கிய தளம்.',
        provinces: ['மேற்கு'],
        ecosystems: ['மாந்தை வனம்', 'உப்பு சதுப்பு நிலம்', 'பீட் சதுப்பு நிலம்'],
        designation: 'ராம்சார் தளம் (2018)'
      }
    }
  },
  {
    id: 'bundala',
    type: 'wetland',
    name: 'Bundala National Park',
    provinces: ['Southern'],
    areaHectares: 6216,
    designation: 'Ramsar Site (1990)',
    ecosystems: ['Lagoon', 'Salt pans', 'Dry scrub'],
    description:
      'Sri Lanka’s first Ramsar wetland; a key wintering ground for greater flamingos and migratory waterfowl.',
    coordinates: { lat: 6.176, lng: 81.218 },
    translations: {
      si: {
        name: 'බුන්දාල ජාතික උද්‍යානය',
        description:
          'ශ්‍රී ලංකාවේ පළමු රාම්සාර් තෙත් භූමිය වන මෙය, මහා රෝස හංසන් සහ ගමන්කරුවන්ට වැදගත් ශීත කාලීන ආශ්‍රයකි.',
        provinces: ['දකුණු'],
        ecosystems: ['ලාගූනය', 'ලුණු කණු', 'වියළී බුෂ් වනය'],
        designation: 'රාම්සාර් ස්ථානය (1990)'
      },
      ta: {
        name: 'புந்தலா தேசிய பூங்கா',
        description:
          'இலங்கையின் முதல் ராம்சார் ஈர நிலம்; பெரிய பெருமாள்கள் மற்றும் இடம்பெயரும் நீர்ப்பறவைகளின் முக்கிய குளிர்காலத் தங்குமிடம்.',
        provinces: ['தெற்கு'],
        ecosystems: ['கடல்சுனை', 'உப்பு களம்', 'உலர்ந்த புதர்ச் சமூகம்'],
        designation: 'ராம்சார் தளம் (1990)'
      }
    }
  },
  {
    id: 'anawilundawa',
    type: 'wetland',
    name: 'Anawilundawa Wetland Sanctuary',
    provinces: ['North Western'],
    areaHectares: 1397,
    designation: 'Ramsar Site (2001)',
    ecosystems: ['Cascade tank system', 'Freshwater marsh'],
    description:
      'Ancient cascading tank network between Chilaw and Puttalam, supporting over 150 bird species.',
    coordinates: { lat: 7.642, lng: 79.825 },
    translations: {
      si: {
        name: 'අන්නවිලුන්දාව තෙත් භූමිය',
        description:
          'චිලාව සහ පුත්තලම අතර පැරණි වැව් දාමයක් ලෙස පිහිටි මෙම ස්ථානය පක්ෂීන් 150කට වැඩි වර්ගඑක පානුකොටගෙන ඇත.',
        provinces: ['වයඹ'],
        ecosystems: ['අනුක්‍රමික වැව් පද්ධතිය', 'මිරිදිය මඩල'],
        designation: 'රාම්සාර් ස්ථානය (2001)'
      },
      ta: {
        name: 'அனவிலுண்டாவா இன்நீர் சதுப்பு நில சரணாலயம்',
        description:
          'சிலாபம் மற்றும் புத்தளம் இடையே அமைந்த பழமையான நீர்த்தேக்க தொடர், 150-க்கும் மேற்பட்ட பறவைகள் வாழ உதவுகிறது.',
        provinces: ['வடமேற்கு'],
        ecosystems: ['நீர்த்தேக்க தொடர் அமைப்பு', 'இன்நீர் சதுப்பு நிலம்'],
        designation: 'ராம்சார் தளம் (2001)'
      }
    }
  },
  {
    id: 'madhuRoad',
    type: 'wetland',
    name: 'Madhu Road Wetland',
    provinces: ['Northern'],
    areaHectares: 6623,
    designation: 'Ramsar Site (2010)',
    ecosystems: ['Grassland', 'Mangrove', 'Seasonal marsh'],
    description:
      'Part of the Vankalai Sanctuary; critical habitat for migratory birds along the Mannar coast.',
    coordinates: { lat: 8.969, lng: 79.917 },
    translations: {
      si: {
        name: 'මඩු පාර තෙත් භූමිය',
        description:
          'වංකලයි සංරක්ෂිතයේ කොටසක් වන මෙය මන්නාරම් වෙරළ රේඛාවේ ගමන්කරුවන් සඳහා අත්‍යවශ්‍ය වාසස්ථානයකි.',
        provinces: ['උතුරු'],
        ecosystems: ['හල වල්', 'මැන්ග්‍රෝව්', 'කාලීන මඩල'],
        designation: 'රාම්සාර් ස්ථානය (2010)'
      },
      ta: {
        name: 'மடு சாலை சதுப்பு நிலம்',
        description:
          'வங்கலை சரணாலயத்தின் ஒரு பகுதியாக, மன்னார் கடற்கரையில் இடம்பெயரும் பறவைகளுக்கான முக்கிய வாழிடம்.',
        provinces: ['வடக்கு'],
        ecosystems: ['புல்வெளி', 'மாந்தை வனம்', 'காலநிலை சதுப்பு நிலம்'],
        designation: 'ராம்சார் தளம் (2010)'
      }
    }
  },
  {
    id: 'madugangaWetland',
    type: 'wetland',
    name: 'Maduganga Estuary Ramsar Wetland',
    provinces: ['Southern'],
    areaHectares: 915,
    designation: 'Ramsar Site (2003)',
    ecosystems: ['Riverine mangrove', 'Island habitats'],
    description:
      'Wetland complex with high mangrove diversity; supports lagoon fisheries and eco-tourism.',
    coordinates: { lat: 6.300, lng: 80.035 },
    translations: {
      si: {
        name: 'මදු ගඟ රාම්සාර් තෙත් භූමිය',
        description:
          'ඉහළ මැන්ග්‍රෝව් විවිධත්වයක් සහිත මෙම තෙත්බිම ලාගූන් මත්ස්යවෙළදේසි හා පාරිසරික සංචාරක සේවාවන්ට වැදගත්ය.',
        provinces: ['දකුණු'],
        ecosystems: ['ගංගා අසළ මැන්ග්‍රෝව්', 'දූපත් වාසස්ථාන'],
        designation: 'රාම්සාර් ස්ථානය (2003)'
      },
      ta: {
        name: 'மடுகங்க கடல்சுனை ராம்சார் சதுப்பு நிலம்',
        description:
          'உயர் மாந்தை பல்வகைமை கொண்ட ஈர்நிலக் கூட்டமைப்பு; கடல்சுனை மீன்வளம் மற்றும் சூழலியல் τουரிசத்தை ஆதரிக்கிறது.',
        provinces: ['தெற்கு'],
        ecosystems: ['ஆற்றங்கரை மாந்தை', 'தீவு வாழிடம்'],
        designation: 'ராம்சார் தளம் (2003)'
      }
    }
  },
  {
    id: 'vankalai',
    type: 'wetland',
    name: 'Vankalai Sanctuary',
    provinces: ['Northern'],
    areaHectares: 4563,
    designation: 'Ramsar Site (2010)',
    ecosystems: ['Mudflats', 'Seagrass', 'Mangrove'],
    description:
      'Shallow coastal wetland supporting over 20,000 migratory waterbirds each year.',
    coordinates: { lat: 8.933, lng: 79.845 },
    translations: {
      si: {
        name: 'වංකලයි සංරක්ෂිතය',
        description:
          'වර්ෂයකට වරක් ජලාශ පක්ෂීන් 20,000කට අධික පිරිසක් සඳහා ආරක්ෂාව සපයන මඳ ගැඹුරු වෙරළ තෙත් භූමියකි.',
        provinces: ['උතුරු'],
        ecosystems: ['දොම්බල', 'සී ග්‍රාස්', 'මැන්ග්‍රෝව්'],
        designation: 'රාම්සාර් ස්ථානය (2010)'
      },
      ta: {
        name: 'வங்கலை சரணாலயம்',
        description:
          'ஒவ்வொரு ஆண்டும் 20,000-க்கும் மேற்பட்ட இடம்பெயரும் நீர்ப்பறவைகளுக்கு ஆதரவாக இருக்கும் ஆழமற்ற கடற்கரை ஈர்நிலம்.',
        provinces: ['வடக்கு'],
        ecosystems: ['சதுப்பு தளங்கள்', 'கடல் புல்', 'மாந்தை வனம்'],
        designation: 'ராம்சார் தளம் (2010)'
      }
    }
  }
];

export const freshwaterFeatureList = [
  ...riverSystems,
  ...reservoirSystems,
  ...naturalLakes,
  ...waterfalls,
  ...wetlands
];

const normalizeLanguage = (language) => (language || 'en').split('-')[0];

export const getLocalizedFeature = (feature, language) => {
  const langKey = normalizeLanguage(language);
  const localized = feature.translations?.[langKey];

  if (!localized) {
    return feature;
  }

  const result = { ...feature };

  Object.entries(localized).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(feature[key])) {
      result[key] = Array.isArray(value) ? value : feature[key];
      return;
    }

    result[key] = value;
  });

  return result;
};
