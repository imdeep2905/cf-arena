import constants
import requests

def generate_problem_url(contest_id, problem_index):
    return (
        f"https://codeforces.com/contest/{contest_id}/problem/{problem_index}"
    )

def helper_response(user):
        return requests.get(
            f"https://codeforces.com/api/user.status?handle={user}&count=3"
        ).json()