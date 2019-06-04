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
var anyAuthenticationPromise = function (sessionService) {
    return sessionService.anyAuthenticationPromise();
};
var authentication1Promise = function (sessionService) { //administrador
    return sessionService.authenticationPromise(1);
};
var authentication2Promise = function (sessionService) {
    return sessionService.authenticationPromise(2);
};
var authentication3Promise = function (sessionService) { //profesor
    return sessionService.authenticationPromise(3);
};
var authentication4Promise = function (sessionService) { //alumno
    return sessionService.authenticationPromise(4);
};
var authentication5Promise = function (sessionService) { //visitante
    return sessionService.authenticationPromise(5);
};
adisan.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/system/shared/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        //--
        $routeProvider.when('/login', {templateUrl: 'js/system/shared/login.html', controller: 'LoginController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/profile', {templateUrl: 'js/system/shared/profile.html', controller: 'ProfileController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/logout', {templateUrl: 'js/system/shared/logout.html', controller: 'LogoutController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/home', {templateUrl: 'js/system/shared/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        //$routeProvider.when('/license', {templateUrl: 'js/system/shared/license.html', controller: 'LicenseController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/passchange', {templateUrl: 'js/system/shared/passchange.html', controller: 'PasschangeController', resolve: {auth: anyAuthenticationPromise}});
        //----------------------------------------------------------------------
        //   SPECIFIC ROUTES
        //----------------------------------------------------------------------
        //
        //-- 1 PROFILE ---------------------------------------------------------
        //--
        //-- usuario
        //--
        $routeProvider.when('/usuario/1/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioPList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/usuario/1/tipousuario/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXtipousuarioPList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/usuario/1/grupo/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXgrupoPList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/usuario/1/centro/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXcentroPList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/usuario/1/centrosanitario/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXcentrosanitarioPList1Controller', resolve: {auth: authentication1Promise}});
        //--
        //-- paciente
        //--
        $routeProvider.when('/paciente/1/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'PacientePList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/paciente/1/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteNew1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/paciente/1/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteEdit1Controller', resolve: {auth: authentication1Promise}});
        //--
        //-- episodio
        //--
        $routeProvider.when('/episodio/1/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioNew1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/episodio/1/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioEdit1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/episodio/1/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobNew1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/episodio/1/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobEdit1Controller', resolve: {auth: authentication1Promise}});
        //--
        //-- subepisodio
        //--
        $routeProvider.when('/subepisodio/1/episodio/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'SubepisodioXepisodioPList1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/subepisodio/1/episodio/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioNew1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/subepisodio/1/episodio/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioEdit1Controller', resolve: {auth: authentication1Promise}});



        //-- 3 PROFILE ---------------------------------------------------------
        //--
        //-- usuario
        //--
        $routeProvider.when('/usuario/3/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioPList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/usuario/3/tipousuario/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXtipousuarioPList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/usuario/3/grupo/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXgrupoPList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/usuario/3/centro/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXcentroPList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/usuario/3/centrosanitario/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'UsuarioXcentrosanitarioPList3Controller', resolve: {auth: authentication3Promise}});
        //--
        //-- paciente
        //--
        $routeProvider.when('/paciente/3/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'PacientePList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/paciente/3/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteNew3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/paciente/3/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteEdit3Controller', resolve: {auth: authentication3Promise}});
        //--
        //-- episodio
        //--
        $routeProvider.when('/episodio/3/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioNew3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/episodio/3/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioEdit3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/episodio/3/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobNew3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/episodio/3/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobEdit3Controller', resolve: {auth: authentication3Promise}});
        //--
        //-- subepisodio
        //--
        $routeProvider.when('/subepisodio/3/episodio/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'SubepisodioXepisodioPList3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/subepisodio/3/episodio/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioNew3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/subepisodio/3/episodio/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioEdit3Controller', resolve: {auth: authentication3Promise}});

        //-- 4 PROFILE ---------------------------------------------------------
        //--
        //-- paciente
        //--
        $routeProvider.when('/paciente/4/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteNew4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/paciente/4/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'PacienteEdit4Controller', resolve: {auth: authentication4Promise}});
        //--
        //-- episodio
        //--
        $routeProvider.when('/episodio/4/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioNew4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/episodio/4/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioEdit4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/episodio/4/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobNew4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/episodio/4/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'EpisodioXxobEdit4Controller', resolve: {auth: authentication4Promise}});
        //-- subepisodio
        $routeProvider.when('/subepisodio/4/episodio/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'SubepisodioXepisodioPList4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/subepisodio/4/episodio/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioNew4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/subepisodio/4/episodio/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'SubepisodioXepisodioEdit4Controller', resolve: {auth: authentication4Promise}});
        //-- 5 PROFILE ---------------------------------------------------------
        //-- subepisodio
        //--
        $routeProvider.when('/subepisodio/5/episodio/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'SubepisodioXepisodioPList5Controller', resolve: {auth: authentication5Promise}});
        //--
        $routeProvider.when('/newalumno/9/:codigo', {templateUrl: 'js/app/usuario/9/newalumno.html', controller: 'UsuarioNewalumno9Controller', resolve: {auth: anyAuthenticationPromise}});
        //--
        //-- generic 1
        //--
        $routeProvider.when('/:ob/1/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistGenericController1', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/view/:id', {templateUrl: 'js/system/generic/template/view.html', controller: 'viewGenericController1', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newGenericController1', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editGenericController1', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/remove/:id', {templateUrl: 'js/system/generic/template/remove.html', controller: 'removeGenericController1', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/statistics/:id', {templateUrl: 'js/system/generic/template/statistics.html', controller: 'statisticsGenericController1', resolve: {auth: authentication1Promise}});
        //--
        $routeProvider.when('/:ob/1/:xob/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistXGeneric1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newXGeneric1Controller', resolve: {auth: authentication1Promise}});
        $routeProvider.when('/:ob/1/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editXGeneric1Controller', resolve: {auth: authentication1Promise}});
        //--
        //-- generic 3
        //--
        $routeProvider.when('/:ob/3/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistGenericController3', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/view/:id', {templateUrl: 'js/system/generic/template/view.html', controller: 'viewGenericController3', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newGenericController3', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editGenericController3', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/remove/:id', {templateUrl: 'js/system/generic/template/remove.html', controller: 'removeGenericController3', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/statistics/:id', {templateUrl: 'js/system/generic/template/statistics.html', controller: 'statisticsGenericController3', resolve: {auth: authentication3Promise}});
        //--
        $routeProvider.when('/:ob/3/:xob/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistXGeneric3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newXGeneric3Controller', resolve: {auth: authentication3Promise}});
        $routeProvider.when('/:ob/3/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editXGeneric3Controller', resolve: {auth: authentication3Promise}});
        //--
        //-- generic 4
        //--
        $routeProvider.when('/:ob/4/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistGenericController4', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/view/:id', {templateUrl: 'js/system/generic/template/view.html', controller: 'viewGenericController4', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newGenericController4', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editGenericController4', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/remove/:id', {templateUrl: 'js/system/generic/template/remove.html', controller: 'removeGenericController4', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/statistics/:id', {templateUrl: 'js/system/generic/template/statistics.html', controller: 'statisticsGenericController4', resolve: {auth: authentication4Promise}});
        //--
        $routeProvider.when('/:ob/4/:xob/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistXGeneric4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newXGeneric4Controller', resolve: {auth: authentication4Promise}});
        $routeProvider.when('/:ob/4/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editXGeneric4Controller', resolve: {auth: authentication4Promise}});
        //--
        //-- generic 5
        //--
        $routeProvider.when('/:ob/5/plist/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistGenericController5', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/view/:id', {templateUrl: 'js/system/generic/template/view.html', controller: 'viewGenericController5', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/new/:id?', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newGenericController5', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/edit/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editGenericController5', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/remove/:id', {templateUrl: 'js/system/generic/template/remove.html', controller: 'removeGenericController5', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/statistics/:id', {templateUrl: 'js/system/generic/template/statistics.html', controller: 'statisticsGenericController5', resolve: {auth: authentication5Promise}});
        //--
        $routeProvider.when('/:ob/5/:xob/plist/:id/:page?/:rpp?', {templateUrl: 'js/system/generic/template/plist.html', controller: 'plistXGeneric5Controller', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/:xob/new/:id', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'newXGeneric5Controller', resolve: {auth: authentication5Promise}});
        $routeProvider.when('/:ob/5/:xob/edit/:id/:xid', {templateUrl: 'js/system/generic/template/newedit.html', controller: 'editXGeneric5Controller', resolve: {auth: authentication5Promise}});
        //--
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
