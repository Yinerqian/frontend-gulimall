import Vue from "vue"
Vue.directive('drag', (() => {
    // Debouncer to prevent tons of resize events
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(this, args);
            }, wait);
        };
    }

    // Should probably be set by the binding
    // Need to disable the resize event if this is changed because it changes right and bottom
    let constraints = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0
    };


    // Keep track of the top left of the item
    let initialPos = { x: 0, y: 0 };

    // Helper functions to keep track of events
    function on(vnode, target, fn, ...args) {
        vnode.dragEvents.push({ context: this, target, fn, args });
        this.addEventListener(target, fn, ...args);
    }
    function off(vnode, target, fn, ...args) {
        vnode.dragEvents.filter(e => e.target !== target || e.fn !== fn);
        this.removeEventListener(target, fn, ...args);
    }

    // For physics
    let positions = [];

    return {
        bind(el, binding, vnode) {
            var _context;
            vnode.animId = null;
            vnode.dragEvents = [];

            // Default options
            let weight = binding.value && binding.value.weight || 1;
            let friction = binding.value && binding.value.friction || 0.9;
            let minDistance = binding.value && binding.value.minDistance || 5;

            vnode.dragResize = () => {
                let bounds = el.getBoundingClientRect();
                let matches = el.style.transform.match(/translate\((-?[\d\.]*)px, (-?[\d\.]*)/);
                let offX = matches && +matches[1] || 0;
                let offY = matches && +matches[2] || 0;
                vnode.dragInitialPos = { x: bounds.x - offX, y: bounds.y - offY };
                constraints.right = window.innerWidth;
                constraints.bottom = window.innerHeight;
            };

            (_context = window, on).call(_context, vnode, 'resize', vnode.dragResize, { passive: true });

            // When Mouse pressed
            on.call(el, vnode, 'pointerdown', e => {
                var _context5;
                if (vnode.animId !== null) {
                    cancelAnimationFrame(vnode.animId);
                    vnode.animId = null;
                }
                el.classList.toggle('pressed', true);

                // Page position
                let start = { x: e.x, y: e.y };
                // Local position so the item can be dragged from any arbitrary point
                let offset = { x: e.offsetX, y: e.offsetY };

                // Handler to start the dragging
                let move = e => {
                    // Waits until the item has been dragged the minimum defined distance
                    // Helps with interactive items with inputs, buttons, etc. to prevent accidental dragging
                    if (Math.hypot(e.x - start.x, e.y - start.y) > minDistance) {
                        var _context2;
                        // Remove this event so it only occurs once
                        (_context2 = document, off).call(_context2, vnode, 'pointermove', move, { passive: true });
                        // Remove the old cancel event since we are already dragging
                        (_context2 = document, off).call(_context2, vnode, 'pointerup', pointerup, { passive: true });

                        let pos = { x: e.x, y: e.y };

                        // Setup dragging
                        el.classList.toggle('dragging', true);

                        // Drag handler
                        let drag = e => {
                            vnode.context.$emit('drag', e);

                            // Find the max right and bottom from where the element is being held
                            let right = offset.x - el.offsetWidth;
                            let bottom = offset.y - el.offsetHeight;

                            // Clamp the position in the constraints
                            pos.x = Math.min(Math.max(constraints.left + offset.x, e.x), constraints.right + right);
                            pos.y = Math.min(Math.max(constraints.top + offset.y, e.y), constraints.bottom + bottom);

                            // Remove positions from more than 75ms ago
                            let index = positions.findIndex(p => e.timeStamp - p.timeStamp > 75);
                            if (index >= 0) {
                                positions.splice(index);
                            }
                            // Add current position at the beginning of the array
                            positions.unshift({ x: pos.x, y: pos.y, timeStamp: e.timeStamp });

                            // Set the transform to actually move the element
                            el.style.transform = `translate(${pos.x - vnode.dragInitialPos.x - offset.x}px, ${pos.y - vnode.dragInitialPos.y - offset.y}px)`;
                        };

                        let stopDrag = e => {
                            var _context3;
                            // Remove events now that dragging is over
                            (_context3 = document, off).call(_context3, vnode, 'pointermove', drag, { passive: true });
                            (_context3 = document, off).call(_context3, vnode, 'pointerup', stopDrag, { passive: true });

                            el.classList.toggle('pressed', false);
                            el.classList.toggle('dragging', false);

                            // Remove positions from more than 75ms ago
                            let index = positions.findIndex(p => e.timeStamp - p.timeStamp > 75);
                            if (index >= 0) {
                                positions.splice(index);
                            }

                            // Do physics
                            if (positions.length >= 2) {
                                // Calculate vectors from points available
                                let vectors = [];
                                for (let i = 0; i < positions.length - 1; i++) {
                                    let p1 = positions[i];
                                    let p2 = positions[i + 1];
                                    vectors.push({
                                        x: p1.x - p2.x,
                                        y: p1.y - p2.y
                                    });

                                }

                                // Average vectors
                                let average = {
                                    x: vectors.reduce((a, b) => a + b.x, 0) / vectors.length,
                                    y: vectors.reduce((a, b) => a + b.y, 0) / vectors.length
                                };


                                // Get average distance
                                let dist = Math.hypot(average.x, average.y);
                                let angle = Math.atan2(average.y, average.x);
                                let speed = dist / weight;

                                console.log(vectors);

                                let pos = positions[0];
                                positions = [];

                                // Physics
                                vnode.animId = requestAnimationFrame(function loop() {
                                    let right = offset.x - el.offsetWidth;
                                    let bottom = offset.y - el.offsetHeight;

                                    pos.x += speed * Math.cos(angle);
                                    pos.y += speed * Math.sin(angle);

                                    pos.x = Math.min(Math.max(constraints.left + offset.x, pos.x), constraints.right + right);
                                    pos.y = Math.min(Math.max(constraints.top + offset.y, pos.y), constraints.bottom + bottom);

                                    el.style.transform = `translate(${pos.x - vnode.dragInitialPos.x - offset.x}px, ${pos.y - vnode.dragInitialPos.y - offset.y}px)`;

                                    speed *= friction;

                                    if (speed > 0.1) {
                                        vnode.animId = requestAnimationFrame(loop);
                                    }
                                });
                            }
                        };

                        // Bind the drag events
                        (_context2 = document, on).call(_context2, vnode, 'pointermove', drag, { passive: true });
                        (_context2 = document, on).call(_context2, vnode, 'pointerup', stopDrag, { passive: true });
                    }
                };

                // Handler to cancel the drag start
                let pointerup = e => {
                    var _context4;
                    (_context4 = document, off).call(_context4, vnode, 'pointermove', move, { passive: true });
                    (_context4 = document, off).call(_context4, vnode, 'pointerup', pointerup, { passive: true });

                    el.classList.toggle('pressed', false);
                };

                // Bind the initial events
                (_context5 = document, on).call(_context5, vnode, 'pointermove', move, { passive: true });
                (_context5 = document, on).call(_context5, vnode, 'pointerup', pointerup, { passive: true });
            });
        },
        inserted(el, binding, vnode) {
            // Find the top left of the item once it is in the DOM
            let bounds = el.getBoundingClientRect();
            vnode.dragInitialPos = { x: bounds.left, y: bounds.top };
        },
        unbind(el, binding, vnode) {
            // Remove any remaining events in case it was removed while being dragged
            vnode.dragEvents.forEach(e => {
                var _context6;
                (_context6 = e.context, off).call(_context6, vnode, e.target, e.fn, ...e.args);
            });
        }
    };

})());
