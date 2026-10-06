const urls = {
  // home page 
  homePage:"content/home-page",
 
  // Customer Profile
  userMe: "customer/me",
  userModifyProfile: "customer/modify-profile",
  userAddressData: "customer/shipping-info",
  createdAddressOrChangeAddressData: "customer/shipping-info",  
  userOrderData: "customer/orders/history",

  // Cart
  addToBasketProduct: "customer/cart/",
  allBasketData: "customer/cart/",
  incrementCount: "customer/cart/",
  decrementCount: "customer/cart/",
  deletedBasketProduct: "customer/cart/",
  allBasketProductRemove: "customer/cart/clear",

  // Wishlist
  addWishlist: (productId) => `customer/wishlist/add/${productId}`,
  removeWishList: (productId) => `customer/wishlist/remove/${productId}`,
  allWishlistData: "customer/wishlist/list",

  // comparison 
  addProductComparison:(productId)=>`customer/comparison/${productId}`,
  removeProductComparison:(productId)=>`customer/comparison/${productId}`,
  getCategoryCompareDatas:(categoryId)=>`customer/comparison/${categoryId}`,
  allComparison:"customer/comparison/categories",
  comparisonProductLength:"customer/comparison/length",

  // Products & Content urls
  // products: "content/products/",
  search: (value) => `content/products?search=${value}`,
  productDetail: (slug) => `content/product-detail/${slug}`,
  category: "category",

  // checkout order 
  // basketMonthsPayment:"customer/orders/history",
  customerOrder:"customer/orders",
  onlineKapitalPaymentStatus: (id) => `customer/orders/verify-birbank-payment?birbankOrderId=${id}`,

productCategoryFilter: (
  slug,
  attributesStr,
  min,
  max,
  page = 1
) => {
  let url = `content/products/${slug}?page=${page}&perPage=24`;

  if (attributesStr) url += `&attributes=${attributesStr}`;
  if (min != null) url += `&minPrice=${min}`;
  if (max != null) url += `&maxPrice=${max}`;

  return url;
},
};

export default urls;