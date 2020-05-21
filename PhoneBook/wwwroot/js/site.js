// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function loading() {
    $('#progressContainer').show();
    $('#data').hide();
    $('#searchPhoneBookItems').addClass('disabled')
            .prop('disabled', true);
}

function loaded() {
    $('#progressContainer').hide();
    $('#data').show();
    $('#searchPhoneBookItems').removeClass('disabled')
        .prop('disabled', false);
}

function cleanTable() {
    $('#data tbody tr').each(function () {
        $(this).remove();
    });
}

function addPhoneBookItem(item) {
    const row = document.createElement('tr');
    $(row).appendTo($('#data tbody'));

    const nameCol = document.createElement('td');
    $(nameCol).text(item.name).appendTo(row);

    const emailCol = document.createElement('td');
    $(emailCol).text(item.eMail).appendTo(row);

    const phoneCol = document.createElement('td');
    $(phoneCol).text(item.phone).appendTo(row);

    const mobilePhoneCol = document.createElement('td');
    $(mobilePhoneCol).text(item.mobilePhone).appendTo(row);
}

async function searchPhoneBookItems() {
    const term = $('#term').val();

    await getPhoneBookItems(term);
}

async function getPhoneBookItems(term) {
    let url = '/Home/SearchPhoneBookItems';

    if (term != null) {
        url += `?term=${term}`;
    }

    loading();
    cleanTable();

    const result = await fetch(url);

    if (result.ok) {
        const data = await result.json();

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            addPhoneBookItem(item);
        }
    } else {
        alert("Не удалось получить данные справочника!");
    }

    loaded();
}