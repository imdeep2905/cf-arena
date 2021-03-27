from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("verify_user/", views.verify_user),
    path('problems/', views.problems)
]
