from django.db import models


class Promotion(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    type = models.CharField(
        max_length=10,
        choices=[
            ('percent', 'Percent'),
            ('fixed', 'Fixed'),
        ]
    )
    value = models.DecimalField(max_digits=18, decimal_places=2)
    max_discount = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    min_order = models.DecimalField(max_digits=18, decimal_places=2, default=0.00)
    quantity = models.IntegerField()
    used = models.IntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'promotions'

    def __str__(self):
        return f"{self.code} - {self.name}"
