import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';

export class LeafletWMSLayer extends PolymerElement {
  static get properties() {
    return {
      wmsSource: Object,
      layer: {
        type: String,
        reflectToAttribute: true
      }
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    
    if (this.wmsSource === undefined || this.layer === '') return;
    this.wmsSource.addSubLayer(this.layer);
  }
}

customElements.define('leaflet-wms-layer', LeafletWMSLayer);
