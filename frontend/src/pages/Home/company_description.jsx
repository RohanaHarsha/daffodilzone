import React from 'react';
import Renovate1 from '../../img/Renovate1.jpg';
import Renovate2 from '../../img/Renovate2.jpg';
import Renovate3 from '../../img/Renovate3.jpg';
import './CompanyDescription.css';
import axios from 'axios';
import config from "../../config";
import { useState } from 'react';

const API_URL = config.API_URL;

//this is for fetching images for the home page gallery at the bottom
const fetchItem = () => {
  axios.get(`${API_URL}/main/get_image`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
    });
};



const addImage = (imageData) => {
  axios.post(`${API_URL}/main/upload_image`, imageData)
    .then((response) => {
      if (response.status === 201) {
        console.log('Image successfully uploaded');
      }
    })
    .catch((error) => {
      console.error('There was an error uploading the image!', error);
    });
};

const deleteImage = (id) => {
  if (window.confirm('Are you sure you want to remove this image?')) {
    axios.delete(`${API_URL}/main/delete_image/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchItem();
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the image!", error);
      });
  }
};

const handleEdit = () => {
  // Placeholder for edit functionality
}

//this is for fething and sending the admin email from session storage


const email = localStorage.getItem("userEmail");
console.log("Admin Email:", email);






const CompanyDescription = () => {
 
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




        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>



        <div className="grid-item">
          <img src={Renovate3} alt="Renovation 3" />
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
