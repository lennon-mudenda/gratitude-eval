@extends('layouts.app')

@section('content')
<div class="container" id="app">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    <button type="button" class="btn btn-primary" @click="tab = 'cat'">Categories</button>
                    <button type="button" class="btn btn-primary" @click="tab = 'exam'">Exams</button>
                    <br>
                    <br>
                    <div id="cat-container" v-show="tab === 'cat'">
                        <h3>Category Management</h3>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="category in categories">
                                        <th scope="row" v-text="category.id"></th>
                                        <td v-text="category.name"></td>
                                        <td>Actions</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="exam-container" v-show="tab === 'exam'">
                        <h3>Exam Management</h3>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="exam in exams">
                                    <th scope="row" v-text="exam.id"></th>
                                    <td v-text="exam.title"></td>
                                    <td v-text="exam.duration"></td>
                                    <td>Actions</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
