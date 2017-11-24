/**
 * Created by PC on 9/17/2016.
 */
'use strict';

angular.module('myApp')
    .service('DataTable', function () {
        this.generateDataTable = function (options, element) {
            if (!options.columnDefs) {
                options.columnDefs = [];
            }
            options.columnDefs.push({
                "searchable": false,
                "orderable": false,
                "targets": 0
            });

            var table = element.DataTable({
                'ajax': {
                    'url': options.url
                },
                'columns': options.columns,
                'columnDefs': options.columnDefs
            });

            table.on('order.dt search.dt', function () {
                table.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();

            element.on('click', '#command-delete', function () {
                var obj = table.row($(this).parents('tr')).data();
                options.delete.call(null, obj);
            });

            element.on('click', '#command-edit', function () {
                var obj = table.row($(this).parents('tr')).data();
                options.edit.call(null, obj);
            });

            element.on('click', '#command-view', function () {
                var obj = table.row($(this).parents('tr')).data();
                options.view.call(null, obj);
            });

            element.on('click', '#command-islock', function () {
                var obj = table.row($(this).parents('tr')).data();
                options.islock.call(null, obj);
            });
        };
    });