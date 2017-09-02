import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';

export class LeafletWMSLayer extends PolymerElement {
  static get properties() {
    return {
      wmsSource: Object,
      layer: {
        type: String
      }
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.wmsSource.addSubLayer(this.layer);
  }
}

customElements.define('leaflet-wms-layer', LeafletWMSLayer);
