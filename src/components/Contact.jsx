import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {API_CALL} from '../api'

const Contact = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    message:""
  })


  const handleChange = (e) => {
    setFormData({...formData , [e.target.name] : e.target.value})

    //console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.post(`${API_CALL}/contact`,formData);
    // //console.log(data.data)
    setFormData({
      name:"",
      email:"",
      message:""
    })
  }


  return (
    <>
        <section className='contact_container'>
    
    <div class="section-header">
      <div class="container">
        <h2>Contact Us</h2>
        <p>Welcome to Ecommerce STORE!<br/>

We're delighted that you've chosen to reach out to us. Whether you have a question, a comment, or you simply want to share your shopping experience, our team is here to assist you. </p>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        
        <div class="contact-info">
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-home"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Address</h4>
              <p>Ekudom<br/> mahaset building, Sipraya, Bangrak <br/>BANGKOK .10500</p>
              <p>Jhori Bazar<br/>Jaipur,302002 <br/></p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-phone"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Phone</h4>
              <p>+66 000000000</p>
              <p>+91 999999999</p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-envelope"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Email</h4>
             <p>example@gmail.com</p>
             <p>example@gmail.com</p>
             
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form id="contact-form" onSubmit={handleSubmit}>
            <h2>Send Message</h2>
            <div class="input-box">
              <input type="text"  required="true" value={formData.name}  name="name" onChange={(e) => handleChange(e)}/>
              <span>Full Name</span>
            </div>
            
            <div class="input-box">
              <input type="email" required="true" value={formData.email}  name="email" onChange={(e) => handleChange(e)} />
              <span>Email</span>
            </div>
            
            <div class="input-box">
              <textarea required="true" name="message"  value={formData.message}  onChange={(e) => handleChange(e)}></textarea>
              <span>Type your Message...</span>
            </div>
            
            <div class="input-box">
              <input type="submit" value="Send"/>
            </div>
          </form>
        </div>
        
      </div>
    </div>
   </section>
    </>
  )
}

export default Contact