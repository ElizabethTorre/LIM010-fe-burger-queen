import React from 'react';
import '../css/App.css';
import { GetOrders } from '../components/GetOrders';
import { Header } from '../components/Header';

export const Chef = () => {
  return (
    <React.Fragment>
      <Header />
      <GetOrders />
    </React.Fragment>
  );
};
