export default {
    createdOrder: {
        "_id": "5f7ff2743d6eee9f38cd84dc",
        "paymentIntentId": "pi_1HaDyUG2Bzg2MqGJMmmhgjik",
        "orderId": "5271-117227-2775",
        "customerDetails": {
            "_id": "5f7ff2743d6eee9f38cd84dd",
            "firstName": "bema",
            "lastName": "konate",
            "phone": "123456443",
            "email": "test@gmail.com",
            "createdAt": "2020-10-09T05:17:40.661Z",
            "updatedAt": "2020-10-09T05:17:40.661Z",
            "__v": 0,
            "id": "5f7ff2743d6eee9f38cd84dd"
        },
        "cart": [
            {
                "_id": "5f7ff2743d6eee9f38cd84df",
                "productName": "hamburger",
                "productPrice": 6,
                "productId": "5f7bd8cd713e833ac5e0dca8",
                "productQuantity": 1,
                "totalPrice": 6,
                "sideOrders": [
                    {
                        "_id": "5f7ff2743d6eee9f38cd84e0",
                        "name": "None",
                        "sideOrderId": "5f7c615062aef7521ed48ef5",
                        "additionalCost": 0,
                        "createdAt": "2020-10-09T05:17:40.800Z",
                        "updatedAt": "2020-10-09T05:17:40.800Z",
                        "__v": 0,
                        "id": "5f7ff2743d6eee9f38cd84e0"
                    }
                ],
                "createdAt": "2020-10-09T05:17:40.772Z",
                "updatedAt": "2020-10-09T05:17:40.886Z",
                "__v": 1,
                "id": "5f7ff2743d6eee9f38cd84df"
            }
        ],
        "charge": {
            "_id": "5f7ff2753d6eee9f38cd84e3",
            "taxes": 0.06,
            "total": 6.06,
            "subtotal": 6,
            "createdAt": "2020-10-09T05:17:41.053Z",
            "updatedAt": "2020-10-09T05:17:41.053Z",
            "__v": 0,
            "id": "5f7ff2753d6eee9f38cd84e3"
        },
        "createdAt": "2020-10-09T05:17:40.629Z",
        "updatedAt": "2020-10-09T05:17:41.456Z",
        "__v": 3,
        "orderDate": "Oct 9, 2020 1:17 AM",
        "id": "5f7ff2743d6eee9f38cd84dc"
    },
    frontendCart: [{
        product: {
            id: 1,
            name: 'Chicken dibi',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, velit.',
            price: 10,
            sideOrdersPerQty: 2,
            sideOrders: [
                {
                    id: 101,
                    name: 'Alako',
                    addedCost: 0,
                },
                {
                    id: 102,
                    name: 'Rice',
                    addedCost: 3.5,
                },
            ]
        },
        qty: 1,
        selectedSideOrders: [
            {
                seq: 1,
                data: { id: 102, name: 'Rice', addedCost: 3.5 },
            },
            {
                seq: 2,
                data: { name: "None", addedCost: 0 },
            }
        ],
        specialRequest: "Make it snappy",
    }]
}