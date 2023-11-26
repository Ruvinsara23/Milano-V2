
import { createContext, useEffect, useState,useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

 
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
      }
        // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
  cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
);
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
export const CartContext = createContext({
  // isCartOpen: false,
  // setIsOpen: () => {},
  // cartItems: [],
  // addItemToCart: () => {},
  // removeItemFromCart: () => {},
  // clearItemFromCart: () => {},
  // cartCount: 0,
  // cartTotal: 0,

});

const CART_ACTION_TYPES={
  ADD_ITEM_TO_CART:'ADD_ITEM_TO_CART',
  IS_CART_OPEN:'IS_CART_OPEN'

}

 const INITIAL_STATE={
  cartItems: [],  
  isCartOpen: false,
  cartTotal: 0,
  cartCount: 0,

}

const cartReducer=(state,action)=>{
const {type,payload}=action;

switch(type){
  case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
    return{
      ...state,
      ...payload
      // cartItems: payload.cartItems,
      //  cartTotal: payload.cartTotal,
       

    }
    case CART_ACTION_TYPES.IS_CART_OPEN:
    return{
      ...state,
      isCartOpen: payload,
    }
    default:
      throw new Error(`undifine type ${type} from cart reducer`)
}




}



export const CartProvider = ({ children }) => {

  const [{cartItems,cartCount,cartTotal,isCartOpen},dispatch]=useReducer(cartReducer,INITIAL_STATE)
  // const [isCartOpen, setIsCartOpen] = useState(false);


    
const updateCartItemsReducer=(newCartItems)=>{
  const newCartTotal = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      );
  const newCartCount = newCartItems.reduce((total, cartItem)=>total+ cartItem.quantity,0)

  dispatch(createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART,{cartItems:newCartItems,cartCount:newCartCount,cartTotal:newCartTotal}))
}

const setIsCartOpen=(bool)=>{
  dispatch(createAction(CART_ACTION_TYPES.IS_CART_OPEN,bool))
}

  

  const addItemToCart = (product) =>{
    const newCartItems=addCartItem(cartItems, product)
   updateCartItemsReducer(newCartItems);
  }
   

    const removeItemToCart = (cartItemToRemove) => {
      const newCartItems=removeCartItem(cartItems, cartItemToRemove);
      updateCartItemsReducer(newCartItems)

      };

    
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems=clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems);
  };


  

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart , 
    removeItemToCart,
    clearItemFromCart,cartTotal,cartCount};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);



    // useEffect(()=>{
  //   const newCartCount = cartItems.reduce((total, cartItem)=>total+ cartItem.quantity,0)

  //   setCartCount(newCartCount);
  // },[cartItems]);


  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);