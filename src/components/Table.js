import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Divider } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { getCustomersPaginationApi, getCustomersNamePaginationApi, createCustomerApi } from '../api/customers';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import AddProductForm from './AddCustomer';
import EditProductForm from './EditCustomer';
import faker from 'faker';

export default function Table() {
    const [custmers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState(null);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [totalElements, setTotalElements] = useState(null);

    const [modalContent, setModalContent] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reloadCustomers, setReloadCustomers] = useState(false);

    const columns = [
        { headerName: 'First name', field: 'firstName' },
        { headerName: 'Last name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Phone number', field: 'phone' },
        {
            headerName: '',
            field: 'id',
            cellRendererFramework: (params) => (
                <div>
                    <Button type="primary" onClick={() => showModalEdit(params)}>
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    const columnsDefault = {
        sortable: true,
        floatingFilter: true,
        flex: 1,
    };

    useEffect(() => {
        getCustomersPaginationApi(page, pageSize).then((response) => {
            setCustomers(response.customers);
            setPageNumber(response.pageNumber);
            setPageSize(response.pageSize);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
        });

        setReloadCustomers(false);
    }, [page, reloadCustomers]);

    const nextPage = () => {
        if (page + 1 < totalPages) {
            setPage(page + 1);
        }
    };

    const previusPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const showModalAdd = () => {
        setIsModalVisible(true);
        setModalContent(
            <AddProductForm
                setIsModalVisible={setIsModalVisible}
                setReloadCustomers={setReloadCustomers}
            ></AddProductForm>
        );
    };

    const showModalEdit = (params) => {
        setIsModalVisible(true);
        setModalContent(
            <EditProductForm
                setIsModalVisible={setIsModalVisible}
                setReloadCustomers={setReloadCustomers}
                customer={params.data}
            ></EditProductForm>
        );
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChangeSearch = (params) => {
        setCustomerName(params);
        if (params.length > 0) {
            getCustomersNamePaginationApi(params, page, pageSize).then((response) => {
                setCustomers(response.customers);
                setPageNumber(response.pageNumber);
                setPageSize(response.pageSize);
                setTotalPages(response.totalPages);
                setTotalElements(response.totalElements);
            });
        }
        if (params.length == 0) {
            getCustomersPaginationApi(page, pageSize).then((response) => {
                setCustomers(response.customers);
                setPageNumber(response.pageNumber);
                setPageSize(response.pageSize);
                setTotalPages(response.totalPages);
                setTotalElements(response.totalElements);
            });
        }
    };

    return (
        <div>
            <Button onClick={showModalAdd} type="primary">
                Add Customer
            </Button>
            <Divider />
            <Input
                placeholder="Search customer"
                onChange={(e) => onChangeSearch(e.target.value)}
                value={customerName}
            />
            <Divider />
            <div className="ag-theme-alpine" style={{ height: 550 }}>
                <AgGridReact
                    rowData={custmers}
                    columnDefs={columns}
                    defaultColDef={columnsDefault}
                    rowSelection={'single'}
                />
            </div>
            <div>
                <b>{(page + 1) * pageSize - pageSize + 1}</b> to <b>{(page + 1) * pageSize}</b> of{' '}
                <b>{totalElements}</b> customers <Button onClick={previusPage}>{'<'}</Button> Page <b>{page + 1}</b> of{' '}
                <b>{totalPages}</b> <Button onClick={nextPage}>{'>'}</Button>
            </div>

            <Modal title="Customer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                {modalContent}
            </Modal>
        </div>
    );
}
