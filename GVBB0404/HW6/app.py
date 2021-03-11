from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY  = "680a6b34b82ff865fc4464e1e8bb87bc"

@app.route("/")
def hello():
    return app.send_static_file('home.html')

@app.route('/searchmovie/<keywords>')
def searchmovie(keywords=""):
    req = "https://api.themoviedb.org/3/search/movie?api_key={}&language=en-US&page=1&include_adult=false&query={}".format(API_KEY, keywords)
    response = requests.get(req)
    response = jsonify(response.text)
    print(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/searchtv/<keywords>')
def searchtv(keywords=""):
    req = "https://api.themoviedb.org/3/search/tv?api_key={}&language=en-US&page=1&include_adult=false&query={}".format(API_KEY, keywords)
    response = requests.get(req)
    response = jsonify(response.text)
    print(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@app.route('/searchmulti/<keywords>')
def searchmulti(keywords=""):
    req = "https://api.themoviedb.org/3/search/multi?api_key={}&language=en-US&page=1&include_adult=false&query={}".format(API_KEY, keywords)
    response = requests.get(req)
    response = jsonify(response.text)
    print(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/trendingmovies')
def trending():
    req = "https://api.themoviedb.org/3/trending/movie/week?api_key={}".format(API_KEY)
    response = requests.get(req)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/trendingtv')
def airing():
    req = "https://api.themoviedb.org/3/tv/airing_today?api_key={}".format(API_KEY)
    response = requests.get(req)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/ss')
def searchs(movieortv="movie", keywords="avengers"):
    reqs = "https://api.themoviedb.org/3/search/{}?api_key={}&language=en-US&query={}&page=1&include_adult=true".format(movieortv, API_KEY, keywords)
    responses = requests.get(reqs)
    response = jsonify(response.text)
    pp.pprint(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/movie/<id>')
def getmoviedetails(id=""):
    reqs = "https://api.themoviedb.org/3/movie/{}?api_key={}&language=en-US".format(id,API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/tv/<id>')
def gettvdetails(id=""):
    reqs = "https://api.themoviedb.org/3/tv/{}?api_key={}&language=en-US".format(id,API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/movie/credits/<id>')
def getmoviecredits(id=""):
    reqs = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}&language=en-US".format(id,API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/tv/credits/<id>')
def gettvcredits(id=""):
    reqs = "https://api.themoviedb.org/3/tv/{}/credits?api_key={}&language=en-US".format(id,API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/movie/review/<id>')
def getmoviereviews(id=""):
    reqs = "https://api.themoviedb.org/3/movie/{}/reviews?api_key={}&language=en-US".format(id,API_KEY)
    print(reqs)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/tv/review/<id>')
def gettvreviews(id=""):
    reqs = "https://api.themoviedb.org/3/tv/{}/reviews?api_key={}&language=en-US".format(id,API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

def getreviews(movieortv,id):
    pass

@app.route('/mgenre')
def getmoviegenre():
    reqs = "https://api.themoviedb.org/3/genre/movie/list?api_key={}&language=en-US".format(API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@app.route('/tgenre')
def gettvgenre():
    reqs = "https://api.themoviedb.org/3/genre/tv/list?api_key={}&language=en-US".format(API_KEY)
    response = requests.get(reqs)
    response = jsonify(response.text)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
