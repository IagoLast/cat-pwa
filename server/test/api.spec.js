/* global describe, it, before */

const chai = require('chai');

const {
  expect
} = chai;
const api = require('../lib/api/index');

describe('api', () => {
  describe('getPictures', () => {
    let pictures;
    before(async () => {
      pictures = await api.getPictures();
    });
    
    it('should return an array of pictures', async () => {
      expect(pictures).to.be.an('array');
    });

    it('a picture should have an id ', async () => {
      expect(pictures[0].id).to.exist;
    });

    it('a picture should have a farm ', async () => {
      expect(pictures[0].farm).to.exist;
    });

    it('a picture should have a farm ', async () => {
      expect(pictures[0].title).to.exist;
    });

  });
});