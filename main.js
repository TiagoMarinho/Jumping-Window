class Size {
	constructor (width, height) {
		this.width = width
		this.height = height
	}
}
class Point {
	constructor (x, y) {
		this.x = x
		this.y = y
	}
}

class Window {
	#window = null
	#size = null
	#position = null
	title = ``
	content = ``
	constructor (position, size) {
		this.position = position
		this.size = size
	}
	open () {
		this.#window = window.open(``, this.title, `width=${this.#size.width}`, `height=${this.#size.height}`)
		this.size = this.size
		this.#window.document.write(this.content)
	}
	set size (size) {
		this.#size = size

		if (this.isOpen) {
			this.#window.resizeBy(size.width - this.#window.outerWidth, size.height - this.#window.outerHeight)
		}
	}
	get size () {
		return this.#size
	}
	set position (point) {
		this.#position = point

		if (this.isOpen) {
			this.#window.moveTo(point.x, point.y)
		}
	}
	get position () {
		return this.#position
	}
	get isOpen () {
		return this.#window && !this.#window.closed
	}
}

const start = _ => {
	const position = new Point(0, 0),
		size = new Size(300, 200)

	const myWindow = new Window(position, size)
	myWindow.open()

	let velocity = {dx: 10, dy: 10}

	const integrator = _ => {
		const x = myWindow.position.x + velocity.dx,
			y = myWindow.position.y + velocity.dy,
			position = new Point(x, y)

		myWindow.position = position
	}

	const collisionHandler = _ => {
		if (myWindow.position.x + myWindow.size.width > screen.availWidth ||
			myWindow.position.x < 0) {
			velocity.dx *= -1
		}
		if (myWindow.position.y + myWindow.size.height > screen.availHeight ||
			myWindow.position.y < 0) {
			velocity.dy *= -1
		}
	}

	setInterval(_ => {
		integrator()
		collisionHandler()

	}, 1000 / 60)
}
const stop = _ => {

}