import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from . import db
from .models import User, Discipline, Effort, Teacher, Class_, Room, Favorite, Inscription, Gym
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from flask_wtf.file import FileAllowed, FileRequired
from flask_mail import Message
from backend.mail.mailer import send_email


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


#! GET DISCIPLINES

@api.route('/disciplines')
def get_disciplines():
    disciplines = Discipline.query.all()
    return jsonify([discipline.serialize() for discipline in disciplines])

#! CREATE DISCIPLINE

@api.route('/add/discipline', methods=['POST'])
def add_discipline():
    data = request.json
    if 'name' not in data or 'image' not in data:
        return jsonify({'error': 'Missing data'}), 400

    if data['effort'] not in [effort.value for effort in Effort]:
        return jsonify({'error': 'Invalid effort value'}), 400

    new_discipline = Discipline(
        name=data['name'],
        image=data['image'],
        description=data['description'],
        effort=Effort(data['effort'])
    )

    db.session.add(new_discipline)
    db.session.commit()

    return jsonify({
        "msg": "Disciplina creada exitosamente",
        **new_discipline.serialize()}), 201

#! DELETE DISCIPLINE

@api.route('/delete/discipline/<int:discipline_id>', methods=['DELETE'])
def delete_discipline(discipline_id):
    discipline = Discipline.query.get(discipline_id)

    if discipline is None:
        return jsonify({"message": "Discipline not found"}), 400

    try:
        db.session.delete(discipline)
        db.session.commit()
        return jsonify({"message": "Discipline deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT DISCIPLINE

@api.route('/edit/discipline/<int:discipline_id>', methods=['PUT'])
def edit_discipline(discipline_id):
    discipline = Discipline.query.get(discipline_id)

    if discipline is None:
        return jsonify({"message": "Discipline not found"}), 404

    data = request.json 

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            discipline.name = data['name'] 
        if 'description' in data:
            discipline.description = data['description']  
        if 'image' in data:
           discipline.image = data['image'] 
        if 'effort' in data:
            discipline.effort = Effort[data['effort']]

        db.session.commit()

        return jsonify({"message": "Discipline updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


#! GET TEACHERS

@api.route('/teachers')
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([teacher.serialize() for teacher in teachers])

#! CREATE TEACHERS

@api.route('/add/teacher')
def add_teacher():
    data = request.json
    if 'name' not in data or 'lastname' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_teacher = Teacher(
        name=data['name'],
        image=data['image'],
        lastname=data['lastname']
    )

    db.session.add(new_teacher)
    db.session.commit()

    return jsonify({
        "msg": "Persona creada exitosamente",
        **new_teacher.serialize()}), 201

#! DELETE TEACHER

@api.route('/delete/teacher/<int:teacher_id>', methods=['DELETE'])
def delete_teacher(teacher_id):
    teacher = Teacher.query.get(teacher_id)

    if teacher is None:
        return jsonify({"message": "Teacher not found"}), 400

    try:
        db.session.delete(teacher)
        db.session.commit()
        return jsonify({"message": "Teacher deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT TEACHER

@api.route('/edit/teacher/<int:teacher_id>', methods=['PUT'])
def edit_teacher(teacher_id):
    teacher = Teacher.query.get(teacher_id)

    if teacher is None:
        return jsonify({"message": "Teacher not found"}), 404

    data = request.json 

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            teacher.name = data['name']
        if 'lastname' in data:
            teacher.lastname = data['lastname']
        if 'image' in data:
           teacher.image = data['image']

        db.session.commit()

        return jsonify({"message": "Teacher updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


#! GET CLASSES

@api.route('/classes')
def get_classes():
    classes = Class_.query.all()
    return jsonify([class_.serialize() for class_ in classes])

#! CREATE CLASSES

@api.route('/add/class')
def add_class():
    data = request.json

    if 'date' not in data or 'start_time' not in data or 'end_time' not in data or 'type' not in data:
        return jsonify({"Mensaje" : "Faltan datos obligatorios"}), 400

    new_class = Class_(
        discipline_id = data['discipline_id'],
        teacher_id = data['teacher_id'],
        date = data['date'],
        start_time = data['start_time'],
        end_time = data['end_time'],
        kal = data['kal'],
        room_id = data['room_id'],
        type = data['type']
    )

    db.session.add(new_class)
    db.session.commit()
    
    return jsonify({
        "msg": "Persona creada exitosamente",
        **new_class.serialize()}), 201

#! DELETE CLASSES

@api.route('/delete/class/<int:class_id>', methods=['DELETE'])
def delete_class(class_id):
    class_ = Class_.query.get(class_id)

    if class_ is None:
        return jsonify({"message": "Class not found"}), 400

    try:
        db.session.delete(class_)
        db.session.commit()
        return jsonify({"message": "Class deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT CLASS

@api.route('/edit/class/<int:class_id>', methods=['PUT'])
def edit_class(class_id):
    class_ = Class_.query.get(class_id)

    if class_ is None:
        return jsonify({"message": "Teacher not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'discipline_id' in data:
            class_.discipline_id = data['discipline_id']
        if 'teacher_id' in data:
            class_.teacher_id = data['teacher_id']
        if 'date' in data:
            class_.date = data['date']
        if 'start_time' in data:
            class_.start_time = data['start_time']
        if 'end_time' in data:
            class_.end_time = data['end_time']
        if 'kal' in data:
            class_.kal = data['kal']
        if 'room_id' in data:
            class_.room_id = data['room_id']
        if 'type' in data:
            class_.type = data['type']

        db.session.commit()

        return jsonify({"message": "Class updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


#! GET ROOMS

@api.route('/rooms')
def get_rooms():
    rooms = Room.query.all()
    return jsonify([room.serialize() for room in rooms])

#! CREATE ROOM

@api.route('/add/room')
def add_room():
    data = request.json

    if 'name' not in data :
        return jsonify({"Mensaje" : "Faltan datos obligatorios"}), 400

    new_room = Room(
        name = data['name'],
        capacity = data['capacity']
    )

    db.session.add(new_room)
    db.session.commit()
    
    return jsonify({
        "msg": "Sala creada exitosamente",
        **new_room.serialize()}), 201

#! DELETE ROOM

@api.route('/delete/room/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    room = Room.query.get(room_id)

    if room is None:
        return jsonify({"message": "Room not found"}), 400

    try:
        db.session.delete(room)
        db.session.commit()
        return jsonify({"message": "Room deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT ROOM

@api.route('/edit/room/<int:room_id>', methods=['PUT'])
def edit_room(room_id):
    room = Room.query.get(room_id)

    if room is None:
        return jsonify({"message": "Room not found"}), 404

    data = request.json 

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            room.name = data['name']
        if 'capacity' in data:
            room.capacity = data['capacity']

        db.session.commit()

        return jsonify({"message": "Room updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500



#! GET FAVORITES

@api.route('/favorites', methods=['GET'])
def get_fav():
    favs = Favorite.query.all()
    return jsonify([fav.serialize() for fav in favs])   

#! GET USER FAVORITES

@api.route('/favorite/<int:user_id>', methods=['GET'])
def get_users_favs(user_id):
    favs = Favorite.query.filter_by(user_id=user_id).all()

    if not favs:
        return jsonify({'error': 'No favs found for this user'}), 404

    favs_serialized = [fav.serialize() for fav in favs]

    return jsonify(favs_serialized), 200

#! CREATE FAV

@api.route("/add/favorites/<int:discipline_id>/<int:user_id>", methods=['POST'])
def add_fav(discipline_id,user_id):
    data = request.json
    if 'discipline_id' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_fav = Favorite(
        discipline_id=discipline_id,
        user_id=user_id  
    )

    db.session.add(new_fav)
    db.session.commit()
    
    return jsonify({
        "msg": "Favorito guardado exitosamente",
        **new_fav.serialize()}), 201

#! DELETE FAV

@api.route('/delete/favorite/<int:favorite_id>', methods=['DELETE'])
def delete_fav(favorite_id):
    favorite = Favorite.query.get(favorite_id)

    if favorite is None:
        return jsonify({"message": "Favorite not found"}), 400

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



#! GET INSCRIPTIONS

@api.route('/inscriptions', methods=['GET'])
def get_inscriptions():
    inscriptions = Inscription.query.all()
    return jsonify([inscription.serialize() for inscription in inscriptions])  

#! GET INSCRIPTIONS USER

@api.route('/inscriptions/<int:user_id>', methods=['GET'])
def get_users_inscriptions(user_id):
    inscriptions = Inscription.query.filter_by(user_id=user_id).all()

    if not inscriptions:
        return jsonify({'error': 'No favs found for this user'}), 404

    inscriptions_serialized = [inscription.serialize() for inscription in inscriptions]

    return jsonify(inscriptions_serialized), 200

#! ADD INSCRIPTIONS

@api.route("/add/inscripcion/<int:inscription_id>/<int:user_id>", methods=['POST'])
def add_inscription(class_id, user_id):

    new_inscription = Inscription(
        class_id = class_id,
        user_id = user_id
    )
    db.session.add(new_inscription)
    db.session.commit()

    return jsonify({
        "msg": "inscripcion creada correctamente",
        **new_inscription.serialize()}), 201

#! DELETE INSCRIPTIONS

@api.route('/delete/inscription/<int:inscription_id>', methods=['DELETE'])
def delete_inscription(inscription_id):
    inscription = Inscription.query.get(inscription_id)

    if inscription is None:
        return jsonify ({'message': 'Inscripción no encontrada'}), 400
    
    try:     
        db.session.delete(inscription)
        db.session.commit()
        return jsonify({"message":"Inscripción borrada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#! GET GYM

@api.route('/gyms', methods=['GET'])
def get_gyms():
    gyms = Gym.query.all()
    return jsonify([gym.serialize() for gym in gyms]) 

#! CREATE GYM

@api.route('/add/gym')
def add_gym():
    data = request.json

    if 'name' not in data :
        return jsonify({"Mensaje" : "Faltan datos obligatorios"}), 400

    new_gym = Gym(
        name = data['name'],
        phone = data['phone'],
        street = data['street'],
        location = data['location'],
        logo = data['logo'],
        description = data['description'],
    )

    db.session.add(new_gym)
    db.session.commit()
    
    return jsonify({
        "msg": "Gym creado exitosamente",
        **new_gym.serialize()}), 201


#! DELETE GYM

@api.route('/delete/gym/<int:gym_id>', methods=['DELETE'])
def delete_gym(gym_id):
    gym = Gym.query.get(gym_id)

    if gym is None:
        return jsonify({"message": "Gym not found"}), 400

    try:
        db.session.delete(gym)
        db.session.commit()
        return jsonify({"message": "RGymoom deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT GYM

@api.route('/edit/gym/<int:gym_id>', methods=['PUT'])
def edit_gym(gym_id):
    gym = Gym.query.get(gym_id)

    if gym is None:
        return jsonify({"message": "Gym not found"}), 404

    data = request.json 

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            gym.name = data['name']
        if 'phone' in data:
            gym.phone = data['phone']
        if 'street' in data:
            gym.street = data['street']
        if 'location' in data:
            gym.location = data['location']
        if 'logo' in data:
            gym.logo = data['logo']
        if 'description' in data:
            gym.description = data['description']
        
        db.session.commit()

        return jsonify({"message": "Gym updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500



#! ADD IMAGE CLOUDINARY

@api.route('/upload/image', methods=['POST'])
def add_image():
    file_to_upload = request.files['file']
    if file_to_upload:
        upload = cloudinary.uploader.upload(file_to_upload)
        print('-------------la url donde esta la imagen-------------', upload)
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400

#! RECUPERAR CONTRASEÑA

@api.route("/check_mail", methods=['POST'])
def check_mail():
    try:
        data = request.json
        print(data)
        user = User.query.filter_by(email=data['email']).first()
        print(user)
        if not user:
            return jsonify({'success': False, 'msg': 'email not found'}),404
        token = create_access_token(identity=user.id)
        result = send_email(data['email'], token)
        print(result)
        return jsonify({'success': True, 'token': token, 'email': data['email']}), 200
    except Exception as e:
        print('error: '+ e)
        return jsonify({'success': False, 'msg': 'something went wrong'})

@api.route('/password_update', methods=['PUT'])
@jwt_required()
def password_update():
    try:
        data = request.json
        id = get_jwt_identity()
        user = User.query.get(id)
        hashed_password = generate_password_hash(data['password'])  # Hash the password
        user.password = hashed_password
        db.session.commit()
        return jsonify({'success': True, 'msg': 'Contraseña actualizada exitosamente, intente iniciar sesion'}), 200
    except Exception as e:
        db.session.rollback()
        print('error: '+ e)
        return jsonify({'success': False, 'msg': 'something went wrong'})
