// TODO: Write the functions for the ElasticSearch queries in this module
// These are to be injected into the relevant components, e.g. APIStatusDasboard
import fs from 'fs';

export default function() {
  return fs.readFileSync('@/mockResponse.json', 'utf8');
}