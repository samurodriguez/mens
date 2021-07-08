const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * Extrae el JWT enviado en los encabezados de la solicitud sin verificar su vencimiento.
 * @returns {Object} Objeto de autenticación que contiene la identificación de usuario, el correo electrónico y la matriz de roles.
 * @param {Object} encabezados solicitan encabezados.
 * @returns {String} token extraído de los encabezados.
 */
const extractAccessToken = (headers) => {
  const { authorization } = headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Authorization required');
    error.status = 403;
    throw error;
  }

  return authorization.split(' ')[1];
};

exports.validateAuth = (req, res, next) => {
  try {
    const token = extractAccessToken(req.headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { id, name, lastname } = decodedToken;

    req.auth = { id, name, lastname };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
