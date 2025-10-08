from django.db import connection, DatabaseError


def call_procedure(proc_name, params=None, out_vars=None):
    params = params or []
    out_vars = out_vars or []
    try:
        with connection.cursor() as cursor:

            call_sql = f"CALL {proc_name}({', '.join(['%s'] * len(params))}"
            if out_vars:
                call_sql += ", " + ", ".join(out_vars)
            call_sql += ")"
            cursor.execute(call_sql, params)

            if out_vars:
                cursor.execute("SELECT " + ", ".join(out_vars))
                return cursor.fetchone()
    except DatabaseError as e:
        raise Exception(str(e))
