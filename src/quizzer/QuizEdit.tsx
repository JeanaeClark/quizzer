import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
import { QuestionEdit } from "./QuestionEdit";

import "./QuizEdit.css";


export function QuizEdit ({
    quiz,
    editQuiz,
    deleteQuiz,
    switchEdit,
    resetQuizView
}: { quiz: Quiz,
    editQuiz: (qId: number, newQuiz: Quiz) => void,
    deleteQuiz: (qId: number) => void,
    switchEdit: () => void,
    resetQuizView: () => void,

}): JSX.Element {
    
    const [newQuiz, setNewQuiz] = useState<Quiz>({ ...quiz });

    const editQuestion = (questionId: number, newQuestion: Question) => {
        setNewQuiz({
            ...newQuiz,
            questionList: newQuiz.questionList.map((question: Question): Question => questionId === question.id ? {...newQuestion} : question)
        });
    };

    const removeQuestion = (questionId: number) => {
        setNewQuiz({
            ...newQuiz,
            questionList: newQuiz.questionList.filter((question: Question): boolean => questionId !== question.id)
        });
    };

    const saveChanges = () => {
        const newTitle = "spam"
        const newquiz = {...newQuiz, title: newTitle}
        setNewQuiz(newquiz)
        editQuiz(quiz.id, newQuiz);
    };

    const swapQuestion = (idx1: number, idx2: number) => {
        const question1 = newQuiz.questionList[idx1]
        const question2 = newQuiz.questionList[idx2]
        setNewQuiz({
            ...newQuiz,
            questionList: newQuiz.questionList.map(
                (idx: Question): Question => idx === question1 ? idx = question2 : idx === question2 ? idx = question1 : idx)
        });
    };

    return (
        <div>
            <div className="edit_header">
                <Form.Group controlId="formEditQuizId">
                    <div className="title_published_flex">
                        <div className="edit_title_area">
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                value={newQuiz.title}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setNewQuiz({
                                        ...newQuiz,
                                        title: e.target.value
                                    })
                                }
                            ></Form.Control>
                        </div>
                        <Form.Check
                            className="published_check"
                            type="checkbox"
                            id="is-published_check"
                            label="Quiz Published"
                            data-testid="Quiz Published"
                            checked={newQuiz.published}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewQuiz({
                                    ...newQuiz,
                                    published: !newQuiz.published
                                });
                            }}
                        ></Form.Check>
                    </div>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newQuiz.body}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewQuiz({ ...newQuiz, body: e.target.value })
                        }
                    ></Form.Control>
                </Form.Group>
            </div>

            <div>
                {newQuiz.questionList.map((q: Question, index: number) => (
                    <QuestionEdit
                        key={newQuiz.id + "|" + q.id}
                        index={index}
                        lastIndex={newQuiz.questionList.length - 1}
                        question={q}
                        editQuestion={editQuestion}
                        removeQuestion={removeQuestion}
                        swapQuestion={swapQuestion}
                    ></QuestionEdit>
                ))}
            </div>
            <hr />
            <div>
                <Button
                    className="add_question_button"
                    onClick={() => {
                        setNewQuiz({
                            ...newQuiz,
                            questionList: [
                                ...newQuiz.questionList,
                                {
                                    id: newQuiz.questionList.length,
                                    body: "Example Question",
                                    type: "short_answer_question",
                                    options: [],
                                    submission: "",
                                    expected: "Example Answer",
                                    points: 1,
                                    published: false
                                }
                            ]
                        });
                    }}
                >
                    Add Question
                </Button>
                <div className="edit_footer">
                    <div>
                        <Button
                            variant="success"
                            className="save_edit_btn"
                            onClick={() => {
                                console.log(newQuiz.title)
                                saveChanges();
                                switchEdit();
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="warning" onClick={switchEdit}>
                            Cancel
                        </Button>
                    </div>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteQuiz(quiz.id);
                            resetQuizView();
                        }}
                    >
                        Delete Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
};
