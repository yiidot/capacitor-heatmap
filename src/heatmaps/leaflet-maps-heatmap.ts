import { BaseHeatmap } from './base-heatmap';
import { Log } from "../log";
import { GMHeatmapCoordinate, GMHeatmapPoint, GMHeatmapGradient, ILMHeatmapOptions,
         LMHeatmapData, HeatmapPoint, HeatmapGradient} from '../models/models';

import { Map, DomUtil, Browser, LatLngTuple, Point } from 'leaflet';

export class LeafletMapsHeatmap extends BaseHeatmap {

    _map: Map;
    _canvas: HTMLCanvasElement;
    _data: LMHeatmapData;

    static readonly DEFAULT_GRADIENT: HeatmapGradient = {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
    };
    static readonly DEFAULT_RADIUS = 20;
    static readonly DEFAULT_OPACITY = 0.05;

    _circle: HTMLCanvasElement;
    _grad: Uint8ClampedArray;
    _r: number;
    _opacity: number;
    _gradient: HeatmapGradient;
    _radius: number;
    _max: number;
    _ctx: CanvasRenderingContext2D;
    _width: number;
    _height: number;

    initialize(options: ILMHeatmapOptions): HTMLCanvasElement {
        this._heatmapLogger = new Log(options.debug);
        this._heatmapLogger.log("__LeafletMapsHeatmap__ initialize");
        // TODO
        this._map = options.map;
        console.log('map', this._map);

        this._data = typeof options.data !== 'undefined' ? options.data : [];
        (
            this._heatmapLogger.warn("__LeafletMapsHeatmap__ Data is undefined or empty. Passes heatmap data into draw function or set heatmap data with setData function."),
            []
        );

        this._addHeatmapLayer2Map();

        this._ctx = this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._max = 18;
        this._opacity = LeafletMapsHeatmap.DEFAULT_OPACITY;
        this._radius = LeafletMapsHeatmap.DEFAULT_RADIUS;
        this._createCircle(LeafletMapsHeatmap.DEFAULT_RADIUS);
        this._gradient = LeafletMapsHeatmap.DEFAULT_GRADIENT;
        this._gradientArray(LeafletMapsHeatmap.DEFAULT_GRADIENT);

        return this._canvas;

    }

    destroy(): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ destroy");
        // TODO
    }


    /*********/
    // Methods for handling heatmap data.
    /*********/
    setData(data: LMHeatmapData): LMHeatmapData {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ setData", data);
        this._data = [];
        this._data = [...data];
        return this._data;
    }

    getData(): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ getData");
        // TODO
    }

    getValueAt(coordinate: GMHeatmapCoordinate): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ getValueAt", coordinate);
        // TODO
    }

    clearData(): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ clearData");
        // TODO
    }

    addPoint(point: GMHeatmapPoint): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ addPoint", {newPoint: point});
        // TODO
    }

    setMax(max: number): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ max", max);
        // TODO
    }


    /*********/
    // Methods for rendering heatmap.
    /*********/
    draw(options: {opacity?: number, radius?: number, gradient?: string[], data?: LMHeatmapData}): boolean {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ draw", options);
        if (!this._map) { return false; }

        this._data = typeof options.data !== 'undefined' ? options.data : this._data;

        // const size: Point = this._map.getSize();
        // const bounds: Bounds = new Bounds(point([-radius, -radius]), size.add([radius, radius]));
        const cellSize = this._radius / 2;
        const panePos = this._map.getPanes().overlayPane.getBoundingClientRect();
        const offsetX = panePos.x % cellSize;
        const offsetY = panePos.y % cellSize;
        const maxZoom = this._map.getMaxZoom();
        const v = 1 / Math.pow(2, Math.max(0, Math.min(maxZoom - this._map.getZoom(), 12)));
        let grid: any[] = [];
        let cell: any;
        let data: Array<Array<number>> = [];

        this._data.map((coordinate: LatLngTuple) => {
            const point: Point = this._map.latLngToContainerPoint(coordinate);

            // if (bounds.contains(point)) {
            if (this._map.getBounds().contains(coordinate)) {
                const x = Math.floor((point.x - offsetX) / cellSize) + 2;
                const y = Math.floor((point.y - offsetY) / cellSize) + 2;
                const k = this._radius * v;
                grid[y] = grid[y] || [];
                cell = grid[y][x];
                if (!cell) {
                    grid[y][x] = [point.x, point.y, k];
                } else {
                    cell[0] = (cell[0] * cell[2] + point.x * k) / (cell[2] + k); // x
                    cell[1] = (cell[1] * cell[2] + point.y * k) / (cell[2] + k); // y
                    cell[2] += k; // Accumulated intensity value
                }
            }

        })

        for (let i = 0, len = grid.length; i < len; i++) {
            if (grid[i]) {
                for (let j = 0, len2 = grid[i].length; j < len2; j++) {
                    cell = grid[i][j];
                    if (cell) {
                        data.push([
                            Math.round(cell[0]),
                            Math.round(cell[1]),
                            Math.min(cell[2], 18)
                        ]);
                    }
                }
            }
        }

        this._opacity = typeof options.opacity !== "undefined" ? options.opacity : this._opacity;
        typeof options.radius !== "undefined" ? this._createCircle(options.radius) : this._createCircle(this._radius);
        typeof options.gradient !== "undefined" ? this._gradientArray(options.gradient) : this._gradientArray(this._gradient);

        const ctx = this._ctx;
        ctx.clearRect(0, 0, this._width, this._height);

        // Draw a grayscale heatmap by putting a blurred circle at each data point.
        data.map((point: HeatmapPoint) => {
            const thickness = Array.isArray(point) ? point[2] : point.thickness;
            const x = Array.isArray(point) ? point[0] : point.x;
            const y = Array.isArray(point) ? point[1] : point.y;
            ctx.globalAlpha = Math.min(Math.max(thickness / this._max, this._opacity), 1);
            ctx.drawImage(this._circle, x - this._r, y - this._r);
        });

        // Colorize the heatmap, using opacity value of each pixel to get the right color from our gradient.
        const colored = ctx.getImageData(0, 0, this._width, this._height);
        this._heatmapLogger.log("colored", {colored: colored});
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return true;
    }


    /*********/
    // Methods for handling heatmap appearance.
    /*********/
    resize(options: {width: number, height: number}): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ resize", options);
        // TODO
    }

    gradient(grad: GMHeatmapGradient): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ gradient", grad);
        // TODO
    }

    opacity(opa: number): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ opacity", opa);
        // TODO
    }

    radius(rad: number): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ radius", rad);
        // TODO
    }


    /*********/
    // Method to obtain the image of the canvas.
    /*********/
    getDataURL(type: string, imageQuality: number): void {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ getDataURL", type, imageQuality);
        // TODO
    }

    /*********/
    // Private methods.
    /*********/

    _addHeatmapLayer2Map() {
        // const originProp = DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        // canvas.style['transformOrigin'] = '50% 50%';

        const canvas: HTMLCanvasElement = this._canvas = DomUtil.create('canvas', 'leaflet-heatmap-layer leaflet-layer') as HTMLCanvasElement;
        const size = this._map.getSize();
        console.log('size', size);
        canvas.width  = size.x;
        canvas.height = size.y;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const animated = this._map.options.zoomAnimation && Browser.any3d;
        DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

        console.log('panes', this._map.getPanes());

        const topLeft = this._map.containerPointToLayerPoint([0, 0]);
        DomUtil.setPosition(this._canvas, topLeft);

        this._map.getPanes().overlayPane.appendChild(this._canvas);
        // map.getPane('labels').style.pointerEvents = 'none';
    }

    private _gradientArray(grad: HeatmapGradient) {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ gradientArray", {grad: grad});
        // Create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one.
        const canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);
        canvas.width = 1;
        canvas.height = 256;
        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);
        this._grad = ctx.getImageData(0, 0, 1, 256).data;
        this._heatmapLogger.log("gradientArray", {canvas: canvas, ctx: ctx});
    }

    private _createCircle(r: number, blur?: number) {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ createCircle", {r: r});
        blur = blur === undefined ? 15 : blur;
        // Create a grayscale blurred circle image that we'll use for drawing points.
        const circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;
        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';
        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    private _colorize (pixels: any, gradient: any) {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ _colorize", {pixels: pixels, gradient: gradient});
        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value
            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    }

    private _createCanvas() {
        this._heatmapLogger.log("__LeafletMapsHeatmap__ _createCanvas");
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        }
    }
}