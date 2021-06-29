import datetime
from security.user import encrypt_password

data_storage = [
    {
        'id': '1',
        'name': 'Piotrek',
        'surname': 'Dev',
        'email': 'piotrek@gmail.com',
        'password_hash': encrypt_password('qwerty123'),
        'otp_required': False,
        'otp_session_id': None,
        'otp_created_at': None,
        'otp_code': None
    },
    {
        'id': '2',
        'name': 'Maciek',
        'surname': 'Kowalsky',
        'email': 'blah@gmail.com',
        'password_hash': encrypt_password('test5000'),
        'otp_required': True,
        'otp_session_id': 'blabla123', 
        'otp_created_at': datetime.datetime.now(), 
        'otp_code': '1111111'
    },
]
