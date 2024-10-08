# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")
searchcars_url = os.getenv(
    'searchcars_url',
    default="http://localhost:3050/")

# get requests to back end
# endpoint is the endpoint to be requested e.g. "fetch_dealers"
# Python keyword arguments representing all URL parameters to be associated with the get call.
# returns the response, if there is one
def get_request(endpoint, **kwargs):
    params = ""
    if(kwargs):
        # these are all the params that need to be added to the endpoint to make the request
        for key, value in kwargs.items():
            params=params+key+"="+value+"&"
    
    request_url = backend_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json() # returns the json and not the whole thing including status
    except:
        # If any error occurs
        print("Network exception occurred, is your backend running?")
    
# retrieving sentiments from IBM Cloud microservice
def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url+"analyze/"+text
    try:
        # call get method of requests library with URL and the params I've added to the url
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")

def post_review(data):
    url = backend_url+"/insert_review"
    try:
        response = requests.post(url, json=data)
        print("post_review:")
        print(response.json())
        return response.json()
    except:
        print("Network exception occurred")

def searchcars_request(endpoint, **kwargs):
    params = ""
    if(kwargs):
        # these are all the params that need to be added to the endpoint to make the request
        for key, value in kwargs.items():
            params=params+key+"="+value+"&"
    
    request_url = searchcars_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json() # returns the json and not the whole thing including status
    except:
        # If any error occurs
        print("Network exception occurred, is the server running?")