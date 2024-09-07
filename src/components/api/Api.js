// export const getAllProducts=()=>{
//     return fetch("https://dummyjson.com/products").then((res) => res.json());
// };

export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => data.products) // assuming that the API response wraps products in a 'products' key
    .catch(error => {
        console.error('Failed to fetch all products:', error);
        return []; // Return an empty array in case of error
    });
};



// export const getCart=()=>{
//     return fetch('https://dummyjson.com/carts/1')
//     .then(res => res.json())
//     .then(console.log);
// }
export const getCart = () => {
    return fetch('https://dummyjson.com/carts/1')
    .then(res => res.json())
    .then(data => {
        // Hubi haddii xogta jawaabtu ay sax tahay
        if (data && data.products && Array.isArray(data.products)) {
            console.log("Cart data loaded successfully", data);
            return data;  // Xogta waa sax, celin
        } else {
            console.error("Invalid cart data format", data);
            throw new Error("Invalid cart data format");  // Tuur qalad haddii xogta aysan ahayn qaabka la filayo
        }
    });
}


// export const getProductsByCategory=(category)=>{
//     return fetch(`https://dummyjson.com/products/category/${category}`)
//     .then(res => res.json())
//     .then(console.log);
   
// };

// API function to get products by category
export const getProductsByCategory = (categoryId) => {
    return fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.products) // Make sure to return the products array
      .catch(error => {
        console.error('There was a problem with fetching products:', error);
        return []; // Return an empty array in case of an error
      });
  };



export const addToCart=(id)=>{
   return fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
        
      ]
    })
  })
  .then(res => res.json())

}