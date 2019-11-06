import React, { Component } from 'react';
import Mydemo from './demo2';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        width: '20%',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
];

const dataSource = [
    {
      key: '1',
      name: 'Apple',
      price: 4.5,
      number: 32,
      description: 'from shandong',
    },
    {
      key: '2',
      name: 'Banana',
      price: 4.5,
      number: 42,
      description: 'from xinjiang',
    },
    {
      key: '3',
      name: 'Orange',
      price: 4.5,
      number: 42,
      description: 'delicious',
    },
    {
      key: '4',
      name: '梨子',
      price: 4.5,
      number: 42,
      description: 'from hubei',
    },
    {
        key: '21',
        name: 'Apple',
        price: 4.5,
        number: 32,
        description: 'Ndedewdwe',
      },
      {
        key: '22',
        name: 'Banana',
        price: 4.5,
        number: 42,
        description: 'fsfsv sdsdf',
      },
      {
        key: '23',
        name: 'Orange',
        price: 4.5,
        number: 42,
        description: 'rsddsd hhtrh',
      },
      {
        key: '24',
        name: '梨子',
        price: 4.5,
        number: 42,
        description: 'fssfsdfr',
      },
  ];



export default class demo2Example extends Component {
   
    state = {
        tableData: dataSource,
    }

    handleCreateOk = (tableData) => {
        this.setState({
            tableData,
        });
    }

    render () {
        return (
            <Mydemo dataSource={this.state.tableData} columns={columns} handleCreateOk={this.handleCreateOk}></Mydemo>
        );
    } 
}