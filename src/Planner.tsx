/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React from "react";
import "./Planner.css";
import CourseList from "./CourseList";
import { Plan } from "./interfaces/Plan";
import { usePlannerFunctions } from "./PlannerFunctions";

interface Planner {
    plan: Plan;
}

const Planner: React.FC<Planner> = ({ plan }) => {
    const {
        semestersData,
        searchTerm,
        showCourseList,
        coursesVisibility,
        allSemestersVisible,
        selectedSemester,
        setSelectedSemester,
        handleSearchTermChange,
        filteredCourses,
        semesterOptions,
        handleCourseSelected,
        handleSkipToggle,
        handleInsertCourse,
        handleInsertSemester,
        handleEditCourse,
        handleClearCourses,
        handleRemoveCourse,
        handleRemoveSemester,
        handleClearAllSemesters,
        handleToggleVisibility,
        handleToggleAllSemestersVisibility,
        handleMoveCourseStart,
        moveCourseData,
        handleMoveCourseConfirm,
        setMoveCourseData,
        plans,
        currentPlanIndex,
        handlePlanChange,
        handleInsertPlan,
        handleRemovePlan,
        handleResetCourse
    } = usePlannerFunctions(plan);

    return (
        <div className="semester-courses">
            <div className="plan-buttons">
                <select
                    value={currentPlanIndex}
                    onChange={e => handlePlanChange(Number(e.target.value))}
                >
                    {plans.map((p, index) => (
                        <option key={p.id} value={index}>
                            {p.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleInsertPlan}>Insert New Plan</button>
                <button onClick={handleRemovePlan}>Remove Current Plan</button>
            </div>
            <h1
                className="plan-title"
                onClick={handleToggleAllSemestersVisibility}
            >
                <span
                    className={
                        allSemestersVisible ? "arrow-icon rotate" : "arrow-icon"
                    }
                >
                    &#x25B6;
                </span>{" "}
                {plan.title}
            </h1>
            {allSemestersVisible && (
                <div className="button-row">
                    <button onClick={handleInsertSemester}>
                        Insert New Semester
                    </button>
                    <button onClick={handleClearAllSemesters}>
                        Clear All Semesters
                    </button>
                </div>
            )}
            <div className="search-bar">
                <select
                    value={selectedSemester || ""}
                    onChange={e => setSelectedSemester(e.target.value || null)}
                >
                    <option value="" disabled>
                        Selected Semester
                    </option>
                    {semesterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search by Course Code"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            {showCourseList && (
                <div className="course-list-container">
                    <CourseList
                        courses={filteredCourses}
                        onCourseSelected={handleCourseSelected}
                    />
                </div>
            )}
            {semestersData.map((semester, semesterIndex) => (
                <div
                    key={semesterIndex}
                    style={{ display: allSemestersVisible ? "block" : "none" }}
                >
                    {semester.skip ? (
                        <h2>{semester.id}(Skipped)</h2>
                    ) : (
                        <h2
                            onClick={() =>
                                handleToggleVisibility(semesterIndex)
                            }
                        >
                            <span
                                className={
                                    coursesVisibility[semesterIndex]
                                        ? "arrow-icon rotate"
                                        : "arrow-icon"
                                }
                            >
                                &#x25B6;
                            </span>
                            {semester.id}
                        </h2>
                    )}
                    <div className="semester-buttons">
                        <button onClick={() => handleSkipToggle(semesterIndex)}>
                            {semester.skip ? "Unskip" : "Skip"}
                        </button>
                        {coursesVisibility[semesterIndex] && (
                            <div>
                                <button
                                    onClick={() =>
                                        handleClearCourses(semesterIndex)
                                    }
                                >
                                    Clear Courses in Semester
                                </button>
                                <button
                                    onClick={() =>
                                        handleInsertCourse(semesterIndex, {
                                            code: "NEWCOURSE Code",
                                            name: "New Course",
                                            descr: "New Descr",
                                            credits: "3",
                                            preReq: "New PreReq",
                                            restrict: "New Restrict",
                                            breadth: "New Breadth",
                                            typ: "New Typ"
                                        })
                                    }
                                >
                                    Insert New Course
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => handleRemoveSemester(semesterIndex)}
                        >
                            Remove Semester
                        </button>
                    </div>
                    {coursesVisibility[semesterIndex] && !semester.skip ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Name</th>
                                    <th>Credits</th>
                                    <th>Description</th>
                                    <th>Prerequisites</th>
                                    <th>Restrictions</th>
                                    <th>Breadth</th>
                                    <th>Typically Offered</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semester.courses.map((course, courseIndex) => (
                                    <tr key={courseIndex}>
                                        <td>{course.code}</td>
                                        <td>{course.name}</td>
                                        <td>{course.credits}</td>
                                        <td>{course.descr}</td>
                                        <td>{course.preReq}</td>
                                        <td>{course.restrict}</td>
                                        <td>{course.breadth}</td>
                                        <td>{course.typ}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleEditCourse(
                                                        semesterIndex,
                                                        courseIndex,
                                                        {
                                                            code:
                                                                prompt(
                                                                    "Enter new code",
                                                                    course.code
                                                                ) ||
                                                                course.code,
                                                            name:
                                                                prompt(
                                                                    "Enter new name",
                                                                    course.name
                                                                ) ||
                                                                course.name,
                                                            descr:
                                                                prompt(
                                                                    "Enter new description",
                                                                    course.descr
                                                                ) ||
                                                                course.descr,
                                                            credits:
                                                                prompt(
                                                                    "Enter new credits",
                                                                    course.credits
                                                                ) ||
                                                                course.credits,
                                                            preReq:
                                                                prompt(
                                                                    "Enter new prerequisites",
                                                                    course.preReq
                                                                ) ||
                                                                course.preReq,
                                                            restrict:
                                                                prompt(
                                                                    "Enter new restrictions",
                                                                    course.restrict
                                                                ) ||
                                                                course.restrict,
                                                            breadth:
                                                                prompt(
                                                                    "Enter new breadth",
                                                                    course.breadth
                                                                ) ||
                                                                course.breadth,
                                                            typ:
                                                                prompt(
                                                                    "Enter new typically offered",
                                                                    course.typ
                                                                ) || course.typ
                                                        }
                                                    )
                                                }
                                            >
                                                Edit Course
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleResetCourse(
                                                        semesterIndex,
                                                        courseIndex
                                                    )
                                                }
                                            >
                                                Reset Course
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRemoveCourse(
                                                        semesterIndex,
                                                        courseIndex
                                                    )
                                                }
                                            >
                                                Remove Course
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleMoveCourseStart(
                                                        semesterIndex,
                                                        courseIndex
                                                    )
                                                }
                                            >
                                                Move Course
                                            </button>
                                            {moveCourseData.fromSemesterIndex ===
                                                semesterIndex &&
                                                moveCourseData.courseIndex ===
                                                    courseIndex && (
                                                    <div>
                                                        <select
                                                            value={
                                                                moveCourseData.toSemesterId
                                                            }
                                                            onChange={e =>
                                                                setMoveCourseData(
                                                                    {
                                                                        ...moveCourseData,
                                                                        toSemesterId:
                                                                            e
                                                                                .target
                                                                                .value
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                Select
                                                                Destination
                                                                Semester
                                                            </option>
                                                            {semesterOptions.map(
                                                                option => (
                                                                    <option
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        value={
                                                                            option.value
                                                                        }
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        <button
                                                            onClick={
                                                                handleMoveCourseConfirm
                                                            }
                                                        >
                                                            Move
                                                        </button>
                                                    </div>
                                                )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export { Planner };
