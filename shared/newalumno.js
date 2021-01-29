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
moduloUsuario.controller('UsuarioNewalumno9Controller',
    ['$http', '$scope', '$routeParams', '$location', 'constantService', 'toolService', 'auth',
        function ($http, $scope, $routeParams, $location, constantService, toolService, auth) {
            $scope.ob = "usuario";
            $scope.op = "new";
            $scope.profile = 1;

            //--
            $scope.metadata = auth.data.json; //$scope.metadata = auth.data.json.meta;
            $scope.oSession = null;
            //----

            $scope.status = null;
            $scope.debugging = constantService.debugging();
            $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
            $scope.title = "Registro de alumno para el grupo " + $routeParams.codigo;
            $scope.profile = 9;
            $scope.bean = {};
            $scope.codigoGrupo = $routeParams.codigo;
            $scope.fase = 1;
            //obtener información del profesor y del curso y del centro a partir del código de centro
            $http.get(constantService.getAppUrl() + '?ob=usuario&op=getidcurso&codigo=' + $routeParams.codigo, 'GET', '').then(function (response) {
                if (response.status == 200) {
                    //if (response.data.message == "OK") {
                    //$scope.outerForm.login.$setValidity('repetido', false);
                    $scope.fase = 1;
                    $scope.grupo = response.data.json;
                    //}
                } else {
                    //$scope.outerForm.login.$setValidity('repetido', true);
                    return false;
                }
            }, function errorCallback(response, status) {
                //$scope.outerForm.login.$setValidity('repetido', true);
                return false;
            });
            $scope.validausuario = function (f) {
                if ($scope.fase == 1) {
                    if ($scope.bean.login) {
                        $http.get(constantService.getAppUrl() + '?ob=usuario&op=checklogin&login=' + $scope.bean.login, 'GET', '').then(function (response) {
                            if (response.status == 200) {
                                if (response.data.status == 200) {
                                    //$scope.outerForm.login.$setValidity('repetido', false);
                                    //f.outerForm.login.$setValidity('valid', true);
                                    $scope.fase = 2;
                                } else {
                                    alert('El nombre del usuario elegido no es correcto o está repetido. Escribe otro nombre.');
                                    return false;
                                }
                            } else {
                                //$scope.outerForm.login.$setValidity('repetido', true);
                                //f.outerForm.login.$setValidity('valid', false);
                                alert('Error de comunicación con el servidor.');
                                return false;
                            }
                        }, function errorCallback(response, status) {
                            //f.outerForm.login.$setValidity('valid', false);
                            //f.outerForm.login.$valid=false;                               
                            alert('Error de comunicación con el servidor.');
                            return false;
                        });
                    }
                }
            };
            $scope.checkPass = function () {
                if ($scope.bean.password == $scope.bean.password2) {
                    return false;
                } else {
                    return true;
                }
            };
            $scope.validaContrasenya = function () {
                $scope.fase = 3;
                $scope.send();
            };
            $scope.send = function () {
                delete $scope.bean.password2;
                $scope.bean.id_grupo = $scope.grupo.data.id;
                $scope.bean.id_centro = $scope.grupo.data.obj_usuario.data.obj_centro.data.id;
                $scope.bean.id_centrosanitario = $scope.grupo.data.obj_usuario.data.obj_centrosanitario.data.id;
                $scope.bean.password = forge_sha256($scope.bean.password).toUpperCase();
                var jsonToSend = { json: JSON.stringify(toolService.array_identificarArray($scope.bean)) };
                $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

                $http.get(constantService.getAppUrl() + '?ob=usuario&op=setalumno', { params: jsonToSend }).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.response = response;
                            $scope.fase = 4;
                            $scope.status = "Tus datos han sido grabados. Ahora tu profesor debe activar tu cuenta para que puedas entrar en el sistema.";
                            $scope.bean.id = response.data.message;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
                });
                ;
            };
            $scope.back = function () {
                window.history.back();
            };
            $scope.close = function () {
                $location.path('/home');
            };
        }
    ]);


