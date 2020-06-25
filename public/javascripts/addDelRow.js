
let myArr = [];

let ccc = {}

let tabela = [{
    prodOrder: 'Data1',

},
{
    prodOrder: 'Data2'
}]

$(document).ready(function () {
    ///////////////////////
    function autoCalcSetup() {
        $('form[name=cart]').jAutoCalc('destroy');
        $('form[name=cart] tr[name=line_items]').jAutoCalc({ keyEventsFire: true, decimalPlaces: 2, emptyAsZero: true });
        $('form[name=cart]').jAutoCalc({ decimalPlaces: 2 });
    }
    autoCalcSetup();
    /////////////////////////




    var totalCal = function (clNm, total) {//sumowanie wszystkich wartości w tabeli
        $(clNm).each(function () {
            var inputVal = $(this).val();
            if ($.isNumeric(inputVal)) {
                total += parseFloat(inputVal);
            }
        });
        return total;
    }
    ///////////////////////////////
    var round2Dec = function (e) {
        var result = Math.round(e * 100) / 100;
        return result;
    }
    ///////////////////////////////

    function timeToSec(time) {
        var a = time.split(':');
        var sec = (+a[0]) * 60 * 60 + (+a[1]) * 60;
        return sec;
    }

    ///////////////////////////////
    var totalWeight = 0;
    var totalA = 0;
    var totalB = 0;
    var totalC = 0;
    var totalD = 0;
    var totalPallets = 0;
    var totalCartons = 0;


    var calcTime = 0;

    var startDate = (new Date()).toTimeString()


    function time_convert(num) {//zamienia liczbe w sek na stringa w formacie tekstowym
        function check60(e) {
            if (e >= 10) {
                return e
            }
            else {
                return `0${e}`
            }
        }
        const hours = Math.floor(num / 3600);
        const minutes = check60(Math.floor((num % 3600) / 60))
        const seconds = check60(num % 60)

        var result = `${hours}:${minutes}:${seconds}`

        return result;
    }

    // function time_convert(num) {//zamienia liczbe w sek na stringa w formacie date

    //     const hours = Math.floor(num / 3600);
    //     const minutes = (Math.floor((num % 3600) / 60))
    //     const seconds = (num % 60)
    //     var dTime = new Date(0, 0, 0, hours, minutes, seconds)
    //     var time = dTime.toTimeString();
    //     return time;
    // }

    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    $('button[name=remove]').click(function (e) {
        e.preventDefault();

        var cc = `#product_${$(this).parents('tr').index() + 1}`;

        var form = $(this).parents('form')

        console.log('WTF is this' + `${$(this).parents('tr').index() + 1}`)

        //$(`#prodEnd_${index + 1}`).empty;

        $(this).parents('tr').remove();
        autoCalcSetup();

        // .done(function (data) {
        $('#tbl_posts_body tr').each(function (index) {
            $(this).find('td.sn').html(index + 1);
            $(this).find('td.sn').attr('id', 'PO_' + (index + 1));
            $(this).find('select.product').attr('id', 'product_' + (index + 1));
            $(this).find('.delete-record').attr('data-id', index + 1);
            //$(this).find('.product').attr('data-id', index + 1);
            $(this).find('.pieceWeight').attr('id', 'pieceWeight_' + (index + 1));
            $(this).find('.cartonQty').attr('id', 'cartonQty_' + (index + 1));
            $(this).find('.useOfA').attr('id', 'useOfA_' + (index + 1));
            $(this).find('.useOfB').attr('id', 'useOfB_' + (index + 1));
            $(this).find('.useOfC').attr('id', 'useOfC_' + (index + 1));
            $(this).find('.useOfD').attr('id', 'useOfC_' + (index + 1));
            $(this).find('.palletNum').attr('id', 'palletNum_' + (index + 1));
            $(this).find('.prodTime').attr('id', 'prodTime_' + (index + 1));
            $(this).find('.qty').attr('id', 'qty_' + (index + 1));
            $(this).find('.planStart').attr('id', 'planStart_' + (index + 1));



            $(`#totalWeight`).val(totalCal('.pieceWeight', totalWeight));//waga łącznie                        
            $(`#totalA`).val(round2Dec(totalCal('.useOfA', totalA)));//waga A łącznie
            $(`#totalB`).val(round2Dec(totalCal('.useOfB', totalB)));//waga B łącznie
            $(`#totalC`).val(round2Dec(totalCal('.useOfC', totalC)));//waga C łącznie
            $(`#totalD`).val(round2Dec(totalCal('.useOfD', totalD)));//waga D łącznie
            $(`#totalPallets`).val(totalCal('.palletNum', totalPallets));//łączna liczba wymaganych palet
            $(`#totalCartons`).val(totalCal('.cartonQty', totalCartons));//łączna liczba wymaganych kartonów
        })
    });

    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    $('button[name=add]').click(function (e) {
        e.preventDefault();

        var $rowModel = $("#sample_table").find("#rowModel")

        var $new = $rowModel.clone(true);
        var $table = $(this).parents('table');

        addRowF = function () {
            if (!$table.find('tr[name=line_items]').length != 0) {
                return $("#headerHandle");
            }
            else

                return $table.find('tr[name=line_items]').last()
        }

        var $top = addRowF()
        $new.jAutoCalc('destroy');
        $new.insertAfter($top);
        $new.find('input[type=text]').val('');
        autoCalcSetup();


        size = $table.find('tr[name=line_items]').length

        $new.find('.delete-record').attr('data-id', size);

        $new.find('.sn').html(size);
        $new.find('.sn').attr('id', 'PO_' + size);
        $new.find('.product').attr('id', 'product_' + size);
        $new.find('.product').attr('data-id', size);

        $new.find('.pieceWeight').attr('id', 'pieceWeight_' + size);
        $new.find('.cartonQty').attr('id', 'cartonQty_' + size);

        $new.find('.useOfA').attr('id', 'useOfA_' + size);
        $new.find('.useOfB').attr('id', 'useOfB_' + size);
        $new.find('.useOfC').attr('id', 'useOfC_' + size);
        $new.find('.useOfD').attr('id', 'useOfD_' + size);

        $new.find('.palletNum').attr('id', 'palletNum_' + size);
        $new.find('.prodTime').attr('id', 'prodTime_' + size);

        $new.find('.qty').attr('id', 'qty_' + size);
        $new.find('.planStart').attr('id', 'planStart_' + size);

    });
    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////
    let selectedValue = "";
    $('input[name=qty], select[name=changeSelect],select[name=lineSelect],input[name=getStart]').change(function (e) {

        console.log(timeToSec($('#getStart').val()))

        var cc = $(this).parents('tr').index() + 1;

        var ab = $('#tbl_posts_body tr').length
        selectedValue = ""
        selectedValue = $(`#product_${cc} option:selected`).val()


        for (let index = 1; index < $('#tbl_posts_body tr').length; index++) {
            selValT = ""
            selValT = $(`#product_${index} option:selected`).val()
            //console.log(selValT);
            var calcTime = 0;
            ////////////////////////////////////////////////////////////
            $.ajax({
                method: "GET",
                url: "productForm/readproducts/" + selValT,

            })

                .done(function (data) {
                    $(`.totalTime`).empty;
                    $(`.prodEnd`).empty;
                    $(`#prodTime_${index}`).val(time_convert($(`#qty_${index}`).val() * data.packingTimes[$(`#lineSelect`).val()]))
                })
        }
        //////////////////////////////////////////////////////////////
        $.ajax({
            method: "GET",
            url: "productForm/readproducts/" + selectedValue,

            success: function (result) {
                $(`#pieceWeight_${cc}`).empty();
                $(`#cartonQty_${cc}`).empty();
                $(`#useOfA_${cc}`).empty();
                $(`#useOfB_${cc}`).empty();
                $(`#useOfC_${cc}`).empty();
                $(`#useOfD_${cc}`).empty();
                $(`#palletNum_${cc}`).empty();
                $(`#prodTime_${cc}`).empty();

            }
        })
            .done(function (data) {
                ///////////////// Table calculations////////////////////////////
                function mulQty(e) {
                    var result = Math.round(($(`#qty_${cc}`).val()) * e * 100) / 100
                    return result;
                };
                function elUse(weight, elPer) {
                    var result = (Math.round(($(`#qty_${cc}`).val()) * weight * 100 * elPer)) / 100
                    return result;
                }
                ////////////////////Row values///////////////////////
                $(`#pieceWeight_${cc}`).val(mulQty(data.weightOfPiece));//waga łącznie
                $(`#cartonQty_${cc}`).val(Math.ceil(($(`#qty_${cc}`).val()) / data.piecesInCarton));//kartony łącznie
                $(`#useOfA_${cc}`).val(elUse(data.weightOfPiece, data.recipe.elementA));//zużycie A
                $(`#useOfB_${cc}`).val(elUse(data.weightOfPiece, data.recipe.elementB));// zużcie B
                $(`#useOfC_${cc}`).val(elUse(data.weightOfPiece, data.recipe.elementC));// zużycie C
                $(`#useOfD_${cc}`).val(elUse(data.weightOfPiece, data.recipe.elementD));// zużycie D
                $(`#palletNum_${cc}`).val(Math.ceil(Math.ceil(($(`#qty_${cc}`).val()) / data.piecesInCarton) / data.piecesOnPallet));//liczba palet

                ////////////////////////Total Values Event//////////////////////
                $(`#totalWeight`).val(round2Dec(totalCal('.pieceWeight', totalWeight)));//total weight
                $(`#totalA`).val(round2Dec(totalCal('.useOfA', totalA)));//total A
                $(`#totalB`).val(round2Dec(totalCal('.useOfB', totalB)));//total B
                $(`#totalC`).val(round2Dec(totalCal('.useOfC', totalC)));//total C
                $(`#totalD`).val(round2Dec(totalCal('.useOfD', totalD)));//total D
                $(`#totalPallets`).val(totalCal('.palletNum', totalPallets));//total pallets
                $(`#totalCartons`).val(totalCal('.cartonQty', totalCartons));//total cartons



            });
    });



    $('button[name=workHourCalc]').click(function (e) {
        e.preventDefault();
        console.log('działa');
        calcTime = 0;
        $(`.totalTime`).empty;
        $(`.prodEnd`).empty;
        $(`.prodTime`).empty();
        $(`.planStart`).empty();


        myArr = []

        for (let index = 1; index < $('#tbl_posts_body tr').length; index++) {
            selValT = ""

            selValT = $(`#product_${index} option:selected`).val()

            $.ajax({
                method: "GET",
                url: "productForm/readproducts/" + selValT,
                async: false
            })

                .done(function (data) {

                    console.log(index)

                    var partS = (time_convert(timeToSec($('#getStart').val()) + calcTime));
                    var prodT = (time_convert($(`#qty_${index}`).val() * data.packingTimes[$(`#lineSelect`).val()]))

                    $(`#planStart_${index}`).val(partS)//////

                    calcTime = calcTime + ($(`#qty_${index}`).val() * data.packingTimes[$(`#lineSelect`).val()])

                    $(`#prodTime_${index}`).val(prodT)

                    $(`#totalTime`).val(time_convert(calcTime))

                    $(`#prodEnd`).val(time_convert(calcTime + timeToSec($('#getStart').val())))

                    let myObj = {
                        prodOrder: $(`#prodOrder`).val(),
                        prodLine: $(`#lineSelect`).val(),
                        prodDate: $(`#prodDate`).val(),
                        sequence: index,
                        productName: $(`#product_${index} option:selected`).data('id2'),
                        productId: $(`#product_${index} option:selected`).val(),
                        orderQty: $(`#qty_${index}`).val(),
                        orderWeight: $(`#pieceWeight_${index}`).val(),
                        cartonQty: $(`#cartonQty_${index}`).val(),
                        palletQty: $(`#palletNum_${index}`).val(),
                        planProdTime: prodT,
                        planPartStart: partS,
                        useOfA: $(`#useOfA_${index}`).val(),
                        useOfB: $(`#useOfB_${index}`).val(),
                        useOfC: $(`#useOfC_${index}`).val(),
                        useOfD: $(`#useOfD_${index}`).val(),
                        status: "aktywny",
                        addDate: Date()
                    }

                    myArr.push((myObj));

                })
        }
    }
    )
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    $('button[name=confirm]').click(function (e) {

        $.post("productForm/test", {
            method: "POST",
            data: myArr,
            dataType: 'json'
        })
    })
});









