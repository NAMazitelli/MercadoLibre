/**
 * Testeos de la funcion request
 */

import request from '../request';

describe('request', () => {
  // Antes de cada test simulo la funcion fetch
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('Simulando respuesta exitosa', () => {
    // Antes de cada test simulo una respuesta exitosa
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('Deberia darle el formato correcto a la respuesta', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((json) => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('Simulando respuesta 204', () => {
    // Antes de cada test simulo una respuesta exitosa
    beforeEach(() => {
      const res = new Response('', {
        status: 204,
        statusText: 'No Content',
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('Deberia devolver null a las respuestas 204', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((json) => {
          expect(json).toBeNull();
          done();
        });
    });
  });

  describe('Simulando respuesta erronea', () => {
    // Antes de cada test simulo una respuesta erronea
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('Deberia detectar errores', (done) => {
      request('/thisdoesntexist')
        .catch((err) => {
          expect(err.response.status).toBe(404);
          expect(err.response.statusText).toBe('Not Found');
          done();
        });
    });
  });
});
