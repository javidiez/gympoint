from . import db
from enum import Enum

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    birthdate = db.Column(db.Date)
    phone = db.Column(db.String(250))
    role = db.Column(db.String(100), default='user')
    is_active = db.Column(db.Boolean, default=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "birthdate": self.birthdate,
            "role": self.role,
            "is_active": self.is_active
        }

class Class_(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)
    discipline_id = db.Column(db.Integer, db.ForeignKey('disciplines.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    kal = db.Column(db.Integer)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    type = db.Column(db.String(250), nullable=False)
    
    discipline = db.relationship('Discipline', backref='classes')
    teacher = db.relationship('Teacher', backref='classes')
    room = db.relationship('Room', backref='classes')
    
    def serialize(self):
        return {
            "discipline":{
                "name":self.discipline.name,
                "effort":self.discipline.effort
                },
            "teacher":{
                "name": self.teacher.name,
                "lastname": self.teacher.lastname
                },
            "date": self.date,
            "start_time": self.start_time,
            "end_time": self.end_time
        }


class Effort(Enum):
    LOW = "low"
    MID = "moderate"
    HIGHT = "hight"


class Discipline(db.Model):
    __tablename__ = 'disciplines'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text)
    effort = db.Column(db.Enum(Effort))
    image = db.Column(db.String(250))
    
    def serialize(self):
        return{
            "name": self.name,
            "description": self.description,
            "effort": self.effort.value if self.effort else None
        }

class Teacher(db.Model):
    __tablename__ ='teachers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    lastname = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(250))

    def serialize(self):
        return {
            "discipline": {
                "name": self.discipline.name,
                "effort": self.discipline.effort.value if self.discipline.effort else None
            },
            "teacher": {
                "name": self.teacher.name,
                "lastname": self.teacher.lastname
            },
            "date": self.date,
            "start_time": self.start_time,
            "end_time": self.end_time
        }

class Inscription(db.Model):
    __tablename__ = 'inscriptions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    
    user = db.relationship('User', backref='inscriptions')
    class_ = db.relationship('Class_', backref='inscriptions')
    
    def serialize(self):
        return {
            "user": {
                "name": self.user.name,
                "lastname": self.user.lastname,
                "username": self.user.username,
                "email": self.user.email,
            },
            "class": {
                "discipline": {
                    "name": self.class_.discipline.name
                },
                "teacher": {
                    "name": self.class_.teacher.name,
                    "lastname": self.class_.teacher.lastname
                },
                "date": self.class_.date,
                "start_time": self.class_.start_time,
                "end_time": self.class_.end_time
            }
        }

class Favorite(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    discipline_id = db.Column(db.Integer, db.ForeignKey('disciplines.id'))
    
    user = db.relationship('User', backref='favorites')
    discipline = db.relationship('Discipline', backref='favorites')
    
    def serialize(self):
        return{
            "user":{
                "name": self.user.name,
                "lastname": self.user.lastname,
                "username": self.user.username,
                "email": self.user.email
            },
            "discipline":{
                "name": self.discipline.name
            }
        }

class Gym(db.Model):
    __tablename__ = 'gyms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.String(250))
    street = db.Column(db.String(250))
    location = db.Column(db.String(250))
    logo = db.Column(db.String(250))
    description = db.Column(db.Text)
    
class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    capacity = db.Column(db.Integer)
    
    def serialize(self):
        return{
            "name": self.name,
            "capacity": self.capacity
        }
    
