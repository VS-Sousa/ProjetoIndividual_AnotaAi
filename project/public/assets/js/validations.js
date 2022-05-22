function validateEmail(email) {
    var result = 'OK';

    if (email == undefined) {
        result = 'Email está indefinido';
        
    } else if (email == '') {
        result = 'Email é obrigatório';

    } else {
        var positionAt = email.indexOf('@');

        if (positionAt <= 0) {
            result = 'Email em formato inválido';

        } else {
            var posicaoDot = email.indexOf('.', positionAt)
        
            if (posicaoDot <= 2) {
                result = 'Email em formato inválido';

            } else {
                var rest = email.slice(posicaoDot, -1);

                if (rest.length < 1) {
                    result = 'Email em formato inválido'
                }
            }
        }
    }
    
    return result;
}

function validateNickname(nickname) {
    var result = 'OK';

    if (nickname == undefined) {
        result = 'Apelido é indefinido';
    } else if (nickname == '') {
        result = 'Apelido é obrigatório';
    } else {
        var hasAt = nickname.includes('@');
        
        if (hasAt) {
            result = "Apelido não pode conter '@'";
        }
    }

    return result;
}