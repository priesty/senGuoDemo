import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Table, Input, Button, Icon, Checkbox, Modal, Form, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';

export default class demo2 extends Component {
    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        handleCreateOk: PropTypes.func,
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
            visiableColumns: this.setColumnsData(props.columns),
            selectedColumns: this.getColumnsTitle(props.columns),
            dataSource: props.dataSource,
            keywords: '',
            settingModalShown: false,
            createModalShown: false,
            fruitName: '',
            fruitPrice: 0,
            fruitNumber: 0,
            fruitDescription: '',
            isAllSelected: true,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataSource: nextProps.dataSource,
        });
        
    }

    getColumnsTitle = (columns) => {
        return columns.map((item) => {return item.title});
    }

    setColumnsData = (columnsData) => {
        let tmpColumns = [];
        columnsData && columnsData.map((item) => {
            tmpColumns.push({
                title: item.title,
                dataIndex: item.dataIndex,
                key: item.key,
                width: item.width,
                ...this.getColumnSearchProps('Name'),
            });
        });
        return tmpColumns;
    }

    getColumnSearchProps = dataIndex => ({
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.keywords]}
            textToHighlight={text.toString()}
          />
        ),
      });

    showModal = () => {
        this.setState({
            settingModalShown: true,
        });
    }

    handleOk = () => {
        const { selectedColumns } = this.state;
        const { columns } = this.props;
        let visiableColumns = [];
        const columnsData = this.setColumnsData(columns);
        columnsData.map((item) => { if (selectedColumns.indexOf(item.title) > -1) visiableColumns.push(item)});
        this.setState({
            visiableColumns,
            columns: visiableColumns,
            settingModalShown: false,
        });
    }

    handleCancel = () => {
        const { selectedColumns, visiableColumns } = this.state;
        const checkedColumns = this.getColumnsTitle(visiableColumns);
        this.setState({
            settingModalShown: false,
            selectedColumns: checkedColumns,
            isAllSelected: visiableColumns.length === this.props.columns.length,
        });
    }

    onCheckBoxChange = (selectedColumns) => {
        this.setState({
            selectedColumns,
            isAllSelected: selectedColumns.length === this.props.columns.length,
        });
    }

    getSelectedColumnsKeys = () => {
        const { selectedColumns, visiableColumns } = this.state;
        let selectedColumnsKeys = [];
        visiableColumns.map((item) => {
            if (selectedColumns.indexOf(item.title) > -1) {
                selectedColumnsKeys.push(item.key);
            }
        });
        return selectedColumnsKeys;
    }

    handleSearch = (keywords) => {
        const { dataSource } = this.props;
        let selectedColumnsKeys = this.getSelectedColumnsKeys();
        let filtedData = [];
        dataSource.map((item) => {
            const keys = Object.keys(item);
            let isExist = false;
            keys.map((key) => { 
                if (selectedColumnsKeys.indexOf(key) > -1) {
                    let value = item.hasOwnProperty(key) && item[key];
                    if (typeof value === 'number'){
                        value+='';
                    }
                    if (value.indexOf(keywords) > -1){
                        isExist = true;
                    }
                }
            }); 
            if (isExist) {
                filtedData.push(item);
            }
        });
            
        this.setState({
            dataSource: filtedData,
            keywords,
        });
    }

    handleNameChage = (e) => {
        this.setState({
            fruitName: e.target.value,
        });
    }

    handlePriceChage = (e) => {
        const reg = /^\d+(\.\d{0,2})?$/;
        e.target.value = e.target.value.replace(/[^\d.]/g,"");
        e.target.value = e.target.value.replace(/^\./g,"");
        e.target.value = e.target.value.replace(/\.{2,}/g,".");
        e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        this.setState({
            fruitPrice: e.target.value,
        });
    }

    handleNumberChage = (e) => {
        this.setState({
            fruitNumber: e.target.value,
        });
    }

    handleDescriptionChage = (e) => {
        this.setState({
            fruitDescription: e.target.value,
        });
    }

    handleCreate = () => {
        this.setState({
            createModalShown: true,
        });
    }

    handleCreateOk = () => {
        const { fruitName, fruitPrice, fruitNumber, fruitDescription, dataSource } = this.state;
        dataSource.push({
            key: fruitName + Math.floor(Math.random()*10),
            name: fruitName,
            price: fruitPrice,
            number: fruitNumber,
            description: fruitDescription,
        });
        this.setState({
            createModalShown: false,
            dataSource,
            fruitName: '',
            fruitPrice: 0,
            fruitNumber: 0,
            fruitDescription:'',
        });
        typeof this.props.handleCreateOk === 'function' && 
            this.props.handleCreateOk(dataSource);
    }

    handleCreateCancel = () => {
        this.setState({
            createModalShown: false,
            fruitName: '',
            fruitPrice: 0,
            fruitNumber: 0,
            fruitDescription:'',
        });
    }

    handleAllSelected = (e) => {
        const columnsTitle = this.getColumnsTitle(this.props.columns);
        this.setState({
            isAllSelected: e.target.checked,
            selectedColumns: e.target.checked ? columnsTitle : [],
        });
    }

    render () {

        const { columns, } = this.props;
        
        const { 
            dataSource, 
            visiableColumns,
            settingModalShown, 
            selectedColumns,
            createModalShown,
            fruitName,
            fruitPrice,
            fruitNumber,
            fruitDescription,
            isAllSelected,
        } = this.state;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0, },
              sm: { span: 16, offset: 8, },
            },
        };

        const searchProps = {
            placeholder: 'input search text',
            size: 'large',
            onSearch: this.handleSearch,
            style: {width: '15rem', marginBottom: '2rem',},
        };

        const pagination = {
            defaultCurrent: 1,
            defaultPageSize: 20,
            pageSize: 20,
            total: dataSource.length,
        }

        const tableProps = {
            columns: visiableColumns,
            dataSource: dataSource,
            pagination: pagination,
            scroll: {y: 540},
        };

        const btnSettingProps = {
            className: 'table_setting',
            ghost: true,
            onClick: this.showModal,
            style: { float: 'right', border: 'none'},
        };

        const btnCreateProps = {
            className: 'table_setting',
            ghost: true,
            onClick: this.handleCreate,
            style: { float: 'right', border: 'none'},
        };

        const modalSettingProps = {
            title: '列表条目显示设置',
            visible: settingModalShown,
            onOk: this.handleOk,
            onCancel: this.handleCancel,
        };

        const checkAllProps = {
            value: 'All',
            checked: isAllSelected,
            onChange: this.handleAllSelected,
            style: {marginRight: '2rem'},
        };

        const checkGroupProps = {
            options: columns.map((item, index) => { return {label: item.title, value: item.title}}),
            value: selectedColumns,
            onChange: this.onCheckBoxChange,
        };

        const modalCreateProps = {
            title: 'Create',
            visible: createModalShown,
            onOk: this.handleCreateOk,
            onCancel: this.handleCreateCancel,
        };

        return (
            <div id='senguoTableDemo' style={{marginLeft: '1rem', marginTop: '2rem'}}>
                <Input.Search {...searchProps} />
                <div className='parentCls clearfix'>
                    <div className='leftCls'>
                        <Table {...tableProps} />
                    </div >
                    <Button {...btnSettingProps}>
                        <Icon type='setting' />
                    </Button>
                    <Button {...btnCreateProps}>
                        <Icon type='plus' />
                    </Button>
                </div>
                <Modal {...modalSettingProps}>
                    <Checkbox {...checkAllProps} >All</Checkbox>
                    <Checkbox.Group {...checkGroupProps} />
                </Modal>
                <Modal {...modalCreateProps} >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                        <Form.Item label="Fruits">
                            <Input value={fruitName} onChange={this.handleNameChage} />
                        </Form.Item>
                        <Form.Item label="Prices">
                            <Input  value={fruitPrice} placeholder={'请输入整数或者最多两位小数的数字'} onChange={this.handlePriceChage} />
                        </Form.Item>
                        <Form.Item label="Number">
                            <InputNumber value={fruitNumber} min={0} defaultValue={1} onChange={this.handleNumberChage}/>
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input  value={fruitDescription} onChange={this.handleDescriptionChage}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}