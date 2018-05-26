var MAIN = function () {
    
    return {
        //main function to initiate the module
        init: function () {
            console.log('Modulo inicializado!!!'); 
        },
               
        personalDataTable: function () {
            /* BASIC ;*/
            var responsiveHelper_dt_basic = undefined;
            var responsiveHelper_datatable_fixed_column = undefined;
            var responsiveHelper_datatable_col_reorder = undefined;
            var responsiveHelper_datatable_tabletools = undefined;

            var breakpointDefinition = {
                tablet: 1024,
                phone: 480
            };

            $('#table_id').dataTable({
                //"order": [[0, "desc"]],
                "ordering":false,
                "iDisplayLength": 10,
                //"paging": false,
                //"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'l >r> T<'clear'>" +
                "sDom": "<'dt-toolbar'<'col-xs-5 col-sm-5'f><'exportar col-xs-2 col-sm-2'r><'col-sm-5 col-xs-5 hidden-xs' T l>r>" +
                                        "t" +
                                        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                "tableTools": {
                    "aButtons": [
                                //{
                                //    "sExtends": "copy",
                                //    "sButtonText": "Copiar"
                                //},
                                //{
                                //    "sExtends": "xls",
                                //    "sButtonText": "Exportar para Excel"
                                //}
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
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#table_id'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_dt_basic.createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_dt_basic.respond();
                },
                "initComplete": function () {
                    var btnExport = document.createElement("a");
                    var texto = document.createTextNode("Exportar");
                    btnExport.appendChild(texto);
                    btnExport.classList.add("btn","btn-default");
                    btnExport.setAttribute("onclick", "MAIN.ExportManual(btnExport)");
                    btnExport.id = "btnExport";
                    document.querySelector('.exportar').appendChild(btnExport);
                    console.log("Carregou botão");
                }
            });
        },

        ExportManual: function (link) {
            
            var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
            template = '<html xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };

            // seleciona tabela
            var tabela = document.getElementById("table_id");
            var ctx = {
                worksheet: "Nome da Guia",
                table: tabela.innerHTML
            };

            // se o navegador for IE salva como blob, testado no IE10 e IE11
            var browser = window.navigator.appVersion;
            if ((browser.indexOf('Trident') !== -1 && browser.indexOf('rv:11') !== -1) ||
              (browser.indexOf('MSIE 10') !== -1)) {
                var builder = new window.MSBlobBuilder();
                builder.append(uri + format(template, ctx));
                var blob = builder.getBlob('data:application/vnd.ms-excel;charset=utf-8');
                window.navigator.msSaveBlob(blob, "Anual por Cliente.xls");
            } else {
                link.href = uri + base64(format(template, ctx));
                link.download = "Anual por Cliente.xls";
            }
        },
    };

}();