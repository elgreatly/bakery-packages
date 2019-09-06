export default class BakeryConstants {
    static BAKERY_PACKAGES = {
        vs5: [
            {
                quantity: 5,
                cost: 8.99
            },
            {
                quantity: 3,
                cost: 6.99    
            }
        ],
        mb11: [
            {
                quantity: 8,
                cost: 24.95
            },
            {
                quantity: 5,
                cost: 16.95
            },
            {
                quantity: 2,
                cost: 9.95    
            }
        ],
        cf: [
            {
                quantity: 9,
                cost: 16.99
            },
            {
                quantity: 5,
                cost: 9.95
            },
            {
                quantity: 3,
                cost: 5.95    
            }
        ]
    }
    
    static BAKERY_TYPES = ['vs5', 'mb11', 'cf'];
}