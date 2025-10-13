from django.db import models


class TicketType(models.Model):
    event = models.ForeignKey(
        'core.Event',
        on_delete=models.CASCADE,
        db_column='event_id'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=18, decimal_places=2)
    quantity = models.IntegerField()
    sold = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ticket_types'

    def __str__(self):
        return f"{self.name} ({self.event_id})"
