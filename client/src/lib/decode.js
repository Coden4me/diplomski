import jwt_decode from 'jwt-decode';

export class AuthToken {
  static getId = (token) => {
    const { _id } = jwt_decode(token);
    return _id;
  };

  static getTokenData(token) {
    try {
      return jwt_decode(token);
    } catch {
      return { _id: null, name: null, email: null, picture: null };
    }
  }
}