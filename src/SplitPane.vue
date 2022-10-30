<template>
<splitpanes class="default-theme" horizontal style="height: 600px"
  @resize="pane_resize('resize', $event)"
  @resized="pane_resized('resized', $event)"
  >
  <pane 
       v-for="{index, start, end} in pane_list_"
              :index="index"
              :start="start"
              :end="end"

  >
  <g-gantt-chart
    v-bind:chart-start="chartStart"
    v-bind:chart-end="chartEnd"
    precision="day"
    :row-height="20"
    grid
    width="100%"
    bar-start="beginDate"
    bar-end="endDate"
    :date-format="format"
    @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
    @mousedown="touchStart($event)"
    @mousemove="touchMove($event)"
    @mouseup="touchEnd($event)"
    @wheel="mousewheel($event,index)"
  >
   <g-gantt-row
          v-for="{label, bars} in task_list_.slice(start, end)"
              :label="label"
              highlight-on-hover
              :bars="bars"

    />

  </g-gantt-chart>

  </pane>
</splitpanes>
</template>


<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import { ref } from "vue"
import GGanttRow from "./components/GGanttRow.vue"
import GGanttChart from "./components/GGanttChart.vue"
import { GanttBarObject } from "./models/models"
import dayjs from 'dayjs';
import { objData } from "./gendata/jsondata.js"

const format = ref("YYYY/MM/DD HH:mm")
const chartStart = ref("2021/06/10 12:00")  //error duplicate
const chartEnd   = ref("2021/07/15 12:00")

/*
let v1_start = 4
let v1_end   = 8
const v1_row_index_start = ref(v1_start)
const v1_row_index_end = ref(v1_end)

let v2_start = 4
let v2_end   = 10
const v2_row_index_start = ref(v2_start)
const v2_row_index_end = ref(v2_end)

let v3_start = 5
let v3_end   = 11
const v3_row_index_start = ref(v3_start)
const v3_row_index_end = ref(v3_end)
*/

let pane_list:{ [key: string]: any; }  = new Array()
let pane_list_ = ref(pane_list)
//pane_list.push({ start: v1_start, end: v1_start  })
pane_list.push({ index: 0, start: 2, end: 15  })
pane_list.push({ index: 1, start: 5, end: 18  })
pane_list.push({ index: 2, start: 20, end: 35  })



let task_list:{ [key: string]: any; }  = new Array()
let task_list_ = ref(task_list)


objData.forEach((elem, index) => {
    console.log(elem);
    task_list.push(elem)
});

const shiftUp = () => {
     row_index_start.value -= 1
     row_index_end.value -= 1
}
const shiftDown = () => {
     row_index_start.value += 1
     row_index_end.value += 1
}
let drag:boolean = false;
let drag_offsetX:int = 0;

const pane_resize = (s:string,e:Event) => {
   console.log("resize")
}

const pane_resized = (s:string,e:Event) => {
   console.log("resized")
}

const touchStart = (e:Event) => {
  drag = true
  drag_offsetX = e.offsetX

}
const touchMove = (e:Event) => {
  if (drag) {
    //let z = e.offsetX - drag_offsetX 
    let z = (drag_offsetX  - e.offsetX) 
    const start = dayjs(chartStart.value ).add(z,"h")
    const end   = dayjs(chartEnd.value ).add(z,"h")
    chartStart.value = dayjs(start).format('YYYY/MM/DD HH:mm')
    chartEnd.value   = dayjs(end).format('YYYY/MM/DD HH:mm')
    drag_offsetX = e.offsetX
  }
}

const touchEnd = (e:Event) => {
  drag = false
}

const mousewheel = (e:Event, n:Int) => {
  console.log(n);
  e.preventDefault();
  let d = e.deltaY * 0.02;
  pane_list_.value[n]["start"] += d;
  pane_list_.value[n]["end"] += d;
}

const _mousewheel = (e:Event, n:Int) => {
  console.log(n);
  e.preventDefault();
  let d = e.deltaY * 0.02;
  if (n == 1 ) {
    v1_row_index_start.value += d
    v1_row_index_end.value += d
  } else if (n == 2 ) {
    v2_row_index_start.value += d
    v2_row_index_end.value += d
  } else if (n == 3 ) {
    v3_row_index_start.value += d
    v3_row_index_end.value += d
  }
}

</script>

