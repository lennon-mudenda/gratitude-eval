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
        category_query: '',
        exam_query: '',
        selected_cat_group: 1,
        selected_exam_group: 1,
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
        },
        exam_update_form: {
            id: 0,
            title: '',
            duration: ''
        },
        category_update_form: {
            id: 0,
            name: ''
        },
        question_update_form: {
            id: 0,
            question: '',
            exam_id: 0,
            category_id: 0
        },
        answer_update_form: {
            id: 0,
            question_id: 0,
            answer: '',
            correct: false
        }
    },

    computed: {
        category_groups()
        {
            return Math.ceil(this.categories.length / 10);
        },

        exam_groups()
        {
            return Math.ceil(this.exams.length / 10);
        },

        filtered_exams()
        {
            return this.exams.filter(function (exam) {
                return app.match_exam_query(exam);
            }).slice((this.selected_exam_group - 1) * 10 , (this.selected_exam_group - 1) * 10 + 10);
        },

        filtered_categories()
        {
            return this.categories.filter(function (category) {
                return app.match_cat_query(category);
            }).slice((this.selected_cat_group - 1) * 10 , (this.selected_cat_group - 1) * 10 + 10);
        }
    },

    methods: {

        ...axiosMethods,

        match_cat_query(category)
        {
            if(this.category_query === '') return true;
            return category.name.search(this.category_query) > 0;
        },

        match_exam_query(exam)
        {
            if(this.exam_query === '') return true;
            return exam.title.search(this.exam_query) > 0 || exam.title.search(this.exam_query) > 0;
        },

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
            let c = this.category_update_form;
            this.update(
                `/categories/${c.id}`,
                {
                    name: c.name
                },
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.categories[getIndex(vueApp.categories, data.id)] = data;
                    }
                },
                this
            );
        },

        update_exam()
        {
            let e = this.exam_update_form;
            this.update(
                `/exams/${e.id}`,
                {
                    title: e.title,
                    duration: e.duration
                },
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams[getIndex(vueApp.exams, data.id)] = data;
                    }
                },
                this
            );
        },

        update_question()
        {
            let q = this.question_update_form;
            this.update(
                `/questions/${q.id}`,
                {
                    question: q.question,
                    category_id: q.category_id
                },
                function (data, error, vueApp) {
                    if(!error)
                    {
                        let exam = vueApp.exams[getIndex(vueApp.exams, data.exam_id)];
                        exam.questions = exam.questions.map(function (qq) {
                            if(qq.id === data.id)
                            {
                                qq = data;
                            }
                            return qq;
                        });
                    }
                },
                this
            );
        },

        update_answer()
        {
            let a = this.answer_update_form;
            this.update(
                `/answers/${a.id}`,
                {
                    answer: a.answer,
                    correct: a.correct
                },
                function (data, error, vueApp) {
                    if(!error)
                    {
                        vueApp.exams.forEach(function (exam) {
                            exam.questions[getIndex(exam.questions, data.question_id)].answers = exam.questions[getIndex(exam.questions, data.question_id)].answers.filter(function (aa) {
                                if(aa.id === data.id)
                                {
                                    aa = data;
                                }
                                return aa;
                            });
                        });
                    }
                },
                this
            );
        }
    },

    mounted()
    {
        this.loadCategories();
        this.loadExams();
    }
});
