import requests
from rest_framework.views import APIView
from rest_framework.response import Response

import constants
from .helpers import *
from .models import *


class AllProblemsUpdate(APIView):
    def put(self, request):
        """
        Updates the database with all problems from CodeForces.
        """
        return_payload = {}
        try:
            response = requests.get(
                f"{constants.CODEFORCES_URL}api/problemset.problems"
            ).json()

            if response["status"] != "OK":
                raise Exception(response["comment"])

            for problem in response["result"]["problems"]:
                contest_id = problem.get("contestId")
                problem_index = problem.get("index")
                rating = problem.get("rating")

                if contest_id and problem_index and rating:
                    (
                        problem_instance,
                        created,
                    ) = AllProblems.objects.update_or_create(
                        problem_url=generate_problem_url(
                            contest_id, problem_index
                        ),
                        rating=rating,
                    )

            return_payload = {
                "status": "OK",
                "message": "Problems created/updated in database!",
            }
        except Exception as ex:
            return_payload = {"status": "FAILED", "error": str(ex)}

        return Response(return_payload)


class VerifyUser(APIView):
    def get(self, request):
        """
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
        """
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
            return_payload = {"status": "FAILED", "error": str(ex)}
        return Response(return_payload)


class Problems(APIView):
    def get(self, request):
        """
        Given a user handle, returns all the problems solved by that user.

        Input
        =====
        cf_handle (str): Handle of the user.

        Output
        ======
        JsonResponse:
            payload (dict):
                - status (OK/FAILED)
                - Problems (Array of urls)
        """
        data = request.query_params
        cf_handle = data.get("cf_handle")
        return_payload = {}

        try:
            response = requests.get(
                f"{constants.CODEFORCES_URL}api/user.status?handle={cf_handle}"
            ).json()

            if response["status"] != "OK":
                raise Exception(response["comment"])

            submissions = response.get("result")
            problem_set = set([])
            for problem in submissions:
                contest_id, index = (
                    problem["problem"].get("contestId"),
                    problem["problem"].get("index"),
                )

                if contest_id and isinstance(index, str):
                    problem_url = generate_problem_url(contest_id, index)
                    problem_set.add(problem_url)

            return_payload = {
                "status": "OK",
                "Problems": list(problem_set),
            }
        except Exception as ex:
            return_payload = {"status": "FAILED", "error": str(ex)}

        return Response(return_payload)

class MatchStatus(APIView):
    def post(self, request):
        """
        Given a user handle, return user details if the user exists.

        Input
        =====
        user1 (str): Handle of the user one of match.
        user2 (str): Handle of the user one of match.
        problemList (Array of url): problemset of the match.

        Output
        ======
        JsonResponse:
            payload (dict):
                - problem url : solved by user1 or user2 or null
        """
        data = request.data
        user_one = data.get("user1")
        user_two = data.get("user2")
        problems = data.get("problemList")
        
        return_payload = {}
        for problem in problems:
            return_payload[problem] = [None, float('inf')]
        
        for user in [user_one,user_two]:
            try:
                submission_details = helper_response(user)
                submissions = submission_details.get('result')
                for problem in submissions:
                    contestId, index = problem["problem"].get("contestId",None), problem['problem']["index"]
                    verdict = problem.get("verdict")
                    id = problem.get("id")
                    if contestId and type(index)==str and verdict=='OK':
                        problem_url = generate_problem_url(contestId,index)
                        if problem_url in problems and id<return_payload[problem_url][1]:
                            return_payload[problem_url]=[user,id]
            except:
                pass

        for res in return_payload:
            return_payload[res]= return_payload[res][0]
        return Response(return_payload)