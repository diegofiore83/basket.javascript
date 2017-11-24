'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingBasket = function () {
  function ShoppingBasket(productCatalog, deliveryCharges, offersDiscount) {
    _classCallCheck(this, ShoppingBasket);

    this.productCatalog = productCatalog;
    this.deliveryCharges = deliveryCharges;
    this.offersDiscount = offersDiscount;
    this.basket = [];
  }

  _createClass(ShoppingBasket, [{
    key: "add",
    value: function add(product) {
      this.basket.push(product);
    }
  }, {
    key: "total",
    value: function total() {
      var _this = this;

      // Calculate total without discount
      var total = this.basket.reduce(function (total, productCode) {
        return total + _this.productCatalog[productCode].Price;
      }, 0);

      // Caluclate offer discount
      var discount = this.offersDiscount.map(function (offer) {
        // To extend with different offer type
        switch (offer.OfferType) {
          case "second-half-price":
            {
              var occurrences = 0;
              _this.basket.forEach(function (product) {
                return product === offer.Product ? occurrences++ : "";
              });
              return Math.floor(occurrences / 2) * (Math.round(_this.productCatalog[offer.Product].Price / 2 * 100) / 100);
            }
          default:
            return 0;
        }
      }).reduce(function (discount, currentValue) {
        return discount + currentValue;
      });

      var totalWithDiscount = total - discount;

      // Calculate delivery cost
      var delivery = this.deliveryCharges.find(function (deliveryCharge) {
        return totalWithDiscount >= deliveryCharge.Cost;
      });

      // Round to avoid floating-point arithmetic issues
      return Math.round((totalWithDiscount + delivery.Delivery) * 100) / 100;
    }
  }]);

  return ShoppingBasket;
}();
