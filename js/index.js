// https://opentdb.com/api.php?amount=5&category=23&difficulty=easy

const selectCat = document.querySelector('#selectCat')
const selectDiff = document.querySelector('#selectDiff')
const inpNum = document.querySelector('#inpNum')
const startQuiz = document.querySelector('#startQuiz')
const quizForm = document.querySelector('#quizForm')
const btnCheckClose = document.querySelector('#btnCheckClose')
const closeCard = document.querySelector('#closeCard')
const btnClose = document.querySelector('#btnClose')
const btnCancel = document.querySelector('#btnCancel')

let allQuestions;


class quiz {
    constructor(category , difficalty , amount){

        this.category = category
        this.difficalty = difficalty
        this.amount = amount

        this.score = 0;

        
    }


   async getData(){

        let response = await fetch(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficalty}`)

        let data = await response.json()

        console.log(data.results);

        return data.results
        




    }
}



//  class quiz


let myQuiz;

startQuiz.addEventListener('click' , async(e)=>{

    e.preventDefault()
      
   myQuiz = new quiz(selectCat.value , selectDiff.value , inpNum.value)
  
     allQuestions = await   myQuiz.getData()
  
     
  
      quizForm.classList.replace( 'animate__fadeInLeft' , 'd-none')
      btnCheckClose.classList.remove('d-none' )
  
     
  
     let myQuestion = new question(0)


      myQuestion.display()
  
    
  // animate__backOutLeft
  
  
  })


  //  class question

  

class question {
    constructor(index){


        this.index = index

        this.category = allQuestions[this.index].category;

        this.currentQuestion = allQuestions[this.index].question;
    
        this.questionLength = allQuestions.length;
    
        this.correctAnswer = allQuestions[this.index].correct_answer;
    
        this.inCorrectAnswer = allQuestions[this.index].incorrect_answers;
    
        this.allChoices = [this.correctAnswer, ...this.inCorrectAnswer].sort() ;

        this.answered = false;

       
    

    }


    display(){

      let  cartona = `
     <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category"> ${this.category} </span>
        <span class="fs-6 btn btn-questions"> ${this.index +1} of ${this.questionLength} Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center"> ${this.currentQuestion} </h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allChoices.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${myQuiz.score} </h2>        
    </div>`


    document.querySelector('#questionsContainer').innerHTML = cartona

    let allAnswers = document.querySelectorAll(".choices li");

    allAnswers.forEach(answer =>{
        answer.addEventListener('click' , (e)=>{
  
           this.checkAnswer(e.target)

        })
    })


    }

    checkAnswer(userAnswer){

        if (this.answered) {
            return;
          }

        if (userAnswer.innerHTML ==  this.correctAnswer ) {


            userAnswer.classList.add("correct");

            myQuiz.score++

            
            
           
            
       
        }else{
            userAnswer.classList.add("wrong");
        }
       
        this.index++;

        this.answered = true;

        this.animateQuestion(userAnswer)
        

        setTimeout(() => {
            this.nextQuestion();
          }, 1000)

    }


    animateQuestion(element) {
        element.closest(".question").classList.remove("animate__bounceIn");
        element.closest(".question").classList.add("animate__backOutLeft");
      }

    nextQuestion() {
        if (this.index < this.questionLength) {
          let newQuestion = new question(this.index);
          newQuestion.display();
        } else {
          questionsContainer.innerHTML = `
            
            
            <div id="tryAgainContainer" class="text-center text-white animate__animated animate__backInDown">
                  <h1>Your Score is <span> ${myQuiz.score} </span></h1>
                  <button id="tryBtn" class="btn btn-danger">Try Again</button>
              </div>
            `;
    
            let tryBtn = document.getElementById('tryBtn');
    
            tryBtn.addEventListener('click' , ()=>{
                window.location.reload();
            } )
    
        }
      }
}


// close game
btnCheckClose.addEventListener('click' , function(){
  closeCard.classList.remove('d-none')
})

btnClose.addEventListener('click' , function(){
  window.location.reload();
})

btnCancel.addEventListener('click' , function(){
  closeCard.classList.add('d-none')

})









