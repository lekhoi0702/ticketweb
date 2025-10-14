from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from webapi.core.api.serializer.serializers import UserSerializer
from webapi.core.models.user import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


