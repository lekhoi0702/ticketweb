from rest_framework import serializers

from webapi.core.models.account import Account
from webapi.core.models.event import Event
from webapi.core.models.order import Order
from webapi.core.models.order_item import OrderItem
from webapi.core.models.promotion import Promotion
from webapi.core.models.ticket import Ticket
from webapi.core.models.ticket_type import TicketType


class OrderItemSerializer(serializers.Serializer):
    ticket_type_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class CreateOrderSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    event_id = serializers.IntegerField()
    items = OrderItemSerializer(many=True)
    promotion_code = serializers.CharField(max_length=50, allow_null=True, required=False)


class ProcessPaymentSerializer(serializers.Serializer):
    payment_method = serializers.CharField(max_length=50)


class CancelOrderSerializer(serializers.Serializer):
    reason = serializers.CharField()


class CheckinSerializer(serializers.Serializer):
    ticket_code = serializers.CharField()




class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = '__all__'
class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'


