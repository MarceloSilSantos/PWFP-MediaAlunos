document.addEventListener("DOMContentLoaded", function() {
    var verificarBtn = document.querySelector('.btn-verificar');
    var addAlunoBtn = document.querySelector('.btn-add-aluno');
    var addColunaBtn = document.querySelector('.btn-add-coluna');
    
    verificarBtn.addEventListener('click', function() {
        calcularMedias();
    });
    
    addAlunoBtn.addEventListener('click', function() {
        adicionarAluno();
    });
    
    addColunaBtn.addEventListener('click', function() {
        adicionarColuna();
    });
});

function calcularMedias() {
    var linhas = document.querySelectorAll('tbody tr');
    linhas.forEach(function(linha) {
        var notas = linha.querySelectorAll('.nota');
        var somaNotas = 0;
        var numNotasValidas = 0;
        notas.forEach(function(nota) {
            var valorNota = parseFloat(nota.value);
            if (!isNaN(valorNota)) {
                somaNotas += valorNota;
                numNotasValidas++;
            }
        });
        var media = numNotasValidas > 0 ? somaNotas / numNotasValidas : 0;
        linha.querySelector('.media').textContent = media.toFixed(2);
        
        // Determinar a situacao do aluno e alterar a cor da celula de status
        var situacaoCell = linha.querySelector('.situacao');
        if (media >= 65) {
            situacaoCell.textContent = 'Aprovado';
            situacaoCell.classList.add('aprovado');
            situacaoCell.classList.remove('recuperacao');
            situacaoCell.classList.remove('reprovado');
        } else if (media >= 50) {
            situacaoCell.textContent = 'Recuperacao';
            situacaoCell.classList.add('recuperacao');
            situacaoCell.classList.remove('aprovado');
            situacaoCell.classList.remove('reprovado');
        } else {
            situacaoCell.textContent = 'Reprovado';
            situacaoCell.classList.add('reprovado');
            situacaoCell.classList.remove('aprovado');
            situacaoCell.classList.remove('recuperacao');
        }
    });
}

function adicionarAluno() {
    var tbody = document.querySelector('tbody');
    var rowCount = tbody.rows.length;
    var newRow = tbody.insertRow(rowCount);
    var cellCount = tbody.rows[0].cells.length;

    for (var i = 0; i < cellCount; i++) {
        var newCell = newRow.insertCell(i);
        if (i === 0) {
            newCell.innerHTML = rowCount;
        } else if (i === cellCount - 2) {
            newCell.innerHTML = '<output class="media"></output>';
        } else if (i === cellCount - 1) {
            newCell.innerHTML = '<output class="situacao"></output>';
        } else {
            newCell.innerHTML = '<input type="number" class="form-control nota" placeholder="">';
        }
    }
}

function adicionarColuna() {
    var table = document.querySelector('table');
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
        var newRow = table.rows[i];
        var cellCount = newRow.cells.length;
        var newCell = newRow.insertCell(cellCount - 2);
        if (i === 0) {
            newCell.innerHTML = 'Nota' + cellCount-4;
        } else {
            newCell.innerHTML = '<input type="number" class="form-control nota" placeholder="">';
        }
    }
}
function deletarColuna(btn) {
    var colunaIndex = btn.parentElement.cellIndex;
    var table = document.querySelector('table');
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
        var row = table.rows[i];
        row.deleteCell(colunaIndex);
    }
}