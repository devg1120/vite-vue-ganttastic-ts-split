<template>
<splitpanes class="default-theme" :horizontal="splittype_is_horizontal()"  style="height: 600px"
  @resize="pane_resize(splittype, $event)"
  @resized="pane_resized(splittype, $event)"
>
    <pane 
         v-for="{index, start, end} in v_pane_list_"
                :index="index"
                :start="start"
                :end="end"

    >
    
     <splitpanes :push-other-panes="false"
      @resize="v_pane_resize($event[0].size)"
      @resized="v_pane_resized($event[0].size)"
     >
     
     <!--
     <splitpanes :push-other-panes="false"
     >
     -->
     <pane
         v-for="{h_index, chartStart, chartEnd, size} in h_pane_list_"
                :h_index="h_index"
                :chartStart="chartStart"
                :chartEnd="chartEnd"
		:size="size"
     >
       <g-gantt-chart
         :h_index="h_index"
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
         @mousemove="touchMove($event,h_index)"
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
//const chartStart = ref("2021/06/10 12:00")  //error duplicate
//const chartEnd   = ref("2021/07/15 12:00")

//const horizontal = true
const splittype = "horizontal"
const splittype_is_horizontal = ()=> {
     return splittype == "horizontal"
}

let h_pane_list:{ [key: string]: any; }  = new Array()
let h_pane_list_ = ref(h_pane_list)
h_pane_list.push({ h_index: 0, chartStart: "2021/06/10 12:00", chartEnd: "2021/06/21 12:00"  , size : 60})
h_pane_list.push({ h_index: 1, chartStart: "2021/06/25 12:00", chartEnd: "2021/07/10 12:00"  , size : 40})

let v_pane_list:{ [key: string]: any; }  = new Array()
let v_pane_list_ = ref(v_pane_list)
v_pane_list.push({ index: 0, start: 2,  end: 15  })
v_pane_list.push({ index: 1, start: 5,  end: 18  })
v_pane_list.push({ index: 2, start: 20, end: 35  })


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
   console.log("resize:", s)
}

const pane_resized = (s:string,e:Event) => {
   console.log("resized:", s)
}

const v_pane_resize = ( s:Int) => {
   console.log("resize:", s)
   h_pane_list_.value[0]["size"] = s
   h_pane_list_.value[1]["size"] = 100- s
}

const v_pane_resized = ( s:Int) => {
   console.log("resized:", s)
   h_pane_list_.value[0]["size"] = s
   h_pane_list_.value[1]["size"] = 100- s
}
const touchStart = (e:Event) => {
  drag = true
  drag_offsetX = e.offsetX

}
const touchMove = (e:Event, n:Int) => {
  if (drag) {
console.log("h_index:" + n)
    //let z = e.offsetX - drag_offsetX 
    let z = (drag_offsetX  - e.offsetX) 
    //const start = dayjs(chartStart.value ).add(z,"h")
    //const end   = dayjs(chartEnd.value ).add(z,"h")
    //chartStart.value = dayjs(start).format('YYYY/MM/DD HH:mm')
    //chartEnd.value   = dayjs(end).format('YYYY/MM/DD HH:mm')
    const start = dayjs(h_pane_list_.value[n]["chartStart"]).add(z,"h")
    const end   = dayjs(h_pane_list_.value[n]["chartEnd"]).add(z,"h")
    h_pane_list_.value[n]["chartStart"] = dayjs(start).format('YYYY/MM/DD HH:mm')
    h_pane_list_.value[n]["chartEnd"]   = dayjs(end).format('YYYY/MM/DD HH:mm')

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
  v_pane_list_.value[n]["start"] += d;
  v_pane_list_.value[n]["end"] += d;
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

