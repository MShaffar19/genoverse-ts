"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./../view");
var ChromosomeView = (function (_super) {
    __extends(ChromosomeView, _super);
    function ChromosomeView(genoverse, properties) {
        return _super.call(this, genoverse, properties) || this;
    }
    ChromosomeView.prototype.drawBackground = function (feature, canvasContext, imgData) {
        throw new Error("Method not implemented.");
    };
    ChromosomeView.prototype.drawFeature = function (feature, featureContext, labelContext, scale) {
        featureContext.fillStyle = feature.color;
        featureContext.strokeStyle = '#000000';
        if (feature.type === 'acen') {
            featureContext.beginPath();
            if (this.drawnAcen) {
                featureContext.moveTo(feature.x + feature.width, 0.5);
                featureContext.lineTo(feature.x, (feature.height + 0.5) / 2);
                featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
            }
            else {
                featureContext.moveTo(feature.x, 0.5);
                featureContext.lineTo(feature.x + feature.width, (feature.height + 0.5) / 2);
                featureContext.lineTo(feature.x, feature.height + 0.5);
                this.drawnAcen = true;
            }
            featureContext.fill();
            featureContext.stroke();
        }
        else if (feature.type === 'stalk') {
            for (var i = 0; i < 2; i++) {
                featureContext.beginPath();
                featureContext.moveTo(feature.x, 0.5);
                featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.25 + 0.5);
                featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.25 + 0.5);
                featureContext.lineTo(feature.x + feature.width, 0.5);
                featureContext[i ? 'moveTo' : 'lineTo'](feature.x + feature.width, feature.height + 0.5);
                featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.75 - 0.5);
                featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.75 - 0.5);
                featureContext.lineTo(feature.x, feature.height + 0.5);
                featureContext[i ? 'stroke' : 'fill']();
            }
        }
        else {
            _super.prototype.drawFeature.call(this, feature, featureContext, labelContext, scale);
            featureContext.beginPath();
            var chrSize = this.browser.getChromosomeSize(feature.chr);
            var width = this.browser.width;
            var propHeight = feature.height + 0.5;
            if (feature.start === 1 && feature.end === chrSize) {
                featureContext.clearRect(0, 0, 5, propHeight);
                featureContext.clearRect(feature.width - 5, 0, 10, propHeight);
                featureContext.fillStyle = feature.color;
                featureContext.moveTo(5, 0.5);
                featureContext.lineTo(feature.width - 5, 0.5);
                featureContext.bezierCurveTo(width + 1, 0.5, width + 1, feature.height + 0.5, feature.width - 5, feature.height + 0.5);
                featureContext.lineTo(5, feature.height + 0.5);
                featureContext.bezierCurveTo(-1, feature.height + 0.5, -1, 0.5, 5, 0.5);
                featureContext.fill();
            }
            else if (feature.start === 1) {
                featureContext.clearRect(0, 0, 5, propHeight);
                featureContext.fillStyle = feature.color;
                featureContext.moveTo(5, 0.5);
                featureContext.lineTo(feature.x + feature.width, 0.5);
                featureContext.moveTo(5, feature.height + 0.5);
                featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
                featureContext.moveTo(5, 0.5);
                featureContext.bezierCurveTo(-1, 0.5, -1, feature.height + 0.5, 5, feature.height + 0.5);
                featureContext.fill();
            }
            else if (feature.end === this.browser.chromosomeSize) {
                featureContext.clearRect(feature.x + feature.width - 5, 0, 10, propHeight);
                featureContext.fillStyle = feature.color;
                featureContext.moveTo(feature.x, 0.5);
                featureContext.lineTo(feature.x + feature.width - 5, 0.5);
                featureContext.moveTo(feature.x, feature.height + 0.5);
                featureContext.lineTo(feature.x + feature.width - 5, feature.height + 0.5);
                featureContext.moveTo(feature.x + feature.width - 5, 0.5);
                featureContext.bezierCurveTo(width + 1, 0.5, width + 1, feature.height + 0.5, feature.x + feature.width - 5, feature.height + 0.5);
                featureContext.fill();
            }
            else {
                featureContext.moveTo(feature.x, 0.5);
                featureContext.lineTo(feature.x + feature.width, 0.5);
                featureContext.moveTo(feature.x, feature.height + 0.5);
                featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
            }
            featureContext.stroke();
        }
    };
    ChromosomeView.prototype.drawLabel = function (feature) {
        if ((feature.start === 1 || feature.end === this.browser.getChromosomeSize(feature.chr)) && feature.labelWidth >= Math.floor(feature.width - 5)) {
            return;
        }
        _super.prototype.drawLabel.call(this, arguments[0], arguments[1], arguments[2]);
    };
    ChromosomeView.prototype.decorateFeature = function (feature, featureContext, scale) {
        throw new Error("Method not implemented.");
    };
    return ChromosomeView;
}(view_1.default));
exports.default = ChromosomeView;
