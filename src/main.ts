import { createApp } from "vue"
//import Playground from "./GanttPlayground.vue"
import SplitPane from "./SplitPane.vue"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isBetween from "dayjs/plugin/isBetween"
import customParseFormat from "dayjs/plugin/customParseFormat"
import ganttastic from "./index"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

//createApp(Playground).use(ganttastic).mount("#app")
createApp(SplitPane).use(ganttastic).mount("#app")
