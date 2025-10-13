from django.db import models

class Ticket(models.Model):
    code = models.CharField(max_length=100, unique=True)
    order = models.ForeignKey('core.Order', on_delete=models.CASCADE, db_column='order_id')
    ticket_type = models.ForeignKey('core.TicketType', on_delete=models.CASCADE, db_column='ticket_type_id')
    holder_name = models.CharField(max_length=255)
    holder_email = models.CharField(max_length=255)
    holder_phone = models.CharField(max_length=15)
    holder_id_card = models.CharField(max_length=20, null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=[
            ('unused', 'Unused'),
            ('used', 'Used'),
            ('cancelled', 'Cancelled'),
        ],
        default='unused'
    )
    checked_in_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tickets'

    def __str__(self):
        return f"{self.code} - {self.holder_name}"
