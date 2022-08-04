class UserIdentity {
  constructor({
    RefreshToken,
    ExpiresIn,
    IdToken,
    // IdentityId,
    AccessKeyId,
    SecretKey,
    SessionToken,
    Expiration,
  }) {
    this.refreshToken = RefreshToken;
    this.expiresIn = ExpiresIn,
    this.idToken = IdToken,
    // this.identityId = IdentityId
    this.accessKeyId = AccessKeyId;
    this.secretKey = SecretKey;
    this.sessionToken = SessionToken;
    this.expiration = Expiration;
  }
}

module.exports = UserIdentity;