import axios from 'axios';

axios.defaults.baseURL =
  'https://asxyrac0l8.execute-api.eu-central-1.amazonaws.com/dev';

const responseBody = response => response.data;
const options = {
  headers: {
    'X-API-KEY': '5W2222jso59lcJXvAET2o1TUdHajmqrg9sYb4Txf'
  }
};
const requests = {
  get: url => axios.get(url, options).then(responseBody)
};

const fetchData = {
  listOfSystems: () => requests.get('/get-systems'),
  metaDataById: BMSHWRSN => requests.get(`/get-meta-data/${BMSHWRSN}`),
  lastPrimaryDataById: BMSHWRSN =>
    requests.get(`/get-last-primary-data/${BMSHWRSN}`)
};

export default {
  fetchData
};
