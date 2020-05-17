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
genericModule.controller('viewGenericController3',
    ['$scope', '$routeParams', 'serverCallService', '$location', 'constantService', 'auth',
        function ($scope, $routeParams, serverCallService, $location, constantService, auth) {
            $scope.ob = $routeParams.ob;
            $scope.op = "view";
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
            $scope.id = $routeParams.id;
            //---
            $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
            //---
            $scope.status = null;
            $scope.debugging = constantService.debugging();
            //---
            serverCallService.getOne($scope.ob, $scope.id).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.status = null;
                        $scope.bean = response.data.json.data;
                        $scope.metao = response.data.json.metaObject;
                        $scope.metap = response.data.json.metaProperties;


                    } else {
                        $scope.status = "Error: " + response.data.json;
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
            $scope.back = function () {
                window.history.back();
            };
            $scope.close = function () {
                $location.path('/home');
            };
            $scope.showEditButton = function (bean) {
                if (bean) { return bean.canUpdate; } else { return false; }
            }
            $scope.showRemoveButton = function (bean) {
                if (bean) { return bean.canDelete; } else { return false; }
            }
        }
    ]);