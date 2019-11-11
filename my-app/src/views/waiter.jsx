import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../components/Products';
import { AddOrder } from '../components/AddOrder';
import { Header } from '../components/Header';
import '../css/App.css';

export const Waiter = () => {
  const [selectProduct, setOrder] = useState([]);

  const incrementar = (prodId, cant) => {
    const arrNew = selectProduct.map((element) => {
      if (prodId === element.id) {
        return {
          ...element,
          cantidad: cant,
        };
      }
      return element;
    });
    setOrder(arrNew);
  };
  const Total = () => {
    let acum = 0;
    selectProduct.map((p) => acum += p.precio * p.cantidad);
    return acum;
  };

  return (
    <React.Fragment>
      <Header />
      {/* <button className="btn-nav">
        <Link to="/chef"> Estados de pedidos </Link>
      </button> */}
      {/* <main> */}
        <main className="Flex">
        <button className="btn-nav">
        <Link to="/chef"> Estados de pedidos </Link>
      </button>
          <Products
            addProductAtOrder={(product) => {
              const found = selectProduct.find((p) => {
                return p.id === product.id;
              });

              if (found !== undefined) {
                const newArr = selectProduct.map((p) => {
                  if (found.id === p.id) {
                    p.disable = true;
                  }
                  return p;
                });
                setOrder(newArr);
              } else {
                setOrder([...selectProduct, { ...product, cantidad: 1 }]);
              }
            }}
          />
          <AddOrder
            order={setOrder}
            products={selectProduct}
            cantidad={incrementar}
            total={Total}
            deleteRow={(element) => {
              const newArray = selectProduct.filter((ele) => {
                return element.id !== ele.id;
              });
              setOrder(newArray);
            }}
          />
        </main>
      {/* </main> */}
    </React.Fragment>
  );
};
