import {Component, OnInit} from '@angular/core';
import {Questionnaire} from '../../../models/questionnaire.model';
import {Category} from '../../../models/category.model';
import {QuestionnaireService} from '../../../services/questionnaire.service';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-questionnaire-manager',
  templateUrl: './questionnaire-manager.component.html',
  styleUrls: ['./questionnaire-manager.component.css'],

})
export class QuestionnaireManagerComponent implements OnInit {
  questionnaires = [new Questionnaire()];
  disabled = true;
  isActive = false;
  question= new Question(15,"asd","asd");
  showQuestionnaireDetails = false;
  showQuestionDetails = false;
  showList = true;
  currentQuestionnaire: Questionnaire;
  categories: Category[] = [
    {categoryId: 1, name: 'geen internet'},
    {categoryId: 2, name: 'geen wifi'},
    {categoryId: 3, name: 'traag wifi'}
  ];

  constructor(private questionnaireservice: QuestionnaireService) {
  }

  ngOnInit() {

    this.question.id=17;
    this.question.title="asd";
    this.question.question="asd";


    this.currentQuestionnaire = new Questionnaire(15, Date.now());
    this.currentQuestionnaire.name = 'Poging 1';
    this.currentQuestionnaire.category = new Category(2, 'geen wifi');

    this.newQuestion(this.question,this.currentQuestionnaire.id);

  }

  newQuestionnaire() {
    this.showList = false;
    this.showQuestionnaireDetails = true;
  }

  cancelAdd() {
    this.showList = true;
    this.showQuestionnaireDetails = false;
  }

  saveQuestionnaire() {
    this.showList = true;
    this.showQuestionnaireDetails = false;
  }

  getImage(category) {
    switch (category) {
      case 'geen internet': {
        return '../../../../assets/images/no_internet.png';
      }
      case 'geen wifi': {
        return '../../../../assets/images/no_wifi.png';
      }
      case 'traag wifi' : {
        return '../../../../assets/images/slow_wifi.png';
      }
    }
  }

  newQuestion(question:Question,questionnaireId:number) {
    this.showQuestionDetails = true;

    this.questionnaireservice.submitQuestion(question).subscribe(
      (data: Question) => {
        console.log(data);


        this.questionnaireservice.submitQuestionToQuestionnaire(questionnaireId, question.id).subscribe(
          (data: Question) => {
            console.log('de geuploadde question id is: ' + question.id);
            console.log(data);
          },
          (error: any) => console.log(error)
        );
      },
      (error: any) => console.log(error)
    );

  }

  cancelQuestion() {
    this.showQuestionDetails = false;
  }

  saveQuestion() {
    this.showQuestionDetails = false;
  }
}
