import React from "react";
import axios from "axios";
import "../HouseCards/HouseCards.css";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const API_URL = config.API_URL;

// Dummy house data with REAL, WORKING URLs
const DUMMY_HOUSES = [
  {
    id: "dummy-1",
    district: "Colombo",
    houseType: "Villa",
    keyWord: "Luxury 3BR villa with pool and garden",
    images: [{ image1: "https://picsum.photos/seed/villa-colombo/800/500" }],
    isDummy: true
  },
  {
    id: "dummy-2",
    district: "Kandy",
    houseType: "Apartment",
    keyWord: "Modern 2BR apartment in city center",
    images: [{ image1: "https://picsum.photos/seed/apartment-kandy/800/500" }],
    isDummy: true
  },
  {
    id: "dummy-3",
    district: "Galle",
    houseType: "Beach House",
    keyWord: "Beachfront property with ocean views",
    images: [{ image1: "https://picsum.photos/seed/beach-galle/800/500" }],
    isDummy: true
  },
  {
    id: "dummy-4",
    district: "Negombo",
    houseType: "House",
    keyWord: "Spacious 4BR family home near beach",
    images: [{ image1: "https://picsum.photos/seed/house-negombo/800/500" }],
    isDummy: true
  },
  {
    id: "dummy-5",
    district: "Kurunegala",
    houseType: "Bungalow",
    keyWord: "Charming bungalow with large garden",
    images: [{ image1: "https://picsum.photos/seed/bungalow-kuru/800/500" }],
    isDummy: true
  },
  {
    id: "dummy-6",
    district: "Jaffna",
    houseType: "Villa",
    keyWord: "Traditional villa with modern amenities",
    images: [{ image1: "https://picsum.photos/seed/villa-jaffna/800/500" }],
    isDummy: true
  }
];

const RecentCard = () => {
  const [houses, setHouses] = React.useState(DUMMY_HOUSES); // Start with dummy data
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    // If API_URL is not configured, just use dummy data
    if (!API_URL || API_URL === '') {
      console.log('No API URL configured, using dummy data');
      setHouses(DUMMY_HOUSES);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/house/displayRecentCard`, {
        timeout: 5000 // 5 second timeout
      });
      
      // If we got real data, use it; otherwise keep dummy data
      if (response.data && response.data.length > 0) {
        setHouses(response.data);
      } else {
        console.log('No houses returned from API, using dummy data');
        setHouses(DUMMY_HOUSES);
      }
    } catch (error) {
      console.error("Error fetching recent houses, using dummy data:", error);
      // Keep dummy data on error
      setHouses(DUMMY_HOUSES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMore = (id) => {
    // Check if it's a dummy house
    const house = houses.find(h => h.id === id);
    if (house?.isDummy) {
      alert("This is a sample listing. Please check back later for real properties!");
      return;
    }
    navigate(`/propertyinfo/${id}`);
  };

  const placeholderSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>';

  // Helper function to get the correct image source
  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return placeholderSvg;
    
    // If it's already a full URL (starts with http:// or https://), use it directly
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a data URL (SVG placeholder), use it directly
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Otherwise, it's a local file, prepend API_URL
    return `${API_URL}/static/houses/${imageUrl}`;
  };

  if (isLoading) {
    return (
      <div className="house-display-content" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <p className="loading-message">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="house-display-content" style={{ paddingTop: 8, paddingBottom: 8 }}>
      {houses && houses.length > 0 ? (
        houses.map((house) => {
          const { id, district, houseType, images = [], keyWord, isDummy } = house;
          
          const imgSrc = images && images.length > 0 && images[0].image1
            ? getImageSrc(images[0].image1)
            : placeholderSvg;

          return (
            <article className="card" key={id}>
              <div className="card-media">
                <img
                  src={imgSrc}
                  alt={district || "Property image"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderSvg;
                  }}
                />
                <span className="badge">{houseType || "Property"}</span>
                {isDummy && <span className="badge sample-badge">Sample</span>}
              </div>

              <div className="card-body">
                <h3 className="card-location">
                  <i className="fa fa-location-dot" aria-hidden="true"></i>&nbsp;{district || "—"}
                </h3>
                {keyWord && <p className="card-keyword">{keyWord}</p>}

                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMore(id)}
                    aria-label={`View more about property ${id}`}
                  >
                    View More 
                  </button>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <p className="no-results">No recent houses available.</p>
      )}
    </div>
  );
};

export default RecentCard;