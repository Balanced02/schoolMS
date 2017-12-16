import React, {Component} from 'react';
import {Row, Col, Card, Content, CardTitle, CardText} from 'reactstrap';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import AddStudentCategory from '../../components/AddStudentCategory';
import studentCategoryList from '../../components/studentCategoryList';


class StudentCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            searching:true,
            studentCategory: {
               category: '',
            },
            studentCategoryList:{
              searching: true,
              studentCategories:[],
            },
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
              studentCategoryList:{
                  ...this.state.studentCategoryList,
                  searching: false,
                  studentCategoryList: data.categories,
              },  
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
        const {studentCategory, studentCategoryList} = this.state
        return(
            <div className="animated fadeIn container">
            <h1>It just worked</h1>
            <Card className="cotainer" style={{padding:10}}>
                <Row>
                    <Col>
                        <AddStudentCategory
                        data = {studentCategory}
                        edit = {e => this.editCategory(e)}
                        submit = {() => this.createCategory()}
                        />
                    </Col>
                    <Col>
                        <studentCategoryList
                        data = {studentCategoryList}
                        />
                    </Col>
                </Row>
            </Card>
            </div>
            
            
            );
    }
    
}

export default connect()(StudentCategory);