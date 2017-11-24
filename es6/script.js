'use strict';

class ShoppingBasket {
   constructor(productCatalog, deliveryCharges, offersDiscount) {
     this.productCatalog = productCatalog;
     this.deliveryCharges = deliveryCharges;
     this.offersDiscount = offersDiscount;
     this.basket = [];
   }

   add(product) {
     this.basket.push(product);
   }

   total() {
    // Calculate total without discount
    const total = this.basket.reduce((total, productCode) => { return total + this.productCatalog[productCode].Price }, 0);

    // Caluclate offer discount
    const discount = this.offersDiscount.map((offer) => {
      // To extend with different offer type
      switch(offer.OfferType) {
        case "second-half-price": { 
                                    let occurrences = 0;
                                    this.basket.forEach((product) => product === offer.Product ? occurrences++ : "");
                                    return Math.floor(occurrences / 2) * (Math.round((this.productCatalog[offer.Product].Price / 2) *100) /100);
                                  }
        default: return 0;
      }
    }).reduce((discount, currentValue) => discount + currentValue);

    const totalWithDiscount = total - discount;

    // Calculate delivery cost
    const delivery = this.deliveryCharges.find((deliveryCharge) => { return totalWithDiscount >= deliveryCharge.Cost });

    // Round to avoid floating-point arithmetic issues
    return Math.round((totalWithDiscount + delivery.Delivery) * 100) / 100;
  }
}