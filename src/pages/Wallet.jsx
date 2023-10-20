import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div className="bg-[#76CA65] h-screen">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
