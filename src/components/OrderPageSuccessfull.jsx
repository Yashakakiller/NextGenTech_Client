import React, { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { API_CALL } from '../api';


const OrderPageSuccessfull = () => {
  const successContainerRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();
  const cartItems = location.state?.cartItems || [];
  const [userInfo, setUserInfo] = React.useState({});
  const image = "../../public/logo.png"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        setUserInfo(response.data.user[0]);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, [id]);

  const downloadPDF = () => {
    // Create dynamic content
    const billContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice</title>
          <style>
            @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
            body { margin: 0; padding: 0; background: #e1e1e1; font-family: 'Open Sans', sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border: 1px solid #bebebe; }
            th { background: #f3f3f3; }
            .header { background: #ffffff; border-radius: 10px; padding: 20px; }
            .invoice-title { color: #ff0000; font-size: 21px; text-align: right; }
            .total { font-weight: bold; color: #ff0000; }
            .footer { padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <table>
              <tr>
                <td>
                  <img src=${image} width="320px" height="320px" alt="logo"/>
                </td>
                <td class="invoice-title">
                  Invoice<br />
                  <small>ORDER #${userInfo.orders .length}</small><br />
                  <small>${new Date().toDateString()}</small>
                </td>
              </tr>
            </table>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => `
                <tr>
                  <td>${item.product.name || 'N/A'}</td>
                  <td>${item.quantity ? item.quantity.toString() : 'N/A'}</td>
                  <td>₹${item.product.price * item.quantity}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="3" class="total">Subtotal</td>
                <td>₹${cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</td>
              </tr>
              <tr>
                <td colspan="3" class="total">Shipping</td>
                <td>₹100.00</td>
              </tr>
              <tr>
                <td colspan="3" class="total">Grand Total</td>
                <td class="total">₹${cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 100}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <strong>PAYMENT METHOD</strong><br />
            Credit Card<br />
            Credit Card Type: Visa ending in 1234<br /><br />
            <strong>SHIPPING ADDRESS</strong><br />
            ${userInfo.firstName} ${userInfo.lastName}<br />
            ${userInfo.address}
          </div>
        </body>
      </html>
    `;

    // Convert HTML to PDF
    const element = document.createElement('div');
    element.innerHTML = billContent;
    document.body.appendChild(element);

    const opt = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
    
    document.body.removeChild(element);
  };

  return (
    <>
    
      <div>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade" nodeRef={successContainerRef}>
          <div ref={successContainerRef} className="order-success-container bg-light p-5 text-center">
            <div className="order-success-icon text-success">
              <FaCheckCircle size={64} />
            </div>
            <h2 className="order-success-heading mt-4">Order Placed Successfully!</h2>
            <p className="order-success-message mt-3">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>
        </CSSTransition>
        <button className='btn btn-primary d-block m-auto w-50' onClick={downloadPDF}>Download PDF</button>
        <Link to='/' className='btn btn-primary d-block m-auto w-50 mt-3'>Continue Shopping</Link>
      </div>
    </>
  );
};

export default OrderPageSuccessfull;
