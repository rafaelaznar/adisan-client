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

genericModule.controller('newXGeneric3Controller',
    ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', '$route', 'toolService', 'constantService', 'auth',
        function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, $route, toolService, constantService, auth) {
            $scope.ob = $routeParams.ob;
            $scope.op = "newx";
            $scope.profile = 3;
            //--
            $scope.oSession = null;
            $scope.metadata = null;
            if (auth) {
                if (auth.data) {
                    if (auth.data.status == 200) {
                        if (auth.data.json.user.data.obj_tipousuario.data.id == $scope.profile) {
                            $scope.metadata = auth.data.json.meta;
                            $scope.oSession = auth.data.json;
                        } else {
                            $location.path("/login");
                        }
                    } else {
                        $location.path("/login");
                    }
                } else {
                    $location.path("/login");
                }
            } else {
                $location.path("/login");
            }
            //----
            $scope.xob = $routeParams.xob;
            $scope.xid = $routeParams.id;
            //---
            $scope.status = null;
            $scope.debugging = constantService.debugging();
            //---
            if ($scope.xob && $scope.xid) {
                $scope.linkedbean = null;
                serverCallService.getOne($scope.xob, $scope.xid).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.linkedbean = response.data.json;
                            $scope.breadcrumbs = toolService.renderLinkHtml($scope.linkedbean, $scope.profile);

                        } else {
                            $scope.status = "Error: " + response.data.json;
                        }

                    }
                }).catch(function (data) {
                });
            }
            ;
            serverCallService.getMeta($scope.ob).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        //--For every foreign key create obj inside bean tobe filled...
                        $scope.bean = {};
                        $scope.metao = response.data.json.metaObject;
                        $scope.metap = response.data.json.metaProperties;
                        response.data.json.metaProperties.forEach(function (property) {
                            if (property.Type == 'ForeignObject') {
                                $scope.bean[property.Name] = {};
                                $scope.bean[property.Name].data = {};
                                if (property.Name == 'obj_' + $scope.xob) {
                                    $scope.bean[property.Name].data.id = $scope.xid;
                                } else {
                                    $scope.bean[property.Name].data.id = null;
                                }
                                if ($scope.xob == "subepisodio" && property.Name == 'obj_episodio') {  //específico
                                    $scope.bean[property.Name].data.id = $scope.xid;
                                }
                            }
                            if (property.DefaultValue == "today") {
                                $scope.bean[property.Name] = moment().format('DD/MM/YYYY');
                            }
                        });
                        //------------------ESPECIFICO-------------------------------------                                       
                        if ($scope.ob == 'subepisodio') {
                            $scope.metap = toolService.deleteForeignKey($scope.metap, "obj_paciente");                            
                        }
                        //-------------------------------------------------------------

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
                            $scope.status = "Error: " + response.data.json;
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
            $scope.isFormVisible = function (oMeta) {
                if (!oMeta.IsFormVisible3) {
                    $scope.metap = toolService.deleteForeignKey($scope.metap, oMeta.Name);
                }
                return oMeta.IsFormVisible3;
            }
        }
    ]);

