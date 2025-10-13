import json

from webapi.core.repository import order_repository


def create_order(user_id, event_id, items, promo_code=None):
    items_json = json.dumps(items)
    return order_repository.create_order(user_id, event_id, items_json, promo_code)


def process_payment(order_id, method):
    return order_repository.process_payment(order_id, method)


def cancel_order(order_id, reason):
    return order_repository.cancel_order(order_id, reason)


def checkin_ticket(ticket_code):
    return order_repository.checkin_ticket(ticket_code)
