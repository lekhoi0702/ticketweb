from django.db import models


class Order(models.Model):
    code = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(
        'core.Account',
        on_delete=models.CASCADE,
        db_column='user_id'
    )
    event = models.ForeignKey(
        'core.Event',
        on_delete=models.CASCADE,
        db_column='event_id'
    )
    promotion = models.ForeignKey(
        'core.Promotion',         #
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='promotion_id'
    )
    subtotal = models.DecimalField(max_digits=18, decimal_places=2, default=0.00)
    discount = models.DecimalField(max_digits=18, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=18, decimal_places=2, default=0.00)
    payment_method = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('paid', 'Paid'),
            ('cancelled', 'Cancelled'),
            ('refunded', 'Refunded'),
        ],
        default='pending'
    )
    note = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'orders'

    def __str__(self):
        return f"Order #{self.id} - {self.status}"
