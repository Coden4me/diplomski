class HttpException {
  constructor(message, code, meta = {}) {
    this.message = message;
    this.code = code;
    this.meta = meta;
  }

  getCode() {
    return this.code;
  }

  getResponse() {
    return { message: this.message, ...this.meta };
  }
}

module.exports = HttpException;
