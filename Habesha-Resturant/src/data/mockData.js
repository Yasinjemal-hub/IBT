// Mock data for Habesha Restaurant App
import doroWatImg from '../assets/images/doro_wat.png';
import royalPlatterImg from '../assets/images/royal_platter.png';
import tibsImg from '../assets/images/tibs.png';
import kitfoImg from '../assets/images/kitfo.png';
import shiroImg from '../assets/images/shiro.png';
import mesobFeastImg from '../assets/images/mesob_feast.png';

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'special', label: 'Special' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'combo', label: 'Combo' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'desserts', label: 'Desserts' },
];

export const spiceLevels = [
  { id: 'mild', label: 'Mild (1/5)', emoji: '🌶️', level: 1 },
  { id: 'traditional', label: 'Traditional (3/5)', emoji: '🌶️🌶️🌶️', level: 3, popular: true },
  { id: 'fiery', label: 'Fiery Awaze (5/5)', emoji: '🔥🌶️🌶️🌶️🌶️🌶️', level: 5 },
];

export const dishes = [
  {
    id: 1,
    name: 'Royal Doro Wat',
    nameAmharic: 'ዶሮ ወጥ',
    price: 650,
    originalPrice: null,
    rating: 4.9,
    reviews: 128,
    category: 'special',
    badge: "CHEF'S SPECIAL TODAY",
    badgeColor: '#D4380D',
    image: doroWatImg,
    description: 'Tender slow-braised free-range chicken drumstick and egg sit atop with berbere & fit-fit injera, butter, with a bed of caramelized onions & rich flavors. Served warm on fresh spongy soft injera.',
    featured: true,
    tags: ['Halal', 'Gluten-Free Option'],
    prepTime: '45 min',
    serves: '1-2',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
          { name: 'Standard Teff & Barley Blend', icon: '🌾' },
        ],
      },
      sideAccents: [
        'Fresh Ayib Curd Cheese',
        'Habesha Gomme Cheese',
        'Stewed Gomen Greens',
      ],
      extras: [
        'Extra Browned Eggs',
        'Extra Drumsticks',
      ],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
      { name: 'Timkatim Fitfit', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 2,
    name: 'Mesob Meat Combo',
    nameAmharic: 'ስጋ ኮምቦ',
    price: 950,
    originalPrice: null,
    rating: 4.8,
    reviews: 96,
    category: 'combo',
    badge: null,
    image: tibsImg,
    description: 'A generous assortment of premium Ethiopian meat dishes including siga tibs, kitfo, and zilzil tibs served on a grand mesob platter with fresh injera.',
    featured: true,
    tags: ['Halal'],
    prepTime: '35 min',
    serves: '2-3',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Ayib Curd Cheese', 'Stewed Gomen Greens'],
      extras: ['Extra Tibs Portion'],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 3,
    name: 'Special Fasting Beyaynetu',
    nameAmharic: 'የፆም በያይነቱ',
    price: 480,
    originalPrice: null,
    rating: 4.7,
    reviews: 74,
    category: 'vegetarian',
    badge: 'FASTING SPECIAL',
    badgeColor: '#389E0D',
    image: shiroImg,
    description: 'A colorful spread of fasting dishes including misir wot, shiro, gomen, tikil gomen, and azifa served on fresh injera — perfect for vegan lovers.',
    featured: true,
    tags: ['Vegan', 'Gluten-Free Option'],
    prepTime: '30 min',
    serves: '1-2',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Salad', 'Azifa Lentil Salad'],
      extras: ['Extra Shiro Portion'],
    },
    pairings: [
      { name: 'Fresh Juice Combo', type: 'Beverage Pairings' },
    ],
  },
  {
    id: 4,
    name: 'Sizzling Shekla Tibs',
    nameAmharic: 'ሸክላ ጥብስ',
    price: 720,
    originalPrice: null,
    rating: 4.9,
    reviews: 112,
    category: 'special',
    badge: null,
    image: tibsImg,
    description: 'Premium cubed beef sizzled on a traditional clay plate with rosemary, jalapeños, onions and tomatoes. Served dramatically at your table.',
    featured: true,
    tags: ['Halal'],
    prepTime: '25 min',
    serves: '1-2',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Ayib Curd Cheese', 'Awaze Dip'],
      extras: ['Extra Meat Portion'],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 5,
    name: 'Royal Food Platter',
    nameAmharic: 'ንጉሣዊ ምግብ',
    price: 1200,
    originalPrice: null,
    rating: 5.0,
    reviews: 45,
    category: 'special',
    badge: 'SPECIAL SELECTION',
    badgeColor: '#D4380D',
    image: royalPlatterImg,
    description: 'A majestic platter featuring our finest meat and vegetarian selections, elegantly arranged on a grand injera base — perfect for sharing and experiencing Ethiopian communal dining.',
    featured: false,
    tags: ['Halal', 'Reserve for Table'],
    prepTime: '60 min',
    serves: '4-6',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Ayib Curd Cheese', 'Habesha Gomme Cheese', 'Stewed Gomen Greens'],
      extras: ['Extra Injera', 'Extra Tibs'],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
      { name: 'Timkatim Fitfit', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 6,
    name: 'Classic Kitfo',
    nameAmharic: 'ክትፎ',
    price: 580,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    category: 'special',
    badge: null,
    image: kitfoImg,
    description: 'Finely minced prime beef seasoned with mitmita spice and niter kibbeh herb butter. Served leb leb (lightly cooked) with fresh kocho and gomen.',
    featured: false,
    tags: ['Halal'],
    prepTime: '20 min',
    serves: '1',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Ayib Curd Cheese', 'Kocho'],
      extras: ['Extra Kitfo Portion'],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 7,
    name: 'The Grand Mesob Feast',
    nameAmharic: 'ታላቅ ምሶብ',
    price: 1800,
    originalPrice: 2000,
    rating: 5.0,
    reviews: 32,
    category: 'combo',
    badge: 'SPECIAL SELECTION',
    badgeColor: '#CF1322',
    image: mesobFeastImg,
    description: 'A royal communal spread featuring premium cuts, heritage spices, organic injera, and seasonal vegetables — designed for an unforgettable shared experience.',
    featured: false,
    tags: ['Halal', 'Reserve for Table'],
    prepTime: '90 min',
    serves: '6-8',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Ayib Curd Cheese', 'Habesha Gomme Cheese', 'Stewed Gomen Greens', 'Azifa Salad'],
      extras: ['Extra Injera', 'Extra Tibs', 'Extra Doro Wat'],
    },
    pairings: [
      { name: 'House Berele Tej', type: 'Traditional Pairings' },
      { name: 'Ethiopian Coffee Ceremony', type: 'Traditional Pairings' },
    ],
  },
  {
    id: 8,
    name: 'Shiro Wot',
    nameAmharic: 'ሽሮ ወጥ',
    price: 350,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    category: 'vegetarian',
    badge: null,
    image: shiroImg,
    description: 'Smooth and creamy chickpea flour stew simmered in berbere spice blend with garlic and ginger. A beloved Ethiopian comfort food.',
    featured: false,
    tags: ['Vegan', 'Gluten-Free'],
    prepTime: '25 min',
    serves: '1',
    ingredients: {
      base: {
        title: 'Traditional Injera Base',
        items: [
          { name: '100% Pure Organic Brown Teff', icon: '🌾' },
        ],
      },
      sideAccents: ['Fresh Salad'],
      extras: ['Extra Shiro'],
    },
    pairings: [
      { name: 'Fresh Juice', type: 'Beverage Pairings' },
    ],
  },
];

export const diningEtiquette = [
  {
    title: 'Dining Etiquette & Hospitality',
    items: [
      'Traditional Handwash Basin & Water Served (Ereg)',
      'Use Only Newest Fresh Communal Injera'
    ]
  },
  {
    title: 'Service & Table Protocol',
    items: [
      'No Cutlery Needed: Enjoy gursha (hand-fed bites)',
      'Share from the communal plate — It\'s tradition!'
    ]
  }
];

export const paymentMethods = [
  { id: 'telebirr', name: 'Telebirr', icon: '📱', color: '#0099FF' },
  { id: 'cbe', name: 'CBE', icon: '🏦', color: '#7B2D8E' },
  { id: 'cash', name: 'Cash / Wireless POS', icon: '💵', color: '#389E0D' },
  { id: 'amole', name: 'Amole / AwashBirr', icon: '💳', color: '#F5A623' },
];

export const deliveryZones = [
  { id: 'bole', name: 'Bole', fee: 60 },
  { id: 'megenagna', name: 'Megenagna', fee: 80 },
  { id: 'kazanchis', name: 'Kazanchis', fee: 50 },
  { id: 'piassa', name: 'Piassa', fee: 100 },
  { id: '4kilo', name: '4 Kilo', fee: 70 },
  { id: '6kilo', name: '6 Kilo', fee: 90 },
  { id: 'mexico', name: 'Mexico', fee: 75 },
  { id: 'sarbet', name: 'Sarbet', fee: 85 },
];

export const promoCodes = {
  'HABESHA20': { discount: 200, type: 'fixed', description: 'ETB 200 off' },
  'MESOB10': { discount: 10, type: 'percent', description: '10% off' },
  'FIRST50': { discount: 50, type: 'fixed', description: 'ETB 50 off first order' },
};
