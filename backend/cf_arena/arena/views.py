import requests
from rest_framework.views import APIView
from rest_framework.response import Response

import constants
from .helpers import *
from .models import *


class AllProblemsUpdate(APIView):
    def put(self, request):
        '''
        Updates the database with all problems from CodeForces.
        '''
        return_payload = {}
        try:
            response = requests.get(
                f"{constants.CODEFORCES_URL}api/problemset.problems"
            ).json()

            if response['status'] != 'OK':
                raise Exception(response["comment"])

            for problem in response['result']['problems']:
                contest_id = problem.get("contestId")
                problem_index = problem.get("index")
                rating = problem.get('rating')

                if contest_id and problem_index and rating:
                    problem_instance, created = AllProblems.objects.update_or_create(
                        problem_url=generate_problem_url(contest_id, problem_index),
                        rating=rating,
                    )

            return_payload = {
                "status": "OK",
                "message": "Problems created/updated in database!"
            }
        except Exception as ex:
            return_payload = {
                "status": "FAILED",
                "error": str(ex)
            }

        return Response(return_payload)


class VerifyUser(APIView):
    def get(self, request):
        '''
        Given a user handle, return user details if the user exists.

        Input
        =====
        cf_handle (str): Handle of the user.

        Output
        ======
        JsonResponse:
            payload (dict):
                - status (OK/FAILED)
                - rating (int)
                - profile_pic_url (str) 
        '''
        data = request.query_params
        cf_handle = data.get("cf_handle")
        return_payload = {}

        try:
            response = requests.get(
                f"{constants.CODEFORCES_URL}api/user.info?handles={cf_handle}"
            ).json()
            if response["status"] != "OK":
                raise Exception(response["comment"])

            return_payload = {
                "status": "OK",
                "rating": response["result"][0]["rating"],
                "profile_pic_url": response["result"][0]["titlePhoto"],
            }
        except Exception as ex:
            return_payload = {
                "status": "FAILED", "error": str(ex)
            }
        return Response(return_payload)



class Problems(APIView):
    def get(self, request):
        data = request.query_params
        cf_handle = data.get("cf_handle")
        return_payload = {}

        try:
            response = requests.get(
                f"{constants.CODEFORCES_URL}api/user.status?handle={cf_handle}"
            ).json()

            if response["status"] != "OK":
                raise Exception(response["comment"])

            submissions = response.get('result')
            problem_set = set([])
            for problem in submissions:
                contest_id, index = problem["problem"].get("contestId"), problem['problem'].get("index")
 
                if contest_id and isinstance(index, str):
                    problem_url = generate_problem_url(contest_id, index)
                    problem_set.add(problem_url)

            return_payload = {
                "Problems": list(problem_set),
            }
        except Exception as ex:
            return_payload = {
                "status": "FAILED", "error": str(ex)
            }

        return Response(return_payload)
