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

moduloEpisodio.controller('SubepisodioXepisodioEdit3Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', 'sessionService', '$route', 'toolService', 'constantService',
            function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, sessionService, $route, toolService, constantService) {
                $scope.ob = "subepisodio";
                $scope.op = "edit";
                $scope.profile = 3;
                //----
                $scope.id = $routeParams.id;
                //---
                $scope.xob = "episodio";
                $scope.xid = $routeParams.xid;
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
                                $scope.breadcrumbs = toolService.renderLinkHtml($scope.linkedbean.data.obj_paciente, $scope.profile) + toolService.renderLinkHtml($scope.linkedbean, $scope.profile);
                                $scope.bean['obj_paciente'].data.id = $scope.linkedbean.data.obj_paciente.data.id;
                                $scope.bean['obj_episodio'].data.id = $scope.linkedbean.data.id;
                                $scope.bean['obj_usuario'].data.id = $scope.linkedbean.data.obj_usuario.data.id;
                                ;
                            }
                        }
                    }).catch(function (data) {
                    });
                }


                serverCallService.getOne($scope.ob, $scope.id).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.status = null;
                            $scope.bean = response.data.json.data;
                            $scope.metao = response.data.json.metaObject;
                            $scope.metap = response.data.json.metaProperties;
                            $scope.metap = toolService.deleteForeignKey($scope.metap, "obj_paciente");
                            $scope.metap = toolService.deleteForeignKey($scope.metap, "obj_usuario");
                            $scope.metap = toolService.deleteForeignKey($scope.metap, "obj_episodio");
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor";
                });
                //--
                $scope.save = function () {
                    var jsonToSend = {json: JSON.stringify(toolService.array_identificarArray($scope.bean))};
                    serverCallService.set($scope.ob, jsonToSend).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.response = response;
                                $scope.status = "El registro se ha modificado con id=" + $scope.id; 
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

