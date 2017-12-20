import React, {Component} from 'react';
import {Row, Col, Card, Content, CardTitle, CardText} from 'reactstrap';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import AddStudentCategory from '../../components/AddStudentCategory';
import StudentCategoryList from '../../components/StudentCategoryList';


class StudentCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            searching:true,
            studentCategory: {
               category: '',
            },
            studentCategories:[],
        };
    }
    
    editCategory(e){
        this.setState({
            studentCategory:{
                ...this.state.studentCategory,
                category:e.target.value,
            },
        });
        console.log(this.state.studentCategory.category);
    }
    
    getStudentCategory(){
        callApi('/getStudentCategory')
        .then(data => 
            this.setState({
                  searching: false,
                  studentCategories: data.categories,
            })
        )
        .catch(err => this.props.dispatch(showError('Unable to fetch Categories')))
    }
    
    createCategory(){
        let check = this.state.studentCategory.category;
        if(check === ''){
            this.props.dispatch(showError('Category Cannot be empty'));
        }
        else{
            callApi('/createStudentCategory', this.state.studentCategory, 'POST')
            .then(data => this.props.dispatch(showInfo('Category successfully added!')))
            .catch(err => this.props.dispatch(showError('Problem Creating notes')));
            this.setState({
                studentCategory:{
                  ...this.state.studentCategory,
                  category:'',
                },
            });
            this.getStudentCategory();
        }
    }
    
    componentDidMount(){
        this.getStudentCategory();
    }
    
    
    render(){
        const {studentCategory, studentCategories, searching} = this.state
        return(
            <div className="animated fadeIn container">
            <Card className="cotainer" style={{padding:10}}>
                <Row>
                    <div>
                        <Col>
                            <AddStudentCategory
                                data = {studentCategory}
                                edit = {e => this.editCategory(e)}
                                submit = {() => this.createCategory()}
                            />
                        </Col>
                    </div>
                <Col>
                    <div style={{ alignSelf: 'stretch', flex: 1 }}>
                        <StudentCategoryList
                        data = {studentCategories}
                        searching = {searching}
                        />
                    </div>
                </Col>
            </Row>
        </Card>
        </div>
            
            
            );
    }
    
}

export default connect()(StudentCategory);