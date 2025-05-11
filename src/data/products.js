/**
 * Product Data
 * Structure:
 *  id: Unique identifier (number)
 *  name: Product name (string)
 *  price: Calculated price (number)
 *  imageUrl: URL of the product image (string)
 *  description: Product description (string)
 *  category: Product category (string, e.g., 'Apparel', 'Accessories')
 *  sizes: Array of available sizes (array of strings)
 *  fabric: Fabric description (string, optional)
 *  pattern: Pattern description (string, optional)
 *  color: Color description (string, optional)
 *  fit_shape: Fit/Shape description (string, optional)
 *  rating: Product rating (string, optional)
 *  ratings_count: Number of ratings (string, optional)
 *  reviews_count: Number of reviews (string, optional)
 *  free_delivery: Boolean indicator (boolean, optional)
 */

// Function to parse price string (e.g., "₹304") and return a number
const parsePrice = (priceStr) => {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  const numStr = priceStr.replace(/[^\d.-]/g, ''); // Remove non-digit characters except dots/hyphens
  return parseFloat(numStr) || 0;
};

// Function to calculate the new price: add 100, then round down to nearest xx99
const calculateNewPrice = (originalPrice) => {
  const parsedPrice = parsePrice(originalPrice);
  if (parsedPrice === 0) return 99; // Default price if parsing fails
  const increasedPrice = parsedPrice + 100;
  const roundedDown = Math.floor(increasedPrice / 100) * 100 - 1;
  return roundedDown < 0 ? 99 : roundedDown; // Ensure price is at least 99
};

// Raw data provided by the user (LATEST VERSION)
const newData = [
  {
    "name": "Stylish Shirt for Your Little One | Kid's Popcorn Fabric Short Sleeve Boys Shirt",
    "price": "₹304",
    "rating": "4.2",
    "ratings_count": "2094",
    "reviews_count": "825",
    "free_delivery": true,
    "sizes": ["1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years", "5-6 Years", "6-7 Years", "7-8 Years", "8-9 Years", "9-10 Years", "10-11 Years", "11-12 Years", "12-13 Years", "13-14 Years", "14-15 Years", "15-16 Years"],
    "fabric": "Cotton Blend",
    "sleeve_length": "Short Sleeves",
    "pattern": "Solid",
    "image": "https://images.meesho.com/images/products/385781371/p9wh5_512.webp"
  },
  {
    "name": "Popcorn Stylish Shirts For Mens And Female",
    "price": "₹211",
    "rating": "4.0",
    "ratings_count": "9931",
    "reviews_count": "3649",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "White",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/393509974/jvfdm_512.webp"
  },
  {
    "name": "Round Neck Solid 100% Cotton T-Shirt for Men",
    "price": "₹272",
    "rating": "3.6",
    "ratings_count": "419",
    "reviews_count": "192",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Blue",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/438484172/fh6kr_512.webp"
  },
  {
    "name": "KSHS Men's Drop-Shoulder Tshirt, Graphic Printed Tshirt For Men",
    "price": "₹266",
    "rating": "3.8",
    "ratings_count": "1457",
    "reviews_count": "452",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton Blend",
    "color": "White",
    "fit_shape": "Regular",
    "pattern": "Graphic",
    "image": "https://images.meesho.com/images/products/478196642/am9cs_512.webp"
  },
  {
    "name": "KSHS Men Cotton Oversize Tshirts New Stylish Oversized Tshirt for Men",
    "price": "₹273",
    "rating": "3.7",
    "ratings_count": "167",
    "reviews_count": "62",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton Blend",
    "color": "Black",
    "fit_shape": "Regular",
    "pattern": "Solid",
    "image": "https://images.meesho.com/images/products/478467573/ni9ys_512.webp"
  },
  {
    "name": "Graphic Printed T-Shirt For Men, Cotton T-shirt For Men",
    "price": "₹282",
    "rating": "3.9",
    "ratings_count": "14",
    "reviews_count": "6",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton Blend",
    "color": "Blue",
    "fit_shape": "Regular",
    "pattern": "Graphic",
    "image": "https://images.meesho.com/images/products/500701863/a1nzs_512.webp"
  },
  {
    "name": "Oversize Printed T-Shirts For Mens And Boys",
    "price": "₹186",
    "rating": "3.8",
    "ratings_count": "1702",
    "reviews_count": "700",
    "free_delivery": true,
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Purple",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/424084242/jrkcj_512.webp"
  },
  {
    "name": "Oversize Printed T-Shirts For Mens And Boys",
    "price": "₹222",
    "rating": "3.9",
    "ratings_count": "94",
    "reviews_count": "40",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Purple",
    "fit_shape": "Oversize",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/417020195/mwps3_512.webp"
  },
  {
    "name": "Oversize Printed T-Shirts For Mens And Boys",
    "price": "₹255",
    "rating": "3.8",
    "ratings_count": "17,733",
    "reviews_count": "355",
    "free_delivery": true,
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Black",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/443808824/f9st2_512.webp"
  },
  {
    "name": "Oversize Printed T-Shirts For Mens And Boys",
    "price": "₹233",
    "rating": "3.9",
    "ratings_count": "94",
    "reviews_count": "40",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Purple",
    "fit_shape": "Oversize",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/443808824/f9st2_512.webp"
  },
  {
    "name": "Oversize Printed T-Shirts For Mens And Boys",
    "price": "₹222",
    "rating": "4.0",
    "ratings_count": "1700",
    "reviews_count": "800",
    "free_delivery": true,
    "sizes": ["M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Black",
    "fit_shape": "Oversize",
    "pattern": "Solid",
    "image": "https://images.meesho.com/images/products/444430072/xx11g_512.webp"
  },
  {
    "name": "Stylish Printed Men's T-shirt For Casual Wear",
    "price": "₹178",
    "rating": "3.7",
    "ratings_count": "100",
    "reviews_count": "40",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL"],
    "fabric": "Cotton",
    "color": "White",
    "fit_shape": "Regular",
    "pattern": "Graphic",
    "image": "https://images.meesho.com/images/products/377604613/29hqn_512.webp"
  },
  {
    "name": "Men's Cotton Printed T-Shirt for Casual Wear",
    "price": "₹189",
    "rating": "4.2",
    "ratings_count": "850",
    "reviews_count": "350",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Black",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/443292848/qahuw_512.webp"
  },
  {
    "name": "Classic Oversize Printed T-Shirt for Men",
    "price": "₹295",
    "rating": "4.3",
    "ratings_count": "1200",
    "reviews_count": "550",
    "free_delivery": true,
    "sizes": ["M", "L", "XL"],
    "fabric": "Cotton",
    "color": "Purple",
    "fit_shape": "Oversize",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/445338254/owxgz_512.webp"
  },
  {
    "name": "Casual Printed Men T-Shirt for All Occasions",
    "price": "₹250",
    "rating": "3.9",
    "ratings_count": "2000",
    "reviews_count": "800",
    "free_delivery": true,
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "fabric": "Cotton",
    "color": "Green",
    "fit_shape": "Regular",
    "pattern": "Printed",
    "image": "https://images.meesho.com/images/products/455208115/pklna_512.webp"
  },
  {
    "name": "SANK Magic Book (4 Book + 10 Refill + 1 Pen +1 Grip), Practice Copybook, Number Tracing Book for Preschoolers with Pen, Caligraphy Book Set with Writing Refill",
    "price": "₹62",
    "rating": "4.1",
    "ratings_count": "5982",
    "reviews_count": "1571",
    "free_delivery": false,
    "sizes": ["Free Size"],
    "category": "Books",
    "description": "Practice Copybook, Number Tracing Book for Preschoolers with Pen, Caligraphy Book Set. Includes: 4 Books + 1 Pen + 10 Refill + 1 Grip. Reusable. Ink fades in 10 minutes. Use only given Refill. Grooves for accurate writing skill.",
    "author": "Nutshell",
    "book_format": "Paperback",
    "brand": "Nutshell",
    "genre": "Children's & Young Adult",
    "isbn": "00",
    "language": "English",
    "pages": "11-50 Pages",
    "publish_year": "2022",
    "publisher": "Nutshell",
    "reading_age": "2 - 5 Years",
    "sub_genre": "Activity Books",
    "country_of_origin": "India",
    "image": "https://images.meesho.com/images/products/170163658/brhxz_512.webp"
  }
];

// Transform the raw data into the final product structure
const products = newData.map((item, index) => {
  return {
    id: index + 1,
    name: item.name || 'Untitled Product',
    price: calculateNewPrice(item.price),
    imageUrl: item.image || `https://via.placeholder.com/300x400.png?text=Product+${index + 1}`,
    description: `${item.pattern || 'Stylish'} ${item.fabric || 'Apparel'} - ${item.name}`,
    category: item.category || 'Apparel', // Assuming all are apparel
    sizes: item.sizes || [],
    fabric: item.fabric,
    pattern: item.pattern,
    color: item.color,
    fit_shape: item.fit_shape,
    rating: item.rating,
    ratings_count: item.ratings_count,
    reviews_count: item.reviews_count,
    free_delivery: item.free_delivery,
    // Add any other fields from item if needed
    ...(item.sleeve_length && { sleeve_length: item.sleeve_length }),
    ...(item.author && { author: item.author }),
    ...(item.book_format && { book_format: item.book_format }),
    ...(item.brand && { brand: item.brand }),
    ...(item.genre && { genre: item.genre }),
    ...(item.isbn && { isbn: item.isbn }),
    ...(item.language && { language: item.language }),
    ...(item.pages && { pages: item.pages }),
    ...(item.publish_year && { publish_year: item.publish_year }),
    ...(item.publisher && { publisher: item.publisher }),
    ...(item.reading_age && { reading_age: item.reading_age }),
    ...(item.sub_genre && { sub_genre: item.sub_genre }),
    ...(item.country_of_origin && { country_of_origin: item.country_of_origin }),
  };
});

export default products;
