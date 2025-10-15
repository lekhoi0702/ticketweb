from rest_framework import serializers

from webapi.core.models.account import Account
from webapi.core.models.event import Event
from webapi.core.models.order import Order
from webapi.core.models.order_item import OrderItem
from webapi.core.models.promotion import Promotion
from webapi.core.models.ticket import Ticket
from webapi.core.models.ticket_type import TicketType
from webapi.core.models.user import User


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
        read_only_fields = ('id', 'created_at', 'organizer')

    def validate(self, attrs):
        start = attrs.get('start_time') or getattr(self.instance, 'start_time', None)
        end = attrs.get('end_time') or getattr(self.instance, 'end_time', None)
        if start and end and end <= start:
            raise serializers.ValidationError({
                'end_time': 'end_time must be after start_time'
            })
        return attrs

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'role', 'status', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'account_id', 'fullname', 'email', 'phone', 'birthday', 'gender', 'address', 'created_at')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
class OrderItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('ticket_type_id', 'quantity', 'price', 'subtotal')

class OrderWithItemsSerializer(serializers.ModelSerializer):
    items = OrderItemModelSerializer(source='orderitem_set', many=True, read_only=True)
    user = serializers.IntegerField(source='user_id', read_only=True)
    event = serializers.IntegerField(source='event_id', read_only=True)
    promotion = serializers.IntegerField(source='promotion_id', read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
        depth = 0
class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'


