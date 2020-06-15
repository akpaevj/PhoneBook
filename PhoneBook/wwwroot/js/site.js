// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function loading() {
    $('#term').addClass('disabled')
            .prop('disabled', true);
}

function loaded() {
    $('#term').removeClass('disabled')
        .prop('disabled', false)
        .focus();
}

function clearTable() {
    $('#data tbody').empty();
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
    clearTable();

    $.ajax({
        url: url,
        error: function () {
            alert("Не удалось получить данные справочника");
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                addPhoneBookItem(item);
            }
        },
        complete: loaded
    });

    //const result = await fetch(url);

    //if (result.ok) {
    //    const data = await result.json();

    //    for (let i = 0; i < data.length; i++) {
    //        const item = data[i];
    //        addPhoneBookItem(item);
    //    }
    //} else {
    //    alert("Не удалось получить данные справочника!");
    //}

    //loaded();
}