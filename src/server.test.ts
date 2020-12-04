import request from 'supertest'

import server from './server'

describe('Server', () => {
  it('should return not found when request is made for unexistent endpoint', async () => {
    const response = await request(server).get('/unexistent/endpoint')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Endpoint not found')
  })
})
