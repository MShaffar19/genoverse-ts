import TrackView from '../view';

export default class SequenceView extends TrackView {
  decorateFeature(feature: any, featureContext: any, scale: any) {
    throw new Error("Method not implemented.");
  }
  labelWidth: any;
  widestLabel: any;
  labelYOffset: any;
  featureMargin = { top: 0, right: 0, bottom: 0, left: 0 };
  colors: any        = { 'default': '#CCCCCC', A: '#73E973', T: '#DE4C61', G: '#FFFF77', C: '#688EC0' };
  labelColors: any   = { 'default': '#000000', T: '#FFFFFF', C: '#FFFFFF' };
  labels        = 'overlay';

  setDefaults(...args: any[]){
    super.setDefaults(arguments);
    const lowerCase = this.prop('lowerCase');

    this.labelYOffset = typeof this.labelYOffset === 'number' ? this.labelYOffset : (this.featureHeight + 1) / 2;
    this.widestLabel  = typeof this.widestLabel  === 'string' ? this.widestLabel : lowerCase ? 'g' : 'G';
    this.labelWidth   = {};

    this.labelWidth[this.widestLabel] = Math.ceil(this.context.measureText(this.widestLabel).width) + 1;

    if (lowerCase) {
      for (const key in this.colors) {
        this.colors[key.toLowerCase()] = this.colors[key];
      }

      for (const key in this.labelColors) {
        this.labelColors[key.toLowerCase()] = this.labelColors[key];
      }
    }
  }

  draw(features: any, featureContext: any, labelContext: any, scale: any) {
    featureContext.textBaseline = 'middle';
    featureContext.textAlign    = 'left';

    var width = Math.max(scale, this.minScaledWidth);

    for (var i = 0; i < features.length; i++) {
      this.drawSequence(features[i], featureContext, scale, width);
    }
  }

  drawSequence(feature: any, context: any, scale: number, width: number) {
    const drawLabels = this.labelWidth[this.widestLabel] < width - 1;
    let start, bp;

    for (let i = 0; i < feature.sequence.length; i++) {
      start = feature.position[scale].X + i * scale;

      if (start < -scale || start > context.canvas.width) {
        continue;
      }

      bp = feature.sequence.charAt(i);

      context.fillStyle = this.colors[bp] || this.colors['default'];
      context.fillRect(start, feature.position[scale].Y, width, this.featureHeight);

      if (!this.labelWidth[bp]) {
        this.labelWidth[bp] = Math.ceil(context.measureText(bp).width) + 1;
      }

      if (drawLabels) {
        context.fillStyle = this.labelColors[bp] || this.labelColors['default'];
        context.fillText(bp, start + (width - this.labelWidth[bp]) / 2, feature.position[scale].Y + this.labelYOffset);
      }
    }
  }
}