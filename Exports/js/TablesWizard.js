var TablesWizard = function () {
    return {
        //main function to initiate the module
        init: function () {                       

            /* BASIC ;*/
            var responsiveHelper_dt_basic = undefined;
            var responsiveHelper_datatable_fixed_column = undefined;
            var responsiveHelper_datatable_col_reorder = undefined;
            var responsiveHelper_datatable_tabletools = undefined;

            var breakpointDefinition = {
                tablet: 1024,
                phone: 480
            };            

            $('.datatable').dataTable({
                "order": [[ 0, "desc" ]],
                "iDisplayLength": 100,
                //"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'l >r> T<'clear'>" +
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs' T l>r>" +
                                        "t" +
                                        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                "tableTools": {
                    "aButtons": [
                                {
                                    "sExtends": "copy",
                                    "sButtonText": "Copiar"
                                },
                                {
                                    "sExtends": "xls",
                                    "sButtonText": "Exportar para Excel"
                                }
                                //{
                                //    "sExtends":    "collection",
                                //    "sButtonText": "Salvar",
                                //    "aButtons":    ["csv", "xls"]
                                //}
                    ],
                    "sSwfPath": "/Assets/plugins/datatables/swf/copy_csv_xls.swf"
                },
                "autoWidth": true,               
                "oLanguage": {
                    //"sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
                    "sUrl": '/Assets/js/Sunset/Portuguese-Brasil.json.js'
                },
                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!responsiveHelper_dt_basic) {
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('.datatable'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                }
            });

        }
    };
}();