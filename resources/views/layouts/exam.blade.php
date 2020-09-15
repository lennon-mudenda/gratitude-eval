<div>
    <div class="row">
        <div class="col-11">
            <h4>
                <span class="mr-3">Exam Title:</span>
                <span v-text="current_exam.title"></span>
            </h4>
            <h5>
                <span class="mr-3">Duration</span>
                <span v-text="current_exam.duration"></span>
            </h5>
        </div>
        <div class="col-1">
            <button class="btn btn-primary btn-sm" @click="current_exam = {
                id: 0,
                title: '',
                duration: '',
                questions: []
            }">
                <i class="fas fa-angle-left"></i>
            </button>
        </div>
    </div>
    <h5>Questions</h5>
    <div class="mb-3">
        <button @click="question_form.exam_id = current_exam.id" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add-question-modal">Add Question</button>
        <div>
            <div class="modal fade" id="add-question-modal" tabindex="-1" aria-labelledby="add-question--modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add-exam-modal-label">Add Question</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-3 col-form-label">Category</label>
                                <div class="col-sm-9">
                                    <select class="form-control" id="title" v-model="question_form.category_id">
                                        <option value="0">Select Category</option>
                                        <option v-text="category.name" v-bind:value="category.id" v-for="category in categories"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-3 col-form-label">Question</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" id="question" v-model="question_form.question"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="save_question()" data-dismiss="modal">Save Question</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-for="category in categories" class="my-3">
        <h5>
            <strong v-text="category.name"></strong>
        </h5>
        <div v-for="(question, i) in current_exam.questions" v-if="category.id === question.category_id">
            <div class="row">
                <div class="col-10">
                    <p>
                        <span v-text="(i + 1) + '.'" class="mr-3"></span>
                        <span v-text="question.question"></span>
                    </p>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary btn-sm mr-3" @click="question_update_form  = question" data-toggle="modal" data-target="#update-question-modal">
                        <i class="fas fa-edit"></i>
                    </button>
                    <div class="modal fade" id="update-question-modal" tabindex="-1" aria-labelledby="update-question-modal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="add-exam-modal-label">Update Question</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Category</label>
                                        <div class="col-sm-9">
                                            <select class="form-control" id="title" v-model="question_update_form.category_id">
                                                <option value="0">Select Category</option>
                                                <option v-text="category.name" v-bind:value="category.id" v-for="category in categories"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Question</label>
                                        <div class="col-sm-9">
                                            <textarea class="form-control" id="question" v-model="question_update_form.question"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" @click="update_question()" data-dismiss="modal">Update Question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-warning btn-sm" @click="delete_question(question)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <button @click="answer_form.question_id = question.id" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add-answer-modal">Add Answer</button>
            <div class="modal fade" id="add-answer-modal" tabindex="-1" aria-labelledby="add-answer-modal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add-exam-modal-label">Add Answer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-3 col-form-label">Answer</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" id="question" v-model="answer_form.answer"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-3 col-form-label">Correct</label>
                                <div class="col-sm-9">
                                    <input type='checkbox' class="form-control"  v-model="answer_form.correct">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="save_answer()" data-dismiss="modal">Save Answer</button>
                        </div>
                    </div>
                </div>
            </div>
            <p>Possible Answers</p>
            <div class="row mb-2" v-for="answer in question.answers">
                <div class="col-1">
                    <i class="fas fa-circle"></i>
                </div>
                <div class="col-9">
                    <span v-text="answer.answer" v-bind:class="{'text-success': answer.correct, 'text-danger': !answer.correct}"></span>
                </div>
                <div class="col-2">
                    <button @click="answer_update_form = answer" class="btn btn-primary mr-3 btn-sm" type="button" data-toggle="modal" data-target="#update-answer-modal">
                        <i class="fas fa-edit"></i>
                    </button>
                    <div class="modal fade" id="update-answer-modal" tabindex="-1" aria-labelledby="update-answer-modal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="add-exam-modal-label">Update Answer</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Answer</label>
                                        <div class="col-sm-9">
                                            <textarea class="form-control" id="question" v-model="answer_update_form.answer"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Correct</label>
                                        <div class="col-sm-9">
                                            <input type='checkbox' class="form-control"  v-model="answer_update_form.correct">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" @click="update_answer()" data-dismiss="modal">Update Answer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-warning btn-sm" @click="delete_answer(answer)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
