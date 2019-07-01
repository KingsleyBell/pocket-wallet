import json
import os

from flask import Flask, render_template

# the all-important app variable:
application = Flask(__name__)


@application.route('/')
def home():
    db_path = os.path.join(application.static_folder, 'catalogue/db.json')
    db = json.loads(open(db_path, 'r').read())
    return render_template(
        'index.html',
        links=db,
        promo=False
    )


@application.route('/promo/')
def promo():
    db_path = os.path.join(application.static_folder, 'catalogue/db.json')
    db = json.loads(open(db_path, 'r').read())
    return render_template(
        'index.html',
        links=db,
        promo=True
    )


@application.route('/order-cancelled/')
def order_cancelled():
    order_status_message = (
        "Order successfully cancelled."
        "<br><br>"
        "Navigate back to store to continue shopping."
    )
    return render_template(
        'order_status.html',
        order_status_message=order_status_message
    )


@application.route('/order-complete/')
def order_complete():
    order_status_message = (
        "Thank you for your order!"
        "<br><br>"
        "You will receive details via email, "
        "and your package will be shipped within the next 48 hours :)"
    )
    return render_template(
        'order_status.html',
        order_status_message=order_status_message
    )


if __name__ == "__main__":
    application.run(host='0.0.0.0', port=800)
