<template>
  <div class="calendar" :style="{ border: border ? '1px solid gray' : '' }">
    <!-- 日历标题 -->
    <div class="calendar__title">
      <span class="calendar__bt" @click="handleDateComputed('subtract', 1, 'month')">
        <slot name="last-month-wrap"> &lt; </slot>
      </span>
      <span class="calendar__bt" @click="handleDateComputed('subtract', 1, 'year')">
        <slot name="last-year-wrap"> &lt;&lt; </slot>
      </span>
      <span class="calendar__title-center">{{ currentDate.format(dateShowFormat[lang] || 'YYYY / MM') }}</span>
      <span class="calendar__bt" @click="handleDateComputed('add', 1, 'year')">
        <slot name="next-year-wrap"> &gt;&gt; </slot>
      </span>
      <span class="calendar__bt" @click="handleDateComputed('add', 1, 'month')">
        <slot name="next-month-wrap"> &gt; </slot>
      </span>
    </div>
    <!-- 日历星期 -->
    <div class="calendar__weekdays" :style="{ borderBottom: border ? '1px solid gray' : '' }">
      <span v-for="(item, index) in initWeekdaysByMode" :key="index" class="calendar__weekday">
        {{ item }}
      </span>
    </div>
    <!-- 日历日期 -->
    <div class="calendar__month">
      <div @click="onDateSelect(day)"
        class="calendar__day" v-for="(day, index) in dateArrayInMonth" :key="index"
        :style="{ marginLeft: index === 0 ? `${(startDay % 7) * 14.285}%` : '' }"
      >
        <div :style="{ borderRadius: type === 'square' ? '4px' : '50%' }"
          :class="['calendar__day-wrap', selectDate === day ? 'calendar__selected-day' :
          (fixedCurrentDate === day ? 'calendar__current-day' : 'calendar__normal-day')]"
        >
          {{ index + 1 }}
        </div>
        <slot name="date-desc"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    lang: {
      type: String,
      default: 'zh'
    },
    mode: {
      type: String,
      default: 'sun' // 默认周天起始
    },
    border: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'circle'
    }
  },
  data () {
    return {
      dateShowFormat: {
        zh: 'YYYY 年 MM 月',
        en: 'YYYY / MM',
        ja: 'YYYY - MM'
      },
      weekdays: {
        zh: ['日', '一', '二', '三', '四', '五', '六'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ja: ['日', '月', '火', '水', '木', '金', '土']
      },
      fixedCurrentDate: moment().format('YYYY-MM-DD'), // 固定的当前日期
      currentDate: moment(), // 日历中当前日期
      selectDate: '' // 选中日期
    }
  },
  computed: {
    initWeekdaysByMode () {
      const obj = JSON.parse(JSON.stringify(this.weekdays[this.lang]))
      if (this.mode === 'mon') {
        const temp = obj.shift()
        obj.push(temp)
      }
      return obj
    },
    startDay () {
      const num = parseInt(moment(this.currentDate).startOf('month').format('E'))
      return this.mode === 'mon' ? num - 1 : num
    },
    daysInMonth () {
      return moment(this.currentDate).daysInMonth()
    },
    dateArrayInMonth () {
      const array = []
      for (let i = 0; i < this.daysInMonth; i++) {
        array.push(moment(this.currentDate).startOf('month').add(i, 'day').format('YYYY-MM-DD'))
      }
      // console.log(array)
      return array
    }
  },
  methods: {
    onDateSelect (day) {
      this.selectDate = day
      this.$emit('onDateSelect', day)
    },
    // type: subtract, add | size: month, year, day
    handleDateComputed (type, num, size) {
      this.currentDate = type === 'add' ? moment(this.currentDate).add(num, size) : moment(this.currentDate).subtract(num, size)
    }
  }
}
</script>
<style scoped>
.calendar {
  background: white;
  padding: 1rem 0 0.5rem 0;
}
.calendar__title {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.calendar__bt {
  width: 14.285%;
  cursor: pointer;
}
.calendar__title-center {
  flex: 1;
}
.calendar__weekdays {
display: flex;
}
.calendar__weekday {
  flex: 1;
  padding: 10px 0;
  color: gray;
}
.calendar__month {
  text-align: left;
  width: 100%;
}
.calendar__day {
  display: inline-block;
  width: 14.285%;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin: 0.4rem 0;
}
.calendar__day-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  margin: 0 auto;
  /* border-radius: 50%; */
}
.calendar__selected-day {
  color: white;
  background: #409EFF;
}
.calendar__normal-day {
  color: black;
}
.calendar__current-day {
  color: white;
  background: #67C23A;
}
</style>
