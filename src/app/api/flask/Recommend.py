
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from scipy.spatial.distance import pdist, cdist
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, OneHotEncoder, LabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel
import difflib
from flask import request, jsonify, Response
import os

# function to get the trail data


def get_trail_info():
    # reading pickled data file for trails
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'pickled_trails.pkl')
    trail_dat = pd.read_pickle(file_path)

    return trail_dat

# function to generate trails


def get_recommendation(trail_name):
    trail_info = get_trail_info()
    current_dir1 = os.path.dirname(os.path.abspath(__file__))
    file_path1 = os.path.join(current_dir1, 'cosine_sim_allfeat3.dat')
    cosine_sim = np.loadtxt(file_path1)
    list_of_all_trails = trail_info['Name'].tolist()
    find_close_match = difflib.get_close_matches(
        trail_name, list_of_all_trails)
    close_match = find_close_match[0]
    index_of_the_trail = trail_info[trail_info.Name ==
                                    close_match]['Index'].values[0]+1
    similarity_score = list(enumerate(cosine_sim[index_of_the_trail]))
    sorted_scores = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    sorted_scores = sorted_scores[1:11]
    topTen = [i[0] for i in sorted_scores]
    rec_trails = trail_info.iloc[topTen]['Name']
    # Convert the pandas Series to a JSON string
    rec_trails_json = rec_trails.to_json()

    # Return as a Flask response
    return jsonify({"recommendations": rec_trails_json})
