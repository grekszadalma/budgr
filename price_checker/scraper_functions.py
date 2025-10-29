from flask import Flask, request, jsonify
from playwright.sync_api import sync_playwright, TimeoutError
import importlib
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def get_price_from_sephora(product_url: str) -> str:
    """Scrapes Sephora product price and returns cleaned text."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(product_url, timeout=60000)
        page.wait_for_timeout(5000)

        try:
            # Get inner text
            price_text = page.inner_text("span.price-sales.price-sales-standard")
            # Remove all newlines and extra spaces
            price_text = " ".join(price_text.split())
            # Optionally extract just the numeric part with regex
            import re
            match = re.search(r"\d+[.,]?\d*\s?€", price_text)
            price_text = match.group(0) if match else price_text
        except TimeoutError:
            price_text = "Price not found"

        browser.close()
        return price_text



def get_price_from_nocibe(url):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")

    driver = webdriver.Chrome(options=options)

    try:
        driver.get(url)

        # Wait for the price element to load
        price_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'span[data-testid="price-type-current"]'))
        )
        price = price_element.text.strip()
        return price.replace("\xa0", " ")
    except Exception as e:
        print(f"Error scraping Nocibé: {e}")
        return "Price not found"
    finally:
        driver.quit()



def get_price_from_marionnaud(url):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")

    driver = webdriver.Chrome(options=options)

    try:
        driver.get(url)

        # Wait for the price element to load
        price_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'span[class="price__default-value"]'))
        )
        price = price_element.text.strip()
        return price.replace("\xa0", " ")
    except Exception as e:
        print(f"Error scraping Nocibé: {e}")
        return "Price not found"
    finally:
        driver.quit()
