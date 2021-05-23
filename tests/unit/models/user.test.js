const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateToken', () => {
  it('should return a valid jwt', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: 'a',
      isAdmin: false
    }
    const user = new User(payload);
    const token = user.generateAuthToken()
    const decoded = jwt.verify(token, config.jwtPrivateKey)

    expect(decoded).toMatchObject(payload);
  });
});