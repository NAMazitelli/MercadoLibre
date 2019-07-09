import React from 'react';
import PropTypes from 'prop-types';

const List = ({ component, items }) => {
  const ComponentToRender = component;
  let content = (<div></div>);
  // Si tenemos muchos componentes los mapeamos
  if (items) {
    content = items.map((item) => (
      <ComponentToRender key={`item-${item.id}`} item={item} />
    ));
  } else {
    // Si no renderizamos uno solo
    content = (<ComponentToRender />);
  }

  return (
    <div>
      {content}
    </div>
  );
};

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;
