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

'use strict';
moduloSistema.controller('LoginController',
    ['$http', '$scope', '$location', 'constantService', 'sessionServerCallService', 'toolService', 'auth', 'meta',
        function ($http, $scope, $location, constantService, sessionServerCallService, toolService, auth, meta) {
            //$.getScript("https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit");             
            $scope.title = "Formulario de entrada al sistema";
            $scope.icon = "fa-file-text-o";
            //--
            if (meta) {
                if (meta.data) {
                    $scope.metadata = meta.data.json;
                }
            }
            if (auth) {
                if (auth.data) {
                    $scope.userSession = null;
                    if (auth.data.status == 200) {
                        $scope.userSession = auth.data.json.data;
                    }
                }
            }
            //--   
            $scope.user = {};
            $scope.debugging = constantService.debugging();
            $scope.checkGrupoStatusMsg = "";
            $scope.invalidLoginStatusMsg = "";
            $scope.fill = function (nombre) {
                if (constantService.debugging()) {
                    $scope.user.username = nombre;
                    $scope.user.password = "rafael";
                }
            }
            $scope.fillRegistro = function (cod) {
                if (constantService.debugging()) {
                    $scope.user.key = cod;
                }
            }
            $scope.checkGrupo = function () {
                if ($scope.user.key) {
                    $http.get(constantService.getAppUrl() + '?ob=grupo&op=check&codigo=' + $scope.user.key, 'GET', '').then(function (response) {
                        if (response.data.status == 200) {
                            if (response.data.json == "OK") {
                                $location.path('/newalumno/9/' + $scope.user.key);
                            }
                        } else {
                            $scope.checkGrupoStatusMsg = "Error: el grupo no es correcto.";
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        $scope.checkGrupoStatusMsg = "Error: el grupo no es correcto.";
                        return false;
                    });
                }
            }
            $scope.login = function () {
                //var recaptchaValue = $('#loginform')[0][2].value;
                var recaptchaValue = "";
                sessionServerCallService
                    .login($scope.user.username, $scope.user.password)
                    .then(
                        function (response) {
                            if (response.data.status == 200) {
                                $location.path("home");
                            } else {
                                $scope.invalidLoginStatusMsg = "Error: Login o password incorrectos";
                                return false;
                            }
                        },
                        function errorCallback(response, status) {
                            return false;
                        }
                    );
            };
            //recaptchaOnload();
        }
    ]);