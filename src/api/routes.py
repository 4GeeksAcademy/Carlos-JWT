"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=["POST"])
def signup():
    response_body = {}
    data = request.json
    user = User(username=data['username'],
                email=data['email'].lower(),
                password=data['password'],
                avatar_url=data['avatar_url'],
                is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body['message'] = 'User created successfully!'
    return response_body, 200


@api.route("/signin", methods=["POST"])
def signin():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if user and password == user.password:
        access_token = create_access_token(identity=[user.username, user.email, user.avatar_url])
        response_body['access_token'] = access_token
        response_body['message'] = "User logged suscesfully!"
        response_body['results'] = user.serialize()
        return response_body, 200
    else:
        response_body['message'] = "Error, incorrect email or password"
    return response_body


@api.route("/profile/<string:profile>", methods=["GET"])
def profile_user(profile):
    response_body = {}
    user = db.session.execute(db.select(User).filter(User.username.ilike(profile))).scalar()
    print(user)
    if user:
        response_body['message'] = "User found"
        response_body['results'] = user.serialize()
        return response_body, 200
    else:
        response_body['message'] = "User not found"
        response_body['results'] = {}
    return response_body, 404


@api.route("/profile/check", methods=["GET"])
@jwt_required()
def profile_check():
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'El usuario es: {current_user[0]}'
    response_body['results'] = current_user[0]
    return response_body, 200

# @api.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200
