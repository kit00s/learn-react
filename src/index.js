//Приложение предлагает пользователю ввести две даты: начало периода и конец периода
//После ввода дат и нажатия кнопки эти значения записываются в таблицу под формой
//В отдельном столбце таблицы рассчитывается кол-во календарных дней между введенными датами

import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Dates extends React.Component {
    constructor(props) {
        super(props);
        
        //Будем хранить массив введенных дат (для таблицы) и текущие даты в окнах ввода
        this.state = {
            items: [],
            startDate: new Date('2019-10-06T00:00:00'),
            endDate: new Date('2019-11-06T00:00:00'),
        };
        
        //Привязка обработчиков двух полей и кнопки
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //При изменении даты в поле значение записывается в state
    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    //При изменении даты в поле значение записывается в state
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    //Обработка кнопки
    handleSubmit(e) {
        e.preventDefault(); //?
        
        //Проверяем, заполнены ли обе даты. Если нет - заканчиваем
        if (!this.state.startDate || !this.state.endDate) {
            return;
        }
        
        //Даты заполнены, значит создаем объект, где сохраним нужные данные
        const newItem = {
            startDate: this.state.startDate, //Первая дата
            endDate: this.state.endDate, //Вторая дата
            diff: this.calculateDaysLeft(this.state.startDate, this.state.endDate), //Кол-во дней между датами
            id: Date.now() //Текущая дата для идентификации
        };

        //Записываем объект в массив в state
        this.setState(state => ({
            items: state.items.concat(newItem)
        }));
    }

    //Функция для расчета кол-ва дней между двумя датами
    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);

        return endDate.diff(startDate, "days");
    }

    //Рендерим страничку
    render() {
        return (
            <div>
                <h1>Разница между двумя датами</h1>
                <form onSubmit={this.handleSubmit}>
                        <label>Начало периода:</label><br/>
                        <DatePicker
                        dateFormat="dd.MM.yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                        /><br/>
                        <label>Конец периода:</label><br/>
                        <DatePicker
                        dateFormat="dd.MM.yyyy"
                        selected={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        /><br/><br/><br/>
                        <button type="submit">
                            Добавить
                        </button><br/>
                </form>
                <br/>
                <DatesList items={this.state.items} />
            </div>
        );
    }
}

//Вывод списка введенных дат в таблицу
class DatesList extends React.Component {
    render() {
        console.log('Рендерим список');
      return (   
        <div class="table-wrapper">
            <table class="fl-table">
            <thead>
                <tr>
                    <th width="33%">Дата начала</th>
                    <th width="33%">Дата конца</th>
                    <th>Разница</th>
                </tr>
            </thead>
            <tbody>
                {this.props.items.map(item => (
                    <tr>
                        <td>{item.startDate.toLocaleDateString("ru-RU")}</td>
                        <td>{item.endDate.toLocaleDateString("ru-RU")}</td>
                        <td>{item.diff}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Dates />, rootElement);
