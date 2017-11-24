'use strict';

describe("Shopping Basket", () => {

    beforeEach(function() {

        // Ideal data structure for a big set of records
        this.productCatalog = {
            J01: {
                Product: "Jeans", Price: 32.95, Offers: ["second-half-price"]
            },
            B01: {
                Product: "Blouse", Price: 24.95, Offers: []
            },
            S01: {
                Product: "Socks", Price: 7.95, Offers: []
            }
        }

        this.offersDiscount = [{ Product: "J01", OfferType: "second-half-price"}];

        this.deliveryCharges = [{ Cost: 90, Delivery: 0 },
                                { Cost: 50, Delivery: 2.95 },
                                { Cost: 0, Delivery: 4.95 }];

        this.myShoppingBasket = new ShoppingBasket(this.productCatalog, this.deliveryCharges, this.offersDiscount);
    });

    it("should be initialized with a product catalog", function () {
        expect(this.myShoppingBasket.productCatalog['J01'].Product).toEqual("Jeans");
        expect(this.myShoppingBasket.productCatalog['B01'].Offers.length).toEqual(0);
        expect(this.myShoppingBasket.productCatalog['S01'].Price).toEqual(7.95);
    });

    it("should be initialized with delivery charges", function () {
        expect(this.myShoppingBasket.deliveryCharges.length).toEqual(3);
        expect(this.myShoppingBasket.deliveryCharges[1].Cost).toEqual(50);
        expect(this.myShoppingBasket.deliveryCharges[2].Delivery).toEqual(4.95);
    });

    it("should be initialized with an empty basket", function () {
        expect(this.myShoppingBasket.basket.length).toEqual(0);
    });
    
    it("should be initialized with offers discount", function () {
        expect(this.myShoppingBasket.offersDiscount.length).toEqual(1);
    });

    describe("when the user want to operate with the basket", function() { 
        beforeEach(function() {
            this.myShoppingBasket.basket = [];
        });

        it("should have a method to add an element into the basket", function () {
            this.myShoppingBasket.add('B01');
            expect(this.myShoppingBasket.basket.length).toEqual(1);
        });
        
        it("should have a method to calculate the total of the basket without offer + normal delivery", function () {
            this.myShoppingBasket.add('S01');
            this.myShoppingBasket.add('B01');
            expect(this.myShoppingBasket.total()).toEqual(37.85);
        });

        it("should have a method to calculate the total of the basket without offer + discount delivery", function () {
            this.myShoppingBasket.add('J01');
            this.myShoppingBasket.add('B01');
            expect(this.myShoppingBasket.total()).toEqual(60.85);
        });

        it("should have a method to calculate the total of the basket without offer + free delivery", function () {
            this.myShoppingBasket.add('J01');
            this.myShoppingBasket.add('B01');
            this.myShoppingBasket.add('B01');
            this.myShoppingBasket.add('S01');
            expect(this.myShoppingBasket.total()).toEqual(90.80);
        });

        it("should have a method to calculate the total of the basket with 'buy second half price' offer + normal delivery", function () {
            this.myShoppingBasket.add('J01');
            this.myShoppingBasket.add('J01');
            expect(this.myShoppingBasket.total()).toEqual(54.37);
        });

        it("should have a method to calculate the total of the basket with 'buy second half price' offer + free delivery", function () {
            this.myShoppingBasket.add('S01');
            this.myShoppingBasket.add('S01');
            this.myShoppingBasket.add('J01');
            this.myShoppingBasket.add('J01');
            this.myShoppingBasket.add('J01');
            expect(this.myShoppingBasket.total()).toEqual(98.27);
        });
    });  
});