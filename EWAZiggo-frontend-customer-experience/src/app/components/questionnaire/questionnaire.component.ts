import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {QuestionnaireService} from '../../services/questionnaire.service';
import {Question} from '../../models/question.model';
import {Questionnaire} from '../../models/questionnaire.model';
import {AuthenticationService} from '@customer//_services';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  questions = [];
  htmlQuestions = [];

  firstQuestion = true;

  QuestionCount = 1;
  category = 0;
  geenVragenOver = false;
  jaGeantwoord = false;

  questionnaire = new Questionnaire(0, 0);


  constructor(private questionnaireservice: QuestionnaireService, private authenticationService: AuthenticationService) {


  }


  geenVragenMeer() {
    this.geenVragenOver = true;
    console.log('deze methode is aangeroepen');


  }


  submitQuestionnaire(questionnaire: Questionnaire) {

    this.firstQuestion = false;
    var holder = [];
    this.questionnaireservice.getQuestionnaires().subscribe(
      data => {
        holder = data;


        questionnaire.id = holder[holder.length - 1].id + 1;
        questionnaire._created = Date.now();


        this.questionnaireservice.submitQuestionnaire(questionnaire, this.category, Date.now()).subscribe(
          (data2: Questionnaire) => {
            console.log(data2);

            //werkt alleen met customers als t goed is en kan niet inloggen met customer om een of andere reden.
            this.questionnaireservice.submitQuestionnaireToUser(this.authenticationService.currentUserValue.idUser, this.questionnaire.id).subscribe(
              (error: any) => console.log(error)
            );
          },
          (error: any) => console.log(error)
        );


      }
    );

  }

  setFalse() {
    this.jaGeantwoord = false;
  }

  answerFalse(question: Question) {
    this.jaGeantwoord = false;
    question.solved = false;
    this.postQuestion(question);

  }

  answerTrue(question: Question) {
    if (this.jaGeantwoord == true) {
      return;
    }
    question.solved = true;
    this.postQuestion(question);
    this.jaGeantwoord = true;
  }

  postQuestion(question: Question) {

    if (this.firstQuestion == true) {
      this.submitQuestionnaire(this.questionnaire);
    }
    console.log('Questionnaire id:' + this.questionnaire.id);

    var iets = [];
    this.questionnaireservice.getAllQuestions().subscribe(
      data => {
        iets = data;
        console.log('iets length is: ' + iets.length);


        question.id = iets[iets.length - 1].id + 1;


        this.questionnaireservice.submitQuestion(question).subscribe(
          (data: Question) => {
            console.log(data);


            this.questionnaireservice.submitQuestionToQuestionnaire(this.questionnaire.id, question.id).subscribe(
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
    );


  }


  nextQuestion(question: Question) {
    // console.log("nextQuestionCount: "+this.QuestionCount
    // +"questionarray length: "+ this.questions[this.category].vragen.length);

    if (this.QuestionCount < this.questions.length) {
      this.answerFalse(question);
      this.htmlQuestions.push(this.questions[this.QuestionCount]);

      this.QuestionCount++;

    } else if (this.QuestionCount == this.questions.length) {
      console.log('lengte vragen:' + this.questions.length);
      this.answerFalse(question);
      this.QuestionCount++;
    }
    if (this.QuestionCount > this.questions.length) {
      console.log('er zijn geen vragen meer. Roep gerust een supercoole functie aan om chatknop ' +
        'tevoorschijn te halen');
      this.geenVragenMeer();
    }


  }

  ngOnInit() {


    console.log('submitting questionnaire');

    //
    // voorbeeld set questionnaire
    // this.questionnaireservice.setActiveQuestionnaire(1).subscribe(
    //   (data: Questionnaire) => {
    //     console.log('de questionnaire is geset');
    //     console.log(data);
    //   },
    //   (error: any) => console.log(error)
    // );

    this.category = this.questionnaireservice.getCategory();


    this.questionnaireservice.getQuestionsOfCategory().subscribe(
      data => {
        this.questions = data;
        console.log('De lengte van thisquestions is: ' + this.questions.length);
        this.htmlQuestions.push(this.questions[0]);
      }
    );


  }

  openChat() {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=400,height=600,left=0,top=0`;
    open('/client-chat', 'test', params);
  }

}
