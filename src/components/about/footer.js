import React from "react";
import styled from 'styled-components';

function Footer() {
    return (
      <FooterContainer className="main-footer" >
      <div className="footer-middle">
      <div className="contanier">
      <div className="row">
      <div>
          <h4>Contacts</h4>
          <ul className="list-unstyled">
              <li>(+374)-55-56-57</li>
              <li>(+374)-41-56-57</li>
              <li>(+374)-77-56-77</li>
          </ul>
      </div>
      
      </div>
      <div className="footer-bottom">
          <p className="text-xs-center">
          &copy;{new Date().getFullYear()} Smile Dental Clinic 
          </p>
      </div>
      </div>
      </div>
      </FooterContainer>

    );
}

export default Footer;

const FooterContainer = styled.footer`
.footer-middle {
    background: var(--mainDark);
    padding-top: 1rem;
    color: var(--mainWhite);
    padding-bottom: 1rem;
}
`;