from django.urls import include, path
from rest_framework import routers
from users.api import views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('groups', views.GroupViewSet)


urlpatterns = [
    path('', include(router.urls))
]
