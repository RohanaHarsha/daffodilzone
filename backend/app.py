from flask import Flask
from config import Config
from flask_cors import CORS
from models import  db
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import Admin



app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
CORS(app, supports_credentials=True)

# Initialize extensions
db.init_app(app)
mail = Mail(app)
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()

    # ---- Create Default Admin (only if missing) ----
    existing_admin = Admin.query.filter_by(username="admin").first()
    if not existing_admin:
        admin = Admin(
            name="Default Admin",
            address="N/A",
            NIC=200000000293,
            email="daffodilzone@gmail.com",
            TP=200000000293,
            username="admin",
            password=bcrypt.generate_password_hash("u8oD-BnTK-PS#D-48N$").decode("utf-8"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Default admin created.")
    else:
        print("Default admin already exists.")


# Register blueprints from the Routes folder
from Routes.banner import banner_bp
from Routes.agent import agent_bp
from Routes.hotel import hotel_bp
from Routes.auth import auth_bp
from Routes.main import main_bp  
from Routes.house import house_bp  


app.register_blueprint(banner_bp, url_prefix="/banner")
app.register_blueprint(agent_bp, url_prefix="/agent")
app.register_blueprint(hotel_bp, url_prefix="/hotels")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(house_bp, url_prefix="/house")
app.register_blueprint(main_bp)  

@app.route('/')
def home():
    
    return "Welcome to the Real Estate Backend API"



if __name__ == '__main__':
   app.run(debug=True)
