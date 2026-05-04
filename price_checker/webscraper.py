from flask import Flask, request, jsonify
import requests
import re
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from flask_cors import CORS
from scraper_functions import get_price_from_sephora
from scraper_functions import get_price_from_nocibe
from scraper_functions import get_price_from_marionnaud

app = Flask(__name__)
CORS(app)

# Your Google API credentials
API_KEY = "AIzaSyDc2GnD2LBgA_QwCm7xHFUYoT1HbZorCWE"
CSE_ID = "c27e9db4feda64a63"

def get_google_shopping_results(query):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {"key": API_KEY, "cx": CSE_ID, "q": query}
    r = requests.get(url, params=params)
    if r.status_code != 200:
        return []
    data = r.json()
    return data.get("items", [])

def extract_price(snippet: str) -> str:
    match = re.search(r"\d+[.,]?\d*\s?€", snippet)
    return match.group(0) if match else "Price not found"



def get_links(product, category):
    if not product:
        return []

    match category:
        case "Beauty":
            query = f"{product} site:sephora.fr OR site:nocibe.fr OR site:marionnaud.fr"
        case "Entertainment":
            query = f"{product} site:fnac.com OR site:amazon.fr"
        case _:
            return []

    items = get_google_shopping_results(query)
    return [{"link": item.get("link")} for item in items if "link" in item]

@app.route("/prices")
def prices():
    product = request.args.get("name")
    category = request.args.get("category")
    links = get_links(product, category)
    results = []

    # Flags to track if we've already scraped a link for each brand
    scanned_sephora = False
    scanned_nocibe = False
    scanned_marionnaud = False

    for item in links:
        url = item.get("link")
        if not url:
            continue

        if "sephora.fr" in url and not scanned_sephora:
            print(f"Scraping Sephora: {url}")
            price = get_price_from_sephora(url)
            results.append({"link": url, "price": price})
            scanned_sephora = True  # Mark Sephora as scanned

        elif "nocibe.fr" in url and not scanned_nocibe:
            print(f"Scraping Nocibé: {url}")
            price = get_price_from_nocibe(url)
            results.append({"link": url, "price": price})
            scanned_nocibe = True  # Mark Nocibé as scanned

        elif "marionnaud.fr" in url and not scanned_marionnaud:
            print(f"Scraping Marionnaud: {url}")
            price = get_price_from_marionnaud(url)
            results.append({"link": url, "price": price})
            scanned_marionnaud = True  # Mark Marionnaud as scanned

    return jsonify(results)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
