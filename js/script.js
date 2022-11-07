'use strict'
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

const burgerIcon = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.menu__body');
if (burgerIcon && burgerMenu) {
	burgerIcon.addEventListener("click", function (e) {
		burgerIcon.classList.toggle("_active");
		burgerMenu.classList.toggle("_active");
		document.body.classList.toggle("_lock");
	})
}

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
console.log(document.querySelector('.header').getBoundingClientRect().top);
const headerLink = document.querySelectorAll('.menu__link[data-goto]');
if (headerLink) {
	console.log(headerLink);
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