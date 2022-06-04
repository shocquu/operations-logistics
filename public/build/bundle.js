
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    const identity = x => x;
    function assign$1(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run$1(fn) {
        return fn();
    }
    function blank_object$1() {
        return Object.create(null);
    }
    function run_all$1(fns) {
        fns.forEach(run$1);
    }
    function is_function$1(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal$1(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe$1(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value$1(store) {
        let value;
        subscribe$1(store, _ => value = _)();
        return value;
    }
    function component_subscribe$1(component, store, callback) {
        component.$$.on_destroy.push(subscribe$1(store, callback));
    }
    function create_slot$1(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context$1(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context$1(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes$1(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context$1(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props$1(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props$1(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function set_store_value$1(store, ret, value) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop$1;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append$1(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element$1('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append$1(node.head || node, style);
    }
    function insert$1(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach$1(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each$1(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element$1(name) {
        return document.createElement(name);
    }
    function svg_element$1(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$1(data) {
        return document.createTextNode(data);
    }
    function space$1() {
        return text$1(' ');
    }
    function empty$1() {
        return text$1('');
    }
    function listen$1(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr$1(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr$1(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style$1(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event$1(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    function create_animation(node, from, fn, params) {
        if (!from)
            return noop$1;
        const to = node.getBoundingClientRect();
        if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
            return noop$1;
        const { delay = 0, duration = 300, easing = identity, 
        // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
        start: start_time = now() + delay, 
        // @ts-ignore todo:
        end = start_time + duration, tick = noop$1, css } = fn(node, { from, to }, params);
        let running = true;
        let started = false;
        let name;
        function start() {
            if (css) {
                name = create_rule(node, 0, 1, duration, delay, easing, css);
            }
            if (!delay) {
                started = true;
            }
        }
        function stop() {
            if (css)
                delete_rule(node, name);
            running = false;
        }
        loop(now => {
            if (!started && now >= start_time) {
                started = true;
            }
            if (started && now >= end) {
                tick(1, 0);
                stop();
            }
            if (!running) {
                return false;
            }
            if (started) {
                const p = now - start_time;
                const t = 0 + 1 * easing(p / duration);
                tick(t, 1 - t);
            }
            return true;
        });
        start();
        tick(0, 1);
        return stop;
    }
    function fix_position(node) {
        const style = getComputedStyle(node);
        if (style.position !== 'absolute' && style.position !== 'fixed') {
            const { width, height } = style;
            const a = node.getBoundingClientRect();
            node.style.position = 'absolute';
            node.style.width = width;
            node.style.height = height;
            add_transform(node, a);
        }
    }
    function add_transform(node, a) {
        const b = node.getBoundingClientRect();
        if (a.left !== b.left || a.top !== b.top) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;
            node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
        }
    }

    let current_component$1;
    function set_current_component$1(component) {
        current_component$1 = component;
    }
    function get_current_component$1() {
        if (!current_component$1)
            throw new Error('Function called outside component initialization');
        return current_component$1;
    }
    function onMount$1(fn) {
        get_current_component$1().$$.on_mount.push(fn);
    }
    function onDestroy$1(fn) {
        get_current_component$1().$$.on_destroy.push(fn);
    }
    function createEventDispatcher$1() {
        const component = get_current_component$1();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event$1(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext$1(key, context) {
        get_current_component$1().$$.context.set(key, context);
    }
    function getContext$1(key) {
        return get_current_component$1().$$.context.get(key);
    }

    const dirty_components$1 = [];
    const binding_callbacks$1 = [];
    const render_callbacks$1 = [];
    const flush_callbacks$1 = [];
    const resolved_promise$1 = Promise.resolve();
    let update_scheduled$1 = false;
    function schedule_update$1() {
        if (!update_scheduled$1) {
            update_scheduled$1 = true;
            resolved_promise$1.then(flush$1);
        }
    }
    function tick$1() {
        schedule_update$1();
        return resolved_promise$1;
    }
    function add_render_callback$1(fn) {
        render_callbacks$1.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks$1.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks$1 = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush$1() {
        const saved_component = current_component$1;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components$1.length) {
                const component = dirty_components$1[flushidx];
                flushidx++;
                set_current_component$1(component);
                update$1(component.$$);
            }
            set_current_component$1(null);
            dirty_components$1.length = 0;
            flushidx = 0;
            while (binding_callbacks$1.length)
                binding_callbacks$1.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks$1.length; i += 1) {
                const callback = render_callbacks$1[i];
                if (!seen_callbacks$1.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks$1.add(callback);
                    callback();
                }
            }
            render_callbacks$1.length = 0;
        } while (dirty_components$1.length);
        while (flush_callbacks$1.length) {
            flush_callbacks$1.pop()();
        }
        update_scheduled$1 = false;
        seen_callbacks$1.clear();
        set_current_component$1(saved_component);
    }
    function update$1($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all$1($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback$1);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event$1(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing$1 = new Set();
    let outros$1;
    function group_outros$1() {
        outros$1 = {
            r: 0,
            c: [],
            p: outros$1 // parent group
        };
    }
    function check_outros$1() {
        if (!outros$1.r) {
            run_all$1(outros$1.c);
        }
        outros$1 = outros$1.p;
    }
    function transition_in$1(block, local) {
        if (block && block.i) {
            outroing$1.delete(block);
            block.i(local);
        }
    }
    function transition_out$1(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing$1.has(block))
                return;
            outroing$1.add(block);
            outros$1.c.push(() => {
                outroing$1.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop$1, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback$1(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function$1(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros$1;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop$1, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback$1(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all$1(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function$1(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block$1(block, lookup) {
        transition_out$1(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function fix_and_outro_and_destroy_block(block, lookup) {
        block.f();
        outro_and_destroy_block$1(block, lookup);
    }
    function update_keyed_each$1(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in$1(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update$1(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object$1(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component$1(block) {
        block && block.c();
    }
    function mount_component$1(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback$1(() => {
                const new_on_destroy = on_mount.map(run$1).filter(is_function$1);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all$1(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback$1);
    }
    function destroy_component$1(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all$1($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty$1(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components$1.push(component);
            schedule_update$1();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component$1;
        set_current_component$1(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object$1(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object$1(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty$1(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all$1($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach$1);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in$1(component.$$.fragment);
            mount_component$1(component, options.target, options.anchor, options.customElement);
            flush$1();
        }
        set_current_component$1(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent$1 {
        $destroy() {
            destroy_component$1(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event$1(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append$1(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert$1(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach$1(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen$1(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr$1(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent$1 {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const isUndefined = value => typeof value === "undefined";

    const isFunction = value => typeof value === "function";

    const isNumber = value => typeof value === "number";

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
    	return (
    		!event.defaultPrevented &&
    		event.button === 0 &&
    		!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    	);
    }

    function createCounter() {
    	let i = 0;
    	/**
    	 * Returns an id and increments the internal state
    	 * @returns {number}
    	 */
    	return () => i++;
    }

    /**
     * Create a globally unique id
     *
     * @returns {string} An id
     */
    function createGlobalId() {
    	return Math.random().toString(36).substring(2);
    }

    const isSSR = typeof window === "undefined";

    function addListener(target, type, handler) {
    	target.addEventListener(type, handler);
    	return () => target.removeEventListener(type, handler);
    }

    const subscriber_queue$1 = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable$1(value, start) {
        return {
            subscribe: writable$1(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable$1(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal$1(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue$1.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue$1.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue$1.length; i += 2) {
                            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
                        }
                        subscriber_queue$1.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived$1(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable$1(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function$1(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe$1(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all$1(unsubscribers);
                cleanup();
            };
        });
    }

    /*
     * Adapted from https://github.com/EmilTholin/svelte-routing
     *
     * https://github.com/EmilTholin/svelte-routing/blob/master/LICENSE
     */

    const createKey = ctxName => `@@svnav-ctx__${ctxName}`;

    // Use strings instead of objects, so different versions of
    // svelte-navigator can potentially still work together
    const LOCATION = createKey("LOCATION");
    const ROUTER = createKey("ROUTER");
    const ROUTE = createKey("ROUTE");
    const ROUTE_PARAMS = createKey("ROUTE_PARAMS");
    const FOCUS_ELEM = createKey("FOCUS_ELEM");

    const paramRegex = /^:(.+)/;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    const startsWith = (string, search) =>
    	string.substr(0, search.length) === search;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    const isRootSegment = segment => segment === "";

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    const isDynamic = segment => paramRegex.test(segment);

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    const isSplat = segment => segment[0] === "*";

    /**
     * Strip potention splat and splatname of the end of a path
     * @param {string} str
     * @return {string}
     */
    const stripSplat = str => str.replace(/\*.*$/, "");

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    const stripSlashes = str => str.replace(/(^\/+|\/+$)/g, "");

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri, filterFalsy = false) {
    	const segments = stripSlashes(uri).split("/");
    	return filterFalsy ? segments.filter(Boolean) : segments;
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    const addQuery = (pathname, query) =>
    	pathname + (query ? `?${query}` : "");

    /**
     * Normalizes a basepath
     *
     * @param {string} path
     * @returns {string}
     *
     * @example
     * normalizePath("base/path/") // -> "/base/path"
     */
    const normalizePath = path => `/${stripSlashes(path)}`;

    /**
     * Joins and normalizes multiple path fragments
     *
     * @param {...string} pathFragments
     * @returns {string}
     */
    function join(...pathFragments) {
    	const joinFragment = fragment => segmentize(fragment, true).join("/");
    	const joinedSegments = pathFragments.map(joinFragment).join("/");
    	return normalizePath(joinedSegments);
    }

    // We start from 1 here, so we can check if an origin id has been passed
    // by using `originId || <fallback>`
    const LINK_ID = 1;
    const ROUTE_ID = 2;
    const ROUTER_ID = 3;
    const USE_FOCUS_ID = 4;
    const USE_LOCATION_ID = 5;
    const USE_MATCH_ID = 6;
    const USE_NAVIGATE_ID = 7;
    const USE_PARAMS_ID = 8;
    const USE_RESOLVABLE_ID = 9;
    const USE_RESOLVE_ID = 10;
    const NAVIGATE_ID = 11;

    const labels = {
    	[LINK_ID]: "Link",
    	[ROUTE_ID]: "Route",
    	[ROUTER_ID]: "Router",
    	[USE_FOCUS_ID]: "useFocus",
    	[USE_LOCATION_ID]: "useLocation",
    	[USE_MATCH_ID]: "useMatch",
    	[USE_NAVIGATE_ID]: "useNavigate",
    	[USE_PARAMS_ID]: "useParams",
    	[USE_RESOLVABLE_ID]: "useResolvable",
    	[USE_RESOLVE_ID]: "useResolve",
    	[NAVIGATE_ID]: "navigate",
    };

    const createLabel = labelId => labels[labelId];

    function createIdentifier(labelId, props) {
    	let attr;
    	if (labelId === ROUTE_ID) {
    		attr = props.path ? `path="${props.path}"` : "default";
    	} else if (labelId === LINK_ID) {
    		attr = `to="${props.to}"`;
    	} else if (labelId === ROUTER_ID) {
    		attr = `basepath="${props.basepath || ""}"`;
    	}
    	return `<${createLabel(labelId)} ${attr || ""} />`;
    }

    function createMessage(labelId, message, props, originId) {
    	const origin = props && createIdentifier(originId || labelId, props);
    	const originMsg = origin ? `\n\nOccurred in: ${origin}` : "";
    	const label = createLabel(labelId);
    	const msg = isFunction(message) ? message(label) : message;
    	return `<${label}> ${msg}${originMsg}`;
    }

    const createMessageHandler = handler => (...args) =>
    	handler(createMessage(...args));

    const fail = createMessageHandler(message => {
    	throw new Error(message);
    });

    // eslint-disable-next-line no-console
    const warn = createMessageHandler(console.warn);

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
    	const score = route.default
    		? 0
    		: segmentize(route.fullPath).reduce((acc, segment) => {
    				let nextScore = acc;
    				nextScore += SEGMENT_POINTS;

    				if (isRootSegment(segment)) {
    					nextScore += ROOT_POINTS;
    				} else if (isDynamic(segment)) {
    					nextScore += DYNAMIC_POINTS;
    				} else if (isSplat(segment)) {
    					nextScore -= SEGMENT_POINTS + SPLAT_PENALTY;
    				} else {
    					nextScore += STATIC_POINTS;
    				}

    				return nextScore;
    		  }, 0);

    	return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
    	return (
    		routes
    			.map(rankRoute)
    			// If two routes have the exact same score, we go by index instead
    			.sort((a, b) => {
    				if (a.score < b.score) {
    					return 1;
    				}
    				if (a.score > b.score) {
    					return -1;
    				}
    				return a.index - b.index;
    			})
    	);
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { fullPath, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
    	let bestMatch;
    	let defaultMatch;

    	const [uriPathname] = uri.split("?");
    	const uriSegments = segmentize(uriPathname);
    	const isRootUri = uriSegments[0] === "";
    	const ranked = rankRoutes(routes);

    	for (let i = 0, l = ranked.length; i < l; i++) {
    		const { route } = ranked[i];
    		let missed = false;
    		const params = {};

    		// eslint-disable-next-line no-shadow
    		const createMatch = uri => ({ ...route, params, uri });

    		if (route.default) {
    			defaultMatch = createMatch(uri);
    			continue;
    		}

    		const routeSegments = segmentize(route.fullPath);
    		const max = Math.max(uriSegments.length, routeSegments.length);
    		let index = 0;

    		for (; index < max; index++) {
    			const routeSegment = routeSegments[index];
    			const uriSegment = uriSegments[index];

    			if (!isUndefined(routeSegment) && isSplat(routeSegment)) {
    				// Hit a splat, just grab the rest, and return a match
    				// uri:   /files/documents/work
    				// route: /files/* or /files/*splatname
    				const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

    				params[splatName] = uriSegments
    					.slice(index)
    					.map(decodeURIComponent)
    					.join("/");
    				break;
    			}

    			if (isUndefined(uriSegment)) {
    				// URI is shorter than the route, no match
    				// uri:   /users
    				// route: /users/:userId
    				missed = true;
    				break;
    			}

    			const dynamicMatch = paramRegex.exec(routeSegment);

    			if (dynamicMatch && !isRootUri) {
    				const value = decodeURIComponent(uriSegment);
    				params[dynamicMatch[1]] = value;
    			} else if (routeSegment !== uriSegment) {
    				// Current segments don't match, not dynamic, not splat, so no match
    				// uri:   /users/123/settings
    				// route: /users/:id/profile
    				missed = true;
    				break;
    			}
    		}

    		if (!missed) {
    			bestMatch = createMatch(join(...uriSegments.slice(0, index)));
    			break;
    		}
    	}

    	return bestMatch || defaultMatch || null;
    }

    /**
     * Check if the `route.fullPath` matches the `uri`.
     * @param {Object} route
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
    	return pick([route], uri);
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
    	// /foo/bar, /baz/qux => /foo/bar
    	if (startsWith(to, "/")) {
    		return to;
    	}

    	const [toPathname, toQuery] = to.split("?");
    	const [basePathname] = base.split("?");
    	const toSegments = segmentize(toPathname);
    	const baseSegments = segmentize(basePathname);

    	// ?a=b, /users?b=c => /users?a=b
    	if (toSegments[0] === "") {
    		return addQuery(basePathname, toQuery);
    	}

    	// profile, /users/789 => /users/789/profile
    	if (!startsWith(toSegments[0], ".")) {
    		const pathname = baseSegments.concat(toSegments).join("/");
    		return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
    	}

    	// ./       , /users/123 => /users/123
    	// ../      , /users/123 => /users
    	// ../..    , /users/123 => /
    	// ../../one, /a/b/c/d   => /a/b/one
    	// .././one , /a/b/c/d   => /a/b/c/one
    	const allSegments = baseSegments.concat(toSegments);
    	const segments = [];

    	allSegments.forEach(segment => {
    		if (segment === "..") {
    			segments.pop();
    		} else if (segment !== ".") {
    			segments.push(segment);
    		}
    	});

    	return addQuery(`/${segments.join("/")}`, toQuery);
    }

    /**
     * Normalizes a location for consumption by `Route` children and the `Router`.
     * It removes the apps basepath from the pathname
     * and sets default values for `search` and `hash` properties.
     *
     * @param {Object} location The current global location supplied by the history component
     * @param {string} basepath The applications basepath (i.e. when serving from a subdirectory)
     *
     * @returns The normalized location
     */
    function normalizeLocation(location, basepath) {
    	const { pathname, hash = "", search = "", state } = location;
    	const baseSegments = segmentize(basepath, true);
    	const pathSegments = segmentize(pathname, true);
    	while (baseSegments.length) {
    		if (baseSegments[0] !== pathSegments[0]) {
    			fail(
    				ROUTER_ID,
    				`Invalid state: All locations must begin with the basepath "${basepath}", found "${pathname}"`,
    			);
    		}
    		baseSegments.shift();
    		pathSegments.shift();
    	}
    	return {
    		pathname: join(...pathSegments),
    		hash,
    		search,
    		state,
    	};
    }

    const normalizeUrlFragment = frag => (frag.length === 1 ? "" : frag);

    /**
     * Creates a location object from an url.
     * It is used to create a location from the url prop used in SSR
     *
     * @param {string} url The url string (e.g. "/path/to/somewhere")
     *
     * @returns {{ pathname: string; search: string; hash: string }} The location
     */
    function createLocation(url) {
    	const searchIndex = url.indexOf("?");
    	const hashIndex = url.indexOf("#");
    	const hasSearchIndex = searchIndex !== -1;
    	const hasHashIndex = hashIndex !== -1;
    	const hash = hasHashIndex ? normalizeUrlFragment(url.substr(hashIndex)) : "";
    	const pathnameAndSearch = hasHashIndex ? url.substr(0, hashIndex) : url;
    	const search = hasSearchIndex
    		? normalizeUrlFragment(pathnameAndSearch.substr(searchIndex))
    		: "";
    	const pathname = hasSearchIndex
    		? pathnameAndSearch.substr(0, searchIndex)
    		: pathnameAndSearch;
    	return { pathname, search, hash };
    }

    /**
     * Resolves a link relative to the parent Route and the Routers basepath.
     *
     * @param {string} path The given path, that will be resolved
     * @param {string} routeBase The current Routes base path
     * @param {string} appBase The basepath of the app. Used, when serving from a subdirectory
     * @returns {string} The resolved path
     *
     * @example
     * resolveLink("relative", "/routeBase", "/") // -> "/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/") // -> "/absolute"
     * resolveLink("relative", "/routeBase", "/base") // -> "/base/routeBase/relative"
     * resolveLink("/absolute", "/routeBase", "/base") // -> "/base/absolute"
     */
    function resolveLink(path, routeBase, appBase) {
    	return join(appBase, resolve(path, routeBase));
    }

    /**
     * Get the uri for a Route, by matching it against the current location.
     *
     * @param {string} routePath The Routes resolved path
     * @param {string} pathname The current locations pathname
     */
    function extractBaseUri(routePath, pathname) {
    	const fullPath = normalizePath(stripSplat(routePath));
    	const baseSegments = segmentize(fullPath, true);
    	const pathSegments = segmentize(pathname, true).slice(0, baseSegments.length);
    	const routeMatch = match({ fullPath }, join(...pathSegments));
    	return routeMatch && routeMatch.uri;
    }

    /*
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const POP = "POP";
    const PUSH = "PUSH";
    const REPLACE = "REPLACE";

    function getLocation(source) {
    	return {
    		...source.location,
    		pathname: encodeURI(decodeURI(source.location.pathname)),
    		state: source.history.state,
    		_key: (source.history.state && source.history.state._key) || "initial",
    	};
    }

    function createHistory(source) {
    	let listeners = [];
    	let location = getLocation(source);
    	let action = POP;

    	const notifyListeners = (listenerFns = listeners) =>
    		listenerFns.forEach(listener => listener({ location, action }));

    	return {
    		get location() {
    			return location;
    		},
    		listen(listener) {
    			listeners.push(listener);

    			const popstateListener = () => {
    				location = getLocation(source);
    				action = POP;
    				notifyListeners([listener]);
    			};

    			// Call listener when it is registered
    			notifyListeners([listener]);

    			const unlisten = addListener(source, "popstate", popstateListener);
    			return () => {
    				unlisten();
    				listeners = listeners.filter(fn => fn !== listener);
    			};
    		},
    		/**
    		 * Navigate to a new absolute route.
    		 *
    		 * @param {string|number} to The path to navigate to.
    		 *
    		 * If `to` is a number we will navigate to the stack entry index + `to`
    		 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    		 * @param {Object} options
    		 * @param {*} [options.state] The state will be accessible through `location.state`
    		 * @param {boolean} [options.replace=false] Replace the current entry in the history
    		 * stack, instead of pushing on a new one
    		 */
    		navigate(to, options) {
    			const { state = {}, replace = false } = options || {};
    			action = replace ? REPLACE : PUSH;
    			if (isNumber(to)) {
    				if (options) {
    					warn(
    						NAVIGATE_ID,
    						"Navigation options (state or replace) are not supported, " +
    							"when passing a number as the first argument to navigate. " +
    							"They are ignored.",
    					);
    				}
    				action = POP;
    				source.history.go(to);
    			} else {
    				const keyedState = { ...state, _key: createGlobalId() };
    				// try...catch iOS Safari limits to 100 pushState calls
    				try {
    					source.history[replace ? "replaceState" : "pushState"](
    						keyedState,
    						"",
    						to,
    					);
    				} catch (e) {
    					source.location[replace ? "replace" : "assign"](to);
    				}
    			}

    			location = getLocation(source);
    			notifyListeners();
    		},
    	};
    }

    function createStackFrame(state, uri) {
    	return { ...createLocation(uri), state };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
    	let index = 0;
    	let stack = [createStackFrame(null, initialPathname)];

    	return {
    		// This is just for testing...
    		get entries() {
    			return stack;
    		},
    		get location() {
    			return stack[index];
    		},
    		addEventListener() {},
    		removeEventListener() {},
    		history: {
    			get state() {
    				return stack[index].state;
    			},
    			pushState(state, title, uri) {
    				index++;
    				// Throw away anything in the stack with an index greater than the current index.
    				// This happens, when we go back using `go(-n)`. The index is now less than `stack.length`.
    				// If we call `go(+n)` the stack entries with an index greater than the current index can
    				// be reused.
    				// However, if we navigate to a path, instead of a number, we want to create a new branch
    				// of navigation.
    				stack = stack.slice(0, index);
    				stack.push(createStackFrame(state, uri));
    			},
    			replaceState(state, title, uri) {
    				stack[index] = createStackFrame(state, uri);
    			},
    			go(to) {
    				const newIndex = index + to;
    				if (newIndex < 0 || newIndex > stack.length - 1) {
    					return;
    				}
    				index = newIndex;
    			},
    		},
    	};
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = !!(
    	!isSSR &&
    	window.document &&
    	window.document.createElement
    );
    // Use memory history in iframes (for example in Svelte REPL)
    const isEmbeddedPage = !isSSR && window.location.origin === "null";
    const globalHistory = createHistory(
    	canUseDOM && !isEmbeddedPage ? window : createMemorySource(),
    );

    // We need to keep the focus candidate in a separate file, so svelte does
    // not update, when we mutate it.
    // Also, we need a single global reference, because taking focus needs to
    // work globally, even if we have multiple top level routers
    // eslint-disable-next-line import/no-mutable-exports
    let focusCandidate = null;

    // eslint-disable-next-line import/no-mutable-exports
    let initialNavigation = true;

    /**
     * Check if RouterA is above RouterB in the document
     * @param {number} routerIdA The first Routers id
     * @param {number} routerIdB The second Routers id
     */
    function isAbove(routerIdA, routerIdB) {
    	const routerMarkers = document.querySelectorAll("[data-svnav-router]");
    	for (let i = 0; i < routerMarkers.length; i++) {
    		const node = routerMarkers[i];
    		const currentId = Number(node.dataset.svnavRouter);
    		if (currentId === routerIdA) return true;
    		if (currentId === routerIdB) return false;
    	}
    	return false;
    }

    /**
     * Check if a Route candidate is the best choice to move focus to,
     * and store the best match.
     * @param {{
         level: number;
         routerId: number;
         route: {
           id: number;
           focusElement: import("svelte/store").Readable<Promise<Element>|null>;
         }
       }} item A Route candidate, that updated and is visible after a navigation
     */
    function pushFocusCandidate(item) {
    	if (
    		// Best candidate if it's the only candidate...
    		!focusCandidate ||
    		// Route is nested deeper, than previous candidate
    		// -> Route change was triggered in the deepest affected
    		// Route, so that's were focus should move to
    		item.level > focusCandidate.level ||
    		// If the level is identical, we want to focus the first Route in the document,
    		// so we pick the first Router lookin from page top to page bottom.
    		(item.level === focusCandidate.level &&
    			isAbove(item.routerId, focusCandidate.routerId))
    	) {
    		focusCandidate = item;
    	}
    }

    /**
     * Reset the focus candidate.
     */
    function clearFocusCandidate() {
    	focusCandidate = null;
    }

    function initialNavigationOccurred() {
    	initialNavigation = false;
    }

    /*
     * `focus` Adapted from https://github.com/oaf-project/oaf-side-effects/blob/master/src/index.ts
     *
     * https://github.com/oaf-project/oaf-side-effects/blob/master/LICENSE
     */
    function focus(elem) {
    	if (!elem) return false;
    	const TABINDEX = "tabindex";
    	try {
    		if (!elem.hasAttribute(TABINDEX)) {
    			elem.setAttribute(TABINDEX, "-1");
    			let unlisten;
    			// We remove tabindex after blur to avoid weird browser behavior
    			// where a mouse click can activate elements with tabindex="-1".
    			const blurListener = () => {
    				elem.removeAttribute(TABINDEX);
    				unlisten();
    			};
    			unlisten = addListener(elem, "blur", blurListener);
    		}
    		elem.focus();
    		return document.activeElement === elem;
    	} catch (e) {
    		// Apparently trying to focus a disabled element in IE can throw.
    		// See https://stackoverflow.com/a/1600194/2476884
    		return false;
    	}
    }

    function isEndMarker(elem, id) {
    	return Number(elem.dataset.svnavRouteEnd) === id;
    }

    function isHeading(elem) {
    	return /^H[1-6]$/i.test(elem.tagName);
    }

    function query(selector, parent = document) {
    	return parent.querySelector(selector);
    }

    function queryHeading(id) {
    	const marker = query(`[data-svnav-route-start="${id}"]`);
    	let current = marker.nextElementSibling;
    	while (!isEndMarker(current, id)) {
    		if (isHeading(current)) {
    			return current;
    		}
    		const heading = query("h1,h2,h3,h4,h5,h6", current);
    		if (heading) {
    			return heading;
    		}
    		current = current.nextElementSibling;
    	}
    	return null;
    }

    function handleFocus(route) {
    	Promise.resolve(get_store_value$1(route.focusElement)).then(elem => {
    		const focusElement = elem || queryHeading(route.id);
    		if (!focusElement) {
    			warn(
    				ROUTER_ID,
    				"Could not find an element to focus. " +
    					"You should always render a header for accessibility reasons, " +
    					'or set a custom focus element via the "useFocus" hook. ' +
    					"If you don't want this Route or Router to manage focus, " +
    					'pass "primary={false}" to it.',
    				route,
    				ROUTE_ID,
    			);
    		}
    		const headingFocused = focus(focusElement);
    		if (headingFocused) return;
    		focus(document.documentElement);
    	});
    }

    const createTriggerFocus = (a11yConfig, announcementText, location) => (
    	manageFocus,
    	announceNavigation,
    ) =>
    	// Wait until the dom is updated, so we can look for headings
    	tick$1().then(() => {
    		if (!focusCandidate || initialNavigation) {
    			initialNavigationOccurred();
    			return;
    		}
    		if (manageFocus) {
    			handleFocus(focusCandidate.route);
    		}
    		if (a11yConfig.announcements && announceNavigation) {
    			const { path, fullPath, meta, params, uri } = focusCandidate.route;
    			const announcementMessage = a11yConfig.createAnnouncement(
    				{ path, fullPath, meta, params, uri },
    				get_store_value$1(location),
    			);
    			Promise.resolve(announcementMessage).then(message => {
    				announcementText.set(message);
    			});
    		}
    		clearFocusCandidate();
    	});

    const visuallyHiddenStyle =
    	"position:fixed;" +
    	"top:-1px;" +
    	"left:0;" +
    	"width:1px;" +
    	"height:1px;" +
    	"padding:0;" +
    	"overflow:hidden;" +
    	"clip:rect(0,0,0,0);" +
    	"white-space:nowrap;" +
    	"border:0;";

    /* node_modules/svelte-navigator/src/Router.svelte generated by Svelte v3.46.4 */

    const file$e = "node_modules/svelte-navigator/src/Router.svelte";

    // (195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}
    function create_if_block$7(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			t = text$1(/*$announcementText*/ ctx[0]);
    			attr_dev(div, "role", "status");
    			attr_dev(div, "aria-atomic", "true");
    			attr_dev(div, "aria-live", "polite");
    			attr_dev(div, "style", visuallyHiddenStyle);
    			add_location(div, file$e, 195, 1, 5906);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$announcementText*/ 1) set_data_dev(t, /*$announcementText*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(195:0) {#if isTopLevelRouter && manageFocus && a11yConfig.announcements}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot$1(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	let if_block = /*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			t0 = space$1();
    			if (default_slot) default_slot.c();
    			t1 = space$1();
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    			set_style$1(div, "display", "none");
    			attr_dev(div, "aria-hidden", "true");
    			attr_dev(div, "data-svnav-router", /*routerId*/ ctx[3]);
    			add_location(div, file$e, 190, 0, 5750);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes$1(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*isTopLevelRouter*/ ctx[2] && /*manageFocus*/ ctx[4] && /*a11yConfig*/ ctx[1].announcements) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId$1 = createCounter();
    const defaultBasepath = "/";

    function instance$p($$self, $$props, $$invalidate) {
    	let $location;
    	let $activeRoute;
    	let $prevLocation;
    	let $routes;
    	let $announcementText;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = defaultBasepath } = $$props;
    	let { url = null } = $$props;
    	let { history = globalHistory } = $$props;
    	let { primary = true } = $$props;
    	let { a11y = {} } = $$props;

    	const a11yConfig = {
    		createAnnouncement: route => `Navigated to ${route.uri}`,
    		announcements: true,
    		...a11y
    	};

    	// Remember the initial `basepath`, so we can fire a warning
    	// when the user changes it later
    	const initialBasepath = basepath;

    	const normalizedBasepath = normalizePath(basepath);
    	const locationContext = getContext$1(LOCATION);
    	const routerContext = getContext$1(ROUTER);
    	const isTopLevelRouter = !locationContext;
    	const routerId = createId$1();
    	const manageFocus = primary && !(routerContext && !routerContext.manageFocus);
    	const announcementText = writable$1("");
    	validate_store(announcementText, 'announcementText');
    	component_subscribe$1($$self, announcementText, value => $$invalidate(0, $announcementText = value));
    	const routes = writable$1([]);
    	validate_store(routes, 'routes');
    	component_subscribe$1($$self, routes, value => $$invalidate(18, $routes = value));
    	const activeRoute = writable$1(null);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe$1($$self, activeRoute, value => $$invalidate(16, $activeRoute = value));

    	// Used in SSR to synchronously set that a Route is active.
    	let hasActiveRoute = false;

    	// Nesting level of router.
    	// We will need this to identify sibling routers, when moving
    	// focus on navigation, so we can focus the first possible router
    	const level = isTopLevelRouter ? 0 : routerContext.level + 1;

    	// If we're running an SSR we force the location to the `url` prop
    	const getInitialLocation = () => normalizeLocation(isSSR ? createLocation(url) : history.location, normalizedBasepath);

    	const location = isTopLevelRouter
    	? writable$1(getInitialLocation())
    	: locationContext;

    	validate_store(location, 'location');
    	component_subscribe$1($$self, location, value => $$invalidate(15, $location = value));
    	const prevLocation = writable$1($location);
    	validate_store(prevLocation, 'prevLocation');
    	component_subscribe$1($$self, prevLocation, value => $$invalidate(17, $prevLocation = value));
    	const triggerFocus = createTriggerFocus(a11yConfig, announcementText, location);
    	const createRouteFilter = routeId => routeList => routeList.filter(routeItem => routeItem.id !== routeId);

    	function registerRoute(route) {
    		if (isSSR) {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				hasActiveRoute = true;

    				// Return the match in SSR mode, so the matched Route can use it immediatly.
    				// Waiting for activeRoute to update does not work, because it updates
    				// after the Route is initialized
    				return matchingRoute; // eslint-disable-line consistent-return
    			}
    		} else {
    			routes.update(prevRoutes => {
    				// Remove an old version of the updated route,
    				// before pushing the new version
    				const nextRoutes = createRouteFilter(route.id)(prevRoutes);

    				nextRoutes.push(route);
    				return nextRoutes;
    			});
    		}
    	}

    	function unregisterRoute(routeId) {
    		routes.update(createRouteFilter(routeId));
    	}

    	if (!isTopLevelRouter && basepath !== defaultBasepath) {
    		warn(ROUTER_ID, 'Only top-level Routers can have a "basepath" prop. It is ignored.', { basepath });
    	}

    	if (isTopLevelRouter) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount$1(() => {
    			const unlisten = history.listen(changedHistory => {
    				const normalizedLocation = normalizeLocation(changedHistory.location, normalizedBasepath);
    				prevLocation.set($location);
    				location.set(normalizedLocation);
    			});

    			return unlisten;
    		});

    		setContext$1(LOCATION, location);
    	}

    	setContext$1(ROUTER, {
    		activeRoute,
    		registerRoute,
    		unregisterRoute,
    		manageFocus,
    		level,
    		id: routerId,
    		history: isTopLevelRouter ? history : routerContext.history,
    		basepath: isTopLevelRouter
    		? normalizedBasepath
    		: routerContext.basepath
    	});

    	const writable_props = ['basepath', 'url', 'history', 'primary', 'a11y'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(10, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(11, url = $$props.url);
    		if ('history' in $$props) $$invalidate(12, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(13, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(14, a11y = $$props.a11y);
    		if ('$$scope' in $$props) $$invalidate(19, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createId: createId$1,
    		getContext: getContext$1,
    		setContext: setContext$1,
    		onMount: onMount$1,
    		writable: writable$1,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		normalizePath,
    		pick,
    		match,
    		normalizeLocation,
    		createLocation,
    		isSSR,
    		warn,
    		ROUTER_ID,
    		pushFocusCandidate,
    		visuallyHiddenStyle,
    		createTriggerFocus,
    		defaultBasepath,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		a11yConfig,
    		initialBasepath,
    		normalizedBasepath,
    		locationContext,
    		routerContext,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		level,
    		getInitialLocation,
    		location,
    		prevLocation,
    		triggerFocus,
    		createRouteFilter,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$announcementText
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(10, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(11, url = $$props.url);
    		if ('history' in $$props) $$invalidate(12, history = $$props.history);
    		if ('primary' in $$props) $$invalidate(13, primary = $$props.primary);
    		if ('a11y' in $$props) $$invalidate(14, a11y = $$props.a11y);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*basepath*/ 1024) {
    			if (basepath !== initialBasepath) {
    				warn(ROUTER_ID, 'You cannot change the "basepath" prop. It is ignored.');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$routes, $location*/ 294912) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$location, $prevLocation*/ 163840) {
    			// Manage focus and announce navigation to screen reader users
    			{
    				if (isTopLevelRouter) {
    					const hasHash = !!$location.hash;

    					// When a hash is present in the url, we skip focus management, because
    					// focusing a different element will prevent in-page jumps (See #3)
    					const shouldManageFocus = !hasHash && manageFocus;

    					// We don't want to make an announcement, when the hash changes,
    					// but the active route stays the same
    					const announceNavigation = !hasHash || $location.pathname !== $prevLocation.pathname;

    					triggerFocus(shouldManageFocus, announceNavigation);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$activeRoute*/ 65536) {
    			// Queue matched Route, so top level Router can decide which Route to focus.
    			// Non primary Routers should just be ignored
    			if (manageFocus && $activeRoute && $activeRoute.primary) {
    				pushFocusCandidate({ level, routerId, route: $activeRoute });
    			}
    		}
    	};

    	return [
    		$announcementText,
    		a11yConfig,
    		isTopLevelRouter,
    		routerId,
    		manageFocus,
    		announcementText,
    		routes,
    		activeRoute,
    		location,
    		prevLocation,
    		basepath,
    		url,
    		history,
    		primary,
    		a11y,
    		$location,
    		$activeRoute,
    		$prevLocation,
    		$routes,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$p,
    			create_fragment$p,
    			safe_not_equal$1,
    			{
    				basepath: 10,
    				url: 11,
    				history: 12,
    				primary: 13,
    				a11y: 14
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get history() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set history(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11y() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11y(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Router$1 = Router;

    /**
     * Check if a component or hook have been created outside of a
     * context providing component
     * @param {number} componentId
     * @param {*} props
     * @param {string?} ctxKey
     * @param {number?} ctxProviderId
     */
    function usePreflightCheck(
    	componentId,
    	props,
    	ctxKey = ROUTER,
    	ctxProviderId = ROUTER_ID,
    ) {
    	const ctx = getContext$1(ctxKey);
    	if (!ctx) {
    		fail(
    			componentId,
    			label =>
    				`You cannot use ${label} outside of a ${createLabel(ctxProviderId)}.`,
    			props,
    		);
    	}
    }

    const toReadonly = ctx => {
    	const { subscribe } = getContext$1(ctx);
    	return { subscribe };
    };

    /**
     * Access the current location via a readable store.
     * @returns {import("svelte/store").Readable<{
        pathname: string;
        search: string;
        hash: string;
        state: {};
      }>}
     *
     * @example
      ```html
      <script>
        import { useLocation } from "svelte-navigator";

        const location = useLocation();

        $: console.log($location);
        // {
        //   pathname: "/blog",
        //   search: "?id=123",
        //   hash: "#comments",
        //   state: {}
        // }
      </script>
      ```
     */
    function useLocation() {
    	usePreflightCheck(USE_LOCATION_ID);
    	return toReadonly(LOCATION);
    }

    /**
     * @typedef {{
        path: string;
        fullPath: string;
        uri: string;
        params: {};
      }} RouteMatch
     */

    /**
     * @typedef {import("svelte/store").Readable<RouteMatch|null>} RouteMatchStore
     */

    /**
     * Access the history of top level Router.
     */
    function useHistory() {
    	const { history } = getContext$1(ROUTER);
    	return history;
    }

    /**
     * Access the base of the parent Route.
     */
    function useRouteBase() {
    	const route = getContext$1(ROUTE);
    	return route ? derived$1(route, _route => _route.base) : writable$1("/");
    }

    /**
     * Resolve a given link relative to the current `Route` and the `Router`s `basepath`.
     * It is used under the hood in `Link` and `useNavigate`.
     * You can use it to manually resolve links, when using the `link` or `links` actions.
     *
     * @returns {(path: string) => string}
     *
     * @example
      ```html
      <script>
        import { link, useResolve } from "svelte-navigator";

        const resolve = useResolve();
        // `resolvedLink` will be resolved relative to its parent Route
        // and the Routers `basepath`
        const resolvedLink = resolve("relativePath");
      </script>

      <a href={resolvedLink} use:link>Relative link</a>
      ```
     */
    function useResolve() {
    	usePreflightCheck(USE_RESOLVE_ID);
    	const routeBase = useRouteBase();
    	const { basepath: appBase } = getContext$1(ROUTER);
    	/**
    	 * Resolves the path relative to the current route and basepath.
    	 *
    	 * @param {string} path The path to resolve
    	 * @returns {string} The resolved path
    	 */
    	const resolve = path => resolveLink(path, get_store_value$1(routeBase), appBase);
    	return resolve;
    }

    /**
     * A hook, that returns a context-aware version of `navigate`.
     * It will automatically resolve the given link relative to the current Route.
     * It will also resolve a link against the `basepath` of the Router.
     *
     * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router>
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /absolutePath
      </button>
      ```
      *
      * @example
      ```html
      <!-- App.svelte -->
      <script>
        import { link, Route } from "svelte-navigator";
        import RouteComponent from "./RouteComponent.svelte";
      </script>

      <Router basepath="/base">
        <Route path="route1">
          <RouteComponent />
        </Route>
        <!-- ... -->
      </Router>

      <!-- RouteComponent.svelte -->
      <script>
        import { useNavigate } from "svelte-navigator";

        const navigate = useNavigate();
      </script>

      <button on:click="{() => navigate('relativePath')}">
        go to /base/route1/relativePath
      </button>
      <button on:click="{() => navigate('/absolutePath')}">
        go to /base/absolutePath
      </button>
      ```
     */
    function useNavigate() {
    	usePreflightCheck(USE_NAVIGATE_ID);
    	const resolve = useResolve();
    	const { navigate } = useHistory();
    	/**
    	 * Navigate to a new route.
    	 * Resolves the link relative to the current route and basepath.
    	 *
    	 * @param {string|number} to The path to navigate to.
    	 *
    	 * If `to` is a number we will navigate to the stack entry index + `to`
    	 * (-> `navigate(-1)`, is equivalent to hitting the back button of the browser)
    	 * @param {Object} options
    	 * @param {*} [options.state]
    	 * @param {boolean} [options.replace=false]
    	 */
    	const navigateRelative = (to, options) => {
    		// If to is a number, we navigate to the target stack entry via `history.go`.
    		// Otherwise resolve the link
    		const target = isNumber(to) ? to : resolve(to);
    		return navigate(target, options);
    	};
    	return navigateRelative;
    }

    /* node_modules/svelte-navigator/src/Route.svelte generated by Svelte v3.46.4 */
    const file$d = "node_modules/svelte-navigator/src/Route.svelte";

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*$params*/ 16,
    	location: dirty & /*$location*/ 8
    });

    const get_default_slot_context = ctx => ({
    	params: isSSR ? get_store_value$1(/*params*/ ctx[9]) : /*$params*/ ctx[4],
    	location: /*$location*/ ctx[3],
    	navigate: /*navigate*/ ctx[10]
    });

    // (97:0) {#if isActive}
    function create_if_block$6(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				primary: /*primary*/ ctx[1],
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component$1(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};
    			if (dirty & /*primary*/ 2) router_changes.primary = /*primary*/ ctx[1];

    			if (dirty & /*$$scope, component, $location, $params, $$restProps*/ 264217) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(97:0) {#if isActive}",
    		ctx
    	});

    	return block;
    }

    // (113:2) {:else}
    function create_else_block$5(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot$1(default_slot_template, ctx, /*$$scope*/ ctx[18], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, $params, $location*/ 262168)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes$1(default_slot_template, /*$$scope*/ ctx[18], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(113:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (105:2) {#if component !== null}
    function create_if_block_1$4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[3] },
    		{ navigate: /*navigate*/ ctx[10] },
    		isSSR ? get_store_value$1(/*params*/ ctx[9]) : /*$params*/ ctx[4],
    		/*$$restProps*/ ctx[11]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign$1(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component$1(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component$1(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, navigate, isSSR, get, params, $params, $$restProps*/ 3608)
    			? get_spread_update$1(switch_instance_spread_levels, [
    					dirty & /*$location*/ 8 && { location: /*$location*/ ctx[3] },
    					dirty & /*navigate*/ 1024 && { navigate: /*navigate*/ ctx[10] },
    					dirty & /*isSSR, get, params, $params*/ 528 && get_spread_object$1(isSSR ? get_store_value$1(/*params*/ ctx[9]) : /*$params*/ ctx[4]),
    					dirty & /*$$restProps*/ 2048 && get_spread_object$1(/*$$restProps*/ ctx[11])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros$1();
    					const old_component = switch_instance;

    					transition_out$1(old_component.$$.fragment, 1, 0, () => {
    						destroy_component$1(old_component, 1);
    					});

    					check_outros$1();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component$1(switch_instance.$$.fragment);
    					transition_in$1(switch_instance.$$.fragment, 1);
    					mount_component$1(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in$1(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out$1(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component$1(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(105:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    // (98:1) <Router {primary}>
    function create_default_slot$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$4, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros$1();

    				transition_out$1(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros$1();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in$1(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(98:1) <Router {primary}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let current;
    	let if_block = /*isActive*/ ctx[2] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div0 = element$1("div");
    			t0 = space$1();
    			if (if_block) if_block.c();
    			t1 = space$1();
    			div1 = element$1("div");
    			set_style$1(div0, "display", "none");
    			attr_dev(div0, "aria-hidden", "true");
    			attr_dev(div0, "data-svnav-route-start", /*id*/ ctx[5]);
    			add_location(div0, file$d, 95, 0, 2622);
    			set_style$1(div1, "display", "none");
    			attr_dev(div1, "aria-hidden", "true");
    			attr_dev(div1, "data-svnav-route-end", /*id*/ ctx[5]);
    			add_location(div1, file$d, 121, 0, 3295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isActive*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isActive*/ 4) {
    						transition_in$1(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in$1(if_block, 1);
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				group_outros$1();

    				transition_out$1(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros$1();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const createId = createCounter();

    function instance$o($$self, $$props, $$invalidate) {
    	let isActive;
    	const omit_props_names = ["path","component","meta","primary"];
    	let $$restProps = compute_rest_props$1($$props, omit_props_names);
    	let $activeRoute;
    	let $location;
    	let $parentBase;
    	let $params;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	let { meta = {} } = $$props;
    	let { primary = true } = $$props;
    	usePreflightCheck(ROUTE_ID, $$props);
    	const id = createId();
    	const { registerRoute, unregisterRoute, activeRoute } = getContext$1(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe$1($$self, activeRoute, value => $$invalidate(15, $activeRoute = value));
    	const parentBase = useRouteBase();
    	validate_store(parentBase, 'parentBase');
    	component_subscribe$1($$self, parentBase, value => $$invalidate(16, $parentBase = value));
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe$1($$self, location, value => $$invalidate(3, $location = value));
    	const focusElement = writable$1(null);

    	// In SSR we cannot wait for $activeRoute to update,
    	// so we use the match returned from `registerRoute` instead
    	let ssrMatch;

    	const route = writable$1();
    	const params = writable$1({});
    	validate_store(params, 'params');
    	component_subscribe$1($$self, params, value => $$invalidate(4, $params = value));
    	setContext$1(ROUTE, route);
    	setContext$1(ROUTE_PARAMS, params);
    	setContext$1(FOCUS_ELEM, focusElement);

    	// We need to call useNavigate after the route is set,
    	// so we can use the routes path for link resolution
    	const navigate = useNavigate();

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway
    	if (!isSSR) {
    		onDestroy$1(() => unregisterRoute(id));
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(23, $$props = assign$1(assign$1({}, $$props), exclude_internal_props$1($$new_props)));
    		$$invalidate(11, $$restProps = compute_rest_props$1($$props, omit_props_names));
    		if ('path' in $$new_props) $$invalidate(12, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$new_props) $$invalidate(13, meta = $$new_props.meta);
    		if ('primary' in $$new_props) $$invalidate(1, primary = $$new_props.primary);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createCounter,
    		createId,
    		getContext: getContext$1,
    		onDestroy: onDestroy$1,
    		setContext: setContext$1,
    		writable: writable$1,
    		get: get_store_value$1,
    		Router: Router$1,
    		ROUTER,
    		ROUTE,
    		ROUTE_PARAMS,
    		FOCUS_ELEM,
    		useLocation,
    		useNavigate,
    		useRouteBase,
    		usePreflightCheck,
    		isSSR,
    		extractBaseUri,
    		join,
    		ROUTE_ID,
    		path,
    		component,
    		meta,
    		primary,
    		id,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		parentBase,
    		location,
    		focusElement,
    		ssrMatch,
    		route,
    		params,
    		navigate,
    		isActive,
    		$activeRoute,
    		$location,
    		$parentBase,
    		$params
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(23, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(12, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('meta' in $$props) $$invalidate(13, meta = $$new_props.meta);
    		if ('primary' in $$props) $$invalidate(1, primary = $$new_props.primary);
    		if ('ssrMatch' in $$props) $$invalidate(14, ssrMatch = $$new_props.ssrMatch);
    		if ('isActive' in $$props) $$invalidate(2, isActive = $$new_props.isActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, $parentBase, meta, $location, primary*/ 77834) {
    			{
    				// The route store will be re-computed whenever props, location or parentBase change
    				const isDefault = path === "";

    				const rawBase = join($parentBase, path);

    				const updatedRoute = {
    					id,
    					path,
    					meta,
    					// If no path prop is given, this Route will act as the default Route
    					// that is rendered if no other Route in the Router is a match
    					default: isDefault,
    					fullPath: isDefault ? "" : rawBase,
    					base: isDefault
    					? $parentBase
    					: extractBaseUri(rawBase, $location.pathname),
    					primary,
    					focusElement
    				};

    				route.set(updatedRoute);

    				// If we're in SSR mode and the Route matches,
    				// `registerRoute` will return the match
    				$$invalidate(14, ssrMatch = registerRoute(updatedRoute));
    			}
    		}

    		if ($$self.$$.dirty & /*ssrMatch, $activeRoute*/ 49152) {
    			$$invalidate(2, isActive = !!(ssrMatch || $activeRoute && $activeRoute.id === id));
    		}

    		if ($$self.$$.dirty & /*isActive, ssrMatch, $activeRoute*/ 49156) {
    			if (isActive) {
    				const { params: activeParams } = ssrMatch || $activeRoute;
    				params.set(activeParams);
    			}
    		}
    	};

    	$$props = exclude_internal_props$1($$props);

    	return [
    		component,
    		primary,
    		isActive,
    		$location,
    		$params,
    		id,
    		activeRoute,
    		parentBase,
    		location,
    		params,
    		navigate,
    		$$restProps,
    		path,
    		meta,
    		ssrMatch,
    		$activeRoute,
    		$parentBase,
    		slots,
    		$$scope
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$o, create_fragment$o, safe_not_equal$1, {
    			path: 12,
    			component: 0,
    			meta: 13,
    			primary: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primary() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primary(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Route$1 = Route;

    /* node_modules/svelte-navigator/src/Link.svelte generated by Svelte v3.46.4 */
    const file$c = "node_modules/svelte-navigator/src/Link.svelte";

    function create_fragment$n(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot$1(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let a_levels = [{ href: /*href*/ ctx[0] }, /*ariaCurrent*/ ctx[2], /*props*/ ctx[1]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign$1(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element$1("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$c, 63, 0, 1735);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes$1(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update$1(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				dirty & /*ariaCurrent*/ 4 && /*ariaCurrent*/ ctx[2],
    				dirty & /*props*/ 2 && /*props*/ ctx[1]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let href;
    	let isPartiallyCurrent;
    	let isCurrent;
    	let ariaCurrent;
    	let props;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props$1($$props, omit_props_names);
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = null } = $$props;
    	usePreflightCheck(LINK_ID, $$props);
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe$1($$self, location, value => $$invalidate(11, $location = value));
    	const dispatch = createEventDispatcher$1();
    	const resolve = useResolve();
    	const { navigate } = useHistory();

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = isCurrent || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), exclude_internal_props$1($$new_props)));
    		$$invalidate(17, $$restProps = compute_rest_props$1($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(5, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(6, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(7, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(8, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher: createEventDispatcher$1,
    		useLocation,
    		useResolve,
    		useHistory,
    		usePreflightCheck,
    		shouldNavigate,
    		isFunction,
    		startsWith,
    		LINK_ID,
    		to,
    		replace,
    		state,
    		getProps,
    		location,
    		dispatch,
    		resolve,
    		navigate,
    		onClick,
    		href,
    		isCurrent,
    		isPartiallyCurrent,
    		props,
    		ariaCurrent,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('to' in $$props) $$invalidate(5, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(6, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(7, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(8, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isCurrent' in $$props) $$invalidate(9, isCurrent = $$new_props.isCurrent);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(10, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $location*/ 2080) {
    			// We need to pass location here to force re-resolution of the link,
    			// when the pathname changes. Otherwise we could end up with stale path params,
    			// when for example an :id changes in the parent Routes path
    			$$invalidate(0, href = resolve(to, $location));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 2049) {
    			$$invalidate(10, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 2049) {
    			$$invalidate(9, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 512) {
    			$$invalidate(2, ariaCurrent = isCurrent ? { "aria-current": "page" } : {});
    		}

    		$$invalidate(1, props = (() => {
    			if (isFunction(getProps)) {
    				const dynamicProps = getProps({
    					location: $location,
    					href,
    					isPartiallyCurrent,
    					isCurrent
    				});

    				return { ...$$restProps, ...dynamicProps };
    			}

    			return $$restProps;
    		})());
    	};

    	$$props = exclude_internal_props$1($$props);

    	return [
    		href,
    		props,
    		ariaCurrent,
    		location,
    		onClick,
    		to,
    		replace,
    		state,
    		getProps,
    		isCurrent,
    		isPartiallyCurrent,
    		$location,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$n, create_fragment$n, safe_not_equal$1, { to: 5, replace: 6, state: 7, getProps: 8 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*to*/ ctx[5] === undefined && !('to' in props)) {
    			console.warn("<Link> was created without expected prop 'to'");
    		}
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Link$1 = Link;

    /* src/components/nav.svelte generated by Svelte v3.46.4 */
    const file$b = "src/components/nav.svelte";

    // (6:8) <Link             to="cpm"             aria-current="page"             class="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active"             >
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text$1("Critical Path Method");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(6:8) <Link             to=\\\"cpm\\\"             aria-current=\\\"page\\\"             class=\\\"inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active\\\"             >",
    		ctx
    	});

    	return block;
    }

    // (14:8) <Link             to="tp"             class="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"             >
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text$1("Transportation Problem");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(14:8) <Link             to=\\\"tp\\\"             class=\\\"inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50\\\"             >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let ul;
    	let li0;
    	let link0;
    	let t;
    	let li1;
    	let link1;
    	let current;

    	link0 = new Link$1({
    			props: {
    				to: "cpm",
    				"aria-current": "page",
    				class: "inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$1({
    			props: {
    				to: "tp",
    				class: "inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			ul = element$1("ul");
    			li0 = element$1("li");
    			create_component$1(link0.$$.fragment);
    			t = space$1();
    			li1 = element$1("li");
    			create_component$1(link1.$$.fragment);
    			attr_dev(li0, "class", "mr-2");
    			add_location(li0, file$b, 4, 4, 164);
    			attr_dev(li1, "class", "mr-2");
    			add_location(li1, file$b, 12, 4, 434);
    			attr_dev(ul, "class", "flex flex-wrap justify-center border-b border-gray-200 max-w-xl mx-auto my-5");
    			add_location(ul, file$b, 3, 0, 70);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			mount_component$1(link0, li0, null);
    			append_dev(ul, t);
    			append_dev(ul, li1);
    			mount_component$1(link1, li1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(link0.$$.fragment, local);
    			transition_in$1(link1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(link0.$$.fragment, local);
    			transition_out$1(link1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_component$1(link0);
    			destroy_component$1(link1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Link: Link$1 });
    	return [];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$m, create_fragment$m, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    class Node$1 {
        constructor(id) {
            this.id = id;
            this.eft = 0;
            this.lft = 0;
            this.spare = 0;
            this.adjList = [];
            this.predecessors = [];
        }
        get getAdjacents() {
            return this.adjList;
        }
        get getPredecessors() {
            return this.predecessors;
        }
        addPredecessor(node) {
            this.predecessors.push(node);
        }
        addAdjacent(node) {
            this.adjList.push(node);
        }
        removeAdjacent(node) {
            const nodes = this.adjList.map((adj) => adj.node);
            const index = nodes.indexOf(node);
            if (index > -1) {
                this.adjList.splice(index, 1);
                console.log(this.adjList);
                return node;
            }
        }
        isAdjacent(node) {
            return this.adjList.indexOf(node) > -1;
        }
    }

    class Graph {
        constructor() {
            this.nodes = new Map();
            this.adjList = [];
        }
        get getNodes() {
            return this.nodes;
        }
        get getAdjacentsList() {
            return this.adjList;
        }
        goForward() {
            this.nodes.forEach((node) => {
                node.predecessors.forEach((pre) => {
                    node.eft = pre.node.eft + pre.weight;
                    if (node.predecessors.length > 1) {
                        const max = node.predecessors.reduce((prev, current) => {
                            // t(j)^0 = max{t(i)^0 + t(i-j), i < j}
                            return prev.node.eft + prev.weight >
                                current.node.eft + current.weight
                                ? prev
                                : current;
                        });
                        node.eft = max.node.eft + max.weight;
                    }
                });
            });
        }
        goBackward() {
            const lastNode = this.nodes.get(this.nodes.size - 1);
            lastNode.lft = lastNode.eft;
            for (let i = this.nodes.size - 1; i >= 0; i--) {
                const node = this.nodes.get(i);
                const nodeAdjacents = node === null || node === void 0 ? void 0 : node.getAdjacents;
                if (nodeAdjacents.length > 1) {
                    const min = nodeAdjacents.reduce((prev, current) => {
                        // t(j)^1 = min{t(j)^1 - t(i-j), j < i}
                        return prev.node.lft - prev.weight <
                            current.node.lft - current.weight
                            ? prev
                            : current;
                    });
                    node.lft = min.node.lft - min.weight;
                }
                node.predecessors.forEach((pre) => {
                    pre.node.lft = node.lft - pre.weight;
                    node.spare = node.lft - node.eft;
                });
            }
        }
        *findCriticalPath() {
            this.goForward();
            this.goBackward();
            const visited = new Map();
            const criticalPath = [];
            const firstList = this.nodes.get(0).adjList;
            const firstNode = firstList &&
                firstList.reduce((prev, current) => {
                    return prev.node.lft - prev.weight <
                        current.node.lft - current.weight
                        ? prev
                        : current;
                });
            criticalPath.push(firstNode);
            while (criticalPath.length > 0) {
                const nextNode = criticalPath.pop();
                if (nextNode && !visited.has(nextNode)) {
                    yield nextNode;
                    visited.set(nextNode, true);
                    const proceed = nextNode.node.getAdjacents.length > 0;
                    const next = proceed &&
                        nextNode.node.getAdjacents.reduce((prev, current) => {
                            return prev.node.lft - prev.weight <
                                current.node.lft - current.weight
                                ? prev
                                : current;
                        });
                    criticalPath.push(next);
                }
            }
        }
        addEdge(src, dst, weight, name) {
            const sourceNode = this.addVertex(src);
            const destinationNode = this.addVertex(dst);
            sourceNode.addAdjacent({ node: destinationNode, weight, name });
            destinationNode.addPredecessor({ node: sourceNode, weight, name });
            sourceNode.addAdjacent({ node: destinationNode, weight, name });
            this.adjList[src].push({ node: destinationNode, weight, name });
            return [sourceNode, destinationNode];
        }
        removeEdge(src, dst) {
            const sourceNode = this.nodes.get(src);
            const destinationNode = this.nodes.get(dst);
            if (sourceNode && destinationNode) {
                sourceNode.removeAdjacent(destinationNode);
                this.nodes.delete(src);
                this.nodes.delete(dst);
            }
            return [sourceNode, destinationNode];
        }
        addVertex(id) {
            if (this.nodes.has(id)) {
                return this.nodes.get(id);
            }
            else {
                const vertex = new Node$1(id);
                this.nodes.set(id, vertex);
                // Keep in order for successful pathfinding
                this.nodes = new Map([...this.nodes.entries()].sort());
                this.adjList[id] = [];
                return vertex;
            }
        }
        removeVertex(id) {
            const current = this.nodes.get(id);
            if (current) {
                for (const node of this.nodes.values()) {
                    node.removeAdjacent(current);
                }
            }
        }
    }

    const graphStore = writable$1(new Graph());
    const criticalPath = writable$1([]);

    /* src/components/criticalPath.svelte generated by Svelte v3.46.4 */
    const file$a = "src/components/criticalPath.svelte";

    function get_each_context$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].name;
    	return child_ctx;
    }

    // (13:8) {#each $criticalPath as { name }}
    function create_each_block$a(ctx) {
    	let li;
    	let div;
    	let svg;
    	let path;
    	let t0;
    	let span;
    	let t1_value = /*name*/ ctx[2] + "";
    	let t1;

    	const block = {
    		c: function create() {
    			li = element$1("li");
    			div = element$1("div");
    			svg = svg_element$1("svg");
    			path = svg_element$1("path");
    			t0 = space$1();
    			span = element$1("span");
    			t1 = text$1(t1_value);
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z");
    			attr_dev(path, "clip-rule", "evenodd");
    			add_location(path, file$a, 20, 25, 935);
    			attr_dev(svg, "class", "w-6 h-6 text-gray-400");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$a, 15, 20, 704);
    			attr_dev(span, "class", "ml-1 text-md font-medium text-blue-600 hover:text-blue-700 md:ml-2");
    			add_location(span, file$a, 26, 20, 1258);
    			attr_dev(div, "class", "flex items-center");
    			add_location(div, file$a, 14, 16, 652);
    			add_location(li, file$a, 13, 12, 631);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			append_dev(div, svg);
    			append_dev(svg, path);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$criticalPath*/ 1 && t1_value !== (t1_value = /*name*/ ctx[2] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$a.name,
    		type: "each",
    		source: "(13:8) {#each $criticalPath as { name }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let div3;
    	let h1;
    	let t1;
    	let ol;
    	let li0;
    	let div0;
    	let span0;
    	let t3;
    	let t4;
    	let svg;
    	let path;
    	let t5;
    	let li1;
    	let div1;
    	let span1;
    	let t7;
    	let div2;
    	let span2;
    	let t9;
    	let span3;
    	let t10;
    	let each_value = /*$criticalPath*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Critical Path";
    			t1 = space$1();
    			ol = element$1("ol");
    			li0 = element$1("li");
    			div0 = element$1("div");
    			span0 = element$1("span");
    			span0.textContent = "START";
    			t3 = space$1();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space$1();
    			svg = svg_element$1("svg");
    			path = svg_element$1("path");
    			t5 = space$1();
    			li1 = element$1("li");
    			div1 = element$1("div");
    			span1 = element$1("span");
    			span1.textContent = "END";
    			t7 = space$1();
    			div2 = element$1("div");
    			span2 = element$1("span");
    			span2.textContent = "TOTAL:";
    			t9 = space$1();
    			span3 = element$1("span");
    			t10 = text$1(/*total*/ ctx[1]);
    			attr_dev(h1, "class", "text-2xl font-black flex-1");
    			add_location(h1, file$a, 5, 4, 238);
    			attr_dev(span0, "class", "ml-1 text-md font-medium text-gray-700md:ml-2");
    			add_location(span0, file$a, 9, 16, 471);
    			attr_dev(div0, "class", "flex items-center");
    			add_location(div0, file$a, 8, 12, 423);
    			add_location(li0, file$a, 7, 8, 406);
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z");
    			attr_dev(path, "clip-rule", "evenodd");
    			add_location(path, file$a, 31, 13, 1541);
    			attr_dev(svg, "class", "w-6 h-6 text-gray-400");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$a, 30, 8, 1418);
    			attr_dev(span1, "class", "ml-1 text-md font-medium text-gray-700 md:ml-2");
    			add_location(span1, file$a, 39, 16, 1857);
    			attr_dev(div1, "class", "flex items-center");
    			add_location(div1, file$a, 38, 12, 1809);
    			add_location(li1, file$a, 37, 8, 1792);
    			attr_dev(ol, "class", "inline-flex items-center justify-center space-x-1 md:space-x-3 flex-2 cursor-default");
    			add_location(ol, file$a, 6, 4, 300);
    			attr_dev(span2, "class", "ml-1 text-md font-medium text-gray-700md:ml-2");
    			add_location(span2, file$a, 44, 8, 2028);
    			attr_dev(span3, "class", "ml-1 text-md text-gray-700md:ml-2");
    			add_location(span3, file$a, 45, 8, 2111);
    			attr_dev(div2, "class", "flex flex-1 justify-end gap-2");
    			add_location(div2, file$a, 43, 4, 1976);
    			attr_dev(div3, "class", "flex items-center overflow-x-auto shadow-md sm:rounded-lg bg-white px-4 py-2");
    			add_location(div3, file$a, 4, 0, 143);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h1);
    			append_dev(div3, t1);
    			append_dev(div3, ol);
    			append_dev(ol, li0);
    			append_dev(li0, div0);
    			append_dev(div0, span0);
    			append_dev(ol, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			append_dev(ol, t4);
    			append_dev(ol, svg);
    			append_dev(svg, path);
    			append_dev(ol, t5);
    			append_dev(ol, li1);
    			append_dev(li1, div1);
    			append_dev(div1, span1);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t9);
    			append_dev(div2, span3);
    			append_dev(span3, t10);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$criticalPath*/ 1) {
    				each_value = /*$criticalPath*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$a(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$a(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, t4);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*total*/ 2) set_data_dev(t10, /*total*/ ctx[1]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each$1(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let total;
    	let $criticalPath;
    	validate_store(criticalPath, 'criticalPath');
    	component_subscribe$1($$self, criticalPath, $$value => $$invalidate(0, $criticalPath = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CriticalPath', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CriticalPath> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ criticalPath, total, $criticalPath });

    	$$self.$inject_state = $$props => {
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$criticalPath*/ 1) {
    			$$invalidate(1, total = $criticalPath.reduce((a, b) => a + b.weight, 0));
    		}
    	};

    	return [$criticalPath, total];
    }

    class CriticalPath extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$l, create_fragment$l, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CriticalPath",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function flip(node, { from, to }, params = {}) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
        const dx = (from.left + from.width * ox / to.width) - (to.left + ox);
        const dy = (from.top + from.height * oy / to.height) - (to.top + oy);
        const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
        return {
            delay,
            duration: is_function$1(duration) ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
            easing,
            css: (t, u) => {
                const x = u * dx;
                const y = u * dy;
                const sx = t + u * from.width / to.width;
                const sy = t + u * from.height / to.height;
                return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
            }
        };
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src/components/dropdown.svelte generated by Svelte v3.46.4 */
    const file$9 = "src/components/dropdown.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[13] = list;
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (71:4) {#if open}
    function create_if_block$5(ctx) {
    	let div1;
    	let div0;
    	let p;
    	let t1;
    	let each_value = /*options*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$4(ctx);
    	}

    	const block = {
    		c: function create() {
    			div1 = element$1("div");
    			div0 = element$1("div");
    			p = element$1("p");
    			p.textContent = "Immediate predecessors";
    			t1 = space$1();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			attr_dev(p, "class", "pl-3 pb-2 font-medium text-gray-800");
    			add_location(p, file$9, 79, 16, 2760);
    			attr_dev(div0, "class", "py-2");
    			attr_dev(div0, "role", "none");
    			add_location(div0, file$9, 78, 12, 2713);
    			attr_dev(div1, "class", "origin-top-right absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none");
    			attr_dev(div1, "role", "menu");
    			attr_dev(div1, "aria-orientation", "vertical");
    			attr_dev(div1, "aria-labelledby", "menu-button");
    			attr_dev(div1, "tabindex", "-1");
    			add_location(div1, file$9, 71, 8, 2403);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(div0, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div0, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options, checkedValues, submit*/ 56) {
    				each_value = /*options*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block$4(ctx);
    					each_1_else.c();
    					each_1_else.m(div0, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each$1(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(71:4) {#if open}",
    		ctx
    	});

    	return block;
    }

    // (94:16) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let svg;
    	let path;
    	let t0;
    	let span;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			svg = svg_element$1("svg");
    			path = svg_element$1("path");
    			t0 = space$1();
    			span = element$1("span");
    			span.textContent = "Empty";
    			t2 = space$1();
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "2");
    			attr_dev(path, "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z");
    			add_location(path, file$9, 101, 29, 4097);
    			attr_dev(svg, "class", "w-5 h-5");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$9, 95, 24, 3818);
    			add_location(span, file$9, 108, 24, 4518);
    			attr_dev(div, "class", "flex gap-2 px-3 items-center");
    			add_location(div, file$9, 94, 20, 3751);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(div, t2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(94:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (81:16) {#each options as option}
    function create_each_block$9(ctx) {
    	let div;
    	let input;
    	let input_id_value;
    	let t0;
    	let label;
    	let t1_value = /*option*/ ctx[12] + "";
    	let t1;
    	let label_for_value;
    	let t2;
    	let mounted;
    	let dispose;

    	function input_change_handler() {
    		/*input_change_handler*/ ctx[9].call(input, /*option*/ ctx[12]);
    	}

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			input = element$1("input");
    			t0 = space$1();
    			label = element$1("label");
    			t1 = text$1(t1_value);
    			t2 = space$1();
    			attr_dev(input, "class", "form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "id", input_id_value = `option-${/*option*/ ctx[12]}`);
    			add_location(input, file$9, 82, 24, 2992);
    			attr_dev(label, "class", "form-check-label inline-block text-gray-800 flex-1");
    			attr_dev(label, "for", label_for_value = `option-${/*option*/ ctx[12]}`);
    			add_location(label, file$9, 89, 24, 3518);
    			attr_dev(div, "class", "form-check flex gap-2 px-3 items-center hover:bg-gray-100");
    			add_location(div, file$9, 81, 20, 2896);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			input.checked = /*checkedValues*/ ctx[4][/*option*/ ctx[12]];
    			append_dev(div, t0);
    			append_dev(div, label);
    			append_dev(label, t1);
    			append_dev(div, t2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", input_change_handler),
    					listen_dev(input, "click", /*submit*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*options*/ 8 && input_id_value !== (input_id_value = `option-${/*option*/ ctx[12]}`)) {
    				attr_dev(input, "id", input_id_value);
    			}

    			if (dirty & /*checkedValues, options*/ 24) {
    				input.checked = /*checkedValues*/ ctx[4][/*option*/ ctx[12]];
    			}

    			if (dirty & /*options*/ 8 && t1_value !== (t1_value = /*option*/ ctx[12] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*options*/ 8 && label_for_value !== (label_for_value = `option-${/*option*/ ctx[12]}`)) {
    				attr_dev(label, "for", label_for_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all$1(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(81:16) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div;
    	let button;
    	let span;
    	let t1;
    	let svg;
    	let path;
    	let button_class_value;
    	let t2;
    	let mounted;
    	let dispose;
    	let if_block = /*open*/ ctx[2] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			button = element$1("button");
    			span = element$1("span");
    			span.textContent = "Predecessors";
    			t1 = space$1();
    			svg = svg_element$1("svg");
    			path = svg_element$1("path");
    			t2 = space$1();
    			if (if_block) if_block.c();
    			add_location(span, file$9, 54, 8, 1830);
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z");
    			attr_dev(path, "clip-rule", "evenodd");
    			add_location(path, file$9, 63, 12, 2123);
    			attr_dev(svg, "class", "-mr-1 ml-2 h-5 w-5");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "aria-hidden", "true");
    			add_location(svg, file$9, 56, 8, 1915);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", button_class_value = `${/*size*/ ctx[0]} h-full inline-flex flex-auto items-center bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3 p-2.5`);
    			attr_dev(button, "id", "menu-button");
    			attr_dev(button, "aria-expanded", "true");
    			attr_dev(button, "aria-haspopup", "true");
    			add_location(button, file$9, 41, 4, 1262);
    			attr_dev(div, "class", "relative inline-block text-left");
    			add_location(div, file$9, 40, 0, 1195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, span);
    			append_dev(button, t1);
    			append_dev(button, svg);
    			append_dev(svg, path);
    			append_dev(div, t2);
    			if (if_block) if_block.m(div, null);
    			/*div_binding*/ ctx[10](div);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 1 && button_class_value !== (button_class_value = `${/*size*/ ctx[0]} h-full inline-flex flex-auto items-center bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3 p-2.5`)) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (/*open*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			/*div_binding*/ ctx[10](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dropdown', slots, []);
    	let { size = 'w-32' } = $$props;
    	let { value = {} } = $$props;
    	let { getOptions } = $$props;
    	let menu = null;
    	let open = false;
    	let options;
    	let checkedValues = {};
    	const dispatch = createEventDispatcher$1();

    	const submit = () => {
    		$$invalidate(6, value = checkedValues);
    		dispatch('submit');
    	}; // checkedValues = {};

    	onMount$1(() => {
    		// https://codechips.me/tailwind-ui-react-vs-svelte/
    		const handleOutsideClick = event => {
    			if (open && !menu.contains(event.target)) {
    				$$invalidate(2, open = false);
    				submit();
    			}
    		};

    		const handleEscape = event => {
    			if (open && event.key === 'Escape') {
    				$$invalidate(2, open = false);
    				submit();
    			}
    		};

    		// add events when element is added to the DOM
    		document.addEventListener('click', handleOutsideClick, false);

    		document.addEventListener('keyup', handleEscape, false);

    		// remove events when element is removed from the DOM
    		return () => {
    			document.removeEventListener('click', handleOutsideClick, false);
    			document.removeEventListener('keyup', handleEscape, false);
    		};
    	});

    	const writable_props = ['size', 'value', 'getOptions'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dropdown> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(2, open = !open);

    	function input_change_handler(option) {
    		checkedValues[option] = this.checked;
    		$$invalidate(4, checkedValues);
    	}

    	function div_binding($$value) {
    		binding_callbacks$1[$$value ? 'unshift' : 'push'](() => {
    			menu = $$value;
    			$$invalidate(1, menu);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('value' in $$props) $$invalidate(6, value = $$props.value);
    		if ('getOptions' in $$props) $$invalidate(7, getOptions = $$props.getOptions);
    	};

    	$$self.$capture_state = () => ({
    		onMount: onMount$1,
    		createEventDispatcher: createEventDispatcher$1,
    		size,
    		value,
    		getOptions,
    		menu,
    		open,
    		options,
    		checkedValues,
    		dispatch,
    		submit
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('value' in $$props) $$invalidate(6, value = $$props.value);
    		if ('getOptions' in $$props) $$invalidate(7, getOptions = $$props.getOptions);
    		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
    		if ('open' in $$props) $$invalidate(2, open = $$props.open);
    		if ('options' in $$props) $$invalidate(3, options = $$props.options);
    		if ('checkedValues' in $$props) $$invalidate(4, checkedValues = $$props.checkedValues);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*getOptions*/ 128) {
    			$$invalidate(3, options = getOptions());
    		}
    	};

    	return [
    		size,
    		menu,
    		open,
    		options,
    		checkedValues,
    		submit,
    		value,
    		getOptions,
    		click_handler,
    		input_change_handler,
    		div_binding
    	];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$k, create_fragment$k, safe_not_equal$1, { size: 0, value: 6, getOptions: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*getOptions*/ ctx[7] === undefined && !('getOptions' in props)) {
    			console.warn("<Dropdown> was created without expected prop 'getOptions'");
    		}
    	}

    	get size() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getOptions() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getOptions(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/error.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1$1 } = globals;
    const file$8 = "src/components/error.svelte";

    function create_fragment$j(ctx) {
    	let div;
    	let strong;
    	let t0;
    	let t1;
    	let span0;
    	let t2;
    	let t3;
    	let span1;
    	let svg;
    	let title;
    	let t4;
    	let path;
    	let div_intro;
    	let div_outro;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			strong = element$1("strong");
    			t0 = text$1(/*header*/ ctx[0]);
    			t1 = space$1();
    			span0 = element$1("span");
    			t2 = text$1(/*message*/ ctx[1]);
    			t3 = space$1();
    			span1 = element$1("span");
    			svg = svg_element$1("svg");
    			title = svg_element$1("title");
    			t4 = text$1("Close");
    			path = svg_element$1("path");
    			attr_dev(strong, "class", "font-bold");
    			add_location(strong, file$8, 18, 4, 459);
    			attr_dev(span0, "class", "block sm:inline");
    			add_location(span0, file$8, 19, 4, 507);
    			add_location(title, file$8, 29, 13, 843);
    			attr_dev(path, "d", "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z");
    			add_location(path, file$8, 29, 33, 863);
    			attr_dev(svg, "class", "fill-current h-6 w-6 text-red-500");
    			attr_dev(svg, "role", "button");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			add_location(svg, file$8, 24, 8, 666);
    			attr_dev(span1, "class", "absolute top-0 bottom-0 right-0 px-4 py-3");
    			add_location(span1, file$8, 20, 4, 558);
    			attr_dev(div, "class", "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative");
    			attr_dev(div, "role", "alert");
    			add_location(div, file$8, 12, 0, 294);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, strong);
    			append_dev(strong, t0);
    			append_dev(div, t1);
    			append_dev(div, span0);
    			append_dev(span0, t2);
    			append_dev(div, t3);
    			append_dev(div, span1);
    			append_dev(span1, svg);
    			append_dev(svg, title);
    			append_dev(title, t4);
    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span1, "click", /*clearError*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*header*/ 1) set_data_dev(t0, /*header*/ ctx[0]);
    			if (!current || dirty & /*message*/ 2) set_data_dev(t2, /*message*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback$1(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fade, {});
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { duration: 300, x: 100 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_outro) div_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Error', slots, []);
    	let { header = 'Error' } = $$props;
    	let { message } = $$props;
    	const dispatch = createEventDispatcher$1();

    	const clearError = () => {
    		dispatch('clear', { message });
    	};

    	const writable_props = ['header', 'message'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Error> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		fly,
    		createEventDispatcher: createEventDispatcher$1,
    		header,
    		message,
    		dispatch,
    		clearError
    	});

    	$$self.$inject_state = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [header, message, clearError];
    }

    class Error$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$j, create_fragment$j, safe_not_equal$1, { header: 0, message: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$j.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*message*/ ctx[1] === undefined && !('message' in props)) {
    			console.warn("<Error> was created without expected prop 'message'");
    		}
    	}

    	get header() {
    		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get message() {
    		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set message(value) {
    		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/crudTable.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1, Object: Object_1$1 } = globals;
    const file$7 = "src/components/crudTable.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[28] = list[i].activity;
    	child_ctx[29] = list[i].duration;
    	child_ctx[30] = list[i].predecessors;
    	child_ctx[31] = list[i].dependsOn;
    	child_ctx[32] = list;
    	child_ctx[33] = i;
    	return child_ctx;
    }

    function get_each_context_1$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[37] = list[i].message;
    	child_ctx[33] = i;
    	return child_ctx;
    }

    // (181:8) {:else}
    function create_else_block_3(ctx) {
    	let dropdown;
    	let updating_value;
    	let current;

    	function dropdown_value_binding(value) {
    		/*dropdown_value_binding*/ ctx[18](value);
    	}

    	let dropdown_props = {
    		size: "w-full",
    		getOptions: /*data*/ ctx[0] && /*getAvailablePredecessors*/ ctx[11]
    	};

    	if (/*checkedValues*/ ctx[5] !== void 0) {
    		dropdown_props.value = /*checkedValues*/ ctx[5];
    	}

    	dropdown = new Dropdown({ props: dropdown_props, $$inline: true });
    	binding_callbacks$1.push(() => bind(dropdown, 'value', dropdown_value_binding));

    	const block = {
    		c: function create() {
    			create_component$1(dropdown.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdown_changes = {};
    			if (dirty[0] & /*data*/ 1) dropdown_changes.getOptions = /*data*/ ctx[0] && /*getAvailablePredecessors*/ ctx[11];

    			if (!updating_value && dirty[0] & /*checkedValues*/ 32) {
    				updating_value = true;
    				dropdown_changes.value = /*checkedValues*/ ctx[5];
    				add_flush_callback(() => updating_value = false);
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(181:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (173:8) {#if useNodeValues}
    function create_if_block_2$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element$1("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "contenteditable", true);
    			attr_dev(input, "placeholder", "Connected nodes [e.q 1, 2]");
    			attr_dev(input, "class", "w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5");
    			add_location(input, file$7, 173, 12, 6240);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*inputValues*/ ctx[3].nodes);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[17]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*inputValues*/ 8 && input.value !== /*inputValues*/ ctx[3].nodes) {
    				set_input_value(input, /*inputValues*/ ctx[3].nodes);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(173:8) {#if useNodeValues}",
    		ctx
    	});

    	return block;
    }

    // (204:8) {#each errors as { message }
    function create_each_block_2$3(key_1, ctx) {
    	let first;
    	let error;
    	let current;

    	error = new Error$1({
    			props: { message: /*message*/ ctx[37] },
    			$$inline: true
    		});

    	error.$on("clear", /*clearError*/ ctx[10]);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty$1();
    			create_component$1(error.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component$1(error, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const error_changes = {};
    			if (dirty[0] & /*errors*/ 4) error_changes.message = /*message*/ ctx[37];
    			error.$set(error_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(error.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(error.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component$1(error, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$3.name,
    		type: "each",
    		source: "(204:8) {#each errors as { message }",
    		ctx
    	});

    	return block;
    }

    // (212:16) {#each columns as column}
    function create_each_block_1$4(ctx) {
    	let th;
    	let t_value = /*column*/ ctx[34] + "";
    	let t;

    	const block = {
    		c: function create() {
    			th = element$1("th");
    			t = text$1(t_value);
    			attr_dev(th, "scope", "col");
    			attr_dev(th, "class", "px-6 py-3");
    			add_location(th, file$7, 212, 20, 7866);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$4.name,
    		type: "each",
    		source: "(212:16) {#each columns as column}",
    		ctx
    	});

    	return block;
    }

    // (287:12) {:else}
    function create_else_block_2$1(ctx) {
    	let tr;
    	let td;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			tr = element$1("tr");
    			td = element$1("td");
    			t0 = text$1("You haven't added any activities yet. Use the form above to add new records.");
    			t1 = space$1();
    			attr_dev(td, "colspan", /*columns*/ ctx[7].length);
    			attr_dev(td, "class", "md:text-2xl sm:text-sm font-medium text-center px-5 py-10");
    			add_location(td, file$7, 288, 20, 12044);
    			add_location(tr, file$7, 287, 16, 12019);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td);
    			append_dev(td, t0);
    			append_dev(tr, t1);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2$1.name,
    		type: "else",
    		source: "(287:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (230:24) {:else}
    function create_else_block_1$1(ctx) {
    	let span;
    	let t_value = /*duration*/ ctx[29] + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element$1("span");
    			t = text$1(t_value);
    			attr_dev(span, "contenteditable", "false");
    			attr_dev(span, "class", "border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5");
    			add_location(span, file$7, 230, 28, 8837);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1 && t_value !== (t_value = /*duration*/ ctx[29] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(230:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (224:24) {#if editMode}
    function create_if_block_1$3(ctx) {
    	let span;
    	let mounted;
    	let dispose;

    	function span_input_handler() {
    		/*span_input_handler*/ ctx[19].call(span, /*each_value*/ ctx[32], /*id*/ ctx[33]);
    	}

    	const block = {
    		c: function create() {
    			span = element$1("span");
    			attr_dev(span, "contenteditable", "true");
    			attr_dev(span, "class", "border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5");
    			if (/*duration*/ ctx[29] === void 0) add_render_callback$1(span_input_handler);
    			add_location(span, file$7, 224, 28, 8450);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (/*duration*/ ctx[29] !== void 0) {
    				span.innerHTML = /*duration*/ ctx[29];
    			}

    			if (!mounted) {
    				dispose = listen_dev(span, "input", span_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*data*/ 1 && /*duration*/ ctx[29] !== span.innerHTML) {
    				span.innerHTML = /*duration*/ ctx[29];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(224:24) {#if editMode}",
    		ctx
    	});

    	return block;
    }

    // (243:24) {:else}
    function create_else_block$3(ctx) {
    	let span;

    	let t_value = (/*predecessors*/ ctx[30].length > 0
    	? /*predecessors*/ ctx[30].join(', ')
    	: '-') + "";

    	let t;

    	const block = {
    		c: function create() {
    			span = element$1("span");
    			t = text$1(t_value);
    			attr_dev(span, "class", "border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 p-2.5");
    			add_location(span, file$7, 243, 28, 9601);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1 && t_value !== (t_value = (/*predecessors*/ ctx[30].length > 0
    			? /*predecessors*/ ctx[30].join(', ')
    			: '-') + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(243:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (238:24) {#if editMode}
    function create_if_block$4(ctx) {
    	let dropdown;
    	let updating_value;
    	let current;

    	function func() {
    		return /*func*/ ctx[20](/*activity*/ ctx[28]);
    	}

    	function dropdown_value_binding_1(value) {
    		/*dropdown_value_binding_1*/ ctx[21](value);
    	}

    	let dropdown_props = { getOptions: func };

    	if (/*inputValues*/ ctx[3].predecessors !== void 0) {
    		dropdown_props.value = /*inputValues*/ ctx[3].predecessors;
    	}

    	dropdown = new Dropdown({ props: dropdown_props, $$inline: true });
    	binding_callbacks$1.push(() => bind(dropdown, 'value', dropdown_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component$1(dropdown.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const dropdown_changes = {};
    			if (dirty[0] & /*data*/ 1) dropdown_changes.getOptions = func;

    			if (!updating_value && dirty[0] & /*inputValues*/ 8) {
    				updating_value = true;
    				dropdown_changes.value = /*inputValues*/ ctx[3].predecessors;
    				add_flush_callback(() => updating_value = false);
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(238:24) {#if editMode}",
    		ctx
    	});

    	return block;
    }

    // (220:12) {#each data as { activity, duration, predecessors, dependsOn }
    function create_each_block$8(key_1, ctx) {
    	let tr;
    	let th;
    	let t0_value = /*activity*/ ctx[28] + "";
    	let t0;
    	let t1;
    	let td0;
    	let t2;
    	let td1;
    	let current_block_type_index;
    	let if_block1;
    	let t3;
    	let div;
    	let button0;
    	let svg0;
    	let path0;
    	let t4;
    	let button1;
    	let svg1;
    	let path1;
    	let t5;
    	let tr_intro;
    	let tr_outro;
    	let rect;
    	let stop_animation = noop$1;
    	let current;
    	let mounted;
    	let dispose;

    	function select_block_type_1(ctx, dirty) {
    		if (/*editMode*/ ctx[6]) return create_if_block_1$3;
    		return create_else_block_1$1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block0 = current_block_type(ctx);
    	const if_block_creators = [create_if_block$4, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*editMode*/ ctx[6]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[22](/*dependsOn*/ ctx[31]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			tr = element$1("tr");
    			th = element$1("th");
    			t0 = text$1(t0_value);
    			t1 = space$1();
    			td0 = element$1("td");
    			if_block0.c();
    			t2 = space$1();
    			td1 = element$1("td");
    			if_block1.c();
    			t3 = space$1();
    			div = element$1("div");
    			button0 = element$1("button");
    			svg0 = svg_element$1("svg");
    			path0 = svg_element$1("path");
    			t4 = space$1();
    			button1 = element$1("button");
    			svg1 = svg_element$1("svg");
    			path1 = svg_element$1("path");
    			t5 = space$1();
    			attr_dev(th, "scope", "row");
    			attr_dev(th, "class", "px-6 py-2 font-medium text-gray-900 whitespace-nowrap");
    			add_location(th, file$7, 221, 20, 8245);
    			attr_dev(td0, "class", "px-3 py-2 ");
    			add_location(td0, file$7, 222, 20, 8359);
    			attr_dev(td1, "class", "px-3 py-2 focus:ring-blue-500 focus:outline-blue-500");
    			add_location(td1, file$7, 236, 25, 9211);
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "2");
    			attr_dev(path0, "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z");
    			add_location(path0, file$7, 261, 33, 10594);
    			attr_dev(svg0, "class", "w-6 h-6 text-blue-500");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "stroke", "currentColor");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg0, file$7, 255, 28, 10277);
    			attr_dev(button0, "class", "border-0");
    			add_location(button0, file$7, 254, 24, 10223);
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "2");
    			attr_dev(path1, "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16");
    			add_location(path1, file$7, 276, 33, 11487);
    			attr_dev(svg1, "class", "w-6 h-6 mb-px text-red-500");
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "stroke", "currentColor");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg1, file$7, 270, 28, 11165);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "border-0");
    			add_location(button1, file$7, 269, 24, 11059);
    			attr_dev(div, "class", "absolute right-0 px-6 py-4 flex justify-center align-center gap-2 transition-opacity opacity-0 group-hover:opacity-100");
    			add_location(div, file$7, 251, 20, 10021);
    			attr_dev(tr, "class", "relative bg-white border-b hover:bg-gray-50 group");
    			add_location(tr, file$7, 220, 16, 8120);
    			this.first = tr;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th);
    			append_dev(th, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td0);
    			if_block0.m(td0, null);
    			append_dev(td0, t2);
    			append_dev(tr, td1);
    			if_blocks[current_block_type_index].m(td1, null);
    			append_dev(tr, t3);
    			append_dev(tr, div);
    			append_dev(div, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div, t4);
    			append_dev(div, button1);
    			append_dev(button1, svg1);
    			append_dev(svg1, path1);
    			append_dev(tr, t5);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button1, "click", click_handler_1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*data*/ 1) && t0_value !== (t0_value = /*activity*/ ctx[28] + "")) set_data_dev(t0, t0_value);
    			if_block0.p(ctx, dirty);
    			if_block1.p(ctx, dirty);
    		},
    		r: function measure() {
    			rect = tr.getBoundingClientRect();
    		},
    		f: function fix() {
    			fix_position(tr);
    			stop_animation();
    			add_transform(tr, rect);
    		},
    		a: function animate() {
    			stop_animation();
    			stop_animation = create_animation(tr, rect, flip, {});
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(if_block1);

    			add_render_callback$1(() => {
    				if (tr_outro) tr_outro.end(1);
    				tr_intro = create_in_transition(tr, fade, {});
    				tr_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(if_block1);
    			if (tr_intro) tr_intro.invalidate();
    			tr_outro = create_out_transition(tr, fly, { x: 100 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if_block0.d();
    			if_blocks[current_block_type_index].d();
    			if (detaching && tr_outro) tr_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(220:12) {#each data as { activity, duration, predecessors, dependsOn }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t1;
    	let label;
    	let input0;
    	let t2;
    	let t3;
    	let form;
    	let input1;
    	let t4;
    	let input2;
    	let t5;
    	let current_block_type_index;
    	let if_block;
    	let t6;
    	let button;
    	let svg;
    	let path;
    	let t7;
    	let span;
    	let t9;
    	let div1;
    	let each_blocks_2 = [];
    	let each0_lookup = new Map();
    	let t10;
    	let table;
    	let thead;
    	let tr;
    	let t11;
    	let tbody;
    	let each_blocks = [];
    	let each2_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_2$2, create_else_block_3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*useNodeValues*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let each_value_2 = /*errors*/ ctx[2];
    	validate_each_argument(each_value_2);
    	const get_key = ctx => /*message*/ ctx[37];
    	validate_each_keys(ctx, each_value_2, get_each_context_2$3, get_key);

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		let child_ctx = get_each_context_2$3(ctx, each_value_2, i);
    		let key = get_key(child_ctx);
    		each0_lookup.set(key, each_blocks_2[i] = create_each_block_2$3(key, child_ctx));
    	}

    	let each_value_1 = /*columns*/ ctx[7];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
    	}

    	let each_value = /*data*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key_1 = ctx => /*dependsOn*/ ctx[31];
    	validate_each_keys(ctx, each_value, get_each_context$8, get_key_1);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$8(ctx, each_value, i);
    		let key = get_key_1(child_ctx);
    		each2_lookup.set(key, each_blocks[i] = create_each_block$8(key, child_ctx));
    	}

    	let each2_else = null;

    	if (!each_value.length) {
    		each2_else = create_else_block_2$1(ctx);
    	}

    	const block = {
    		c: function create() {
    			div2 = element$1("div");
    			div0 = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Activities";
    			t1 = space$1();
    			label = element$1("label");
    			input0 = element$1("input");
    			t2 = text$1("Use node values");
    			t3 = space$1();
    			form = element$1("form");
    			input1 = element$1("input");
    			t4 = space$1();
    			input2 = element$1("input");
    			t5 = space$1();
    			if_block.c();
    			t6 = space$1();
    			button = element$1("button");
    			svg = svg_element$1("svg");
    			path = svg_element$1("path");
    			t7 = space$1();
    			span = element$1("span");
    			span.textContent = "Add";
    			t9 = space$1();
    			div1 = element$1("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t10 = space$1();
    			table = element$1("table");
    			thead = element$1("thead");
    			tr = element$1("tr");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t11 = space$1();
    			tbody = element$1("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each2_else) {
    				each2_else.c();
    			}

    			attr_dev(h1, "class", "text-2xl font-black");
    			add_location(h1, file$7, 143, 8, 4773);
    			attr_dev(input0, "class", "form-check-input h-4 w-4 mr-1 mt-1 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer");
    			attr_dev(input0, "type", "checkbox");
    			attr_dev(input0, "id", "predecessorType");
    			add_location(input0, file$7, 145, 13, 4884);
    			attr_dev(label, "for", "predecessorType");
    			attr_dev(label, "class", "pt-1");
    			add_location(label, file$7, 144, 8, 4829);
    			attr_dev(div0, "class", "flex gap-1 items-center justify-between pt-2 px-4");
    			add_location(div0, file$7, 142, 4, 4701);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "contenteditable", true);
    			attr_dev(input1, "placeholder", "Activity name");
    			attr_dev(input1, "class", "w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5");
    			add_location(input1, file$7, 156, 8, 5488);
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "contenteditable", true);
    			attr_dev(input2, "placeholder", "Duration");
    			attr_dev(input2, "class", "w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5");
    			add_location(input2, file$7, 164, 8, 5857);
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "2");
    			attr_dev(path, "d", "M12 6v6m0 0v6m0-6h6m-6 0H6");
    			add_location(path, file$7, 192, 17, 7178);
    			attr_dev(svg, "class", "w-6 h-6");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$7, 186, 12, 6971);
    			add_location(span, file$7, 199, 12, 7409);
    			attr_dev(button, "class", "flex gap-1 items-center justify-end focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5");
    			add_location(button, file$7, 183, 8, 6750);
    			attr_dev(form, "class", "flex gap-4 p-4");
    			add_location(form, file$7, 155, 4, 5416);
    			attr_dev(div1, "class", "flex flex-col gap-2 p-4 pt-0");
    			add_location(div1, file$7, 202, 4, 7460);
    			add_location(tr, file$7, 210, 12, 7799);
    			attr_dev(thead, "class", "text-xs text-gray-700 uppercase bg-gray-50");
    			add_location(thead, file$7, 209, 8, 7728);
    			add_location(tbody, file$7, 218, 8, 8004);
    			attr_dev(table, "class", "w-full text-sm text-left text-gray-500");
    			add_location(table, file$7, 207, 4, 7640);
    			attr_dev(div2, "class", "relative shadow-md sm:rounded-lg bg-white");
    			add_location(div2, file$7, 141, 0, 4641);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, label);
    			append_dev(label, input0);
    			input0.checked = /*useNodeValues*/ ctx[1];
    			append_dev(label, t2);
    			append_dev(div2, t3);
    			append_dev(div2, form);
    			append_dev(form, input1);
    			/*input1_binding*/ ctx[14](input1);
    			set_input_value(input1, /*inputValues*/ ctx[3].activity);
    			append_dev(form, t4);
    			append_dev(form, input2);
    			set_input_value(input2, /*inputValues*/ ctx[3].duration);
    			append_dev(form, t5);
    			if_blocks[current_block_type_index].m(form, null);
    			append_dev(form, t6);
    			append_dev(form, button);
    			append_dev(button, svg);
    			append_dev(svg, path);
    			append_dev(button, t7);
    			append_dev(button, span);
    			append_dev(div2, t9);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div1, null);
    			}

    			append_dev(div2, t10);
    			append_dev(div2, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table, t11);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			if (each2_else) {
    				each2_else.m(tbody, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_handler*/ ctx[12]),
    					listen_dev(input0, "click", /*click_handler*/ ctx[13], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[15]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[16]),
    					listen_dev(form, "submit", prevent_default(/*addRow*/ ctx[8]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*useNodeValues*/ 2) {
    				input0.checked = /*useNodeValues*/ ctx[1];
    			}

    			if (dirty[0] & /*inputValues*/ 8 && input1.value !== /*inputValues*/ ctx[3].activity) {
    				set_input_value(input1, /*inputValues*/ ctx[3].activity);
    			}

    			if (dirty[0] & /*inputValues*/ 8 && to_number(input2.value) !== /*inputValues*/ ctx[3].duration) {
    				set_input_value(input2, /*inputValues*/ ctx[3].duration);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros$1();

    				transition_out$1(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros$1();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in$1(if_block, 1);
    				if_block.m(form, t6);
    			}

    			if (dirty[0] & /*errors, clearError*/ 1028) {
    				each_value_2 = /*errors*/ ctx[2];
    				validate_each_argument(each_value_2);
    				group_outros$1();
    				validate_each_keys(ctx, each_value_2, get_each_context_2$3, get_key);
    				each_blocks_2 = update_keyed_each$1(each_blocks_2, dirty, get_key, 1, ctx, each_value_2, each0_lookup, div1, outro_and_destroy_block$1, create_each_block_2$3, null, get_each_context_2$3);
    				check_outros$1();
    			}

    			if (dirty[0] & /*columns*/ 128) {
    				each_value_1 = /*columns*/ ctx[7];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$4(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty[0] & /*deleteRow, data, getAvailablePredecessors, inputValues, editMode, columns*/ 2761) {
    				each_value = /*data*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros$1();
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
    				validate_each_keys(ctx, each_value, get_each_context$8, get_key_1);
    				each_blocks = update_keyed_each$1(each_blocks, dirty, get_key_1, 1, ctx, each_value, each2_lookup, tbody, fix_and_outro_and_destroy_block, create_each_block$8, null, get_each_context$8);
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
    				check_outros$1();

    				if (!each_value.length && each2_else) {
    					each2_else.p(ctx, dirty);
    				} else if (!each_value.length) {
    					each2_else = create_else_block_2$1(ctx);
    					each2_else.c();
    					each2_else.m(tbody, null);
    				} else if (each2_else) {
    					each2_else.d(1);
    					each2_else = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(if_block);

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in$1(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in$1(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(if_block);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				transition_out$1(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out$1(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			/*input1_binding*/ ctx[14](null);
    			if_blocks[current_block_type_index].d();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].d();
    			}

    			destroy_each$1(each_blocks_1, detaching);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (each2_else) each2_else.d();
    			mounted = false;
    			run_all$1(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let $graphStore;
    	let $criticalPath;
    	validate_store(graphStore, 'graphStore');
    	component_subscribe$1($$self, graphStore, $$value => $$invalidate(24, $graphStore = $$value));
    	validate_store(criticalPath, 'criticalPath');
    	component_subscribe$1($$self, criticalPath, $$value => $$invalidate(25, $criticalPath = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CrudTable', slots, []);
    	let data = [];
    	let editMode = false;
    	let useNodeValues = true;
    	const graph = new Graph();
    	const columns = ['Activity', 'Duration', 'Immediate Predecessor(s)'];
    	let errors = [];
    	let errorTimeout;

    	const inputValues = {
    		activity: '',
    		duration: '',
    		nodes: '',
    		predecessors: []
    	};

    	let firstInput;
    	let checkedValues;

    	const addRow = () => {
    		if (!validateInput()) return;
    		const { activity, duration, nodes } = inputValues;

    		const predecessors = useNodeValues
    		? nodes.split(/[, ]+/).map(n => parseInt(n, 10))
    		: Object.keys(checkedValues).filter(key => checkedValues[key] === true).sort();

    		const [nodeA, nodeB] = predecessors;
    		graph.addEdge(nodeA - 1, nodeB - 1, parseInt(duration), activity);
    		let dependencies = [nodeA - 1, nodeB - 1]; // for activity based predecessors
    		const maxTextLength = 20;

    		const row = {
    			dependsOn: dependencies,
    			activity: activity.slice(0, maxTextLength),
    			duration,
    			predecessors
    		};

    		$$invalidate(0, data = [...data, Object.assign({}, row)]);

    		// Reset inputs
    		$$invalidate(3, inputValues.activity = $$invalidate(3, inputValues.duration = $$invalidate(3, inputValues.nodes = null, inputValues), inputValues), inputValues);

    		// Update store
    		set_store_value$1(graphStore, $graphStore = graph, $graphStore);

    		set_store_value$1(criticalPath, $criticalPath = Array.from(graph.findCriticalPath()), $criticalPath);

    		// Focus on first input when submitted
    		firstInput.focus();
    	};

    	const deleteRow = activity => {
    		const newData = [];

    		// for (let i = 0; i < data.length; i++) {
    		//     if (data[i].activity !== activity) {
    		//         if (data[i].predecessors.length > 0) {
    		//             // @TODO remove from predecessors ids from dependencies (activity based)
    		//             data[i].predecessors = data[i].predecessors.filter(
    		//                 (pre) => {
    		//                     return pre !== activity;
    		//                 }
    		//             );
    		//         }
    		//         newData.push(data[i]);
    		//     }
    		//     // console.log(data[i]);
    		// }
    		// data = newData;
    		for (let i = 0; i < data.length; i++) {
    			if (data[i].dependsOn === activity) {
    				const [a, b] = data[i].dependsOn;
    				$graphStore.removeEdge(a, b);
    			}

    			if (data[i].dependsOn !== activity) {
    				if (data[i].predecessors.length > 0) {
    					$$invalidate(
    						0,
    						data[i].predecessors = data[i].predecessors.filter(pre => {
    							return pre !== activity;
    						}),
    						data
    					);
    				}

    				newData.push(data[i]);
    			}
    		}

    		$$invalidate(0, data = newData);
    		set_store_value$1(graphStore, $graphStore = graph, $graphStore);
    	};

    	const validateInput = () => {
    		const { activity, duration, nodes } = inputValues;
    		$$invalidate(2, errors = []);
    		clearTimeout(errorTimeout);

    		if (!Number.isInteger(parseInt(duration))) {
    			const newError = {
    				isValid: false,
    				message: 'Duration must be a number.'
    			};

    			errors.push(newError);
    		} else {
    			$$invalidate(2, errors = []);
    		}

    		if (!activity || !isNaN(parseInt(activity))) {
    			const newError = {
    				isValid: false,
    				message: 'Incorrect activity'
    			};

    			errors.push(newError);
    		}

    		const nodesArray = nodes && nodes.split(/[, ]+/).map(n => parseInt(n, 10));

    		if (!nodes || !nodesArray || nodesArray.length === 0) {
    			const newError = {
    				isValid: false,
    				message: 'Select corresponding nodes.'
    			};

    			errors.push(newError);
    		}

    		if ((nodesArray === null || nodesArray === void 0
    		? void 0
    		: nodesArray.length) === 1 || (nodesArray === null || nodesArray === void 0
    		? void 0
    		: nodesArray.length) > 2) {
    			const newError = {
    				isValid: false,
    				message: 'Incorrect amount of nodes.'
    			};

    			errors.push(newError);
    		}

    		if (errors.find(err => err.isValid === false)) {
    			errorTimeout = setTimeout(
    				() => {
    					$$invalidate(2, errors = []);
    				},
    				5000
    			);

    			return false;
    		}

    		$$invalidate(2, errors = []);
    		return true;
    	};

    	const clearError = e => {
    		$$invalidate(2, errors = errors.filter(err => err.message !== e.detail.message));
    	};

    	const getAvailablePredecessors = name => {
    		if (!name) {
    			return useNodeValues
    			? data.map(({ activity }) => activity)
    			: data.map(({ activity }) => activity);
    		}

    		const available = [];
    		data.forEach(({ activity }) => activity != name && available.push(activity));
    		return available;
    	};

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CrudTable> was created with unknown prop '${key}'`);
    	});

    	function input0_change_handler() {
    		useNodeValues = this.checked;
    		$$invalidate(1, useNodeValues);
    	}

    	const click_handler = () => $$invalidate(1, useNodeValues = !useNodeValues);

    	function input1_binding($$value) {
    		binding_callbacks$1[$$value ? 'unshift' : 'push'](() => {
    			firstInput = $$value;
    			$$invalidate(4, firstInput);
    		});
    	}

    	function input1_input_handler() {
    		inputValues.activity = this.value;
    		$$invalidate(3, inputValues);
    	}

    	function input2_input_handler() {
    		inputValues.duration = to_number(this.value);
    		$$invalidate(3, inputValues);
    	}

    	function input_input_handler() {
    		inputValues.nodes = this.value;
    		$$invalidate(3, inputValues);
    	}

    	function dropdown_value_binding(value) {
    		checkedValues = value;
    		$$invalidate(5, checkedValues);
    	}

    	function span_input_handler(each_value, id) {
    		each_value[id].duration = this.innerHTML;
    		$$invalidate(0, data);
    	}

    	const func = activity => getAvailablePredecessors(activity);

    	function dropdown_value_binding_1(value) {
    		if ($$self.$$.not_equal(inputValues.predecessors, value)) {
    			inputValues.predecessors = value;
    			$$invalidate(3, inputValues);
    		}
    	}

    	const click_handler_1 = dependsOn => deleteRow(dependsOn);

    	$$self.$capture_state = () => ({
    		flip,
    		fade,
    		fly,
    		graphStore,
    		criticalPath,
    		Graph,
    		Dropdown,
    		Error: Error$1,
    		data,
    		editMode,
    		useNodeValues,
    		graph,
    		columns,
    		errors,
    		errorTimeout,
    		inputValues,
    		firstInput,
    		checkedValues,
    		addRow,
    		deleteRow,
    		validateInput,
    		clearError,
    		getAvailablePredecessors,
    		$graphStore,
    		$criticalPath
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('editMode' in $$props) $$invalidate(6, editMode = $$props.editMode);
    		if ('useNodeValues' in $$props) $$invalidate(1, useNodeValues = $$props.useNodeValues);
    		if ('errors' in $$props) $$invalidate(2, errors = $$props.errors);
    		if ('errorTimeout' in $$props) errorTimeout = $$props.errorTimeout;
    		if ('firstInput' in $$props) $$invalidate(4, firstInput = $$props.firstInput);
    		if ('checkedValues' in $$props) $$invalidate(5, checkedValues = $$props.checkedValues);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		data,
    		useNodeValues,
    		errors,
    		inputValues,
    		firstInput,
    		checkedValues,
    		editMode,
    		columns,
    		addRow,
    		deleteRow,
    		clearError,
    		getAvailablePredecessors,
    		input0_change_handler,
    		click_handler,
    		input1_binding,
    		input1_input_handler,
    		input2_input_handler,
    		input_input_handler,
    		dropdown_value_binding,
    		span_input_handler,
    		func,
    		dropdown_value_binding_1,
    		click_handler_1
    	];
    }

    class CrudTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$i, create_fragment$i, safe_not_equal$1, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CrudTable",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    const supply = writable$1(['0', '0', '0']);
    const demand = writable$1(['0', '0', '0']);
    const sellingPrices = writable$1(['0', '0', '0']);
    const purchasePrices = writable$1(['0', '0', '0']);
    const transportCosts = writable$1([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    /* src/components/userInput.svelte generated by Svelte v3.46.4 */
    const file$6 = "src/components/userInput.svelte";

    function create_fragment$h(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let table;
    	let tbody;
    	let tr0;
    	let th0;
    	let t3;
    	let td0;
    	let t5;
    	let td1;
    	let t7;
    	let td2;
    	let t9;
    	let tr1;
    	let th1;
    	let t11;
    	let td3;
    	let t13;
    	let td4;
    	let t15;
    	let td5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Prices";
    			t1 = space$1();
    			table = element$1("table");
    			tbody = element$1("tbody");
    			tr0 = element$1("tr");
    			th0 = element$1("th");
    			th0.textContent = "Selling Price";
    			t3 = space$1();
    			td0 = element$1("td");
    			td0.textContent = "0";
    			t5 = space$1();
    			td1 = element$1("td");
    			td1.textContent = "0";
    			t7 = space$1();
    			td2 = element$1("td");
    			td2.textContent = "0";
    			t9 = space$1();
    			tr1 = element$1("tr");
    			th1 = element$1("th");
    			th1.textContent = "Purchase Price";
    			t11 = space$1();
    			td3 = element$1("td");
    			td3.textContent = "0";
    			t13 = space$1();
    			td4 = element$1("td");
    			td4.textContent = "0";
    			t15 = space$1();
    			td5 = element$1("td");
    			td5.textContent = "0";
    			attr_dev(h1, "class", "px-4 pt-2 text-2xl font-black");
    			add_location(h1, file$6, 4, 4, 171);
    			attr_dev(th0, "scope", "row");
    			attr_dev(th0, "class", "px-6 py-4 font-medium text-gray-900 whitespace-nowrap");
    			add_location(th0, file$6, 8, 16, 376);
    			attr_dev(td0, "class", "px-6 py-4");
    			attr_dev(td0, "contenteditable", "true");
    			if (/*$sellingPrices*/ ctx[0][0] === void 0) add_render_callback$1(() => /*td0_input_handler*/ ctx[2].call(td0));
    			add_location(td0, file$6, 9, 16, 491);
    			attr_dev(td1, "class", "px-6 py-4");
    			attr_dev(td1, "contenteditable", "true");
    			if (/*$sellingPrices*/ ctx[0][1] === void 0) add_render_callback$1(() => /*td1_input_handler*/ ctx[3].call(td1));
    			add_location(td1, file$6, 10, 16, 594);
    			attr_dev(td2, "class", "px-6 py-4");
    			attr_dev(td2, "contenteditable", "true");
    			if (/*$sellingPrices*/ ctx[0][2] === void 0) add_render_callback$1(() => /*td2_input_handler*/ ctx[4].call(td2));
    			add_location(td2, file$6, 11, 16, 697);
    			attr_dev(tr0, "class", "bg-white border-b hover:bg-gray-50");
    			add_location(tr0, file$6, 7, 12, 312);
    			attr_dev(th1, "scope", "row");
    			attr_dev(th1, "class", "px-6 py-4 font-medium text-gray-900 whitespace-nowrap");
    			add_location(th1, file$6, 14, 16, 878);
    			attr_dev(td3, "class", "px-6 py-4");
    			attr_dev(td3, "contenteditable", "true");
    			if (/*$purchasePrices*/ ctx[1][0] === void 0) add_render_callback$1(() => /*td3_input_handler*/ ctx[5].call(td3));
    			add_location(td3, file$6, 15, 16, 994);
    			attr_dev(td4, "class", "px-6 py-4");
    			attr_dev(td4, "contenteditable", "true");
    			if (/*$purchasePrices*/ ctx[1][1] === void 0) add_render_callback$1(() => /*td4_input_handler*/ ctx[6].call(td4));
    			add_location(td4, file$6, 16, 16, 1098);
    			attr_dev(td5, "class", "px-6 py-4");
    			attr_dev(td5, "contenteditable", "true");
    			if (/*$purchasePrices*/ ctx[1][2] === void 0) add_render_callback$1(() => /*td5_input_handler*/ ctx[7].call(td5));
    			add_location(td5, file$6, 17, 16, 1202);
    			attr_dev(tr1, "class", "bg-white border-b hover:bg-gray-50");
    			add_location(tr1, file$6, 13, 12, 814);
    			add_location(tbody, file$6, 6, 8, 292);
    			attr_dev(table, "class", "w-full text-sm text-left text-gray-500");
    			add_location(table, file$6, 5, 4, 229);
    			attr_dev(div, "class", "relative overflow-x-auto shadow-md sm:rounded-lg");
    			add_location(div, file$6, 3, 0, 104);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, table);
    			append_dev(table, tbody);
    			append_dev(tbody, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t3);
    			append_dev(tr0, td0);

    			if (/*$sellingPrices*/ ctx[0][0] !== void 0) {
    				td0.innerHTML = /*$sellingPrices*/ ctx[0][0];
    			}

    			append_dev(tr0, t5);
    			append_dev(tr0, td1);

    			if (/*$sellingPrices*/ ctx[0][1] !== void 0) {
    				td1.innerHTML = /*$sellingPrices*/ ctx[0][1];
    			}

    			append_dev(tr0, t7);
    			append_dev(tr0, td2);

    			if (/*$sellingPrices*/ ctx[0][2] !== void 0) {
    				td2.innerHTML = /*$sellingPrices*/ ctx[0][2];
    			}

    			append_dev(tbody, t9);
    			append_dev(tbody, tr1);
    			append_dev(tr1, th1);
    			append_dev(tr1, t11);
    			append_dev(tr1, td3);

    			if (/*$purchasePrices*/ ctx[1][0] !== void 0) {
    				td3.innerHTML = /*$purchasePrices*/ ctx[1][0];
    			}

    			append_dev(tr1, t13);
    			append_dev(tr1, td4);

    			if (/*$purchasePrices*/ ctx[1][1] !== void 0) {
    				td4.innerHTML = /*$purchasePrices*/ ctx[1][1];
    			}

    			append_dev(tr1, t15);
    			append_dev(tr1, td5);

    			if (/*$purchasePrices*/ ctx[1][2] !== void 0) {
    				td5.innerHTML = /*$purchasePrices*/ ctx[1][2];
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(td0, "input", /*td0_input_handler*/ ctx[2]),
    					listen_dev(td1, "input", /*td1_input_handler*/ ctx[3]),
    					listen_dev(td2, "input", /*td2_input_handler*/ ctx[4]),
    					listen_dev(td3, "input", /*td3_input_handler*/ ctx[5]),
    					listen_dev(td4, "input", /*td4_input_handler*/ ctx[6]),
    					listen_dev(td5, "input", /*td5_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$sellingPrices*/ 1 && /*$sellingPrices*/ ctx[0][0] !== td0.innerHTML) {
    				td0.innerHTML = /*$sellingPrices*/ ctx[0][0];
    			}

    			if (dirty & /*$sellingPrices*/ 1 && /*$sellingPrices*/ ctx[0][1] !== td1.innerHTML) {
    				td1.innerHTML = /*$sellingPrices*/ ctx[0][1];
    			}

    			if (dirty & /*$sellingPrices*/ 1 && /*$sellingPrices*/ ctx[0][2] !== td2.innerHTML) {
    				td2.innerHTML = /*$sellingPrices*/ ctx[0][2];
    			}

    			if (dirty & /*$purchasePrices*/ 2 && /*$purchasePrices*/ ctx[1][0] !== td3.innerHTML) {
    				td3.innerHTML = /*$purchasePrices*/ ctx[1][0];
    			}

    			if (dirty & /*$purchasePrices*/ 2 && /*$purchasePrices*/ ctx[1][1] !== td4.innerHTML) {
    				td4.innerHTML = /*$purchasePrices*/ ctx[1][1];
    			}

    			if (dirty & /*$purchasePrices*/ 2 && /*$purchasePrices*/ ctx[1][2] !== td5.innerHTML) {
    				td5.innerHTML = /*$purchasePrices*/ ctx[1][2];
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all$1(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let $sellingPrices;
    	let $purchasePrices;
    	validate_store(sellingPrices, 'sellingPrices');
    	component_subscribe$1($$self, sellingPrices, $$value => $$invalidate(0, $sellingPrices = $$value));
    	validate_store(purchasePrices, 'purchasePrices');
    	component_subscribe$1($$self, purchasePrices, $$value => $$invalidate(1, $purchasePrices = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('UserInput', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserInput> was created with unknown prop '${key}'`);
    	});

    	function td0_input_handler() {
    		$sellingPrices[0] = this.innerHTML;
    		sellingPrices.set($sellingPrices);
    	}

    	function td1_input_handler() {
    		$sellingPrices[1] = this.innerHTML;
    		sellingPrices.set($sellingPrices);
    	}

    	function td2_input_handler() {
    		$sellingPrices[2] = this.innerHTML;
    		sellingPrices.set($sellingPrices);
    	}

    	function td3_input_handler() {
    		$purchasePrices[0] = this.innerHTML;
    		purchasePrices.set($purchasePrices);
    	}

    	function td4_input_handler() {
    		$purchasePrices[1] = this.innerHTML;
    		purchasePrices.set($purchasePrices);
    	}

    	function td5_input_handler() {
    		$purchasePrices[2] = this.innerHTML;
    		purchasePrices.set($purchasePrices);
    	}

    	$$self.$capture_state = () => ({
    		sellingPrices,
    		purchasePrices,
    		$sellingPrices,
    		$purchasePrices
    	});

    	return [
    		$sellingPrices,
    		$purchasePrices,
    		td0_input_handler,
    		td1_input_handler,
    		td2_input_handler,
    		td3_input_handler,
    		td4_input_handler,
    		td5_input_handler
    	];
    }

    class UserInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$h, create_fragment$h, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserInput",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/transportCostTable.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/components/transportCostTable.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[9] = list;
    	child_ctx[10] = i;
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[12] = list;
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context_2$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[15] = list;
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (15:16) {#each customers as customer, i}
    function create_each_block_2$2(ctx) {
    	let th;
    	let t0_value = /*customer*/ ctx[14] + "";
    	let t0;
    	let t1;
    	let p;
    	let t3;
    	let mounted;
    	let dispose;

    	function p_input_handler() {
    		/*p_input_handler*/ ctx[5].call(p, /*i*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			th = element$1("th");
    			t0 = text$1(t0_value);
    			t1 = text$1(" (\n                        ");
    			p = element$1("p");
    			p.textContent = "0";
    			t3 = text$1("\n                        )");
    			attr_dev(p, "class", "w-8 text-center");
    			attr_dev(p, "contenteditable", "true");
    			if (/*$demand*/ ctx[2][/*i*/ ctx[10]] === void 0) add_render_callback$1(p_input_handler);
    			add_location(p, file$5, 17, 24, 747);
    			attr_dev(th, "scope", "col");
    			attr_dev(th, "class", "px-6 py-3 flex");
    			add_location(th, file$5, 15, 20, 646);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			append_dev(th, p);

    			if (/*$demand*/ ctx[2][/*i*/ ctx[10]] !== void 0) {
    				p.innerHTML = /*$demand*/ ctx[2][/*i*/ ctx[10]];
    			}

    			append_dev(th, t3);

    			if (!mounted) {
    				dispose = listen_dev(p, "input", p_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*customers*/ 1 && t0_value !== (t0_value = /*customer*/ ctx[14] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$demand*/ 4 && /*$demand*/ ctx[2][/*i*/ ctx[10]] !== p.innerHTML) {
    				p.innerHTML = /*$demand*/ ctx[2][/*i*/ ctx[10]];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$2.name,
    		type: "each",
    		source: "(15:16) {#each customers as customer, i}",
    		ctx
    	});

    	return block;
    }

    // (32:20) {#each customers as _, j}
    function create_each_block_1$3(ctx) {
    	let td;
    	let input;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[7].call(input, /*i*/ ctx[10], /*j*/ ctx[13]);
    	}

    	const block = {
    		c: function create() {
    			td = element$1("td");
    			input = element$1("input");
    			attr_dev(input, "class", "px-3 py-2 h-full text-center");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "contenteditable", "true");
    			add_location(input, file$5, 33, 29, 1483);
    			add_location(td, file$5, 32, 24, 1450);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, input);
    			set_input_value(input, /*$transportCosts*/ ctx[4][/*i*/ ctx[10]][/*j*/ ctx[13]]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", input_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$transportCosts*/ 16 && to_number(input.value) !== /*$transportCosts*/ ctx[4][/*i*/ ctx[10]][/*j*/ ctx[13]]) {
    				set_input_value(input, /*$transportCosts*/ ctx[4][/*i*/ ctx[10]][/*j*/ ctx[13]]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(32:20) {#each customers as _, j}",
    		ctx
    	});

    	return block;
    }

    // (25:12) {#each suppliers as supplier, i}
    function create_each_block$7(ctx) {
    	let tr;
    	let th;
    	let t0_value = /*supplier*/ ctx[8] + "";
    	let t0;
    	let t1;
    	let p;
    	let t3;
    	let t4;
    	let t5;
    	let mounted;
    	let dispose;

    	function p_input_handler_1() {
    		/*p_input_handler_1*/ ctx[6].call(p, /*i*/ ctx[10]);
    	}

    	let each_value_1 = /*customers*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			tr = element$1("tr");
    			th = element$1("th");
    			t0 = text$1(t0_value);
    			t1 = text$1(" (\n                        ");
    			p = element$1("p");
    			p.textContent = "0";
    			t3 = text$1("\n                        )");
    			t4 = space$1();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space$1();
    			attr_dev(p, "class", "w-8 text-center");
    			attr_dev(p, "contenteditable", "true");
    			if (/*$supply*/ ctx[3][/*i*/ ctx[10]] === void 0) add_render_callback$1(p_input_handler_1);
    			add_location(p, file$5, 28, 24, 1244);
    			attr_dev(th, "scope", "row");
    			attr_dev(th, "class", "px-6 py-4 text-sm text-gray-700 bg-gray-50 whitespace-nowrap flex");
    			add_location(th, file$5, 26, 20, 1092);
    			attr_dev(tr, "class", "bg-white border-b hover:bg-gray-50 flex");
    			add_location(tr, file$5, 25, 16, 1019);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			append_dev(th, p);

    			if (/*$supply*/ ctx[3][/*i*/ ctx[10]] !== void 0) {
    				p.innerHTML = /*$supply*/ ctx[3][/*i*/ ctx[10]];
    			}

    			append_dev(th, t3);
    			append_dev(tr, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(tr, t5);

    			if (!mounted) {
    				dispose = listen_dev(p, "input", p_input_handler_1);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*suppliers*/ 2 && t0_value !== (t0_value = /*supplier*/ ctx[8] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$supply*/ 8 && /*$supply*/ ctx[3][/*i*/ ctx[10]] !== p.innerHTML) {
    				p.innerHTML = /*$supply*/ ctx[3][/*i*/ ctx[10]];
    			}

    			if (dirty & /*$transportCosts, customers*/ 17) {
    				each_value_1 = /*customers*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, t5);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_each$1(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(25:12) {#each suppliers as supplier, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let table;
    	let thead;
    	let tr;
    	let th;
    	let t3;
    	let t4;
    	let tbody;
    	let each_value_2 = /*customers*/ ctx[0];
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
    	}

    	let each_value = /*suppliers*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Unit transport costs";
    			t1 = space$1();
    			table = element$1("table");
    			thead = element$1("thead");
    			tr = element$1("tr");
    			th = element$1("th");
    			th.textContent = "Supply\\Demand";
    			t3 = space$1();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t4 = space$1();
    			tbody = element$1("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "px-4 pt-2 text-2xl font-black");
    			add_location(h1, file$5, 9, 4, 284);
    			attr_dev(th, "scope", "col");
    			attr_dev(th, "class", "px-6 py-3");
    			add_location(th, file$5, 13, 16, 524);
    			attr_dev(tr, "class", "flex");
    			add_location(tr, file$5, 12, 12, 490);
    			attr_dev(thead, "class", "text-sm text-gray-700 uppercase bg-gray-50");
    			add_location(thead, file$5, 11, 8, 419);
    			add_location(tbody, file$5, 23, 8, 950);
    			attr_dev(table, "class", "w-full text-sm text-left text-gray-500");
    			add_location(table, file$5, 10, 4, 356);
    			attr_dev(div, "class", "relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white");
    			add_location(div, file$5, 8, 0, 201);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th);
    			append_dev(tr, t3);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table, t4);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$demand, customers*/ 5) {
    				each_value_2 = /*customers*/ ctx[0];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2$2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*customers, $transportCosts, $supply, suppliers*/ 27) {
    				each_value = /*suppliers*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each$1(each_blocks_1, detaching);
    			destroy_each$1(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let $demand;
    	let $supply;
    	let $transportCosts;
    	validate_store(demand, 'demand');
    	component_subscribe$1($$self, demand, $$value => $$invalidate(2, $demand = $$value));
    	validate_store(supply, 'supply');
    	component_subscribe$1($$self, supply, $$value => $$invalidate(3, $supply = $$value));
    	validate_store(transportCosts, 'transportCosts');
    	component_subscribe$1($$self, transportCosts, $$value => $$invalidate(4, $transportCosts = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TransportCostTable', slots, []);
    	let { customers } = $$props;
    	let { suppliers } = $$props;
    	const writable_props = ['customers', 'suppliers'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TransportCostTable> was created with unknown prop '${key}'`);
    	});

    	function p_input_handler(i) {
    		$demand[i] = this.innerHTML;
    		demand.set($demand);
    	}

    	function p_input_handler_1(i) {
    		$supply[i] = this.innerHTML;
    		supply.set($supply);
    	}

    	function input_input_handler(i, j) {
    		$transportCosts[i][j] = to_number(this.value);
    		transportCosts.set($transportCosts);
    	}

    	$$self.$$set = $$props => {
    		if ('customers' in $$props) $$invalidate(0, customers = $$props.customers);
    		if ('suppliers' in $$props) $$invalidate(1, suppliers = $$props.suppliers);
    	};

    	$$self.$capture_state = () => ({
    		supply,
    		demand,
    		transportCosts,
    		customers,
    		suppliers,
    		$demand,
    		$supply,
    		$transportCosts
    	});

    	$$self.$inject_state = $$props => {
    		if ('customers' in $$props) $$invalidate(0, customers = $$props.customers);
    		if ('suppliers' in $$props) $$invalidate(1, suppliers = $$props.suppliers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		customers,
    		suppliers,
    		$demand,
    		$supply,
    		$transportCosts,
    		p_input_handler,
    		p_input_handler_1,
    		input_input_handler
    	];
    }

    class TransportCostTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$g, create_fragment$g, safe_not_equal$1, { customers: 0, suppliers: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TransportCostTable",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*customers*/ ctx[0] === undefined && !('customers' in props)) {
    			console.warn("<TransportCostTable> was created without expected prop 'customers'");
    		}

    		if (/*suppliers*/ ctx[1] === undefined && !('suppliers' in props)) {
    			console.warn("<TransportCostTable> was created without expected prop 'suppliers'");
    		}
    	}

    	get customers() {
    		throw new Error("<TransportCostTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set customers(value) {
    		throw new Error("<TransportCostTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get suppliers() {
    		throw new Error("<TransportCostTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set suppliers(value) {
    		throw new Error("<TransportCostTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/solutionTable.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;

    const file$4 = "src/components/solutionTable.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	child_ctx[18] = i;
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	child_ctx[21] = i;
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[18] = i;
    	return child_ctx;
    }

    // (55:16) {#each _customers as customer, i}
    function create_each_block_2$1(ctx) {
    	let th;
    	let t0_value = /*customer*/ ctx[22] + "";
    	let t0;
    	let t1;
    	let p;
    	let t2_value = /*_demand*/ ctx[1][/*i*/ ctx[18]] + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			th = element$1("th");
    			t0 = text$1(t0_value);
    			t1 = text$1(" (\n                        ");
    			p = element$1("p");
    			t2 = text$1(t2_value);
    			t3 = text$1("\n                        )");
    			attr_dev(p, "class", "w-8 text-center");
    			add_location(p, file$4, 57, 24, 1943);
    			attr_dev(th, "scope", "col");
    			attr_dev(th, "class", "px-6 py-3 flex");
    			add_location(th, file$4, 55, 20, 1842);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			append_dev(th, p);
    			append_dev(p, t2);
    			append_dev(th, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*_customers*/ 16 && t0_value !== (t0_value = /*customer*/ ctx[22] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*_demand*/ 2 && t2_value !== (t2_value = /*_demand*/ ctx[1][/*i*/ ctx[18]] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(55:16) {#each _customers as customer, i}",
    		ctx
    	});

    	return block;
    }

    // (72:20) {#each _customers as _, j}
    function create_each_block_1$2(ctx) {
    	let td;
    	let t_value = /*table*/ ctx[0][/*i*/ ctx[18]][/*j*/ ctx[21]] + "";
    	let t;

    	const block = {
    		c: function create() {
    			td = element$1("td");
    			t = text$1(t_value);
    			attr_dev(td, "class", "px-3 py-2");
    			add_location(td, file$4, 72, 24, 2569);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*table*/ 1 && t_value !== (t_value = /*table*/ ctx[0][/*i*/ ctx[18]][/*j*/ ctx[21]] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(72:20) {#each _customers as _, j}",
    		ctx
    	});

    	return block;
    }

    // (65:12) {#each _suppliers as supplier, i}
    function create_each_block$6(ctx) {
    	let tr;
    	let th;
    	let t0_value = /*supplier*/ ctx[16] + "";
    	let t0;
    	let t1;
    	let p;
    	let t2_value = /*_supply*/ ctx[3][/*i*/ ctx[18]] + "";
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let each_value_1 = /*_customers*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			tr = element$1("tr");
    			th = element$1("th");
    			t0 = text$1(t0_value);
    			t1 = text$1(" (\n                        ");
    			p = element$1("p");
    			t2 = text$1(t2_value);
    			t3 = text$1("\n                        )");
    			t4 = space$1();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space$1();
    			attr_dev(p, "class", "w-8 text-center");
    			add_location(p, file$4, 68, 24, 2402);
    			attr_dev(th, "scope", "row");
    			attr_dev(th, "class", "px-6 py-4 text-sm text-gray-700 bg-gray-50 whitespace-nowrap flex");
    			add_location(th, file$4, 66, 20, 2249);
    			attr_dev(tr, "class", "bg-white border-b hover:bg-gray-50 flex");
    			add_location(tr, file$4, 65, 16, 2176);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			append_dev(th, p);
    			append_dev(p, t2);
    			append_dev(th, t3);
    			append_dev(tr, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(tr, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*_suppliers*/ 4 && t0_value !== (t0_value = /*supplier*/ ctx[16] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*_supply*/ 8 && t2_value !== (t2_value = /*_supply*/ ctx[3][/*i*/ ctx[18]] + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*table, _customers*/ 17) {
    				each_value_1 = /*_customers*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, t5);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_each$1(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(65:12) {#each _suppliers as supplier, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let table_1;
    	let thead;
    	let tr;
    	let th;
    	let t3;
    	let t4;
    	let tbody;
    	let each_value_2 = /*_customers*/ ctx[4];
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	let each_value = /*_suppliers*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Solution";
    			t1 = space$1();
    			table_1 = element$1("table");
    			thead = element$1("thead");
    			tr = element$1("tr");
    			th = element$1("th");
    			th.textContent = "Supply\\Demand";
    			t3 = space$1();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t4 = space$1();
    			tbody = element$1("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "px-4 pt-2 text-2xl font-black");
    			add_location(h1, file$4, 49, 4, 1491);
    			attr_dev(th, "scope", "col");
    			attr_dev(th, "class", "px-6 py-3");
    			add_location(th, file$4, 53, 16, 1719);
    			attr_dev(tr, "class", "flex");
    			add_location(tr, file$4, 52, 12, 1685);
    			attr_dev(thead, "class", "text-sm text-gray-700 uppercase bg-gray-50");
    			add_location(thead, file$4, 51, 8, 1614);
    			add_location(tbody, file$4, 63, 8, 2106);
    			attr_dev(table_1, "class", "w-full text-sm text-left text-gray-500");
    			add_location(table_1, file$4, 50, 4, 1551);
    			attr_dev(div, "class", "relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white");
    			add_location(div, file$4, 48, 0, 1408);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, table_1);
    			append_dev(table_1, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th);
    			append_dev(tr, t3);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table_1, t4);
    			append_dev(table_1, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*_demand, _customers*/ 18) {
    				each_value_2 = /*_customers*/ ctx[4];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*_customers, table, _supply, _suppliers*/ 29) {
    				each_value = /*_suppliers*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each$1(each_blocks_1, detaching);
    			destroy_each$1(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let _customers;
    	let _suppliers;
    	let _supply;
    	let _demand;
    	let $transportCosts;
    	let $purchasePrices;
    	let $sellingPrices;
    	let $supply;
    	let $demand;
    	validate_store(transportCosts, 'transportCosts');
    	component_subscribe$1($$self, transportCosts, $$value => $$invalidate(7, $transportCosts = $$value));
    	validate_store(purchasePrices, 'purchasePrices');
    	component_subscribe$1($$self, purchasePrices, $$value => $$invalidate(10, $purchasePrices = $$value));
    	validate_store(sellingPrices, 'sellingPrices');
    	component_subscribe$1($$self, sellingPrices, $$value => $$invalidate(11, $sellingPrices = $$value));
    	validate_store(supply, 'supply');
    	component_subscribe$1($$self, supply, $$value => $$invalidate(8, $supply = $$value));
    	validate_store(demand, 'demand');
    	component_subscribe$1($$self, demand, $$value => $$invalidate(9, $demand = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SolutionTable', slots, []);
    	let { customers } = $$props;
    	let { suppliers } = $$props;
    	const N = suppliers.length;
    	const M = customers.length;
    	const table = new Array(N).fill(0).map(() => new Array(M).fill(0));

    	const loop = () => {
    		for (let i = 0; i < N; i++) {
    			for (let j = 0; j < M; j++) {
    				$$invalidate(0, table[i][j] = parseInt($sellingPrices[j]) - (parseInt($purchasePrices[i]) + $transportCosts[i][j]), table);
    			}
    		}
    	};

    	const set = () => {
    		// const supplySum: any = _supply.reduce((prev, curr, i, arr) => parseInt(prev) + parseInt(curr));
    		// const demandSum: any = _demand.reduce((prev, curr, i, arr) => parseInt(prev) + curr);
    		let supplySum = 0;

    		let demandSum = 0;

    		for (const s of _supply) {
    			supplySum += parseInt(s);
    		}

    		for (const d of _demand) {
    			demandSum += parseInt(d);
    		}

    		if (supplySum !== demandSum) {
    			_customers.push('OF');
    			_supply.push(demandSum.toString());
    			_suppliers.push('DF');
    			_demand.push(supplySum.toString());
    			console.log(supplySum, demandSum);
    			const row = [0, 0, 0, 0];
    			table.push(row);
    		}
    	};

    	const writable_props = ['customers', 'suppliers'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<SolutionTable> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('customers' in $$props) $$invalidate(5, customers = $$props.customers);
    		if ('suppliers' in $$props) $$invalidate(6, suppliers = $$props.suppliers);
    	};

    	$$self.$capture_state = () => ({
    		supply,
    		demand,
    		sellingPrices,
    		purchasePrices,
    		transportCosts,
    		customers,
    		suppliers,
    		N,
    		M,
    		table,
    		loop,
    		set,
    		_demand,
    		_suppliers,
    		_supply,
    		_customers,
    		$transportCosts,
    		$purchasePrices,
    		$sellingPrices,
    		$supply,
    		$demand
    	});

    	$$self.$inject_state = $$props => {
    		if ('customers' in $$props) $$invalidate(5, customers = $$props.customers);
    		if ('suppliers' in $$props) $$invalidate(6, suppliers = $$props.suppliers);
    		if ('_demand' in $$props) $$invalidate(1, _demand = $$props._demand);
    		if ('_suppliers' in $$props) $$invalidate(2, _suppliers = $$props._suppliers);
    		if ('_supply' in $$props) $$invalidate(3, _supply = $$props._supply);
    		if ('_customers' in $$props) $$invalidate(4, _customers = $$props._customers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*customers*/ 32) {
    			$$invalidate(4, _customers = customers);
    		}

    		if ($$self.$$.dirty & /*suppliers*/ 64) {
    			$$invalidate(2, _suppliers = suppliers);
    		}

    		if ($$self.$$.dirty & /*$supply*/ 256) {
    			$$invalidate(3, _supply = $supply);
    		}

    		if ($$self.$$.dirty & /*$demand*/ 512) {
    			$$invalidate(1, _demand = $demand);
    		}

    		if ($$self.$$.dirty & /*$transportCosts*/ 128) {
    			{
    				loop();
    			}
    		}

    		if ($$self.$$.dirty & /*$demand, $supply*/ 768) {
    			{
    				set();
    			}
    		}
    	};

    	return [
    		table,
    		_demand,
    		_suppliers,
    		_supply,
    		_customers,
    		customers,
    		suppliers,
    		$transportCosts,
    		$supply,
    		$demand
    	];
    }

    class SolutionTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$f, create_fragment$f, safe_not_equal$1, { customers: 5, suppliers: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SolutionTable",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*customers*/ ctx[5] === undefined && !('customers' in props)) {
    			console_1.warn("<SolutionTable> was created without expected prop 'customers'");
    		}

    		if (/*suppliers*/ ctx[6] === undefined && !('suppliers' in props)) {
    			console_1.warn("<SolutionTable> was created without expected prop 'suppliers'");
    		}
    	}

    	get customers() {
    		throw new Error("<SolutionTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set customers(value) {
    		throw new Error("<SolutionTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get suppliers() {
    		throw new Error("<SolutionTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set suppliers(value) {
    		throw new Error("<SolutionTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    function commonjsRequire (target) {
    	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
    }

    var moment = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        module.exports = factory() ;
    }(commonjsGlobal, (function () {
        var hookCallback;

        function hooks() {
            return hookCallback.apply(null, arguments);
        }

        // This is done to register the method called with moment()
        // without creating circular dependencies.
        function setHookCallback(callback) {
            hookCallback = callback;
        }

        function isArray(input) {
            return (
                input instanceof Array ||
                Object.prototype.toString.call(input) === '[object Array]'
            );
        }

        function isObject(input) {
            // IE8 will treat undefined and null as object if it wasn't for
            // input != null
            return (
                input != null &&
                Object.prototype.toString.call(input) === '[object Object]'
            );
        }

        function hasOwnProp(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
        }

        function isObjectEmpty(obj) {
            if (Object.getOwnPropertyNames) {
                return Object.getOwnPropertyNames(obj).length === 0;
            } else {
                var k;
                for (k in obj) {
                    if (hasOwnProp(obj, k)) {
                        return false;
                    }
                }
                return true;
            }
        }

        function isUndefined(input) {
            return input === void 0;
        }

        function isNumber(input) {
            return (
                typeof input === 'number' ||
                Object.prototype.toString.call(input) === '[object Number]'
            );
        }

        function isDate(input) {
            return (
                input instanceof Date ||
                Object.prototype.toString.call(input) === '[object Date]'
            );
        }

        function map(arr, fn) {
            var res = [],
                i,
                arrLen = arr.length;
            for (i = 0; i < arrLen; ++i) {
                res.push(fn(arr[i], i));
            }
            return res;
        }

        function extend(a, b) {
            for (var i in b) {
                if (hasOwnProp(b, i)) {
                    a[i] = b[i];
                }
            }

            if (hasOwnProp(b, 'toString')) {
                a.toString = b.toString;
            }

            if (hasOwnProp(b, 'valueOf')) {
                a.valueOf = b.valueOf;
            }

            return a;
        }

        function createUTC(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, true).utc();
        }

        function defaultParsingFlags() {
            // We need to deep clone this object.
            return {
                empty: false,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: false,
                invalidEra: null,
                invalidMonth: null,
                invalidFormat: false,
                userInvalidated: false,
                iso: false,
                parsedDateParts: [],
                era: null,
                meridiem: null,
                rfc2822: false,
                weekdayMismatch: false,
            };
        }

        function getParsingFlags(m) {
            if (m._pf == null) {
                m._pf = defaultParsingFlags();
            }
            return m._pf;
        }

        var some;
        if (Array.prototype.some) {
            some = Array.prototype.some;
        } else {
            some = function (fun) {
                var t = Object(this),
                    len = t.length >>> 0,
                    i;

                for (i = 0; i < len; i++) {
                    if (i in t && fun.call(this, t[i], i, t)) {
                        return true;
                    }
                }

                return false;
            };
        }

        function isValid(m) {
            if (m._isValid == null) {
                var flags = getParsingFlags(m),
                    parsedParts = some.call(flags.parsedDateParts, function (i) {
                        return i != null;
                    }),
                    isNowValid =
                        !isNaN(m._d.getTime()) &&
                        flags.overflow < 0 &&
                        !flags.empty &&
                        !flags.invalidEra &&
                        !flags.invalidMonth &&
                        !flags.invalidWeekday &&
                        !flags.weekdayMismatch &&
                        !flags.nullInput &&
                        !flags.invalidFormat &&
                        !flags.userInvalidated &&
                        (!flags.meridiem || (flags.meridiem && parsedParts));

                if (m._strict) {
                    isNowValid =
                        isNowValid &&
                        flags.charsLeftOver === 0 &&
                        flags.unusedTokens.length === 0 &&
                        flags.bigHour === undefined;
                }

                if (Object.isFrozen == null || !Object.isFrozen(m)) {
                    m._isValid = isNowValid;
                } else {
                    return isNowValid;
                }
            }
            return m._isValid;
        }

        function createInvalid(flags) {
            var m = createUTC(NaN);
            if (flags != null) {
                extend(getParsingFlags(m), flags);
            } else {
                getParsingFlags(m).userInvalidated = true;
            }

            return m;
        }

        // Plugins that add properties should also add the key here (null value),
        // so we can properly clone ourselves.
        var momentProperties = (hooks.momentProperties = []),
            updateInProgress = false;

        function copyConfig(to, from) {
            var i,
                prop,
                val,
                momentPropertiesLen = momentProperties.length;

            if (!isUndefined(from._isAMomentObject)) {
                to._isAMomentObject = from._isAMomentObject;
            }
            if (!isUndefined(from._i)) {
                to._i = from._i;
            }
            if (!isUndefined(from._f)) {
                to._f = from._f;
            }
            if (!isUndefined(from._l)) {
                to._l = from._l;
            }
            if (!isUndefined(from._strict)) {
                to._strict = from._strict;
            }
            if (!isUndefined(from._tzm)) {
                to._tzm = from._tzm;
            }
            if (!isUndefined(from._isUTC)) {
                to._isUTC = from._isUTC;
            }
            if (!isUndefined(from._offset)) {
                to._offset = from._offset;
            }
            if (!isUndefined(from._pf)) {
                to._pf = getParsingFlags(from);
            }
            if (!isUndefined(from._locale)) {
                to._locale = from._locale;
            }

            if (momentPropertiesLen > 0) {
                for (i = 0; i < momentPropertiesLen; i++) {
                    prop = momentProperties[i];
                    val = from[prop];
                    if (!isUndefined(val)) {
                        to[prop] = val;
                    }
                }
            }

            return to;
        }

        // Moment prototype object
        function Moment(config) {
            copyConfig(this, config);
            this._d = new Date(config._d != null ? config._d.getTime() : NaN);
            if (!this.isValid()) {
                this._d = new Date(NaN);
            }
            // Prevent infinite loop in case updateOffset creates new moment
            // objects.
            if (updateInProgress === false) {
                updateInProgress = true;
                hooks.updateOffset(this);
                updateInProgress = false;
            }
        }

        function isMoment(obj) {
            return (
                obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
            );
        }

        function warn(msg) {
            if (
                hooks.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' &&
                console.warn
            ) {
                console.warn('Deprecation warning: ' + msg);
            }
        }

        function deprecate(msg, fn) {
            var firstTime = true;

            return extend(function () {
                if (hooks.deprecationHandler != null) {
                    hooks.deprecationHandler(null, msg);
                }
                if (firstTime) {
                    var args = [],
                        arg,
                        i,
                        key,
                        argLen = arguments.length;
                    for (i = 0; i < argLen; i++) {
                        arg = '';
                        if (typeof arguments[i] === 'object') {
                            arg += '\n[' + i + '] ';
                            for (key in arguments[0]) {
                                if (hasOwnProp(arguments[0], key)) {
                                    arg += key + ': ' + arguments[0][key] + ', ';
                                }
                            }
                            arg = arg.slice(0, -2); // Remove trailing comma and space
                        } else {
                            arg = arguments[i];
                        }
                        args.push(arg);
                    }
                    warn(
                        msg +
                            '\nArguments: ' +
                            Array.prototype.slice.call(args).join('') +
                            '\n' +
                            new Error().stack
                    );
                    firstTime = false;
                }
                return fn.apply(this, arguments);
            }, fn);
        }

        var deprecations = {};

        function deprecateSimple(name, msg) {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(name, msg);
            }
            if (!deprecations[name]) {
                warn(msg);
                deprecations[name] = true;
            }
        }

        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;

        function isFunction(input) {
            return (
                (typeof Function !== 'undefined' && input instanceof Function) ||
                Object.prototype.toString.call(input) === '[object Function]'
            );
        }

        function set(config) {
            var prop, i;
            for (i in config) {
                if (hasOwnProp(config, i)) {
                    prop = config[i];
                    if (isFunction(prop)) {
                        this[i] = prop;
                    } else {
                        this['_' + i] = prop;
                    }
                }
            }
            this._config = config;
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
            // TODO: Remove "ordinalParse" fallback in next major release.
            this._dayOfMonthOrdinalParseLenient = new RegExp(
                (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                    '|' +
                    /\d{1,2}/.source
            );
        }

        function mergeConfigs(parentConfig, childConfig) {
            var res = extend({}, parentConfig),
                prop;
            for (prop in childConfig) {
                if (hasOwnProp(childConfig, prop)) {
                    if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                        res[prop] = {};
                        extend(res[prop], parentConfig[prop]);
                        extend(res[prop], childConfig[prop]);
                    } else if (childConfig[prop] != null) {
                        res[prop] = childConfig[prop];
                    } else {
                        delete res[prop];
                    }
                }
            }
            for (prop in parentConfig) {
                if (
                    hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])
                ) {
                    // make sure changes to properties don't modify parent config
                    res[prop] = extend({}, res[prop]);
                }
            }
            return res;
        }

        function Locale(config) {
            if (config != null) {
                this.set(config);
            }
        }

        var keys;

        if (Object.keys) {
            keys = Object.keys;
        } else {
            keys = function (obj) {
                var i,
                    res = [];
                for (i in obj) {
                    if (hasOwnProp(obj, i)) {
                        res.push(i);
                    }
                }
                return res;
            };
        }

        var defaultCalendar = {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L',
        };

        function calendar(key, mom, now) {
            var output = this._calendar[key] || this._calendar['sameElse'];
            return isFunction(output) ? output.call(mom, now) : output;
        }

        function zeroFill(number, targetLength, forceSign) {
            var absNumber = '' + Math.abs(number),
                zerosToFill = targetLength - absNumber.length,
                sign = number >= 0;
            return (
                (sign ? (forceSign ? '+' : '') : '-') +
                Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
                absNumber
            );
        }

        var formattingTokens =
                /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            formatFunctions = {},
            formatTokenFunctions = {};

        // token:    'M'
        // padded:   ['MM', 2]
        // ordinal:  'Mo'
        // callback: function () { this.month() + 1 }
        function addFormatToken(token, padded, ordinal, callback) {
            var func = callback;
            if (typeof callback === 'string') {
                func = function () {
                    return this[callback]();
                };
            }
            if (token) {
                formatTokenFunctions[token] = func;
            }
            if (padded) {
                formatTokenFunctions[padded[0]] = function () {
                    return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
                };
            }
            if (ordinal) {
                formatTokenFunctions[ordinal] = function () {
                    return this.localeData().ordinal(
                        func.apply(this, arguments),
                        token
                    );
                };
            }
        }

        function removeFormattingTokens(input) {
            if (input.match(/\[[\s\S]/)) {
                return input.replace(/^\[|\]$/g, '');
            }
            return input.replace(/\\/g, '');
        }

        function makeFormatFunction(format) {
            var array = format.match(formattingTokens),
                i,
                length;

            for (i = 0, length = array.length; i < length; i++) {
                if (formatTokenFunctions[array[i]]) {
                    array[i] = formatTokenFunctions[array[i]];
                } else {
                    array[i] = removeFormattingTokens(array[i]);
                }
            }

            return function (mom) {
                var output = '',
                    i;
                for (i = 0; i < length; i++) {
                    output += isFunction(array[i])
                        ? array[i].call(mom, format)
                        : array[i];
                }
                return output;
            };
        }

        // format date using native date object
        function formatMoment(m, format) {
            if (!m.isValid()) {
                return m.localeData().invalidDate();
            }

            format = expandFormat(format, m.localeData());
            formatFunctions[format] =
                formatFunctions[format] || makeFormatFunction(format);

            return formatFunctions[format](m);
        }

        function expandFormat(format, locale) {
            var i = 5;

            function replaceLongDateFormatTokens(input) {
                return locale.longDateFormat(input) || input;
            }

            localFormattingTokens.lastIndex = 0;
            while (i >= 0 && localFormattingTokens.test(format)) {
                format = format.replace(
                    localFormattingTokens,
                    replaceLongDateFormatTokens
                );
                localFormattingTokens.lastIndex = 0;
                i -= 1;
            }

            return format;
        }

        var defaultLongDateFormat = {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A',
        };

        function longDateFormat(key) {
            var format = this._longDateFormat[key],
                formatUpper = this._longDateFormat[key.toUpperCase()];

            if (format || !formatUpper) {
                return format;
            }

            this._longDateFormat[key] = formatUpper
                .match(formattingTokens)
                .map(function (tok) {
                    if (
                        tok === 'MMMM' ||
                        tok === 'MM' ||
                        tok === 'DD' ||
                        tok === 'dddd'
                    ) {
                        return tok.slice(1);
                    }
                    return tok;
                })
                .join('');

            return this._longDateFormat[key];
        }

        var defaultInvalidDate = 'Invalid date';

        function invalidDate() {
            return this._invalidDate;
        }

        var defaultOrdinal = '%d',
            defaultDayOfMonthOrdinalParse = /\d{1,2}/;

        function ordinal(number) {
            return this._ordinal.replace('%d', number);
        }

        var defaultRelativeTime = {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            ss: '%d seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            w: 'a week',
            ww: '%d weeks',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
        };

        function relativeTime(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return isFunction(output)
                ? output(number, withoutSuffix, string, isFuture)
                : output.replace(/%d/i, number);
        }

        function pastFuture(diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return isFunction(format) ? format(output) : format.replace(/%s/i, output);
        }

        var aliases = {};

        function addUnitAlias(unit, shorthand) {
            var lowerCase = unit.toLowerCase();
            aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
        }

        function normalizeUnits(units) {
            return typeof units === 'string'
                ? aliases[units] || aliases[units.toLowerCase()]
                : undefined;
        }

        function normalizeObjectUnits(inputObject) {
            var normalizedInput = {},
                normalizedProp,
                prop;

            for (prop in inputObject) {
                if (hasOwnProp(inputObject, prop)) {
                    normalizedProp = normalizeUnits(prop);
                    if (normalizedProp) {
                        normalizedInput[normalizedProp] = inputObject[prop];
                    }
                }
            }

            return normalizedInput;
        }

        var priorities = {};

        function addUnitPriority(unit, priority) {
            priorities[unit] = priority;
        }

        function getPrioritizedUnits(unitsObj) {
            var units = [],
                u;
            for (u in unitsObj) {
                if (hasOwnProp(unitsObj, u)) {
                    units.push({ unit: u, priority: priorities[u] });
                }
            }
            units.sort(function (a, b) {
                return a.priority - b.priority;
            });
            return units;
        }

        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }

        function absFloor(number) {
            if (number < 0) {
                // -0 -> 0
                return Math.ceil(number) || 0;
            } else {
                return Math.floor(number);
            }
        }

        function toInt(argumentForCoercion) {
            var coercedNumber = +argumentForCoercion,
                value = 0;

            if (coercedNumber !== 0 && isFinite(coercedNumber)) {
                value = absFloor(coercedNumber);
            }

            return value;
        }

        function makeGetSet(unit, keepTime) {
            return function (value) {
                if (value != null) {
                    set$1(this, unit, value);
                    hooks.updateOffset(this, keepTime);
                    return this;
                } else {
                    return get(this, unit);
                }
            };
        }

        function get(mom, unit) {
            return mom.isValid()
                ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
                : NaN;
        }

        function set$1(mom, unit, value) {
            if (mom.isValid() && !isNaN(value)) {
                if (
                    unit === 'FullYear' &&
                    isLeapYear(mom.year()) &&
                    mom.month() === 1 &&
                    mom.date() === 29
                ) {
                    value = toInt(value);
                    mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                        value,
                        mom.month(),
                        daysInMonth(value, mom.month())
                    );
                } else {
                    mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
                }
            }
        }

        // MOMENTS

        function stringGet(units) {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units]();
            }
            return this;
        }

        function stringSet(units, value) {
            if (typeof units === 'object') {
                units = normalizeObjectUnits(units);
                var prioritized = getPrioritizedUnits(units),
                    i,
                    prioritizedLen = prioritized.length;
                for (i = 0; i < prioritizedLen; i++) {
                    this[prioritized[i].unit](units[prioritized[i].unit]);
                }
            } else {
                units = normalizeUnits(units);
                if (isFunction(this[units])) {
                    return this[units](value);
                }
            }
            return this;
        }

        var match1 = /\d/, //       0 - 9
            match2 = /\d\d/, //      00 - 99
            match3 = /\d{3}/, //     000 - 999
            match4 = /\d{4}/, //    0000 - 9999
            match6 = /[+-]?\d{6}/, // -999999 - 999999
            match1to2 = /\d\d?/, //       0 - 99
            match3to4 = /\d\d\d\d?/, //     999 - 9999
            match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
            match1to3 = /\d{1,3}/, //       0 - 999
            match1to4 = /\d{1,4}/, //       0 - 9999
            match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
            matchUnsigned = /\d+/, //       0 - inf
            matchSigned = /[+-]?\d+/, //    -inf - inf
            matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
            matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
            matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
            // any word (or two) characters or numbers including two/three word month in arabic.
            // includes scottish gaelic two word and hyphenated months
            matchWord =
                /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            regexes;

        regexes = {};

        function addRegexToken(token, regex, strictRegex) {
            regexes[token] = isFunction(regex)
                ? regex
                : function (isStrict, localeData) {
                      return isStrict && strictRegex ? strictRegex : regex;
                  };
        }

        function getParseRegexForToken(token, config) {
            if (!hasOwnProp(regexes, token)) {
                return new RegExp(unescapeFormat(token));
            }

            return regexes[token](config._strict, config._locale);
        }

        // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
        function unescapeFormat(s) {
            return regexEscape(
                s
                    .replace('\\', '')
                    .replace(
                        /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                        function (matched, p1, p2, p3, p4) {
                            return p1 || p2 || p3 || p4;
                        }
                    )
            );
        }

        function regexEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        var tokens = {};

        function addParseToken(token, callback) {
            var i,
                func = callback,
                tokenLen;
            if (typeof token === 'string') {
                token = [token];
            }
            if (isNumber(callback)) {
                func = function (input, array) {
                    array[callback] = toInt(input);
                };
            }
            tokenLen = token.length;
            for (i = 0; i < tokenLen; i++) {
                tokens[token[i]] = func;
            }
        }

        function addWeekParseToken(token, callback) {
            addParseToken(token, function (input, array, config, token) {
                config._w = config._w || {};
                callback(input, config._w, config, token);
            });
        }

        function addTimeToArrayFromToken(token, input, config) {
            if (input != null && hasOwnProp(tokens, token)) {
                tokens[token](input, config._a, config, token);
            }
        }

        var YEAR = 0,
            MONTH = 1,
            DATE = 2,
            HOUR = 3,
            MINUTE = 4,
            SECOND = 5,
            MILLISECOND = 6,
            WEEK = 7,
            WEEKDAY = 8;

        function mod(n, x) {
            return ((n % x) + x) % x;
        }

        var indexOf;

        if (Array.prototype.indexOf) {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (o) {
                // I know
                var i;
                for (i = 0; i < this.length; ++i) {
                    if (this[i] === o) {
                        return i;
                    }
                }
                return -1;
            };
        }

        function daysInMonth(year, month) {
            if (isNaN(year) || isNaN(month)) {
                return NaN;
            }
            var modMonth = mod(month, 12);
            year += (month - modMonth) / 12;
            return modMonth === 1
                ? isLeapYear(year)
                    ? 29
                    : 28
                : 31 - ((modMonth % 7) % 2);
        }

        // FORMATTING

        addFormatToken('M', ['MM', 2], 'Mo', function () {
            return this.month() + 1;
        });

        addFormatToken('MMM', 0, 0, function (format) {
            return this.localeData().monthsShort(this, format);
        });

        addFormatToken('MMMM', 0, 0, function (format) {
            return this.localeData().months(this, format);
        });

        // ALIASES

        addUnitAlias('month', 'M');

        // PRIORITY

        addUnitPriority('month', 8);

        // PARSING

        addRegexToken('M', match1to2);
        addRegexToken('MM', match1to2, match2);
        addRegexToken('MMM', function (isStrict, locale) {
            return locale.monthsShortRegex(isStrict);
        });
        addRegexToken('MMMM', function (isStrict, locale) {
            return locale.monthsRegex(isStrict);
        });

        addParseToken(['M', 'MM'], function (input, array) {
            array[MONTH] = toInt(input) - 1;
        });

        addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
            var month = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (month != null) {
                array[MONTH] = month;
            } else {
                getParsingFlags(config).invalidMonth = input;
            }
        });

        // LOCALES

        var defaultLocaleMonths =
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                    '_'
                ),
            defaultLocaleMonthsShort =
                'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
            MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            defaultMonthsShortRegex = matchWord,
            defaultMonthsRegex = matchWord;

        function localeMonths(m, format) {
            if (!m) {
                return isArray(this._months)
                    ? this._months
                    : this._months['standalone'];
            }
            return isArray(this._months)
                ? this._months[m.month()]
                : this._months[
                      (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                          ? 'format'
                          : 'standalone'
                  ][m.month()];
        }

        function localeMonthsShort(m, format) {
            if (!m) {
                return isArray(this._monthsShort)
                    ? this._monthsShort
                    : this._monthsShort['standalone'];
            }
            return isArray(this._monthsShort)
                ? this._monthsShort[m.month()]
                : this._monthsShort[
                      MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
                  ][m.month()];
        }

        function handleStrictParse(monthName, format, strict) {
            var i,
                ii,
                mom,
                llc = monthName.toLocaleLowerCase();
            if (!this._monthsParse) {
                // this is not used
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
                for (i = 0; i < 12; ++i) {
                    mom = createUTC([2000, i]);
                    this._shortMonthsParse[i] = this.monthsShort(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
                }
            }

            if (strict) {
                if (format === 'MMM') {
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._longMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                }
            } else {
                if (format === 'MMM') {
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._longMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._longMonthsParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                }
            }
        }

        function localeMonthsParse(monthName, format, strict) {
            var i, mom, regex;

            if (this._monthsParseExact) {
                return handleStrictParse.call(this, monthName, format, strict);
            }

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            // TODO: add sorting
            // Sorting makes sure if one month (or abbr) is a prefix of another
            // see sorting in computeMonthsParse
            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp(
                        '^' + this.months(mom, '').replace('.', '') + '$',
                        'i'
                    );
                    this._shortMonthsParse[i] = new RegExp(
                        '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                        'i'
                    );
                }
                if (!strict && !this._monthsParse[i]) {
                    regex =
                        '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (
                    strict &&
                    format === 'MMMM' &&
                    this._longMonthsParse[i].test(monthName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'MMM' &&
                    this._shortMonthsParse[i].test(monthName)
                ) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        }

        // MOMENTS

        function setMonth(mom, value) {
            var dayOfMonth;

            if (!mom.isValid()) {
                // No op
                return mom;
            }

            if (typeof value === 'string') {
                if (/^\d+$/.test(value)) {
                    value = toInt(value);
                } else {
                    value = mom.localeData().monthsParse(value);
                    // TODO: Another silent failure?
                    if (!isNumber(value)) {
                        return mom;
                    }
                }
            }

            dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
            return mom;
        }

        function getSetMonth(value) {
            if (value != null) {
                setMonth(this, value);
                hooks.updateOffset(this, true);
                return this;
            } else {
                return get(this, 'Month');
            }
        }

        function getDaysInMonth() {
            return daysInMonth(this.year(), this.month());
        }

        function monthsShortRegex(isStrict) {
            if (this._monthsParseExact) {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    computeMonthsParse.call(this);
                }
                if (isStrict) {
                    return this._monthsShortStrictRegex;
                } else {
                    return this._monthsShortRegex;
                }
            } else {
                if (!hasOwnProp(this, '_monthsShortRegex')) {
                    this._monthsShortRegex = defaultMonthsShortRegex;
                }
                return this._monthsShortStrictRegex && isStrict
                    ? this._monthsShortStrictRegex
                    : this._monthsShortRegex;
            }
        }

        function monthsRegex(isStrict) {
            if (this._monthsParseExact) {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    computeMonthsParse.call(this);
                }
                if (isStrict) {
                    return this._monthsStrictRegex;
                } else {
                    return this._monthsRegex;
                }
            } else {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    this._monthsRegex = defaultMonthsRegex;
                }
                return this._monthsStrictRegex && isStrict
                    ? this._monthsStrictRegex
                    : this._monthsRegex;
            }
        }

        function computeMonthsParse() {
            function cmpLenRev(a, b) {
                return b.length - a.length;
            }

            var shortPieces = [],
                longPieces = [],
                mixedPieces = [],
                i,
                mom;
            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, i]);
                shortPieces.push(this.monthsShort(mom, ''));
                longPieces.push(this.months(mom, ''));
                mixedPieces.push(this.months(mom, ''));
                mixedPieces.push(this.monthsShort(mom, ''));
            }
            // Sorting makes sure if one month (or abbr) is a prefix of another it
            // will match the longer piece.
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);
            for (i = 0; i < 12; i++) {
                shortPieces[i] = regexEscape(shortPieces[i]);
                longPieces[i] = regexEscape(longPieces[i]);
            }
            for (i = 0; i < 24; i++) {
                mixedPieces[i] = regexEscape(mixedPieces[i]);
            }

            this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._monthsShortRegex = this._monthsRegex;
            this._monthsStrictRegex = new RegExp(
                '^(' + longPieces.join('|') + ')',
                'i'
            );
            this._monthsShortStrictRegex = new RegExp(
                '^(' + shortPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        addFormatToken('Y', 0, 0, function () {
            var y = this.year();
            return y <= 9999 ? zeroFill(y, 4) : '+' + y;
        });

        addFormatToken(0, ['YY', 2], 0, function () {
            return this.year() % 100;
        });

        addFormatToken(0, ['YYYY', 4], 0, 'year');
        addFormatToken(0, ['YYYYY', 5], 0, 'year');
        addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

        // ALIASES

        addUnitAlias('year', 'y');

        // PRIORITIES

        addUnitPriority('year', 1);

        // PARSING

        addRegexToken('Y', matchSigned);
        addRegexToken('YY', match1to2, match2);
        addRegexToken('YYYY', match1to4, match4);
        addRegexToken('YYYYY', match1to6, match6);
        addRegexToken('YYYYYY', match1to6, match6);

        addParseToken(['YYYYY', 'YYYYYY'], YEAR);
        addParseToken('YYYY', function (input, array) {
            array[YEAR] =
                input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken('YY', function (input, array) {
            array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken('Y', function (input, array) {
            array[YEAR] = parseInt(input, 10);
        });

        // HELPERS

        function daysInYear(year) {
            return isLeapYear(year) ? 366 : 365;
        }

        // HOOKS

        hooks.parseTwoDigitYear = function (input) {
            return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
        };

        // MOMENTS

        var getSetYear = makeGetSet('FullYear', true);

        function getIsLeapYear() {
            return isLeapYear(this.year());
        }

        function createDate(y, m, d, h, M, s, ms) {
            // can't just apply() to create a date:
            // https://stackoverflow.com/q/181348
            var date;
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                date = new Date(y + 400, m, d, h, M, s, ms);
                if (isFinite(date.getFullYear())) {
                    date.setFullYear(y);
                }
            } else {
                date = new Date(y, m, d, h, M, s, ms);
            }

            return date;
        }

        function createUTCDate(y) {
            var date, args;
            // the Date.UTC function remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                args = Array.prototype.slice.call(arguments);
                // preserve leap years using a full 400 year cycle, then reset
                args[0] = y + 400;
                date = new Date(Date.UTC.apply(null, args));
                if (isFinite(date.getUTCFullYear())) {
                    date.setUTCFullYear(y);
                }
            } else {
                date = new Date(Date.UTC.apply(null, arguments));
            }

            return date;
        }

        // start-of-first-week - start-of-year
        function firstWeekOffset(year, dow, doy) {
            var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
                fwd = 7 + dow - doy,
                // first-week day local weekday -- which local weekday is fwd
                fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

            return -fwdlw + fwd - 1;
        }

        // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
            var localWeekday = (7 + weekday - dow) % 7,
                weekOffset = firstWeekOffset(year, dow, doy),
                dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
                resYear,
                resDayOfYear;

            if (dayOfYear <= 0) {
                resYear = year - 1;
                resDayOfYear = daysInYear(resYear) + dayOfYear;
            } else if (dayOfYear > daysInYear(year)) {
                resYear = year + 1;
                resDayOfYear = dayOfYear - daysInYear(year);
            } else {
                resYear = year;
                resDayOfYear = dayOfYear;
            }

            return {
                year: resYear,
                dayOfYear: resDayOfYear,
            };
        }

        function weekOfYear(mom, dow, doy) {
            var weekOffset = firstWeekOffset(mom.year(), dow, doy),
                week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
                resWeek,
                resYear;

            if (week < 1) {
                resYear = mom.year() - 1;
                resWeek = week + weeksInYear(resYear, dow, doy);
            } else if (week > weeksInYear(mom.year(), dow, doy)) {
                resWeek = week - weeksInYear(mom.year(), dow, doy);
                resYear = mom.year() + 1;
            } else {
                resYear = mom.year();
                resWeek = week;
            }

            return {
                week: resWeek,
                year: resYear,
            };
        }

        function weeksInYear(year, dow, doy) {
            var weekOffset = firstWeekOffset(year, dow, doy),
                weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
            return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }

        // FORMATTING

        addFormatToken('w', ['ww', 2], 'wo', 'week');
        addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

        // ALIASES

        addUnitAlias('week', 'w');
        addUnitAlias('isoWeek', 'W');

        // PRIORITIES

        addUnitPriority('week', 5);
        addUnitPriority('isoWeek', 5);

        // PARSING

        addRegexToken('w', match1to2);
        addRegexToken('ww', match1to2, match2);
        addRegexToken('W', match1to2);
        addRegexToken('WW', match1to2, match2);

        addWeekParseToken(
            ['w', 'ww', 'W', 'WW'],
            function (input, week, config, token) {
                week[token.substr(0, 1)] = toInt(input);
            }
        );

        // HELPERS

        // LOCALES

        function localeWeek(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }

        var defaultLocaleWeek = {
            dow: 0, // Sunday is the first day of the week.
            doy: 6, // The week that contains Jan 6th is the first week of the year.
        };

        function localeFirstDayOfWeek() {
            return this._week.dow;
        }

        function localeFirstDayOfYear() {
            return this._week.doy;
        }

        // MOMENTS

        function getSetWeek(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        }

        function getSetISOWeek(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        }

        // FORMATTING

        addFormatToken('d', 0, 'do', 'day');

        addFormatToken('dd', 0, 0, function (format) {
            return this.localeData().weekdaysMin(this, format);
        });

        addFormatToken('ddd', 0, 0, function (format) {
            return this.localeData().weekdaysShort(this, format);
        });

        addFormatToken('dddd', 0, 0, function (format) {
            return this.localeData().weekdays(this, format);
        });

        addFormatToken('e', 0, 0, 'weekday');
        addFormatToken('E', 0, 0, 'isoWeekday');

        // ALIASES

        addUnitAlias('day', 'd');
        addUnitAlias('weekday', 'e');
        addUnitAlias('isoWeekday', 'E');

        // PRIORITY
        addUnitPriority('day', 11);
        addUnitPriority('weekday', 11);
        addUnitPriority('isoWeekday', 11);

        // PARSING

        addRegexToken('d', match1to2);
        addRegexToken('e', match1to2);
        addRegexToken('E', match1to2);
        addRegexToken('dd', function (isStrict, locale) {
            return locale.weekdaysMinRegex(isStrict);
        });
        addRegexToken('ddd', function (isStrict, locale) {
            return locale.weekdaysShortRegex(isStrict);
        });
        addRegexToken('dddd', function (isStrict, locale) {
            return locale.weekdaysRegex(isStrict);
        });

        addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
            var weekday = config._locale.weekdaysParse(input, token, config._strict);
            // if we didn't get a weekday name, mark the date as invalid
            if (weekday != null) {
                week.d = weekday;
            } else {
                getParsingFlags(config).invalidWeekday = input;
            }
        });

        addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
            week[token] = toInt(input);
        });

        // HELPERS

        function parseWeekday(input, locale) {
            if (typeof input !== 'string') {
                return input;
            }

            if (!isNaN(input)) {
                return parseInt(input, 10);
            }

            input = locale.weekdaysParse(input);
            if (typeof input === 'number') {
                return input;
            }

            return null;
        }

        function parseIsoWeekday(input, locale) {
            if (typeof input === 'string') {
                return locale.weekdaysParse(input) % 7 || 7;
            }
            return isNaN(input) ? null : input;
        }

        // LOCALES
        function shiftWeekdays(ws, n) {
            return ws.slice(n, 7).concat(ws.slice(0, n));
        }

        var defaultLocaleWeekdays =
                'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
            defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
            defaultWeekdaysRegex = matchWord,
            defaultWeekdaysShortRegex = matchWord,
            defaultWeekdaysMinRegex = matchWord;

        function localeWeekdays(m, format) {
            var weekdays = isArray(this._weekdays)
                ? this._weekdays
                : this._weekdays[
                      m && m !== true && this._weekdays.isFormat.test(format)
                          ? 'format'
                          : 'standalone'
                  ];
            return m === true
                ? shiftWeekdays(weekdays, this._week.dow)
                : m
                ? weekdays[m.day()]
                : weekdays;
        }

        function localeWeekdaysShort(m) {
            return m === true
                ? shiftWeekdays(this._weekdaysShort, this._week.dow)
                : m
                ? this._weekdaysShort[m.day()]
                : this._weekdaysShort;
        }

        function localeWeekdaysMin(m) {
            return m === true
                ? shiftWeekdays(this._weekdaysMin, this._week.dow)
                : m
                ? this._weekdaysMin[m.day()]
                : this._weekdaysMin;
        }

        function handleStrictParse$1(weekdayName, format, strict) {
            var i,
                ii,
                mom,
                llc = weekdayName.toLocaleLowerCase();
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
                this._shortWeekdaysParse = [];
                this._minWeekdaysParse = [];

                for (i = 0; i < 7; ++i) {
                    mom = createUTC([2000, 1]).day(i);
                    this._minWeekdaysParse[i] = this.weekdaysMin(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._shortWeekdaysParse[i] = this.weekdaysShort(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
                }
            }

            if (strict) {
                if (format === 'dddd') {
                    ii = indexOf.call(this._weekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else if (format === 'ddd') {
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                }
            } else {
                if (format === 'dddd') {
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else if (format === 'ddd') {
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                }
            }
        }

        function localeWeekdaysParse(weekdayName, format, strict) {
            var i, mom, regex;

            if (this._weekdaysParseExact) {
                return handleStrictParse$1.call(this, weekdayName, format, strict);
            }

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
                this._minWeekdaysParse = [];
                this._shortWeekdaysParse = [];
                this._fullWeekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already

                mom = createUTC([2000, 1]).day(i);
                if (strict && !this._fullWeekdaysParse[i]) {
                    this._fullWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                    this._shortWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                    this._minWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                }
                if (!this._weekdaysParse[i]) {
                    regex =
                        '^' +
                        this.weekdays(mom, '') +
                        '|^' +
                        this.weekdaysShort(mom, '') +
                        '|^' +
                        this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (
                    strict &&
                    format === 'dddd' &&
                    this._fullWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'ddd' &&
                    this._shortWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'dd' &&
                    this._minWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        }

        // MOMENTS

        function getSetDayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        }

        function getSetLocaleDayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        }

        function getSetISODayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }

            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.

            if (input != null) {
                var weekday = parseIsoWeekday(input, this.localeData());
                return this.day(this.day() % 7 ? weekday : weekday - 7);
            } else {
                return this.day() || 7;
            }
        }

        function weekdaysRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysStrictRegex;
                } else {
                    return this._weekdaysRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    this._weekdaysRegex = defaultWeekdaysRegex;
                }
                return this._weekdaysStrictRegex && isStrict
                    ? this._weekdaysStrictRegex
                    : this._weekdaysRegex;
            }
        }

        function weekdaysShortRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysShortStrictRegex;
                } else {
                    return this._weekdaysShortRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                    this._weekdaysShortRegex = defaultWeekdaysShortRegex;
                }
                return this._weekdaysShortStrictRegex && isStrict
                    ? this._weekdaysShortStrictRegex
                    : this._weekdaysShortRegex;
            }
        }

        function weekdaysMinRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysMinStrictRegex;
                } else {
                    return this._weekdaysMinRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                    this._weekdaysMinRegex = defaultWeekdaysMinRegex;
                }
                return this._weekdaysMinStrictRegex && isStrict
                    ? this._weekdaysMinStrictRegex
                    : this._weekdaysMinRegex;
            }
        }

        function computeWeekdaysParse() {
            function cmpLenRev(a, b) {
                return b.length - a.length;
            }

            var minPieces = [],
                shortPieces = [],
                longPieces = [],
                mixedPieces = [],
                i,
                mom,
                minp,
                shortp,
                longp;
            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, 1]).day(i);
                minp = regexEscape(this.weekdaysMin(mom, ''));
                shortp = regexEscape(this.weekdaysShort(mom, ''));
                longp = regexEscape(this.weekdays(mom, ''));
                minPieces.push(minp);
                shortPieces.push(shortp);
                longPieces.push(longp);
                mixedPieces.push(minp);
                mixedPieces.push(shortp);
                mixedPieces.push(longp);
            }
            // Sorting makes sure if one weekday (or abbr) is a prefix of another it
            // will match the longer piece.
            minPieces.sort(cmpLenRev);
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);

            this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._weekdaysShortRegex = this._weekdaysRegex;
            this._weekdaysMinRegex = this._weekdaysRegex;

            this._weekdaysStrictRegex = new RegExp(
                '^(' + longPieces.join('|') + ')',
                'i'
            );
            this._weekdaysShortStrictRegex = new RegExp(
                '^(' + shortPieces.join('|') + ')',
                'i'
            );
            this._weekdaysMinStrictRegex = new RegExp(
                '^(' + minPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        function hFormat() {
            return this.hours() % 12 || 12;
        }

        function kFormat() {
            return this.hours() || 24;
        }

        addFormatToken('H', ['HH', 2], 0, 'hour');
        addFormatToken('h', ['hh', 2], 0, hFormat);
        addFormatToken('k', ['kk', 2], 0, kFormat);

        addFormatToken('hmm', 0, 0, function () {
            return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });

        addFormatToken('hmmss', 0, 0, function () {
            return (
                '' +
                hFormat.apply(this) +
                zeroFill(this.minutes(), 2) +
                zeroFill(this.seconds(), 2)
            );
        });

        addFormatToken('Hmm', 0, 0, function () {
            return '' + this.hours() + zeroFill(this.minutes(), 2);
        });

        addFormatToken('Hmmss', 0, 0, function () {
            return (
                '' +
                this.hours() +
                zeroFill(this.minutes(), 2) +
                zeroFill(this.seconds(), 2)
            );
        });

        function meridiem(token, lowercase) {
            addFormatToken(token, 0, 0, function () {
                return this.localeData().meridiem(
                    this.hours(),
                    this.minutes(),
                    lowercase
                );
            });
        }

        meridiem('a', true);
        meridiem('A', false);

        // ALIASES

        addUnitAlias('hour', 'h');

        // PRIORITY
        addUnitPriority('hour', 13);

        // PARSING

        function matchMeridiem(isStrict, locale) {
            return locale._meridiemParse;
        }

        addRegexToken('a', matchMeridiem);
        addRegexToken('A', matchMeridiem);
        addRegexToken('H', match1to2);
        addRegexToken('h', match1to2);
        addRegexToken('k', match1to2);
        addRegexToken('HH', match1to2, match2);
        addRegexToken('hh', match1to2, match2);
        addRegexToken('kk', match1to2, match2);

        addRegexToken('hmm', match3to4);
        addRegexToken('hmmss', match5to6);
        addRegexToken('Hmm', match3to4);
        addRegexToken('Hmmss', match5to6);

        addParseToken(['H', 'HH'], HOUR);
        addParseToken(['k', 'kk'], function (input, array, config) {
            var kInput = toInt(input);
            array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(['a', 'A'], function (input, array, config) {
            config._isPm = config._locale.isPM(input);
            config._meridiem = input;
        });
        addParseToken(['h', 'hh'], function (input, array, config) {
            array[HOUR] = toInt(input);
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmm', function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmmss', function (input, array, config) {
            var pos1 = input.length - 4,
                pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('Hmm', function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken('Hmmss', function (input, array, config) {
            var pos1 = input.length - 4,
                pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
        });

        // LOCALES

        function localeIsPM(input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return (input + '').toLowerCase().charAt(0) === 'p';
        }

        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
            // Setting the hour should keep the time, because the user explicitly
            // specified which hour they want. So trying to maintain the same hour (in
            // a new timezone) makes sense. Adding/subtracting hours does not follow
            // this rule.
            getSetHour = makeGetSet('Hours', true);

        function localeMeridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        }

        var baseConfig = {
            calendar: defaultCalendar,
            longDateFormat: defaultLongDateFormat,
            invalidDate: defaultInvalidDate,
            ordinal: defaultOrdinal,
            dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
            relativeTime: defaultRelativeTime,

            months: defaultLocaleMonths,
            monthsShort: defaultLocaleMonthsShort,

            week: defaultLocaleWeek,

            weekdays: defaultLocaleWeekdays,
            weekdaysMin: defaultLocaleWeekdaysMin,
            weekdaysShort: defaultLocaleWeekdaysShort,

            meridiemParse: defaultLocaleMeridiemParse,
        };

        // internal storage for locale config files
        var locales = {},
            localeFamilies = {},
            globalLocale;

        function commonPrefix(arr1, arr2) {
            var i,
                minl = Math.min(arr1.length, arr2.length);
            for (i = 0; i < minl; i += 1) {
                if (arr1[i] !== arr2[i]) {
                    return i;
                }
            }
            return minl;
        }

        function normalizeLocale(key) {
            return key ? key.toLowerCase().replace('_', '-') : key;
        }

        // pick the locale from the array
        // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        function chooseLocale(names) {
            var i = 0,
                j,
                next,
                locale,
                split;

            while (i < names.length) {
                split = normalizeLocale(names[i]).split('-');
                j = split.length;
                next = normalizeLocale(names[i + 1]);
                next = next ? next.split('-') : null;
                while (j > 0) {
                    locale = loadLocale(split.slice(0, j).join('-'));
                    if (locale) {
                        return locale;
                    }
                    if (
                        next &&
                        next.length >= j &&
                        commonPrefix(split, next) >= j - 1
                    ) {
                        //the next array item is better than a shallower substring of this one
                        break;
                    }
                    j--;
                }
                i++;
            }
            return globalLocale;
        }

        function isLocaleNameSane(name) {
            // Prevent names that look like filesystem paths, i.e contain '/' or '\'
            return name.match('^[^/\\\\]*$') != null;
        }

        function loadLocale(name) {
            var oldLocale = null,
                aliasedRequire;
            // TODO: Find a better way to register and load all the locales in Node
            if (
                locales[name] === undefined &&
                'object' !== 'undefined' &&
                module &&
                module.exports &&
                isLocaleNameSane(name)
            ) {
                try {
                    oldLocale = globalLocale._abbr;
                    aliasedRequire = commonjsRequire;
                    aliasedRequire('./locale/' + name);
                    getSetGlobalLocale(oldLocale);
                } catch (e) {
                    // mark as not found to avoid repeating expensive file require call causing high CPU
                    // when trying to find en-US, en_US, en-us for every format call
                    locales[name] = null; // null means not found
                }
            }
            return locales[name];
        }

        // This function will load locale and then set the global locale.  If
        // no arguments are passed in, it will simply return the current global
        // locale key.
        function getSetGlobalLocale(key, values) {
            var data;
            if (key) {
                if (isUndefined(values)) {
                    data = getLocale(key);
                } else {
                    data = defineLocale(key, values);
                }

                if (data) {
                    // moment.duration._locale = moment._locale = data;
                    globalLocale = data;
                } else {
                    if (typeof console !== 'undefined' && console.warn) {
                        //warn user if arguments are passed but the locale could not be set
                        console.warn(
                            'Locale ' + key + ' not found. Did you forget to load it?'
                        );
                    }
                }
            }

            return globalLocale._abbr;
        }

        function defineLocale(name, config) {
            if (config !== null) {
                var locale,
                    parentConfig = baseConfig;
                config.abbr = name;
                if (locales[name] != null) {
                    deprecateSimple(
                        'defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                            'an existing locale. moment.defineLocale(localeName, ' +
                            'config) should only be used for creating a new locale ' +
                            'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                    );
                    parentConfig = locales[name]._config;
                } else if (config.parentLocale != null) {
                    if (locales[config.parentLocale] != null) {
                        parentConfig = locales[config.parentLocale]._config;
                    } else {
                        locale = loadLocale(config.parentLocale);
                        if (locale != null) {
                            parentConfig = locale._config;
                        } else {
                            if (!localeFamilies[config.parentLocale]) {
                                localeFamilies[config.parentLocale] = [];
                            }
                            localeFamilies[config.parentLocale].push({
                                name: name,
                                config: config,
                            });
                            return null;
                        }
                    }
                }
                locales[name] = new Locale(mergeConfigs(parentConfig, config));

                if (localeFamilies[name]) {
                    localeFamilies[name].forEach(function (x) {
                        defineLocale(x.name, x.config);
                    });
                }

                // backwards compat for now: also set the locale
                // make sure we set the locale AFTER all child locales have been
                // created, so we won't end up with the child locale set.
                getSetGlobalLocale(name);

                return locales[name];
            } else {
                // useful for testing
                delete locales[name];
                return null;
            }
        }

        function updateLocale(name, config) {
            if (config != null) {
                var locale,
                    tmpLocale,
                    parentConfig = baseConfig;

                if (locales[name] != null && locales[name].parentLocale != null) {
                    // Update existing child locale in-place to avoid memory-leaks
                    locales[name].set(mergeConfigs(locales[name]._config, config));
                } else {
                    // MERGE
                    tmpLocale = loadLocale(name);
                    if (tmpLocale != null) {
                        parentConfig = tmpLocale._config;
                    }
                    config = mergeConfigs(parentConfig, config);
                    if (tmpLocale == null) {
                        // updateLocale is called for creating a new locale
                        // Set abbr so it will have a name (getters return
                        // undefined otherwise).
                        config.abbr = name;
                    }
                    locale = new Locale(config);
                    locale.parentLocale = locales[name];
                    locales[name] = locale;
                }

                // backwards compat for now: also set the locale
                getSetGlobalLocale(name);
            } else {
                // pass null for config to unupdate, useful for tests
                if (locales[name] != null) {
                    if (locales[name].parentLocale != null) {
                        locales[name] = locales[name].parentLocale;
                        if (name === getSetGlobalLocale()) {
                            getSetGlobalLocale(name);
                        }
                    } else if (locales[name] != null) {
                        delete locales[name];
                    }
                }
            }
            return locales[name];
        }

        // returns locale data
        function getLocale(key) {
            var locale;

            if (key && key._locale && key._locale._abbr) {
                key = key._locale._abbr;
            }

            if (!key) {
                return globalLocale;
            }

            if (!isArray(key)) {
                //short-circuit everything else
                locale = loadLocale(key);
                if (locale) {
                    return locale;
                }
                key = [key];
            }

            return chooseLocale(key);
        }

        function listLocales() {
            return keys(locales);
        }

        function checkOverflow(m) {
            var overflow,
                a = m._a;

            if (a && getParsingFlags(m).overflow === -2) {
                overflow =
                    a[MONTH] < 0 || a[MONTH] > 11
                        ? MONTH
                        : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                        ? DATE
                        : a[HOUR] < 0 ||
                          a[HOUR] > 24 ||
                          (a[HOUR] === 24 &&
                              (a[MINUTE] !== 0 ||
                                  a[SECOND] !== 0 ||
                                  a[MILLISECOND] !== 0))
                        ? HOUR
                        : a[MINUTE] < 0 || a[MINUTE] > 59
                        ? MINUTE
                        : a[SECOND] < 0 || a[SECOND] > 59
                        ? SECOND
                        : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                        ? MILLISECOND
                        : -1;

                if (
                    getParsingFlags(m)._overflowDayOfYear &&
                    (overflow < YEAR || overflow > DATE)
                ) {
                    overflow = DATE;
                }
                if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                    overflow = WEEK;
                }
                if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                    overflow = WEEKDAY;
                }

                getParsingFlags(m).overflow = overflow;
            }

            return m;
        }

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        var extendedIsoRegex =
                /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            basicIsoRegex =
                /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
            isoDates = [
                ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
                ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
                ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
                ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
                ['YYYY-DDD', /\d{4}-\d{3}/],
                ['YYYY-MM', /\d{4}-\d\d/, false],
                ['YYYYYYMMDD', /[+-]\d{10}/],
                ['YYYYMMDD', /\d{8}/],
                ['GGGG[W]WWE', /\d{4}W\d{3}/],
                ['GGGG[W]WW', /\d{4}W\d{2}/, false],
                ['YYYYDDD', /\d{7}/],
                ['YYYYMM', /\d{6}/, false],
                ['YYYY', /\d{4}/, false],
            ],
            // iso time formats and regexes
            isoTimes = [
                ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
                ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
                ['HH:mm:ss', /\d\d:\d\d:\d\d/],
                ['HH:mm', /\d\d:\d\d/],
                ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
                ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
                ['HHmmss', /\d\d\d\d\d\d/],
                ['HHmm', /\d\d\d\d/],
                ['HH', /\d\d/],
            ],
            aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
            // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
            rfc2822 =
                /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            obsOffsets = {
                UT: 0,
                GMT: 0,
                EDT: -4 * 60,
                EST: -5 * 60,
                CDT: -5 * 60,
                CST: -6 * 60,
                MDT: -6 * 60,
                MST: -7 * 60,
                PDT: -7 * 60,
                PST: -8 * 60,
            };

        // date from iso format
        function configFromISO(config) {
            var i,
                l,
                string = config._i,
                match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
                allowTime,
                dateFormat,
                timeFormat,
                tzFormat,
                isoDatesLen = isoDates.length,
                isoTimesLen = isoTimes.length;

            if (match) {
                getParsingFlags(config).iso = true;
                for (i = 0, l = isoDatesLen; i < l; i++) {
                    if (isoDates[i][1].exec(match[1])) {
                        dateFormat = isoDates[i][0];
                        allowTime = isoDates[i][2] !== false;
                        break;
                    }
                }
                if (dateFormat == null) {
                    config._isValid = false;
                    return;
                }
                if (match[3]) {
                    for (i = 0, l = isoTimesLen; i < l; i++) {
                        if (isoTimes[i][1].exec(match[3])) {
                            // match[2] should be 'T' or space
                            timeFormat = (match[2] || ' ') + isoTimes[i][0];
                            break;
                        }
                    }
                    if (timeFormat == null) {
                        config._isValid = false;
                        return;
                    }
                }
                if (!allowTime && timeFormat != null) {
                    config._isValid = false;
                    return;
                }
                if (match[4]) {
                    if (tzRegex.exec(match[4])) {
                        tzFormat = 'Z';
                    } else {
                        config._isValid = false;
                        return;
                    }
                }
                config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
                configFromStringAndFormat(config);
            } else {
                config._isValid = false;
            }
        }

        function extractFromRFC2822Strings(
            yearStr,
            monthStr,
            dayStr,
            hourStr,
            minuteStr,
            secondStr
        ) {
            var result = [
                untruncateYear(yearStr),
                defaultLocaleMonthsShort.indexOf(monthStr),
                parseInt(dayStr, 10),
                parseInt(hourStr, 10),
                parseInt(minuteStr, 10),
            ];

            if (secondStr) {
                result.push(parseInt(secondStr, 10));
            }

            return result;
        }

        function untruncateYear(yearStr) {
            var year = parseInt(yearStr, 10);
            if (year <= 49) {
                return 2000 + year;
            } else if (year <= 999) {
                return 1900 + year;
            }
            return year;
        }

        function preprocessRFC2822(s) {
            // Remove comments and folding whitespace and replace multiple-spaces with a single space
            return s
                .replace(/\([^)]*\)|[\n\t]/g, ' ')
                .replace(/(\s\s+)/g, ' ')
                .replace(/^\s\s*/, '')
                .replace(/\s\s*$/, '');
        }

        function checkWeekday(weekdayStr, parsedInput, config) {
            if (weekdayStr) {
                // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
                var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                    weekdayActual = new Date(
                        parsedInput[0],
                        parsedInput[1],
                        parsedInput[2]
                    ).getDay();
                if (weekdayProvided !== weekdayActual) {
                    getParsingFlags(config).weekdayMismatch = true;
                    config._isValid = false;
                    return false;
                }
            }
            return true;
        }

        function calculateOffset(obsOffset, militaryOffset, numOffset) {
            if (obsOffset) {
                return obsOffsets[obsOffset];
            } else if (militaryOffset) {
                // the only allowed military tz is Z
                return 0;
            } else {
                var hm = parseInt(numOffset, 10),
                    m = hm % 100,
                    h = (hm - m) / 100;
                return h * 60 + m;
            }
        }

        // date and time from ref 2822 format
        function configFromRFC2822(config) {
            var match = rfc2822.exec(preprocessRFC2822(config._i)),
                parsedArray;
            if (match) {
                parsedArray = extractFromRFC2822Strings(
                    match[4],
                    match[3],
                    match[2],
                    match[5],
                    match[6],
                    match[7]
                );
                if (!checkWeekday(match[1], parsedArray, config)) {
                    return;
                }

                config._a = parsedArray;
                config._tzm = calculateOffset(match[8], match[9], match[10]);

                config._d = createUTCDate.apply(null, config._a);
                config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

                getParsingFlags(config).rfc2822 = true;
            } else {
                config._isValid = false;
            }
        }

        // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
        function configFromString(config) {
            var matched = aspNetJsonRegex.exec(config._i);
            if (matched !== null) {
                config._d = new Date(+matched[1]);
                return;
            }

            configFromISO(config);
            if (config._isValid === false) {
                delete config._isValid;
            } else {
                return;
            }

            configFromRFC2822(config);
            if (config._isValid === false) {
                delete config._isValid;
            } else {
                return;
            }

            if (config._strict) {
                config._isValid = false;
            } else {
                // Final attempt, use Input Fallback
                hooks.createFromInputFallback(config);
            }
        }

        hooks.createFromInputFallback = deprecate(
            'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
                'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
                'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
            function (config) {
                config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
            }
        );

        // Pick the first defined of two or three arguments.
        function defaults(a, b, c) {
            if (a != null) {
                return a;
            }
            if (b != null) {
                return b;
            }
            return c;
        }

        function currentDateArray(config) {
            // hooks is actually the exported moment object
            var nowValue = new Date(hooks.now());
            if (config._useUTC) {
                return [
                    nowValue.getUTCFullYear(),
                    nowValue.getUTCMonth(),
                    nowValue.getUTCDate(),
                ];
            }
            return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }

        // convert an array to a date.
        // the array should mirror the parameters below
        // note: all values past the year are optional and will default to the lowest possible value.
        // [year, month, day , hour, minute, second, millisecond]
        function configFromArray(config) {
            var i,
                date,
                input = [],
                currentDate,
                expectedWeekday,
                yearToUse;

            if (config._d) {
                return;
            }

            currentDate = currentDateArray(config);

            //compute day of the year from weeks and weekdays
            if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
                dayOfYearFromWeekInfo(config);
            }

            //if the day of the year is set, figure out what it is
            if (config._dayOfYear != null) {
                yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

                if (
                    config._dayOfYear > daysInYear(yearToUse) ||
                    config._dayOfYear === 0
                ) {
                    getParsingFlags(config)._overflowDayOfYear = true;
                }

                date = createUTCDate(yearToUse, 0, config._dayOfYear);
                config._a[MONTH] = date.getUTCMonth();
                config._a[DATE] = date.getUTCDate();
            }

            // Default to current date.
            // * if no year, month, day of month are given, default to today
            // * if day of month is given, default month and year
            // * if month is given, default only year
            // * if year is given, don't default anything
            for (i = 0; i < 3 && config._a[i] == null; ++i) {
                config._a[i] = input[i] = currentDate[i];
            }

            // Zero out whatever was not defaulted, including time
            for (; i < 7; i++) {
                config._a[i] = input[i] =
                    config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
            }

            // Check for 24:00:00.000
            if (
                config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0
            ) {
                config._nextDay = true;
                config._a[HOUR] = 0;
            }

            config._d = (config._useUTC ? createUTCDate : createDate).apply(
                null,
                input
            );
            expectedWeekday = config._useUTC
                ? config._d.getUTCDay()
                : config._d.getDay();

            // Apply timezone offset from input. The actual utcOffset can be changed
            // with parseZone.
            if (config._tzm != null) {
                config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            }

            if (config._nextDay) {
                config._a[HOUR] = 24;
            }

            // check for mismatching day of week
            if (
                config._w &&
                typeof config._w.d !== 'undefined' &&
                config._w.d !== expectedWeekday
            ) {
                getParsingFlags(config).weekdayMismatch = true;
            }
        }

        function dayOfYearFromWeekInfo(config) {
            var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                dow = 1;
                doy = 4;

                // TODO: We need to take the current isoWeekYear, but that depends on
                // how we interpret now (local, utc, fixed offset). So create
                // a now version of current config (take local/utc/offset flags, and
                // create now).
                weekYear = defaults(
                    w.GG,
                    config._a[YEAR],
                    weekOfYear(createLocal(), 1, 4).year
                );
                week = defaults(w.W, 1);
                weekday = defaults(w.E, 1);
                if (weekday < 1 || weekday > 7) {
                    weekdayOverflow = true;
                }
            } else {
                dow = config._locale._week.dow;
                doy = config._locale._week.doy;

                curWeek = weekOfYear(createLocal(), dow, doy);

                weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

                // Default to current week.
                week = defaults(w.w, curWeek.week);

                if (w.d != null) {
                    // weekday -- low day numbers are considered next week
                    weekday = w.d;
                    if (weekday < 0 || weekday > 6) {
                        weekdayOverflow = true;
                    }
                } else if (w.e != null) {
                    // local weekday -- counting starts from beginning of week
                    weekday = w.e + dow;
                    if (w.e < 0 || w.e > 6) {
                        weekdayOverflow = true;
                    }
                } else {
                    // default to beginning of week
                    weekday = dow;
                }
            }
            if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
                getParsingFlags(config)._overflowWeeks = true;
            } else if (weekdayOverflow != null) {
                getParsingFlags(config)._overflowWeekday = true;
            } else {
                temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
                config._a[YEAR] = temp.year;
                config._dayOfYear = temp.dayOfYear;
            }
        }

        // constant that refers to the ISO standard
        hooks.ISO_8601 = function () {};

        // constant that refers to the RFC 2822 form
        hooks.RFC_2822 = function () {};

        // date from string and format string
        function configFromStringAndFormat(config) {
            // TODO: Move this to another part of the creation flow to prevent circular deps
            if (config._f === hooks.ISO_8601) {
                configFromISO(config);
                return;
            }
            if (config._f === hooks.RFC_2822) {
                configFromRFC2822(config);
                return;
            }
            config._a = [];
            getParsingFlags(config).empty = true;

            // This array is used to make a Date, either with `new Date` or `Date.UTC`
            var string = '' + config._i,
                i,
                parsedInput,
                tokens,
                token,
                skipped,
                stringLength = string.length,
                totalParsedInputLength = 0,
                era,
                tokenLen;

            tokens =
                expandFormat(config._f, config._locale).match(formattingTokens) || [];
            tokenLen = tokens.length;
            for (i = 0; i < tokenLen; i++) {
                token = tokens[i];
                parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                    [])[0];
                if (parsedInput) {
                    skipped = string.substr(0, string.indexOf(parsedInput));
                    if (skipped.length > 0) {
                        getParsingFlags(config).unusedInput.push(skipped);
                    }
                    string = string.slice(
                        string.indexOf(parsedInput) + parsedInput.length
                    );
                    totalParsedInputLength += parsedInput.length;
                }
                // don't parse if it's not a known token
                if (formatTokenFunctions[token]) {
                    if (parsedInput) {
                        getParsingFlags(config).empty = false;
                    } else {
                        getParsingFlags(config).unusedTokens.push(token);
                    }
                    addTimeToArrayFromToken(token, parsedInput, config);
                } else if (config._strict && !parsedInput) {
                    getParsingFlags(config).unusedTokens.push(token);
                }
            }

            // add remaining unparsed input length to the string
            getParsingFlags(config).charsLeftOver =
                stringLength - totalParsedInputLength;
            if (string.length > 0) {
                getParsingFlags(config).unusedInput.push(string);
            }

            // clear _12h flag if hour is <= 12
            if (
                config._a[HOUR] <= 12 &&
                getParsingFlags(config).bigHour === true &&
                config._a[HOUR] > 0
            ) {
                getParsingFlags(config).bigHour = undefined;
            }

            getParsingFlags(config).parsedDateParts = config._a.slice(0);
            getParsingFlags(config).meridiem = config._meridiem;
            // handle meridiem
            config._a[HOUR] = meridiemFixWrap(
                config._locale,
                config._a[HOUR],
                config._meridiem
            );

            // handle era
            era = getParsingFlags(config).era;
            if (era !== null) {
                config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
            }

            configFromArray(config);
            checkOverflow(config);
        }

        function meridiemFixWrap(locale, hour, meridiem) {
            var isPm;

            if (meridiem == null) {
                // nothing to do
                return hour;
            }
            if (locale.meridiemHour != null) {
                return locale.meridiemHour(hour, meridiem);
            } else if (locale.isPM != null) {
                // Fallback
                isPm = locale.isPM(meridiem);
                if (isPm && hour < 12) {
                    hour += 12;
                }
                if (!isPm && hour === 12) {
                    hour = 0;
                }
                return hour;
            } else {
                // this is not supposed to happen
                return hour;
            }
        }

        // date from string and array of format strings
        function configFromStringAndArray(config) {
            var tempConfig,
                bestMoment,
                scoreToBeat,
                i,
                currentScore,
                validFormatFound,
                bestFormatIsValid = false,
                configfLen = config._f.length;

            if (configfLen === 0) {
                getParsingFlags(config).invalidFormat = true;
                config._d = new Date(NaN);
                return;
            }

            for (i = 0; i < configfLen; i++) {
                currentScore = 0;
                validFormatFound = false;
                tempConfig = copyConfig({}, config);
                if (config._useUTC != null) {
                    tempConfig._useUTC = config._useUTC;
                }
                tempConfig._f = config._f[i];
                configFromStringAndFormat(tempConfig);

                if (isValid(tempConfig)) {
                    validFormatFound = true;
                }

                // if there is any input that was not parsed add a penalty for that format
                currentScore += getParsingFlags(tempConfig).charsLeftOver;

                //or tokens
                currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

                getParsingFlags(tempConfig).score = currentScore;

                if (!bestFormatIsValid) {
                    if (
                        scoreToBeat == null ||
                        currentScore < scoreToBeat ||
                        validFormatFound
                    ) {
                        scoreToBeat = currentScore;
                        bestMoment = tempConfig;
                        if (validFormatFound) {
                            bestFormatIsValid = true;
                        }
                    }
                } else {
                    if (currentScore < scoreToBeat) {
                        scoreToBeat = currentScore;
                        bestMoment = tempConfig;
                    }
                }
            }

            extend(config, bestMoment || tempConfig);
        }

        function configFromObject(config) {
            if (config._d) {
                return;
            }

            var i = normalizeObjectUnits(config._i),
                dayOrDate = i.day === undefined ? i.date : i.day;
            config._a = map(
                [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
                function (obj) {
                    return obj && parseInt(obj, 10);
                }
            );

            configFromArray(config);
        }

        function createFromConfig(config) {
            var res = new Moment(checkOverflow(prepareConfig(config)));
            if (res._nextDay) {
                // Adding is smart enough around DST
                res.add(1, 'd');
                res._nextDay = undefined;
            }

            return res;
        }

        function prepareConfig(config) {
            var input = config._i,
                format = config._f;

            config._locale = config._locale || getLocale(config._l);

            if (input === null || (format === undefined && input === '')) {
                return createInvalid({ nullInput: true });
            }

            if (typeof input === 'string') {
                config._i = input = config._locale.preparse(input);
            }

            if (isMoment(input)) {
                return new Moment(checkOverflow(input));
            } else if (isDate(input)) {
                config._d = input;
            } else if (isArray(format)) {
                configFromStringAndArray(config);
            } else if (format) {
                configFromStringAndFormat(config);
            } else {
                configFromInput(config);
            }

            if (!isValid(config)) {
                config._d = null;
            }

            return config;
        }

        function configFromInput(config) {
            var input = config._i;
            if (isUndefined(input)) {
                config._d = new Date(hooks.now());
            } else if (isDate(input)) {
                config._d = new Date(input.valueOf());
            } else if (typeof input === 'string') {
                configFromString(config);
            } else if (isArray(input)) {
                config._a = map(input.slice(0), function (obj) {
                    return parseInt(obj, 10);
                });
                configFromArray(config);
            } else if (isObject(input)) {
                configFromObject(config);
            } else if (isNumber(input)) {
                // from milliseconds
                config._d = new Date(input);
            } else {
                hooks.createFromInputFallback(config);
            }
        }

        function createLocalOrUTC(input, format, locale, strict, isUTC) {
            var c = {};

            if (format === true || format === false) {
                strict = format;
                format = undefined;
            }

            if (locale === true || locale === false) {
                strict = locale;
                locale = undefined;
            }

            if (
                (isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)
            ) {
                input = undefined;
            }
            // object construction must be done this way.
            // https://github.com/moment/moment/issues/1423
            c._isAMomentObject = true;
            c._useUTC = c._isUTC = isUTC;
            c._l = locale;
            c._i = input;
            c._f = format;
            c._strict = strict;

            return createFromConfig(c);
        }

        function createLocal(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, false);
        }

        var prototypeMin = deprecate(
                'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
                function () {
                    var other = createLocal.apply(null, arguments);
                    if (this.isValid() && other.isValid()) {
                        return other < this ? this : other;
                    } else {
                        return createInvalid();
                    }
                }
            ),
            prototypeMax = deprecate(
                'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
                function () {
                    var other = createLocal.apply(null, arguments);
                    if (this.isValid() && other.isValid()) {
                        return other > this ? this : other;
                    } else {
                        return createInvalid();
                    }
                }
            );

        // Pick a moment m from moments so that m[fn](other) is true for all
        // other. This relies on the function fn to be transitive.
        //
        // moments should either be an array of moment objects or an array, whose
        // first element is an array of moment objects.
        function pickBy(fn, moments) {
            var res, i;
            if (moments.length === 1 && isArray(moments[0])) {
                moments = moments[0];
            }
            if (!moments.length) {
                return createLocal();
            }
            res = moments[0];
            for (i = 1; i < moments.length; ++i) {
                if (!moments[i].isValid() || moments[i][fn](res)) {
                    res = moments[i];
                }
            }
            return res;
        }

        // TODO: Use [].sort instead?
        function min() {
            var args = [].slice.call(arguments, 0);

            return pickBy('isBefore', args);
        }

        function max() {
            var args = [].slice.call(arguments, 0);

            return pickBy('isAfter', args);
        }

        var now = function () {
            return Date.now ? Date.now() : +new Date();
        };

        var ordering = [
            'year',
            'quarter',
            'month',
            'week',
            'day',
            'hour',
            'minute',
            'second',
            'millisecond',
        ];

        function isDurationValid(m) {
            var key,
                unitHasDecimal = false,
                i,
                orderLen = ordering.length;
            for (key in m) {
                if (
                    hasOwnProp(m, key) &&
                    !(
                        indexOf.call(ordering, key) !== -1 &&
                        (m[key] == null || !isNaN(m[key]))
                    )
                ) {
                    return false;
                }
            }

            for (i = 0; i < orderLen; ++i) {
                if (m[ordering[i]]) {
                    if (unitHasDecimal) {
                        return false; // only allow non-integers for smallest unit
                    }
                    if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                        unitHasDecimal = true;
                    }
                }
            }

            return true;
        }

        function isValid$1() {
            return this._isValid;
        }

        function createInvalid$1() {
            return createDuration(NaN);
        }

        function Duration(duration) {
            var normalizedInput = normalizeObjectUnits(duration),
                years = normalizedInput.year || 0,
                quarters = normalizedInput.quarter || 0,
                months = normalizedInput.month || 0,
                weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
                days = normalizedInput.day || 0,
                hours = normalizedInput.hour || 0,
                minutes = normalizedInput.minute || 0,
                seconds = normalizedInput.second || 0,
                milliseconds = normalizedInput.millisecond || 0;

            this._isValid = isDurationValid(normalizedInput);

            // representation for dateAddRemove
            this._milliseconds =
                +milliseconds +
                seconds * 1e3 + // 1000
                minutes * 6e4 + // 1000 * 60
                hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
            // Because of dateAddRemove treats 24 hours as different from a
            // day when working around DST, we need to store them separately
            this._days = +days + weeks * 7;
            // It is impossible to translate months into days without knowing
            // which months you are are talking about, so we have to store
            // it separately.
            this._months = +months + quarters * 3 + years * 12;

            this._data = {};

            this._locale = getLocale();

            this._bubble();
        }

        function isDuration(obj) {
            return obj instanceof Duration;
        }

        function absRound(number) {
            if (number < 0) {
                return Math.round(-1 * number) * -1;
            } else {
                return Math.round(number);
            }
        }

        // compare two arrays, return the number of differences
        function compareArrays(array1, array2, dontConvert) {
            var len = Math.min(array1.length, array2.length),
                lengthDiff = Math.abs(array1.length - array2.length),
                diffs = 0,
                i;
            for (i = 0; i < len; i++) {
                if (
                    (dontConvert && array1[i] !== array2[i]) ||
                    (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
                ) {
                    diffs++;
                }
            }
            return diffs + lengthDiff;
        }

        // FORMATTING

        function offset(token, separator) {
            addFormatToken(token, 0, 0, function () {
                var offset = this.utcOffset(),
                    sign = '+';
                if (offset < 0) {
                    offset = -offset;
                    sign = '-';
                }
                return (
                    sign +
                    zeroFill(~~(offset / 60), 2) +
                    separator +
                    zeroFill(~~offset % 60, 2)
                );
            });
        }

        offset('Z', ':');
        offset('ZZ', '');

        // PARSING

        addRegexToken('Z', matchShortOffset);
        addRegexToken('ZZ', matchShortOffset);
        addParseToken(['Z', 'ZZ'], function (input, array, config) {
            config._useUTC = true;
            config._tzm = offsetFromString(matchShortOffset, input);
        });

        // HELPERS

        // timezone chunker
        // '+10:00' > ['10',  '00']
        // '-1530'  > ['-15', '30']
        var chunkOffset = /([\+\-]|\d\d)/gi;

        function offsetFromString(matcher, string) {
            var matches = (string || '').match(matcher),
                chunk,
                parts,
                minutes;

            if (matches === null) {
                return null;
            }

            chunk = matches[matches.length - 1] || [];
            parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
            minutes = +(parts[1] * 60) + toInt(parts[2]);

            return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
        }

        // Return a moment from input, that is local/utc/zone equivalent to model.
        function cloneWithOffset(input, model) {
            var res, diff;
            if (model._isUTC) {
                res = model.clone();
                diff =
                    (isMoment(input) || isDate(input)
                        ? input.valueOf()
                        : createLocal(input).valueOf()) - res.valueOf();
                // Use low-level api, because this fn is low-level api.
                res._d.setTime(res._d.valueOf() + diff);
                hooks.updateOffset(res, false);
                return res;
            } else {
                return createLocal(input).local();
            }
        }

        function getDateOffset(m) {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(m._d.getTimezoneOffset());
        }

        // HOOKS

        // This function will be called whenever a moment is mutated.
        // It is intended to keep the offset in sync with the timezone.
        hooks.updateOffset = function () {};

        // MOMENTS

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        function getSetOffset(input, keepLocalTime, keepMinutes) {
            var offset = this._offset || 0,
                localAdjust;
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            if (input != null) {
                if (typeof input === 'string') {
                    input = offsetFromString(matchShortOffset, input);
                    if (input === null) {
                        return this;
                    }
                } else if (Math.abs(input) < 16 && !keepMinutes) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = getDateOffset(this);
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addSubtract(
                            this,
                            createDuration(input - offset, 'm'),
                            1,
                            false
                        );
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        hooks.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
                return this;
            } else {
                return this._isUTC ? offset : getDateOffset(this);
            }
        }

        function getSetZone(input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== 'string') {
                    input = -input;
                }

                this.utcOffset(input, keepLocalTime);

                return this;
            } else {
                return -this.utcOffset();
            }
        }

        function setOffsetToUTC(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        }

        function setOffsetToLocal(keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.subtract(getDateOffset(this), 'm');
                }
            }
            return this;
        }

        function setOffsetToParsedOffset() {
            if (this._tzm != null) {
                this.utcOffset(this._tzm, false, true);
            } else if (typeof this._i === 'string') {
                var tZone = offsetFromString(matchOffset, this._i);
                if (tZone != null) {
                    this.utcOffset(tZone);
                } else {
                    this.utcOffset(0, true);
                }
            }
            return this;
        }

        function hasAlignedHourOffset(input) {
            if (!this.isValid()) {
                return false;
            }
            input = input ? createLocal(input).utcOffset() : 0;

            return (this.utcOffset() - input) % 60 === 0;
        }

        function isDaylightSavingTime() {
            return (
                this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset()
            );
        }

        function isDaylightSavingTimeShifted() {
            if (!isUndefined(this._isDSTShifted)) {
                return this._isDSTShifted;
            }

            var c = {},
                other;

            copyConfig(c, this);
            c = prepareConfig(c);

            if (c._a) {
                other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
                this._isDSTShifted =
                    this.isValid() && compareArrays(c._a, other.toArray()) > 0;
            } else {
                this._isDSTShifted = false;
            }

            return this._isDSTShifted;
        }

        function isLocal() {
            return this.isValid() ? !this._isUTC : false;
        }

        function isUtcOffset() {
            return this.isValid() ? this._isUTC : false;
        }

        function isUtc() {
            return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }

        // ASP.NET json date format regex
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
            // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
            // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
            // and further modified to allow for strings containing both week and day
            isoRegex =
                /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

        function createDuration(input, key) {
            var duration = input,
                // matching against regexp is expensive, do it on demand
                match = null,
                sign,
                ret,
                diffRes;

            if (isDuration(input)) {
                duration = {
                    ms: input._milliseconds,
                    d: input._days,
                    M: input._months,
                };
            } else if (isNumber(input) || !isNaN(+input)) {
                duration = {};
                if (key) {
                    duration[key] = +input;
                } else {
                    duration.milliseconds = +input;
                }
            } else if ((match = aspNetRegex.exec(input))) {
                sign = match[1] === '-' ? -1 : 1;
                duration = {
                    y: 0,
                    d: toInt(match[DATE]) * sign,
                    h: toInt(match[HOUR]) * sign,
                    m: toInt(match[MINUTE]) * sign,
                    s: toInt(match[SECOND]) * sign,
                    ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
                };
            } else if ((match = isoRegex.exec(input))) {
                sign = match[1] === '-' ? -1 : 1;
                duration = {
                    y: parseIso(match[2], sign),
                    M: parseIso(match[3], sign),
                    w: parseIso(match[4], sign),
                    d: parseIso(match[5], sign),
                    h: parseIso(match[6], sign),
                    m: parseIso(match[7], sign),
                    s: parseIso(match[8], sign),
                };
            } else if (duration == null) {
                // checks for null or undefined
                duration = {};
            } else if (
                typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)
            ) {
                diffRes = momentsDifference(
                    createLocal(duration.from),
                    createLocal(duration.to)
                );

                duration = {};
                duration.ms = diffRes.milliseconds;
                duration.M = diffRes.months;
            }

            ret = new Duration(duration);

            if (isDuration(input) && hasOwnProp(input, '_locale')) {
                ret._locale = input._locale;
            }

            if (isDuration(input) && hasOwnProp(input, '_isValid')) {
                ret._isValid = input._isValid;
            }

            return ret;
        }

        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;

        function parseIso(inp, sign) {
            // We'd normally use ~~inp for this, but unfortunately it also
            // converts floats to ints.
            // inp may be undefined, so careful calling replace on it.
            var res = inp && parseFloat(inp.replace(',', '.'));
            // apply sign while we're at it
            return (isNaN(res) ? 0 : res) * sign;
        }

        function positiveMomentsDifference(base, other) {
            var res = {};

            res.months =
                other.month() - base.month() + (other.year() - base.year()) * 12;
            if (base.clone().add(res.months, 'M').isAfter(other)) {
                --res.months;
            }

            res.milliseconds = +other - +base.clone().add(res.months, 'M');

            return res;
        }

        function momentsDifference(base, other) {
            var res;
            if (!(base.isValid() && other.isValid())) {
                return { milliseconds: 0, months: 0 };
            }

            other = cloneWithOffset(other, base);
            if (base.isBefore(other)) {
                res = positiveMomentsDifference(base, other);
            } else {
                res = positiveMomentsDifference(other, base);
                res.milliseconds = -res.milliseconds;
                res.months = -res.months;
            }

            return res;
        }

        // TODO: remove 'name' arg after deprecation is removed
        function createAdder(direction, name) {
            return function (val, period) {
                var dur, tmp;
                //invert the arguments, but complain about it
                if (period !== null && !isNaN(+period)) {
                    deprecateSimple(
                        name,
                        'moment().' +
                            name +
                            '(period, number) is deprecated. Please use moment().' +
                            name +
                            '(number, period). ' +
                            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                    );
                    tmp = val;
                    val = period;
                    period = tmp;
                }

                dur = createDuration(val, period);
                addSubtract(this, dur, direction);
                return this;
            };
        }

        function addSubtract(mom, duration, isAdding, updateOffset) {
            var milliseconds = duration._milliseconds,
                days = absRound(duration._days),
                months = absRound(duration._months);

            if (!mom.isValid()) {
                // No op
                return;
            }

            updateOffset = updateOffset == null ? true : updateOffset;

            if (months) {
                setMonth(mom, get(mom, 'Month') + months * isAdding);
            }
            if (days) {
                set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
            }
            if (milliseconds) {
                mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
            }
            if (updateOffset) {
                hooks.updateOffset(mom, days || months);
            }
        }

        var add = createAdder(1, 'add'),
            subtract = createAdder(-1, 'subtract');

        function isString(input) {
            return typeof input === 'string' || input instanceof String;
        }

        // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
        function isMomentInput(input) {
            return (
                isMoment(input) ||
                isDate(input) ||
                isString(input) ||
                isNumber(input) ||
                isNumberOrStringArray(input) ||
                isMomentInputObject(input) ||
                input === null ||
                input === undefined
            );
        }

        function isMomentInputObject(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
                propertyTest = false,
                properties = [
                    'years',
                    'year',
                    'y',
                    'months',
                    'month',
                    'M',
                    'days',
                    'day',
                    'd',
                    'dates',
                    'date',
                    'D',
                    'hours',
                    'hour',
                    'h',
                    'minutes',
                    'minute',
                    'm',
                    'seconds',
                    'second',
                    's',
                    'milliseconds',
                    'millisecond',
                    'ms',
                ],
                i,
                property,
                propertyLen = properties.length;

            for (i = 0; i < propertyLen; i += 1) {
                property = properties[i];
                propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
        }

        function isNumberOrStringArray(input) {
            var arrayTest = isArray(input),
                dataTypeTest = false;
            if (arrayTest) {
                dataTypeTest =
                    input.filter(function (item) {
                        return !isNumber(item) && isString(input);
                    }).length === 0;
            }
            return arrayTest && dataTypeTest;
        }

        function isCalendarSpec(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
                propertyTest = false,
                properties = [
                    'sameDay',
                    'nextDay',
                    'lastDay',
                    'nextWeek',
                    'lastWeek',
                    'sameElse',
                ],
                i,
                property;

            for (i = 0; i < properties.length; i += 1) {
                property = properties[i];
                propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
        }

        function getCalendarFormat(myMoment, now) {
            var diff = myMoment.diff(now, 'days', true);
            return diff < -6
                ? 'sameElse'
                : diff < -1
                ? 'lastWeek'
                : diff < 0
                ? 'lastDay'
                : diff < 1
                ? 'sameDay'
                : diff < 2
                ? 'nextDay'
                : diff < 7
                ? 'nextWeek'
                : 'sameElse';
        }

        function calendar$1(time, formats) {
            // Support for single parameter, formats only overload to the calendar function
            if (arguments.length === 1) {
                if (!arguments[0]) {
                    time = undefined;
                    formats = undefined;
                } else if (isMomentInput(arguments[0])) {
                    time = arguments[0];
                    formats = undefined;
                } else if (isCalendarSpec(arguments[0])) {
                    formats = arguments[0];
                    time = undefined;
                }
            }
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're local/utc/offset or not.
            var now = time || createLocal(),
                sod = cloneWithOffset(now, this).startOf('day'),
                format = hooks.calendarFormat(this, sod) || 'sameElse',
                output =
                    formats &&
                    (isFunction(formats[format])
                        ? formats[format].call(this, now)
                        : formats[format]);

            return this.format(
                output || this.localeData().calendar(format, this, createLocal(now))
            );
        }

        function clone() {
            return new Moment(this);
        }

        function isAfter(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() > localInput.valueOf();
            } else {
                return localInput.valueOf() < this.clone().startOf(units).valueOf();
            }
        }

        function isBefore(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() < localInput.valueOf();
            } else {
                return this.clone().endOf(units).valueOf() < localInput.valueOf();
            }
        }

        function isBetween(from, to, units, inclusivity) {
            var localFrom = isMoment(from) ? from : createLocal(from),
                localTo = isMoment(to) ? to : createLocal(to);
            if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
                return false;
            }
            inclusivity = inclusivity || '()';
            return (
                (inclusivity[0] === '('
                    ? this.isAfter(localFrom, units)
                    : !this.isBefore(localFrom, units)) &&
                (inclusivity[1] === ')'
                    ? this.isBefore(localTo, units)
                    : !this.isAfter(localTo, units))
            );
        }

        function isSame(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input),
                inputMs;
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() === localInput.valueOf();
            } else {
                inputMs = localInput.valueOf();
                return (
                    this.clone().startOf(units).valueOf() <= inputMs &&
                    inputMs <= this.clone().endOf(units).valueOf()
                );
            }
        }

        function isSameOrAfter(input, units) {
            return this.isSame(input, units) || this.isAfter(input, units);
        }

        function isSameOrBefore(input, units) {
            return this.isSame(input, units) || this.isBefore(input, units);
        }

        function diff(input, units, asFloat) {
            var that, zoneDelta, output;

            if (!this.isValid()) {
                return NaN;
            }

            that = cloneWithOffset(input, this);

            if (!that.isValid()) {
                return NaN;
            }

            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

            units = normalizeUnits(units);

            switch (units) {
                case 'year':
                    output = monthDiff(this, that) / 12;
                    break;
                case 'month':
                    output = monthDiff(this, that);
                    break;
                case 'quarter':
                    output = monthDiff(this, that) / 3;
                    break;
                case 'second':
                    output = (this - that) / 1e3;
                    break; // 1000
                case 'minute':
                    output = (this - that) / 6e4;
                    break; // 1000 * 60
                case 'hour':
                    output = (this - that) / 36e5;
                    break; // 1000 * 60 * 60
                case 'day':
                    output = (this - that - zoneDelta) / 864e5;
                    break; // 1000 * 60 * 60 * 24, negate dst
                case 'week':
                    output = (this - that - zoneDelta) / 6048e5;
                    break; // 1000 * 60 * 60 * 24 * 7, negate dst
                default:
                    output = this - that;
            }

            return asFloat ? output : absFloor(output);
        }

        function monthDiff(a, b) {
            if (a.date() < b.date()) {
                // end-of-month calculations work correct when the start month has more
                // days than the end month.
                return -monthDiff(b, a);
            }
            // difference in months
            var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
                // b is in (anchor - 1 month, anchor + 1 month)
                anchor = a.clone().add(wholeMonthDiff, 'months'),
                anchor2,
                adjust;

            if (b - anchor < 0) {
                anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
                // linear across the month
                adjust = (b - anchor) / (anchor - anchor2);
            } else {
                anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
                // linear across the month
                adjust = (b - anchor) / (anchor2 - anchor);
            }

            //check for negative zero, return zero if negative zero
            return -(wholeMonthDiff + adjust) || 0;
        }

        hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
        hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

        function toString() {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        }

        function toISOString(keepOffset) {
            if (!this.isValid()) {
                return null;
            }
            var utc = keepOffset !== true,
                m = utc ? this.clone().utc() : this;
            if (m.year() < 0 || m.year() > 9999) {
                return formatMoment(
                    m,
                    utc
                        ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                        : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
                );
            }
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                if (utc) {
                    return this.toDate().toISOString();
                } else {
                    return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                        .toISOString()
                        .replace('Z', formatMoment(m, 'Z'));
                }
            }
            return formatMoment(
                m,
                utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }

        /**
         * Return a human readable representation of a moment that can
         * also be evaluated to get a new moment which is the same
         *
         * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
         */
        function inspect() {
            if (!this.isValid()) {
                return 'moment.invalid(/* ' + this._i + ' */)';
            }
            var func = 'moment',
                zone = '',
                prefix,
                year,
                datetime,
                suffix;
            if (!this.isLocal()) {
                func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
                zone = 'Z';
            }
            prefix = '[' + func + '("]';
            year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
            datetime = '-MM-DD[T]HH:mm:ss.SSS';
            suffix = zone + '[")]';

            return this.format(prefix + year + datetime + suffix);
        }

        function format(inputString) {
            if (!inputString) {
                inputString = this.isUtc()
                    ? hooks.defaultFormatUtc
                    : hooks.defaultFormat;
            }
            var output = formatMoment(this, inputString);
            return this.localeData().postformat(output);
        }

        function from(time, withoutSuffix) {
            if (
                this.isValid() &&
                ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
            ) {
                return createDuration({ to: this, from: time })
                    .locale(this.locale())
                    .humanize(!withoutSuffix);
            } else {
                return this.localeData().invalidDate();
            }
        }

        function fromNow(withoutSuffix) {
            return this.from(createLocal(), withoutSuffix);
        }

        function to(time, withoutSuffix) {
            if (
                this.isValid() &&
                ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
            ) {
                return createDuration({ from: this, to: time })
                    .locale(this.locale())
                    .humanize(!withoutSuffix);
            } else {
                return this.localeData().invalidDate();
            }
        }

        function toNow(withoutSuffix) {
            return this.to(createLocal(), withoutSuffix);
        }

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        function locale(key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = getLocale(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        }

        var lang = deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        );

        function localeData() {
            return this._locale;
        }

        var MS_PER_SECOND = 1000,
            MS_PER_MINUTE = 60 * MS_PER_SECOND,
            MS_PER_HOUR = 60 * MS_PER_MINUTE,
            MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

        // actual modulo - handles negative numbers (for dates before 1970):
        function mod$1(dividend, divisor) {
            return ((dividend % divisor) + divisor) % divisor;
        }

        function localStartOfDate(y, m, d) {
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                return new Date(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
                return new Date(y, m, d).valueOf();
            }
        }

        function utcStartOfDate(y, m, d) {
            // Date.UTC remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
                return Date.UTC(y, m, d);
            }
        }

        function startOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond' || !this.isValid()) {
                return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
                case 'year':
                    time = startOfDate(this.year(), 0, 1);
                    break;
                case 'quarter':
                    time = startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3),
                        1
                    );
                    break;
                case 'month':
                    time = startOfDate(this.year(), this.month(), 1);
                    break;
                case 'week':
                    time = startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday()
                    );
                    break;
                case 'isoWeek':
                    time = startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1)
                    );
                    break;
                case 'day':
                case 'date':
                    time = startOfDate(this.year(), this.month(), this.date());
                    break;
                case 'hour':
                    time = this._d.valueOf();
                    time -= mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    );
                    break;
                case 'minute':
                    time = this._d.valueOf();
                    time -= mod$1(time, MS_PER_MINUTE);
                    break;
                case 'second':
                    time = this._d.valueOf();
                    time -= mod$1(time, MS_PER_SECOND);
                    break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
        }

        function endOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond' || !this.isValid()) {
                return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
                case 'year':
                    time = startOfDate(this.year() + 1, 0, 1) - 1;
                    break;
                case 'quarter':
                    time =
                        startOfDate(
                            this.year(),
                            this.month() - (this.month() % 3) + 3,
                            1
                        ) - 1;
                    break;
                case 'month':
                    time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                    break;
                case 'week':
                    time =
                        startOfDate(
                            this.year(),
                            this.month(),
                            this.date() - this.weekday() + 7
                        ) - 1;
                    break;
                case 'isoWeek':
                    time =
                        startOfDate(
                            this.year(),
                            this.month(),
                            this.date() - (this.isoWeekday() - 1) + 7
                        ) - 1;
                    break;
                case 'day':
                case 'date':
                    time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                    break;
                case 'hour':
                    time = this._d.valueOf();
                    time +=
                        MS_PER_HOUR -
                        mod$1(
                            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                            MS_PER_HOUR
                        ) -
                        1;
                    break;
                case 'minute':
                    time = this._d.valueOf();
                    time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                    break;
                case 'second':
                    time = this._d.valueOf();
                    time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                    break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
        }

        function valueOf() {
            return this._d.valueOf() - (this._offset || 0) * 60000;
        }

        function unix() {
            return Math.floor(this.valueOf() / 1000);
        }

        function toDate() {
            return new Date(this.valueOf());
        }

        function toArray() {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hour(),
                m.minute(),
                m.second(),
                m.millisecond(),
            ];
        }

        function toObject() {
            var m = this;
            return {
                years: m.year(),
                months: m.month(),
                date: m.date(),
                hours: m.hours(),
                minutes: m.minutes(),
                seconds: m.seconds(),
                milliseconds: m.milliseconds(),
            };
        }

        function toJSON() {
            // new Date(NaN).toJSON() === null
            return this.isValid() ? this.toISOString() : null;
        }

        function isValid$2() {
            return isValid(this);
        }

        function parsingFlags() {
            return extend({}, getParsingFlags(this));
        }

        function invalidAt() {
            return getParsingFlags(this).overflow;
        }

        function creationData() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict,
            };
        }

        addFormatToken('N', 0, 0, 'eraAbbr');
        addFormatToken('NN', 0, 0, 'eraAbbr');
        addFormatToken('NNN', 0, 0, 'eraAbbr');
        addFormatToken('NNNN', 0, 0, 'eraName');
        addFormatToken('NNNNN', 0, 0, 'eraNarrow');

        addFormatToken('y', ['y', 1], 'yo', 'eraYear');
        addFormatToken('y', ['yy', 2], 0, 'eraYear');
        addFormatToken('y', ['yyy', 3], 0, 'eraYear');
        addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

        addRegexToken('N', matchEraAbbr);
        addRegexToken('NN', matchEraAbbr);
        addRegexToken('NNN', matchEraAbbr);
        addRegexToken('NNNN', matchEraName);
        addRegexToken('NNNNN', matchEraNarrow);

        addParseToken(
            ['N', 'NN', 'NNN', 'NNNN', 'NNNNN'],
            function (input, array, config, token) {
                var era = config._locale.erasParse(input, token, config._strict);
                if (era) {
                    getParsingFlags(config).era = era;
                } else {
                    getParsingFlags(config).invalidEra = input;
                }
            }
        );

        addRegexToken('y', matchUnsigned);
        addRegexToken('yy', matchUnsigned);
        addRegexToken('yyy', matchUnsigned);
        addRegexToken('yyyy', matchUnsigned);
        addRegexToken('yo', matchEraYearOrdinal);

        addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
        addParseToken(['yo'], function (input, array, config, token) {
            var match;
            if (config._locale._eraYearOrdinalRegex) {
                match = input.match(config._locale._eraYearOrdinalRegex);
            }

            if (config._locale.eraYearOrdinalParse) {
                array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
            } else {
                array[YEAR] = parseInt(input, 10);
            }
        });

        function localeEras(m, format) {
            var i,
                l,
                date,
                eras = this._eras || getLocale('en')._eras;
            for (i = 0, l = eras.length; i < l; ++i) {
                switch (typeof eras[i].since) {
                    case 'string':
                        // truncate time
                        date = hooks(eras[i].since).startOf('day');
                        eras[i].since = date.valueOf();
                        break;
                }

                switch (typeof eras[i].until) {
                    case 'undefined':
                        eras[i].until = +Infinity;
                        break;
                    case 'string':
                        // truncate time
                        date = hooks(eras[i].until).startOf('day').valueOf();
                        eras[i].until = date.valueOf();
                        break;
                }
            }
            return eras;
        }

        function localeErasParse(eraName, format, strict) {
            var i,
                l,
                eras = this.eras(),
                name,
                abbr,
                narrow;
            eraName = eraName.toUpperCase();

            for (i = 0, l = eras.length; i < l; ++i) {
                name = eras[i].name.toUpperCase();
                abbr = eras[i].abbr.toUpperCase();
                narrow = eras[i].narrow.toUpperCase();

                if (strict) {
                    switch (format) {
                        case 'N':
                        case 'NN':
                        case 'NNN':
                            if (abbr === eraName) {
                                return eras[i];
                            }
                            break;

                        case 'NNNN':
                            if (name === eraName) {
                                return eras[i];
                            }
                            break;

                        case 'NNNNN':
                            if (narrow === eraName) {
                                return eras[i];
                            }
                            break;
                    }
                } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                    return eras[i];
                }
            }
        }

        function localeErasConvertYear(era, year) {
            var dir = era.since <= era.until ? +1 : -1;
            if (year === undefined) {
                return hooks(era.since).year();
            } else {
                return hooks(era.since).year() + (year - era.offset) * dir;
            }
        }

        function getEraName() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].name;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].name;
                }
            }

            return '';
        }

        function getEraNarrow() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].narrow;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].narrow;
                }
            }

            return '';
        }

        function getEraAbbr() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].abbr;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].abbr;
                }
            }

            return '';
        }

        function getEraYear() {
            var i,
                l,
                dir,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                dir = eras[i].since <= eras[i].until ? +1 : -1;

                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (
                    (eras[i].since <= val && val <= eras[i].until) ||
                    (eras[i].until <= val && val <= eras[i].since)
                ) {
                    return (
                        (this.year() - hooks(eras[i].since).year()) * dir +
                        eras[i].offset
                    );
                }
            }

            return this.year();
        }

        function erasNameRegex(isStrict) {
            if (!hasOwnProp(this, '_erasNameRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasNameRegex : this._erasRegex;
        }

        function erasAbbrRegex(isStrict) {
            if (!hasOwnProp(this, '_erasAbbrRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }

        function erasNarrowRegex(isStrict) {
            if (!hasOwnProp(this, '_erasNarrowRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }

        function matchEraAbbr(isStrict, locale) {
            return locale.erasAbbrRegex(isStrict);
        }

        function matchEraName(isStrict, locale) {
            return locale.erasNameRegex(isStrict);
        }

        function matchEraNarrow(isStrict, locale) {
            return locale.erasNarrowRegex(isStrict);
        }

        function matchEraYearOrdinal(isStrict, locale) {
            return locale._eraYearOrdinalRegex || matchUnsigned;
        }

        function computeErasParse() {
            var abbrPieces = [],
                namePieces = [],
                narrowPieces = [],
                mixedPieces = [],
                i,
                l,
                eras = this.eras();

            for (i = 0, l = eras.length; i < l; ++i) {
                namePieces.push(regexEscape(eras[i].name));
                abbrPieces.push(regexEscape(eras[i].abbr));
                narrowPieces.push(regexEscape(eras[i].narrow));

                mixedPieces.push(regexEscape(eras[i].name));
                mixedPieces.push(regexEscape(eras[i].abbr));
                mixedPieces.push(regexEscape(eras[i].narrow));
            }

            this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
            this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
            this._erasNarrowRegex = new RegExp(
                '^(' + narrowPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        addFormatToken(0, ['gg', 2], 0, function () {
            return this.weekYear() % 100;
        });

        addFormatToken(0, ['GG', 2], 0, function () {
            return this.isoWeekYear() % 100;
        });

        function addWeekYearFormatToken(token, getter) {
            addFormatToken(0, [token, token.length], 0, getter);
        }

        addWeekYearFormatToken('gggg', 'weekYear');
        addWeekYearFormatToken('ggggg', 'weekYear');
        addWeekYearFormatToken('GGGG', 'isoWeekYear');
        addWeekYearFormatToken('GGGGG', 'isoWeekYear');

        // ALIASES

        addUnitAlias('weekYear', 'gg');
        addUnitAlias('isoWeekYear', 'GG');

        // PRIORITY

        addUnitPriority('weekYear', 1);
        addUnitPriority('isoWeekYear', 1);

        // PARSING

        addRegexToken('G', matchSigned);
        addRegexToken('g', matchSigned);
        addRegexToken('GG', match1to2, match2);
        addRegexToken('gg', match1to2, match2);
        addRegexToken('GGGG', match1to4, match4);
        addRegexToken('gggg', match1to4, match4);
        addRegexToken('GGGGG', match1to6, match6);
        addRegexToken('ggggg', match1to6, match6);

        addWeekParseToken(
            ['gggg', 'ggggg', 'GGGG', 'GGGGG'],
            function (input, week, config, token) {
                week[token.substr(0, 2)] = toInt(input);
            }
        );

        addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
            week[token] = hooks.parseTwoDigitYear(input);
        });

        // MOMENTS

        function getSetWeekYear(input) {
            return getSetWeekYearHelper.call(
                this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy
            );
        }

        function getSetISOWeekYear(input) {
            return getSetWeekYearHelper.call(
                this,
                input,
                this.isoWeek(),
                this.isoWeekday(),
                1,
                4
            );
        }

        function getISOWeeksInYear() {
            return weeksInYear(this.year(), 1, 4);
        }

        function getISOWeeksInISOWeekYear() {
            return weeksInYear(this.isoWeekYear(), 1, 4);
        }

        function getWeeksInYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }

        function getWeeksInWeekYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }

        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
            var weeksTarget;
            if (input == null) {
                return weekOfYear(this, dow, doy).year;
            } else {
                weeksTarget = weeksInYear(input, dow, doy);
                if (week > weeksTarget) {
                    week = weeksTarget;
                }
                return setWeekAll.call(this, input, week, weekday, dow, doy);
            }
        }

        function setWeekAll(weekYear, week, weekday, dow, doy) {
            var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
                date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

            this.year(date.getUTCFullYear());
            this.month(date.getUTCMonth());
            this.date(date.getUTCDate());
            return this;
        }

        // FORMATTING

        addFormatToken('Q', 0, 'Qo', 'quarter');

        // ALIASES

        addUnitAlias('quarter', 'Q');

        // PRIORITY

        addUnitPriority('quarter', 7);

        // PARSING

        addRegexToken('Q', match1);
        addParseToken('Q', function (input, array) {
            array[MONTH] = (toInt(input) - 1) * 3;
        });

        // MOMENTS

        function getSetQuarter(input) {
            return input == null
                ? Math.ceil((this.month() + 1) / 3)
                : this.month((input - 1) * 3 + (this.month() % 3));
        }

        // FORMATTING

        addFormatToken('D', ['DD', 2], 'Do', 'date');

        // ALIASES

        addUnitAlias('date', 'D');

        // PRIORITY
        addUnitPriority('date', 9);

        // PARSING

        addRegexToken('D', match1to2);
        addRegexToken('DD', match1to2, match2);
        addRegexToken('Do', function (isStrict, locale) {
            // TODO: Remove "ordinalParse" fallback in next major release.
            return isStrict
                ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
                : locale._dayOfMonthOrdinalParseLenient;
        });

        addParseToken(['D', 'DD'], DATE);
        addParseToken('Do', function (input, array) {
            array[DATE] = toInt(input.match(match1to2)[0]);
        });

        // MOMENTS

        var getSetDayOfMonth = makeGetSet('Date', true);

        // FORMATTING

        addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

        // ALIASES

        addUnitAlias('dayOfYear', 'DDD');

        // PRIORITY
        addUnitPriority('dayOfYear', 4);

        // PARSING

        addRegexToken('DDD', match1to3);
        addRegexToken('DDDD', match3);
        addParseToken(['DDD', 'DDDD'], function (input, array, config) {
            config._dayOfYear = toInt(input);
        });

        // HELPERS

        // MOMENTS

        function getSetDayOfYear(input) {
            var dayOfYear =
                Math.round(
                    (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
                ) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
        }

        // FORMATTING

        addFormatToken('m', ['mm', 2], 0, 'minute');

        // ALIASES

        addUnitAlias('minute', 'm');

        // PRIORITY

        addUnitPriority('minute', 14);

        // PARSING

        addRegexToken('m', match1to2);
        addRegexToken('mm', match1to2, match2);
        addParseToken(['m', 'mm'], MINUTE);

        // MOMENTS

        var getSetMinute = makeGetSet('Minutes', false);

        // FORMATTING

        addFormatToken('s', ['ss', 2], 0, 'second');

        // ALIASES

        addUnitAlias('second', 's');

        // PRIORITY

        addUnitPriority('second', 15);

        // PARSING

        addRegexToken('s', match1to2);
        addRegexToken('ss', match1to2, match2);
        addParseToken(['s', 'ss'], SECOND);

        // MOMENTS

        var getSetSecond = makeGetSet('Seconds', false);

        // FORMATTING

        addFormatToken('S', 0, 0, function () {
            return ~~(this.millisecond() / 100);
        });

        addFormatToken(0, ['SS', 2], 0, function () {
            return ~~(this.millisecond() / 10);
        });

        addFormatToken(0, ['SSS', 3], 0, 'millisecond');
        addFormatToken(0, ['SSSS', 4], 0, function () {
            return this.millisecond() * 10;
        });
        addFormatToken(0, ['SSSSS', 5], 0, function () {
            return this.millisecond() * 100;
        });
        addFormatToken(0, ['SSSSSS', 6], 0, function () {
            return this.millisecond() * 1000;
        });
        addFormatToken(0, ['SSSSSSS', 7], 0, function () {
            return this.millisecond() * 10000;
        });
        addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
            return this.millisecond() * 100000;
        });
        addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
            return this.millisecond() * 1000000;
        });

        // ALIASES

        addUnitAlias('millisecond', 'ms');

        // PRIORITY

        addUnitPriority('millisecond', 16);

        // PARSING

        addRegexToken('S', match1to3, match1);
        addRegexToken('SS', match1to3, match2);
        addRegexToken('SSS', match1to3, match3);

        var token, getSetMillisecond;
        for (token = 'SSSS'; token.length <= 9; token += 'S') {
            addRegexToken(token, matchUnsigned);
        }

        function parseMs(input, array) {
            array[MILLISECOND] = toInt(('0.' + input) * 1000);
        }

        for (token = 'S'; token.length <= 9; token += 'S') {
            addParseToken(token, parseMs);
        }

        getSetMillisecond = makeGetSet('Milliseconds', false);

        // FORMATTING

        addFormatToken('z', 0, 0, 'zoneAbbr');
        addFormatToken('zz', 0, 0, 'zoneName');

        // MOMENTS

        function getZoneAbbr() {
            return this._isUTC ? 'UTC' : '';
        }

        function getZoneName() {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        }

        var proto = Moment.prototype;

        proto.add = add;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== 'undefined' && Symbol.for != null) {
            proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
                return 'Moment<' + this.format() + '>';
            };
        }
        proto.toJSON = toJSON;
        proto.toString = toString;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate(
            'dates accessor is deprecated. Use date instead.',
            getSetDayOfMonth
        );
        proto.months = deprecate(
            'months accessor is deprecated. Use month instead',
            getSetMonth
        );
        proto.years = deprecate(
            'years accessor is deprecated. Use year instead',
            getSetYear
        );
        proto.zone = deprecate(
            'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
            getSetZone
        );
        proto.isDSTShifted = deprecate(
            'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
            isDaylightSavingTimeShifted
        );

        function createUnix(input) {
            return createLocal(input * 1000);
        }

        function createInZone() {
            return createLocal.apply(null, arguments).parseZone();
        }

        function preParsePostFormat(string) {
            return string;
        }

        var proto$1 = Locale.prototype;

        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;

        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;

        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;

        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;

        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;

        function get$1(format, index, field, setter) {
            var locale = getLocale(),
                utc = createUTC().set(setter, index);
            return locale[field](utc, format);
        }

        function listMonthsImpl(format, index, field) {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';

            if (index != null) {
                return get$1(format, index, field, 'month');
            }

            var i,
                out = [];
            for (i = 0; i < 12; i++) {
                out[i] = get$1(format, i, field, 'month');
            }
            return out;
        }

        // ()
        // (5)
        // (fmt, 5)
        // (fmt)
        // (true)
        // (true, 5)
        // (true, fmt, 5)
        // (true, fmt)
        function listWeekdaysImpl(localeSorted, format, index, field) {
            if (typeof localeSorted === 'boolean') {
                if (isNumber(format)) {
                    index = format;
                    format = undefined;
                }

                format = format || '';
            } else {
                format = localeSorted;
                index = format;
                localeSorted = false;

                if (isNumber(format)) {
                    index = format;
                    format = undefined;
                }

                format = format || '';
            }

            var locale = getLocale(),
                shift = localeSorted ? locale._week.dow : 0,
                i,
                out = [];

            if (index != null) {
                return get$1(format, (index + shift) % 7, field, 'day');
            }

            for (i = 0; i < 7; i++) {
                out[i] = get$1(format, (i + shift) % 7, field, 'day');
            }
            return out;
        }

        function listMonths(format, index) {
            return listMonthsImpl(format, index, 'months');
        }

        function listMonthsShort(format, index) {
            return listMonthsImpl(format, index, 'monthsShort');
        }

        function listWeekdays(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
        }

        function listWeekdaysShort(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
        }

        function listWeekdaysMin(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
        }

        getSetGlobalLocale('en', {
            eras: [
                {
                    since: '0001-01-01',
                    until: +Infinity,
                    offset: 1,
                    name: 'Anno Domini',
                    narrow: 'AD',
                    abbr: 'AD',
                },
                {
                    since: '0000-12-31',
                    until: -Infinity,
                    offset: 1,
                    name: 'Before Christ',
                    narrow: 'BC',
                    abbr: 'BC',
                },
            ],
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (number) {
                var b = number % 10,
                    output =
                        toInt((number % 100) / 10) === 1
                            ? 'th'
                            : b === 1
                            ? 'st'
                            : b === 2
                            ? 'nd'
                            : b === 3
                            ? 'rd'
                            : 'th';
                return number + output;
            },
        });

        // Side effect imports

        hooks.lang = deprecate(
            'moment.lang is deprecated. Use moment.locale instead.',
            getSetGlobalLocale
        );
        hooks.langData = deprecate(
            'moment.langData is deprecated. Use moment.localeData instead.',
            getLocale
        );

        var mathAbs = Math.abs;

        function abs() {
            var data = this._data;

            this._milliseconds = mathAbs(this._milliseconds);
            this._days = mathAbs(this._days);
            this._months = mathAbs(this._months);

            data.milliseconds = mathAbs(data.milliseconds);
            data.seconds = mathAbs(data.seconds);
            data.minutes = mathAbs(data.minutes);
            data.hours = mathAbs(data.hours);
            data.months = mathAbs(data.months);
            data.years = mathAbs(data.years);

            return this;
        }

        function addSubtract$1(duration, input, value, direction) {
            var other = createDuration(input, value);

            duration._milliseconds += direction * other._milliseconds;
            duration._days += direction * other._days;
            duration._months += direction * other._months;

            return duration._bubble();
        }

        // supports only 2.0-style add(1, 's') or add(duration)
        function add$1(input, value) {
            return addSubtract$1(this, input, value, 1);
        }

        // supports only 2.0-style subtract(1, 's') or subtract(duration)
        function subtract$1(input, value) {
            return addSubtract$1(this, input, value, -1);
        }

        function absCeil(number) {
            if (number < 0) {
                return Math.floor(number);
            } else {
                return Math.ceil(number);
            }
        }

        function bubble() {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds,
                minutes,
                hours,
                years,
                monthsFromDays;

            // if we have a mix of positive and negative values, bubble down first
            // check: https://github.com/moment/moment/issues/2166
            if (
                !(
                    (milliseconds >= 0 && days >= 0 && months >= 0) ||
                    (milliseconds <= 0 && days <= 0 && months <= 0)
                )
            ) {
                milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
                days = 0;
                months = 0;
            }

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absFloor(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absFloor(seconds / 60);
            data.minutes = minutes % 60;

            hours = absFloor(minutes / 60);
            data.hours = hours % 24;

            days += absFloor(hours / 24);

            // convert days to months
            monthsFromDays = absFloor(daysToMonths(days));
            months += monthsFromDays;
            days -= absCeil(monthsToDays(monthsFromDays));

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;

            return this;
        }

        function daysToMonths(days) {
            // 400 years have 146097 days (taking into account leap year rules)
            // 400 years have 12 months === 4800
            return (days * 4800) / 146097;
        }

        function monthsToDays(months) {
            // the reverse of daysToMonths
            return (months * 146097) / 4800;
        }

        function as(units) {
            if (!this.isValid()) {
                return NaN;
            }
            var days,
                months,
                milliseconds = this._milliseconds;

            units = normalizeUnits(units);

            if (units === 'month' || units === 'quarter' || units === 'year') {
                days = this._days + milliseconds / 864e5;
                months = this._months + daysToMonths(days);
                switch (units) {
                    case 'month':
                        return months;
                    case 'quarter':
                        return months / 3;
                    case 'year':
                        return months / 12;
                }
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(monthsToDays(this._months));
                switch (units) {
                    case 'week':
                        return days / 7 + milliseconds / 6048e5;
                    case 'day':
                        return days + milliseconds / 864e5;
                    case 'hour':
                        return days * 24 + milliseconds / 36e5;
                    case 'minute':
                        return days * 1440 + milliseconds / 6e4;
                    case 'second':
                        return days * 86400 + milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond':
                        return Math.floor(days * 864e5) + milliseconds;
                    default:
                        throw new Error('Unknown unit ' + units);
                }
            }
        }

        // TODO: Use this.as('ms')?
        function valueOf$1() {
            if (!this.isValid()) {
                return NaN;
            }
            return (
                this._milliseconds +
                this._days * 864e5 +
                (this._months % 12) * 2592e6 +
                toInt(this._months / 12) * 31536e6
            );
        }

        function makeAs(alias) {
            return function () {
                return this.as(alias);
            };
        }

        var asMilliseconds = makeAs('ms'),
            asSeconds = makeAs('s'),
            asMinutes = makeAs('m'),
            asHours = makeAs('h'),
            asDays = makeAs('d'),
            asWeeks = makeAs('w'),
            asMonths = makeAs('M'),
            asQuarters = makeAs('Q'),
            asYears = makeAs('y');

        function clone$1() {
            return createDuration(this);
        }

        function get$2(units) {
            units = normalizeUnits(units);
            return this.isValid() ? this[units + 's']() : NaN;
        }

        function makeGetter(name) {
            return function () {
                return this.isValid() ? this._data[name] : NaN;
            };
        }

        var milliseconds = makeGetter('milliseconds'),
            seconds = makeGetter('seconds'),
            minutes = makeGetter('minutes'),
            hours = makeGetter('hours'),
            days = makeGetter('days'),
            months = makeGetter('months'),
            years = makeGetter('years');

        function weeks() {
            return absFloor(this.days() / 7);
        }

        var round = Math.round,
            thresholds = {
                ss: 44, // a few seconds to seconds
                s: 45, // seconds to minute
                m: 45, // minutes to hour
                h: 22, // hours to day
                d: 26, // days to month/week
                w: null, // weeks to month
                M: 11, // months to year
            };

        // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
            return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }

        function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
            var duration = createDuration(posNegDuration).abs(),
                seconds = round(duration.as('s')),
                minutes = round(duration.as('m')),
                hours = round(duration.as('h')),
                days = round(duration.as('d')),
                months = round(duration.as('M')),
                weeks = round(duration.as('w')),
                years = round(duration.as('y')),
                a =
                    (seconds <= thresholds.ss && ['s', seconds]) ||
                    (seconds < thresholds.s && ['ss', seconds]) ||
                    (minutes <= 1 && ['m']) ||
                    (minutes < thresholds.m && ['mm', minutes]) ||
                    (hours <= 1 && ['h']) ||
                    (hours < thresholds.h && ['hh', hours]) ||
                    (days <= 1 && ['d']) ||
                    (days < thresholds.d && ['dd', days]);

            if (thresholds.w != null) {
                a =
                    a ||
                    (weeks <= 1 && ['w']) ||
                    (weeks < thresholds.w && ['ww', weeks]);
            }
            a = a ||
                (months <= 1 && ['M']) ||
                (months < thresholds.M && ['MM', months]) ||
                (years <= 1 && ['y']) || ['yy', years];

            a[2] = withoutSuffix;
            a[3] = +posNegDuration > 0;
            a[4] = locale;
            return substituteTimeAgo.apply(null, a);
        }

        // This function allows you to set the rounding function for relative time strings
        function getSetRelativeTimeRounding(roundingFunction) {
            if (roundingFunction === undefined) {
                return round;
            }
            if (typeof roundingFunction === 'function') {
                round = roundingFunction;
                return true;
            }
            return false;
        }

        // This function allows you to set a threshold for relative time strings
        function getSetRelativeTimeThreshold(threshold, limit) {
            if (thresholds[threshold] === undefined) {
                return false;
            }
            if (limit === undefined) {
                return thresholds[threshold];
            }
            thresholds[threshold] = limit;
            if (threshold === 's') {
                thresholds.ss = limit - 1;
            }
            return true;
        }

        function humanize(argWithSuffix, argThresholds) {
            if (!this.isValid()) {
                return this.localeData().invalidDate();
            }

            var withSuffix = false,
                th = thresholds,
                locale,
                output;

            if (typeof argWithSuffix === 'object') {
                argThresholds = argWithSuffix;
                argWithSuffix = false;
            }
            if (typeof argWithSuffix === 'boolean') {
                withSuffix = argWithSuffix;
            }
            if (typeof argThresholds === 'object') {
                th = Object.assign({}, thresholds, argThresholds);
                if (argThresholds.s != null && argThresholds.ss == null) {
                    th.ss = argThresholds.s - 1;
                }
            }

            locale = this.localeData();
            output = relativeTime$1(this, !withSuffix, th, locale);

            if (withSuffix) {
                output = locale.pastFuture(+this, output);
            }

            return locale.postformat(output);
        }

        var abs$1 = Math.abs;

        function sign(x) {
            return (x > 0) - (x < 0) || +x;
        }

        function toISOString$1() {
            // for ISO strings we do not use the normal bubbling rules:
            //  * milliseconds bubble up until they become hours
            //  * days do not bubble at all
            //  * months bubble up until they become years
            // This is because there is no context-free conversion between hours and days
            // (think of clock changes)
            // and also not between days and months (28-31 days per month)
            if (!this.isValid()) {
                return this.localeData().invalidDate();
            }

            var seconds = abs$1(this._milliseconds) / 1000,
                days = abs$1(this._days),
                months = abs$1(this._months),
                minutes,
                hours,
                years,
                s,
                total = this.asSeconds(),
                totalSign,
                ymSign,
                daysSign,
                hmsSign;

            if (!total) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            // 3600 seconds -> 60 minutes -> 1 hour
            minutes = absFloor(seconds / 60);
            hours = absFloor(minutes / 60);
            seconds %= 60;
            minutes %= 60;

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

            totalSign = total < 0 ? '-' : '';
            ymSign = sign(this._months) !== sign(total) ? '-' : '';
            daysSign = sign(this._days) !== sign(total) ? '-' : '';
            hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

            return (
                totalSign +
                'P' +
                (years ? ymSign + years + 'Y' : '') +
                (months ? ymSign + months + 'M' : '') +
                (days ? daysSign + days + 'D' : '') +
                (hours || minutes || seconds ? 'T' : '') +
                (hours ? hmsSign + hours + 'H' : '') +
                (minutes ? hmsSign + minutes + 'M' : '') +
                (seconds ? hmsSign + s + 'S' : '')
            );
        }

        var proto$2 = Duration.prototype;

        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;

        proto$2.toIsoString = deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
            toISOString$1
        );
        proto$2.lang = lang;

        // FORMATTING

        addFormatToken('X', 0, 0, 'unix');
        addFormatToken('x', 0, 0, 'valueOf');

        // PARSING

        addRegexToken('x', matchSigned);
        addRegexToken('X', matchTimestamp);
        addParseToken('X', function (input, array, config) {
            config._d = new Date(parseFloat(input) * 1000);
        });
        addParseToken('x', function (input, array, config) {
            config._d = new Date(toInt(input));
        });

        //! moment.js

        hooks.version = '2.29.2';

        setHookCallback(createLocal);

        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;

        // currently HTML5 input type only supports 24-hour formats
        hooks.HTML5_FMT = {
            DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
            DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
            DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
            DATE: 'YYYY-MM-DD', // <input type="date" />
            TIME: 'HH:mm', // <input type="time" />
            TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
            TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
            WEEK: 'GGGG-[W]WW', // <input type="week" />
            MONTH: 'YYYY-MM', // <input type="month" />
        };

        return hooks;

    })));
    });

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        const z_index = (parseInt(computed_style.zIndex) || 0) - 1;
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', `display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ` +
            `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = `data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>`;
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function createEntityStore() {
        const { subscribe, set, update } = writable({ ids: [], entities: {} });
        return {
            set,
            _update: update,
            subscribe,
            add: (item) => update(({ ids, entities }) => ({
                ids: [...ids, item.model.id],
                entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
            })),
            delete: (id) => update(state => {
                const _a = state.entities, _b = id; _a[_b]; const entities = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                return {
                    ids: state.ids.filter(i => i !== id),
                    entities
                };
            }),
            deleteAll: (ids) => update(state => {
                const entities = Object.assign({}, state.entities);
                const idState = {};
                ids.forEach(id => {
                    delete entities[id];
                    idState[id] = true;
                });
                return {
                    ids: state.ids.filter(i => !idState[i]),
                    entities
                };
            }),
            update: (item) => update(({ ids, entities }) => ({
                ids,
                entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
            })),
            upsert: (item) => update(({ ids, entities }) => {
                const hasIndex = ids.indexOf(item.model.id) !== -1;
                return {
                    ids: hasIndex ? ids : [...ids, item.model.id],
                    entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
                };
            }),
            upsertAll: (items) => update(state => {
                const entities = Object.assign({}, state.entities);
                const ids = [...state.ids];
                items.forEach(item => {
                    if (!entities[item.model.id]) {
                        ids.push(item.model.id);
                    }
                    entities[item.model.id] = item;
                });
                return {
                    ids,
                    entities
                };
            }),
            addAll: (items) => {
                const ids = [];
                const entities = {};
                for (const entity of items) {
                    ids.push(entity.model.id);
                    entities[entity.model.id] = entity;
                }
                set({ ids, entities });
            },
            refresh: () => update(store => (Object.assign({}, store)))
        };
    }
    const taskStore = createEntityStore();
    const rowStore = createEntityStore();
    const timeRangeStore = createEntityStore();
    const allTasks = all(taskStore);
    const allRows = all(rowStore);
    const allTimeRanges = all(timeRangeStore);
    const rowTaskCache = derived(allTasks, $allTasks => {
        return $allTasks.reduce((cache, task) => {
            if (!cache[task.model.resourceId])
                cache[task.model.resourceId] = [];
            cache[task.model.resourceId].push(task.model.id);
            return cache;
        }, {});
    });
    function all(store) {
        return derived(store, ({ ids, entities }) => ids.map(id => entities[id]));
    }

    function isLeftClick(event) {
        return event.which === 1;
    }
    /**
     * Gets mouse position within an element
     * @param node
     * @param event
     */
    function getRelativePos(node, event) {
        const rect = node.getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const y = event.clientY - rect.top; //y position within the element.
        return {
            x: x,
            y: y
        };
    }
    /**
     * Adds an event listener that triggers once.
     * @param target
     * @param type
     * @param listener
     * @param addOptions
     * @param removeOptions
     */
    function addEventListenerOnce(target, type, listener, addOptions, removeOptions) {
        target.addEventListener(type, function fn(event) {
            target.removeEventListener(type, fn, removeOptions);
            listener.apply(this, arguments, addOptions);
        });
    }
    /**
     * Sets the cursor on an element. Globally by default.
     * @param cursor
     * @param node
     */
    function setCursor(cursor, node = document.body) {
        node.style.cursor = cursor;
    }

    const MIN_DRAG_X = 2;
    const MIN_DRAG_Y = 2;

    /**
     * Applies dragging interaction to gantt elements
     */
    class Draggable {
        constructor(node, settings) {
            this.dragging = false;
            this.resizing = false;
            this.resizeTriggered = false;
            this.onmousedown = (event) => {
                if (!isLeftClick(event)) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault();
                const canDrag = this.dragAllowed;
                const canResize = this.resizeAllowed;
                if (canDrag || canResize) {
                    const x = this.settings.getX(event);
                    const y = this.settings.getY(event);
                    const width = this.settings.getWidth();
                    this.initialX = event.clientX;
                    this.initialY = event.clientY;
                    this.mouseStartPosX = getRelativePos(this.settings.container, event).x - x;
                    this.mouseStartPosY = getRelativePos(this.settings.container, event).y - y;
                    this.mouseStartRight = x + width;
                    if (canResize && this.mouseStartPosX < this.settings.resizeHandleWidth) {
                        this.direction = 'left';
                        this.resizing = true;
                    }
                    if (canResize && this.mouseStartPosX > width - this.settings.resizeHandleWidth) {
                        this.direction = 'right';
                        this.resizing = true;
                    }
                    if (canDrag && !this.resizing) {
                        this.dragging = true;
                    }
                    if ((this.dragging || this.resizing) && this.settings.onDown) {
                        this.settings.onDown({
                            mouseEvent: event,
                            x,
                            width,
                            y,
                            resizing: this.resizing,
                            dragging: this.dragging
                        });
                    }
                    window.addEventListener('mousemove', this.onmousemove, false);
                    addEventListenerOnce(window, 'mouseup', this.onmouseup);
                }
            };
            this.onmousemove = (event) => {
                if (!this.resizeTriggered) {
                    if (Math.abs(event.clientX - this.initialX) > MIN_DRAG_X || Math.abs(event.clientY - this.initialY) > MIN_DRAG_Y) {
                        this.resizeTriggered = true;
                    }
                    else {
                        return;
                    }
                }
                event.preventDefault();
                if (this.resizing) {
                    const mousePos = getRelativePos(this.settings.container, event);
                    const x = this.settings.getX(event);
                    const width = this.settings.getWidth();
                    let resultX;
                    let resultWidth;
                    if (this.direction === 'left') { //resize ulijevo
                        if (mousePos.x > x + width) {
                            this.direction = 'right';
                            resultX = this.mouseStartRight;
                            resultWidth = this.mouseStartRight - mousePos.x;
                            this.mouseStartRight = this.mouseStartRight + width;
                        }
                        else {
                            resultX = mousePos.x;
                            resultWidth = this.mouseStartRight - mousePos.x;
                        }
                    }
                    else if (this.direction === 'right') { //resize desno
                        if (mousePos.x <= x) {
                            this.direction = 'left';
                            resultX = mousePos.x;
                            resultWidth = x - mousePos.x;
                            this.mouseStartRight = x;
                        }
                        else {
                            resultX = x;
                            resultWidth = mousePos.x - x;
                        }
                    }
                    this.settings.onResize && this.settings.onResize({
                        mouseEvent: event,
                        x: resultX,
                        width: resultWidth
                    });
                }
                // mouseup
                if (this.dragging && this.settings.onDrag) {
                    const mousePos = getRelativePos(this.settings.container, event);
                    this.settings.onDrag({
                        mouseEvent: event,
                        x: mousePos.x - this.mouseStartPosX,
                        y: mousePos.y - this.mouseStartPosY
                    });
                }
            };
            this.onmouseup = (event) => {
                const x = this.settings.getX(event);
                const y = this.settings.getY(event);
                const width = this.settings.getWidth();
                this.settings.onMouseUp && this.settings.onMouseUp();
                if (this.resizeTriggered && this.settings.onDrop) {
                    this.settings.onDrop({
                        mouseEvent: event,
                        x,
                        y,
                        width,
                        dragging: this.dragging,
                        resizing: this.resizing
                    });
                }
                this.dragging = false;
                this.resizing = false;
                this.direction = null;
                this.resizeTriggered = false;
                window.removeEventListener('mousemove', this.onmousemove, false);
            };
            this.settings = settings;
            this.node = node;
            node.addEventListener('mousedown', this.onmousedown, false);
        }
        get dragAllowed() {
            if (typeof (this.settings.dragAllowed) === 'function') {
                return this.settings.dragAllowed();
            }
            else {
                return this.settings.dragAllowed;
            }
        }
        get resizeAllowed() {
            if (typeof (this.settings.resizeAllowed) === 'function') {
                return this.settings.resizeAllowed();
            }
            else {
                return this.settings.resizeAllowed;
            }
        }
        destroy() {
            this.node.removeEventListener('mousedown', this.onmousedown, false);
            this.node.removeEventListener('mousemove', this.onmousemove, false);
            this.node.removeEventListener('mouseup', this.onmouseup, false);
        }
    }

    class DragDropManager {
        constructor(rowStore) {
            this.handlerMap = {};
            this.register('row', (event) => {
                let elements = document.elementsFromPoint(event.clientX, event.clientY);
                let rowElement = elements.find((element) => !!element.getAttribute('data-row-id'));
                if (rowElement !== undefined) {
                    const rowId = parseInt(rowElement.getAttribute('data-row-id'));
                    const { entities } = get_store_value(rowStore);
                    const targetRow = entities[rowId];
                    if (targetRow.model.enableDragging) {
                        return targetRow;
                    }
                }
                return null;
            });
        }
        register(target, handler) {
            this.handlerMap[target] = handler;
        }
        getTarget(target, event) {
            //const rowCenterX = this.root.refs.mainContainer.getBoundingClientRect().left + this.root.refs.mainContainer.getBoundingClientRect().width / 2;
            var handler = this.handlerMap[target];
            if (handler) {
                return handler(event);
            }
        }
    }

    class TaskFactory {
        constructor(columnService) {
            this.columnService = columnService;
        }
        createTask(model) {
            // id of task, every task needs to have a unique one
            //task.id = task.id || undefined;
            // completion %, indicated on task
            model.amountDone = model.amountDone || 0;
            // css classes
            model.classes = model.classes || '';
            // date task starts on
            model.from = model.from || null;
            // date task ends on
            model.to = model.to || null;
            // label of task
            model.label = model.label || undefined;
            // html content of task, will override label
            model.html = model.html || undefined;
            // show button bar
            model.showButton = model.showButton || false;
            // button classes, useful for fontawesome icons
            model.buttonClasses = model.buttonClasses || '';
            // html content of button
            model.buttonHtml = model.buttonHtml || '';
            // enable dragging of task
            model.enableDragging = model.enableDragging === undefined ? true : model.enableDragging;
            const left = this.columnService.getPositionByDate(model.from) | 0;
            const right = this.columnService.getPositionByDate(model.to) | 0;
            return {
                model,
                left: left,
                width: right - left,
                height: this.getHeight(model),
                top: this.getPosY(model),
                reflections: []
            };
        }
        createTasks(tasks) {
            return tasks.map(task => this.createTask(task));
        }
        row(resourceId) {
            return this.rowEntities[resourceId];
        }
        getHeight(model) {
            return this.row(model.resourceId).height - 2 * this.rowPadding;
        }
        getPosY(model) {
            return this.row(model.resourceId).y + this.rowPadding;
        }
    }
    function reflectTask(task, row, options) {
        const reflectedId = `reflected-task-${task.model.id}-${row.model.id}`;
        const model = Object.assign(Object.assign({}, task.model), { resourceId: row.model.id, id: reflectedId, enableDragging: false });
        return Object.assign(Object.assign({}, task), { model, top: row.y + options.rowPadding, reflected: true, reflectedOnParent: false, reflectedOnChild: true, originalId: task.model.id });
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = ".sg-label-bottom.svelte-6qjqhr{position:absolute;top:calc(100% + 10px);color:#888}.debug.svelte-6qjqhr{position:absolute;top:-10px;right:0;font-size:8px;color:black}.sg-task.svelte-6qjqhr{position:absolute;white-space:nowrap;transition:background-color 0.2s, opacity 0.2s;pointer-events:all}.sg-task{background:rgb(116, 191, 255)}.sg-task-background.svelte-6qjqhr{position:absolute;height:100%;top:0}.sg-task-content.svelte-6qjqhr{position:absolute;height:100%;top:0;padding-left:14px;font-size:14px;display:flex;align-items:center;justify-content:flex-start}.sg-task.svelte-6qjqhr:not(.moving){transition:transform 0.2s, background-color 0.2s, width 0.2s}.sg-task.moving.svelte-6qjqhr{z-index:1;opacity:0.5}.sg-task.svelte-6qjqhr:hover::before{content:\"\";width:4px;height:50%;top:25%;position:absolute;cursor:ew-resize;border-style:solid;border-color:rgba(255, 255, 255, 0.5);margin-left:3px;left:0;border-width:0 1px;z-index:1}.sg-task.svelte-6qjqhr:hover::after{content:\"\";width:4px;height:50%;top:25%;position:absolute;cursor:ew-resize;border-style:solid;border-color:rgba(255, 255, 255, 0.5);margin-right:3px;right:0;border-width:0 1px;z-index:1}.sg-task.selected.svelte-6qjqhr{outline:2px solid rgba(3, 169, 244, 0.5);outline-offset:3px;z-index:1}.sg-task-reflected.svelte-6qjqhr{opacity:0.5}.sg-task-background.svelte-6qjqhr{background:rgba(0, 0, 0, 0.2)}.sg-task{color:white;background:rgb(116, 191, 255)}.sg-task:hover{background:rgb(98, 161, 216)}.sg-task.selected{background:rgb(69, 112, 150)}";
    styleInject(css_248z);

    /* src\entities\Task.svelte generated by Svelte v3.23.0 */

    function create_if_block_4(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "sg-task-background svelte-6qjqhr");
    			set_style(div, "width", /*model*/ ctx[0].amountDone + "%");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1) {
    				set_style(div, "width", /*model*/ ctx[0].amountDone + "%");
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (294:4) {:else}
    function create_else_block(ctx) {
    	let t_value = /*model*/ ctx[0].label + "";
    	let t;

    	return {
    		c() {
    			t = text(t_value);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1 && t_value !== (t_value = /*model*/ ctx[0].label + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (292:26) 
    function create_if_block_3(ctx) {
    	let html_tag;
    	let raw_value = /*taskContent*/ ctx[8](/*model*/ ctx[0]) + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1 && raw_value !== (raw_value = /*taskContent*/ ctx[8](/*model*/ ctx[0]) + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (290:4) {#if model.html}
    function create_if_block_2(ctx) {
    	let html_tag;
    	let raw_value = /*model*/ ctx[0].html + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1 && raw_value !== (raw_value = /*model*/ ctx[0].html + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (296:4) {#if model.showButton}
    function create_if_block_1(ctx) {
    	let span;
    	let raw_value = /*model*/ ctx[0].buttonHtml + "";
    	let span_class_value;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			span = element("span");
    			attr(span, "class", span_class_value = "sg-task-button " + /*model*/ ctx[0].buttonClasses + " svelte-6qjqhr");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			span.innerHTML = raw_value;

    			if (!mounted) {
    				dispose = listen(span, "click", /*onclick*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1 && raw_value !== (raw_value = /*model*/ ctx[0].buttonHtml + "")) span.innerHTML = raw_value;
    			if (dirty[0] & /*model*/ 1 && span_class_value !== (span_class_value = "sg-task-button " + /*model*/ ctx[0].buttonClasses + " svelte-6qjqhr")) {
    				attr(span, "class", span_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (303:2) {#if model.labelBottom}
    function create_if_block(ctx) {
    	let label;
    	let t_value = /*model*/ ctx[0].labelBottom + "";
    	let t;

    	return {
    		c() {
    			label = element("label");
    			t = text(t_value);
    			attr(label, "class", "sg-label-bottom svelte-6qjqhr");
    		},
    		m(target, anchor) {
    			insert(target, label, anchor);
    			append(label, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*model*/ 1 && t_value !== (t_value = /*model*/ ctx[0].labelBottom + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(label);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let div1_data_task_id_value;
    	let div1_class_value;
    	let taskElement_action;
    	let mounted;
    	let dispose;
    	let if_block0 = /*model*/ ctx[0].amountDone && create_if_block_4(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*model*/ ctx[0].html) return create_if_block_2;
    		if (/*taskContent*/ ctx[8]) return create_if_block_3;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);
    	let if_block2 = /*model*/ ctx[0].showButton && create_if_block_1(ctx);
    	let if_block3 = /*model*/ ctx[0].labelBottom && create_if_block(ctx);

    	return {
    		c() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			attr(div0, "class", "sg-task-content svelte-6qjqhr");
    			attr(div1, "data-task-id", div1_data_task_id_value = /*model*/ ctx[0].id);
    			attr(div1, "class", div1_class_value = "sg-task " + /*model*/ ctx[0].classes + " svelte-6qjqhr");
    			set_style(div1, "width", /*_position*/ ctx[6].width + "px");
    			set_style(div1, "height", /*height*/ ctx[1] + "px");
    			set_style(div1, "transform", "translate(" + /*_position*/ ctx[6].x + "px, " + /*_position*/ ctx[6].y + "px)");
    			toggle_class(div1, "moving", /*_dragging*/ ctx[4] || /*_resizing*/ ctx[5]);
    			toggle_class(div1, "selected", /*selected*/ ctx[7]);
    			toggle_class(div1, "animating", animating);
    			toggle_class(div1, "sg-task-reflected", /*reflected*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append(div1, t0);
    			append(div1, div0);
    			if_block1.m(div0, null);
    			append(div0, t1);
    			if (if_block2) if_block2.m(div0, null);
    			append(div1, t2);
    			if (if_block3) if_block3.m(div1, null);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(ctx[10].call(null, div1)),
    					action_destroyer(taskElement_action = /*taskElement*/ ctx[11].call(null, div1, /*model*/ ctx[0]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*model*/ ctx[0].amountDone) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div0, t1);
    				}
    			}

    			if (/*model*/ ctx[0].showButton) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					if_block2.m(div0, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*model*/ ctx[0].labelBottom) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block(ctx);
    					if_block3.c();
    					if_block3.m(div1, null);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (dirty[0] & /*model*/ 1 && div1_data_task_id_value !== (div1_data_task_id_value = /*model*/ ctx[0].id)) {
    				attr(div1, "data-task-id", div1_data_task_id_value);
    			}

    			if (dirty[0] & /*model*/ 1 && div1_class_value !== (div1_class_value = "sg-task " + /*model*/ ctx[0].classes + " svelte-6qjqhr")) {
    				attr(div1, "class", div1_class_value);
    			}

    			if (dirty[0] & /*_position*/ 64) {
    				set_style(div1, "width", /*_position*/ ctx[6].width + "px");
    			}

    			if (dirty[0] & /*height*/ 2) {
    				set_style(div1, "height", /*height*/ ctx[1] + "px");
    			}

    			if (dirty[0] & /*_position*/ 64) {
    				set_style(div1, "transform", "translate(" + /*_position*/ ctx[6].x + "px, " + /*_position*/ ctx[6].y + "px)");
    			}

    			if (taskElement_action && is_function(taskElement_action.update) && dirty[0] & /*model*/ 1) taskElement_action.update.call(null, /*model*/ ctx[0]);

    			if (dirty[0] & /*model, _dragging, _resizing*/ 49) {
    				toggle_class(div1, "moving", /*_dragging*/ ctx[4] || /*_resizing*/ ctx[5]);
    			}

    			if (dirty[0] & /*model, selected*/ 129) {
    				toggle_class(div1, "selected", /*selected*/ ctx[7]);
    			}

    			if (dirty[0] & /*model*/ 1) {
    				toggle_class(div1, "animating", animating);
    			}

    			if (dirty[0] & /*model, reflected*/ 5) {
    				toggle_class(div1, "sg-task-reflected", /*reflected*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    let animating = true;

    function instance$5($$self, $$props, $$invalidate) {
    	let $rowStore;
    	let $taskStore;
    	let $rowPadding;
    	let $selection;
    	component_subscribe($$self, rowStore, $$value => $$invalidate(17, $rowStore = $$value));
    	component_subscribe($$self, taskStore, $$value => $$invalidate(18, $taskStore = $$value));
    	let { model } = $$props;
    	let { height } = $$props;
    	let { left } = $$props;
    	let { top } = $$props;
    	let { width } = $$props;
    	let { reflected = false } = $$props;
    	let _dragging = false;
    	let _resizing = false;
    	let _position = { x: left, y: top, width };

    	function updatePosition(x, y, width) {
    		if (!_dragging && !_resizing) {
    			$$invalidate(6, _position.x = x, _position);
    			$$invalidate(6, _position.y = y, _position); //row.y + 6;
    			$$invalidate(6, _position.width = width, _position);
    		} // should NOT animate on resize/update of columns
    	}

    	getContext("dimensions");
    	const { rowContainer } = getContext("gantt");
    	const { taskContent, resizeHandleWidth, rowPadding, onTaskButtonClick, reflectOnParentRows, reflectOnChildRows, taskElementHook } = getContext("options");
    	component_subscribe($$self, rowPadding, value => $$invalidate(19, $rowPadding = value));
    	const { dndManager, api, utils, selectionManager, columnService } = getContext("services");

    	function drag(node) {
    		const ondrop = event => {
    			let rowChangeValid = true;

    			//row switching
    			const sourceRow = $rowStore.entities[model.resourceId];

    			if (event.dragging) {
    				const targetRow = dndManager.getTarget("row", event.mouseEvent);

    				if (targetRow) {
    					$$invalidate(0, model.resourceId = targetRow.model.id, model);
    					api.tasks.raise.switchRow(this, targetRow, sourceRow);
    				} else {
    					rowChangeValid = false;
    				}
    			}

    			$$invalidate(4, _dragging = $$invalidate(5, _resizing = false));
    			const task = $taskStore.entities[model.id];

    			if (rowChangeValid) {
    				const prevFrom = model.from;
    				const prevTo = model.to;
    				const newFrom = $$invalidate(0, model.from = utils.roundTo(columnService.getDateByPosition(event.x)), model);
    				const newTo = $$invalidate(0, model.to = utils.roundTo(columnService.getDateByPosition(event.x + event.width)), model);
    				const newLeft = columnService.getPositionByDate(newFrom) | 0;
    				const newRight = columnService.getPositionByDate(newTo) | 0;
    				const targetRow = $rowStore.entities[model.resourceId];
    				const left = newLeft;
    				const width = newRight - newLeft;
    				const top = $rowPadding + targetRow.y;
    				updatePosition(left, top, width);
    				const newTask = Object.assign(Object.assign({}, task), { left, width, top, model });
    				const changed = prevFrom != newFrom || prevTo != newTo || sourceRow && sourceRow.model.id !== targetRow.model.id;

    				if (changed) {
    					api.tasks.raise.change({ task: newTask, sourceRow, targetRow });
    				}

    				taskStore.update(newTask);

    				if (changed) {
    					api.tasks.raise.changed({ task: newTask, sourceRow, targetRow });
    				}

    				// update shadow tasks
    				if (newTask.reflections) {
    					taskStore.deleteAll(newTask.reflections);
    				}

    				const reflectedTasks = [];

    				if (reflectOnChildRows && targetRow.allChildren) {
    					if (!newTask.reflections) newTask.reflections = [];
    					const opts = { rowPadding: $rowPadding };

    					targetRow.allChildren.forEach(r => {
    						const reflectedTask = reflectTask(newTask, r, opts);
    						newTask.reflections.push(reflectedTask.model.id);
    						reflectedTasks.push(reflectedTask);
    					});
    				}

    				if (reflectOnParentRows && targetRow.allParents.length > 0) {
    					if (!newTask.reflections) newTask.reflections = [];
    					const opts = { rowPadding: $rowPadding };

    					targetRow.allParents.forEach(r => {
    						const reflectedTask = reflectTask(newTask, r, opts);
    						newTask.reflections.push(reflectedTask.model.id);
    						reflectedTasks.push(reflectedTask);
    					});
    				}

    				if (reflectedTasks.length > 0) {
    					taskStore.upsertAll(reflectedTasks);
    				}

    				if (!(targetRow.allParents.length > 0) && !targetRow.allChildren) {
    					newTask.reflections = null;
    				}
    			} else {
    				// reset position
    				($$invalidate(6, _position.x = task.left, _position), $$invalidate(6, _position.width = task.width, _position), $$invalidate(6, _position.y = task.top, _position));
    			}
    		};

    		const draggable = new Draggable(node,
    		{
    				onDown: event => {
    					if (event.dragging) {
    						setCursor("move");
    					}

    					if (event.resizing) {
    						setCursor("e-resize");
    					}
    				},
    				onMouseUp: () => {
    					setCursor("default");
    				},
    				onResize: event => {
    					($$invalidate(6, _position.x = event.x, _position), $$invalidate(6, _position.width = event.width, _position), $$invalidate(5, _resizing = true));
    				},
    				onDrag: event => {
    					($$invalidate(6, _position.x = event.x, _position), $$invalidate(6, _position.y = event.y, _position), $$invalidate(4, _dragging = true));
    				},
    				dragAllowed: () => {
    					return row.model.enableDragging && model.enableDragging;
    				},
    				resizeAllowed: () => {
    					return row.model.enableDragging && model.enableDragging;
    				},
    				onDrop: ondrop,
    				container: rowContainer,
    				resizeHandleWidth,
    				getX: () => _position.x,
    				getY: () => _position.y,
    				getWidth: () => _position.width
    			});

    		return { destroy: () => draggable.destroy() };
    	}

    	function taskElement(node, model) {
    		if (taskElementHook) {
    			return taskElementHook(node, model);
    		}
    	}

    	function onclick(event) {
    		if (onTaskButtonClick) {
    			onTaskButtonClick(model);
    		}
    	}

    	let selection = selectionManager.selection;
    	component_subscribe($$self, selection, value => $$invalidate(20, $selection = value));
    	let selected = false;
    	let row;

    	$$self.$set = $$props => {
    		if ("model" in $$props) $$invalidate(0, model = $$props.model);
    		if ("height" in $$props) $$invalidate(1, height = $$props.height);
    		if ("left" in $$props) $$invalidate(13, left = $$props.left);
    		if ("top" in $$props) $$invalidate(14, top = $$props.top);
    		if ("width" in $$props) $$invalidate(15, width = $$props.width);
    		if ("reflected" in $$props) $$invalidate(2, reflected = $$props.reflected);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*left, top, width*/ 57344) {
    			 updatePosition(left, top, width);
    		}

    		if ($$self.$$.dirty[0] & /*$selection, model*/ 1048577) {
    			 $$invalidate(7, selected = $selection.indexOf(model.id) !== -1);
    		}

    		if ($$self.$$.dirty[0] & /*$rowStore, model*/ 131073) {
    			 row = $rowStore.entities[model.resourceId];
    		}
    	};

    	return [
    		model,
    		height,
    		reflected,
    		onclick,
    		_dragging,
    		_resizing,
    		_position,
    		selected,
    		taskContent,
    		rowPadding,
    		drag,
    		taskElement,
    		selection,
    		left,
    		top,
    		width
    	];
    }

    class Task extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(
    			this,
    			options,
    			instance$5,
    			create_fragment$5,
    			safe_not_equal,
    			{
    				model: 0,
    				height: 1,
    				left: 13,
    				top: 14,
    				width: 15,
    				reflected: 2,
    				onclick: 3
    			},
    			[-1, -1]
    		);
    	}

    	get onclick() {
    		return this.$$.ctx[3];
    	}
    }

    var css_248z$1 = ".sg-row.svelte-ejtbeo{position:relative;width:100%;box-sizing:border-box}";
    styleInject(css_248z$1);

    /* src\entities\Row.svelte generated by Svelte v3.23.0 */

    function create_if_block$1(ctx) {
    	let html_tag;
    	let raw_value = /*row*/ ctx[0].model.contentHtml + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 1 && raw_value !== (raw_value = /*row*/ ctx[0].model.contentHtml + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    function create_fragment$1$1(ctx) {
    	let div;
    	let div_class_value;
    	let div_data_row_id_value;
    	let if_block = /*row*/ ctx[0].model.contentHtml && create_if_block$1(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr(div, "class", div_class_value = "sg-row " + /*row*/ ctx[0].model.classes + " svelte-ejtbeo");
    			attr(div, "data-row-id", div_data_row_id_value = /*row*/ ctx[0].model.id);
    			set_style(div, "height", /*$rowHeight*/ ctx[3] + "px");
    			toggle_class(div, "sg-hover", /*$hoveredRow*/ ctx[1] == /*row*/ ctx[0].model.id);
    			toggle_class(div, "sg-selected", /*$selectedRow*/ ctx[2] == /*row*/ ctx[0].model.id);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p(ctx, [dirty]) {
    			if (/*row*/ ctx[0].model.contentHtml) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*row*/ 1 && div_class_value !== (div_class_value = "sg-row " + /*row*/ ctx[0].model.classes + " svelte-ejtbeo")) {
    				attr(div, "class", div_class_value);
    			}

    			if (dirty & /*row*/ 1 && div_data_row_id_value !== (div_data_row_id_value = /*row*/ ctx[0].model.id)) {
    				attr(div, "data-row-id", div_data_row_id_value);
    			}

    			if (dirty & /*$rowHeight*/ 8) {
    				set_style(div, "height", /*$rowHeight*/ ctx[3] + "px");
    			}

    			if (dirty & /*row, $hoveredRow, row*/ 3) {
    				toggle_class(div, "sg-hover", /*$hoveredRow*/ ctx[1] == /*row*/ ctx[0].model.id);
    			}

    			if (dirty & /*row, $selectedRow, row*/ 5) {
    				toggle_class(div, "sg-selected", /*$selectedRow*/ ctx[2] == /*row*/ ctx[0].model.id);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance$1$1($$self, $$props, $$invalidate) {
    	let $hoveredRow;
    	let $selectedRow;
    	let $rowHeight;
    	
    	let { row } = $$props;
    	const { rowHeight } = getContext("options");
    	component_subscribe($$self, rowHeight, value => $$invalidate(3, $rowHeight = value));
    	const { hoveredRow, selectedRow } = getContext("gantt");
    	component_subscribe($$self, hoveredRow, value => $$invalidate(1, $hoveredRow = value));
    	component_subscribe($$self, selectedRow, value => $$invalidate(2, $selectedRow = value));

    	$$self.$set = $$props => {
    		if ("row" in $$props) $$invalidate(0, row = $$props.row);
    	};

    	return [row, $hoveredRow, $selectedRow, $rowHeight, rowHeight, hoveredRow, selectedRow];
    }

    class Row extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1$1, create_fragment$1$1, safe_not_equal, { row: 0 });
    	}
    }

    var css_248z$2 = ".sg-milestone.svelte-fuyhwd.svelte-fuyhwd{position:absolute;top:0;bottom:0;white-space:nowrap;height:20px;width:20px;min-width:40px;margin-left:-20px;display:flex;align-items:center;flex-direction:column;transition:background-color 0.2s, opacity 0.2s}.sg-milestone.svelte-fuyhwd .inside.svelte-fuyhwd{position:relative}.sg-milestone.svelte-fuyhwd .inside.svelte-fuyhwd:before{position:absolute;top:0;left:0;content:' ';height:28px;width:28px;transform-origin:0 0;transform:rotate(45deg);background-color:#feac31;border-color:#feac31}.sg-milestone.svelte-fuyhwd.svelte-fuyhwd:not(.moving){transition:transform 0.2s, background-color 0.2s, width 0.2s}.sg-milestone.moving.svelte-fuyhwd.svelte-fuyhwd{z-index:1}.sg-milestone.selected.svelte-fuyhwd.svelte-fuyhwd{outline:2px solid rgba(3, 169, 244, 0.5);outline-offset:3px;z-index:1}";
    styleInject(css_248z$2);

    var css_248z$3 = ".sg-time-range.svelte-18yq9be{height:100%;position:absolute;display:flex;flex-direction:column;align-items:center;background-image:linear-gradient(-45deg, rgba(0, 0, 0, 0) 46%, #e03218 49%, #e03218 51%, rgba(0, 0, 0, 0) 55%);background-size:6px 6px !important;color:red;font-weight:400}.sg-time-range-label.svelte-18yq9be{margin-top:10px;background:#fff;white-space:nowrap;padding:4px;font-weight:400;font-size:10px}";
    styleInject(css_248z$3);

    /* src\entities\TimeRange.svelte generated by Svelte v3.23.0 */

    function create_fragment$2$1(ctx) {
    	let div1;
    	let div0;
    	let t_value = /*model*/ ctx[0].label + "";
    	let t;

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(t_value);
    			attr(div0, "class", "sg-time-range-label svelte-18yq9be");
    			attr(div1, "class", "sg-time-range svelte-18yq9be");
    			set_style(div1, "width", /*_position*/ ctx[2].width + "px");
    			set_style(div1, "left", /*_position*/ ctx[2].x + "px");
    			toggle_class(div1, "moving", /*resizing*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div0, t);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*model*/ 1 && t_value !== (t_value = /*model*/ ctx[0].label + "")) set_data(t, t_value);

    			if (dirty & /*_position*/ 4) {
    				set_style(div1, "width", /*_position*/ ctx[2].width + "px");
    			}

    			if (dirty & /*_position*/ 4) {
    				set_style(div1, "left", /*_position*/ ctx[2].x + "px");
    			}

    			if (dirty & /*resizing*/ 2) {
    				toggle_class(div1, "moving", /*resizing*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);
    		}
    	};
    }

    function instance$2$1($$self, $$props, $$invalidate) {
    	let { model } = $$props;
    	let { left } = $$props;
    	let { width } = $$props;
    	let { resizing = false } = $$props;
    	const _position = { width, x: left };
    	

    	$$self.$set = $$props => {
    		if ("model" in $$props) $$invalidate(0, model = $$props.model);
    		if ("left" in $$props) $$invalidate(3, left = $$props.left);
    		if ("width" in $$props) $$invalidate(4, width = $$props.width);
    		if ("resizing" in $$props) $$invalidate(1, resizing = $$props.resizing);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*left, width*/ 24) {
    			 {
    				($$invalidate(2, _position.x = left, _position), $$invalidate(2, _position.width = width, _position));
    			}
    		}
    	};

    	return [model, resizing, _position, left, width];
    }

    class TimeRange extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$2$1, create_fragment$2$1, safe_not_equal, { model: 0, left: 3, width: 4, resizing: 1 });
    	}
    }

    var css_248z$4 = ".sg-time-range-control.svelte-16dwney{position:absolute}.sg-time-range-handle-left.svelte-16dwney{position:absolute;left:0}.sg-time-range-handle-right.svelte-16dwney{position:absolute;right:0}.sg-time-range-handle-left.svelte-16dwney::before,.sg-time-range-handle-right.svelte-16dwney::before{position:absolute;content:'';bottom:4px;border-radius:6px 6px 6px 0;border:2px solid #b0b0b7;width:9px;height:9px;transform:translateX(-50%) rotate(-45deg);background-color:#fff;border-color:#e03218;cursor:ew-resize}";
    styleInject(css_248z$4);

    /* src\entities\TimeRangeHeader.svelte generated by Svelte v3.23.0 */

    function create_fragment$3$1(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr(div0, "class", "sg-time-range-handle-left svelte-16dwney");
    			attr(div1, "class", "sg-time-range-handle-right svelte-16dwney");
    			attr(div2, "class", "sg-time-range-control svelte-16dwney");
    			set_style(div2, "width", /*_position*/ ctx[0].width + "px");
    			set_style(div2, "left", /*_position*/ ctx[0].x + "px");
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			append(div2, t);
    			append(div2, div1);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(ctx[1].call(null, div0)),
    					action_destroyer(ctx[1].call(null, div1))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*_position*/ 1) {
    				set_style(div2, "width", /*_position*/ ctx[0].width + "px");
    			}

    			if (dirty & /*_position*/ 1) {
    				set_style(div2, "left", /*_position*/ ctx[0].x + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$3$1($$self, $$props, $$invalidate) {
    	const { rowContainer } = getContext("gantt");
    	const { utils, columnService } = getContext("services");
    	const { resizeHandleWidth } = getContext("options");
    	getContext("dimensions");
    	let { model } = $$props;
    	let { width } = $$props;
    	let { left } = $$props;
    	const _position = { width, x: left };
    	

    	function drag(node) {
    		const ondrop = event => {
    			const newFrom = utils.roundTo(columnService.getDateByPosition(event.x));
    			const newTo = utils.roundTo(columnService.getDateByPosition(event.x + event.width));
    			const newLeft = columnService.getPositionByDate(newFrom);
    			const newRight = columnService.getPositionByDate(newTo);
    			Object.assign(model, { from: newFrom, to: newTo });

    			update({
    				left: newLeft,
    				width: newRight - newLeft,
    				model,
    				resizing: false
    			});

    			window.removeEventListener("mousemove", onmousemove, false);
    		};

    		function update(state) {
    			timeRangeStore.update(state);
    			$$invalidate(0, _position.x = state.left, _position);
    			$$invalidate(0, _position.width = state.width, _position);
    		}

    		const draggable = new Draggable(node,
    		{
    				onDown: event => {
    					update({
    						left: event.x,
    						width: event.width,
    						model,
    						resizing: true
    					});
    				},
    				onResize: event => {
    					update({
    						left: event.x,
    						width: event.width,
    						model,
    						resizing: true
    					});
    				},
    				dragAllowed: false,
    				resizeAllowed: true,
    				onDrop: ondrop,
    				container: rowContainer,
    				resizeHandleWidth,
    				getX: () => _position.x,
    				getY: () => 0,
    				getWidth: () => _position.width
    			});

    		return { destroy: () => draggable.destroy() };
    	}

    	$$self.$set = $$props => {
    		if ("model" in $$props) $$invalidate(2, model = $$props.model);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("left" in $$props) $$invalidate(4, left = $$props.left);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*left, width*/ 24) {
    			 {
    				($$invalidate(0, _position.x = left, _position), $$invalidate(0, _position.width = width, _position));
    			}
    		}
    	};

    	return [_position, drag, model, width, left];
    }

    class TimeRangeHeader extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$3$1, create_fragment$3$1, safe_not_equal, { model: 2, width: 3, left: 4 });
    	}
    }

    var css_248z$5 = ".column.svelte-17q2a4x{position:absolute;height:100%;box-sizing:border-box}.column.svelte-17q2a4x{border-right:#efefef 1px solid}";
    styleInject(css_248z$5);

    class MomentSvelteGanttDateAdapter {
        constructor(moment) {
            this.moment = moment;
        }
        format(date, format) {
            return this.moment(date).format(format);
        }
    }
    class NoopSvelteGanttDateAdapter {
        format(date, format) {
            const d = new Date(date);
            switch (format) {
                case 'H':
                    return d.getHours() + '';
                case 'HH':
                    return pad(d.getHours());
                case 'H:mm':
                    return `${d.getHours()}:${pad(d.getMinutes())}`;
                case 'hh:mm':
                    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
                case 'hh:mm:ss':
                    return `${d.getHours()}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
                case 'dd/MM/yyyy':
                    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                case 'dd/MM/yyyy hh:mm':
                    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
                case 'dd/MM/yyyy hh:mm:ss':
                    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                default:
                    console.warn(`Date Format "${format}" is not supported, use another date adapter.`);
                    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            }
        }
    }
    function pad(value) {
        let result = value.toString();
        for (let i = result.length; i < 2; i++) {
            result = '0' + result;
        }
        return result;
    }
    function startOf(date, unit) {
        let d = new Date(date);
        let y = d.getFullYear();
        let m = d.getMonth();
        let dt = d.getDate();
        switch (unit) {
            case 'y':
            case 'year':
                return startOfDate(y, 0, 1);
            case 'month':
                return startOfDate(y, m, 1);
            case 'd':
            case 'day':
                return startOfDate(y, m, dt);
            case 'h':
            case 'hour':
            case 'm':
            case 'minute':
            case 's':
            case 'second':
                let unitMs = getDuration(unit);
                const value = Math.floor(date / unitMs) * unitMs;
                return value;
            default:
                throw new Error(`Unknown unit: ${unit}`);
        }
    }
    function startOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d).valueOf() - 31536000000;
        }
        else {
            return new Date(y, m, d).valueOf();
        }
    }
    function getDuration(unit, offset = 1) {
        switch (unit) {
            case 'y':
            case 'year':
                return offset * 31536000000;
            case 'month':
                return offset * 30 * 24 * 60 * 60 * 1000;
            case 'd':
            case 'day':
                return offset * 24 * 60 * 60 * 1000;
            case 'h':
            case 'hour':
                return offset * 60 * 60 * 1000;
            case 'm':
            case 'minute':
                return offset * 60 * 1000;
            case 's':
            case 'second':
                return offset * 1000;
            default:
                throw new Error(`Unknown unit: ${unit}`);
        }
    }
    // function startOf(date, unit) {
    //     let unitMs = getDuration(unit);
    //     const value = Math.floor(date / unitMs) * unitMs;
    //     return value;
    // }
    // function getDuration(unit, offset = 1) {
    //     switch (unit) {
    //         case 'y':
    //         case 'year':
    //             return offset * 31536000000;
    //         case 'month':
    //             return offset * 30 * 24 * 60 * 60 * 1000;
    //         case 'd':
    //         case 'day':
    //             return offset * 24 * 60 * 60 * 1000 - 60 * 60 * 1000;
    //         case 'h':
    //         case 'hour':
    //             return offset * 60 * 60 * 1000;
    //         case 'm':
    //         case 'minute':
    //             return offset * 60 * 1000;
    //         case 's':
    //         case 'second':
    //             return offset * 1000;
    //         default:
    //             throw new Error(`Unknown unit: ${unit}`);
    //     }
    // }

    var css_248z$6 = ".column-header-row.svelte-1sbstdn.svelte-1sbstdn{box-sizing:border-box;white-space:nowrap;height:32px}.column-header-cell.svelte-1sbstdn.svelte-1sbstdn{display:inline-block;height:100%;box-sizing:border-box;text-overflow:clip;text-align:center;display:inline-flex;justify-content:center;align-items:center;font-size:1em;font-size:14px;font-weight:300;transition:background 0.2s;cursor:pointer;user-select:none;border-right:#efefef 1px solid;border-bottom:#efefef 1px solid}.column-header-cell.svelte-1sbstdn.svelte-1sbstdn:hover{background:#f9f9f9}.column-header-cell.sticky.svelte-1sbstdn>.column-header-cell-label.svelte-1sbstdn{position:sticky;left:1rem}";
    styleInject(css_248z$6);

    /* src\column\ColumnHeaderRow.svelte generated by Svelte v3.23.0 */

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (44:4) {#each _headers as _header}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let t0_value = (/*_header*/ ctx[14].label || "N/A") + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[13](/*_header*/ ctx[14], ...args);
    	}

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr(div0, "class", "column-header-cell-label svelte-1sbstdn");
    			attr(div1, "class", "column-header-cell svelte-1sbstdn");
    			set_style(div1, "width", /*_header*/ ctx[14].width + "px");
    			toggle_class(div1, "sticky", /*header*/ ctx[0].sticky);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div0, t0);
    			append(div1, t1);

    			if (!mounted) {
    				dispose = listen(div1, "click", click_handler);
    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*_headers*/ 2 && t0_value !== (t0_value = (/*_header*/ ctx[14].label || "N/A") + "")) set_data(t0, t0_value);

    			if (dirty & /*_headers*/ 2) {
    				set_style(div1, "width", /*_header*/ ctx[14].width + "px");
    			}

    			if (dirty & /*header*/ 1) {
    				toggle_class(div1, "sticky", /*header*/ ctx[0].sticky);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function create_fragment$4$1(ctx) {
    	let div;
    	let each_value = /*_headers*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div, "class", "column-header-row svelte-1sbstdn");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*_headers, header, dispatch*/ 7) {
    				each_value = /*_headers*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function instance$4$1($$self, $$props, $$invalidate) {
    	let $width;
    	let $from;
    	const dispatch = createEventDispatcher();
    	
    	const { from, to, width } = getContext("dimensions");
    	component_subscribe($$self, from, value => $$invalidate(10, $from = value));
    	component_subscribe($$self, width, value => $$invalidate(9, $width = value));
    	const { dateAdapter } = getContext("options");
    	let { header } = $$props;
    	let { baseWidth } = $$props;
    	let { baseDuration } = $$props;
    	let { columnWidth } = $$props;
    	let { columnCount } = $$props;
    	let _headers = [];

    	const click_handler = _header => dispatch("dateSelected", {
    		from: _header.from,
    		to: _header.to,
    		unit: _header.unit
    	});

    	$$self.$set = $$props => {
    		if ("header" in $$props) $$invalidate(0, header = $$props.header);
    		if ("baseWidth" in $$props) $$invalidate(7, baseWidth = $$props.baseWidth);
    		if ("baseDuration" in $$props) $$invalidate(8, baseDuration = $$props.baseDuration);
    		if ("columnWidth" in $$props) $$invalidate(5, columnWidth = $$props.columnWidth);
    		if ("columnCount" in $$props) $$invalidate(6, columnCount = $$props.columnCount);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*header, baseDuration, baseWidth*/ 385) {
    			 {
    				$$invalidate(0, header.duration = getDuration(header.unit, header.offset), header);
    				const duration = header.duration;
    				const ratio = duration / baseDuration;
    				$$invalidate(5, columnWidth = baseWidth * ratio);
    			}
    		}

    		if ($$self.$$.dirty & /*$width, columnWidth, columnCount*/ 608) {
    			 {
    				$$invalidate(6, columnCount = Math.ceil($width / columnWidth));

    				if (!isFinite(columnCount)) {
    					console.error("columnCount is not finite");
    					$$invalidate(6, columnCount = 0);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*$from, header, columnCount, columnWidth, $width*/ 1633) {
    			 {
    				const headers = [];
    				let headerTime = startOf($from, header.unit);

    				for (let i = 0; i < columnCount; i++) {
    					headers.push({
    						width: Math.min(columnWidth, $width),
    						label: dateAdapter.format(headerTime, header.format),
    						from: headerTime,
    						to: headerTime + header.duration,
    						unit: header.unit
    					});

    					headerTime += header.duration;
    				}

    				$$invalidate(1, _headers = headers);
    			}
    		}
    	};

    	return [
    		header,
    		_headers,
    		dispatch,
    		from,
    		width,
    		columnWidth,
    		columnCount,
    		baseWidth,
    		baseDuration,
    		$width,
    		$from,
    		to,
    		dateAdapter,
    		click_handler
    	];
    }

    class ColumnHeaderRow extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$4$1, create_fragment$4$1, safe_not_equal, {
    			header: 0,
    			baseWidth: 7,
    			baseDuration: 8,
    			columnWidth: 5,
    			columnCount: 6
    		});
    	}
    }

    class GanttUtils {
        constructor() {
        }
        /**
         * Returns position of date on a line if from and to represent length of width
         * @param {*} date
         */
        getPositionByDate(date) {
            return getPositionByDate(date, this.from, this.from + this.totalColumnDuration, this.totalColumnWidth);
        }
        getDateByPosition(x) {
            return getDateByPosition(x, this.from, this.from + this.totalColumnDuration, this.totalColumnWidth);
        }
        roundTo(date) {
            let value = Math.round(date / this.magnetDuration) * this.magnetDuration;
            return value;
        }
    }
    function getPositionByDate(date, from, to, width) {
        if (!date) {
            return undefined;
        }
        let durationTo = date - from;
        let durationToEnd = to - from;
        return durationTo / durationToEnd * width;
    }
    function getDateByPosition(x, from, to, width) {
        let durationTo = (x / width) * (to - from);
        let dateAtPosition = from + durationTo;
        return dateAtPosition;
    }
    // Returns the object on the left and right in an array using the given cmp function.
    // The compare function defined which property of the value to compare (e.g.: c => c.left)
    function getIndicesOnly(input, value, comparer, strict) {
        let lo = -1;
        let hi = input.length;
        while (hi - lo > 1) {
            let mid = Math.floor((lo + hi) / 2);
            if (strict ? comparer(input[mid]) < value : comparer(input[mid]) <= value) {
                lo = mid;
            }
            else {
                hi = mid;
            }
        }
        if (!strict && input[lo] !== undefined && comparer(input[lo]) === value) {
            hi = lo;
        }
        return [lo, hi];
    }
    function get(input, value, comparer, strict) {
        let res = getIndicesOnly(input, value, comparer, strict);
        return [input[res[0]], input[res[1]]];
    }

    /* src\column\ColumnHeader.svelte generated by Svelte v3.23.0 */

    function get_each_context$1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (37:0) {#each headers as header}
    function create_each_block$1$1(ctx) {
    	let current;

    	const columnheaderrow = new ColumnHeaderRow({
    			props: {
    				header: /*header*/ ctx[13],
    				baseWidth: /*baseHeaderWidth*/ ctx[1],
    				baseDuration: /*baseHeaderDuration*/ ctx[2]
    			}
    		});

    	columnheaderrow.$on("dateSelected", /*dateSelected_handler*/ ctx[12]);

    	return {
    		c() {
    			create_component(columnheaderrow.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(columnheaderrow, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const columnheaderrow_changes = {};
    			if (dirty & /*headers*/ 1) columnheaderrow_changes.header = /*header*/ ctx[13];
    			if (dirty & /*baseHeaderWidth*/ 2) columnheaderrow_changes.baseWidth = /*baseHeaderWidth*/ ctx[1];
    			if (dirty & /*baseHeaderDuration*/ 4) columnheaderrow_changes.baseDuration = /*baseHeaderDuration*/ ctx[2];
    			columnheaderrow.$set(columnheaderrow_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(columnheaderrow.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(columnheaderrow.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(columnheaderrow, detaching);
    		}
    	};
    }

    function create_fragment$5$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*headers*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1$1(get_each_context$1$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*headers, baseHeaderWidth, baseHeaderDuration*/ 7) {
    				each_value = /*headers*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(each_1_anchor);
    		}
    	};
    }

    function instance$5$1($$self, $$props, $$invalidate) {
    	let $from;
    	let $to;
    	let $width;
    	let { headers } = $$props;
    	let { columnUnit } = $$props;
    	let { columnOffset } = $$props;
    	const { from, to, width } = getContext("dimensions");
    	component_subscribe($$self, from, value => $$invalidate(9, $from = value));
    	component_subscribe($$self, to, value => $$invalidate(10, $to = value));
    	component_subscribe($$self, width, value => $$invalidate(11, $width = value));
    	let minHeader;
    	let baseHeaderWidth;
    	let baseHeaderDuration;

    	function dateSelected_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("headers" in $$props) $$invalidate(0, headers = $$props.headers);
    		if ("columnUnit" in $$props) $$invalidate(6, columnUnit = $$props.columnUnit);
    		if ("columnOffset" in $$props) $$invalidate(7, columnOffset = $$props.columnOffset);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*headers, columnUnit, columnOffset*/ 193) {
    			 {
    				let result = null;
    				let minDuration = null;

    				[...headers, { unit: columnUnit, offset: columnOffset }].forEach(header => {
    					const duration = header.duration = header.duration || getDuration(header.unit, header.offset);

    					if (duration < minDuration || minDuration === null) {
    						minDuration = duration;
    						result = header;
    					}
    				});

    				$$invalidate(8, minHeader = result);
    			}
    		}

    		if ($$self.$$.dirty & /*$from, minHeader, $to, $width, baseHeaderWidth*/ 3842) {
    			 {
    				$$invalidate(1, baseHeaderWidth = getPositionByDate($from + minHeader.duration, $from, $to, $width) | 0);
    				if (baseHeaderWidth <= 0) console.error("baseHeaderWidth is invalid, columns or headers might be too short for the current view.");
    			}
    		}

    		if ($$self.$$.dirty & /*minHeader*/ 256) {
    			 {
    				$$invalidate(2, baseHeaderDuration = minHeader.duration);
    			}
    		}
    	};

    	return [
    		headers,
    		baseHeaderWidth,
    		baseHeaderDuration,
    		from,
    		to,
    		width,
    		columnUnit,
    		columnOffset,
    		minHeader,
    		$from,
    		$to,
    		$width,
    		dateSelected_handler
    	];
    }

    class ColumnHeader extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$5$1, create_fragment$5$1, safe_not_equal, {
    			headers: 0,
    			columnUnit: 6,
    			columnOffset: 7
    		});
    	}
    }

    var css_248z$7 = ".sg-columns.svelte-1clwlpk{position:absolute;height:100%;width:100%;overflow:hidden;background-repeat:repeat;background-position-x:-1px}";
    styleInject(css_248z$7);

    /* src\column\Columns.svelte generated by Svelte v3.23.0 */

    function create_fragment$6(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "sg-columns svelte-1clwlpk");
    			set_style(div, "background-image", /*backgroundImage*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*backgroundImage*/ 1) {
    				set_style(div, "background-image", /*backgroundImage*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    function lineAt(ctx, x) {
    	ctx.beginPath();
    	ctx.moveTo(x, 0);
    	ctx.lineTo(x, 20);
    	ctx.stroke();
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { columns = [] } = $$props;
    	let { columnStrokeWidth = 1 } = $$props;
    	let { columnStrokeColor = "#efefef" } = $$props;

    	function createBackground(columns) {
    		const canvas = document.createElement("canvas");
    		canvas.width = (columns.length - 1) * columns[0].width;
    		canvas.height = 20;
    		const ctx = canvas.getContext("2d");
    		ctx.shadowColor = "rgba(128,128,128,0.5)";
    		ctx.shadowOffsetX = 0;
    		ctx.shadowOffsetY = 0;
    		ctx.shadowBlur = 0.5;
    		ctx.lineWidth = columnStrokeWidth;
    		ctx.lineCap = "square";
    		ctx.strokeStyle = columnStrokeColor;
    		ctx.translate(0.5, 0.5);

    		columns.forEach(column => {
    			lineAt(ctx, column.left);
    		});

    		const dataURL = canvas.toDataURL();
    		return `url("${dataURL}")`;
    	}

    	let backgroundImage;

    	$$self.$set = $$props => {
    		if ("columns" in $$props) $$invalidate(1, columns = $$props.columns);
    		if ("columnStrokeWidth" in $$props) $$invalidate(2, columnStrokeWidth = $$props.columnStrokeWidth);
    		if ("columnStrokeColor" in $$props) $$invalidate(3, columnStrokeColor = $$props.columnStrokeColor);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*columns*/ 2) {
    			 {
    				$$invalidate(0, backgroundImage = createBackground(columns.slice(0, 5)));
    			}
    		}
    	};

    	return [backgroundImage, columns, columnStrokeWidth, columnStrokeColor];
    }

    class Columns extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			columns: 1,
    			columnStrokeWidth: 2,
    			columnStrokeColor: 3
    		});
    	}
    }

    var css_248z$8 = ".sg-context-menu.svelte-1noieoz{position:absolute;background:white;border:1px solid #ccc;padding:0.25em 0;font-size:10px;transition:opacity 0.4s ease 0s;opacity:1;box-shadow:rgba(0, 0, 0, 0.32) 1px 1px 3px 0px}.context-option.svelte-1noieoz:hover{background:#eee}.context-option.svelte-1noieoz{cursor:default;padding:0.2em 1em}";
    styleInject(css_248z$8);

    var css_248z$9 = ".sg-resize.svelte-1cpm1hk{z-index:2;background:#e9eaeb;width:5px;cursor:col-resize;position:absolute;height:100%;transition:width 0.2s, transform 0.2s}.sg-resize.svelte-1cpm1hk:hover{transform:translateX(-2px);width:10px}";
    styleInject(css_248z$9);

    /* src\ui\Resizer.svelte generated by Svelte v3.23.0 */

    function create_fragment$7(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "sg-resize svelte-1cpm1hk");
    			set_style(div, "left", /*x*/ ctx[0] + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (!mounted) {
    				dispose = action_destroyer(ctx[1].call(null, div));
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*x*/ 1) {
    				set_style(div, "left", /*x*/ ctx[0] + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	let { x = 240 } = $$props;
    	let { container } = $$props;

    	const dragOptions = {
    		onDrag: event => {
    			($$invalidate(0, x = event.x));
    			dispatch("resize", { left: x });
    			setCursor("col-resize");
    		},
    		onDrop: event => {
    			($$invalidate(0, x = event.x));
    			dispatch("resize", { left: x });
    			setCursor("default");
    		},
    		dragAllowed: true,
    		resizeAllowed: false,
    		container,
    		getX: () => x,
    		getY: () => 0,
    		getWidth: () => 0
    	};

    	function resizer(node) {
    		return new Draggable(node, dragOptions);
    	}

    	$$self.$set = $$props => {
    		if ("x" in $$props) $$invalidate(0, x = $$props.x);
    		if ("container" in $$props) $$invalidate(2, container = $$props.container);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*container*/ 4) {
    			 dragOptions.container = container;
    		}
    	};

    	return [x, resizer, container];
    }

    class Resizer extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { x: 0, container: 2 });
    	}
    }

    class SelectionManager {
        constructor() {
            this.selection = writable([]);
        }
        selectSingle(item) {
            this.selection.set([item]);
        }
        toggleSelection(item) {
            this.selection.update(items => {
                const index = items.indexOf(item);
                if (index !== -1) {
                    items.splice(index, 1);
                }
                else {
                    items.push(item);
                }
                return items;
            });
        }
        clearSelection() {
            this.selection.set([]);
        }
    }

    class GanttApi {
        constructor() {
            this.listeners = [];
            this.listenersMap = {};
        }
        registerEvent(featureName, eventName) {
            if (!this[featureName]) {
                this[featureName] = {};
            }
            const feature = this[featureName];
            if (!feature.on) {
                feature.on = {};
                feature.raise = {};
            }
            let eventId = 'on:' + featureName + ':' + eventName;
            feature.raise[eventName] = (...params) => {
                //todo add svelte? event listeners, looping isnt effective unless rarely used
                this.listeners.forEach(listener => {
                    if (listener.eventId === eventId) {
                        listener.handler(params);
                    }
                });
            };
            // Creating on event method featureName.oneventName
            feature.on[eventName] = (handler) => {
                // track our listener so we can turn off and on
                let listener = {
                    handler: handler,
                    eventId: eventId
                };
                this.listenersMap[eventId] = listener;
                this.listeners.push(listener);
                const removeListener = () => {
                    const index = this.listeners.indexOf(listener);
                    this.listeners.splice(index, 1);
                };
                return removeListener;
            };
        }
    }

    class RowFactory {
        constructor() {
        }
        createRow(row, y) {
            // defaults
            // id of task, every task needs to have a unique one
            //row.id = row.id || undefined;
            // css classes
            row.classes = row.classes || '';
            // html content of row
            row.contentHtml = row.contentHtml || undefined;
            // enable dragging of tasks to and from this row 
            row.enableDragging = row.enableDragging === undefined ? true : row.enableDragging;
            // height of row element
            const height = row.height || this.rowHeight;
            return {
                model: row,
                y,
                height,
                expanded: true
            };
        }
        createRows(rows) {
            const ctx = { y: 0, result: [] };
            this.createChildRows(rows, ctx);
            return ctx.result;
        }
        createChildRows(rowModels, ctx, parent = null, level = 0, parents = []) {
            const rowsAtLevel = [];
            const allRows = [];
            if (parent) {
                parents = [...parents, parent];
            }
            rowModels.forEach(rowModel => {
                const row = this.createRow(rowModel, ctx.y);
                ctx.result.push(row);
                rowsAtLevel.push(row);
                allRows.push(row);
                row.childLevel = level;
                row.parent = parent;
                row.allParents = parents;
                ctx.y += row.height;
                if (rowModel.children) {
                    const nextLevel = this.createChildRows(rowModel.children, ctx, row, level + 1, parents);
                    row.children = nextLevel.rows;
                    row.allChildren = nextLevel.allRows;
                    allRows.push(...nextLevel.allRows);
                }
            });
            return {
                rows: rowsAtLevel,
                allRows
            };
        }
    }

    class TimeRangeFactory {
        constructor(columnService) {
            this.columnService = columnService;
        }
        create(model) {
            // enable dragging
            model.enableResizing = model.enableResizing === undefined ? true : model.enableResizing;
            const left = this.columnService.getPositionByDate(model.from);
            const right = this.columnService.getPositionByDate(model.to);
            return {
                model,
                left: left,
                width: right - left,
                resizing: false
            };
        }
    }

    function findByPosition(columns, x) {
        const result = get(columns, x, c => c.left);
        return result;
    }
    function findByDate(columns, x) {
        const result = get(columns, x, c => c.from);
        return result;
    }

    const callbacks = {};
    function onDelegatedEvent(type, attr, callback) {
        if (!callbacks[type])
            callbacks[type] = {};
        callbacks[type][attr] = callback;
    }
    function offDelegatedEvent(type, attr) {
        delete callbacks[type][attr];
    }
    function matches(cbs, element) {
        let data;
        for (let attr in cbs) {
            if (data = element.getAttribute(attr)) {
                return { attr, data };
            }
        }
    }
    function onEvent(e) {
        let { type, target } = e;
        const cbs = callbacks[type];
        if (!cbs)
            return;
        let match;
        let element = target;
        while (element && element != e.currentTarget) {
            if ((match = matches(cbs, element))) {
                break;
            }
            element = element.parentElement;
        }
        if (match && cbs[match.attr]) {
            cbs[match.attr](e, match.data, element);
        }
    }

    var css_248z$a = ".sg-disable-transition.svelte-12fxs8g .sg-task,.sg-disable-transition.svelte-12fxs8g .sg-milestone{transition:transform 0s, background-color 0.2s, width 0s !important}.sg-view:not(:first-child){margin-left:5px}.right-scrollbar-visible.svelte-12fxs8g{padding-right:17px}.sg-timeline.svelte-12fxs8g{flex:1 1 0%;display:flex;flex-direction:column;overflow-x:auto}.sg-gantt.svelte-12fxs8g{display:flex;width:100%;height:100%;position:relative}.sg-foreground.svelte-12fxs8g{box-sizing:border-box;overflow:hidden;top:0;left:0;position:absolute;width:100%;height:100%;z-index:1;pointer-events:none}.sg-rows.svelte-12fxs8g{width:100%;box-sizing:border-box;overflow:hidden}.sg-timeline-body.svelte-12fxs8g{overflow:auto;flex:1 1 auto}.sg-header-scroller.svelte-12fxs8g{border-right:1px solid #efefef;overflow:hidden;position:relative}.content.svelte-12fxs8g{position:relative}*{box-sizing:border-box}";
    styleInject(css_248z$a);

    /* src\Gantt.svelte generated by Svelte v3.23.0 */

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[129] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[132] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[135] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[138] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[135] = list[i];
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[129] = list[i];
    	return child_ctx;
    }

    // (567:4) {#each ganttTableModules as module}
    function create_each_block_5(ctx) {
    	let t;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			rowContainerHeight: /*rowContainerHeight*/ ctx[16]
    		},
    		{ paddingTop: /*paddingTop*/ ctx[17] },
    		{ paddingBottom: /*paddingBottom*/ ctx[18] },
    		{ tableWidth: /*tableWidth*/ ctx[1] },
    		/*$$restProps*/ ctx[46],
    		{ visibleRows: /*visibleRows*/ ctx[19] }
    	];

    	var switch_value = /*module*/ ctx[129];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    		switch_instance.$on("init", onModuleInit);
    	}

    	const resizer = new Resizer({
    			props: {
    				x: /*tableWidth*/ ctx[1],
    				container: /*ganttElement*/ ctx[9]
    			}
    		});

    	resizer.$on("resize", /*onResize*/ ctx[43]);

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(resizer.$$.fragment);
    		},
    		m(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert(target, t, anchor);
    			mount_component(resizer, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*rowContainerHeight, paddingTop, paddingBottom, tableWidth, visibleRows*/ 983042 | dirty[1] & /*$$restProps*/ 32768)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*rowContainerHeight*/ 65536 && {
    						rowContainerHeight: /*rowContainerHeight*/ ctx[16]
    					},
    					dirty[0] & /*paddingTop*/ 131072 && { paddingTop: /*paddingTop*/ ctx[17] },
    					dirty[0] & /*paddingBottom*/ 262144 && { paddingBottom: /*paddingBottom*/ ctx[18] },
    					dirty[0] & /*tableWidth*/ 2 && { tableWidth: /*tableWidth*/ ctx[1] },
    					dirty[1] & /*$$restProps*/ 32768 && get_spread_object(/*$$restProps*/ ctx[46]),
    					dirty[0] & /*visibleRows*/ 524288 && { visibleRows: /*visibleRows*/ ctx[19] }
    				])
    			: {};

    			if (switch_value !== (switch_value = /*module*/ ctx[129])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("init", onModuleInit);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, t.parentNode, t);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			const resizer_changes = {};
    			if (dirty[0] & /*tableWidth*/ 2) resizer_changes.x = /*tableWidth*/ ctx[1];
    			if (dirty[0] & /*ganttElement*/ 512) resizer_changes.container = /*ganttElement*/ ctx[9];
    			resizer.$set(resizer_changes);
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(resizer.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(resizer.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (switch_instance) destroy_component(switch_instance, detaching);
    			if (detaching) detach(t);
    			destroy_component(resizer, detaching);
    		}
    	};
    }

    // (578:20) {#each $allTimeRanges as timeRange (timeRange.model.id)}
    function create_each_block_4(key_1, ctx) {
    	let first;
    	let current;
    	const timerangeheader_spread_levels = [/*timeRange*/ ctx[135]];
    	let timerangeheader_props = {};

    	for (let i = 0; i < timerangeheader_spread_levels.length; i += 1) {
    		timerangeheader_props = assign(timerangeheader_props, timerangeheader_spread_levels[i]);
    	}

    	const timerangeheader = new TimeRangeHeader({ props: timerangeheader_props });

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			first = empty();
    			create_component(timerangeheader.$$.fragment);
    			this.first = first;
    		},
    		m(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(timerangeheader, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const timerangeheader_changes = (dirty[0] & /*$allTimeRanges*/ 33554432)
    			? get_spread_update(timerangeheader_spread_levels, [get_spread_object(/*timeRange*/ ctx[135])])
    			: {};

    			timerangeheader.$set(timerangeheader_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(timerangeheader.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(timerangeheader.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(first);
    			destroy_component(timerangeheader, detaching);
    		}
    	};
    }

    // (591:24) {#each visibleRows as row (row.model.id)}
    function create_each_block_3(key_1, ctx) {
    	let first;
    	let current;
    	const row = new Row({ props: { row: /*row*/ ctx[138] } });

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			first = empty();
    			create_component(row.$$.fragment);
    			this.first = first;
    		},
    		m(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const row_changes = {};
    			if (dirty[0] & /*visibleRows*/ 524288) row_changes.row = /*row*/ ctx[138];
    			row.$set(row_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(first);
    			destroy_component(row, detaching);
    		}
    	};
    }

    // (597:20) {#each $allTimeRanges as timeRange (timeRange.model.id)}
    function create_each_block_2(key_1, ctx) {
    	let first;
    	let current;
    	const timerange_spread_levels = [/*timeRange*/ ctx[135]];
    	let timerange_props = {};

    	for (let i = 0; i < timerange_spread_levels.length; i += 1) {
    		timerange_props = assign(timerange_props, timerange_spread_levels[i]);
    	}

    	const timerange = new TimeRange({ props: timerange_props });

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			first = empty();
    			create_component(timerange.$$.fragment);
    			this.first = first;
    		},
    		m(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(timerange, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const timerange_changes = (dirty[0] & /*$allTimeRanges*/ 33554432)
    			? get_spread_update(timerange_spread_levels, [get_spread_object(/*timeRange*/ ctx[135])])
    			: {};

    			timerange.$set(timerange_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(timerange.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(timerange.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(first);
    			destroy_component(timerange, detaching);
    		}
    	};
    }

    // (601:20) {#each visibleTasks as task (task.model.id)}
    function create_each_block_1(key_1, ctx) {
    	let first;
    	let current;

    	const task_spread_levels = [
    		{ model: /*task*/ ctx[132].model },
    		{ left: /*task*/ ctx[132].left },
    		{ width: /*task*/ ctx[132].width },
    		{ height: /*task*/ ctx[132].height },
    		{ top: /*task*/ ctx[132].top },
    		/*task*/ ctx[132]
    	];

    	let task_props = {};

    	for (let i = 0; i < task_spread_levels.length; i += 1) {
    		task_props = assign(task_props, task_spread_levels[i]);
    	}

    	const task = new Task({ props: task_props });

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			first = empty();
    			create_component(task.$$.fragment);
    			this.first = first;
    		},
    		m(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(task, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const task_changes = (dirty[0] & /*visibleTasks*/ 1048576)
    			? get_spread_update(task_spread_levels, [
    					{ model: /*task*/ ctx[132].model },
    					{ left: /*task*/ ctx[132].left },
    					{ width: /*task*/ ctx[132].width },
    					{ height: /*task*/ ctx[132].height },
    					{ top: /*task*/ ctx[132].top },
    					get_spread_object(/*task*/ ctx[132])
    				])
    			: {};

    			task.$set(task_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(task.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(task.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(first);
    			destroy_component(task, detaching);
    		}
    	};
    }

    // (606:16) {#each ganttBodyModules as module}
    function create_each_block$2(ctx) {
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ paddingTop: /*paddingTop*/ ctx[17] },
    		{ paddingBottom: /*paddingBottom*/ ctx[18] },
    		{ visibleRows: /*visibleRows*/ ctx[19] },
    		/*$$restProps*/ ctx[46]
    	];

    	var switch_value = /*module*/ ctx[129];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    		switch_instance.$on("init", onModuleInit);
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*paddingTop, paddingBottom, visibleRows*/ 917504 | dirty[1] & /*$$restProps*/ 32768)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*paddingTop*/ 131072 && { paddingTop: /*paddingTop*/ ctx[17] },
    					dirty[0] & /*paddingBottom*/ 262144 && { paddingBottom: /*paddingBottom*/ ctx[18] },
    					dirty[0] & /*visibleRows*/ 524288 && { visibleRows: /*visibleRows*/ ctx[19] },
    					dirty[1] & /*$$restProps*/ 32768 && get_spread_object(/*$$restProps*/ ctx[46])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*module*/ ctx[129])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("init", onModuleInit);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    function create_fragment$8(ctx) {
    	let div9;
    	let t0;
    	let div8;
    	let div2;
    	let div1;
    	let div0;
    	let t1;
    	let each_blocks_4 = [];
    	let each1_lookup = new Map();
    	let div2_resize_listener;
    	let t2;
    	let div7;
    	let div6;
    	let t3;
    	let div4;
    	let div3;
    	let each_blocks_3 = [];
    	let each2_lookup = new Map();
    	let t4;
    	let div5;
    	let each_blocks_2 = [];
    	let each3_lookup = new Map();
    	let t5;
    	let each_blocks_1 = [];
    	let each4_lookup = new Map();
    	let t6;
    	let div7_resize_listener;
    	let div9_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_5 = /*ganttTableModules*/ ctx[5];
    	let each_blocks_5 = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks_5[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	const out = i => transition_out(each_blocks_5[i], 1, 1, () => {
    		each_blocks_5[i] = null;
    	});

    	const columnheader = new ColumnHeader({
    			props: {
    				headers: /*headers*/ ctx[0],
    				columnUnit: /*columnUnit*/ ctx[2],
    				columnOffset: /*columnOffset*/ ctx[3]
    			}
    		});

    	columnheader.$on("dateSelected", /*onDateSelected*/ ctx[45]);
    	let each_value_4 = /*$allTimeRanges*/ ctx[25];
    	const get_key = ctx => /*timeRange*/ ctx[135].model.id;

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		let child_ctx = get_each_context_4(ctx, each_value_4, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks_4[i] = create_each_block_4(key, child_ctx));
    	}

    	const columns_1 = new Columns({
    			props: {
    				columns: /*columns*/ ctx[13],
    				columnStrokeColor: /*columnStrokeColor*/ ctx[7],
    				columnStrokeWidth: /*columnStrokeWidth*/ ctx[8]
    			}
    		});

    	let each_value_3 = /*visibleRows*/ ctx[19];
    	const get_key_1 = ctx => /*row*/ ctx[138].model.id;

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		let child_ctx = get_each_context_3(ctx, each_value_3, i);
    		let key = get_key_1(child_ctx);
    		each2_lookup.set(key, each_blocks_3[i] = create_each_block_3(key, child_ctx));
    	}

    	let each_value_2 = /*$allTimeRanges*/ ctx[25];
    	const get_key_2 = ctx => /*timeRange*/ ctx[135].model.id;

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		let child_ctx = get_each_context_2(ctx, each_value_2, i);
    		let key = get_key_2(child_ctx);
    		each3_lookup.set(key, each_blocks_2[i] = create_each_block_2(key, child_ctx));
    	}

    	let each_value_1 = /*visibleTasks*/ ctx[20];
    	const get_key_3 = ctx => /*task*/ ctx[132].model.id;

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key_3(child_ctx);
    		each4_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
    	}

    	let each_value = /*ganttBodyModules*/ ctx[6];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			div9 = element("div");

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				each_blocks_5[i].c();
    			}

    			t0 = space();
    			div8 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(columnheader.$$.fragment);
    			t1 = space();

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].c();
    			}

    			t2 = space();
    			div7 = element("div");
    			div6 = element("div");
    			create_component(columns_1.$$.fragment);
    			t3 = space();
    			div4 = element("div");
    			div3 = element("div");

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t4 = space();
    			div5 = element("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t5 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div0, "class", "header-container svelte-12fxs8g");
    			set_style(div0, "width", /*$_width*/ ctx[22] + "px");
    			attr(div1, "class", "sg-header-scroller svelte-12fxs8g");
    			attr(div2, "class", "sg-header svelte-12fxs8g");
    			add_render_callback(() => /*div2_elementresize_handler*/ ctx[124].call(div2));
    			toggle_class(div2, "right-scrollbar-visible", /*rightScrollbarVisible*/ ctx[15]);
    			set_style(div3, "transform", "translateY(" + /*paddingTop*/ ctx[17] + "px)");
    			attr(div4, "class", "sg-rows svelte-12fxs8g");
    			set_style(div4, "height", /*rowContainerHeight*/ ctx[16] + "px");
    			attr(div5, "class", "sg-foreground svelte-12fxs8g");
    			attr(div6, "class", "content svelte-12fxs8g");
    			set_style(div6, "width", /*$_width*/ ctx[22] + "px");
    			attr(div7, "class", "sg-timeline-body svelte-12fxs8g");
    			add_render_callback(() => /*div7_elementresize_handler*/ ctx[127].call(div7));
    			toggle_class(div7, "zooming", /*zooming*/ ctx[14]);
    			attr(div8, "class", "sg-timeline sg-view svelte-12fxs8g");
    			attr(div9, "class", div9_class_value = "sg-gantt " + /*classes*/ ctx[4] + " svelte-12fxs8g");
    			toggle_class(div9, "sg-disable-transition", !/*disableTransition*/ ctx[21]);
    		},
    		m(target, anchor) {
    			insert(target, div9, anchor);

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				each_blocks_5[i].m(div9, null);
    			}

    			append(div9, t0);
    			append(div9, div8);
    			append(div8, div2);
    			append(div2, div1);
    			append(div1, div0);
    			mount_component(columnheader, div0, null);
    			append(div0, t1);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].m(div0, null);
    			}

    			/*div2_binding*/ ctx[123](div2);
    			div2_resize_listener = add_resize_listener(div2, /*div2_elementresize_handler*/ ctx[124].bind(div2));
    			append(div8, t2);
    			append(div8, div7);
    			append(div7, div6);
    			mount_component(columns_1, div6, null);
    			append(div6, t3);
    			append(div6, div4);
    			append(div4, div3);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].m(div3, null);
    			}

    			/*div4_binding*/ ctx[125](div4);
    			append(div6, t4);
    			append(div6, div5);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div5, null);
    			}

    			append(div5, t5);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div5, null);
    			}

    			append(div6, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div6, null);
    			}

    			/*div7_binding*/ ctx[126](div7);
    			div7_resize_listener = add_resize_listener(div7, /*div7_elementresize_handler*/ ctx[127].bind(div7));
    			/*div9_binding*/ ctx[128](div9);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(ctx[42].call(null, div1)),
    					action_destroyer(ctx[41].call(null, div7)),
    					listen(div7, "wheel", /*onwheel*/ ctx[44]),
    					listen(div9, "click", onEvent),
    					listen(div9, "mouseover", onEvent)
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*tableWidth, ganttElement, ganttTableModules, rowContainerHeight, paddingTop, paddingBottom, visibleRows*/ 983586 | dirty[1] & /*onResize, $$restProps*/ 36864) {
    				each_value_5 = /*ganttTableModules*/ ctx[5];
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks_5[i]) {
    						each_blocks_5[i].p(child_ctx, dirty);
    						transition_in(each_blocks_5[i], 1);
    					} else {
    						each_blocks_5[i] = create_each_block_5(child_ctx);
    						each_blocks_5[i].c();
    						transition_in(each_blocks_5[i], 1);
    						each_blocks_5[i].m(div9, t0);
    					}
    				}

    				group_outros();

    				for (i = each_value_5.length; i < each_blocks_5.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const columnheader_changes = {};
    			if (dirty[0] & /*headers*/ 1) columnheader_changes.headers = /*headers*/ ctx[0];
    			if (dirty[0] & /*columnUnit*/ 4) columnheader_changes.columnUnit = /*columnUnit*/ ctx[2];
    			if (dirty[0] & /*columnOffset*/ 8) columnheader_changes.columnOffset = /*columnOffset*/ ctx[3];
    			columnheader.$set(columnheader_changes);

    			if (dirty[0] & /*$allTimeRanges*/ 33554432) {
    				const each_value_4 = /*$allTimeRanges*/ ctx[25];
    				group_outros();
    				each_blocks_4 = update_keyed_each(each_blocks_4, dirty, get_key, 1, ctx, each_value_4, each1_lookup, div0, outro_and_destroy_block, create_each_block_4, null, get_each_context_4);
    				check_outros();
    			}

    			if (!current || dirty[0] & /*$_width*/ 4194304) {
    				set_style(div0, "width", /*$_width*/ ctx[22] + "px");
    			}

    			if (dirty[0] & /*rightScrollbarVisible*/ 32768) {
    				toggle_class(div2, "right-scrollbar-visible", /*rightScrollbarVisible*/ ctx[15]);
    			}

    			const columns_1_changes = {};
    			if (dirty[0] & /*columns*/ 8192) columns_1_changes.columns = /*columns*/ ctx[13];
    			if (dirty[0] & /*columnStrokeColor*/ 128) columns_1_changes.columnStrokeColor = /*columnStrokeColor*/ ctx[7];
    			if (dirty[0] & /*columnStrokeWidth*/ 256) columns_1_changes.columnStrokeWidth = /*columnStrokeWidth*/ ctx[8];
    			columns_1.$set(columns_1_changes);

    			if (dirty[0] & /*visibleRows*/ 524288) {
    				const each_value_3 = /*visibleRows*/ ctx[19];
    				group_outros();
    				each_blocks_3 = update_keyed_each(each_blocks_3, dirty, get_key_1, 1, ctx, each_value_3, each2_lookup, div3, outro_and_destroy_block, create_each_block_3, null, get_each_context_3);
    				check_outros();
    			}

    			if (!current || dirty[0] & /*paddingTop*/ 131072) {
    				set_style(div3, "transform", "translateY(" + /*paddingTop*/ ctx[17] + "px)");
    			}

    			if (!current || dirty[0] & /*rowContainerHeight*/ 65536) {
    				set_style(div4, "height", /*rowContainerHeight*/ ctx[16] + "px");
    			}

    			if (dirty[0] & /*$allTimeRanges*/ 33554432) {
    				const each_value_2 = /*$allTimeRanges*/ ctx[25];
    				group_outros();
    				each_blocks_2 = update_keyed_each(each_blocks_2, dirty, get_key_2, 1, ctx, each_value_2, each3_lookup, div5, outro_and_destroy_block, create_each_block_2, t5, get_each_context_2);
    				check_outros();
    			}

    			if (dirty[0] & /*visibleTasks*/ 1048576) {
    				const each_value_1 = /*visibleTasks*/ ctx[20];
    				group_outros();
    				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key_3, 1, ctx, each_value_1, each4_lookup, div5, outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
    				check_outros();
    			}

    			if (dirty[0] & /*ganttBodyModules, paddingTop, paddingBottom, visibleRows*/ 917568 | dirty[1] & /*$$restProps*/ 32768) {
    				each_value = /*ganttBodyModules*/ ctx[6];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div6, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*$_width*/ 4194304) {
    				set_style(div6, "width", /*$_width*/ ctx[22] + "px");
    			}

    			if (dirty[0] & /*zooming*/ 16384) {
    				toggle_class(div7, "zooming", /*zooming*/ ctx[14]);
    			}

    			if (!current || dirty[0] & /*classes*/ 16 && div9_class_value !== (div9_class_value = "sg-gantt " + /*classes*/ ctx[4] + " svelte-12fxs8g")) {
    				attr(div9, "class", div9_class_value);
    			}

    			if (dirty[0] & /*classes, disableTransition*/ 2097168) {
    				toggle_class(div9, "sg-disable-transition", !/*disableTransition*/ ctx[21]);
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_5.length; i += 1) {
    				transition_in(each_blocks_5[i]);
    			}

    			transition_in(columnheader.$$.fragment, local);

    			for (let i = 0; i < each_value_4.length; i += 1) {
    				transition_in(each_blocks_4[i]);
    			}

    			transition_in(columns_1.$$.fragment, local);

    			for (let i = 0; i < each_value_3.length; i += 1) {
    				transition_in(each_blocks_3[i]);
    			}

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks_5 = each_blocks_5.filter(Boolean);

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				transition_out(each_blocks_5[i]);
    			}

    			transition_out(columnheader.$$.fragment, local);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				transition_out(each_blocks_4[i]);
    			}

    			transition_out(columns_1.$$.fragment, local);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				transition_out(each_blocks_3[i]);
    			}

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				transition_out(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div9);
    			destroy_each(each_blocks_5, detaching);
    			destroy_component(columnheader);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].d();
    			}

    			/*div2_binding*/ ctx[123](null);
    			div2_resize_listener();
    			destroy_component(columns_1);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].d();
    			}

    			/*div4_binding*/ ctx[125](null);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].d();
    			}

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].d();
    			}

    			destroy_each(each_blocks, detaching);
    			/*div7_binding*/ ctx[126](null);
    			div7_resize_listener();
    			/*div9_binding*/ ctx[128](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function assertSet(values) {
    	for (const name in values) {
    		if (values[name] == null) {
    			throw new Error(`"${name}" is not set`);
    		}
    	}
    }

    function toDateNum(date) {
    	return date instanceof Date ? date.valueOf() : date;
    }

    function onModuleInit(module) {
    	
    }

    function instance$8($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"rows","tasks","timeRanges","rowPadding","rowHeight","from","to","minWidth","fitWidth","classes","headers","zoomLevels","taskContent","tableWidth","resizeHandleWidth","onTaskButtonClick","dateAdapter","magnetUnit","magnetOffset","columnUnit","columnOffset","ganttTableModules","ganttBodyModules","reflectOnParentRows","reflectOnChildRows","columnStrokeColor","columnStrokeWidth","taskElementHook","columnService","api","taskFactory","rowFactory","dndManager","timeRangeFactory","utils","refreshTimeRanges","refreshTasks","getRowContainer","selectTask","unselectTasks","scrollToRow","scrollToTask","updateTask","updateTasks","updateRow","updateRows","getRow","getTask","getTasks"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $_rowHeight;
    	let $_rowPadding;
    	let $_from;
    	let $_to;
    	let $_minWidth;
    	let $_fitWidth;
    	let $_width;
    	let $columnWidth;
    	let $dimensionsChanged;
    	let $taskStore;
    	let $hoveredRow;
    	let $selectedRow;
    	let $rowStore;
    	let $allTasks;
    	let $allRows;
    	let $rowTaskCache;
    	let $visibleHeight;
    	let $headerHeight;
    	let $allTimeRanges;
    	let $visibleWidth;
    	component_subscribe($$self, taskStore, $$value => $$invalidate(105, $taskStore = $$value));
    	component_subscribe($$self, rowStore, $$value => $$invalidate(108, $rowStore = $$value));
    	component_subscribe($$self, allTasks, $$value => $$invalidate(109, $allTasks = $$value));
    	component_subscribe($$self, allRows, $$value => $$invalidate(110, $allRows = $$value));
    	component_subscribe($$self, rowTaskCache, $$value => $$invalidate(111, $rowTaskCache = $$value));
    	component_subscribe($$self, allTimeRanges, $$value => $$invalidate(25, $allTimeRanges = $$value));

    	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    		function adopt(value) {
    			return value instanceof P
    			? value
    			: new P(function (resolve) {
    						resolve(value);
    					});
    		}

    		return new (P || (P = Promise))(function (resolve, reject) {
    				function fulfilled(value) {
    					try {
    						step(generator.next(value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function rejected(value) {
    					try {
    						step(generator["throw"](value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function step(result) {
    					result.done
    					? resolve(result.value)
    					: adopt(result.value).then(fulfilled, rejected);
    				}

    				step((generator = generator.apply(thisArg, _arguments || [])).next());
    			});
    	};

    	let ganttElement;
    	let mainHeaderContainer;
    	let mainContainer;
    	let rowContainer;
    	let scrollables = [];
    	let mounted = false;
    	
    	
    	let { rows } = $$props;
    	let { tasks = [] } = $$props;
    	let { timeRanges = [] } = $$props;
    	assertSet({ rows });
    	let { rowPadding = 6 } = $$props;
    	let { rowHeight = 52 } = $$props;
    	const _rowHeight = writable(rowHeight);
    	component_subscribe($$self, _rowHeight, value => $$invalidate(97, $_rowHeight = value));
    	const _rowPadding = writable(rowPadding);
    	component_subscribe($$self, _rowPadding, value => $$invalidate(98, $_rowPadding = value));
    	let { from } = $$props;
    	let { to } = $$props;
    	assertSet({ from, to });
    	const _from = writable(toDateNum(from));
    	component_subscribe($$self, _from, value => $$invalidate(99, $_from = value));
    	const _to = writable(toDateNum(to));
    	component_subscribe($$self, _to, value => $$invalidate(100, $_to = value));
    	let { minWidth = 800 } = $$props;
    	let { fitWidth = false } = $$props;
    	const _minWidth = writable(minWidth);
    	component_subscribe($$self, _minWidth, value => $$invalidate(101, $_minWidth = value));
    	const _fitWidth = writable(fitWidth);
    	component_subscribe($$self, _fitWidth, value => $$invalidate(102, $_fitWidth = value));
    	let { classes = [] } = $$props;
    	let { headers = [{ unit: "day", format: "MMMM Do" }, { unit: "hour", format: "H:mm" }] } = $$props;

    	let { zoomLevels = [
    		{
    			headers: [{ unit: "day", format: "DD.MM.YYYY" }, { unit: "hour", format: "HH" }],
    			minWidth: 800,
    			fitWidth: true
    		},
    		{
    			headers: [
    				{ unit: "hour", format: "ddd D/M, H A" },
    				{ unit: "minute", format: "mm", offset: 15 }
    			],
    			minWidth: 5000,
    			fitWidth: false
    		}
    	] } = $$props;

    	let { taskContent = null } = $$props;
    	let { tableWidth = 100 } = $$props;
    	let { resizeHandleWidth = 10 } = $$props;
    	let { onTaskButtonClick = null } = $$props;
    	let { dateAdapter = new NoopSvelteGanttDateAdapter() } = $$props;
    	let { magnetUnit = "minute" } = $$props;
    	let { magnetOffset = 15 } = $$props;
    	let magnetDuration;
    	setMagnetDuration(magnetUnit, magnetOffset);

    	function setMagnetDuration(unit, offset) {
    		if (unit && offset) {
    			$$invalidate(88, magnetDuration = getDuration(unit, offset));
    		}
    	}

    	let { columnUnit = "minute" } = $$props;
    	let { columnOffset = 15 } = $$props;
    	let columnDuration;
    	setColumnDuration(columnUnit, columnOffset);

    	function setColumnDuration(unit, offset) {
    		if (unit && offset) {
    			$$invalidate(89, columnDuration = getDuration(unit, offset));
    		}
    	}

    	let { ganttTableModules = [] } = $$props;
    	let { ganttBodyModules = [] } = $$props;
    	let { reflectOnParentRows = true } = $$props;
    	let { reflectOnChildRows = false } = $$props;
    	let { columnStrokeColor } = $$props;
    	let { columnStrokeWidth } = $$props;
    	let { taskElementHook = null } = $$props;
    	const visibleWidth = writable(null);
    	component_subscribe($$self, visibleWidth, value => $$invalidate(26, $visibleWidth = value));
    	const visibleHeight = writable(null);
    	component_subscribe($$self, visibleHeight, value => $$invalidate(23, $visibleHeight = value));
    	const headerHeight = writable(null);
    	component_subscribe($$self, headerHeight, value => $$invalidate(24, $headerHeight = value));

    	const _width = derived([visibleWidth, _minWidth, _fitWidth], ([visible, min, stretch]) => {
    		return stretch && visible > min ? visible : min;
    	});

    	component_subscribe($$self, _width, value => $$invalidate(22, $_width = value));

    	const columnService = {
    		getColumnByDate(date) {
    			const pair = findByDate(columns, date);
    			return !pair[0] ? pair[1] : pair[0];
    		},
    		getColumnByPosition(x) {
    			const pair = findByPosition(columns, x);
    			return !pair[0] ? pair[1] : pair[0];
    		},
    		getPositionByDate(date) {
    			if (!date) return null;
    			const column = this.getColumnByDate(date);
    			let durationTo = date - column.from;
    			const position = durationTo / column.duration * column.width;

    			//multiples - skip every nth col, use other duration
    			return column.left + position;
    		},
    		getDateByPosition(x) {
    			const column = this.getColumnByPosition(x);
    			x = x - column.left;
    			let positionDuration = column.duration / column.width * x;
    			const date = column.from + positionDuration;
    			return date;
    		},
    		/**
     *
     * @param {number} date - Date
     * @returns {number} rounded date passed as parameter
     */
    		roundTo(date) {
    			let value = Math.round(date / magnetDuration) * magnetDuration;
    			return value;
    		}
    	};

    	const columnWidth = writable(getPositionByDate($_from + columnDuration, $_from, $_to, $_width) | 0);
    	component_subscribe($$self, columnWidth, value => $$invalidate(103, $columnWidth = value));
    	let columnCount = Math.ceil($_width / $columnWidth);
    	let columns = getColumns($_from, columnCount, columnDuration, $columnWidth);

    	function getColumns(from, count, dur, width) {
    		if (!isFinite(count)) throw new Error("column count is not a finite number");
    		if (width <= 0) throw new Error("column width is not a positive number");
    		let columns = [];
    		let columnFrom = from;
    		let left = 0;

    		for (let i = 0; i < count; i++) {
    			const from = columnFrom;
    			const to = columnFrom + dur;
    			const duration = to - from;
    			columns.push({ width, from, left, duration });
    			left += width;
    			columnFrom = to;
    		}

    		return columns;
    	}

    	const dimensionsChanged = derived([columnWidth, _from, _to], () => ({}));
    	component_subscribe($$self, dimensionsChanged, value => $$invalidate(104, $dimensionsChanged = value));

    	setContext("dimensions", {
    		from: _from,
    		to: _to,
    		width: _width,
    		visibleWidth,
    		visibleHeight,
    		headerHeight,
    		dimensionsChanged
    	});

    	setContext("options", {
    		dateAdapter,
    		taskElementHook,
    		taskContent,
    		rowPadding: _rowPadding,
    		rowHeight: _rowHeight,
    		resizeHandleWidth,
    		reflectOnParentRows,
    		reflectOnChildRows,
    		onTaskButtonClick
    	});

    	const hoveredRow = writable(null);
    	component_subscribe($$self, hoveredRow, value => $$invalidate(106, $hoveredRow = value));
    	const selectedRow = writable(null);
    	component_subscribe($$self, selectedRow, value => $$invalidate(107, $selectedRow = value));
    	const ganttContext = { scrollables, hoveredRow, selectedRow };
    	setContext("gantt", ganttContext);

    	onMount(() => {
    		Object.assign(ganttContext, {
    			rowContainer,
    			mainContainer,
    			mainHeaderContainer
    		});

    		api.registerEvent("tasks", "move");
    		api.registerEvent("tasks", "select");
    		api.registerEvent("tasks", "switchRow");
    		api.registerEvent("tasks", "moveEnd");
    		api.registerEvent("tasks", "change");
    		api.registerEvent("tasks", "changed");
    		api.registerEvent("gantt", "viewChanged");
    		$$invalidate(87, mounted = true);
    	});

    	onDelegatedEvent("click", "data-task-id", (event, data, target) => {
    		const taskId = +data;

    		if (event.ctrlKey) {
    			selectionManager.toggleSelection(taskId);
    		} else {
    			selectionManager.selectSingle(taskId);
    		}

    		api["tasks"].raise.select($taskStore.entities[taskId]);
    	});

    	onDelegatedEvent("mouseover", "data-row-id", (event, data, target) => {
    		set_store_value(hoveredRow, $hoveredRow = +data);
    	});

    	onDelegatedEvent("click", "data-row-id", (event, data, target) => {
    		set_store_value(selectedRow, $selectedRow = +data);
    	});

    	onDestroy(() => {
    		offDelegatedEvent("click", "data-task-id");
    		offDelegatedEvent("click", "data-row-id");
    	});

    	let __scrollTop = 0;
    	let __scrollLeft = 0;

    	function scrollable(node) {
    		const onscroll = event => {
    			const { scrollTop, scrollLeft } = node;

    			scrollables.forEach(scrollable => {
    				if (scrollable.orientation === "horizontal") {
    					scrollable.node.scrollLeft = scrollLeft;
    				} else {
    					scrollable.node.scrollTop = scrollTop;
    				}
    			});

    			$$invalidate(91, __scrollTop = scrollTop);
    			__scrollLeft = scrollLeft;
    		};

    		node.addEventListener("scroll", onscroll);

    		return {
    			destroy() {
    				node.removeEventListener("scroll", onscroll, false);
    			}
    		};
    	}

    	function horizontalScrollListener(node) {
    		scrollables.push({ node, orientation: "horizontal" });
    	}

    	function onResize(event) {
    		$$invalidate(1, tableWidth = event.detail.left);
    	}

    	let zoomLevel = 0;
    	let zooming = false;

    	function onwheel(event) {
    		return __awaiter(this, void 0, void 0, function* () {
    			if (event.ctrlKey) {
    				event.preventDefault();
    				const prevZoomLevel = zoomLevel;

    				if (event.deltaY > 0) {
    					zoomLevel = Math.max(zoomLevel - 1, 0);
    				} else {
    					zoomLevel = Math.min(zoomLevel + 1, zoomLevels.length - 1);
    				}

    				if (prevZoomLevel != zoomLevel && zoomLevels[zoomLevel]) {
    					const options = Object.assign(
    						{
    							columnUnit,
    							columnOffset,
    							minWidth: $_minWidth
    						},
    						zoomLevels[zoomLevel]
    					);

    					const scale = options.minWidth / $_width;
    					const node = mainContainer;
    					const mousepos = getRelativePos(node, event);
    					const before = node.scrollLeft + mousepos.x;
    					const after = before * scale;
    					const scrollLeft = after - mousepos.x + node.clientWidth / 2;
    					console.log("scrollLeft", scrollLeft);
    					$$invalidate(2, columnUnit = options.columnUnit);
    					$$invalidate(3, columnOffset = options.columnOffset);
    					set_store_value(_minWidth, $_minWidth = options.minWidth);
    					if (options.headers) $$invalidate(0, headers = options.headers);
    					if (options.fitWidth) set_store_value(_fitWidth, $_fitWidth = options.fitWidth);
    					api["gantt"].raise.viewChanged();
    					$$invalidate(14, zooming = true);
    					yield tick();
    					node.scrollLeft = scrollLeft;
    					$$invalidate(14, zooming = false);
    				}
    			}
    		});
    	}

    	function onDateSelected(event) {
    		set_store_value(_from, $_from = event.detail.from);
    		set_store_value(_to, $_to = event.detail.to);
    	}

    	function initRows(rowsData) {
    		const rows = rowFactory.createRows(rowsData);
    		rowStore.addAll(rows);
    	}

    	function initTasks(taskData) {
    		return __awaiter(this, void 0, void 0, function* () {
    			yield tick();
    			const tasks = [];
    			const opts = { rowPadding: $_rowPadding };

    			taskData.forEach(t => {
    				const task = taskFactory.createTask(t);
    				const row = $rowStore.entities[task.model.resourceId];
    				task.reflections = [];

    				if (reflectOnChildRows && row.allChildren) {
    					row.allChildren.forEach(r => {
    						const reflectedTask = reflectTask(task, r, opts);
    						task.reflections.push(reflectedTask.model.id);
    						tasks.push(reflectedTask);
    					});
    				}

    				if (reflectOnParentRows && row.allParents.length > 0) {
    					row.allParents.forEach(r => {
    						const reflectedTask = reflectTask(task, r, opts);
    						task.reflections.push(reflectedTask.model.id);
    						tasks.push(reflectedTask);
    					});
    				}

    				tasks.push(task);
    			});

    			taskStore.addAll(tasks);
    		});
    	}

    	function initTimeRanges(timeRangeData) {
    		const timeRanges = timeRangeData.map(timeRange => {
    			return timeRangeFactory.create(timeRange);
    		});

    		timeRangeStore.addAll(timeRanges);
    	}

    	function tickWithoutCSSTransition() {
    		return __awaiter(this, void 0, void 0, function* () {
    			$$invalidate(21, disableTransition = false);
    			yield tick();
    			ganttElement.offsetHeight; // force a reflow
    			$$invalidate(21, disableTransition = true);
    		});
    	}

    	const api = new GanttApi();
    	const selectionManager = new SelectionManager();
    	const taskFactory = new TaskFactory(columnService);
    	const rowFactory = new RowFactory();
    	const dndManager = new DragDropManager(rowStore);
    	const timeRangeFactory = new TimeRangeFactory(columnService);
    	const utils = new GanttUtils();

    	setContext("services", {
    		utils,
    		api,
    		dndManager,
    		selectionManager,
    		columnService
    	});

    	function refreshTimeRanges() {
    		timeRangeStore._update(({ ids, entities }) => {
    			ids.forEach(id => {
    				const timeRange = entities[id];
    				const newLeft = columnService.getPositionByDate(timeRange.model.from) | 0;
    				const newRight = columnService.getPositionByDate(timeRange.model.to) | 0;
    				timeRange.left = newLeft;
    				timeRange.width = newRight - newLeft;
    			});

    			return { ids, entities };
    		});
    	}

    	function refreshTasks() {
    		$allTasks.forEach(task => {
    			const newLeft = columnService.getPositionByDate(task.model.from) | 0;
    			const newRight = columnService.getPositionByDate(task.model.to) | 0;
    			task.left = newLeft;
    			task.width = newRight - newLeft;
    		});

    		taskStore.refresh();
    	}

    	function getRowContainer() {
    		return rowContainer;
    	}

    	function selectTask(id) {
    		const task = $taskStore.entities[id];

    		if (task) {
    			selectionManager.selectSingle(task);
    		}
    	}

    	function unselectTasks() {
    		selectionManager.clearSelection();
    	}

    	function scrollToRow(id, scrollBehavior = "auto") {
    		const { scrollTop, clientHeight } = mainContainer;
    		const index = $allRows.findIndex(r => r.model.id == id);
    		if (index === -1) return;
    		const targetTop = index * rowHeight;

    		if (targetTop < scrollTop) {
    			mainContainer.scrollTo({ top: targetTop, behavior: scrollBehavior });
    		}

    		if (targetTop > scrollTop + clientHeight) {
    			mainContainer.scrollTo({
    				top: targetTop + rowHeight - clientHeight,
    				behavior: scrollBehavior
    			});
    		}
    	}

    	function scrollToTask(id, scrollBehavior = "auto") {
    		const { scrollLeft, scrollTop, clientWidth, clientHeight } = mainContainer;
    		const task = $taskStore.entities[id];
    		if (!task) return;
    		const targetLeft = task.left;
    		const rowIndex = $allRows.findIndex(r => r.model.id == task.model.resourceId);
    		const targetTop = rowIndex * rowHeight;

    		const options = {
    			top: undefined,
    			left: undefined,
    			behavior: scrollBehavior
    		};

    		if (targetLeft < scrollLeft) {
    			options.left = targetLeft;
    		}

    		if (targetLeft > scrollLeft + clientWidth) {
    			options.left = targetLeft + task.width - clientWidth;
    		}

    		if (targetTop < scrollTop) {
    			options.top = targetTop;
    		}

    		if (targetTop > scrollTop + clientHeight) {
    			options.top = targetTop + rowHeight - clientHeight;
    		}

    		mainContainer.scrollTo(options);
    	}

    	function updateTask(model) {
    		const task = taskFactory.createTask(model);
    		taskStore.upsert(task);
    	}

    	function updateTasks(taskModels) {
    		const tasks = taskModels.map(model => taskFactory.createTask(model));
    		taskStore.upsertAll(tasks);
    	}

    	function updateRow(model) {
    		const row = rowFactory.createRow(model, null);
    		rowStore.upsert(row);
    	}

    	function updateRows(rowModels) {
    		const rows = rowModels.map(model => rowFactory.createRow(model, null));
    		rowStore.upsertAll(rows);
    	}

    	function getRow(resourceId) {
    		return $rowStore.entities[resourceId];
    	}

    	function getTask(id) {
    		return $taskStore.entities[id];
    	}

    	function getTasks(resourceId) {
    		if ($rowTaskCache[resourceId]) {
    			return $rowTaskCache[resourceId].map(id => $taskStore.entities[id]);
    		}

    		return null;
    	}

    	let filteredRows = [];
    	let rightScrollbarVisible;
    	let rowContainerHeight;
    	let startIndex;
    	let endIndex;
    	let paddingTop = 0;
    	let paddingBottom = 0;
    	let visibleRows = [];
    	let visibleTasks;
    	let disableTransition = true;

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(10, mainHeaderContainer = $$value);
    		});
    	}

    	function div2_elementresize_handler() {
    		$headerHeight = this.clientHeight;
    		headerHeight.set($headerHeight);
    	}

    	function div4_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(12, rowContainer = $$value);
    		});
    	}

    	function div7_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(11, mainContainer = $$value);
    		});
    	}

    	function div7_elementresize_handler() {
    		$visibleHeight = this.clientHeight;
    		visibleHeight.set($visibleHeight);
    		$visibleWidth = this.clientWidth;
    		visibleWidth.set($visibleWidth);
    	}

    	function div9_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(9, ganttElement = $$value);
    		});
    	}

    	$$self.$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(46, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("rows" in $$new_props) $$invalidate(50, rows = $$new_props.rows);
    		if ("tasks" in $$new_props) $$invalidate(51, tasks = $$new_props.tasks);
    		if ("timeRanges" in $$new_props) $$invalidate(52, timeRanges = $$new_props.timeRanges);
    		if ("rowPadding" in $$new_props) $$invalidate(53, rowPadding = $$new_props.rowPadding);
    		if ("rowHeight" in $$new_props) $$invalidate(54, rowHeight = $$new_props.rowHeight);
    		if ("from" in $$new_props) $$invalidate(55, from = $$new_props.from);
    		if ("to" in $$new_props) $$invalidate(56, to = $$new_props.to);
    		if ("minWidth" in $$new_props) $$invalidate(57, minWidth = $$new_props.minWidth);
    		if ("fitWidth" in $$new_props) $$invalidate(58, fitWidth = $$new_props.fitWidth);
    		if ("classes" in $$new_props) $$invalidate(4, classes = $$new_props.classes);
    		if ("headers" in $$new_props) $$invalidate(0, headers = $$new_props.headers);
    		if ("zoomLevels" in $$new_props) $$invalidate(59, zoomLevels = $$new_props.zoomLevels);
    		if ("taskContent" in $$new_props) $$invalidate(60, taskContent = $$new_props.taskContent);
    		if ("tableWidth" in $$new_props) $$invalidate(1, tableWidth = $$new_props.tableWidth);
    		if ("resizeHandleWidth" in $$new_props) $$invalidate(61, resizeHandleWidth = $$new_props.resizeHandleWidth);
    		if ("onTaskButtonClick" in $$new_props) $$invalidate(62, onTaskButtonClick = $$new_props.onTaskButtonClick);
    		if ("dateAdapter" in $$new_props) $$invalidate(63, dateAdapter = $$new_props.dateAdapter);
    		if ("magnetUnit" in $$new_props) $$invalidate(64, magnetUnit = $$new_props.magnetUnit);
    		if ("magnetOffset" in $$new_props) $$invalidate(65, magnetOffset = $$new_props.magnetOffset);
    		if ("columnUnit" in $$new_props) $$invalidate(2, columnUnit = $$new_props.columnUnit);
    		if ("columnOffset" in $$new_props) $$invalidate(3, columnOffset = $$new_props.columnOffset);
    		if ("ganttTableModules" in $$new_props) $$invalidate(5, ganttTableModules = $$new_props.ganttTableModules);
    		if ("ganttBodyModules" in $$new_props) $$invalidate(6, ganttBodyModules = $$new_props.ganttBodyModules);
    		if ("reflectOnParentRows" in $$new_props) $$invalidate(66, reflectOnParentRows = $$new_props.reflectOnParentRows);
    		if ("reflectOnChildRows" in $$new_props) $$invalidate(67, reflectOnChildRows = $$new_props.reflectOnChildRows);
    		if ("columnStrokeColor" in $$new_props) $$invalidate(7, columnStrokeColor = $$new_props.columnStrokeColor);
    		if ("columnStrokeWidth" in $$new_props) $$invalidate(8, columnStrokeWidth = $$new_props.columnStrokeWidth);
    		if ("taskElementHook" in $$new_props) $$invalidate(68, taskElementHook = $$new_props.taskElementHook);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[1] & /*rows*/ 524288 | $$self.$$.dirty[2] & /*mounted*/ 33554432) {
    			 if (mounted) initRows(rows);
    		}

    		if ($$self.$$.dirty[1] & /*tasks*/ 1048576 | $$self.$$.dirty[2] & /*mounted*/ 33554432) {
    			 if (mounted) initTasks(tasks);
    		}

    		if ($$self.$$.dirty[1] & /*timeRanges*/ 2097152 | $$self.$$.dirty[2] & /*mounted*/ 33554432) {
    			 if (mounted) initTimeRanges(timeRanges);
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608) {
    			 set_store_value(_rowHeight, $_rowHeight = rowHeight);
    		}

    		if ($$self.$$.dirty[1] & /*rowPadding*/ 4194304) {
    			 set_store_value(_rowPadding, $_rowPadding = rowPadding);
    		}

    		if ($$self.$$.dirty[1] & /*from*/ 16777216) {
    			 set_store_value(_from, $_from = toDateNum(from));
    		}

    		if ($$self.$$.dirty[1] & /*to*/ 33554432) {
    			 set_store_value(_to, $_to = toDateNum(to));
    		}

    		if ($$self.$$.dirty[1] & /*minWidth, fitWidth*/ 201326592) {
    			 {
    				set_store_value(_minWidth, $_minWidth = minWidth);
    				set_store_value(_fitWidth, $_fitWidth = fitWidth);
    			}
    		}

    		if ($$self.$$.dirty[2] & /*magnetUnit, magnetOffset*/ 12) {
    			 setMagnetDuration(magnetUnit, magnetOffset);
    		}

    		if ($$self.$$.dirty[0] & /*columnUnit, columnOffset*/ 12) {
    			 setColumnDuration(columnUnit, columnOffset);
    		}

    		if ($$self.$$.dirty[0] & /*$_width*/ 4194304 | $$self.$$.dirty[2] & /*columnDuration*/ 134217728 | $$self.$$.dirty[3] & /*$_from, $_to*/ 192) {
    			 set_store_value(columnWidth, $columnWidth = getPositionByDate($_from + columnDuration, $_from, $_to, $_width) | 0);
    		}

    		if ($$self.$$.dirty[0] & /*$_width*/ 4194304 | $$self.$$.dirty[3] & /*$columnWidth*/ 1024) {
    			 $$invalidate(90, columnCount = Math.ceil($_width / $columnWidth));
    		}

    		if ($$self.$$.dirty[2] & /*columnCount, columnDuration*/ 402653184 | $$self.$$.dirty[3] & /*$_from, $columnWidth*/ 1088) {
    			 $$invalidate(13, columns = getColumns($_from, columnCount, columnDuration, $columnWidth));
    		}

    		if ($$self.$$.dirty[3] & /*$dimensionsChanged*/ 2048) {
    			 {
    				if ($dimensionsChanged) {
    					refreshTasks();
    					refreshTimeRanges();
    				}
    			}
    		}

    		if ($$self.$$.dirty[3] & /*$_rowPadding, $rowStore*/ 32800) {
    			 {
    				$$invalidate(47, taskFactory.rowPadding = $_rowPadding, taskFactory);
    				$$invalidate(47, taskFactory.rowEntities = $rowStore.entities, taskFactory);
    			}
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608) {
    			 $$invalidate(48, rowFactory.rowHeight = rowHeight, rowFactory);
    		}

    		if ($$self.$$.dirty[0] & /*$_width*/ 4194304 | $$self.$$.dirty[2] & /*magnetOffset, magnetUnit, magnetDuration, columnCount, columnDuration*/ 469762060 | $$self.$$.dirty[3] & /*$_from, $_to, $columnWidth*/ 1216) {
    			 {
    				$$invalidate(49, utils.from = $_from, utils);
    				$$invalidate(49, utils.to = $_to, utils);
    				$$invalidate(49, utils.width = $_width, utils);
    				$$invalidate(49, utils.magnetOffset = magnetOffset, utils);
    				$$invalidate(49, utils.magnetUnit = magnetUnit, utils);
    				$$invalidate(49, utils.magnetDuration = magnetDuration, utils);
    				$$invalidate(49, utils.totalColumnDuration = columnCount * columnDuration, utils);
    				$$invalidate(49, utils.totalColumnWidth = columnCount * $columnWidth, utils);
    			}
    		}

    		if ($$self.$$.dirty[3] & /*$allRows*/ 131072) {
    			 $$invalidate(94, filteredRows = $allRows.filter(row => !row.hidden));
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608 | $$self.$$.dirty[3] & /*filteredRows*/ 2) {
    			 $$invalidate(16, rowContainerHeight = filteredRows.length * rowHeight);
    		}

    		if ($$self.$$.dirty[0] & /*rowContainerHeight, $visibleHeight*/ 8454144) {
    			 $$invalidate(15, rightScrollbarVisible = rowContainerHeight > $visibleHeight);
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608 | $$self.$$.dirty[2] & /*__scrollTop*/ 536870912) {
    			 $$invalidate(95, startIndex = Math.floor(__scrollTop / rowHeight));
    		}

    		if ($$self.$$.dirty[0] & /*$visibleHeight*/ 8388608 | $$self.$$.dirty[1] & /*rowHeight*/ 8388608 | $$self.$$.dirty[3] & /*startIndex, filteredRows*/ 6) {
    			 $$invalidate(96, endIndex = Math.min(startIndex + Math.ceil($visibleHeight / rowHeight), filteredRows.length - 1));
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608 | $$self.$$.dirty[3] & /*startIndex*/ 4) {
    			 $$invalidate(17, paddingTop = startIndex * rowHeight);
    		}

    		if ($$self.$$.dirty[1] & /*rowHeight*/ 8388608 | $$self.$$.dirty[3] & /*filteredRows, endIndex*/ 10) {
    			 $$invalidate(18, paddingBottom = (filteredRows.length - endIndex - 1) * rowHeight);
    		}

    		if ($$self.$$.dirty[3] & /*filteredRows, startIndex, endIndex*/ 14) {
    			 $$invalidate(19, visibleRows = filteredRows.slice(startIndex, endIndex + 1));
    		}

    		if ($$self.$$.dirty[0] & /*visibleRows*/ 524288 | $$self.$$.dirty[3] & /*$rowTaskCache, $taskStore*/ 266240) {
    			 {
    				const tasks = [];

    				visibleRows.forEach(row => {
    					if ($rowTaskCache[row.model.id]) {
    						$rowTaskCache[row.model.id].forEach(id => {
    							tasks.push($taskStore.entities[id]);
    						});
    					}
    				});

    				$$invalidate(20, visibleTasks = tasks);
    			}
    		}

    		if ($$self.$$.dirty[3] & /*$dimensionsChanged*/ 2048) {
    			 if ($dimensionsChanged) tickWithoutCSSTransition();
    		}
    	};

    	return [
    		headers,
    		tableWidth,
    		columnUnit,
    		columnOffset,
    		classes,
    		ganttTableModules,
    		ganttBodyModules,
    		columnStrokeColor,
    		columnStrokeWidth,
    		ganttElement,
    		mainHeaderContainer,
    		mainContainer,
    		rowContainer,
    		columns,
    		zooming,
    		rightScrollbarVisible,
    		rowContainerHeight,
    		paddingTop,
    		paddingBottom,
    		visibleRows,
    		visibleTasks,
    		disableTransition,
    		$_width,
    		$visibleHeight,
    		$headerHeight,
    		$allTimeRanges,
    		$visibleWidth,
    		_rowHeight,
    		_rowPadding,
    		_from,
    		_to,
    		_minWidth,
    		_fitWidth,
    		visibleWidth,
    		visibleHeight,
    		headerHeight,
    		_width,
    		columnWidth,
    		dimensionsChanged,
    		hoveredRow,
    		selectedRow,
    		scrollable,
    		horizontalScrollListener,
    		onResize,
    		onwheel,
    		onDateSelected,
    		$$restProps,
    		taskFactory,
    		rowFactory,
    		utils,
    		rows,
    		tasks,
    		timeRanges,
    		rowPadding,
    		rowHeight,
    		from,
    		to,
    		minWidth,
    		fitWidth,
    		zoomLevels,
    		taskContent,
    		resizeHandleWidth,
    		onTaskButtonClick,
    		dateAdapter,
    		magnetUnit,
    		magnetOffset,
    		reflectOnParentRows,
    		reflectOnChildRows,
    		taskElementHook,
    		columnService,
    		api,
    		dndManager,
    		timeRangeFactory,
    		refreshTimeRanges,
    		refreshTasks,
    		getRowContainer,
    		selectTask,
    		unselectTasks,
    		scrollToRow,
    		scrollToTask,
    		updateTask,
    		updateTasks,
    		updateRow,
    		updateRows,
    		getRow,
    		getTask,
    		getTasks,
    		mounted,
    		magnetDuration,
    		columnDuration,
    		columnCount,
    		__scrollTop,
    		__scrollLeft,
    		zoomLevel,
    		filteredRows,
    		startIndex,
    		endIndex,
    		$_rowHeight,
    		$_rowPadding,
    		$_from,
    		$_to,
    		$_minWidth,
    		$_fitWidth,
    		$columnWidth,
    		$dimensionsChanged,
    		$taskStore,
    		$hoveredRow,
    		$selectedRow,
    		$rowStore,
    		$allTasks,
    		$allRows,
    		$rowTaskCache,
    		__awaiter,
    		scrollables,
    		setMagnetDuration,
    		setColumnDuration,
    		getColumns,
    		ganttContext,
    		initRows,
    		initTasks,
    		initTimeRanges,
    		tickWithoutCSSTransition,
    		selectionManager,
    		div2_binding,
    		div2_elementresize_handler,
    		div4_binding,
    		div7_binding,
    		div7_elementresize_handler,
    		div9_binding
    	];
    }

    class Gantt extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(
    			this,
    			options,
    			instance$8,
    			create_fragment$8,
    			safe_not_equal,
    			{
    				rows: 50,
    				tasks: 51,
    				timeRanges: 52,
    				rowPadding: 53,
    				rowHeight: 54,
    				from: 55,
    				to: 56,
    				minWidth: 57,
    				fitWidth: 58,
    				classes: 4,
    				headers: 0,
    				zoomLevels: 59,
    				taskContent: 60,
    				tableWidth: 1,
    				resizeHandleWidth: 61,
    				onTaskButtonClick: 62,
    				dateAdapter: 63,
    				magnetUnit: 64,
    				magnetOffset: 65,
    				columnUnit: 2,
    				columnOffset: 3,
    				ganttTableModules: 5,
    				ganttBodyModules: 6,
    				reflectOnParentRows: 66,
    				reflectOnChildRows: 67,
    				columnStrokeColor: 7,
    				columnStrokeWidth: 8,
    				taskElementHook: 68,
    				columnService: 69,
    				api: 70,
    				taskFactory: 47,
    				rowFactory: 48,
    				dndManager: 71,
    				timeRangeFactory: 72,
    				utils: 49,
    				refreshTimeRanges: 73,
    				refreshTasks: 74,
    				getRowContainer: 75,
    				selectTask: 76,
    				unselectTasks: 77,
    				scrollToRow: 78,
    				scrollToTask: 79,
    				updateTask: 80,
    				updateTasks: 81,
    				updateRow: 82,
    				updateRows: 83,
    				getRow: 84,
    				getTask: 85,
    				getTasks: 86
    			},
    			[-1, -1, -1, -1, -1]
    		);
    	}

    	get columnService() {
    		return this.$$.ctx[69];
    	}

    	get api() {
    		return this.$$.ctx[70];
    	}

    	get taskFactory() {
    		return this.$$.ctx[47];
    	}

    	get rowFactory() {
    		return this.$$.ctx[48];
    	}

    	get dndManager() {
    		return this.$$.ctx[71];
    	}

    	get timeRangeFactory() {
    		return this.$$.ctx[72];
    	}

    	get utils() {
    		return this.$$.ctx[49];
    	}

    	get refreshTimeRanges() {
    		return this.$$.ctx[73];
    	}

    	get refreshTasks() {
    		return this.$$.ctx[74];
    	}

    	get getRowContainer() {
    		return this.$$.ctx[75];
    	}

    	get selectTask() {
    		return this.$$.ctx[76];
    	}

    	get unselectTasks() {
    		return this.$$.ctx[77];
    	}

    	get scrollToRow() {
    		return this.$$.ctx[78];
    	}

    	get scrollToTask() {
    		return this.$$.ctx[79];
    	}

    	get updateTask() {
    		return this.$$.ctx[80];
    	}

    	get updateTasks() {
    		return this.$$.ctx[81];
    	}

    	get updateRow() {
    		return this.$$.ctx[82];
    	}

    	get updateRows() {
    		return this.$$.ctx[83];
    	}

    	get getRow() {
    		return this.$$.ctx[84];
    	}

    	get getTask() {
    		return this.$$.ctx[85];
    	}

    	get getTasks() {
    		return this.$$.ctx[86];
    	}
    }

    var css_248z$b = ".sg-tree-expander.svelte-1tpezbv{cursor:pointer;min-width:1.4em;display:flex;justify-content:center;align-items:center}.sg-cell-inner.svelte-1tpezbv{display:flex}";
    styleInject(css_248z$b);

    /* src\modules\table\TableTreeCell.svelte generated by Svelte v3.23.0 */

    function create_if_block$2(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*row*/ ctx[0].expanded) return create_if_block_1$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			div = element("div");
    			if_block.c();
    			attr(div, "class", "sg-tree-expander svelte-1tpezbv");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen(div, "click", /*onExpandToggle*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (20:12) {:else}
    function create_else_block$1(ctx) {
    	let i;

    	return {
    		c() {
    			i = element("i");
    			attr(i, "class", "fas fa-angle-right");
    		},
    		m(target, anchor) {
    			insert(target, i, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(i);
    		}
    	};
    }

    // (18:12) {#if row.expanded}
    function create_if_block_1$1(ctx) {
    	let i;

    	return {
    		c() {
    			i = element("i");
    			attr(i, "class", "fas fa-angle-down");
    		},
    		m(target, anchor) {
    			insert(target, i, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(i);
    		}
    	};
    }

    function create_fragment$9(ctx) {
    	let div;
    	let t;
    	let current;
    	let if_block = /*row*/ ctx[0].children && create_if_block$2(ctx);
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	return {
    		c() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			attr(div, "class", "sg-cell-inner svelte-1tpezbv");
    			set_style(div, "padding-left", /*row*/ ctx[0].childLevel * 3 + "em");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append(div, t);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*row*/ ctx[0].children) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*row*/ 1) {
    				set_style(div, "padding-left", /*row*/ ctx[0].childLevel * 3 + "em");
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$9($$self, $$props, $$invalidate) {
    	
    	let { row } = $$props;
    	const dispatch = createEventDispatcher();

    	function onExpandToggle() {
    		if (row.expanded) {
    			dispatch("rowCollapsed", { row });
    		} else {
    			dispatch("rowExpanded", { row });
    		}
    	}

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("row" in $$props) $$invalidate(0, row = $$props.row);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	return [row, onExpandToggle, dispatch, $$scope, $$slots];
    }

    class TableTreeCell extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { row: 0 });
    	}
    }

    var css_248z$c = ".sg-table-row.svelte-1d4m2ui{display:inline-flex;min-width:100%;align-items:stretch;position:relative;font-weight:400;font-size:14px}.sg-table-cell.svelte-1d4m2ui{border-left:1px solid #eee}.sg-table-body-cell.svelte-1d4m2ui{border-bottom:#efefef 1px solid;background-color:#fff;font-weight:bold}.sg-resource-image.svelte-1d4m2ui{width:2.4em;height:2.4em;border-radius:50%;margin-right:.6em;background:#047c69}.sg-resource-info.svelte-1d4m2ui{flex:1;height:100%;display:flex;flex-direction:row;align-items:center}.sg-table-icon.svelte-1d4m2ui{margin-right:0.5em}";
    styleInject(css_248z$c);

    /* src\modules\table\TableRow.svelte generated by Svelte v3.23.0 */

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (40:12) {:else}
    function create_else_block_1(ctx) {
    	let t;
    	let if_block1_anchor;
    	let if_block0 = /*row*/ ctx[1].model.iconClass && create_if_block_7(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*row*/ ctx[1].model.headerHtml) return create_if_block_4$1;
    		if (/*header*/ ctx[12].renderer) return create_if_block_5;
    		if (/*header*/ ctx[12].type === "resourceInfo") return create_if_block_6;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_2(ctx);
    	let if_block1 = current_block_type(ctx);

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t, anchor);
    			if_block1.m(target, anchor);
    			insert(target, if_block1_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (/*row*/ ctx[1].model.iconClass) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t);
    			if_block1.d(detaching);
    			if (detaching) detach(if_block1_anchor);
    		}
    	};
    }

    // (24:12) {#if header.type == 'tree'}
    function create_if_block$3(ctx) {
    	let current;

    	const tabletreecell = new TableTreeCell({
    			props: {
    				row: /*row*/ ctx[1],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			}
    		});

    	tabletreecell.$on("rowCollapsed", /*rowCollapsed_handler*/ ctx[10]);
    	tabletreecell.$on("rowExpanded", /*rowExpanded_handler*/ ctx[11]);

    	return {
    		c() {
    			create_component(tabletreecell.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(tabletreecell, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const tabletreecell_changes = {};
    			if (dirty & /*row*/ 2) tabletreecell_changes.row = /*row*/ ctx[1];

    			if (dirty & /*$$scope, row, headers*/ 32771) {
    				tabletreecell_changes.$$scope = { dirty, ctx };
    			}

    			tabletreecell.$set(tabletreecell_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(tabletreecell.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(tabletreecell.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(tabletreecell, detaching);
    		}
    	};
    }

    // (41:16) {#if row.model.iconClass}
    function create_if_block_7(ctx) {
    	let div;
    	let i;
    	let i_class_value;

    	return {
    		c() {
    			div = element("div");
    			i = element("i");
    			attr(i, "class", i_class_value = "" + (null_to_empty(/*row*/ ctx[1].model.iconClass) + " svelte-1d4m2ui"));
    			attr(div, "class", "sg-table-icon svelte-1d4m2ui");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, i);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 2 && i_class_value !== (i_class_value = "" + (null_to_empty(/*row*/ ctx[1].model.iconClass) + " svelte-1d4m2ui"))) {
    				attr(i, "class", i_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (56:16) {:else}
    function create_else_block_2(ctx) {
    	let t_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "";
    	let t;

    	return {
    		c() {
    			t = text(t_value);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row, headers*/ 3 && t_value !== (t_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (51:57) 
    function create_if_block_6(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let t1_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "";
    	let t1;

    	return {
    		c() {
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			t1 = text(t1_value);
    			attr(img, "class", "sg-resource-image svelte-1d4m2ui");
    			if (img.src !== (img_src_value = /*row*/ ctx[1].model.imageSrc)) attr(img, "src", img_src_value);
    			attr(img, "alt", "");
    			attr(div, "class", "sg-resource-title");
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    			insert(target, t0, anchor);
    			insert(target, div, anchor);
    			append(div, t1);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 2 && img.src !== (img_src_value = /*row*/ ctx[1].model.imageSrc)) {
    				attr(img, "src", img_src_value);
    			}

    			if (dirty & /*row, headers*/ 3 && t1_value !== (t1_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "")) set_data(t1, t1_value);
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    			if (detaching) detach(t0);
    			if (detaching) detach(div);
    		}
    	};
    }

    // (49:42) 
    function create_if_block_5(ctx) {
    	let html_tag;
    	let raw_value = /*header*/ ctx[12].renderer(/*row*/ ctx[1]) + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*headers, row*/ 3 && raw_value !== (raw_value = /*header*/ ctx[12].renderer(/*row*/ ctx[1]) + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (47:16) {#if row.model.headerHtml}
    function create_if_block_4$1(ctx) {
    	let html_tag;
    	let raw_value = /*row*/ ctx[1].model.headerHtml + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 2 && raw_value !== (raw_value = /*row*/ ctx[1].model.headerHtml + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (26:20) {#if row.model.iconClass}
    function create_if_block_3$1(ctx) {
    	let div;
    	let i;
    	let i_class_value;

    	return {
    		c() {
    			div = element("div");
    			i = element("i");
    			attr(i, "class", i_class_value = "" + (null_to_empty(/*row*/ ctx[1].model.iconClass) + " svelte-1d4m2ui"));
    			attr(div, "class", "sg-table-icon svelte-1d4m2ui");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, i);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 2 && i_class_value !== (i_class_value = "" + (null_to_empty(/*row*/ ctx[1].model.iconClass) + " svelte-1d4m2ui"))) {
    				attr(i, "class", i_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (36:20) {:else}
    function create_else_block$2(ctx) {
    	let t_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "";
    	let t;

    	return {
    		c() {
    			t = text(t_value);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row, headers*/ 3 && t_value !== (t_value = /*row*/ ctx[1].model[/*header*/ ctx[12].property] + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (34:46) 
    function create_if_block_2$1(ctx) {
    	let html_tag;
    	let raw_value = /*header*/ ctx[12].renderer(/*row*/ ctx[1]) + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*headers, row*/ 3 && raw_value !== (raw_value = /*header*/ ctx[12].renderer(/*row*/ ctx[1]) + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (32:20) {#if row.model.headerHtml}
    function create_if_block_1$2(ctx) {
    	let html_tag;
    	let raw_value = /*row*/ ctx[1].model.headerHtml + "";

    	return {
    		c() {
    			html_tag = new HtmlTag(null);
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*row*/ 2 && raw_value !== (raw_value = /*row*/ ctx[1].model.headerHtml + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (25:16) <TableTreeCell on:rowCollapsed on:rowExpanded {row}>
    function create_default_slot$1(ctx) {
    	let t;
    	let if_block1_anchor;
    	let if_block0 = /*row*/ ctx[1].model.iconClass && create_if_block_3$1(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*row*/ ctx[1].model.headerHtml) return create_if_block_1$2;
    		if (/*header*/ ctx[12].renderer) return create_if_block_2$1;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block1 = current_block_type(ctx);

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t, anchor);
    			if_block1.m(target, anchor);
    			insert(target, if_block1_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (/*row*/ ctx[1].model.iconClass) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			}
    		},
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t);
    			if_block1.d(detaching);
    			if (detaching) detach(if_block1_anchor);
    		}
    	};
    }

    // (22:4) {#each headers as header}
    function create_each_block$3(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*header*/ ctx[12].type == "tree") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			div = element("div");
    			if_block.c();
    			t = space();
    			attr(div, "class", "sg-table-body-cell sg-table-cell svelte-1d4m2ui");
    			set_style(div, "width", /*header*/ ctx[12].width + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			append(div, t);
    			current = true;
    		},
    		p(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, t);
    			}

    			if (!current || dirty & /*headers*/ 1) {
    				set_style(div, "width", /*header*/ ctx[12].width + "px");
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    function create_fragment$a(ctx) {
    	let div;
    	let div_data_row_id_value;
    	let div_class_value;
    	let current;
    	let each_value = /*headers*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div, "data-row-id", div_data_row_id_value = /*row*/ ctx[1].model.id);
    			set_style(div, "height", /*$rowHeight*/ ctx[2] + "px");
    			attr(div, "class", div_class_value = "sg-table-row " + (/*row*/ ctx[1].model.classes || "") + " svelte-1d4m2ui");
    			toggle_class(div, "sg-row-expanded", /*row*/ ctx[1].expanded);
    			toggle_class(div, "sg-hover", /*$hoveredRow*/ ctx[3] == /*row*/ ctx[1].model.id);
    			toggle_class(div, "sg-selected", /*$selectedRow*/ ctx[4] == /*row*/ ctx[1].model.id);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*headers, row*/ 3) {
    				each_value = /*headers*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*row*/ 2 && div_data_row_id_value !== (div_data_row_id_value = /*row*/ ctx[1].model.id)) {
    				attr(div, "data-row-id", div_data_row_id_value);
    			}

    			if (!current || dirty & /*$rowHeight*/ 4) {
    				set_style(div, "height", /*$rowHeight*/ ctx[2] + "px");
    			}

    			if (!current || dirty & /*row*/ 2 && div_class_value !== (div_class_value = "sg-table-row " + (/*row*/ ctx[1].model.classes || "") + " svelte-1d4m2ui")) {
    				attr(div, "class", div_class_value);
    			}

    			if (dirty & /*row, row*/ 2) {
    				toggle_class(div, "sg-row-expanded", /*row*/ ctx[1].expanded);
    			}

    			if (dirty & /*row, $hoveredRow, row*/ 10) {
    				toggle_class(div, "sg-hover", /*$hoveredRow*/ ctx[3] == /*row*/ ctx[1].model.id);
    			}

    			if (dirty & /*row, $selectedRow, row*/ 18) {
    				toggle_class(div, "sg-selected", /*$selectedRow*/ ctx[4] == /*row*/ ctx[1].model.id);
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let $rowHeight;
    	let $hoveredRow;
    	let $selectedRow;
    	
    	
    	let { headers = null } = $$props;
    	let { row = null } = $$props;
    	const { rowHeight } = getContext("options");
    	component_subscribe($$self, rowHeight, value => $$invalidate(2, $rowHeight = value));
    	const { hoveredRow, selectedRow } = getContext("gantt");
    	component_subscribe($$self, hoveredRow, value => $$invalidate(3, $hoveredRow = value));
    	component_subscribe($$self, selectedRow, value => $$invalidate(4, $selectedRow = value));
    	const dispatch = createEventDispatcher();
    	let treeIndentationStyle = "";

    	function rowCollapsed_handler(event) {
    		bubble($$self, event);
    	}

    	function rowExpanded_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("headers" in $$props) $$invalidate(0, headers = $$props.headers);
    		if ("row" in $$props) $$invalidate(1, row = $$props.row);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*row*/ 2) {
    			 {
    				treeIndentationStyle = row.parent
    				? `padding-left: ${row.childLevel * 3}em;`
    				: "";
    			}
    		}
    	};

    	return [
    		headers,
    		row,
    		$rowHeight,
    		$hoveredRow,
    		$selectedRow,
    		rowHeight,
    		hoveredRow,
    		selectedRow,
    		treeIndentationStyle,
    		dispatch,
    		rowCollapsed_handler,
    		rowExpanded_handler
    	];
    }

    class TableRow extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { headers: 0, row: 1 });
    	}
    }

    var css_248z$d = ".bottom-scrollbar-visible.svelte-iysj96{padding-bottom:17px}.sg-table.svelte-iysj96{overflow-x:auto;display:flex;flex-direction:column}.sg-table-scroller.svelte-iysj96{width:100%;border-bottom:1px solid #efefef;overflow-y:hidden}.sg-table-header.svelte-iysj96{display:flex;align-items:stretch;overflow:hidden;border-bottom:#efefef 1px solid;background-color:#fbfbfb}.sg-table-body.svelte-iysj96{display:flex;flex:1 1 0;width:100%;overflow-y:hidden}.sg-table-header-cell.svelte-iysj96{font-size:14px;font-weight:400}.sg-table-cell{white-space:nowrap;overflow:hidden;display:flex;align-items:center;flex-shrink:0;padding:0 .5em;height:100%}.sg-table-cell:last-child{flex-grow:1}";
    styleInject(css_248z$d);

    /* src\modules\table\Table.svelte generated by Svelte v3.23.0 */

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[33] = list[i];
    	return child_ctx;
    }

    // (99:8) {#each tableHeaders as header}
    function create_each_block_1$1(ctx) {
    	let div;
    	let t0_value = /*header*/ ctx[33].title + "";
    	let t0;
    	let t1;

    	return {
    		c() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr(div, "class", "sg-table-header-cell sg-table-cell svelte-iysj96");
    			set_style(div, "width", /*header*/ ctx[33].width + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t0);
    			append(div, t1);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*tableHeaders*/ 32 && t0_value !== (t0_value = /*header*/ ctx[33].title + "")) set_data(t0, t0_value);

    			if (dirty[0] & /*tableHeaders*/ 32) {
    				set_style(div, "width", /*header*/ ctx[33].width + "px");
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (109:16) {#each visibleRows as row}
    function create_each_block$4(ctx) {
    	let current;

    	const tablerow = new TableRow({
    			props: {
    				row: /*row*/ ctx[30],
    				headers: /*tableHeaders*/ ctx[5]
    			}
    		});

    	tablerow.$on("rowExpanded", /*onRowExpanded*/ ctx[15]);
    	tablerow.$on("rowCollapsed", /*onRowCollapsed*/ ctx[16]);

    	return {
    		c() {
    			create_component(tablerow.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(tablerow, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const tablerow_changes = {};
    			if (dirty[0] & /*visibleRows*/ 16) tablerow_changes.row = /*row*/ ctx[30];
    			if (dirty[0] & /*tableHeaders*/ 32) tablerow_changes.headers = /*tableHeaders*/ ctx[5];
    			tablerow.$set(tablerow_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(tablerow.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(tablerow.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(tablerow, detaching);
    		}
    	};
    }

    function create_fragment$b(ctx) {
    	let div4;
    	let div0;
    	let t;
    	let div3;
    	let div2;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*tableHeaders*/ ctx[5];
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = /*visibleRows*/ ctx[4];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			div4 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div0, "class", "sg-table-header svelte-iysj96");
    			set_style(div0, "height", /*$headerHeight*/ ctx[8] + "px");
    			attr(div1, "class", "sg-table-rows svelte-iysj96");
    			set_style(div1, "padding-top", /*paddingTop*/ ctx[1] + "px");
    			set_style(div1, "padding-bottom", /*paddingBottom*/ ctx[2] + "px");
    			set_style(div1, "height", /*rowContainerHeight*/ ctx[3] + "px");
    			attr(div2, "class", "sg-table-scroller svelte-iysj96");
    			attr(div3, "class", "sg-table-body svelte-iysj96");
    			toggle_class(div3, "bottom-scrollbar-visible", /*bottomScrollbarVisible*/ ctx[7]);
    			attr(div4, "class", "sg-table sg-view svelte-iysj96");
    			set_style(div4, "width", /*tableWidth*/ ctx[0] + "px");
    		},
    		m(target, anchor) {
    			insert(target, div4, anchor);
    			append(div4, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			/*div0_binding*/ ctx[29](div0);
    			append(div4, t);
    			append(div4, div3);
    			append(div3, div2);
    			append(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(ctx[14].call(null, div2));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*tableHeaders*/ 32) {
    				each_value_1 = /*tableHeaders*/ ctx[5];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (!current || dirty[0] & /*$headerHeight*/ 256) {
    				set_style(div0, "height", /*$headerHeight*/ ctx[8] + "px");
    			}

    			if (dirty[0] & /*visibleRows, tableHeaders, onRowExpanded, onRowCollapsed*/ 98352) {
    				each_value = /*visibleRows*/ ctx[4];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*paddingTop*/ 2) {
    				set_style(div1, "padding-top", /*paddingTop*/ ctx[1] + "px");
    			}

    			if (!current || dirty[0] & /*paddingBottom*/ 4) {
    				set_style(div1, "padding-bottom", /*paddingBottom*/ ctx[2] + "px");
    			}

    			if (!current || dirty[0] & /*rowContainerHeight*/ 8) {
    				set_style(div1, "height", /*rowContainerHeight*/ ctx[3] + "px");
    			}

    			if (dirty[0] & /*bottomScrollbarVisible*/ 128) {
    				toggle_class(div3, "bottom-scrollbar-visible", /*bottomScrollbarVisible*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*tableWidth*/ 1) {
    				set_style(div4, "width", /*tableWidth*/ ctx[0] + "px");
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div4);
    			destroy_each(each_blocks_1, detaching);
    			/*div0_binding*/ ctx[29](null);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function hide(children) {
    	children.forEach(row => {
    		if (row.children) hide(row.children);
    		row.hidden = true;
    	});
    }

    function show(children, hidden = false) {
    	children.forEach(row => {
    		if (row.children) show(row.children, !row.expanded);
    		row.hidden = hidden;
    	});
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $rowStore;
    	let $rowHeight;
    	let $taskStore;
    	let $rowPadding;
    	let $width;
    	let $visibleWidth;
    	let $headerHeight;
    	component_subscribe($$self, rowStore, $$value => $$invalidate(18, $rowStore = $$value));
    	component_subscribe($$self, taskStore, $$value => $$invalidate(20, $taskStore = $$value));
    	const dispatch = createEventDispatcher();
    	
    	
    	let { tableWidth } = $$props;
    	let { paddingTop } = $$props;
    	let { paddingBottom } = $$props;
    	let { rowContainerHeight } = $$props;
    	let { visibleRows } = $$props;

    	let { tableHeaders = [
    		{
    			title: "Name",
    			property: "label",
    			width: 100
    		}
    	] } = $$props;

    	const { from, to, width, visibleWidth, headerHeight } = getContext("dimensions");
    	component_subscribe($$self, width, value => $$invalidate(22, $width = value));
    	component_subscribe($$self, visibleWidth, value => $$invalidate(23, $visibleWidth = value));
    	component_subscribe($$self, headerHeight, value => $$invalidate(8, $headerHeight = value));
    	const { rowPadding, rowHeight } = getContext("options");
    	component_subscribe($$self, rowPadding, value => $$invalidate(21, $rowPadding = value));
    	component_subscribe($$self, rowHeight, value => $$invalidate(19, $rowHeight = value));

    	onMount(() => {
    		dispatch("init", { module: this });
    	});

    	const { scrollables } = getContext("gantt");
    	let headerContainer;

    	function scrollListener(node) {
    		scrollables.push({ node, orientation: "vertical" });

    		node.addEventListener("scroll", event => {
    			$$invalidate(6, headerContainer.scrollLeft = node.scrollLeft, headerContainer);
    		});

    		return {
    			destroy() {
    				node.removeEventListener("scroll");
    			}
    		};
    	}

    	let scrollWidth;

    	function onRowExpanded(event) {
    		const row = event.detail.row;
    		row.expanded = true;
    		if (row.children) show(row.children);
    		updateYPositions();
    	}

    	function onRowCollapsed(event) {
    		const row = event.detail.row;
    		row.expanded = false;
    		if (row.children) hide(row.children);
    		updateYPositions();
    	}

    	function updateYPositions() {
    		let y = 0;

    		$rowStore.ids.forEach(id => {
    			const row = $rowStore.entities[id];

    			if (!row.hidden) {
    				set_store_value(rowStore, $rowStore.entities[id].y = y, $rowStore);
    				y += $rowHeight;
    			}
    		});

    		$taskStore.ids.forEach(id => {
    			const task = $taskStore.entities[id];
    			const row = $rowStore.entities[task.model.resourceId];
    			set_store_value(taskStore, $taskStore.entities[id].top = row.y + $rowPadding, $taskStore);
    		});
    	}

    	// if gantt displays a bottom scrollbar and table does not, we need to pad out the table
    	let bottomScrollbarVisible;

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(6, headerContainer = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("tableWidth" in $$props) $$invalidate(0, tableWidth = $$props.tableWidth);
    		if ("paddingTop" in $$props) $$invalidate(1, paddingTop = $$props.paddingTop);
    		if ("paddingBottom" in $$props) $$invalidate(2, paddingBottom = $$props.paddingBottom);
    		if ("rowContainerHeight" in $$props) $$invalidate(3, rowContainerHeight = $$props.rowContainerHeight);
    		if ("visibleRows" in $$props) $$invalidate(4, visibleRows = $$props.visibleRows);
    		if ("tableHeaders" in $$props) $$invalidate(5, tableHeaders = $$props.tableHeaders);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*tableHeaders*/ 32) {
    			 {
    				let sum = 0;

    				tableHeaders.forEach(header => {
    					sum += header.width;
    				});

    				$$invalidate(17, scrollWidth = sum);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$width, $visibleWidth, scrollWidth, tableWidth*/ 12713985) {
    			 {
    				$$invalidate(7, bottomScrollbarVisible = $width > $visibleWidth && scrollWidth <= tableWidth);
    			}
    		}
    	};

    	return [
    		tableWidth,
    		paddingTop,
    		paddingBottom,
    		rowContainerHeight,
    		visibleRows,
    		tableHeaders,
    		headerContainer,
    		bottomScrollbarVisible,
    		$headerHeight,
    		width,
    		visibleWidth,
    		headerHeight,
    		rowPadding,
    		rowHeight,
    		scrollListener,
    		onRowExpanded,
    		onRowCollapsed,
    		scrollWidth,
    		$rowStore,
    		$rowHeight,
    		$taskStore,
    		$rowPadding,
    		$width,
    		$visibleWidth,
    		dispatch,
    		from,
    		to,
    		scrollables,
    		updateYPositions,
    		div0_binding
    	];
    }

    class Table extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(
    			this,
    			options,
    			instance$b,
    			create_fragment$b,
    			safe_not_equal,
    			{
    				tableWidth: 0,
    				paddingTop: 1,
    				paddingBottom: 2,
    				rowContainerHeight: 3,
    				visibleRows: 4,
    				tableHeaders: 5
    			},
    			[-1, -1]
    		);
    	}
    }

    var SvelteGanttTable = Table;

    var css_248z$e = ".arrow.svelte-5u2c1l{position:absolute;left:0px;pointer-events:none}.select-area.svelte-5u2c1l{pointer-events:visible;position:absolute}";
    styleInject(css_248z$e);

    /* src\modules\dependencies\Arrow.svelte generated by Svelte v3.23.0 */

    function create_fragment$c(ctx) {
    	let svg;
    	let path0;
    	let path1;

    	return {
    		c() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr(path0, "d", /*path*/ ctx[2]);
    			attr(path0, "stroke", /*stroke*/ ctx[0]);
    			attr(path0, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr(path0, "fill", "transparent");
    			attr(path0, "class", "select-area svelte-5u2c1l");
    			attr(path1, "d", /*arrowPath*/ ctx[3]);
    			attr(path1, "fill", /*stroke*/ ctx[0]);
    			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr(svg, "shape-rendering", "crispEdges");
    			attr(svg, "class", "arrow svelte-5u2c1l");
    			attr(svg, "height", "100%");
    			attr(svg, "width", "100%");
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, path0);
    			append(svg, path1);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*path*/ 4) {
    				attr(path0, "d", /*path*/ ctx[2]);
    			}

    			if (dirty & /*stroke*/ 1) {
    				attr(path0, "stroke", /*stroke*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr(path0, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*arrowPath*/ 8) {
    				attr(path1, "d", /*arrowPath*/ ctx[3]);
    			}

    			if (dirty & /*stroke*/ 1) {
    				attr(path1, "fill", /*stroke*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { startY } = $$props;
    	let { endY } = $$props;
    	let { endX } = $$props;
    	let { startX } = $$props;
    	let { minLen = 12 } = $$props;
    	let { arrowSize = 5 } = $$props;
    	let { stroke = "red" } = $$props;
    	let { strokeWidth = 2 } = $$props;

    	onMount(() => {
    		
    	});

    	let height;
    	let width;
    	let path;
    	let arrowPath;

    	$$self.$set = $$props => {
    		if ("startY" in $$props) $$invalidate(4, startY = $$props.startY);
    		if ("endY" in $$props) $$invalidate(5, endY = $$props.endY);
    		if ("endX" in $$props) $$invalidate(6, endX = $$props.endX);
    		if ("startX" in $$props) $$invalidate(7, startX = $$props.startX);
    		if ("minLen" in $$props) $$invalidate(8, minLen = $$props.minLen);
    		if ("arrowSize" in $$props) $$invalidate(9, arrowSize = $$props.arrowSize);
    		if ("stroke" in $$props) $$invalidate(0, stroke = $$props.stroke);
    		if ("strokeWidth" in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*endY, startY*/ 48) {
    			 $$invalidate(10, height = endY - startY);
    		}

    		if ($$self.$$.dirty & /*endX, startX*/ 192) {
    			 $$invalidate(11, width = endX - startX);
    		}

    		if ($$self.$$.dirty & /*startX, minLen, endX, startY, endY, height, width*/ 3568) {
    			 {
    				if (startX == NaN || startX == undefined) $$invalidate(2, path = "M0 0");
    				let result;

    				if (startX + minLen >= endX && startY != endY) {
    					result = `L ${startX + minLen} ${startY} 
                        L ${startX + minLen} ${startY + height / 2}
                        L ${endX - minLen} ${startY + height / 2}
                        L ${endX - minLen} ${endY} `;
    				} else {
    					result = `L ${startX + width / 2} ${startY} 
                        L ${startX + width / 2} ${endY}`;
    				}

    				// -2 so the line doesn't stick out of the arrowhead
    				$$invalidate(2, path = `M${startX} ${startY}` + result + `L ${endX - 2} ${endY}`);
    			}
    		}

    		if ($$self.$$.dirty & /*endX, arrowSize, endY*/ 608) {
    			 {
    				if (endX == NaN || endX == undefined) $$invalidate(3, arrowPath = "M0 0");
    				$$invalidate(3, arrowPath = `M${endX - arrowSize} ${endY - arrowSize} L${endX} ${endY} L${endX - arrowSize} ${endY + arrowSize} Z`);
    			}
    		}
    	};

    	return [
    		stroke,
    		strokeWidth,
    		path,
    		arrowPath,
    		startY,
    		endY,
    		endX,
    		startX,
    		minLen,
    		arrowSize
    	];
    }

    class Arrow extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			startY: 4,
    			endY: 5,
    			endX: 6,
    			startX: 7,
    			minLen: 8,
    			arrowSize: 9,
    			stroke: 0,
    			strokeWidth: 1
    		});
    	}
    }

    var css_248z$f = ".sg-dependency.svelte-fnf1gz{position:absolute;width:100%;height:100%}";
    styleInject(css_248z$f);

    /* src\modules\dependencies\Dependency.svelte generated by Svelte v3.23.0 */

    function create_fragment$d(ctx) {
    	let div;
    	let current;

    	const arrow = new Arrow({
    			props: {
    				startX: /*fromTask*/ ctx[1].left + /*fromTask*/ ctx[1].width,
    				startY: /*fromTask*/ ctx[1].top + /*fromTask*/ ctx[1].height / 2,
    				endX: /*toTask*/ ctx[2].left,
    				endY: /*toTask*/ ctx[2].top + /*toTask*/ ctx[2].height / 2
    			}
    		});

    	return {
    		c() {
    			div = element("div");
    			create_component(arrow.$$.fragment);
    			attr(div, "class", "sg-dependency svelte-fnf1gz");
    			set_style(div, "left", "0");
    			set_style(div, "top", "0");
    			attr(div, "data-dependency-id", /*id*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(arrow, div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const arrow_changes = {};
    			if (dirty & /*fromTask*/ 2) arrow_changes.startX = /*fromTask*/ ctx[1].left + /*fromTask*/ ctx[1].width;
    			if (dirty & /*fromTask*/ 2) arrow_changes.startY = /*fromTask*/ ctx[1].top + /*fromTask*/ ctx[1].height / 2;
    			if (dirty & /*toTask*/ 4) arrow_changes.endX = /*toTask*/ ctx[2].left;
    			if (dirty & /*toTask*/ 4) arrow_changes.endY = /*toTask*/ ctx[2].top + /*toTask*/ ctx[2].height / 2;
    			arrow.$set(arrow_changes);

    			if (!current || dirty & /*id*/ 1) {
    				attr(div, "data-dependency-id", /*id*/ ctx[0]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(arrow.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(arrow.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(arrow);
    		}
    	};
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $taskStore;
    	component_subscribe($$self, taskStore, $$value => $$invalidate(5, $taskStore = $$value));
    	let { id } = $$props;
    	let { fromId } = $$props;
    	let { toId } = $$props;
    	let fromTask;
    	let toTask;

    	$$self.$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("fromId" in $$props) $$invalidate(3, fromId = $$props.fromId);
    		if ("toId" in $$props) $$invalidate(4, toId = $$props.toId);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$taskStore, fromId*/ 40) {
    			 $$invalidate(1, fromTask = $taskStore.entities[fromId]);
    		}

    		if ($$self.$$.dirty & /*$taskStore, toId*/ 48) {
    			 $$invalidate(2, toTask = $taskStore.entities[toId]);
    		}
    	};

    	return [id, fromTask, toTask, fromId, toId];
    }

    class Dependency extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { id: 0, fromId: 3, toId: 4 });
    	}
    }

    var css_248z$g = ".dependency-container.svelte-hatx0f{position:absolute;width:100%;height:100%;pointer-events:none;top:0;float:left;overflow:hidden;z-index:0}";
    styleInject(css_248z$g);

    /* src\modules\dependencies\GanttDependencies.svelte generated by Svelte v3.23.0 */

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (26:4) {#each visibleDependencies as dependency (dependency.id)}
    function create_each_block$5(key_1, ctx) {
    	let first;
    	let current;
    	const dependency_spread_levels = [/*dependency*/ ctx[6]];
    	let dependency_props = {};

    	for (let i = 0; i < dependency_spread_levels.length; i += 1) {
    		dependency_props = assign(dependency_props, dependency_spread_levels[i]);
    	}

    	const dependency = new Dependency({ props: dependency_props });

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			first = empty();
    			create_component(dependency.$$.fragment);
    			this.first = first;
    		},
    		m(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(dependency, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const dependency_changes = (dirty & /*visibleDependencies*/ 1)
    			? get_spread_update(dependency_spread_levels, [get_spread_object(/*dependency*/ ctx[6])])
    			: {};

    			dependency.$set(dependency_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(dependency.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(dependency.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(first);
    			destroy_component(dependency, detaching);
    		}
    	};
    }

    function create_fragment$e(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = /*visibleDependencies*/ ctx[0];
    	const get_key = ctx => /*dependency*/ ctx[6].id;

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$5(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$5(key, child_ctx));
    	}

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div, "class", "dependency-container svelte-hatx0f");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*visibleDependencies*/ 1) {
    				const each_value = /*visibleDependencies*/ ctx[0];
    				group_outros();
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$5, null, get_each_context$5);
    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $taskStore;
    	let $visibleHeight;
    	component_subscribe($$self, taskStore, $$value => $$invalidate(4, $taskStore = $$value));
    	const { visibleHeight } = getContext("dimensions");
    	component_subscribe($$self, visibleHeight, value => $$invalidate(5, $visibleHeight = value));
    	let { paddingTop } = $$props;
    	let { dependencies = [] } = $$props;
    	let visibleDependencies = [];

    	$$self.$set = $$props => {
    		if ("paddingTop" in $$props) $$invalidate(2, paddingTop = $$props.paddingTop);
    		if ("dependencies" in $$props) $$invalidate(3, dependencies = $$props.dependencies);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*dependencies, $taskStore, paddingTop, $visibleHeight*/ 60) {
    			 {
    				const result = [];

    				for (let i = 0; i < dependencies.length; i++) {
    					const dependency = dependencies[i];
    					const map = $taskStore.entities;
    					const fromTask = map[dependency.fromId];
    					const toTask = map[dependency.toId];

    					if (fromTask && toTask && Math.min(fromTask.top, toTask.top) <= paddingTop + $visibleHeight && Math.max(fromTask.top, toTask.top) >= paddingTop) {
    						result.push(dependency);
    					}
    				}

    				$$invalidate(0, visibleDependencies = result);
    			}
    		}
    	};

    	return [visibleDependencies, visibleHeight, paddingTop, dependencies];
    }

    class GanttDependencies extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { paddingTop: 2, dependencies: 3 });
    	}
    }

    var SvelteGanttDependencies = GanttDependencies;

    const defaults = {
        enabled: true,
        elementContent: () => {
            const element = document.createElement('div');
            element.innerHTML = 'New Task';
            Object.assign(element.style, {
                position: 'absolute',
                background: '#eee',
                padding: '0.5em 1em',
                fontSize: '12px',
                pointerEvents: 'none',
            });
            return element;
        }
    };
    class SvelteGanttExternal {
        constructor(node, options) {
            this.options = Object.assign({}, defaults, options);
            this.draggable = new Draggable(node, {
                onDrag: this.onDrag.bind(this),
                dragAllowed: () => this.options.enabled,
                resizeAllowed: false,
                onDrop: this.onDrop.bind(this),
                container: document.body,
                getX: (event) => event.pageX,
                getY: (event) => event.pageY,
                getWidth: () => 0
            });
        }
        onDrag({ x, y }) {
            if (!this.element) {
                this.element = this.options.elementContent();
                document.body.appendChild(this.element);
                this.options.dragging = true;
            }
            this.element.style.top = y + 'px';
            this.element.style.left = x + 'px';
        }
        onDrop(event) {
            var _a, _b, _c, _d;
            const gantt = this.options.gantt;
            const targetRow = gantt.dndManager.getTarget('row', event.mouseEvent);
            if (targetRow) {
                const mousePos = getRelativePos(gantt.getRowContainer(), event.mouseEvent);
                const date = gantt.utils.getDateByPosition(mousePos.x);
                (_b = (_a = this.options).onsuccess) === null || _b === void 0 ? void 0 : _b.call(_a, targetRow, date, gantt);
            }
            else {
                (_d = (_c = this.options).onfail) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            document.body.removeChild(this.element);
            this.options.dragging = false;
            this.element = null;
        }
    }

    // import { SvelteGanttTableComponent } from './modules/table';
    var SvelteGantt = Gantt;

    /* src/components/ganttChart.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/components/ganttChart.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let h1;
    	let t1;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "Gantt Chart";
    			t1 = space$1();
    			div1 = element$1("div");
    			div0 = element$1("div");
    			attr_dev(h1, "class", "px-4 pt-2 text-2xl font-black");
    			add_location(h1, file$3, 269, 4, 6749);
    			attr_dev(div0, "class", "flex flex-1 overflow-auto m-4 border-1 border-gray-100 border-solid");
    			add_location(div0, file$3, 271, 8, 6860);
    			attr_dev(div1, "class", "flex flex-1 overflow-auto");
    			add_location(div1, file$3, 270, 4, 6812);
    			attr_dev(div2, "class", "overflow-x-auto shadow-md sm:rounded-lg bg-white");
    			add_location(div2, file$3, 268, 0, 6682);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h1);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			/*div0_binding*/ ctx[2](div0);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			/*div0_binding*/ ctx[2](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $graphStore;
    	validate_store(graphStore, 'graphStore');
    	component_subscribe$1($$self, graphStore, $$value => $$invalidate(1, $graphStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GanttChart', slots, []);
    	const time = input => moment(input, 'HH');
    	const currentStart = time('1');
    	const currentEnd = time('10');

    	const data = {
    		rows: [
    			{ id: 1, label: 'A' },
    			{ id: 2, label: 'B' },
    			{ id: 3, label: 'C' },
    			{ id: 4, label: 'D' },
    			{ id: 5, label: 'E' },
    			{ id: 6, label: 'F' },
    			{ id: 7, label: 'G' },
    			{ id: 8, label: 'H' },
    			{ id: 9, label: 'I' }
    		],
    		tasks: [
    			{
    				id: 1,
    				resourceId: 1,
    				label: ' ',
    				from: time('0'),
    				to: time('3')
    			},
    			{
    				id: 2, // classes: 'orange',
    				resourceId: 2,
    				label: ' ',
    				from: time('0'),
    				to: time('7')
    			},
    			{
    				id: 3, // classes: 'orange',
    				resourceId: 3,
    				label: ' ',
    				from: time('3'),
    				to: time('7')
    			},
    			{
    				id: 4, // classes: 'green',
    				resourceId: 4,
    				label: ' ',
    				from: time('3'),
    				to: time('5')
    			},
    			{
    				id: 5, // classes: 'blue',
    				resourceId: 5,
    				label: ' ',
    				from: time('7'),
    				to: time('10')
    			},
    			{
    				id: 6, // classes: 'blue',
    				resourceId: 6,
    				label: ' ',
    				from: time('10'),
    				to: time('14'),
    				classes: 'blue'
    			},
    			{
    				id: 7,
    				resourceId: 7,
    				label: ' ',
    				from: time('7'),
    				to: time('8')
    			},
    			{
    				id: 8, // classes: 'green',
    				resourceId: 8,
    				label: ' ',
    				from: time('7'),
    				to: time('12')
    			},
    			{
    				id: 9, // classes: 'orange',
    				resourceId: 9,
    				label: ' ',
    				from: time('14'),
    				to: time('17')
    			}
    		], // classes: 'orange',
    		dependencies: [], // {
    		//     id: 1,
    		
    	}; //     fromId: 1,
    	//     toId: 3,
    	// },

    	// {
    	//     id: 2,
    	//     fromId: 1,
    	//     toId: 4,
    	// },
    	// {
    	//     id: 3,
    	//     fromId: 2,
    	//     toId: 5,
    	// },
    	// {
    	//     id: 4,
    	//     fromId: 4,
    	//     toId: 6,
    	// },
    	// {
    	//     id: 5,
    	//     fromId: 5,
    	//     toId: 6,
    	// },
    	// {
    	//     id: 6,
    	//     fromId: 2,
    	//     toId: 7,
    	// },
    	// {
    	//     id: 7,
    	//     fromId: 7,
    	//     toId: 9,
    	// },
    	// {
    	//     id: 8,
    	//     fromId: 8,
    	//     toId: 9,
    	// },
    	let gantt;

    	let ganttChart;

    	const options = {
    		dateAdapter: new MomentSvelteGanttDateAdapter(moment),
    		// rows: data.rows,
    		rows: [],
    		// tasks: data.tasks,
    		tasks: [],
    		// dependencies: data.dependencies,
    		dependencies: [],
    		timeRanges: [],
    		columnOffset: 60,
    		magnetOffset: 60,
    		rowHeight: 42,
    		rowPadding: 6,
    		headers: [{ unit: 'hour', format: 'H' }],
    		fitWidth: true,
    		minWidth: 400,
    		from: currentStart,
    		to: currentEnd,
    		tableHeaders: [
    			{
    				title: 'Activity',
    				property: 'label',
    				width: 60,
    				type: 'tree'
    			}
    		],
    		tableWidth: 60,
    		ganttTableModules: [SvelteGanttTable],
    		ganttBodyModules: [SvelteGanttDependencies]
    	};

    	const addRows = () => {
    		const rows = [];
    		$graphStore.getAdjacentsList.length - 1;

    		$graphStore.getAdjacentsList.forEach(adj => {
    			adj.forEach(({ node, name }, i) => {
    				if (name) {
    					rows.push({ id: node.id, label: name });
    				}
    			});
    		});

    		options.rows = rows;

    		if (gantt) {
    			gantt.$set(options);
    		}
    	};

    	const addTasks = () => {
    		const tasks = [];
    		$graphStore.getAdjacentsList.length - 1;

    		$graphStore.getAdjacentsList.forEach(adj => {
    			adj.forEach(a => {
    				tasks.push({
    					id: a.node.id,
    					resourceId: a.node.id,
    					label: ' ',
    					from: time((a.node.predecessors[0].node.id + 1).toString()),
    					to: time((a.node.predecessors[0].node.id + 1 + a.weight).toString()),
    					classes: '!bg-blue-600',
    					enableDragging: false
    				});
    			});
    		});

    		options.tasks = tasks;

    		if (gantt) {
    			gantt.$set(options);
    		}
    	};

    	const updateChart = async () => {
    		await addRows();
    		await addTasks();
    	};

    	onMount$1(() => {
    		window.gantt = gantt = new SvelteGantt({ target: ganttChart, props: options });
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GanttChart> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks$1[$$value ? 'unshift' : 'push'](() => {
    			ganttChart = $$value;
    			$$invalidate(0, ganttChart);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount: onMount$1,
    		moment,
    		SvelteGantt,
    		SvelteGanttDependencies,
    		SvelteGanttTable,
    		SvelteGanttExternal,
    		MomentSvelteGanttDateAdapter,
    		graphStore,
    		time,
    		currentStart,
    		currentEnd,
    		data,
    		gantt,
    		ganttChart,
    		options,
    		addRows,
    		addTasks,
    		updateChart,
    		$graphStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('gantt' in $$props) gantt = $$props.gantt;
    		if ('ganttChart' in $$props) $$invalidate(0, ganttChart = $$props.ganttChart);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$graphStore*/ 2) {
    			$graphStore && updateChart();
    		}
    	};

    	return [ganttChart, $graphStore, div0_binding];
    }

    class GanttChart extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GanttChart",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /*! LeaderLine v1.0.7 (c) anseki https://anseki.github.io/leader-line/ */
    (function(){var Z,w,O,M,I,o,t,s,h,u,n,a,e,_,v,l,r,i,E,x,p,c,d,C="leader-line",b=1,k=2,L=3,A=4,V={top:b,right:k,bottom:L,left:A},P=1,N=2,T=3,W=4,B=5,R={straight:P,arc:N,fluid:T,magnet:W,grid:B},Y="behind",f=C+"-defs",y='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="leader-line-defs"><style><![CDATA[.leader-line{position:absolute;overflow:visible!important;pointer-events:none!important;font-size:16px}#leader-line-defs{width:0;height:0;position:absolute;left:0;top:0}.leader-line-line-path{fill:none}.leader-line-mask-bg-rect{fill:white}.leader-line-caps-mask-anchor,.leader-line-caps-mask-marker-shape{fill:black}.leader-line-caps-mask-anchor{stroke:black}.leader-line-caps-mask-line,.leader-line-plugs-face{stroke:rgba(0,0,0,0)}.leader-line-line-mask-shape{stroke:white}.leader-line-line-outline-mask-shape{stroke:black}.leader-line-plug-mask-shape{fill:white;stroke:black}.leader-line-plug-outline-mask-shape{fill:black;stroke:white}.leader-line-areaAnchor{position:absolute;overflow:visible!important}]]></style><defs><circle id="leader-line-disc" cx="0" cy="0" r="5"/><rect id="leader-line-square" x="-5" y="-5" width="10" height="10"/><polygon id="leader-line-arrow1" points="-8,-8 8,0 -8,8 -5,0"/><polygon id="leader-line-arrow2" points="-4,-8 4,0 -4,8 -7,5 -2,0 -7,-5"/><polygon id="leader-line-arrow3" points="-4,-5 8,0 -4,5"/><g id="leader-line-hand"><path style="fill: #fcfcfc" d="M9.19 11.14h4.75c1.38 0 2.49-1.11 2.49-2.49 0-.51-.15-.98-.41-1.37h1.3c1.38 0 2.49-1.11 2.49-2.49s-1.11-2.53-2.49-2.53h1.02c1.38 0 2.49-1.11 2.49-2.49s-1.11-2.49-2.49-2.49h14.96c1.37 0 2.49-1.11 2.49-2.49s-1.11-2.49-2.49-2.49H16.58C16-9.86 14.28-11.14 9.7-11.14c-4.79 0-6.55 3.42-7.87 4.73H-2.14v13.23h3.68C3.29 9.97 5.47 11.14 9.19 11.14L9.19 11.14Z"/><path style="fill: black" d="M13.95 12c1.85 0 3.35-1.5 3.35-3.35 0-.17-.02-.34-.04-.51h.07c1.85 0 3.35-1.5 3.35-3.35 0-.79-.27-1.51-.72-2.08 1.03-.57 1.74-1.67 1.74-2.93 0-.59-.16-1.15-.43-1.63h12.04c1.85 0 3.35-1.5 3.35-3.35 0-1.85-1.5-3.35-3.35-3.35H17.2C16.26-10.93 13.91-12 9.7-12 5.36-12 3.22-9.4 1.94-7.84c0 0-.29.33-.5.57-.63 0-3.58 0-3.58 0C-2.61-7.27-3-6.88-3-6.41v13.23c0 .47.39.86.86.86 0 0 2.48 0 3.2 0C2.9 10.73 5.29 12 9.19 12L13.95 12ZM9.19 10.28c-3.46 0-5.33-1.05-6.9-3.87-.15-.27-.44-.44-.75-.44 0 0-1.81 0-2.82 0V-5.55c1.06 0 3.11 0 3.11 0 .25 0 .44-.06.61-.25l.83-.95c1.23-1.49 2.91-3.53 6.43-3.53 3.45 0 4.9.74 5.57 1.72h-4.3c-.48 0-.86.38-.86.86s.39.86.86.86h22.34c.9 0 1.63.73 1.63 1.63 0 .9-.73 1.63-1.63 1.63H15.83c-.48 0-.86.38-.86.86 0 .47.39.86.86.86h2.52c.9 0 1.63.73 1.63 1.63s-.73 1.63-1.63 1.63h-3.12c-.48 0-.86.38-.86.86 0 .47.39.86.86.86h2.11c.88 0 1.63.76 1.63 1.67 0 .9-.73 1.63-1.63 1.63h-3.2c-.48 0-.86.39-.86.86 0 .47.39.86.86.86h1.36c.05.16.09.34.09.51 0 .9-.73 1.63-1.63 1.63C13.95 10.28 9.19 10.28 9.19 10.28Z"/></g><g id="leader-line-crosshair"><path d="M0-78.97c-43.54 0-78.97 35.43-78.97 78.97 0 43.54 35.43 78.97 78.97 78.97s78.97-35.43 78.97-78.97C78.97-43.54 43.55-78.97 0-78.97ZM76.51-1.21h-9.91v-9.11h-2.43v9.11h-11.45c-.64-28.12-23.38-50.86-51.5-51.5V-64.17h9.11V-66.6h-9.11v-9.91C42.46-75.86 75.86-42.45 76.51-1.21ZM-1.21-30.76h-9.11v2.43h9.11V-4.2c-1.44.42-2.57 1.54-2.98 2.98H-28.33v-9.11h-2.43v9.11H-50.29C-49.65-28-27.99-49.65-1.21-50.29V-30.76ZM-30.76 1.21v9.11h2.43v-9.11H-4.2c.42 1.44 1.54 2.57 2.98 2.98v24.13h-9.11v2.43h9.11v19.53C-27.99 49.65-49.65 28-50.29 1.21H-30.76ZM1.22 30.75h9.11v-2.43h-9.11V4.2c1.44-.42 2.56-1.54 2.98-2.98h24.13v9.11h2.43v-9.11h19.53C49.65 28 28 49.65 1.22 50.29V30.75ZM30.76-1.21v-9.11h-2.43v9.11H4.2c-.42-1.44-1.54-2.56-2.98-2.98V-28.33h9.11v-2.43h-9.11V-50.29C28-49.65 49.65-28 50.29-1.21H30.76ZM-1.21-76.51v9.91h-9.11v2.43h9.11v11.45c-28.12.64-50.86 23.38-51.5 51.5H-64.17v-9.11H-66.6v9.11h-9.91C-75.86-42.45-42.45-75.86-1.21-76.51ZM-76.51 1.21h9.91v9.11h2.43v-9.11h11.45c.64 28.12 23.38 50.86 51.5 51.5v11.45h-9.11v2.43h9.11v9.91C-42.45 75.86-75.86 42.45-76.51 1.21ZM1.22 76.51v-9.91h9.11v-2.43h-9.11v-11.45c28.12-.64 50.86-23.38 51.5-51.5h11.45v9.11h2.43v-9.11h9.91C75.86 42.45 42.45 75.86 1.22 76.51Z"/><path d="M0 83.58-7.1 96 7.1 96Z"/><path d="M0-83.58 7.1-96-7.1-96"/><path d="M83.58 0 96 7.1 96-7.1Z"/><path d="M-83.58 0-96-7.1-96 7.1Z"/></g></defs></svg>',X={disc:{elmId:"leader-line-disc",noRotate:!0,bBox:{left:-5,top:-5,width:10,height:10,right:5,bottom:5},widthR:2.5,heightR:2.5,bCircle:5,sideLen:5,backLen:5,overhead:0,outlineBase:1,outlineMax:4},square:{elmId:"leader-line-square",noRotate:!0,bBox:{left:-5,top:-5,width:10,height:10,right:5,bottom:5},widthR:2.5,heightR:2.5,bCircle:5,sideLen:5,backLen:5,overhead:0,outlineBase:1,outlineMax:4},arrow1:{elmId:"leader-line-arrow1",bBox:{left:-8,top:-8,width:16,height:16,right:8,bottom:8},widthR:4,heightR:4,bCircle:8,sideLen:8,backLen:8,overhead:8,outlineBase:2,outlineMax:1.5},arrow2:{elmId:"leader-line-arrow2",bBox:{left:-7,top:-8,width:11,height:16,right:4,bottom:8},widthR:2.75,heightR:4,bCircle:8,sideLen:8,backLen:7,overhead:4,outlineBase:1,outlineMax:1.75},arrow3:{elmId:"leader-line-arrow3",bBox:{left:-4,top:-5,width:12,height:10,right:8,bottom:5},widthR:3,heightR:2.5,bCircle:8,sideLen:5,backLen:4,overhead:8,outlineBase:1,outlineMax:2.5},hand:{elmId:"leader-line-hand",bBox:{left:-3,top:-12,width:40,height:24,right:37,bottom:12},widthR:10,heightR:6,bCircle:37,sideLen:12,backLen:3,overhead:37},crosshair:{elmId:"leader-line-crosshair",noRotate:!0,bBox:{left:-96,top:-96,width:192,height:192,right:96,bottom:96},widthR:48,heightR:48,bCircle:96,sideLen:96,backLen:96,overhead:0}},F={behind:Y,disc:"disc",square:"square",arrow1:"arrow1",arrow2:"arrow2",arrow3:"arrow3",hand:"hand",crosshair:"crosshair"},q={disc:"disc",square:"square",arrow1:"arrow1",arrow2:"arrow2",arrow3:"arrow3",hand:"hand",crosshair:"crosshair"},G=[b,k,L,A],D="auto",Q={x:"left",y:"top",width:"width",height:"height"},z=80,j=4,H=5,U=120,K=8,J=3.75,$=10,ee=30,te=.5522847,ne=.25*Math.PI,m=/^\s*(\-?[\d\.]+)\s*(\%)?\s*$/,ae="http://www.w3.org/2000/svg",S="-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style&&!window.navigator.msPointerEnabled,ie=!S&&!!document.uniqueID,oe="MozAppearance"in document.documentElement.style,le=!(S||oe||!window.chrome||!window.CSS),re=!S&&!ie&&!oe&&!le&&!window.chrome&&"WebkitAppearance"in document.documentElement.style,se=ie||S?.2:.1,ue={path:T,lineColor:"coral",lineSize:4,plugSE:[Y,"arrow1"],plugSizeSE:[1,1],lineOutlineEnabled:!1,lineOutlineColor:"indianred",lineOutlineSize:.25,plugOutlineEnabledSE:[!1,!1],plugOutlineSizeSE:[1,1]},he=(p={}.toString,c={}.hasOwnProperty.toString,d=c.call(Object),function(e){return e&&"[object Object]"===p.call(e)&&(!(e=Object.getPrototypeOf(e))||(e=e.hasOwnProperty("constructor")&&e.constructor)&&"function"==typeof e&&c.call(e)===d)}),pe=Number.isFinite||function(e){return "number"==typeof e&&window.isFinite(e)},g=(_={ease:[.25,.1,.25,1],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]},v=1e3/60/2,l=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){setTimeout(e,v);},r=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(e){clearTimeout(e);},i=Number.isFinite||function(e){return "number"==typeof e&&window.isFinite(e)},E=[],x=0,{add:function(n,e,t,a,i,o,l){var r,s,u,h,p,c,d,f,y,m,S=++x;function g(e,t){return {value:n(t),timeRatio:e,outputRatio:t}}if("string"==typeof i&&(i=_[i]),n=n||function(){},t<v)r=[g(0,0),g(1,1)];else {if(s=v/t,r=[g(0,0)],0===i[0]&&0===i[1]&&1===i[2]&&1===i[3])for(h=s;h<=1;h+=s)r.push(g(h,h));else for(p=u=(h=s)/10;p<=1;p+=u)d=p,m=y=f=void 0,f=(m=p*p)*p,m*=3*(y=1-p),h<=(c={x:(d=3*(y*y)*p)*i[0]+m*i[2]+f,y:d*i[1]+m*i[3]+f}).x&&(r.push(g(c.x,c.y)),h+=s);r.push(g(1,1));}return E.push(o={animId:S,frameCallback:e,duration:t,count:a,frames:r,reverse:!!o}),!1!==l&&be(o,l),S},remove:function(n){var a;E.some(function(e,t){return e.animId===n&&(a=t,!(e.framesStart=null))})&&E.splice(a,1);},start:function(t,n,a){E.some(function(e){return e.animId===t&&(e.reverse=!!n,be(e,a),!0)});},stop:function(t,n){var a;return E.some(function(e){return e.animId===t&&(n?null!=e.lastFrame&&(a=e.frames[e.lastFrame].timeRatio):(a=(Date.now()-e.framesStart)/e.duration,(a=e.reverse?1-a:a)<0?a=0:1<a&&(a=1)),!(e.framesStart=null))}),a},validTiming:function(t){return "string"==typeof t?_[t]:Array.isArray(t)&&[0,1,2,3].every(function(e){return i(t[e])&&0<=t[e]&&t[e]<=1})?[t[0],t[1],t[2],t[3]]:null}}),ce=function(e){e.SVGPathElement.prototype.getPathData&&e.SVGPathElement.prototype.setPathData||function(){function i(e){this._string=e,this._currentIndex=0,this._endIndex=this._string.length,this._prevCommand=null,this._skipOptionalSpaces();}var a={Z:"Z",M:"M",L:"L",C:"C",Q:"Q",A:"A",H:"H",V:"V",S:"S",T:"T",z:"Z",m:"m",l:"l",c:"c",q:"q",a:"a",h:"h",v:"v",s:"s",t:"t"},o=-1!==e.navigator.userAgent.indexOf("MSIE ");i.prototype={parseSegment:function(){var e=this._string[this._currentIndex],t=a[e]||null;if(null===t){if(null===this._prevCommand)return null;if(null===(t=("+"===e||"-"===e||"."===e||"0"<=e&&e<="9")&&"Z"!==this._prevCommand?"M"===this._prevCommand?"L":"m"===this._prevCommand?"l":this._prevCommand:null))return null}else this._currentIndex+=1;var n=null,e=(this._prevCommand=t).toUpperCase();return "H"===e||"V"===e?n=[this._parseNumber()]:"M"===e||"L"===e||"T"===e?n=[this._parseNumber(),this._parseNumber()]:"S"===e||"Q"===e?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"C"===e?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"A"===e?n=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseArcFlag(),this._parseArcFlag(),this._parseNumber(),this._parseNumber()]:"Z"===e&&(this._skipOptionalSpaces(),n=[]),null===n||0<=n.indexOf(null)?null:{type:t,values:n}},hasMoreData:function(){return this._currentIndex<this._endIndex},peekSegmentType:function(){var e=this._string[this._currentIndex];return a[e]||null},initialCommandIsMoveTo:function(){if(!this.hasMoreData())return !0;var e=this.peekSegmentType();return "M"===e||"m"===e},_isCurrentSpace:function(){var e=this._string[this._currentIndex];return e<=" "&&(" "===e||"\n"===e||"\t"===e||"\r"===e||"\f"===e)},_skipOptionalSpaces:function(){for(;this._currentIndex<this._endIndex&&this._isCurrentSpace();)this._currentIndex+=1;return this._currentIndex<this._endIndex},_skipOptionalSpacesOrDelimiter:function(){return !(this._currentIndex<this._endIndex&&!this._isCurrentSpace()&&","!==this._string[this._currentIndex])&&(this._skipOptionalSpaces()&&this._currentIndex<this._endIndex&&","===this._string[this._currentIndex]&&(this._currentIndex+=1,this._skipOptionalSpaces()),this._currentIndex<this._endIndex)},_parseNumber:function(){var e=0,t=0,n=1,a=0,i=1,o=1,l=this._currentIndex;if(this._skipOptionalSpaces(),this._currentIndex<this._endIndex&&"+"===this._string[this._currentIndex]?this._currentIndex+=1:this._currentIndex<this._endIndex&&"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,i=-1),this._currentIndex===this._endIndex||(this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])&&"."!==this._string[this._currentIndex])return null;for(var r=this._currentIndex;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)this._currentIndex+=1;if(this._currentIndex!==r)for(var s=this._currentIndex-1,u=1;r<=s;)t+=u*(this._string[s]-"0"),--s,u*=10;if(this._currentIndex<this._endIndex&&"."===this._string[this._currentIndex]){if(this._currentIndex+=1,this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])return null;for(;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)n*=10,a+=(this._string.charAt(this._currentIndex)-"0")/n,this._currentIndex+=1;}if(this._currentIndex!==l&&this._currentIndex+1<this._endIndex&&("e"===this._string[this._currentIndex]||"E"===this._string[this._currentIndex])&&"x"!==this._string[this._currentIndex+1]&&"m"!==this._string[this._currentIndex+1]){if(this._currentIndex+=1,"+"===this._string[this._currentIndex]?this._currentIndex+=1:"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,o=-1),this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||"9"<this._string[this._currentIndex])return null;for(;this._currentIndex<this._endIndex&&"0"<=this._string[this._currentIndex]&&this._string[this._currentIndex]<="9";)e*=10,e+=this._string[this._currentIndex]-"0",this._currentIndex+=1;}var h=t+a;return h*=i,e&&(h*=Math.pow(10,o*e)),l===this._currentIndex?null:(this._skipOptionalSpacesOrDelimiter(),h)},_parseArcFlag:function(){if(this._currentIndex>=this._endIndex)return null;var e=null,t=this._string[this._currentIndex];if(this._currentIndex+=1,"0"===t)e=0;else {if("1"!==t)return null;e=1;}return this._skipOptionalSpacesOrDelimiter(),e}};function n(e){if(!e||0===e.length)return [];var t=new i(e),n=[];if(t.initialCommandIsMoveTo())for(;t.hasMoreData();){var a=t.parseSegment();if(null===a)break;n.push(a);}return n}function l(e){return e.map(function(e){return {type:e.type,values:Array.prototype.slice.call(e.values)}})}function r(e){var u=[],h=null,p=null,c=null,d=null,f=null,y=null,m=null;return e.forEach(function(e){var t,n,a,i,o,l,r,s;"M"===e.type?(r=e.values[0],s=e.values[1],u.push({type:"M",values:[r,s]}),d=y=r,f=m=s):"C"===e.type?(o=e.values[0],l=e.values[1],t=e.values[2],n=e.values[3],r=e.values[4],s=e.values[5],u.push({type:"C",values:[o,l,t,n,r,s]}),p=t,c=n,d=r,f=s):"L"===e.type?(r=e.values[0],s=e.values[1],u.push({type:"L",values:[r,s]}),d=r,f=s):"H"===e.type?(r=e.values[0],u.push({type:"L",values:[r,f]}),d=r):"V"===e.type?(s=e.values[0],u.push({type:"L",values:[d,s]}),f=s):"S"===e.type?(t=e.values[0],n=e.values[1],r=e.values[2],s=e.values[3],i="C"===h||"S"===h?(a=d+(d-p),f+(f-c)):(a=d,f),u.push({type:"C",values:[a,i,t,n,r,s]}),p=t,c=n,d=r,f=s):"T"===e.type?(r=e.values[0],s=e.values[1],l="Q"===h||"T"===h?(o=d+(d-p),f+(f-c)):(o=d,f),u.push({type:"C",values:[a=d+2*(o-d)/3,i=f+2*(l-f)/3,r+2*(o-r)/3,s+2*(l-s)/3,r,s]}),p=o,c=l,d=r,f=s):"Q"===e.type?(o=e.values[0],l=e.values[1],r=e.values[2],s=e.values[3],u.push({type:"C",values:[a=d+2*(o-d)/3,i=f+2*(l-f)/3,r+2*(o-r)/3,s+2*(l-s)/3,r,s]}),p=o,c=l,d=r,f=s):"A"===e.type?(n=e.values[0],a=e.values[1],i=e.values[2],o=e.values[3],l=e.values[4],r=e.values[5],s=e.values[6],0===n||0===a?(u.push({type:"C",values:[d,f,r,s,r,s]}),d=r,f=s):d===r&&f===s||b(d,f,r,s,n,a,i,o,l).forEach(function(e){u.push({type:"C",values:e}),d=r,f=s;})):"Z"===e.type&&(u.push(e),d=y,f=m),h=e.type;}),u}var s=e.SVGPathElement.prototype.setAttribute,u=e.SVGPathElement.prototype.removeAttribute,d=e.Symbol?e.Symbol():"__cachedPathData",f=e.Symbol?e.Symbol():"__cachedNormalizedPathData",b=function(e,t,n,a,i,o,l,r,s,u){function h(e,t,n){return {x:e*Math.cos(n)-t*Math.sin(n),y:e*Math.sin(n)+t*Math.cos(n)}}var p=Math.PI*l/180,c=[];u?(_=u[0],v=u[1],S=u[2],g=u[3]):(e=(m=h(e,t,-p)).x,t=m.y,1<(m=(y=(e-(n=(f=h(n,a,-p)).x))/2)*y/(i*i)+(d=(t-(a=f.y))/2)*d/(o*o))&&(i*=m=Math.sqrt(m),o*=m),f=i*i,m=o*o,S=(f=(r===s?-1:1)*Math.sqrt(Math.abs((f*m-f*d*d-m*y*y)/(f*d*d+m*y*y))))*i*d/o+(e+n)/2,g=f*-o*y/i+(t+a)/2,_=Math.asin(parseFloat(((t-g)/o).toFixed(9))),v=Math.asin(parseFloat(((a-g)/o).toFixed(9))),e<S&&(_=Math.PI-_),n<S&&(v=Math.PI-v),_<0&&(_=2*Math.PI+_),v<0&&(v=2*Math.PI+v),s&&v<_&&(_-=2*Math.PI),!s&&_<v&&(v-=2*Math.PI));var d,f,y,m=v-_;Math.abs(m)>120*Math.PI/180&&(d=v,f=n,y=a,v=s&&_<v?_+120*Math.PI/180*1:_+120*Math.PI/180*-1,n=S+i*Math.cos(v),a=g+o*Math.sin(v),c=b(n,a,f,y,i,o,l,0,s,[v,d,S,g]));var m=v-_,S=Math.cos(_),g=Math.sin(_),_=Math.cos(v),v=Math.sin(v),m=Math.tan(m/4),i=4/3*i*m,o=4/3*o*m,m=[e,t],S=[e+i*g,t-o*S],_=[n+i*v,a-o*_],a=[n,a];if(S[0]=2*m[0]-S[0],S[1]=2*m[1]-S[1],u)return [S,_,a].concat(c);var c=[S,_,a].concat(c).join().split(","),E=[],x=[];return c.forEach(function(e,t){t%2?x.push(h(c[t-1],c[t],p).y):x.push(h(c[t],c[t+1],p).x),6===x.length&&(E.push(x),x=[]);}),E};e.SVGPathElement.prototype.setAttribute=function(e,t){"d"===e&&(this[d]=null,this[f]=null),s.call(this,e,t);},e.SVGPathElement.prototype.removeAttribute=function(e,t){"d"===e&&(this[d]=null,this[f]=null),u.call(this,e);},e.SVGPathElement.prototype.getPathData=function(e){if(e&&e.normalize){if(this[f])return l(this[f]);this[d]?t=l(this[d]):(t=n(this.getAttribute("d")||""),this[d]=l(t));e=r((s=[],c=p=h=u=null,t.forEach(function(e){var t,n,a,i,o,l,r=e.type;"M"===r?(o=e.values[0],l=e.values[1],s.push({type:"M",values:[o,l]}),u=p=o,h=c=l):"m"===r?(o=u+e.values[0],l=h+e.values[1],s.push({type:"M",values:[o,l]}),u=p=o,h=c=l):"L"===r?(o=e.values[0],l=e.values[1],s.push({type:"L",values:[o,l]}),u=o,h=l):"l"===r?(o=u+e.values[0],l=h+e.values[1],s.push({type:"L",values:[o,l]}),u=o,h=l):"C"===r?(t=e.values[0],n=e.values[1],a=e.values[2],i=e.values[3],o=e.values[4],l=e.values[5],s.push({type:"C",values:[t,n,a,i,o,l]}),u=o,h=l):"c"===r?(t=u+e.values[0],n=h+e.values[1],a=u+e.values[2],i=h+e.values[3],o=u+e.values[4],l=h+e.values[5],s.push({type:"C",values:[t,n,a,i,o,l]}),u=o,h=l):"Q"===r?(t=e.values[0],n=e.values[1],o=e.values[2],l=e.values[3],s.push({type:"Q",values:[t,n,o,l]}),u=o,h=l):"q"===r?(t=u+e.values[0],n=h+e.values[1],o=u+e.values[2],l=h+e.values[3],s.push({type:"Q",values:[t,n,o,l]}),u=o,h=l):"A"===r?(o=e.values[5],l=e.values[6],s.push({type:"A",values:[e.values[0],e.values[1],e.values[2],e.values[3],e.values[4],o,l]}),u=o,h=l):"a"===r?(o=u+e.values[5],l=h+e.values[6],s.push({type:"A",values:[e.values[0],e.values[1],e.values[2],e.values[3],e.values[4],o,l]}),u=o,h=l):"H"===r?(o=e.values[0],s.push({type:"H",values:[o]}),u=o):"h"===r?(o=u+e.values[0],s.push({type:"H",values:[o]}),u=o):"V"===r?(l=e.values[0],s.push({type:"V",values:[l]}),h=l):"v"===r?(l=h+e.values[0],s.push({type:"V",values:[l]}),h=l):"S"===r?(a=e.values[0],i=e.values[1],o=e.values[2],l=e.values[3],s.push({type:"S",values:[a,i,o,l]}),u=o,h=l):"s"===r?(a=u+e.values[0],i=h+e.values[1],o=u+e.values[2],l=h+e.values[3],s.push({type:"S",values:[a,i,o,l]}),u=o,h=l):"T"===r?(o=e.values[0],l=e.values[1],s.push({type:"T",values:[o,l]}),u=o,h=l):"t"===r?(o=u+e.values[0],l=h+e.values[1],s.push({type:"T",values:[o,l]}),u=o,h=l):"Z"!==r&&"z"!==r||(s.push({type:"Z",values:[]}),u=p,h=c);}),s));return this[f]=l(e),e}if(this[d])return l(this[d]);var s,u,h,p,c,t=n(this.getAttribute("d")||"");return this[d]=l(t),t},e.SVGPathElement.prototype.setPathData=function(e){if(0===e.length)o?this.setAttribute("d",""):this.removeAttribute("d");else {for(var t="",n=0,a=e.length;n<a;n+=1){var i=e[n];0<n&&(t+=" "),t+=i.type,i.values&&0<i.values.length&&(t+=" "+i.values.join(" "));}this.setAttribute("d",t);}},e.SVGRectElement.prototype.getPathData=function(e){var t=this.x.baseVal.value,n=this.y.baseVal.value,a=this.width.baseVal.value,i=this.height.baseVal.value,o=(this.hasAttribute("rx")?this.rx:this.ry).baseVal.value,l=(this.hasAttribute("ry")?this.ry:this.rx).baseVal.value,n=(n=[{type:"M",values:[t+(o=a/2<o?a/2:o),n]},{type:"H",values:[t+a-o]},{type:"A",values:[o,l=i/2<l?i/2:l,0,0,1,t+a,n+l]},{type:"V",values:[n+i-l]},{type:"A",values:[o,l,0,0,1,t+a-o,n+i]},{type:"H",values:[t+o]},{type:"A",values:[o,l,0,0,1,t,n+i-l]},{type:"V",values:[n+l]},{type:"A",values:[o,l,0,0,1,t+o,n]},{type:"Z",values:[]}]).filter(function(e){return "A"!==e.type||0!==e.values[0]&&0!==e.values[1]});return n=e&&!0===e.normalize?r(n):n},e.SVGCircleElement.prototype.getPathData=function(e){var t=this.cx.baseVal.value,n=this.cy.baseVal.value,a=this.r.baseVal.value,n=[{type:"M",values:[t+a,n]},{type:"A",values:[a,a,0,0,1,t,n+a]},{type:"A",values:[a,a,0,0,1,t-a,n]},{type:"A",values:[a,a,0,0,1,t,n-a]},{type:"A",values:[a,a,0,0,1,t+a,n]},{type:"Z",values:[]}];return n=e&&!0===e.normalize?r(n):n},e.SVGEllipseElement.prototype.getPathData=function(e){var t=this.cx.baseVal.value,n=this.cy.baseVal.value,a=this.rx.baseVal.value,i=this.ry.baseVal.value,n=[{type:"M",values:[t+a,n]},{type:"A",values:[a,i,0,0,1,t,n+i]},{type:"A",values:[a,i,0,0,1,t-a,n]},{type:"A",values:[a,i,0,0,1,t,n-i]},{type:"A",values:[a,i,0,0,1,t+a,n]},{type:"Z",values:[]}];return n=e&&!0===e.normalize?r(n):n},e.SVGLineElement.prototype.getPathData=function(){return [{type:"M",values:[this.x1.baseVal.value,this.y1.baseVal.value]},{type:"L",values:[this.x2.baseVal.value,this.y2.baseVal.value]}]},e.SVGPolylineElement.prototype.getPathData=function(){for(var e=[],t=0;t<this.points.numberOfItems;t+=1){var n=this.points.getItem(t);e.push({type:0===t?"M":"L",values:[n.x,n.y]});}return e},e.SVGPolygonElement.prototype.getPathData=function(){for(var e=[],t=0;t<this.points.numberOfItems;t+=1){var n=this.points.getItem(t);e.push({type:0===t?"M":"L",values:[n.x,n.y]});}return e.push({type:"Z",values:[]}),e};}();},S=(a={},Ee.m=n=[function(e,t,n){n.r(t);var a=500,i=[],o=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},l=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(e){return clearTimeout(e)},r=Date.now(),s=void 0;function u(){var n=void 0,e=void 0;s&&(l.call(window,s),s=null),i.forEach(function(e){var t;(t=e.event)&&(e.event=null,e.listener(t),n=!0);}),n?(r=Date.now(),e=!0):Date.now()-r<a&&(e=!0),e&&(s=o.call(window,u));}function h(n){var a=-1;return i.some(function(e,t){return e.listener===n&&(a=t,!0)}),a}t.default={add:function(e){var t=void 0;return -1===h(e)?(i.push(t={listener:e}),function(e){t.event=e,s||u();}):null},remove:function(e){-1<(e=h(e))&&(i.splice(e,1),!i.length&&s&&(l.call(window,s),s=null));}};}],Ee.c=a,Ee.d=function(e,t,n){Ee.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},Ee.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},Ee.t=function(t,e){if(1&e&&(t=Ee(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(Ee.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)Ee.d(n,a,function(e){return t[e]}.bind(null,a));return n},Ee.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return Ee.d(t,"a",t),t},Ee.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},Ee.p="",Ee(Ee.s=0).default),de={line_altColor:{iniValue:!1},line_color:{},line_colorTra:{iniValue:!1},line_strokeWidth:{},plug_enabled:{iniValue:!1},plug_enabledSE:{hasSE:!0,iniValue:!1},plug_plugSE:{hasSE:!0,iniValue:Y},plug_colorSE:{hasSE:!0},plug_colorTraSE:{hasSE:!0,iniValue:!1},plug_markerWidthSE:{hasSE:!0},plug_markerHeightSE:{hasSE:!0},lineOutline_enabled:{iniValue:!1},lineOutline_color:{},lineOutline_colorTra:{iniValue:!1},lineOutline_strokeWidth:{},lineOutline_inStrokeWidth:{},plugOutline_enabledSE:{hasSE:!0,iniValue:!1},plugOutline_plugSE:{hasSE:!0,iniValue:Y},plugOutline_colorSE:{hasSE:!0},plugOutline_colorTraSE:{hasSE:!0,iniValue:!1},plugOutline_strokeWidthSE:{hasSE:!0},plugOutline_inStrokeWidthSE:{hasSE:!0},position_socketXYSE:{hasSE:!0,hasProps:!0},position_plugOverheadSE:{hasSE:!0},position_path:{},position_lineStrokeWidth:{},position_socketGravitySE:{hasSE:!0},path_pathData:{},path_edge:{hasProps:!0},viewBox_bBox:{hasProps:!0},viewBox_plugBCircleSE:{hasSE:!0},lineMask_enabled:{iniValue:!1},lineMask_outlineMode:{iniValue:!1},lineMask_x:{},lineMask_y:{},lineOutlineMask_x:{},lineOutlineMask_y:{},maskBGRect_x:{},maskBGRect_y:{},capsMaskAnchor_enabledSE:{hasSE:!0,iniValue:!1},capsMaskAnchor_pathDataSE:{hasSE:!0},capsMaskAnchor_strokeWidthSE:{hasSE:!0},capsMaskMarker_enabled:{iniValue:!1},capsMaskMarker_enabledSE:{hasSE:!0,iniValue:!1},capsMaskMarker_plugSE:{hasSE:!0,iniValue:Y},capsMaskMarker_markerWidthSE:{hasSE:!0},capsMaskMarker_markerHeightSE:{hasSE:!0},caps_enabled:{iniValue:!1},attach_plugSideLenSE:{hasSE:!0},attach_plugBackLenSE:{hasSE:!0}},fe={show_on:{},show_effect:{},show_animOptions:{},show_animId:{},show_inAnim:{}},ye="fade",me=[],Se={},ge=0,_e={},ve=0;function Ee(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,Ee),t.l=!0,t.exports}function xe(){var i=Date.now(),o=!1;e&&(r.call(window,e),e=null),E.forEach(function(e){var t,n,a;if(e.framesStart){if((t=i-e.framesStart)>=e.duration&&e.count&&e.loopsLeft<=1)return a=e.frames[e.lastFrame=e.reverse?0:e.frames.length-1],e.frameCallback(a.value,!0,a.timeRatio,a.outputRatio),void(e.framesStart=null);if(t>e.duration){if(n=Math.floor(t/e.duration),e.count){if(n>=e.loopsLeft)return a=e.frames[e.lastFrame=e.reverse?0:e.frames.length-1],e.frameCallback(a.value,!0,a.timeRatio,a.outputRatio),void(e.framesStart=null);e.loopsLeft-=n;}e.framesStart+=e.duration*n,t=i-e.framesStart;}e.reverse&&(t=e.duration-t),a=e.frames[e.lastFrame=Math.round(t/v)],!1!==e.frameCallback(a.value,!1,a.timeRatio,a.outputRatio)?o=!0:e.framesStart=null;}}),o&&(e=l.call(window,xe));}function be(e,t){e.framesStart=Date.now(),null!=t&&(e.framesStart-=e.duration*(e.reverse?1-t:t)),e.loopsLeft=e.count,e.lastFrame=null,xe();}function ke(t,n){var e,a;return typeof t!=typeof n||(e=he(t)?"obj":Array.isArray(t)?"array":"")!=(he(n)?"obj":Array.isArray(n)?"array":"")||("obj"===e?ke(a=Object.keys(t).sort(),Object.keys(n).sort())||a.some(function(e){return ke(t[e],n[e])}):"array"===e?t.length!==n.length||t.some(function(e,t){return ke(e,n[t])}):t!==n)}function we(n){return n&&(he(n)?Object.keys(n).reduce(function(e,t){return e[t]=we(n[t]),e},{}):Array.isArray(n)?n.map(we):n)}function Oe(e){var t,n,a,i=1,o=e=(e+"").trim();function l(e){var t=1,e=m.exec(e);return e&&(t=parseFloat(e[1]),e[2]?t=0<=t&&t<=100?t/100:1:(t<0||1<t)&&(t=1)),t}return (t=/^(rgba|hsla|hwb|gray|device\-cmyk)\s*\(([\s\S]+)\)$/i.exec(e))?(n=t[1].toLowerCase(),a=t[2].trim().split(/\s*,\s*/),"rgba"===n&&4===a.length?(i=l(a[3]),o="rgb("+a.slice(0,3).join(", ")+")"):"hsla"===n&&4===a.length?(i=l(a[3]),o="hsl("+a.slice(0,3).join(", ")+")"):"hwb"===n&&4===a.length?(i=l(a[3]),o="hwb("+a.slice(0,3).join(", ")+")"):"gray"===n&&2===a.length?(i=l(a[1]),o="gray("+a[0]+")"):"device-cmyk"===n&&5<=a.length&&(i=l(a[4]),o="device-cmyk("+a.slice(0,4).join(", ")+")")):(t=/^\#(?:([\da-f]{6})([\da-f]{2})|([\da-f]{3})([\da-f]))$/i.exec(e))?o=t[1]?(i=parseInt(t[2],16)/255,"#"+t[1]):(i=parseInt(t[4]+t[4],16)/255,"#"+t[3]):"transparent"===e.toLocaleLowerCase()&&(i=0),[i,o]}function Me(e){return !(!e||e.nodeType!==Node.ELEMENT_NODE||"function"!=typeof e.getBoundingClientRect)}function Ie(e,t){var n,a,i,o={};if(!(i=e.ownerDocument))return console.error("Cannot get document that contains the element."),null;if(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_DISCONNECTED)return console.error("A disconnected element was passed."),null;for(a in n=e.getBoundingClientRect())o[a]=n[a];if(!t){if(!(i=i.defaultView))return console.error("Cannot get window that contains the element."),null;o.left+=i.pageXOffset,o.right+=i.pageXOffset,o.top+=i.pageYOffset,o.bottom+=i.pageYOffset;}return o}function Ce(e,t){var n,a=[],i=e;for(t=t||window;;){if(!(n=i.ownerDocument))return console.error("Cannot get document that contains the element."),null;if(!(n=n.defaultView))return console.error("Cannot get window that contains the element."),null;if(n===t)break;if(!(i=n.frameElement))return console.error("`baseWindow` was not found."),null;a.unshift(i);}return a}function Le(e,t){var a=0,i=0;return (t=Ce(e,t=t||window))?t.length?(t.forEach(function(e,t){var n=Ie(e,0<t);a+=n.left,i+=n.top,e=(t=e).ownerDocument.defaultView.getComputedStyle(t,""),n={left:t.clientLeft+parseFloat(e.paddingLeft),top:t.clientTop+parseFloat(e.paddingTop)},a+=n.left,i+=n.top;}),(t=Ie(e,!0)).left+=a,t.right+=a,t.top+=i,t.bottom+=i,t):Ie(e):null}function Ae(e,t){var n=e.x-t.x,t=e.y-t.y;return Math.sqrt(n*n+t*t)}function Ve(e,t,n){var a=t.x-e.x,t=t.y-e.y;return {x:e.x+a*n,y:e.y+t*n,angle:Math.atan2(t,a)/(Math.PI/180)}}function Pe(e,t,n){e=Math.atan2(e.y-t.y,t.x-e.x);return {x:t.x+Math.cos(e)*n,y:t.y+Math.sin(e)*n*-1}}function Ne(e,t,n,a,i){var o=i*i,l=o*i,r=1-i,s=r*r,u=s*r,h=u*e.x+3*s*i*t.x+3*r*o*n.x+l*a.x,p=u*e.y+3*s*i*t.y+3*r*o*n.y+l*a.y,c=e.x+2*i*(t.x-e.x)+o*(n.x-2*t.x+e.x),u=e.y+2*i*(t.y-e.y)+o*(n.y-2*t.y+e.y),s=t.x+2*i*(n.x-t.x)+o*(a.x-2*n.x+t.x),l=t.y+2*i*(n.y-t.y)+o*(a.y-2*n.y+t.y),o=r*e.x+i*t.x,e=r*e.y+i*t.y,t=r*n.x+i*a.x,i=r*n.y+i*a.y,a=90-180*Math.atan2(c-s,u-l)/Math.PI;return {x:h,y:p,fromP2:{x:c,y:u},toP1:{x:s,y:l},fromP1:{x:o,y:e},toP2:{x:t,y:i},angle:a+=180<a?-180:180}}function Te(n,a,i,o,e){function l(e,t,n,a,i){return e*(e*(-3*t+9*n-9*a+3*i)+6*t-12*n+6*a)-3*t+3*n}var r,s,u=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],h=0,p=(e=null==e||1<e?1:e<0?0:e)/2;return [-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816].forEach(function(e,t){r=l(s=p*e+p,n.x,a.x,i.x,o.x),s=l(s,n.y,a.y,i.y,o.y),s=r*r+s*s,h+=u[t]*Math.sqrt(s);}),p*h}function We(e,t,n,a,i){for(var o,l=.5,r=1-l;o=Te(e,t,n,a,r),!(Math.abs(o-i)<=.01);)r+=(o<i?1:-1)*(l/=2);return r}function Be(e,t){var n;return e.forEach(function(e){e=t?e.map(function(e){e={x:e.x,y:e.y};return t(e),e}):e;(n=n||[{type:"M",values:[e[0].x,e[0].y]}]).push(e.length?2===e.length?{type:"L",values:[e[1].x,e[1].y]}:{type:"C",values:[e[1].x,e[1].y,e[2].x,e[2].y,e[3].x,e[3].y]}:{type:"Z",values:[]});}),n}function Re(e){var t=[],n=0;return e.forEach(function(e){e=(2===e.length?Ae:Te).apply(null,e);t.push(e),n+=e;}),{segsLen:t,lenAll:n}}function Fe(e,a){return null==e||null==a||e.length!==a.length||e.some(function(e,t){var n=a[t];return e.type!==n.type||e.values.some(function(e,t){return e!==n.values[t]})})}function Ge(e,t,n){e.events[t]?e.events[t].indexOf(n)<0&&e.events[t].push(n):e.events[t]=[n];}function De(e,t,n){var a;e.events[t]&&-1<(a=e.events[t].indexOf(n))&&e.events[t].splice(a,1);}function ze(e){t&&clearTimeout(t),me.push(e),t=setTimeout(function(){me.forEach(function(e){e();}),me=[];},0);}function je(e,t){e.reflowTargets.indexOf(t)<0&&e.reflowTargets.push(t);}function He(e){e.reflowTargets.forEach(function(e){var n;n=e,setTimeout(function(){var e=n.parentNode,t=n.nextSibling;e.insertBefore(e.removeChild(n),t);},0);}),e.reflowTargets=[];}function Ue(e,t,n,a,i,o,l){var r;"auto-start-reverse"===n?("boolean"!=typeof s&&(t.setAttribute("orient","auto-start-reverse"),s=t.orientType.baseVal===SVGMarkerElement.SVG_MARKER_ORIENT_UNKNOWN),s?t.setAttribute("orient",n):((r=i.createSVGTransform()).setRotate(180,0,0),o.transform.baseVal.appendItem(r),t.setAttribute("orient","auto"),r=!0)):(t.setAttribute("orient",n),!1===s&&o.transform.baseVal.clear()),t=t.viewBox.baseVal,r?(t.x=-a.right,t.y=-a.bottom):(t.x=a.left,t.y=a.top),t.width=a.width,t.height=a.height,ie&&je(e,l);}function Ze(e,t){return {prop:e?"markerEnd":"markerStart",orient:t?t.noRotate?"0":e?"auto":"auto-start-reverse":null}}function Ye(n,a){Object.keys(a).forEach(function(e){var t=a[e];n[e]=null!=t.iniValue?t.hasSE?[t.iniValue,t.iniValue]:t.iniValue:t.hasSE?t.hasProps?[{},{}]:[]:t.hasProps?{}:null;});}function Xe(t,e,n,a,i){return a!==e[n]&&(e[n]=a,i&&i.forEach(function(e){e(t,a,n);}),!0)}function qe(e){function t(e,t){return e+parseFloat(t)}var n=e.document,a=e.getComputedStyle(n.documentElement,""),e=e.getComputedStyle(n.body,""),n={x:0,y:0};return "static"!==e.position?(n.x-=[a.marginLeft,a.borderLeftWidth,a.paddingLeft,e.marginLeft,e.borderLeftWidth].reduce(t,0),n.y-=[a.marginTop,a.borderTopWidth,a.paddingTop,e.marginTop,e.borderTopWidth].reduce(t,0)):"static"!==a.position&&(n.x-=[a.marginLeft,a.borderLeftWidth].reduce(t,0),n.y-=[a.marginTop,a.borderTopWidth].reduce(t,0)),n}function Qe(e){var t,n=e.document;n.getElementById(f)||(t=(new e.DOMParser).parseFromString(y,"image/svg+xml"),n.body.appendChild(t.documentElement),ce(e));}function Ke(l){var g,c,_,e,n,a,i,d,o,r,s,t,u,h,p=l.options,f=l.curStats,y=l.aplStats,v=f.position_socketXYSE,m=!1;function S(e,t){e=t===b?{x:e.left+e.width/2,y:e.top}:t===k?{x:e.right,y:e.top+e.height/2}:t===L?{x:e.left+e.width/2,y:e.bottom}:{x:e.left,y:e.top+e.height/2};return e.socketId=t,e}function E(e){return {x:e.x,y:e.y}}if(f.position_path=p.path,f.position_lineStrokeWidth=f.line_strokeWidth,f.position_socketGravitySE=g=we(p.socketGravitySE),c=[0,1].map(function(e){var t=p.anchorSE[e],n=l.optionIsAttach.anchorSE[e],a=!1!==n?_e[t._id]:null,i=!1!==n&&a.conf.getStrokeWidth?a.conf.getStrokeWidth(a,l):0,o=!1!==n&&a.conf.getBBoxNest?a.conf.getBBoxNest(a,l,i):Le(t,l.baseWindow);return f.capsMaskAnchor_pathDataSE[e]=!1!==n&&a.conf.getPathData?a.conf.getPathData(a,l,i):(n=null!=(t=o).right?t.right:t.left+t.width,a=null!=t.bottom?t.bottom:t.top+t.height,[{type:"M",values:[t.left,t.top]},{type:"L",values:[n,t.top]},{type:"L",values:[n,a]},{type:"L",values:[t.left,a]},{type:"Z",values:[]}]),f.capsMaskAnchor_strokeWidthSE[e]=i,o}),i=-1,p.socketSE[0]&&p.socketSE[1]?(v[0]=S(c[0],p.socketSE[0]),v[1]=S(c[1],p.socketSE[1])):(p.socketSE[0]||p.socketSE[1]?(a=p.socketSE[0]?(n=0,1):(n=1,0),v[n]=S(c[n],p.socketSE[n]),(e=G.map(function(e){return S(c[a],e)})).forEach(function(e){var t=Ae(e,v[n]);(t<i||-1===i)&&(v[a]=e,i=t);})):(e=G.map(function(e){return S(c[1],e)}),G.map(function(e){return S(c[0],e)}).forEach(function(n){e.forEach(function(e){var t=Ae(n,e);(t<i||-1===i)&&(v[0]=n,v[1]=e,i=t);});})),[0,1].forEach(function(e){var t,n;p.socketSE[e]||(c[e].width||c[e].height?c[e].width||v[e].socketId!==A&&v[e].socketId!==k?c[e].height||v[e].socketId!==b&&v[e].socketId!==L||(v[e].socketId=0<=v[e?0:1].y-c[e].top?L:b):v[e].socketId=0<=v[e?0:1].x-c[e].left?k:A:(t=v[e?0:1].x-c[e].left,n=v[e?0:1].y-c[e].top,v[e].socketId=Math.abs(t)>=Math.abs(n)?0<=t?k:A:0<=n?L:b));})),f.position_path!==y.position_path||f.position_lineStrokeWidth!==y.position_lineStrokeWidth||[0,1].some(function(e){return f.position_plugOverheadSE[e]!==y.position_plugOverheadSE[e]||(t=v[e],n=y.position_socketXYSE[e],t.x!==n.x||t.y!==n.y||t.socketId!==n.socketId)||(t=g[e],n=y.position_socketGravitySE[e],(e=null==t?"auto":Array.isArray(t)?"array":"number")!=(null==n?"auto":Array.isArray(n)?"array":"number")||("array"==e?t[0]!==n[0]||t[1]!==n[1]:t!==n));var t,n;})){switch(l.pathList.baseVal=_=[],l.pathList.animVal=null,f.position_path){case P:_.push([E(v[0]),E(v[1])]);break;case N:t="number"==typeof g[0]&&0<g[0]||"number"==typeof g[1]&&0<g[1],u=ne*(t?-1:1),h=Math.atan2(v[1].y-v[0].y,v[1].x-v[0].x),t=u-h,h=Math.PI-h-u,u=Ae(v[0],v[1])/Math.sqrt(2)*te,t={x:v[0].x+Math.cos(t)*u,y:v[0].y+Math.sin(t)*u*-1},u={x:v[1].x+Math.cos(h)*u,y:v[1].y+Math.sin(h)*u*-1},_.push([E(v[0]),t,u,E(v[1])]);break;case T:case W:o=[g[0],f.position_path===W?0:g[1]],r=[],s=[],v.forEach(function(e,t){var n,a=o[t],i=Array.isArray(a)?{x:a[0],y:a[1]}:"number"==typeof a?e.socketId===b?{x:0,y:-a}:e.socketId===k?{x:a,y:0}:e.socketId===L?{x:0,y:a}:{x:-a,y:0}:(n=v[t?0:1],a=0<(a=f.position_plugOverheadSE[t])?U+(K<a?(a-K)*J:0):z+(f.position_lineStrokeWidth>j?(f.position_lineStrokeWidth-j)*H:0),e.socketId===b?{x:0,y:-(i=(i=(e.y-n.y)/2)<a?a:i)}:e.socketId===k?{x:i=(i=(n.x-e.x)/2)<a?a:i,y:0}:e.socketId===L?{x:0,y:i=(i=(n.y-e.y)/2)<a?a:i}:{x:-(i=(i=(e.x-n.x)/2)<a?a:i),y:0});r[t]=e.x+i.x,s[t]=e.y+i.y;}),_.push([E(v[0]),{x:r[0],y:s[0]},{x:r[1],y:s[1]},E(v[1])]);break;case B:!function(){var n,i=1,l=2,r=3,o=4,s=[[],[]],u=[];function h(e){return e===i?r:e===l?o:e===r?i:l}function p(e){return e===l||e===o?"x":"y"}function c(e,t,n){var a={x:e.x,y:e.y};if(n){if(n===h(e.dirId))throw new Error("Invalid dirId: "+n);a.dirId=n;}else a.dirId=e.dirId;return a.dirId===i?a.y-=t:a.dirId===l?a.x+=t:a.dirId===r?a.y+=t:a.x-=t,a}function d(e,t){return t.dirId===i?e.y<=t.y:t.dirId===l?e.x>=t.x:t.dirId===r?e.y>=t.y:e.x<=t.x}function f(e,t){return t.dirId===i||t.dirId===r?e.x===t.x:e.y===t.y}function y(e){return e[0]?{contain:0,notContain:1}:{contain:1,notContain:0}}function m(e,t,n){return Math.abs(t[n]-e[n])}function S(e,t,n){return "x"===n?e.x<t.x?l:o:e.y<t.y?r:i}for(v.forEach(function(e,t){var n=E(e),a=g[t];e=Array.isArray(a)?a[0]<0?[o,-a[0]]:0<a[0]?[l,a[0]]:a[1]<0?[i,-a[1]]:0<a[1]?[r,a[1]]:[e.socketId,0]:"number"!=typeof a?[e.socketId,ee]:0<=a?[e.socketId,a]:[h(e.socketId),-a],n.dirId=e[0],a=e[1],s[t].push(n),u[t]=c(n,a);});function(){var e,t,a,i,n=[d(u[1],u[0]),d(u[0],u[1])],o=[p(u[0].dirId),p(u[1].dirId)];if(o[0]===o[1]){if(n[0]&&n[1])return void(f(u[1],u[0])||(u[0][o[0]]===u[1][o[1]]?(s[0].push(u[0]),s[1].push(u[1])):(e=u[0][o[0]]+(u[1][o[1]]-u[0][o[0]])/2,s[0].push(c(u[0],Math.abs(e-u[0][o[0]]))),s[1].push(c(u[1],Math.abs(e-u[1][o[1]]))))));n[0]!==n[1]?(t=y(n),(a=m(u[t.notContain],u[t.contain],o[t.notContain]))<ee&&(u[t.notContain]=c(u[t.notContain],ee-a)),s[t.notContain].push(u[t.notContain]),u[t.notContain]=c(u[t.notContain],ee,f(u[t.contain],u[t.notContain])?"x"===o[t.notContain]?r:l:S(u[t.notContain],u[t.contain],"x"===o[t.notContain]?"y":"x"))):(a=m(u[0],u[1],"x"===o[0]?"y":"x"),s.forEach(function(e,t){var n=0===t?1:0;e.push(u[t]),u[t]=c(u[t],ee,2*ee<=a?S(u[t],u[n],"x"===o[t]?"y":"x"):"x"===o[t]?r:l);}));}else {if(n[0]&&n[1])return void(f(u[1],u[0])?s[1].push(u[1]):f(u[0],u[1])?s[0].push(u[0]):s[0].push("x"===o[0]?{x:u[1].x,y:u[0].y}:{x:u[0].x,y:u[1].y}));n[0]!==n[1]?(t=y(n),s[t.notContain].push(u[t.notContain]),u[t.notContain]=c(u[t.notContain],ee,m(u[t.notContain],u[t.contain],o[t.contain])>=ee?S(u[t.notContain],u[t.contain],o[t.contain]):u[t.contain].dirId)):(i=[{x:u[0].x,y:u[0].y},{x:u[1].x,y:u[1].y}],s.forEach(function(e,t){var n=0===t?1:0,a=m(i[t],i[n],o[t]);a<ee&&(u[t]=c(u[t],ee-a)),e.push(u[t]),u[t]=c(u[t],ee,S(u[t],u[n],o[n]));}));}return 1}(););s[1].reverse(),s[0].concat(s[1]).forEach(function(e,t){e={x:e.x,y:e.y};0<t&&_.push([n,e]),n=e;});}();}d=[],f.position_plugOverheadSE.forEach(function(e,t){var n,a,i,o,l,r,s,u,h,p=!t;0<e?2===(n=_[a=p?0:_.length-1]).length?(d[a]=d[a]||Ae.apply(null,n),d[a]>$&&(d[a]-e<$&&(e=d[a]-$),s=Ve(n[0],n[1],(p?e:d[a]-e)/d[a]),_[a]=p?[s,n[1]]:[n[0],s],d[a]-=e)):(d[a]=d[a]||Te.apply(null,n),d[a]>$&&(d[a]-e<$&&(e=d[a]-$),s=Ne(n[0],n[1],n[2],n[3],We(n[0],n[1],n[2],n[3],p?e:d[a]-e)),o=p?(i=n[0],s.toP1):(i=n[3],s.fromP2),l=Math.atan2(i.y-s.y,s.x-i.x),r=Ae(s,o),s.x=i.x+Math.cos(l)*e,s.y=i.y+Math.sin(l)*e*-1,o.x=s.x+Math.cos(l)*r,o.y=s.y+Math.sin(l)*r*-1,_[a]=p?[s,s.toP1,s.toP2,n[3]]:[n[0],s.fromP1,s.fromP2,s],d[a]=null)):e<0&&(n=_[a=p?0:_.length-1],s=v[t].socketId,t=-c[t]["x"==(u=s===A||s===k?"x":"y")?"width":"height"],h=(e=e<t?t:e)*(s===A||s===b?-1:1),2===n.length?n[p?0:n.length-1][u]+=h:(p?[0,1]:[n.length-2,n.length-1]).forEach(function(e){n[e][u]+=h;}),d[a]=null);}),y.position_socketXYSE=we(v),y.position_plugOverheadSE=we(f.position_plugOverheadSE),y.position_path=f.position_path,y.position_lineStrokeWidth=f.position_lineStrokeWidth,y.position_socketGravitySE=we(g),m=!0,l.events.apl_position&&l.events.apl_position.forEach(function(e){e(l,_);});}return m}function Je(t,n){n!==t.isShown&&(!!n!=!!t.isShown&&(t.svg.style.visibility=n?"":"hidden"),t.isShown=n,t.events&&t.events.svgShow&&t.events.svgShow.forEach(function(e){e(t,n);}));}function $e(e,t){var n,a,h,p,c,d,f,i,o,l,r,s,u,y,m,S,g,_,v,E,x,b,k,w,O,M,I,C,L,A,V,P,N,T,W,B,R,F,G,D,z,j,H,U={};t.line&&(U.line=(i=(n=e).options,a=n.curStats,o=n.events,l=!1,l=Xe(n,a,"line_color",i.lineColor,o.cur_line_color)||l,l=Xe(n,a,"line_colorTra",Oe(a.line_color)[0]<1)||l,l=Xe(n,a,"line_strokeWidth",i.lineSize,o.cur_line_strokeWidth)||l)),(t.plug||U.line)&&(U.plug=(p=(h=e).options,c=h.curStats,d=h.events,f=!1,[0,1].forEach(function(e){var t,n,a,i,o,l,r,s,u=p.plugSE[e];f=Xe(h,c.plug_enabledSE,e,u!==Y)||f,f=Xe(h,c.plug_plugSE,e,u)||f,f=Xe(h,c.plug_colorSE,e,s=p.plugColorSE[e]||c.line_color,d.cur_plug_colorSE)||f,f=Xe(h,c.plug_colorTraSE,e,Oe(s)[0]<1)||f,u!==Y&&(i=n=(t=X[q[u]]).widthR*p.plugSizeSE[e],o=a=t.heightR*p.plugSizeSE[e],re&&(i*=c.line_strokeWidth,o*=c.line_strokeWidth),f=Xe(h,c.plug_markerWidthSE,e,i)||f,f=Xe(h,c.plug_markerHeightSE,e,o)||f,c.capsMaskMarker_markerWidthSE[e]=n,c.capsMaskMarker_markerHeightSE[e]=a),c.plugOutline_plugSE[e]=c.capsMaskMarker_plugSE[e]=u,c.plug_enabledSE[e]?(s=c.line_strokeWidth/ue.lineSize*p.plugSizeSE[e],c.position_plugOverheadSE[e]=t.overhead*s,c.viewBox_plugBCircleSE[e]=t.bCircle*s,l=t.sideLen*s,r=t.backLen*s):(c.position_plugOverheadSE[e]=-c.line_strokeWidth/2,c.viewBox_plugBCircleSE[e]=l=r=0),Xe(h,c.attach_plugSideLenSE,e,l,d.cur_attach_plugSideLenSE),Xe(h,c.attach_plugBackLenSE,e,r,d.cur_attach_plugBackLenSE),c.capsMaskAnchor_enabledSE[e]=!c.plug_enabledSE[e];}),f=Xe(h,c,"plug_enabled",c.plug_enabledSE[0]||c.plug_enabledSE[1])||f)),(t.lineOutline||U.line)&&(U.lineOutline=(o=(i=e).options,l=i.curStats,k=!1,k=Xe(i,l,"lineOutline_enabled",o.lineOutlineEnabled)||k,k=Xe(i,l,"lineOutline_color",o.lineOutlineColor)||k,k=Xe(i,l,"lineOutline_colorTra",Oe(l.lineOutline_color)[0]<1)||k,o=l.line_strokeWidth*o.lineOutlineSize,k=Xe(i,l,"lineOutline_strokeWidth",l.line_strokeWidth-2*o)||k,k=Xe(i,l,"lineOutline_inStrokeWidth",l.lineOutline_colorTra?l.lineOutline_strokeWidth+2*se:l.line_strokeWidth-o)||k)),(t.plugOutline||U.line||U.plug||U.lineOutline)&&(U.plugOutline=(s=(r=e).options,u=r.curStats,y=!1,[0,1].forEach(function(e){var t=u.plugOutline_plugSE[e],n=t!==Y?X[q[t]]:null;y=Xe(r,u.plugOutline_enabledSE,e,s.plugOutlineEnabledSE[e]&&u.plug_enabled&&u.plug_enabledSE[e]&&!!n&&!!n.outlineBase)||y,y=Xe(r,u.plugOutline_colorSE,e,t=s.plugOutlineColorSE[e]||u.lineOutline_color)||y,y=Xe(r,u.plugOutline_colorTraSE,e,Oe(t)[0]<1)||y,n&&n.outlineBase&&((t=s.plugOutlineSizeSE[e])>n.outlineMax&&(t=n.outlineMax),t*=2*n.outlineBase,y=Xe(r,u.plugOutline_strokeWidthSE,e,t)||y,y=Xe(r,u.plugOutline_inStrokeWidthSE,e,u.plugOutline_colorTraSE[e]?t-se/(u.line_strokeWidth/ue.lineSize)/s.plugSizeSE[e]*2:t/2)||y);}),y)),(t.faces||U.line||U.plug||U.lineOutline||U.plugOutline)&&(U.faces=(g=(m=e).curStats,_=m.aplStats,v=m.events,E=!1,!g.line_altColor&&Xe(m,_,"line_color",S=g.line_color,v.apl_line_color)&&(m.lineFace.style.stroke=S,E=!0),Xe(m,_,"line_strokeWidth",S=g.line_strokeWidth,v.apl_line_strokeWidth)&&(m.lineShape.style.strokeWidth=S+"px",E=!0,(oe||ie)&&(je(m,m.lineShape),ie&&(je(m,m.lineFace),je(m,m.lineMaskCaps)))),Xe(m,_,"lineOutline_enabled",S=g.lineOutline_enabled,v.apl_lineOutline_enabled)&&(m.lineOutlineFace.style.display=S?"inline":"none",E=!0),g.lineOutline_enabled&&(Xe(m,_,"lineOutline_color",S=g.lineOutline_color,v.apl_lineOutline_color)&&(m.lineOutlineFace.style.stroke=S,E=!0),Xe(m,_,"lineOutline_strokeWidth",S=g.lineOutline_strokeWidth,v.apl_lineOutline_strokeWidth)&&(m.lineOutlineMaskShape.style.strokeWidth=S+"px",E=!0,ie&&(je(m,m.lineOutlineMaskCaps),je(m,m.lineOutlineFace))),Xe(m,_,"lineOutline_inStrokeWidth",S=g.lineOutline_inStrokeWidth,v.apl_lineOutline_inStrokeWidth)&&(m.lineMaskShape.style.strokeWidth=S+"px",E=!0,ie&&(je(m,m.lineOutlineMaskCaps),je(m,m.lineOutlineFace)))),Xe(m,_,"plug_enabled",S=g.plug_enabled,v.apl_plug_enabled)&&(m.plugsFace.style.display=S?"inline":"none",E=!0),g.plug_enabled&&[0,1].forEach(function(n){var e=g.plug_plugSE[n],t=e!==Y?X[q[e]]:null,a=Ze(n,t);Xe(m,_.plug_enabledSE,n,S=g.plug_enabledSE[n],v.apl_plug_enabledSE)&&(m.plugsFace.style[a.prop]=S?"url(#"+m.plugMarkerIdSE[n]+")":"none",E=!0),g.plug_enabledSE[n]&&(Xe(m,_.plug_plugSE,n,e,v.apl_plug_plugSE)&&(m.plugFaceSE[n].href.baseVal="#"+t.elmId,Ue(m,m.plugMarkerSE[n],a.orient,t.bBox,m.svg,m.plugMarkerShapeSE[n],m.plugsFace),E=!0,oe&&je(m,m.plugsFace)),Xe(m,_.plug_colorSE,n,S=g.plug_colorSE[n],v.apl_plug_colorSE)&&(m.plugFaceSE[n].style.fill=S,E=!0,(le||re||ie)&&!g.line_colorTra&&je(m,ie?m.lineMaskCaps:m.capsMaskLine)),["markerWidth","markerHeight"].forEach(function(e){var t="plug_"+e+"SE";Xe(m,_[t],n,S=g[t][n],v["apl_"+t])&&(m.plugMarkerSE[n][e].baseVal.value=S,E=!0);}),Xe(m,_.plugOutline_enabledSE,n,S=g.plugOutline_enabledSE[n],v.apl_plugOutline_enabledSE)&&(S?(m.plugFaceSE[n].style.mask="url(#"+m.plugMaskIdSE[n]+")",m.plugOutlineFaceSE[n].style.display="inline"):(m.plugFaceSE[n].style.mask="none",m.plugOutlineFaceSE[n].style.display="none"),E=!0),g.plugOutline_enabledSE[n]&&(Xe(m,_.plugOutline_plugSE,n,e,v.apl_plugOutline_plugSE)&&(m.plugOutlineFaceSE[n].href.baseVal=m.plugMaskShapeSE[n].href.baseVal=m.plugOutlineMaskShapeSE[n].href.baseVal="#"+t.elmId,[m.plugMaskSE[n],m.plugOutlineMaskSE[n]].forEach(function(e){e.x.baseVal.value=t.bBox.left,e.y.baseVal.value=t.bBox.top,e.width.baseVal.value=t.bBox.width,e.height.baseVal.value=t.bBox.height;}),E=!0),Xe(m,_.plugOutline_colorSE,n,S=g.plugOutline_colorSE[n],v.apl_plugOutline_colorSE)&&(m.plugOutlineFaceSE[n].style.fill=S,E=!0,ie&&(je(m,m.lineMaskCaps),je(m,m.lineOutlineMaskCaps))),Xe(m,_.plugOutline_strokeWidthSE,n,S=g.plugOutline_strokeWidthSE[n],v.apl_plugOutline_strokeWidthSE)&&(m.plugOutlineMaskShapeSE[n].style.strokeWidth=S+"px",E=!0),Xe(m,_.plugOutline_inStrokeWidthSE,n,S=g.plugOutline_inStrokeWidthSE[n],v.apl_plugOutline_inStrokeWidthSE)&&(m.plugMaskShapeSE[n].style.strokeWidth=S+"px",E=!0)));}),E)),(t.position||U.line||U.plug)&&(U.position=Ke(e)),(t.path||U.position)&&(U.path=(k=(x=e).curStats,I=x.aplStats,M=x.pathList.animVal||x.pathList.baseVal,w=k.path_edge,C=!1,M&&(w.x1=w.x2=M[0][0].x,w.y1=w.y2=M[0][0].y,k.path_pathData=b=Be(M,function(e){e.x<w.x1&&(w.x1=e.x),e.y<w.y1&&(w.y1=e.y),e.x>w.x2&&(w.x2=e.x),e.y>w.y2&&(w.y2=e.y);}),Fe(b,I.path_pathData)&&(x.linePath.setPathData(b),I.path_pathData=b,C=!0,ie?(je(x,x.plugsFace),je(x,x.lineMaskCaps)):oe&&je(x,x.linePath),x.events.apl_path&&x.events.apl_path.forEach(function(e){e(x,b);}))),C)),U.viewBox=(M=(O=e).curStats,I=O.aplStats,C=M.path_edge,L=M.viewBox_bBox,A=I.viewBox_bBox,V=O.svg.viewBox.baseVal,P=O.svg.style,N=!1,I=Math.max(M.line_strokeWidth/2,M.viewBox_plugBCircleSE[0]||0,M.viewBox_plugBCircleSE[1]||0),T={x1:C.x1-I,y1:C.y1-I,x2:C.x2+I,y2:C.y2+I},O.events.new_edge4viewBox&&O.events.new_edge4viewBox.forEach(function(e){e(O,T);}),L.x=M.lineMask_x=M.lineOutlineMask_x=M.maskBGRect_x=T.x1,L.y=M.lineMask_y=M.lineOutlineMask_y=M.maskBGRect_y=T.y1,L.width=T.x2-T.x1,L.height=T.y2-T.y1,["x","y","width","height"].forEach(function(e){var t;(t=L[e])!==A[e]&&(V[e]=A[e]=t,P[Q[e]]=t+("x"===e||"y"===e?O.bodyOffset[e]:0)+"px",N=!0);}),N),U.mask=(R=(W=e).curStats,F=W.aplStats,G=!1,R.plug_enabled?[0,1].forEach(function(e){R.capsMaskMarker_enabledSE[e]=R.plug_enabledSE[e]&&R.plug_colorTraSE[e]||R.plugOutline_enabledSE[e]&&R.plugOutline_colorTraSE[e];}):R.capsMaskMarker_enabledSE[0]=R.capsMaskMarker_enabledSE[1]=!1,R.capsMaskMarker_enabled=R.capsMaskMarker_enabledSE[0]||R.capsMaskMarker_enabledSE[1],R.lineMask_outlineMode=R.lineOutline_enabled,R.caps_enabled=R.capsMaskMarker_enabled||R.capsMaskAnchor_enabledSE[0]||R.capsMaskAnchor_enabledSE[1],R.lineMask_enabled=R.caps_enabled||R.lineMask_outlineMode,(R.lineMask_enabled&&!R.lineMask_outlineMode||R.lineOutline_enabled)&&["x","y"].forEach(function(e){var t="maskBGRect_"+e;Xe(W,F,t,B=R[t])&&(W.maskBGRect[e].baseVal.value=B,G=!0);}),Xe(W,F,"lineMask_enabled",B=R.lineMask_enabled)&&(W.lineFace.style.mask=B?"url(#"+W.lineMaskId+")":"none",G=!0,re&&je(W,W.lineMask)),R.lineMask_enabled&&(Xe(W,F,"lineMask_outlineMode",B=R.lineMask_outlineMode)&&(B?(W.lineMaskBG.style.display="none",W.lineMaskShape.style.display="inline"):(W.lineMaskBG.style.display="inline",W.lineMaskShape.style.display="none"),G=!0),["x","y"].forEach(function(e){var t="lineMask_"+e;Xe(W,F,t,B=R[t])&&(W.lineMask[e].baseVal.value=B,G=!0);}),Xe(W,F,"caps_enabled",B=R.caps_enabled)&&(W.lineMaskCaps.style.display=W.lineOutlineMaskCaps.style.display=B?"inline":"none",G=!0,re&&je(W,W.capsMaskLine)),R.caps_enabled&&([0,1].forEach(function(e){var t;Xe(W,F.capsMaskAnchor_enabledSE,e,B=R.capsMaskAnchor_enabledSE[e])&&(W.capsMaskAnchorSE[e].style.display=B?"inline":"none",G=!0,re&&je(W,W.lineMask)),R.capsMaskAnchor_enabledSE[e]&&(Fe(t=R.capsMaskAnchor_pathDataSE[e],F.capsMaskAnchor_pathDataSE[e])&&(W.capsMaskAnchorSE[e].setPathData(t),F.capsMaskAnchor_pathDataSE[e]=t,G=!0),Xe(W,F.capsMaskAnchor_strokeWidthSE,e,B=R.capsMaskAnchor_strokeWidthSE[e])&&(W.capsMaskAnchorSE[e].style.strokeWidth=B+"px",G=!0));}),Xe(W,F,"capsMaskMarker_enabled",B=R.capsMaskMarker_enabled)&&(W.capsMaskLine.style.display=B?"inline":"none",G=!0),R.capsMaskMarker_enabled&&[0,1].forEach(function(n){var e=R.capsMaskMarker_plugSE[n],t=e!==Y?X[q[e]]:null,a=Ze(n,t);Xe(W,F.capsMaskMarker_enabledSE,n,B=R.capsMaskMarker_enabledSE[n])&&(W.capsMaskLine.style[a.prop]=B?"url(#"+W.lineMaskMarkerIdSE[n]+")":"none",G=!0),R.capsMaskMarker_enabledSE[n]&&(Xe(W,F.capsMaskMarker_plugSE,n,e)&&(W.capsMaskMarkerShapeSE[n].href.baseVal="#"+t.elmId,Ue(W,W.capsMaskMarkerSE[n],a.orient,t.bBox,W.svg,W.capsMaskMarkerShapeSE[n],W.capsMaskLine),G=!0,oe&&(je(W,W.capsMaskLine),je(W,W.lineFace))),["markerWidth","markerHeight"].forEach(function(e){var t="capsMaskMarker_"+e+"SE";Xe(W,F[t],n,B=R[t][n])&&(W.capsMaskMarkerSE[n][e].baseVal.value=B,G=!0);}));}))),R.lineOutline_enabled&&["x","y"].forEach(function(e){var t="lineOutlineMask_"+e;Xe(W,F,t,B=R[t])&&(W.lineOutlineMask[e].baseVal.value=B,G=!0);}),G),t.effect&&(j=(D=e).curStats,H=D.aplStats,Object.keys(Z).forEach(function(e){var t=Z[e],n=e+"_enabled",a=e+"_options",e=j[a];Xe(D,H,n,z=j[n])?(z&&(H[a]=we(e)),t[z?"init":"remove"](D)):z&&ke(e,H[a])&&(t.remove(D),H[n]=!0,H[a]=we(e),t.init(D));})),(le||re)&&U.line&&!U.path&&je(e,e.lineShape),le&&U.plug&&!U.line&&je(e,e.plugsFace),He(e);}function et(e,t){return {duration:(pe(e.duration)&&0<e.duration?e:t).duration,timing:g.validTiming(e.timing)?e.timing:we(t.timing)}}function tt(e,t,n,a){var i=e.curStats,o=e.aplStats,l={};function r(){["show_on","show_effect","show_animOptions"].forEach(function(e){o[e]=i[e];});}i.show_on=t,n&&w[n]&&(i.show_effect=n,i.show_animOptions=et(he(a)?a:{},w[n].defaultAnimOptions)),l.show_on=i.show_on!==o.show_on,l.show_effect=i.show_effect!==o.show_effect,l.show_animOptions=ke(i.show_animOptions,o.show_animOptions),l.show_effect||l.show_animOptions?i.show_inAnim?(n=l.show_effect?w[o.show_effect].stop(e,!0,!0):w[o.show_effect].stop(e),r(),w[o.show_effect].init(e,n)):l.show_on&&(o.show_effect&&l.show_effect&&w[o.show_effect].stop(e,!0,!0),r(),w[o.show_effect].init(e)):l.show_on&&(r(),w[o.show_effect].start(e));}function nt(e,t,n){n={props:e,optionName:n};return e.attachments.indexOf(t)<0&&(!t.conf.bind||t.conf.bind(t,n))&&(e.attachments.push(t),t.boundTargets.push(n),1)}function at(n,a,e){var i=n.attachments.indexOf(a);-1<i&&n.attachments.splice(i,1),a.boundTargets.some(function(e,t){return e.props===n&&(a.conf.unbind&&a.conf.unbind(a,e),i=t,!0)})&&(a.boundTargets.splice(i,1),e||ze(function(){a.boundTargets.length||o(a);}));}function it(s,u){var i,n,e,t,a,o,l,r,h,p,c,d,f,y,m,S=s.options,g={};function _(e,t,n,a,i){var o={};return n?null!=a?(o.container=e[n],o.key=a):(o.container=e,o.key=n):(o.container=e,o.key=t),o.default=i,o.acceptsAuto=null==o.default,o}function v(e,t,n,a,i,o,l){var r,s,u,l=_(e,n,i,o,l);return null!=t[n]&&(s=(t[n]+"").toLowerCase())&&(l.acceptsAuto&&s===D||(u=a[s]))&&u!==l.container[l.key]&&(l.container[l.key]=u,r=!0),null!=l.container[l.key]||l.acceptsAuto||(l.container[l.key]=l.default,r=!0),r}function E(e,t,n,a,i,o,l,r,s){var u,h,p,c,l=_(e,n,i,o,l);if(!a){if(null==l.default)throw new Error("Invalid `type`: "+n);a=typeof l.default;}return null!=t[n]&&(l.acceptsAuto&&(t[n]+"").toLowerCase()===D||(p=h=t[n],("number"===(c=a)?pe(p):typeof p===c)&&(h=s&&"string"===a&&h?h.trim():h,1)&&(!r||r(h))))&&h!==l.container[l.key]&&(l.container[l.key]=h,u=!0),null!=l.container[l.key]||l.acceptsAuto||(l.container[l.key]=l.default,u=!0),u}if(u=u||{},["start","end"].forEach(function(e,t){var n=u[e],a=!1;if(n&&(Me(n)||(a=I(n,"anchor")))&&n!==S.anchorSE[t]){if(!1!==s.optionIsAttach.anchorSE[t]&&at(s,_e[S.anchorSE[t]._id]),a&&!nt(s,_e[n._id],e))throw new Error("Can't bind attachment");S.anchorSE[t]=n,s.optionIsAttach.anchorSE[t]=a,i=g.position=!0;}}),!S.anchorSE[0]||!S.anchorSE[1]||S.anchorSE[0]===S.anchorSE[1])throw new Error("`start` and `end` are required.");function x(e){var t=a.appendChild(y.createElementNS(ae,"mask"));return t.id=e,t.maskUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,[t.x,t.y,t.width,t.height].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0);}),t}function b(e){var t=a.appendChild(y.createElementNS(ae,"marker"));return t.id=e,t.markerUnits.baseVal=SVGMarkerElement.SVG_MARKERUNITS_STROKEWIDTH,t.viewBox.baseVal||t.setAttribute("viewBox","0 0 0 0"),t}function k(e){return [e.width,e.height].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100);}),e}i&&(c=function(e,t){var n,a;if(!(e=Ce(e))||!(n=Ce(t)))throw new Error("Cannot get frames.");return e.length&&n.length&&(e.reverse(),n.reverse(),e.some(function(t){return n.some(function(e){return e===t&&(a=e.contentWindow,!0)})})),a||window}(!1!==s.optionIsAttach.anchorSE[0]?_e[S.anchorSE[0]._id].element:S.anchorSE[0],!1!==s.optionIsAttach.anchorSE[1]?_e[S.anchorSE[1]._id].element:S.anchorSE[1]))!==s.baseWindow&&(e=c,f=(n=s).aplStats,y=e.document,m=C+"-"+n._id,n.pathList={},Ye(f,de),Object.keys(Z).forEach(function(e){var t=e+"_enabled";f[t]&&(Z[e].remove(n),f[t]=!1);}),n.baseWindow&&n.svg&&n.baseWindow.document.body.removeChild(n.svg),Qe(n.baseWindow=e),n.bodyOffset=qe(e),n.svg=t=y.createElementNS(ae,"svg"),t.className.baseVal=C,t.viewBox.baseVal||t.setAttribute("viewBox","0 0 0 0"),n.defs=a=t.appendChild(y.createElementNS(ae,"defs")),n.linePath=l=a.appendChild(y.createElementNS(ae,"path")),l.id=r=m+"-line-path",l.className.baseVal=C+"-line-path",re&&(l.style.fill="none"),n.lineShape=l=a.appendChild(y.createElementNS(ae,"use")),l.id=h=m+"-line-shape",l.href.baseVal="#"+r,(o=a.appendChild(y.createElementNS(ae,"g"))).id=p=m+"-caps",n.capsMaskAnchorSE=[0,1].map(function(){var e=o.appendChild(y.createElementNS(ae,"path"));return e.className.baseVal=C+"-caps-mask-anchor",e}),n.lineMaskMarkerIdSE=[m+"-caps-mask-marker-0",m+"-caps-mask-marker-1"],n.capsMaskMarkerSE=[0,1].map(function(e){return b(n.lineMaskMarkerIdSE[e])}),n.capsMaskMarkerShapeSE=[0,1].map(function(e){e=n.capsMaskMarkerSE[e].appendChild(y.createElementNS(ae,"use"));return e.className.baseVal=C+"-caps-mask-marker-shape",e}),n.capsMaskLine=l=o.appendChild(y.createElementNS(ae,"use")),l.className.baseVal=C+"-caps-mask-line",l.href.baseVal="#"+h,n.maskBGRect=l=k(a.appendChild(y.createElementNS(ae,"rect"))),l.id=c=m+"-mask-bg-rect",l.className.baseVal=C+"-mask-bg-rect",re&&(l.style.fill="white"),n.lineMask=k(x(n.lineMaskId=m+"-line-mask")),n.lineMaskBG=l=n.lineMask.appendChild(y.createElementNS(ae,"use")),l.href.baseVal="#"+c,n.lineMaskShape=l=n.lineMask.appendChild(y.createElementNS(ae,"use")),l.className.baseVal=C+"-line-mask-shape",l.href.baseVal="#"+r,l.style.display="none",n.lineMaskCaps=l=n.lineMask.appendChild(y.createElementNS(ae,"use")),l.href.baseVal="#"+p,n.lineOutlineMask=k(x(e=m+"-line-outline-mask")),(l=n.lineOutlineMask.appendChild(y.createElementNS(ae,"use"))).href.baseVal="#"+c,n.lineOutlineMaskShape=l=n.lineOutlineMask.appendChild(y.createElementNS(ae,"use")),l.className.baseVal=C+"-line-outline-mask-shape",l.href.baseVal="#"+r,n.lineOutlineMaskCaps=l=n.lineOutlineMask.appendChild(y.createElementNS(ae,"use")),l.href.baseVal="#"+p,n.face=t.appendChild(y.createElementNS(ae,"g")),n.lineFace=l=n.face.appendChild(y.createElementNS(ae,"use")),l.href.baseVal="#"+h,n.lineOutlineFace=l=n.face.appendChild(y.createElementNS(ae,"use")),l.href.baseVal="#"+h,l.style.mask="url(#"+e+")",l.style.display="none",n.plugMaskIdSE=[m+"-plug-mask-0",m+"-plug-mask-1"],n.plugMaskSE=[0,1].map(function(e){return x(n.plugMaskIdSE[e])}),n.plugMaskShapeSE=[0,1].map(function(e){e=n.plugMaskSE[e].appendChild(y.createElementNS(ae,"use"));return e.className.baseVal=C+"-plug-mask-shape",e}),d=[],n.plugOutlineMaskSE=[0,1].map(function(e){return x(d[e]=m+"-plug-outline-mask-"+e)}),n.plugOutlineMaskShapeSE=[0,1].map(function(e){e=n.plugOutlineMaskSE[e].appendChild(y.createElementNS(ae,"use"));return e.className.baseVal=C+"-plug-outline-mask-shape",e}),n.plugMarkerIdSE=[m+"-plug-marker-0",m+"-plug-marker-1"],n.plugMarkerSE=[0,1].map(function(e){e=b(n.plugMarkerIdSE[e]);return re&&(e.markerUnits.baseVal=SVGMarkerElement.SVG_MARKERUNITS_USERSPACEONUSE),e}),n.plugMarkerShapeSE=[0,1].map(function(e){return n.plugMarkerSE[e].appendChild(y.createElementNS(ae,"g"))}),n.plugFaceSE=[0,1].map(function(e){return n.plugMarkerShapeSE[e].appendChild(y.createElementNS(ae,"use"))}),n.plugOutlineFaceSE=[0,1].map(function(e){var t=n.plugMarkerShapeSE[e].appendChild(y.createElementNS(ae,"use"));return t.style.mask="url(#"+d[e]+")",t.style.display="none",t}),n.plugsFace=l=n.face.appendChild(y.createElementNS(ae,"use")),l.className.baseVal=C+"-plugs-face",l.href.baseVal="#"+h,l.style.display="none",n.curStats.show_inAnim?(n.isShown=1,w[f.show_effect].stop(n,!0)):n.isShown||(t.style.visibility="hidden"),y.body.appendChild(t),[0,1,2].forEach(function(e){var t,e=n.options.labelSEM[e];e&&I(e,"label")&&(t=_e[e._id]).conf.initSvg&&t.conf.initSvg(t,n);}),g.line=g.plug=g.lineOutline=g.plugOutline=g.faces=g.effect=!0),g.position=v(S,u,"path",R,null,null,ue.path)||g.position,g.position=v(S,u,"startSocket",V,"socketSE",0)||g.position,g.position=v(S,u,"endSocket",V,"socketSE",1)||g.position,[u.startSocketGravity,u.endSocketGravity].forEach(function(e,t){var n,a,i=!1;null!=e&&(Array.isArray(e)?pe(e[0])&&pe(e[1])&&(i=[e[0],e[1]],Array.isArray(S.socketGravitySE[t])&&(n=i,a=S.socketGravitySE[t],n.length===a.length&&n.every(function(e,t){return e===a[t]}))&&(i=!1)):((e+"").toLowerCase()===D?i=null:pe(e)&&0<=e&&(i=e),i===S.socketGravitySE[t]&&(i=!1)),!1!==i&&(S.socketGravitySE[t]=i,g.position=!0));}),g.line=E(S,u,"color",null,"lineColor",null,ue.lineColor,null,!0)||g.line,g.line=E(S,u,"size",null,"lineSize",null,ue.lineSize,function(e){return 0<e})||g.line,["startPlug","endPlug"].forEach(function(e,t){g.plug=v(S,u,e,F,"plugSE",t,ue.plugSE[t])||g.plug,g.plug=E(S,u,e+"Color","string","plugColorSE",t,null,null,!0)||g.plug,g.plug=E(S,u,e+"Size",null,"plugSizeSE",t,ue.plugSizeSE[t],function(e){return 0<e})||g.plug;}),g.lineOutline=E(S,u,"outline",null,"lineOutlineEnabled",null,ue.lineOutlineEnabled)||g.lineOutline,g.lineOutline=E(S,u,"outlineColor",null,"lineOutlineColor",null,ue.lineOutlineColor,null,!0)||g.lineOutline,g.lineOutline=E(S,u,"outlineSize",null,"lineOutlineSize",null,ue.lineOutlineSize,function(e){return 0<e&&e<=.48})||g.lineOutline,["startPlugOutline","endPlugOutline"].forEach(function(e,t){g.plugOutline=E(S,u,e,null,"plugOutlineEnabledSE",t,ue.plugOutlineEnabledSE[t])||g.plugOutline,g.plugOutline=E(S,u,e+"Color","string","plugOutlineColorSE",t,null,null,!0)||g.plugOutline,g.plugOutline=E(S,u,e+"Size",null,"plugOutlineSizeSE",t,ue.plugOutlineSizeSE[t],function(e){return 1<=e})||g.plugOutline;}),["startLabel","endLabel","middleLabel"].forEach(function(e,t){var n,a,i,o=u[e],l=S.labelSEM[t]&&!s.optionIsAttach.labelSEM[t]?_e[S.labelSEM[t]._id].text:S.labelSEM[t],r=!1;if((n="string"==typeof o)&&(o=o.trim()),(n||o&&(r=I(o,"label")))&&o!==l){if(S.labelSEM[t]&&(at(s,_e[S.labelSEM[t]._id]),S.labelSEM[t]=""),o){if(r?(a=_e[(i=o)._id]).boundTargets.slice().forEach(function(e){a.conf.removeOption(a,e);}):i=new M(O.captionLabel,[o]),!nt(s,_e[i._id],e))throw new Error("Can't bind attachment");S.labelSEM[t]=i;}s.optionIsAttach.labelSEM[t]=r;}}),Object.keys(Z).forEach(function(a){var e,t,o=Z[a],n=a+"_enabled",i=a+"_options";function l(a){var i={};return o.optionsConf.forEach(function(e){var t=e[0],n=e[3];null==e[4]||i[n]||(i[n]=[]),("function"==typeof t?t:"id"===t?v:E).apply(null,[i,a].concat(e.slice(1)));}),i}function r(e){var t,n=a+"_animOptions";return e.hasOwnProperty("animation")?he(e.animation)?t=s.curStats[n]=et(e.animation,o.defaultAnimOptions):(t=!!e.animation,s.curStats[n]=t?et({},o.defaultAnimOptions):null):(t=!!o.defaultEnabled,s.curStats[n]=t?et({},o.defaultAnimOptions):null),t}u.hasOwnProperty(a)&&(e=u[a],he(e)?(s.curStats[n]=!0,t=s.curStats[i]=l(e),o.anim&&(s.curStats[i].animation=r(e))):(t=s.curStats[n]=!!e)&&(s.curStats[i]=l({}),o.anim&&(s.curStats[i].animation=r({}))),ke(t,S[a])&&(S[a]=t,g.effect=!0));}),$e(s,g);}function ot(e,t,n){var a={options:{anchorSE:[],socketSE:[],socketGravitySE:[],plugSE:[],plugColorSE:[],plugSizeSE:[],plugOutlineEnabledSE:[],plugOutlineColorSE:[],plugOutlineSizeSE:[],labelSEM:["","",""]},optionIsAttach:{anchorSE:[!1,!1],labelSEM:[!1,!1,!1]},curStats:{},aplStats:{},attachments:[],events:{},reflowTargets:[]};Ye(a.curStats,de),Ye(a.aplStats,de),Object.keys(Z).forEach(function(e){var t=Z[e].stats;Ye(a.curStats,t),Ye(a.aplStats,t),a.options[e]=!1;}),Ye(a.curStats,fe),Ye(a.aplStats,fe),a.curStats.show_effect=ye,a.curStats.show_animOptions=we(w[ye].defaultAnimOptions),Object.defineProperty(this,"_id",{value:++ge}),a._id=this._id,Se[this._id]=a,1===arguments.length&&(n=e,e=null),n=n||{},(e||t)&&(n=we(n),e&&(n.start=e),t&&(n.end=t)),a.isShown=a.aplStats.show_on=!n.hide,this.setOptions(n);}function lt(n){return function(e){var t={};t[n]=e,this.setOptions(t);}}function rt(e,t){var n,a={conf:e,curStats:{},aplStats:{},boundTargets:[]},i={};e.argOptions.every(function(e){return !(!t.length||("string"==typeof e.type?typeof t[0]!==e.type:"function"!=typeof e.type||!e.type(t[0])))&&(i[e.optionName]=t.shift(),!0)}),n=t.length&&he(t[0])?we(t[0]):{},Object.keys(i).forEach(function(e){n[e]=i[e];}),e.stats&&(Ye(a.curStats,e.stats),Ye(a.aplStats,e.stats)),Object.defineProperty(this,"_id",{value:++ve}),Object.defineProperty(this,"isRemoved",{get:function(){return !_e[this._id]}}),a._id=this._id,e.init&&!e.init(a,n)||(_e[this._id]=a);}return Z={dash:{stats:{dash_len:{},dash_gap:{},dash_maxOffset:{}},anim:!0,defaultAnimOptions:{duration:1e3,timing:"linear"},optionsConf:[["type","len","number",null,null,null,function(e){return 0<e}],["type","gap","number",null,null,null,function(e){return 0<e}]],init:function(e){Ge(e,"apl_line_strokeWidth",Z.dash.update),e.lineFace.style.strokeDashoffset=0,Z.dash.update(e);},remove:function(e){var t=e.curStats;De(e,"apl_line_strokeWidth",Z.dash.update),t.dash_animId&&(g.remove(t.dash_animId),t.dash_animId=null),e.lineFace.style.strokeDasharray="none",e.lineFace.style.strokeDashoffset=0,Ye(e.aplStats,Z.dash.stats);},update:function(t){var e,n=t.curStats,a=t.aplStats,i=a.dash_options,o=!1;n.dash_len=i.len||2*a.line_strokeWidth,n.dash_gap=i.gap||a.line_strokeWidth,n.dash_maxOffset=n.dash_len+n.dash_gap,o=Xe(t,a,"dash_len",n.dash_len)||o,(o=Xe(t,a,"dash_gap",n.dash_gap)||o)&&(t.lineFace.style.strokeDasharray=a.dash_len+","+a.dash_gap),n.dash_animOptions?(o=Xe(t,a,"dash_maxOffset",n.dash_maxOffset),a.dash_animOptions&&(o||ke(n.dash_animOptions,a.dash_animOptions))&&(n.dash_animId&&(e=g.stop(n.dash_animId),g.remove(n.dash_animId)),a.dash_animOptions=null),a.dash_animOptions||(n.dash_animId=g.add(function(e){return (1-e)*a.dash_maxOffset+"px"},function(e){t.lineFace.style.strokeDashoffset=e;},n.dash_animOptions.duration,0,n.dash_animOptions.timing,!1,e),a.dash_animOptions=we(n.dash_animOptions))):a.dash_animOptions&&(n.dash_animId&&(g.remove(n.dash_animId),n.dash_animId=null),t.lineFace.style.strokeDashoffset=0,a.dash_animOptions=null);}},gradient:{stats:{gradient_colorSE:{hasSE:!0},gradient_pointSE:{hasSE:!0,hasProps:!0}},optionsConf:[["type","startColor","string","colorSE",0,null,null,!0],["type","endColor","string","colorSE",1,null,null,!0]],init:function(e){var a=e.baseWindow.document,t=e.defs,n=C+"-"+e._id+"-gradient";e.efc_gradient_gradient=t=t.appendChild(a.createElementNS(ae,"linearGradient")),t.id=n,t.gradientUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,[t.x1,t.y1,t.x2,t.y2].forEach(function(e){e.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0);}),e.efc_gradient_stopSE=[0,1].map(function(t){var n=e.efc_gradient_gradient.appendChild(a.createElementNS(ae,"stop"));try{n.offset.baseVal=t;}catch(e){if(e.code!==DOMException.NO_MODIFICATION_ALLOWED_ERR)throw e;n.setAttribute("offset",t);}return n}),Ge(e,"cur_plug_colorSE",Z.gradient.update),Ge(e,"apl_path",Z.gradient.update),e.curStats.line_altColor=!0,e.lineFace.style.stroke="url(#"+n+")",Z.gradient.update(e);},remove:function(e){e.efc_gradient_gradient&&(e.defs.removeChild(e.efc_gradient_gradient),e.efc_gradient_gradient=e.efc_gradient_stopSE=null),De(e,"cur_plug_colorSE",Z.gradient.update),De(e,"apl_path",Z.gradient.update),e.curStats.line_altColor=!1,e.lineFace.style.stroke=e.curStats.line_color,Ye(e.aplStats,Z.gradient.stats);},update:function(a){var e,i=a.curStats,o=a.aplStats,t=o.gradient_options,n=a.pathList.animVal||a.pathList.baseVal;[0,1].forEach(function(e){i.gradient_colorSE[e]=t.colorSE[e]||i.plug_colorSE[e];}),e=n[0][0],i.gradient_pointSE[0]={x:e.x,y:e.y},e=(n=n[n.length-1])[n.length-1],i.gradient_pointSE[1]={x:e.x,y:e.y},[0,1].forEach(function(t){var n;Xe(a,o.gradient_colorSE,t,n=i.gradient_colorSE[t])&&(re?(n=Oe(n),a.efc_gradient_stopSE[t].style.stopColor=n[1],a.efc_gradient_stopSE[t].style.stopOpacity=n[0]):a.efc_gradient_stopSE[t].style.stopColor=n),["x","y"].forEach(function(e){(n=i.gradient_pointSE[t][e])!==o.gradient_pointSE[t][e]&&(a.efc_gradient_gradient[e+(t+1)].baseVal.value=o.gradient_pointSE[t][e]=n);});});}},dropShadow:{stats:{dropShadow_dx:{},dropShadow_dy:{},dropShadow_blur:{},dropShadow_color:{},dropShadow_opacity:{},dropShadow_x:{},dropShadow_y:{}},optionsConf:[["type","dx",null,null,null,2],["type","dy",null,null,null,4],["type","blur",null,null,null,3,function(e){return 0<=e}],["type","color",null,null,null,"#000",null,!0],["type","opacity",null,null,null,.8,function(e){return 0<=e&&e<=1}]],init:function(t){var e,n,a,i,o=t.baseWindow.document,l=t.defs,r=C+"-"+t._id+"-dropShadow",s=(e=o,n=r,i={},"boolean"!=typeof u&&(u=!!window.SVGFEDropShadowElement&&!re),i.elmsAppend=[i.elmFilter=o=e.createElementNS(ae,"filter")],o.filterUnits.baseVal=SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE,o.x.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),o.y.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),o.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100),o.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,100),o.id=n,u?(i.elmOffset=i.elmBlur=a=o.appendChild(e.createElementNS(ae,"feDropShadow")),i.styleFlood=a.style):(i.elmBlur=o.appendChild(e.createElementNS(ae,"feGaussianBlur")),i.elmOffset=a=o.appendChild(e.createElementNS(ae,"feOffset")),a.result.baseVal="offsetblur",a=o.appendChild(e.createElementNS(ae,"feFlood")),i.styleFlood=a.style,(a=o.appendChild(e.createElementNS(ae,"feComposite"))).in2.baseVal="offsetblur",a.operator.baseVal=SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_IN,(a=o.appendChild(e.createElementNS(ae,"feMerge"))).appendChild(e.createElementNS(ae,"feMergeNode")),a.appendChild(e.createElementNS(ae,"feMergeNode")).in1.baseVal="SourceGraphic"),i);["elmFilter","elmOffset","elmBlur","styleFlood","elmsAppend"].forEach(function(e){t["efc_dropShadow_"+e]=s[e];}),s.elmsAppend.forEach(function(e){l.appendChild(e);}),t.face.setAttribute("filter","url(#"+r+")"),Ge(t,"new_edge4viewBox",Z.dropShadow.adjustEdge),Z.dropShadow.update(t);},remove:function(e){var t=e.defs;e.efc_dropShadow_elmsAppend&&(e.efc_dropShadow_elmsAppend.forEach(function(e){t.removeChild(e);}),e.efc_dropShadow_elmFilter=e.efc_dropShadow_elmOffset=e.efc_dropShadow_elmBlur=e.efc_dropShadow_styleFlood=e.efc_dropShadow_elmsAppend=null),De(e,"new_edge4viewBox",Z.dropShadow.adjustEdge),$e(e,{}),e.face.removeAttribute("filter"),Ye(e.aplStats,Z.dropShadow.stats);},update:function(e){var t,n,a=e.curStats,i=e.aplStats,o=i.dropShadow_options;a.dropShadow_dx=t=o.dx,Xe(e,i,"dropShadow_dx",t)&&(e.efc_dropShadow_elmOffset.dx.baseVal=t,n=!0),a.dropShadow_dy=t=o.dy,Xe(e,i,"dropShadow_dy",t)&&(e.efc_dropShadow_elmOffset.dy.baseVal=t,n=!0),a.dropShadow_blur=t=o.blur,Xe(e,i,"dropShadow_blur",t)&&(e.efc_dropShadow_elmBlur.setStdDeviation(t,t),n=!0),n&&$e(e,{}),a.dropShadow_color=t=o.color,Xe(e,i,"dropShadow_color",t)&&(e.efc_dropShadow_styleFlood.floodColor=t),a.dropShadow_opacity=t=o.opacity,Xe(e,i,"dropShadow_opacity",t)&&(e.efc_dropShadow_styleFlood.floodOpacity=t);},adjustEdge:function(a,i){var e,o=a.curStats,l=a.aplStats;null!=o.dropShadow_dx&&(e=3*o.dropShadow_blur,(e={x1:i.x1-e+o.dropShadow_dx,y1:i.y1-e+o.dropShadow_dy,x2:i.x2+e+o.dropShadow_dx,y2:i.y2+e+o.dropShadow_dy}).x1<i.x1&&(i.x1=e.x1),e.y1<i.y1&&(i.y1=e.y1),e.x2>i.x2&&(i.x2=e.x2),e.y2>i.y2&&(i.y2=e.y2),["x","y"].forEach(function(e){var t,n="dropShadow_"+e;o[n]=t=i[e+"1"],Xe(a,l,n,t)&&(a.efc_dropShadow_elmFilter[e].baseVal.value=t);}));}}},Object.keys(Z).forEach(function(e){var t=Z[e],n=t.stats;n[e+"_enabled"]={iniValue:!1},n[e+"_options"]={hasProps:!0},t.anim&&(n[e+"_animOptions"]={},n[e+"_animId"]={});}),w={none:{defaultAnimOptions:{},init:function(e,t){var n=e.curStats;n.show_animId&&(g.remove(n.show_animId),n.show_animId=null),w.none.start(e,t);},start:function(e,t){w.none.stop(e,!0);},stop:function(e,t,n){var a=e.curStats;return n=null!=n?n:e.aplStats.show_on,a.show_inAnim=!1,t&&Je(e,n),n?1:0}},fade:{defaultAnimOptions:{duration:300,timing:"linear"},init:function(n,e){var t=n.curStats,a=n.aplStats;t.show_animId&&g.remove(t.show_animId),t.show_animId=g.add(function(e){return e},function(e,t){t?w.fade.stop(n,!0):(n.svg.style.opacity=e+"",ie&&(je(n,n.svg),He(n)));},a.show_animOptions.duration,1,a.show_animOptions.timing,null,!1),w.fade.start(n,e);},start:function(e,t){var n,a=e.curStats;a.show_inAnim&&(n=g.stop(a.show_animId)),Je(e,1),a.show_inAnim=!0,g.start(a.show_animId,!e.aplStats.show_on,null!=t?t:n);},stop:function(e,t,n){var a,i=e.curStats;return n=null!=n?n:e.aplStats.show_on,a=i.show_inAnim?g.stop(i.show_animId):n?1:0,i.show_inAnim=!1,t&&(e.svg.style.opacity=n?"":"0",Je(e,n)),a}},draw:{defaultAnimOptions:{duration:500,timing:[.58,0,.42,1]},init:function(n,e){var t=n.curStats,a=n.aplStats,o=n.pathList.baseVal,i=Re(o),l=i.segsLen,r=i.lenAll;t.show_animId&&g.remove(t.show_animId),t.show_animId=g.add(function(e){var t,n,a,i=-1;if(0===e)n=[[o[0][0],o[0][0]]];else if(1===e)n=o;else {for(t=r*e,n=[];t>=l[++i];)n.push(o[i]),t-=l[i];t&&(2===(a=o[i]).length?n.push([a[0],Ve(a[0],a[1],t/l[i])]):(e=Ne(a[0],a[1],a[2],a[3],We(a[0],a[1],a[2],a[3],t)),n.push([a[0],e.fromP1,e.fromP2,e])));}return n},function(e,t){t?w.draw.stop(n,!0):(n.pathList.animVal=e,$e(n,{path:!0}));},a.show_animOptions.duration,1,a.show_animOptions.timing,null,!1),w.draw.start(n,e);},start:function(e,t){var n,a=e.curStats;a.show_inAnim&&(n=g.stop(a.show_animId)),Je(e,1),a.show_inAnim=!0,Ge(e,"apl_position",w.draw.update),g.start(a.show_animId,!e.aplStats.show_on,null!=t?t:n);},stop:function(e,t,n){var a,i=e.curStats;return n=null!=n?n:e.aplStats.show_on,a=i.show_inAnim?g.stop(i.show_animId):n?1:0,i.show_inAnim=!1,t&&(e.pathList.animVal=n?null:[[e.pathList.baseVal[0][0],e.pathList.baseVal[0][0]]],$e(e,{path:!0}),Je(e,n)),a},update:function(e){De(e,"apl_position",w.draw.update),e.curStats.show_inAnim?w.draw.init(e,w.draw.stop(e)):e.aplStats.show_animOptions={};}}},[["start","anchorSE",0],["end","anchorSE",1],["color","lineColor"],["size","lineSize"],["startSocketGravity","socketGravitySE",0],["endSocketGravity","socketGravitySE",1],["startPlugColor","plugColorSE",0],["endPlugColor","plugColorSE",1],["startPlugSize","plugSizeSE",0],["endPlugSize","plugSizeSE",1],["outline","lineOutlineEnabled"],["outlineColor","lineOutlineColor"],["outlineSize","lineOutlineSize"],["startPlugOutline","plugOutlineEnabledSE",0],["endPlugOutline","plugOutlineEnabledSE",1],["startPlugOutlineColor","plugOutlineColorSE",0],["endPlugOutlineColor","plugOutlineColorSE",1],["startPlugOutlineSize","plugOutlineSizeSE",0],["endPlugOutlineSize","plugOutlineSizeSE",1]].forEach(function(e){var t=e[0],n=e[1],a=e[2];Object.defineProperty(ot.prototype,t,{get:function(){var e=null!=a?Se[this._id].options[n][a]:n?Se[this._id].options[n]:Se[this._id].options[t];return null==e?D:we(e)},set:lt(t),enumerable:!0});}),[["path",R],["startSocket",V,"socketSE",0],["endSocket",V,"socketSE",1],["startPlug",F,"plugSE",0],["endPlug",F,"plugSE",1]].forEach(function(e){var a=e[0],i=e[1],o=e[2],l=e[3];Object.defineProperty(ot.prototype,a,{get:function(){var t,n=null!=l?Se[this._id].options[o][l]:o?Se[this._id].options[o]:Se[this._id].options[a];return n?Object.keys(i).some(function(e){return i[e]===n&&(t=e,!0)})?t:new Error("It's broken"):D},set:lt(a),enumerable:!0});}),Object.keys(Z).forEach(function(n){var a=Z[n];Object.defineProperty(ot.prototype,n,{get:function(){var s,e,t=Se[this._id].options[n];return he(t)?(s=t,e=a.optionsConf.reduce(function(e,t){var n,a=t[0],i=t[1],o=t[2],l=t[3],t=t[4],r=null!=t?s[l][t]:l?s[l]:s[i];return e[i]="id"===a?r?Object.keys(o).some(function(e){return o[e]===r&&(n=e,!0)})?n:new Error("It's broken"):D:null==r?D:we(r),e},{}),a.anim&&(e.animation=we(s.animation)),e):t},set:lt(n),enumerable:!0});}),["startLabel","endLabel","middleLabel"].forEach(function(e,n){Object.defineProperty(ot.prototype,e,{get:function(){var e=Se[this._id],t=e.options;return t.labelSEM[n]&&!e.optionIsAttach.labelSEM[n]?_e[t.labelSEM[n]._id].text:t.labelSEM[n]||""},set:lt(e),enumerable:!0});}),ot.prototype.setOptions=function(e){return it(Se[this._id],e),this},ot.prototype.position=function(){return $e(Se[this._id],{position:!0}),this},ot.prototype.remove=function(){var t=Se[this._id],n=t.curStats;Object.keys(Z).forEach(function(e){e+="_animId";n[e]&&g.remove(n[e]);}),n.show_animId&&g.remove(n.show_animId),t.attachments.slice().forEach(function(e){at(t,e);}),t.baseWindow&&t.svg&&t.baseWindow.document.body.removeChild(t.svg),delete Se[this._id];},ot.prototype.show=function(e,t){return tt(Se[this._id],!0,e,t),this},ot.prototype.hide=function(e,t){return tt(Se[this._id],!1,e,t),this},o=function(t){t&&_e[t._id]&&(t.boundTargets.slice().forEach(function(e){at(e.props,t,!0);}),t.conf.remove&&t.conf.remove(t),delete _e[t._id]);},rt.prototype.remove=function(){var t=this,n=_e[t._id];n&&(n.boundTargets.slice().forEach(function(e){n.conf.removeOption(n,e);}),ze(function(){var e=_e[t._id];e&&(console.error("LeaderLineAttachment was not removed by removeOption"),o(e));}));},M=rt,window.LeaderLineAttachment=M,I=function(e,t){return e instanceof M&&(!(e.isRemoved||t&&_e[e._id].conf.type!==t)||null)},O={pointAnchor:{type:"anchor",argOptions:[{optionName:"element",type:Me}],init:function(e,t){return e.element=O.pointAnchor.checkElement(t.element),e.x=O.pointAnchor.parsePercent(t.x,!0)||[.5,!0],e.y=O.pointAnchor.parsePercent(t.y,!0)||[.5,!0],!0},removeOption:function(e,t){var n=t.props,a={},i=e.element,e=n.options.anchorSE["start"===t.optionName?1:0];i===e&&(i=e===document.body?new M(O.pointAnchor,[i]):document.body),a[t.optionName]=i,it(n,a);},getBBoxNest:function(e,t){var n=Le(e.element,t.baseWindow),a=n.width,t=n.height;return n.width=n.height=0,n.left=n.right=n.left+e.x[0]*(e.x[1]?a:1),n.top=n.bottom=n.top+e.y[0]*(e.y[1]?t:1),n},parsePercent:function(e,t){var n,a,i=!1;return pe(e)?a=e:"string"==typeof e&&(n=m.exec(e))&&n[2]&&(i=0!==(a=parseFloat(n[1])/100)),null!=a&&(t||0<=a)?[a,i]:null},checkElement:function(e){if(null==e)e=document.body;else if(!Me(e))throw new Error("`element` must be Element");return e}},areaAnchor:{type:"anchor",argOptions:[{optionName:"element",type:Me},{optionName:"shape",type:"string"}],stats:{color:{},strokeWidth:{},elementWidth:{},elementHeight:{},elementLeft:{},elementTop:{},pathListRel:{},bBoxRel:{},pathData:{},viewBoxBBox:{hasProps:!0},dashLen:{},dashGap:{}},init:function(a,e){var t,n=[];return a.element=O.pointAnchor.checkElement(e.element),"string"==typeof e.color&&(a.color=e.color.trim()),"string"==typeof e.fillColor&&(a.fill=e.fillColor.trim()),pe(e.size)&&0<=e.size&&(a.size=e.size),e.dash&&(a.dash=!0,pe(e.dash.len)&&0<e.dash.len&&(a.dashLen=e.dash.len),pe(e.dash.gap)&&0<e.dash.gap&&(a.dashGap=e.dash.gap)),"circle"===e.shape?a.shape=e.shape:"polygon"===e.shape&&Array.isArray(e.points)&&3<=e.points.length&&e.points.every(function(e){var t={};return !(!(t.x=O.pointAnchor.parsePercent(e[0],!0))||!(t.y=O.pointAnchor.parsePercent(e[1],!0)))&&(n.push(t),(t.x[1]||t.y[1])&&(a.hasRatio=!0),!0)})?(a.shape=e.shape,a.points=n):(a.shape="rect",a.radius=pe(e.radius)&&0<=e.radius?e.radius:0),"rect"!==a.shape&&"circle"!==a.shape||(a.x=O.pointAnchor.parsePercent(e.x,!0)||[-.05,!0],a.y=O.pointAnchor.parsePercent(e.y,!0)||[-.05,!0],a.width=O.pointAnchor.parsePercent(e.width)||[1.1,!0],a.height=O.pointAnchor.parsePercent(e.height)||[1.1,!0],(a.x[1]||a.y[1]||a.width[1]||a.height[1])&&(a.hasRatio=!0)),t=a.element.ownerDocument,a.svg=e=t.createElementNS(ae,"svg"),e.className.baseVal=C+"-areaAnchor",e.viewBox.baseVal||e.setAttribute("viewBox","0 0 0 0"),a.path=e.appendChild(t.createElementNS(ae,"path")),a.path.style.fill=a.fill||"none",a.isShown=!1,e.style.visibility="hidden",t.body.appendChild(e),Qe(t=t.defaultView),a.bodyOffset=qe(t),a.updateColor=function(){var e=a.curStats,t=a.aplStats,n=a.boundTargets.length?a.boundTargets[0].props.curStats:null;e.color=n=a.color||(n?n.line_color:ue.lineColor),Xe(a,t,"color",n)&&(a.path.style.stroke=n);},a.updateShow=function(){Je(a,a.boundTargets.some(function(e){return !0===e.props.isShown}));},!0},bind:function(e,t){t=t.props;return e.color||Ge(t,"cur_line_color",e.updateColor),Ge(t,"svgShow",e.updateShow),ze(function(){e.updateColor(),e.updateShow();}),!0},unbind:function(e,t){t=t.props;e.color||De(t,"cur_line_color",e.updateColor),De(t,"svgShow",e.updateShow),1<e.boundTargets.length&&ze(function(){e.updateColor(),e.updateShow(),O.areaAnchor.update(e)&&e.boundTargets.forEach(function(e){$e(e.props,{position:!0});});});},removeOption:function(e,t){O.pointAnchor.removeOption(e,t);},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){O.areaAnchor.unbind(t,e);})),t.svg.parentNode.removeChild(t.svg);},getStrokeWidth:function(e,t){return O.areaAnchor.update(e)&&1<e.boundTargets.length&&ze(function(){e.boundTargets.forEach(function(e){e.props!==t&&$e(e.props,{position:!0});});}),e.curStats.strokeWidth},getPathData:function(e,t){var n=Le(e.element,t.baseWindow);return Be(e.curStats.pathListRel,function(e){e.x+=n.left,e.y+=n.top;})},getBBoxNest:function(e,t){t=Le(e.element,t.baseWindow),e=e.curStats.bBoxRel;return {left:e.left+t.left,top:e.top+t.top,right:e.right+t.left,bottom:e.bottom+t.top,width:e.width,height:e.height}},update:function(t){var n,a,i,o,e,l,r,s,u,h,p,c,d,f,y,m,S=t.curStats,g=t.aplStats,_=t.boundTargets.length?t.boundTargets[0].props.curStats:null,v={};if(v.strokeWidth=Xe(t,S,"strokeWidth",null!=t.size?t.size:_?_.line_strokeWidth:ue.lineSize),n=Ie(t.element),v.elementWidth=Xe(t,S,"elementWidth",n.width),v.elementHeight=Xe(t,S,"elementHeight",n.height),v.elementLeft=Xe(t,S,"elementLeft",n.left),v.elementTop=Xe(t,S,"elementTop",n.top),v.strokeWidth||t.hasRatio&&(v.elementWidth||v.elementHeight)){switch(t.shape){case"rect":(c={left:t.x[0]*(t.x[1]?n.width:1),top:t.y[0]*(t.y[1]?n.height:1),width:t.width[0]*(t.width[1]?n.width:1),height:t.height[0]*(t.height[1]?n.height:1)}).right=c.left+c.width,c.bottom=c.top+c.height,p=S.strokeWidth/2,s=(r=Math.min(c.width,c.height))?r/2*Math.SQRT2+p:0,h=(r=t.radius?t.radius<=s?t.radius:s:0)?(s=(r-p)/Math.SQRT2,h=[{x:c.left-(u=r-s),y:c.top+s},{x:c.left+s,y:c.top-u},{x:c.right-s,y:c.top-u},{x:c.right+u,y:c.top+s},{x:c.right+u,y:c.bottom-s},{x:c.right-s,y:c.bottom+u},{x:c.left+s,y:c.bottom+u},{x:c.left-u,y:c.bottom-s}],S.pathListRel=[[h[0],{x:h[0].x,y:h[0].y-(p=r*te)},{x:h[1].x-p,y:h[1].y},h[1]]],h[1].x!==h[2].x&&S.pathListRel.push([h[1],h[2]]),S.pathListRel.push([h[2],{x:h[2].x+p,y:h[2].y},{x:h[3].x,y:h[3].y-p},h[3]]),h[3].y!==h[4].y&&S.pathListRel.push([h[3],h[4]]),S.pathListRel.push([h[4],{x:h[4].x,y:h[4].y+p},{x:h[5].x+p,y:h[5].y},h[5]]),h[5].x!==h[6].x&&S.pathListRel.push([h[5],h[6]]),S.pathListRel.push([h[6],{x:h[6].x-p,y:h[6].y},{x:h[7].x,y:h[7].y+p},h[7]]),h[7].y!==h[0].y&&S.pathListRel.push([h[7],h[0]]),S.pathListRel.push([]),u=r-s+S.strokeWidth/2,[{x:c.left-u,y:c.top-u},{x:c.right+u,y:c.bottom+u}]):(u=S.strokeWidth/2,h=[{x:c.left-u,y:c.top-u},{x:c.right+u,y:c.bottom+u}],S.pathListRel=[[h[0],{x:h[1].x,y:h[0].y}],[{x:h[1].x,y:h[0].y},h[1]],[h[1],{x:h[0].x,y:h[1].y}],[]],[{x:c.left-S.strokeWidth,y:c.top-S.strokeWidth},{x:c.right+S.strokeWidth,y:c.bottom+S.strokeWidth}]),S.bBoxRel={left:h[0].x,top:h[0].y,right:h[1].x,bottom:h[1].y,width:h[1].x-h[0].x,height:h[1].y-h[0].y};break;case"circle":(l={left:t.x[0]*(t.x[1]?n.width:1),top:t.y[0]*(t.y[1]?n.height:1),width:t.width[0]*(t.width[1]?n.width:1),height:t.height[0]*(t.height[1]?n.height:1)}).width||l.height||(l.width=l.height=10),l.width||(l.width=l.height),l.height||(l.height=l.width),l.right=l.left+l.width,l.bottom=l.top+l.height,p=l.left+l.width/2,r=l.top+l.height/2,e=S.strokeWidth/2,s=l.width/2,u=l.height/2,c=s*Math.SQRT2+e,h=u*Math.SQRT2+e,S.pathListRel=[[(e=[{x:p-c,y:r},{x:p,y:r-h},{x:p+c,y:r},{x:p,y:r+h}])[0],{x:e[0].x,y:e[0].y-(p=h*te)},{x:e[1].x-(r=c*te),y:e[1].y},e[1]],[e[1],{x:e[1].x+r,y:e[1].y},{x:e[2].x,y:e[2].y-p},e[2]],[e[2],{x:e[2].x,y:e[2].y+p},{x:e[3].x+r,y:e[3].y},e[3]],[e[3],{x:e[3].x-r,y:e[3].y},{x:e[0].x,y:e[0].y+p},e[0]],[]],s=c-s+S.strokeWidth/2,u=h-u+S.strokeWidth/2,e=[{x:l.left-s,y:l.top-u},{x:l.right+s,y:l.bottom+u}],S.bBoxRel={left:e[0].x,top:e[0].y,right:e[1].x,bottom:e[1].y,width:e[1].x-e[0].x,height:e[1].y-e[0].y};break;case"polygon":t.points.forEach(function(e){var t=e.x[0]*(e.x[1]?n.width:1),e=e.y[0]*(e.y[1]?n.height:1);i?(t<i.left&&(i.left=t),t>i.right&&(i.right=t),e<i.top&&(i.top=e),e>i.bottom&&(i.bottom=e)):i={left:t,right:t,top:e,bottom:e},o?S.pathListRel.push([o,{x:t,y:e}]):S.pathListRel=[],o={x:t,y:e};}),S.pathListRel.push([]),e=S.strokeWidth/2,e=[{x:i.left-e,y:i.top-e},{x:i.right+e,y:i.bottom+e}],S.bBoxRel={left:e[0].x,top:e[0].y,right:e[1].x,bottom:e[1].y,width:e[1].x-e[0].x,height:e[1].y-e[0].y};}v.pathListRel=v.bBoxRel=!0;}return (v.pathListRel||v.elementLeft||v.elementTop)&&(S.pathData=Be(S.pathListRel,function(e){e.x+=n.left,e.y+=n.top;})),Xe(t,g,"strokeWidth",a=S.strokeWidth)&&(t.path.style.strokeWidth=a+"px"),Fe(a=S.pathData,g.pathData)&&(t.path.setPathData(a),g.pathData=a,v.pathData=!0),t.dash&&(!v.pathData&&(!v.strokeWidth||t.dashLen&&t.dashGap)||(S.dashLen=t.dashLen||2*S.strokeWidth,S.dashGap=t.dashGap||S.strokeWidth),v.dash=Xe(t,g,"dashLen",S.dashLen)||v.dash,v.dash=Xe(t,g,"dashGap",S.dashGap)||v.dash,v.dash&&(t.path.style.strokeDasharray=g.dashLen+","+g.dashGap)),d=S.viewBoxBBox,f=g.viewBoxBBox,y=t.svg.viewBox.baseVal,m=t.svg.style,d.x=S.bBoxRel.left+n.left,d.y=S.bBoxRel.top+n.top,d.width=S.bBoxRel.width,d.height=S.bBoxRel.height,["x","y","width","height"].forEach(function(e){(a=d[e])!==f[e]&&(y[e]=f[e]=a,m[Q[e]]=a+("x"===e||"y"===e?t.bodyOffset[e]:0)+"px");}),v.strokeWidth||v.pathListRel||v.bBoxRel}},mouseHoverAnchor:{type:"anchor",argOptions:[{optionName:"element",type:Me},{optionName:"showEffectName",type:"string"}],style:{backgroundImage:"url('data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cG9seWdvbiBwb2ludHM9IjI0LDAgMCw4IDgsMTEgMCwxOSA1LDI0IDEzLDE2IDE2LDI0IiBmaWxsPSJjb3JhbCIvPjwvc3ZnPg==')",backgroundSize:"",backgroundRepeat:"no-repeat",backgroundColor:"#f8f881",cursor:"default"},hoverStyle:{backgroundImage:"none",backgroundColor:"#fadf8f"},padding:{top:1,right:15,bottom:1,left:2},minHeight:15,backgroundPosition:{right:2,top:2},backgroundSize:{width:12,height:12},dirKeys:[["top","Top"],["right","Right"],["bottom","Bottom"],["left","Left"]],init:function(a,i){var n,t,e,o,l,r,s,u,h,p=O.mouseHoverAnchor,c={};if(a.element=O.pointAnchor.checkElement(i.element),s=a.element,!((u=s.ownerDocument)&&(h=u.defaultView)&&h.HTMLElement&&s instanceof h.HTMLElement))throw new Error("`element` must be HTML element");return p.style.backgroundSize=p.backgroundSize.width+"px "+p.backgroundSize.height+"px",["style","hoverStyle"].forEach(function(e){var n=p[e];a[e]=Object.keys(n).reduce(function(e,t){return e[t]=n[t],e},{});}),"inline"===(n=a.element.ownerDocument.defaultView.getComputedStyle(a.element,"")).display?a.style.display="inline-block":"none"===n.display&&(a.style.display="block"),O.mouseHoverAnchor.dirKeys.forEach(function(e){var t=e[0],e="padding"+e[1];parseFloat(n[e])<p.padding[t]&&(a.style[e]=p.padding[t]+"px");}),a.style.display&&(e=a.element.style.display,a.element.style.display=a.style.display),O.mouseHoverAnchor.dirKeys.forEach(function(e){e="padding"+e[1];a.style[e]&&(c[e]=a.element.style[e],a.element.style[e]=a.style[e]);}),(s=a.element.getBoundingClientRect()).height<p.minHeight&&(ie?(h=p.minHeight,"content-box"===n.boxSizing?h-=parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth)+parseFloat(n.paddingTop)+parseFloat(n.paddingBottom):"padding-box"===n.boxSizing&&(h-=parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth)),a.style.height=h+"px"):a.style.height=parseFloat(n.height)+(p.minHeight-s.height)+"px"),a.style.backgroundPosition=re?s.width-p.backgroundSize.width-p.backgroundPosition.right+"px "+p.backgroundPosition.top+"px":"right "+p.backgroundPosition.right+"px top "+p.backgroundPosition.top+"px",a.style.display&&(a.element.style.display=e),O.mouseHoverAnchor.dirKeys.forEach(function(e){e="padding"+e[1];a.style[e]&&(a.element.style[e]=c[e]);}),["style","hoverStyle"].forEach(function(e){var t=a[e],n=i[e];he(n)&&Object.keys(n).forEach(function(e){"string"==typeof n[e]||pe(n[e])?t[e]=n[e]:null==n[e]&&delete t[e];});}),"function"==typeof i.onSwitch&&(r=i.onSwitch),i.showEffectName&&w[i.showEffectName]&&(a.showEffectName=o=i.showEffectName),l=i.animOptions,a.elmStyle=t=a.element.style,a.mouseenter=function(e){a.hoverStyleSave=p.getStyles(t,Object.keys(a.hoverStyle)),p.setStyles(t,a.hoverStyle),a.boundTargets.forEach(function(e){tt(e.props,!0,o,l);}),r&&r(e);},a.mouseleave=function(e){p.setStyles(t,a.hoverStyleSave),a.boundTargets.forEach(function(e){tt(e.props,!1,o,l);}),r&&r(e);},!0},bind:function(e,t){var n,a,i,o,l;return t.props.svg?O.mouseHoverAnchor.llShow(t.props,!1,e.showEffectName):ze(function(){O.mouseHoverAnchor.llShow(t.props,!1,e.showEffectName);}),e.enabled||(e.styleSave=O.mouseHoverAnchor.getStyles(e.elmStyle,Object.keys(e.style)),O.mouseHoverAnchor.setStyles(e.elmStyle,e.style),e.removeEventListener=(n=e.element,a=e.mouseenter,i=e.mouseleave,"onmouseenter"in n&&"onmouseleave"in n?(n.addEventListener("mouseenter",a,!1),n.addEventListener("mouseleave",i,!1),function(){n.removeEventListener("mouseenter",a,!1),n.removeEventListener("mouseleave",i,!1);}):(console.warn("mouseenter and mouseleave events polyfill is enabled."),n.addEventListener("mouseover",o=function(e){e.relatedTarget&&(e.relatedTarget===this||this.compareDocumentPosition(e.relatedTarget)&Node.DOCUMENT_POSITION_CONTAINED_BY)||a.apply(this,arguments);}),n.addEventListener("mouseout",l=function(e){e.relatedTarget&&(e.relatedTarget===this||this.compareDocumentPosition(e.relatedTarget)&Node.DOCUMENT_POSITION_CONTAINED_BY)||i.apply(this,arguments);}),function(){n.removeEventListener("mouseover",o,!1),n.removeEventListener("mouseout",l,!1);})),e.enabled=!0),!0},unbind:function(e,t){e.enabled&&e.boundTargets.length<=1&&(e.removeEventListener(),O.mouseHoverAnchor.setStyles(e.elmStyle,e.styleSave),e.enabled=!1),O.mouseHoverAnchor.llShow(t.props,!0,e.showEffectName);},removeOption:function(e,t){O.pointAnchor.removeOption(e,t);},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){O.mouseHoverAnchor.unbind(t,e);}));},getBBoxNest:function(e,t){return Le(e.element,t.baseWindow)},llShow:function(e,t,n){w[n||e.curStats.show_effect].stop(e,!0,t),e.aplStats.show_on=t;},getStyles:function(n,e){return e.reduce(function(e,t){return e[t]=n[t],e},{})},setStyles:function(t,n){Object.keys(n).forEach(function(e){t[e]=n[e];});}},captionLabel:{type:"label",argOptions:[{optionName:"text",type:"string"}],stats:{color:{},x:{},y:{}},textStyleProps:["fontFamily","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","kerning","letterSpacing","wordSpacing","textDecoration"],init:function(l,t){return "string"==typeof t.text&&(l.text=t.text.trim()),!!l.text&&("string"==typeof t.color&&(l.color=t.color.trim()),l.outlineColor="string"==typeof t.outlineColor?t.outlineColor.trim():"#fff",Array.isArray(t.offset)&&pe(t.offset[0])&&pe(t.offset[1])&&(l.offset={x:t.offset[0],y:t.offset[1]}),pe(t.lineOffset)&&(l.lineOffset=t.lineOffset),O.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(l[e]=t[e]);}),l.updateColor=function(e){O.captionLabel.updateColor(l,e);},l.updateSocketXY=function(e){var t,n=l.curStats,a=l.aplStats,i=e.curStats,o=i.position_socketXYSE[l.socketIndex];null!=o.x&&(l.offset?(n.x=o.x+l.offset.x,n.y=o.y+l.offset.y):(t=l.height/2,e=Math.max(i.attach_plugSideLenSE[l.socketIndex]||0,i.line_strokeWidth/2),i=i.position_socketXYSE[l.socketIndex?0:1],o.socketId===A||o.socketId===k?(n.x=o.socketId===A?o.x-t-l.width:o.x+t,n.y=i.y<o.y?o.y+e+t:o.y-e-t-l.height):(n.x=i.x<o.x?o.x+e+t:o.x-e-t-l.width,n.y=o.socketId===b?o.y-t-l.height:o.y+t)),Xe(l,a,"x",t=n.x)&&(l.elmPosition.x.baseVal.getItem(0).value=t),Xe(l,a,"y",t=n.y)&&(l.elmPosition.y.baseVal.getItem(0).value=t+l.height));},l.updatePath=function(e){var t=l.curStats,n=l.aplStats,e=e.pathList.animVal||e.pathList.baseVal;e&&(e=O.captionLabel.getMidPoint(e,l.lineOffset),t.x=e.x-l.width/2,t.y=e.y-l.height/2,Xe(l,n,"x",e=t.x)&&(l.elmPosition.x.baseVal.getItem(0).value=e),Xe(l,n,"y",e=t.y)&&(l.elmPosition.y.baseVal.getItem(0).value=e+l.height));},l.updateShow=function(e){O.captionLabel.updateShow(l,e);},re&&(l.adjustEdge=function(e,t){var n=l.curStats;null!=n.x&&O.captionLabel.adjustEdge(t,{x:n.x,y:n.y,width:l.width,height:l.height},l.strokeWidth/2);}),!0)},updateColor:function(e,t){var n=e.curStats,a=e.aplStats,t=t.curStats;n.color=t=e.color||t.line_color,Xe(e,a,"color",t)&&(e.styleFill.fill=t);},updateShow:function(e,t){t=!0===t.isShown;t!==e.isShown&&(e.styleShow.visibility=t?"":"hidden",e.isShown=t);},adjustEdge:function(e,t,n){n={x1:t.x-n,y1:t.y-n,x2:t.x+t.width+n,y2:t.y+t.height+n};n.x1<e.x1&&(e.x1=n.x1),n.y1<e.y1&&(e.y1=n.y1),n.x2>e.x2&&(e.x2=n.x2),n.y2>e.y2&&(e.y2=n.y2);},newText:function(e,t,n,a,i){var o,l,r=t.createElementNS(ae,"text");return r.textContent=e,[r.x,r.y].forEach(function(e){var t=n.createSVGLength();t.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),e.baseVal.initialize(t);}),"boolean"!=typeof h&&(h="paintOrder"in r.style),i&&!h?(o=t.createElementNS(ae,"defs"),r.id=a,o.appendChild(r),(l=(e=t.createElementNS(ae,"g")).appendChild(t.createElementNS(ae,"use"))).href.baseVal="#"+a,(t=e.appendChild(t.createElementNS(ae,"use"))).href.baseVal="#"+a,(l=l.style).strokeLinejoin="round",{elmPosition:r,styleText:r.style,styleFill:t.style,styleStroke:l,styleShow:e.style,elmsAppend:[o,e]}):(l=r.style,i&&(l.strokeLinejoin="round",l.paintOrder="stroke"),{elmPosition:r,styleText:l,styleFill:l,styleStroke:i?l:null,styleShow:l,elmsAppend:[r]})},getMidPoint:function(e,t){var n,a,i=Re(e),o=i.segsLen,i=i.lenAll,l=-1,r=i/2+(t||0);if(r<=0)return 2===(n=e[0]).length?Ve(n[0],n[1],0):Ne(n[0],n[1],n[2],n[3],0);if(i<=r)return 2===(n=e[e.length-1]).length?Ve(n[0],n[1],1):Ne(n[0],n[1],n[2],n[3],1);for(a=[];r>o[++l];)a.push(e[l]),r-=o[l];return 2===(n=e[l]).length?Ve(n[0],n[1],r/o[l]):Ne(n[0],n[1],n[2],n[3],We(n[0],n[1],n[2],n[3],r))},initSvg:function(t,n){var e,a,i=O.captionLabel.newText(t.text,n.baseWindow.document,n.svg,C+"-captionLabel-"+t._id,t.outlineColor);["elmPosition","styleFill","styleShow","elmsAppend"].forEach(function(e){t[e]=i[e];}),t.isShown=!1,t.styleShow.visibility="hidden",O.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(i.styleText[e]=t[e]);}),i.elmsAppend.forEach(function(e){n.svg.appendChild(e);}),e=i.elmPosition.getBBox(),t.width=e.width,t.height=e.height,t.outlineColor&&(a=e.height/9,i.styleStroke.strokeWidth=(a=10<a?10:a<2?2:a)+"px",i.styleStroke.stroke=t.outlineColor),t.strokeWidth=a||0,Ye(t.aplStats,O.captionLabel.stats),t.updateColor(n),t.refSocketXY?t.updateSocketXY(n):t.updatePath(n),re&&$e(n,{}),t.updateShow(n);},bind:function(e,t){var n=t.props;return e.color||Ge(n,"cur_line_color",e.updateColor),(e.refSocketXY="startLabel"===t.optionName||"endLabel"===t.optionName)?(e.socketIndex="startLabel"===t.optionName?0:1,Ge(n,"apl_position",e.updateSocketXY),e.offset||(Ge(n,"cur_attach_plugSideLenSE",e.updateSocketXY),Ge(n,"cur_line_strokeWidth",e.updateSocketXY))):Ge(n,"apl_path",e.updatePath),Ge(n,"svgShow",e.updateShow),re&&Ge(n,"new_edge4viewBox",e.adjustEdge),O.captionLabel.initSvg(e,n),!0},unbind:function(e,t){var n=t.props;e.elmsAppend&&(e.elmsAppend.forEach(function(e){n.svg.removeChild(e);}),e.elmPosition=e.styleFill=e.styleShow=e.elmsAppend=null),Ye(e.curStats,O.captionLabel.stats),Ye(e.aplStats,O.captionLabel.stats),e.color||De(n,"cur_line_color",e.updateColor),e.refSocketXY?(De(n,"apl_position",e.updateSocketXY),e.offset||(De(n,"cur_attach_plugSideLenSE",e.updateSocketXY),De(n,"cur_line_strokeWidth",e.updateSocketXY))):De(n,"apl_path",e.updatePath),De(n,"svgShow",e.updateShow),re&&(De(n,"new_edge4viewBox",e.adjustEdge),$e(n,{}));},removeOption:function(e,t){var n=t.props,a={};a[t.optionName]="",it(n,a);},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){O.captionLabel.unbind(t,e);}));}},pathLabel:{type:"label",argOptions:[{optionName:"text",type:"string"}],stats:{color:{},startOffset:{},pathData:{}},init:function(l,t){return "string"==typeof t.text&&(l.text=t.text.trim()),!!l.text&&("string"==typeof t.color&&(l.color=t.color.trim()),l.outlineColor="string"==typeof t.outlineColor?t.outlineColor.trim():"#fff",pe(t.lineOffset)&&(l.lineOffset=t.lineOffset),O.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(l[e]=t[e]);}),l.updateColor=function(e){O.captionLabel.updateColor(l,e);},l.updatePath=function(e){var t=l.curStats,n=l.aplStats,a=e.curStats,i=e.pathList.animVal||e.pathList.baseVal;i&&(t.pathData=a=O.pathLabel.getOffsetPathData(i,a.line_strokeWidth/2+l.strokeWidth/2+l.height/4,1.25*l.height),Fe(a,n.pathData)&&(l.elmPath.setPathData(a),n.pathData=a,l.bBox=l.elmPosition.getBBox(),l.updateStartOffset(e)));},l.updateStartOffset=function(e){var i,t,n=l.curStats,a=l.aplStats,o=e.curStats;n.pathData&&(2===l.semIndex&&!l.lineOffset||(t=n.pathData.reduce(function(e,t){var n,a=t.values;switch(t.type){case"M":i={x:a[0],y:a[1]};break;case"L":n={x:a[0],y:a[1]},i&&(e+=Ae(i,n)),i=n;break;case"C":n={x:a[4],y:a[5]},i&&(e+=Te(i,{x:a[0],y:a[1]},{x:a[2],y:a[3]},n)),i=n;}return e},0),e=0===l.semIndex?0:1===l.semIndex?t:t/2,2!==l.semIndex&&(o=Math.max(o.attach_plugBackLenSE[l.semIndex]||0,o.line_strokeWidth/2)+l.strokeWidth/2+l.height/4,e=(e+=0===l.semIndex?o:-o)<0?0:t<e?t:e),l.lineOffset&&(e=(e+=l.lineOffset)<0?0:t<e?t:e),n.startOffset=e,Xe(l,a,"startOffset",e)&&(l.elmOffset.startOffset.baseVal.value=e)));},l.updateShow=function(e){O.captionLabel.updateShow(l,e);},re&&(l.adjustEdge=function(e,t){l.bBox&&O.captionLabel.adjustEdge(t,l.bBox,l.strokeWidth/2);}),!0)},getOffsetPathData:function(e,c,n){var d,a,f=[];function y(e,t){return Math.abs(e.x-t.x)<3&&Math.abs(e.y-t.y)<3}return e.forEach(function(e){var t,n,a,i,o,l,r,s,u,h,p;2===e.length?(s=e[0],u=e[1],h=c,p=Math.atan2(s.y-u.y,u.x-s.x)+.5*Math.PI,t=[{x:s.x+Math.cos(p)*h,y:s.y+Math.sin(p)*h*-1},{x:u.x+Math.cos(p)*h,y:u.y+Math.sin(p)*h*-1}],d?(a=d.points,0<=(r=Math.atan2(a[1].y-a[0].y,a[0].x-a[1].x)-Math.atan2(e[0].y-e[1].y,e[1].x-e[0].x))&&r<=Math.PI?n={type:"line",points:t,inside:!0}:(o=Pe(a[0],a[1],c),i=Pe(t[1],t[0],c),l=a[0],s=t[1],p=(u=o).x-l.x,h=u.y-l.y,r=s.x-i.x,u=s.y-i.y,s=(-h*(l.x-i.x)+p*(l.y-i.y))/(-r*h+p*u),u=(r*(l.y-i.y)-u*(l.x-i.x))/(-r*h+p*u),n=(h=0<=s&&s<=1&&0<=u&&u<=1?{x:l.x+u*p,y:l.y+u*h}:null)?{type:"line",points:[a[1]=h,t[1]]}:(a[1]=y(i,o)?i:o,{type:"line",points:[i,t[1]]}),d.len=Ae(a[0],a[1]))):n={type:"line",points:t},n.len=Ae(n.points[0],n.points[1]),f.push(d=n)):(f.push({type:"cubic",points:function(e,t,n,a,i,o){for(var l,r,s=Te(e,t,n,a)/o,u=1/(o<i?i/o*s:s),h=[],p=0;r=(90-(l=Ne(e,t,n,a,p)).angle)*(Math.PI/180),h.push({x:l.x+Math.cos(r)*i,y:l.y+Math.sin(r)*i*-1}),!(1<=p);)1<(p+=u)&&(p=1);return h}(e[0],e[1],e[2],e[3],c,16)}),d=null);}),d=null,f.forEach(function(e){var t;d="line"===e.type?(e.inside&&(d.len>c?((t=d.points)[1]=Pe(t[0],t[1],-c),d.len=Ae(t[0],t[1])):(d.points=null,d.len=0),e.len>c+n?((t=e.points)[0]=Pe(t[1],t[0],-(c+n)),e.len=Ae(t[0],t[1])):(e.points=null,e.len=0)),e):null;}),f.reduce(function(t,e){var n=e.points;return n&&(a&&y(n[0],a)||t.push({type:"M",values:[n[0].x,n[0].y]}),"line"===e.type?t.push({type:"L",values:[n[1].x,n[1].y]}):(n.shift(),n.forEach(function(e){t.push({type:"L",values:[e.x,e.y]});})),a=n[n.length-1]),t},[])},newText:function(e,t,n,a){var i,o,l,r,s=t.createElementNS(ae,"defs"),u=s.appendChild(t.createElementNS(ae,"path"));return u.id=i=n+"-path",(l=(o=t.createElementNS(ae,"text")).appendChild(t.createElementNS(ae,"textPath"))).href.baseVal="#"+i,l.startOffset.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,0),l.textContent=e,"boolean"!=typeof h&&(h="paintOrder"in o.style),a&&!h?(o.id=e=n+"-text",s.appendChild(o),(r=(n=t.createElementNS(ae,"g")).appendChild(t.createElementNS(ae,"use"))).href.baseVal="#"+e,(t=n.appendChild(t.createElementNS(ae,"use"))).href.baseVal="#"+e,(r=r.style).strokeLinejoin="round",{elmPosition:o,elmPath:u,elmOffset:l,styleText:o.style,styleFill:t.style,styleStroke:r,styleShow:n.style,elmsAppend:[s,n]}):(r=o.style,a&&(r.strokeLinejoin="round",r.paintOrder="stroke"),{elmPosition:o,elmPath:u,elmOffset:l,styleText:r,styleFill:r,styleStroke:a?r:null,styleShow:r,elmsAppend:[s,o]})},initSvg:function(t,n){var e,a,i,o=O.pathLabel.newText(t.text,n.baseWindow.document,C+"-pathLabel-"+t._id,t.outlineColor);["elmPosition","elmPath","elmOffset","styleFill","styleShow","elmsAppend"].forEach(function(e){t[e]=o[e];}),t.isShown=!1,t.styleShow.visibility="hidden",O.captionLabel.textStyleProps.forEach(function(e){null!=t[e]&&(o.styleText[e]=t[e]);}),o.elmsAppend.forEach(function(e){n.svg.appendChild(e);}),o.elmPath.setPathData([{type:"M",values:[0,100]},{type:"h",values:[100]}]),le&&(i=o.elmOffset.href.baseVal,o.elmOffset.href.baseVal=""),e=o.elmPosition.getBBox(),le&&(o.elmOffset.href.baseVal=i),o.styleText.textAnchor=["start","end","middle"][t.semIndex],2!==t.semIndex||t.lineOffset||o.elmOffset.startOffset.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE,50),t.height=e.height,t.outlineColor&&(a=e.height/9,o.styleStroke.strokeWidth=(a=10<a?10:a<2?2:a)+"px",o.styleStroke.stroke=t.outlineColor),t.strokeWidth=a||0,Ye(t.aplStats,O.pathLabel.stats),t.updateColor(n),t.updatePath(n),t.updateStartOffset(n),re&&$e(n,{}),t.updateShow(n);},bind:function(e,t){var n=t.props;return e.color||Ge(n,"cur_line_color",e.updateColor),Ge(n,"cur_line_strokeWidth",e.updatePath),Ge(n,"apl_path",e.updatePath),e.semIndex="startLabel"===t.optionName?0:"endLabel"===t.optionName?1:2,2===e.semIndex&&!e.lineOffset||Ge(n,"cur_attach_plugBackLenSE",e.updateStartOffset),Ge(n,"svgShow",e.updateShow),re&&Ge(n,"new_edge4viewBox",e.adjustEdge),O.pathLabel.initSvg(e,n),!0},unbind:function(e,t){var n=t.props;e.elmsAppend&&(e.elmsAppend.forEach(function(e){n.svg.removeChild(e);}),e.elmPosition=e.elmPath=e.elmOffset=e.styleFill=e.styleShow=e.elmsAppend=null),Ye(e.curStats,O.pathLabel.stats),Ye(e.aplStats,O.pathLabel.stats),e.color||De(n,"cur_line_color",e.updateColor),De(n,"cur_line_strokeWidth",e.updatePath),De(n,"apl_path",e.updatePath),2===e.semIndex&&!e.lineOffset||De(n,"cur_attach_plugBackLenSE",e.updateStartOffset),De(n,"svgShow",e.updateShow),re&&(De(n,"new_edge4viewBox",e.adjustEdge),$e(n,{}));},removeOption:function(e,t){var n=t.props,a={};a[t.optionName]="",it(n,a);},remove:function(t){t.boundTargets.length&&(console.error("LeaderLineAttachment was not unbound by remove"),t.boundTargets.forEach(function(e){O.pathLabel.unbind(t,e);}));}}},Object.keys(O).forEach(function(e){ot[e]=function(){return new M(O[e],Array.prototype.slice.call(arguments))};}),ot.positionByWindowResize=!0,window.addEventListener("resize",S.add(function(){ot.positionByWindowResize&&Object.keys(Se).forEach(function(e){$e(Se[e],{position:!0});});}),!1),ot})();

    /* src/components/pertChart.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1 } = globals;
    const file$2 = "src/components/pertChart.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i].id;
    	child_ctx[6] = list[i].eft;
    	child_ctx[7] = list[i].lft;
    	child_ctx[8] = list[i].spare;
    	child_ctx[9] = list;
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (66:8) {#each nodes as { id, eft, lft, spare }}
    function create_each_block(ctx) {
    	let div;
    	let section;
    	let article0;
    	let p0;
    	let t0_value = /*id*/ ctx[5] + 1 + "";
    	let t0;
    	let t1;
    	let article1;
    	let p1;
    	let t2_value = /*eft*/ ctx[6] + "";
    	let t2;
    	let t3;
    	let article2;
    	let p2;
    	let t4_value = /*lft*/ ctx[7] + "";
    	let t4;
    	let t5;
    	let article3;
    	let p3;
    	let t6_value = /*spare*/ ctx[8] + "";
    	let t6;
    	let section_data_id_value;
    	let t7;
    	let id = /*id*/ ctx[5];
    	const assign_div = () => /*div_binding*/ ctx[2](div, id);
    	const unassign_div = () => /*div_binding*/ ctx[2](null, id);

    	const block = {
    		c: function create() {
    			div = element$1("div");
    			section = element$1("section");
    			article0 = element$1("article");
    			p0 = element$1("p");
    			t0 = text$1(t0_value);
    			t1 = space$1();
    			article1 = element$1("article");
    			p1 = element$1("p");
    			t2 = text$1(t2_value);
    			t3 = space$1();
    			article2 = element$1("article");
    			p2 = element$1("p");
    			t4 = text$1(t4_value);
    			t5 = space$1();
    			article3 = element$1("article");
    			p3 = element$1("p");
    			t6 = text$1(t6_value);
    			t7 = space$1();
    			attr_dev(p0, "class", "-rotate-45 translate-y-1 translate-x-1");
    			add_location(p0, file$2, 72, 24, 3173);
    			attr_dev(article0, "class", "bg-gray-100");
    			add_location(article0, file$2, 71, 20, 3119);
    			attr_dev(p1, "class", "-rotate-45 -translate-y-1 translate-x-1");
    			add_location(p1, file$2, 77, 24, 3395);
    			attr_dev(article1, "class", "bg-gray-100");
    			add_location(article1, file$2, 76, 20, 3341);
    			attr_dev(p2, "class", "-rotate-45 translate-y-1 -translate-x-1");
    			add_location(p2, file$2, 82, 24, 3615);
    			attr_dev(article2, "class", "bg-gray-100");
    			add_location(article2, file$2, 81, 20, 3561);
    			attr_dev(p3, "class", "-rotate-45 -translate-y-1 -translate-x-1");
    			add_location(p3, file$2, 87, 24, 3835);
    			attr_dev(article3, "class", "bg-gray-100");
    			add_location(article3, file$2, 86, 20, 3781);
    			attr_dev(section, "data-id", section_data_id_value = /*id*/ ctx[5]);
    			attr_dev(section, "class", "w-16 h-16 grid grid-rows-2 grid-flow-col gap-px border-2 border-blue-600 rounded-full overflow-hidden bg-black text-center leading-7 rotate-45 font-bold select-none");
    			add_location(section, file$2, 67, 16, 2846);
    			add_location(div, file$2, 66, 12, 2799);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, section);
    			append_dev(section, article0);
    			append_dev(article0, p0);
    			append_dev(p0, t0);
    			append_dev(section, t1);
    			append_dev(section, article1);
    			append_dev(article1, p1);
    			append_dev(p1, t2);
    			append_dev(section, t3);
    			append_dev(section, article2);
    			append_dev(article2, p2);
    			append_dev(p2, t4);
    			append_dev(section, t5);
    			append_dev(section, article3);
    			append_dev(article3, p3);
    			append_dev(p3, t6);
    			append_dev(div, t7);
    			assign_div();
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*nodes*/ 2 && t0_value !== (t0_value = /*id*/ ctx[5] + 1 + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*nodes*/ 2 && t2_value !== (t2_value = /*eft*/ ctx[6] + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*nodes*/ 2 && t4_value !== (t4_value = /*lft*/ ctx[7] + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*nodes*/ 2 && t6_value !== (t6_value = /*spare*/ ctx[8] + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*nodes*/ 2 && section_data_id_value !== (section_data_id_value = /*id*/ ctx[5])) {
    				attr_dev(section, "data-id", section_data_id_value);
    			}

    			if (id !== /*id*/ ctx[5]) {
    				unassign_div();
    				id = /*id*/ ctx[5];
    				assign_div();
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			unassign_div();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(66:8) {#each nodes as { id, eft, lft, spare }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div3;
    	let h1;
    	let t1;
    	let div2;
    	let div1;
    	let section;
    	let article0;
    	let p0;
    	let t3;
    	let article1;
    	let p1;
    	let t5;
    	let article2;
    	let p2;
    	let t7;
    	let article3;
    	let p3;
    	let t9;
    	let div0;
    	let span0;
    	let b0;
    	let t11;
    	let t12;
    	let span1;
    	let b1;
    	let t14;
    	let t15;
    	let span2;
    	let b2;
    	let t17;
    	let t18;
    	let span3;
    	let b3;
    	let t20;
    	let t21;
    	let each_value = /*nodes*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element$1("div");
    			h1 = element$1("h1");
    			h1.textContent = "PERT Chart";
    			t1 = space$1();
    			div2 = element$1("div");
    			div1 = element$1("div");
    			section = element$1("section");
    			article0 = element$1("article");
    			p0 = element$1("p");
    			p0.textContent = "ID";
    			t3 = space$1();
    			article1 = element$1("article");
    			p1 = element$1("p");
    			p1.textContent = "EFT";
    			t5 = space$1();
    			article2 = element$1("article");
    			p2 = element$1("p");
    			p2.textContent = "LFT";
    			t7 = space$1();
    			article3 = element$1("article");
    			p3 = element$1("p");
    			p3.textContent = "ST";
    			t9 = space$1();
    			div0 = element$1("div");
    			span0 = element$1("span");
    			b0 = element$1("b");
    			b0.textContent = "ID";
    			t11 = text$1(" - Node ID");
    			t12 = space$1();
    			span1 = element$1("span");
    			b1 = element$1("b");
    			b1.textContent = "EFT";
    			t14 = text$1(" - Early Finish Time");
    			t15 = space$1();
    			span2 = element$1("span");
    			b2 = element$1("b");
    			b2.textContent = "LFT";
    			t17 = text$1(" - Late Finish Time");
    			t18 = space$1();
    			span3 = element$1("span");
    			b3 = element$1("b");
    			b3.textContent = "ST";
    			t20 = text$1(" - Spare time");
    			t21 = space$1();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "px-4 pt-2 text-2xl font-black");
    			add_location(h1, file$2, 39, 4, 1463);
    			attr_dev(p0, "class", "-rotate-45 -translate-y-px -translate-x-px");
    			add_location(p0, file$2, 46, 20, 1882);
    			attr_dev(article0, "class", "bg-white");
    			add_location(article0, file$2, 45, 16, 1835);
    			attr_dev(p1, "class", "-rotate-45 translate-y-px -translate-x-px");
    			add_location(p1, file$2, 49, 20, 2033);
    			attr_dev(article1, "class", "bg-white");
    			add_location(article1, file$2, 48, 16, 1986);
    			attr_dev(p2, "class", "-rotate-45 -translate-y-px translate-x-px");
    			add_location(p2, file$2, 52, 20, 2184);
    			attr_dev(article2, "class", "bg-white");
    			add_location(article2, file$2, 51, 16, 2137);
    			attr_dev(p3, "class", "-rotate-45 translate-y-px translate-x-px");
    			add_location(p3, file$2, 55, 20, 2335);
    			attr_dev(article3, "class", "bg-white");
    			add_location(article3, file$2, 54, 16, 2288);
    			attr_dev(section, "class", "w-16 h-16 grid grid-rows-2 grid-flow-col gap-px border-1 border-white rounded-full bg-black text-center leading-7 rotate-45 font-bold select-none");
    			add_location(section, file$2, 42, 12, 1626);
    			add_location(b0, file$2, 59, 22, 2506);
    			add_location(span0, file$2, 59, 16, 2500);
    			add_location(b1, file$2, 60, 22, 2555);
    			add_location(span1, file$2, 60, 16, 2549);
    			add_location(b2, file$2, 61, 22, 2615);
    			add_location(span2, file$2, 61, 16, 2609);
    			add_location(b3, file$2, 62, 22, 2674);
    			add_location(span3, file$2, 62, 16, 2668);
    			attr_dev(div0, "class", "flex flex-col");
    			add_location(div0, file$2, 58, 12, 2456);
    			attr_dev(div1, "class", "flex gap-6 items-center");
    			add_location(div1, file$2, 41, 8, 1576);
    			attr_dev(div2, "class", "flex gap-10 p-4 items-center");
    			add_location(div2, file$2, 40, 4, 1525);
    			attr_dev(div3, "class", "overflow-x-auto shadow-md sm:rounded-lg bg-white");
    			add_location(div3, file$2, 38, 0, 1396);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, section);
    			append_dev(section, article0);
    			append_dev(article0, p0);
    			append_dev(section, t3);
    			append_dev(section, article1);
    			append_dev(article1, p1);
    			append_dev(section, t5);
    			append_dev(section, article2);
    			append_dev(article2, p2);
    			append_dev(section, t7);
    			append_dev(section, article3);
    			append_dev(article3, p3);
    			append_dev(div1, t9);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(span0, b0);
    			append_dev(span0, t11);
    			append_dev(div0, t12);
    			append_dev(div0, span1);
    			append_dev(span1, b1);
    			append_dev(span1, t14);
    			append_dev(div0, t15);
    			append_dev(div0, span2);
    			append_dev(span2, b2);
    			append_dev(span2, t17);
    			append_dev(div0, t18);
    			append_dev(div0, span3);
    			append_dev(span3, b3);
    			append_dev(span3, t20);
    			append_dev(div2, t21);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*nodesIds, nodes*/ 3) {
    				each_value = /*nodes*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each$1(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $graphStore;
    	validate_store(graphStore, 'graphStore');
    	component_subscribe$1($$self, graphStore, $$value => $$invalidate(3, $graphStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PertChart', slots, []);
    	const nodesIds = [];
    	let nodes = [];

    	const unsubscribe = graphStore.subscribe(() => {
    		const adjList = $graphStore.getAdjacentsList;
    		$$invalidate(1, nodes = [...$graphStore.getNodes.values()]);

    		Object.entries(adjList).forEach(([start, adj]) => {
    			nodesIds.push(start);

    			adj.forEach(({ node, weight, name }) => {
    				node.id;
    			}); // console.log(start, end, nodesIds[start], nodesIds[end]);
    			// new LeaderLine(nodesIds[start], nodesIds[end], {
    			//     color: '#0064c8',
    			//     endLabel: `${name} (${weight})`,
    		}); //     // dash: true, // for dummy lines
    		// });
    	}); // console.log(nodesIds);
    	// Object.entries(adjList).forEach(([a, b]: [string, number[]]) => {
    	//     const activities = Object.keys($graphStore);
    	//     const label = activities[a];
    	//     const { duration } = $graphStore[label];

    	//     nodeIds.push(a);
    	//     b.forEach((end) => {
    	//         new LeaderLine(nodeIds[a], nodeIds[end], {
    	//             color: '#0064c8',
    	//             endLabel: `${label} (${duration})`,
    	//             // dash: true, // for dummy lines
    	//         });
    	//     });
    	// });
    	onDestroy$1(unsubscribe);

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PertChart> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value, id) {
    		binding_callbacks$1[$$value ? 'unshift' : 'push'](() => {
    			nodesIds[id] = $$value;
    			$$invalidate(0, nodesIds);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onDestroy: onDestroy$1,
    		graphStore,
    		nodesIds,
    		nodes,
    		unsubscribe,
    		$graphStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('nodes' in $$props) $$invalidate(1, nodes = $$props.nodes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nodesIds, nodes, div_binding];
    }

    class PertChart extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PertChart",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/routes/cpm.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/routes/cpm.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let criticalpath;
    	let t0;
    	let div;
    	let crudtable;
    	let t1;
    	let ganttchart;
    	let t2;
    	let pertchart;
    	let current;
    	criticalpath = new CriticalPath({ $$inline: true });
    	crudtable = new CrudTable({ $$inline: true });
    	ganttchart = new GanttChart({ $$inline: true });
    	pertchart = new PertChart({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element$1("main");
    			create_component$1(criticalpath.$$.fragment);
    			t0 = space$1();
    			div = element$1("div");
    			create_component$1(crudtable.$$.fragment);
    			t1 = space$1();
    			create_component$1(ganttchart.$$.fragment);
    			t2 = space$1();
    			create_component$1(pertchart.$$.fragment);
    			attr_dev(div, "class", "grid md:grid-cols-1 lg:grid-cols-2 gap-5");
    			add_location(div, file$1, 7, 4, 259);
    			attr_dev(main, "class", "container mx-auto grid gap-5 h-[calc(100%-8rem)] grid-rows-[minmax(50px,_auto)_1fr_minmax(180px,_auto)]");
    			add_location(main, file$1, 3, 0, 110);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component$1(criticalpath, main, null);
    			append_dev(main, t0);
    			append_dev(main, div);
    			mount_component$1(crudtable, div, null);
    			append_dev(div, t1);
    			mount_component$1(ganttchart, div, null);
    			append_dev(main, t2);
    			mount_component$1(pertchart, main, null);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(criticalpath.$$.fragment, local);
    			transition_in$1(crudtable.$$.fragment, local);
    			transition_in$1(ganttchart.$$.fragment, local);
    			transition_in$1(pertchart.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(criticalpath.$$.fragment, local);
    			transition_out$1(crudtable.$$.fragment, local);
    			transition_out$1(ganttchart.$$.fragment, local);
    			transition_out$1(pertchart.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component$1(criticalpath);
    			destroy_component$1(crudtable);
    			destroy_component$1(ganttchart);
    			destroy_component$1(pertchart);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cpm', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cpm> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CrudTable,
    		CriticalPath,
    		GanttChart,
    		PertChart
    	});

    	return [];
    }

    class Cpm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cpm",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/routes/tp.svelte generated by Svelte v3.46.4 */
    const file = "src/routes/tp.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let userinput;
    	let t0;
    	let div;
    	let transportcosttable;
    	let t1;
    	let solutiontable;
    	let current;
    	userinput = new UserInput({ $$inline: true });

    	transportcosttable = new TransportCostTable({
    			props: {
    				customers: /*customers*/ ctx[1],
    				suppliers: /*suppliers*/ ctx[0]
    			},
    			$$inline: true
    		});

    	solutiontable = new SolutionTable({
    			props: {
    				customers: /*customers*/ ctx[1],
    				suppliers: /*suppliers*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element$1("main");
    			create_component$1(userinput.$$.fragment);
    			t0 = space$1();
    			div = element$1("div");
    			create_component$1(transportcosttable.$$.fragment);
    			t1 = space$1();
    			create_component$1(solutiontable.$$.fragment);
    			attr_dev(div, "class", "flex gap-5");
    			add_location(div, file, 7, 4, 294);
    			attr_dev(main, "class", "container mx-auto grid gap-5 h-[calc(100%-8rem)] grid-rows-[minmax(50px,_auto)_1fr]");
    			add_location(main, file, 5, 0, 173);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component$1(userinput, main, null);
    			append_dev(main, t0);
    			append_dev(main, div);
    			mount_component$1(transportcosttable, div, null);
    			append_dev(div, t1);
    			mount_component$1(solutiontable, div, null);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(userinput.$$.fragment, local);
    			transition_in$1(transportcosttable.$$.fragment, local);
    			transition_in$1(solutiontable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(userinput.$$.fragment, local);
    			transition_out$1(transportcosttable.$$.fragment, local);
    			transition_out$1(solutiontable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component$1(userinput);
    			destroy_component$1(transportcosttable);
    			destroy_component$1(solutiontable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tp', slots, []);
    	let suppliers = ['D1', 'D2'];
    	let customers = ['O1', 'O2', 'O3'];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tp> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		UserInput,
    		TransportCostTable,
    		SolutionTable,
    		suppliers,
    		customers
    	});

    	$$self.$inject_state = $$props => {
    		if ('suppliers' in $$props) $$invalidate(0, suppliers = $$props.suppliers);
    		if ('customers' in $$props) $$invalidate(1, customers = $$props.customers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [suppliers, customers];
    }

    class Tp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tp",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/app.svelte generated by Svelte v3.46.4 */

    // (9:4) <Route path="tp">
    function create_default_slot_3(ctx) {
    	let criticalpathmethod;
    	let current;
    	criticalpathmethod = new Cpm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component$1(criticalpathmethod.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(criticalpathmethod, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(criticalpathmethod.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(criticalpathmethod.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(criticalpathmethod, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(9:4) <Route path=\\\"tp\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:4) <Route path="cpm">
    function create_default_slot_2(ctx) {
    	let criticalpathmethod;
    	let current;
    	criticalpathmethod = new Cpm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component$1(criticalpathmethod.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(criticalpathmethod, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(criticalpathmethod.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(criticalpathmethod.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(criticalpathmethod, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(12:4) <Route path=\\\"cpm\\\">",
    		ctx
    	});

    	return block;
    }

    // (15:4) <Route path="/">
    function create_default_slot_1(ctx) {
    	let transportationproblem;
    	let current;
    	transportationproblem = new Tp({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component$1(transportationproblem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(transportationproblem, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(transportationproblem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(transportationproblem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(transportationproblem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(15:4) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (7:0) <Router>
    function create_default_slot(ctx) {
    	let nav;
    	let t0;
    	let route0;
    	let t1;
    	let route1;
    	let t2;
    	let route2;
    	let current;
    	nav = new Nav({ $$inline: true });

    	route0 = new Route$1({
    			props: {
    				path: "tp",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route$1({
    			props: {
    				path: "cpm",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route$1({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component$1(nav.$$.fragment);
    			t0 = space$1();
    			create_component$1(route0.$$.fragment);
    			t1 = space$1();
    			create_component$1(route1.$$.fragment);
    			t2 = space$1();
    			create_component$1(route2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(nav, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component$1(route0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component$1(route1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component$1(route2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(nav.$$.fragment, local);
    			transition_in$1(route0.$$.fragment, local);
    			transition_in$1(route1.$$.fragment, local);
    			transition_in$1(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(nav.$$.fragment, local);
    			transition_out$1(route0.$$.fragment, local);
    			transition_out$1(route1.$$.fragment, local);
    			transition_out$1(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(nav, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component$1(route0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component$1(route1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component$1(route2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(7:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router$1({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component$1(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component$1(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in$1(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out$1(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component$1(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router: Router$1,
    		Route: Route$1,
    		Nav,
    		CriticalPAthMethod: Cpm,
    		TransportationProblem: Tp
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal$1, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
