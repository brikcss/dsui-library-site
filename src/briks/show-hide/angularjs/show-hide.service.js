function ShowHideService() {
	const service = {
		all: {},
		init,
		toggle,
		open,
		close,
		destroy,
	};

	function init(id, element, options = {}) {
		// Cache elements.
		service.all[id] = {
			element: element,
			active: false,
			options,
		};
		// Build DOM.
		element.classList.add('show-hide');
		if (options.addIcon) {
			let parentElement = element;
			if (options.hasToggle) {
				parentElement = element.children[0];
			}
			service.all[id].icon = document.createElement('span');
			service.all[id].icon.classList.add('show-hide__icon');
			parentElement.appendChild(service.all[id].icon);
		}
		// Set initial state.
		if (options.open) {
			open(id);
		} else {
			close(id);
		}
		// Return show hide item.
		return service.all[id];
	}

	function toggle(id) {
		if (!service.all[id]) return false;
		if (service.all[id].element.classList.contains('show-hide--is-active')) {
			close(id);
		} else {
			open(id);
		}
	}

	function open(id) {
		let height = 0;
		Array.from(service.all[id].element.children).forEach((child) => {
			height += child.offsetHeight;
		});
		service.all[id].element.style.height = height + 'px';
		service.all[id].element.classList.add(`show-hide--is-active`);
		service.all[id].active = true;
	}

	function close(id) {
		let height = 0;
		if (service.all[id].options.hasToggle) {
			height = service.all[id].element.children[0].offsetHeight;
		}
		service.all[id].element.style.height = height + 'px';
		service.all[id].element.classList.remove('show-hide--is-active');
		service.all[id].active = false;
	}

	function destroy(id) {
		delete service.all[id];
	}

	return service;
}

export default ShowHideService;
