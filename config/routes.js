/*
 * Copyright (c) 2017-2018
 *
 * by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com) & DAW students
 *
 * ADISAN: Free Open Source Health Management System
 *
 *
 * Sources at:                https://github.com/rafaelaznar/adisan
 *                            
 * Database at:               https://github.com/rafaelaznar/adisan-database
 *
 * ADISAN is distributed under the MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


adisan.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'shared/home.html', controller: 'HomeController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/login', { templateUrl: 'shared/login.html', controller: 'LoginController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/profile', { templateUrl: 'shared/profile.html', controller: 'ProfileController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/logout', { templateUrl: 'shared/logout.html', controller: 'LogoutController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/home', { templateUrl: 'shared/home.html', controller: 'HomeController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    //$routeProvider.when('/license', {templateUrl: 'shared/license.html', controller: 'LicenseController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); }, meta: function (serverCallService) { return serverCallService.getMetaPromise().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/passchange', { templateUrl: 'shared/passchange.html', controller: 'PasschangeController', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/newalumno/9/:codigo', { templateUrl: 'shared/newalumno.html', controller: 'UsuarioNewalumno9Controller', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    //-- generic 1
    //--
    $routeProvider.when('/:ob/1/plist/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistGenericController1', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/view/:id', { templateUrl: 'generic/template/view.html', controller: 'viewGenericController1', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/new/:id?', { templateUrl: 'generic/template/newedit.html', controller: 'newGenericController1', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/edit/:id', { templateUrl: 'generic/template/newedit.html', controller: 'editGenericController1', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/remove/:id', { templateUrl: 'generic/template/remove.html', controller: 'removeGenericController1', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/statistics/:id', { templateUrl: 'generic/template/statistics.html', controller: 'statisticsGenericController1', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/:ob/1/:xob/plist/:id/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistXGeneric1Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/:xob/new/:id', { templateUrl: 'generic/template/newedit.html', controller: 'newXGeneric1Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/1/:xob/edit/:id/:xid', { templateUrl: 'generic/template/newedit.html', controller: 'editXGeneric1Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    //-- generic 3
    //--
    $routeProvider.when('/:ob/3/plist/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistGenericController3', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/view/:id', { templateUrl: 'generic/template/view.html', controller: 'viewGenericController3', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/new/:id?', { templateUrl: 'generic/template/newedit.html', controller: 'newGenericController3', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/edit/:id', { templateUrl: 'generic/template/newedit.html', controller: 'editGenericController3', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/remove/:id', { templateUrl: 'generic/template/remove.html', controller: 'removeGenericController3', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/statistics/:id', { templateUrl: 'generic/template/statistics.html', controller: 'statisticsGenericController3', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/:ob/3/:xob/plist/:id/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistXGeneric3Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/:xob/new/:id', { templateUrl: 'generic/template/newedit.html', controller: 'newXGeneric3Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/3/:xob/edit/:id/:xid', { templateUrl: 'generic/template/newedit.html', controller: 'editXGeneric3Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    //-- generic 4
    //--
    $routeProvider.when('/:ob/4/plist/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistGenericController4', resolve: { auth: function (sessionServerCallService) { return sessionServerCallService.checkSession().then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/view/:id', { templateUrl: 'generic/template/view.html', controller: 'viewGenericController4', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/new/:id?', { templateUrl: 'generic/template/newedit.html', controller: 'newGenericController4', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/edit/:id', { templateUrl: 'generic/template/newedit.html', controller: 'editGenericController4', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/remove/:id', { templateUrl: 'generic/template/remove.html', controller: 'removeGenericController4', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/statistics/:id', { templateUrl: 'generic/template/statistics.html', controller: 'statisticsGenericController4', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/:ob/4/:xob/plist/:id/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistXGeneric4Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/:xob/new/:id', { templateUrl: 'generic/template/newedit.html', controller: 'newXGeneric4Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/4/:xob/edit/:id/:xid', { templateUrl: 'generic/template/newedit.html', controller: 'editXGeneric4Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    //-- generic 5
    //--
    $routeProvider.when('/:ob/5/plist/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/view/:id', { templateUrl: 'generic/template/view.html', controller: 'viewGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/new/:id?', { templateUrl: 'generic/template/newedit.html', controller: 'newGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/edit/:id', { templateUrl: 'generic/template/newedit.html', controller: 'editGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/remove/:id', { templateUrl: 'generic/template/remove.html', controller: 'removeGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/statistics/:id', { templateUrl: 'generic/template/statistics.html', controller: 'statisticsGenericController5', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.when('/:ob/5/:xob/plist/:id/:page?/:rpp?', { templateUrl: 'generic/template/plist.html', controller: 'plistXGeneric5Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/:xob/new/:id', { templateUrl: 'generic/template/newedit.html', controller: 'newXGeneric5Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    $routeProvider.when('/:ob/5/:xob/edit/:id/:xid', { templateUrl: 'generic/template/newedit.html', controller: 'editXGeneric5Controller', resolve: { auth: function (sessionServerCallService, $route) { return sessionServerCallService.checkSession($route.current.params).then(function (response) { return response; }, function (error) { return error; }); } } });
    //--
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
