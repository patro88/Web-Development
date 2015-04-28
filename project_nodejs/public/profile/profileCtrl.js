app.controller("ProfileController", function($scope, $http, $rootScope, $location, dataService, $routeParams){

	$scope.profileid = null;
	if($rootScope.currentUser){
		$http.get("/pages/"+ $rootScope.currentUser.userid)
		.success(function(data){
				$rootScope.pages = data;
		});
		
		$scope.profileid = $rootScope.currentUser.userid;
	}else{
		$scope.profileid = $routeParams.id;
	}
	
	
	
	$http.get("/userasked/"+ $scope.profileid)
	.success(function(data){
			$scope.asked = data;
	});
	
	$http.get("/useranswered/"+ $scope.profileid)
	.success(function(data){
			$scope.answered = data;
	});
	
	$http.get("/userliked/"+ $scope.profileid)
	.success(function(data){
			$scope.liked = data;
	});
	
	
	
	$scope.pageClicked = function (page) {
		$rootScope.notes= page.notes;
		$rootScope.bookmarks= page.bookmarks;
		$rootScope.medias= page.medias;
		$rootScope.images= page.images;
		$rootScope.currentPageId = page._id;
		$location.path("/page");
    }

	
	$scope.createPage = function (title) {
		$http.post("/pages", {
			userid: $rootScope.currentUser.userid,
			title: title
		})
		.success(function(response){
			$rootScope.pages = response;
		})
    }
	
	$scope.pageDelete = function (page) {
		$http.delete("/pages/"+page._id+"/"+$rootScope.currentUser.userid)
		.success(function(response){
			$http.get("/pages/"+ $rootScope.currentUser.userid)
			.success(function(data){
					$rootScope.pages = data;
			})
		})
    }
	
	
	$scope.questionDetails = function(id) {
		dataService.setValue("qid", id);
		$location.path("/qa");
	}
	
	$scope.tagClickQ = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
//		$route.reload();
	};
	
});

//$scope.notes = [];

//$scope.createNote = function(){
//note = {
//title:"Notes",
//text : "This is a note"

//}


//$scope.notes.push(note);

//}


//$scope.editNote = function(index){
//$scope.displayEdit[index] = false;
//angular.element("#notetext"+index).attr("contentEditable", "");
//angular.element("#notetitle"+index).removeAttr("readonly");
////angular.element("#notetext"+index).css("background", "lightyellow");

//// TODO: Add update functionality
//} 

//$scope.saveNote = function(index){
//$scope.displayEdit[index] = true;
//angular.element("#notetext"+index).attr("contentEditable", false);
//angular.element("#notetitle"+index).attr("readonly", "");
////angular.element("#notetext"+index).css("background", "#BEBEBE");
//// TODO: Add save functionality
//} 

//$scope.delNote = function(index){
//$scope.notes.splice(index, 1);
//// TODO: Add delete functionality
//} 


///**********Note Widget functionality END**************/


///**********Bookmarks Widget functionality END**************/

//$scope.bookmarks = [];
//$scope.displayBookmark= [];

//$scope.createBookmark = function(){
//bookmark = {
//title:"Bookmark",
//url : "Please provide an url"

//}
//$scope.bookmarks.push(bookmark);
//}


//$scope.editBookmark = function(index){
//$scope.displayBookmark[index] = false;
//angular.element("#bookmarkurl"+index).show("fast");
//// TODO: Add update functionality
//} 

//$scope.saveBookmark = function(index){
//$scope.displayBookmark[index] = true;
//angular.element("#bookmarkurl"+index).hide("fast");
//// TODO: Add save functionality
//} 

//$scope.delBookmark = function(index){

//$scope.bookmarks.splice(index, 1);
//// TODO: Add delete functionality
//} 

///********** Bookmarks Widget functionality END**************/


///**********Media Widget functionality END**************/

//$scope.medias = [];

//$scope.createMedia = function(){
//media = {
//title: "Media Title",
//url : "Paste media url here"

//}

//$scope.medias.push(media);
//}



//$scope.saveMedia = function(index,$event){

//var media = $scope.medias[index];
//var src = media.url.split("=")[1];

//angular.element('#mediaedit'+index).hide("slow");
//angular.element('#mediashow'+index).show("slow");
//angular.element('#mediashow'+index).find('iframe').attr("src", "https://www.youtube.com/embed/"+src);
//angular.element("#mediabutton"+index).hide();

//// TODO: Add save functionality
//} 

//$scope.delMedia = function(index){

//$scope.medias.splice(index, 1);
//// TODO: Add delete functionality
//} 




///**********Media Widget functionality END**************/

///**********Image Widget functionality START**************/

//$scope.images = [];

//$scope.createImage = function(){
//image = {
//title: "Image Title",
//url : "Paste image url here"

//}

//$scope.images.push(image);
//}



//$scope.saveImage = function(index){

//angular.element("#imagebutton"+index).hide();
////var image = $scope.medias[index];
////var src = media.url.split("=")[1];

////angular.element('#mediaedit'+index).hide("slow");
////angular.element('#mediashow'+index).show("slow");
////angular.element('#mediashow'+index).find('iframe').attr("src", "https://www.youtube.com/embed/"+src);
//// TODO: Add save functionality
//} 

//$scope.delImage = function(index){

//$scope.images.splice(index, 1);
//// TODO: Add delete functionality
//} 

//$scope.stepsModel = [];

//$scope.imageUpload = function(element){
//var reader = new FileReader();
//reader.onload = $scope.imageIsLoaded;
//reader.readAsDataURL(element.files[0]);
//}

//$scope.imageIsLoaded = function(e){
//$scope.$apply(function() {
//$scope.stepsModel.push(e.target.result);
//});
//}


///**********Image Widget functionality END**************/
//});

//app.config(function($sceDelegateProvider) {
//$sceDelegateProvider.resourceUrlWhitelist([
//'self',
//'https://www.youtube.com/**'
//]);
//});

////function showMyImage(fileInput){
////var files = fileInput.files;
////for (var i = 0; i < files.length; i++) {
////var file = files[i];
////var imageType = /image.*/;
////if (!file.type.match(imageType)) {
////continue;
////}
////var img = document.getElementById('#thumbnail");
////img.file = file;
////var reader = new FileReader();
////reader.onload = (function (aImg) {
////return function (e) {
////aImg.src = e.target.result;
////};
////})(img);
////reader.readAsDataURL(file);
////}
////}
