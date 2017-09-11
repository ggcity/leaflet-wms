import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { DomRepeat } from '../../@polymer/polymer/lib/elements/dom-repeat.js';

import { wms as WMS } from './leaflet.wms.js';

import './leaflet-wms-layer.js';


export class LeafletWMSGroup extends PolymerElement {
  static get template() {
    // return `
    //   <template is="dom-repeat" items="{{subLayers}}">
    //     <leaflet-wms-layer wms-source="[[wmsSource]]" layer="[[item]]"></leaflet-wms-layer>
    //   </template>
    // `;
  }

  static get properties() {
    return {
      map: {
        type: Object,
        observer: '_mapSet'
      },

      source: {
        type: String,
        observer: '_sourceChange',
        reflectToAttribute: true
      },
      layers: {
        type: Array,
        observer: '_layersChange',
        reflectToAttribute: true
      },

      transparent: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      format: {
        type: String,
        value: 'image/png',
        reflectToAttribute: true
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
  }

  _sourceChange() {
    if (this.wmsSource) this.wmsSource.removeFrom(this.map);

    this.wmsSource = new WMS.Source(this.source, this._wmsOptions);
    if (this.map) this.wmsSource.addTo(this.map);
  }

  _layersChange(newValue, oldValue) {
    this.wmsSource.replaceAllSubLayers(this.layers);
  }

  _mapSet() {
    this.wmsSource.addTo(this.map); // FIXME: there could be a race condition here for this.map
  }
}

customElements.define('leaflet-wms-group', LeafletWMSGroup);
