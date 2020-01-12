import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AddBox from '@material-ui/icons/AddBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Swal from 'sweetalert2'

const user_template = {
    courses: [
        {
            title: "Calculus 101",
            lectures: [
                { title: 'Lecture 1', },
                { title: 'Lecture 1', }
            ]
        },
        {
            title: "Chem 102",
            lectures: [
                { title: 'Lecture 1', },
                { title: 'Lecture 1', }
            ]
        },
        {
            title: "Phys 103",
            lectures: [
                { title: 'Lecture 1', },
                { title: 'Lecture 1', }
            ]
        },
        {
            title: "Phys 103",
            lectures: [
                { title: 'Lecture 1', },
                { title: 'Lecture 1', }
            ]
        }
    ]
}
class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: user_template
        }
    }

    createCourse = () => {
        Swal.fire({
            title: 'Create New Course',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: 'Enter Title'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            confirmButtonColor: '#494F55',
            showLoaderOnConfirm: true,
            preConfirm: (lecture_name) => {
                let updated_user = this.state.user
                let lecture = { title: lecture_name, lectures: [] }
                updated_user.courses.push(lecture)
                this.setState({ user: updated_user })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    createLecture = course_id => {
        Swal.fire({
            title: `Add new Lecture to ${this.state.user.courses[course_id].title}`,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: 'Enter Title'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            confirmButtonColor: '#494F55',
            showLoaderOnConfirm: true,
            preConfirm: (course_name) => {
                let updated_user = this.state.user
                updated_user.courses[course_id].lectures.push({ title: course_name, lectures: [] })
                this.setState({ user: updated_user })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    render() {
        return (
            <div className="side-bar">
                <div className="side-bar-title">
                    <span>Courses</span>
                    <span className="side-bar-add-icon"><AddBox onClick={this.createCourse} /></span>
                </div>
                {this.state.user.courses.map((course, i) => {
                    return (
                        <div key={i}>
                            <ExpansionPanel style={{ borderRadius: 0 }}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <span className="side-bar-courses-title">{course.title}</span>
                                </ExpansionPanelSummary>
                                <div className="side-bar-lectures">
                                    <div className="side-bar-lectures-title">
                                        <span>Lectures</span>
                                        <span className="side-bar-add-icon2"><AddBox onClick={() => this.createLecture(i)} /></span>
                                    </div>
                                    {course.lectures.map((lecture, i) => {
                                        return (
                                            <div key={i} className="side-bar-lecture">
                                                <span>{lecture.title}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </ExpansionPanel>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SideBar;
