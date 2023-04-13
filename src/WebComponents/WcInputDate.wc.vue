<template>
  <div :class="['app-input-date', { disabled }]" v-click-outside="onHidePicker">
    <label v-if="label" class="label">
      {{ label }}
      <app-tooltip v-if="info" class="info-helptext">
        <template v-slot:content>
          {{ info }}
        </template>
      </app-tooltip>
    </label>
    <div class="input-value" @click="togglePicker">
      <span class="value">{{ displayDate || placeholder }}</span>
      <app-icon icon="calendar" class="calendar-icon" />
    </div>
    <div class="picker-popup" :class="{ hidden: !showPicker }">
      <div class="header">
        <app-icon icon="arrow-left" class="month-icon" :class="{ disabled: activePicker === 'month' }" @click="onPrevious" />
        <span @click="changePicker('month')">{{ currentMonthLabel }}</span>
        <span @click="changePicker('year')">{{ activePicker === "year" ? `${years[0]}-${years[years.length - 1]}` : currentYear }}</span>
        <app-icon icon="arrow-right" class="month-icon" :class="{ disabled: activePicker === 'month' }" @click="onNext" />
      </div>

      <div v-if="activePicker === 'month'" class="month-wrapper">
        <div v-for="(month, i) in monthsAbbreviations" :key="i" :class="monthClassObj(i)" @click="setMonth(i)">
          {{ month }}
        </div>
      </div>
      <div v-else-if="activePicker === 'year'" class="year-wrapper">
        <div v-for="(year, i) in years" :key="i" :class="yearMonthObj(year)" @click="setYear(year)">{{ year }}</div>
      </div>
      <div v-else class="days-wrapper">
        <div class="headings" v-for="(dayLabel, i) in dayLabels" :key="i">
          {{ dayLabel }}
        </div>
        <div v-for="(day, i) in dates" class="day" :class="dayClassObj(day)" :key="i" @click="setSelectedDate(day)">
          {{ day.date }}
        </div>
      </div>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import vClickOutside from "click-outside-vue3";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    modelValue: {
      type: [Date, String],
      default: null,
      validator(value) {
        return dayjs(value).isValid;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: " ",
    },
    label: {
      type: String,
      default: "",
    },
    info: {
      type: String,
      default: "",
    },
    // TODO: add range functionality
    asRange: {
      type: Boolean,
      deafult: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showPicker: false,
      activePicker: "date",

      selectedDate: null,
      currDateCursor: null,

      dayLabels: ["M", "T", "W", "Th", "F", "S", "S"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };
  },
  watch: {
    modelValue(oldVal, newVal) {
      if (oldVal !== newVal) this.initComponent();
    },
  },
  computed: {
    displayDate() {
      return this.selectedDate?.format("DD/MM/YYYY");
    },
    currentMonth() {
      return this.currDateCursor.month();
    },
    currentYear() {
      return this.currDateCursor.year();
    },
    currentMonthLabel() {
      return this.months[this.currentMonth];
    },
    monthsAbbreviations() {
      return this.months.map((month) => month.substring(0, 3).toUpperCase());
    },
    years() {
      const result = [];
      const startYear = this.currDateCursor.subtract(5, "y");
      for (let year = startYear; result.length < 12; year = year.add(1, "y")) {
        result.push(year.year());
      }
      return result;
    },
    dates() {
      const daysFromFirst = this.currDateCursor.date() - 1;
      let startDate = this.currDateCursor.subtract(daysFromFirst, "d");

      const daysNeededForLastMonth = startDate.day() - 1;
      startDate = startDate.subtract(daysNeededForLastMonth, "d");

      // always generate 6 full weeks to keep the formatting consistent
      let endDate = startDate.add(41, "d");
      const result = [];
      for (let day = startDate; !day.isSame(endDate, "day"); day = day.add(1, "d")) {
        result.push({
          dayjs: day,
          date: day.date(),
          isCurrentMonth: day.isSame(this.currDateCursor, "month"),
          isToday: day.isSame(dayjs(), "day"),
          isSelected: day.isSame(this.selectedDate, "day"),
        });
      }
      return result;
    },
  },
  created() {
    const today = dayjs();
    this.currDateCursor = today;
  },
  mounted() {
    if (this.modelValue) this.initComponent();
  },
  methods: {
    initComponent() {
      this.currDateCursor = dayjs(this.modelValue);
      this.selectedDate = dayjs(this.modelValue);
    },
    togglePicker() {
      this.showPicker = !this.showPicker;
    },
    onHidePicker() {
      this.showPicker = false;
      if (this.activePicker !== "date") this.activePicker = "date";
    },
    changePicker(newVal) {
      this.activePicker = this.activePicker === newVal ? "date" : newVal;
    },
    dayClassObj(day) {
      return {
        today: day.isToday,
        current: day.isCurrentMonth,
        selected: day.isSelected,
      };
    },
    monthClassObj(month) {
      return {
        today: dayjs().month(month).isSame(dayjs(), "month"),
        selected: dayjs().month(month).isSame(this.selectedDate, "month"),
      };
    },
    yearMonthObj(year) {
      return {
        today: dayjs().year(year).isSame(dayjs(), "year"),
        selected: dayjs().year(year).isSame(this.selectedDate, "year"),
      };
    },
    onNext() {
      switch (this.activePicker) {
        case "date":
          this.currDateCursor = this.currDateCursor.add(1, "M");
          break;
        case "month":
          this.currDateCursor = this.currDateCursor.add(1, "M");
          break;
        case "year":
          this.currDateCursor = this.currDateCursor.add(12, "y");
          break;
      }
    },
    onPrevious() {
      switch (this.activePicker) {
        case "date":
          this.currDateCursor = this.currDateCursor.subtract(1, "M");
          break;
        case "month":
          this.currDateCursor = this.currDateCursor.subtract(1, "M");
          break;
        case "year":
          this.currDateCursor = this.currDateCursor.subtract(12, "y");
          break;
      }
    },
    setSelectedDate(day) {
      this.selectedDate = day.dayjs;
      this.$emit("update:modelValue", this.selectedDate.format());
      // change calendar to correct month if they select previous or next month's days
      if (!day.isCurrentMonth) {
        // number of month
        const selectedMonth = day.dayjs.month();
        this.currDateCursor = day.dayjs.month(selectedMonth);
      }
    },
    setMonth(monthIndex) {
      this.currDateCursor = this.currDateCursor.month(monthIndex);
      this.activePicker = "date";
    },
    setYear(year) {
      this.currDateCursor = this.selectedDate.year(year);
      this.activePicker = "date";
    },
  },
};
</script>

<style lang="scss" scoped>
.app-input-date {
  position: relative;
}
.disabled {
  pointer-events: none;
}
.error {
  border: 2px solid red;
}
.error-msg {
  font: var(--paragraph5-regular-font);
  color: var(--color-status-negative-text);
  text-align: left;
}
.info-helptext {
  margin-left: 0.8rem;
}
.label {
  font: var(--paragraph4-medium-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
}
.input-value {
  font: var(--paragraph4-regular-font);
  border: 0.2rem solid var(--color-gray-700);
  border-radius: 0.6rem;
  outline: none;
  padding: 1rem 1.6rem;
  position: relative;
  min-height: 4rem;
  background-color: white;
  .calendar-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    height: 2rem;
    width: 2rem;
    color: var(--color-primary-300);
  }
}
.picker-popup {
  background-color: white;
  width: 300px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 2rem 0.8rem;
  position: absolute;
  top: 105%;
  left: 50%;
  transform: translateX(-50%);
  &.hidden {
    display: none;
  }
}
.header {
  font-size: 1.25rem;
  color: var(--color-primary-500);
  align-items: center;
  display: flex;
  justify-content: space-between;
  span {
    text-align: center;
    font: var(--paragraph3-medium-font);
    cursor: pointer;
    border-radius: 0.8rem;
    padding: 0.8rem;
    &:hover {
      background: var(--color-primary-100);
    }
  }
  .month-icon {
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    &:hover {
      background-color: var(--color-primary-50);
    }
  }
}
.year-wrapper,
.month-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.8rem 1.2rem 0;
  div {
    padding: 0.8rem 1.6rem;
    align-items: center;
    display: flex;
    justify-content: center;
    color: var(--color-primary-700);
    font: var(--paragraph4-regular-font);
    border-radius: 0.8rem;
    cursor: pointer;
    &.today {
      color: var(--color-primary-accent-500);
      font: var(--paragraph4-bold-font);
    }
    &.selected {
      background: var(--color-primary-accent-500);
      color: white;
    }
    &:not(.selected):hover {
      background: var(--color-primary-100);
      transition: background 150ms;
    }
  }
}
.days-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.8rem 1.2rem 0;
  .headings {
    align-items: center;
    display: flex;
    justify-content: center;
    font: var(--paragraph4-bold-font);
    color: var(--color-primary-700);
  }
  .day {
    align-items: center;
    display: flex;
    justify-content: center;
    color: var(--color-primary-700);
    font: var(--paragraph4-regular-font);
    opacity: 0.4;
    border-radius: 8px;
    cursor: pointer;
    &.today {
      color: var(--color-primary-accent-500);
      font: var(--paragraph4-bold-font);
    }
    &.selected {
      background: var(--color-primary-accent-500);
      color: white;
    }

    &.current {
      opacity: 1;
    }

    &::before {
      content: "";
      display: inline-block;
      height: 0;
      padding-bottom: 100%;
      width: 1px;
    }

    &:not(.selected):hover {
      background: var(--color-primary-100);
      transition: background 150ms;
    }
  }
}
</style>
