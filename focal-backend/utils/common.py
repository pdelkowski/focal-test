from typing import Any, Dict 
from fastapi import Response


# This is very basic generic error handler, only for purpose of unified error returning (same as Pydantic)
def error_handler(response: Response, errors: Any, http_status=500) -> Dict:
    response.status_code = http_status
    return {
            'detail': [
                {'errors': errors}
            ]
    }
