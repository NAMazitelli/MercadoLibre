/**
 * Test de HomePage
 */

import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../HomePage';

const renderComponent = (props = {}) => render(<MemoryRouter><HomePage {...props} /></MemoryRouter>);

describe.only('<HomePage />', () => {
  let products;

  beforeEach(() => {
    products = {
       categories: [
          'Animales y Mascotas',
          'Perros',
          'Perros de Raza'
       ],
       items: [
          {
            id: 'MLA739314570',
            title: 'Cachorros Beagle Tricolor! Aceptamos Tarjeta',
            price: {
                currency: 'ARS',
                amount: 15999,
                decimals: 2
            },
            picture: 'http://mla-s1-p.mlstatic.com/883036-MLA27837356336_072018-X.jpg',
            condition: 'Usado',
            free_shipping: false,
            address: 'Buenos Aires'
          }
       ]
    };
  });

  it('Deberia renderear el listado de resultados', () => {
    const renderedComponent = renderComponent({
      loading: false,
      error: false,
      products,
      category: products.categories
    });
    expect(renderedComponent.text()).toContain(products.items[0].title);
  });

  it('Deberia renderear el BreadCrumbs', () => {
    const renderedComponent = renderComponent({
      loading: false,
      error: false,
      products,
      category: products.categories
    });
    expect(renderedComponent.text()).toContain(products.categories[0]);
  });
});
