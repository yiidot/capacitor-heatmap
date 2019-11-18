import { Component, OnInit } from '@angular/core';

import { Heatmap } from 'capacitor-heatmap';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('HomePage::ngOnInit() | method called');
    this.createHeatmap();
  }

  async createHeatmap() {


    const data = [[38,20,2],[38,690,3],[48,30,1],[48,40,1],[48,670,1],[58,640,1],[58,680,1],[67,630,1],[86,10,1],
    [86,660,1],[96,0,1],[96,80,1],[96,530,1],[96,540,2],[96,560,1],[96,620,1],[96,640,1],[105,530,1],[105,560,3],
    [105,590,1],[105,610,1],[115,300,1],[115,310,4],[125,260,1],[125,280,1],[125,300,1],[125,500,1],[125,530,1],
    [134,250,1],[134,260,1],[134,280,1],[144,40,1],[144,260,1],[144,270,4],[144,320,1],[144,330,1],[153,220,1],
    [163,280,1],[173,120,2],[182,80,1],[182,120,2],[192,10,1],[192,120,1],[192,130,2],[192,190,1],[192,530,1],
    [201,120,2],[201,130,1],[201,150,1],[201,190,1],[201,240,1],[201,280,1],[201,290,1],[201,340,1],[201,390,3],
    [201,400,2],[201,420,1],[201,670,1],[201,710,1],[201,750,1],[211,160,2],[211,280,1],[211,320,1],[211,340,1],
    [211,800,2],[211,810,2],[221,80,1],[221,140,2],[221,170,1],[221,180,1],[221,230,1],[221,420,1],[221,490,2],
    [221,730,1],[230,150,1],[230,550,4],[230,670,1],[230,790,2],[240,100,1],[240,120,1],[240,150,1],[240,160,1],
    [240,220,1],[240,240,1],[240,300,1],[240,330,1],[240,460,1],[240,480,2],[240,550,1],[240,570,1],[240,840,2],
    [249,70,1],[249,120,1],[249,200,1],[249,210,1],[249,290,3],[249,340,1],[249,860,2],[249,870,2],[259,0,1],
    [259,90,1],[259,160,1],[259,180,1],[259,190,1],[259,270,1],[259,280,1],[259,290,2],[259,320,1],[259,360,1],
    [259,430,1],[259,480,1],[259,490,1],[259,860,1],[269,60,2],[269,150,1],[269,220,1],[269,260,1],[269,280,1],
    [269,290,1],[269,300,1],[269,320,1],[269,350,1],[269,450,3],[269,470,2],[269,480,3],[269,490,1],[278,120,1],
    [278,140,1],[278,150,2],[278,190,1],[278,220,1],[278,260,1],[278,290,2],[278,500,2],[278,680,2],[278,740,2],
    [288,0,1],[288,50,1],[288,150,2],[288,230,1],[288,260,1],[288,280,1],[288,290,2],[288,320,1],[288,330,1],
    [288,340,1],[288,460,1],[288,630,2],[288,720,2],[288,730,2],[288,750,2],[288,790,2],[288,840,1],[297,20,1],
    [297,120,2],[297,140,2],[297,150,1],[297,180,1],[297,250,4],[297,290,8],[297,300,4],[297,310,1],[297,340,2],
    [297,350,2],[297,360,1],[297,380,2],[297,410,1],[297,430,2],[297,440,5],[297,450,1],[297,460,8],[297,470,2],
    [297,480,4],[297,490,2],[297,500,3],[297,520,2],[297,530,1],[297,540,1],[297,550,1],[297,610,1],[297,620,2],
    [297,630,4],[297,640,1],[297,650,2],[297,660,3],[297,670,11],[297,690,1],[297,700,1],[297,710,2],[297,730,2],
    [297,770,3],[297,780,2],[297,790,2],[297,830,2],[307,0,1],[307,10,1],[307,70,1],[307,100,1],[307,120,3],
    [307,140,2],[307,150,2],[307,170,2],[307,180,1],[307,230,1],[307,250,1],[307,270,1],[307,290,1],[307,300,1],
    [307,320,1],[307,350,1],[307,680,2],[307,690,2],[307,700,2],[307,710,1],[307,730,1],[307,840,1],[307,850,2],
    [316,0,1],[316,140,1],[316,150,1],[316,270,1],[316,410,1],[316,420,1],[316,430,4],[316,440,1],[316,460,1],
    [316,490,1],[316,510,1],[316,530,2],[316,550,1],[316,690,1],[316,700,2],[316,730,1],[316,850,1],[316,880,1],
    [326,20,1],[326,90,1],[326,110,1],[326,130,1],[326,170,2],[326,190,1],[326,230,1],[326,260,1],[326,280,1],
    [326,290,1],[326,300,2],[326,310,1],[326,320,1],[326,330,1],[326,410,1],[326,460,1],[326,480,1],[326,530,1],
    [326,580,1],[326,680,1],[326,690,3],[326,750,2],[326,840,1],[326,870,1],[326,1010,2],[336,140,1],[336,170,1],
    [336,180,1],[336,190,1],[336,230,1],[336,240,1],[336,290,2],[336,310,1],[336,480,1],[336,510,1],[336,690,1],
    [336,730,1],[336,750,3],[336,810,1],[336,870,3],[336,880,1],[336,960,1],[336,990,1],[336,1000,1],[345,0,1],
    [345,150,3],[345,160,1],[345,190,2],[345,240,1],[345,260,1],[345,290,4],[345,400,1],[345,420,1],[345,440,1],
    [345,460,1],[345,500,1],[345,510,1],[345,530,1],[345,630,1],[345,650,1],[345,690,1],[345,710,1],[345,750,2],
    [345,820,1],[345,850,2],[345,900,1],[345,960,1],[355,20,1],[355,140,1],[355,150,1],[355,160,1],[355,180,2],
    [355,220,1],[355,250,1],[355,280,1],[355,290,3],[355,300,1],[355,310,2],[355,320,2],[355,330,4],[355,460,1],
    [355,470,1],[355,510,1],[355,680,1],[355,750,1],[355,800,2],[355,810,1],[355,850,1],[364,150,1],[364,160,1],
    [364,170,1],[364,200,1],[364,230,1],[364,250,1],[364,290,1],[364,310,1],[364,430,1],[364,520,1],[364,700,1],
    [364,720,1],[364,760,1],[364,780,4],[364,900,1],[364,980,1],[374,90,1],[374,140,1],[374,150,2],[374,180,2],
    [374,190,2],[374,250,1],[374,260,2],[374,340,1],[374,450,1],[374,480,1],[374,490,1],[374,690,1],[374,870,1],
    [384,30,3],[384,40,1],[384,50,1],[384,80,1],[384,120,1],[384,140,1],[384,150,1],[384,180,1],[384,210,1],
    [384,250,4],[384,270,1],[384,300,1],[384,310,1],[384,350,1],[384,390,1],[384,400,2],[384,550,1],[384,560,1],
    [384,730,1],[384,780,1],[393,50,1],[393,70,1],[393,100,1],[393,140,1],[393,150,2],[393,160,1],[393,180,2],
    [393,210,1],[393,290,1],[393,310,1],[393,400,2],[393,450,1],[393,480,1],[393,510,1],[393,520,1],[393,600,1],
    [393,610,1],[393,620,1],[393,630,1],[393,640,1],[393,660,1],[393,680,1],[393,710,1],[393,720,1],[393,850,1],
    [403,160,1],[403,230,2],[403,250,1],[403,280,1],[403,390,1],[403,400,2],[403,450,1],[403,470,1],[403,500,2],
    [403,570,1],[403,600,1],[403,610,1],[403,640,4],[403,690,3],[403,720,1],[403,750,1],[412,150,1],[412,160,1],
    [412,210,1],[412,220,1],[412,250,1],[412,270,1],[412,280,2],[412,330,1],[412,380,2],[412,400,4],[412,450,1],
    [412,470,1],[412,480,1],[412,490,1],[412,520,1],[412,530,1],[412,560,1],[412,620,2],[412,650,1],[412,680,1],
    [412,700,1],[412,750,1],[412,840,1],[412,870,1],[422,30,1],[422,40,1],[422,60,1],[422,160,1],[422,170,2],
    [422,180,1],[422,200,1],[422,220,1],[422,400,1],[422,420,1],[422,450,1],[422,460,1],[422,480,1],[422,490,2],
    [422,510,1],[422,560,1],[422,600,1],[422,610,1],[422,620,1],[422,630,1],[422,640,1],[422,700,1],[422,710,2],
    [422,780,1],[432,110,1],[432,150,1],[432,170,1],[432,180,1],[432,240,1],[432,250,1],[432,260,1],[432,310,1],
    [432,330,1],[432,380,1],[432,430,1],[432,460,1],[432,480,1],[432,510,1],[432,520,1],[432,530,1],[432,620,3],
    [432,630,5],[432,660,1],[432,670,2],[432,680,1],[432,690,1],[432,730,3],[432,740,1],[432,750,2],[441,50,1],
    [441,120,1],[441,140,1],[441,150,1],[441,190,2],[441,220,1],[441,290,1],[441,330,1],[441,400,1],[441,410,1],
    [441,450,1],[441,480,2],[441,500,2],[441,510,1],[441,540,1],[441,570,1],[441,600,2],[441,610,3],[441,620,1],
    [441,680,3],[441,690,2],[441,730,1],[441,850,1],[441,870,1],[451,140,1],[451,150,3],[451,160,1],[451,220,1],
    [451,400,1],[451,410,1],[451,450,1],[451,460,1],[451,480,2],[451,560,1],[451,570,1],[451,590,1],[451,600,1],
    [451,610,4],[451,620,2],[451,870,1],[451,950,2],[460,140,1],[460,150,1],[460,160,1],[460,230,1],[460,300,1],
    [460,310,3],[460,320,3],[460,330,5],[460,340,8],[460,350,2],[460,400,1],[460,410,1],[460,440,2],[460,450,1],
    [460,470,1],[460,520,1],[460,630,1],[460,670,1],[460,720,1],[460,850,1],[470,10,1],[470,130,1],[470,140,2],
    [470,150,1],[470,180,1],[470,220,1],[470,260,1],[470,300,1],[470,330,1],[470,340,1],[470,360,3],[470,400,1],
    [470,450,1],[470,520,1],[470,600,1],[470,670,1],[470,700,1],[470,850,3],[480,200,1],[480,220,1],[480,290,2],
    [480,320,2],[480,330,7],[480,410,1],[480,450,2],[480,510,1],[480,540,1],[480,620,2],[480,650,1],[480,670,2],
    [480,700,1],[480,730,1],[489,20,1],[489,130,1],[489,140,1],[489,150,2],[489,160,1],[489,170,1],[489,190,1],
    [489,220,2],[489,230,1],[489,240,2],[489,250,2],[489,260,1],[489,270,3],[489,280,1],[489,290,1],[489,430,1],
    [489,450,1],[489,510,1],[489,640,2],[489,770,1],[489,780,1],[489,840,2],[489,880,1],[499,100,1],[499,110,1],
    [499,120,1],[499,130,1],[499,140,2],[499,160,2],[499,170,1],[499,180,1],[499,210,1],[499,220,1],[499,240,1],
    [499,310,2],[499,380,1],[499,410,1],[499,450,1],[499,530,1],[499,540,1],[499,650,2],[499,720,1],[499,790,6],
    [499,810,1],[508,20,1],[508,120,1],[508,130,2],[508,140,2],[508,150,1],[508,190,1],[508,280,2],[508,360,1],
    [508,410,1],[508,450,2],[508,490,1],[508,510,2],[508,760,2],[508,860,1],[518,20,1],[518,60,1],[518,100,1],
    [518,120,1],[518,140,1],[518,150,1],[518,160,1],[518,180,1],[518,200,1],[518,210,1],[518,400,1],[518,410,1],
    [518,500,1],[527,120,1],[527,140,1],[527,150,1],[527,220,18],[527,230,3],[527,240,1],[527,270,1],[527,300,3],
    [527,380,1],[527,450,1],[527,470,1],[527,480,1],[527,490,2],[527,500,1],[527,510,2],[527,570,1],[527,580,1],
    [527,650,7],[527,830,1],[537,140,1],[537,150,1],[537,160,1],[537,170,1],[537,270,1],[537,410,1],[537,450,1],
    [537,470,2],[537,490,1],[537,630,1],[537,670,2],[537,760,1],[537,880,2],[547,80,2],[547,160,1],[547,180,4],
    [547,260,2],[547,270,1],[547,280,1],[547,380,1],[547,390,1],[547,410,1],[547,420,1],[547,520,1],[547,630,1],
    [547,750,3],[547,770,2],[547,860,4],[556,50,1],[556,70,1],[556,130,2],[556,140,1],[556,160,1],[556,190,1],
    [556,230,5],[556,290,1],[556,300,1],[556,330,1],[556,390,11],[556,450,2],[556,460,13],[556,500,13],[556,520,6],
    [556,530,14],[556,600,3],[556,660,4],[566,140,1],[566,170,1],[566,180,1],[566,230,1],[566,260,1],[566,320,3],
    [566,360,1],[566,490,1],[566,830,3],[575,20,1],[575,140,2],[575,150,2],[575,160,1],[575,180,1],[575,260,11],
    [575,330,1],[575,410,2],[575,450,1],[585,90,1],[585,100,1],[585,140,1],[585,160,1],[585,180,1],[585,190,1],
    [585,200,1],[585,250,1],[585,310,1],[585,330,1],[585,830,1],[595,30,1],[595,70,2],[595,80,1],[595,90,1],
    [595,140,1],[595,160,1],[595,180,1],[595,200,1],[595,250,1],[595,280,1],[595,450,1],[595,530,1],[595,540,1],
    [604,20,1],[604,150,2],[604,180,1],[604,200,1],[604,290,1],[604,410,1],[604,830,1],[614,0,3],[614,20,1],
    [614,40,1],[614,140,1],[614,160,1],[614,180,1],[614,230,1],[614,430,1],[614,510,1],[623,200,1],[623,230,2],
    [623,300,1],[623,330,1],[623,410,1],[623,420,1],[623,520,1],[623,530,2],[623,570,5],[633,60,1],[633,150,1],
    [633,170,1],[633,190,1],[633,260,2],[633,400,1],[633,570,4],[633,830,1],[643,0,1],[643,70,1],[643,150,1],
    [643,330,2],[643,570,10],[643,590,1],[652,0,2],[652,140,1],[652,160,1],[652,180,2],[652,400,1],[652,470,1],
    [652,570,4],[652,830,1],[662,170,1],[662,180,1],[662,290,2],[662,400,1],[662,570,2],[671,0,1],[671,30,1],
    [671,160,1],[671,170,1],[671,310,1],[671,400,1],[671,720,1],[681,0,1],[681,160,1],[681,280,1],[681,320,1],
    [700,80,1],[700,170,1],[700,850,1],[710,240,1],[710,450,1],[719,80,1],[719,140,1],[719,150,1],[719,710,1],
    [729,240,1],[729,840,1],[738,10,1],[738,40,1],[738,450,1],[748,0,1],[758,300,1],[758,660,1],[767,270,2],
    [796,160,1],[806,970,1],[815,280,1],[815,300,1],[815,360,1],[825,790,1],[844,470,1],[901,270,1],[921,220,1],
    [921,340,1],[921,720,1],[930,490,1],[930,500,1],[940,180,2],[940,430,1],[940,510,1],[940,580,1],[949,120,5],
    [949,150,1],[949,180,1],[949,370,1],[949,390,1],[949,570,2],[949,720,1],[949,770,2],[949,780,1],[949,860,1]];



    const options = {canvas: 'testCanvas', data: data, debug: true};
    const result = await Heatmap.initialize(options);
    console.log('result', result);
    console.time('draw');
    this.draw();
    console.timeEnd('draw');
  }

  async draw() {
    const options = {};
    await Heatmap.draw(options);
  }

}
