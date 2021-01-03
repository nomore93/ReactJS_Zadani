import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import App from './App';*/
/**
 *  VARIABLES AND METHODS
 */

class App extends React.Component{
  constructor(props){         /* konstruktor třídy */
    super(props)

    this.input = React.createRef() // proměnná aby daný input byl vynulován (musím vytvářet pod konstruktorem)

    this.state ={
      newName: 'Petr',
      newSurname: ' Klíč',
      customers: [
        {
          id: 1,
          name: 'Martin',
          surname: ' Procházka',
        },
        {
          id: 2,
          name: 'Ota',
          surname: ' Pavliska',
        },
        {
          id: 3,
          name: 'Palo',
          surname: ' Balon',
        },
        {
          id: 4,
          name: 'František',
          surname: ' Sýkora',
        }
      ]
    }
  }

  listofcustomers = () => {
    return this.state.customers.map(customer => ( /* map se používá místo eachfor */
      <li key={customer.id} className="customer">
        
       

        <article className="">
          {customer.name}
          <br />{customer.surname}
          <a className="ctrl" onClick={() => this.removeCustomer(customer)}>
          odebrat
          </a>
          </article>
          </li>))
  }
/**
 * SAVE NEW NAME
 */
  handleName = event =>{     /* arrow function => tato funkce zdědí ten this, tzn, this se bude odkazovat na celý komponent App */
    this.setState({
      newName: event.target.value
    })
  }

  /**
   *  SAVE NEW SURNAME
   */
  handleSurname = event =>{     
    this.setState({
      newSurname: event.target.value
    })
  }

  /**
   * REMOVE CUSTOMER
   */

   removeCustomer = customer =>{
     this.setState(state =>{
       return{
         customers: state.customers.filter(item =>item !== customer)
       }
     })
   }

  handleSubmit = event =>{    
   if ( event.key === 'Enter'){
    this.setState(state =>{
      const newCustomer = {
        id: Math.max(...state.customers.map(d =>d.id)) +1,/*hledání nejvyššího ID, pak rozprostření pole */
        name: this.state.newName,                     /*a funkce map, která uděla kopii pole, nakonec inkrementuji ID */
        surname: this.state.newSurname,
        
      }

      return{
        customers: [...state.customers, newCustomer]
      }
    })  
    this.resetForm() //zavolání vyčištění/resetování daného inputu
   }
    /*alert(this.state.customer)*/
  }

  resetForm = () =>{    // vyčištění inputu
      this.setState({
        newName: '',
        newSurname: ''
      })
      this.input.current.focus()
    }

  /**
   * TEMPLATE 
   */
  
  
  render(){
    return(
      <div>
        <h1>Seznam zákazníků</h1>

        <ul>{this.listofcustomers()}</ul>

        <form className="add-new" onKeyPress={this.handleSubmit}>
          <input
            autoFocus // kurzor po odeslání do formuláře bude na tomto inputu
            type="text"
            ref={this.input} // proměnná pro vynulování inputu po odeslání do form
            value={this.state.newName}
            onChange={this.handleName}
          />
           <input
            type="text"
            value={this.state.newSurname}
            onChange={this.handleSurname}
          />
        </form>
        </div>
    )
  }

}


/*ReactDOM.render(<App />, document.getElementById('root'))*/

export default App;
