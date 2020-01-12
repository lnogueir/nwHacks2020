import React from 'react'
import AddBox from '@material-ui/icons/AddBox';
import axios from 'axios';

const Course = props => (
    <div>
        <span className="side-bar-courses-title">{props.course.title}</span>
    </div>
)

class NewSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user')
            .then(response => {
                console.log(response);
                this.setState({ courses: response.data.courses });
            })
            .catch((err) => console.log("My Error: " + err));
    }

    render() {
        return (
            <div className="side-bar">
                <div className="side-bar-title">
                    <span>Courses</span>
                </div>
                {this.state.courses.map((course) => {
                    return (
                       <Course title={course}/>
                    )
                })}
            </div>
        )
    }
}

export default NewSidebar;
