import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CALL } from '../api';

const SearchResults = () => {
  const { productName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const productOpen = (pId) => {
    navigate(`/product/${pId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_CALL}/products/searchproduct/name?query=${productName}`);
        if (response.data.products.length === 0) {
          // If no products found by name, assume it's a category and navigate to single category route
          const categoryResponse = await axios.get(`http://localhost:5000/categories/singlecategory/${productName}`);
          if (categoryResponse.data.success) {
            setProducts(categoryResponse.data.categoryCheck.products);
          } else {
            setError(categoryResponse.data.message);
          }
        } else {
          setProducts(response.data.products);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productName, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="featuredProducts" className='section-p1'>
      <h3>Search Results for "{productName}"</h3>
      <div className="feat_container">
        {products.map((feat) => (
          <div className="feat_box" key={feat._id}>
            <img src={feat.img} alt='featured image logo' />
            <div className="desc">
              <h5>{feat.name}</h5>
              <h4>₹ {feat.price}</h4>
            </div>
            <button onClick={() => productOpen(feat._id)}>View</button>
            {/* Additional functionality */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;
