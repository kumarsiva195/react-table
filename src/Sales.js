import React, { useState } from 'react';
import './Sales.css';

function Sales() {
  const [inputValue, setInputValue] = useState('');
  const [allocationPercentage, setAllocationPercentage] = useState(null);
  const [allocationValue, setAllocationValue] = useState(null);
  const [variance, setVariance] = useState(null);

  const onInput = (event) => {
    setInputValue(event.target.value);
  };

  const inputClick = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const currentValue = calculateTotalValue(data, "phones"); // Calculate total value for "Phones"
      const newAllocationValue = currentValue + (currentValue * percentage) / 100;
      setAllocationPercentage(percentage);
      setAllocationValue(newAllocationValue);
      setVariance(`${percentage}%`);
    } else {
      alert('Please enter a valid number for allocation percentage.');
    }
  };
  
  const inputVal = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const currentValue = calculateTotalValue(data, "phones"); // Calculate total value for "Phones"
      const increaseAmount = currentValue * (percentage / 100);
      const newValue = currentValue + increaseAmount;
      setAllocationValue(newValue.toFixed(2)); // Round to 2 decimal places
      setVariance(`${percentage}% of ${currentValue} = ${newValue.toFixed(2)}`);
    } else {
      alert('Please enter a valid number for the percentage increase.');
    }
  };  

  

  // Mock data
  const data = {
    "rows": [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": null, // Will be calculated
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": null, // Will be calculated
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 300
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 700
          }
        ]
      }
    ]
  };

  // Function to calculate total value recursively
  const calculateTotalValue = (node) => {
    let total = 0;
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        total += calculateTotalValue(child);
      });
    } else {
      total = node.value;
    }
    return total;
  };

  return (
    <div className="SalesPr">
      <table>
        <tbody>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance</th>
          </tr>
          {data.rows.map((parent, index) => (
            <tr key={index}>
              <td>{parent.label}</td>
              <td>{parent.value !== null ? parent.value : calculateTotalValue(parent)}</td>
              <td><input type='text' value={inputValue} onChange={onInput} /></td>
              <td><button className='' onClick={inputClick}>Sales %</button></td>
              <td><button className='' onClick={inputVal}>Sales Val</button></td>
              <td>{variance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
