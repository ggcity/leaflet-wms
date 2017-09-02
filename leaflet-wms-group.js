import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { DomRepeat } from '../../@polymer/polymer/lib/elements/dom-repeat.js';

import '../../@ggcity/leaflet-iife/dist/leaflet.js';
import { LeafletWMSLayer } from './leaflet-wms-layer.js';
import './leaflet.wms.js';


export class LeafletWMSGroup extends PolymerElement {
  static get template() {
    return `
      <template is="dom-repeat" items="{{subLayers}}">
        <leaflet-wms-layer wms-source="[[wmsSource]]" layer="[[item]]"></leaflet-wms-layer>
      </template>
    `;
  }

  static get properties() {
    return {
      map: {
        type: Object,
        observer: '_mapSet'
      },

      source: String,
      layers: Array,

      transparent: {
        type: Boolean,
        value: true
      },
      format: {
        type: String,
        value: 'image/png'
      },
      identify: Boolean,
      minZoom: Number,
      maxZoom: Number,
      attribution: String,
      
      wmsSource: Object,
      subLayers: {
        type: Array,
        value: []
      }
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._wmsOptions = {
      transparent: this.transparent,
      format: this.format,
      identify: this.identify,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      attribution: this.attribution
    };

    this.wmsSource = L.WMS.source(this.source, this._wmsOptions);
    this.wmsSource.addTo(this.map); // FIXME: there could be a race condition here for this.map

    this.subLayers = this.layers;
  }

  _mapSet() {
    //this.wmsSource.addTo(this.map);
  }
}

customElements.define('leaflet-wms-group', LeafletWMSGroup);
