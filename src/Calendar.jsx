import React from 'react';
import PropTypes from 'prop-types';

// формирование массива дней
const range = (min, max) => {
    return new Array(max - min + 1).fill(0).reduce((acc, elem) => [...acc, min++], []);
};

// получение количества дней в месяце
const getLastDay = (year, month) => {
	return new Date(year, month + 1, 0).getDate();
};

// получение первого дня недели месяца
const getFirstWeekDay = (year, month) => {
	const date = new Date(year, month, 1);
	const num  = date.getDay();
	return num === 0 ? 6 : num - 1;
};

// получение последня дня недели месяца
const getLastWeekDay = (year, month) => {
	const date = new Date(year, month + 1, 0);
	const num  = date.getDay();
	return num === 0 ? 6 : num - 1;
};

// получение количества дней в предыдущем переданном месяце
const getPrevMonthDays = (year, month) => {
	if (month - 1 < 0) {
		year--;
		month = 11;
	} else {
		month--;
    }
    
	return getLastDay(year, month);
};

// добавление предыдущих и последующих дней
const normalize = (arrayDays, left, right, year, month) => {
	for (let iter = 0, days = getPrevMonthDays(2020, 5); iter < left; iter++) {
		arrayDays.unshift(days--);
	}
	
	for (let iter = 1; iter <= right; iter++) {
		arrayDays.push(iter);
	}
	
	return arrayDays;
};

// разделение массива дней на массив недель => дней
const chunk = (arrayDays, n) => {
	const result = [];
	const count = Math.ceil(arrayDays.length / n);
	
	for (let iter = 0; iter < count; iter++)
		result.push(arrayDays.splice(0, n));
	
	return result;
};

const Calendar = ({ date }) => {
    const weekDays = [
        ['Понедельник', 'Пн'],
        ['Вторник', 'Вт'],
        ['Среда', 'Ср'],
        ['Четверг', 'Чт'],
        ['Пятница', 'Пт'],
        ['Суббота', 'Сб'],
        ['Воскресенье', 'Вс'],
    ];
    const accusativeMonthsWord = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const nominativeMonthWord = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDay = date.getDate();
    const arrayDays = range(1, getLastDay(year, month));
    const firstWeekDay = getFirstWeekDay(year, month);
    const lastWeekDay = getLastWeekDay(year, month);
    const result = chunk(normalize(arrayDays, firstWeekDay, 6 - lastWeekDay), 7);
    
    return ( 
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{ date.getDay() === 0 ? weekDays[weekDays.length - 1][0] : weekDays[date.getDay()][0] }</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{ currentDay }</div>
                    <div className="ui-datepicker-material-month">{ accusativeMonthsWord[month] }</div>
                    <div className="ui-datepicker-material-year">{ year }</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{ nominativeMonthWord[month] }</span>&nbsp;<span className="ui-datepicker-year">{ year }</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        {
                            weekDays.map(([fullDay, day], index) => {
                                return (
                                    <th scope="col" key={ index } title={ fullDay }>{ day }</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        result.map((arrayDay, index) => {
                            return (
                                <tr key={ index }>
                                    {
                                        arrayDay.map((numDay, index) => {
                                            if (numDay === currentDay) {
                                                return (
                                                    <td key={ index } className="ui-datepicker-today">{ numDay }</td>
                                                )
                                            }
                                            return (
                                                <td key={ index }>{ numDay }</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

Calendar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
};

export default Calendar;
