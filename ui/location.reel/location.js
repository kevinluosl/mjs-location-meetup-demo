/**
 * @module ui/location.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Location
 * @extends Component
 */
exports.Location = Component.specialize(/** @lends Location# */ {
    constructor: {
        value: function Location() {
            this.super();
        }
    },
    
    templateDidLoad:{
        value:function(){
             var component = this;
            navigator.geolocation.getCurrentPosition(function(pos){
                    component.latitude = pos.coords.latitude;
                    component.longitude = pos.coords.longitude;
            });
             this.placeService = new google.maps.places.PlacesService(this.templateObjects.image.element);
           
        }
    },

    handleButtonAction: {
        value: function (event) {
             console.log('clicked');
            var location = new google.maps.LatLng(this.latitude, this.longitude);
            
            var request = {
                radius:5000,
                keyword:this.templateObjects.textField.value,
                location:location,
                types:[]
            }
            
            var component = this;
            this.placeService.nearbySearch(request, function(results, sattus){
                component.results = results;
                console.log(component.results);
            });
        }
    }

});
