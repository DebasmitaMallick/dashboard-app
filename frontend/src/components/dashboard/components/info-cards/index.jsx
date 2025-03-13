import React from 'react';
import Card from './components/Card';
import useScreenWidth from '../../../../hooks/screenWidth';

const InfoCards = ({ data }) => {
  const { purchases, revenue, refunds } = data;
  const screenWidth = useScreenWidth();

  return (
    <div
      className={`
        flex gap-4
        ${screenWidth < 1336 ? 'flex-col' : 'flex-row'}
      `}
    >
      <Card
        title="Purchases"
        value={purchases.value.toLocaleString()}
        progressPercent={Number(purchases.change)}
      />
      <Card
        title="Revenue"
        value={`$${(revenue.value / 1000).toLocaleString()}k`}
        progressPercent={Number(revenue.change)}
      />
      <Card
        title="Refunds"
        value={`$${(refunds.value / 1000).toLocaleString()}k`}
        progressPercent={Number(refunds.change)}
      />
    </div>
  );
};

export default InfoCards;
