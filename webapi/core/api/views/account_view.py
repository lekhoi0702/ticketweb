from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from webapi.core.api.serializer.serializers import AccountSerializer
from webapi.core.models.account import Account


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('-created_at')
    serializer_class = AccountSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


