from django.db import models
from django.conf import settings

class Event(models.Model):
    organizer = models.ForeignKey(
        'core.Account',  # hoặc thay bằng 'auth.User' nếu mày xài user mặc định
        on_delete=models.CASCADE,
        db_column='organizer_id'
    )
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    conditions = models.TextField(null=True, blank=True)
    logo_url = models.CharField(max_length=500, null=True, blank=True)
    banner_url = models.CharField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=500)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('published', 'Published'),
            ('ongoing', 'Ongoing'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
        ],
        default='draft'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.name
