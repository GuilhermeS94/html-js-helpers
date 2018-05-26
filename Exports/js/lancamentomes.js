var LancamentoMes = function () {

    var TaxaDeImposto;
    var ValorDeCustos;
    var ParticipacaoDeRateio;
    var CustoFixo;

    return {
        //main function to initiate the module
        init: function (link, parametros) {
            $(".selecione-cliente").chosen({ width: "160px" });

            $('.selecione-cliente').on('change', function (evt, params) {
                var valorCliente = $('.selecione-cliente option:selected').data("id");
                //console.log(valorCliente);
                $('#pEmpresaId').val(valorCliente);
                var actionController = link.split('/');
                link = "/" + actionController[1] + "/" + actionController[2] + "/" + valorCliente + "?";

                if (parametros.pMes) {
                    link = LancamentoMes.ComporLink(link);
                    link += "pMes=" + parametros.pMes;
                }

                if (parametros.pAno) {
                    link = LancamentoMes.ComporLink(link);
                    link += "pAno=" + parametros.pAno;
                }

                if (parametros.pLancamentoId) {
                    link = LancamentoMes.ComporLink(link);
                    link += "pLancamentoId=" + parametros.pLancamentoId;
                }
                if (parametros.cId) {
                    link = LancamentoMes.ComporLink(link);
                    link += "cId=" + parametros.cId;
                }

                if (link.substr(-1) == "?") {
                    link = link.substr(0, link.length - 1);
                }

                window.location.replace(link);
            });

            ////limpar campos
            //if (!$("#pLancamentoId").val()) {
            //    $(":text").each(function () {
            //        $(this).val("");
            //    });
            //}

            $(document).ready(function () {
                var valorCliente = $('.selecione-cliente option:selected').data("id");
                $('#pEmpresaId').val(valorCliente);
            });
        },

        ComporLink: function (url) {
            if ((url.substring(url.length - 1) != "&"))
                return url + "&";
        },

        RemoverPontoReal: function () {
            var campos = $('.moeda-real');
            var valor;
            for (var i = 0; i < campos.length; i++) {
                valor = null;
                valor = $(campos[i]).val();
                valor = valor.replace(/\./g, '');
                $(campos[i]).val(valor);
            }
            valor = 0;
            //remover portentagem da margem
            valor = $('#PorcentoMargemDeContribuicao').val();
            valor = valor.replace(/%/g, '');
            $('#PorcentoMargemDeContribuicao').val(valor);
        },

        LoadCadastro: function () {

            $('.moeda-real').maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });

            $("input.moeda-real").each(function (index) {
                $(this).maskMoney('mask', $(this).val(this.defaultValue));
            });

            //$("#PorcentoMargemDeContribuicao").val(document.getElementById("PorcentoMargemDeContribuicao").defaultValue);

            $('form[name=cart] tr[name=line_items]').jAutoCalc({ keyEventsFire: true, decimalPlaces: 2 });
            $('form[name=cart]').jAutoCalc({ decimalPlaces: 2 });
        },

        CreateFaturarSwitch: function (stateAtual) {
            $("[name='actived_value']").bootstrapSwitch();

            $('input[name="Faturar"]').val(true);

            $('[name="actived_value"]').on('switchChange.bootstrapSwitch', function (event, state) {
                //console.log(state); // true | false
                $('input[name="Faturar"]').val(state);
            });

            $('input[name="actived_value"]').bootstrapSwitch('state', stateAtual, false);

        },

        CreateStatusSwitch: function (stateAtual) {
            $("[name='Actived']").bootstrapSwitch();

            $('input[name="Actived"]').val(true);

            $('input[name="Actived"]').bootstrapSwitch('state', stateAtual, false);

        },

        FixarTabela: function () {
            var offset = $('#TabelaFixa').offset().top;
            var $TabelaFixa = $('#TabelaFixa'); // guardar o elemento na memoria para melhorar performance
            $(document).on('scroll', function () {
                if (offset <= $(window).scrollTop()) {
                    $TabelaFixa.addClass('fixo');
                } else {
                    $TabelaFixa.removeClass('fixo');
                }
            });
        },

        CalcReceitaBruta: function () {
            //var $CustoDeRepasse = $("#CustoDeRepasse").val().replace('.', '');
            //$CustoDeRepasse = parseFloat($CustoDeRepasse.replace(',', '.'));
            var $ValorNota = $("#ValorNota").val().replace('.', '');
            $ValorNota = parseFloat($ValorNota.replace(',', '.'));

            var resultado = parseFloat($ValorNota);

            $("#ReceitaBruta").maskMoney('mask', resultado);
            LancamentoMes.CalcImpostosDiretos();
        },

        CalcRol: function () {
            var $ValorNota = $("#ValorNota").val().replace('.', '');
            $ValorNota = parseFloat($ValorNota.replace(',', '.'));
            var $ImpostosDiretos = $("#ImpostosDiretos").val().replace('.', '');
            $ImpostosDiretos = parseFloat($ImpostosDiretos.replace(',', '.'));

            var resultado = parseFloat($ValorNota - $ImpostosDiretos);

            $("#ROL").maskMoney('mask', resultado);
            LancamentoMes.CalcPorcentoEbitida();
        },

        CalcMargemContribuicao: function () {
            var $Rol = $("#ROL").val().replace('.', '');
            $Rol = parseFloat($Rol.replace(',', '.'));
            var $DespesasNaoAgenciadas = $("#DespesasNaoAgenciadas").val().replace('.', '');
            $DespesasNaoAgenciadas = parseFloat($DespesasNaoAgenciadas.replace(',', '.'));

            var resultado = parseFloat($Rol - $DespesasNaoAgenciadas);

            $("#MargemDeContribuicao").maskMoney('mask', resultado);
            LancamentoMes.CalcEbitida();
        },

        CalcImpostosDiretos: function () {
            var $ValorNota = $("#ValorNota").val().replace('.', '');
            $ValorNota = parseFloat($ValorNota.replace(',', '.'));

            var resultado = parseFloat($ValorNota * (TaxaDeImposto / 100));

            $("#ImpostosDiretos").maskMoney('mask', resultado);
            LancamentoMes.CalcRol();
        },

        CalcEbitida: function () {
            var $MargemContrib = $("#MargemDeContribuicao").val().replace('.', '');
            $MargemContrib = parseFloat($MargemContrib.replace(',', '.'));
            var $DespesasCustosEstrutura = $("#DespesasCustosEstrutura").val().replace('.', '');
            $DespesasCustosEstrutura = parseFloat($DespesasCustosEstrutura.replace(',', '.'));

            var resultado = $MargemContrib - ($DespesasCustosEstrutura + CustoFixo);
            var strResultado = LancamentoMes.FormatarDoubleParaMoney(resultado.toString().replace('.', ','));

            $("#Ebitida").text(strResultado);
            LancamentoMes.CalcPorcentoEbitida();
        },

        CalcPorcentoEbitida: function () {
            var $Ebitida = $("#Ebitida").text().replace('.', '');
            $Ebitida = parseFloat($Ebitida.replace(',', '.'));
            var $Rol = $("#ROL").val().replace('.', '');
            $Rol = parseFloat($Rol.replace(',', '.'));

            var resultado = parseFloat(($Rol > 0) ? ($Ebitida / $Rol) : 0);

            $("#PorcentoEbitida").text(resultado.toFixed(2));
        },

        FormatarDoubleParaMoney: function (strValor) {
            if ((strValor.length == 3 && strValor.indexOf(',') == -1) ||
                (strValor.indexOf(',') == -1 && strValor.length < 4))
                return strValor + ",00";


            var res = "";
            var strAux = "";
            reaisCentavos = strValor.split(',');
            for (var i = reaisCentavos[0].length - 1; i >= 0; i--) {
                strAux = res.replace('.', '');
                if (strAux.length % 3 == 0 && res != "")
                    res += ".";

                res += reaisCentavos[0].charAt(i);
            }

            res = res.split("").reverse().join("");
            res = (res.substr(1) == '.') ? res.substr(1, res.length - 1) : res;

            if (reaisCentavos.length == 2) {
                res += ",";

                if (reaisCentavos[1].length == 1)
                    res += reaisCentavos[1] + "0";
                else
                    res += reaisCentavos[1];
            } else {
                res += ",00";
            }

            return res;
        },

        LoadDatasInput: function () {
            $(".calendario-datepicker").each(function () {
                if (this.defaultValue.trim() != '')
                    $(this).datepicker("update", this.defaultValue);
            });
        },

        BuscarCustoDeRepasse: function () {
            $.ajax({
                method: "POST",
                url: "/Lancamentos/BuscarCustoDeRepassePorPit",
                data: {
                    ClienteId: parseInt($("#pEmpresaId").val()),
                    pMes: parseInt($("#pMes").val()),
                    pit: $("#PIT").val()
                }
            })
              .done(function (CustoDeRepasse) {
                  $("#CustoDeRepasse").val(LancamentoMes.FormatarDoubleParaMoney(CustoDeRepasse.toString()));
              })
              .fail(function () {
                  console.log("error");
              });
            //.always(function () {
            //    alert("complete");
            //});
            //$.post('BuscarCustoDeRepassePorPit', {}, function () { });
        },
        
        LoadSaldoAtualPorEmpresa: function (empresaId, pMes) {
            $.ajax({
                method: "POST",
                url: "/Lancamentos/LoadSaldoAtualPorEmpresa",
                data: {
                    pEmpresaId: empresaId,
                    pMes: pMes
                },
                beforeSend: function () {
                    //$("#loadSaldos").show();
                }
            })
              .done(function (saldos) {

                  TaxaDeImposto = saldos.BsCalculo.TaxaDeImposto;
                  ValorDeCustos = saldos.BsCalculo.ValorDeCustos;
                  ParticipacaoDeRateio = saldos.BsCalculo.ParticipacaoDeRateio;
                  CustoFixo = saldos.CustoFixo;

                  //console.log(saldos);

                  //saldo atual
                  strValorNota = LancamentoMes.FormatarDoubleParaMoney(saldos.ValorNota.toString().replace('.', ','));
                  strCustoDeRepasse = LancamentoMes.FormatarDoubleParaMoney(saldos.CustoDeRepasse.toString().replace('.', ','));
                  strReceitaBruta = LancamentoMes.FormatarDoubleParaMoney(saldos.ReceitaBruta.toString().replace('.', ','));
                  strImpostosDiretos = LancamentoMes.FormatarDoubleParaMoney(saldos.ImpostosDiretos.toFixed(2).toString().replace('.', ','));
                  strROL = LancamentoMes.FormatarDoubleParaMoney(saldos.ROL.toFixed(2).toString().replace('.', ','));
                  strDespesasNaoAgenciadas = LancamentoMes.FormatarDoubleParaMoney(saldos.DespesasNaoAgenciadas.toFixed(2).toString().replace('.', ','));
                  strMargemDeContribuicao = LancamentoMes.FormatarDoubleParaMoney(saldos.MargemDeContribuicao.toFixed(2).toString().replace('.', ','));
                  strPorcentoMargemDeContribuicao = LancamentoMes.FormatarDoubleParaMoney(saldos.PorcentoMargemDeContribuicao.toFixed(2).toString().replace('.', ','));
                  strDespesasCustosEstrutura = LancamentoMes.FormatarDoubleParaMoney(saldos.DespesasCustosEstrutura.toString().replace('.', ','));
                  strDebitoProvisionado = LancamentoMes.FormatarDoubleParaMoney(saldos.DebitoProvisionamento.toString().replace('.', ','));
                  strViagem = LancamentoMes.FormatarDoubleParaMoney(saldos.Viagem.toString().replace('.', ','));
                  strCustoFixo = LancamentoMes.FormatarDoubleParaMoney(saldos.CustoFixo.toString().replace('.', ','));
                  strEbitida = LancamentoMes.FormatarDoubleParaMoney(saldos.Ebitida.toFixed(2).toString().replace('.', ','));
                  strPorcentoEbitida = LancamentoMes.FormatarDoubleParaMoney(saldos.PorcentoEbitida.toFixed(2).toString().replace('.', ','));

                  $("#lblValorNota").text(strValorNota);
                  $("#lblCustoDeRepasse").text(strCustoDeRepasse);
                  $("#lblReceitaBruta").text(strReceitaBruta);
                  $("#lblImpostosDiretos").text(strImpostosDiretos);
                  $("#lblROL").text(strROL);
                  $("#lblDespNAgen").text(strDespesasNaoAgenciadas);
                  $("#lblMargemDeContribuicao").text(strMargemDeContribuicao);
                  $("#lblPorcentoMargem").text(strPorcentoMargemDeContribuicao);
                  $("#lblDespCustEst").text(strDespesasCustosEstrutura);
                  $("#lblViagem").text(strViagem);
                  $("#lblDebitoProvisionamento").text(strDebitoProvisionado);
                  $("#lblCustosFixos").text(strCustoFixo);
                  $("#lblEbitida").text(strEbitida);
                  $("#lblPorcentoEbitida").text(strPorcentoEbitida);

                  //base calc
                  strValorDeCustos = LancamentoMes.FormatarDoubleParaMoney(ValorDeCustos.toString().replace('.', ','));
                  strParticipacaoDeRateio = LancamentoMes.FormatarDoubleParaMoney(ParticipacaoDeRateio.toString().replace('.', ','));
                  strTaxaDeImposto = LancamentoMes.FormatarDoubleParaMoney(TaxaDeImposto.toString().replace('.', ','));

                  $("#lblValorDeCustos").text(strValorDeCustos);
                  $("#lblTaxaDeImposto").text(strTaxaDeImposto);
                  $("#lblParticipacaoDeRateio").text(strParticipacaoDeRateio);

              })
              .fail(function () {
                  console.log("fail");
              }).error(function () {
                  console.log("error");
              })
                .always(function () {
                    $("#loadSaldos").hide();
                });
        },

        PorClienteTable: function () {
            /* BASIC ;*/
            var responsiveHelper_dt_basic = undefined;
            var responsiveHelper_datatable_fixed_column = undefined;
            var responsiveHelper_datatable_col_reorder = undefined;
            var responsiveHelper_datatable_tabletools = undefined;

            var breakpointDefinition = {
                tablet: 1024,
                phone: 480
            };

            $('#tblPorCliente').dataTable({
                //"order": [[0, "desc"]],
                "ordering":false,
                //"iDisplayLength": 100,
                "paging": false,
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
                        responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tblPorCliente'), breakpointDefinition);
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
                    btnExport.setAttribute("onclick", "LancamentoMes.ExportManual(btnExport)");
                    btnExport.id = "btnExport";
                    document.querySelector('.exportar').appendChild(btnExport);
                    console.log("Carregou botão");
                }
            });
        },

        ExportManual: function (link) {
            
            var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };

            // seleciona tabela
            var tabela = document.getElementById("tblPorCliente");
            var ctx = {
                worksheet: "Anual por Cliente.xls",
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