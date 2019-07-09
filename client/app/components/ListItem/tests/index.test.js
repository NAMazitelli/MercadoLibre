import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import FreeShippingBadge from 'components/FreeShippingBadge';
import ListItem from '../index';

describe('<ListItem />', () => {
  it('Deberia renderizar el producto que se le pase', () => {
    const content = {
	   id: 'MLA719351372',
	   title: 'Denuncia Nacimiento Alianza Canina Argentina Internacional',
	   price: {
	      currency: 'ARS',
	      amount: 400,
	      decimals: 2
	   },
	   picture: 'http://mla-s1-p.mlstatic.com/716359-MLA31020295798_062019-X.jpg',
	   condition: 'Nuevo',
	   free_shipping: false,
	   address: 'Buenos Aires'
	};
    const renderedComponent = mount(<MemoryRouter><ListItem item={content} /></MemoryRouter>);
    expect(renderedComponent.contains(content)).toBe(true);
  });
  it('Deberia renderizar el icono de Free shipping si se le indica', () => {
    const content = {
	   id: 'MLA719351372',
	   title: 'Denuncia Nacimiento Alianza Canina Argentina Internacional',
	   price: {
	      currency: 'ARS',
	      amount: 400,
	      decimals: 2
	   },
	   picture: 'http://mla-s1-p.mlstatic.com/716359-MLA31020295798_062019-X.jpg',
	   condition: 'Nuevo',
	   free_shipping: true,
	   address: 'Buenos Aires'
	};
    const renderedComponent = mount(<MemoryRouter><ListItem item={content} /></MemoryRouter>);
    expect(renderedComponent.contains(<FreeShippingBadge />)).toBe(true);
  });
});
