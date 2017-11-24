/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('Button', function () {
        return {
            deleteButton: deleteButton,
            editButton: editButton,
            viewButton: viewButton,
            groupButton: groupButton
        };

        function deleteButton() {
            return '<a class="red" id="command-delete"><i class="ace-icon fa fa-trash-o bigger-130"></i></a>';
        }

        function editButton() {
            return '<a class="green" id="command-edit"><i class="ace-icon fa fa-pencil bigger-130"></i></a>';
        }

        function viewButton() {
            return '<a class="blue" id="command-view"><i class="ace-icon fa fa-search bigger-130"></i></a>';
        }

        function groupButton(buttons) {
            return ['<div class="hidden-sm hidden-xs action-buttons">', buttons.join(''), '</div>'].join('');
        }
    });