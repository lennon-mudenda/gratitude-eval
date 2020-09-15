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
        }
    },

    mounted()
    {
        this.loadCategories();
        this.loadExams();
    }
});
