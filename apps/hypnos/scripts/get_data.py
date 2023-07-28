import time
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
from pymongo import MongoClient
from flask import Flask
from pathlib import Path

parentpath = Path(__file__).parent.resolve()

downloadpath = os.path.join(parentpath,'downloads')

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--safebrowsing-disable-download-protection")
chrome_options.add_argument("window-size=1440,900")
chrome_options.add_experimental_option("prefs", {
        "download.default_directory": downloadpath
})
driver = webdriver.Chrome(options=chrome_options)

load_dotenv()
email = os.environ['EMAIL']
password = os.environ['PASSWORD']
wait = WebDriverWait(driver, 5)

def downloaded_file(variable):
    if (".crdownload" in variable):
        return False
    else:
        return True

def download_data_from_cloud():
    data = {}
    try:
        for f in os.listdir(downloadpath):
            os.remove(os.path.join(downloadpath, f))
    except FileNotFoundError:
        print("No existing files")
    try:
        driver.get('https://cloud.ouraring.com/user/sign-in?next=%2Fprofile')
        print("Visited", driver.title)
        emailField = wait.until(
            EC.presence_of_element_located((By.ID, "email"))
        )
        passwordField = driver.find_element(By.ID,"password")
        emailField.send_keys(email)
        passwordField.send_keys(password)
        signInButton = driver.find_element(By.XPATH,"/html/body/div[1]/div/div[1]/div/main/div/form/div[3]/button[@type='submit']")
        signInButton.click()
        print("Logging In...")
        sleepJson = wait.until(
            EC.presence_of_element_located((By.XPATH, "//a[@href='/account/export/sleep/json']")))
        sleepJson.click()
        filelist = []
        downloaded_files = []
        while len(downloaded_files) < 1:
            print(downloaded_files, filelist)
            time.sleep(1)
            try:
                filelist = os.listdir(downloadpath)
                downloaded_files = list(filter(downloaded_file, filelist))
            except FileNotFoundError:
                print("Directory does not exist yet")
        print(filelist)
        for file_name in filelist: 
            with open(os.path.join(downloadpath, file_name)) as f:
                d = json.load(f)
                for k, v in d.items():
                    data[k] = v
    finally:
        driver.quit()
    return data

def update_database(data, mongokey):
    client = MongoClient(mongokey)
    db = client.get_database('db')
    records = db.data
    records.update_one({"_id": "main"}, {"$set":
            data
        }, upsert=True)
    client.close()


app = Flask(__name__)

@app.route('/')
def home():
    scrapedData = download_data_from_cloud()
    try:
        mongokey = os.environ["MONGODB_URI"]
        update_database(scrapedData, mongokey)
    except KeyError:     
        print("Environment variable MONGODB_URI does not exist, writing to database skipped. ")
    return scrapedData

if __name__ == '__main__':
    app.run()