import hashlib
import json
import os
import urllib

from flask import Flask, jsonify, render_template, request

# the all-important app variable:
application = Flask(__name__)


@application.route('/')
def home(country='USA', promo=False):
    db_path = os.path.join(application.static_folder, 'catalogue/db.json')
    db = json.loads(open(db_path, 'r').read())
    if request.method == 'POST':
        quantity = int(request.form.get('quantity'))
        name = request.form.get('name')
        surname = request.form.get('surname')
        email = request.form.get('email')
        address1 = request.form.get('address1')
        address2 = request.form.get('address2')
        city = request.form.get('city')
        country = request.form.get('country')
        zip_code = request.form.get('zip-code')

        post_data = {
            'merchant_id': 11070985,
            'merchant_key': '22ha4oa68qbxa',
            'return_url': 'https://www.pocketwallet.co.za/order-complete/',
            'cancel_url': 'https://www.pocketwallet.co.za/order-cancelled/',
            'name_first': name,
            'name_last': surname,
            'email_address': email,
            'amount': quantity * 150,
            'item_name': f'Pocket Wallet (x {quantity})'
        }

        md5 = hashlib.md5(urllib.parse.urlencode(post_data).encode('utf-8')).hexdigest()
        post_data['signature'] = md5

        return jsonify(post_data)

    else:
        return render_template(
            'index.html',
            links=db,
            promo=promo,
            country=country
        )


@application.route('/US/')
def us():
    return home()


@application.route('/ZA/', methods=['GET', 'POST'])
def za():
    return home(country='ZA')


@application.route('/promo/')
def promo():
    return home(promo=True)


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
