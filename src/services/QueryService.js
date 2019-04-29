import { servicesEnum } from './enums.js';
import { API_STATUS_FETCH_TRIGGER, API_24_HOUR_STATUS } from '../data/Constants';

const query = async () => {

  const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('angelesju:Azerty01'));
    headers.append('Content-Type' , 'application/json');

  let apiSize = Object.keys(servicesEnum).length;
  let i = 0;
  let string = "";
  Object.keys(servicesEnum).forEach(api => {
    if(i < (apiSize-1)) {
      let stringBuilder =
        `"${api}" : {
          "filter" : {
            "bool" : {
              "must": [
                {
                  "match": {
                    "status": "ERROR"
                  }
                },
                {
                  "range": {
                    "creationDate": {
                      "gte": "${servicesEnum[api].from}",
                      "lte": "${servicesEnum[api].to}"
                    }
                  }
                },
                {
                  "match": {
                    "apiName": "${servicesEnum[api].apiName}"
                  }
                }
              ]
            }
          }
      },`;
      string += stringBuilder;
    } else {
      let stringBuilder =
        `"${api}" : {
          "filter" : {
            "bool" : {
              "must": [
                {
                  "match": {
                    "status": "ERROR"
                  }
                },
                {
                  "range": {
                    "creationDate": {
                      "gte": "${servicesEnum[api].from}",
                      "lte": "${servicesEnum[api].to}"
                    }
                  }
                },
                {
                  "match": {
                    "apiName": "${servicesEnum[api].apiName}"
                  }
                }
              ]
            }
          }
      }`;
      string += stringBuilder;
    }
    i++;
  })

  let apiQuery =`{
    "size" : 0,
    "aggs" : {
      ${string}
    }
  }`;

  const response = await fetch(`http://llvcp115p:9200/webmethodsmediator*/_search`, {
                      method : 'POST',
                      credentials : "include",
                      headers : headers,
                      body : apiQuery
                    });
  const json = await response.json();
  return json.aggregations;
}

self.addEventListener('message', e => {
  switch (e.data) {
    case API_STATUS_FETCH_TRIGGER:
      query().then(result => self.postMessage(result));
      return;
    case API_24_HOUR_STATUS:
      query().then(result => self.postMessage(result));
      return;
    default:
      return;
  };
});
