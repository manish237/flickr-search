angular.module('myApp',['ngMessages'])

    .constant('VERSION',1.1)
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })
    .controller('MyCtrl',function ($http) {
        var ctrl = this;

        ctrl.result  = false;
        ctrl.noresult  = false;
        ctrl.inprogress  = false;
        ctrl.error  = false;

        console.log(ctrl)

        ctrl.submit = function(form){
            console.log(form.$valid)
            if(form.$valid==true)
            {
                console.log(ctrl)
                ctrl.inprogress  = true;
                ctrl.searchTagSaved = ctrl.searchTag;

                var url = "https://api.flickr.com/services/rest";

                var request = {
                    method: 'flickr.photos.search',
                    api_key: "1317d97f11ca32a0b65919f8ade4a0be",
                    tags: ctrl.searchTag,
                    format: 'json',
                    nojsoncallback: 1
                }
                $http({
                    method: 'GET',
                    url: url,
                    params: request
                })
                .then(
                    function(response) {
                        ctrl.inprogress  = false;
                        ctrl.result  = true;
                        ctrl.resultCnt = response.data.photos.total;
                        if(response.data.photos.total===0) {
                            ctrl.noresult = true;
                            ctrl.result  = false;
                        }
                        ctrl.photos = response.data.photos.photo;
                        console.log("success")
                        console.log(ctrl.resultCnt)
                        ctrl.searchTag=null;


                    },
                    function(response) {
                        // alert('error');
                        console.log("fail")

                        ctrl.error  = true;
                        ctrl.result  = false;
                        ctrl.noresult  = false;
                        ctrl.inprogress  = false;
                    }
                )
                .finally(function(){
                    ctrl.inprogress  = false;
                    form.$submitted = false;
                });
            }


            // console.log(inputForm.$valid);
            // console.log($scope.valid)
        }
    });
