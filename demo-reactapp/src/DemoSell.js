import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "./App.css"


export class DemoSell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sell: [],
      fuelType: null,
      price: null,
      date: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }
  resetForm()
  {
    this.setState({
      sell:[]
    });
    localStorage.removeItem('SellData');
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5253/api/Demo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          fuelType: this.state.fuelType,
          date: this.state.date,
          price: this.state.price
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {

        if (!localStorage.getItem('SellData')) {
          localStorage.setItem('SellData', JSON.stringify(resJson));
        }
        else {
          var exsistingList = JSON.parse(localStorage.getItem('SellData'));
          let newdata = {
            fuelType: resJson[0].fuelType,
            date: resJson[0].date,
            price: resJson[0].price,
            discountedPrice: resJson[0].discountedPrice
          }
          exsistingList.push(newdata);
          console.log(exsistingList);

          localStorage.setItem('SellData', JSON.stringify(exsistingList));
        }
        var newList = JSON.parse(localStorage.getItem('SellData'));
        this.setState({ sell: newList });
        console.log(newList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  getList() {
    fetch("http://localhost:5253/api/Demo")
      .then(res => res.json())

      .then(
        (result) => {
          this.setState({
            sell: result
          });
        }
      );
  }

  componentDidMount() {
    //this.getList();
    console.log("componentDidMount");
  }

  render() {

    const sells = this.state.sell;
    return (

      <div className='container'>
        <form onSubmit={this.handleSubmit} >
          <label>
            Date:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="date" name='date'
            className="input-text" placeholder="Select date"
            value={this.state.value} onChange={this.handleChange} />

          <br /><br />
          <label>
            Energy Type:  </label>

          <select name='fuelType' className="input-text" value={this.state.value}
            onChange={this.handleChange} >
            <option>--Select--</option>
            <option>Gas</option>
            <option>Electricity</option>
          </select>



          <br /><br />
          <label>
            Price:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <input type="number" name='price' className="input-text" placeholder="Enter price"
            value={this.state.value} onChange={this.handleChange} />

          <br /><br></br>
          <input type="submit" className="input-submit" value="Submit" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="Clear" onClick={this.resetForm} className="input-submit" value="Clear" />
        </form>
        <br></br>
        <table>
          <thead>
            <th>Date</th>
            <th>Energy Type</th>
            <th>Price</th>
            <th>Discounted Price</th>
          </thead>
          <tbody>
            {
              sells.map(data1 =>
                <tr>
                  <td>{data1.date}</td>
                  <td>{data1.fuelType}</td>
                  <td>{data1.price}</td>
                  <td>{data1.discountedPrice}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
