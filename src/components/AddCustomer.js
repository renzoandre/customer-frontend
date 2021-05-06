import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';

import { createCustomerApi } from '../api/customers';

export default function AddProductForm(props) {
    const { setReloadCustomers, setIsModalVisible } = props;
    const [customerData, setCustomerData] = useState({});

    const createCustomer = (e) => {
        createCustomerApi(customerData)
            .then((response) => {
                notification['success']({ message: response.message });

                setIsModalVisible(false);
                setReloadCustomers(true);
                setCustomerData({});
            })
            .catch((err) => {
                notification['error']({ message: err.message });
            });
    };

    return (
        <Form onFinish={createCustomer}>
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
                <Button type="primary" htmlType="submit">
                    Create customer
                </Button>
            </Form.Item>
        </Form>
    );
}
