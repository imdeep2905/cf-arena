from django.urls import path
from . import views

urlpatterns = [
    path("all_problems_update/", views.AllProblemsUpdate.as_view(), name="all_problems_update"),
    path("verify_user/", views.VerifyUser.as_view(), name="verify_user"),
]
