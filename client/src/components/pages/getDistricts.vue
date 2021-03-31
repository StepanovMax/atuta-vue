<template>
  <div
    id="getDistricts"
    class="main get-districts"
  >
    <l-map
      v-if="false"
      ref="myMap"
      class="lmap"
      id="mapid"
      :zoom="zoom"
      :options="mapOptions"
      :center="center"
      @click="onMapClick"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="coordsMarker">
      </l-marker>
    </l-map>


    <div class="button-wrap">
      <button
        class="button"
        @click="modifyTownsList()"
      >
        Изменить список городов
      </button>
    </div>

    <pre>
      {{ newArray }}
    </pre>

  </div>
</template>

<script>
import axios from 'axios';
import { Icon } from 'leaflet';
import { latLng } from "leaflet";
import { LMarker, LTileLayer, LMap } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapState, mapGetters, store, commit } from 'vuex';
import { transliterate as tr, slugify } from 'transliteration';


export default {
  name: 'addObject',
  components: {
    LMap,
    LMarker,
    LTileLayer,
  },
  data() {
    return {
      district: '',
      fullArrayCoords: [],
      i: 0,
      j: 0,
      fullArrayAddresses: [],
      federalRegionsArray: [],
      federalRegionsArrayOldNew: [],
      newArray: [],
    }
  },
  computed: {
    ...mapState([
      'federalRegions',
      'filterDataDefault',
    ]),
    //  latitude / широта
    stepLat() {
      const stepLatValue = ((this.coords1[0] - this.coords3[0]) / 30);
      // console.log('stepLatValue', stepLatValue);
      return stepLatValue;
    },
    // longitude / долгота
    stepLon() {
      const stepLonValue = ((this.coords2[1] - this.coords1[1]) / 30);
      return stepLonValue;
    },
  },
  methods: {
    modifyTownsList() {
      this.newArray = this.federalRegions.map(
        mapRegion => {
          const newArrayLocalities = mapRegion.localities.map(
            mapLocality => {
              const locality = {
                'type': 'city',
                'slug': slugify(mapLocality.label),
                'label': mapLocality.label,
                "districts": [
                  {
                    "label": "В городе",
                    "slug": "inTown",
                  },
                  {
                    "label": "Пригород",
                    "slug": "suburb",
                  }
                ]
              };
              if (mapLocality.type === 'city' && mapLocality.districts.length === 2 && mapLocality.districts[0].label || mapLocality.type != 'city') {
                return mapLocality;
              } else {
                const newDistricts = mapLocality.districts.map(
                  district => {
                    const newDistrict = {
                      'label': district.charAt(0).toUpperCase() + district.slice(1),
                      'slug': slugify(district),
                    };
                    return newDistrict;
                  }
                )
                locality.districts = newDistricts;
                return locality;
              }
            }
          );
          const obl = {
            'type': mapRegion.type,
            'slug': slugify(mapRegion.label),
            'label': mapRegion.label,
            'localities': newArrayLocalities,
          };
          return obl;
          // this.federalRegionsArrayOldNew = this.federalRegionsArrayOld;
        }
      );
      // console.log('newArray', newArray);
      // const fullLength = this.filterDataDefault.town.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionLabel = this.filterDataDefault.town[i].region;
      //   const regionSlug = slugify(this.filterDataDefault.town[i].region);
      //   const regionCity = this.filterDataDefault.town[i].city;
      //   const regionObject = {
      //     label: regionLabel,
      //     slug: regionSlug,
      //   };
      //   const flag = this.federalRegionsArrayOld.some(
      //     item => item.slug === regionSlug
      //   )
      //   if (!flag) {
      //     this.federalRegionsArrayOld.push(regionObject);
      //   }
      // }

      // const fullLength = this.filterDataDefault.town.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionLabel = this.filterDataDefault.town[i].region;
      //   const regionSlug = slugify(this.filterDataDefault.town[i].region);
      //   const regionObject = {
      //     label: regionLabel,
      //     slug: regionSlug,
      //   };
      //   const flag = this.federalRegionsArrayOld.some(
      //     item => item.slug === regionSlug
      //   )
      //   if (!flag) {
      //     this.federalRegionsArrayOld.push(regionObject);
      //   }
      // }

      // const fullLength = this.federalRegions.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionSlug = slugify(this.federalRegions[i].label);
      //   this.federalRegions[i].slug = regionSlug;
      // }

      // console.log('this.federalRegions', this.federalRegions, this.federalRegions.length);
      // this.federalRegions.forEach(
      //   (item, index) => {
      //     if (item.type === 'obl') {
      //       console.log(index, item.label);
      //     }
      //   }
      // );
    },
    validate() {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      const query = this.query;
      const appID = 'TPqfwho_hEfIAMTcZzYC1cg2Gagma7rpDUTrq0KD6gY';
      const apiKey = 'TPqfwho_hEfIAMTcZzYC1cg2Gagma7rpDUTrq0KD6gY';
      const url = `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?apiKey=${appID}&maxresults=1&query=${query}`;
      const urlParis = 'https://geocode.search.hereapi.com/v1/geocode?q=5+Rue+Daunou%2C+75000+Paris%2C+France';

      const urlPetrolNear = 
        `https://discover.search.hereapi.com/v1/
          discover
          ?at=52.5228,13.412
          &q=petrol+station
          &limit=5
          &lang=en-US
          &apiKey=${apiKey}`;

      const urlGeocode = 
        `http://geocode.search.hereapi.com/v1/
          geocode
          ?q=Invalidenstr+117%2C+Berlin
          &apiKey=${apiKey}`;

      axios.get(
        urlGeocode,
        config
      )
        .then(result => {
          console.log(
            'result ::',
            result.json(),
          );
        }).catch((error) => {
          console.log('error ::', error);
        });
      // return fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=APP_ID_HERE&app_code=APP_CODE_HERE&searchtext=${query}`)
      //   .then(result => result.json())
      //   .then(result => {
      //     if(result.Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
      //       let data = result.Response.View[0].Result[0];
      //       return data;
      //     }
      //   }, error => {
      //     console.error(error);
      //   });
    },
    getAddress(coords) {
      ymaps.geocode(coords).then(
        res => {
          console.log('res 0 ::', res.geoObjects);
          const firstGeoObject = res.geoObjects.get(0);
          const addressArray = firstGeoObject.properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
          let selectedAddressArray = [];
          let selectedAddress = '';

          addressArray.forEach(
            (item, index) => {
              if (index === 2 && item.kind === 'province') {
                selectedAddressArray.push(item.name);
              } else if (item.kind === 'locality') {
                selectedAddressArray.push(item.name);
              } else {
                if (item.kind === 'street' || item.kind === 'house') {
                  if (item.kind === 'street') {
                    selectedAddressArray.push(item.name);
                  } else if (item.kind === 'house') {
                    selectedAddressArray.push(item.name);
                  }
                } else if (item.kind === 'district') {
                  selectedAddressArray.push(item.name);
                }
              }
            }
          )

          selectedAddressArray.forEach(
            (item, index) => {
              if (index === 0) {
                selectedAddress = item;
              } else {
                selectedAddress += ', ' + item;
              }
            }
          );

          // console.log(
          //   '::',
          //   firstGeoObject.getLocalities()[0],
          //   firstGeoObject._xalEntities.administrativeAreas[0],
          //   firstGeoObject._xalEntities.thoroughfare,
          //   firstGeoObject._xalEntities.premiseNumber,
          //   firstGeoObject.getLocalities(),
          //   firstGeoObject.getAdministrativeAreas(),
          //   firstGeoObject.getPremise(),
          //   firstGeoObject.getThoroughfare(),
          //   firstGeoObject.properties.getAll().text
          // );

          this.currentAddress = selectedAddress;
        },
        error => {
          console.log('Rejected [Geocode error] ::', error);
        }
      );
    },
    getDistrict(cityName) {
      ymaps.geocode(cityName).then(
        res => {
          const coords = res.geoObjects.get(0).geometry.getCoordinates();
          const step = 0.001;
          // console.log('coords ::', coords[0], coords[1]);
          // console.log('coords 1 ::', coords[0] + step, coords[1] + step);
          // console.log('coords 2 ::', coords[0] + step * 2, coords[1] + step * 2);
          let changedCoords = [];

          // console.log('getDistrict res step ymapsGeocode 1 ::');
          function ymapsGeocode(coords) {
            // console.log('ymapsGeocode 2 ::');
            ymaps.geocode(
              coords,
              {
                kind: 'district'
              }
            ).then(
              res => {
                console.log('res ::', coords);
                console.log('res ::', res.geoObjects);
                const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
                // console.log('addressArray ::', addressArray);

                addressArray.forEach(
                  (item, index) => {
                    if (item.kind === 'district') {
                      this.district = item.name;
                      console.log('this.district ::', item.name);
                    }
                  }
                );

                // console.log('this.district ::', this.district);

              },
              error => {
                console.log('Rejected [Geocode error] ::', error);
              }
            );
          };
          // console.log('getDistrict res step ymapsGeocode 2 ::');

          for(let i = 0; i < 10; i++) {
            // console.log('for 1::');
            changedCoords = [coords[0] + (step * i), coords[1] + (step * i)];
            // console.log('ymapsGeocode 1::');
            ymapsGeocode(changedCoords);
          }

          // const coordsArray = 

        },
        error => {
          console.log('Rejected [getDistrict error] ::', error);
        }
      );
    },
    isPointInPolygon(point, vs) {
      let x = point[0], y = point[1];

      let inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    },
    moveStepMarker() {
      // console.log('stepLat ::', this.stepLat);
      // console.log('stepLon ::', this.stepLon);
      // console.log('moveStepMarker');
      // const changedLat = this.stepMarker[0] + this.stepLat;
      const changedLon = this.stepMarker[1] - this.stepLon;
      const changedArrayPosition = [this.stepMarker[0], changedLon]
      this.stepMarker = changedArrayPosition;
    },
    moveStepMarkerByCoords(array) {
      // console.log('array ::', array);
      this.stepMarker = array;
      // setTimeout(
      //   () => {
      //     // console.log('array ::', array);
      //     this.stepMarker = array;
      //   },
      //   400
      // );
    },
    getTaganrogsDistricts() {
      // Getting an array of coords for square of the city.
      for(let i = this.coords1[1]; i < this.coords2[1]; i += this.stepLon) {
        for(let j = this.coords3[0]; j < this.coords1[0]; j += this.stepLat) {
          this.fullArrayCoords.push([j, i]);
        }
      }
      // Mapping all of the coords.
      this.fullArrayCoords.forEach(
        item => {
          // Getting an array of addresses for boundaries of the city.
          this.getDistrictsByCoordinates(item);
        }
      );
      console.log('this.fullArrayAddresses ::', this.fullArrayAddresses, this.fullArrayAddresses.length);
    },
    getDistrictsByCoordinates(coords) {
      // this.j++;
      // console.log('j:', this.j);
      ymaps.geocode(
        coords,
        {
          kind: 'district'
        }
      ).then(
        res => {
          // this.i++;
          // console.log('i:', this.i);

          // const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
          // if (Boolean(addressArray)) {
          //   this.fullArrayAddresses.push([coords, addressArray]);
          // } else {
          //   console.log('addressArray is wrong', addressArray);
          // }

          // console.log('res ::', coords);
          // console.log('::', res.geoObjects);
          // this.moveStepMarkerByCoords(coords);

          // console.log(this.i, addressArray);
          // addressArray.forEach(
          //   (item, index) => {
          //     if (item.kind === 'district') {
          //       this.district = item.name;
          //       console.log('this.district ::', item.name);
          //     }
          //   }
          // );

        },
        error => {
          console.log('Rejected [getDistrictsByCoordinates error] ::', error);
        }
      );
      // console.log('geoResponse', geoResponse);

    },
    onMapClick(e) {
      control.setQuery('Earth')
      console.log('e ::', e);
      // this.coordsTaganrog = e.get('coords');
      const coords = [e.latlng.lat, e.latlng.lng];
      this.coordsMarker = coords;
      console.log('coords ::', coords);
      // ymaps.geocode(
      //   coords,
      //   {
      //     kind: 'district'
      //   }
      // ).then(
      //   res => {
      //     console.log('res ::', res.geoObjects.get(0));
      //     // console.log('::', res.geoObjects);
      //     const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
      //     console.log('point ::', addressArray);

      //     // addressArray.forEach(
      //     //   (item, index) => {
      //     //     if (item.kind === 'district') {
      //     //       this.district = item.name;
      //     //       console.log('this.district ::', item.name);
      //     //     }
      //     //   }
      //     // );

      //   },
      //   error => {
      //     console.log('Rejected [getDistrictsByCoordinates error] ::', error);
      //   }
      // );
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject;
    },
  },
  created() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      // iconUrl: require('leaflet/dist/images/marker-icon.png'),
      // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  },
  async mounted() {
    // console.log('federalRegions.length', this.federalRegions.length);
    const url = 'https://nominatim.openstreetmap.org/reverse';
    const url2 = 'https://nominatim.openstreetmap.org/reverse?format=geojson&pretty=1&lat=47.215266&lon=38.908182&zoom=18&addressdetails=1&accept-language=ru';

    const params1 = {
      format: 'geojson',
      lat: 47.245266,
      lon: 38.928182,
      zoom: 18,
      addressdetails: 1,
      acceptLanguage: 'ru',
      namedetails: 1,
    }
    const params2 = {
      format: 'geojson',
      lat: '47.215266',
      lon: '38.908182',
      zoom: '18',
      addressdetails: '1',
    }
    const params3 = {
      format: 'geojson',
      lat: 47.265266,
      lon: 38.968182,
      zoom: 18,
      addressdetails: 1,
      'accept-language': 'ru',
      namedetails: 1,
    }

    await axios.get(
      url,
      {
        params: params1
      }
    )
      .then((response) => {
        // console.log(
        //   'address 1 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road,
        //   response,
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(url2)
      .then((response) => {
        // console.log(
        //   'address 2 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(
     url,
      {
        params: params3
      }
    )
      .then((response) => {
        // console.log(
        //   'address 3 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(
      'https://nominatim.openstreetmap.org/',
      {
        params: {
          q: "Таганрог, Россия",
          format: 'json',
          zoom: 18,
          'accept-language': 'ru',
          polygon_geojson: 1,
        }
      }
    )
      .then((response) => {
        const polygon = response.data[0].geojson.coordinates[0];
        // console.log(
        //   'response ::',
        //   response,
        // );
        let inversedPolygon = [];
        polygon.forEach(
          item => {
            inversedPolygon.push([item[1], item[0]]);
          }
        );
        // console.log(
        //   'inversed polygon ::',
        //   inversedPolygon,
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });
  }
};
</script>

<style lang="scss">
.main.get-districts {
  display: flex;
}

.button-wrap {
  position: relative;
}
#mapid {
  height: calc(100vh - 400px);
}

.lmap.vue2leaflet-map {
  position: relative;
  width: calc(100vw - 400px);
  height: calc(100vh - 400px);
}

.button {
  display: block;
  margin-bottom: 8px;
}
</style>