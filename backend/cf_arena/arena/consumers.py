import json
import time

from channels.generic.websocket import WebsocketConsumer


class TestConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send('Connection established.')

    def receive(self, text_data):
        print('Received!')
        print(text_data)
