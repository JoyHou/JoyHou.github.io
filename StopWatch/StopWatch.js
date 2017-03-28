/**
 * Created by Joy on 3/27/17.
 */

class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            laps: [],
            intervalID: null,
            stop: true,
            startTime: 0,
            lastLapTime: 0
        };

        this.start = this.start.bind(this);
        this.laps = this.laps.bind(this);
        this.stop = this.stop.bind(this);
        this.updateTime = this.updateTime.bind(this);

    }

    updateTime() {
        const now = Date.now();
        const timeShowed = now - this.state.startTime;
        this.setState({time: timeShowed});

    }

    start() {
        const IntervalID = setInterval(this.updateTime, 10);

        this.setState({
            time: 0,
            laps: [],
            stop: false,
            intervalID: IntervalID,
            startTime: Date.now()
        })

    }

    laps() {
        const laps = this.state.laps;
        const lapClickMoment = Date.now();
        if (laps.length === 0) {
            laps.push(this.state.time);

        } else {
            laps.push(lapClickMoment - this.state.lastLapTime);
        }
        this.setState({
            laps: laps,
            lastLapTime: lapClickMoment
        })
    }

    stop() {
        clearInterval(this.state.intervalID);
        this.setState({
            stop: true
        })
    }


    render() {
        let lapsRow =[];

        for (let i=0; i<this.state.laps.length; i++) {
            let lapsFormat = new Date(this.state.laps[i]);
            let lapsHour = lapsFormat.getUTCHours();
            let lapsMinute = lapsFormat.getMinutes();
            let lapsSecond = lapsFormat.getSeconds();
            let lapsSecondMinus = Math.floor(lapsFormat.getMilliseconds()/10);
            lapsRow.push(
                <tr>
                    <td className="lapKey">{i+1}</td>
                    <td>{lapsHour} : {lapsMinute} : {lapsSecond}'{lapsSecondMinus}
                    </td>
                </tr>
            )
        }

        let date = new Date(this.state.time);
        let hour = date.getUTCHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let secondMinus = Math.floor(date.getMilliseconds()/10);

        return (
            <div>
                <div className="time alert alert-info">
                    {hour} : {minute} : {second}'{secondMinus}
                </div>

                <div className="buttonGroup">

                    <button className="btn btn-info btn-lg" onClick={this.start} disabled={!this.state.stop}>Start</button>
                    <button className="btn btn-info btn-lg" onClick={this.laps} disabled={this.state.stop}>Laps</button>
                    <button className="btn btn-info btn-lg" onClick={this.stop}>Stop</button>
                </div>

                <table className="lapsRecord table table-striped">
                    <thead>
                        <tr>
                            <th>Laps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lapsRow}
                    </tbody>
                </table>

            </div>
        )

    }


}

ReactDOM.render(
    <StopWatch style="backgroundColor: "/>,
    document.getElementById("stopWatch")
);