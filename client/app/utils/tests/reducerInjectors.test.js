import { memoryHistory } from 'react-router-dom';
import identity from 'lodash/identity';

import configureStore from '../../configureStore';

import getInjectors, { injectReducerFactory } from '../reducerInjectors';

const initialState = { reduced: 'soon' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return { ...state, reduced: action.payload };
    default:
      return state;
  }
};

describe('inyectores de reducer', () => {
  let store;
  let injectReducer;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('Deberia devolver inyectores', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectReducer: expect.any(Function),
        }),
      );
    });

    it('Deberia fallar si el store no es valido', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => getInjectors(store)).toThrow();
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectReducer = injectReducerFactory(store, true);
    });

    it('Deberia validar la store si el segundo argumento es falso', () => {
      const inject = injectReducerFactory({});

      expect(() => inject('test', reducer)).toThrow();
    });

    it('No deberia validar la store si el segundo argumento es verdadero', () => {
      expect(() => injectReducer('test', reducer)).not.toThrow();
    });

    it('Deberia validar el reductor y su key', () => {
      expect(() => injectReducer('', reducer)).toThrow();
      expect(() => injectReducer(1, reducer)).toThrow();
      expect(() => injectReducer(1, 1)).toThrow();
    });

    it('Dado un store, deberia devolver una funcion para inyectar un reducer', () => {
      injectReducer('test', reducer);

      const actual = store.getState().test;
      const expected = initialState;

      expect(actual).toEqual(expected);
    });

    it('No deberia asignar un reducer si ya existe', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('Deberia reasignar un reducer si este cambio', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', identity);

      expect(store.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
