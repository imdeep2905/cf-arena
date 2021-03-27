from django.urls import path
from . import views

urlpatterns = [
    path(
        "all_problems_update/",
        views.AllProblemsUpdate.as_view(),
        name="all_problems_update",
    ),
    path("verify_user/", views.VerifyUser.as_view(), name="verify_user"),
    path("problems/", views.Problems.as_view(), name="problems"),
    path(
        "create_problems/",
        views.CreateProblems.as_view(),
        name="create_problems",
    ),
    path("match_status", views.MatchStatus.as_view(), name="match_status"),
]
