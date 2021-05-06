import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';

import { updateCustomerApi } from '../api/customers';

export default function AddProductForm(props) {
    const { customer, setReloadCustomers, setIsModalVisible } = props;
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        setCustomerData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
        });
    }, [customer]);

    const updateCustomer = (e) => {
        updateCustomerApi(customerData, customer.id)
            .then((response) => {
                notification['success']({ message: 'Customer updated' });

                setIsModalVisible(false);
                setReloadCustomers(true);
                setCustomerData({});
            })
            .catch((err) => {
                notification['error']({ message: 'Customer not updated' });
            });
    };

    return (
        <Form onFinish={updateCustomer}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            placeholder="Fisrt Name"
                            value={customerData.firstName}
                            onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            placeholder="Last Name"
                            value={customerData.lastName}
                            onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            placeholder="Email"
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            placeholder="Phone Number"
                            value={customerData.phone}
                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Edit customer
                </Button>
            </Form.Item>
        </Form>
    );
}
