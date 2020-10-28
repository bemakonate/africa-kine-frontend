export default [
    {
        id: 1,
        name: 'Chicken dibi',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, velit.',
        price: 20,
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
    {
        id: 2,
        name: 'Neme',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, velit.',
        price: 10,
        sideOrdersPerQty: 1,
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
        ],

    },
    {
        id: 3,
        name: 'Hamburger',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, velit.',
        price: 6,
        sideOrdersPerQty: 0,
        sideOrders: [],
    }
]