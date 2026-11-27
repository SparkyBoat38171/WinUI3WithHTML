/* WinUI Gallery samples — Date & time */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  CalendarDatePicker: {
    examples: [
      {
        title: "A CalendarDatePicker",
        center: true,
        preview: `
          <div class="win-calendar-date-picker" style="width:260px">
            <span class="win-text-field__header">Date</span>
            <button class="win-calendar-date-picker__button" aria-haspopup="dialog" aria-expanded="false">
              <span class="win-calendar-date-picker__value win-calendar-date-picker__placeholder">Select a date</span>
              <span class="win-icon">&#xE787;</span>
            </button>
            <input type="hidden" value="2026-11-26">
          </div>`,
        xaml: `<CalendarDatePicker Header="Date"
                    PlaceholderText="Select a date"
                    Date="2026-11-26" />`,
        csharp: `private void DatePicker_DateChanged(CalendarDatePicker sender, CalendarDatePickerDateChangedEventArgs args)
{
    SelectedDate.Text = args.NewDate?.ToString("d") ?? "No date";
}`,
        html: `<div class="win-calendar-date-picker">
  <button class="win-calendar-date-picker__button">Select a date</button>
  <input type="hidden" value="2026-11-26">
</div>`
      },
      {
        title: "CalendarDatePicker with date limits",
        center: true,
        preview: `
          <div class="win-calendar-date-picker" style="width:280px">
            <span class="win-text-field__header">Appointment date</span>
            <button class="win-calendar-date-picker__button" aria-haspopup="dialog" aria-expanded="false">
              <span class="win-calendar-date-picker__value">November 26, 2026</span>
              <span class="win-icon">&#xE787;</span>
            </button>
            <input type="hidden" value="2026-11-26">
            <span class="win-text-field__description">Dates must be between Nov 1 and Dec 31, 2026.</span>
          </div>`,
        xaml: `<CalendarDatePicker MinDate="2026-11-01" MaxDate="2026-12-31" />`,
        csharp: `// MinDate and MaxDate restrict the selectable range.`,
        html: `<div class="win-calendar-date-picker" data-min="2026-11-01" data-max="2026-12-31">…</div>`
      }
    ]
  },

  CalendarView: {
    examples: [
      {
        title: "A simple CalendarView",
        center: true,
        preview: `<div class="win-calendar" data-year="2026" data-month="10" data-selected="2026-11-26" style="max-width:400px"></div>`,
        xaml: `<CalendarView SelectedDates="2026-11-26" SelectionMode="Single" />`,
        csharp: `private void Calendar_SelectedDatesChanged(CalendarView sender, CalendarViewSelectedDatesChangedEventArgs args)
{
    var date = sender.SelectedDates.FirstOrDefault();
    SelectedDate.Text = date.ToString("D");
}`,
        html: `<div class="win-calendar" data-selected="2026-11-26"></div>`
      },
      {
        title: "CalendarView with multiple selection",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-calendar" data-year="2026" data-month="10" data-selected="2026-11-26" style="max-width:400px"></div>
          <p class="win-caption win-text-secondary">SelectionMode="Multiple" allows more than one date. CalendarView also supports range selection.</p>`,
        xaml: `<CalendarView SelectionMode="Multiple" IsTodayHighlighted="True" />`,
        csharp: `foreach (var date in CalendarControl.SelectedDates)
{
    // Process the selected dates.
}`,
        html: `<div class="win-calendar" data-multiple="true">…</div>`
      }
    ]
  },

  DatePicker: {
    examples: [
      {
        title: "A simple DatePicker",
        center: true,
        preview: `
          <div class="win-date-picker" style="width:300px">
            <span class="win-text-field__header">Choose a date</span>
            <button class="win-date-picker__button" aria-haspopup="dialog" aria-expanded="false">
              <span class="win-date-picker__value">Nov 26, 2026</span>
              <span class="win-icon">&#xE787;</span>
            </button>
            <input type="hidden" value="2026-11-26">
          </div>`,
        xaml: `<DatePicker Header="Choose a date" Date="2026-11-26" />`,
        csharp: `private void DatePicker_DateChanged(object sender, DatePickerValueChangedEventArgs e)
{
    Output.Text = e.NewDate.ToString("D");
}`,
        html: `<div class="win-date-picker">
  <button class="win-date-picker__button">Nov 26, 2026</button>
  <input type="hidden" value="2026-11-26">
</div>`
      },
      {
        title: "DatePicker with a date range",
        center: true,
        preview: `
          <div class="win-date-picker" style="width:310px">
            <span class="win-text-field__header">Appointment date</span>
            <button class="win-date-picker__button" aria-haspopup="dialog" aria-expanded="false"><span class="win-date-picker__value">Nov 26, 2026</span><span class="win-icon">&#xE787;</span></button>
            <input type="hidden" value="2026-11-26">
            <span class="win-text-field__description">Available from Nov 1 through Dec 31, 2026.</span>
          </div>`,
        xaml: `<DatePicker MinYear="2026" MaxYear="2026" />`,
        csharp: `// MinYear and MaxYear constrain the available years.`,
        html: `<div class="win-date-picker" data-min="2026-11-01" data-max="2026-12-31">…</div>`
      }
    ]
  },

  TimePicker: {
    examples: [
      {
        title: "A simple TimePicker",
        center: true,
        preview: `
          <div class="win-time-picker" style="width:240px">
            <span class="win-text-field__header">Time</span>
            <button class="win-time-picker__button" aria-haspopup="dialog" aria-expanded="false">
              <span class="win-time-picker__value" data-value="09:30"></span>
            </button>
            <input type="hidden" value="09:30">
          </div>`,
        xaml: `<TimePicker Header="Time" ClockIdentifier="12HourClock" Time="09:30" />`,
        csharp: `private void TimePicker_TimeChanged(object sender, TimePickerValueChangedEventArgs e)
{
    Output.Text = e.NewTime.ToString();
}`,
        html: `<div class="win-time-picker">
  <button class="win-time-picker__button">9:30 AM</button>
</div>`
      },
      {
        title: "TimePicker with a 24-hour clock",
        center: true,
        preview: `
          <div class="win-time-picker" style="width:240px" data-clock="24">
            <span class="win-text-field__header">Time</span>
            <button class="win-time-picker__button" aria-haspopup="dialog" aria-expanded="false"><span class="win-time-picker__value" data-value="14:45"></span></button>
            <input type="hidden" value="14:45">
          </div>`,
        xaml: `<TimePicker ClockIdentifier="24HourClock" MinuteIncrement="15" />`,
        csharp: `// MinuteIncrement controls how granular the minute list is.`,
        html: `<div class="win-time-picker" data-clock="24">…</div>`
      }
    ]
  }
});
