import requests
import json
from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
def home(request):
    return HttpResponse("Hello, world.")


def verify_user(request):
    if request.method == "GET":
        data = request.GET
        cf_handle = data.get("cf_handle")
        return_payload = {}
        response = requests.get(
            f"https://codeforces.com/api/user.info?handles={cf_handle}"
        ).json()
        if response["status"] == "OK":
            return_payload = json.dumps(
                {
                    "status": "OK",
                    "rating": response["result"][0]["rating"],
                    "profile_pic": response["result"][0]["titlePhoto"],
                }
            )
        else:
            return_payload = json.dumps(
                {"status": "FAILED", "error": response["comment"]}
            )
        return HttpResponse(return_payload)
    return HttpResponse({"error": "Method not allowed"})
