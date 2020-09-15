require('./bootstrap');

window.Vue = require('vue');

const app = new Vue({
    el: '#app',

    data: {
        exams: [],
        categories: [],
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

    },

    mounted()
    {

    }
});
