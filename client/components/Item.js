import React from 'react';
import {Link} from 'react-router-dom';

export default function Item({item}) {
  return (
    <div className="itemAll">
      <Link to={`/catalog/${item.id}`}>
        <img src={item.imageUrl} width={100} />
        <h1>{item.name}</h1>
      </Link>
    </div>
  );
}
