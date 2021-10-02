import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../Houks/useCart';
import useProducts from '../../Houks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);



    const history = useHistory()

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key)
    }
    const handleorder = () => {
        history.push('/orderlist');
        setCart([]);
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleorder} className='btn-regular'> Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;