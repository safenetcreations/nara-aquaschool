// Grade-Specific Marine Species Content
// Provides age-appropriate descriptions and activities for students in grades 5-10

export const GRADE_SPECIFIC_MARINE_SPECIES = {
  blueWhale: {
    id: 'blue-whale',
    scientificName: 'Balaenoptera musculus',
    category: 'mammal',
    habitat: 'Ocean',
    conservationStatus: 'Endangered',
    
    // Grade 5-6 Content (Ages 10-11)
    grade56: {
      title: 'Blue Whale - The BIGGEST Animal Ever! 🐋',
      description: "Wow! Blue whales are HUGE! They're the biggest animals that ever lived - even bigger than dinosaurs! A blue whale can be as long as 3 school buses lined up. That's about 30 meters long!",
      funFacts: [
        '🍼 A baby blue whale drinks 200 liters of milk every single day!',
        '❤️ Their heart is as big as a small car!',
        '🎵 They sing songs that can travel across the whole ocean!',
        '🎂 Blue whales can live for 80-90 years!',
        '🦐 They eat tiny shrimp called krill - up to 4 tons every day!'
      ],
      simpleInfo: {
        size: 'As long as 3 buses',
        food: 'Tiny shrimp (krill)',
        home: 'Deep ocean',
        superpower: 'Loudest animal on Earth'
      },
      activities: [
        {
          type: 'coloring',
          title: '🎨 Color Your Own Blue Whale',
          description: 'Download and color a beautiful blue whale!',
          difficulty: 'easy'
        },
        {
          type: 'size-comparison',
          title: '📏 How Big is a Blue Whale?',
          description: 'Compare whale size with things you know!',
          difficulty: 'easy'
        },
        {
          type: 'sound-game',
          title: '🔊 Hear the Whale Song',
          description: 'Listen to real blue whale sounds!',
          difficulty: 'easy'
        },
        {
          type: 'quiz',
          title: '❓ Fun Whale Quiz',
          description: 'Test what you learned!',
          difficulty: 'easy',
          questions: 5
        }
      ],
      vocabulary: [
        { word: 'mammal', meaning: 'Animals that feed milk to babies' },
        { word: 'krill', meaning: 'Tiny shrimp that whales eat' },
        { word: 'baleen', meaning: 'Special plates in whale mouth like a strainer' },
        { word: 'migrate', meaning: 'Travel long distances' }
      ]
    },
    
    // Grade 7-8 Content (Ages 12-13)
    grade78: {
      title: 'Blue Whale: Giant of the Ocean 🌊',
      description: "The blue whale (Balaenoptera musculus) is the largest animal ever known to exist on Earth. These magnificent marine mammals can grow up to 30 meters in length and weigh as much as 200 tons - that's about 33 elephants!",
      detailedInfo: {
        size: {
          length: 'Up to 30 meters (100 feet)',
          weight: 'Up to 200 tons (180,000 kg)',
          comparison: 'Heavier than the largest dinosaurs'
        },
        habitat: {
          location: 'All major oceans worldwide',
          depth: 'Surface to 500 meters',
          migration: 'Travel between cold feeding areas and warm breeding areas'
        },
        diet: {
          food: 'Krill (small shrimp-like crustaceans)',
          amount: 'Up to 4 tons per day during feeding season',
          method: 'Filter feeding using baleen plates'
        },
        reproduction: {
          gestation: '10-12 months',
          calfSize: '7 meters long at birth',
          nursing: 'Calves drink 200-300 liters of milk daily',
          frequency: 'One calf every 2-3 years'
        },
        lifespan: '80-90 years in the wild',
        threats: [
          'Ship strikes',
          'Ocean noise pollution',
          'Climate change affecting krill populations',
          'Entanglement in fishing gear'
        ]
      },
      interestingFacts: [
        'Blue whales have the largest heart of any animal - about the size of a small car',
        'Their tongue alone can weigh as much as an elephant',
        'They can communicate across entire ocean basins',
        'Despite their size, they eat some of the smallest creatures',
        'A blue whale\'s blow (breath) can reach 9 meters high'
      ],
      activities: [
        {
          type: 'food-chain',
          title: '🔗 Build a Blue Whale Food Web',
          description: 'Discover the ocean food chain from phytoplankton to blue whales',
          difficulty: 'medium'
        },
        {
          type: 'migration-map',
          title: '🗺️ Track Whale Migration',
          description: 'Follow blue whale migration patterns across oceans',
          difficulty: 'medium'
        },
        {
          type: 'adaptation-study',
          title: '🔬 Whale Adaptations',
          description: 'Learn how blue whales adapted to ocean life',
          difficulty: 'medium'
        },
        {
          type: 'quiz',
          title: '📝 Blue Whale Knowledge Test',
          description: 'Challenge yourself with detailed questions',
          difficulty: 'medium',
          questions: 10
        }
      ],
      concepts: [
        'Adaptation to marine environment',
        'Migration patterns and navigation',
        'Filter feeding mechanism',
        'Endangered species conservation',
        'Marine ecosystem balance',
        'Climate change impacts'
      ]
    },
    
    // Grade 9-10 Content (Ages 14-15) - O/L Exam Prep
    grade910: {
      title: 'Balaenoptera musculus: Marine Biology & Conservation',
      description: "Balaenoptera musculus, commonly known as the blue whale, represents the largest organism in Earth's biological history. This baleen whale exhibits remarkable physiological adaptations for efficient filter feeding and long-distance migration in pelagic marine environments.",
      academicContent: {
        taxonomy: {
          kingdom: 'Animalia',
          phylum: 'Chordata',
          class: 'Mammalia',
          order: 'Cetacea',
          suborder: 'Mysticeti (baleen whales)',
          family: 'Balaenopteridae',
          genus: 'Balaenoptera',
          species: 'B. musculus'
        },
        morphology: {
          length: '24-30 meters (females larger)',
          mass: '100,000-200,000 kg',
          coloration: 'Mottled blue-grey dorsally, lighter ventrally',
          distinguishingFeatures: [
            'U-shaped head with prominent splashguard',
            '55-88 ventral throat grooves',
            '270-395 black baleen plates per side',
            'Small dorsal fin (variable in shape)',
            'Broad, triangular flukes up to 7.6m wide'
          ]
        },
        physiology: {
          cardiovascular: {
            heartRate: '2-8 beats per minute while diving, up to 37 bpm at surface',
            heartSize: 'Approximately 400 pounds (180 kg)',
            bloodVolume: 'Over 40 liters pumped per heartbeat'
          },
          respiratory: {
            lungCapacity: '5,000 liters',
            diveDuration: 'Typically 10-20 minutes, maximum 30+ minutes',
            oxygenStorage: 'Myoglobin-rich muscles store significant oxygen'
          },
          feeding: {
            mechanism: 'Engulfment feeding with baleen filtration',
            process: 'Lunge feeding - mouth opens nearly 90°, takes in huge volume of water and prey',
            efficiency: 'Baleen plates filter out krill while water is expelled',
            consumption: '2,000-9,000 kg of krill daily during feeding season'
          }
        },
        ecology: {
          trophicLevel: 'Primary consumer (feeds on zooplankton)',
          prey: 'Primarily Antarctic krill (Euphausia superba)',
          distribution: 'All major oceans; different subspecies in different regions',
          migration: {
            pattern: 'Seasonal migration between polar feeding grounds and tropical/subtropical breeding areas',
            distance: 'Can travel thousands of kilometers',
            timing: 'Summer in polar regions for feeding, winter in warmer waters for breeding'
          },
          behavior: {
            social: 'Generally solitary or in small groups',
            communication: 'Low-frequency vocalizations (10-40 Hz)',
            diving: 'Typically 100-200m depth, can dive deeper'
          }
        },
        conservation: {
          iucnStatus: 'Endangered',
          population: {
            historical: '200,000-300,000 (pre-whaling)',
            current: '10,000-25,000 globally',
            trend: 'Slowly increasing but still vulnerable'
          },
          threats: [
            'Ship strikes - major cause of mortality',
            'Entanglement in fishing gear',
            'Ocean noise pollution affecting communication and navigation',
            'Climate change - alterations to krill distribution and abundance',
            'Ocean acidification - impacts on krill populations',
            'Habitat degradation'
          ],
          protections: [
            'CITES Appendix I - international trade banned',
            'IWC (International Whaling Commission) moratorium since 1986',
            'Marine protected areas in key habitats',
            'Ship speed restrictions in known whale areas',
            'Research and monitoring programs'
          ],
          recovery: 'Population recovering slowly; estimated 3-5% annual increase in some populations'
        }
      },
      syllabusAlignment: {
        olScience: [
          {
            unit: 'Unit 14: Biodiversity and Conservation',
            topics: [
              'Classification of organisms',
              'Endangered species',
              'Conservation strategies',
              'Human impact on ecosystems',
              'Biodiversity loss'
            ]
          },
          {
            unit: 'Unit 15: Environmental Conservation',
            topics: [
              'Ecosystem services',
              'Marine ecosystem importance',
              'Climate change impacts',
              'Sustainable management'
            ]
          }
        ],
        learningObjectives: [
          'Understand taxonomic classification of marine mammals',
          'Analyze physiological adaptations for marine life',
          'Evaluate conservation status and threats',
          'Apply ecological concepts to population dynamics',
          'Critically assess human impacts on marine ecosystems'
        ]
      },
      activities: [
        {
          type: 'research-project',
          title: '📊 Blue Whale Population Study',
          description: 'Conduct research on global blue whale populations and recovery trends',
          difficulty: 'hard',
          duration: '2 weeks',
          deliverables: ['Research paper', 'Data analysis', 'Conservation proposal']
        },
        {
          type: 'data-analysis',
          title: '📈 Analyze Whale Sighting Data',
          description: 'Work with real marine biology data to track whale movements',
          difficulty: 'hard',
          skills: ['Data interpretation', 'Graphing', 'Statistical analysis']
        },
        {
          type: 'essay',
          title: '📝 Conservation Strategy Proposal',
          description: 'Develop a comprehensive conservation plan for blue whales',
          difficulty: 'hard',
          wordCount: '1000-1500'
        },
        {
          type: 'exam-prep',
          title: '📚 O/L Practice Questions',
          description: 'Past paper questions on biodiversity and conservation',
          difficulty: 'hard',
          questions: 20
        }
      ],
      examQuestions: [
        {
          type: 'structured',
          question: 'Explain how the baleen feeding mechanism of blue whales demonstrates adaptation to their environment.',
          marks: 5,
          keywords: ['baleen plates', 'filter feeding', 'krill', 'efficiency', 'adaptation']
        },
        {
          type: 'essay',
          question: 'Discuss the major threats to blue whale populations and evaluate conservation strategies.',
          marks: 10,
          points: ['Historical whaling', 'Current threats', 'Conservation measures', 'Population recovery']
        }
      ]
    }
  },

  // Additional species will follow similar pattern...
  greenSeaTurtle: {
    id: 'green-sea-turtle',
    scientificName: 'Chelonia mydas',
    category: 'reptile',
    habitat: 'Coastal waters',
    conservationStatus: 'Endangered',
    
    grade56: {
      title: 'Green Sea Turtle - Ancient Ocean Travelers! 🐢',
      description: "Green sea turtles are amazing! They've been swimming in our oceans for over 100 million years - even before dinosaurs disappeared! They got their name from the green color of their fat, not their shell.",
      funFacts: [
        '🏊 They can hold their breath for up to 5 hours!',
        '🏖️ Female turtles return to the same beach where they were born to lay eggs',
        '🥬 Adult turtles are vegetarians - they love seagrass and algae',
        '⚡ They can swim as fast as 35 km/hour!',
        '🥚 A mother turtle can lay over 100 eggs at once!'
      ],
      simpleInfo: {
        size: 'About 1 meter long',
        food: 'Seagrass and sea algae',
        home: 'Warm ocean waters',
        superpower: 'Can navigate across entire oceans'
      }
    },
    
    grade78: {
      title: 'Green Sea Turtle: Marine Herbivore',
      description: "The green sea turtle (Chelonia mydas) is one of the largest sea turtles, named for the greenish color of its cartilage and fat. Found in tropical and subtropical waters worldwide, these magnificent reptiles play a crucial role in maintaining healthy seagrass beds and coral reefs.",
      detailedInfo: {
        size: {
          length: '1-1.2 meters',
          weight: '65-130 kg (some up to 200 kg)',
          shell: 'Oval-shaped carapace with overlapping scales'
        },
        habitat: {
          feeding: 'Coastal waters, seagrass beds, coral reefs',
          nesting: 'Tropical and subtropical beaches',
          migration: 'Travel hundreds to thousands of kilometers between feeding and nesting sites'
        },
        diet: {
          juvenile: 'Omnivorous - jellyfish, small invertebrates',
          adult: 'Herbivorous - mainly seagrass and algae',
          role: 'Help maintain seagrass health by grazing'
        },
        lifespan: '60-70 years',
        threats: [
          'Plastic pollution',
          'Beach development',
          'Fishing nets',
          'Climate change affecting nesting beaches'
        ]
      }
    },
    
    grade910: {
      title: 'Chelonia mydas: Ecology and Conservation',
      description: "Chelonia mydas, the green sea turtle, is a large marine reptile characterized by its herbivorous adult diet and complex life history involving long-distance migrations between feeding and nesting grounds.",
      academicContent: {
        taxonomy: {
          class: 'Reptilia',
          order: 'Testudines',
          family: 'Cheloniidae',
          species: 'C. mydas'
        },
        conservation: {
          iucnStatus: 'Endangered',
          threats: ['Bycatch', 'Habitat loss', 'Climate change', 'Marine debris'],
          protections: ['CITES Appendix I', 'Protected beaches', 'Fishing regulations']
        }
      },
      syllabusAlignment: {
        olScience: [
          {
            unit: 'Unit 14: Biodiversity and Conservation',
            topics: ['Reptile classification', 'Endangered species', 'Marine ecosystems']
          }
        ]
      }
    }
  }
};

// Helper function to get content by grade
export const getSpeciesContentByGrade = (speciesId, grade) => {
  const species = GRADE_SPECIFIC_MARINE_SPECIES[speciesId];
  if (!species) return null;
  
  if (grade <= 6) return { ...species, gradeContent: species.grade56 };
  if (grade <= 8) return { ...species, gradeContent: species.grade78 };
  return { ...species, gradeContent: species.grade910 };
};

// Get all species appropriate for grade
export const getAllSpeciesForGrade = (grade) => {
  return Object.keys(GRADE_SPECIFIC_MARINE_SPECIES).map(speciesId => 
    getSpeciesContentByGrade(speciesId, grade)
  );
};

export default GRADE_SPECIFIC_MARINE_SPECIES;
