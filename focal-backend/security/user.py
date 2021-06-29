from typing import Union
import json
import os
import bcrypt
from jose import jwt
from models.user import UserModel, ConfirmOTPInput
from db.interface import IDummyDB
import config


def verify_user(db: IDummyDB, email: str, password: str) -> UserModel:
    password = password.encode('utf-8')

    user = db.find_user_by_email(email)
    if not user:
        raise TypeError('User not found')  # for security purposes normally we would return unified information that 'the user with provided credentials was not found'

    if not verify_password(password, user.password_hash.get_secret_value()):
        raise TypeError('Provided password is invalid')
    return user


def check_otp_validity(db: IDummyDB, otp_session_id: str, otp_code: str) -> UserModel:
    user = db.find_by_otp(otp_session_id, otp_code)

    if user: 
        if user.is_otp_session_expired():
            raise TypeError('OTP code expired')
        return user

    raise TypeError('OTP invalid')


def generate_token(settings: config.Settings, user: UserModel) -> str:
    payload = {
        'sub': str(user.id),
        'email': user.email,
        'name': user.name,
        'surname': user.surname
    }
    access_token = jwt.encode(payload, settings.jwt_secret_key)
    return access_token # refresh tokens etc should be added in real world


def encrypt_password(raw_password):
    raw_password_encoded = raw_password.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(raw_password_encoded, salt)


def verify_password(raw_password, hash_pass):
    return bcrypt.checkpw(raw_password, hash_pass.encode('utf-8'))
