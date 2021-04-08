import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from './historicalPriceData.json'
import moment from 'moment'

export default class Example extends Component {
  render() {
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {

      yAxis:[{
        offset: 20,

        labels: {
          formatter: function() {
            return numberFormat.format(this.value)
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"
          },
          align: 'left'
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function() {
        return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMM do YYYY, h:mm')
      }
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      }
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: this.props.symb
    },
    chart: {
      height: 600,
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      type: 'date',
    },
    rangeSelector: {
      buttons: [{
        type: 'day',
        count: 1,
        text: '1D'
      }, {
        type: 'day',
        count: 5,
        text: '5D'
      }, {
        type: 'month',
        count: 1,
        text: '1M'
      }, {
        type: 'month',
        count: 6,
        text: '6M'
      }, {
        type: 'year',
        count: 1,
        text: '1Y'
      }, {
        type: 'year',
        count: 5,
        text: '5Y'
      }, {
        type: 'all',
        text: 'Max'
      }],
      selected: 4
    },
    series: [{
      name: 'Price',
      type: 'spline',

      data: priceData,
      tooltip: {
        valueDecimals: 2
      },
    }]
    };
    return (
      <div>
        <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
  }
}
