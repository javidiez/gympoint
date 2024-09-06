from . import db
from enum import Enum

class Role(Enum):
    ADMIN = "admin"
    USER = "usuario"

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    birthdate = db.Column(db.Date)
    phone = db.Column(db.String(250))
    role = db.Column(db.Enum(Role))
    is_active = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "birthdate": self.birthdate,
            "role": self.role.value if self.role else None,
            "is_active": self.is_active
        }

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)
    discipline_id = db.Column(db.Integer, db.ForeignKey('disciplines.id'))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    date = db.Column(db.Date)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    kal = db.Column(db.Integer)
    
    discipline = db.relationship('Discipline', backref='classes')
    teacher = db.relationship('Teacher', backref='classes')
    
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
    LOW = "leve"
    MID = "moderado"
    HIGHT = "alto"


class Discipline(db.Model):
    __tablename__ = 'disciplines'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text)
    effort = db.Column(db.Enum(Effort))
    
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
    class_ = db.relationship('Class', backref='inscriptions')
    
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
