from flask import Flask
from Recommend import get_recommendation_locations, get_recommendation_trails
from flask import request, jsonify, Response
# from flask_cors import CORS


app = Flask(__name__)
# CORS(app)


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

@app.route("/trail_recommendation", methods=['GET'])
def recommendation_trail():
    return get_recommendation_trails('annapurna trek')


@app.route("/locs_recommendation", methods=['GET'])
def recommendation_locs():
    return get_recommendation_locations('annapurna trek')


if __name__ == '_main_':
    app.run(debug=True)
