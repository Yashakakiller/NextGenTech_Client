import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_CALL } from '../api';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: `${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.success) {
          setUser(response.data.data);
          setAuth(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/bestDeal/product`);
      const data = response.data.randomProducts;
      setRandomProducts(data);
    } catch (error) {
      console.error("Error fetching random products:", error);
    }
  };

  const addToCart = async (_id, quantity) => {
    try {
      const response = await axios.post(`${API_CALL}/cart/user/${user._id}`, {
        _id,
        quantity: quantity,
      });
      toast(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast("Product already added to cart");
    }
  };

  const productOpen = (pId) => {
    navigate(`/product/${pId}`);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section id="featuredProducts" className='section-p1'>
        <h2>Featured Products</h2>
        <p>Get the Best of Rest!</p>
        <div className="feat_container">
          {randomProducts.map((feat) => (
            <div className="feat_box" key={feat._id}>
              <img src={feat.img} alt='featured image logo' />
              <div className="desc">
                <h5>{feat.name}</h5>
                <h4>₹ {feat.price}</h4>
              </div>
              <button onClick={() => productOpen(feat._id)}>View</button>
              {/* {auth && (
                <>
                  {feat.quantity > 0 ? (
                    <Link
                      to="#"
                      className='featcart'
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(feat._id, 1);
                      }}
                    >
                      <FaShoppingCart />
                    </Link>
                  ) : (
                    <h4 className='text-danger text-center mt-4'>Out of Stock!!!</h4>
                  )}
                </>
              )} */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RandomProducts;
