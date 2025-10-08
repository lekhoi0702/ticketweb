from rest_framework import viewsets

from webapi.core.api.serializer.serializers import TicketSerializer
from webapi.core.models.ticket import Ticket


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
