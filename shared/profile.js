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

moduloSistema.controller('ProfileController', ['$scope', '$routeParams', '$location', 'auth', 'meta',
    function ($scope, $routeParams, $location, auth, meta) {
        $scope.title = "Perfil de usuario";
        $scope.icon = "fa-user";


        $scope.authStatus = auth.data.status;
        $scope.session_info = auth.data.json.data;
        if ($scope.authStatus != 200) {
          $location.path("/login");
        } else {
          if (
            auth.data.json.data.obj_tipousuario.data.id > 0 &&
            auth.data.json.data.obj_tipousuario.data.id <= 5
          ) {
            $scope.isSessionActive = true;
            $scope.userSession = auth.data.json.data;
          } else {
            $location.path("/login");
          }
        }

        $scope.back = function () {
            window.history.back();
        };

    }]);


