import React from 'react'
import './footer.css';
import { AiFillFacebook ,AiFillTwitterSquare, AiOutlineInstagram } from "react-icons/ai";


const Footer = () => {
  return (
     <footer>
        <div className="footer-content">
            <p>
                &copy; 2025 Your E-Learning Platform. All right reserved.  <br />
                Made with ❤️ <a href= "" >Rashmi Rawat</a>
            </p>
            <div className="social-links">
                <a href="">< AiFillFacebook/></a>
                <a href=""><AiFillTwitterSquare /></a>
                <a href=""><AiOutlineInstagram /></a>  
            </div>
        </div>
     </footer>
  )
}

export default Footer;