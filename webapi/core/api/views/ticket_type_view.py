from rest_framework import viewsets

from webapi.core.api.serializer.serializers import TicketTypeSerializer
from webapi.core.models.ticket_type import TicketType


class TicketTypeViewSet(viewsets.ModelViewSet):
    queryset = TicketType.objects.all().order_by('-created_at')
    serializer_class = TicketTypeSerializer