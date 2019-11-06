import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Dates extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: [],
            startDate: new Date('2019-10-06T00:00:00'),
            endDate: new Date('2019-11-06T00:00:00'),
        };
        
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
        console.log('Изменена дата начала: ' + date);
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
        console.log('Изменена дата конца: ' + date);
    }

    handleSubmit(e) {
        e.preventDefault();
          
        if (!this.state.startDate || !this.state.endDate) {
            console.log('Не все даты заполнены');
            return;
        }
    
        const newItem = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            diff: this.calculateDaysLeft(this.state.startDate, this.state.endDate),
            id: Date.now()
        };
        console.log('Создана новая сущность');

        this.setState(state => ({
            items: state.items.concat(newItem)
        }));
        console.log('Новая сущность добавлена в список');
    }

  calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);

    return endDate.diff(startDate, "days");
    //return endDate -
  }

  render() {
    const { startDate, endDate } = this.state;

    const daysLeft = this.calculateDaysLeft(startDate, endDate);
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
                    <button type="submit" class="pure-button pure-button-primary">
                        Добавить
                    </button><br/>
            </form>
            <br/>
            <DatesList items={this.state.items} />
        </div>
    );
  }
}

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
