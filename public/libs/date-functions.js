function assertEquals(current, expected) {
  console.assert(current === expected, 'Ошибка: значения не равны - ' + current + ' не равно ' + expected)
}

function getDaysCountOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

assertEquals(getDaysCountOfMonth(0, 2021), 31)
assertEquals(getDaysCountOfMonth(1, 2021), 28)
assertEquals(getDaysCountOfMonth(2, 2021), 31)
assertEquals(getDaysCountOfMonth(3, 2021), 30)


function getFirstDay(month, year) {
  return new Date(year, month, 1).getUTCDay()
}

assertEquals(getFirstDay(6, 2021), 3)
assertEquals(getFirstDay(5, 2021), 1)
assertEquals(getFirstDay(4, 2021), 5)
assertEquals(getFirstDay(3, 2021), 3)


function getWeekdayName(index) {
  const monday = new Date('2021-07-12')
  monday.setDate(monday.getDate() + index)
  return monday.toLocaleDateString('ru', {weekday: 'long'})
}

assertEquals(getWeekdayName(0), 'понедельник')
assertEquals(getWeekdayName(3), 'четверг')
assertEquals(getWeekdayName(6), 'воскресенье')

function getMonthName(index) {
  const month = new Date(2021, index, 1)
  return month.toLocaleDateString('ru', {month: 'long'})
}

assertEquals(getMonthName(0), 'январь')
assertEquals(getMonthName(1), 'февраль')
assertEquals(getMonthName(11), 'декабрь')

function getYearName(index) {
  const year = new Date(index, 0, 1)
  return year.toLocaleDateString('ru', {year: 'numeric'})
}

assertEquals(getYearName(2021), '2021')

function getISODate(date) {
    const d = new Date(date)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    const arr = d.toISOString().split('T')
    return arr[0]
}

assertEquals(getISODate(new Date(2021, 6, 1)), '2021-07-01')


function what(date) {
    return date.toLocaleTimeString('ru')
}
assertEquals(what(new Date(2020, 0, 1)), '00:00:00')
assertEquals(what(new Date(2020, 0, 1, 1)), '01:00:00')
