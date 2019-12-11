// Cat ID buttons: 
// 1. activates slide toggle with more options and change in button fill color
$('#catupdate').on('click',function(){
    $(".cat-form").slideToggle("slow");
    $('#catupdate').toggleClass("btnPrimaryToggle");
});

$('#catdelete').on('click',function(){
    $(".confirmation").slideToggle("slow");
    $('#catdelete').toggleClass("btnRemoveToggle");
});

$('#catcomments').on('click',function(){
    $(".commentlist").slideToggle("slow");
    $('#catcomments').toggleClass("btnPrimaryToggle");
});

$('#catdelno').on('click',function(){
    $(".confirmation").slideToggle("slow");
    $('#catdelete').toggleClass("btnRemoveToggle");
});

$("div.commentlist").on('click','a#comupdate', function(){
    $(this).parents().closest('.icomment').children(".icomment_edit").slideToggle("slow");
});

// 2. Add submit handler to comment forms
// Source: https://api.jquery.com/jQuery.post/
// A. Add a comment
$("form#addcomment").submit(function(event){
    // Stop form from submitting directly
    event.preventDefault();

    // Get some form values, save them in new comments collection
    var $form = $(this),
        name = $form.find("input[name='comments[name]']").val(),
        message = $form.find("input[name='comments[message]']").val(),
        url = $form.attr("action");
    var comments = {
        name: name,
        message: message
    };

    // BACKEND Send the data using jQuery.post function
    // As of jQuery 1.5, all of jQuery's Ajax methods return a superset of the XMLHTTPRequest object. Apply methods .done .fail and .always on it.
    var posting = $.post( url, {comments} );

    posting.fail(function() {
        alert("error");
    });

    posting.done(function() {
        console.log("new comment saved in database, now bring it up here!");
        window.location.reload();
    });
});

// B. Update any of the comments
/*
$("div.commentlist").on('click','button#button-comedit', function(event){
    // Stop form from submitting directly
    event.preventDefault();

    // Get form url value
    var url = $(this).parent().attr("action");
    
    // FRONTEND Update element visually
    //$(this).parents().closest('.icomment').fadeOut(500,function(){
    //    $(this).remove;
    //}); 

    // BACKEND Update element using jquery POST-->PUT method
    var posting = $.post( url );
    posting.done(function() {        
        $(".commentlist").slideDown("slow");
        $('#catcomments').addClass("btnPrimaryToggle");
    });
});
*/

// C. Delete any of the comments
$("div.commentlist").on('click','button#trash', function(event){
    // Stop form from submitting directly
    event.preventDefault();

    // Get form url value
    var url = $(this).parent().attr("action");
    
    // FRONTEND Remove element visually
    $(this).parents().closest('.icomment').fadeOut(500,function(){
        $(this).remove;
    }); 

    // BACKEND Remove element using jquery POST-->DELETE method
    var posting = $.post( url );
    posting.done(function() {        
        $(".commentlist").slideDown("slow");
        $('#catcomments').addClass("btnPrimaryToggle");
    });
});