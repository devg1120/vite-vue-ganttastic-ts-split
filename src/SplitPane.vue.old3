<template>
<splitpanes class="default-theme" horizontal style="height: 600px">
  <pane >
  <g-gantt-chart
    v-bind:chart-start="chartStart"
    v-bind:chart-end="chartEnd"
    precision="day"
    :row-height="40"
    grid
    width="100%"
    bar-start="beginDate"
    bar-end="endDate"
    :date-format="format"
    @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
    @mousedown="touchStart($event)"
    @mousemove="touchMove($event)"
    @mouseup="touchEnd($event)"
    @wheel="mousewheel($event)"
  >
   <g-gantt-row
          v-for="{label, bars} in task_list_.slice(row_index_start, row_index_end)"
              :label="label"
              highlight-on-hover
              :bars="bars"

    />

  </g-gantt-chart>

  </pane>
  <pane>
  <g-gantt-chart
    v-bind:chart-start="chartStart"
    v-bind:chart-end="chartEnd"
    precision="day"
    :row-height="40"
    grid
    width="100%"
    bar-start="beginDate"
    bar-end="endDate"
    :date-format="format"
    @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
    @mousedown="touchStart($event)"
    @mousemove="touchMove($event)"
    @mouseup="touchEnd($event)"
    @wheel="mousewheel($event)"
  >
   <g-gantt-row
          v-for="{label, bars} in task_list_.slice(row_index_start, row_index_end)"
              :label="label"
              highlight-on-hover
              :bars="bars"

    />

  </g-gantt-chart>
  </pane>
  <pane >
  <g-gantt-chart
    v-bind:chart-start="chartStart"
    v-bind:chart-end="chartEnd"
    precision="day"
    :row-height="40"
    grid
    width="100%"
    bar-start="beginDate"
    bar-end="endDate"
    :date-format="format"
    @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
    @mousedown="touchStart($event)"
    @mousemove="touchMove($event)"
    @mouseup="touchEnd($event)"
    @wheel="mousewheel($event)"
  >
   <g-gantt-row
          v-for="{label, bars} in task_list_.slice(row_index_start, row_index_end)"
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

let _start = 4
let _end   = 10
const row_index_start = ref(_start)
const row_index_end = ref(_end)

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

const touchStart = (e:Event) => {
  drag = true
  drag_offsetX = e.offsetX

  //console.log("touchStart")
  //console.log(e)
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
  //console.log("touchEnd")
  //console.log(e)
}
const mousewheel = (e:Event) => {
  e.preventDefault();
  //console.log("mousewheel")
  let d = e.deltaY * 0.02;
  row_index_start.value += d
  row_index_end.value += d

  //console.log(e)
}

</script>

