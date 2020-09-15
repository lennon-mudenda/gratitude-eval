require('./bootstrap');

window.Vue = require('vue');
const url = '';

let axiosMethods = {

    async post(path, data, callback, vueApp)
    {
        let url_ = (path.indexOf('setToken') > -1)? path : url + path;
        await axios
            .post(url_ , data)
            .then(function (response) {
                callback(response.data, null, vueApp);
            })
            .catch(function (error) {
                callback(null, error, vueApp);
            });
    },


    async get(path, callback, vueApp)
    {
        await axios
            .get(url + path)
            .then(function (response) {
                callback(response.data, null, vueApp);
            })
            .catch(function (error) {
                callback(null, error, vueApp);
            });
    },

    async update(path, data, callback, vueApp)
    {
        await axios.put(url + path, data)
            .then(function (response) {
                callback(reponse.data, null, vueApp);
            })
            .catch(function (error) {
                callback(null, error, vueApp);
            });

    },

    async delete(path, callback, vueApp)
    {
        await axios.delete(url + path)
            .then(function (response) {
                callback(reponse.data, null, vueApp);
            })
            .catch(function (error) {
                callback(null, error, vueApp);
            });
    }
};

function getIndex(list, id)
{
    let i = 0;
    while(i < list.length && list[i].id !== id) i++;
    return i;
}

const app = new Vue({
    el: '#app',

    data: {
        tab: '',
        exams: [],
        categories: [],
        current_exam: {
            id: 0,
            title: '',
            duration: '',
            questions: []
        },
        exam_form: {
            title: '',
            duration: ''
        },
        category_form: {
            name: ''
        },
        question_form: {
            question: '',
            exam_id: 0,
            category_id: 0
        },
        answer_form: {
            question_id: 0,
            answer: '',
            correct: false
        }
    },

    computed: {

    },

    methods: {
        ...axiosMethods,

        loadCategories()
        {
            this.get(
                '/categories',
                function(data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.categories = data;
                    }
                },
                this
            );
        },
        loadExams()
        {
            this.get(
                '/exams',
                function(data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams = data;
                    }
                },
                this
            );
        },

        save_exam()
        {
            this.post(
                '/exams',
                this.exam_form,
                function(data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams.push(data);
                        vueApp.exam_form = {
                            title: '',
                            duration: ''
                        };
                    }
                },
                this
            );
        },

        save_category()
        {
            this.post(
                '/categories',
                this.category_form,
                function(data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.categories.push(data);
                        vueApp.category_form = {
                            name: ''
                        };
                    }
                },
                this
            );
        },

        save_question()
        {
            this.post(
                '/questions',
                this.question_form,
                function(data, error, vueApp) {
                    if(!error)
                    {
                        let exam = vueApp.exams[getIndex(vueApp.exams, data.exam_id)];
                        exam.questions.push(data);
                        vueApp.question_form = {
                            question: '',
                            exam_id: 0,
                            category_id: 0
                        };
                    }
                },
                this
            );
        },

        save_answer()
        {
            this.post(
                '/answers',
                this.answer_form,
                function(data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams.forEach(function (exam) {
                            exam.questions[getIndex(exam.questions, data.question_id)].answers.push(data);
                        });
                        vueApp.answer_form = {
                            question_id: 0,
                            answer: '',
                            correct: false
                        };
                    }
                },
                this
            );
        },

        delete_category(category)
        {
            this.delete(
                `/categories/${category.id}`,
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.categories = vueApp.categories.filter(function (c) {
                            return c.id !== category.id;
                        });
                    }
                },
                this
            );
        },

        delete_exam(exam)
        {
            this.delete(
                `/exams/${exam.id}`,
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams = vueApp.exams.filter(function (e) {
                            return e.id !== exam.id;
                        });
                    }
                },
                this
            );
        },

        delete_question(question)
        {
            this.delete(
                `/questions/${question.id}`,
                function (data, error, vueApp) {
                    if(!error)
                    {
                        let exam = vueApp.exams[getIndex(vueApp.exams, question.exam_id)];
                        exam.questions = exam.questions.filter(function (q) {
                            return q.id !== question.id;
                        });
                    }
                },
                this
            );
        },

        delete_answer(answer)
        {
            this.delete(
                `/answers/${answer.id}`,
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams.forEach(function (exam) {
                            exam.questions[getIndex(exam.questions, answer.question_id)].answers = exam.questions[getIndex(exam.questions, answer.question_id)].answers.filter(function (a) {
                                return a.id !== answer.id
                            });
                        });
                    }
                },
                this
            );
        },

        update_category()
        {

        },

        update_exam()
        {

        },

        update_question()
        {

        },

        update_answer()
        {

        }
    },

    mounted()
    {
        this.loadCategories();
        this.loadExams();
    }
});
