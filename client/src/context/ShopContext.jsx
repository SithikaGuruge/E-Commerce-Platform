import React, { createContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
export const ShopContext = createContext(null);

const ShopContextProvider = (props) =>{
    const [all_product, setAllProduct] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:4002/products");
          console.log(response.data);
          setAllProduct(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
    
    const contextValue = {all_product}

    return(
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;