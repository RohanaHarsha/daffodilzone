import React from "react";
import axios from "axios";
import "../HouseCards/HouseCards.css";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const API_URL = config.API_URL;

// Dummy house data
const DUMMY_HOUSES = [
  {
    id: "dummy-1",
    district: "Colombo",
    houseType: "Villa",
    keyWord: "Luxury 3BR villa with pool and garden",
    images: [{ image1: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  },
  {
    id: "dummy-2",
    district: "Kandy",
    houseType: "Apartment",
    keyWord: "Modern 2BR apartment in city center",
    images: [{ image1: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  },
  {
    id: "dummy-3",
    district: "Galle",
    houseType: "Beach House",
    keyWord: "Beachfront property with ocean views",
    images: [{ image1: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  },
  {
    id: "dummy-4",
    district: "Negombo",
    houseType: "House",
    keyWord: "Spacious 4BR family home near beach",
    images: [{ image1: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  },
  {
    id: "dummy-5",
    district: "Kurunegala",
    houseType: "Bungalow",
    keyWord: "Charming bungalow with large garden",
    images: [{ image1: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  },
  {
    id: "dummy-6",
    district: "Jaffna",
    houseType: "Villa",
    keyWord: "Traditional villa with modern amenities",
    images: [{ image1: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=500" }],
    isDummy: true
  }
];

const RecentCard = () => {
  const [houses, setHouses] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = () => {
    axios
      .get(`${API_URL}/house/displayRecentCard`)
      .then((response) => {
        // If no houses returned, use dummy data
        if (!response.data || response.data.length === 0) {
          setHouses(DUMMY_HOUSES);
        } else {
          setHouses(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching recent houses", error);
        // On error, also load dummy houses
        setHouses(DUMMY_HOUSES);
      });
  };

  const handleViewMore = (id) => {
    // Check if it's a dummy house
    const house = houses.find(h => h.id === id);
    if (house?.isDummy) {
      // You can either show an alert, do nothing, or navigate to a "coming soon" page
      alert("This is a sample listing. Please check back later for real properties!");
      return;
    }
    navigate(`/propertyinfo/${id}`);
  };

  const placeholderSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>';

  return (
    <div className="house-display-content" style={{ paddingTop: 8, paddingBottom: 8 }}>
      {houses && houses.length > 0 ? (
        houses.map((house) => {
          const { id, district, houseType, images = [], keyWord, isDummy } = house;
          
          // FIX: Check if image URL is external before prepending API_URL
          let imgSrc = placeholderSvg;
          if (images && images.length > 0 && images[0].image1) {
            const imageUrl = images[0].image1;
            // Check if it's an external URL (starts with http:// or https://)
            if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
              imgSrc = imageUrl; // Use external URL directly
            } else {
              imgSrc = `${API_URL}/static/houses/${imageUrl}`; // Local image, prepend API_URL
            }
          }

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