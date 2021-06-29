from typing import Optional
import time
from functools import lru_cache

from fastapi import FastAPI, Response, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from security.user import verify_user, generate_token, check_otp_validity
from models.user import LoginInput, LoginJWTOutput, LoginOTPOutput, ConfirmOTPInput
from db.handler import DummyDB
from utils.common import error_handler
import config

app = FastAPI()


@lru_cache()
def get_settings():
    return config.Settings()


# CORS middleware
# let's allow everything for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Only for testing purposes for profiling
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.get("/")
async def version(settings: config.Settings = Depends(get_settings)):
    return {"version": settings.version, "stage": settings.stage}


@app.post("/auth/login")
async def login(form_data: LoginInput, response: Response, settings: config.Settings = Depends(get_settings)):
    try:
        db_handler = DummyDB()
        user = verify_user(db_handler, form_data.email, form_data.password)
        print(user)

        # Check if user has 2FA enabled
        if user.otp_required:
            # @TODO send OTP code via SMS, email, microsoft authenticator or whatever
            # best when done via message queue like Celery etc
            return LoginOTPOutput(**user.dict())

        # If no 2FA just return access token
        access_token = generate_token(settings, user)
        return LoginJWTOutput(access_token=access_token, otp_required=False)
    except TypeError as e:
        return error_handler(response, str(e), 400)
    except Exception as e:
        return error_handler(response, 'Unknown error')


@app.post("/auth/login_confirm")
async def login_confirm(form_data: ConfirmOTPInput, response: Response, settings: config.Settings = Depends(get_settings)):
    try:
        db_handler = DummyDB()
        user = check_otp_validity(db_handler, form_data.otp_session_id, form_data.otp_code)
        access_token = generate_token(settings, user)
        return LoginJWTOutput(access_token=access_token, otp_required=True)
    except TypeError as e:
        return error_handler(response, str(e), 400)
    except Exception as e:
        return error_handler(response, 'Unknown error')


@app.get("/users/activities")
async def version(settings: config.Settings = Depends(get_settings)):
    activity_data = [
            {
                "id": 1,
                "name": "Registered",
                "created_at": "2021-06-28T21:00:00"
            },
            {
                "id": 2,
                "name": "Logged in",
                "created_at": "2021-06-28T22:00:00"
            },
    ]
    return {"data": activity_data}
