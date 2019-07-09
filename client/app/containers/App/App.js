/**
 *
 * App
 * El esqueleto de la pagina
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SingleProductPage from 'containers/SingleProductPage/Loadable';

import Header from 'components/Header';


const App = () => (
      <div>
        <Helmet
          titleTemplate="%s - MercadoLibre"
          defaultTitle="MercadoLibre"
        >
          <meta name="description" content="MercadoLibre" />
        </Helmet>
        <Header />
        <main>
          <div className="flexbox fullwidth">
            <div className="column is-10-desktop nopad  is-offset-1-desktop">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/items" component={HomePage} />
                <Route path="/item/:id" component={SingleProductPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
);

export default App;
