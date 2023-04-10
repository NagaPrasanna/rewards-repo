import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import data from './data';

function App() {
  const [loadData, setloadData] = useState({});
  const [rewardCal, setRewardCal] = useState({});
  const [monthlyTrans, setMonthlyTrans] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");


  useEffect(() => {
    console.log('Help');
    setloadData({ ...data });
    setUsers([...Object.keys(data)]);

  }, []);


  const userSelect = (value) => {
    setSelectedUser(value);
    const selectedUserData = loadData[value];
  
    const monthTot = {
      1: { amountSpent: [], rewards: 0 },
      2: { amountSpent: [], rewards: 0 },
      3: { amountSpent: [], rewards: 0 },
    };
  
    selectedUserData.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth() + 1;
      if (month <= 3) {
        monthTot[month].amountSpent.push(transaction.amount);
      }
    });
  
    for (let key in monthTot) {
      const total_month_rewards = monthTot[key].amountSpent.reduce((acc, price) => acc + reward(price), 0);
      monthTot[key].rewards = total_month_rewards;
    }
  
    console.log(monthTot);
    setRewardCal({ ...monthTot });
    setMonthlyTrans([...selectedUserData]);
  };
  

  return (
   
    <div className='rewardDashboard'>
      <h2 style={{ textAlign: "center" }}>User Rewards Dashborad</h2>
      <div>
        <p>
          <label>Select Customer</label>
        <select onChange={e => userSelect(e.target.value)} value={selectedUser} >
          <option value="" disabled>Select User</option>
          {users.map((item, index) => {
            return (
              <option key={index} value={item}> {item} </option>
            );
          })}
        </select>
        </p>
      </div>
      {Object.keys(rewardCal).length > 0 &&
        <Fragment>
          <table className="customers" >
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{rewardCal[1]["rewards"]}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{rewardCal[2]["rewards"]}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{rewardCal[3]["rewards"]}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>{rewardCal[1]["rewards"] + rewardCal[2]["rewards"] + rewardCal[3]["rewards"]}</td>
              </tr>
            </tbody>
          </table>
          <h4>User Transactions</h4>
          {monthlyTrans.length > 0 ?
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>

              </thead>
              <tbody>
                {monthlyTrans.map((item, index) => {
                  return <tr key={index}>
                    <td>{item["date"]}</td>
                    <td>{item["amount"]}</td>
                    <td>{reward(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
          
        </Fragment>
      }


    </ div >
  );
}

export default App;

function reward(price) {
  const rewardPoints = price > 100 ? (price - 100) * 1 +  (price - 50) * 1 : (price > 50 ? (price - 50)*1 : 0) ;
  return rewardPoints;
}
