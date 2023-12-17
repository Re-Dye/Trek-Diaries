import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import difflib
from flask import request, jsonify, Response
import os
import json
from collections import Counter

# function to get the trail data


def get_trail_info():
    # reading pickled data file for trails
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'pickled_trails.pkl')
    trail_dat = pd.read_pickle(file_path)
    return trail_dat

# function to generate trails


def get_recommendation_trails(trail_name):
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
    sorted_scores = sorted_scores[1:6]  # Use the top 5 trails
    top_five = [i[0] for i in sorted_scores]
    rec_trails = trail_info.iloc[top_five]['Name']

    # Replace non-breaking space with a regular space
    rec_trails = rec_trails.str.replace('\u00a0', ' ')

    # Convert the pandas Series to a list
    rec_trails_list = rec_trails.tolist()

    # Return as a Flask response
    return rec_trails_list


def get_recommendation_locations(trail_name):
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
    sorted_scores = sorted_scores[1:6]  # Use the top 5 trails
    top_five = [i[0] for i in sorted_scores]
    rec_trails = trail_info.iloc[top_five]['Name']

    # Collect locations from the top 5 trails
    top_five_locations = []
    for trail in rec_trails:
        locations = trail_info[trail_info.Name == trail]['Locations'].values[0]
        # separated by commas
        top_five_locations.extend(locations.split(','))

    # Find the top 5 most repeated locations and clean up the names
    top_five_most_repeated_locations = [
        location.strip().strip('"') for location, count in Counter(top_five_locations).most_common(5)
    ]

    # Return as a Python list
    return top_five_most_repeated_locations
