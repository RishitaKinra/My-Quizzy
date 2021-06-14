class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      this.question = new Question()
      this.question.display();
    }
  }

  play(){
    this.question.hide();
    background("blue");
    textSize(20);
    textFont("Comic Sans MS");
    fill(174, 255, 0)
    text("Result of the Quiz",340,50);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var display_answers = 230;
      fill("white")
      textSize(18);
      text("Contestants who answered the question correctly are highlighted in green.",130,230);

      for(var plr in allContestants){
        var correct_answer = "3";
        
        if(correct_answer === allContestants[plr].answer){
          fill("green");
        }else{
          fill("red");
        }

        display_answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250, display_answers);
      }
    }
  }

}
