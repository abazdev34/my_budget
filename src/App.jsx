import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';

function App() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [paidExpenses, setPaidExpenses] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const loadData = useCallback(() => {
    try {
      const savedData = localStorage.getItem('budgetData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setIncome(parsedData.income || []);
        setExpenses(parsedData.expenses || []);
        setPaidExpenses(parsedData.paidExpenses || []);
        setHistory(parsedData.history || []);
      }
    } catch (error) {
      console.error('Сакталган маалыматты жүктөөдө ката кетти:', error);
      setError('Маалыматты жүктөөдө ката кетти. Кайра аракет кылыңыз.');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const totalExpenses = [...expenses, ...paidExpenses].reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    setCurrentBalance(totalIncome - totalExpenses);

    // Save all data to localStorage
    const dataToSave = {
      income,
      expenses,
      paidExpenses,
      history
    };
    localStorage.setItem('budgetData', JSON.stringify(dataToSave));
  }, [income, expenses, paidExpenses, history]);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const category = e.target.category.value;
    const amount = parseFloat(e.target.amount.value);

    if (category && amount) {
      const newItem = { category, amount, date: new Date().toISOString() };
      if (type === 'expenses') {
        setExpenses(prev => [...prev, newItem]);
      } else {
        setIncome(prev => [...prev, newItem]);
      }
      saveToHistory(type, newItem);
      e.target.reset();
    }
  };

  const saveToHistory = (type, item) => {
    const newEntry = {
      date: new Date().toISOString(),
      type,
      data: item,
    };

    setHistory(prev => [...prev, newEntry]);
  };

  const handlePaid = (index) => {
    const paidExpense = expenses[index];
    setExpenses(prev => prev.filter((_, i) => i !== index));
    setPaidExpenses(prev => [...prev, { ...paidExpense, paidDate: new Date().toISOString() }]);
    saveToHistory('paid', paidExpense);
  };

  const clearHistory = () => {
    if (window.confirm('Чындап эле бардык тарыхты өчүргүңүз келеби?')) {
      setHistory([]);
      localStorage.removeItem('budgetData');
    }
  };

  const renderTabs = () => (
    <div className="tabs">
      <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Жалпы көрүнүш</button>
      <button className={activeTab === 'income' ? 'active' : ''} onClick={() => setActiveTab('income')}>Киреше</button>
      <button className={activeTab === 'expenses' ? 'active' : ''} onClick={() => setActiveTab('expenses')}>Чыгаша</button>
      <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Тарых</button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="section overview">
            <h2>Учурдагы абал</h2>
            <div className={`balance ${currentBalance >= 0 ? 'positive' : 'negative'}`}>
              {currentBalance.toFixed(2)} сом
            </div>
            <div className="summary">
              <div>Жалпы киреше: {income.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)} сом</div>
              <div>Жалпы чыгаша: {[...expenses, ...paidExpenses].reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)} сом</div>
            </div>
          </div>
        );
      case 'income':
        return (
          <div className="section">
            <h2>Киреше</h2>
            <form onSubmit={(e) => handleSubmit(e, 'income')} className="input-form">
              <input type="text" name="category" placeholder="Категория" required />
              <input type="number" name="amount" placeholder="Сумма" required />
              <button type="submit">Кошуу</button>
            </form>
            <div className="items-list">
              {income.map((item, index) => (
                <div key={index} className="item">
                  <span>{item.category}: {item.amount} сом</span>
                  <span>{new Date(item.date).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'expenses':
        return (
          <div className="section">
            <h2>Чыгаша</h2>
            <form onSubmit={(e) => handleSubmit(e, 'expenses')} className="input-form">
              <input type="text" name="category" placeholder="Категория" required />
              <input type="number" name="amount" placeholder="Сумма" required />
              <button type="submit">Кошуу</button>
            </form>
            <div className="items-list">
              {expenses.map((item, index) => (
                <div key={index} className="item">
                  <span>{item.category}: {item.amount} сом</span>
                  <span>{new Date(item.date).toLocaleString()}</span>
                  <button onClick={() => handlePaid(index)} className="paid-button">Берилди</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="history">
            <h2>Тарых</h2>
            {history.length > 0 ? (
              <>
                {history.map((entry, index) => (
                  <div key={index} className="history-entry">
                    <p>{new Date(entry.date).toLocaleString()} - {entry.type === 'income' ? 'Киреше' : entry.type === 'expenses' ? 'Чыгаша' : 'Төлөндү'}</p>
                    <p>{entry.data.category}: {entry.data.amount} сом</p>
                  </div>
                ))}
                <button onClick={clearHistory}>Тарыхты тазалоо</button>
              </>
            ) : (
              <p>Тарых жок</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <h1>Менин бюджетим</h1>
      {renderTabs()}
      {renderContent()}
    </div>
  );
}

export default App;