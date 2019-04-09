import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import json
from collections import defaultdict

app = Flask(__name__, static_folder='./static')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

engine = create_engine('sqlite:///pitchfork.sqlite')
conn = engine.connect()

review_data = pd.read_sql("SELECT * FROM reviews", conn)
genres_data = pd.read_sql("SELECT * FROM genres", conn)
artists_data = pd.read_sql("SELECT * FROM artists", conn)
content_data = pd.read_sql("SELECT * FROM content", conn)
labels_data = pd.read_sql("SELECT * FROM labels", conn)

master_data = pd.DataFrame(review_data.merge(genres_data, how = 'left')).merge(labels_data, how = 'left')

master_data_json = master_data.to_json(orient = 'columns')

scatter_data = pd.read_csv('Merged_Data.csv')

scatter_data_json = scatter_data.to_json(orient = 'columns')

review_count_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['reviewid'].count()).to_json()

review_by_year_and_genre = pd.DataFrame(master_data.groupby(by = ['genre','pub_year'])['reviewid'].count())

review_score_by_year_and_genre = pd.DataFrame(master_data.groupby(by = ['genre','pub_year'])['score'].mean())

genre_count = pd.DataFrame(master_data.groupby(by = 'genre')['reviewid'].count()).to_json()

average_score_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['score'].mean()).to_json()


#create new variable, called reviews_by_genre, to set up dictionary of total reviews by year by genre
reviews_by_genre = defaultdict(lambda: defaultdict(dict))
for index, value in review_by_year_and_genre.itertuples():
    for i, key in enumerate(index):
        if i == 0:
            nested = reviews_by_genre[key]
        elif i == len(index) - 1:
            nested[key] = value
        else:
            nested = nested[key]

#create new variable, called review_count_by_genre, to set up dictionary of total reviews by year by genre
review_score_by_genre = defaultdict(lambda: defaultdict(dict))
for index, value in review_score_by_year_and_genre.itertuples():
    for i, key in enumerate(index):
        if i == 0:
            nested = review_score_by_genre[key]
        elif i == len(index) - 1:
            nested[key] = value
        else:
            nested = nested[key]


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/masterdata")
def serve_master_data():
    """serve the master data to a page in JSON format"""
    return jsonify(json.loads(master_data_json))

@app.route("/scatterdata")
def serve_scatter_data():
    return jsonify(json.loads(scatter_data_json))

@app.route("/reviewsbyyear")
def test_time():
    return jsonify(json.loads(review_count_by_year))

@app.route("/reviewsbyyearandgenre")
def serve_review_count():
    return jsonify(reviews_by_genre)

@app.route("/reviewscorebyyearandgenre")
def serve_review_score():
    return jsonify(review_score_by_genre)

@app.route("/scorebyyear")
def serve_average_review_data():
    """serve average review scores by year data to a page in JSON format"""
    ans = {}
    ans['scores'] = list(json.loads(average_score_by_year)['score'].values())
    ans['years'] = list(json.loads(average_score_by_year)['score'].keys())
    return jsonify(ans)

@app.route("/genrecount")
def serve_genre_count():
    """serve the total review count by genre to JSON"""
    ans = {}
    ans['scores'] = list(json.loads(genre_count)['reviewid'].values())
    ans['genres'] = list(json.loads(genre_count)['reviewid'].keys())
    return jsonify(ans)

if __name__ == "__main__":
    app.run()
