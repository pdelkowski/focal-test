# Backend

## Install & run
```
$ python3 -m venv venv
$ pip install -r requirements.txt
$ uvicorn main:app --reload
```

## Usage
Test users:
* `piotrek@gmail.com/qwerty123` -> No OTP enabled
* `blah@gmail.com/test5000` -> OTP enabled with code `1111111`
Test users can be added in `db.fake_data.py`

## Deps
* Python 3.8
