import React from 'react';

const Account = ({ name, mbti }: { name: string; mbti: string }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{mbti}</h2>
      <h2>hellou</h2>
    </div>
  );
};

export default Account;
