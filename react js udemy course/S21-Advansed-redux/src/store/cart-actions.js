import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCardData = () =>{
    return async dispatch =>{
        const fetchData = async()=>{
            const response = await fetch("https://react-http-89724-default-rtdb.firebaseio.com/cart.json")

            if(!response.ok){
                throw new Error("Could not fetch card data")
            }
            const data = await response.json()

            return data
        }
        try{
         const cartData =  await fetchData()
         dispatch(cartActions.replaceCart(cartData))
        }catch(error){
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error",
                message: "fetching cart data failed"
              }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(uiActions.showNotification({
        status: "panding",
        title: "Sending...",
        message: "sending cart data"
      }))
  
      const sendRequest = async () => {
  
        
        const response = await fetch("https://react-http-89724-default-rtdb.firebaseio.com/cart.json", {
          method: "PUT", body: JSON.stringify(cart)
        })
        
        if (!response.ok) {
          throw new Error("sending cart data failed")
          
        }
      }
      try{
        await sendRequest()
  
        dispatch(uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "sending cart data successfully"
        }))
    
      }catch(error){
        dispatch(uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed"
        }))
      }
      
    
    }
  }