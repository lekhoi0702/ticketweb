from webapi.core.untils.db_helper import call_procedure


def create_order(user_id, event_id, items_json, promo_code=None):
    out = ['@p_order_id', '@p_order_code', '@p_total']
    result = call_procedure('sp_create_order', [user_id, event_id, items_json, promo_code], out)
    return {
        "order_id": result[0],
        "order_code": result[1],
        "total": result[2]
    }


def process_payment(order_id, method):
    call_procedure('sp_process_payment', [order_id, method])


def cancel_order(order_id, reason):
    call_procedure('sp_cancel_order', [order_id, reason])


def checkin_ticket(ticket_code):
    out = ['@p_success', '@p_message', '@p_ticket_info']
    result = call_procedure('sp_checkin_ticket', [ticket_code], out)
    return {
        "success": bool(result[0]),
        "message": result[1],
        "ticket_info": result[2]
    }
