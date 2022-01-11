from rest_framework.viewsets import ModelViewSet
from ..models import CustomUser, CustomGroup
from .serializers import UserSerializer, GroupSerializer


class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(ModelViewSet):
    queryset = CustomGroup.objects.all()
    serializer_class = GroupSerializer
