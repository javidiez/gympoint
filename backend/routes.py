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
