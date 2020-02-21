$(() => {

    const nameInput = $('#name__input');
    nameInput.on('input', () => {
        let value = nameInput.val();
        nameInput.val(value.replace(/[^А-яЁё\s\-]/g, ''));
    });

    const phoneInput = $('#phone__input');
    phoneInput.on('input', () => {
        let value = phoneInput.val();
        phoneInput.val(value.replace(/[^0-9\-\+\s]/g, ''));
    });

    const mailInput = $('#email__input');
    mailInput.on('input', () => {
        let value = mailInput.val();
        mailInput.val(value.replace(/[^a-zA-Z0-9\@\_\.]/g, ''));
    });

    $('#submit-form__btn').click(() => {
        const data = {};
        $("#question-form__form").serializeArray().forEach((el) => {
            data[el.name] = el.value;
        });

        let error = "";
        if (!data["name"] || !data["name"].replace(/\s/g, '').length) {
            error += "Не указано имя. "
        }

        if (!data["phone"] || !data["phone"].replace(/\s/g, '').length) {
            error += "Не указан телефон. "
        }

        const regExpMailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (data["email"] && data["email"].replace(/\s/g, '').length) {
            if (!regExpMailValidation.test(data["email"])) {
                error += "Некорретный email. "
            }
        }

        if (error) {
            error = "Заполните форму корректно. " + error;
            alert(error);
            return;
        }

        $.ajax({
            type: "POST",
            url: "https://digital-spectr.com/ac/academy.php",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: (msg) => alert("Form Submitted: " + JSON.stringify(msg)),
            error: (msg) => alert("Error: " + JSON.stringify(msg))
        });
    });
});