import uuidv4 from "uuid/v4";
import randomstring from "randomstring";

const fakeVals = {
  fakeRegion: "us.fake.region",
  fakeUserPoolId: "test.region.nowhere",
  fakeClientId: "not.a.real.clientid",
  fakeUsername: "testUser",
  fakePassword: "testP4ssw0rd!",
  fakeMFA: "1234567890",
  fakeEmail: "test.user@test.com",
  fakeName: "Fake TestUser",
  fakePhone: "+19049049049",
  fakeJwtToken: randomstring.generate({
    length: 1736,
    charset: "alphanumeric"
  })
};

class MockedUserPool {
  constructor(...args) {}
  getClientId() {
    return fakeVals.fakeClientId;
  }
  getUserPoolId() {
    return fakeVals.fakeUserPoolId;
  }
  getUserContextData() {
    return {};
  }
}

class MockAccessToken {
  constructor(customVals) {
    customVals = customVals || {};
    this.jwtToken = fakeVals.fakeJwtToken;
    const now = customVals.now ? customVals.now : new Date().getTime();
    this.payload = {
      auth_time: now,
      client_id: fakeVals.fakeClientId,
      event_id: customVals.eventId ? customVals.eventId : uuidv4(),
      exp: now + 3600,
      iat: now,
      iss: `https://fake.url.com/${fakeVals.fakeRegion}`,
      jti: customVals.jti ? customVals.jti : uuidv4(),
      scope: "aws.cognito.signin.user.admin",
      sub: customVals.sub ? customVals.sub : uuidv4(),
      token_use: "access",
      username: fakeVals.fakeUsername
    };
  }
  getJwtToken() {
    return this.jwtToken;
  }
}

class MockIdToken {
  constructor(customVals) {
    customVals = customVals || {};
    this.jwtToken = fakeVals.fakeJwtToken;
    const now = customVals.now ? customVals.now : new Date().getTime();
    this.payload = {
      aud: fakeVals.fakeClientId,
      auth_time: now,
      "cognito:username": fakeVals.fakeUsername,
      email: fakeVals.fakeEmail,
      email_verified: true,
      event_id: customVals.eventId ? customVals.eventId : uuidv4(),
      exp: now + 3600,
      iat: now,
      iss: `https://fake.url.com/${fakeVals.fakeRegion}`,
      name: fakeVals.fakeName,
      phone_number: fakeVals.fakePhone,
      phone_number_verified: true,
      sub: customVals.sub ? customVals.sub : uuidv4(),
      token_use: "id"
    };
  }
}

class MockRefreshToken {
  constructor(customVals) {
    this.token = fakeVals.fakeJwtToken;
  }
  getToken() {
    return this.token;
  }
}

class MockUserSession {
  constructor(...args) {
    this.accessToken = new MockAccessToken();
    this.idToken = new MockIdToken();
    this.refreshToken = new MockRefreshToken();
  }
  getAccessToken() {
    return this.accessToken;
  }
  getClockDrift() {}
  getIdToken() {
    return this.idToken;
  }
  getRefreshToken() {
    return this.refreshToken;
  }
  isValid() {
    return true;
  }
}

class MockedUser {
  constructor(userData, config) {
    config = config || {};
    this.userData = userData;
    this.triggerMFA = config.triggerMFA || false;
  }
  authenticateUser(authDetails, args) {
    if (typeof args.onSuccess !== "function")
      throw new TypeError("onSuccess callback required.");
    else if (typeof args.onFailure !== "function")
      throw new TypeError("onFailure callback required.");
    else if (
      authDetails.username != fakeVals.fakeUsername ||
      authDetails.password != fakeVals.fakePassword
    )
      args.onFailure(new Error("Incorrect username or password"));
    else {
      if (this.triggerMFA) {
        args.mfaRequired({});
      } else {
        args.onSuccess(new MockUserSession());
      }
    }
  }

  sendMFACode(code, args) {
    if (typeof args.onSuccess !== "function")
      throw new TypeError("onSuccess callback required.");
    else if (typeof args.onFailure !== "function")
      throw new TypeError("onFailure callback required.");
    else if (code != fakeVals.fakeMFA)
      args.onFailure(new Error("Incorrect MFA Code"));
    else {
      args.onSuccess(new MockUserSession());
    }
  }
}

export {
  fakeVals,
  MockedUserPool,
  MockAccessToken,
  MockIdToken,
  MockRefreshToken,
  MockUserSession,
  MockedUser
};
