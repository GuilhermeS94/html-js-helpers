
var TablesWizard = function () {
    return {
        //main function to initiate the module
        init: function () {
            $('.datatable').DataTable({
                "language": {
                    "url": "/Assets/js/Sunset/Portuguese-Brasil.json.js"
                },
                "pageLength": 25,
                "aLengthMenu": [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, "Todos"]],
                "initComplete": function () {//depois que fizer a table colocar css no campo pesquisa
                        $('.dataTables_filter input').addClass("form-control input-small input-inline");
                }
            });
        }
    };
}();