const baseUrl = 'http://localhost:8080/api/gastos';

$(document).ready(function() {
    $(".alert").hide();

    $.ajax({
        type: 'GET',
        url: baseUrl,
        success: function(data) {
            data.forEach(gasto => {
                const html = '<tr>' +
                    '<td>' + gasto.id + '</td>' +
                    '<td>' + gasto.nome + '</td>' +
                    '<td>' + gasto.data + '</td>' +
                    '<td>' + 'R$ ' + gasto.valor + '</td>' +
                    '<td>' + '<button type="button" data-id="' + gasto.id + '" class="btn btn-outline-danger btnDeletar">Remover</button>' + '</td>' +
                    '</tr>';
                $("#gasto_content").append(html);
            });
        }
    });

    $('#btnCadastrar').click(function() {
        let gasto = {
            nome: $("#nome").val(),
            data: $("#data").val(),
            valor: $("#valor").val()
        };

        if (gasto.valor === "" || gasto.data === "" || gasto.valor === "") {
            $(".alert-danger").fadeIn("slow").delay(2000);
            $(".alert-success").hide();
        } else {
            $.ajax({
                type: 'POST',
                url: baseUrl,
                data: JSON.stringify(gasto),
                contentType: 'application/json',
                success: function(status) {
                    $(".alert-success").fadeIn("slow").delay(2000).fadeOut(1000);
                    $(".alert-danger").hide();
                    $("#nome").val("");
                    $("#data").val("");
                    $("#valor").val("");
                }
            });
        }
    });

    $('#btnEditar').click(function() {
        let gasto = {
            id: $("#id").val(),
            nome: $("#nome").val(),
            data: $("#data").val(),
            valor: $("#valor").val()
        };

        if (gasto.valor === "" || gasto.data === "" || gasto.valor === "") {
            $(".alert-danger").fadeIn("slow").delay(2000);
            $(".alert-success").hide();
        } else {
            $.ajax({
                type: 'PUT',
                url: baseUrl + '/' + gasto.id,
                data: JSON.stringify(gasto),
                contentType: 'application/json',
                success: function(status) {
                    setTimeout(function() {
                        window.location.href = "index.html";
                    }, 1000);
                    $(".alert-success").fadeIn("slow").delay(2000).fadeOut(1000);
                    $(".alert-danger").hide();
                    $("#id").val(status.id);
                    $("#nome").val(status.nome);
                    $("#data").val(status.data);
                    $("#valor").val(status.valor);
                }
            });
        }
    });

    $(document).on('click', '.btnDeletar', function() {
        let gastoId = $(this).data('id');

        if (!gastoId) {
            $(".alert-danger").fadeIn("slow").delay(2000);
            $(".alert-success").hide();
        } else {
            if (confirm('Você deseja remover esse gasto?')) {
                $.ajax({
                    type: 'DELETE',
                    url: baseUrl + '/' + gastoId,
                    contentType: 'application/json',
                    success: function(status) {
                        $("#excluir").fadeIn("slow").delay(2000).fadeOut(1000);
                        setTimeout(function() {
                            window.location.href = "index.html";
                        }, 1000);
                        $(".alert-success").fadeIn("slow").delay(2000).fadeOut(1000);
                        $(".alert-danger").hide();
                        $("#id").val(status.id);
                    }
                });
            }
        }
    });
});
