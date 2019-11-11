import React from 'react';
// import PropTypes from 'prop-types';
import '../css/App.css';

export const OrderStructure = ({ arr, setOrderToReady, setOrderToDelivered }) => {
  return (
    <React.Fragment>
      {arr.map((product) => {
        return (
          <div className="Status" key={product.id}>
            <h2>{product.estado.toUpperCase()}</h2>
            <p className="">
              <span>Cliente: </span>
              {product.name}
            </p>
            <p className="">
              <span>N° de Mesa: </span>
              {product.mesa}
            </p>
            <p className="">
              <span>Hora de Pedido: </span>
              {product.date.toDate().getHours()}
:
              {product.date.toDate().getMinutes()}
            </p>

            {(product.estado === 'listo' || product.estado === 'entregado') && (
            <p>
              <span>Tiempo Transcurrido: </span>
              {product.duration}
            </p>
            )}

            <table className="">
              <thead>
                <tr>
                  <th colSpan="5">DETALLE DE PEDIDO</th>
                </tr>
                <tr>
                  <td>CANT.</td>
                  <td>DESCRIPCIÓN</td>
                  <td>PU</td>
                  <td>SUBTOTAL</td>
                </tr>
              </thead>
              <tbody>
                {product.product.map((p) => {
                  return (
                    <tr key={p.nombre}>
                      <td>{p.cantidad}</td>
                      <td>{p.nombre}</td>
                      <td>{p.precio}</td>
                      <td>{p.cantidad * p.precio}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="tot">
              TOTAL = S/.
              {product.total}
            </p>
            {product.estado === 'pendiente' && (
              <button type="button" onClick={() => setOrderToReady(product)}>
                Marcar como pedido LISTO
              </button>
            )}
            {product.estado === 'listo' && (
              <button type="button" onClick={() => setOrderToDelivered(product)}>
                Marcar como pedido ENTREGADO
              </button>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};
