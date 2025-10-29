from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
            EC.presence_of_element_located((By.CSS_SELECTOR, 'span[class="price__default-value"]'))
        )
        price = price_element.text.strip()
        return price
    except Exception as e:
        print(f"Error scraping Nocibé: {e}")
        return "Price not found"
    finally:
        driver.quit()

# Example usage
url = "https://www.marionnaud.fr/parfum/parfum-femme/eau-de-parfum/born-in-roma-extradose-donna-parfum-valentino/p/BP_103411099?varSel=103406134&utm_source=google&utm_medium=cpc&utm_campaign=PerformanceMax-Shopping-Parfum&utm_term=&gad_source=1&gad_campaignid=20640366418&gclid=CjwKCAjwpOfHBhAxEiwAm1SwEmYXtUzvJ5sPRLE5oGRPJlcUscEAaDq_pT29DmSavAYqF__40WTREhoCjOUQAvD_BwE"
price = get_price_from_nocibe(url)
print(f"Price: {price}")
