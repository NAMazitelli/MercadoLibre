/**
 * Test de los inyectores de saga
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';

import configureStore from '../../configureStore';
import getInjectors, {
  injectSagaFactory,
  ejectSagaFactory,
} from '../sagaInjectors';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('Inyectores', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let store;
  let injectSaga;
  let ejectSaga;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('Deberia devolver inyectores', () => {
      expect(getInjectors(store)).toEqual(expect.objectContaining({
        injectSaga: expect.any(Function),
        ejectSaga: expect.any(Function),
      }));
    });

    it('Deberia fallar si el store no es válido', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => getInjectors(store)).toThrow();
    });
  });

  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    it('Deberia validar el store si el segundo argumento es falso', () => {
      const eject = ejectSagaFactory({});

      expect(() => eject('test')).toThrow();
    });

    it('No deberia validar el store si el segundo argumento es true', () => {
      Reflect.deleteProperty(store, 'dispatch');
      injectSaga('test', { saga: testSaga });

      expect(() => ejectSaga('test')).not.toThrow();
    });

    it('Deberia validar el key de la saga', () => {
      expect(() => ejectSaga('')).toThrow();
      expect(() => ejectSaga(1)).toThrow();
    });

    it('Deberia cancelar la saga por defecto', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel } };
      ejectSaga('test');

      expect(cancel).toHaveBeenCalled();
    });

    it('No deberia cancelar una saga de daemon', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel }, mode: DAEMON };
      ejectSaga('test');

      expect(cancel).not.toHaveBeenCalled();
    });

    it('Deberia ignorar sagas que no hayan sido inyectados', () => {
      expect(() => ejectSaga('test')).not.toThrow();
    });

    it('En produccion, deberia eliminar los sagas', () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT });
      injectSaga('test1', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      ejectSaga('test');
      ejectSaga('test1');

      expect(store.injectedSagas.test).toBe('done');
      expect(store.injectedSagas.test1).toBe('done');
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('En produccion, no debeeria eliminar los saga de daemon', () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('En desarrollo, no deberia eliminar los saga de daemon', () => {
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
    });
  });

  describe('injectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    it('Deberia validar el store si el segundo argumento es falso', () => {
      const inject = injectSagaFactory({});

      expect(() => inject('test', testSaga)).toThrow();
    });

    it('No deberia validar el store si el segundo argumento es true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectSaga('test', { saga: testSaga })).not.toThrow();
    });

    it('Deberia validar el key de una saga', () => {
      expect(() => injectSaga('', { saga: testSaga })).toThrow();
      expect(() => injectSaga(1, { saga: testSaga })).toThrow();
    });

    it('Deberia validar el descriptor de una saga', () => {
      expect(() => injectSaga('test')).toThrow();
      expect(() => injectSaga('test', { saga: 1 })).toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: 'testMode' })).toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: 1 })).toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT })).not.toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: DAEMON })).not.toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: ONCE_TILL_UNMOUNT })).not.toThrow();
    });

    it('Deberia pasarle argumentos a saga.run', () => {
      const args = {};
      store.runSaga = jest.fn();
      injectSaga('test', { saga: testSaga }, args);

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    it('No deberia iniciar sagas si fueron iniciadas antes', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(2);
    });

    it('Deberia iniciar cualquier saga que no haya sido iniciada antes', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga });
      injectSaga('test2', { saga: testSaga, mode: DAEMON });
      injectSaga('test3', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    it('Deberia reiniciar una saga si cambio', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { saga: testSaga, task: { cancel } };
      store.runSaga = jest.fn();

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1 });

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined);
    });

    it('No deberia cancelar las sagas de daemon en produccion', () => {
      process.env.NODE_ENV = 'production';
      const cancel = jest.fn();
      store.injectedSagas.test = { saga: testSaga, task: { cancel }, mode: RESTART_ON_REMOUNT };

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1, mode: DAEMON });

      expect(cancel).toHaveBeenCalledTimes(0);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('Deberia guardar la saga completa en el registro', () => {
      injectSaga('test', { saga: testSaga, foo: 'bar' });
      expect(store.injectedSagas.test.foo).toBe('bar');
    });
  });
});
