import React from 'react';
import Renovate1 from '../../img/Renovate1.jpg';
import Renovate2 from '../../img/Renovate2.jpg';
import Renovate3 from '../../img/Renovate3.jpg';
import './CompanyDescription.css';






//this is for fething and sending the admin email from session storage

const CompanyDescription = () => {
  const admin_verification = sessionStorage.getItem("isAdmin");
  console.log("Admin verification in company description:", admin_verification);



  return (
    <div className="company-description">
      <div className="description-text">
      </div>
      <div className="company-grid">
        <div className="grid-item">

          <img src={Renovate1} alt="Renovation 1" />
        </div>
        <div className="grid-item">
          <img src={Renovate2} alt="Renovation 2" />
        </div>


      

        <div className="grid-item">
          <img src={Renovate3} alt="Renovation 3" />
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
