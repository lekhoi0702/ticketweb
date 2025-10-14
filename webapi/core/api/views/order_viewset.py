from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from webapi.core.api.serializer.serializers import OrderSerializer
from webapi.core.models.order import Order


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


