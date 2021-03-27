from django.db import models


class AllProblems(models.Model):
    problem_url = models.TextField(blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True)

    def to_dict(self):
        return {
            "problem_url": self.problem_url,
            "rating": self.rating,
        }
