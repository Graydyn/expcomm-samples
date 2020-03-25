BASE_URL = "http://localhost:3000"
API_KEY = ""

import requests

#Autheticate with yuour API key to get an ID token
url = BASE_URL + '/public/authenticateApi'
headers = {'Authorization': API_KEY}
req = requests.get(url, headers=headers)
response = req.json()
idToken = response['id_token']
print("Received ID Token, it will expire in {} seconds".format(response['expires_in']))

#Create a new code
url = BASE_URL + '/vendor/code'
code = {'code': 'abcdef123'}
headers = {'Authorization': idToken}
req = requests.post(url, data=code, headers=headers)
print("Created code")
print(req.json())
code = req.json()

#mark the code as sold
url = BASE_URL + '/vendor/code'
headers = {'Authorization': idToken}
code['sold'] = True
req = requests.put(url, data=code, headers=headers)
print("Marked code as sold")
code = req.json()
print(code)

#mark the code as used
url = BASE_URL + '/vendor/code'
headers = {'Authorization': idToken}
code['used'] = True
req = requests.put(url, data=code, headers=headers)
print("Marked code as used")
code = req.json()
print(code)

#Delete the code we just created
url = BASE_URL + '/vendor/code/' + str(code['id'])
headers = {'Authorization': idToken}
req = requests.delete(url, headers=headers)
print(req.json())