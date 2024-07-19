import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import RelatedProducts from './RelatedProducts';
import Cart from './Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReactImageMagnify from 'react-image-magnify';

const ProductsDetailPage = () => {
  const [quantity, setSelectedQuantity] = useState(1);
  const [user, setUser] = useState({ wishlist: [], cart: [] });
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );
        if (response.data.success) {
          setAuth(true);
        }
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/products/product/${id}`);
        setProduct(response.data.product);
        setSelectedImage(response.data.product.img); // Set the default image
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [id]);

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(`${API_CALL}/wishlist/user/${user._id}`, {
        _id: productId,
      });
      toast(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleImage = (image) => {
    setSelectedImage(image);
  };

  const addToCart = async (_id, quantity) => {
    try {
      const response = await axios.post(`${API_CALL}/cart/user/${user._id}`, {
        _id,
        quantity: Math.min(quantity, product.quantity),
      });
      toast(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  // const NextArrow = (props) => {
  //   const { className, onClick } = props;
  //   return (
  //     <div className={`${className} arrow-next`} onClick={onClick}>
  //       <i className="fa fa-arrow-right"></i>
  //     </div>
  //   );
  // };

  // const PrevArrow = (props) => {
  //   const { className, onClick } = props;
  //   return (
  //     <div className={`${className} arrow-prev`} onClick={onClick}>
  //       <i className="fa fa-arrow-left"></i>
  //     </div>
  //   );
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />
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
      <section className="container sproduct mb-5">
        <div className="row mt-5">
          <div className="col-lg-5 col-md-12 col-12">
            {selectedImage && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Product Image',
                    isFluidWidth: true,
                    src: selectedImage,
                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                  },
                  largeImage: {
                    src: selectedImage,
                    width: 1200,
                    height: 1800
                  },
                  lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                }}
              />
            )}
            <Slider {...settings}>
              {product.images && product.images.map((otherImage, index) => (
                <div className="small-img-col" key={index}>
                  <img
                    className="small-img"
                    src={otherImage}
                    alt=""
                    onClick={() => handleImage(otherImage)}
                  />
                </div>
              ))}
              <div className="small-img-col">
                <img
                  className="small-img"
                  src={product.img}
                  alt=""
                  onClick={() => handleImage(product.img)}
                />
              </div>
            </Slider>
          </div>

          <div className="col-lg-6 col-md-12 col-12 p-desc">
            <h3 className="py-4">{product.name}</h3>
            <h5 className="py-2">{product.viewCount} People Viewed This Product</h5>
            <h2>₹{product.price}</h2>
            {product.quantity === 0 || product.quantity === null ? (
              <h3 className="text-danger">Out of Stock!</h3>
            ) : (
              <>
                {localStorage.getItem("token") && auth ? (
                  <>
                    {user.cart.includes(product._id) ? (
                      <button
                        onClick={() => toast("Already Added To Cart")}
                        className="buy-btn mx-2"
                      >
                        Already Added To Cart
                      </button>
                    ) : (
                      <button
                        className="buy-btn mx-2"
                        onClick={() => addToCart(product._id, quantity)}
                      >
                        Add To Cart
                      </button>
                    )}
                    {user.wishlist.includes(product._id) ? (
                      <button
                        className="buy-btn"
                        onClick={() => toast("Already Added To Wishlist")}
                      >
                        Already Added To Wishlist
                      </button>
                    ) : (
                      <button
                        className="buy-btn"
                        onClick={() => addWishlist(product._id)}
                      >
                        Add To Wishlist
                      </button>
                    )}
                  </>
                ) : (
                  <button className="buy-btn" onClick={() => navigate("/login")}>
                    Please Login First to Continue
                  </button>
                )}
              </>
            )}
            <h4 className="mt-5 mb-5">Product Details</h4>
            <span>{product.desc}</span>
            <hr />
          </div>
        </div>
        <RelatedProducts id={product._id} />
      </section>
      <div style={{ display: "none" }}>
        <Cart productId={product._id} />
      </div>
    </>
  );
};

export default ProductsDetailPage;
