
from flask import Flask
from Recommend import get_recommendation_locations, get_recommendation_trails
from flask import request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy

# from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hridaya.pradhan123:c6vIW2xQlNnf@ep-muddy-darkness-92363127-pooler.ap-southeast-1.aws.neon.tech/trek-diaries'
db = SQLAlchemy(app)


class Preferences(db.Model):
    __tablename__ = 'preferences'
    __table_args__ = {'extend_existing': True}
    user_id = db.Column(db.String(50), primary_key=True)
    trail = db.Column(db.String(50))


# @app.route("/test", methods=['GET'])
# def test_endpoint():
#     youtubeLink = request.args.get('youtubeLink')
#     comment = request.args.get('comment')
#     model = request.args.get('model')
#     pageNumber = request.args.get('pageNumber')
#     return jsonify({'youtubeLink': youtubeLink,
#                     "comment": comment,
#                     "model": model,
#                     "pageNumber": pageNumber
#                     })
@app.route('/flask')
def homes_endpoint():
    return "Welcome"

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
