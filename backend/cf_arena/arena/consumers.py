import json
from .views import *
from .models import *

from channels.generic.websocket import WebsocketConsumer


class TestConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send('Connection established.')

    def receive(self, text_data):
        print('Received!')
        data = json.loads(text_data)
        room_id = data.get('roomId')
        problems = data.get('problemsList')

        if room_id and problems:
            room_instance = Room.objects.get(id=room_id)

            status = MatchStatus.get_status(room_instance.user_handle_1, room_instance.user_handle_2, problems)
            print('Status:', status)
            self.send(json.dumps(status))
