import json
import time

from channels.generic.websocket import WebsocketConsumer


class TestConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        for i in range(10):
            print('sending data...')
            self.send(json.dumps({'value': i}))
            time.sleep(1)
