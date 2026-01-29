import React from "react";
import axios from "axios";
import "../HouseCards/HouseCards.css";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const API_URL = config.API_URL;

// Dummy house data with embedded SVG images (guaranteed to work on Vercel)
const DUMMY_HOUSES = [
  {
    id: "dummy-1",
    district: "Colombo",
    houseType: "Villa",
    keyWord: "Luxury 3BR villa with pool and garden",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234f46e5;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%236366f1;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g1)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏡%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3ELuxury Villa%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3EColombo%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  },
  {
    id: "dummy-2",
    district: "Kandy",
    houseType: "Apartment",
    keyWord: "Modern 2BR apartment in city center",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2310b981;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2314b8a6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g2)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏢%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3EModern Apartment%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3EKandy%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  },
  {
    id: "dummy-3",
    district: "Galle",
    houseType: "Beach House",
    keyWord: "Beachfront property with ocean views",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g3" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%233b82f6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%232563eb;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g3)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏖️%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3EBeach House%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3EGalle%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  },
  {
    id: "dummy-4",
    district: "Negombo",
    houseType: "House",
    keyWord: "Spacious 4BR family home near beach",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g4" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f59e0b;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f97316;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g4)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏠%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3EFamily Home%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3ENegombo%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  },
  {
    id: "dummy-5",
    district: "Kurunegala",
    houseType: "Bungalow",
    keyWord: "Charming bungalow with large garden",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g5" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%237c3aed;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g5)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏘️%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3EBungalow%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3EKurunegala%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  },
  {
    id: "dummy-6",
    district: "Jaffna",
    houseType: "Villa",
    keyWord: "Traditional villa with modern amenities",
    images: [{ 
      image1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Cdefs%3E%3ClinearGradient id="g6" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23db2777;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g6)"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="80" font-family="Arial"%3E🏛️%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3ETraditional Villa%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18" font-family="Arial"%3EJaffna%3C/text%3E%3C/svg%3E'
    }],
    isDummy: true
  }
];

const RecentCard = () => {
  const [houses, setHouses] = React.useState(DUMMY_HOUSES);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    if (!API_URL || API_URL === '') {
      console.log('No API URL configured, using dummy data');
      setHouses(DUMMY_HOUSES);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/house/displayRecentCard`, {
        timeout: 5000
      });
      
      if (response.data && response.data.length > 0) {
        setHouses(response.data);
      } else {
        console.log('No houses returned from API, using dummy data');
        setHouses(DUMMY_HOUSES);
      }
    } catch (error) {
      console.error("Error fetching recent houses, using dummy data:", error);
      setHouses(DUMMY_HOUSES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMore = (id) => {
    const house = houses.find(h => h.id === id);
    if (house?.isDummy) {
      alert("This is a sample listing. Please check back later for real properties!");
      return;
    }
    navigate(`/propertyinfo/${id}`);
  };

  const placeholderSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>';

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return placeholderSvg;
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
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