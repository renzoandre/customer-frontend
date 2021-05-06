import { basePath } from './config';

export function getCustomersApi(token, page) {
    const url = `${basePath}/customer/`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getCustomersPaginationApi(page, size) {
    const url = `${basePath}/customer/pagination?page=${page}&size=${size}`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getCustomersNamePaginationApi(name, page, size) {
    const url = `${basePath}/customer/name?name=${name}&page=${page}&size=${size}`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function createCustomerApi(customer) {
    const url = `${basePath}/customer/create-customer`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (result.id) {
                return { ok: true, message: 'Customer created' };
            }
            return { ok: false, message: result.message };
        })
        .catch((err) => {
            return { ok: false, message: err.message };
        });
}

export function updateCustomerApi(customer, id) {
    const url = `${basePath}/customer/update-customer/${id}`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function generateName() {
    const url = `https://api.namefake.com/`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}
