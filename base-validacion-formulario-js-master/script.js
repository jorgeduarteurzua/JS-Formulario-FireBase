// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


// Agregamos event listener al submit

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo Nombre

    let entradaNombre = document.getElementById('name')
    let errorNombre   = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Debe Introducir el Nombre'
        errorNombre.classList.add('error-message')
    } else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    // Validar correo electronico

    let emailEntrada = document.getElementById('email')
    let errorEmail   = document.getElementById('emailError')
    // RegEx Email
    const emailPattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // Si no cumple el formato de correo
    if (!emailPattern.test(emailEntrada.value)){
        errorEmail.textContent = 'Debe Introducir un Correo Válido'
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }
    
    // Validar Contraseña

    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError   = document.getElementById('passwordError')
    let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    // Validamos que la contraseña tenga por lo menos 6 caracteres
    if (!regexp_password.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener entre 8-15 Caracteres, al menos 1 Mayúscula, al menos 1 Minúscula, al menos 1 digito, al menos 1 caracter especial'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')      
    }
    // Si todos los campos son validos enviamos formulario
    // usamos ! para negar si no tiene datos
    if (!errorNombre.textContent && !errorEmail.textContent && ! contrasenaError.textContent) {

        // Backend que reciba la información
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
             // Limpiamos el formulario
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

    }
})