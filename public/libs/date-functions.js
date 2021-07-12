function assertEquals(current, expected) {
  console.assert(current === expected, 'Ошибка: значения не равны - ' + current + ' не равно ' + expected)
}

function getDaysOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

function n(str, char) {
  return [...str].filter(ch => ch === char).length
}

console.log(n('hello', 'l'))


assertEquals(getDaysOfMonth(0, 2021), 31)
assertEquals(getDaysOfMonth(1, 2021), 28)
assertEquals(getDaysOfMonth(2, 2021), 31)
assertEquals(getDaysOfMonth(3, 2021), 30)

