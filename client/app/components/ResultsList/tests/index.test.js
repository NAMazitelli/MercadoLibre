import { shallow, mount } from 'enzyme';
import React from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import ResultsList from '../index';

describe('<ResultsList />', () => {
  it('Deberia renderizar los resultados ', () => {
    const renderedComponent = shallow(<ResultsList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });


  it('Deberia renderizar un error si fallo y el error es un string', () => {
    const renderedComponent = mount(
      <ResultsList loading={false} error={'Loading failed!'} />
    );
    expect(renderedComponent.text()).toMatch(/Loading failed!/);
  });


  it('Deberia renderizar un error si fallo y el error es de otro tipo', () => {
    const renderedComponent = mount(
      <ResultsList loading={false} error={[]} />
    );
    expect(renderedComponent.text()).toMatch(/Ocurrio un error durante la busqueda/);
  });


  it('Deberia renderizar un listado de productos si el response es correcto', () => {
   const products = {
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

    const renderedComponent = shallow(
      <ResultsList products={products} error={false} />
    );

    expect(
      renderedComponent.contains(
        <List items={products.items} component={ListItem} />
      )
    ).toEqual(true);
  });

  it('No deberia renderizar nada si no se le pasa nada interesante', () => {
    const renderedComponent = shallow(
      <ResultsList items={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
