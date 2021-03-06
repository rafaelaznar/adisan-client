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
genericModule.controller('plistGenericController4',
    ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'auth',
        function ($scope, $routeParams, $location, serverCallService, toolService, constantService, auth) {
            $scope.ob = $routeParams.ob;
            $scope.op = "plist";
            $scope.profile = 4;
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
            $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
            //----
            $scope.numpage = toolService.checkDefault(1, $routeParams.page);
            $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
            $scope.neighbourhood = constantService.getGlobalNeighbourhood();
            //---
            $scope.orderParams = toolService.checkEmptyString($routeParams.order);
            $scope.filterParams = toolService.checkEmptyString($routeParams.filter);
            //---
            $scope.status = null;
            $scope.debugging = constantService.debugging();
            //---
            function getDataFromServer() {
                serverCallService.getPList($scope.ob, $scope.rpp, $scope.numpage, $scope.filterParams, $routeParams.order)
                    .then(
                        function (response) {
                            if (response.status == 200) {
                                if (response.data.status == 200) {
                                    $scope.registers = response.data.json.count;
                                    $scope.page = response.data.json.page.data;
                                    $scope.metao = response.data.json.page.metaObject;
                                    $scope.metap = response.data.json.page.metaProperties;
                                    $scope.pages = toolService.calculatePages($scope.rpp, $scope.registers);
                                    if ($scope.numpage > $scope.pages) {
                                        $scope.numpage = $scope.pages;
                                    }
                                } else {
                                    $scope.status = "Error: " + response.data.json;
                                }
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor";
                            }
                        }
                    ).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
            }
            //--
            $scope.doorder = function (orderField, ascDesc) {
                $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filterParams).search('order', orderField + ',' + ascDesc);
                return false;
            };
            $scope.back = function () {
                window.history.back();
            };
            $scope.close = function () {
                $location.path('/home');
            };
            //--------------------------------------------------------------
            $scope.showHeaderExtraButtons = function () {
                return false;
            }
            $scope.create = function () {
                serverCallService.create($scope.ob).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.status = null;
                            $scope.createbean = response.data.json.data;
                            //$scope.metao = response.data.json.metaObject;
                            //$scope.metap = response.data.json.metaProperties;
                            getDataFromServer();
                        } else {
                            $scope.status = "Error: " + response.data.json;
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor";
                });
            }
            //---
            $scope.showViewButton = function () {
                return true;
            }
            $scope.showNewButton = function (metao) {
                if (metao) { return metao.canCreateObject; } else { return false; }
            }
            $scope.showEditButton = function (oBean) {
                return oBean.canUpdate;
            }
            $scope.showRemoveButton = function (oBean) {
                return oBean.canDelete;
            }
            $scope.showStatisticsButton = function (oBean) {
                return oBean.canStatistics;
            }
            $scope.showOtherButton = function (oBean) {
                return false;
            }
            $scope.goViewURL = function (oBean) {
                $location.path($scope.ob + "/" + $scope.profile + "/view/" + oBean.id);
            }
            $scope.goNewURL = function () {
                $location.path($scope.ob + "/" + $scope.profile + "/new");
            }
            $scope.goEditURL = function (oBean) {
                $location.path($scope.ob + "/" + $scope.profile + "/edit/" + oBean.id);
            }
            $scope.goRemoveURL = function (oBean) {
                $location.path($scope.ob + "/" + $scope.profile + "/remove/" + oBean.id);
            }
            $scope.goStatisticsURL = function (oBean) {
                $location.path($scope.ob + "/" + $scope.profile + "/statistics/" + oBean.id);
            }
            //--------------------------------------------------------------
            getDataFromServer();
        }
    ]);


