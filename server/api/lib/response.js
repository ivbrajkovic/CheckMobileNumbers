// Format response module

const sendJson = (code, res, message, body) => {
  res.status(code).json({
    status: code,
    message: message,
    body: body
  });
};

const status200 = (res, message, body) => sendJson(200, res, message, body);
const status500 = (res, message, body) => sendJson(500, res, message, body);

module.exports = {
  status200,
  status500
};
