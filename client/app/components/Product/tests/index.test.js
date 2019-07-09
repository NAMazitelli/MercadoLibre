import { shallow, mount } from 'enzyme';
import React from 'react';

import List from 'components/List';
import ProductDescription from 'components/ProductDescription';
import LoadingIndicator from 'components/LoadingIndicator';
import Product from '../index';

describe('<Product />', () => {
  it('Deberia Renderizar el loading cuando esta cargando', () => {
    const renderedComponent = shallow(<Product loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('Deberia renderizar un error si fallo', () => {
    const renderedComponent = mount(
      <Product loading={false} error={'Loading failed!'} />
    );
    expect(renderedComponent.text()).toMatch(/Loading failed!/);
  });

  it('Deberia renderizar el producto si pudo cargar correctamente.', () => {
    const product = {
       item: {
          id: 'MLA647579156',
          title: 'Perro Lobo Americano 75 A 90%+ (resto Ovejero Alemán Blanco)',
          price: {
             currency: 'ARS',
             amount: 115000,
             decimals: 2
          },
          picture: 'http://mla-s1-p.mlstatic.com/752415-MLA25242878719_122016-O.jpg',
          condition: 'Nuevo',
          free_shipping: false,
          sold_quantity: 0,
          description: 'Nuestros PERRO LOBO AMERICANO son reconocidos en el mundo como de los más equilibrados, dóciles y nobles\nNuestros compradores de todo el mundo solo tienen palabras de elogio para con nuestros cachorros, contamos con testimonios de varios países\nSomos la única cabaña de Argentina que ha sido certificada por la A.E.P.E.C. (asociación de Euskadi de psicólogos y Educadores Caninos - España) por cumplir con los protocolos para una correcta sanidad psicológica de nuestros cachorros\nTe regalamos la revista WOLF SPIRIT MAGAZINE, de suscripción gratuita, búscala y suscribe en unos segundos',
          categories: [
            'Animales y Mascotas',
            'Perros',
            'Perros de Raza'
          ]
       }
    };
    const renderedComponent = shallow(
      <Product product={product} error={false} />
    );

    expect(
      renderedComponent.contains(
        <ProductDescription item={product.item} />
      )
    ).toEqual(true);
  });

  it('No deberia renderizar nada si no se le pasa nada interesante', () => {
    const renderedComponent = shallow(
      <Product product={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
