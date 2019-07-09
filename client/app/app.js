/**
 * app.js
 *
 * Punto de entrada de la aplicación, solo configuración.
 */

// Para poder usar redux-saga
import '@babel/polyfill';

// Importo todas las librerias que necesito
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Importo la aplicación
import App from 'containers/App';

// Cargo el favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Importo estilos globales
import 'styles/theme.scss';

import configureStore from './configureStore';

// Observar la carga de la fuente deseada
const openSansObserver = new FontFaceObserver('Open Sans', {});

// Cuando se carga la fuente, le agregamos una clase al body para indicarle que la use.
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Creo el store de redux con history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

// Configuracion de HotModuleReplacement
if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
