import request from 'supertest';
import router from '../server/router';
import express from 'express';

let app;
let server;

describe('Check API Healthy', () => {
  beforeEach(async () => {
    app = router(express());
    server = app.listen(8020);
  });

  afterEach(async () => {
    app.removeAllListeners();
    server.close();
  });

  it('should return Healthy', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.text).toEqual('Healthy!');
  });
});
