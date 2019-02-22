question_index = 0;
timer = 30;
the_timer = true;
var my_timer;
var wait_for_new_question;
var correct_answers = 0;
var incorrect_answers = 0;

var structure = {

    questions: [
        {
            question: "What is the name of Angelica's doll?",
            answers: ["Tina", "Barbie", "Cynthia", "Willis"],
            correct_answer: "Cynthia"
        },
        {
            question: "What is Dill's last name",
            answers: ["King", "Benjamin", "Pickles", "Achmed"],
            correct_answer: "Pickles"
        },
        {
            question: "In the Christmas special, where was the coal in the Cynthia playhouse?",
            answers: ["The attached garage", "The jaccuzi", "The kitchen", "The patio"],
            correct_answer: "The attached garage"
        }
    ],

    new_question: function(){
        structure.start_timer();

        //This will empty out the results from the previous question
        $("#results").empty();

        //This will show the submit button
        $(".submit_button").show();

        //This creates a new div with the text value of the current question
        //it will then append it to the page to the #question ID
        this_question = $("<div>");
        this_question.text(structure.questions[question_index].question);
        this_question.addClass("question");
        $("#question").append(this_question);

        //This will iterate through the answers array of the current question,
        //place all the answers into divs and append them to the #answers ID
        these_answers = structure.questions[question_index].answers;
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

    },

    start_timer: function(){
        clearInterval(my_timer);
        the_timer = true;
        timer = 30;
        my_timer = setInterval(structure.new_timer, 1000);
    },

    new_timer: function(){
        if (the_timer === true){
            timer--;
            timer_text = "Time remaining: " + timer + " Seconds";
            $(".timer").text(timer_text);
            if (timer === 0){
                structure.out_of_time();
            }
        }
    },

    submit: function(){
        structure.validate_answer();
        question_index++;
    },

    validate_answer: function(){
        selected_answer = $("[data-answer='selected']").text();
        the_correct_answer = structure.questions[question_index].correct_answer;

        if(selected_answer === the_correct_answer){
            structure.right_answer();
        }
        else{
            structure.wrong_answer();
        }
    },

    right_answer: function(){
        correct_answers++;
        console.log("Correct answers: " + correct_answers);
        the_timer = false;
        $("#question").empty();
        $("#answers").empty();

        $(".submit_button").hide();

        result_div = $("<div>");
        correct_answer = $("<div>").text("You are correct!");
        correct_gif = $("<img>");
        correct_gif.attr("src", "assets/images/you_win.gif");

        result_div.append(correct_answer);
        $("#results").append(result_div, correct_gif);
        

        wait_for_new_question = setTimeout(structure.new_question, 5000);
    },

    wrong_answer: function(){
        incorrect_answers++;
        console.log("Incorrect answers: " + incorrect_answers);
        the_timer = false;
        $("#question").empty();
        $("#answers").empty();

        $(".submit_button").hide();

        //This should display a div that says: "Wrong answer, the correct answer was _____ , and a gif"
        this_result = $("<div>");
        wrong_answer = $("<div>").text("Wrong answer");
        the_correct_answer = $("<div>").text("The correct answer: " + the_correct_answer);
        wrong_answer_gif = $("<img>").attr("src", "assets/images/you_lose.gif");
        this_result.append(wrong_answer, the_correct_answer, wrong_answer_gif);
        $("#results").append(this_result);

        wait_for_new_question = setTimeout(structure.new_question, 5000);
    },

    out_of_time: function(){
        the_timer = false;
        $("#question").empty();
        $("#answers").empty();
        $(".submit_button").hide();
        //This will create a banner that says the time is up
        time_up_result = $("<div>").text("Time is up");

        //This will create a div telling the user what the correct answer was
        the_correct_answer = structure.questions[question_index].correct_answer;
        correct_result = $("<div>").text("The correct answer: " + the_correct_answer);
        correct_result.addClass("result");

        //This will create a gif
        out_of_time_gif = $("<img>");
        out_of_time_gif.attr("src", "assets/images/you_lose.gif");

        //This will append the results to the $("#results") div
        $("#results").append(time_up_result, correct_result, out_of_time_gif);

        //This will add 1 to the question index
        question_index++;

        //This will wait 5 seconds before displaying the new question
        wait_for_new_question = setTimeout(structure.new_question, 5000);
    }
}

structure.start_timer();
structure.new_question();