// Get a reference to the database service
// var database = firebase.database();

var database = firebase.database();

function uploadNewPhoto(imageUrl, album) {
    var refAlbum = database.ref(album);
    refAlbum.push(imageUrl).then(function onSuccess(res) {
        console.log(res)
    }).catch(function onError(err) {
        console.log(err)
    });
}

function loadPhotos(album) {

    var target = document.getElementById('test');
    var leadsRef = database.ref('gallery/' + album);
    leadsRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var  str = '<img style="height: 50%; width: 50%;" src="' + childData + '" data-full="' + childData + '" class="m-p-g__thumbs-img" />';
            var temp = document.createElement('div');
            temp.innerHTML = str;
            while (temp.firstChild) {
                target.appendChild(temp.firstChild);

            }
        });
    });
}

$(document).ready(function () {

    loadPhotos('Start_2017');
});
