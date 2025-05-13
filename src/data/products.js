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
 *  mrp_price: Maximum Retail Price (string, optional)
 *  reviews: Array of reviews (array of objects, optional)
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
  const roundedDown = Math.floor(increasedPrice / 100) * 100 -1;  
  return roundedDown < parsedPrice ? parsedPrice + 99 : roundedDown; // Ensure MRP is not less than original price, make it at least original + 99
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
    "image": "https://images.meesho.com/images/products/385781371/p9wh5_512.webp",
    "reviews": [
      { "user": "Priya K.", "rating": 5, "comment": "Bahut hi sundar shirt hai! Mere bete ko perfect fit hua."}, 
      { "user": "Amit S.", "rating": 4, "comment": "Kapda acha hai, price bhi aordable."}, 
      { "user": "Sunita M.", "rating": 5, "comment": "Excellent quality, jaldi delivery ho gayi. Recommended!"}
    ]
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
    "image": "https://images.meesho.com/images/products/393509974/jvfdm_512.webp",
    "reviews": [
      { "user": "Rajesh V.", "rating": 4, "comment": "Mast shirt hai, style ekdum new."}, 
      { "user": "Sneha P.", "rating": 5, "comment": "Comfortable material, paisa vasool!"}
    ]
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
    "image": "https://images.meesho.com/images/products/438484172/fh6kr_512.webp",
    "reviews": [
      { "user": "Vikram B.", "rating": 3, "comment": "Average quality, thoda behtar ho sakta tha."}, 
      { "user": "Anita G.", "rating": 4, "comment": "Good for daily wear, rang pakka hai."}
    ]
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
    "image": "https://images.meesho.com/images/products/170163658/brhxz_512.webp",
    "reviews": [
        { "user": "Deepa R.", "rating": 5, "comment": "Bacchon ke liye bohot acchi book hai. Engaging activities!"},
        { "user": "Manoj K.", "rating": 4, "comment": "Reusable feature is great. My kid loves it."},
        { "user": "Shalini V.", "rating": 5, "comment": "Best magic book for preschoolers. Highly recommended for learning."}
    ]
  },
  {
    "name": "Super Maxx Power Saver Gold Electricity Saving Device (ISI) - Pack of 1",
    "price": "₹299", 
    "fixed_mrp_price": "₹399", 
    "offer_ends_at": new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), 
    "category": "Electronics",
    "description": "Save up to 40% on electricity bills with this ISI & NABL approved power saver. Features copper wire internals. Suitable for home, office, and factory use. Colour: Red. Connector: Male-to-Female. Length: 11cm. From Rangoli creations.",
    "image": "https://m.media-amazon.com/images/I/41-VPGBz22L.jpg",
    "rating": "2.4", 
    "ratings_count": "248", 
    "reviews_count": "N/A", 
    "free_delivery": true, 
    "sizes": ["One Size"],
    "color": "Red",
    "brand": "Rangoli creations",
    "reviews": [
      { "user": "Ravi P.", "rating": 3, "comment": "Seems to be working okay, bill will tell the real story next month."}, 
      { "user": "Geeta S.", "rating": 2, "comment": "Not sure if it's making a big difference. Installation was easy though."}, 
      { "user": "SK Electronics", "rating": 4, "comment": "Good build quality for the price. We recommend it for small offices."}
    ]
  }
  // ... other products in newData can be updated similarly ...
];

// Transform the raw data into the final product structure
const products = newData.map((item, index) => {
  const original_price_for_mrp_calc = item.price;
  // Use fixed_mrp_price if available, otherwise calculate it
  const mrp = item.fixed_mrp_price 
              ? item.fixed_mrp_price 
              : "₹" + calculateNewPrice(typeof original_price_for_mrp_calc === 'string' ? original_price_for_mrp_calc : `₹${original_price_for_mrp_calc}`);

  return {
    id: item.id || index + 1, // Use provided id or generate one
    name: item.name,
    price: item.price, // This is now the selling price
    mrp_price: mrp, // This is the crossed-out price
    imageUrl: item.image, 
    description: item.description || `Description for ${item.name}`,
    category: item.category || 'Apparel', // Default to Apparel if not specified
    sizes: item.sizes || ['One Size'],
    fabric: item.fabric,
    pattern: item.pattern,
    color: item.color,
    fit_shape: item.fit_shape,
    rating: item.rating,
    ratings_count: item.ratings_count,
    reviews_count: item.reviews_count,
    free_delivery: item.free_delivery,
    // Include all other fields from item that might be specific to certain products (like book details)
    ...item, // Spread the rest of the item properties
    reviews: item.reviews || [] // Add the reviews array
  };
});

export default products;
