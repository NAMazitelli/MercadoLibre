import 'whatwg-fetch';

/**
 * Procesa el JSON devuelto por una peticion
 *
 * @param  {object} response La respuesta de una peticion
 *
 * @return {object}          El json procesado del response
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Revisa que el request venga bien y tira un error de no ser asi
 *
 * @param  {object} response   La respuesta de una peticion
 *
 * @return {object|undefined} Devuelve la respuesta o tira un error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Hace una peticion a una url y devuelve una promesa
 *
 * @param  {string} url       La URL a la que queremos hacer la peticion
 * @param  {object} [options] Las opciones que le queremos pasar al "fetch"
 *
 * @return {object}           El objeto de respuesta
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
