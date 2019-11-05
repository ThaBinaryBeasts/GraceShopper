import React from 'react';
import {Link} from 'react-router-dom';

export default function Item({item}) {
  return (
    <div>
      <Link to={`/catalog/${item.id}`}>
        <img src={item.imageUrl} width={200} />
        <h1>{item.name}</h1>
      </Link>
    </div>
  );
}
