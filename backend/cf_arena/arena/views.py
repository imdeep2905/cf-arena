import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import constants
import math
import random
from .helpers import generate_problem_url, helper_response
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


class CreateProblems(APIView):
    @staticmethod
    def get_rating(cf_handle):
        """
        Given a user handle, return the rating of the user.
        If user is unrated default rating (i.e. `1000`) is
        returned.

        Input
        =====
        cf_handle (str): Handle of the first user.

        Output
        ======
        rating (int)
        """
        response = requests.get(
            f"{constants.CODEFORCES_URL}api/user.info?handles={cf_handle}"
        ).json()
        return int(response["result"][0].get("rating", 1000))

    @staticmethod
    def get_attempted_problems(cf_handle):
        """
        Given a user handle, return all  the problems attempted
        by the user.

        Input
        =====
        cf_handle (str): Handle of the first user.

        Output
        ======
        problems (set): This set contains direct urls of the problems.
        """
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

        return problem_set

    @staticmethod
    def get_problems(min_rating, max_rating):
        """
        Given minimum and maximum rating return all problems with
        rating in `[min_rating, max_rating]`.

        Input
        =====
        min_rating (int): minimum rating.
        max_rating (int): maximum rating.

        Output
        ======
        problems (list): List of all `AllProblems` objects with given
                         criteria.
        """
        return list(
            AllProblems.objects.filter(
                rating__lte=max_rating, rating__gte=min_rating
            )
        )

    def get(self, request):
        """
        Given a user handle, return the appropriate list of problems.

        Input
        =====
        cf_handle1 (str): Handle of the first user.
        cf_handle2 (str): Handle of the second user.

        Output
        ======
        Response:
            payload (dict):
                - status (OK/FAILED)
                - problems (list of problems_urls)
        """
        try:
            data = request.query_params
            cf_handle1 = data.get("cf_handle1")
            cf_handle2 = data.get("cf_handle2")
            avg_rating = (
                CreateProblems.get_rating(cf_handle1)
                + CreateProblems.get_rating(cf_handle2)
            ) // 2

            excluded_problems = CreateProblems.get_attempted_problems(
                cf_handle1
            ).union(CreateProblems.get_attempted_problems(cf_handle2))

            problems = []
            for offset in [-500, -250, 0, 200, 300]:
                min_rating, max_rating = (
                    int(math.floor((avg_rating + offset) / 100)) * 100,
                    int(math.ceil((avg_rating + offset) / 100)) * 100,
                )
                available_problems = CreateProblems.get_problems(
                    min_rating, max_rating
                )
                random.shuffle(available_problems)
                for problem in available_problems:
                    if problem.problem_url not in excluded_problems:
                        problems.append(problem.problem_url)
                        break
            return Response({"status": "OK", "problems": problems})

        except Exception as err:
            return Response({"status": "FAILED", "message": err})


class VerifyUser(APIView):
    def get(self, request):
        """
        Given a user handle, return user details if the user exists.

        Input
        =====
        cf_handle (str): Handle of the user.

        Output
        ======
        Response:
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
                "rating": response["result"][0].get("rating", "Unrated"),
                "profile_pic_url": response["result"][0]["titlePhoto"],
            }
        except Exception as ex:
            return_payload = {"status": "FAILED", "error": str(ex)}
        return Response(return_payload)


class MatchStatus(APIView):
    @staticmethod
    def get_status(user_one, user_two, problems):
        return_payload = {}
        for problem in problems:
            return_payload[problem] = [None, float("inf")]

        for user in [user_one, user_two]:
            try:
                submission_details = helper_response(user)
                submissions = submission_details.get("result")
                for problem in submissions:
                    contestId, index = (
                        problem["problem"].get("contestId", None),
                        problem["problem"]["index"],
                    )
                    verdict = problem.get("verdict")
                    id = problem.get("id")
                    if contestId and type(index) == str and verdict == "OK":
                        problem_url = generate_problem_url(contestId, index)
                        if (
                            problem_url in problems
                            and id < return_payload[problem_url][1]
                        ):
                            return_payload[problem_url] = [user, id]
            except:
                pass

        for res in return_payload:
            return_payload[res] = return_payload[res][0]

        return return_payload

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
        Response:
            payload (dict):
                - problem url : solved by user1 or user2 or null
        """
        data = request.data
        user_one = data.get("user1")
        user_two = data.get("user2")
        problems = data.get("problemList")

        return_payload = MatchStatus.get_status(user_one, user_two, problems)
        
        return Response(return_payload)


class CreateRoom(APIView):
    def post(self, request):
        """
        Given a user handle, create a new room for that user.

        Input
        =====
        cf_handle (str): Codeforces Handle of the user.

        Output
        ======
        room_id (str): Unique ID of the newly created room.
        """
        return_payload = {}
        try:
            data = request.data
            cf_handle = data.get('cf_handle')
            room_instance = Room.objects.create(user_handle_1=cf_handle)

            return_payload = {
                "status": "OK",
                "room_id": room_instance.id,
            }

        except Exception as ex:
            return_payload = {"status": "FAILED", "error": str(ex)}

        return Response(return_payload)


class JoinRoom(APIView):
    def put(self, request):
        """
        Adds the given user to the given room if vacant.

        Input
        =====
        cf_handle (str): Codeforces Handle of the user.
        room_id (str): Unique ID of the room.
        """
        return_payload = {}
        try:
            data = request.data
            cf_handle = data.get('cf_handle')
            room_id = data.get('room_id')
            room_instance = Room.objects.filter(id=room_id)
            if len(room_instance) == 0:
                raise Exception('No room with the given ID found.')

            if cf_handle in [room_instance[0].user_handle_1, room_instance[0].user_handle_2]:
                raise Exception(
                    'The given user is already present in the room.')

            if room_instance[0].user_handle_2:
                raise Exception('The given room is already full.')

            room_instance.update(user_handle_2=cf_handle)

            return_payload = {
                "status": "OK",
                "message": "User successfully added to the room!",
                "user1": room_instance[0].user_handle_1
            }

        except Exception as ex:
            return_payload = {"status": "FAILED", "error": str(ex)}

        return Response(return_payload)
