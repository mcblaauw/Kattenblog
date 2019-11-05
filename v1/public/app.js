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

