// TODO: Write the functions for the ElasticSearch queries in this module
// These are to be injected into the relevant components, e.g. APIStatusDasboard


export default function(servicesEnum) {
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
  return apiQuery;
}