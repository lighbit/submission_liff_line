function getAllMimpi() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app += '<div class="panel panel-default">'+
                '<div class="panel-heading"><h2>Daftar Mimpiku</h2></div>'+
                '<table class="table">'+
                '<thead>' +
                    '<th>ID</th>' +
                    '<th>Nama</th>' +
                    '<th>Tanggal</th>' +
                    '<th>Email</th>' +
                    '<th>Mimpimu</th>' +
                    '<th>Hapus Mimpimu :(</th>' +
                    '<th>Lihat Mimpimu</th>' +
                    '<th>Edit Mimpimu</th>' +
                '</thead> <tbody>';
 
            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id_data + ' </td>' +
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].tanggal + ' </td>' +
                    '<td>' + list_data[i].email + ' </td>' +
                    '<td>' + list_data[i].agenda + ' </td>' +
                    '<td><a class="btn btn-danger btn-xs" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>' +
                    '<td><a class="btn btn-danger btn-xs" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a></td>' +
                    '<td><a class="btn btn-warning btn-xs" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Edit</a></td>';
                data_app += '</tr>';
            }
 
            data_app += '</tbody></table>';
 
        }
        else {
            data_app += 

            '<div class="jumbotron">' +
                '<h1>ADUH!</h1>' +
                '<p>mimpi Kosong :( ayo mengejar mimpi dengan buat mimpi. <br><b>klik Tambah Mimpi diatas</b></p>' +
            '</div>';
        }
 
 
        $('#list-mimpi').html(data_app);
        $('#list-mimpi').hide();
        $('#list-mimpi').fadeIn(100);
    }
}

// function callMenus(){
//     document.getElementById("callM").click(function(){
//         gantiMenu('tambah-mimpi');
//     })
// }
 
function editData(id) {
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#enama").val(list_data[i].nama);
                $("#etanggal").val(list_data[i].tanggal);
                $("#eemail").val(list_data[i].email);
                $("#eagenda").val(list_data[i].agenda);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');
 
    }
 
}
 
function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lnama").val(list_data[i].nama);
                $("#ltanggal").val(list_data[i].tanggal);
                $("#lemail").val(list_data[i].email);
                $("#lagenda").val(list_data[i].agenda);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');
 
    }
}
 
 
function simpanData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "mimpi baru berhasil disimpan yeay!"
        }]).then(function() {
            alert('mimpi Tersimpan');
        }).catch(function(error) {
            alert('Ada kesalahan nih...');
        });
    }
 
    nama = $('#nama').val();
    tanggal = $('#tanggal').val();
    email = $('#email').val();
    agenda = $('#agenda').val();
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'tanggal': tanggal, 'email': email, 'agenda': agenda });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-mimpi');
 
    return false;
}
 
function simpanEditData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Editanmu Sudah di save"
        }]).then(function() {
            alert('mimpi tersimpan');
        }).catch(function(error) {
            alert('Ada kesalahan nih...');
        });
    }
 
    id_data = $('#eid_data').val();
    nama = $('#enama').val();
    tanggal = $('#etanggal').val();
    agenda = $('#eagenda').val();
 
    list_data.push({ 'id_data': id_data, 'nama': nama, 'tanggal': tanggal, 'email': email, 'agenda': agenda });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-mimpi');
 
    return false;
}
 
function hapusData(id) {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Mimpi sudah terhapus :("
        }]).then(function() {
            alert('Mimpi sudah dihapus :(');
        }).catch(function(error) {
            alert('Ada kesalahamn');
        });
    }
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
 
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
 
        localStorage.setItem('list_data', JSON.stringify(list_data));
        getAllMimpi();
    }
}
 
 
function gantiMenu(menu) {
    if (menu == "list-mimpi") {
        getAllMimpi();
        $('#tambah-mimpi').hide();
        $('#list-mimpi').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
        $('#fun-fact').hide();
    }
    else if (menu == "tambah-mimpi") {
        $('#tambah-mimpi').fadeIn();
        $('#list-mimpi').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-mimpi').hide();
        $('#list-mimpi').hide();
        $('#lihat-data').hide();
        $('#fun-fact').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-mimpi').hide();
        $('#list-mimpi').hide();
        $('#fun-fact').hide();
    } else if (menu == "fun-fact") {
        $('#lihat-data').hide();
        $('#edit-data').hide();
        $('#tambah-mimpi').hide();
        $('#list-mimpi').hide();
        $('#fun-fact').fadeIn();
    }
}