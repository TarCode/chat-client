$(document).ready(function() {
    //feed to parse

    $.ajax('http://localhost:3000/users', {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {
            //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript

            console.log('xml data', data);


        }
    });

});
