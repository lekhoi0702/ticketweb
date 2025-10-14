from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from webapi.core.api.serializer.serializers import TicketTypeSerializer
from webapi.core.models.ticket_type import TicketType


class TicketTypeViewSet(viewsets.ModelViewSet):
    queryset = TicketType.objects.all()
    serializer_class = TicketTypeSerializer
    permission_classes = [AllowAny]
    authentication_classes = []