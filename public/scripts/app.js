console.log("this is working");

$( document ).ready(function() {

  // POST new Item to database
    $('#newItem').on('submit', function(e){
      e.preventDefault();
      var restId = $('input[type=hidden][name=restaurant-Id]').val();
      var newItem = $('input[type=text][name=newItem]').val();
      //TODO: Remove console logging from deployment versions
      console.log(restId + newItem);
      //TODO: Include error handling
      $.ajax({
        method: "POST",
        url: `/restaurant/${restId}/item`,
        data: {name: newItem},
        success: onSuccess,

      })
      function onSuccess(json){
        //TODO: Remove console logging from deployment versions
        //TODO: Consider a flash message to let your user know it worked
        console.log("YOU'VE added it successfully!");
      }

    });

    // DELETE item from database
    $('#deleteItem').on('submit', function(e){
      e.preventDefault();
      var restId = $('input[type=hidden][name=restaurant-Id]').val();
      var deleteItem = $('input[type=hidden][name=item-Id]').val();
      //TODO: Remove console logging from deployment versions
      console.log(restId + deleteItem);
      //TODO: Include error handling
      $.ajax({
        method: "DELETE",
        url: `/restaurant/${restId}/item/${deleteItem}`,
        data: {_id: deleteItem},
        success: deleteSuccess,

      })
      function deleteSuccess(json){
        //TODO: Remove console logging from deployment versions
        //TODO: Consider a flash message to let your user know it worked
        console.log("YOU'VE deleted it successfully!");
      }

    });

// TODO: I'm glad you found a solution for your star rating system.
    /* It's actually quite large. I'm convinced you can write your own and
    make it much smaller and more efficient, given more time to develop.
    Also it's considered best practices to give credit to the original
    developer when it comes to larger code snippets such as this.
    */
//star rating widget code below
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});



});
