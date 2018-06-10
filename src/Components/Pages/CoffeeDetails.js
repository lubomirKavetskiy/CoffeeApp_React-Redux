import React, { Component } from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import { getOneProductData } from '../../actions/oneProductAction';
import { sortNameMake } from '../../actions/sortNameAction';
import Loader from '../Common/Loader';
import { postReport } from '../../ProductService';
import {
  returnMinValue,
  returnMaxValue,
  returnAvgValue,
} from '../Common/CommonFunctions';
import Modal from '../Common/Modal';
import ReportData from '../Modal/ReportData';

class CoffeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: `04/8/2018`,
      endDate: `04/29/2018`,
      showCalendar: false,
      showModal: false,
      focusedInput: null,
      filterText: 0,
      inputEmailValue: ``,
    };

    this.renderRows = this.renderRows.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.returnBody = this.returnBody.bind(this);
  }

  componentDidMount() {
    this.props.getOneProductData(Number(this.props.match.params.id));
  }

  toggleCalendar = () => this.setState({ showCalendar: !this.state.showCalendar });

  returnLimitCalendarDates = () => {
    const { product } = this.props;
    let minCalendarDateArray = [];
    let maxCalendarDateArray = [];

    product.pricesAndDates.map((data, index) => {
      const minDate = returnMinValue(data.pricingDataByWeek, moment, `week`);
      const maxDate =  returnMaxValue(data.pricingDataByWeek, moment, `week`);
     
      minCalendarDateArray = [...minCalendarDateArray, Object.assign({}, {week: minDate})];
      maxCalendarDateArray = [...maxCalendarDateArray, Object.assign({}, {week: maxDate})];
    });

     return ({
      min: returnMinValue(minCalendarDateArray, moment, `week`),
      max: returnMaxValue(maxCalendarDateArray, moment, `week`),
    });
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { min, max } = this.returnLimitCalendarDates();
    const newStartDate = moment(startDate).calendar();
    const newEndDate = moment(endDate).calendar();
    
    this.setState({ 
        startDate: newStartDate,
        endDate: newEndDate,
    });
  }

  returnData = (sortNameValue, filterText) => {
    const { product } = this.props;
    const data = product.pricesAndDates.map(data => {
      const neededData = data.pricingDataByWeek.filter(data => {
        return (
          moment(data.week) >= moment(this.state.startDate).subtract(6, 'days') && moment(data.week) <= moment(this.state.endDate)
        );
      });

      const bannerId = data.banner.id;
      const bannerName = data.banner.name;
      const dates = `${this.state.startDate} - ${this.state.endDate}`;
      const minPriceItem = returnMinValue(neededData, Number, `price`);
      const maxPriceItem = returnMaxValue(neededData, Number, `price`);
      const avgPrice = returnAvgValue(neededData, Number, `price`);

      return {
        bannerId,
        name: bannerName,
        dates,
        min: minPriceItem,
        max: maxPriceItem,
        avgPrice,
      }
    }).sort((a, b) => {
      if(sortNameValue === `asc`) {
        return a.name.localeCompare(b.name);
      } else if (sortNameValue === `desc`) {
        return b.name.localeCompare(a.name);
      }
    }).filter(obj => {
      for(const value of Object.values(obj)) {
        if (String(value).toLowerCase().indexOf(String(filterText).toLowerCase()) > -1) {
          return true;
        } 
      }
    });
    return data;
  }

  returnDataForReportModal = () => ({
    to: 'lubomirkavetskiy@gmail.com',
    product: this.props.product.name,
    dates: `${this.state.startDate} - ${this.state.endDate}`,
    data: this.returnData(this.state.sortNameValue, this.state.filterText).map(data => (
      {
        name: data.name,
        min: data.min,
        max: data.max,
      }
    ))
  })

  returnBody = emailAdress => ({
    ...this.returnDataForReportModal(),
    to: emailAdress,
  })

  renderRows = () => this.returnData(this.props.sortNameValue, this.state.filterText).map((data, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{data.name}</td>
      <td>{`${this.state.startDate} - ${this.state.endDate}`}</td>
      <td>{data.min}</td>
      <td>{data.max}</td>
      <td>{data.avgPrice}</td>
    </tr>
  ))

  reternDataForMainRow = () => {
    const productName = this.props.product.name;
    const minPrice = returnMinValue(this.returnData(this.props.sortNameValue, this.state.filterText), Number, `min`);
    const maxPrice = returnMaxValue(this.returnData(this.props.sortNameValue, this.state.filterText), Number, `max`);
    const avgPrice = returnAvgValue(this.returnData(this.props.sortNameValue, this.state.filterText), Number, `avgPrice`);

    return {
      productName,
      minPrice,
      maxPrice,
      avgPrice,
    }  
  }

  renderMainRow = () => (
    <tr>
      <td>{this.reternDataForMainRow().productName}</td>
      <td>{this.reternDataForMainRow().minPrice}</td>
      <td>{this.reternDataForMainRow().maxPrice}</td>
      <td>{this.reternDataForMainRow().avgPrice}</td>
    </tr>
  )

  handleCloseModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleInputEmailChange = e => {
    this.setState({
      inputEmailValue: e.target.value,
    })
  }

  render() {
    const {
      isLoading,
      product,
      sortNameValue,
      sortNameMake,
    } = this.props;

    const {
      startDate,
      endDate,
      showCalendar,
      showModal,
      inputEmailValue,
    } = this.state;

    if (isLoading) {
      return Loader();
    }; 

    return(
      <div>
        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td>Min price</td>
              <td>Max price</td>
              <td>Average price</td>
            </tr>
          </thead>
          {!!Object.keys(product).length && <tbody>{this.renderMainRow()}</tbody>}
        </table>

        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Banner 
                <button onClick={() => sortNameMake()}>
                  {sortNameValue !== `asc` ? `A-Z` : `Z-A`}
                </button>
              </td>
              <td>Week</td>
              <td>minPrice</td>
              <td>maxPrice</td>
              <td>averagePrice</td>
            </tr>
          </thead>
          {!!Object.keys(product).length && <tbody>{this.renderRows()}</tbody>}
        </table>

        <button onClick={()=>this.toggleCalendar()}>Show calendar</button>
        {showCalendar && <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={moment(startDate)}
          endDate={moment(endDate)}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => {this.setState({ focusedInput })}}
          isOutsideRange={() => false}
        />}
        <button onClick={this.handleCloseModal}>
          create report
        </button>
        {showModal && 
          <Modal handleCloseModal={this.handleCloseModal}>
            <ReportData 
              data={showModal && this.returnDataForReportModal()}
              inputEmailValue={inputEmailValue}
              handleInputEmailChange={this.handleInputEmailChange}
              postReport={() => postReport(this.returnBody(inputEmailValue))}
            />
          </Modal>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    product: state.oneProduct.oneProduct,
    isLoading: state.oneProduct.isLoading,
    sortNameValue: state.sortNameValue.sortNameValue,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getOneProductData,
  sortNameMake,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (CoffeeDetails);
