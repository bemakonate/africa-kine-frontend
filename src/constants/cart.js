const cart = [{
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
                extraPrice: 0,
            },
            {
                id: 102,
                name: 'Rice',
                extraPrice: 3.5,
            },
        ]
    },
    qty: 1,
    selectedSideOrders: [
        {
            seq: 1,
            data: { id: 102, name: 'Rice', extraPrice: 3.5 },
        },
        {
            seq: 2,
            data: { name: "None", extraPrice: 0 },
        }
    ],
    specialRequest: "Make it snappy",
}]

export default cart;