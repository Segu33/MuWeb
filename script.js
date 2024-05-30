document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = [
        { src: 'images/image1.jpg', alt: 'Criaturas Miticas' },
        { src: 'images/image2.jpg', alt: 'Eventos' },
        { src: 'images/image3.jpg', alt: 'Guerra de clanes' }
    ];

    const carouselContainer = document.getElementById('carousel-container');

    const createCarousel = (images) => {
        let carouselIndicators = '<ol class="carousel-indicators">';
        let carouselInner = '<div class="carousel-inner">';

        images.forEach((image, index) => {
            const isActive = index === 0 ? 'active' : '';
            carouselIndicators += `<li data-target="#myCarousel" data-slide-to="${index}" class="${isActive}"></li>`;
            carouselInner += `
                <div class="item ${isActive}">
                    <img src="${image.src}" alt="${image.alt}" style="width:100%;">
                    <div class="carousel-caption">
                        <h3>${image.alt}</h3>
                    </div>
                </div>`;
        });

        carouselIndicators += '</ol>';
        carouselInner += '</div>';

        const carouselControls = `
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
            </a>`;

        carouselContainer.innerHTML = `
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                ${carouselIndicators}
                ${carouselInner}
                ${carouselControls}
            </div>`;
    };

    createCarousel(carouselImages);

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let hasError = false;

        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        document.getElementById('ltaErrores').innerHTML = '';
        document.getElementById('submittedData').innerHTML = '';

        const Nombre = document.getElementById('Nombre').value.trim();
        const Email = document.getElementById('Email').value.trim();
        const Edad = document.getElementById('Edad').value.trim();
        const Mensaje = document.getElementById('Mensaje').value.trim();

        
        const errores = [];
        const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Nombre === '') {
            errores.push('Falta el nombre');
            document.getElementById('nameError').textContent = 'El nombre es obligatorio.';
        } else if (Nombre.length > 15) {
            errores.push('Nombre muy largo (15 caracteres)');
            document.getElementById('nameError').textContent = 'El nombre debe tener menos de 15 caracteres.';
        }

        if (Email === '') {
            errores.push('El correo electrónico es obligatorio.');
            document.getElementById('emailError').textContent = 'El correo electrónico es obligatorio.';
        } else if (!EmailRegex.test(Email)) {
            errores.push('El correo electrónico no es válido.');
            document.getElementById('emailError').textContent = 'El correo electrónico no es válido.';
        }

        if (Edad === '') {
            errores.push('La edad es obligatoria');
            document.getElementById('ageError').textContent = 'La edad es obligatoria.';
        } else if (isNaN(Edad) || Edad <= 0) {
            errores.push('La edad debe ser un número positivo.');
            document.getElementById('ageError').textContent = 'La edad debe ser un número positivo.';
        }

        if (Mensaje === '') {
            errores.push('El mensaje es obligatorio');
            document.getElementById('messageError').textContent = 'El mensaje es obligatorio.';
        } else if (Mensaje.length > 300) {
            errores.push('El mensaje debe tener menos de 300 caracteres.');
            document.getElementById('messageError').textContent = 'El mensaje debe tener menos de 300 caracteres.';
        }

    
        if (errores.length > 0) {
            hasError = true;
            const ltaErrores = document.getElementById('ltaErrores');
            errores.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                ltaErrores.appendChild(li);
            });
        }

        
        if (!hasError) {
            const submittedData = document.getElementById('submittedData');

            const nameElement = document.createElement('p');
            nameElement.textContent = `Nombre: ${Nombre}`;
            submittedData.appendChild(nameElement);

            const emailElement = document.createElement('p');
            emailElement.textContent = `Correo Electrónico: ${Email}`;
            submittedData.appendChild(emailElement);

            const ageElement = document.createElement('p');
            ageElement.textContent = `Edad: ${Edad}`;
            submittedData.appendChild(ageElement);

            const messageElement = document.createElement('p');
            messageElement.textContent = `Mensaje: ${Mensaje}`;
            submittedData.appendChild(messageElement);

            const successMessage = document.createElement('p');
            successMessage.textContent = '¡En Breve nos Contactaremos con usted!';
            successMessage.classList.add('success');
            submittedData.appendChild(successMessage);

            form.reset();
        }
    });
});

