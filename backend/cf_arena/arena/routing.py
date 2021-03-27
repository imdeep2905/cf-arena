from django.urls import path

from .consumers import TestConsumer

ws_patterns = [
    path('ws/test/', TestConsumer.as_asgi())
]