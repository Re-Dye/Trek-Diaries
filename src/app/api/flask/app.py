
from flask import Flask
from Recommend import get_recommendation_locations, get_recommendation_trails
from flask import request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = os.getenv('PYTHON_DB_URL')

# from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
db = SQLAlchemy(app)


class Preferences(db.Model):
    __tablename__ = 'preferences'
    __table_args__ = {'extend_existing': True}
    user_id = db.Column(db.String(50), primary_key=True)
    trail = db.Column(db.String(50))


@app.route("/trail_recommendation", methods=['GET'])
def recommendation_trail():
    userId = request.args.get('userId')
    preferences = Preferences.query.filter_by(user_id=userId).first()
    print(preferences.trail)
    return get_recommendation_trails(preferences.trail)


@app.route("/locs_recommendation", methods=['GET'])
def recommendation_locs():
    userId = request.args.get('userId')
    preferences = Preferences.query.filter_by(user_id=userId).first()
    print(preferences.trail)
    return get_recommendation_locations(preferences.trail)


if __name__ == '_main_':
    app.run(debug=True)
