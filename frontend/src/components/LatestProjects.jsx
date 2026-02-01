import React, { Component } from 'react';
import axios from 'axios';
import './LatestProjects.css';
import config from "../config";

const API_URL = config.API_URL;

// Dummy banners with real image URLs
const DUMMY_BANNERS = [
  {
    id: 1,
    title: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=600&fit=crop",
    isDummy: true
  },
  {
    id: 2,
    title: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=600&fit=crop",
    isDummy: true
  },
  {
    id: 3,
    title: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop",
    isDummy: true
  },
  {
    id: 4,
    title: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=600&fit=crop",
    isDummy: true
  },
  {
    id: 5,
    title: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=600&fit=crop",
    isDummy: true
  }
];

class LatestProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: DUMMY_BANNERS,  // Start with dummy banners
      activeIndex: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  // Fetch images from the backend
  fetchImages = async () => {
    // If no API URL, just use dummy data
    if (!API_URL || API_URL === '') {
      console.log('No API URL configured, using dummy banners');
      this.setState({ images: DUMMY_BANNERS, isLoading: false });
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/banner/displayBanner`, {
        timeout: 5000
      });
      
      if (response.data && response.data.length > 0) {
        this.setState({ images: response.data, isLoading: false });
      } else {
        console.log('No banners returned from API, using dummy data');
        this.setState({ images: DUMMY_BANNERS, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching banners, using dummy data:", error);
      this.setState({ images: DUMMY_BANNERS, isLoading: false });
    }
  };

  // Helper to get correct image source
  getImageSrc = (imageTitle) => {
    if (!imageTitle) return '';
    
    // If it's already a full URL, use it directly
    if (imageTitle.startsWith('http://') || imageTitle.startsWith('https://')) {
      return imageTitle;
    }
    
    // Otherwise, it's a local file
    return `${API_URL}/static/banners/${imageTitle}`;
  };

  // Go to previous image (wraps around)
  goToPrevious = () => {
    this.setState(prevState => {
      const newIndex = (prevState.activeIndex - 1 + prevState.images.length) % prevState.images.length;
      return { activeIndex: newIndex };
    });
  };

  // Go to next image (wraps around)
  goToNext = () => {
    this.setState(prevState => {
      const newIndex = (prevState.activeIndex + 1) % prevState.images.length;
      return { activeIndex: newIndex };
    });
  };

  render() {
    const { images, activeIndex, isLoading } = this.state;
    
    if (isLoading) {
      return <div className="latest-project-container">Loading banners...</div>;
    }

    if (images.length === 0) {
      return <div className="latest-project-container">No banners available.</div>;
    }

    // Calculate indices for previous and next previews (with wrap-around)
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    const nextIndex = (activeIndex + 1) % images.length;

    return (
      <div className="latest-project-container">
        <div className="banner-wrapper">
          {/* Left preview container */}
          <div className="preview left" onClick={this.goToPrevious}>
            <img
              src={this.getImageSrc(images[prevIndex].title)}
              alt="Previous Banner"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="600"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24">No Image</text></svg>';
              }}
            />
          </div>

          {/* Main banner container */}
          <div className="main-banner">
            <img
              src={this.getImageSrc(images[activeIndex].title)}
              alt="Active Banner"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="600"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24">No Image</text></svg>';
              }}
            />
          </div>

          {/* Right preview container */}
          <div className="preview right" onClick={this.goToNext}>
            <img
              src={this.getImageSrc(images[nextIndex].title)}
              alt="Next Banner"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="600"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24">No Image</text></svg>';
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LatestProjects;