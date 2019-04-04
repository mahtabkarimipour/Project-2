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

master_data = pd.DataFrame(review_data.merge(genres_data, how = 'left'))

review_count_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['reviewid'].count()).to_json()

genre_count = pd.DataFrame(master_data.groupby(by = 'genre')['reviewid'].count()).to_json()

average_score_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['score'].mean()).to_json()


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/masterdata")
def serve_master_data():
    """serve the master data to a page in JSON format"""
    return jsonify(master_data)

@app.route("/reviewsbyyear")
def serve_review_count():
    """serve the review data to a page in JSON format"""
    ans = {}
    ans['counts'] = list(json.loads(review_count_by_year)['reviewid'].values())
    ans['years'] = list(json.loads(review_count_by_year)['reviewid'].keys())
    return jsonify(ans)

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
