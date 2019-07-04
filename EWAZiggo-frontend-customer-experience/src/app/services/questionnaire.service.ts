
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Question} from '../models/question.model';
import {Questionnaire} from '../models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {

  }


  baseUrl = 'http://localhost:8080/VodafoneZiggoApi-1.2/services/rest/question';

  questionCountUrl = this.baseUrl + '/true';


  getQuestionsUrl = this.baseUrl + '/active/questions/';

  getQuestionsOfQuestionnaireUrl = this.baseUrl + '/questionnaire/questions/';

  getQuestionsOfCategoryUrl = this.baseUrl + '/active/questions/';

  setActiveQuestionnaireUrl = this.baseUrl + '/active/';


  getQuestionnairesUrl = this.baseUrl + '/questionnaire';

  // this.getQuestionnaireId();
  allQuestionsUrl = this.baseUrl;

  postQuestionUrl = this.baseUrl;

  addQuestionToQuestionnaireUrl = this.baseUrl + '/questionnaire/';

  postQuestionnaireUrl = this.baseUrl + '/questionnaire/';

  addQuestionnaireToUser = 'http://localhost:8080/VodafoneZiggoApi-1.2/services/rest/question/questionnaire/';

  cssquestionnaire;


  category = 1;
  private questionnaireId: number;
  private question: Question;

  getQuestion(): Question {
    console.log('questionnaire id is:' + this.question);
    return this.question;
  }

  setQuestion(value: Question) {
    console.log('questionnaire id is:' + this.question);
    return this.question;
  }


  setQuestionnaireId(value: number) {
    this.questionnaireId = value;
    console.log('DE QUESTIONNAIRE ID IS NU' + this.questionnaireId);

  }


  getQuestionnaireId(): number {
    console.log('questionnaire id is:' + this.questionnaireId);
    return this.questionnaireId;
  }


  getCategory(): number {
    console.log('De category is momenteel: ' + this.category);
    return this.category;
  }

  setCategory(value: number) {
    this.category = value;
  }

  submitQuestion(model: Question): Observable<Question> {
    console.log('Question id:' + model.id + ' Solved: ' + model.solved + ' vraag: ' + model.question + ' Title:' + model.title);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Question>(this.postQuestionUrl, model, {headers});
  }

  submitQuestionnaire(model: Questionnaire, category: number, date: number): Observable<Questionnaire> {
    console.log('tijd is: ' + Date.now());
    console.log('Questionnaire id is: ' + model.id + ' created value is: ' + model._created);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Questionnaire>(this.postQuestionnaireUrl + category + '/' + date, model, {headers});
  }


  submitQuestionnaireToUser(userId: number, questionnaireId: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.addQuestionnaireToUser + questionnaireId + '/user/' + userId, null, {headers});
  }

  submitQuestionToQuestionnaire(questionnaireId: number, questionId: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log('De categorie is: ' + this.category);
    return this.http.post(this.addQuestionToQuestionnaireUrl + questionnaireId + '/question/' + questionId, {}, {headers});
  }


  setActiveQuestionnaire(questionnaireId: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log('De categorie is: ' + this.category);
    return this.http.post(this.setActiveQuestionnaireUrl + questionnaireId , {}, {headers});
  }


  getQuestionsOfCategory(): Observable<Question[]> {

    console.log('De category in get questions is: ' + this.category);
    return this.http.get(this.getQuestionsOfCategoryUrl + this.category)
      .pipe(map(data => data as Question[]));
  }

  getQuestionsOfCQuestionnaire(questionnaireId:number): Observable<Question[]> {
    console.log('De category in get questions is: ' + this.category);
    return this.http.get(this.getQuestionsOfQuestionnaireUrl + questionnaireId)
      .pipe(map(data => data as Question[]));
  }


  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get(this.getQuestionnairesUrl)
      .pipe(map(data => data as Questionnaire[]));
  }

  getQuestionCount(): Observable<number> {
    return this.http.get(this.questionCountUrl)
      .pipe(map(data => data as number));
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get(this.allQuestionsUrl)
      .pipe(map(data => data as Question[]));
  }

}
