
export  class  Question {


  id: number;

  constructor(id: number, question: string, title: string) {
    this.id = id;
    this.question = question;
    this.title = title;
  }

  question: string
  solved: boolean;
  title: string;



}


