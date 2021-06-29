import json
from typing import TypeVar, Any, Callable
from http import HTTPStatus
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


F = TypeVar("F", bound=Callable[..., Any])

# For microservice endpoint versioning
def endpoint_version(major: int, minor: int, patch: int) -> Callable[[F], F]:
    def decorator(func: F) -> F:
        func.__api_version__ = (major, minor, patch)
        return func


# Decorator for error handling
def with_error_handling(*exceptions):
    if len(exceptions) == 0:
        exceptions = Exception

    def wrapper(func):
        def inner(*args, **kwargs):
            status_code = 200

            try:
                resp_body = func(*args, **kwargs)
            except exceptions as e:
                status_code = 400
                resp_body = {'errors': str(e)}
            finally:
                return {
                    'statusCode': 200,
                    'body': resp_body
                }
        return inner

    return wrapper


# Do some work specified in `additional_funcs` after the decorated `func` has finished. Eg. sending OTP email
def additionally(*additional_funcs):
    def wrapper(func):
        def inner(event, context):
            ret = func(event, context)
            for af in additional_funcs:
                af(event, context, ret)
            return ret
        return inner
    return wrapper
