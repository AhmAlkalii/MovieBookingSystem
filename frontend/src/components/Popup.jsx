import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PaymentComponent from './PaymentComponent';

export const PopupComp = ({total, handleBuyTicket}) => {
  return (
    <Popup 
      trigger={<button className='pricebutton'> {total} Zloty</button>} 
      position="right center" 
      modal
      contentStyle={{
        width: '500px', 
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0,0,0,0.3)', 
        backgroundColor: '#E2DAD6', 
      }}
      arrowStyle={{
        color: '#f8f9fa',
      }}
    >
        <div>
            <h1 style={{ color: '#343a40', margin:20 }}>Complete Your Payment</h1>
            <PaymentComponent handleBuyTicket={handleBuyTicket}/>
        </div>
    </Popup>
  );
};
