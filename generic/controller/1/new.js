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

genericModule.controller('newGenericController1',
    ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', '$route', 'toolService', 'constantService', 'auth', 'meta',
        function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, $route, toolService, constantService, auth, meta) {
            $scope.ob = $routeParams.ob;
            $scope.op = "new";
            $scope.profile = 1;
            //--
            $scope.metadata = meta.data.json;
            $scope.userSession = null;
            if (auth.data.status != 200) {
                $location.path("/login");
            } else {
                if (auth.data.json.data.obj_tipousuario.data.id != $scope.profile) {
                    $location.path("/login");
                } else {
                    $scope.userSession = auth.data.json.data;
                }
            }
            //----
            $scope.status = null;
            $scope.debugging = constantService.debugging();
            $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
            //---
            serverCallService.getMeta($scope.ob).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        //--For every foreign key create obj inside bean tobe filled...
                        $scope.bean = {};
                        response.data.json.metaProperties.forEach(function (property) {
                            if (property.Type == 'ForeignObject') {
                                $scope.bean[property.Name] = {};
                                $scope.bean[property.Name].data = {};
                                $scope.bean[property.Name].data.id = null;
                            }
                        });
                        //--
                        $scope.metao = response.data.json.metaObject;
                        $scope.metap = response.data.json.metaProperties;

                        //------------------ESPECIFICO-------------------------------------
                        if ($scope.ob == 'usuario') {             
                            $scope.bean.fecha_alta = moment().format('DD/MM/YYYY');
                        }

                        if ($scope.ob == 'episodio') {        
                            $scope.bean.fecha_inicio = moment().format('DD/MM/YYYY');
                        }

                        if ($scope.ob == 'subepisodio') {        
                            $scope.bean.fecha_inicio = moment().format('DD/MM/YYYY');
                            $scope.bean['obj_episodio'].data.id = $scope.linkedbean.data.id;
                            $scope.bean['obj_usuario'].data.id = $scope.linkedbean.data.obj_usuario.data.id;
                            $scope.bean['obj_paciente'].data.id = $scope.linkedbean.data.obj_paciente.data.id;
                        }
                        //--


                    } else {
                        $scope.status = "Error: " + response.data.json;
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
            //--
            $scope.save = function () {
                var jsonToSend = { json: JSON.stringify(toolService.array_identificarArray($scope.bean)) };
                serverCallService.set($scope.ob, jsonToSend).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.response = response;
                            $scope.status = "El registro se ha creado con id=" + response.data.json;
                            $scope.bean.id = response.data.json;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor";
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

