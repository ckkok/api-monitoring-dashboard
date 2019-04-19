import fetchAPIStatus from '@/services/QueryService'

describe('QueryService', () => {
  it('returns API statuses from Elasticsearch', () => {
    const result = 'TODO: Fetch API statuses from ElasticSearch here';
    expect(fetchAPIStatus()).toMatch(result);
  })
})
