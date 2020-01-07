import React,{ Component } from 'react'
// import auth from '../../auth/auth'
import './home.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import axios from 'axios';
// import EmpService from '../api/empservice'


am4core.useTheme(am4themes_animated);
export default class Home extends Component {

    constructor() {
        super()
        // console.log(auth.isAuthenticated())
       
        this.state =
        {
            accounts: [{
                accountId: 123,
                balance: 3300
            }, {
                accountId: 124,
                balance: 9900
            }, {
                accountId: 125,
                balance: 330
            }]
            // employees: [{
            //     id: 123,
            //     name: "a",
            // },
            // {
            //     id: 124,
            //     name: "abc"
            // }, {
            //     id: 125,
            //     name: "Tim"
            // }

            // ]

        }
    }
    // retrieveEmpList() {
    //     EmpService.getListOfEmployees()
    //     .then(response => {console.log(response)})
    //     .catch(error => {console.log("Something went wrong", error)})
    //     // EmpService.sayHi()
    // }

    componentDidMount() {

        let chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data =
            this.state.accounts

            ;

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "balance";
        pieSeries.dataFields.category = "accountId";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        this.chart = chart;
    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    render(props) {

        return (
            <div>
                <div className="grid-container">
                    <div className="item1"><ul>
                        <li>Accounts</li>
                        <li>Transactions</li>
                        <li>Cards</li>
                        </ul></div>
                    <div className="item2"> <h1>Account Summary</h1><div id="chartdiv"></div> </div>
                    <div className="item4">Messages</div>
                    <div className="item3">Footer</div>
                </div>

                {/* <button className="logoutBtn btn" onClick={() => {
                    auth.logout(() => {
                        this.props.history.push("/");
                    }
                    )
                }
                }>Logout</button> */}
            </div>
        )
    }
}

