import React from 'react';
import {Link} from 'react-router-dom';

export default function Item({item}) {
  return (
    <div>
      <Link to={`/items/${item.id}`}>
        <h1>{item.name}</h1>
      </Link>
    </div>
  );
}
