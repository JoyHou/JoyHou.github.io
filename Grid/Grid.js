/**
 * Created by Joy on 3/21/17.
 */

var Nest = React.createClass({

    getInitialState: function() {
        return {
            data: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            winState: false
        };
    },

    pushNumberToData: function(row, column, number) {
        let oldData = this.state.data;
        oldData[row][column] = number;
        this.setState({data: oldData});

        let sumRow = [], sumColoum = [], duijiaoxian1 = 0, duijiaoxian2 = 0;
        for (let i=0; i<this.state.data.length; i++) {
            let temp = 0;
            for (let j=0; j<this.state.data[0].length; j++) {
                temp += Number(this.state.data[i][j]);
            }
            sumRow.push(temp);
        };

        for (let j=0; j<this.state.data[0].length; j++) {
            let temp = 0;
            for (let i=0; i<this.state.data.length; i++){
                temp += Number(this.state.data[i][j]);
            }
            sumColoum.push(temp);
        };

        for (let i=0; i<oldData.length; i++) {
            duijiaoxian1 += Number(oldData[i][i]);
        };
        for (let i=0, j=oldData.length - 1; i<oldData.length, j>=0; i++, j--) {
            duijiaoxian2 += Number(oldData[i][j]);
        }

        let rowEqualJudge = sumRow.reduce((a, b) => a === b  ? a : false, 15);
        let coloumEqualJudge = sumColoum.reduce((a, b) => a === b ? a : false, 15);

        if (rowEqualJudge && coloumEqualJudge && duijiaoxian1 === 15 && duijiaoxian2 === 15) {
            this.setState({winState: true})
        } else {
            this.setState({winState: false})
        }
    },

    render: function() {
        const data = this.state.data;
        let winState = null;
        let allRows = [];

        for (let i =0; i< data.length; i++) {
            let cellsInOneRow = [];

            for (let j=0; j< data[0].length;j++) {
                cellsInOneRow.push(
                    <Cell key={""+i+j} row={i} column={j} number={data[i][j]}
                    onChange={this.pushNumberToData}
                    />
                );
            }

            allRows.push(
                <tr key = {i}>
                    {cellsInOneRow}
                </tr>
            );
        }

        if (this.state.winState) {
            winState = "Congratulations!"
        }

        return (
            <div>
                <p className="alert alert-success" style={{fontSize: 'large'}}>
                    {winState}</p>
                <table className="nest"
                    style={{borderCollapse: 'collapse', width:'200px', height:'200px'}}>
                    <tbody>
                        {allRows}
                    </tbody>
                </table>
            </div>
        );
    }
});


var Cell = React.createClass({
    _onChange(e) {
        console.log(e.target.value);
        const value = Number(e.target.value);
        if (Number.isInteger(value) && value >= 1 && value <= 9) {
            this.props.onChange(this.props.row, this.props.column, e.target.value);
        } else if (e.target.value === '') {
            this.props.onChange(this.props.row, this.props.column, null)
        }
    },

    render: function() {
        const text = this.props.number === null ? "" :this.props.number;
        return (
            <td style={{border: '3px solid black', fontSize:'3em', textAlign:'center'}}>
        <input type="text" style={{height:'64px', fontSize:"1em", width:'64px', textAlign:'center'}} value={text} onChange={this._onChange}/>
        </td>);
    }
})

ReactDOM.render(
<Nest style={{textAlign: 'center', margin: 'auto'}}/>,
    document.getElementById('content')
)


