import test from "ava";
import sinon from "sinon";

import AuthStateStore, { LOGIN_STATES } from "../src/authStateStore";

import { fakeVals, MockedUserPool, MockedUser } from "./mockedAWS";

const mockedConfig = {
  UserPoolId: fakeVals.fakeUserPoolId,
  ClientId: fakeVals.fakeClientId
};

test("Can configure", t => {
  const cut = new AuthStateStore();
  cut.configure = sinon.spy(cut.configure);

  cut.configure(mockedConfig);

  t.true(cut.configure.called);
  t.not(cut.configuration, mockedConfig); // Should not be the same object
  t.deepEqual(cut.configuration, mockedConfig); // But should be a deep copy
});

test("Can login", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(userData => new MockedUser(userData));

  cut.configure(mockedConfig);
  cut.signIn(fakeVals.fakeUsername, fakeVals.fakePassword);

  // Confirm we are in "LOGGED_IN" state
  t.not(cut.userSession, undefined);
  t.not(cut.userSession, null);
  t.not(cut.accessToken, undefined);
  t.not(cut.accessToken, null);
  t.is(typeof cut.accessToken.getJwtToken, "function");
  t.is(cut.accessToken.getJwtToken(), fakeVals.fakeJwtToken);
  t.not(cut.idToken, undefined);
  t.not(cut.idToken, null);
  t.is(cut.idToken.jwtToken, fakeVals.fakeJwtToken);
  t.is(cut.loginState, LOGIN_STATES.LOGGED_IN);
});

test("Can logout", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(userData => new MockedUser(userData));

  cut.configure(mockedConfig);
  cut.signIn(fakeVals.fakeUsername, fakeVals.fakePassword);

  // Confirm we are in "LOGGED_IN" state
  t.is(cut.loginState, LOGIN_STATES.LOGGED_IN);

  cut.signOut();

  // Confirm we are not in "SIGN_IN" state
  // Confirm we are in "LOGGED_IN" state
  t.is(cut.userSession, null);
  t.is(cut.accessToken, null);
  t.is(cut.idToken, null);
  t.is(cut.loginState, LOGIN_STATES.SIGN_IN);
});

test("Can login with MFA", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(userData => new MockedUser(userData, { triggerMFA: true }));

  cut.configure(mockedConfig);
  cut.signIn(fakeVals.fakeUsername, fakeVals.fakePassword);

  // Confirm we are in "MFA" state
  t.is(cut.loginState, LOGIN_STATES.MFA);

  cut.confirmMFA(fakeVals.fakeMFA);

  // Confirm we are in "LOGGED_IN" state
  t.not(cut.userSession, undefined);
  t.not(cut.userSession, null);
  t.not(cut.accessToken, undefined);
  t.not(cut.accessToken, null);
  t.is(typeof cut.accessToken.getJwtToken, "function");
  t.is(cut.accessToken.getJwtToken(), fakeVals.fakeJwtToken);
  t.not(cut.idToken, undefined);
  t.not(cut.idToken, null);
  t.is(cut.idToken.jwtToken, fakeVals.fakeJwtToken);
  t.is(cut.loginState, LOGIN_STATES.LOGGED_IN);
});

test("Can handle New Password Required", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(
      userData => new MockedUser(userData, { triggerNewPasswordRequired: true })
    );

  cut.configure(mockedConfig);
  cut.signIn(fakeVals.fakeUsername, fakeVals.fakePassword);

  // Confirm we are in "MFA" state
  t.is(cut.loginState, LOGIN_STATES.NEW_PASSWORD);

  cut.completeNewPasswordChallenge("newPassword", { fakeAttr: "fakeAttr1" });

  // Config we can set the new password
  t.not(cut.userSession, undefined);
  t.not(cut.userSession, null);
  t.not(cut.accessToken, undefined);
  t.not(cut.accessToken, null);
  t.is(typeof cut.accessToken.getJwtToken, "function");
  t.is(cut.accessToken.getJwtToken(), fakeVals.fakeJwtToken);
  t.not(cut.idToken, undefined);
  t.not(cut.idToken, null);
  t.is(cut.idToken.jwtToken, fakeVals.fakeJwtToken);
  t.is(cut.loginState, LOGIN_STATES.LOGGED_IN);
});

test("Fails on bad password", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(userData => new MockedUser(userData));

  cut.configure(mockedConfig);
  cut.signIn("badUsername", fakeVals.fakePassword);

  // Config login failed
  t.is(cut.loginState, LOGIN_STATES.FAILED_LOGIN);
  t.not(cut.loginError, undefined);
  t.not(cut.loginError, null);
});

test("Fails on bad MFA code", t => {
  const cut = new AuthStateStore();
  sinon.stub(cut, "getUserPool").callsFake(() => new MockedUserPool());
  sinon
    .stub(cut, "getCognitoUser")
    .callsFake(userData => new MockedUser(userData, { triggerMFA: true }));

  cut.configure(mockedConfig);
  cut.signIn(fakeVals.fakeUsername, fakeVals.fakePassword);

  // Confirm we are in "MFA" state
  t.is(cut.loginState, LOGIN_STATES.MFA);

  cut.confirmMFA("9999");

  /// Config login failed
  t.is(cut.loginState, LOGIN_STATES.FAILED_LOGIN);
  t.not(cut.loginError, undefined);
  t.not(cut.loginError, null);
});
