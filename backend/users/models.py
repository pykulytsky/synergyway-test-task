from django.db import models


class CustomUser(models.Model):
    username = models.CharField(max_length=256, unique=True)
    created = models.DateField(auto_now_add=True)
    group = models.ForeignKey('CustomGroup', on_delete=models.PROTECT)


class CustomGroup(models.Model):
    name = models.CharField(max_length=256, unique=True)
    description = models.TextField()
