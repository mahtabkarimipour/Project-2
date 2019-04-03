import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

engine = create_engine('sqlite:///pitchfork.sqlite')
conn = engine.connect()

review_data = pd.read_sql("SELECT * FROM reviews", conn)
genres_data = pd.read_sql("SELECT * FROM genres", conn)
artists_data = pd.read_sql("SELECT * FROM artists", conn)

master_data = review_data.merge(genres_data, how = 'left')

review_count_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['reviewid'].count())

genre_count = pd.DataFrame(master_data.groupby(by = 'genre')['reviewid'].count())

average_score_by_year = pd.DataFrame(master_data.groupby(by = 'pub_year')['score'].mean())


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
    return jsonify(review_count_by_year)

@app.route("/scorebyyear")
def serve_average_review_data():
    """serve average review scores by year data to a page in JSON format"""
    return jsonify(average_score_by_year)

@app.route("/genrecount")
def serve_genre_count():
    """serve the total review count by genre to JSON"""
    return jsonify(genre_count)

if __name__ == "__main__":
    app.run()
