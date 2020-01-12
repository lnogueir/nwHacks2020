import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SideBar(props) {
    const user = {
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
    return (
        <div className="side-bar">
            <div className="side-bar-title">Courses:</div>
            {user.courses.map(course => {
                return (
                    <div>
                        <ExpansionPanel style={{ borderRadius: 0 }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <span className="side-bar-courses-title">{course.title}</span>
                            </ExpansionPanelSummary>
                            <div className="side-bar-lectures">
                                <div className="side-bar-lectures-title">
                                    Lectures
                                </div>
                                {course.lectures.map(lecture => {
                                    return (
                                        <div className="side-bar-lecture">
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

export default SideBar;
