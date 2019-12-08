import { BaseHeatmap } from './base-heatmap';
import { HeatmapData, HeatmapGradient, IGMHeatmapOptions } from '../models/models';
import { Log } from "../log";

export class GoogleMapsHeatmap extends BaseHeatmap {

    heatmap: google.maps.visualization.HeatmapLayer;

    getCanvas(): void {
        // TODO
    }
    initialize(options: IGMHeatmapOptions): void {
        // TODO
        this._heatmapLogger = new Log(options.debug);
        this._heatmapLogger.log("__GoogleMapsHeatmap__ initialize");
        if ((typeof options.data !== "undefined") && (options.data !== null)) {
            this.heatmap = new google.maps.visualization.HeatmapLayer({
                data: options.data,
            });
            this.heatmap.setMap(options.map);
        }
    }
    destroy(): void {
        // TODO
    }


    /*********/
    // Methods for handling heatmap data.
    /*********/
    setData(data: HeatmapData): void {
        // TODO
        console.log(data);
    }
    getData(): void {
        // TODO
    }
    getValueAt(position: Array<number>): void {
        // TODO
        console.log(position);
    }
    clearData(): void {
        // TODO
    }
    addPoint(point: Array<number>): void {
        // TODO
        console.log(point);
    }
    setMax(max: number): void {
        // TODO
        console.log(max);
    }


    /*********/
    // Methods for rendering heatmap.
    /*********/
    draw(options: {minOpacity?: number, data?: HeatmapData}): void {
        // TODO
        console.log(options);
    }


    /*********/
    // Methods for handling heatmap appearance.
    /*********/
    resize(options: {width: number, height: number}): void {
        // TODO
        console.log(options);
    }
    gradient(grad: HeatmapGradient): void {
        // TODO
        console.log(grad);
    }


    /*********/
    // Method to obtain the image of the canvas.
    /*********/
    getDataURL(type: string, imageQuality: number): void {
        // TODO
        console.log(type, imageQuality);
    }
}