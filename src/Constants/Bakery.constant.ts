export default class BakeryConstants {
    public static BAKERY_PACKAGES = {
        vs5: [
            {
                cost: 8.99,
                quantity: 5
            },
            {
                cost: 6.99,
                quantity: 3
            }
        ],
        mb11: [
            {
                cost: 24.95,
                quantity: 8
            },
            {
                cost: 16.95,
                quantity: 5
            },
            {
                cost: 9.95,
                quantity: 2
            }
        ],
        cf: [
            {
                cost: 16.99,
                quantity: 9
            },
            {
                cost: 9.95,
                quantity: 5
            },
            {
                cost: 5.95,
                quantity: 3
            }
        ]
    };
    public static BAKERY_TYPES = ['vs5', 'mb11', 'cf'];
}
