from abc import ABC, abstractmethod


class IDummyDB(ABC):
    @abstractmethod
    def find_user_by_email(self, email: str):
        pass

    @abstractmethod
    def find_by_otp(self, otp_session: str, otp_code: str):
        pass
