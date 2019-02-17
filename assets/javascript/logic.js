question_index = 0;
timer = 30;
the_timer = true;
var my_timer;
var wait_for_new_question;

questions = [
	{
		question: "What is the name of Angelica's doll?",
		answers: ["Tina", "Barbie", "Cynthia", "Willis"],
		correct_answer: "Cynthia"
	},
	{
		question: "What is Dill's last name",
		answers: ["King", "Benjamin", "Pickles", "Achmed"],
		correct_answer: "Pickles"
	}
]

function right_answer(){
	the_timer = false;
	$("#question").empty();
	$("#answers").empty();
	wait_for_new_question = setTimeout(new_question, 5000);
}

function wrong_answer(){
	the_timer = false;
	$("#question").empty();
	$("#answers").empty();
	wait_for_new_question = setTimeout(new_question, 5000);
}

function validate_answer(){
	selected_answer = $("[data-answer='selected']").text();
	the_correct_answer = questions[question_index].correct_answer;

	if(selected_answer === the_correct_answer){
		right_answer();
	}
	else{
		wrong_answer();
	}
}

function start_timer(){
	clearInterval(my_timer);
	the_timer = true;
	timer = 30;
	my_timer = setInterval(new_timer, 1000);
}

function new_timer(){
	if (the_timer === true){
		timer--;
		timer_text = "Time remaining: " + timer + " Seconds";
		$(".timer").text(timer_text);
	}
}

function new_question(){
	start_timer();

	//This creates a new div with the text value of the current question
	//it will then append it to the page to the #question ID
	this_question = $("<div>");
	this_question.text(questions[question_index].question);
	this_question.addClass("question");
	$("#question").append(this_question);

	//This will iterate through the answers array of the current question,
	//place all the answers into divs and append them to the #answers ID
	these_answers = questions[question_index].answers;
	for (i = 0; i < these_answers.length; i++){
		this_answer = $("<div>");
		this_answer.text(these_answers[i]);
		this_answer.addClass("answer");
		this_answer.attr("data-answer", "unselected");
		$("#answers").append(this_answer);
	}

	//This is if the user selects an answer
	$(".answer").on("click", function(){
		//This will remove selected from any answers that are already selected
		$("[data-answer='selected']").attr("data-answer", "unselected");
		//This will change the data-answer attribute of the clicked answer to "selected"
		$(this).attr("data-answer", "selected");
	});
}

function submit(){
	validate_answer();
	question_index++;
}

start_timer();

new_question();