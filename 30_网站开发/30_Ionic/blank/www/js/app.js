// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','chart.js', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.controller("ddata", function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
});

var gauges = [];

function createGauge(name, label, min, max)
{
  var config =
  {
    size: 120,
    label: label,
    min: undefined != min ? min : 0,
    max: undefined != max ? max : 100,
    minorTicks: 5
  }

  var range = config.max - config.min;
  config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
  config.redZones = [{ from: config.min + range*0.9, to: config.max }];

  gauges[name] = new Gauge(name + "GaugeContainer", config);
  gauges[name].render();
}

function createGauges()
{
  createGauge("memory", "Memory");
  createGauge("cpu", "CPU");
  createGauge("network", "Network");
}

function updateGauges()
{
  for (var key in gauges)
  {
    var value = getRandomValue(gauges[key])
    gauges[key].redraw(value);
  }
}

function getRandomValue(gauge)
{
  var overflow = 0; //10;
  return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow*2) *  Math.random();
}

function initialize()
{
  createGauges();
  setInterval(updateGauges, 5000);
}
