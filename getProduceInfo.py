from selenium import webdriver
from bs4 import BeautifulSoup
import json
from collections import defaultdict

produce = ['red delicious apples', 'carrots']
produceList = [
    'Apples, with skin, red delicious',
    'carrots'
    ]
urls = [0] * 2
beginning = 'https://www.nutritionvalue.org/'
ending = '%2C_raw_nutritional_value.html?size=1+ounce+%3D+28.3495+g'
dictionary = [{
        "key": 1,
        "calories": 17,
        "name": "apple",
        "taste": "sweet",
        "pricePerOz": 0.20,
        "type": "fruit",
        "benefits": [
            "Good to keep the doctor away",
            "Good for the heart"
        ],
        "vitamins": {},
        "carbohydrates": {},
        "minerals": {},
        "others": {}
        #img: appleImg
    }]

def createUrls(produce):
    for i in range(len(produceList)):
        produceNew = produceList[i].replace(',', "%2C").replace(' ', "_")
        urls[i] = beginning + produceNew + ending
        #print(urls[i])

def getCalories(soup):
    calories = soup.select('#main > tbody > tr.food-info > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td.right')
    return calories[0].get_text()
        
def vitaminTable(soup, index):
    table = soup.select('#main > tbody > tr.food-info > td > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1)')
    tablee = table[0].find_all('tr')
    dictionary[index]['vitamins'] = {}

    for x in range(2, len(tablee)): # for Vitamins
        if(not(tablee[x].next.next.find('<'))):
            vitaminName = tablee[x].next.next.next
            dictionary[index]['vitamins']['vitaminName'] = tablee[x].content[1]
            print(tablee[x].next.next.next)
            print(tablee[x].contents[1])
    return tablee
    #sib = table.find_all('tr')

browser = webdriver.Chrome()
createUrls(produceList)
for x in range(len(urls)):
    browser.get(urls[x])
    content = browser.page_source
    soup = BeautifulSoup(content, 'html.parser')
    #print(soup.prettify())
    dictionary[x]['name'] = produce[x]
    cal = getCalories(soup)
    print('cal ' + cal)
    t = vitaminTable(soup, x)
    print('')


browser.quit();
json_object = json.dumps(dictionary, indent = 4)
with open("./juice-houston/src/sample.json", "w") as outfile:
    outfile.write(json_object)