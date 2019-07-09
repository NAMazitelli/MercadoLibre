/**
 * Testeo de inyectores
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';
import { shallow } from 'enzyme';
import React from 'react';

import configureStore from '../../configureStore';
import injectSaga from '../injectSaga';
import * as sagaInjectors from '../sagaInjectors';

const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let injectors;
  let ComponentWithSaga;

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = injectSaga({ key: 'test', saga: testSaga, mode: 'testMode' })(Component);
    sagaInjectors.default.mockClear();
  });

  it('Deberia inyectar una saga, modo y props', () => {
    const props = { test: 'test' };
    shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', { saga: testSaga, mode: 'testMode' }, props);
  });

  it('Deberia eliminarse en el unmount del componente', () => {
    const props = { test: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });
    renderedComponent.unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });

  it('Deberia setear el nombre correctamente', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(injectSaga({ key: 'test', saga: testSaga })(() => null).displayName).toBe('withSaga(Component)');
  });

  it('Deberia propagar los props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
