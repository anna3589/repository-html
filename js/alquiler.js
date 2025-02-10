const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    // Подія для відкриття календаря
    dateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.showPicker) {
                this.showPicker(); // Викликає календар в браузерах, що підтримують showPicker()
            }
        });
        
        input.addEventListener('change', function() {
            const selectedDate = this.value;
            // Оновлюємо текст в span при виборі дати
            const selectedDateSpan = this.closest('.dropdown').querySelector('.selected');
            selectedDateSpan.textContent = selectedDate ? selectedDate : 'Select date';
        });
    });

    // Подія для відкриття меню
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    // Події для вибору опції з меню
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            selected.classList.add("text-fade-in");

            setTimeout(() => {
                selected.classList.remove("text-fade-in");
            }, 300);

            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');
        });
    });

    // Закриття меню при натисканні за межами
    window.addEventListener("click", e => {
        const size = dropdown.getBoundingClientRect();
        if (
            e.clientX < size.left ||
            e.clientX > size.right ||
            e.clientY < size.top ||
            e.clientY > size.bottom
        ) {
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
        }
    });
});
