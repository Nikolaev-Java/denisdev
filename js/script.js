'use strict'
/* ------Проверка на тип утройства (десктоп или смартфот) ----------*/
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/EIMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
if (isMobile.any()) {
	document.body.classList.add("_touch");
	let menuArow = document.querySelectorAll('.item-porfolio__arrow');
	for (let i = 0; i < menuArow.length; i++) {
		const element = menuArow[i];
		element.addEventListener("click", function (e) {
			element.classList.toggle("_active");
			let el = element.nextElementSibling;
			if (el.style.maxHeight) {
				el.style.maxHeight = null;
				el.style.padding = null;
			} else {
				el.style.maxHeight = el.scrollHeight + 40 + "px";
				el.style.padding = 20 + "px"
			}
		})
	}

} else {
	document.body.classList.add("_pc");
}
/* ------Проверка на тип утройства (десктоп или смартфот)------------ */

/* ------------------------Меню бургер ------------------------------*/
const burgerIcon = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.menu__body');
if (burgerIcon && burgerMenu) {
	burgerIcon.addEventListener("click", function (e) {
		burgerIcon.classList.toggle("_active");
		burgerMenu.classList.toggle("_active");
		document.body.classList.toggle("_lock");
	})
}
/* ------------------------Меню бургер ------------------------------*/

/* -------Затемнение хедера при достижения основного контента--------*/
window.addEventListener('scroll', function (e) {
	const header = document.querySelector('.header');
	let backGroundColor = "rgba(12, 21, 29,";
	let widthScreen = document.documentElement.clientWidth;
	if (this.window.pageYOffset > 400) {
		header.style.backgroundColor = backGroundColor + "0.95)";
	}
	if (widthScreen < 768) {
		if (this.window.pageYOffset <= 200) {
			header.style.backgroundColor = backGroundColor + `${this.window.pageYOffset * 0.00475})`;
		}
	} else {
		if (this.window.pageYOffset <= 400) {
			header.style.backgroundColor = backGroundColor + `${this.window.pageYOffset * 0.002375})`;
		}
	}
}
)
/* -------Затемнение хедера при достижения основного контента--------*/

/* -----------------Скоролл до блока по ссылке-----------------------*/
const headerLink = document.querySelectorAll('.menu__link[data-goto]');
if (headerLink) {
	headerLink.forEach(headerLinks => {
		headerLinks.addEventListener("click", function (e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const goToBlock = document.querySelector(menuLink.dataset.goto);
				const goToBlockPosition = goToBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
				if (burgerIcon.classList.contains("_active")) {
					burgerIcon.classList.remove("_active");
					burgerMenu.classList.remove("_active");
					document.body.classList.remove("_lock");
				}
				window.scrollTo({
					top: goToBlockPosition,
					behavior: "smooth"
				});
				e.preventDefault();
			}

		})
	});
}
/* -----------------Скоролл до блока по ссылке-----------------------*/

/* -------------------------Обработка формы--------------------------*/
const form = document.getElementById("form");
form.addEventListener('submit', formSend);
async function formSend(e) {
	e.preventDefault();
	let error = inputValidation(form);



	if (error == 0) {
		let formData = new FormData(form);
		for (const [name, value] of formData) {
			console.log(`${name} = ${value}`);
		}
		form.classList.add("_sending");
		let response = await fetch('sendmail.php', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			let result = await response.json();
			alert(result.message);
			form.reset();
			form.classList.remove("_sending");
		} else {
			alert('ошибка');
			form.classList.remove("_sending");
		}
	}
}
function inputValidation(form) {
	let error = 0;
	const input = document.querySelectorAll("._req");
	for (let index = 0; index < input.length; index++) {
		const element = input[index];
		removeError(element);
		if (element.value == "") {
			addError(element);
			error++;
		} else {
			if (element.id == "email") {
				if (validEmail(element)) {
					addError(element);
					error++;
				}
			}
		}
	}
	return error;
}
function addError(input) {
	input.classList.add("_error");
	input.parentElement.classList.add("_error")
	input.classList.toggle("_anim")
}
function removeError(input) {
	input.classList.remove("_error");
	input.parentElement.classList.remove("_error")
}
function validEmail(input) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)) {
		document.querySelector(`.form__error--email`).textContent = "Введите E-mail";
		return false;
	} else {
		document.querySelector(`.form__error--email`).textContent = "не коректный email";
		return true;
	}
}
const input = document.querySelectorAll(".input");
console.log(document.querySelector(`.${input[0].className} + .form__error`));
input.forEach(input => {
	input.addEventListener("change", function () {
		removeError(input);
	})
});
input.forEach(input => {
	input.addEventListener("animationend", function () {
		input.classList.remove("_anim")
	})
});
const inputFile = document.getElementById("file");
inputFile.addEventListener("change", () => {
	uploadFile(inputFile.files[0]);
});
function uploadFile(file) {
	removeError(inputFile);
	if (!/\.psd|fig|sketh$/.test(file.name)) {
		addError(inputFile);
		inputFile.value = "";
		return;
	}
	if (file.size > 5 * 1024 * 1024) {
		addError(inputFile);
		document.querySelector('.form__error--file').textContent = "размер файла не должен превышать 5 Мб";
		inputFile.value = "";
		return;
	} else {
		document.querySelector('.form__error--file').textContent = "неверный формат файла";
	}

}





/* const block = new Map();
const blockHeight = new Array();
for (let index = 0; index < headerLink.length; index++) {
	const element = headerLink[index];
	if (element.dataset.goto && document.querySelector(element.dataset.goto)) {
		block.set(document.querySelector(element.dataset.goto).getBoundingClientRect().top, document.querySelector(element.dataset.goto));
		blockHeight.push(document.querySelector(element.dataset.goto).getBoundingClientRect().top);
	}
}
console.log(block);
console.log(blockHeight);


document.addEventListener("scroll", function (e) {
	console.log(scrollY);
	if()
}) */