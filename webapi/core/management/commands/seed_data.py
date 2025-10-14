from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from random import randint, choice

from webapi.core.models.account import Account
from webapi.core.models.event import Event
from webapi.core.models.ticket_type import TicketType


class Command(BaseCommand):
    help = "Seed database with sample events and ticket types"

    def handle(self, *args, **options):
        # Ensure an organizer account exists
        organizer, _ = Account.objects.get_or_create(
            username='organizer_demo',
            defaults={
                'password': 'pbkdf2_sha256$600000$seed$4rKJ8c0gS9m1J6qk2c3w4u5y6z7x8v9t0u1s2r3q4p5o6n7m8l9k0j',  # dummy hash
                'role': 'organizer'
            }
        )

        created = 0
        for i in range(1, 11):
            start = timezone.now() + timedelta(days=i)
            end = start + timedelta(hours=3)
            event = Event.objects.create(
                organizer=organizer,
                name=f"Demo Event #{i}",
                category=choice(['Music', 'Tech', 'Business', 'Sports']),
                description="Sample seeded event for demo.",
                content="Program details will be provided soon.",
                conditions="Please bring your QR ticket.",
                logo_url="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop",
                banner_url="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
                location=f"Conference Hall {i}, City Center",
                start_time=start,
                end_time=end,
                status=choice(['draft', 'published'])
            )

            # Add a few ticket types per event
            for j in range(1, 4):
                TicketType.objects.create(
                    event=event,
                    name=f"General {j}",
                    description="Access to main stage",
                    price=randint(10, 50) * 1000,
                    quantity=randint(50, 200),
                    status=True,
                )
            created += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded {created} events with ticket types."))


