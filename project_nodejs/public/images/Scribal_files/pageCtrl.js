app.controller("PageController", function($scope, $http, $routeParams, $rootScope){
	
	
	/**********Note Widget functionality START**************/
	
	$scope.createNote = function(){
		$http.post("/new", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			type : "note"
		}).success(function(response){
			$rootScope.notes = response;
		});
		
	}
	
	$scope.saveNote = function(index){
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			notes : $rootScope.notes,
			type : "note"
		}).success(function(){
			//$rootScope.notes = notes;
		});
		
	} 
	
	$scope.delNote = function(index){
		
		$rootScope.notes.splice(index, 1);
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			notes : $rootScope.notes,
			type : "note"
		}).success(function(){
			//$rootScope.notes = notes;
		});
	} 
	
	
	/**********Note Widget functionality END**************/
	
	
	/**********Bookmarks Widget functionality END**************/
	
	
	$scope.createBookmark = function(){
		$http.post("/new", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			type : "bookmark"
		}).success(function(response){
			$rootScope.bookmarks = response;
		});
	}
		
	$scope.saveBookmark = function(index){
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			bookmarks : $rootScope.bookmarks,
			type : "bookmark"
		}).success(function(){
			//$rootScope.bookmarks = bookmarks;
		});
	} 
	
	$scope.delBookmark = function(index){
		
		$rootScope.bookmarks.splice(index, 1);
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			bookmarks : $rootScope.bookmarks,
			type : "bookmark"
		}).success(function(){
			//$rootScope.bookmarks = bookmarks;
		});
	} 
	
	/********** Bookmarks Widget functionality END**************/
	
	
	/**********Media Widget functionality END**************/
	
//	$scope.medias = [];
	
	$scope.createMedia = function(){
		
		$http.post("/new", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			type : "media"
		}).success(function(response){
			$rootScope.medias = response;
		});
	}
	
	
	
	$scope.saveMedia = function(index){
		
		var media = $rootScope.medias[index];
		if(media.url.indexOf("=") > -1){
			var src = media.url.split("=")[1];
			$rootScope.medias[index].url = src;
		}
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			medias : $rootScope.medias,
			type : "media"
		}).success(function(){
			
			angular.element('#mediaedit'+index).hide("slow");
			angular.element('#mediashow'+index).show("slow");
			angular.element('#mediashow'+index).find('iframe').attr("src", "https://www.youtube.com/embed/"+src);
			angular.element("#mediabutton"+index).hide();
		});
		
		
		
		
		
		// TODO: Add save functionality
	} 
	
	$scope.delMedia = function(index){
		
		$rootScope.medias.splice(index, 1);
		$http.put("/save", {
			userid: $rootScope.currentUser.userid,
			pageid: $rootScope.currentPageId,
			medias : $rootScope.medias,
			type : "media"
		});
		// TODO: Add delete functionality
	} 
	
	$scope.getUrl = function (id) {
	    return 'https://www.youtube.com/embed/'+id+'?rel=0'
	  }
	
	
	/**********Media Widget functionality END**************/
	
	/**********Image Widget functionality START**************/
	
//	$scope.images = [];
	
	$scope.createImage = function(){
			image = {
					title: "Image Title",
					url : "Paste image url here"
						
			}
		
			$rootScope.images.push(image);
	}
	
	
	
	$scope.saveImage = function(index){
		
		angular.element("#imagebutton"+index).hide();
//		var image = $scope.medias[index];
//		var src = media.url.split("=")[1];
		
//		angular.element('#mediaedit'+index).hide("slow");
//		angular.element('#mediashow'+index).show("slow");
//		angular.element('#mediashow'+index).find('iframe').attr("src", "https://www.youtube.com/embed/"+src);
		// TODO: Add save functionality
	} 
	
	$scope.delImage = function(index){
		
		$rootScope.images.splice(index, 1);
		// TODO: Add delete functionality
	} 
	
	$scope.stepsModel = [];

    $scope.imageUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    }
	
	
	/**********Image Widget functionality END**************/
});
app.config(function($sceDelegateProvider) {
	   $sceDelegateProvider.resourceUrlWhitelist([
	                                              'self',
	                                              '*://www.youtube.com/**'
	                                            ]);
});
//function showMyImage(fileInput){
//    var files = fileInput.files;
//    for (var i = 0; i < files.length; i++) {
//        var file = files[i];
//        var imageType = /image.*/;
//        if (!file.type.match(imageType)) {
//            continue;
//        }
//        var img = document.getElementById('#thumbnail");
//        img.file = file;
//        var reader = new FileReader();
//        reader.onload = (function (aImg) {
//            return function (e) {
//                aImg.src = e.target.result;
//            };
//        })(img);
//        reader.readAsDataURL(file);
//    }
//}
