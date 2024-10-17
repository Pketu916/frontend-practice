import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from "./components/UI/Notification"
import { fetchCardData, sendCartData } from './store/cart-actions';

let isIntial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)


  useEffect(() => {
    dispatch(fetchCardData)
  }, [dispatch])


  useEffect(() => {
    if (isIntial) {
      isIntial = false
      return
    }

    dispatch(sendCartData(cart))
  }, [cart]

  )

  return (<>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  </>
  );
}

export default App;
