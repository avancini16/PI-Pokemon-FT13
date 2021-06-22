/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);

describe('Type route', () => {
  describe('GET /types', () => {
    it('Should get 200', async () => {
      await agent.get('/types')
      expect(200)
    });
    it('Should return 20 genres', async () => {
      let data = await agent.get('/types')
      expect(data.body).length(20)
    });
  });
})
