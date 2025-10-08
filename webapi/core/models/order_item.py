from django.db import models


class OrderItem(models.Model):
    order = models.ForeignKey(
        'core.Order',
        on_delete=models.CASCADE,
        db_column='order_id'
    )
    ticket_type = models.ForeignKey(
        'core.TicketType',
        on_delete=models.CASCADE,
        db_column='ticket_type_id'
    )
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=18, decimal_places=2)
    subtotal = models.DecimalField(max_digits=18, decimal_places=2)

    class Meta:
        db_table = 'order_items'

    def __str__(self):
        return f"Order {self.order_id} - {self.ticket_type_id} x{self.quantity}"
