from django.db import models
import uuid

class AllProblems(models.Model):
    problem_url = models.TextField(blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True)

    def to_dict(self):
        return {
            "problem_url": self.problem_url,
            "rating": self.rating,
        }

class Room(models.Model):
    user_handle_1 = models.TextField()
    user_handle_2 = models.TextField(blank=True, null=True)

    def to_dict(self):
        return {
            "user_handle_1": self.user_handle_1,
            "user_handle_2": self.user_handle_2,
        }
