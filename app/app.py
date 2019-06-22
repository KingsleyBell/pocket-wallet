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
        links=db
    )


if __name__ == "__main__":
    application.run(host='0.0.0.0', port=800)
