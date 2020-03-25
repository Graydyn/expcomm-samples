
//npm install axios
//copy in your API_KEY
//node node.js

const axios = require('axios');

const BASE_URL = "http://localhost:3000";
const API_KEY = "";

async function authenticateApi(){
    try {
        const url = BASE_URL + '/public/authenticateApi';
        const headers = {'Authorization': API_KEY};
        response = await axios.get(url, {headers: headers});
        console.log(`Received ID Token, it will expire in ${response.data['expires_in']} seconds`)
        return response.data['id_token'];
    } catch (error) {
        console.error(error);
    }
}

async function createCode(token, code){
    try {
        const url = BASE_URL + '/vendor/code'
        const headers = {'Authorization': token};
        response = await axios.post(url, code, {headers: headers});
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function updateCode(token, code){
    try {
        const url = BASE_URL + '/vendor/code'
        const headers = {'Authorization': token};
        response = await axios.put(url, code, {headers: headers});
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function deleteCode(token, code){
    try {
        const url = BASE_URL + '/vendor/code/' + code['id']
        const headers = {'Authorization': token};
        response = await axios.delete(url, {headers: headers});
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

async function runAll(){
    token = await authenticateApi();
    var code = {'code': 'abcdef123'}
    code = await createCode(token, code);
    code['sold'] = true;
    code = await updateCode(token, code);
    code['used'] = true;
    code = await updateCode(token, code);
    deleteCode(token, code);
}

runAll();