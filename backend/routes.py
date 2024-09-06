import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from . import db
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from flask_wtf.file import FileAllowed, FileRequired


api = Blueprint('api', __name__)

cloudinary.config(
    cloud_name = "javidiez",
    api_key = "228234813699428",
    api_secret = "_8eZcR_RopkZzuvBwIz0Zsb_P7s",
    secure=True
)

#! SIGN UP

@api.route('/users/signup', methods=['POST'])
def signup():
    data = request.json
    
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing data'}), 400

    hashed_password = generate_password_hash(data['password'])  # Hash the password

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role='user'
    )

    db.session.add(new_user)
    db.session.commit()
        # Crear un token de acceso
    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "msg": "Usuario creado exitosamente",
        "access_token": access_token,
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
        'role': new_user.role
        }), 201


#! LOGIN

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401

    if not check_password_hash(user.password, password):
        # Incorrect password
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token,
                    "email":user.email,
                    "name": user.name,
                    "lastname": user.lastname,
                    "username": user.username,
                    'userId': user.id,
                    "role": user.role}), 201

