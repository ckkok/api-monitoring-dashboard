// TODO: Write the functions for the ElasticSearch queries in this module
// These are to be injected into the relevant components, e.g. APIStatusDasboard

import { servicesEnum } from './enums.js';

export default function() {

  let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('angelesju:Azerty01'));
    headers.append('Content-Type' , 'application/json');

  let apiSize = Object.keys(servicesEnum).length;
  let i = 0;
  let string = "";

  Object.keys(servicesEnum).forEach(function(api) {
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
    }else {
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
  });
  let apiQuery =`{
    "size" : 0,
    "aggs" : {
      ${string}
    }
  }`;

  fetch(`http://llvcp115p:9200/webmethodsmediator*/_search`, {
      method : 'POST',
      credentials : "include",
      headers : headers,
      body : apiQuery
       }).then(console.log)
        .catch(console.log);
}