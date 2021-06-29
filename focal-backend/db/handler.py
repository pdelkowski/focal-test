from db.fake_data import data_storage
from models.user import UserModel
from db.interface import IDummyDB


class DummyDB(IDummyDB):
    data_storage = data_storage

    def find_user_by_email(self, email: str) -> UserModel:
        records = list(filter(lambda user: user['email'] == email, self.data_storage))

        if len(records):
            return UserModel(**records[0])

    def find_by_otp(self, otp_session_id: str, otp_code: str):
        records = list(filter(lambda user: (user['otp_session_id'] == otp_session_id and user['otp_code'] == otp_code), self.data_storage))

        if len(records):
            return UserModel(**records[0])
