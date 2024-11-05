// FUNCIÓN PARA INICIO DE SESIÓN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Redirige al usuario a la página principal
            window.location.href = 'home.html';
        } else {
            // Muestra un alert en caso de error
            alert(data.message || 'Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor. Inténtalo de nuevo.');
    }
});


// FUNCIÓN PARA REGISTRO
document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const usuario = document.getElementById('register-usuario').value;
    const password = document.getElementById('register-password').value;
    const ciudad = document.getElementById('ciudad').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    try {
        const response = await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                usuario: usuario,
                password: password,
                ciudad: ciudad,
                email: email,
                telefono: telefono,
                direccion: direccion
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso!');
            this.reset(); 
        } else {
            alert(data.message || 'Error en el registro'); 
        }
    } catch (error) {
        alert('Error en el servidor. Inténtalo de nuevo.');
        console.error('Error:', error);
    }
});

