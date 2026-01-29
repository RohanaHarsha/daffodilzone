import unittest
from app import app


class TestLuxuryHouseUpload(unittest.TestCase):

    def setUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()

    def test_upload_luxury_house(self):
        form_data = {
            "houseType": "Luxury House",
            "district": "Nuwara Eliya",
            "address": "123 Street",
            "no_of_rooms": "3",
            "no_of_bathrooms": "2",
            "land_size": "500",
            "distance": "2",
            "storey": "1",
            "keyWord": "nice",
            "description": "great place",
            "price": "200000",
            "lat": "12.34",
            "lng": "56.78",
        }

        response = self.client.get("/", data=form_data)
        print(response)
        self.assertEqual(response.status_code, 200)


    def test_get_admins (self):
        form_data = {
            "email": "daffodilzone@gmail.com"
        }
       
        response = self.client.post("auth/verify_admin", json=form_data)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print(data)
        self.assertIn("isAdmin", data)

        self.assertTrue(data["isAdmin"])



if __name__ == "__main__":
    unittest.main()
