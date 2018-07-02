$('.ui .item').on('click', function() {
    $('.ui .item').removeClass('active');
    $(this).addClass('active');
});

var images = ["https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/1.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/2.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/3.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/4.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/5.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/6.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552630/7.jpg",
                            "https://res.cloudinary.com/campgrounds2018/image/upload/v1530552631/8.jpg"];
function previousImage(){
    var indexPosition = images.indexOf(document.getElementById("IndexImage").src);
    if (indexPosition > 0) {
        document.getElementById("IndexImage").src = images[indexPosition - 1];
    }
}
function nextImage(){
    var indexPosition = images.indexOf(document.getElementById("IndexImage").src);
    if (indexPosition < 7) {
        document.getElementById("IndexImage").src = images[indexPosition + 1];
    }
}