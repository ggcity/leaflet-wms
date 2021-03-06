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
      infoFormat: {
        type: String,
        value: 'text/html',
        reflectToAttribute: true
      },
      identify: Boolean,
      infoFormat: {
        type: String,
        value: 'text/html'
      },
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
  }

  _sourceChange() {
    if (this.wmsSource) this.wmsSource.removeFrom(this.map);

    this._wmsOptions = {
      transparent: this.transparent,
      format: this.format,
      identify: this.identify,
      info_format: this.infoFormat,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      attribution: this.attribution,
      info_format: (this.infoFormat === undefined) ? 'text/html' : this.infoFormat
    };

    this.wmsSource = new WMS.Source(this.source, this._wmsOptions);
    if (this.map) this.wmsSource.addTo(this.map);

    this._layersChange();
  }

  _layersChange(newValue, oldValue) {
    // FIXME: use promise instead please
    if (this.wmsSource) this.wmsSource.replaceAllSubLayers(this.layers);
  }

  _mapSet() {
    this.wmsSource.addTo(this.map); // FIXME: there could be a race condition here for this.map
  }
}

customElements.define('leaflet-wms-group', LeafletWMSGroup);
