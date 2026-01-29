from flask import Blueprint, request, jsonify, current_app
import os
import logging
from datetime import datetime
from werkzeug.utils import secure_filename
from flask_mail import Message

from models import HomePageImage, db
from schemas import HomePageImageSchema
from utils import is_valid_email

main_bp = Blueprint('main', __name__)

@main_bp.route('/send_email', methods=["POST"])
def send_email():
    data = request.get_json()
    if not all(k in data for k in ('name', 'email', 'subject', 'message')):
        return jsonify({"error": "Missing required fields"}), 400

    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    msg = Message(
        subject=subject,
        sender=current_app.config['MAIL_DEFAULT_SENDER'],
        recipients=[email]
    )
    msg.body = f"Message from {name} ({email}):\n\n{message}"

    try:
        current_app.extensions['mail'].send(msg)
        logging.info(f"Email sent successfully to {email}")
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email", "details": str(e)}), 500


#havent implemented yet this is dor the images on the home page
@main_bp.route('/upload_image', methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads/')
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

        new_image = HomePageImage(filename=filename, upload_time=datetime.utcnow())
        db.session.add(new_image)
        db.session.commit()

        logging.info(f"Image uploaded successfully: {filename}")
        return jsonify({"message": "Image uploaded successfully", "image_id": new_image.id}), 201

@main_bp.route('/delete_image/<int:id>', methods=["DELETE"])
def delete_image(id):
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads/')
    image = HomePageImage.query.get(id)
    if not image:
        return jsonify({"error": "Image not found"}), 404

    file_path = os.path.join(upload_folder, image.filename)
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            logging.info(f"Image file deleted: {file_path}")
        db.session.delete(image)
        db.session.commit()
        logging.info(f"Image record deleted from database: ID {id}")
        return jsonify({"message": "Image deleted successfully"}), 200
    except Exception as e:
        logging.error(f"Error deleting image: {str(e)}")
        return jsonify({"error": "Failed to delete image", "details": str(e)}), 500