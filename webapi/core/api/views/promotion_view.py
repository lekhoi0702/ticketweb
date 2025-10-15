from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from webapi.core.api.serializer.serializers import PromotionSerializer
from webapi.core.models.promotion import Promotion


class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all().order_by('-created_at')
    serializer_class = PromotionSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


