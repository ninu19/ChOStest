'use strict';

angular.module('myApp').directive("dragWidth", function () {
    return {
        // restrict: "A",
        link: function (scope, element) {
            scope.getWidth = function () {
                return $(element).width();
            };
            scope.$watch(scope.getWidth, function (width) {
                $(element).width(width);
            });
        }
    }
})
.directive('readText', function ($rootScope,$interval) {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                $rootScope.isPause = false;
                var sBrowser, sUsrAg = navigator.userAgent;
                $(elem).find(".start").click(function () {
                    $rootScope.isPause = false;
                    var rateInput = document.getElementById('rate');
                        $(".pause").hide();
                        $(".resume").hide();
                        $(".start").show();
                        $(".stop").hide();
                    responsiveVoice.cancel();
                    $(this).hide();
                    $(elem).find(".pause").show();
                    $(elem).find(".stop").show();
                    responsiveVoice.speak(" ");
                    setTimeout(function() {
                    var symbols = [
                        {code:"<[^>]*>",replace:''},
                        {code:"[{()}]",replace:""},
                    ];
                    var text = attr["readText"];

                    symbols.forEach(function(el) {
                        text = text.replace(new RegExp(el.code, 'g'), el.replace);
                    });
                    text = $("<div></div>").html(text).text();
                    if (sUsrAg.indexOf("CrOS") > -1) {
                        responsiveVoice.speak(text, "Chrome OS US English", {
                            rate: rateInput.value,
                            onend: function () {
                                $(".pause").hide();
                                $(".resume").hide();
                                $(".start").show();
                                $(".stop").hide();
                            }
                        });
                    } else {
                        responsiveVoice.speak(text, "US English Female", {
                            rate: rateInput.value,
                            onend: function () {
                                $(".pause").hide();
                                $(".resume").hide();
                                $(".start").show();
                                $(".stop").hide();
                            }
                        });
                    }
                    }, 130);
                    });

                $(elem).find(".stop").click(function () {
                    $rootScope.isPause = false;
                    responsiveVoice.cancel();
                    $(this).hide();
                    $(elem).find(".pause").hide();
                    $(elem).find(".resume").hide();
                    $(elem).find(".start").show();
                    $(elem).find(".rate").hide();
                }).hide();
                $(elem).find(".pause").click(function () {
                    $rootScope.isPause = true;
                    responsiveVoice.pause();
                        $(elem).find(".pause").hide();
                        $(this).hide();
                        $(elem).find(".resume").show();
                        
                            var interval = $interval(function(){
                                if($rootScope.isPause == true){
                                responsiveVoice.pause();
                                clearInterval(interval)
                                }
                            }, 5000);                      
                }).hide();
                
                $(elem).find(".resume").click(function () {
                    $rootScope.isPause = false;
                    $(this).hide();
                    $(elem).find(".pause").show();
                    responsiveVoice.resume();
                }).hide();

                
            },
        };
    })
