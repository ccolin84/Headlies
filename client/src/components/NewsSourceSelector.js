import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class NewsSourceSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'Pick A Category!',
      source: 'Pick A Source!'
    };
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleNewsSourceSelected = this.handleNewsSourceSelected.bind(this);
  }

  render() {
    return (
     <div id='newsSourceSelectorContainer'>
       <h3>Select A Source For Your Headlines</h3>
       <FormControl componentClass='select' value={ this.state.category } onChange={ this.handleCategorySelected }>
         <option key={ 'Pick A Category!' } value={ 'Pick A Category!'}>
          Pick A Category!
         </option>
         { Object.keys(this.props.newsSourcesByCategory).map((category) => (
           <option key={ category } value={ category }>
             { category }
           </option> 
         ))}
       </FormControl>
       { 
         this.state.category === 'Pick A Category!' ? '' : 
         (
           <FormControl componentClass='select' value={ this.state.source } onChange={ this.handleNewsSourceSelected }>
             <option key={ 'Pick A Source!' } value={ 'Pick A Source!'}>
               Pick A Source!
             </option>
             { this.props.newsSourcesByCategory[this.state.category].map((source) => (
              <option key={ source.name } value={ source.name } >
                { source.name }
              </option> 
             ))}
           </FormControl>
         )
       }
     </div>
   )
  }

  handleCategorySelected(e) {
    this.setState({ category: e.target.value });
  }

  handleNewsSourceSelected(e) {
    this.setState({ source: e.target.value });
    if (e.target.value !== 'Pick A Source!') this.props.updateCurrentNewsSource(e.target.value);
  }
}

export default NewsSourceSelector;