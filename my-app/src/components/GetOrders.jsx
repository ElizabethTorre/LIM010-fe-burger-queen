import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { OrderStructure } from './OrderStructure';
import '../css/App.css';

export const GetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState('pendiente');

  useEffect(() => {
    firebase
      .firestore()
      .collection('order')
      .where('estado', '==', state)
      .orderBy('date', 'asc')
      .onSnapshot((querySnapshot) => {
        setOrders(querySnapshot.docs.map((snapOrder) => ({ id: snapOrder.id, ...snapOrder.data() })));
      });
  }, [state]);

  const Ready = ({ id, date }) => {
    let duration = new Date() - date.toDate();
    const addZ = (n) => {
      return (n < 10 ? '0' : '') + n;
    };
    const ms = duration % 1000;
    duration = (duration - ms) / 1000;
    const secs = duration % 60;
    duration = (duration - secs) / 60;
    const mins = duration % 60;
    const hrs = (duration - mins) / 60;
    const durationTime = `${addZ(hrs)}:${addZ(mins)}:${addZ(secs)}`;
    firebase
      .firestore()
      .collection('order')
      .doc(id)
      .update({
        estado: 'listo',
        duration: durationTime,
      });
  };

  const Delivered = ({ id }) => {
    firebase
      .firestore()
      .collection('order')
      .doc(id)
      .update({
        estado: 'entregado',
      });
  };

  return (
    <React.Fragment>
      <nav className="Nav">
        {/* <button className="Nav-btn" id=""><Link to="/"> Home </Link></button> */}
        <ul>
          <li className="Nav-btn" onClick={() => setState('pendiente')}>Pendientes</li>
          <li className="Nav-btn" onClick={() => setState('listo')}>Listos</li>
          <li className="Nav-btn" onClick={() => setState('entregado')}>Entregados</li>
        </ul>
      </nav>
      <OrderStructure arr={orders} setOrderToReady={Ready} setOrderToDelivered={Delivered} />
    </React.Fragment>
  );
};
