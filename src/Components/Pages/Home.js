import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Loader from '../Common/Loader'
import { getAllProductsData } from '../../actions/allProductsActions';

class Home extends Component {
  componentDidMount() {
    this.props.getAllProductsData();
  }

  render() {
    const { 
      products,
      isLoading,
      handleShowDetails,
    } = this.props;

    if(isLoading) return Loader();

    return (
      <div className="App">
        Home
        <ul>
          {products.map(product =>
            <li 
              key={product.id}
              onClick={()=>handleShowDetails(product.id)}
            >
              {product.name}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProducts.allProducts,
  isLoading: state.allProducts.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllProductsData,
  handleShowDetails: id => push(`/coffees/${id}`),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Home);
