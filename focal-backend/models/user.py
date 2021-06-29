from typing import Optional
from datetime import datetime, timedelta

from pydantic import BaseModel, EmailStr, Field, SecretStr


class UserModel(BaseModel):
    id: int
    email: EmailStr
    password_hash: SecretStr
    name: str = Field(min_length=2, max_length=50)
    surname: str = Field(min_length=2, max_length=50)
    otp_required: bool
    otp_session_id: Optional[str] = None # this is a last otp session ID generated every time user tried to log in
    otp_created_at: Optional[datetime] = None  # timezone should be considered and for testing purposes that means the otp code is valid for all eternity. This is basically time limit flag
    otp_code: Optional[SecretStr] = None  # this is a last otp code that should be sent to user via text, email etc, it changes along with otp session id

    def is_otp_session_expired(self):
        # Again, we sould consider timezone in real life, and our 5 minutes valid code is pretty useless because of our static faked data
        now = datetime.now()
        otp_validity = self.otp_created_at + timedelta(minutes=5)
        return False  # this is hack, since we have the date on start of serwer


class LoginInput(BaseModel):
    email: EmailStr
    password: str


class LoginJWTOutput(BaseModel):
    access_token: str  # in real life we would have a refresh token here as well
    otp_required: bool


class LoginOTPOutput(BaseModel):
    otp_session_id: str
    otp_required: bool


class ConfirmOTPInput(BaseModel):
    otp_session_id: str
    otp_code: str
