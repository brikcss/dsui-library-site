(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*!
	ISC License

	Copyright (c) 2014-2018, Andrea Giammarchi, @WebReflection

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted, provided that the above
	copyright notice and this permission notice appear in all copies.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
	OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.

	*/
	// global window Object
	// optional polyfill info
	//    'auto' used by default, everything is feature detected
	//    'force' use the polyfill even if not fully needed
	function installCustomElements(window, polyfill) {
	  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
	  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
	  // THIS FILE IS JUST WRAPPED UP RESULTING IN
	  // build/document-register-element.node.js

	  var
	    document = window.document,
	    Object = window.Object
	  ;

	  var htmlClass = (function (info) {
	    // (C) Andrea Giammarchi - @WebReflection - MIT Style
	    var
	      catchClass = /^[A-Z]+[a-z]/,
	      filterBy = function (re) {
	        var arr = [], tag;
	        for (tag in register) {
	          if (re.test(tag)) arr.push(tag);
	        }
	        return arr;
	      },
	      add = function (Class, tag) {
	        tag = tag.toLowerCase();
	        if (!(tag in register)) {
	          register[Class] = (register[Class] || []).concat(tag);
	          register[tag] = (register[tag.toUpperCase()] = Class);
	        }
	      },
	      register = (Object.create || Object)(null),
	      htmlClass = {},
	      i, section, tags, Class
	    ;
	    for (section in info) {
	      for (Class in info[section]) {
	        tags = info[section][Class];
	        register[Class] = tags;
	        for (i = 0; i < tags.length; i++) {
	          register[tags[i].toLowerCase()] =
	          register[tags[i].toUpperCase()] = Class;
	        }
	      }
	    }
	    htmlClass.get = function get(tagOrClass) {
	      return typeof tagOrClass === 'string' ?
	        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
	        filterBy(tagOrClass);
	    };
	    htmlClass.set = function set(tag, Class) {
	      return (catchClass.test(tag) ?
	        add(tag, Class) :
	        add(Class, tag)
	      ), htmlClass;
	    };
	    return htmlClass;
	  }({
	    "collections": {
	      "HTMLAllCollection": [
	        "all"
	      ],
	      "HTMLCollection": [
	        "forms"
	      ],
	      "HTMLFormControlsCollection": [
	        "elements"
	      ],
	      "HTMLOptionsCollection": [
	        "options"
	      ]
	    },
	    "elements": {
	      "Element": [
	        "element"
	      ],
	      "HTMLAnchorElement": [
	        "a"
	      ],
	      "HTMLAppletElement": [
	        "applet"
	      ],
	      "HTMLAreaElement": [
	        "area"
	      ],
	      "HTMLAttachmentElement": [
	        "attachment"
	      ],
	      "HTMLAudioElement": [
	        "audio"
	      ],
	      "HTMLBRElement": [
	        "br"
	      ],
	      "HTMLBaseElement": [
	        "base"
	      ],
	      "HTMLBodyElement": [
	        "body"
	      ],
	      "HTMLButtonElement": [
	        "button"
	      ],
	      "HTMLCanvasElement": [
	        "canvas"
	      ],
	      "HTMLContentElement": [
	        "content"
	      ],
	      "HTMLDListElement": [
	        "dl"
	      ],
	      "HTMLDataElement": [
	        "data"
	      ],
	      "HTMLDataListElement": [
	        "datalist"
	      ],
	      "HTMLDetailsElement": [
	        "details"
	      ],
	      "HTMLDialogElement": [
	        "dialog"
	      ],
	      "HTMLDirectoryElement": [
	        "dir"
	      ],
	      "HTMLDivElement": [
	        "div"
	      ],
	      "HTMLDocument": [
	        "document"
	      ],
	      "HTMLElement": [
	        "element",
	        "abbr",
	        "address",
	        "article",
	        "aside",
	        "b",
	        "bdi",
	        "bdo",
	        "cite",
	        "code",
	        "command",
	        "dd",
	        "dfn",
	        "dt",
	        "em",
	        "figcaption",
	        "figure",
	        "footer",
	        "header",
	        "i",
	        "kbd",
	        "mark",
	        "nav",
	        "noscript",
	        "rp",
	        "rt",
	        "ruby",
	        "s",
	        "samp",
	        "section",
	        "small",
	        "strong",
	        "sub",
	        "summary",
	        "sup",
	        "u",
	        "var",
	        "wbr"
	      ],
	      "HTMLEmbedElement": [
	        "embed"
	      ],
	      "HTMLFieldSetElement": [
	        "fieldset"
	      ],
	      "HTMLFontElement": [
	        "font"
	      ],
	      "HTMLFormElement": [
	        "form"
	      ],
	      "HTMLFrameElement": [
	        "frame"
	      ],
	      "HTMLFrameSetElement": [
	        "frameset"
	      ],
	      "HTMLHRElement": [
	        "hr"
	      ],
	      "HTMLHeadElement": [
	        "head"
	      ],
	      "HTMLHeadingElement": [
	        "h1",
	        "h2",
	        "h3",
	        "h4",
	        "h5",
	        "h6"
	      ],
	      "HTMLHtmlElement": [
	        "html"
	      ],
	      "HTMLIFrameElement": [
	        "iframe"
	      ],
	      "HTMLImageElement": [
	        "img"
	      ],
	      "HTMLInputElement": [
	        "input"
	      ],
	      "HTMLKeygenElement": [
	        "keygen"
	      ],
	      "HTMLLIElement": [
	        "li"
	      ],
	      "HTMLLabelElement": [
	        "label"
	      ],
	      "HTMLLegendElement": [
	        "legend"
	      ],
	      "HTMLLinkElement": [
	        "link"
	      ],
	      "HTMLMapElement": [
	        "map"
	      ],
	      "HTMLMarqueeElement": [
	        "marquee"
	      ],
	      "HTMLMediaElement": [
	        "media"
	      ],
	      "HTMLMenuElement": [
	        "menu"
	      ],
	      "HTMLMenuItemElement": [
	        "menuitem"
	      ],
	      "HTMLMetaElement": [
	        "meta"
	      ],
	      "HTMLMeterElement": [
	        "meter"
	      ],
	      "HTMLModElement": [
	        "del",
	        "ins"
	      ],
	      "HTMLOListElement": [
	        "ol"
	      ],
	      "HTMLObjectElement": [
	        "object"
	      ],
	      "HTMLOptGroupElement": [
	        "optgroup"
	      ],
	      "HTMLOptionElement": [
	        "option"
	      ],
	      "HTMLOutputElement": [
	        "output"
	      ],
	      "HTMLParagraphElement": [
	        "p"
	      ],
	      "HTMLParamElement": [
	        "param"
	      ],
	      "HTMLPictureElement": [
	        "picture"
	      ],
	      "HTMLPreElement": [
	        "pre"
	      ],
	      "HTMLProgressElement": [
	        "progress"
	      ],
	      "HTMLQuoteElement": [
	        "blockquote",
	        "q",
	        "quote"
	      ],
	      "HTMLScriptElement": [
	        "script"
	      ],
	      "HTMLSelectElement": [
	        "select"
	      ],
	      "HTMLShadowElement": [
	        "shadow"
	      ],
	      "HTMLSlotElement": [
	        "slot"
	      ],
	      "HTMLSourceElement": [
	        "source"
	      ],
	      "HTMLSpanElement": [
	        "span"
	      ],
	      "HTMLStyleElement": [
	        "style"
	      ],
	      "HTMLTableCaptionElement": [
	        "caption"
	      ],
	      "HTMLTableCellElement": [
	        "td",
	        "th"
	      ],
	      "HTMLTableColElement": [
	        "col",
	        "colgroup"
	      ],
	      "HTMLTableElement": [
	        "table"
	      ],
	      "HTMLTableRowElement": [
	        "tr"
	      ],
	      "HTMLTableSectionElement": [
	        "thead",
	        "tbody",
	        "tfoot"
	      ],
	      "HTMLTemplateElement": [
	        "template"
	      ],
	      "HTMLTextAreaElement": [
	        "textarea"
	      ],
	      "HTMLTimeElement": [
	        "time"
	      ],
	      "HTMLTitleElement": [
	        "title"
	      ],
	      "HTMLTrackElement": [
	        "track"
	      ],
	      "HTMLUListElement": [
	        "ul"
	      ],
	      "HTMLUnknownElement": [
	        "unknown",
	        "vhgroupv",
	        "vkeygen"
	      ],
	      "HTMLVideoElement": [
	        "video"
	      ]
	    },
	    "nodes": {
	      "Attr": [
	        "node"
	      ],
	      "Audio": [
	        "audio"
	      ],
	      "CDATASection": [
	        "node"
	      ],
	      "CharacterData": [
	        "node"
	      ],
	      "Comment": [
	        "#comment"
	      ],
	      "Document": [
	        "#document"
	      ],
	      "DocumentFragment": [
	        "#document-fragment"
	      ],
	      "DocumentType": [
	        "node"
	      ],
	      "HTMLDocument": [
	        "#document"
	      ],
	      "Image": [
	        "img"
	      ],
	      "Option": [
	        "option"
	      ],
	      "ProcessingInstruction": [
	        "node"
	      ],
	      "ShadowRoot": [
	        "#shadow-root"
	      ],
	      "Text": [
	        "#text"
	      ],
	      "XMLDocument": [
	        "xml"
	      ]
	    }
	  }));
	  
	  
	    
	  // passed at runtime, configurable via nodejs module
	  if (typeof polyfill !== 'object') polyfill = {type: polyfill || 'auto'};
	  
	  var 
	    // V0 polyfill entry
	    REGISTER_ELEMENT = 'registerElement',
	  
	    // IE < 11 only + old WebKit for attributes + feature detection
	    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
	  
	    // shortcuts and costants
	    ADD_EVENT_LISTENER = 'addEventListener',
	    ATTACHED = 'attached',
	    CALLBACK = 'Callback',
	    DETACHED = 'detached',
	    EXTENDS = 'extends',
	  
	    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
	    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
	    CONNECTED_CALLBACK = 'connected' + CALLBACK,
	    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
	    CREATED_CALLBACK = 'created' + CALLBACK,
	    DETACHED_CALLBACK = DETACHED + CALLBACK,
	  
	    ADDITION = 'ADDITION',
	    MODIFICATION = 'MODIFICATION',
	    REMOVAL = 'REMOVAL',
	  
	    DOM_ATTR_MODIFIED = 'DOMAttrModified',
	    DOM_CONTENT_LOADED = 'DOMContentLoaded',
	    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
	  
	    PREFIX_TAG = '<',
	    PREFIX_IS = '=',
	  
	    // valid and invalid node names
	    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	    invalidNames = [
	      'ANNOTATION-XML',
	      'COLOR-PROFILE',
	      'FONT-FACE',
	      'FONT-FACE-SRC',
	      'FONT-FACE-URI',
	      'FONT-FACE-FORMAT',
	      'FONT-FACE-NAME',
	      'MISSING-GLYPH'
	    ],
	  
	    // registered types and their prototypes
	    types = [],
	    protos = [],
	  
	    // to query subnodes
	    query = '',
	  
	    // html shortcut used to feature detect
	    documentElement = document.documentElement,
	  
	    // ES5 inline helpers || basic patches
	    indexOf = types.indexOf || function (v) {
	      for(var i = this.length; i-- && this[i] !== v;){}
	      return i;
	    },
	  
	    // other helpers / shortcuts
	    OP = Object.prototype,
	    hOP = OP.hasOwnProperty,
	    iPO = OP.isPrototypeOf,
	  
	    defineProperty = Object.defineProperty,
	    empty = [],
	    gOPD = Object.getOwnPropertyDescriptor,
	    gOPN = Object.getOwnPropertyNames,
	    gPO = Object.getPrototypeOf,
	    sPO = Object.setPrototypeOf,
	  
	    // jshint proto: true
	    hasProto = !!Object.__proto__,
	  
	    DRECEV1 = '__dreCEv1',
	    customElements = window.customElements,
	    usableCustomElements = !/^force/.test(polyfill.type) && !!(
	      customElements &&
	      customElements.define &&
	      customElements.get &&
	      customElements.whenDefined
	    ),
	    Dict = Object.create || Object,
	    Map = window.Map || function Map() {
	      var K = [], V = [], i;
	      return {
	        get: function (k) {
	          return V[indexOf.call(K, k)];
	        },
	        set: function (k, v) {
	          i = indexOf.call(K, k);
	          if (i < 0) V[K.push(k) - 1] = v;
	          else V[i] = v;
	        }
	      };
	    },
	    Promise = window.Promise || function (fn) {
	      var
	        notify = [],
	        done = false,
	        p = {
	          'catch': function () {
	            return p;
	          },
	          'then': function (cb) {
	            notify.push(cb);
	            if (done) setTimeout(resolve, 1);
	            return p;
	          }
	        }
	      ;
	      function resolve(value) {
	        done = true;
	        while (notify.length) notify.shift()(value);
	      }
	      fn(resolve);
	      return p;
	    },
	    justCreated = false,
	    constructors = Dict(null),
	    waitingList = Dict(null),
	    nodeNames = new Map(),
	    secondArgument = function (is) {
	      return is.toLowerCase();
	    },
	  
	    // used to create unique instances
	    create = Object.create || function Bridge(proto) {
	      // silly broken polyfill probably ever used but short enough to work
	      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
	    },
	  
	    // will set the prototype if possible
	    // or copy over all properties
	    setPrototype = sPO || (
	      hasProto ?
	        function (o, p) {
	          o.__proto__ = p;
	          return o;
	        } : (
	      (gOPN && gOPD) ?
	        (function(){
	          function setProperties(o, p) {
	            for (var
	              key,
	              names = gOPN(p),
	              i = 0, length = names.length;
	              i < length; i++
	            ) {
	              key = names[i];
	              if (!hOP.call(o, key)) {
	                defineProperty(o, key, gOPD(p, key));
	              }
	            }
	          }
	          return function (o, p) {
	            do {
	              setProperties(o, p);
	            } while ((p = gPO(p)) && !iPO.call(p, o));
	            return o;
	          };
	        }()) :
	        function (o, p) {
	          for (var key in p) {
	            o[key] = p[key];
	          }
	          return o;
	        }
	    )),
	  
	    // DOM shortcuts and helpers, if any
	  
	    MutationObserver = window.MutationObserver ||
	                       window.WebKitMutationObserver,
	  
	    HTMLElementPrototype = (
	      window.HTMLElement ||
	      window.Element ||
	      window.Node
	    ).prototype,
	  
	    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
	  
	    safeProperty = IE8 ? function (o, k, d) {
	      o[k] = d.value;
	      return o;
	    } : defineProperty,
	  
	    isValidNode = IE8 ?
	      function (node) {
	        return node.nodeType === 1;
	      } :
	      function (node) {
	        return iPO.call(HTMLElementPrototype, node);
	      },
	  
	    targets = IE8 && [],
	  
	    attachShadow = HTMLElementPrototype.attachShadow,
	    cloneNode = HTMLElementPrototype.cloneNode,
	    dispatchEvent = HTMLElementPrototype.dispatchEvent,
	    getAttribute = HTMLElementPrototype.getAttribute,
	    hasAttribute = HTMLElementPrototype.hasAttribute,
	    removeAttribute = HTMLElementPrototype.removeAttribute,
	    setAttribute = HTMLElementPrototype.setAttribute,
	  
	    // replaced later on
	    createElement = document.createElement,
	    patchedCreateElement = createElement,
	  
	    // shared observer for all attributes
	    attributesObserver = MutationObserver && {
	      attributes: true,
	      characterData: true,
	      attributeOldValue: true
	    },
	  
	    // useful to detect only if there's no MutationObserver
	    DOMAttrModified = MutationObserver || function(e) {
	      doesNotSupportDOMAttrModified = false;
	      documentElement.removeEventListener(
	        DOM_ATTR_MODIFIED,
	        DOMAttrModified
	      );
	    },
	  
	    // will both be used to make DOMNodeInserted asynchronous
	    asapQueue,
	    asapTimer = 0,
	  
	    // internal flags
	    V0 = REGISTER_ELEMENT in document &&
	         !/^force-all/.test(polyfill.type),
	    setListener = true,
	    justSetup = false,
	    doesNotSupportDOMAttrModified = true,
	    dropDomContentLoaded = true,
	  
	    // needed for the innerHTML helper
	    notFromInnerHTMLHelper = true,
	  
	    // optionally defined later on
	    onSubtreeModified,
	    callDOMAttrModified,
	    getAttributesMirror,
	    observer,
	    observe,
	  
	    // based on setting prototype capability
	    // will check proto or the expando attribute
	    // in order to setup the node once
	    patchIfNotAlready,
	    patch,
	  
	    // used for tests
	    tmp
	  ;
	  
	  // IE11 disconnectedCallback issue #
	  // to be tested before any createElement patch
	  if (MutationObserver) {
	    // original fix:
	    // https://github.com/javan/mutation-observer-inner-html-shim
	    tmp = document.createElement('div');
	    tmp.innerHTML = '<div><div></div></div>';
	    new MutationObserver(function (mutations, observer) {
	      if (
	        mutations[0] &&
	        mutations[0].type == 'childList' &&
	        !mutations[0].removedNodes[0].childNodes.length
	      ) {
	        tmp = gOPD(HTMLElementPrototype, 'innerHTML');
	        var set = tmp && tmp.set;
	        if (set)
	          defineProperty(HTMLElementPrototype, 'innerHTML', {
	            set: function (value) {
	              while (this.lastChild)
	                this.removeChild(this.lastChild);
	              set.call(this, value);
	            }
	          });
	      }
	      observer.disconnect();
	      tmp = null;
	    }).observe(tmp, {childList: true, subtree: true});
	    tmp.innerHTML = "";
	  }
	  
	  // only if needed
	  if (!V0) {
	  
	    if (sPO || hasProto) {
	        patchIfNotAlready = function (node, proto) {
	          if (!iPO.call(proto, node)) {
	            setupNode(node, proto);
	          }
	        };
	        patch = setupNode;
	    } else {
	        patchIfNotAlready = function (node, proto) {
	          if (!node[EXPANDO_UID]) {
	            node[EXPANDO_UID] = Object(true);
	            setupNode(node, proto);
	          }
	        };
	        patch = patchIfNotAlready;
	    }
	  
	    if (IE8) {
	      doesNotSupportDOMAttrModified = false;
	      (function (){
	        var
	          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
	          addEventListener = descriptor.value,
	          patchedRemoveAttribute = function (name) {
	            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	            e.attrName = name;
	            e.prevValue = getAttribute.call(this, name);
	            e.newValue = null;
	            e[REMOVAL] = e.attrChange = 2;
	            removeAttribute.call(this, name);
	            dispatchEvent.call(this, e);
	          },
	          patchedSetAttribute = function (name, value) {
	            var
	              had = hasAttribute.call(this, name),
	              old = had && getAttribute.call(this, name),
	              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
	            ;
	            setAttribute.call(this, name, value);
	            e.attrName = name;
	            e.prevValue = had ? old : null;
	            e.newValue = value;
	            if (had) {
	              e[MODIFICATION] = e.attrChange = 1;
	            } else {
	              e[ADDITION] = e.attrChange = 0;
	            }
	            dispatchEvent.call(this, e);
	          },
	          onPropertyChange = function (e) {
	            // jshint eqnull:true
	            var
	              node = e.currentTarget,
	              superSecret = node[EXPANDO_UID],
	              propertyName = e.propertyName,
	              event
	            ;
	            if (superSecret.hasOwnProperty(propertyName)) {
	              superSecret = superSecret[propertyName];
	              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	              event.attrName = superSecret.name;
	              event.prevValue = superSecret.value || null;
	              event.newValue = (superSecret.value = node[propertyName] || null);
	              if (event.prevValue == null) {
	                event[ADDITION] = event.attrChange = 0;
	              } else {
	                event[MODIFICATION] = event.attrChange = 1;
	              }
	              dispatchEvent.call(node, event);
	            }
	          }
	        ;
	        descriptor.value = function (type, handler, capture) {
	          if (
	            type === DOM_ATTR_MODIFIED &&
	            this[ATTRIBUTE_CHANGED_CALLBACK] &&
	            this.setAttribute !== patchedSetAttribute
	          ) {
	            this[EXPANDO_UID] = {
	              className: {
	                name: 'class',
	                value: this.className
	              }
	            };
	            this.setAttribute = patchedSetAttribute;
	            this.removeAttribute = patchedRemoveAttribute;
	            addEventListener.call(this, 'propertychange', onPropertyChange);
	          }
	          addEventListener.call(this, type, handler, capture);
	        };
	        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
	      }());
	    } else if (!MutationObserver) {
	      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
	      documentElement.setAttribute(EXPANDO_UID, 1);
	      documentElement.removeAttribute(EXPANDO_UID);
	      if (doesNotSupportDOMAttrModified) {
	        onSubtreeModified = function (e) {
	          var
	            node = this,
	            oldAttributes,
	            newAttributes,
	            key
	          ;
	          if (node === e.target) {
	            oldAttributes = node[EXPANDO_UID];
	            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
	            for (key in newAttributes) {
	              if (!(key in oldAttributes)) {
	                // attribute was added
	                return callDOMAttrModified(
	                  0,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  ADDITION
	                );
	              } else if (newAttributes[key] !== oldAttributes[key]) {
	                // attribute was changed
	                return callDOMAttrModified(
	                  1,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  MODIFICATION
	                );
	              }
	            }
	            // checking if it has been removed
	            for (key in oldAttributes) {
	              if (!(key in newAttributes)) {
	                // attribute removed
	                return callDOMAttrModified(
	                  2,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  REMOVAL
	                );
	              }
	            }
	          }
	        };
	        callDOMAttrModified = function (
	          attrChange,
	          currentTarget,
	          attrName,
	          prevValue,
	          newValue,
	          action
	        ) {
	          var e = {
	            attrChange: attrChange,
	            currentTarget: currentTarget,
	            attrName: attrName,
	            prevValue: prevValue,
	            newValue: newValue
	          };
	          e[action] = attrChange;
	          onDOMAttrModified(e);
	        };
	        getAttributesMirror = function (node) {
	          for (var
	            attr, name,
	            result = {},
	            attributes = node.attributes,
	            i = 0, length = attributes.length;
	            i < length; i++
	          ) {
	            attr = attributes[i];
	            name = attr.name;
	            if (name !== 'setAttribute') {
	              result[name] = attr.value;
	            }
	          }
	          return result;
	        };
	      }
	    }
	  
	    // set as enumerable, writable and configurable
	    document[REGISTER_ELEMENT] = function registerElement(type, options) {
	      upperType = type.toUpperCase();
	      if (setListener) {
	        // only first time document.registerElement is used
	        // we need to set this listener
	        // setting it by default might slow down for no reason
	        setListener = false;
	        if (MutationObserver) {
	          observer = (function(attached, detached){
	            function checkEmAll(list, callback) {
	              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
	            }
	            return new MutationObserver(function (records) {
	              for (var
	                current, node, newValue,
	                i = 0, length = records.length; i < length; i++
	              ) {
	                current = records[i];
	                if (current.type === 'childList') {
	                  checkEmAll(current.addedNodes, attached);
	                  checkEmAll(current.removedNodes, detached);
	                } else {
	                  node = current.target;
	                  if (notFromInnerHTMLHelper &&
	                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
	                      current.attributeName !== 'style') {
	                    newValue = getAttribute.call(node, current.attributeName);
	                    if (newValue !== current.oldValue) {
	                      node[ATTRIBUTE_CHANGED_CALLBACK](
	                        current.attributeName,
	                        current.oldValue,
	                        newValue
	                      );
	                    }
	                  }
	                }
	              }
	            });
	          }(executeAction(ATTACHED), executeAction(DETACHED)));
	          observe = function (node) {
	            observer.observe(
	              node,
	              {
	                childList: true,
	                subtree: true
	              }
	            );
	            return node;
	          };
	          observe(document);
	          if (attachShadow) {
	            HTMLElementPrototype.attachShadow = function () {
	              return observe(attachShadow.apply(this, arguments));
	            };
	          }
	        } else {
	          asapQueue = [];
	          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
	          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
	        }
	  
	        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
	        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
	  
	        HTMLElementPrototype.cloneNode = function (deep) {
	          var
	            node = cloneNode.call(this, !!deep),
	            i = getTypeIndex(node)
	          ;
	          if (-1 < i) patch(node, protos[i]);
	          if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
	          return node;
	        };
	      }
	  
	      if (justSetup) return (justSetup = false);
	  
	      if (-2 < (
	        indexOf.call(types, PREFIX_IS + upperType) +
	        indexOf.call(types, PREFIX_TAG + upperType)
	      )) {
	        throwTypeError(type);
	      }
	  
	      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
	        throw new Error('The type ' + type + ' is invalid');
	      }
	  
	      var
	        constructor = function () {
	          return extending ?
	            document.createElement(nodeName, upperType) :
	            document.createElement(nodeName);
	        },
	        opt = options || OP,
	        extending = hOP.call(opt, EXTENDS),
	        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
	        upperType,
	        i
	      ;
	  
	      if (extending && -1 < (
	        indexOf.call(types, PREFIX_TAG + nodeName)
	      )) {
	        throwTypeError(nodeName);
	      }
	  
	      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
	  
	      query = query.concat(
	        query.length ? ',' : '',
	        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
	      );
	  
	      constructor.prototype = (
	        protos[i] = hOP.call(opt, 'prototype') ?
	          opt.prototype :
	          create(HTMLElementPrototype)
	      );
	  
	      if (query.length) loopAndVerify(
	        document.querySelectorAll(query),
	        ATTACHED
	      );
	  
	      return constructor;
	    };
	  
	    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
	      var
	        is = getIs(typeExtension),
	        node = is ?
	          createElement.call(document, localName, secondArgument(is)) :
	          createElement.call(document, localName),
	        name = '' + localName,
	        i = indexOf.call(
	          types,
	          (is ? PREFIX_IS : PREFIX_TAG) +
	          (is || name).toUpperCase()
	        ),
	        setup = -1 < i
	      ;
	      if (is) {
	        node.setAttribute('is', is = is.toLowerCase());
	        if (setup) {
	          setup = isInQSA(name.toUpperCase(), is);
	        }
	      }
	      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
	      if (setup) patch(node, protos[i]);
	      return node;
	    });
	  
	  }
	  
	  function ASAP() {
	    var queue = asapQueue.splice(0, asapQueue.length);
	    asapTimer = 0;
	    while (queue.length) {
	      queue.shift().call(
	        null, queue.shift()
	      );
	    }
	  }
	  
	  function loopAndVerify(list, action) {
	    for (var i = 0, length = list.length; i < length; i++) {
	      verifyAndSetupAndAction(list[i], action);
	    }
	  }
	  
	  function loopAndSetup(list) {
	    for (var i = 0, length = list.length, node; i < length; i++) {
	      node = list[i];
	      patch(node, protos[getTypeIndex(node)]);
	    }
	  }
	  
	  function executeAction(action) {
	    return function (node) {
	      if (isValidNode(node)) {
	        verifyAndSetupAndAction(node, action);
	        if (query.length) loopAndVerify(
	          node.querySelectorAll(query),
	          action
	        );
	      }
	    };
	  }
	  
	  function getTypeIndex(target) {
	    var
	      is = getAttribute.call(target, 'is'),
	      nodeName = target.nodeName.toUpperCase(),
	      i = indexOf.call(
	        types,
	        is ?
	            PREFIX_IS + is.toUpperCase() :
	            PREFIX_TAG + nodeName
	      )
	    ;
	    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
	  }
	  
	  function isInQSA(name, type) {
	    return -1 < query.indexOf(name + '[is="' + type + '"]');
	  }
	  
	  function onDOMAttrModified(e) {
	    var
	      node = e.currentTarget,
	      attrChange = e.attrChange,
	      attrName = e.attrName,
	      target = e.target,
	      addition = e[ADDITION] || 2,
	      removal = e[REMOVAL] || 3
	    ;
	    if (notFromInnerHTMLHelper &&
	        (!target || target === node) &&
	        node[ATTRIBUTE_CHANGED_CALLBACK] &&
	        attrName !== 'style' && (
	          e.prevValue !== e.newValue ||
	          // IE9, IE10, and Opera 12 gotcha
	          e.newValue === '' && (
	            attrChange === addition ||
	            attrChange === removal
	          )
	    )) {
	      node[ATTRIBUTE_CHANGED_CALLBACK](
	        attrName,
	        attrChange === addition ? null : e.prevValue,
	        attrChange === removal ? null : e.newValue
	      );
	    }
	  }
	  
	  function onDOMNode(action) {
	    var executor = executeAction(action);
	    return function (e) {
	      asapQueue.push(executor, e.target);
	      if (asapTimer) clearTimeout(asapTimer);
	      asapTimer = setTimeout(ASAP, 1);
	    };
	  }
	  
	  function onReadyStateChange(e) {
	    if (dropDomContentLoaded) {
	      dropDomContentLoaded = false;
	      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
	    }
	    if (query.length) loopAndVerify(
	      (e.target || document).querySelectorAll(query),
	      e.detail === DETACHED ? DETACHED : ATTACHED
	    );
	    if (IE8) purge();
	  }
	  
	  function patchedSetAttribute(name, value) {
	    // jshint validthis:true
	    var self = this;
	    setAttribute.call(self, name, value);
	    onSubtreeModified.call(self, {target: self});
	  }
	  
	  function setupNode(node, proto) {
	    setPrototype(node, proto);
	    if (observer) {
	      observer.observe(node, attributesObserver);
	    } else {
	      if (doesNotSupportDOMAttrModified) {
	        node.setAttribute = patchedSetAttribute;
	        node[EXPANDO_UID] = getAttributesMirror(node);
	        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
	      }
	      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
	    }
	    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
	      node.created = true;
	      node[CREATED_CALLBACK]();
	      node.created = false;
	    }
	  }
	  
	  function purge() {
	    for (var
	      node,
	      i = 0,
	      length = targets.length;
	      i < length; i++
	    ) {
	      node = targets[i];
	      if (!documentElement.contains(node)) {
	        length--;
	        targets.splice(i--, 1);
	        verifyAndSetupAndAction(node, DETACHED);
	      }
	    }
	  }
	  
	  function throwTypeError(type) {
	    throw new Error('A ' + type + ' type is already registered');
	  }
	  
	  function verifyAndSetupAndAction(node, action) {
	    var
	      fn,
	      i = getTypeIndex(node),
	      counterAction
	    ;
	    if (-1 < i) {
	      patchIfNotAlready(node, protos[i]);
	      i = 0;
	      if (action === ATTACHED && !node[ATTACHED]) {
	        node[DETACHED] = false;
	        node[ATTACHED] = true;
	        counterAction = 'connected';
	        i = 1;
	        if (IE8 && indexOf.call(targets, node) < 0) {
	          targets.push(node);
	        }
	      } else if (action === DETACHED && !node[DETACHED]) {
	        node[ATTACHED] = false;
	        node[DETACHED] = true;
	        counterAction = 'disconnected';
	        i = 1;
	      }
	      if (i && (fn = (
	        node[action + CALLBACK] ||
	        node[counterAction + CALLBACK]
	      ))) fn.call(node);
	    }
	  }
	  
	  
	  
	  // V1 in da House!
	  function CustomElementRegistry() {}
	  
	  CustomElementRegistry.prototype = {
	    constructor: CustomElementRegistry,
	    // a workaround for the stubborn WebKit
	    define: usableCustomElements ?
	      function (name, Class, options) {
	        if (options) {
	          CERDefine(name, Class, options);
	        } else {
	          var NAME = name.toUpperCase();
	          constructors[NAME] = {
	            constructor: Class,
	            create: [NAME]
	          };
	          nodeNames.set(Class, NAME);
	          customElements.define(name, Class);
	        }
	      } :
	      CERDefine,
	    get: usableCustomElements ?
	      function (name) {
	        return customElements.get(name) || get(name);
	      } :
	      get,
	    whenDefined: usableCustomElements ?
	      function (name) {
	        return Promise.race([
	          customElements.whenDefined(name),
	          whenDefined(name)
	        ]);
	      } :
	      whenDefined
	  };
	  
	  function CERDefine(name, Class, options) {
	    var
	      is = options && options[EXTENDS] || '',
	      CProto = Class.prototype,
	      proto = create(CProto),
	      attributes = Class.observedAttributes || empty,
	      definition = {prototype: proto}
	    ;
	    // TODO: is this needed at all since it's inherited?
	    // defineProperty(proto, 'constructor', {value: Class});
	    safeProperty(proto, CREATED_CALLBACK, {
	        value: function () {
	          if (justCreated) justCreated = false;
	          else if (!this[DRECEV1]) {
	            this[DRECEV1] = true;
	            new Class(this);
	            if (CProto[CREATED_CALLBACK])
	              CProto[CREATED_CALLBACK].call(this);
	            var info = constructors[nodeNames.get(Class)];
	            if (!usableCustomElements || info.create.length > 1) {
	              notifyAttributes(this);
	            }
	          }
	      }
	    });
	    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
	      value: function (name) {
	        if (-1 < indexOf.call(attributes, name))
	          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
	      }
	    });
	    if (CProto[CONNECTED_CALLBACK]) {
	      safeProperty(proto, ATTACHED_CALLBACK, {
	        value: CProto[CONNECTED_CALLBACK]
	      });
	    }
	    if (CProto[DISCONNECTED_CALLBACK]) {
	      safeProperty(proto, DETACHED_CALLBACK, {
	        value: CProto[DISCONNECTED_CALLBACK]
	      });
	    }
	    if (is) definition[EXTENDS] = is;
	    name = name.toUpperCase();
	    constructors[name] = {
	      constructor: Class,
	      create: is ? [is, secondArgument(name)] : [name]
	    };
	    nodeNames.set(Class, name);
	    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
	    whenDefined(name);
	    waitingList[name].r();
	  }
	  
	  function get(name) {
	    var info = constructors[name.toUpperCase()];
	    return info && info.constructor;
	  }
	  
	  function getIs(options) {
	    return typeof options === 'string' ?
	        options : (options && options.is || '');
	  }
	  
	  function notifyAttributes(self) {
	    var
	      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
	      attributes = callback ? self.attributes : empty,
	      i = attributes.length,
	      attribute
	    ;
	    while (i--) {
	      attribute =  attributes[i]; // || attributes.item(i);
	      callback.call(
	        self,
	        attribute.name || attribute.nodeName,
	        null,
	        attribute.value || attribute.nodeValue
	      );
	    }
	  }
	  
	  function whenDefined(name) {
	    name = name.toUpperCase();
	    if (!(name in waitingList)) {
	      waitingList[name] = {};
	      waitingList[name].p = new Promise(function (resolve) {
	        waitingList[name].r = resolve;
	      });
	    }
	    return waitingList[name].p;
	  }
	  
	  function polyfillV1() {
	    if (customElements) delete window.customElements;
	    defineProperty(window, 'customElements', {
	      configurable: true,
	      value: new CustomElementRegistry()
	    });
	    defineProperty(window, 'CustomElementRegistry', {
	      configurable: true,
	      value: CustomElementRegistry
	    });
	    for (var
	      patchClass = function (name) {
	        var Class = window[name];
	        if (Class) {
	          window[name] = function CustomElementsV1(self) {
	            var info, isNative;
	            if (!self) self = this;
	            if (!self[DRECEV1]) {
	              justCreated = true;
	              info = constructors[nodeNames.get(self.constructor)];
	              isNative = usableCustomElements && info.create.length === 1;
	              self = isNative ?
	                Reflect.construct(Class, empty, info.constructor) :
	                document.createElement.apply(document, info.create);
	              self[DRECEV1] = true;
	              justCreated = false;
	              if (!isNative) notifyAttributes(self);
	            }
	            return self;
	          };
	          window[name].prototype = Class.prototype;
	          try {
	            Class.prototype.constructor = window[name];
	          } catch(WebKit) {
	            defineProperty(Class, DRECEV1, {value: window[name]});
	          }
	        }
	      },
	      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
	      i = Classes.length;
	      i--;
	      patchClass(Classes[i])
	    ) {}
	    (document.createElement = function (name, options) {
	      var is = getIs(options);
	      return is ?
	        patchedCreateElement.call(this, name, secondArgument(is)) :
	        patchedCreateElement.call(this, name);
	    });
	    if (!V0) {
	      justSetup = true;
	      document[REGISTER_ELEMENT]('');
	    }
	  }
	  
	  // if customElements is not there at all
	  if (!customElements || /^force/.test(polyfill.type)) polyfillV1();
	  else if(!polyfill.noBuiltIn) {
	    // if available test extends work as expected
	    try {
	      (function (DRE, options, name) {
	        var re = new RegExp('^<a\\s+is=(\'|")' + name + '\\1></a>$');
	        options[EXTENDS] = 'a';
	        DRE.prototype = create(HTMLAnchorElement.prototype);
	        DRE.prototype.constructor = DRE;
	        window.customElements.define(name, DRE, options);
	        if (
	          !re.test(document.createElement('a', {is: name}).outerHTML) ||
	          !re.test((new DRE()).outerHTML)
	        ) {
	          throw options;
	        }
	      }(
	        function DRE() {
	          return Reflect.construct(HTMLAnchorElement, [], DRE);
	        },
	        {},
	        'document-register-element-a'
	      ));
	    } catch(o_O) {
	      // or force the polyfill if not
	      // and keep internal original reference
	      polyfillV1();
	    }
	  }
	  
	  // FireFox only issue
	  if(!polyfill.noBuiltIn) {
	    try {
	      createElement.call(document, 'a', 'a');
	    } catch(FireFox) {
	      secondArgument = function (is) {
	        return {is: is.toLowerCase()};
	      };
	    }
	  }
	  
	}
	installCustomElements(commonjsGlobal);

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/


	class ShadyData {
	  constructor() {
	    /** @type {ShadowRoot} */
	    this.root = null;
	    /** @type {ShadowRoot} */
	    this.publicRoot = null;
	    this.dirty = false;
	    this.observer = null;
	    /** @type {Array<Node>} */
	    this.assignedNodes = null;
	    /** @type {Element} */
	    this.assignedSlot = null;
	    /** @type {Array<Node>} */
	    this._previouslyAssignedNodes = null;
	    /** @type {Element} */
	    this._prevAssignedSlot = null;
	    /** @type {Array<Node>} */
	    this.flattenedNodes = null;
	    this.ownerShadyRoot = undefined;
	    /** @type {Node|undefined} */
	    this.parentNode = undefined;
	    /** @type {Node|undefined} */
	    this.firstChild = undefined;
	    /** @type {Node|undefined} */
	    this.lastChild = undefined;
	    /** @type {Node|undefined} */
	    this.previousSibling = undefined;
	    /** @type {Node|undefined} */
	    this.nextSibling = undefined;
	    /** @type {Array<Node>|undefined} */
	    this.childNodes = undefined;
	    this.__outsideAccessors = false;
	    this.__insideAccessors = false;
	    this.__onCallbackListeners = {};
	  }

	  toJSON() {
	    return {};
	  }
	}

	function ensureShadyDataForNode(node) {
	  if (!node.__shady) {
	    node.__shady = new ShadyData();
	  }
	  return node.__shady;
	}

	function shadyDataForNode(node) {
	  return node && node.__shady;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	let settings = window['ShadyDOM'] || {};

	settings.hasNativeShadowDOM = Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);

	let desc = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild');

	settings.hasDescriptors = Boolean(desc && desc.configurable && desc.get);
	settings.inUse = settings['force'] || !settings.hasNativeShadowDOM;

	// Default to using native accessors (instead of treewalker) only for
	// IE/Edge where they are faster.
	const IS_IE = navigator.userAgent.match('Trident');
	const IS_EDGE = navigator.userAgent.match('Edge');
	if (settings.useNativeAccessors === undefined) {
	  settings.useNativeAccessors = settings.hasDescriptors && (IS_IE || IS_EDGE);
	}

	function isTrackingLogicalChildNodes(node) {
	  const nodeData = shadyDataForNode(node);
	  return (nodeData && nodeData.firstChild !== undefined);
	}

	function isShadyRoot(obj) {
	  return Boolean(obj._localName === 'ShadyRoot');
	}

	function ownerShadyRootForNode(node) {
	  let root = node.getRootNode();
	  if (isShadyRoot(root)) {
	    return root;
	  }
	}

	let p = Element.prototype;
	let matches = p.matches || p.matchesSelector ||
	  p.mozMatchesSelector || p.msMatchesSelector ||
	  p.oMatchesSelector || p.webkitMatchesSelector;

	function matchesSelector(element, selector) {
	  return matches.call(element, selector);
	}

	function copyOwnProperty(name, source, target) {
	  let pd = Object.getOwnPropertyDescriptor(source, name);
	  if (pd) {
	    Object.defineProperty(target, name, pd);
	  }
	}

	function extend(target, source) {
	  if (target && source) {
	    let n$ = Object.getOwnPropertyNames(source);
	    for (let i=0, n; (i<n$.length) && (n=n$[i]); i++) {
	      copyOwnProperty(n, source, target);
	    }
	  }
	  return target || source;
	}

	function extendAll(target, ...sources) {
	  for (let i=0; i < sources.length; i++) {
	    extend(target, sources[i]);
	  }
	  return target;
	}

	function mixin(target, source) {
	  for (var i in source) {
	    target[i] = source[i];
	  }
	  return target;
	}

	function patchPrototype(obj, mixin) {
	  let proto = Object.getPrototypeOf(obj);
	  if (!proto.hasOwnProperty('__patchProto')) {
	    let patchProto = Object.create(proto);
	    patchProto.__sourceProto = proto;
	    extend(patchProto, mixin);
	    proto['__patchProto'] = patchProto;
	  }
	  // old browsers don't have setPrototypeOf
	  obj.__proto__ = proto['__patchProto'];
	}


	let twiddle = document.createTextNode('');
	let content = 0;
	let queue = [];
	new MutationObserver(() => {
	  while (queue.length) {
	    // catch errors in user code...
	    try {
	      queue.shift()();
	    } catch(e) {
	      // enqueue another record and throw
	      twiddle.textContent = content++;
	      throw(e);
	    }
	  }
	}).observe(twiddle, {characterData: true});

	// use MutationObserver to get microtask async timing.
	function microtask(callback) {
	  queue.push(callback);
	  twiddle.textContent = content++;
	}

	const hasDocumentContains = Boolean(document.contains);

	function contains(container, node) {
	  while (node) {
	    if (node == container) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

	function getNodeHTMLCollectionName(node) {
	  return node.getAttribute('id') || node.getAttribute('name');
	}

	function isValidHTMLCollectionName(name) {
	  return name !== 'length' && isNaN(name);
	}

	function createPolyfilledHTMLCollection(nodes) {
	  // Note: loop in reverse so that the first named item matches the named property
	  for (let l = nodes.length - 1; l >= 0; l--) {
	    const node = nodes[l];
	    const name = getNodeHTMLCollectionName(node);

	    if (name && isValidHTMLCollectionName(name)) {
	      nodes[name] = node;
	    }
	  }
	  nodes.item = function(index) {
	    return nodes[index];
	  };
	  nodes.namedItem = function(name) {
	    if (isValidHTMLCollectionName(name) && nodes[name]) {
	      return nodes[name];
	    }

	    for (const node of nodes) {
	      const nodeName = getNodeHTMLCollectionName(node);

	      if (nodeName == name) {
	        return node;
	      }
	    }

	    return null;
	  };
	  return nodes;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	// render enqueuer/flusher
	let flushList = [];
	let scheduled;
	function enqueue(callback) {
	  if (!scheduled) {
	    scheduled = true;
	    microtask(flush);
	  }
	  flushList.push(callback);
	}

	function flush() {
	  scheduled = false;
	  let didFlush = Boolean(flushList.length);
	  while (flushList.length) {
	    flushList.shift()();
	  }
	  return didFlush;
	}

	flush['list'] = flushList;

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	class AsyncObserver {

	  constructor() {
	    this._scheduled = false;
	    this.addedNodes = [];
	    this.removedNodes = [];
	    this.callbacks = new Set();
	  }

	  schedule() {
	    if (!this._scheduled) {
	      this._scheduled = true;
	      microtask(() => {
	        this.flush();
	      });
	    }
	  }

	  flush() {
	    if (this._scheduled) {
	      this._scheduled = false;
	      let mutations = this.takeRecords();
	      if (mutations.length) {
	        this.callbacks.forEach(function(cb) {
	          cb(mutations);
	        });
	      }
	    }
	  }

	  takeRecords() {
	    if (this.addedNodes.length || this.removedNodes.length) {
	      let mutations = [{
	        addedNodes: this.addedNodes,
	        removedNodes: this.removedNodes
	      }];
	      this.addedNodes = [];
	      this.removedNodes = [];
	      return mutations;
	    }
	    return [];
	  }

	}

	// TODO(sorvell): consider instead polyfilling MutationObserver
	// directly so that users do not have to fork their code.
	// Supporting the entire api may be challenging: e.g. filtering out
	// removed nodes in the wrong scope and seeing non-distributing
	// subtree child mutations.
	let observeChildren = function(node, callback) {
	  const sd = ensureShadyDataForNode(node);
	  if (!sd.observer) {
	    sd.observer = new AsyncObserver();
	  }
	  sd.observer.callbacks.add(callback);
	  let observer = sd.observer;
	  return {
	    _callback: callback,
	    _observer: observer,
	    _node: node,
	    takeRecords() {
	      return observer.takeRecords()
	    }
	  };
	};

	let unobserveChildren = function(handle) {
	  let observer = handle && handle._observer;
	  if (observer) {
	    observer.callbacks.delete(handle._callback);
	    if (!observer.callbacks.size) {
	      ensureShadyDataForNode(handle._node).observer = null;
	    }
	  }
	};

	function filterMutations(mutations, target) {
	  /** @const {Node} */
	  const targetRootNode = target.getRootNode();
	  return mutations.map(function(mutation) {
	    /** @const {boolean} */
	    const mutationInScope = (targetRootNode === mutation.target.getRootNode());
	    if (mutationInScope && mutation.addedNodes) {
	      let nodes = Array.from(mutation.addedNodes).filter(function(n) {
	        return (targetRootNode === n.getRootNode());
	      });
	      if (nodes.length) {
	        mutation = Object.create(mutation);
	        Object.defineProperty(mutation, 'addedNodes', {
	          value: nodes,
	          configurable: true
	        });
	        return mutation;
	      }
	    } else if (mutationInScope) {
	      return mutation;
	    }
	  }).filter(function(m) { return m});
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	let appendChild = Element.prototype.appendChild;
	let insertBefore = Element.prototype.insertBefore;
	let replaceChild = Element.prototype.replaceChild;
	let removeChild = Element.prototype.removeChild;
	let setAttribute = Element.prototype.setAttribute;
	let removeAttribute = Element.prototype.removeAttribute;
	let cloneNode = Element.prototype.cloneNode;
	let importNode = Document.prototype.importNode;
	let addEventListener = Element.prototype.addEventListener;
	let removeEventListener = Element.prototype.removeEventListener;
	let windowAddEventListener = Window.prototype.addEventListener;
	let windowRemoveEventListener = Window.prototype.removeEventListener;
	let dispatchEvent = Element.prototype.dispatchEvent;
	let contains$1 = Node.prototype.contains || HTMLElement.prototype.contains;
	let getElementById = Document.prototype.getElementById;
	let elementQuerySelector = Element.prototype.querySelector;
	let fragmentQuerySelector = DocumentFragment.prototype.querySelector;
	let documentQuerySelector = Document.prototype.querySelector;
	let querySelector = /** @this {Element|Document|DocumentFragment} */ function(selector) {
	  switch (this.nodeType) {
	    case Node.ELEMENT_NODE:
	      return elementQuerySelector.call(/** @type {Element} */ (this), selector);
	    case Node.DOCUMENT_NODE:
	      return documentQuerySelector.call(/** @type {Document} */ (this), selector);
	    default:
	      return fragmentQuerySelector.call(this, selector);
	  }
	};
	let elementQuerySelectorAll = Element.prototype.querySelectorAll;
	let fragmentQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
	let documentQuerySelectorAll = Document.prototype.querySelectorAll;
	let querySelectorAll = /** @this {Element|Document|DocumentFragment} */ function(selector) {
	  switch (this.nodeType) {
	    case Node.ELEMENT_NODE:
	      return elementQuerySelectorAll.call(/** @type {Element} */ (this), selector);
	    case Node.DOCUMENT_NODE:
	      return documentQuerySelectorAll.call(/** @type {Document} */ (this), selector);
	    default:
	      return fragmentQuerySelectorAll.call(this, selector);
	  }
	};

	var nativeMethods = /*#__PURE__*/Object.freeze({
		appendChild: appendChild,
		insertBefore: insertBefore,
		replaceChild: replaceChild,
		removeChild: removeChild,
		setAttribute: setAttribute,
		removeAttribute: removeAttribute,
		cloneNode: cloneNode,
		importNode: importNode,
		addEventListener: addEventListener,
		removeEventListener: removeEventListener,
		windowAddEventListener: windowAddEventListener,
		windowRemoveEventListener: windowRemoveEventListener,
		dispatchEvent: dispatchEvent,
		contains: contains$1,
		getElementById: getElementById,
		elementQuerySelector: elementQuerySelector,
		fragmentQuerySelector: fragmentQuerySelector,
		documentQuerySelector: documentQuerySelector,
		querySelector: querySelector,
		elementQuerySelectorAll: elementQuerySelectorAll,
		fragmentQuerySelectorAll: fragmentQuerySelectorAll,
		documentQuerySelectorAll: documentQuerySelectorAll,
		querySelectorAll: querySelectorAll
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	// Cribbed from ShadowDOM polyfill
	// https://github.com/webcomponents/webcomponentsjs/blob/master/src/ShadowDOM/wrappers/HTMLElement.js#L28
	/////////////////////////////////////////////////////////////////////////////
	// innerHTML and outerHTML

	// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
	let escapeAttrRegExp = /[&\u00A0"]/g;
	let escapeDataRegExp = /[&\u00A0<>]/g;

	function escapeReplace(c) {
	  switch (c) {
	    case '&':
	      return '&amp;';
	    case '<':
	      return '&lt;';
	    case '>':
	      return '&gt;';
	    case '"':
	      return '&quot;';
	    case '\u00A0':
	      return '&nbsp;';
	  }
	}

	function escapeAttr(s) {
	  return s.replace(escapeAttrRegExp, escapeReplace);
	}

	function escapeData(s) {
	  return s.replace(escapeDataRegExp, escapeReplace);
	}

	function makeSet(arr) {
	  let set = {};
	  for (let i = 0; i < arr.length; i++) {
	    set[arr[i]] = true;
	  }
	  return set;
	}

	// http://www.whatwg.org/specs/web-apps/current-work/#void-elements
	let voidElements = makeSet([
	  'area',
	  'base',
	  'br',
	  'col',
	  'command',
	  'embed',
	  'hr',
	  'img',
	  'input',
	  'keygen',
	  'link',
	  'meta',
	  'param',
	  'source',
	  'track',
	  'wbr'
	]);

	let plaintextParents = makeSet([
	  'style',
	  'script',
	  'xmp',
	  'iframe',
	  'noembed',
	  'noframes',
	  'plaintext',
	  'noscript'
	]);

	/**
	 * @param {Node} node
	 * @param {Node} parentNode
	 * @param {Function=} callback
	 */
	function getOuterHTML(node, parentNode, callback) {
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE: {
	      let tagName = node.localName;
	      let s = '<' + tagName;
	      let attrs = node.attributes;
	      for (let i = 0, attr; (attr = attrs[i]); i++) {
	        s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
	      }
	      s += '>';
	      if (voidElements[tagName]) {
	        return s;
	      }
	      return s + getInnerHTML(node, callback) + '</' + tagName + '>';
	    }
	    case Node.TEXT_NODE: {
	      let data = /** @type {Text} */ (node).data;
	      if (parentNode && plaintextParents[parentNode.localName]) {
	        return data;
	      }
	      return escapeData(data);
	    }
	    case Node.COMMENT_NODE: {
	      return '<!--' + /** @type {Comment} */ (node).data + '-->';
	    }
	    default: {
	      window.console.error(node);
	      throw new Error('not implemented');
	    }
	  }
	}

	/**
	 * @param {Node} node
	 * @param {Function=} callback
	 */
	function getInnerHTML(node, callback) {
	  if (node.localName === 'template') {
	    node =  /** @type {HTMLTemplateElement} */ (node).content;
	  }
	  let s = '';
	  let c$ = callback ? callback(node) : node.childNodes;
	  for (let i=0, l=c$.length, child; (i<l) && (child=c$[i]); i++) {
	    s += getOuterHTML(child, node, callback);
	  }
	  return s;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	let nodeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL,
	  null, false);

	let elementWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT,
	  null, false);

	function parentNode(node) {
	  nodeWalker.currentNode = node;
	  return nodeWalker.parentNode();
	}

	function firstChild(node) {
	  nodeWalker.currentNode = node;
	  return nodeWalker.firstChild();
	}

	function lastChild(node) {
	  nodeWalker.currentNode = node;
	  return nodeWalker.lastChild();
	}

	function previousSibling(node) {
	  nodeWalker.currentNode = node;
	  return nodeWalker.previousSibling();
	}

	function nextSibling(node) {
	  nodeWalker.currentNode = node;
	  return nodeWalker.nextSibling();
	}

	function childNodes(node) {
	  let nodes = [];
	  nodeWalker.currentNode = node;
	  let n = nodeWalker.firstChild();
	  while (n) {
	    nodes.push(n);
	    n = nodeWalker.nextSibling();
	  }
	  return nodes;
	}

	function parentElement(node) {
	  elementWalker.currentNode = node;
	  return elementWalker.parentNode();
	}

	function firstElementChild(node) {
	  elementWalker.currentNode = node;
	  return elementWalker.firstChild();
	}

	function lastElementChild(node) {
	  elementWalker.currentNode = node;
	  return elementWalker.lastChild();
	}

	function previousElementSibling(node) {
	  elementWalker.currentNode = node;
	  return elementWalker.previousSibling();
	}

	function nextElementSibling(node) {
	  elementWalker.currentNode = node;
	  return elementWalker.nextSibling();
	}

	function children(node) {
	  let nodes = [];
	  elementWalker.currentNode = node;
	  let n = elementWalker.firstChild();
	  while (n) {
	    nodes.push(n);
	    n = elementWalker.nextSibling();
	  }
	  return createPolyfilledHTMLCollection(nodes);
	}

	function innerHTML(node) {
	  return getInnerHTML(node, (n) => childNodes(n));
	}

	function textContent(node) {
	  /* eslint-disable no-case-declarations */
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE:
	    case Node.DOCUMENT_FRAGMENT_NODE:
	      let textWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT,
	        null, false);
	      let content = '', n;
	      while ( (n = textWalker.nextNode()) ) {
	        // TODO(sorvell): can't use textContent since we patch it on Node.prototype!
	        // However, should probably patch it only on element.
	        content += n.nodeValue;
	      }
	      return content;
	    default:
	      return node.nodeValue;
	  }
	  /* eslint-enable */
	}

	var nativeTreeWalker = /*#__PURE__*/Object.freeze({
		parentNode: parentNode,
		firstChild: firstChild,
		lastChild: lastChild,
		previousSibling: previousSibling,
		nextSibling: nextSibling,
		childNodes: childNodes,
		parentElement: parentElement,
		firstElementChild: firstElementChild,
		lastElementChild: lastElementChild,
		previousElementSibling: previousElementSibling,
		nextElementSibling: nextElementSibling,
		children: children,
		innerHTML: innerHTML,
		textContent: textContent
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	const hasDescriptors = settings.hasDescriptors;

	// Find descriptor on the "lowest" native prototype. Safe as these are not
	// overridden and we call these on nodes.
	const nativeProtos = [Node.prototype, Element.prototype, HTMLElement.prototype];
	// note, avoid Array.find for IE11 compat.
	function findNativeProtoWithDescriptor(name) {
	  for (let i=0; i < nativeProtos.length; i++) {
	    const proto = nativeProtos[i];
	    if (proto.hasOwnProperty(name)) {
	      return proto;
	    }
	  }
	}
	function findNodeDescriptor(name) {
	  const proto = findNativeProtoWithDescriptor(name);
	  if (!proto) {
	    throw Error(`Could not find descriptor for ${name}`);
	  }
	  return Object.getOwnPropertyDescriptor(proto, name);
	}

	const nodeAccessors = hasDescriptors ? {
	  parentNode: findNodeDescriptor('parentNode'),
	  firstChild: findNodeDescriptor('firstChild'),
	  lastChild: findNodeDescriptor('lastChild'),
	  previousSibling: findNodeDescriptor('previousSibling'),
	  nextSibling: findNodeDescriptor('nextSibling'),
	  childNodes: findNodeDescriptor('childNodes'),
	  parentElement: findNodeDescriptor('parentElement'),
	  previousElementSibling: findNodeDescriptor('previousElementSibling'),
	  nextElementSibling: findNodeDescriptor('nextElementSibling'),
	  innerHTML: findNodeDescriptor('innerHTML'),
	  textContent: findNodeDescriptor('textContent'),
	  firstElementChild: findNodeDescriptor('firstElementChild'),
	  lastElementChild: findNodeDescriptor('lastElementChild'),
	  children: findNodeDescriptor('children'),
	} : {};

	const fragmentAccessors = hasDescriptors ? {
	  firstElementChild: Object.getOwnPropertyDescriptor(
	    DocumentFragment.prototype, 'firstElementChild'),
	  lastElementChild: Object.getOwnPropertyDescriptor(
	    DocumentFragment.prototype, 'lastElementChild'),
	  children: Object.getOwnPropertyDescriptor(
	    DocumentFragment.prototype, 'children')
	} : {};

	const documentAccessors = hasDescriptors ? {
	  firstElementChild: Object.getOwnPropertyDescriptor(
	    Document.prototype, 'firstElementChild'),
	  lastElementChild: Object.getOwnPropertyDescriptor(
	    Document.prototype, 'lastElementChild'),
	  children: Object.getOwnPropertyDescriptor(
	    Document.prototype, 'children')
	} : {};

	function parentNode$1(node) {
	  return nodeAccessors.parentNode.get.call(node);
	}

	function firstChild$1(node) {
	  return nodeAccessors.firstChild.get.call(node);
	}

	function lastChild$1(node) {
	  return nodeAccessors.lastChild.get.call(node);
	}

	function previousSibling$1(node) {
	  return nodeAccessors.previousSibling.get.call(node);
	}

	function nextSibling$1(node) {
	  return nodeAccessors.nextSibling.get.call(node);
	}

	function childNodes$1(node) {
	  return Array.prototype.slice.call(nodeAccessors.childNodes.get.call(node));
	}

	function parentElement$1(node) {
	  return nodeAccessors.parentElement.get.call(node);
	}

	function previousElementSibling$1(node) {
	  return nodeAccessors.previousElementSibling.get.call(node);
	}

	function nextElementSibling$1(node) {
	  return nodeAccessors.nextElementSibling.get.call(node);
	}

	function innerHTML$1(node) {
	  return nodeAccessors.innerHTML.get.call(node);
	}

	function textContent$1(node) {
	  return nodeAccessors.textContent.get.call(node);
	}

	function children$1(node) {
	  switch (node.nodeType) {
	    case Node.DOCUMENT_FRAGMENT_NODE:
	      return fragmentAccessors.children.get.call(node);
	    case Node.DOCUMENT_NODE:
	      return documentAccessors.children.get.call(node);
	    default:
	      return nodeAccessors.children.get.call(node);
	  }
	}

	function firstElementChild$1(node) {
	  switch (node.nodeType) {
	    case Node.DOCUMENT_FRAGMENT_NODE:
	      return fragmentAccessors.firstElementChild.get.call(node);
	    case Node.DOCUMENT_NODE:
	      return documentAccessors.firstElementChild.get.call(node);
	    default:
	      return nodeAccessors.firstElementChild.get.call(node);
	  }
	}

	function lastElementChild$1(node) {
	  switch (node.nodeType) {
	    case Node.DOCUMENT_FRAGMENT_NODE:
	      return fragmentAccessors.lastElementChild.get.call(node);
	    case Node.DOCUMENT_NODE:
	      return documentAccessors.lastElementChild.get.call(node);
	    default:
	      return nodeAccessors.lastElementChild.get.call(node);
	  }
	}

	var nativeTreeAccessors = /*#__PURE__*/Object.freeze({
		nodeAccessors: nodeAccessors,
		fragmentAccessors: fragmentAccessors,
		documentAccessors: documentAccessors,
		parentNode: parentNode$1,
		firstChild: firstChild$1,
		lastChild: lastChild$1,
		previousSibling: previousSibling$1,
		nextSibling: nextSibling$1,
		childNodes: childNodes$1,
		parentElement: parentElement$1,
		previousElementSibling: previousElementSibling$1,
		nextElementSibling: nextElementSibling$1,
		innerHTML: innerHTML$1,
		textContent: textContent$1,
		children: children$1,
		firstElementChild: firstElementChild$1,
		lastElementChild: lastElementChild$1
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	const accessors = settings.useNativeAccessors ?
	    nativeTreeAccessors : nativeTreeWalker;

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	function clearNode(node) {
	  while (node.firstChild) {
	    node.removeChild(node.firstChild);
	  }
	}

	const hasDescriptors$1 = settings.hasDescriptors;
	const inertDoc = document.implementation.createHTMLDocument('inert');

	const nativeIsConnectedAccessors =
	/** @type {ObjectPropertyDescriptor} */(
	  Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected')
	);

	const nativeIsConnected = nativeIsConnectedAccessors && nativeIsConnectedAccessors.get;

	const nativeActiveElementDescriptor =
	  /** @type {ObjectPropertyDescriptor} */(
	    Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement')
	  );
	function getDocumentActiveElement() {
	  if (nativeActiveElementDescriptor && nativeActiveElementDescriptor.get) {
	    return nativeActiveElementDescriptor.get.call(document);
	  } else if (!settings.hasDescriptors) {
	    return document.activeElement;
	  }
	}

	function activeElementForNode(node) {
	  let active = getDocumentActiveElement();
	  // In IE11, activeElement might be an empty object if the document is
	  // contained in an iframe.
	  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10998788/
	  if (!active || !active.nodeType) {
	    return null;
	  }
	  let isShadyRoot$$1 = !!(isShadyRoot(node));
	  if (node !== document) {
	    // If this node isn't a document or shady root, then it doesn't have
	    // an active element.
	    if (!isShadyRoot$$1) {
	      return null;
	    }
	    // If this shady root's host is the active element or the active
	    // element is not a descendant of the host (in the composed tree),
	    // then it doesn't have an active element.
	    if (node.host === active ||
	        !contains$1.call(node.host, active)) {
	      return null;
	    }
	  }
	  // This node is either the document or a shady root of which the active
	  // element is a (composed) descendant of its host; iterate upwards to
	  // find the active element's most shallow host within it.
	  let activeRoot = ownerShadyRootForNode(active);
	  while (activeRoot && activeRoot !== node) {
	    active = activeRoot.host;
	    activeRoot = ownerShadyRootForNode(active);
	  }
	  if (node === document) {
	    // This node is the document, so activeRoot should be null.
	    return activeRoot ? null : active;
	  } else {
	    // This node is a non-document shady root, and it should be
	    // activeRoot.
	    return activeRoot === node ? active : null;
	  }
	}

	let OutsideAccessors = {

	  parentElement: {
	    /** @this {Node} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      let l = nodeData && nodeData.parentNode;
	      if (l && l.nodeType !== Node.ELEMENT_NODE) {
	        l = null;
	      }
	      return l !== undefined ? l : accessors.parentElement(this);
	    },
	    configurable: true
	  },

	  parentNode: {
	    /** @this {Node} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      const l = nodeData && nodeData.parentNode;
	      return l !== undefined ? l : accessors.parentNode(this);
	    },
	    configurable: true
	  },

	  nextSibling: {
	    /** @this {Node} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      const l = nodeData && nodeData.nextSibling;
	      return l !== undefined ? l : accessors.nextSibling(this);
	    },
	    configurable: true
	  },

	  previousSibling: {
	    /** @this {Node} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      const l = nodeData && nodeData.previousSibling;
	      return l !== undefined ? l : accessors.previousSibling(this);
	    },
	    configurable: true
	  },

	  // fragment, element, document
	  nextElementSibling: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      if (nodeData && nodeData.nextSibling !== undefined) {
	        let n = this.nextSibling;
	        while (n && n.nodeType !== Node.ELEMENT_NODE) {
	          n = n.nextSibling;
	        }
	        return n;
	      } else {
	        return accessors.nextElementSibling(this);
	      }
	    },
	    configurable: true
	  },

	  previousElementSibling: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      if (nodeData && nodeData.previousSibling !== undefined) {
	        let n = this.previousSibling;
	        while (n && n.nodeType !== Node.ELEMENT_NODE) {
	          n = n.previousSibling;
	        }
	        return n;
	      } else {
	        return accessors.previousElementSibling(this);
	      }
	    },
	    configurable: true
	  }

	};

	const ClassNameAccessor = {
	  className: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      return this.getAttribute('class') || '';
	    },
	    /**
	     * @this {HTMLElement}
	     */
	    set(value) {
	      this.setAttribute('class', value);
	    },
	    configurable: true
	  }
	};

	const IsConnectedAccessor = {

	  isConnected: {
	    /**
	     * @this {Node}
	     */
	    get() {
	      if (nativeIsConnected && nativeIsConnected.call(this)) {
	        return true;
	      }
	      if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
	        return false;
	      }
	      // Fast path for distributed nodes.
	      const ownerDocument = this.ownerDocument;
	      if (hasDocumentContains) {
	        if (contains$1.call(ownerDocument, this)) {
	          return true;
	        }
	      } else if (ownerDocument.documentElement &&
	        contains$1.call(ownerDocument.documentElement, this)) {
	        return true;
	      }
	      // Slow path for non-distributed nodes.
	      let node = this;
	      while (node && !(node instanceof Document)) {
	        node = node.parentNode || (isShadyRoot(node) ? /** @type {ShadowRoot} */(node).host : undefined);
	      }
	      return !!(node && node instanceof Document);
	    },
	    configurable: true
	  }
	};

	let InsideAccessors = {

	  childNodes: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      let childNodes;
	      if (isTrackingLogicalChildNodes(this)) {
	        const nodeData = shadyDataForNode(this);
	        if (!nodeData.childNodes) {
	          nodeData.childNodes = [];
	          for (let n=this.firstChild; n; n=n.nextSibling) {
	            nodeData.childNodes.push(n);
	          }
	        }
	        childNodes = nodeData.childNodes;
	      } else {
	        childNodes = accessors.childNodes(this);
	      }
	      childNodes.item = function(index) {
	        return childNodes[index];
	      };
	      return childNodes;
	    },
	    configurable: true
	  },

	  childElementCount: {
	    /** @this {HTMLElement} */
	    get() {
	      return this.children.length;
	    },
	    configurable: true
	  },

	  firstChild: {
	    /** @this {HTMLElement} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      const l = nodeData && nodeData.firstChild;
	      return l !== undefined ? l : accessors.firstChild(this);
	    },
	    configurable: true
	  },

	  lastChild: {
	  /** @this {HTMLElement} */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      const l = nodeData && nodeData.lastChild;
	      return l !== undefined ? l : accessors.lastChild(this);
	    },
	    configurable: true
	  },

	  textContent: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      if (isTrackingLogicalChildNodes(this)) {
	        let tc = [];
	        for (let i = 0, cn = this.childNodes, c; (c = cn[i]); i++) {
	          if (c.nodeType !== Node.COMMENT_NODE) {
	            tc.push(c.textContent);
	          }
	        }
	        return tc.join('');
	      } else {
	        return accessors.textContent(this);
	      }
	    },
	    /**
	     * @this {HTMLElement}
	     * @param {string} text
	     */
	    set(text) {
	      if (typeof text === 'undefined' || text === null) {
	        text = '';
	      }
	      switch (this.nodeType) {
	        case Node.ELEMENT_NODE:
	        case Node.DOCUMENT_FRAGMENT_NODE:
	          if (!isTrackingLogicalChildNodes(this) && hasDescriptors$1) {
	            // may be removing a nested slot but fast path if we know we are not.
	            const firstChild = this.firstChild;
	            if (firstChild != this.lastChild ||
	              (firstChild && firstChild.nodeType != Node.TEXT_NODE)) {
	              clearNode(this);
	            }
	            nodeAccessors.textContent.set.call(this, text);
	          } else {
	            clearNode(this);
	            // Document fragments must have no childnodes if setting a blank string
	            if (text.length > 0 || this.nodeType === Node.ELEMENT_NODE) {
	              this.appendChild(document.createTextNode(text));
	            }
	          }
	          break;
	        default:
	          // TODO(sorvell): can't do this if patch nodeValue.
	          this.nodeValue = text;
	          break;
	      }
	    },
	    configurable: true
	  },

	  // fragment, element, document
	  firstElementChild: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      if (nodeData && nodeData.firstChild !== undefined) {
	        let n = this.firstChild;
	        while (n && n.nodeType !== Node.ELEMENT_NODE) {
	          n = n.nextSibling;
	        }
	        return n;
	      } else {
	        return accessors.firstElementChild(this);
	      }
	    },
	    configurable: true
	  },

	  lastElementChild: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      if (nodeData && nodeData.lastChild !== undefined) {
	        let n = this.lastChild;
	        while (n && n.nodeType !== Node.ELEMENT_NODE) {
	          n = n.previousSibling;
	        }
	        return n;
	      } else {
	        return accessors.lastElementChild(this);
	      }
	    },
	    configurable: true
	  },

	  children: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      if (!isTrackingLogicalChildNodes(this)) {
	        return accessors.children(this);
	      }
	      return createPolyfilledHTMLCollection(Array.prototype.filter.call(this.childNodes, function(n) {
	        return (n.nodeType === Node.ELEMENT_NODE);
	      }));
	    },
	    configurable: true
	  },

	  // element (HTMLElement on IE11)
	  innerHTML: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      if (isTrackingLogicalChildNodes(this)) {
	        const content = this.localName === 'template' ?
	        /** @type {HTMLTemplateElement} */(this).content : this;
	        return getInnerHTML(content);
	      } else {
	        return accessors.innerHTML(this);
	      }
	    },
	    /**
	     * @this {HTMLElement}
	     */
	    set(text) {
	      const content = this.localName === 'template' ?
	        /** @type {HTMLTemplateElement} */(this).content : this;
	      clearNode(content);
	      const containerName = this.localName || 'div';
	      let htmlContainer;
	      if (!this.namespaceURI || this.namespaceURI === inertDoc.namespaceURI) {
	        htmlContainer = inertDoc.createElement(containerName);
	      } else {
	        htmlContainer = inertDoc.createElementNS(this.namespaceURI, containerName);
	      }
	      if (hasDescriptors$1) {
	        nodeAccessors.innerHTML.set.call(htmlContainer, text);
	      } else {
	        htmlContainer.innerHTML = text;
	      }
	      const newContent = this.localName === 'template' ?
	        /** @type {HTMLTemplateElement} */(htmlContainer).content : htmlContainer;
	      while (newContent.firstChild) {
	        content.appendChild(newContent.firstChild);
	      }
	    },
	    configurable: true
	  }

	};

	// Note: Can be patched on element prototype on all browsers.
	// Must be patched on instance on browsers that support native Shadow DOM
	// but do not have builtin accessors (old Chrome).
	let ShadowRootAccessor = {

	  shadowRoot: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      const nodeData = shadyDataForNode(this);
	      return nodeData && nodeData.publicRoot || null;
	    },
	    configurable: true
	  }
	};

	// Note: Can be patched on document prototype on browsers with builtin accessors.
	// Must be patched separately on simulated ShadowRoot.
	// Must be patched as `_activeElement` on browsers without builtin accessors.
	let ActiveElementAccessor = {

	  activeElement: {
	    /**
	     * @this {HTMLElement}
	     */
	    get() {
	      return activeElementForNode(this);
	    },
	    /**
	     * @this {HTMLElement}
	     */
	    set() {},
	    configurable: true
	  }

	};

	// patch a group of descriptors on an object only if it exists or if the `force`
	// argument is true.
	/**
	 * @param {!Object} obj
	 * @param {!Object} descriptors
	 * @param {boolean=} force
	 */
	function patchAccessorGroup(obj, descriptors, force) {
	  for (let p in descriptors) {
	    let objDesc = Object.getOwnPropertyDescriptor(obj, p);
	    if ((objDesc && objDesc.configurable) ||
	      (!objDesc && force)) {
	      Object.defineProperty(obj, p, descriptors[p]);
	    } else if (force) {
	      console.warn('Could not define', p, 'on', obj); // eslint-disable-line no-console
	    }
	  }
	}

	// patch dom accessors on proto where they exist
	function patchAccessors(proto) {
	  patchAccessorGroup(proto, OutsideAccessors);
	  patchAccessorGroup(proto, ClassNameAccessor);
	  patchAccessorGroup(proto, InsideAccessors);
	  patchAccessorGroup(proto, ActiveElementAccessor);
	}

	function patchShadowRootAccessors(proto) {
	  proto.__proto__ = DocumentFragment.prototype;
	  // ensure element descriptors (IE/Edge don't have em)
	  patchAccessorGroup(proto, OutsideAccessors, true);
	  patchAccessorGroup(proto, InsideAccessors, true);
	  patchAccessorGroup(proto, ActiveElementAccessor, true);
	  // Ensure native properties are all safely wrapped since ShadowRoot is not an
	  // actual DocumentFragment instance.
	  Object.defineProperties(proto, {
	    nodeType: {
	      value: Node.DOCUMENT_FRAGMENT_NODE,
	      configurable: true
	    },
	    nodeName: {
	      value: '#document-fragment',
	      configurable: true
	    },
	    nodeValue: {
	      value: null,
	      configurable: true
	    }
	  });
	  // make undefined
	  [
	    'localName',
	    'namespaceURI',
	    'prefix'
	  ].forEach((prop) => {
	    Object.defineProperty(proto, prop, {
	      value: undefined,
	      configurable: true
	    });
	  });
	  // defer properties to host
	  [
	    'ownerDocument',
	    'baseURI',
	    'isConnected'
	  ].forEach((prop) => {
	    Object.defineProperty(proto, prop, {
	      get() {
	        return this.host[prop];
	      },
	      configurable: true
	    });
	  });
	}

	// ensure an element has patched "outside" accessors; no-op when not needed
	let patchOutsideElementAccessors = settings.hasDescriptors ?
	  function() {} : function(element) {
	    const sd = ensureShadyDataForNode(element);
	    if (!sd.__outsideAccessors) {
	      sd.__outsideAccessors = true;
	      patchAccessorGroup(element, OutsideAccessors, true);
	      patchAccessorGroup(element, ClassNameAccessor, true);
	    }
	  };

	// ensure an element has patched "inside" accessors; no-op when not needed
	let patchInsideElementAccessors = settings.hasDescriptors ?
	  function() {} : function(element) {
	    const sd = ensureShadyDataForNode(element);
	    if (!sd.__insideAccessors) {
	      patchAccessorGroup(element, InsideAccessors, true);
	      patchAccessorGroup(element, ShadowRootAccessor, true);
	    }
	  };

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	const {childNodes: childNodes$2} = accessors;

	function recordInsertBefore(node, container, ref_node) {
	  patchInsideElementAccessors(container);
	  const containerData = ensureShadyDataForNode(container);
	  if (containerData.firstChild !== undefined) {
	    containerData.childNodes = null;
	  }
	  // handle document fragments
	  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	    let c$ = node.childNodes;
	    for (let i=0; i < c$.length; i++) {
	      linkNode(c$[i], container, ref_node);
	    }
	    // cleanup logical dom in doc fragment.
	    const nodeData = ensureShadyDataForNode(node);
	    let resetTo = (nodeData.firstChild !== undefined) ? null : undefined;
	    nodeData.firstChild = nodeData.lastChild = resetTo;
	    nodeData.childNodes = resetTo;
	  } else {
	    linkNode(node, container, ref_node);
	  }
	}

	function linkNode(node, container, ref_node) {
	  patchOutsideElementAccessors(node);
	  ref_node = ref_node || null;
	  const nodeData = ensureShadyDataForNode(node);
	  const containerData = ensureShadyDataForNode(container);
	  const ref_nodeData = ref_node ? ensureShadyDataForNode(ref_node) : null;
	  // update ref_node.previousSibling <-> node
	  nodeData.previousSibling = ref_node ? ref_nodeData.previousSibling :
	    container.lastChild;
	  let psd = shadyDataForNode(nodeData.previousSibling);
	  if (psd) {
	    psd.nextSibling = node;
	  }
	  // update node <-> ref_node
	  let nsd = shadyDataForNode(nodeData.nextSibling = ref_node);
	  if (nsd) {
	    nsd.previousSibling = node;
	  }
	  // update node <-> container
	  nodeData.parentNode = container;
	  if (ref_node) {
	    if (ref_node === containerData.firstChild) {
	      containerData.firstChild = node;
	    }
	  } else {
	    containerData.lastChild = node;
	    if (!containerData.firstChild) {
	      containerData.firstChild = node;
	    }
	  }
	  // remove caching of childNodes
	  containerData.childNodes = null;
	}

	function recordRemoveChild(node, container) {
	  const nodeData = ensureShadyDataForNode(node);
	  const containerData = ensureShadyDataForNode(container);
	  if (node === containerData.firstChild) {
	    containerData.firstChild = nodeData.nextSibling;
	  }
	  if (node === containerData.lastChild) {
	    containerData.lastChild = nodeData.previousSibling;
	  }
	  let p = nodeData.previousSibling;
	  let n = nodeData.nextSibling;
	  if (p) {
	    ensureShadyDataForNode(p).nextSibling = n;
	  }
	  if (n) {
	    ensureShadyDataForNode(n).previousSibling = p;
	  }
	  // When an element is removed, logical data is no longer tracked.
	  // Explicitly set `undefined` here to indicate this. This is disginguished
	  // from `null` which is set if info is null.
	  nodeData.parentNode = nodeData.previousSibling =
	  nodeData.nextSibling = undefined;
	  if (containerData.childNodes !== undefined) {
	    // remove caching of childNodes
	    containerData.childNodes = null;
	  }
	}

	/**
	 * @param  {!Node} node
	 * @param  {Array<Node>=} nodes
	 */
	function recordChildNodes(node, nodes) {
	  const nodeData = ensureShadyDataForNode(node);
	  if (nodeData.firstChild === undefined) {
	    // remove caching of childNodes
	    nodeData.childNodes = null;
	    const c$ = nodes || childNodes$2(node);
	    nodeData.firstChild = c$[0] || null;
	    nodeData.lastChild = c$[c$.length-1] || null;
	    patchInsideElementAccessors(node);
	    for (let i=0; i<c$.length; i++) {
	      const n = c$[i];
	      const sd = ensureShadyDataForNode(n);
	      sd.parentNode = node;
	      sd.nextSibling = c$[i+1] || null;
	      sd.previousSibling = c$[i-1] || null;
	      patchOutsideElementAccessors(n);
	    }
	  }
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	const {parentNode: parentNode$2} = accessors;

	// Patched `insertBefore`. Note that all mutations that add nodes are routed
	// here. When a <slot> is added or a node is added to a host with a shadowRoot
	// with a slot, a standard dom `insert` call is aborted and `_asyncRender`
	// is called on the relevant shadowRoot. In all other cases, a standard dom
	// `insert` can be made, but the location and ref_node may need to be changed.
	/**
	 * @param {Node} parent
	 * @param {Node} node
	 * @param {Node=} ref_node
	 */
	function insertBefore$1(parent, node, ref_node) {
	  if (node === parent) {
	    throw Error(`Failed to execute 'appendChild' on 'Node': The new child element contains the parent.`);
	  }
	  if (ref_node) {
	    const refData = shadyDataForNode(ref_node);
	    const p = refData && refData.parentNode;
	    if ((p !== undefined && p !== parent) ||
	      (p === undefined && parentNode$2(ref_node) !== parent)) {
	      throw Error(`Failed to execute 'insertBefore' on 'Node': The node ` +
	       `before which the new node is to be inserted is not a child of this node.`);
	    }
	  }
	  if (ref_node === node) {
	    return node;
	  }
	  // remove from existing location
	  if (node.parentNode) {
	    // NOTE: avoid node.removeChild as this *can* trigger another patched
	    // method (e.g. custom elements) and we want only the shady method to run.
	    removeChild$1(node.parentNode, node);
	  }
	  // add to new parent
	  let preventNativeInsert;
	  let ownerRoot;
	  let slotsAdded;
	  if (!node['__noInsertionPoint']) {
	    ownerRoot = ownerShadyRootForNode(parent);
	    slotsAdded = ownerRoot && findContainedSlots(node);
	    if (slotsAdded) {
	      ownerRoot._addSlots(slotsAdded);
	    }
	  }
	  // if a slot is added, must render containing root.
	  if (parent.localName === 'slot' || slotsAdded) {
	    ownerRoot = ownerRoot || ownerShadyRootForNode(parent);
	    if (ownerRoot) {
	      ownerRoot._asyncRender();
	    }
	  }
	  if (isTrackingLogicalChildNodes(parent)) {
	    recordInsertBefore(node, parent, ref_node);
	    // when inserting into a host with a shadowRoot with slot, use
	    // `shadowRoot._asyncRender()` via `attach-shadow` module
	    const parentData = shadyDataForNode(parent);
	    if (hasShadowRootWithSlot(parent)) {
	      parentData.root._asyncRender();
	      preventNativeInsert = true;
	    // when inserting into a host with shadowRoot with NO slot, do nothing
	    // as the node should not be added to composed dome anywhere.
	    } else if (parentData.root) {
	      preventNativeInsert = true;
	    }
	  }
	  if (!preventNativeInsert) {
	    // if adding to a shadyRoot, add to host instead
	    let container = isShadyRoot(parent) ?
	      /** @type {ShadowRoot} */(parent).host : parent;
	    // if ref_node, get the ref_node that's actually in composed dom.
	    if (ref_node) {
	      ref_node = firstComposedNode(ref_node);
	      insertBefore.call(container, node, ref_node);
	    } else {
	      appendChild.call(container, node);
	    }
	  }
	  scheduleObserver(parent, node);
	  return node;
	}

	function findContainedSlots(node) {
	  let slots;
	  if (node.localName === 'slot') {
	    slots = [node];
	  } else if (node.querySelectorAll) {
	    slots = node.querySelectorAll('slot');
	  }
	  if (slots && slots.length) {
	    return slots;
	  }
	}

	/**
	 * Patched `removeChild`. Note that all dom "removals" are routed here.
	 * Removes the given `node` from the element's `children`.
	 * This method also performs dom composition.
	 * @param {Node} parent
	 * @param {Node} node
	*/
	function removeChild$1(parent, node) {
	  if (node.parentNode !== parent) {
	    throw Error('The node to be removed is not a child of this node: ' +
	      node);
	  }
	  let preventNativeRemove;
	  let ownerRoot = ownerShadyRootForNode(node);
	  let removingInsertionPoint;
	  const parentData = shadyDataForNode(parent);
	  if (isTrackingLogicalChildNodes(parent)) {
	    recordRemoveChild(node, parent);
	    if (hasShadowRootWithSlot(parent)) {
	      parentData.root._asyncRender();
	      preventNativeRemove = true;
	    }
	  }
	  removeOwnerShadyRoot(node);
	  // if removing slot, must render containing root
	  if (ownerRoot) {
	    let changeSlotContent = parent && parent.localName === 'slot';
	    if (changeSlotContent) {
	      preventNativeRemove = true;
	    }
	    removingInsertionPoint = ownerRoot._removeContainedSlots(node);
	    if (removingInsertionPoint || changeSlotContent) {
	      ownerRoot._asyncRender();
	    }
	  }
	  if (!preventNativeRemove) {
	    // if removing from a shadyRoot, remove form host instead
	    let container = isShadyRoot(parent) ?
	      /** @type {ShadowRoot} */(parent).host :
	      parent;
	    // not guaranteed to physically be in container; e.g.
	    // (1) if parent has a shadyRoot, element may or may not at distributed
	    // location (could be undistributed)
	    // (2) if parent is a slot, element may not ben in composed dom
	    if (!(parentData.root || node.localName === 'slot') ||
	      (container === parentNode$2(node))) {
	      removeChild.call(container, node);
	    }
	  }
	  scheduleObserver(parent, null, node);
	  return node;
	}

	function removeOwnerShadyRoot(node) {
	  // optimization: only reset the tree if node is actually in a root
	  if (hasCachedOwnerRoot(node)) {
	    let c$ = node.childNodes;
	    for (let i=0, l=c$.length, n; (i<l) && (n=c$[i]); i++) {
	      removeOwnerShadyRoot(n);
	    }
	  }
	  const nodeData = shadyDataForNode(node);
	  if (nodeData) {
	    nodeData.ownerShadyRoot = undefined;
	  }
	}

	function hasCachedOwnerRoot(node) {
	  const nodeData = shadyDataForNode(node);
	  return Boolean(nodeData && nodeData.ownerShadyRoot !== undefined);
	}

	/**
	 * Finds the first flattened node that is composed in the node's parent.
	 * If the given node is a slot, then the first flattened node is returned
	 * if it exists, otherwise advance to the node's nextSibling.
	 * @param {Node} node within which to find first composed node
	 * @returns {Node} first composed node
	 */
	function firstComposedNode(node) {
	  let composed = node;
	  if (node && node.localName === 'slot') {
	    const nodeData = shadyDataForNode(node);
	    const flattened = nodeData && nodeData.flattenedNodes;
	    composed = flattened && flattened.length ? flattened[0] :
	      firstComposedNode(node.nextSibling);
	  }
	  return composed;
	}

	function hasShadowRootWithSlot(node) {
	  const nodeData = shadyDataForNode(node);
	  let root = nodeData && nodeData.root;
	  return (root && root._hasInsertionPoint());
	}

	/**
	 * Should be called whenever an attribute changes. If the `slot` attribute
	 * changes, provokes rendering if necessary. If a `<slot>` element's `name`
	 * attribute changes, updates the root's slot map and renders.
	 * @param {Node} node
	 * @param {string} name
	 */
	function distributeAttributeChange(node, name) {
	  if (name === 'slot') {
	    const parent = node.parentNode;
	    if (hasShadowRootWithSlot(parent)) {
	      shadyDataForNode(parent).root._asyncRender();
	    }
	  } else if (node.localName === 'slot' && name === 'name') {
	    let root = ownerShadyRootForNode(node);
	    if (root) {
	      root._updateSlotName(node);
	      root._asyncRender();
	    }
	  }
	}

	/**
	 * @param {Node} node
	 * @param {Node=} addedNode
	 * @param {Node=} removedNode
	 */
	function scheduleObserver(node, addedNode, removedNode) {
	  const nodeData = shadyDataForNode(node);
	  const observer = nodeData && nodeData.observer;
	  if (observer) {
	    if (addedNode) {
	      observer.addedNodes.push(addedNode);
	    }
	    if (removedNode) {
	      observer.removedNodes.push(removedNode);
	    }
	    observer.schedule();
	  }
	}

	/**
	 * @param {Node} node
	 * @param {Object=} options
	 */
	function getRootNode(node, options) { // eslint-disable-line no-unused-vars
	  if (!node || !node.nodeType) {
	    return;
	  }
	  const nodeData = ensureShadyDataForNode(node);
	  let root = nodeData.ownerShadyRoot;
	  if (root === undefined) {
	    if (isShadyRoot(node)) {
	      root = node;
	      nodeData.ownerShadyRoot = root;
	    } else {
	      let parent = node.parentNode;
	      root = parent ? getRootNode(parent) : node;
	      // memo-ize result for performance but only memo-ize
	      // result if node is in the document. This avoids a problem where a root
	      // can be cached while an element is inside a fragment.
	      // If this happens and we cache the result, the value can become stale
	      // because for perf we avoid processing the subtree of added fragments.
	      if (contains$1.call(document.documentElement, node)) {
	        nodeData.ownerShadyRoot = root;
	      }
	    }

	  }
	  return root;
	}

	// NOTE: `query` is used primarily for ShadyDOM's querySelector impl,
	// but it's also generally useful to recurse through the element tree
	// and is used by Polymer's styling system.
	/**
	 * @param {Node} node
	 * @param {Function} matcher
	 * @param {Function=} halter
	 */
	function query(node, matcher, halter) {
	  let list = [];
	  queryElements(node.childNodes, matcher,
	    halter, list);
	  return list;
	}

	function queryElements(elements, matcher, halter, list) {
	  for (let i=0, l=elements.length, c; (i<l) && (c=elements[i]); i++) {
	    if (c.nodeType === Node.ELEMENT_NODE &&
	        queryElement(c, matcher, halter, list)) {
	      return true;
	    }
	  }
	}

	function queryElement(node, matcher, halter, list) {
	  let result = matcher(node);
	  if (result) {
	    list.push(node);
	  }
	  if (halter && halter(result)) {
	    return result;
	  }
	  queryElements(node.childNodes, matcher,
	    halter, list);
	}

	function renderRootNode(element) {
	  var root = element.getRootNode();
	  if (isShadyRoot(root)) {
	    root._render();
	  }
	}

	let scopingShim = null;

	function setAttribute$1(node, attr, value) {
	  if (!scopingShim) {
	    scopingShim = window['ShadyCSS'] && window['ShadyCSS']['ScopingShim'];
	  }
	  if (scopingShim && attr === 'class') {
	    scopingShim['setElementClass'](node, value);
	  } else {
	    setAttribute.call(node, attr, value);
	    distributeAttributeChange(node, attr);
	  }
	}

	function removeAttribute$1(node, attr) {
	  removeAttribute.call(node, attr);
	  distributeAttributeChange(node, attr);
	}

	function cloneNode$1(node, deep) {
	  if (node.localName == 'template') {
	    return cloneNode.call(node, deep);
	  } else {
	    let n = cloneNode.call(node, false);
	    // Attribute nodes historically had childNodes, but they have later
	    // been removed from the spec.
	    // Make sure we do not do a deep clone on them for old browsers (IE11)
	    if (deep && n.nodeType !== Node.ATTRIBUTE_NODE) {
	      let c$ = node.childNodes;
	      for (let i=0, nc; i < c$.length; i++) {
	        nc = c$[i].cloneNode(true);
	        n.appendChild(nc);
	      }
	    }
	    return n;
	  }
	}

	// note: Though not technically correct, we fast path `importNode`
	// when called on a node not owned by the main document.
	// This allows, for example, elements that cannot
	// contain custom elements and are therefore not likely to contain shadowRoots
	// to cloned natively. This is a fairly significant performance win.
	function importNode$1(node, deep) {
	  // A template element normally has no children with shadowRoots, so make
	  // sure we always make a deep copy to correctly construct the template.content
	  if (node.ownerDocument !== document || node.localName === 'template') {
	    return importNode.call(document, node, deep);
	  }
	  let n = importNode.call(document, node, false);
	  if (deep) {
	    let c$ = node.childNodes;
	    for (let i=0, nc; i < c$.length; i++) {
	      nc = importNode$1(c$[i], true);
	      n.appendChild(nc);
	    }
	  }
	  return n;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	/*
	Make this name unique so it is unlikely to conflict with properties on objects passed to `addEventListener`
	https://github.com/webcomponents/shadydom/issues/173
	*/
	const /** string */ eventWrappersName = `__eventWrappers${Date.now()}`;

	/** @type {?function(!Event): boolean} */
	const composedGetter = (() => {
	  const composedProp = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');
	  return composedProp ? (ev) => composedProp.get.call(ev) : null;
	})();

	// https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937
	const alwaysComposed = {
	  'blur': true,
	  'focus': true,
	  'focusin': true,
	  'focusout': true,
	  'click': true,
	  'dblclick': true,
	  'mousedown': true,
	  'mouseenter': true,
	  'mouseleave': true,
	  'mousemove': true,
	  'mouseout': true,
	  'mouseover': true,
	  'mouseup': true,
	  'wheel': true,
	  'beforeinput': true,
	  'input': true,
	  'keydown': true,
	  'keyup': true,
	  'compositionstart': true,
	  'compositionupdate': true,
	  'compositionend': true,
	  'touchstart': true,
	  'touchend': true,
	  'touchmove': true,
	  'touchcancel': true,
	  'pointerover': true,
	  'pointerenter': true,
	  'pointerdown': true,
	  'pointermove': true,
	  'pointerup': true,
	  'pointercancel': true,
	  'pointerout': true,
	  'pointerleave': true,
	  'gotpointercapture': true,
	  'lostpointercapture': true,
	  'dragstart': true,
	  'drag': true,
	  'dragenter': true,
	  'dragleave': true,
	  'dragover': true,
	  'drop': true,
	  'dragend': true,
	  'DOMActivate': true,
	  'DOMFocusIn': true,
	  'DOMFocusOut': true,
	  'keypress': true
	};

	const unpatchedEvents = {
	  'DOMAttrModified': true,
	  'DOMAttributeNameChanged': true,
	  'DOMCharacterDataModified': true,
	  'DOMElementNameChanged': true,
	  'DOMNodeInserted': true,
	  'DOMNodeInsertedIntoDocument': true,
	  'DOMNodeRemoved': true,
	  'DOMNodeRemovedFromDocument': true,
	  'DOMSubtreeModified': true
	};

	function pathComposer(startNode, composed) {
	  let composedPath = [];
	  let current = startNode;
	  let startRoot = startNode === window ? window : startNode.getRootNode();
	  while (current) {
	    composedPath.push(current);
	    if (current.assignedSlot) {
	      current = current.assignedSlot;
	    } else if (current.nodeType === Node.DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
	      current = current.host;
	    } else {
	      current = current.parentNode;
	    }
	  }
	  // event composedPath includes window when startNode's ownerRoot is document
	  if (composedPath[composedPath.length - 1] === document) {
	    composedPath.push(window);
	  }
	  return composedPath;
	}

	function retarget(refNode, path) {
	  if (!isShadyRoot) {
	    return refNode;
	  }
	  // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
	  // shadow-including inclusive ancestor, return ANCESTOR.
	  let refNodePath = pathComposer(refNode, true);
	  let p$ = path;
	  for (let i=0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
	    ancestor = p$[i];
	    root = ancestor === window ? window : ancestor.getRootNode();
	    if (root !== lastRoot) {
	      rootIdx = refNodePath.indexOf(root);
	      lastRoot = root;
	    }
	    if (!isShadyRoot(root) || rootIdx > -1) {
	      return ancestor;
	    }
	  }
	}

	let eventMixin = {

	  /**
	   * @this {Event}
	   */
	  get composed() {
	    if (this.__composed === undefined) {
	      // if there's an original `composed` getter on the Event prototype, use that
	      if (composedGetter) {
	        this.__composed = composedGetter(this);
	      // If the event is trusted, or `isTrusted` is not supported, check the list of always composed events
	      } else if (this.isTrusted !== false) {
	        this.__composed = alwaysComposed[this.type];
	      }
	    }
	    return this.__composed || false;
	  },

	  /**
	   * @this {Event}
	   */
	  composedPath() {
	    if (!this.__composedPath) {
	      this.__composedPath = pathComposer(this['__target'], this.composed);
	    }
	    return this.__composedPath;
	  },

	  /**
	   * @this {Event}
	   */
	  get target() {
	    return retarget(this.currentTarget, this.composedPath());
	  },

	  // http://w3c.github.io/webcomponents/spec/shadow/#event-relatedtarget-retargeting
	  /**
	   * @this {Event}
	   */
	  get relatedTarget() {
	    if (!this.__relatedTarget) {
	      return null;
	    }
	    if (!this.__relatedTargetComposedPath) {
	      this.__relatedTargetComposedPath = pathComposer(this.__relatedTarget, true);
	    }
	    // find the deepest node in relatedTarget composed path that is in the same root with the currentTarget
	    return retarget(this.currentTarget, this.__relatedTargetComposedPath);
	  },
	  /**
	   * @this {Event}
	   */
	  stopPropagation() {
	    Event.prototype.stopPropagation.call(this);
	    this.__propagationStopped = true;
	  },
	  /**
	   * @this {Event}
	   */
	  stopImmediatePropagation() {
	    Event.prototype.stopImmediatePropagation.call(this);
	    this.__immediatePropagationStopped = true;
	    this.__propagationStopped = true;
	  }

	};

	function mixinComposedFlag(Base) {
	  // NOTE: avoiding use of `class` here so that transpiled output does not
	  // try to do `Base.call` with a dom construtor.
	  let klazz = function(type, options) {
	    let event = new Base(type, options);
	    event.__composed = options && Boolean(options['composed']);
	    return event;
	  };
	  // put constructor properties on subclass
	  mixin(klazz, Base);
	  klazz.prototype = Base.prototype;
	  return klazz;
	}

	let nonBubblingEventsToRetarget = {
	  'focus': true,
	  'blur': true
	};


	/**
	 * Check if the event has been retargeted by comparing original `target`, and calculated `target`
	 * @param {Event} event
	 * @return {boolean} True if the original target and calculated target are the same
	 */
	function hasRetargeted(event) {
	  return event['__target'] !== event.target || event.__relatedTarget !== event.relatedTarget;
	}

	/**
	 *
	 * @param {Event} event
	 * @param {Node} node
	 * @param {string} phase
	 */
	function fireHandlers(event, node, phase) {
	  let hs = node.__handlers && node.__handlers[event.type] &&
	    node.__handlers[event.type][phase];
	  if (hs) {
	    for (let i = 0, fn; (fn = hs[i]); i++) {
	      if (hasRetargeted(event) && event.target === event.relatedTarget) {
	        return;
	      }
	      fn.call(node, event);
	      if (event.__immediatePropagationStopped) {
	        return;
	      }
	    }
	  }
	}

	function retargetNonBubblingEvent(e) {
	  let path = e.composedPath();
	  let node;
	  // override `currentTarget` to let patched `target` calculate correctly
	  Object.defineProperty(e, 'currentTarget', {
	    get: function() {
	      return node;
	    },
	    configurable: true
	  });
	  for (let i = path.length - 1; i >= 0; i--) {
	    node = path[i];
	    // capture phase fires all capture handlers
	    fireHandlers(e, node, 'capture');
	    if (e.__propagationStopped) {
	      return;
	    }
	  }

	  // set the event phase to `AT_TARGET` as in spec
	  Object.defineProperty(e, 'eventPhase', {get() { return Event.AT_TARGET }});

	  // the event only needs to be fired when owner roots change when iterating the event path
	  // keep track of the last seen owner root
	  let lastFiredRoot;
	  for (let i = 0; i < path.length; i++) {
	    node = path[i];
	    const nodeData = shadyDataForNode(node);
	    const root = nodeData && nodeData.root;
	    if (i === 0 || (root && root === lastFiredRoot)) {
	      fireHandlers(e, node, 'bubble');
	      // don't bother with window, it doesn't have `getRootNode` and will be last in the path anyway
	      if (node !== window) {
	        lastFiredRoot = node.getRootNode();
	      }
	      if (e.__propagationStopped) {
	        return;
	      }
	    }
	  }
	}

	function listenerSettingsEqual(savedListener, node, type, capture, once, passive) {
	  let {
	    node: savedNode,
	    type: savedType,
	    capture: savedCapture,
	    once: savedOnce,
	    passive: savedPassive
	  } = savedListener;
	  return node === savedNode &&
	    type === savedType &&
	    capture === savedCapture &&
	    once === savedOnce &&
	    passive === savedPassive;
	}

	function findListener(wrappers, node, type, capture, once, passive) {
	  for (let i = 0; i < wrappers.length; i++) {
	    if (listenerSettingsEqual(wrappers[i], node, type, capture, once, passive)) {
	      return i;
	    }
	  }
	  return -1;
	}

	/**
	 * Firefox can throw on accessing eventWrappers inside of `removeEventListener` during a selenium run
	 * Try/Catch accessing eventWrappers to work around
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=1353074
	 */
	function getEventWrappers(eventLike) {
	  let wrappers = null;
	  try {
	    wrappers = eventLike[eventWrappersName];
	  } catch (e) {} // eslint-disable-line no-empty
	  return wrappers;
	}

	/**
	 * @this {Event}
	 */
	function addEventListener$1(type, fnOrObj, optionsOrCapture) {
	  if (!fnOrObj) {
	    return;
	  }

	  const handlerType = typeof fnOrObj;

	  // bail if `fnOrObj` is not a function, not an object
	  if (handlerType !== 'function' && handlerType !== 'object') {
	    return;
	  }

	  // bail if `fnOrObj` is an object without a `handleEvent` method
	  if (handlerType === 'object' && (!fnOrObj.handleEvent || typeof fnOrObj.handleEvent !== 'function')) {
	    return;
	  }

	  const ael = this instanceof Window ? windowAddEventListener :
	      addEventListener;

	  if (unpatchedEvents[type]) {
	    return ael.call(this, type, fnOrObj, optionsOrCapture);
	  }

	  // The callback `fn` might be used for multiple nodes/events. Since we generate
	  // a wrapper function, we need to keep track of it when we remove the listener.
	  // It's more efficient to store the node/type/options information as Array in
	  // `fn` itself rather than the node (we assume that the same callback is used
	  // for few nodes at most, whereas a node will likely have many event listeners).
	  // NOTE(valdrin) invoking external functions is costly, inline has better perf.
	  let capture, once, passive;
	  if (optionsOrCapture && typeof optionsOrCapture === 'object') {
	    capture = Boolean(optionsOrCapture.capture);
	    once = Boolean(optionsOrCapture.once);
	    passive = Boolean(optionsOrCapture.passive);
	  } else {
	    capture = Boolean(optionsOrCapture);
	    once = false;
	    passive = false;
	  }
	  // hack to let ShadyRoots have event listeners
	  // event listener will be on host, but `currentTarget`
	  // will be set to shadyroot for event listener
	  let target = (optionsOrCapture && optionsOrCapture.__shadyTarget) || this;

	  let wrappers = fnOrObj[eventWrappersName];
	  if (wrappers) {
	    // Stop if the wrapper function has already been created.
	    if (findListener(wrappers, target, type, capture, once, passive) > -1) {
	      return;
	    }
	  } else {
	    fnOrObj[eventWrappersName] = [];
	  }

	  /**
	   * @this {HTMLElement}
	   * @param {Event} e
	   */
	  const wrapperFn = function(e) {
	    // Support `once` option.
	    if (once) {
	      this.removeEventListener(type, fnOrObj, optionsOrCapture);
	    }
	    if (!e['__target']) {
	      patchEvent(e);
	    }
	    let lastCurrentTargetDesc;
	    if (target !== this) {
	      // replace `currentTarget` to make `target` and `relatedTarget` correct for inside the shadowroot
	      lastCurrentTargetDesc = Object.getOwnPropertyDescriptor(e, 'currentTarget');
	      Object.defineProperty(e, 'currentTarget', {get() { return target }, configurable: true});
	    }
	    // Always check if a shadowRoot is in the current event path.
	    // If it is not, the event was generated on either the host of the shadowRoot
	    // or a children of the host.
	    if (isShadyRoot(target) && e.composedPath().indexOf(target) == -1) {
	      return;
	    }
	    // There are two critera that should stop events from firing on this node
	    // 1. the event is not composed and the current node is not in the same root as the target
	    // 2. when bubbling, if after retargeting, relatedTarget and target point to the same node
	    if (e.composed || e.composedPath().indexOf(target) > -1) {
	      if (hasRetargeted(e) && e.target === e.relatedTarget) {
	        if (e.eventPhase === Event.BUBBLING_PHASE) {
	          e.stopImmediatePropagation();
	        }
	        return;
	      }
	      // prevent non-bubbling events from triggering bubbling handlers on shadowroot, but only if not in capture phase
	      if (e.eventPhase !== Event.CAPTURING_PHASE && !e.bubbles && e.target !== target && !(target instanceof Window)) {
	        return;
	      }
	      let ret = handlerType === 'function' ?
	        fnOrObj.call(target, e) :
	        (fnOrObj.handleEvent && fnOrObj.handleEvent(e));
	      if (target !== this) {
	        // replace the "correct" `currentTarget`
	        if (lastCurrentTargetDesc) {
	          Object.defineProperty(e, 'currentTarget', lastCurrentTargetDesc);
	          lastCurrentTargetDesc = null;
	        } else {
	          delete e['currentTarget'];
	        }
	      }
	      return ret;
	    }
	  };
	  // Store the wrapper information.
	  fnOrObj[eventWrappersName].push({
	    // note: use target here which is either a shadowRoot
	    // (when the host element is proxy'ing the event) or this element
	    node: target,
	    type: type,
	    capture: capture,
	    once: once,
	    passive: passive,
	    wrapperFn: wrapperFn
	  });

	  if (nonBubblingEventsToRetarget[type]) {
	    this.__handlers = this.__handlers || {};
	    this.__handlers[type] = this.__handlers[type] ||
	      {'capture': [], 'bubble': []};
	    this.__handlers[type][capture ? 'capture' : 'bubble'].push(wrapperFn);
	  } else {
	    ael.call(this, type, wrapperFn, optionsOrCapture);
	  }
	}

	/**
	 * @this {Event}
	 */
	function removeEventListener$1(type, fnOrObj, optionsOrCapture) {
	  if (!fnOrObj) {
	    return;
	  }
	  const rel = this instanceof Window ? windowRemoveEventListener :
	    removeEventListener;
	  if (unpatchedEvents[type]) {
	    return rel.call(this, type, fnOrObj, optionsOrCapture);
	  }
	  // NOTE(valdrin) invoking external functions is costly, inline has better perf.
	  let capture, once, passive;
	  if (optionsOrCapture && typeof optionsOrCapture === 'object') {
	    capture = Boolean(optionsOrCapture.capture);
	    once = Boolean(optionsOrCapture.once);
	    passive = Boolean(optionsOrCapture.passive);
	  } else {
	    capture = Boolean(optionsOrCapture);
	    once = false;
	    passive = false;
	  }
	  let target = (optionsOrCapture && optionsOrCapture.__shadyTarget) || this;
	  // Search the wrapped function.
	  let wrapperFn = undefined;
	  let wrappers = getEventWrappers(fnOrObj);
	  if (wrappers) {
	    let idx = findListener(wrappers, target, type, capture, once, passive);
	    if (idx > -1) {
	      wrapperFn = wrappers.splice(idx, 1)[0].wrapperFn;
	      // Cleanup.
	      if (!wrappers.length) {
	        fnOrObj[eventWrappersName] = undefined;
	      }
	    }
	  }
	  rel.call(this, type, wrapperFn || fnOrObj, optionsOrCapture);
	  if (wrapperFn && nonBubblingEventsToRetarget[type] &&
	      this.__handlers && this.__handlers[type]) {
	    const arr = this.__handlers[type][capture ? 'capture' : 'bubble'];
	    const idx = arr.indexOf(wrapperFn);
	    if (idx > -1) {
	      arr.splice(idx, 1);
	    }
	  }
	}

	function activateFocusEventOverrides() {
	  for (let ev in nonBubblingEventsToRetarget) {
	    window.addEventListener(ev, function(e) {
	      if (!e['__target']) {
	        patchEvent(e);
	        retargetNonBubblingEvent(e);
	      }
	    }, true);
	  }
	}

	function patchEvent(event) {
	  event['__target'] = event.target;
	  event.__relatedTarget = event.relatedTarget;
	  // patch event prototype if we can
	  if (settings.hasDescriptors) {
	    patchPrototype(event, eventMixin);
	  // and fallback to patching instance
	  } else {
	    extend(event, eventMixin);
	  }
	}

	let PatchedEvent = mixinComposedFlag(window.Event);
	let PatchedCustomEvent = mixinComposedFlag(window.CustomEvent);
	let PatchedMouseEvent = mixinComposedFlag(window.MouseEvent);

	function patchEvents() {
	  window.Event = PatchedEvent;
	  window.CustomEvent = PatchedCustomEvent;
	  window.MouseEvent = PatchedMouseEvent;
	  activateFocusEventOverrides();

	  // Fix up `Element.prototype.click()` if `isTrusted` is supported, but `composed` isn't
	  if (!composedGetter && Object.getOwnPropertyDescriptor(Event.prototype, 'isTrusted')) {
	    /** @this {Element} */
	    const composedClickFn = function() {
	      const ev = new MouseEvent('click', {
	        bubbles: true,
	        cancelable: true,
	        composed: true
	      });
	      this.dispatchEvent(ev);
	    };
	    if (Element.prototype.click) {
	      Element.prototype.click = composedClickFn;
	    } else if (HTMLElement.prototype.click) {
	      HTMLElement.prototype.click = composedClickFn;
	    }
	  }
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	function newSplice(index, removed, addedCount) {
	  return {
	    index: index,
	    removed: removed,
	    addedCount: addedCount
	  };
	}

	const EDIT_LEAVE = 0;
	const EDIT_UPDATE = 1;
	const EDIT_ADD = 2;
	const EDIT_DELETE = 3;

	// Note: This function is *based* on the computation of the Levenshtein
	// "edit" distance. The one change is that "updates" are treated as two
	// edits - not one. With Array splices, an update is really a delete
	// followed by an add. By retaining this, we optimize for "keeping" the
	// maximum array items in the original array. For example:
	//
	//   'xxxx123' -> '123yyyy'
	//
	// With 1-edit updates, the shortest path would be just to update all seven
	// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
	// leaves the substring '123' intact.
	function calcEditDistances(current, currentStart, currentEnd,
	                            old, oldStart, oldEnd) {
	  // "Deletion" columns
	  let rowCount = oldEnd - oldStart + 1;
	  let columnCount = currentEnd - currentStart + 1;
	  let distances = new Array(rowCount);

	  // "Addition" rows. Initialize null column.
	  for (let i = 0; i < rowCount; i++) {
	    distances[i] = new Array(columnCount);
	    distances[i][0] = i;
	  }

	  // Initialize null row
	  for (let j = 0; j < columnCount; j++)
	    distances[0][j] = j;

	  for (let i = 1; i < rowCount; i++) {
	    for (let j = 1; j < columnCount; j++) {
	      if (equals(current[currentStart + j - 1], old[oldStart + i - 1]))
	        distances[i][j] = distances[i - 1][j - 1];
	      else {
	        let north = distances[i - 1][j] + 1;
	        let west = distances[i][j - 1] + 1;
	        distances[i][j] = north < west ? north : west;
	      }
	    }
	  }

	  return distances;
	}

	// This starts at the final weight, and walks "backward" by finding
	// the minimum previous weight recursively until the origin of the weight
	// matrix.
	function spliceOperationsFromEditDistances(distances) {
	  let i = distances.length - 1;
	  let j = distances[0].length - 1;
	  let current = distances[i][j];
	  let edits = [];
	  while (i > 0 || j > 0) {
	    if (i == 0) {
	      edits.push(EDIT_ADD);
	      j--;
	      continue;
	    }
	    if (j == 0) {
	      edits.push(EDIT_DELETE);
	      i--;
	      continue;
	    }
	    let northWest = distances[i - 1][j - 1];
	    let west = distances[i - 1][j];
	    let north = distances[i][j - 1];

	    let min;
	    if (west < north)
	      min = west < northWest ? west : northWest;
	    else
	      min = north < northWest ? north : northWest;

	    if (min == northWest) {
	      if (northWest == current) {
	        edits.push(EDIT_LEAVE);
	      } else {
	        edits.push(EDIT_UPDATE);
	        current = northWest;
	      }
	      i--;
	      j--;
	    } else if (min == west) {
	      edits.push(EDIT_DELETE);
	      i--;
	      current = west;
	    } else {
	      edits.push(EDIT_ADD);
	      j--;
	      current = north;
	    }
	  }

	  edits.reverse();
	  return edits;
	}

	/**
	 * Splice Projection functions:
	 *
	 * A splice map is a representation of how a previous array of items
	 * was transformed into a new array of items. Conceptually it is a list of
	 * tuples of
	 *
	 *   <index, removed, addedCount>
	 *
	 * which are kept in ascending index order of. The tuple represents that at
	 * the |index|, |removed| sequence of items were removed, and counting forward
	 * from |index|, |addedCount| items were added.
	 */

	/**
	 * Lacking individual splice mutation information, the minimal set of
	 * splices can be synthesized given the previous state and final state of an
	 * array. The basic approach is to calculate the edit distance matrix and
	 * choose the shortest path through it.
	 *
	 * Complexity: O(l * p)
	 *   l: The length of the current array
	 *   p: The length of the old array
	 */
	function calcSplices(current, currentStart, currentEnd,
	                      old, oldStart, oldEnd) {
	  let prefixCount = 0;
	  let suffixCount = 0;
	  let splice;

	  let minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
	  if (currentStart == 0 && oldStart == 0)
	    prefixCount = sharedPrefix(current, old, minLength);

	  if (currentEnd == current.length && oldEnd == old.length)
	    suffixCount = sharedSuffix(current, old, minLength - prefixCount);

	  currentStart += prefixCount;
	  oldStart += prefixCount;
	  currentEnd -= suffixCount;
	  oldEnd -= suffixCount;

	  if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
	    return [];

	  if (currentStart == currentEnd) {
	    splice = newSplice(currentStart, [], 0);
	    while (oldStart < oldEnd)
	      splice.removed.push(old[oldStart++]);

	    return [ splice ];
	  } else if (oldStart == oldEnd)
	    return [ newSplice(currentStart, [], currentEnd - currentStart) ];

	  let ops = spliceOperationsFromEditDistances(
	      calcEditDistances(current, currentStart, currentEnd,
	                             old, oldStart, oldEnd));

	  splice = undefined;
	  let splices = [];
	  let index = currentStart;
	  let oldIndex = oldStart;
	  for (let i = 0; i < ops.length; i++) {
	    switch(ops[i]) {
	      case EDIT_LEAVE:
	        if (splice) {
	          splices.push(splice);
	          splice = undefined;
	        }

	        index++;
	        oldIndex++;
	        break;
	      case EDIT_UPDATE:
	        if (!splice)
	          splice = newSplice(index, [], 0);

	        splice.addedCount++;
	        index++;

	        splice.removed.push(old[oldIndex]);
	        oldIndex++;
	        break;
	      case EDIT_ADD:
	        if (!splice)
	          splice = newSplice(index, [], 0);

	        splice.addedCount++;
	        index++;
	        break;
	      case EDIT_DELETE:
	        if (!splice)
	          splice = newSplice(index, [], 0);

	        splice.removed.push(old[oldIndex]);
	        oldIndex++;
	        break;
	    }
	  }

	  if (splice) {
	    splices.push(splice);
	  }
	  return splices;
	}

	function sharedPrefix(current, old, searchLength) {
	  for (let i = 0; i < searchLength; i++)
	    if (!equals(current[i], old[i]))
	      return i;
	  return searchLength;
	}

	function sharedSuffix(current, old, searchLength) {
	  let index1 = current.length;
	  let index2 = old.length;
	  let count = 0;
	  while (count < searchLength && equals(current[--index1], old[--index2]))
	    count++;

	  return count;
	}

	function equals(currentValue, previousValue) {
	  return currentValue === previousValue;
	}

	function calculateSplices(current, previous) {
	  return calcSplices(current, 0, current.length, previous, 0,
	                          previous.length);
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	const {parentNode: parentNode$3, childNodes: childNodes$3} = accessors;

	// Do not export this object. It must be passed as the first argument to the
	// ShadyRoot constructor in `attachShadow` to prevent the constructor from
	// throwing. This prevents the user from being able to manually construct a
	// ShadyRoot (i.e. `new ShadowRoot()`).
	const ShadyRootConstructionToken = {};

	const CATCHALL_NAME = '__catchall';
	const SHADYROOT_NAME = 'ShadyRoot';

	const MODE_CLOSED = 'closed';

	let isRendering = settings['deferConnectionCallbacks'] && document.readyState === 'loading';
	let rootRendered;

	function ancestorList(node) {
	  let ancestors = [];
	  do {
	    ancestors.unshift(node);
	  } while ((node = node.parentNode));
	  return ancestors;
	}

	/**
	 * @extends {ShadowRoot}
	 */
	class ShadyRoot {

	  constructor(token, host, options) {
	    if (token !== ShadyRootConstructionToken) {
	      throw new TypeError('Illegal constructor');
	    }
	    // NOTE: set a fake local name so this element can be
	    // distinguished from a DocumentFragment when patching.
	    // FF doesn't allow this to be `localName`
	    this._localName = SHADYROOT_NAME;
	    // root <=> host
	    this.host = host;
	    this._mode = options && options.mode;
	    recordChildNodes(host);
	    const hostData = ensureShadyDataForNode(host);
	    hostData.root = this;
	    hostData.publicRoot = this._mode !== MODE_CLOSED ? this : null;
	    // setup root
	    const rootData = ensureShadyDataForNode(this);
	    rootData.firstChild = rootData.lastChild =
	        rootData.parentNode = rootData.nextSibling =
	        rootData.previousSibling = null;
	    rootData.childNodes = [];
	    // state flags
	    this._renderPending = false;
	    this._hasRendered = false;
	    // marsalled lazily
	    this._slotList = null;
	    /** @type {Object<string, Array<HTMLSlotElement>>} */
	    this._slotMap = null;
	    this._pendingSlots = null;
	    this._initialChildren = null;
	    this._asyncRender();
	  }

	  // async render
	  _asyncRender() {
	    if (!this._renderPending) {
	      this._renderPending = true;
	      enqueue(() => this._render());
	    }
	  }

	  // returns the oldest renderPending ancestor root.
	  _getRenderRoot() {
	    let renderRoot;
	    let root = this;
	    while (root) {
	      if (root._renderPending) {
	        renderRoot = root;
	      }
	      root = root._rendererForHost();
	    }
	    return renderRoot;
	  }

	  // Returns the shadyRoot `this.host` if `this.host`
	  // has children that require distribution.
	  _rendererForHost() {
	    let root = this.host.getRootNode();
	    if (isShadyRoot(root)) {
	      let c$ = this.host.childNodes;
	      for (let i=0, c; i < c$.length; i++) {
	        c = c$[i];
	        if (this._isInsertionPoint(c)) {
	          return root;
	        }
	      }
	    }
	  }

	  _render() {
	    const root = this._getRenderRoot();
	    if (root) {
	      root['_renderRoot']();
	    }
	  }

	  // NOTE: avoid renaming to ease testability.
	  ['_renderRoot']() {
	    // track rendering state.
	    const wasRendering = isRendering;
	    isRendering = true;
	    this._renderPending = false;
	    if (this._slotList) {
	      this._distribute();
	      this._compose();
	    }
	    // on initial render remove any undistributed children.
	    if (!this._hasRendered) {
	      const c$ = this.host.childNodes;
	      for (let i=0, l=c$.length; i < l; i++) {
	        const child = c$[i];
	        const data = shadyDataForNode(child);
	        if (parentNode$3(child) === this.host &&
	            (child.localName === 'slot' || !data.assignedSlot)) {
	          removeChild.call(this.host, child);
	        }
	      }
	    }
	    this._hasRendered = true;
	    isRendering = wasRendering;
	    if (rootRendered) {
	      rootRendered();
	    }
	  }

	  _distribute() {
	    this._validateSlots();
	    // capture # of previously assigned nodes to help determine if dirty.
	    for (let i=0, slot; i < this._slotList.length; i++) {
	      slot = this._slotList[i];
	      this._clearSlotAssignedNodes(slot);
	    }
	    // distribute host children.
	    for (let n=this.host.firstChild; n; n=n.nextSibling) {
	      this._distributeNodeToSlot(n);
	    }
	    // fallback content, slotchange, and dirty roots
	    for (let i=0; i < this._slotList.length; i++) {
	      const slot = this._slotList[i];
	      const slotData = shadyDataForNode(slot);
	      // distribute fallback content
	      if (!slotData.assignedNodes.length) {
	        for (let n=slot.firstChild; n; n=n.nextSibling) {
	          this._distributeNodeToSlot(n, slot);
	        }
	      }
	      const slotParentData = shadyDataForNode(slot.parentNode);
	      const slotParentRoot = slotParentData && slotParentData.root;
	      if (slotParentRoot && slotParentRoot._hasInsertionPoint()) {
	        slotParentRoot['_renderRoot']();
	      }
	      this._addAssignedToFlattenedNodes(slotData.flattenedNodes,
	        slotData.assignedNodes);
	      let prevAssignedNodes = slotData._previouslyAssignedNodes;
	      if (prevAssignedNodes) {
	        for (let i=0; i < prevAssignedNodes.length; i++) {
	          shadyDataForNode(prevAssignedNodes[i])._prevAssignedSlot = null;
	        }
	        slotData._previouslyAssignedNodes = null;
	        // dirty if previously less assigned nodes than previously assigned.
	        if (prevAssignedNodes.length > slotData.assignedNodes.length) {
	          slotData.dirty = true;
	        }
	      }
	      /* Note: A slot is marked dirty whenever a node is newly assigned to it
	      or a node is assigned to a different slot (done in `_distributeNodeToSlot`)
	      or if the number of nodes assigned to the slot has decreased (done above);
	      */
	      if (slotData.dirty) {
	        slotData.dirty = false;
	        this._fireSlotChange(slot);
	      }
	    }
	  }

	  /**
	   * Distributes given `node` to the appropriate slot based on its `slot`
	   * attribute. If `forcedSlot` is given, then the node is distributed to the
	   * `forcedSlot`.
	   * Note: slot to which the node is assigned will be marked dirty for firing
	   * `slotchange`.
	   * @param {Node} node
	   * @param {Node=} forcedSlot
	   *
	   */
	  _distributeNodeToSlot(node, forcedSlot) {
	    const nodeData = ensureShadyDataForNode(node);
	    let oldSlot = nodeData._prevAssignedSlot;
	    nodeData._prevAssignedSlot = null;
	    let slot = forcedSlot;
	    if (!slot) {
	      let name = node.slot || CATCHALL_NAME;
	      const list = this._slotMap[name];
	      slot = list && list[0];
	    }
	    if (slot) {
	      const slotData = ensureShadyDataForNode(slot);
	      slotData.assignedNodes.push(node);
	      nodeData.assignedSlot = slot;
	    } else {
	      nodeData.assignedSlot = undefined;
	    }
	    if (oldSlot !== nodeData.assignedSlot) {
	      if (nodeData.assignedSlot) {
	        ensureShadyDataForNode(nodeData.assignedSlot).dirty = true;
	      }
	    }
	  }

	  /**
	   * Clears the assignedNodes tracking data for a given `slot`. Note, the current
	   * assigned node data is tracked (via _previouslyAssignedNodes and
	   * _prevAssignedSlot) to see if `slotchange` should fire. This data may be out
	   *  of date at this time because the assigned nodes may have already been
	   * distributed to another root. This is ok since this data is only used to
	   * track changes.
	   * @param {HTMLSlotElement} slot
	   */
	  _clearSlotAssignedNodes(slot) {
	    const slotData = shadyDataForNode(slot);
	    let n$ = slotData.assignedNodes;
	    slotData.assignedNodes = [];
	    slotData.flattenedNodes = [];
	    slotData._previouslyAssignedNodes = n$;
	    if (n$) {
	      for (let i=0; i < n$.length; i++) {
	        let n = shadyDataForNode(n$[i]);
	        n._prevAssignedSlot = n.assignedSlot;
	        // only clear if it was previously set to this slot;
	        // this helps ensure that if the node has otherwise been distributed
	        // ignore it.
	        if (n.assignedSlot === slot) {
	          n.assignedSlot = null;
	        }
	      }
	    }
	  }

	  _addAssignedToFlattenedNodes(flattened, assigned) {
	    for (let i=0, n; (i<assigned.length) && (n=assigned[i]); i++) {
	      if (n.localName == 'slot') {
	        const nestedAssigned = shadyDataForNode(n).assignedNodes;
	        if (nestedAssigned && nestedAssigned.length) {
	          this._addAssignedToFlattenedNodes(flattened, nestedAssigned);
	        }
	      } else {
	        flattened.push(assigned[i]);
	      }
	    }
	  }

	  _fireSlotChange(slot) {
	    // NOTE: cannot bubble correctly here so not setting bubbles: true
	    // Safari tech preview does not bubble but chrome does
	    // Spec says it bubbles (https://dom.spec.whatwg.org/#mutation-observers)
	    dispatchEvent.call(slot, new Event('slotchange'));
	    const slotData = shadyDataForNode(slot);
	    if (slotData.assignedSlot) {
	      this._fireSlotChange(slotData.assignedSlot);
	    }
	  }

	  // Reify dom such that it is at its correct rendering position
	  // based on logical distribution.
	  // NOTE: here we only compose parents of <slot> elements and not the
	  // shadowRoot into the host. The latter is performend via a fast path
	  // in the `logical-mutation`.insertBefore.
	  _compose() {
	    const slots = this._slotList;
	    let composeList = [];
	    for (let i=0; i < slots.length; i++) {
	      const parent = slots[i].parentNode;
	      /* compose node only if:
	        (1) parent does not have a shadowRoot since shadowRoot has already
	        composed into the host
	        (2) we're not already composing it
	        [consider (n^2) but rare better than Set]
	      */
	      const parentData = shadyDataForNode(parent);
	      if (!(parentData && parentData.root) &&
	        composeList.indexOf(parent) < 0) {
	        composeList.push(parent);
	      }
	    }
	    for (let i=0; i < composeList.length; i++) {
	      const node = composeList[i];
	      const targetNode = node === this ? this.host : node;
	      this._updateChildNodes(targetNode, this._composeNode(node));
	    }
	  }

	  // Returns the list of nodes which should be rendered inside `node`.
	  _composeNode(node) {
	    let children = [];
	    let c$ = node.childNodes;
	    for (let i = 0; i < c$.length; i++) {
	      let child = c$[i];
	      // Note: if we see a slot here, the nodes are guaranteed to need to be
	      // composed here. This is because if there is redistribution, it has
	      // already been handled by this point.
	      if (this._isInsertionPoint(child)) {
	        let flattenedNodes = shadyDataForNode(child).flattenedNodes;
	        for (let j = 0; j < flattenedNodes.length; j++) {
	          let distributedNode = flattenedNodes[j];
	            children.push(distributedNode);
	        }
	      } else {
	        children.push(child);
	      }
	    }
	    return children;
	  }

	  _isInsertionPoint(node) {
	      return node.localName == 'slot';
	    }

	  // Ensures that the rendered node list inside `container` is `children`.
	  _updateChildNodes(container, children) {
	    let composed = childNodes$3(container);
	    let splices = calculateSplices(children, composed);
	    // process removals
	    for (let i=0, d=0, s; (i<splices.length) && (s=splices[i]); i++) {
	      for (let j=0, n; (j < s.removed.length) && (n=s.removed[j]); j++) {
	        // check if the node is still where we expect it is before trying
	        // to remove it; this can happen if we move a node and
	        // then schedule its previous host for distribution resulting in
	        // the node being removed here.
	        if (parentNode$3(n) === container) {
	          removeChild.call(container, n);
	        }
	        // TODO(sorvell): avoid the need for splicing here.
	        composed.splice(s.index + d, 1);
	      }
	      d -= s.addedCount;
	    }
	    // process adds
	    for (let i=0, s, next; (i<splices.length) && (s=splices[i]); i++) { //eslint-disable-line no-redeclare
	      next = composed[s.index];
	      for (let j=s.index, n; j < s.index + s.addedCount; j++) {
	        n = children[j];
	        insertBefore.call(container, n, next);
	        composed.splice(j, 0, n);
	      }
	    }
	  }

	  _ensureSlotData() {
	    this._pendingSlots = this._pendingSlots || [];
	    this._slotList = this._slotList || [];
	    this._slotMap = this._slotMap || {};
	  }

	  _addSlots(slots) {
	    this._ensureSlotData();
	    this._pendingSlots.push(...slots);
	  }

	  _validateSlots() {
	    if (this._pendingSlots && this._pendingSlots.length) {
	      this._mapSlots(this._pendingSlots);
	      this._pendingSlots = [];
	    }
	  }

	  /**
	   * Adds the given slots. Slots are maintained in an dom-ordered list.
	   * In addition a map of name to slot is updated.
	   */
	  _mapSlots(slots) {
	    let slotNamesToSort;
	    for (let i=0; i < slots.length; i++) {
	      let slot = slots[i];
	      // ensure insertionPoints's and their parents have logical dom info.
	      // save logical tree info
	      // a. for shadyRoot
	      // b. for insertion points (fallback)
	      // c. for parents of insertion points
	      recordChildNodes(slot);
	      recordChildNodes(slot.parentNode);
	      let name = this._nameForSlot(slot);
	      if (this._slotMap[name]) {
	        slotNamesToSort = slotNamesToSort || {};
	        slotNamesToSort[name] = true;
	        this._slotMap[name].push(slot);
	      } else {
	        this._slotMap[name] = [slot];
	      }
	      this._slotList.push(slot);
	    }
	    if (slotNamesToSort) {
	      for (let n in slotNamesToSort) {
	        this._slotMap[n] = this._sortSlots(this._slotMap[n]);
	      }
	    }
	  }

	  _nameForSlot(slot) {
	    const name = slot['name'] || slot.getAttribute('name') || CATCHALL_NAME;
	    slot.__slotName = name;
	    return name;
	  }

	  /**
	   * Slots are kept in an ordered list. Slots with the same name
	   * are sorted here by tree order.
	   */
	  _sortSlots(slots) {
	    // NOTE: Cannot use `compareDocumentPosition` because it's not polyfilled,
	    // but the code here could be used to polyfill the preceeding/following info
	    // in `compareDocumentPosition`.
	    return slots.sort((a, b) => {
	      let listA = ancestorList(a);
	      let listB = ancestorList(b);
	      for (var i=0; i < listA.length; i++) {
	        let nA = listA[i];
	        let nB = listB[i];
	        if (nA !== nB) {
	          let c$ = Array.from(nA.parentNode.childNodes);
	          return c$.indexOf(nA) - c$.indexOf(nB);
	        }
	      }
	    });
	  }

	  /**
	   * Removes from tracked slot data any slots contained within `container` and
	   * then updates the tracked data (_slotList and _slotMap).
	   * Any removed slots also have their `assignedNodes` removed from comopsed dom.
	   */
	  _removeContainedSlots(container) {
	    if (!this._slotList) {
	      return;
	    }
	    this._validateSlots();
	    let didRemove;
	    const map = this._slotMap;
	    for (let n in map) {
	      let slots = map[n];
	      for (let i=0; i < slots.length; i++) {
	        let slot = slots[i];
	        if (contains(container, slot)) {
	          slots.splice(i, 1);
	          const x = this._slotList.indexOf(slot);
	          if (x >= 0) {
	            this._slotList.splice(x, 1);
	          }
	          i--;
	          this._removeFlattenedNodes(slot);
	          didRemove = true;
	        }
	      }
	    }
	    return didRemove;
	  }

	  _updateSlotName(slot) {
	    if (!this._slotList) {
	      return;
	    }
	    const oldName = slot.__slotName;
	    const name = this._nameForSlot(slot);
	    if (name === oldName) {
	      return;
	    }
	    // remove from existing tracking
	    let slots = this._slotMap[oldName];
	    const i = slots.indexOf(slot);
	    if (i >= 0) {
	      slots.splice(i, 1);
	    }
	    // add to new location and sort if nedessary
	    let list = this._slotMap[name] || (this._slotMap[name] = []);
	    list.push(slot);
	    if (list.length > 1) {
	      this._slotMap[name] = this._sortSlots(list);
	    }
	  }

	  _removeFlattenedNodes(slot) {
	    const data = shadyDataForNode(slot);
	    let n$ = data.flattenedNodes;
	    if (n$) {
	      for (let i=0; i<n$.length; i++) {
	        let node = n$[i];
	        let parent = parentNode$3(node);
	        if (parent) {
	          removeChild.call(parent, node);
	        }
	      }
	    }
	    data.flattenedNodes = [];
	    data.assignedNodes = [];
	  }

	  _hasInsertionPoint() {
	    this._validateSlots();
	    return Boolean(this._slotList && this._slotList.length);
	  }
	}

	/**
	  Implements a pared down version of ShadowDOM's scoping, which is easy to
	  polyfill across browsers.
	*/
	function attachShadow(host, options) {
	  if (!host) {
	    throw 'Must provide a host.';
	  }
	  if (!options) {
	    throw 'Not enough arguments.'
	  }
	  return new ShadyRoot(ShadyRootConstructionToken, host, options);
	}

	// Mitigate connect/disconnect spam by wrapping custom element classes.
	if (window['customElements'] && settings.inUse) {

	  // process connect/disconnect after roots have rendered to avoid
	  // issues with reaction stack.
	  let connectMap = new Map();
	  rootRendered = function() {
	    // allow elements to connect
	    const map = Array.from(connectMap);
	    connectMap.clear();
	    for (const [e, value] of map) {
	      if (value) {
	        e.__shadydom_connectedCallback();
	      } else {
	        e.__shadydom_disconnectedCallback();
	      }
	    }
	  };

	  // Document is in loading state and flag is set (deferConnectionCallbacks)
	  // so process connection stack when `readystatechange` fires.
	  if (isRendering) {
	    document.addEventListener('readystatechange', () => {
	      isRendering = false;
	      rootRendered();
	    }, {once: true});
	  }

	  /*
	   * (1) elements can only be connected/disconnected if they are in the expected
	   * state.
	   * (2) never run connect/disconnect during rendering to avoid reaction stack issues.
	   */
	  const ManageConnect = (base, connected, disconnected) => {
	    let counter = 0;
	    const connectFlag = `__isConnected${counter++}`;
	    if (connected || disconnected) {

	      base.prototype.connectedCallback = base.prototype.__shadydom_connectedCallback = function() {
	        // if rendering defer connected
	        // otherwise connect only if we haven't already
	        if (isRendering) {
	          connectMap.set(this, true);
	        } else if (!this[connectFlag]) {
	          this[connectFlag] = true;
	          if (connected) {
	            connected.call(this);
	          }
	        }
	      };

	      base.prototype.disconnectedCallback = base.prototype.__shadydom_disconnectedCallback = function() {
	        // if rendering, cancel a pending connection and queue disconnect,
	        // otherwise disconnect only if a connection has been allowed
	        if (isRendering) {
	          // This is necessary only because calling removeChild
	          // on a node that requires distribution leaves it in the DOM tree
	          // until distribution.
	          // NOTE: remember this is checking the patched isConnected to determine
	          // if the node is in the logical tree.
	          if (!this.isConnected) {
	            connectMap.set(this, false);
	          }
	        } else if (this[connectFlag]) {
	          this[connectFlag] = false;
	          if (disconnected) {
	            disconnected.call(this);
	          }
	        }
	      };
	    }

	    return base;
	  };

	  const define = window['customElements']['define'];
	  // NOTE: Instead of patching customElements.define,
	  // re-define on the CustomElementRegistry.prototype.define
	  // for Safari 10 compatibility (it's flakey otherwise).
	  Object.defineProperty(window['CustomElementRegistry'].prototype, 'define', {
	    value: function(name, constructor) {
	      const connected = constructor.prototype.connectedCallback;
	      const disconnected = constructor.prototype.disconnectedCallback;
	      define.call(window['customElements'], name,
	          ManageConnect(constructor, connected, disconnected));
	      // unpatch connected/disconnected on class; custom elements tears this off
	      // so the patch is maintained, but if the user calls these methods for
	      // e.g. testing, they will be as expected.
	      constructor.prototype.connectedCallback = connected;
	      constructor.prototype.disconnectedCallback = disconnected;
	    }
	  });

	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	function getAssignedSlot(node) {
	  renderRootNode(node);
	  const nodeData = shadyDataForNode(node);
	  return nodeData && nodeData.assignedSlot || null;
	}

	let windowMixin = {

	  // NOTE: ensure these methods are bound to `window` so that `this` is correct
	  // when called directly from global context without a receiver; e.g.
	  // `addEventListener(...)`.
	  addEventListener: addEventListener$1.bind(window),

	  removeEventListener: removeEventListener$1.bind(window)

	};

	let nodeMixin = {

	  addEventListener: addEventListener$1,

	  removeEventListener: removeEventListener$1,

	  appendChild(node) {
	    return insertBefore$1(this, node);
	  },

	  insertBefore(node, ref_node) {
	    return insertBefore$1(this, node, ref_node);
	  },

	  removeChild(node) {
	    return removeChild$1(this, node);
	  },

	  /**
	   * @this {Node}
	   */
	  replaceChild(node, ref_node) {
	    insertBefore$1(this, node, ref_node);
	    removeChild$1(this, ref_node);
	    return node;
	  },

	  /**
	   * @this {Node}
	   */
	  cloneNode(deep) {
	    return cloneNode$1(this, deep);
	  },

	  /**
	   * @this {Node}
	   */
	  getRootNode(options) {
	    return getRootNode(this, options);
	  },

	  contains(node) {
	    return contains(this, node);
	  },

	  /**
	   * @this {Node}
	   */
	  dispatchEvent(event) {
	    flush();
	    return dispatchEvent.call(this, event);
	  }

	};

	// NOTE: we can do this regardless of the browser supporting native accessors
	// since this is always "new" in that case.
	Object.defineProperties(nodeMixin, IsConnectedAccessor);

	// NOTE: For some reason 'Text' redefines 'assignedSlot'
	let textMixin = {
	  /**
	   * @this {Text}
	   */
	  get assignedSlot() {
	    return getAssignedSlot(this);
	  }
	};

	let fragmentMixin = {

	  // TODO(sorvell): consider doing native QSA and filtering results.
	  /**
	   * @this {DocumentFragment}
	   */
	  querySelector(selector) {
	    // match selector and halt on first result.
	    let result = query(this, function(n) {
	      return matchesSelector(n, selector);
	    }, function(n) {
	      return Boolean(n);
	    })[0];
	    return result || null;
	  },

	  /**
	   * @this {DocumentFragment}
	   */
	  // TODO(sorvell): `useNative` option relies on native querySelectorAll and
	  // misses distributed nodes, see
	  // https://github.com/webcomponents/shadydom/pull/210#issuecomment-361435503
	  querySelectorAll(selector, useNative) {
	    if (useNative) {
	      const o = Array.prototype.slice.call(querySelectorAll.call(this, selector));
	      const root = this.getRootNode();
	      return o.filter(e => e.getRootNode() == root);
	    }
	    return query(this, function(n) {
	      return matchesSelector(n, selector);
	    });
	  }

	};

	let slotMixin = {

	  /**
	   * @this {HTMLSlotElement}
	   */
	  assignedNodes(options) {
	    if (this.localName === 'slot') {
	      renderRootNode(this);
	      const nodeData = shadyDataForNode(this);
	      return nodeData ?
	        ((options && options.flatten ? nodeData.flattenedNodes :
	          nodeData.assignedNodes) || []) :
	        [];
	    }
	  }

	};

	let elementMixin = extendAll({

	  /**
	   * @this {HTMLElement}
	   */
	  setAttribute(name, value) {
	    setAttribute$1(this, name, value);
	  },

	  /**
	   * @this {HTMLElement}
	   */
	  removeAttribute(name) {
	    removeAttribute$1(this, name);
	  },

	  /**
	   * @this {HTMLElement}
	   */
	  attachShadow(options) {
	    return attachShadow(this, options);
	  },

	  /**
	   * @this {HTMLElement}
	   */
	  get slot() {
	    return this.getAttribute('slot');
	  },

	  /**
	   * @this {HTMLElement}
	   */
	  set slot(value) {
	    setAttribute$1(this, 'slot', value);
	  },

	  /**
	   * @this {HTMLElement}
	   */
	  get assignedSlot() {
	    return getAssignedSlot(this);
	  }

	}, fragmentMixin, slotMixin);

	Object.defineProperties(elementMixin, ShadowRootAccessor);

	let documentMixin = extendAll({
	  /**
	   * @this {Document}
	   */
	  importNode(node, deep) {
	    return importNode$1(node, deep);
	  },

	  /**
	   * @this {Document}
	   */
	  getElementById(id) {
	    let result = query(this, function(n) {
	      return n.id == id;
	    }, function(n) {
	      return Boolean(n);
	    })[0];
	    return result || null;
	  }

	}, fragmentMixin);

	Object.defineProperties(documentMixin, {
	  '_activeElement': ActiveElementAccessor.activeElement
	});

	let nativeBlur = HTMLElement.prototype.blur;

	let htmlElementMixin = {
	  /**
	   * @this {HTMLElement}
	   */
	  blur() {
	    const nodeData = shadyDataForNode(this);
	    let root = nodeData && nodeData.root;
	    let shadowActive = root && root.activeElement;
	    if (shadowActive) {
	      shadowActive.blur();
	    } else {
	      nativeBlur.call(this);
	    }
	  }
	};

	for (const property of Object.getOwnPropertyNames(Document.prototype)) {
	  if (property.substring(0,2) === 'on') {
	    Object.defineProperty(htmlElementMixin, property, {
	      /** @this {HTMLElement} */
	      set: function(fn) {
	        const shadyData = ensureShadyDataForNode(this);
	        const eventName = property.substring(2);
	        shadyData.__onCallbackListeners[property] && this.removeEventListener(eventName, shadyData.__onCallbackListeners[property]);
	        this.addEventListener(eventName, fn, {});
	        shadyData.__onCallbackListeners[property] = fn;
	      },
	      /** @this {HTMLElement} */
	      get() {
	        const shadyData = shadyDataForNode(this);
	        return shadyData && shadyData.__onCallbackListeners[property];
	      },
	      configurable: true
	    });
	  }
	}

	const shadowRootMixin = {
	  /**
	   * @this {ShadowRoot}
	   */
	  addEventListener(type, fn, optionsOrCapture) {
	    if (typeof optionsOrCapture !== 'object') {
	      optionsOrCapture = {
	        capture: Boolean(optionsOrCapture)
	      };
	    }
	    optionsOrCapture.__shadyTarget = this;
	    this.host.addEventListener(type, fn, optionsOrCapture);
	  },

	  /**
	   * @this {ShadowRoot}
	   */
	  removeEventListener(type, fn, optionsOrCapture) {
	    if (typeof optionsOrCapture !== 'object') {
	      optionsOrCapture = {
	        capture: Boolean(optionsOrCapture)
	      };
	    }
	    optionsOrCapture.__shadyTarget = this;
	    this.host.removeEventListener(type, fn, optionsOrCapture);
	  },

	  /**
	   * @this {ShadowRoot}
	   */
	  getElementById(id) {
	    let result = query(this, function(n) {
	      return n.id == id;
	    }, function(n) {
	      return Boolean(n);
	    })[0];
	    return result || null;
	  }
	};

	function patchBuiltin(proto, obj) {
	  let n$ = Object.getOwnPropertyNames(obj);
	  for (let i=0; i < n$.length; i++) {
	    let n = n$[i];
	    let d = Object.getOwnPropertyDescriptor(obj, n);
	    // NOTE: we prefer writing directly here because some browsers
	    // have descriptors that are writable but not configurable (e.g.
	    // `appendChild` on older browsers)
	    if (d.value) {
	      proto[n] = d.value;
	    } else {
	      Object.defineProperty(proto, n, d);
	    }
	  }
	}

	// Apply patches to builtins (e.g. Element.prototype). Some of these patches
	// can be done unconditionally (mostly methods like
	// `Element.prototype.appendChild`) and some can only be done when the browser
	// has proper descriptors on the builtin prototype
	// (e.g. `Element.prototype.firstChild`)`. When descriptors are not available,
	// elements are individually patched when needed (see e.g.
	// `patchInside/OutsideElementAccessors` in `patch-accessors.js`).
	function patchBuiltins() {
	  let nativeHTMLElement =
	    (window['customElements'] && window['customElements']['nativeHTMLElement']) ||
	    HTMLElement;
	  // These patches can always be done, for all supported browsers.
	  patchBuiltin(ShadyRoot.prototype, shadowRootMixin);
	  patchBuiltin(window.Node.prototype, nodeMixin);
	  patchBuiltin(window.Window.prototype, windowMixin);
	  patchBuiltin(window.Text.prototype, textMixin);
	  patchBuiltin(window.DocumentFragment.prototype, fragmentMixin);
	  patchBuiltin(window.Element.prototype, elementMixin);
	  patchBuiltin(window.Document.prototype, documentMixin);
	  if (window.HTMLSlotElement) {
	    patchBuiltin(window.HTMLSlotElement.prototype, slotMixin);
	  }
	  patchBuiltin(nativeHTMLElement.prototype, htmlElementMixin);
	  // These patches can *only* be done
	  // on browsers that have proper property descriptors on builtin prototypes.
	  // This includes: IE11, Edge, Chrome >= 4?; Safari >= 10, Firefox
	  // On older browsers (Chrome <= 4?, Safari 9), a per element patching
	  // strategy is used for patching accessors.
	  if (settings.hasDescriptors) {
	    patchAccessors(window.Node.prototype);
	    patchAccessors(window.Text.prototype);
	    patchAccessors(window.DocumentFragment.prototype);
	    patchAccessors(window.Element.prototype);
	    patchAccessors(nativeHTMLElement.prototype);
	    patchAccessors(window.Document.prototype);
	    if (window.HTMLSlotElement) {
	      patchAccessors(window.HTMLSlotElement.prototype);
	    }
	  }
	  patchShadowRootAccessors(ShadyRoot.prototype);
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	if (settings.inUse) {
	  let ShadyDOM = {
	    // TODO(sorvell): remove when Polymer does not depend on this.
	    'inUse': settings.inUse,
	    // NOTE: old browsers without prototype accessors (very old Chrome
	    // and Safari) need manually patched accessors to properly set
	    // `innerHTML` and `textContent` when an element is:
	    // (1) inside a shadowRoot
	    // (2) does not have special (slot) children itself
	    // (3) and setting the property needs to provoke distribution (because
	    // a nested slot is added/removed)
	    'patch': (node) => {
	      patchInsideElementAccessors(node);
	      patchOutsideElementAccessors(node);
	      return node;
	    },
	    'isShadyRoot': isShadyRoot,
	    'enqueue': enqueue,
	    'flush': flush,
	    'settings': settings,
	    'filterMutations': filterMutations,
	    'observeChildren': observeChildren,
	    'unobserveChildren': unobserveChildren,
	    'nativeMethods': nativeMethods,
	    'nativeTree': accessors,
	    // Set to true to defer native custom elements connection until the
	    // document has fully parsed. This enables custom elements that create
	    // shadowRoots to be defined while the document is loading. Elements
	    // customized as they are created by the parser will successfully
	    // render with this flag on.
	    'deferConnectionCallbacks': settings['deferConnectionCallbacks']
	  };

	  window['ShadyDOM'] = ShadyDOM;

	  // Apply patches to events...
	  patchEvents();
	  // Apply patches to builtins (e.g. Element.prototype) where applicable.
	  patchBuiltins();

	  window.ShadowRoot = ShadyRoot;
	}

	var cjs = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var makeOptions = function (opts) {
	    if (opts === void 0) { opts = {}; }
	    return ({
	        arrayFormat: opts.arrayFormat || 'none',
	        booleanFormat: opts.booleanFormat || 'none',
	        nullFormat: opts.nullFormat || 'default'
	    });
	};
	var encodeValue = function (value) { return encodeURIComponent(value); };
	var decodeValue = function (value) { return decodeURIComponent(value); };
	var encodeBoolean = function (name, value, opts) {
	    if (opts.booleanFormat === 'empty-true' && value) {
	        return name;
	    }
	    var encodedValue;
	    if (opts.booleanFormat === 'unicode') {
	        encodedValue = value ? '✓' : '✗';
	    }
	    else {
	        encodedValue = value.toString();
	    }
	    return name + "=" + encodedValue;
	};
	var encodeNull = function (name, opts) {
	    if (opts.nullFormat === 'hidden') {
	        return '';
	    }
	    if (opts.nullFormat === 'string') {
	        return name + "=null";
	    }
	    return name;
	};
	var getNameEncoder = function (opts) {
	    if (opts.arrayFormat === 'index') {
	        return function (name, index) { return name + "[" + index + "]"; };
	    }
	    if (opts.arrayFormat === 'brackets') {
	        return function (name) { return name + "[]"; };
	    }
	    return function (name) { return name; };
	};
	var encodeArray = function (name, arr, opts) {
	    var encodeName = getNameEncoder(opts);
	    return arr
	        .map(function (val, index) { return encodeName(name, index) + "=" + encodeValue(val); })
	        .join('&');
	};
	var encode = function (name, value, opts) {
	    if (value === null) {
	        return encodeNull(name, opts);
	    }
	    if (typeof value === 'boolean') {
	        return encodeBoolean(name, value, opts);
	    }
	    if (Array.isArray(value)) {
	        return encodeArray(name, value, opts);
	    }
	    return name + "=" + encodeValue(value);
	};
	var decode = function (value, opts) {
	    if (value === undefined) {
	        return opts.booleanFormat === 'empty-true' ? true : null;
	    }
	    if (opts.booleanFormat === 'string') {
	        if (value === 'true') {
	            return true;
	        }
	        if (value === 'false') {
	            return false;
	        }
	    }
	    else if (opts.booleanFormat === 'unicode') {
	        if (value === '✓') {
	            return true;
	        }
	        if (value === '✗') {
	            return false;
	        }
	    }
	    else if (opts.nullFormat === 'string') {
	        if (value === 'null') {
	            return null;
	        }
	    }
	    return decodeValue(value);
	};

	var getSearch = function (path) {
	    var pos = path.indexOf('?');
	    if (pos === -1) {
	        return path;
	    }
	    return path.slice(pos + 1);
	};
	var isSerialisable = function (val) { return val !== undefined; };
	var parseName = function (name) {
	    var bracketPosition = name.indexOf('[');
	    var hasBrackets = bracketPosition !== -1;
	    return {
	        hasBrackets: hasBrackets,
	        name: hasBrackets ? name.slice(0, bracketPosition) : name
	    };
	};

	/**
	 * Parse a querystring and return an object of parameters
	 */
	var parse = function (path, opts) {
	    var options = makeOptions(opts);
	    return getSearch(path)
	        .split('&')
	        .reduce(function (params, param) {
	        var _a = param.split('='), rawName = _a[0], value = _a[1];
	        var _b = parseName(rawName), hasBrackets = _b.hasBrackets, name = _b.name;
	        var currentValue = params[name];
	        var decodedValue = decode(value, options);
	        if (currentValue === undefined) {
	            params[name] = hasBrackets ? [decodedValue] : decodedValue;
	        }
	        else {
	            params[name] = [].concat(currentValue, decodedValue);
	        }
	        return params;
	    }, {});
	};
	/**
	 * Build a querystring from an object of parameters
	 */
	var build = function (params, opts) {
	    var options = makeOptions(opts);
	    return Object.keys(params)
	        .filter(function (paramName) { return isSerialisable(params[paramName]); })
	        .map(function (paramName) { return encode(paramName, params[paramName], options); })
	        .filter(Boolean)
	        .join('&');
	};
	/**
	 * Remove a list of parameters from a querystring
	 */
	var omit = function (path, paramsToOmit, opts) {
	    var options = makeOptions(opts);
	    var searchPart = getSearch(path);
	    if (searchPart === '') {
	        return {
	            querystring: '',
	            removedParams: {}
	        };
	    }
	    var _a = path.split('&').reduce(function (_a, chunk) {
	        var left = _a[0], right = _a[1];
	        var rawName = chunk.split('=')[0];
	        var name = parseName(rawName).name;
	        return paramsToOmit.indexOf(name) === -1
	            ? [left.concat(chunk), right]
	            : [left, right.concat(chunk)];
	    }, [[], []]), kept = _a[0], removed = _a[1];
	    return {
	        querystring: kept.join('&'),
	        removedParams: parse(removed.join('&'), options)
	    };
	};
	/**
	 * Remove a list of parameters from a querystring
	 */
	var keep = function (path, paramsToKeep, opts) {
	    var options = makeOptions(opts);
	    var searchPart = getSearch(path);
	    if (searchPart === '') {
	        return {
	            keptParams: {},
	            querystring: ''
	        };
	    }
	    var _a = path.split('&').reduce(function (_a, chunk) {
	        var left = _a[0], right = _a[1];
	        var rawName = chunk.split('=')[0];
	        var name = parseName(rawName).name;
	        return paramsToKeep.indexOf(name) >= 0
	            ? [left.concat(chunk), right]
	            : [left, right.concat(chunk)];
	    }, [[], []]), kept = _a[0], removed = _a[1];
	    return {
	        keptParams: parse(kept.join('&'), options),
	        querystring: kept.join('&')
	    };
	};

	exports.parse = parse;
	exports.build = build;
	exports.omit = omit;
	exports.keep = keep;
	});

	unwrapExports(cjs);
	var cjs_1 = cjs.parse;
	var cjs_2 = cjs.build;
	var cjs_3 = cjs.omit;
	var cjs_4 = cjs.keep;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign = Object.assign || function __assign(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	    }
	    return t;
	};

	var defaultOrConstrained = function (match) {
	    return '(' +
	        (match ? match.replace(/(^<|>$)/g, '') : "[a-zA-Z0-9-_.~%':|=+]+") +
	        ')';
	};
	var rules = [
	    {
	        name: 'url-parameter',
	        pattern: /^:([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	        regex: function (match) {
	            return new RegExp(defaultOrConstrained(match[2]));
	        }
	    },
	    {
	        name: 'url-parameter-splat',
	        pattern: /^\*([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/,
	        regex: /([^?]*)/
	    },
	    {
	        name: 'url-parameter-matrix',
	        pattern: /^;([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	        regex: function (match) {
	            return new RegExp(';' + match[1] + '=' + defaultOrConstrained(match[2]));
	        }
	    },
	    {
	        name: 'query-parameter',
	        pattern: /^(?:\?|&)(?::)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/
	    },
	    {
	        name: 'delimiter',
	        pattern: /^(\/|\?)/,
	        regex: function (match) { return new RegExp('\\' + match[0]); }
	    },
	    {
	        name: 'sub-delimiter',
	        pattern: /^(!|&|-|_|\.|;)/,
	        regex: function (match) { return new RegExp(match[0]); }
	    },
	    {
	        name: 'fragment',
	        pattern: /^([0-9a-zA-Z]+)/,
	        regex: function (match) { return new RegExp(match[0]); }
	    }
	];

	var tokenise = function (str, tokens) {
	    if (tokens === void 0) { tokens = []; }
	    // Look for a matching rule
	    var matched = rules.some(function (rule) {
	        var match = str.match(rule.pattern);
	        if (!match) {
	            return false;
	        }
	        tokens.push({
	            type: rule.name,
	            match: match[0],
	            val: match.slice(1, 2),
	            otherVal: match.slice(2),
	            regex: rule.regex instanceof Function ? rule.regex(match) : rule.regex
	        });
	        if (match[0].length < str.length) {
	            tokens = tokenise(str.substr(match[0].length), tokens);
	        }
	        return true;
	    });
	    // If no rules matched, throw an error (possible malformed path)
	    if (!matched) {
	        throw new Error("Could not parse path '" + str + "'");
	    }
	    return tokens;
	};

	var identity = function (_) { return _; };
	var exists = function (val) { return val !== undefined && val !== null; };
	var optTrailingSlash = function (source, strictTrailingSlash) {
	    if (strictTrailingSlash) {
	        return source;
	    }
	    if (source === '\\/') {
	        return source;
	    }
	    return source.replace(/\\\/$/, '') + '(?:\\/)?';
	};
	var upToDelimiter = function (source, delimiter) {
	    if (!delimiter) {
	        return source;
	    }
	    return /(\/)$/.test(source) ? source : source + '(\\/|\\?|\\.|;|$)';
	};
	var appendQueryParam = function (params, param, val) {
	    if (val === void 0) { val = ''; }
	    var existingVal = params[param];
	    if (existingVal === undefined) {
	        params[param] = val;
	    }
	    else {
	        params[param] = Array.isArray(existingVal)
	            ? existingVal.concat(val)
	            : [existingVal, val];
	    }
	    return params;
	};
	var Path = /** @class */ (function () {
	    function Path(path) {
	        if (!path) {
	            throw new Error('Missing path in Path constructor');
	        }
	        this.path = path;
	        this.tokens = tokenise(path);
	        this.hasUrlParams =
	            this.tokens.filter(function (t) { return /^url-parameter/.test(t.type); }).length > 0;
	        this.hasSpatParam =
	            this.tokens.filter(function (t) { return /splat$/.test(t.type); }).length > 0;
	        this.hasMatrixParams =
	            this.tokens.filter(function (t) { return /matrix$/.test(t.type); }).length > 0;
	        this.hasQueryParams =
	            this.tokens.filter(function (t) { return /^query-parameter/.test(t.type); }).length > 0;
	        // Extract named parameters from tokens
	        this.spatParams = this.getParams('url-parameter-splat');
	        this.urlParams = this.getParams(/^url-parameter/);
	        // Query params
	        this.queryParams = this.getParams('query-parameter');
	        // All params
	        this.params = this.urlParams.concat(this.queryParams);
	        // Check if hasQueryParams
	        // Regular expressions for url part only (full and partial match)
	        this.source = this.tokens
	            .filter(function (t) { return t.regex !== undefined; })
	            .map(function (r) { return r.regex.source; })
	            .join('');
	    }
	    Path.createPath = function (path) {
	        return new Path(path);
	    };
	    Path.prototype.isQueryParam = function (name) {
	        return this.queryParams.indexOf(name) !== -1;
	    };
	    Path.prototype.test = function (path, opts) {
	        var _this = this;
	        var options = __assign({ strictTrailingSlash: false, queryParams: {} }, opts);
	        // trailingSlash: falsy => non optional, truthy => optional
	        var source = optTrailingSlash(this.source, options.strictTrailingSlash);
	        // Check if exact match
	        var match = this.urlTest(path, source + (this.hasQueryParams ? '(\\?.*$|$)' : '$'), opts);
	        // If no match, or no query params, no need to go further
	        if (!match || !this.hasQueryParams) {
	            return match;
	        }
	        // Extract query params
	        var queryParams = cjs_1(path, options.queryParams);
	        var unexpectedQueryParams = Object.keys(queryParams).filter(function (p) { return !_this.isQueryParam(p); });
	        if (unexpectedQueryParams.length === 0) {
	            // Extend url match
	            Object.keys(queryParams).forEach(function (p) { return (match[p] = queryParams[p]); });
	            return match;
	        }
	        return null;
	    };
	    Path.prototype.partialTest = function (path, opts) {
	        var _this = this;
	        var options = __assign({ delimited: true, queryParams: {} }, opts);
	        // Check if partial match (start of given path matches regex)
	        // trailingSlash: falsy => non optional, truthy => optional
	        var source = upToDelimiter(this.source, options.delimited);
	        var match = this.urlTest(path, source, options);
	        if (!match) {
	            return match;
	        }
	        if (!this.hasQueryParams) {
	            return match;
	        }
	        var queryParams = cjs_1(path, options.queryParams);
	        Object.keys(queryParams)
	            .filter(function (p) { return _this.isQueryParam(p); })
	            .forEach(function (p) { return appendQueryParam(match, p, queryParams[p]); });
	        return match;
	    };
	    Path.prototype.build = function (params, opts) {
	        var _this = this;
	        if (params === void 0) { params = {}; }
	        var options = __assign({ ignoreConstraints: false, ignoreSearch: false, queryParams: {} }, opts);
	        var encodedUrlParams = Object.keys(params)
	            .filter(function (p) { return !_this.isQueryParam(p); })
	            .reduce(function (acc, key) {
	            if (!exists(params[key])) {
	                return acc;
	            }
	            var val = params[key];
	            var encode = _this.isQueryParam(key) ? identity : encodeURI;
	            if (typeof val === 'boolean') {
	                acc[key] = val;
	            }
	            else if (Array.isArray(val)) {
	                acc[key] = val.map(encode);
	            }
	            else {
	                acc[key] = encode(val);
	            }
	            return acc;
	        }, {});
	        // Check all params are provided (not search parameters which are optional)
	        if (this.urlParams.some(function (p) { return !exists(params[p]); })) {
	            var missingParameters = this.urlParams.filter(function (p) { return !exists(params[p]); });
	            throw new Error("Cannot build path: '" +
	                this.path +
	                "' requires missing parameters { " +
	                missingParameters.join(', ') +
	                ' }');
	        }
	        // Check constraints
	        if (!options.ignoreConstraints) {
	            var constraintsPassed = this.tokens
	                .filter(function (t) {
	                return /^url-parameter/.test(t.type) && !/-splat$/.test(t.type);
	            })
	                .every(function (t) {
	                return new RegExp('^' + defaultOrConstrained(t.otherVal[0]) + '$').test(encodedUrlParams[t.val]);
	            });
	            if (!constraintsPassed) {
	                throw new Error("Some parameters of '" + this.path + "' are of invalid format");
	            }
	        }
	        var base = this.tokens
	            .filter(function (t) { return /^query-parameter/.test(t.type) === false; })
	            .map(function (t) {
	            if (t.type === 'url-parameter-matrix') {
	                return ";" + t.val + "=" + encodedUrlParams[t.val[0]];
	            }
	            return /^url-parameter/.test(t.type)
	                ? encodedUrlParams[t.val[0]]
	                : t.match;
	        })
	            .join('');
	        if (options.ignoreSearch) {
	            return base;
	        }
	        var searchParams = this.queryParams
	            .filter(function (p) { return Object.keys(params).indexOf(p) !== -1; })
	            .reduce(function (sparams, paramName) {
	            sparams[paramName] = params[paramName];
	            return sparams;
	        }, {});
	        var searchPart = cjs_2(searchParams, options.queryParams);
	        return searchPart ? base + '?' + searchPart : base;
	    };
	    Path.prototype.getParams = function (type) {
	        var predicate = type instanceof RegExp
	            ? function (t) { return type.test(t.type); }
	            : function (t) { return t.type === type; };
	        return this.tokens.filter(predicate).map(function (t) { return t.val[0]; });
	    };
	    Path.prototype.urlTest = function (path, source, _a) {
	        var _this = this;
	        var _b = (_a === void 0 ? {} : _a).caseSensitive, caseSensitive = _b === void 0 ? false : _b;
	        var regex = new RegExp('^' + source, caseSensitive ? '' : 'i');
	        var match = path.match(regex);
	        if (!match) {
	            return null;
	        }
	        else if (!this.urlParams.length) {
	            return {};
	        }
	        // Reduce named params to key-value pairs
	        return match
	            .slice(1, this.urlParams.length + 1)
	            .reduce(function (params, m, i) {
	            params[_this.urlParams[i]] = decodeURIComponent(m);
	            return params;
	        }, {});
	    };
	    return Path;
	}());

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign$1 = Object.assign || function __assign(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	    }
	    return t;
	};

	var getMetaFromSegments = function (segments) {
	    var accName = '';
	    return segments.reduce(function (meta, segment) {
	        var urlParams = segment.parser.urlParams.reduce(function (params, p) {
	            params[p] = 'url';
	            return params;
	        }, {});
	        var allParams = segment.parser.queryParams.reduce(function (params, p) {
	            params[p] = 'query';
	            return params;
	        }, urlParams);
	        if (segment.name !== undefined) {
	            accName = accName ? accName + '.' + segment.name : segment.name;
	            meta[accName] = allParams;
	        }
	        return meta;
	    }, {});
	};
	var buildStateFromMatch = function (match) {
	    if (!match || !match.segments || !match.segments.length) {
	        return null;
	    }
	    var name = match.segments
	        .map(function (segment) { return segment.name; })
	        .filter(function (name) { return name; })
	        .join('.');
	    var params = match.params;
	    return {
	        name: name,
	        params: params,
	        meta: getMetaFromSegments(match.segments)
	    };
	};
	var buildPathFromSegments = function (segments, params, options) {
	    if (params === void 0) { params = {}; }
	    if (options === void 0) { options = {}; }
	    if (!segments) {
	        return null;
	    }
	    var _a = options.queryParamsMode, queryParamsMode = _a === void 0 ? 'default' : _a, _b = options.trailingSlashMode;
	    var searchParams = [];
	    var nonSearchParams = [];
	    for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
	        var segment = segments_1[_i];
	        var parser = segment.parser;
	        searchParams.push.apply(searchParams, parser.queryParams);
	        nonSearchParams.push.apply(nonSearchParams, parser.urlParams);
	        nonSearchParams.push.apply(nonSearchParams, parser.spatParams);
	    }
	    if (queryParamsMode === 'loose') {
	        var extraParams = Object.keys(params).reduce(function (acc, p) {
	            return searchParams.indexOf(p) === -1 &&
	                nonSearchParams.indexOf(p) === -1
	                ? acc.concat(p)
	                : acc;
	        }, []);
	        searchParams.push.apply(searchParams, extraParams);
	    }
	    var searchParamsObject = searchParams.reduce(function (acc, paramName) {
	        if (Object.keys(params).indexOf(paramName) !== -1) {
	            acc[paramName] = params[paramName];
	        }
	        return acc;
	    }, {});
	    var searchPart = cjs_2(searchParamsObject, options.queryParams);
	    var path = segments
	        .reduce(function (path, segment) {
	        var segmentPath = segment.parser.build(params, {
	            ignoreSearch: true,
	            queryParams: options.queryParams
	        });
	        return segment.absolute ? segmentPath : path + segmentPath;
	    }, '')
	        .replace(/\/\/{1,}/g, '/');
	    var finalPath = path;
	    if (options.trailingSlashMode === 'always') {
	        finalPath = /\/$/.test(path) ? path : path + "/";
	    }
	    else if (options.trailingSlashMode === 'never' && path !== '/') {
	        finalPath = /\/$/.test(path) ? path.slice(0, -1) : path;
	    }
	    return finalPath + (searchPart ? '?' + searchPart : '');
	};
	var getPathFromSegments = function (segments) {
	    return segments ? segments.map(function (segment) { return segment.path; }).join('') : null;
	};

	var getPath = function (path) { return path.split('?')[0]; };
	var getSearch = function (path) { return path.split('?')[1] || ''; };
	var matchChildren = function (nodes, pathSegment, currentMatch, options, consumedBefore) {
	    if (options === void 0) { options = {}; }
	    var _a = options.queryParamsMode, queryParamsMode = _a === void 0 ? 'default' : _a, _b = options.strictTrailingSlash, strictTrailingSlash = _b === void 0 ? false : _b, _c = options.strongMatching, strongMatching = _c === void 0 ? true : _c, _d = options.caseSensitive, caseSensitive = _d === void 0 ? false : _d;
	    var isRoot = nodes.length === 1 && nodes[0].name === '';
	    var _loop_1 = function (child) {
	        // Partially match path
	        var match;
	        var remainingPath = void 0;
	        var segment = pathSegment;
	        if (consumedBefore === '/' && child.path === '/') {
	            // when we encounter repeating slashes we add the slash
	            // back to the URL to make it de facto pathless
	            segment = '/' + pathSegment;
	        }
	        if (!child.children.length) {
	            match = child.parser.test(segment, {
	                caseSensitive: caseSensitive,
	                strictTrailingSlash: strictTrailingSlash,
	                queryParams: options.queryParams
	            });
	        }
	        if (!match) {
	            match = child.parser.partialTest(segment, {
	                delimited: strongMatching,
	                caseSensitive: caseSensitive
	            });
	        }
	        if (match) {
	            // Remove consumed segment from path
	            var consumedPath = child.parser.build(match, {
	                ignoreSearch: true
	            });
	            if (!strictTrailingSlash && !child.children.length) {
	                consumedPath = consumedPath.replace(/\/$/, '');
	            }
	            remainingPath = segment.replace(new RegExp('^' + consumedPath, 'i'), '');
	            if (!strictTrailingSlash && !child.children.length) {
	                remainingPath = remainingPath.replace(/^\/\?/, '?');
	            }
	            var querystring = cjs_3(getSearch(segment.replace(consumedPath, '')), child.parser.queryParams, options.queryParams).querystring;
	            remainingPath =
	                getPath(remainingPath) + (querystring ? "?" + querystring : '');
	            if (!strictTrailingSlash &&
	                !isRoot &&
	                remainingPath === '/' &&
	                !/\/$/.test(consumedPath)) {
	                remainingPath = '';
	            }
	            currentMatch.segments.push(child);
	            Object.keys(match).forEach(function (param) { return (currentMatch.params[param] = match[param]); });
	            if (!isRoot && !remainingPath.length) {
	                return { value: currentMatch };
	            }
	            if (!isRoot &&
	                queryParamsMode !== 'strict' &&
	                remainingPath.indexOf('?') === 0) {
	                // unmatched queryParams in non strict mode
	                var remainingQueryParams_1 = cjs_1(remainingPath.slice(1), options.queryParams);
	                Object.keys(remainingQueryParams_1).forEach(function (name) {
	                    return (currentMatch.params[name] = remainingQueryParams_1[name]);
	                });
	                return { value: currentMatch };
	            }
	            // Continue matching on non absolute children
	            var children = child.getNonAbsoluteChildren();
	            // If no children to match against but unmatched path left
	            if (!children.length) {
	                return { value: null };
	            }
	            return { value: matchChildren(children, remainingPath, currentMatch, options, consumedPath) };
	        }
	    };
	    // for (child of node.children) {
	    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
	        var child = nodes_1[_i];
	        var state_1 = _loop_1(child);
	        if (typeof state_1 === "object")
	            return state_1.value;
	    }
	    return null;
	};

	var sortChildren = (function (originalChildren) { return function (left, right) {
	    var leftPath = left.path
	        .replace(/<.*?>/g, '')
	        .split('?')[0]
	        .replace(/(.+)\/$/, '$1');
	    var rightPath = right.path
	        .replace(/<.*?>/g, '')
	        .split('?')[0]
	        .replace(/(.+)\/$/, '$1');
	    // '/' last
	    if (leftPath === '/') {
	        return 1;
	    }
	    if (rightPath === '/') {
	        return -1;
	    }
	    // Spat params last
	    if (left.parser.hasSpatParam) {
	        return 1;
	    }
	    if (right.parser.hasSpatParam) {
	        return -1;
	    }
	    // No spat, number of segments (less segments last)
	    var leftSegments = (leftPath.match(/\//g) || []).length;
	    var rightSegments = (rightPath.match(/\//g) || []).length;
	    if (leftSegments < rightSegments) {
	        return 1;
	    }
	    if (leftSegments > rightSegments) {
	        return -1;
	    }
	    // Same number of segments, number of URL params ascending
	    var leftParamsCount = left.parser.urlParams.length;
	    var rightParamsCount = right.parser.urlParams.length;
	    if (leftParamsCount < rightParamsCount) {
	        return -1;
	    }
	    if (leftParamsCount > rightParamsCount) {
	        return 1;
	    }
	    // Same number of segments and params, last segment length descending
	    var leftParamLength = (leftPath.split('/').slice(-1)[0] || '').length;
	    var rightParamLength = (rightPath.split('/').slice(-1)[0] || '').length;
	    if (leftParamLength < rightParamLength) {
	        return 1;
	    }
	    if (leftParamLength > rightParamLength) {
	        return -1;
	    }
	    // Same last segment length, preserve definition order. Note that we
	    // cannot just return 0, as sort is not guaranteed to be a stable sort.
	    return originalChildren.indexOf(left) - originalChildren.indexOf(right);
	}; });

	var defaultBuildOptions = {
	    queryParamsMode: 'default',
	    trailingSlashMode: 'default'
	};
	var defaultMatchOptions = __assign$1({}, defaultBuildOptions, { strongMatching: true });
	var RouteNode = /** @class */ (function () {
	    function RouteNode(name, path, childRoutes, cb, parent) {
	        if (name === void 0) { name = ''; }
	        if (path === void 0) { path = ''; }
	        if (childRoutes === void 0) { childRoutes = []; }
	        this.name = name;
	        this.absolute = /^~/.test(path);
	        this.path = this.absolute ? path.slice(1) : path;
	        this.parser = this.path ? new Path(this.path) : null;
	        this.children = [];
	        this.parent = parent;
	        this.checkParents();
	        this.add(childRoutes, cb);
	        return this;
	    }
	    RouteNode.prototype.getParentSegments = function (segments) {
	        if (segments === void 0) { segments = []; }
	        return this.parent && this.parent.parser
	            ? this.parent.getParentSegments(segments.concat(this.parent))
	            : segments.reverse();
	    };
	    RouteNode.prototype.setParent = function (parent) {
	        this.parent = parent;
	        this.checkParents();
	    };
	    RouteNode.prototype.setPath = function (path) {
	        if (path === void 0) { path = ''; }
	        this.path = path;
	        this.parser = path ? new Path(path) : null;
	    };
	    RouteNode.prototype.add = function (route, cb) {
	        var _this = this;
	        if (route === undefined || route === null) {
	            return;
	        }
	        if (route instanceof Array) {
	            route.forEach(function (r) { return _this.add(r, cb); });
	            return;
	        }
	        if (!(route instanceof RouteNode) && !(route instanceof Object)) {
	            throw new Error('RouteNode.add() expects routes to be an Object or an instance of RouteNode.');
	        }
	        else if (route instanceof RouteNode) {
	            route.setParent(this);
	            this.addRouteNode(route);
	        }
	        else {
	            if (!route.name || !route.path) {
	                throw new Error('RouteNode.add() expects routes to have a name and a path defined.');
	            }
	            var routeNode = new RouteNode(route.name, route.path, route.children, cb, this);
	            var fullName = routeNode
	                .getParentSegments([routeNode])
	                .map(function (_) { return _.name; })
	                .join('.');
	            if (cb) {
	                cb(__assign$1({}, route, { name: fullName }));
	            }
	            this.addRouteNode(routeNode);
	        }
	        return this;
	    };
	    RouteNode.prototype.addNode = function (name, path) {
	        this.add(new RouteNode(name, path));
	        return this;
	    };
	    RouteNode.prototype.getPath = function (routeName) {
	        return getPathFromSegments(this.getSegmentsByName(routeName));
	    };
	    RouteNode.prototype.getNonAbsoluteChildren = function () {
	        return this.children.filter(function (child) { return !child.absolute; });
	    };
	    RouteNode.prototype.buildPath = function (routeName, params, options) {
	        if (params === void 0) { params = {}; }
	        if (options === void 0) { options = {}; }
	        var path = buildPathFromSegments(this.getSegmentsByName(routeName), params, options);
	        return path;
	    };
	    RouteNode.prototype.buildState = function (name, params) {
	        if (params === void 0) { params = {}; }
	        var segments = this.getSegmentsByName(name);
	        if (!segments || !segments.length) {
	            return null;
	        }
	        return {
	            name: name,
	            params: params,
	            meta: getMetaFromSegments(segments)
	        };
	    };
	    RouteNode.prototype.matchPath = function (path, options) {
	        if (options === void 0) { options = {}; }
	        if (path === '' && !options.strictTrailingSlash) {
	            path = '/';
	        }
	        var match = this.getSegmentsMatchingPath(path, options);
	        if (match) {
	            var matchedSegments = match.segments;
	            if (matchedSegments[0].absolute) {
	                var firstSegmentParams = matchedSegments[0].getParentSegments();
	                matchedSegments.reverse();
	                matchedSegments.push.apply(matchedSegments, firstSegmentParams);
	                matchedSegments.reverse();
	            }
	            var lastSegment = matchedSegments[matchedSegments.length - 1];
	            var lastSegmentSlashChild = lastSegment.findSlashChild();
	            if (lastSegmentSlashChild) {
	                matchedSegments.push(lastSegmentSlashChild);
	            }
	        }
	        return buildStateFromMatch(match);
	    };
	    RouteNode.prototype.addRouteNode = function (route, cb) {
	        var names = route.name.split('.');
	        if (names.length === 1) {
	            // Check duplicated routes
	            if (this.children.map(function (child) { return child.name; }).indexOf(route.name) !==
	                -1) {
	                throw new Error("Alias \"" + route.name + "\" is already defined in route node");
	            }
	            // Check duplicated paths
	            if (this.children.map(function (child) { return child.path; }).indexOf(route.path) !==
	                -1) {
	                throw new Error("Path \"" + route.path + "\" is already defined in route node");
	            }
	            this.children.push(route);
	            // Push greedy spats to the bottom of the pile
	            var originalChildren = this.children.slice(0);
	            this.children.sort(sortChildren(originalChildren));
	        }
	        else {
	            // Locate parent node
	            var segments = this.getSegmentsByName(names.slice(0, -1).join('.'));
	            if (segments) {
	                route.name = names[names.length - 1];
	                segments[segments.length - 1].add(route);
	            }
	            else {
	                throw new Error("Could not add route named '" + route.name + "', parent is missing.");
	            }
	        }
	        return this;
	    };
	    RouteNode.prototype.checkParents = function () {
	        if (this.absolute && this.hasParentsParams()) {
	            throw new Error('[RouteNode] A RouteNode with an abolute path cannot have parents with route parameters');
	        }
	    };
	    RouteNode.prototype.hasParentsParams = function () {
	        if (this.parent && this.parent.parser) {
	            var parser = this.parent.parser;
	            var hasParams = parser.hasUrlParams ||
	                parser.hasSpatParam ||
	                parser.hasMatrixParams ||
	                parser.hasQueryParams;
	            return hasParams || this.parent.hasParentsParams();
	        }
	        return false;
	    };
	    RouteNode.prototype.findAbsoluteChildren = function () {
	        return this.children.reduce(function (absoluteChildren, child) {
	            return absoluteChildren
	                .concat(child.absolute ? child : [])
	                .concat(child.findAbsoluteChildren());
	        }, []);
	    };
	    RouteNode.prototype.findSlashChild = function () {
	        var slashChildren = this.getNonAbsoluteChildren().filter(function (child) { return child.parser && /^\/(\?|$)/.test(child.parser.path); });
	        return slashChildren[0];
	    };
	    RouteNode.prototype.getSegmentsByName = function (routeName) {
	        var findSegmentByName = function (name, routes) {
	            var filteredRoutes = routes.filter(function (r) { return r.name === name; });
	            return filteredRoutes.length ? filteredRoutes[0] : undefined;
	        };
	        var segments = [];
	        var routes = this.parser ? [this] : this.children;
	        var names = (this.parser ? [''] : []).concat(routeName.split('.'));
	        var matched = names.every(function (name) {
	            var segment = findSegmentByName(name, routes);
	            if (segment) {
	                routes = segment.children;
	                segments.push(segment);
	                return true;
	            }
	            return false;
	        });
	        return matched ? segments : null;
	    };
	    RouteNode.prototype.getSegmentsMatchingPath = function (path, options) {
	        var topLevelNodes = this.parser ? [this] : this.children;
	        var startingNodes = topLevelNodes.reduce(function (nodes, node) { return nodes.concat(node, node.findAbsoluteChildren()); }, []);
	        var currentMatch = {
	            segments: [],
	            params: {}
	        };
	        var finalMatch = matchChildren(startingNodes, path, currentMatch, options);
	        if (finalMatch &&
	            finalMatch.segments.length === 1 &&
	            finalMatch.segments[0].name === '') {
	            return null;
	        }
	        return finalMatch;
	    };
	    return RouteNode;
	}());

	var errorCodes = {
	    ROUTER_NOT_STARTED: 'NOT_STARTED',
	    NO_START_PATH_OR_STATE: 'NO_START_PATH_OR_STATE',
	    ROUTER_ALREADY_STARTED: 'ALREADY_STARTED',
	    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
	    SAME_STATES: 'SAME_STATES',
	    CANNOT_DEACTIVATE: 'CANNOT_DEACTIVATE',
	    CANNOT_ACTIVATE: 'CANNOT_ACTIVATE',
	    TRANSITION_ERR: 'TRANSITION_ERR',
	    TRANSITION_CANCELLED: 'CANCELLED'
	};

	var constants = {
	    UNKNOWN_ROUTE: '@@router5/UNKNOWN_ROUTE',
	    ROUTER_START: '$start',
	    ROUTER_STOP: '$stop',
	    TRANSITION_START: '$$start',
	    TRANSITION_CANCEL: '$$cancel',
	    TRANSITION_SUCCESS: '$$success',
	    TRANSITION_ERROR: '$$error'
	};

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function withUtils(router) {
	    router.isActive = isActive;
	    router.areStatesEqual = areStatesEqual;
	    router.areStatesDescendants = areStatesDescendants;
	    router.buildPath = buildPath;
	    router.buildState = buildState;
	    router.matchPath = matchPath;
	    router.setRootPath = setRootPath;

	    /**
	     * Check if a route is currently active
	     * @param  {String}  name                     The route name
	     * @param  {Object}  params                   The route params
	     * @param  {Boolean} [strictEquality=false]   Whether to check if the given route is the active route, or part of the active route
	     * @param  {Boolean} [ignoreQueryParams=true] Whether to ignore query parameters
	     * @return {Boolean}                          Whether the given route is active
	     */
	    function isActive(name) {
	        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        var strictEquality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	        var ignoreQueryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	        var activeState = router.getState();

	        if (!activeState) return false;

	        if (strictEquality || activeState.name === name) {
	            return areStatesEqual(router.makeState(name, params), activeState, ignoreQueryParams);
	        }

	        return areStatesDescendants(router.makeState(name, params), activeState);
	    }

	    /**
	     * Compare two route state objects
	     * @param  {Object}  state1            The route state
	     * @param  {Object}  state2            The other route state
	     * @param  {Boolean} ignoreQueryParams Whether to ignore query parameters or not
	     * @return {Boolean}                   Whether the two route state are equal or not
	     */
	    function areStatesEqual(state1, state2) {
	        var ignoreQueryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	        if (state1.name !== state2.name) return false;

	        var getUrlParams = function getUrlParams(name) {
	            return router.rootNode.getSegmentsByName(name).map(function (segment) {
	                return segment.parser['urlParams'];
	            }).reduce(function (params, p) {
	                return params.concat(p);
	            }, []);
	        };

	        var state1Params = ignoreQueryParams ? getUrlParams(state1.name) : Object.keys(state1.params);
	        var state2Params = ignoreQueryParams ? getUrlParams(state2.name) : Object.keys(state2.params);

	        return state1Params.length === state2Params.length && state1Params.every(function (p) {
	            return state1.params[p] === state2.params[p];
	        });
	    }

	    /**
	     * Check if two states are related
	     * @param  {State} parentState  The parent state
	     * @param  {State} childState   The child state
	     * @return {Boolean}            Whether the two states are descendants or not
	     */
	    function areStatesDescendants(parentState, childState) {
	        var regex = new RegExp('^' + parentState.name + '\\.(.*)$');
	        if (!regex.test(childState.name)) return false;
	        // If child state name extends parent state name, and all parent state params
	        // are in child state params.
	        return Object.keys(parentState.params).every(function (p) {
	            return parentState.params[p] === childState.params[p];
	        });
	    }

	    /**
	     * Build a path
	     * @param  {String} route  The route name
	     * @param  {Object} params The route params
	     * @return {String}        The path
	     */
	    function buildPath(route, params) {
	        if (route === constants.UNKNOWN_ROUTE) {
	            return params.path;
	        }

	        var _router$getOptions = router.getOptions(),
	            trailingSlashMode = _router$getOptions.trailingSlashMode,
	            queryParamsMode = _router$getOptions.queryParamsMode,
	            queryParams = _router$getOptions.queryParams;

	        var encodedParams = router.config.encoders[route] ? router.config.encoders[route](params) : params;

	        return router.rootNode.buildPath(route, encodedParams, {
	            trailingSlashMode: trailingSlashMode,
	            queryParamsMode: queryParamsMode,
	            queryParams: queryParams
	        });
	    }

	    function forwardState(routeName, routeParams) {
	        var name = router.config.forwardMap[routeName] || routeName;
	        var params = _extends({}, router.config.defaultParams[routeName], router.config.defaultParams[name], routeParams);

	        return {
	            name: name,
	            params: params
	        };
	    }

	    function buildState(routeName, routeParams) {
	        var _forwardState = forwardState(routeName, routeParams),
	            name = _forwardState.name,
	            params = _forwardState.params;

	        return router.rootNode.buildState(name, params);
	    }

	    /**
	     * Match a path
	     * @param  {String} path     The path to match
	     * @param  {String} [source] The source (optional, used internally)
	     * @return {Object}          The matched state (null if unmatched)
	     */
	    function matchPath(path, source) {
	        var options = router.getOptions();
	        var match = router.rootNode.matchPath(path, options);

	        if (match) {
	            var name = match.name,
	                params = match.params,
	                meta = match.meta;

	            var decodedParams = router.config.decoders[name] ? router.config.decoders[name](params) : params;

	            var _forwardState2 = forwardState(name, decodedParams),
	                routeName = _forwardState2.name,
	                routeParams = _forwardState2.params;

	            var builtPath = options.rewritePathOnMatch === false ? path : router.buildPath(routeName, routeParams);

	            return router.makeState(routeName, routeParams, builtPath, {
	                params: meta,
	                source: source
	            });
	        }

	        return null;
	    }

	    /**
	     * Set the root node path, use carefully. It can be used to set app-wide allowed query parameters.
	     * @param {String} rootPath The root node path
	     */
	    function setRootPath(rootPath) {
	        router.rootNode.setPath(rootPath);
	    }
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var noop = function noop() {};

	function withRouterLifecycle(router) {
	    var started = false;

	    router.isStarted = isStarted;
	    router.start = start;
	    router.stop = stop;

	    /**
	     * Check if the router is started
	     * @return {Boolean} Whether the router is started or not
	     */
	    function isStarted() {
	        return started;
	    }

	    /**
	     * Start the router
	     * @param  {String|Object} startPathOrState The start path or state. This is optional when using the browser plugin.
	     * @param  {Function}      done             A done node style callback (err, state)
	     * @return {Object}                         The router instance
	     */
	    function start() {
	        var _ref;

	        var options = router.getOptions();
	        var lastArg = (_ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref]);
	        var done = typeof lastArg === 'function' ? lastArg : noop;
	        var startPathOrState = typeof (arguments.length <= 0 ? undefined : arguments[0]) !== 'function' ? arguments.length <= 0 ? undefined : arguments[0] : undefined;

	        if (started) {
	            done({ code: errorCodes.ROUTER_ALREADY_STARTED });
	            return router;
	        }

	        var startPath = void 0,
	            startState = void 0;

	        started = true;
	        router.invokeEventListeners(constants.ROUTER_START);

	        // callback
	        var cb = function cb(err, state) {
	            var invokeErrCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	            if (!err) router.invokeEventListeners(constants.TRANSITION_SUCCESS, state, null, { replace: true });
	            if (err && invokeErrCb) router.invokeEventListeners(constants.TRANSITION_ERROR, state, null, err);
	            done(err, state);
	        };

	        if (startPathOrState === undefined && !options.defaultRoute) {
	            return cb({ code: errorCodes.NO_START_PATH_OR_STATE });
	        }
	        if (typeof startPathOrState === 'string') {
	            startPath = startPathOrState;
	        } else if ((typeof startPathOrState === 'undefined' ? 'undefined' : _typeof(startPathOrState)) === 'object') {
	            startState = startPathOrState;
	        }

	        if (!startState) {
	            // If no supplied start state, get start state
	            startState = startPath === undefined ? null : router.matchPath(startPath);

	            // Navigate to default function
	            var navigateToDefault = function navigateToDefault() {
	                return router.navigateToDefault({ replace: true }, done);
	            };
	            var redirect = function redirect(route) {
	                return router.navigate(route.name, route.params, { replace: true, reload: true, redirected: true }, done);
	            };
	            var transitionToState = function transitionToState(state) {
	                router.transitionToState(state, router.getState(), {}, function (err, state) {
	                    if (!err) cb(null, state);else if (err.redirect) redirect(err.redirect);else if (options.defaultRoute) navigateToDefault();else cb(err, null, false);
	                });
	            };

	            // If matched start path
	            if (startState) {
	                transitionToState(startState);
	            } else if (options.defaultRoute) {
	                // If default, navigate to default
	                navigateToDefault();
	            } else if (options.allowNotFound) {
	                transitionToState(router.makeNotFoundState(startPath, { replace: true }));
	            } else {
	                // No start match, no default => do nothing
	                cb({ code: errorCodes.ROUTE_NOT_FOUND, path: startPath }, null);
	            }
	        } else {
	            // Initialise router with provided start state
	            router.setState(startState);
	            cb(null, startState);
	        }

	        return router;
	    }

	    /**
	     * Stop the router
	     * @return {Object} The router instance
	     */
	    function stop() {
	        if (started) {
	            router.setState(null);
	            started = false;
	            router.invokeEventListeners(constants.ROUTER_STOP);
	        }

	        return router;
	    }
	}

	var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function nameToIDs(name) {
	    return name.split('.').reduce(function (ids, name) {
	        return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
	    }, []);
	}

	function exists$1(val) {
	    return val !== undefined && val !== null;
	}

	function hasMetaParams(state) {
	    return state && state.meta && state.meta.params;
	}

	function extractSegmentParams(name, state) {
	    if (!exists$1(state.meta.params[name])) return {};

	    return Object.keys(state.meta.params[name]).reduce(function (params, p) {
	        params[p] = state.params[p];
	        return params;
	    }, {});
	}

	function transitionPath(toState, fromState) {
	    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
	    var toStateIds = nameToIDs(toState.name);
	    var maxI = Math.min(fromStateIds.length, toStateIds.length);

	    function pointOfDifference() {
	        var i = void 0;

	        var _loop = function _loop() {
	            var left = fromStateIds[i];
	            var right = toStateIds[i];

	            if (left !== right) return {
	                    v: i
	                };

	            var leftParams = extractSegmentParams(left, toState);
	            var rightParams = extractSegmentParams(right, fromState);

	            if (leftParams.length !== rightParams.length) return {
	                    v: i
	                };
	            if (leftParams.length === 0) return 'continue';

	            var different = Object.keys(leftParams).some(function (p) {
	                return rightParams[p] !== leftParams[p];
	            });
	            if (different) {
	                return {
	                    v: i
	                };
	            }
	        };

	        for (i = 0; i < maxI; i += 1) {
	            var _ret = _loop();

	            switch (_ret) {
	                case 'continue':
	                    continue;

	                default:
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof$1(_ret)) === "object") return _ret.v;
	            }
	        }

	        return i;
	    }

	    var i = void 0;
	    if (!fromState) {
	        i = 0;
	    } else if (!hasMetaParams(fromState) && !hasMetaParams(toState)) {
	        i = 0;
	    } else {
	        i = pointOfDifference();
	    }

	    var toDeactivate = fromStateIds.slice(i).reverse();
	    var toActivate = toStateIds.slice(i);

	    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

	    return {
	        intersection: intersection,
	        toDeactivate: toDeactivate,
	        toActivate: toActivate
	    };
	}

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function shouldUpdateNode(nodeName) {
	    return function (toState, fromSate) {
	        var _transitionPath = transitionPath(toState, fromSate),
	            intersection = _transitionPath.intersection,
	            toActivate = _transitionPath.toActivate,
	            toDeactivateReversed = _transitionPath.toDeactivate;

	        var toDeactivate = [].concat(_toConsumableArray(toDeactivateReversed)).reverse();

	        if (nodeName === intersection) {
	            return true;
	        }

	        if (toActivate.indexOf(nodeName) === -1) {
	            return false;
	        }

	        var matching = true;

	        for (var i = 0; i < toActivate.length; i += 1) {
	            var activatedSegment = toActivate[i];
	            var sameLevelDeactivatedSegment = toDeactivate[i];

	            matching = activatedSegment === sameLevelDeactivatedSegment;

	            if (matching && activatedSegment === nodeName) {
	                return true;
	            }

	            if (!matching) {
	                return false;
	            }
	        }

	        // Should never be reached
	        return false;
	    };
	}



	var es = /*#__PURE__*/Object.freeze({
		shouldUpdateNode: shouldUpdateNode,
		nameToIDs: nameToIDs,
		default: transitionPath
	});

	var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function resolve(functions, _ref, callback) {
	    var isCancelled = _ref.isCancelled,
	        toState = _ref.toState,
	        fromState = _ref.fromState,
	        errorKey = _ref.errorKey;

	    var remainingFunctions = Array.isArray(functions) ? functions : Object.keys(functions);

	    var isState = function isState(obj) {
	        return (typeof obj === 'undefined' ? 'undefined' : _typeof$2(obj)) === 'object' && obj.name !== undefined && obj.params !== undefined && obj.path !== undefined;
	    };
	    var hasStateChanged = function hasStateChanged(toState, fromState) {
	        return fromState.name !== toState.name || fromState.params !== toState.params || fromState.path !== toState.path;
	    };

	    var mergeStates = function mergeStates(toState, fromState) {
	        return _extends$1({}, fromState, toState, {
	            meta: _extends$1({}, fromState.meta, toState.meta)
	        });
	    };

	    var processFn = function processFn(stepFn, errBase, state, _done) {
	        var done = function done(err, newState) {
	            if (err) {
	                _done(err);
	            } else if (newState && newState !== state && isState(newState)) {
	                if (hasStateChanged(newState, state)) {
	                    console.error('[router5][transition] Warning: state values (name, params, path) were changed during transition process.');
	                }

	                _done(null, mergeStates(newState, state));
	            } else {
	                _done(null, state);
	            }
	        };
	        var res = stepFn.call(null, state, fromState, done);
	        if (isCancelled()) {
	            done(null);
	        } else if (typeof res === 'boolean') {
	            done(res ? null : errBase);
	        } else if (isState(res)) {
	            done(null, res);
	        } else if (res && typeof res.then === 'function') {
	            res.then(function (resVal) {
	                if (resVal instanceof Error) done({ error: resVal }, null);else done(null, resVal);
	            }, function (err) {
	                if (err instanceof Error) {
	                    console.error(err.stack || err);
	                    done(_extends$1({}, errBase, { promiseError: err }), null);
	                } else {
	                    done((typeof err === 'undefined' ? 'undefined' : _typeof$2(err)) === 'object' ? _extends$1({}, errBase, err) : errBase, null);
	                }
	            });
	        }
	        // else: wait for done to be called
	    };

	    var next = function next(err, state) {
	        if (isCancelled()) {
	            callback();
	        } else if (err) {
	            callback(err);
	        } else {
	            if (!remainingFunctions.length) {
	                callback(null, state);
	            } else {
	                var isMapped = typeof remainingFunctions[0] === 'string';
	                var errBase = errorKey && isMapped ? _defineProperty({}, errorKey, remainingFunctions[0]) : {};
	                var stepFn = isMapped ? functions[remainingFunctions[0]] : remainingFunctions[0];

	                remainingFunctions = remainingFunctions.slice(1);

	                processFn(stepFn, errBase, state, next);
	            }
	        }
	    };

	    next(null, toState);
	}

	var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function transition(router, toState, fromState, opts, callback) {
	    var cancelled = false;
	    var completed = false;
	    var options = router.getOptions();

	    var _router$getLifecycleF = router.getLifecycleFunctions(),
	        _router$getLifecycleF2 = _slicedToArray(_router$getLifecycleF, 2),
	        canDeactivateFunctions = _router$getLifecycleF2[0],
	        canActivateFunctions = _router$getLifecycleF2[1];

	    var middlewareFunctions = router.getMiddlewareFunctions();
	    var isCancelled = function isCancelled() {
	        return cancelled;
	    };
	    var cancel = function cancel() {
	        if (!cancelled && !completed) {
	            cancelled = true;
	            callback({ code: errorCodes.TRANSITION_CANCELLED }, null);
	        }
	    };
	    var done = function done(err, state) {
	        completed = true;

	        if (isCancelled()) {
	            return;
	        }

	        if (!err && options.autoCleanUp) {
	            var activeSegments = nameToIDs(toState.name);
	            Object.keys(canDeactivateFunctions).forEach(function (name) {
	                if (activeSegments.indexOf(name) === -1) router.clearCanDeactivate(name);
	            });
	        }

	        callback(err, state || toState);
	    };
	    var makeError = function makeError(base, err) {
	        return _extends$2({}, base, err instanceof Object ? err : { error: err });
	    };

	    var isUnknownRoute = toState.name === constants.UNKNOWN_ROUTE;
	    var asyncBase = { isCancelled: isCancelled, toState: toState, fromState: fromState };

	    var _transitionPath = transitionPath(toState, fromState),
	        toDeactivate = _transitionPath.toDeactivate,
	        toActivate = _transitionPath.toActivate;

	    var canDeactivate = !fromState || opts.forceDeactivate ? [] : function (toState, fromState, cb) {
	        var canDeactivateFunctionMap = toDeactivate.filter(function (name) {
	            return canDeactivateFunctions[name];
	        }).reduce(function (fnMap, name) {
	            return _extends$2({}, fnMap, _defineProperty$1({}, name, canDeactivateFunctions[name]));
	        }, {});

	        resolve(canDeactivateFunctionMap, _extends$2({}, asyncBase, { errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: errorCodes.CANNOT_DEACTIVATE }, err) : null);
	        });
	    };

	    var canActivate = isUnknownRoute ? [] : function (toState, fromState, cb) {
	        var canActivateFunctionMap = toActivate.filter(function (name) {
	            return canActivateFunctions[name];
	        }).reduce(function (fnMap, name) {
	            return _extends$2({}, fnMap, _defineProperty$1({}, name, canActivateFunctions[name]));
	        }, {});

	        resolve(canActivateFunctionMap, _extends$2({}, asyncBase, { errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: errorCodes.CANNOT_ACTIVATE }, err) : null);
	        });
	    };

	    var middleware = !middlewareFunctions.length ? [] : function (toState, fromState, cb) {
	        return resolve(middlewareFunctions, _extends$2({}, asyncBase), function (err, state) {
	            return cb(err ? makeError({ code: errorCodes.TRANSITION_ERR }, err) : null, state || toState);
	        });
	    };

	    var pipeline = [].concat(canDeactivate).concat(canActivate).concat(middleware);

	    resolve(pipeline, asyncBase, done);

	    return cancel;
	}

	var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var noop$1 = function noop() {};

	function withNavigation(router) {
	    var cancelCurrentTransition = void 0;

	    router.config.forwardMap = {};
	    router.navigate = navigate;
	    router.navigateToDefault = navigateToDefault;
	    router.transitionToState = transitionToState;
	    router.cancel = cancel;
	    router.forward = forward;

	    /**
	     * Cancel the current transition if there is one
	     * @return {Object} The router instance
	     */
	    function cancel() {
	        if (cancelCurrentTransition) {
	            cancelCurrentTransition('navigate');
	            cancelCurrentTransition = null;
	        }

	        return router;
	    }

	    /**
	     * Forward a route to another route, when calling navigate.
	     * Route parameters for the two routes should match to avoid issues.
	     * @param  {String}   fromRoute      The route name
	     * @param  {String}   toRoute  The route params
	     */
	    function forward(fromRoute, toRoute) {
	        router.config.forwardMap[fromRoute] = toRoute;

	        return router;
	    }

	    /**
	     * Navigate to a route
	     * @param  {String}   routeName      The route name
	     * @param  {Object}   [routeParams]  The route params
	     * @param  {Object}   [options]      The navigation options (`replace`, `reload`, `skipTransition`, `force`)
	     * @param  {Function} [done]         A done node style callback (err, state)
	     * @return {Function}                A cancel function
	     */
	    function navigate() {
	        var _ref;

	        var name = arguments.length <= 0 ? undefined : arguments[0];
	        var lastArg = (_ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref]);
	        var done = typeof lastArg === 'function' ? lastArg : noop$1;
	        var params = _typeof$3(arguments.length <= 1 ? undefined : arguments[1]) === 'object' ? arguments.length <= 1 ? undefined : arguments[1] : {};
	        var opts = _typeof$3(arguments.length <= 2 ? undefined : arguments[2]) === 'object' ? arguments.length <= 2 ? undefined : arguments[2] : {};

	        if (!router.isStarted()) {
	            done({ code: errorCodes.ROUTER_NOT_STARTED });
	            return;
	        }

	        var route = router.buildState(name, params);

	        if (!route) {
	            var err = { code: errorCodes.ROUTE_NOT_FOUND };
	            done(err);
	            router.invokeEventListeners(constants.TRANSITION_ERROR, null, router.getState(), err);
	            return;
	        }

	        var toState = router.makeState(route.name, route.params, router.buildPath(route.name, route.params), { params: route.meta, options: opts });
	        var sameStates = router.getState() ? router.areStatesEqual(router.getState(), toState, false) : false;

	        // Do not proceed further if states are the same and no reload
	        // (no deactivation and no callbacks)
	        if (sameStates && !opts.reload && !opts.force) {
	            var _err = { code: errorCodes.SAME_STATES };
	            done(_err);
	            router.invokeEventListeners(constants.TRANSITION_ERROR, toState, router.getState(), _err);
	            return;
	        }

	        var fromState = sameStates || opts.reload ? null : router.getState();

	        if (opts.skipTransition) {
	            done(null, toState);
	            return noop$1;
	        }

	        // Transition
	        return transitionToState(toState, fromState, opts, function (err, state) {
	            if (err) {
	                if (err.redirect) {
	                    var _err$redirect = err.redirect,
	                        _name = _err$redirect.name,
	                        _params = _err$redirect.params;


	                    navigate(_name, _params, _extends$3({}, opts, { force: true, redirected: true }), done);
	                } else {
	                    done(err);
	                }
	            } else {
	                router.invokeEventListeners(constants.TRANSITION_SUCCESS, state, fromState, opts);
	                done(null, state);
	            }
	        });
	    }

	    /**
	     * Navigate to the default route (if defined)
	     * @param  {Object}   [opts] The navigation options
	     * @param  {Function} [done] A done node style callback (err, state)
	     * @return {Function}        A cancel function
	     */
	    function navigateToDefault() {
	        var opts = _typeof$3(arguments.length <= 0 ? undefined : arguments[0]) === 'object' ? arguments.length <= 0 ? undefined : arguments[0] : {};
	        var done = arguments.length === 2 ? arguments.length <= 1 ? undefined : arguments[1] : typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function' ? arguments.length <= 0 ? undefined : arguments[0] : noop$1;
	        var options = router.getOptions();

	        if (options.defaultRoute) {
	            return navigate(options.defaultRoute, options.defaultParams, opts, done);
	        }

	        return function () {};
	    }

	    function transitionToState(toState, fromState) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	        var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop$1;

	        cancel();
	        router.invokeEventListeners(constants.TRANSITION_START, toState, fromState);

	        cancelCurrentTransition = transition(router, toState, fromState, options, function (err, state) {
	            cancelCurrentTransition = null;
	            state = state || toState;

	            if (err) {
	                if (err.code === errorCodes.TRANSITION_CANCELLED) {
	                    router.invokeEventListeners(constants.TRANSITION_CANCEL, toState, fromState);
	                } else {
	                    router.invokeEventListeners(constants.TRANSITION_ERROR, toState, fromState, err);
	                }
	                done(err);
	            } else {
	                router.setState(state);
	                done(null, state);
	            }
	        });

	        return cancelCurrentTransition;
	    }
	}

	function withMiddleware(router) {
	    var middlewareFactories = [];
	    var middlewareFunctions = [];

	    router.useMiddleware = useMiddleware;
	    router.getMiddlewareFactories = getMiddlewareFactories;
	    router.getMiddlewareFunctions = getMiddlewareFunctions;
	    router.clearMiddleware = clearMiddleware;

	    /**
	     * Register middleware functions.
	     * @param  {...Function} middlewares The middleware functions
	     * @return {Object}                  The router instance
	     */
	    function useMiddleware() {
	        for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	            middlewares[_key] = arguments[_key];
	        }

	        middlewares.forEach(addMiddleware);

	        return router;
	    }

	    /**
	     * Remove all middleware functions
	     * @return {Object} The router instance
	     */
	    function clearMiddleware() {
	        middlewareFactories = [];
	        middlewareFunctions = [];

	        return router;
	    }

	    function getMiddlewareFactories() {
	        return middlewareFactories;
	    }

	    function getMiddlewareFunctions() {
	        return middlewareFunctions;
	    }

	    function addMiddleware(middleware) {
	        middlewareFactories.push(middleware);
	        middlewareFunctions.push(router.executeFactory(middleware));
	    }
	}

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	var es$1 = /*#__PURE__*/Object.freeze({
		default: result
	});

	var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function observerPlugin(router) {
	    var listeners = [];

	    function unsubscribe(listener) {
	        if (listener) {
	            listeners = listeners.filter(function (l) {
	                return l !== listener;
	            });
	        }
	    }

	    function _subscribe(listener) {
	        var isObject = (typeof listener === 'undefined' ? 'undefined' : _typeof$4(listener)) === 'object';
	        var finalListener = isObject ? listener.next.bind(listener) : listener;

	        listeners = listeners.concat(finalListener);

	        var unsubscribeHandler = function unsubscribeHandler() {
	            return unsubscribe(finalListener);
	        };

	        return isObject ? { unsubscribe: unsubscribeHandler } : unsubscribeHandler;
	    }

	    function observable() {
	        return _defineProperty$2({
	            subscribe: function subscribe(observer) {
	                if ((typeof observer === 'undefined' ? 'undefined' : _typeof$4(observer)) !== 'object' || observer === null) {
	                    throw new TypeError('Expected the observer to be an object.');
	                }
	                return _subscribe(observer);
	            }
	        }, result, function () {
	            return this;
	        });
	    }

	    router.subscribe = _subscribe;
	    router[result] = observable;

	    return {
	        onTransitionSuccess: function onTransitionSuccess(toState, fromState) {
	            listeners.forEach(function (listener) {
	                return listener({
	                    route: toState,
	                    previousRoute: fromState
	                });
	            });
	        }
	    };
	}

	observerPlugin.pluginName = 'OBSERVABLE_PLUGIN';

	function withObservablePlugin(router) {
	    router.usePlugin(observerPlugin);
	}

	function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var pluginMethods = ['onStart', 'onStop', 'onTransitionSuccess', 'onTransitionStart', 'onTransitionError', 'onTransitionCancel'];

	function withPlugins(router) {
	    var plugins = [];
	    var removePluginListeners = [];

	    router.usePlugin = usePlugin;
	    router.hasPlugin = hasPlugin;
	    router.getPlugins = getPlugins;

	    function getPlugins() {
	        return plugins;
	    }

	    /**
	     * Use plugins
	     * @param  {...Function} plugins An argument list of plugins
	     * @return {Object}              The router instance
	     */
	    function usePlugin() {
	        for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
	            plugins[_key] = arguments[_key];
	        }

	        plugins.forEach(addPlugin);
	        return router;
	    }

	    function addPlugin(plugin) {
	        if (!hasPlugin(plugin)) {
	            plugins.push(plugin);
	            startPlugin(plugin);
	        }
	    }

	    /**
	     * Check if a plugin has already been registered.
	     * @param  {String}  pluginName The plugin name
	     * @return {Boolean}            Whether the plugin has been registered
	     */
	    function hasPlugin(pluginName) {
	        return plugins.filter(function (p) {
	            return p.pluginName === pluginName || p.name === pluginName;
	        }).length > 0;
	    }

	    function startPlugin(plugin) {
	        var appliedPlugin = router.executeFactory(plugin);

	        var removeEventListeners = pluginMethods.map(function (methodName) {
	            if (appliedPlugin[methodName]) {
	                return router.addEventListener(methodName.toLowerCase().replace(/^on/, '$$').replace(/transition/, '$$'), appliedPlugin[methodName]);
	            }
	        }).filter(Boolean);

	        removePluginListeners.push.apply(removePluginListeners, _toConsumableArray$1(removeEventListeners));
	    }
	}

	var toFunction = function toFunction(val) {
	    return typeof val === 'function' ? val : function () {
	        return function () {
	            return val;
	        };
	    };
	};

	function withRouteLifecycle(router) {
	    var canDeactivateFactories = {};
	    var canActivateFactories = {};
	    var canDeactivateFunctions = {};
	    var canActivateFunctions = {};

	    router.canDeactivate = canDeactivate;
	    router.canActivate = canActivate;
	    router.getLifecycleFactories = getLifecycleFactories;
	    router.getLifecycleFunctions = getLifecycleFunctions;
	    router.clearCanDeactivate = clearCanDeactivate;

	    function getLifecycleFactories() {
	        return [canDeactivateFactories, canActivateFactories];
	    }

	    function getLifecycleFunctions() {
	        return [canDeactivateFunctions, canActivateFunctions];
	    }

	    /**
	     * Register a canDeactivate handler or specify a if a route can be deactivated
	     * @param  {String} name                           The route name
	     * @param  {Function|Boolean} canDeactivateHandler The canDeactivate handler or boolean
	     * @return {Object}                                The router instance
	     */
	    function canDeactivate(name, canDeactivateHandler) {
	        var factory = toFunction(canDeactivateHandler);

	        canDeactivateFactories[name] = factory;
	        canDeactivateFunctions[name] = router.executeFactory(factory);

	        return router;
	    }

	    /**
	     * Remove a canDeactivate handler for a route
	     * @param  {String} name The route name
	     * @return {Object}      The router instance
	     */
	    function clearCanDeactivate(name) {
	        canDeactivateFactories[name] = undefined;
	        canDeactivateFunctions[name] = undefined;

	        return router;
	    }

	    /**
	     * Register a canActivate handler or specify a if a route can be deactivated
	     * @param  {String} name                         The route name
	     * @param  {Function|Boolean} canActivateHandler The canActivate handler or boolean
	     * @return {Object}                              The router instance
	     */
	    function canActivate(name, canActivateHandler) {
	        var factory = toFunction(canActivateHandler);

	        canActivateFactories[name] = factory;
	        canActivateFunctions[name] = router.executeFactory(factory);

	        return router;
	    }
	}

	var _slicedToArray$1 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function withCloning(router, createRouter) {
	    router.clone = clone;

	    /**
	     * Clone the current router configuration. The new returned router will be non-started,
	     * with a null state
	     * @param  {[type]} deps [description]
	     * @return {[type]}      [description]
	     */
	    function clone() {
	        var deps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        var clonedDependencies = _extends$4({}, router.getDependencies(), deps);
	        var clonedRouter = createRouter(router.rootNode, router.getOptions(), clonedDependencies);

	        clonedRouter.useMiddleware.apply(clonedRouter, _toConsumableArray$2(router.getMiddlewareFactories()));
	        clonedRouter.usePlugin.apply(clonedRouter, _toConsumableArray$2(router.getPlugins()));
	        clonedRouter.config = router.config;

	        var _router$getLifecycleF = router.getLifecycleFactories(),
	            _router$getLifecycleF2 = _slicedToArray$1(_router$getLifecycleF, 2),
	            canDeactivateFactories = _router$getLifecycleF2[0],
	            canActivateFactories = _router$getLifecycleF2[1];

	        Object.keys(canDeactivateFactories).forEach(function (name) {
	            return clonedRouter.canDeactivate(name, canDeactivateFactories[name]);
	        });
	        Object.keys(canActivateFactories).forEach(function (name) {
	            return clonedRouter.canActivate(name, canActivateFactories[name]);
	        });

	        return clonedRouter;
	    }
	}

	var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var defaultOptions = {
	    trailingSlashMode: 'default',
	    queryParamsMode: 'default',
	    strictTrailingSlash: false,
	    autoCleanUp: true,
	    allowNotFound: false,
	    strongMatching: true,
	    rewritePathOnMatch: true,
	    caseSensitive: false

	    /**
	     * Create a router
	     * @param  {Array}  [routes]          The routes
	     * @param  {Object} [options={}]      The router options
	     * @param  {Object} [dependencies={}] The router dependencies
	     * @return {Object}                   The router instance
	     */
	};function createRouter(routes) {
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var routerState = null;
	    var stateId = 0;
	    var callbacks = {};
	    var dependencies = deps;
	    var options = _extends$5({}, defaultOptions);

	    Object.keys(opts).forEach(function (opt) {
	        return setOption(opt, opts[opt]);
	    });

	    var router = {
	        config: {
	            decoders: {},
	            encoders: {},
	            defaultParams: {}
	        },
	        rootNode: rootNode,
	        getOptions: getOptions,
	        setOption: setOption,
	        getState: getState,
	        setState: setState,
	        makeState: makeState,
	        makeNotFoundState: makeNotFoundState,
	        setDependency: setDependency,
	        setDependencies: setDependencies,
	        getDependencies: getDependencies,
	        add: add,
	        addNode: addNode,
	        executeFactory: executeFactory,
	        addEventListener: addEventListener,
	        removeEventListener: removeEventListener,
	        invokeEventListeners: invokeEventListeners

	        /**
	         * Invoke all event listeners by event name. Possible event names are listed under constants
	         * (`import { constants } from 'router5'`): `ROUTER_START`, `ROUTER_STOP`, `TRANSITION_START`,
	         * `TRANSITION_CANCEL`, `TRANSITION_SUCCESS`, `TRANSITION_ERROR`.
	         * This method is used internally and should not be invoked directly, but it can be useful for
	         * testing purposes.
	         * @private
	         * @name invokeEventListeners
	         * @param  {String}    eventName The event name
	         */
	    };function invokeEventListeners(eventName) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	(callbacks[eventName] || []).forEach(function (cb) {
	            return cb.apply(undefined, args);
	        });
	    }

	    /**
	     * Removes an event listener
	     * @private
	     * @param  {String}   eventName The event name
	     * @param  {Function} cb        The callback to remove
	     */
	    function removeEventListener(eventName, cb) {
	        callbacks[eventName] = callbacks[eventName].filter(function (_cb) {
	            return _cb !== cb;
	        });
	    }

	    /**
	     * Add an event listener
	     * @private
	     * @param {String}   eventName The event name
	     * @param {Function} cb        The callback to add
	     */
	    function addEventListener(eventName, cb) {
	        callbacks[eventName] = (callbacks[eventName] || []).concat(cb);

	        return function () {
	            return removeEventListener(eventName, cb);
	        };
	    }

	    withUtils(router);
	    withPlugins(router);
	    withMiddleware(router);
	    withObservablePlugin(router);
	    withRouteLifecycle(router);
	    withRouterLifecycle(router);
	    withNavigation(router);
	    withCloning(router, createRouter);

	    var rootNode = routes instanceof RouteNode ? routes : new RouteNode('', '', routes, onRouteAdded);

	    router.rootNode = rootNode;

	    return router;

	    function onRouteAdded(route) {
	        if (route.canActivate) router.canActivate(route.name, route.canActivate);

	        if (route.forwardTo) router.forward(route.name, route.forwardTo);

	        if (route.decodeParams) router.config.decoders[route.name] = route.decodeParams;

	        if (route.encodeParams) router.config.encoders[route.name] = route.encodeParams;

	        if (route.defaultParams) router.config.defaultParams[route.name] = route.defaultParams;
	    }

	    /**
	     * Build a state object
	     * @param  {String} name         The state name
	     * @param  {Object} params       The state params
	     * @param  {String} path         The state path
	     * @param  {Object} [meta]       The meta object
	     * @param  {Number} [forceId]    The ID to use in meta (incremented by default)
	     * @return {Object}              The state object
	     */
	    function makeState(name, params, path, meta, forceId) {
	        var state = {};
	        var setProp = function setProp(key, value) {
	            return Object.defineProperty(state, key, { value: value, enumerable: true });
	        };
	        setProp('name', name);
	        setProp('params', params);
	        setProp('path', path);

	        if (meta) {
	            var finalStateId = void 0;

	            if (forceId === undefined) {
	                stateId += 1;
	                finalStateId = stateId;
	            } else {
	                finalStateId = forceId;
	            }

	            setProp('meta', _extends$5({}, meta, { id: finalStateId }));
	        }

	        return state;
	    }

	    /**
	     * Build a not found state for a given path
	     * @param  {String} path      The unmatched path
	     * @param  {Object} [options] The navigation options
	     * @return {Object}           The not found state object
	     */
	    function makeNotFoundState(path, options) {
	        return makeState(constants.UNKNOWN_ROUTE, { path: path }, path, { options: options });
	    }

	    /**
	     * Get the current router state
	     * @return {Object} The current state
	     */
	    function getState() {
	        return routerState;
	    }

	    /**
	     * Set the current router state
	     * @param {Object} state The state object
	     */
	    function setState(state) {
	        routerState = state;

	        if (state && state.meta && typeof state.meta.id === 'number') {
	            stateId = state.meta.id;
	        }
	    }

	    /**
	     * Get router options
	     * @return {Object} The router options
	     */
	    function getOptions() {
	        return options;
	    }

	    /**
	     * Set an option
	     * @param  {String} option The option name
	     * @param  {*}      value  The option value
	     * @return {Object}       The router instance
	     */
	    function setOption(option, value) {
	        options[option] = value;
	        return router;
	    }

	    /**
	     * Set a router dependency
	     * @param  {String} dependencyName The dependency name
	     * @param  {*}      dependency     The dependency
	     * @return {Object}                The router instance
	     */
	    function setDependency(dependencyName, dependency) {
	        dependencies[dependencyName] = dependency;
	        return router;
	    }

	    /**
	     * Add dependencies
	     * @param { Object} deps A object of dependencies (key-value pairs)
	     * @return {Object}      The router instance
	     */
	    function setDependencies(deps) {
	        Object.keys(deps).forEach(function (depName) {
	            dependencies[depName] = deps[depName];
	        });

	        return router;
	    }

	    /**
	     * Get dependencies
	     * @return {Object} The dependencies
	     */
	    function getDependencies() {
	        return dependencies;
	    }

	    function getInjectables() {
	        return [router, getDependencies()];
	    }

	    function executeFactory(factoryFunction) {
	        return factoryFunction.apply(undefined, _toConsumableArray$3(getInjectables()));
	    }

	    /**
	     * Add routes
	     * @param  {Array} routes A list of routes to add
	     * @return {Object}       The router instance
	     */
	    function add(routes) {
	        rootNode.add(routes, onRouteAdded);
	        return router;
	    }

	    /**
	     * Add a single route (node)
	     * @param {String} name                   The route name (full name)
	     * @param {String} path                   The route path (from parent)
	     * @param {Function} [canActivateHandler] The canActivate handler for this node
	     */
	    function addNode(name, path, canActivateHandler) {
	        router.rootNode.addNode(name, path);
	        if (canActivateHandler) router.canActivate(name, canActivateHandler);
	        return router;
	    }
	}

	/* istanbul ignore next */

	var constants_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var errorCodes = exports.errorCodes = {
	    ROUTER_NOT_STARTED: 'NOT_STARTED',
	    NO_START_PATH_OR_STATE: 'NO_START_PATH_OR_STATE',
	    ROUTER_ALREADY_STARTED: 'ALREADY_STARTED',
	    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
	    SAME_STATES: 'SAME_STATES',
	    CANNOT_DEACTIVATE: 'CANNOT_DEACTIVATE',
	    CANNOT_ACTIVATE: 'CANNOT_ACTIVATE',
	    TRANSITION_ERR: 'TRANSITION_ERR',
	    TRANSITION_CANCELLED: 'CANCELLED'
	};

	var constants = {
	    UNKNOWN_ROUTE: '@@router5/UNKNOWN_ROUTE',
	    ROUTER_START: '$start',
	    ROUTER_STOP: '$stop',
	    TRANSITION_START: '$$start',
	    TRANSITION_CANCEL: '$$cancel',
	    TRANSITION_SUCCESS: '$$success',
	    TRANSITION_ERROR: '$$error'
	};

	exports.default = constants;
	});

	unwrapExports(constants_1);
	var constants_2 = constants_1.errorCodes;

	var browser_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Dumb functions
	 */
	// istanbul ignore next
	var identity = function identity(arg) {
	    return function () {
	        return arg;
	    };
	};
	// istanbul ignore next
	var noop = function noop() {};

	/**
	 * Browser detection
	 */
	var isBrowser = typeof window !== 'undefined' && window.history;

	/**
	 * Browser functions needed by router5
	 */
	var getBase = function getBase() {
	    return window.location.pathname;
	};

	var supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
	    return window.navigator.userAgent.indexOf('Trident') === -1;
	};

	var pushState = function pushState(state, title, path) {
	    return window.history.pushState(state, title, path);
	};

	var replaceState = function replaceState(state, title, path) {
	    return window.history.replaceState(state, title, path);
	};

	var addPopstateListener = function addPopstateListener(fn, opts) {
	    var shouldAddHashChangeListener = opts.useHash && !supportsPopStateOnHashChange();

	    window.addEventListener('popstate', fn);

	    if (shouldAddHashChangeListener) {
	        window.addEventListener('hashchange', fn);
	    }

	    return function () {
	        window.removeEventListener('popstate', fn);

	        if (shouldAddHashChangeListener) {
	            window.removeEventListener('hashchange', fn);
	        }
	    };
	};

	var getLocation = function getLocation(opts) {
	    var path = opts.useHash ? window.location.hash.replace(new RegExp('^#' + opts.hashPrefix), '') : window.location.pathname.replace(new RegExp('^' + opts.base), '');

	    // Fix Frefox issue with non encoded pipe characters
	    var correctedPath = path.replace(/\|/g, '%7C');

	    return (correctedPath || '/') + window.location.search;
	};

	var getState = function getState() {
	    return window.history.state;
	};

	var getHash = function getHash() {
	    return window.location.hash;
	};

	/**
	 * Export browser object
	 */
	var browser = {};
	if (isBrowser) {
	    browser = {
	        getBase: getBase,
	        pushState: pushState,
	        replaceState: replaceState,
	        addPopstateListener: addPopstateListener,
	        getLocation: getLocation,
	        getState: getState,
	        getHash: getHash
	    };
	} else {
	    // istanbul ignore next
	    browser = {
	        getBase: identity(''),
	        pushState: noop,
	        replaceState: noop,
	        addPopstateListener: noop,
	        getLocation: identity(''),
	        getState: identity(null),
	        getHash: identity('')
	    };
	}

	exports.default = browser;
	});

	unwrapExports(browser_1);

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withUtils;
	function withUtils(router, options) {
	    router.urlToPath = urlToPath;
	    router.buildUrl = buildUrl;
	    router.matchUrl = matchUrl;

	    function buildUrl(route, params) {
	        var base = options.base || '';
	        var prefix = options.useHash ? '#' + options.hashPrefix : '';
	        var path = router.buildPath(route, params);

	        if (path === null) return null;

	        return base + prefix + path;
	    }

	    function urlToPath(url) {
	        var match = url.match(/^(?:http|https):\/\/(?:[0-9a-z_\-.:]+?)(?=\/)(.*)$/);
	        var path = match ? match[1] : url;

	        var pathParts = path.match(/^(.+?)(#.+?)?(\?.+)?$/);

	        if (!pathParts) throw new Error('[router5] Could not parse url ' + url);

	        var pathname = pathParts[1];
	        var hash = pathParts[2] || '';
	        var search = pathParts[3] || '';

	        return (options.useHash ? hash.replace(new RegExp('^#' + options.hashPrefix), '') : options.base ? pathname.replace(new RegExp('^' + options.base), '') : pathname) + search;
	    }

	    function matchUrl(url) {
	        return router.matchPath(urlToPath(url));
	    }
	}
	});

	unwrapExports(utils);

	var browser$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _constants2 = _interopRequireDefault(constants_1);



	var _browser2 = _interopRequireDefault(browser_1);



	var _utils2 = _interopRequireDefault(utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	    forceDeactivate: true,
	    useHash: false,
	    hashPrefix: '',
	    base: false,
	    mergeState: false,
	    preserveHash: true
	};

	var source = 'popstate';

	function browserPluginFactory() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var browser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _browser2.default;

	    var options = _extends({}, defaultOptions, opts);
	    var transitionOptions = {
	        forceDeactivate: options.forceDeactivate,
	        source: source
	    };
	    var removePopStateListener = void 0;

	    function browserPlugin(router) {
	        var routerOptions = router.getOptions();
	        var routerStart = router.start;

	        (0, _utils2.default)(router, options);

	        router.start = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            if (args.length === 0 || typeof args[0] === 'function') {
	                routerStart.apply(undefined, [browser.getLocation(options)].concat(args));
	            } else {
	                routerStart.apply(undefined, args);
	            }

	            return router;
	        };

	        router.replaceHistoryState = function (name) {
	            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            var state = router.buildState(name, params);
	            var url = router.buildUrl(name, params);
	            router.lastKnownState = state;
	            browser.replaceState(state, '', url);
	        };

	        function updateBrowserState(state, url, replace) {
	            var trimmedState = state ? {
	                meta: state.meta,
	                name: state.name,
	                params: state.params,
	                path: state.path
	            } : state;
	            var finalState = options.mergeState === true ? _extends({}, browser.getState(), trimmedState) : trimmedState;

	            if (replace) browser.replaceState(finalState, '', url);else browser.pushState(finalState, '', url);
	        }

	        function onPopState() {
	            var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            var routerState = router.getState();
	            // Do nothing if no state or if last know state is poped state (it should never happen)
	            var newState = !evt.state || !evt.state.name;
	            var state = newState ? router.matchPath(browser.getLocation(options), source) : router.makeState(evt.state.name, evt.state.params, evt.state.path, _extends({}, evt.state.meta, { source: source }), evt.state.meta.id);
	            var defaultRoute = routerOptions.defaultRoute,
	                defaultParams = routerOptions.defaultParams;


	            if (!state) {
	                // If current state is already the default route, we will have a double entry
	                // Navigating back and forth will emit SAME_STATES error
	                defaultRoute && router.navigateToDefault(_extends({}, transitionOptions, {
	                    reload: true,
	                    replace: true
	                }));
	                return;
	            }
	            if (routerState && router.areStatesEqual(state, routerState, false)) {
	                return;
	            }

	            router.transitionToState(state, routerState, transitionOptions, function (err, toState) {
	                if (err) {
	                    if (err.redirect) {
	                        var _err$redirect = err.redirect,
	                            name = _err$redirect.name,
	                            params = _err$redirect.params;


	                        router.navigate(name, params, _extends({}, transitionOptions, {
	                            replace: true,
	                            force: true,
	                            redirected: true
	                        }));
	                    } else if (err.code === constants_1.errorCodes.CANNOT_DEACTIVATE) {
	                        var url = router.buildUrl(routerState.name, routerState.params);
	                        if (!newState) {
	                            // Keep history state unchanged but use current URL
	                            updateBrowserState(state, url, true);
	                        }
	                        // else do nothing or history will be messed up
	                        // TODO: history.back()?
	                    } else {
	                        // Force navigation to default state
	                        defaultRoute && router.navigate(defaultRoute, defaultParams, _extends({}, transitionOptions, {
	                            reload: true,
	                            replace: true
	                        }));
	                    }
	                } else {
	                    router.invokeEventListeners(_constants2.default.TRANSITION_SUCCESS, toState, routerState, { replace: true });
	                }
	            });
	        }

	        function onStart() {
	            if (options.useHash && !options.base) {
	                // Guess base
	                options.base = browser.getBase();
	            }

	            removePopStateListener = browser.addPopstateListener(onPopState, options);
	        }

	        function onStop() {
	            if (removePopStateListener) {
	                removePopStateListener();
	            }
	        }

	        function onTransitionSuccess(toState, fromState, opts) {
	            var historyState = browser.getState();
	            var hasState = historyState && historyState.meta && historyState.name && historyState.params;
	            var statesAreEqual = fromState && router.areStatesEqual(fromState, toState, false);
	            var replace = opts.replace || !hasState || statesAreEqual;
	            var url = router.buildUrl(toState.name, toState.params);
	            if (fromState === null && options.useHash === false && options.preserveHash === true) {
	                url += browser.getHash();
	            }
	            updateBrowserState(toState, url, replace);
	        }

	        return { onStart: onStart, onStop: onStop, onTransitionSuccess: onTransitionSuccess, onPopState: onPopState };
	    }

	    browserPlugin.pluginName = 'BROWSER_PLUGIN';

	    return browserPlugin;
	}

	exports.default = browserPluginFactory;
	});

	var browserPlugin = unwrapExports(browser$1);

	var _router5TransitionPath = ( es && transitionPath ) || es;

	var listeners = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});



	var _router5TransitionPath2 = _interopRequireDefault(_router5TransitionPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	    autoCleanUp: true
	};

	function listenersPluginFactory() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

	    function listenersPlugin(router) {
	        var listeners = {};

	        function removeListener(name, cb) {
	            if (cb) {
	                if (listeners[name]) listeners[name] = listeners[name].filter(function (callback) {
	                    return callback !== cb;
	                });
	            } else {
	                listeners[name] = [];
	            }
	            return router;
	        }

	        function addListener(name, cb, replace) {
	            var normalizedName = name.replace(/^(\*|\^|=)/, '');

	            if (normalizedName && !/^\$/.test(name)) {
	                var segments = router.rootNode.getSegmentsByName(normalizedName);
	                if (!segments) console.warn('No route found for ' + normalizedName + ', listener might never be called!');
	            }

	            if (!listeners[name]) listeners[name] = [];
	            listeners[name] = (replace ? [] : listeners[name]).concat(cb);

	            return router;
	        }

	        router.getListeners = function () {
	            return listeners;
	        };

	        router.addListener = function (cb) {
	            return addListener('*', cb);
	        };
	        router.removeListener = function (cb) {
	            return removeListener('*', cb);
	        };

	        router.addNodeListener = function (name, cb) {
	            return addListener('^' + name, cb, true);
	        };
	        router.removeNodeListener = function (name, cb) {
	            return removeListener('^' + name, cb);
	        };

	        router.addRouteListener = function (name, cb) {
	            return addListener('=' + name, cb);
	        };
	        router.removeRouteListener = function (name, cb) {
	            return removeListener('=' + name, cb);
	        };

	        function invokeListeners(name, toState, fromState) {
	(listeners[name] || []).forEach(function (cb) {
	                if (listeners[name].indexOf(cb) !== -1) {
	                    cb(toState, fromState);
	                }
	            });
	        }

	        function onTransitionSuccess(toState, fromState, opts) {
	            var _transitionPath = (0, _router5TransitionPath2.default)(toState, fromState),
	                intersection = _transitionPath.intersection,
	                toDeactivate = _transitionPath.toDeactivate;

	            var intersectionNode = opts.reload ? '' : intersection;
	            var name = toState.name;


	            if (options.autoCleanUp) {
	                toDeactivate.forEach(function (name) {
	                    return removeListener('^' + name);
	                });
	            }

	            invokeListeners('^' + intersectionNode, toState, fromState);
	            invokeListeners('=' + name, toState, fromState);
	            invokeListeners('*', toState, fromState);
	        }

	        return { onTransitionSuccess: onTransitionSuccess };
	    }

	    listenersPlugin.pluginName = 'LISTENERS_PLUGIN';

	    return listenersPlugin;
	}

	exports.default = listenersPluginFactory;
	});

	var listenersPlugin = unwrapExports(listeners);

	const G = document.defaultView;

	// Node.CONSTANTS
	// 'cause some engine has no global Node defined
	// (i.e. Node, NativeScript, basicHTML ... )
	const ELEMENT_NODE = 1;
	const TEXT_NODE = 3;
	const COMMENT_NODE = 8;
	const DOCUMENT_FRAGMENT_NODE = 11;

	// HTML related constants
	const VOID_ELEMENTS = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;

	// SVG related constants
	const OWNER_SVG_ELEMENT = 'ownerSVGElement';
	const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

	// Custom Elements / MutationObserver constants
	const CONNECTED = 'connected';
	const DISCONNECTED = 'dis' + CONNECTED;

	// hyperHTML related constants
	const EXPANDO = '_hyper: ';
	const SHOULD_USE_TEXT_CONTENT = /^style|textarea$/i;
	const UID = EXPANDO + ((Math.random() * new Date) | 0) + ';';
	const UIDC = '<!--' + UID + '-->';

	// you know that kind of basics you need to cover
	// your use case only but you don't want to bloat the library?
	// There's even a package in here:
	// https://www.npmjs.com/package/poorlyfills

	// used to dispatch simple events
	let Event$1 = G.Event;
	try {
	  new Event$1('Event');
	} catch(o_O) {
	  Event$1 = function (type) {
	    const e = document.createEvent('Event');
	    e.initEvent(type, false, false);
	    return e;
	  };
	}

	// used to store template literals
	/* istanbul ignore next */
	const Map$1 = G.Map || function Map() {
	  const keys = [], values = [];
	  return {
	    get(obj) {
	      return values[keys.indexOf(obj)];
	    },
	    set(obj, value) {
	      values[keys.push(obj) - 1] = value;
	    }
	  };
	};

	// used to store wired content
	let ID = 0;
	const WeakMap = G.WeakMap || function WeakMap() {
	  const key = UID + ID++;
	  return {
	    get(obj) { return obj[key]; },
	    set(obj, value) {
	      Object.defineProperty(obj, key, {
	        configurable: true,
	        value
	      });
	    }
	  };
	};

	// used to store hyper.Components
	const WeakSet = G.WeakSet || function WeakSet() {
	  const wm = new WeakMap;
	  return {
	    add(obj) { wm.set(obj, true); },
	    has(obj) { return wm.get(obj) === true; }
	  };
	};

	// used to be sure IE9 or older Androids work as expected
	const isArray = Array.isArray || (toString =>
	  arr => toString.call(arr) === '[object Array]'
	)({}.toString);

	const trim = UID.trim || function () {
	  return this.replace(/^\s+|\s+$/g, '');
	};

	// hyperHTML.Component is a very basic class
	// able to create Custom Elements like components
	// including the ability to listen to connect/disconnect
	// events via onconnect/ondisconnect attributes
	// Components can be created imperatively or declaratively.
	// The main difference is that declared components
	// will not automatically render on setState(...)
	// to simplify state handling on render.
	function Component() {
	  return this; // this is needed in Edge !!!
	}

	// Component is lazily setup because it needs
	// wire mechanism as lazy content
	function setup(content) {
	  // there are various weakly referenced variables in here
	  // and mostly are to use Component.for(...) static method.
	  const children = new WeakMap;
	  const create = Object.create;
	  const createEntry = (wm, id, component) => {
	    wm.set(id, component);
	    return component;
	  };
	  const get = (Class, info, context, id) => {
	    const relation = info.get(Class) || relate(Class, info);
	    switch (typeof id) {
	      case 'object':
	      case 'function':
	        const wm = relation.w || (relation.w = new WeakMap);
	        return wm.get(id) || createEntry(wm, id, new Class(context));
	      default:
	        const sm = relation.p || (relation.p = create(null));
	        return sm[id] || (sm[id] = new Class(context));
	    }
	  };
	  const relate = (Class, info) => {
	    const relation = {w: null, p: null};
	    info.set(Class, relation);
	    return relation;
	  };
	  const set = context => {
	    const info = new Map$1;
	    children.set(context, info);
	    return info;
	  };
	  // The Component Class
	  Object.defineProperties(
	    Component,
	    {
	      // Component.for(context[, id]) is a convenient way
	      // to automatically relate data/context to children components
	      // If not created yet, the new Component(context) is weakly stored
	      // and after that same instance would always be returned.
	      for: {
	        configurable: true,
	        value(context, id) {
	          return get(
	            this,
	            children.get(context) || set(context),
	            context,
	            id == null ?
	              'default' : id
	          );
	        }
	      }
	    }
	  );
	  Object.defineProperties(
	    Component.prototype,
	    {
	      // all events are handled with the component as context
	      handleEvent: {value(e) {
	        const ct = e.currentTarget;
	        this[
	          ('getAttribute' in ct && ct.getAttribute('data-call')) ||
	          ('on' + e.type)
	        ](e);
	      }},
	      // components will lazily define html or svg properties
	      // as soon as these are invoked within the .render() method
	      // Such render() method is not provided by the base class
	      // but it must be available through the Component extend.
	      // Declared components could implement a
	      // render(props) method too and use props as needed.
	      html: lazyGetter('html', content),
	      svg: lazyGetter('svg', content),
	      // the state is a very basic/simple mechanism inspired by Preact
	      state: lazyGetter('state', function () { return this.defaultState; }),
	      // it is possible to define a default state that'd be always an object otherwise
	      defaultState: {get() { return {}; }},
	      // setting some property state through a new object
	      // or a callback, triggers also automatically a render
	      // unless explicitly specified to not do so (render === false)
	      setState: {value(state, render) {
	        const target = this.state;
	        const source = typeof state === 'function' ? state.call(this, target) : state;
	        for (const key in source) target[key] = source[key];
	        if (render !== false) this.render();
	        return this;
	      }}
	    }
	  );
	}

	// instead of a secret key I could've used a WeakMap
	// However, attaching a property directly will result
	// into better performance with thousands of components
	// hanging around, and less memory pressure caused by the WeakMap
	const lazyGetter = (type, fn) => {
	  const secret = '_' + type + '$';
	  return {
	    get() {
	      return this[secret] || (this[type] = fn.call(this, type));
	    },
	    set(value) {
	      Object.defineProperty(this, secret, {configurable: true, value});
	    }
	  };
	};

	const intents = {};
	const keys = [];
	const hasOwnProperty = intents.hasOwnProperty;

	let length = 0;

	var Intent = {

	  // hyperHTML.define('intent', (object, update) => {...})
	  // can be used to define a third parts update mechanism
	  // when every other known mechanism failed.
	  // hyper.define('user', info => info.name);
	  // hyper(node)`<p>${{user}}</p>`;
	  define: (intent, callback) => {
	    if (!(intent in intents)) {
	      length = keys.push(intent);
	    }
	    intents[intent] = callback;
	  },

	  // this method is used internally as last resort
	  // to retrieve a value out of an object
	  invoke: (object, callback) => {
	    for (let i = 0; i < length; i++) {
	      let key = keys[i];
	      if (hasOwnProperty.call(object, key)) {
	        return intents[key](object[key], callback);
	      }
	    }
	  }
	};

	// these are tiny helpers to simplify most common operations needed here
	const create = (node, type) => doc(node).createElement(type);
	const doc = node => node.ownerDocument || node;
	const fragment = node => doc(node).createDocumentFragment();
	const text = (node, text) => doc(node).createTextNode(text);

	// TODO:  I'd love to code-cover RegExp too here
	//        these are fundamental for this library

	const spaces = ' \\f\\n\\r\\t';
	const almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
	const attrName = '[ ' + spaces + ']+' + almostEverything;
	const tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
	const attrPartials = '(?:=(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';

	const attrSeeker = new RegExp(
	  tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)',
	  'g'
	);

	const selfClosing = new RegExp(
	  tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)',
	  'g'
	);

	const testFragment = fragment(document);

	// DOM4 node.append(...many)
	const hasAppend = 'append' in testFragment;

	// detect old browsers without HTMLTemplateElement content support
	const hasContent = 'content' in create(document, 'template');

	// IE 11 has problems with cloning templates: it "forgets" empty childNodes
	testFragment.appendChild(text(testFragment, 'g'));
	testFragment.appendChild(text(testFragment, ''));
	const hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;

	// old browsers need to fallback to cloneNode
	// Custom Elements V0 and V1 will work polyfilled
	// but native implementations need importNode instead
	// (specially Chromium and its old V0 implementation)
	const hasImportNode = 'importNode' in document;

	// appends an array of nodes
	// to a generic node/fragment
	// When available, uses append passing all arguments at once
	// hoping that's somehow faster, even if append has more checks on type
	const append = hasAppend ?
	  (node, childNodes) => {
	    node.append.apply(node, childNodes);
	  } :
	  (node, childNodes) => {
	    const length = childNodes.length;
	    for (let i = 0; i < length; i++) {
	      node.appendChild(childNodes[i]);
	    }
	  };

	const findAttributes = new RegExp('(' + attrName + '=)([\'"]?)' + UIDC + '\\2', 'gi');
	const comments = ($0, $1, $2, $3) =>
	  '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
	const replaceAttributes = ($0, $1, $2) => $1 + ($2 || '"') + UID + ($2 || '"');

	// given a node and a generic HTML content,
	// create either an SVG or an HTML fragment
	// where such content will be injected
	const createFragment = (node, html) =>
	  (OWNER_SVG_ELEMENT in node ?
	    SVGFragment :
	    HTMLFragment
	  )(node, html.replace(attrSeeker, comments));

	// IE/Edge shenanigans proof cloneNode
	// it goes through all nodes manually
	// instead of relying the engine to suddenly
	// merge nodes together
	const cloneNode$2 = hasDoomedCloneNode ?
	  node => {
	    const clone = node.cloneNode();
	    const childNodes = node.childNodes ||
	                      // this is an excess of caution
	                      // but some node, in IE, might not
	                      // have childNodes property.
	                      // The following fallback ensure working code
	                      // in older IE without compromising performance
	                      // or any other browser/engine involved.
	                      /* istanbul ignore next */
	                      [];
	    const length = childNodes.length;
	    for (let i = 0; i < length; i++) {
	      clone.appendChild(cloneNode$2(childNodes[i]));
	    }
	    return clone;
	  } :
	  // the following ignore is due code-coverage
	  // combination of not having document.importNode
	  // but having a working node.cloneNode.
	  // This shenario is common on older Android/WebKit browsers
	  // but basicHTML here tests just two major cases:
	  // with document.importNode or with broken cloneNode.
	  /* istanbul ignore next */
	  node => node.cloneNode(true);

	// used to import html into fragments
	const importNode$2 = hasImportNode ?
	  (doc$$1, node) => doc$$1.importNode(node, true) :
	  (doc$$1, node) => cloneNode$2(node);

	// just recycling a one-off array to use slice
	// in every needed place
	const slice = [].slice;

	// lazy evaluated, returns the unique identity
	// of a template literal, as tempalte literal itself.
	// By default, ES2015 template literals are unique
	// tag`a${1}z` === tag`a${2}z`
	// even if interpolated values are different
	// the template chunks are in a frozen Array
	// that is identical each time you use the same
	// literal to represent same static content
	// around its own interpolations.
	const unique = template => TL(template);

	// TL returns a unique version of the template
	// it needs lazy feature detection
	// (cannot trust literals with transpiled code)
	let TL = t => {
	  if (
	    // TypeScript template literals are not standard
	    t.propertyIsEnumerable('raw') ||
	    (
	      // Firefox < 55 has not standard implementation neither
	      /Firefox\/(\d+)/.test((G.navigator || {}).userAgent) &&
	      parseFloat(RegExp.$1) < 55
	    )
	  ) {
	    const T = {};
	    TL = t => {
	      const k = '^' + t.join('^');
	      return T[k] || (T[k] = t);
	    };
	  } else {
	    // make TL an identity like function
	    TL = t => t;
	  }
	  return TL(t);
	};

	// create document fragments via native template
	// with a fallback for browsers that won't be able
	// to deal with some injected element such <td> or others
	const HTMLFragment = hasContent ?
	  (node, html) => {
	    const container = create(node, 'template');
	    container.innerHTML = html;
	    return container.content;
	  } :
	  (node, html) => {
	    const container = create(node, 'template');
	    const content = fragment(node);
	    if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
	      const selector = RegExp.$1;
	      container.innerHTML = '<table>' + html + '</table>';
	      append(content, slice.call(container.querySelectorAll(selector)));
	    } else {
	      container.innerHTML = html;
	      append(content, slice.call(container.childNodes));
	    }
	    return content;
	  };

	// creates SVG fragment with a fallback for IE that needs SVG
	// within the HTML content
	const SVGFragment = hasContent ?
	  (node, html) => {
	    const content = fragment(node);
	    const container = doc(node).createElementNS(SVG_NAMESPACE, 'svg');
	    container.innerHTML = html;
	    append(content, slice.call(container.childNodes));
	    return content;
	  } :
	  (node, html) => {
	    const content = fragment(node);
	    const container = create(node, 'div');
	    container.innerHTML = '<svg xmlns="' + SVG_NAMESPACE + '">' + html + '</svg>';
	    append(content, slice.call(container.firstChild.childNodes));
	    return content;
	  };

	function Wire(childNodes) {
	  this.childNodes = childNodes;
	  this.length = childNodes.length;
	  this.first = childNodes[0];
	  this.last = childNodes[this.length - 1];
	}

	// when a wire is inserted, all its nodes will follow
	Wire.prototype.insert = function insert() {
	  const df = fragment(this.first);
	  append(df, this.childNodes);
	  return df;
	};

	// when a wire is removed, all its nodes must be removed as well
	Wire.prototype.remove = function remove() {
	  const first = this.first;
	  const last = this.last;
	  if (this.length === 2) {
	    last.parentNode.removeChild(last);
	  } else {
	    const range = doc(first).createRange();
	    range.setStartBefore(this.childNodes[1]);
	    range.setEndAfter(last);
	    range.deleteContents();
	  }
	  return first;
	};

	// every template literal interpolation indicates
	// a precise target in the DOM the template is representing.
	// `<p id=${'attribute'}>some ${'content'}</p>`
	// hyperHTML finds only once per template literal,
	// hence once per entire application life-cycle,
	// all nodes that are related to interpolations.
	// These nodes are stored as indexes used to retrieve,
	// once per upgrade, nodes that will change on each future update.
	// A path example is [2, 0, 1] representing the operation:
	// node.childNodes[2].childNodes[0].childNodes[1]
	// Attributes are addressed via their owner node and their name.
	const createPath = node => {
	  const path = [];
	  let parentNode;
	  switch (node.nodeType) {
	    case ELEMENT_NODE:
	    case DOCUMENT_FRAGMENT_NODE:
	      parentNode = node;
	      break;
	    case COMMENT_NODE:
	      parentNode = node.parentNode;
	      prepend(path, parentNode, node);
	      break;
	    default:
	      parentNode = node.ownerElement;
	      break;
	  }
	  for (
	    node = parentNode;
	    (parentNode = parentNode.parentNode);
	    node = parentNode
	  ) {
	    prepend(path, parentNode, node);
	  }
	  return path;
	};

	const prepend = (path, parent, node) => {
	  path.unshift(path.indexOf.call(parent.childNodes, node));
	};

	var Path$1 = {
	  create: (type, node, name) => ({type, name, node, path: createPath(node)}),
	  find: (node, path) => {
	    const length = path.length;
	    for (let i = 0; i < length; i++) {
	      node = node.childNodes[path[i]];
	    }
	    return node;
	  }
	};

	// from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/constants.js
	const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	// style is handled as both string and object
	// even if the target is an SVG element (consistency)
	var Style = (node, original, isSVG) => {
	  if (isSVG) {
	    const style = original.cloneNode(true);
	    style.value = '';
	    node.setAttributeNode(style);
	    return update(style, isSVG);
	  }
	  return update(node.style, isSVG);
	};

	// the update takes care or changing/replacing
	// only properties that are different or
	// in case of string, the whole node
	const update = (style, isSVG) => {
	  let oldType, oldValue;
	  return newValue => {
	    switch (typeof newValue) {
	      case 'object':
	        if (newValue) {
	          if (oldType === 'object') {
	            if (!isSVG) {
	              if (oldValue !== newValue) {
	                for (const key in oldValue) {
	                  if (!(key in newValue)) {
	                    style[key] = '';
	                  }
	                }
	              }
	            }
	          } else {
	            if (isSVG) style.value = '';
	            else style.cssText = '';
	          }
	          const info = isSVG ? {} : style;
	          for (const key in newValue) {
	            const value = newValue[key];
	            info[key] = typeof value === 'number' &&
	                        !IS_NON_DIMENSIONAL.test(key) ?
	                          (value + 'px') : value;
	          }
	          oldType = 'object';
	          if (isSVG) style.value = toStyle((oldValue = info));
	          else oldValue = newValue;
	          break;
	        }
	      default:
	        if (oldValue != newValue) {
	          oldType = 'string';
	          oldValue = newValue;
	          if (isSVG) style.value = newValue || '';
	          else style.cssText = newValue || '';
	        }
	        break;
	    }
	  };
	};

	const hyphen = /([^A-Z])([A-Z]+)/g;
	const ized = ($0, $1, $2) => $1 + '-' + $2.toLowerCase();
	const toStyle = object => {
	  const css = [];
	  for (const key in object) {
	    css.push(key.replace(hyphen, ized), ':', object[key], ';');
	  }
	  return css.join('');
	};

	/* AUTOMATICALLY IMPORTED, DO NOT MODIFY */
	/*! (c) 2017 Andrea Giammarchi (ISC) */

	/**
	 * This code is a revisited port of the snabbdom vDOM diffing logic,
	 * the same that fuels as fork Vue.js or other libraries.
	 * @credits https://github.com/snabbdom/snabbdom
	 */

	const identity$1 = O => O;

	const remove = (parentNode, before, after) => {
	  const range = parentNode.ownerDocument.createRange();
	  range.setStartBefore(before);
	  range.setEndAfter(after);
	  range.deleteContents();
	};

	const domdiff = (
	  parentNode,     // where changes happen
	  currentNodes,   // Array of current items/nodes
	  futureNodes,    // Array of future items/nodes
	  getNode,        // optional way to retrieve a node from an item
	  beforeNode      // optional item/node to use as insertBefore delimiter
	) => {
	  const get = getNode || identity$1;
	  const before = beforeNode == null ? null : get(beforeNode, 0);
	  let currentStart = 0, futureStart = 0;
	  let currentEnd = currentNodes.length - 1;
	  let currentStartNode = currentNodes[0];
	  let currentEndNode = currentNodes[currentEnd];
	  let futureEnd = futureNodes.length - 1;
	  let futureStartNode = futureNodes[0];
	  let futureEndNode = futureNodes[futureEnd];
	  while (currentStart <= currentEnd && futureStart <= futureEnd) {
	    if (currentStartNode == null) {
	      currentStartNode = currentNodes[++currentStart];
	    }
	    else if (currentEndNode == null) {
	      currentEndNode = currentNodes[--currentEnd];
	    }
	    else if (futureStartNode == null) {
	      futureStartNode = futureNodes[++futureStart];
	    }
	    else if (futureEndNode == null) {
	      futureEndNode = futureNodes[--futureEnd];
	    }
	    else if (currentStartNode == futureStartNode) {
	      currentStartNode = currentNodes[++currentStart];
	      futureStartNode = futureNodes[++futureStart];
	    }
	    else if (currentEndNode == futureEndNode) {
	      currentEndNode = currentNodes[--currentEnd];
	      futureEndNode = futureNodes[--futureEnd];
	    }
	    else if (currentStartNode == futureEndNode) {
	      parentNode.insertBefore(
	        get(currentStartNode, 1),
	        get(currentEndNode, -0).nextSibling
	      );
	      currentStartNode = currentNodes[++currentStart];
	      futureEndNode = futureNodes[--futureEnd];
	    }
	    else if (currentEndNode == futureStartNode) {
	      parentNode.insertBefore(
	        get(currentEndNode, 1),
	        get(currentStartNode, 0)
	      );
	      currentEndNode = currentNodes[--currentEnd];
	      futureStartNode = futureNodes[++futureStart];
	    }
	    else {
	      let index = currentNodes.indexOf(futureStartNode);
	      if (index < 0) {
	        parentNode.insertBefore(
	          get(futureStartNode, 1),
	          get(currentStartNode, 0)
	        );
	        futureStartNode = futureNodes[++futureStart];
	      }
	      else {
	        let i = index;
	        let f = futureStart;
	        while (
	          i <= currentEnd &&
	          f <= futureEnd &&
	          currentNodes[i] === futureNodes[f]
	        ) {
	          i++;
	          f++;
	        }
	        if (1 < (i - index)) {
	          if (--index === currentStart) {
	            parentNode.removeChild(get(currentStartNode, -1));
	          } else {
	            remove(
	              parentNode,
	              get(currentStartNode, -1),
	              get(currentNodes[index], -1)
	            );
	          }
	          currentStart = i;
	          futureStart = f;
	          currentStartNode = currentNodes[i];
	          futureStartNode = futureNodes[f];
	        } else {
	          const el = currentNodes[index];
	          currentNodes[index] = null;
	          parentNode.insertBefore(get(el, 1), get(currentStartNode, 0));
	          futureStartNode = futureNodes[++futureStart];
	        }
	      }
	    }
	  }
	  if (currentStart <= currentEnd || futureStart <= futureEnd) {
	    if (currentStart > currentEnd) {
	      const pin = futureNodes[futureEnd + 1];
	      const place = pin == null ? before : get(pin, 0);
	      if (futureStart === futureEnd) {
	        parentNode.insertBefore(get(futureNodes[futureStart], 1), place);
	      }
	      else {
	        const fragment = parentNode.ownerDocument.createDocumentFragment();
	        while (futureStart <= futureEnd) {
	          fragment.appendChild(get(futureNodes[futureStart++], 1));
	        }
	        parentNode.insertBefore(fragment, place);
	      }
	    }
	    else {
	      if (currentNodes[currentStart] == null) currentStart++;
	      if (currentStart === currentEnd) {
	        parentNode.removeChild(get(currentNodes[currentStart], -1));
	      }
	      else {
	        remove(
	          parentNode,
	          get(currentNodes[currentStart], -1),
	          get(currentNodes[currentEnd], -1)
	        );
	      }
	    }
	  }
	  return futureNodes;
	};

	// hyper.Component have a connected/disconnected
	// mechanism provided by MutationObserver
	// This weak set is used to recognize components
	// as DOM node that needs to trigger connected/disconnected events
	const components = new WeakSet;

	// a basic dictionary used to filter already cached attributes
	// while looking for special hyperHTML values.
	function Cache() {}
	Cache.prototype = Object.create(null);

	// returns an intent to explicitly inject content as html
	const asHTML = html => ({html});

	// returns nodes from wires and components
	const asNode = (item, i) => {
	  return 'ELEMENT_NODE' in item ?
	    item :
	    (item.constructor === Wire ?
	      // in the Wire case, the content can be
	      // removed, post-pended, inserted, or pre-pended and
	      // all these cases are handled by domdiff already
	      /* istanbul ignore next */
	      ((1 / i) < 0 ?
	        (i ? item.remove() : item.last) :
	        (i ? item.insert() : item.first)) :
	      asNode(item.render(), i));
	};

	// returns true if domdiff can handle the value
	const canDiff = value =>  'ELEMENT_NODE' in value ||
	value instanceof Wire ||
	value instanceof Component;

	// updates are created once per context upgrade
	// within the main render function (../hyper/render.js)
	// These are an Array of callbacks to invoke passing
	// each interpolation value.
	// Updates can be related to any kind of content,
	// attributes, or special text-only cases such <style>
	// elements or <textarea>
	const create$1 = (root, paths) => {
	  const updates = [];
	  const length = paths.length;
	  for (let i = 0; i < length; i++) {
	    const info = paths[i];
	    const node = Path$1.find(root, info.path);
	    switch (info.type) {
	      case 'any':
	        updates.push(setAnyContent(node, []));
	        break;
	      case 'attr':
	        updates.push(setAttribute$2(node, info.name, info.node));
	        break;
	      case 'text':
	        updates.push(setTextContent(node));
	        node.textContent = '';
	        break;
	    }
	  }
	  return updates;
	};

	// finding all paths is a one-off operation performed
	// when a new template literal is used.
	// The goal is to map all target nodes that will be
	// used to update content/attributes every time
	// the same template literal is used to create content.
	// The result is a list of paths related to the template
	// with all the necessary info to create updates as
	// list of callbacks that target directly affected nodes.
	const find = (node, paths, parts) => {
	  const childNodes = node.childNodes;
	  const length = childNodes.length;
	  for (let i = 0; i < length; i++) {
	    let child = childNodes[i];
	    switch (child.nodeType) {
	      case ELEMENT_NODE:
	        findAttributes$1(child, paths, parts);
	        find(child, paths, parts);
	        break;
	      case COMMENT_NODE:
	        if (child.textContent === UID) {
	          parts.shift();
	          paths.push(
	            // basicHTML or other non standard engines
	            // might end up having comments in nodes
	            // where they shouldn't, hence this check.
	            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
	              Path$1.create('text', node) :
	              Path$1.create('any', child)
	          );
	        }
	        break;
	      case TEXT_NODE:
	        // the following ignore is actually covered by browsers
	        // only basicHTML ends up on previous COMMENT_NODE case
	        // instead of TEXT_NODE because it knows nothing about
	        // special style or textarea behavior
	        /* istanbul ignore if */
	        if (
	          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
	          trim.call(child.textContent) === UIDC
	        ) {
	          parts.shift();
	          paths.push(Path$1.create('text', node));
	        }
	        break;
	    }
	  }
	};

	// attributes are searched via unique hyperHTML id value.
	// Despite HTML being case insensitive, hyperHTML is able
	// to recognize attributes by name in a caseSensitive way.
	// This plays well with Custom Elements definitions
	// and also with XML-like environments, without trusting
	// the resulting DOM but the template literal as the source of truth.
	// IE/Edge has a funny bug with attributes and these might be duplicated.
	// This is why there is a cache in charge of being sure no duplicated
	// attributes are ever considered in future updates.
	const findAttributes$1 = (node, paths, parts) => {
	  const cache = new Cache;
	  const attributes = node.attributes;
	  const array = slice.call(attributes);
	  const remove = [];
	  const length = array.length;
	  for (let i = 0; i < length; i++) {
	    const attribute = array[i];
	    if (attribute.value === UID) {
	      const name = attribute.name;
	      // the following ignore is covered by IE
	      // and the IE9 double viewBox test
	      /* istanbul ignore else */
	      if (!(name in cache)) {
	        const realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, '$1');
	        cache[name] = attributes[realName] ||
	                      // the following ignore is covered by browsers
	                      // while basicHTML is already case-sensitive
	                      /* istanbul ignore next */
	                      attributes[realName.toLowerCase()];
	        paths.push(Path$1.create('attr', cache[name], realName));
	      }
	      remove.push(attribute);
	    }
	  }
	  const len = remove.length;
	  for (let i = 0; i < len; i++) {
	    // Edge HTML bug #16878726
	    const attribute = remove[i];
	    if (/^id$/i.test(attribute.name))
	      node.removeAttribute(attribute.name);
	    // standard browsers would work just fine here
	    else
	      node.removeAttributeNode(remove[i]);
	  }

	  // This is a very specific Firefox/Safari issue
	  // but since it should be a not so common pattern,
	  // it's probably worth patching regardless.
	  // Basically, scripts created through strings are death.
	  // You need to create fresh new scripts instead.
	  // TODO: is there any other node that needs such nonsense?
	  const nodeName = node.nodeName;
	  if (/^script$/i.test(nodeName)) {
	    // this used to be like that
	    // const script = createElement(node, nodeName);
	    // then Edge arrived and decided that scripts created
	    // through template documents aren't worth executing
	    // so it became this ... hopefully it won't hurt in the wild
	    const script = document.createElement(nodeName);
	    for (let i = 0; i < attributes.length; i++) {
	      script.setAttributeNode(attributes[i].cloneNode(true));
	    }
	    script.textContent = node.textContent;
	    node.parentNode.replaceChild(script, node);
	  }
	};

	// when a Promise is used as interpolation value
	// its result must be parsed once resolved.
	// This callback is in charge of understanding what to do
	// with a returned value once the promise is resolved.
	const invokeAtDistance = (value, callback) => {
	  callback(value.placeholder);
	  if ('text' in value) {
	    Promise.resolve(value.text).then(String).then(callback);
	  } else if ('any' in value) {
	    Promise.resolve(value.any).then(callback);
	  } else if ('html' in value) {
	    Promise.resolve(value.html).then(asHTML).then(callback);
	  } else {
	    Promise.resolve(Intent.invoke(value, callback)).then(callback);
	  }
	};

	// quick and dirty way to check for Promise/ish values
	const isPromise_ish = value => value != null && 'then' in value;

	// in a hyper(node)`<div>${content}</div>` case
	// everything could happen:
	//  * it's a JS primitive, stored as text
	//  * it's null or undefined, the node should be cleaned
	//  * it's a component, update the content by rendering it
	//  * it's a promise, update the content once resolved
	//  * it's an explicit intent, perform the desired operation
	//  * it's an Array, resolve all values if Promises and/or
	//    update the node with the resulting list of content
	const setAnyContent = (node, childNodes) => {
	  let fastPath = false;
	  let oldValue;
	  const anyContent = value => {
	    switch (typeof value) {
	      case 'string':
	      case 'number':
	      case 'boolean':
	        if (fastPath) {
	          if (oldValue !== value) {
	            oldValue = value;
	            childNodes[0].textContent = value;
	          }
	        } else {
	          fastPath = true;
	          oldValue = value;
	          childNodes = domdiff(
	            node.parentNode,
	            childNodes,
	            [text(node, value)],
	            asNode,
	            node
	          );
	        }
	        break;
	      case 'object':
	      case 'undefined':
	        if (value == null) {
	          fastPath = false;
	          childNodes = domdiff(
	            node.parentNode,
	            childNodes,
	            [],
	            asNode,
	            node
	          );
	          break;
	        }
	      default:
	        fastPath = false;
	        oldValue = value;
	        if (isArray(value)) {
	          if (value.length === 0) {
	            if (childNodes.length) {
	              childNodes = domdiff(
	                node.parentNode,
	                childNodes,
	                [],
	                asNode,
	                node
	              );
	            }
	          } else {
	            switch (typeof value[0]) {
	              case 'string':
	              case 'number':
	              case 'boolean':
	                anyContent({html: value});
	                break;
	              case 'object':
	                if (isArray(value[0])) {
	                  value = value.concat.apply([], value);
	                }
	                if (isPromise_ish(value[0])) {
	                  Promise.all(value).then(anyContent);
	                  break;
	                }
	              default:
	                childNodes = domdiff(
	                  node.parentNode,
	                  childNodes,
	                  value,
	                  asNode,
	                  node
	                );
	                break;
	            }
	          }
	        } else if (canDiff(value)) {
	          childNodes = domdiff(
	            node.parentNode,
	            childNodes,
	            value.nodeType === DOCUMENT_FRAGMENT_NODE ?
	              slice.call(value.childNodes) :
	              [value],
	            asNode,
	            node
	          );
	        } else if (isPromise_ish(value)) {
	          value.then(anyContent);
	        } else if ('placeholder' in value) {
	          invokeAtDistance(value, anyContent);
	        } else if ('text' in value) {
	          anyContent(String(value.text));
	        } else if ('any' in value) {
	          anyContent(value.any);
	        } else if ('html' in value) {
	          childNodes = domdiff(
	            node.parentNode,
	            childNodes,
	            slice.call(
	              createFragment(
	                node,
	                [].concat(value.html).join('')
	              ).childNodes
	            ),
	            asNode,
	            node
	          );
	        } else if ('length' in value) {
	          anyContent(slice.call(value));
	        } else {
	          anyContent(Intent.invoke(value, anyContent));
	        }
	        break;
	    }
	  };
	  return anyContent;
	};

	// there are four kind of attributes, and related behavior:
	//  * events, with a name starting with `on`, to add/remove event listeners
	//  * special, with a name present in their inherited prototype, accessed directly
	//  * regular, accessed through get/setAttribute standard DOM methods
	//  * style, the only regular attribute that also accepts an object as value
	//    so that you can style=${{width: 120}}. In this case, the behavior has been
	//    fully inspired by Preact library and its simplicity.
	const setAttribute$2 = (node, name, original) => {
	  const isSVG = OWNER_SVG_ELEMENT in node;
	  let oldValue;
	  // if the attribute is the style one
	  // handle it differently from others
	  if (name === 'style') {
	    return Style(node, original, isSVG);
	  }
	  // the name is an event one,
	  // add/remove event listeners accordingly
	  else if (/^on/.test(name)) {
	    let type = name.slice(2);
	    if (type === CONNECTED || type === DISCONNECTED) {
	      if (notObserving) {
	        notObserving = false;
	        observe();
	      }
	      components.add(node);
	    }
	    else if (name.toLowerCase() in node) {
	      type = type.toLowerCase();
	    }
	    return newValue => {
	      if (oldValue !== newValue) {
	        if (oldValue) node.removeEventListener(type, oldValue, false);
	        oldValue = newValue;
	        if (newValue) node.addEventListener(type, newValue, false);
	      }
	    };
	  }
	  // the attribute is special ('value' in input)
	  // and it's not SVG *or* the name is exactly data,
	  // in this case assign the value directly
	  else if (name === 'data' || (!isSVG && name in node)) {
	    return newValue => {
	      if (oldValue !== newValue) {
	        oldValue = newValue;
	        if (node[name] !== newValue) {
	          node[name] = newValue;
	          if (newValue == null) {
	            node.removeAttribute(name);
	          }
	        }
	      }
	    };
	  }
	  // in every other case, use the attribute node as it is
	  // update only the value, set it as node only when/if needed
	  else {
	    let owner = false;
	    const attribute = original.cloneNode(true);
	    return newValue => {
	      if (oldValue !== newValue) {
	        oldValue = newValue;
	        if (attribute.value !== newValue) {
	          if (newValue == null) {
	            if (owner) {
	              owner = false;
	              node.removeAttributeNode(attribute);
	            }
	            attribute.value = newValue;
	          } else {
	            attribute.value = newValue;
	            if (!owner) {
	              owner = true;
	              node.setAttributeNode(attribute);
	            }
	          }
	        }
	      }
	    };
	  }
	};

	// style or textareas don't accept HTML as content
	// it's pointless to transform or analyze anything
	// different from text there but it's worth checking
	// for possible defined intents.
	const setTextContent = node => {
	  let oldValue;
	  const textContent = value => {
	    if (oldValue !== value) {
	      oldValue = value;
	      if (typeof value === 'object' && value) {
	        if (isPromise_ish(value)) {
	          value.then(textContent);
	        } else if ('placeholder' in value) {
	          invokeAtDistance(value, textContent);
	        } else if ('text' in value) {
	          textContent(String(value.text));
	        } else if ('any' in value) {
	          textContent(value.any);
	        } else if ('html' in value) {
	          textContent([].concat(value.html).join(''));
	        } else if ('length' in value) {
	          textContent(slice.call(value).join(''));
	        } else {
	          textContent(Intent.invoke(value, textContent));
	        }
	      } else {
	        node.textContent = value == null ? '' : value;
	      }
	    }
	  };
	  return textContent;
	};

	var Updates = {create: create$1, find};

	// hyper.Components might need connected/disconnected notifications
	// used by components and their onconnect/ondisconnect callbacks.
	// When one of these callbacks is encountered,
	// the document starts being observed.
	let notObserving = true;
	function observe() {

	  // when hyper.Component related DOM nodes
	  // are appended or removed from the live tree
	  // these might listen to connected/disconnected events
	  // This utility is in charge of finding all components
	  // involved in the DOM update/change and dispatch
	  // related information to them
	  const dispatchAll = (nodes, type) => {
	    const event = new Event$1(type);
	    const length = nodes.length;
	    for (let i = 0; i < length; i++) {
	      let node = nodes[i];
	      if (node.nodeType === ELEMENT_NODE) {
	        dispatchTarget(node, event);
	      }
	    }
	  };

	  // the way it's done is via the components weak set
	  // and recursively looking for nested components too
	  const dispatchTarget = (node, event) => {
	    if (components.has(node)) {
	      node.dispatchEvent(event);
	    }

	    const children = node.children;
	    const length = children.length;
	    for (let i = 0; i < length; i++) {
	      dispatchTarget(children[i], event);
	    }
	  };

	  // The MutationObserver is the best way to implement that
	  // but there is a fallback to deprecated DOMNodeInserted/Removed
	  // so that even older browsers/engines can help components life-cycle
	  try {
	    (new MutationObserver(records => {
	      const length = records.length;
	      for (let i = 0; i < length; i++) {
	        let record = records[i];
	        dispatchAll(record.removedNodes, DISCONNECTED);
	        dispatchAll(record.addedNodes, CONNECTED);
	      }
	    })).observe(document, {subtree: true, childList: true});
	  } catch(o_O) {
	    document.addEventListener('DOMNodeRemoved', event => {
	      dispatchAll([event.target], DISCONNECTED);
	    }, false);
	    document.addEventListener('DOMNodeInserted', event => {
	      dispatchAll([event.target], CONNECTED);
	    }, false);
	  }
	}

	// a weak collection of contexts that
	// are already known to hyperHTML
	const bewitched = new WeakMap;

	// all unique template literals
	// if the WeakMap is the global one, use it
	// otherwise uses a Map because polyfilled WeakMaps
	// cannot set any property to frozen objects (templates)
	const templates = WeakMap === G.WeakMap ? new WeakMap : new Map$1;

	// better known as hyper.bind(node), the render is
	// the main tag function in charge of fully upgrading
	// or simply updating, contexts used as hyperHTML targets.
	// The `this` context is either a regular DOM node or a fragment.
	function render(template) {
	  const wicked = bewitched.get(this);
	  if (wicked && wicked.template === unique(template)) {
	    update$1.apply(wicked.updates, arguments);
	  } else {
	    upgrade.apply(this, arguments);
	  }
	  return this;
	}

	// an upgrade is in charge of collecting template info,
	// parse it once, if unknown, to map all interpolations
	// as single DOM callbacks, relate such template
	// to the current context, and render it after cleaning the context up
	function upgrade(template) {
	  template = unique(template);
	  const info =  templates.get(template) ||
	                createTemplate.call(this, template);
	  const fragment = importNode$2(this.ownerDocument, info.fragment);
	  const updates = Updates.create(fragment, info.paths);
	  bewitched.set(this, {template, updates});
	  update$1.apply(updates, arguments);
	  this.textContent = '';
	  this.appendChild(fragment);
	}

	// an update simply loops over all mapped DOM operations
	function update$1() {
	  const length = arguments.length;
	  for (let i = 1; i < length; i++) {
	    this[i - 1](arguments[i]);
	  }
	}

	// a template can be used to create a document fragment
	// aware of all interpolations and with a list
	// of paths used to find once those nodes that need updates,
	// no matter if these are attributes, text nodes, or regular one
	function createTemplate(template) {
	  const paths = [];
	  const html = template.join(UIDC).replace(SC_RE, SC_PLACE);
	  const fragment = createFragment(this, html);
	  Updates.find(fragment, paths, template.slice());
	  const info = {fragment, paths};
	  templates.set(template, info);
	  return info;
	}

	// some node could be special though, like a custom element
	// with a self closing tag, which should work through these changes.
	const SC_RE = selfClosing;
	const SC_PLACE = ($0, $1, $2) => {
	  return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
	};

	// all wires used per each context
	const wires = new WeakMap;

	// A wire is a callback used as tag function
	// to lazily relate a generic object to a template literal.
	// hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
	// This provides the ability to have a unique DOM structure
	// related to a unique JS object through a reusable template literal.
	// A wire can specify a type, as svg or html, and also an id
	// via html:id or :id convention. Such :id allows same JS objects
	// to be associated to different DOM structures accordingly with
	// the used template literal without losing previously rendered parts.
	const wire = (obj, type) => obj == null ?
	  content$1(type || 'html') :
	  weakly(obj, type || 'html');

	// A wire content is a virtual reference to one or more nodes.
	// It's represented by either a DOM node, or an Array.
	// In both cases, the wire content role is to simply update
	// all nodes through the list of related callbacks.
	// In few words, a wire content is like an invisible parent node
	// in charge of updating its content like a bound element would do.
	const content$1 = type => {
	  let wire, container, content, template, updates;
	  return function (statics) {
	    statics = unique(statics);
	    let setup = template !== statics;
	    if (setup) {
	      template = statics;
	      content = fragment(document);
	      container = type === 'svg' ?
	        document.createElementNS(SVG_NAMESPACE, 'svg') :
	        content;
	      updates = render.bind(container);
	    }
	    updates.apply(null, arguments);
	    if (setup) {
	      if (type === 'svg') {
	        append(content, slice.call(container.childNodes));
	      }
	      wire = wireContent(content);
	    }
	    return wire;
	  };
	};

	// wires are weakly created through objects.
	// Each object can have multiple wires associated
	// and this is thanks to the type + :id feature.
	const weakly = (obj, type) => {
	  const i = type.indexOf(':');
	  let wire = wires.get(obj);
	  let id = type;
	  if (-1 < i) {
	    id = type.slice(i + 1);
	    type = type.slice(0, i) || 'html';
	  }
	  if (!wire) wires.set(obj, wire = {});
	  return wire[id] || (wire[id] = content$1(type));
	};

	// a document fragment loses its nodes as soon
	// as it's appended into another node.
	// This would easily lose wired content
	// so that on a second render call, the parent
	// node wouldn't know which node was there
	// associated to the interpolation.
	// To prevent hyperHTML to forget about wired nodes,
	// these are either returned as Array or, if there's ony one entry,
	// as single referenced node that won't disappear from the fragment.
	// The initial fragment, at this point, would be used as unique reference.
	const wireContent = node => {
	  const childNodes = node.childNodes;
	  const length = childNodes.length;
	  const wireNodes = [];
	  for (let i = 0; i < length; i++) {
	    let child = childNodes[i];
	    if (
	      child.nodeType === ELEMENT_NODE ||
	      trim.call(child.textContent).length !== 0
	    ) {
	      wireNodes.push(child);
	    }
	  }
	  return wireNodes.length === 1 ? wireNodes[0] : new Wire(wireNodes);
	};

	/*! (c) Andrea Giammarchi (ISC) */

	// all functions are self bound to the right context
	// you can do the following
	// const {bind, wire} = hyperHTML;
	// and use them right away: bind(node)`hello!`;
	const bind = context => render.bind(context);
	const define = Intent.define;

	hyper.Component = Component;
	hyper.bind = bind;
	hyper.define = define;
	hyper.diff = domdiff;
	hyper.hyper = hyper;
	hyper.wire = wire;

	// the wire content is the lazy defined
	// html or svg property of each hyper.Component
	setup(content$1);

	// by default, hyperHTML is a smart function
	// that "magically" understands what's the best
	// thing to do with passed arguments
	function hyper(HTML) {
	  return arguments.length < 2 ?
	    (HTML == null ?
	      content$1('html') :
	      (typeof HTML === 'string' ?
	        hyper.wire(null, HTML) :
	        ('raw' in HTML ?
	          content$1('html')(HTML) :
	          ('nodeType' in HTML ?
	            hyper.bind(HTML) :
	            weakly(HTML, 'html')
	          )
	        )
	      )) :
	    ('raw' in HTML ?
	      content$1('html') : hyper.wire
	    ).apply(null, arguments);
	}

	/** ------------------------------------------------------------------------------------------------
	 *  @filename  brik.js
	 *  @author  brikcss  <https://github.com/brikcss>
	 *  @description  Extensible class to assist in creating Brikcss Custom Elements.
	 *  @credit  Thank you to @WebReflection for the awesome HyperHTML set of libraries. Much of the
	 *      inspiration for BrikElement was drawn from this work:
	 *      https://github.com/WebReflection/hyperHTML-Element.
	 ** --------------------------------------------------------------------------------------------- */

	class BrikElement extends HTMLElement {
		// Defines a Custom Element. Extensible with `class element extends BrikElement {}`. Define with
		// element.define('my-element', {...});
		static define(config = {}, Class) {
			// Allow flexible ways of passing arguments.
			if (typeof config === 'function') {
				Class = config;
				config = {};
			} else {
				Class = Class || this;
				if (typeof config === 'string') config = { tag: config };
			}

			// Set default config.
			window.brikcss = window.brikcss || {};
			config = Object.assign({
				prefix: window.brikcss.prefix || 'brik',
				tag: Class.name ? camelToKebabCase(Class.name) : '',
				define: !Class.prototype.define
			}, config);

			// observedAttributes create a mechanism to reflect attributes to props and vice versa. For
			// each observedAttributes, an accessor is defined at `this[prop]` which, when set, will
			// reflect the value to props. Note: attributes are converted to kebab-case, while props are
			// converted to camelCase.
			if (!Class.observedAttributes) {
				const defaults = Object.assign({}, Class.prototype.defaults, Class.defaults);
				Class.observedAttributes = Object.keys(defaults).map(prop => {
					return camelToKebabCase(prop);
				});
			}
			(Class.observedAttributes || []).forEach(attr => {
				const prop = kebabToCamelCase(attr);
				if (!(prop in Class.prototype)) {
					Object.defineProperty(Class.prototype, prop, {
						configurable: true,
						get() {
							return this.props[prop];
						},
						set(value) {
							this.props[prop] = value;
							this.setAttribute(attr, value);
						}
					});
				}
			});

			// Wrapper around child's attributeChangedCallback to reflect attribute changes to props. It
			// also upgrade the child's attributeChangedCallback to only run if the value has changed,
			// which prevents triggering attributeChangedCallback more than once.
			// NOTE: In the initial render, attributes are not set in the DOM. This is because it
			// creates unnecessary renders and can bloat the markup. As soon as any attribute or prop
			// changes, however, it gets reflected in the DOM.
			const created = Class.prototype.created;
			const onChanged = Class.prototype.attributeChangedCallback;
			const hasChange = !!onChanged;
			if (created || hasChange) {
				Object.defineProperty(Class.prototype, 'attributeChangedCallback', {
					configurable: true,
					value(attr, oldValue, value) {
						if (created && !this._initialized) {
							checkReady.call(this, created);
						}
						if (this._initialized && oldValue !== value) {
							const prop = kebabToCamelCase(attr);
							const propCapitalized = prop.replace(/(?:^|\s)\S/g, function (a) {
								return a.toUpperCase();
							});
							if (value === 'true') this.props[prop] = true;else if (['false', 'null', 'undefined'].includes(value)) {
								this.props[prop] = false;
							} else this.props[prop] = value;
							if (hasChange) onChanged.call(this, prop, oldValue, value, attr);
							if (typeof this['on' + propCapitalized] === 'function') {
								this['on' + propCapitalized].call(this, value, oldValue, prop, attr);
							}
						}
					}
				});
			}

			// Created() replaces constructor() and ensures the node is fully known to the browser. It
			// is ensured to run either after DOMContentLoaded or once there is a next sibling. This
			// ensures you have full access to element attributes and/or childNodes.
			if (created) {
				// Ensures create() is only called once.
				Object.defineProperty(Class.prototype, '_initialized', {
					configurable: true,
					writable: true,
					value: false
				});

				// Wrapper around child's connectedCallback to check if element has initialized.
				const onConnected = Class.prototype.connectedCallback;
				const hasConnect = !!onConnected;
				Object.defineProperty(Class.prototype, 'connectedCallback', {
					configurable: true,
					writable: true,
					value() {
						if (!this._initialized) {
							checkReady.call(this, created);
						}
						if (hasConnect) {
							onConnected.apply(this, arguments);
						}
					}
				});
			}

			// Define lazily all handlers:
			// class { handleClick() { ... }
			// render() { `<a onclick=${this.handleClick}>` } }
			Object.getOwnPropertyNames(Class.prototype).forEach(key => {
				if (/^handle[A-Z]/.test(key)) {
					const _key = '_' + key;
					const method = Class.prototype[key];
					Object.defineProperty(Class.prototype, key, {
						configurable: true,
						get() {
							return this[_key] || (this[_key] = method.bind(this));
						}
					});
				}
			});

			// handleEvent() allows you to pass the element itself as an EventListener:
			// https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
			// class Reactive extends BrikElement {
			//   oninput(e) { console.log(this, 'changed', e.target.value); }
			//   render() { this.html`<input oninput="${this}">`; }
			// }
			if (!('handleEvent' in Class.prototype)) {
				Object.defineProperty(Class.prototype, 'handleEvent', {
					configurable: true,
					value(event) {
						this[(event.currentTarget.dataset || {}).call || 'on' + event.type](event);
					}
				});
			}

			// If child has a define method, run it now. Also, in this case config.define will be set to
			// false, unless it is explicitly set to true. This means customElements.define() must be
			// called manually if child.define() exists (unless config.define is set to true).
			const onDefine = Class.prototype.define;
			const hasDefine = !!onDefine;
			if (hasDefine) {
				// Call child's define method.
				onDefine.apply(Class, arguments);
			}

			// Define the Custom Element.
			if (config.define) {
				customElements.define(`${config.prefix ? config.prefix + '-' : ''}${config.tag}`, Class);
			}

			return Class;
		}

		// Lazily bind hyperhtml to the element. This attaches to Shadow DOM element, if present, or the
		// element itself if no Shadow DOM is used. NOTE: If using a closed Shadow DOM, do this:
		// `this._shadowRoot = this.attachShadow({mode: 'close'});`
		get html() {
			return this._html || (this.html = bind(this.shadowRoot || this._shadowRoot || this));
		}

		// `html` can be set, if necessary. It won't invoke render().
		set html(value) {
			Object.defineProperty(this, '_html', { configurable: true, value: value });
		}

		// Default props.
		get defaults() {
			return {};
		}

		// Overwrite this method with your own render
		render() {}

		// the state with a default
		get props() {
			return this._props || (this.props = this.defaults);
		}

		// it can be set too if necessary, it won't invoke render()
		set props(value) {
			Object.defineProperty(this, '_props', { configurable: true, value });
		}

		// Shallow copies props to this.props, and (by default) calls this.render() after updating
		// props. It can optionally set each element property, in which case it will not render.
		update(props, { render = true, setAttr = false } = {}) {
			const target = this.props;
			const source = typeof props === 'function' ? props.call(this, target) : props || this.props;
			for (const key in source) {
				const attr = kebabToCamelCase(key);
				if (setAttr && this.getAttribute(attr) !== source[key]) {
					this.setAttribute(attr, source[key]);
				}
				if (target[key] !== source[key]) target[key] = source[key];
			}
			if (render && !setAttr) this.render();
			return this;
		}
	}

	// Expose hyperhtml methods.
	BrikElement.Component = Component;
	BrikElement.bind = bind;
	BrikElement.intent = define;
	BrikElement.wire = wire;
	BrikElement.hyper = hyper;

	// ----------
	// DOM ready.
	// Allows created() method to ensure the element is fully known to the browser.
	const dom = {
		handleEvent: function handleEvent(e) {
			if (dom.ready) {
				document.removeEventListener(e.type, dom, false);
				dom.list.splice(0).forEach(function (fn) {
					fn();
				});
			}
		},
		get ready() {
			return document.readyState === 'complete';
		},
		list: []
	};

	if (!dom.ready) {
		document.addEventListener('DOMContentLoaded', dom, false);
	}

	/**
	 *  Check if DOM is ready.
	 *
	 *  @param   {Function}  created  created().
	 */
	function checkReady(created) {
		if (dom.ready || isReady.call(this, created)) {
			if (!this._initialized) {
				init.call(this);
				created.call(Object.defineProperty(this, '_initialized', { value: true }));
			}
		} else {
			dom.list.push(checkReady.bind(this, created));
		}
	}

	/**
	 *  Helper to check if DOM is ready.
	 *
	 *  @param   {Function}  created  created().
	 *  @return  {Boolean}  Whether DOM is ready.
	 */
	function isReady(created) {
		let el = this;
		do {
			if (el.nextSibling) return true;
		} while (el = el.parentNode);
		setTimeout(checkReady.bind(this, created));
		return false;
	}

	function init() {
		// Set up defaults.
		this.props = Object.assign({}, this.props, this.constructor.defaults, this.defaults);
		Object.keys(this.props).forEach(prop => {
			this.props[prop] = this.getAttribute(camelToKebabCase(prop)) || this.props[prop];
		});
		Object.defineProperty(this, '_initialized', { value: true });
	}

	/**
	 *  Convert string from camelCase to kebab-case.
	 *
	 *  @param   {String}  string  String to convert.
	 *  @return  {String}  kebab-case string.
	 */
	function camelToKebabCase(string) {
		return string.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 *  Convert string from kebab-case to camelCase.
	 *
	 *  @param   {String}  string  String to convert.
	 *  @return  {String}  camelCase string.
	 */
	function kebabToCamelCase(string) {
		return string.replace(/\W+(.)/g, (x, char) => char.toUpperCase());
	}

	var getDynamicStyles_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports['default'] = getDynamicStyles;
	/**
	 * Extracts a styles object with only props that contain function values.
	 */
	function getDynamicStyles(styles) {
	  var to = null;

	  for (var key in styles) {
	    var value = styles[key];
	    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

	    if (type === 'function') {
	      if (!to) to = {};
	      to[key] = value;
	    } else if (type === 'object' && value !== null && !Array.isArray(value)) {
	      var extracted = getDynamicStyles(value);
	      if (extracted) {
	        if (!to) to = {};
	        to[key] = extracted;
	      }
	    }
	  }

	  return to;
	}
	});

	unwrapExports(getDynamicStyles_1);

	var toCssValue_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = toCssValue;
	var join = function join(value, by) {
	  var result = '';
	  for (var i = 0; i < value.length; i++) {
	    // Remove !important from the value, it will be readded later.
	    if (value[i] === '!important') break;
	    if (result) result += by;
	    result += value[i];
	  }
	  return result;
	};

	/**
	 * Converts array values to string.
	 *
	 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
	 * `border: ['1px', '2px']` > `border: 1px, 2px;`
	 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
	 * `color: ['red', !important]` > `color: red !important;`
	 */
	function toCssValue(value) {
	  var ignoreImportant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (!Array.isArray(value)) return value;

	  var cssValue = '';

	  // Support space separated values via `[['5px', '10px']]`.
	  if (Array.isArray(value[0])) {
	    for (var i = 0; i < value.length; i++) {
	      if (value[i] === '!important') break;
	      if (cssValue) cssValue += ', ';
	      cssValue += join(value[i], ' ');
	    }
	  } else cssValue = join(value, ', ');

	  // Add !important, because it was ignored.
	  if (!ignoreImportant && value[value.length - 1] === '!important') {
	    cssValue += ' !important';
	  }

	  return cssValue;
	}
	});

	unwrapExports(toCssValue_1);

	var SheetsRegistry_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Sheets registry to access them all at one place.
	 */
	var SheetsRegistry = function () {
	  function SheetsRegistry() {
	    _classCallCheck(this, SheetsRegistry);

	    this.registry = [];
	  }

	  _createClass(SheetsRegistry, [{
	    key: 'add',


	    /**
	     * Register a Style Sheet.
	     */
	    value: function add(sheet) {
	      var registry = this.registry;
	      var index = sheet.options.index;


	      if (registry.indexOf(sheet) !== -1) return;

	      if (registry.length === 0 || index >= this.index) {
	        registry.push(sheet);
	        return;
	      }

	      // Find a position.
	      for (var i = 0; i < registry.length; i++) {
	        if (registry[i].options.index > index) {
	          registry.splice(i, 0, sheet);
	          return;
	        }
	      }
	    }

	    /**
	     * Reset the registry.
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.registry = [];
	    }

	    /**
	     * Remove a Style Sheet.
	     */

	  }, {
	    key: 'remove',
	    value: function remove(sheet) {
	      var index = this.registry.indexOf(sheet);
	      this.registry.splice(index, 1);
	    }

	    /**
	     * Convert all attached sheets to a CSS string.
	     */

	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      return this.registry.filter(function (sheet) {
	        return sheet.attached;
	      }).map(function (sheet) {
	        return sheet.toString(options);
	      }).join('\n');
	    }
	  }, {
	    key: 'index',


	    /**
	     * Current highest index number.
	     */
	    get: function get() {
	      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
	    }
	  }]);

	  return SheetsRegistry;
	}();

	exports['default'] = SheetsRegistry;
	});

	unwrapExports(SheetsRegistry_1);

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var __DEV__ = undefined !== 'production';

	var warning = function() {};

	if (__DEV__) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	var warning_1 = warning;

	var SheetsManager_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * SheetsManager is like a WeakMap which is designed to count StyleSheet
	 * instances and attach/detach automatically.
	 */
	var SheetsManager = function () {
	  function SheetsManager() {
	    _classCallCheck(this, SheetsManager);

	    this.sheets = [];
	    this.refs = [];
	    this.keys = [];
	  }

	  _createClass(SheetsManager, [{
	    key: 'get',
	    value: function get(key) {
	      var index = this.keys.indexOf(key);
	      return this.sheets[index];
	    }
	  }, {
	    key: 'add',
	    value: function add(key, sheet) {
	      var sheets = this.sheets,
	          refs = this.refs,
	          keys = this.keys;

	      var index = sheets.indexOf(sheet);

	      if (index !== -1) return index;

	      sheets.push(sheet);
	      refs.push(0);
	      keys.push(key);

	      return sheets.length - 1;
	    }
	  }, {
	    key: 'manage',
	    value: function manage(key) {
	      var index = this.keys.indexOf(key);
	      var sheet = this.sheets[index];
	      if (this.refs[index] === 0) sheet.attach();
	      this.refs[index]++;
	      if (!this.keys[index]) this.keys.splice(index, 0, key);
	      return sheet;
	    }
	  }, {
	    key: 'unmanage',
	    value: function unmanage(key) {
	      var index = this.keys.indexOf(key);
	      if (index === -1) {
	        // eslint-ignore-next-line no-console
	        (0, _warning2['default'])(false, "SheetsManager: can't find sheet to unmanage");
	        return;
	      }
	      if (this.refs[index] > 0) {
	        this.refs[index]--;
	        if (this.refs[index] === 0) this.sheets[index].detach();
	      }
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.keys.length;
	    }
	  }]);

	  return SheetsManager;
	}();

	exports['default'] = SheetsManager;
	});

	unwrapExports(SheetsManager_1);

	var toCss_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = toCss;



	var _toCssValue2 = _interopRequireDefault(toCssValue_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Indent a string.
	 * http://jsperf.com/array-join-vs-for
	 */
	function indentStr(str, indent) {
	  var result = '';
	  for (var index = 0; index < indent; index++) {
	    result += '  ';
	  }return result + str;
	}

	/**
	 * Converts a Rule to CSS string.
	 */

	function toCss(selector, style) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var result = '';

	  if (!style) return result;

	  var _options$indent = options.indent,
	      indent = _options$indent === undefined ? 0 : _options$indent;
	  var fallbacks = style.fallbacks;


	  indent++;

	  // Apply fallbacks first.
	  if (fallbacks) {
	    // Array syntax {fallbacks: [{prop: value}]}
	    if (Array.isArray(fallbacks)) {
	      for (var index = 0; index < fallbacks.length; index++) {
	        var fallback = fallbacks[index];
	        for (var prop in fallback) {
	          var value = fallback[prop];
	          if (value != null) {
	            result += '\n' + indentStr(prop + ': ' + (0, _toCssValue2['default'])(value) + ';', indent);
	          }
	        }
	      }
	    } else {
	      // Object syntax {fallbacks: {prop: value}}
	      for (var _prop in fallbacks) {
	        var _value = fallbacks[_prop];
	        if (_value != null) {
	          result += '\n' + indentStr(_prop + ': ' + (0, _toCssValue2['default'])(_value) + ';', indent);
	        }
	      }
	    }
	  }

	  for (var _prop2 in style) {
	    var _value2 = style[_prop2];
	    if (_value2 != null && _prop2 !== 'fallbacks') {
	      result += '\n' + indentStr(_prop2 + ': ' + (0, _toCssValue2['default'])(_value2) + ';', indent);
	    }
	  }

	  // Allow empty style in this case, because properties will be added dynamically.
	  if (!result && !options.allowEmpty) return result;

	  indent--;
	  result = indentStr(selector + ' {' + result + '\n', indent) + indentStr('}', indent);

	  return result;
	}
	});

	unwrapExports(toCss_1);

	var StyleRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _warning2 = _interopRequireDefault(warning_1);



	var _toCss2 = _interopRequireDefault(toCss_1);



	var _toCssValue2 = _interopRequireDefault(toCssValue_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StyleRule = function () {
	  function StyleRule(key, style, options) {
	    _classCallCheck(this, StyleRule);

	    this.type = 'style';
	    this.isProcessed = false;
	    var sheet = options.sheet,
	        Renderer = options.Renderer,
	        selector = options.selector;

	    this.key = key;
	    this.options = options;
	    this.style = style;
	    if (selector) this.selectorText = selector;
	    this.renderer = sheet ? sheet.renderer : new Renderer();
	  }

	  /**
	   * Set selector string.
	   * Attention: use this with caution. Most browsers didn't implement
	   * selectorText setter, so this may result in rerendering of entire Style Sheet.
	   */


	  _createClass(StyleRule, [{
	    key: 'prop',


	    /**
	     * Get or set a style property.
	     */
	    value: function prop(name, value) {
	      // It's a getter.
	      if (value === undefined) return this.style[name];

	      // Don't do anything if the value has not changed.
	      if (this.style[name] === value) return this;

	      value = this.options.jss.plugins.onChangeValue(value, name, this);

	      var isEmpty = value == null || value === false;
	      var isDefined = name in this.style;

	      // Value is empty and wasn't defined before.
	      if (isEmpty && !isDefined) return this;

	      // We are going to remove this value.
	      var remove = isEmpty && isDefined;

	      if (remove) delete this.style[name];else this.style[name] = value;

	      // Renderable is defined if StyleSheet option `link` is true.
	      if (this.renderable) {
	        if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, value);
	        return this;
	      }

	      var sheet = this.options.sheet;

	      if (sheet && sheet.attached) {
	        (0, _warning2['default'])(false, 'Rule is not linked. Missing sheet option "link: true".');
	      }
	      return this;
	    }

	    /**
	     * Apply rule to an element inline.
	     */

	  }, {
	    key: 'applyTo',
	    value: function applyTo(renderable) {
	      var json = this.toJSON();
	      for (var prop in json) {
	        this.renderer.setProperty(renderable, prop, json[prop]);
	      }return this;
	    }

	    /**
	     * Returns JSON representation of the rule.
	     * Fallbacks are not supported.
	     * Useful for inline styles.
	     */

	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var json = {};
	      for (var prop in this.style) {
	        var value = this.style[prop];
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _toCssValue2['default'])(value);
	      }
	      return json;
	    }

	    /**
	     * Generates a CSS string.
	     */

	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      var sheet = this.options.sheet;

	      var link = sheet ? sheet.options.link : false;
	      var opts = link ? _extends({}, options, { allowEmpty: true }) : options;
	      return (0, _toCss2['default'])(this.selector, this.style, opts);
	    }
	  }, {
	    key: 'selector',
	    set: function set(selector) {
	      if (selector === this.selectorText) return;

	      this.selectorText = selector;

	      if (!this.renderable) return;

	      var hasChanged = this.renderer.setSelector(this.renderable, selector);

	      // If selector setter is not implemented, rerender the rule.
	      if (!hasChanged && this.renderable) {
	        var renderable = this.renderer.replaceRule(this.renderable, this);
	        if (renderable) this.renderable = renderable;
	      }
	    }

	    /**
	     * Get selector string.
	     */
	    ,
	    get: function get() {
	      return this.selectorText;
	    }
	  }]);

	  return StyleRule;
	}();

	exports['default'] = StyleRule;
	});

	unwrapExports(StyleRule_1);

	var _symbolObservable = ( es$1 && result ) || es$1;

	var isObservable = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = function (value) {
	  return value && value[_symbolObservable2['default']] && value === value[_symbolObservable2['default']]();
	};
	});

	unwrapExports(isObservable);

	var cloneStyle_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports['default'] = cloneStyle;



	var _isObservable2 = _interopRequireDefault(isObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var isArray = Array.isArray;
	function cloneStyle(style) {
	  // Support empty values in case user ends up with them by accident.
	  if (style == null) return style;

	  // Support string value for SimpleRule.
	  var typeOfStyle = typeof style === 'undefined' ? 'undefined' : _typeof(style);

	  if (typeOfStyle === 'string' || typeOfStyle === 'number' || typeOfStyle === 'function') {
	    return style;
	  }

	  // Support array for FontFaceRule.
	  if (isArray(style)) return style.map(cloneStyle);

	  // Support Observable styles.  Observables are immutable, so we don't need to
	  // copy them.
	  if ((0, _isObservable2['default'])(style)) return style;

	  var newStyle = {};
	  for (var name in style) {
	    var value = style[name];
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      newStyle[name] = cloneStyle(value);
	      continue;
	    }
	    newStyle[name] = value;
	  }

	  return newStyle;
	}
	});

	unwrapExports(cloneStyle_1);

	var createRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = createRule;



	var _warning2 = _interopRequireDefault(warning_1);



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _cloneStyle2 = _interopRequireDefault(cloneStyle_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Create a rule instance.
	 */
	function createRule() {
	  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unnamed';
	  var decl = arguments[1];
	  var options = arguments[2];
	  var jss = options.jss;

	  var declCopy = (0, _cloneStyle2['default'])(decl);

	  var rule = jss.plugins.onCreateRule(name, declCopy, options);
	  if (rule) return rule;

	  // It is an at-rule and it has no instance.
	  if (name[0] === '@') {
	    (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
	  }

	  return new _StyleRule2['default'](name, declCopy, options);
	}
	});

	unwrapExports(createRule_1);

	var linkRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = linkRule;
	/**
	 * Link rule with CSSStyleRule and nested rules with corresponding nested cssRules if both exists.
	 */
	function linkRule(rule, cssRule) {
	  rule.renderable = cssRule;
	  if (rule.rules && cssRule.cssRules) rule.rules.link(cssRule.cssRules);
	}
	});

	unwrapExports(linkRule_1);

	var _escape = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CSS = commonjsGlobal.CSS;

	var env = undefined;

	var escapeRegex = /([[\].#*$><+~=|^:(),"'`])/g;

	exports['default'] = function (str) {
	  // We don't need to escape it in production, because we are not using user's
	  // input for selectors, we are generating a valid selector.
	  if (env === 'production') return str;

	  if (!CSS || !CSS.escape) {
	    return str.replace(escapeRegex, '\\$1');
	  }

	  return CSS.escape(str);
	};
	});

	unwrapExports(_escape);

	var RuleList_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _createRule2 = _interopRequireDefault(createRule_1);



	var _linkRule2 = _interopRequireDefault(linkRule_1);



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _escape2 = _interopRequireDefault(_escape);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Contains rules objects and allows adding/removing etc.
	 * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
	 */
	var RuleList = function () {

	  // Original styles object.
	  function RuleList(options) {
	    var _this = this;

	    _classCallCheck(this, RuleList);

	    this.map = {};
	    this.raw = {};
	    this.index = [];

	    this.update = function (name, data) {
	      var _options = _this.options,
	          plugins = _options.jss.plugins,
	          sheet = _options.sheet;

	      if (typeof name === 'string') {
	        plugins.onUpdate(data, _this.get(name), sheet);
	      } else {
	        for (var index = 0; index < _this.index.length; index++) {
	          plugins.onUpdate(name, _this.index[index], sheet);
	        }
	      }
	    };

	    this.options = options;
	    this.classes = options.classes;
	  }

	  /**
	   * Create and register rule.
	   *
	   * Will not render after Style Sheet was rendered the first time.
	   */


	  // Used to ensure correct rules order.

	  // Rules registry for access by .get() method.
	  // It contains the same rule registered by name and by selector.


	  _createClass(RuleList, [{
	    key: 'add',
	    value: function add(name, decl, options) {
	      var _options2 = this.options,
	          parent = _options2.parent,
	          sheet = _options2.sheet,
	          jss = _options2.jss,
	          Renderer = _options2.Renderer,
	          generateClassName = _options2.generateClassName;


	      options = _extends({
	        classes: this.classes,
	        parent: parent,
	        sheet: sheet,
	        jss: jss,
	        Renderer: Renderer,
	        generateClassName: generateClassName
	      }, options);

	      if (!options.selector && this.classes[name]) {
	        options.selector = '.' + (0, _escape2['default'])(this.classes[name]);
	      }

	      this.raw[name] = decl;

	      var rule = (0, _createRule2['default'])(name, decl, options);

	      var className = void 0;

	      if (!options.selector && rule instanceof _StyleRule2['default']) {
	        className = generateClassName(rule, sheet);
	        rule.selector = '.' + (0, _escape2['default'])(className);
	      }

	      this.register(rule, className);

	      var index = options.index === undefined ? this.index.length : options.index;
	      this.index.splice(index, 0, rule);

	      return rule;
	    }

	    /**
	     * Get a rule.
	     */

	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.map[name];
	    }

	    /**
	     * Delete a rule.
	     */

	  }, {
	    key: 'remove',
	    value: function remove(rule) {
	      this.unregister(rule);
	      this.index.splice(this.indexOf(rule), 1);
	    }

	    /**
	     * Get index of a rule.
	     */

	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.index.indexOf(rule);
	    }

	    /**
	     * Run `onProcessRule()` plugins on every rule.
	     */

	  }, {
	    key: 'process',
	    value: function process() {
	      var plugins = this.options.jss.plugins;
	      // We need to clone array because if we modify the index somewhere else during a loop
	      // we end up with very hard-to-track-down side effects.

	      this.index.slice(0).forEach(plugins.onProcessRule, plugins);
	    }

	    /**
	     * Register a rule in `.map` and `.classes` maps.
	     */

	  }, {
	    key: 'register',
	    value: function register(rule, className) {
	      this.map[rule.key] = rule;
	      if (rule instanceof _StyleRule2['default']) {
	        this.map[rule.selector] = rule;
	        if (className) this.classes[rule.key] = className;
	      }
	    }

	    /**
	     * Unregister a rule.
	     */

	  }, {
	    key: 'unregister',
	    value: function unregister(rule) {
	      delete this.map[rule.key];
	      if (rule instanceof _StyleRule2['default']) {
	        delete this.map[rule.selector];
	        delete this.classes[rule.key];
	      }
	    }

	    /**
	     * Update the function values with a new data.
	     */

	  }, {
	    key: 'link',


	    /**
	     * Link renderable rules with CSSRuleList.
	     */
	    value: function link(cssRules) {
	      var map = this.options.sheet.renderer.getUnescapedKeysMap(this.index);

	      for (var i = 0; i < cssRules.length; i++) {
	        var cssRule = cssRules[i];
	        var _key = this.options.sheet.renderer.getKey(cssRule);
	        if (map[_key]) _key = map[_key];
	        var rule = this.map[_key];
	        if (rule) (0, _linkRule2['default'])(rule, cssRule);
	      }
	    }

	    /**
	     * Convert rules to a CSS string.
	     */

	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      var str = '';
	      var sheet = this.options.sheet;

	      var link = sheet ? sheet.options.link : false;

	      for (var index = 0; index < this.index.length; index++) {
	        var rule = this.index[index];
	        var css = rule.toString(options);

	        // No need to render an empty rule.
	        if (!css && !link) continue;

	        if (str) str += '\n';
	        str += css;
	      }

	      return str;
	    }
	  }]);

	  return RuleList;
	}();

	exports['default'] = RuleList;
	});

	unwrapExports(RuleList_1);

	var sheets = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _SheetsRegistry2 = _interopRequireDefault(SheetsRegistry_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * This is a global sheets registry. Only DomRenderer will add sheets to it.
	 * On the server one should use an own SheetsRegistry instance and add the
	 * sheets to it, because you need to make sure to create a new registry for
	 * each request in order to not leak sheets across requests.
	 */
	exports['default'] = new _SheetsRegistry2['default']();
	});

	unwrapExports(sheets);

	var StyleSheet_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _linkRule2 = _interopRequireDefault(linkRule_1);



	var _RuleList2 = _interopRequireDefault(RuleList_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint-disable-next-line no-use-before-define */
	var StyleSheet = function () {
	  function StyleSheet(styles, options) {
	    var _this = this;

	    _classCallCheck(this, StyleSheet);

	    this.update = function (name, data) {
	      if (typeof name === 'string') {
	        _this.rules.update(name, data);
	      } else {
	        _this.rules.update(name);
	      }
	      return _this;
	    };

	    this.attached = false;
	    this.deployed = false;
	    this.linked = false;
	    this.classes = {};
	    this.options = _extends({}, options, {
	      sheet: this,
	      parent: this,
	      classes: this.classes
	    });
	    this.renderer = new options.Renderer(this);
	    this.rules = new _RuleList2['default'](this.options);

	    for (var _name in styles) {
	      this.rules.add(_name, styles[_name]);
	    }

	    this.rules.process();
	  }

	  /**
	   * Attach renderable to the render tree.
	   */


	  _createClass(StyleSheet, [{
	    key: 'attach',
	    value: function attach() {
	      if (this.attached) return this;
	      if (!this.deployed) this.deploy();
	      this.renderer.attach();
	      if (!this.linked && this.options.link) this.link();
	      this.attached = true;
	      return this;
	    }

	    /**
	     * Remove renderable from render tree.
	     */

	  }, {
	    key: 'detach',
	    value: function detach() {
	      if (!this.attached) return this;
	      this.renderer.detach();
	      this.attached = false;
	      return this;
	    }

	    /**
	     * Add a rule to the current stylesheet.
	     * Will insert a rule also after the stylesheet has been rendered first time.
	     */

	  }, {
	    key: 'addRule',
	    value: function addRule(name, decl, options) {
	      var queue = this.queue;

	      // Plugins can create rules.
	      // In order to preserve the right order, we need to queue all `.addRule` calls,
	      // which happen after the first `rules.add()` call.

	      if (this.attached && !queue) this.queue = [];

	      var rule = this.rules.add(name, decl, options);
	      this.options.jss.plugins.onProcessRule(rule);

	      if (this.attached) {
	        if (!this.deployed) return rule;
	        // Don't insert rule directly if there is no stringified version yet.
	        // It will be inserted all together when .attach is called.
	        if (queue) queue.push(rule);else {
	          this.insertRule(rule);
	          if (this.queue) {
	            this.queue.forEach(this.insertRule, this);
	            this.queue = undefined;
	          }
	        }
	        return rule;
	      }

	      // We can't add rules to a detached style node.
	      // We will redeploy the sheet once user will attach it.
	      this.deployed = false;

	      return rule;
	    }

	    /**
	     * Insert rule into the StyleSheet
	     */

	  }, {
	    key: 'insertRule',
	    value: function insertRule(rule) {
	      var renderable = this.renderer.insertRule(rule);
	      if (renderable && this.options.link) (0, _linkRule2['default'])(rule, renderable);
	    }

	    /**
	     * Create and add rules.
	     * Will render also after Style Sheet was rendered the first time.
	     */

	  }, {
	    key: 'addRules',
	    value: function addRules(styles, options) {
	      var added = [];
	      for (var _name2 in styles) {
	        added.push(this.addRule(_name2, styles[_name2], options));
	      }
	      return added;
	    }

	    /**
	     * Get a rule by name.
	     */

	  }, {
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }

	    /**
	     * Delete a rule by name.
	     * Returns `true`: if rule has been deleted from the DOM.
	     */

	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(name) {
	      var rule = this.rules.get(name);

	      if (!rule) return false;

	      this.rules.remove(rule);

	      if (this.attached && rule.renderable) {
	        return this.renderer.deleteRule(rule.renderable);
	      }

	      return true;
	    }

	    /**
	     * Get index of a rule.
	     */

	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }

	    /**
	     * Deploy pure CSS string to a renderable.
	     */

	  }, {
	    key: 'deploy',
	    value: function deploy() {
	      this.renderer.deploy();
	      this.deployed = true;
	      return this;
	    }

	    /**
	     * Link renderable CSS rules from sheet with their corresponding models.
	     */

	  }, {
	    key: 'link',
	    value: function link() {
	      var cssRules = this.renderer.getRules();

	      // Is undefined when VirtualRenderer is used.
	      if (cssRules) this.rules.link(cssRules);
	      this.linked = true;
	      return this;
	    }

	    /**
	     * Update the function values with a new data.
	     */

	  }, {
	    key: 'toString',


	    /**
	     * Convert rules to a CSS string.
	     */
	    value: function toString(options) {
	      return this.rules.toString(options);
	    }
	  }]);

	  return StyleSheet;
	}();

	exports['default'] = StyleSheet;
	});

	unwrapExports(StyleSheet_1);

	var moduleId = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
	if (commonjsGlobal[ns] == null) commonjsGlobal[ns] = 0;

	// Bundle may contain multiple JSS versions at the same time. In order to identify
	// the current version with just one short number and use it for classes generation
	// we use a counter. Also it is more accurate, because user can manually reevaluate
	// the module.
	exports['default'] = commonjsGlobal[ns]++;
	});

	unwrapExports(moduleId);

	var createGenerateClassName = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _warning2 = _interopRequireDefault(warning_1);



	var _StyleSheet2 = _interopRequireDefault(StyleSheet_1);



	var _moduleId2 = _interopRequireDefault(moduleId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var maxRules = 1e10;


	var env = undefined;

	/**
	 * Returns a function which generates unique class names based on counters.
	 * When new generator function is created, rule counter is reseted.
	 * We need to reset the rule counter for SSR for each request.
	 */

	exports['default'] = function () {
	  var ruleCounter = 0;
	  var defaultPrefix = env === 'production' ? 'c' : '';

	  return function (rule, sheet) {
	    ruleCounter += 1;

	    if (ruleCounter > maxRules) {
	      (0, _warning2['default'])(false, '[JSS] You might have a memory leak. Rule counter is at %s.', ruleCounter);
	    }

	    var prefix = defaultPrefix;
	    var jssId = '';

	    if (sheet) {
	      prefix = sheet.options.classNamePrefix || defaultPrefix;
	      if (sheet.options.jss.id != null) jssId += sheet.options.jss.id;
	    }

	    if (env === 'production') {
	      return '' + prefix + _moduleId2['default'] + jssId + ruleCounter;
	    }

	    return prefix + rule.key + '-' + _moduleId2['default'] + (jssId && '-' + jssId) + '-' + ruleCounter;
	  };
	};
	});

	unwrapExports(createGenerateClassName);

	var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof$5(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof$5(document)) === 'object' && document.nodeType === 9;

	var module$1 = /*#__PURE__*/Object.freeze({
		isBrowser: isBrowser,
		default: isBrowser
	});

	var PluginsRegistry_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PluginsRegistry = function () {
	  function PluginsRegistry() {
	    _classCallCheck(this, PluginsRegistry);

	    this.hooks = {
	      onCreateRule: [],
	      onProcessRule: [],
	      onProcessStyle: [],
	      onProcessSheet: [],
	      onChangeValue: [],
	      onUpdate: []

	      /**
	       * Call `onCreateRule` hooks and return an object if returned by a hook.
	       */
	    };
	  }

	  _createClass(PluginsRegistry, [{
	    key: 'onCreateRule',
	    value: function onCreateRule(name, decl, options) {
	      for (var i = 0; i < this.hooks.onCreateRule.length; i++) {
	        var rule = this.hooks.onCreateRule[i](name, decl, options);
	        if (rule) return rule;
	      }
	      return null;
	    }

	    /**
	     * Call `onProcessRule` hooks.
	     */

	  }, {
	    key: 'onProcessRule',
	    value: function onProcessRule(rule) {
	      if (rule.isProcessed) return;
	      var sheet = rule.options.sheet;

	      for (var i = 0; i < this.hooks.onProcessRule.length; i++) {
	        this.hooks.onProcessRule[i](rule, sheet);
	      }

	      // $FlowFixMe
	      if (rule.style) this.onProcessStyle(rule.style, rule, sheet);

	      rule.isProcessed = true;
	    }

	    /**
	     * Call `onProcessStyle` hooks.
	     */

	  }, {
	    key: 'onProcessStyle',
	    value: function onProcessStyle(style, rule, sheet) {
	      var nextStyle = style;

	      for (var i = 0; i < this.hooks.onProcessStyle.length; i++) {
	        nextStyle = this.hooks.onProcessStyle[i](nextStyle, rule, sheet);
	        // $FlowFixMe
	        rule.style = nextStyle;
	      }
	    }

	    /**
	     * Call `onProcessSheet` hooks.
	     */

	  }, {
	    key: 'onProcessSheet',
	    value: function onProcessSheet(sheet) {
	      for (var i = 0; i < this.hooks.onProcessSheet.length; i++) {
	        this.hooks.onProcessSheet[i](sheet);
	      }
	    }

	    /**
	     * Call `onUpdate` hooks.
	     */

	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(data, rule, sheet) {
	      for (var i = 0; i < this.hooks.onUpdate.length; i++) {
	        this.hooks.onUpdate[i](data, rule, sheet);
	      }
	    }

	    /**
	     * Call `onChangeValue` hooks.
	     */

	  }, {
	    key: 'onChangeValue',
	    value: function onChangeValue(value, prop, rule) {
	      var processedValue = value;
	      for (var i = 0; i < this.hooks.onChangeValue.length; i++) {
	        processedValue = this.hooks.onChangeValue[i](processedValue, prop, rule);
	      }
	      return processedValue;
	    }

	    /**
	     * Register a plugin.
	     * If function is passed, it is a shortcut for `{onProcessRule}`.
	     */

	  }, {
	    key: 'use',
	    value: function use(plugin) {
	      for (var name in plugin) {
	        if (this.hooks[name]) this.hooks[name].push(plugin[name]);else (0, _warning2['default'])(false, '[JSS] Unknown hook "%s".', name);
	      }
	    }
	  }]);

	  return PluginsRegistry;
	}();

	exports['default'] = PluginsRegistry;
	});

	unwrapExports(PluginsRegistry_1);

	var SimpleRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SimpleRule = function () {
	  function SimpleRule(key, value, options) {
	    _classCallCheck(this, SimpleRule);

	    this.type = 'simple';
	    this.isProcessed = false;

	    this.key = key;
	    this.value = value;
	    this.options = options;
	  }

	  /**
	   * Generates a CSS string.
	   */
	  // eslint-disable-next-line no-unused-vars


	  _createClass(SimpleRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      if (Array.isArray(this.value)) {
	        var str = '';
	        for (var index = 0; index < this.value.length; index++) {
	          str += this.key + ' ' + this.value[index] + ';';
	          if (this.value[index + 1]) str += '\n';
	        }
	        return str;
	      }

	      return this.key + ' ' + this.value + ';';
	    }
	  }]);

	  return SimpleRule;
	}();

	exports['default'] = SimpleRule;
	});

	unwrapExports(SimpleRule_1);

	var KeyframesRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _RuleList2 = _interopRequireDefault(RuleList_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Rule for @keyframes
	 */
	var KeyframesRule = function () {
	  function KeyframesRule(key, frames, options) {
	    _classCallCheck(this, KeyframesRule);

	    this.type = 'keyframes';
	    this.isProcessed = false;

	    this.key = key;
	    this.options = options;
	    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

	    for (var name in frames) {
	      this.rules.add(name, frames[name], _extends({}, this.options, {
	        parent: this,
	        selector: name
	      }));
	    }

	    this.rules.process();
	  }

	  /**
	   * Generates a CSS string.
	   */


	  _createClass(KeyframesRule, [{
	    key: 'toString',
	    value: function toString() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

	      var inner = this.rules.toString(options);
	      if (inner) inner += '\n';
	      return this.key + ' {\n' + inner + '}';
	    }
	  }]);

	  return KeyframesRule;
	}();

	exports['default'] = KeyframesRule;
	});

	unwrapExports(KeyframesRule_1);

	var ConditionalRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _RuleList2 = _interopRequireDefault(RuleList_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Conditional rule for @media, @supports
	 */
	var ConditionalRule = function () {
	  function ConditionalRule(key, styles, options) {
	    _classCallCheck(this, ConditionalRule);

	    this.type = 'conditional';
	    this.isProcessed = false;

	    this.key = key;
	    this.options = options;
	    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));

	    for (var name in styles) {
	      this.rules.add(name, styles[name]);
	    }

	    this.rules.process();
	  }

	  /**
	   * Get a rule.
	   */


	  _createClass(ConditionalRule, [{
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }

	    /**
	     * Get index of a rule.
	     */

	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }

	    /**
	     * Create and register rule, run plugins.
	     */

	  }, {
	    key: 'addRule',
	    value: function addRule(name, style, options) {
	      var rule = this.rules.add(name, style, options);
	      this.options.jss.plugins.onProcessRule(rule);
	      return rule;
	    }

	    /**
	     * Generates a CSS string.
	     */

	  }, {
	    key: 'toString',
	    value: function toString() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };

	      var inner = this.rules.toString(options);
	      return inner ? this.key + ' {\n' + inner + '\n}' : '';
	    }
	  }]);

	  return ConditionalRule;
	}();

	exports['default'] = ConditionalRule;
	});

	unwrapExports(ConditionalRule_1);

	var FontFaceRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _toCss2 = _interopRequireDefault(toCss_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FontFaceRule = function () {
	  function FontFaceRule(key, style, options) {
	    _classCallCheck(this, FontFaceRule);

	    this.type = 'font-face';
	    this.isProcessed = false;

	    this.key = key;
	    this.style = style;
	    this.options = options;
	  }

	  /**
	   * Generates a CSS string.
	   */


	  _createClass(FontFaceRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      if (Array.isArray(this.style)) {
	        var str = '';
	        for (var index = 0; index < this.style.length; index++) {
	          str += (0, _toCss2['default'])(this.key, this.style[index]);
	          if (this.style[index + 1]) str += '\n';
	        }
	        return str;
	      }

	      return (0, _toCss2['default'])(this.key, this.style, options);
	    }
	  }]);

	  return FontFaceRule;
	}();

	exports['default'] = FontFaceRule;
	});

	unwrapExports(FontFaceRule_1);

	var ViewportRule_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _toCss2 = _interopRequireDefault(toCss_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewportRule = function () {
	  function ViewportRule(key, style, options) {
	    _classCallCheck(this, ViewportRule);

	    this.type = 'viewport';
	    this.isProcessed = false;

	    this.key = key;
	    this.style = style;
	    this.options = options;
	  }

	  /**
	   * Generates a CSS string.
	   */


	  _createClass(ViewportRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      return (0, _toCss2['default'])(this.key, this.style, options);
	    }
	  }]);

	  return ViewportRule;
	}();

	exports['default'] = ViewportRule;
	});

	unwrapExports(ViewportRule_1);

	var rules$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _SimpleRule2 = _interopRequireDefault(SimpleRule_1);



	var _KeyframesRule2 = _interopRequireDefault(KeyframesRule_1);



	var _ConditionalRule2 = _interopRequireDefault(ConditionalRule_1);



	var _FontFaceRule2 = _interopRequireDefault(FontFaceRule_1);



	var _ViewportRule2 = _interopRequireDefault(ViewportRule_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var classes = {
	  '@charset': _SimpleRule2['default'],
	  '@import': _SimpleRule2['default'],
	  '@namespace': _SimpleRule2['default'],
	  '@keyframes': _KeyframesRule2['default'],
	  '@media': _ConditionalRule2['default'],
	  '@supports': _ConditionalRule2['default'],
	  '@font-face': _FontFaceRule2['default'],
	  '@viewport': _ViewportRule2['default'],
	  '@-ms-viewport': _ViewportRule2['default']

	  /**
	   * Generate plugins which will register all rules.
	   */
	};
	var plugins = Object.keys(classes).map(function (key) {
	  // https://jsperf.com/indexof-vs-substr-vs-regex-at-the-beginning-3
	  var re = new RegExp('^' + key);
	  var RuleClass = classes[key];
	  var onCreateRule = function onCreateRule(name, decl, options) {
	    return re.test(name) ? new RuleClass(name, decl, options) : null;
	  };
	  return { onCreateRule: onCreateRule };
	});

	exports['default'] = plugins;
	});

	unwrapExports(rules$1);

	var observables = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _createRule2 = _interopRequireDefault(createRule_1);



	var _isObservable2 = _interopRequireDefault(isObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = {
	  onCreateRule: function onCreateRule(name, decl, options) {
	    if (!(0, _isObservable2['default'])(decl)) return null;

	    // Cast `decl` to `Observable`, since it passed the type guard.
	    var style$ = decl;

	    var rule = (0, _createRule2['default'])(name, {}, options);

	    // TODO
	    // Call `stream.subscribe()` returns a subscription, which should be explicitly
	    // unsubscribed from when we know this sheet is no longer needed.
	    style$.subscribe(function (style) {
	      for (var prop in style) {
	        rule.prop(prop, style[prop]);
	      }
	    });

	    return rule;
	  },
	  onProcessRule: function onProcessRule(rule) {
	    if (!(rule instanceof _StyleRule2['default'])) return;
	    var styleRule = rule;
	    var style = styleRule.style;

	    var _loop = function _loop(prop) {
	      var value = style[prop];
	      if (!(0, _isObservable2['default'])(value)) return 'continue';
	      delete style[prop];
	      value.subscribe({
	        next: function next(nextValue) {
	          styleRule.prop(prop, nextValue);
	        }
	      });
	    };

	    for (var prop in style) {
	      var _ret = _loop(prop);

	      if (_ret === 'continue') continue;
	    }
	  }
	};
	});

	unwrapExports(observables);

	var functions = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _RuleList2 = _interopRequireDefault(RuleList_1);



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _createRule2 = _interopRequireDefault(createRule_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// A symbol replacement.
	var now = Date.now();

	var fnValuesNs = 'fnValues' + now;
	var fnStyleNs = 'fnStyle' + ++now;

	exports['default'] = {
	  onCreateRule: function onCreateRule(name, decl, options) {
	    if (typeof decl !== 'function') return null;
	    var rule = (0, _createRule2['default'])(name, {}, options);
	    rule[fnStyleNs] = decl;
	    return rule;
	  },
	  onProcessStyle: function onProcessStyle(style, rule) {
	    var fn = {};
	    for (var prop in style) {
	      var value = style[prop];
	      if (typeof value !== 'function') continue;
	      delete style[prop];
	      fn[prop] = value;
	    }
	    rule = rule;
	    rule[fnValuesNs] = fn;
	    return style;
	  },
	  onUpdate: function onUpdate(data, rule) {
	    // It is a rules container like for e.g. ConditionalRule.
	    if (rule.rules instanceof _RuleList2['default']) {
	      rule.rules.update(data);
	      return;
	    }
	    if (!(rule instanceof _StyleRule2['default'])) return;

	    rule = rule;

	    // If we have a fn values map, it is a rule with function values.
	    if (rule[fnValuesNs]) {
	      for (var prop in rule[fnValuesNs]) {
	        rule.prop(prop, rule[fnValuesNs][prop](data));
	      }
	    }

	    rule = rule;

	    var fnStyle = rule[fnStyleNs];

	    // If we have a style function, the entire rule is dynamic and style object
	    // will be returned from that function.
	    if (fnStyle) {
	      var style = fnStyle(data);
	      for (var _prop in style) {
	        rule.prop(_prop, style[_prop]);
	      }
	    }
	  }
	};
	});

	unwrapExports(functions);

	var DomRenderer_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _warning2 = _interopRequireDefault(warning_1);



	var _sheets2 = _interopRequireDefault(sheets);



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _toCssValue2 = _interopRequireDefault(toCssValue_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Cache the value from the first time a function is called.
	 */
	var memoize = function memoize(fn) {
	  var value = void 0;
	  return function () {
	    if (!value) value = fn();
	    return value;
	  };
	};

	/**
	 * Get a style property value.
	 */
	function getPropertyValue(cssRule, prop) {
	  try {
	    return cssRule.style.getPropertyValue(prop);
	  } catch (err) {
	    // IE may throw if property is unknown.
	    return '';
	  }
	}

	/**
	 * Set a style property.
	 */
	function setProperty(cssRule, prop, value) {
	  try {
	    var cssValue = value;

	    if (Array.isArray(value)) {
	      cssValue = (0, _toCssValue2['default'])(value, true);

	      if (value[value.length - 1] === '!important') {
	        cssRule.style.setProperty(prop, cssValue, 'important');
	        return true;
	      }
	    }

	    cssRule.style.setProperty(prop, cssValue);
	  } catch (err) {
	    // IE may throw if property is unknown.
	    return false;
	  }
	  return true;
	}

	/**
	 * Remove a style property.
	 */
	function removeProperty(cssRule, prop) {
	  try {
	    cssRule.style.removeProperty(prop);
	  } catch (err) {
	    (0, _warning2['default'])(false, '[JSS] DOMException "%s" was thrown. Tried to remove property "%s".', err.message, prop);
	  }
	}

	var CSSRuleTypes = {
	  STYLE_RULE: 1,
	  KEYFRAMES_RULE: 7

	  /**
	   * Get the CSS Rule key.
	   */

	};var getKey = function () {
	  var extractKey = function extractKey(cssText) {
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    return cssText.substr(from, cssText.indexOf('{') - 1);
	  };

	  return function (cssRule) {
	    if (cssRule.type === CSSRuleTypes.STYLE_RULE) return cssRule.selectorText;
	    if (cssRule.type === CSSRuleTypes.KEYFRAMES_RULE) {
	      var name = cssRule.name;

	      if (name) return '@keyframes ' + name;

	      // There is no rule.name in the following browsers:
	      // - IE 9
	      // - Safari 7.1.8
	      // - Mobile Safari 9.0.0
	      var cssText = cssRule.cssText;

	      return '@' + extractKey(cssText, cssText.indexOf('keyframes'));
	    }

	    // Conditionals.
	    return extractKey(cssRule.cssText);
	  };
	}();

	/**
	 * Set the selector.
	 */
	function setSelector(cssRule, selectorText) {
	  cssRule.selectorText = selectorText;

	  // Return false if setter was not successful.
	  // Currently works in chrome only.
	  return cssRule.selectorText === selectorText;
	}

	/**
	 * Gets the `head` element upon the first call and caches it.
	 */
	var getHead = memoize(function () {
	  return document.head || document.getElementsByTagName('head')[0];
	});

	/**
	 * Gets a map of rule keys, where the property is an unescaped key and value
	 * is a potentially escaped one.
	 * It is used to identify CSS rules and the corresponding JSS rules. As an identifier
	 * for CSSStyleRule we normally use `selectorText`. Though if original selector text
	 * contains escaped code points e.g. `:not(#\\20)`, CSSOM will compile it to `:not(# )`
	 * and so CSS rule's `selectorText` won't match JSS rule selector.
	 *
	 * https://www.w3.org/International/questions/qa-escapes#cssescapes
	 */
	var getUnescapedKeysMap = function () {
	  var style = void 0;
	  var isAttached = false;

	  return function (rules) {
	    var map = {};
	    // https://github.com/facebook/flow/issues/2696
	    if (!style) style = document.createElement('style');
	    for (var i = 0; i < rules.length; i++) {
	      var rule = rules[i];
	      if (!(rule instanceof _StyleRule2['default'])) continue;
	      var selector = rule.selector;
	      // Only unescape selector over CSSOM if it contains a back slash.

	      if (selector && selector.indexOf('\\') !== -1) {
	        // Lazilly attach when needed.
	        if (!isAttached) {
	          getHead().appendChild(style);
	          isAttached = true;
	        }
	        style.textContent = selector + ' {}';
	        var _style = style,
	            sheet = _style.sheet;

	        if (sheet) {
	          var cssRules = sheet.cssRules;

	          if (cssRules) map[cssRules[0].selectorText] = rule.key;
	        }
	      }
	    }
	    if (isAttached) {
	      getHead().removeChild(style);
	      isAttached = false;
	    }
	    return map;
	  };
	}();

	/**
	 * Find attached sheet with an index higher than the passed one.
	 */
	function findHigherSheet(registry, options) {
	  for (var i = 0; i < registry.length; i++) {
	    var sheet = registry[i];
	    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
	      return sheet;
	    }
	  }
	  return null;
	}

	/**
	 * Find attached sheet with the highest index.
	 */
	function findHighestSheet(registry, options) {
	  for (var i = registry.length - 1; i >= 0; i--) {
	    var sheet = registry[i];
	    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
	      return sheet;
	    }
	  }
	  return null;
	}

	/**
	 * Find a comment with "jss" inside.
	 */
	function findCommentNode(text) {
	  var head = getHead();
	  for (var i = 0; i < head.childNodes.length; i++) {
	    var node = head.childNodes[i];
	    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
	      return node;
	    }
	  }
	  return null;
	}

	/**
	 * Find a node before which we can insert the sheet.
	 */
	function findPrevNode(options) {
	  var registry = _sheets2['default'].registry;


	  if (registry.length > 0) {
	    // Try to insert before the next higher sheet.
	    var sheet = findHigherSheet(registry, options);
	    if (sheet) return sheet.renderer.element;

	    // Otherwise insert after the last attached.
	    sheet = findHighestSheet(registry, options);
	    if (sheet) return sheet.renderer.element.nextElementSibling;
	  }

	  // Try to find a comment placeholder if registry is empty.
	  var insertionPoint = options.insertionPoint;

	  if (insertionPoint && typeof insertionPoint === 'string') {
	    var comment = findCommentNode(insertionPoint);
	    if (comment) return comment.nextSibling;
	    // If user specifies an insertion point and it can't be found in the document -
	    // bad specificity issues may appear.
	    (0, _warning2['default'])(insertionPoint === 'jss', '[JSS] Insertion point "%s" not found.', insertionPoint);
	  }

	  return null;
	}

	/**
	 * Insert style element into the DOM.
	 */
	function insertStyle(style, options) {
	  var insertionPoint = options.insertionPoint;

	  var prevNode = findPrevNode(options);

	  if (prevNode) {
	    var parentNode = prevNode.parentNode;

	    if (parentNode) parentNode.insertBefore(style, prevNode);
	    return;
	  }

	  // Works with iframes and any node types.
	  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
	    // https://stackoverflow.com/questions/41328728/force-casting-in-flow
	    var insertionPointElement = insertionPoint;
	    var _parentNode = insertionPointElement.parentNode;

	    if (_parentNode) _parentNode.insertBefore(style, insertionPointElement.nextSibling);else (0, _warning2['default'])(false, '[JSS] Insertion point is not in the DOM.');
	    return;
	  }

	  getHead().insertBefore(style, prevNode);
	}

	/**
	 * Read jss nonce setting from the page if the user has set it.
	 */
	var getNonce = memoize(function () {
	  var node = document.querySelector('meta[property="csp-nonce"]');
	  return node ? node.getAttribute('content') : null;
	});

	var DomRenderer = function () {
	  function DomRenderer(sheet) {
	    _classCallCheck(this, DomRenderer);

	    this.getPropertyValue = getPropertyValue;
	    this.setProperty = setProperty;
	    this.removeProperty = removeProperty;
	    this.setSelector = setSelector;
	    this.getKey = getKey;
	    this.getUnescapedKeysMap = getUnescapedKeysMap;
	    this.hasInsertedRules = false;

	    // There is no sheet when the renderer is used from a standalone StyleRule.
	    if (sheet) _sheets2['default'].add(sheet);

	    this.sheet = sheet;

	    var _ref = this.sheet ? this.sheet.options : {},
	        media = _ref.media,
	        meta = _ref.meta,
	        element = _ref.element;

	    this.element = element || document.createElement('style');
	    this.element.type = 'text/css';
	    this.element.setAttribute('data-jss', '');
	    if (media) this.element.setAttribute('media', media);
	    if (meta) this.element.setAttribute('data-meta', meta);
	    var nonce = getNonce();
	    if (nonce) this.element.setAttribute('nonce', nonce);
	  }

	  /**
	   * Insert style element into render tree.
	   */


	  // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696


	  _createClass(DomRenderer, [{
	    key: 'attach',
	    value: function attach() {
	      // In the case the element node is external and it is already in the DOM.
	      if (this.element.parentNode || !this.sheet) return;

	      // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
	      // browsers remove those rules.
	      // TODO figure out if its a bug and if it is known.
	      // Workaround is to redeploy the sheet before attaching as a string.
	      if (this.hasInsertedRules) {
	        this.deploy();
	        this.hasInsertedRules = false;
	      }

	      insertStyle(this.element, this.sheet.options);
	    }

	    /**
	     * Remove style element from render tree.
	     */

	  }, {
	    key: 'detach',
	    value: function detach() {
	      this.element.parentNode.removeChild(this.element);
	    }

	    /**
	     * Inject CSS string into element.
	     */

	  }, {
	    key: 'deploy',
	    value: function deploy() {
	      if (!this.sheet) return;
	      this.element.textContent = '\n' + this.sheet.toString() + '\n';
	    }

	    /**
	     * Insert a rule into element.
	     */

	  }, {
	    key: 'insertRule',
	    value: function insertRule(rule, index) {
	      var sheet = this.element.sheet;
	      var cssRules = sheet.cssRules;

	      var str = rule.toString();
	      if (!index) index = cssRules.length;

	      if (!str) return false;

	      try {
	        sheet.insertRule(str, index);
	      } catch (err) {
	        (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule);
	        return false;
	      }
	      this.hasInsertedRules = true;

	      return cssRules[index];
	    }

	    /**
	     * Delete a rule.
	     */

	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(cssRule) {
	      var sheet = this.element.sheet;

	      var index = this.indexOf(cssRule);
	      if (index === -1) return false;
	      sheet.deleteRule(index);
	      return true;
	    }

	    /**
	     * Get index of a CSS Rule.
	     */

	  }, {
	    key: 'indexOf',
	    value: function indexOf(cssRule) {
	      var cssRules = this.element.sheet.cssRules;

	      for (var _index = 0; _index < cssRules.length; _index++) {
	        if (cssRule === cssRules[_index]) return _index;
	      }
	      return -1;
	    }

	    /**
	     * Generate a new CSS rule and replace the existing one.
	     */

	  }, {
	    key: 'replaceRule',
	    value: function replaceRule(cssRule, rule) {
	      var index = this.indexOf(cssRule);
	      var newCssRule = this.insertRule(rule, index);
	      this.element.sheet.deleteRule(index);
	      return newCssRule;
	    }

	    /**
	     * Get all rules elements.
	     */

	  }, {
	    key: 'getRules',
	    value: function getRules() {
	      return this.element.sheet.cssRules;
	    }
	  }]);

	  return DomRenderer;
	}();

	exports['default'] = DomRenderer;
	});

	unwrapExports(DomRenderer_1);

	var VirtualRenderer_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint-disable class-methods-use-this */

	/**
	 * Rendering backend to do nothing in nodejs.
	 */
	var VirtualRenderer = function () {
	  function VirtualRenderer() {
	    _classCallCheck(this, VirtualRenderer);
	  }

	  _createClass(VirtualRenderer, [{
	    key: 'setProperty',
	    value: function setProperty() {
	      return true;
	    }
	  }, {
	    key: 'getPropertyValue',
	    value: function getPropertyValue() {
	      return '';
	    }
	  }, {
	    key: 'removeProperty',
	    value: function removeProperty() {}
	  }, {
	    key: 'setSelector',
	    value: function setSelector() {
	      return true;
	    }
	  }, {
	    key: 'getKey',
	    value: function getKey() {
	      return '';
	    }
	  }, {
	    key: 'attach',
	    value: function attach() {}
	  }, {
	    key: 'detach',
	    value: function detach() {}
	  }, {
	    key: 'deploy',
	    value: function deploy() {}
	  }, {
	    key: 'insertRule',
	    value: function insertRule() {
	      return false;
	    }
	  }, {
	    key: 'deleteRule',
	    value: function deleteRule() {
	      return true;
	    }
	  }, {
	    key: 'replaceRule',
	    value: function replaceRule() {
	      return false;
	    }
	  }, {
	    key: 'getRules',
	    value: function getRules() {}
	  }, {
	    key: 'indexOf',
	    value: function indexOf() {
	      return -1;
	    }
	  }]);

	  return VirtualRenderer;
	}();

	exports['default'] = VirtualRenderer;
	});

	unwrapExports(VirtualRenderer_1);

	var _isInBrowser = ( module$1 && isBrowser ) || module$1;

	var Jss_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



	var _StyleSheet2 = _interopRequireDefault(StyleSheet_1);



	var _PluginsRegistry2 = _interopRequireDefault(PluginsRegistry_1);



	var _rules2 = _interopRequireDefault(rules$1);



	var _observables2 = _interopRequireDefault(observables);



	var _functions2 = _interopRequireDefault(functions);



	var _sheets2 = _interopRequireDefault(sheets);



	var _StyleRule2 = _interopRequireDefault(StyleRule_1);



	var _createGenerateClassName2 = _interopRequireDefault(createGenerateClassName);



	var _createRule3 = _interopRequireDefault(createRule_1);



	var _DomRenderer2 = _interopRequireDefault(DomRenderer_1);



	var _VirtualRenderer2 = _interopRequireDefault(VirtualRenderer_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultPlugins = _rules2['default'].concat([_observables2['default'], _functions2['default']]);

	var instanceCounter = 0;

	var Jss = function () {
	  function Jss(options) {
	    _classCallCheck(this, Jss);

	    this.id = instanceCounter++;
	    this.version = "9.8.3";
	    this.plugins = new _PluginsRegistry2['default']();
	    this.options = {
	      createGenerateClassName: _createGenerateClassName2['default'],
	      Renderer: _isInBrowser2['default'] ? _DomRenderer2['default'] : _VirtualRenderer2['default'],
	      plugins: []
	    };
	    this.generateClassName = (0, _createGenerateClassName2['default'])();

	    // eslint-disable-next-line prefer-spread
	    this.use.apply(this, defaultPlugins);
	    this.setup(options);
	  }

	  _createClass(Jss, [{
	    key: 'setup',
	    value: function setup() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (options.createGenerateClassName) {
	        this.options.createGenerateClassName = options.createGenerateClassName;
	        // $FlowFixMe
	        this.generateClassName = options.createGenerateClassName();
	      }

	      if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
	      if (options.virtual || options.Renderer) {
	        this.options.Renderer = options.Renderer || (options.virtual ? _VirtualRenderer2['default'] : _DomRenderer2['default']);
	      }

	      // eslint-disable-next-line prefer-spread
	      if (options.plugins) this.use.apply(this, options.plugins);

	      return this;
	    }

	    /**
	     * Create a Style Sheet.
	     */

	  }, {
	    key: 'createStyleSheet',
	    value: function createStyleSheet(styles) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var index = options.index;
	      if (typeof index !== 'number') {
	        index = _sheets2['default'].index === 0 ? 0 : _sheets2['default'].index + 1;
	      }
	      var sheet = new _StyleSheet2['default'](styles, _extends({}, options, {
	        jss: this,
	        generateClassName: options.generateClassName || this.generateClassName,
	        insertionPoint: this.options.insertionPoint,
	        Renderer: this.options.Renderer,
	        index: index
	      }));
	      this.plugins.onProcessSheet(sheet);

	      return sheet;
	    }

	    /**
	     * Detach the Style Sheet and remove it from the registry.
	     */

	  }, {
	    key: 'removeStyleSheet',
	    value: function removeStyleSheet(sheet) {
	      sheet.detach();
	      _sheets2['default'].remove(sheet);
	      return this;
	    }

	    /**
	     * Create a rule without a Style Sheet.
	     */

	  }, {
	    key: 'createRule',
	    value: function createRule(name) {
	      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      // Enable rule without name for inline styles.
	      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	        options = style;
	        style = name;
	        name = undefined;
	      }

	      // Cast from RuleFactoryOptions to RuleOptions
	      // https://stackoverflow.com/questions/41328728/force-casting-in-flow
	      var ruleOptions = options;

	      ruleOptions.jss = this;
	      ruleOptions.Renderer = this.options.Renderer;
	      if (!ruleOptions.generateClassName) ruleOptions.generateClassName = this.generateClassName;
	      if (!ruleOptions.classes) ruleOptions.classes = {};
	      var rule = (0, _createRule3['default'])(name, style, ruleOptions);

	      if (!ruleOptions.selector && rule instanceof _StyleRule2['default']) {
	        rule.selector = '.' + ruleOptions.generateClassName(rule);
	      }

	      this.plugins.onProcessRule(rule);

	      return rule;
	    }

	    /**
	     * Register plugin. Passed function will be invoked with a rule instance.
	     */

	  }, {
	    key: 'use',
	    value: function use() {
	      var _this = this;

	      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
	        plugins[_key] = arguments[_key];
	      }

	      plugins.forEach(function (plugin) {
	        // Avoids applying same plugin twice, at least based on ref.
	        if (_this.options.plugins.indexOf(plugin) === -1) {
	          _this.options.plugins.push(plugin);
	          _this.plugins.use(plugin);
	        }
	      });

	      return this;
	    }
	  }]);

	  return Jss;
	}();

	exports['default'] = Jss;
	});

	unwrapExports(Jss_1);

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = exports.createGenerateClassName = exports.sheets = exports.RuleList = exports.SheetsManager = exports.SheetsRegistry = exports.toCssValue = exports.getDynamicStyles = undefined;



	Object.defineProperty(exports, 'getDynamicStyles', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(getDynamicStyles_1)['default'];
	  }
	});



	Object.defineProperty(exports, 'toCssValue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(toCssValue_1)['default'];
	  }
	});



	Object.defineProperty(exports, 'SheetsRegistry', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(SheetsRegistry_1)['default'];
	  }
	});



	Object.defineProperty(exports, 'SheetsManager', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(SheetsManager_1)['default'];
	  }
	});



	Object.defineProperty(exports, 'RuleList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(RuleList_1)['default'];
	  }
	});



	Object.defineProperty(exports, 'sheets', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(sheets)['default'];
	  }
	});



	Object.defineProperty(exports, 'createGenerateClassName', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(createGenerateClassName)['default'];
	  }
	});



	var _Jss2 = _interopRequireDefault(Jss_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a new instance of Jss.
	 */
	var create = exports.create = function create(options) {
	  return new _Jss2['default'](options);
	};

	/**
	 * A global Jss instance.
	 */
	exports['default'] = create();
	});

	var jss = unwrapExports(lib);
	var lib_1 = lib.create;
	var lib_2 = lib.createGenerateClassName;
	var lib_3 = lib.sheets;
	var lib_4 = lib.RuleList;
	var lib_5 = lib.SheetsManager;
	var lib_6 = lib.SheetsRegistry;
	var lib_7 = lib.toCssValue;
	var lib_8 = lib.getDynamicStyles;

	var parse = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var semiWithNl = /;\n/;

	/**
	 * Naive CSS parser.
	 * - Supports only rule body (no selectors)
	 * - Requires semicolon and new line after the value (except of last line)
	 * - No nested rules support
	 */

	exports['default'] = function (cssText) {
	  var style = {};
	  var split = cssText.split(semiWithNl);
	  for (var i = 0; i < split.length; i++) {
	    var decl = (split[i] || '').trim();

	    if (!decl) continue;
	    var colonIndex = decl.indexOf(':');
	    if (colonIndex === -1) {
	      (0, _warning2['default'])(false, 'Malformed CSS string "%s"', decl);
	      continue;
	    }
	    var prop = decl.substr(0, colonIndex).trim();
	    var value = decl.substr(colonIndex + 1).trim();
	    style[prop] = value;
	  }
	  return style;
	};
	});

	unwrapExports(parse);

	var lib$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _parse2 = _interopRequireDefault(parse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var onProcessRule = function onProcessRule(rule) {
	  if (typeof rule.style === 'string') {
	    rule.style = (0, _parse2['default'])(rule.style);
	  }
	};

	exports['default'] = function () {
	  return { onProcessRule: onProcessRule };
	};
	});

	unwrapExports(lib$1);

	var lib$2 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports['default'] = jssGlobal;



	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var propKey = '@global';
	var prefixKey = '@global ';

	var GlobalContainerRule = function () {
	  function GlobalContainerRule(key, styles, options) {
	    _classCallCheck(this, GlobalContainerRule);

	    this.type = 'global';

	    this.key = key;
	    this.options = options;
	    this.rules = new lib.RuleList(_extends({}, options, {
	      parent: this
	    }));

	    for (var selector in styles) {
	      this.rules.add(selector, styles[selector], { selector: selector });
	    }

	    this.rules.process();
	  }

	  /**
	   * Get a rule.
	   */


	  _createClass(GlobalContainerRule, [{
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }

	    /**
	     * Create and register rule, run plugins.
	     */

	  }, {
	    key: 'addRule',
	    value: function addRule(name, style, options) {
	      var rule = this.rules.add(name, style, options);
	      this.options.jss.plugins.onProcessRule(rule);
	      return rule;
	    }

	    /**
	     * Get index of a rule.
	     */

	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }

	    /**
	     * Generates a CSS string.
	     */

	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this.rules.toString();
	    }
	  }]);

	  return GlobalContainerRule;
	}();

	var GlobalPrefixedRule = function () {
	  function GlobalPrefixedRule(name, style, options) {
	    _classCallCheck(this, GlobalPrefixedRule);

	    this.name = name;
	    this.options = options;
	    var selector = name.substr(prefixKey.length);
	    this.rule = options.jss.createRule(selector, style, _extends({}, options, {
	      parent: this,
	      selector: selector
	    }));
	  }

	  _createClass(GlobalPrefixedRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      return this.rule.toString(options);
	    }
	  }]);

	  return GlobalPrefixedRule;
	}();

	var separatorRegExp = /\s*,\s*/g;

	function addScope(selector, scope) {
	  var parts = selector.split(separatorRegExp);
	  var scoped = '';
	  for (var i = 0; i < parts.length; i++) {
	    scoped += scope + ' ' + parts[i].trim();
	    if (parts[i + 1]) scoped += ', ';
	  }
	  return scoped;
	}

	function handleNestedGlobalContainerRule(rule) {
	  var options = rule.options,
	      style = rule.style;

	  var rules = style[propKey];

	  if (!rules) return;

	  for (var name in rules) {
	    options.sheet.addRule(name, rules[name], _extends({}, options, {
	      selector: addScope(name, rule.selector)
	    }));
	  }

	  delete style[propKey];
	}

	function handlePrefixedGlobalRule(rule) {
	  var options = rule.options,
	      style = rule.style;

	  for (var prop in style) {
	    if (prop.substr(0, propKey.length) !== propKey) continue;

	    var selector = addScope(prop.substr(propKey.length), rule.selector);
	    options.sheet.addRule(selector, style[prop], _extends({}, options, {
	      selector: selector
	    }));
	    delete style[prop];
	  }
	}

	/**
	 * Convert nested rules to separate, remove them from original styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssGlobal() {
	  function onCreateRule(name, styles, options) {
	    if (name === propKey) {
	      return new GlobalContainerRule(name, styles, options);
	    }

	    if (name[0] === '@' && name.substr(0, prefixKey.length) === prefixKey) {
	      return new GlobalPrefixedRule(name, styles, options);
	    }

	    var parent = options.parent;


	    if (parent) {
	      if (parent.type === 'global' || parent.options.parent.type === 'global') {
	        options.global = true;
	      }
	    }

	    if (options.global) options.selector = name;

	    return null;
	  }

	  function onProcessRule(rule) {
	    if (rule.type !== 'style') return;

	    handleNestedGlobalContainerRule(rule);
	    handlePrefixedGlobalRule(rule);
	  }

	  return { onCreateRule: onCreateRule, onProcessRule: onProcessRule };
	}
	});

	unwrapExports(lib$2);

	var lib$3 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports['default'] = jssExtend;



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var isObject = function isObject(obj) {
	  return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
	};
	var valueNs = 'extendCurrValue' + Date.now();

	function mergeExtend(style, rule, sheet, newStyle) {
	  var extendType = _typeof(style.extend);
	  // Extend using a rule name.
	  if (extendType === 'string') {
	    if (!sheet) return;
	    var refRule = sheet.getRule(style.extend);
	    if (!refRule) return;
	    if (refRule === rule) {
	      (0, _warning2['default'])(false, '[JSS] A rule tries to extend itself \r\n%s', rule);
	      return;
	    }
	    var parent = refRule.options.parent;

	    if (parent) {
	      var originalStyle = parent.rules.raw[style.extend];
	      extend(originalStyle, rule, sheet, newStyle);
	    }
	    return;
	  }

	  // Extend using an array of objects.
	  if (Array.isArray(style.extend)) {
	    for (var index = 0; index < style.extend.length; index++) {
	      extend(style.extend[index], rule, sheet, newStyle);
	    }
	    return;
	  }

	  // Extend is a style object.
	  for (var prop in style.extend) {
	    if (prop === 'extend') {
	      extend(style.extend.extend, rule, sheet, newStyle);
	      continue;
	    }
	    if (isObject(style.extend[prop])) {
	      if (!(prop in newStyle)) newStyle[prop] = {};
	      extend(style.extend[prop], rule, sheet, newStyle[prop]);
	      continue;
	    }
	    newStyle[prop] = style.extend[prop];
	  }
	}

	function mergeRest(style, rule, sheet, newStyle) {
	  // Copy base style.
	  for (var prop in style) {
	    if (prop === 'extend') continue;
	    if (isObject(newStyle[prop]) && isObject(style[prop])) {
	      extend(style[prop], rule, sheet, newStyle[prop]);
	      continue;
	    }

	    if (isObject(style[prop])) {
	      newStyle[prop] = extend(style[prop], rule, sheet);
	      continue;
	    }

	    newStyle[prop] = style[prop];
	  }
	}

	/**
	 * Recursively extend styles.
	 */
	function extend(style, rule, sheet) {
	  var newStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  mergeExtend(style, rule, sheet, newStyle);
	  mergeRest(style, rule, sheet, newStyle);
	  return newStyle;
	}

	/**
	 * Handle `extend` property.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssExtend() {
	  function onProcessStyle(style, rule, sheet) {
	    if ('extend' in style) return extend(style, rule, sheet);
	    return style;
	  }

	  function onChangeValue(value, prop, rule) {
	    if (prop !== 'extend') return value;

	    // Value is empty, remove properties set previously.
	    if (value == null || value === false) {
	      for (var key in rule[valueNs]) {
	        rule.prop(key, null);
	      }
	      rule[valueNs] = null;
	      return null;
	    }

	    for (var _key in value) {
	      rule.prop(_key, value[_key]);
	    }
	    rule[valueNs] = value;

	    // Make sure we don't set the value in the core.
	    return null;
	  }

	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}
	});

	unwrapExports(lib$3);

	var lib$4 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = jssNested;



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var separatorRegExp = /\s*,\s*/g;
	var parentRegExp = /&/g;
	var refRegExp = /\$([\w-]+)/g;

	/**
	 * Convert nested rules to separate, remove them from original styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssNested() {
	  // Get a function to be used for $ref replacement.
	  function getReplaceRef(container) {
	    return function (match, key) {
	      var rule = container.getRule(key);
	      if (rule) return rule.selector;
	      (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);
	      return key;
	    };
	  }

	  var hasAnd = function hasAnd(str) {
	    return str.indexOf('&') !== -1;
	  };

	  function replaceParentRefs(nestedProp, parentProp) {
	    var parentSelectors = parentProp.split(separatorRegExp);
	    var nestedSelectors = nestedProp.split(separatorRegExp);

	    var result = '';

	    for (var i = 0; i < parentSelectors.length; i++) {
	      var parent = parentSelectors[i];

	      for (var j = 0; j < nestedSelectors.length; j++) {
	        var nested = nestedSelectors[j];
	        if (result) result += ', ';
	        // Replace all & by the parent or prefix & with the parent.
	        result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;
	      }
	    }

	    return result;
	  }

	  function getOptions(rule, container, options) {
	    // Options has been already created, now we only increase index.
	    if (options) return _extends({}, options, { index: options.index + 1 });

	    var nestingLevel = rule.options.nestingLevel;

	    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;

	    return _extends({}, rule.options, {
	      nestingLevel: nestingLevel,
	      index: container.indexOf(rule) + 1
	    });
	  }

	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;
	    var container = rule.options.parent;
	    var options = void 0;
	    var replaceRef = void 0;
	    for (var prop in style) {
	      var isNested = hasAnd(prop);
	      var isNestedConditional = prop[0] === '@';

	      if (!isNested && !isNestedConditional) continue;

	      options = getOptions(rule, container, options);

	      if (isNested) {
	        var selector = replaceParentRefs(prop, rule.selector
	        // Lazily create the ref replacer function just once for
	        // all nested rules within the sheet.
	        );if (!replaceRef) replaceRef = getReplaceRef(container
	        // Replace all $refs.
	        );selector = selector.replace(refRegExp, replaceRef);

	        container.addRule(selector, style[prop], _extends({}, options, { selector: selector }));
	      } else if (isNestedConditional) {
	        container
	        // Place conditional right after the parent rule to ensure right ordering.
	        .addRule(prop, null, options).addRule(rule.key, style[prop], { selector: rule.selector });
	      }

	      delete style[prop];
	    }

	    return style;
	  }

	  return { onProcessStyle: onProcessStyle };
	}
	});

	unwrapExports(lib$4);

	var lib$5 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = jssCompose;



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Set selector.
	 *
	 * @param {Object} original rule
	 * @param {String} className class string
	 * @return {Boolean} flag, indicating function was successfull or not
	 */
	function registerClass(rule, className) {
	  // Skip falsy values
	  if (!className) return true;

	  // Support array of class names `{composes: ['foo', 'bar']}`
	  if (Array.isArray(className)) {
	    for (var index = 0; index < className.length; index++) {
	      var isSetted = registerClass(rule, className[index]);
	      if (!isSetted) return false;
	    }

	    return true;
	  }

	  // Support space separated class names `{composes: 'foo bar'}`
	  if (className.indexOf(' ') > -1) {
	    return registerClass(rule, className.split(' '));
	  }

	  var parent = rule.options.parent;

	  // It is a ref to a local rule.

	  if (className[0] === '$') {
	    var refRule = parent.getRule(className.substr(1));

	    if (!refRule) {
	      (0, _warning2.default)(false, '[JSS] Referenced rule is not defined. \r\n%s', rule);
	      return false;
	    }

	    if (refRule === rule) {
	      (0, _warning2.default)(false, '[JSS] Cyclic composition detected. \r\n%s', rule);
	      return false;
	    }

	    parent.classes[rule.key] += ' ' + parent.classes[refRule.key];

	    return true;
	  }

	  rule.options.parent.classes[rule.key] += ' ' + className;

	  return true;
	}

	/**
	 * Convert compose property to additional class, remove property from original styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssCompose() {
	  function onProcessStyle(style, rule) {
	    if (!style.composes) return style;
	    registerClass(rule, style.composes);
	    // Remove composes property to prevent infinite loop.
	    delete style.composes;
	    return style;
	  }
	  return { onProcessStyle: onProcessStyle };
	}
	});

	unwrapExports(lib$5);

	var uppercasePattern = /[A-Z]/g;
	var msPattern = /^ms-/;
	var cache = {};

	function hyphenateStyleName(string) {
	    return string in cache
	    ? cache[string]
	    : cache[string] = string
	      .replace(uppercasePattern, '-$&')
	      .toLowerCase()
	      .replace(msPattern, '-ms-');
	}

	var hyphenateStyleName_1 = hyphenateStyleName;

	var lib$6 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = camelCase;



	var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Convert camel cased property names to dash separated.
	 *
	 * @param {Object} style
	 * @return {Object}
	 */
	function convertCase(style) {
	  var converted = {};

	  for (var prop in style) {
	    converted[(0, _hyphenateStyleName2['default'])(prop)] = style[prop];
	  }

	  if (style.fallbacks) {
	    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
	  }

	  return converted;
	}

	/**
	 * Allow camel cased property names by converting them back to dasherized.
	 *
	 * @param {Rule} rule
	 */
	function camelCase() {
	  function onProcessStyle(style) {
	    if (Array.isArray(style)) {
	      // Handle rules like @font-face, which can have multiple styles in an array
	      for (var index = 0; index < style.length; index++) {
	        style[index] = convertCase(style[index]);
	      }
	      return style;
	    }

	    return convertCase(style);
	  }

	  function onChangeValue(value, prop, rule) {
	    var hyphenatedProp = (0, _hyphenateStyleName2['default'])(prop);

	    // There was no camel case in place
	    if (prop === hyphenatedProp) return value;

	    rule.prop(hyphenatedProp, value);

	    // Core will ignore that property value we set the proper one above.
	    return null;
	  }

	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}
	});

	unwrapExports(lib$6);

	var defaultUnits = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Generated jss-default-unit CSS property units
	 *
	 * @type object
	 */
	exports['default'] = {
	  'animation-delay': 'ms',
	  'animation-duration': 'ms',
	  'background-position': 'px',
	  'background-position-x': 'px',
	  'background-position-y': 'px',
	  'background-size': 'px',
	  border: 'px',
	  'border-bottom': 'px',
	  'border-bottom-left-radius': 'px',
	  'border-bottom-right-radius': 'px',
	  'border-bottom-width': 'px',
	  'border-left': 'px',
	  'border-left-width': 'px',
	  'border-radius': 'px',
	  'border-right': 'px',
	  'border-right-width': 'px',
	  'border-spacing': 'px',
	  'border-top': 'px',
	  'border-top-left-radius': 'px',
	  'border-top-right-radius': 'px',
	  'border-top-width': 'px',
	  'border-width': 'px',
	  'border-after-width': 'px',
	  'border-before-width': 'px',
	  'border-end-width': 'px',
	  'border-horizontal-spacing': 'px',
	  'border-start-width': 'px',
	  'border-vertical-spacing': 'px',
	  bottom: 'px',
	  'box-shadow': 'px',
	  'column-gap': 'px',
	  'column-rule': 'px',
	  'column-rule-width': 'px',
	  'column-width': 'px',
	  'flex-basis': 'px',
	  'font-size': 'px',
	  'font-size-delta': 'px',
	  height: 'px',
	  left: 'px',
	  'letter-spacing': 'px',
	  'logical-height': 'px',
	  'logical-width': 'px',
	  margin: 'px',
	  'margin-after': 'px',
	  'margin-before': 'px',
	  'margin-bottom': 'px',
	  'margin-left': 'px',
	  'margin-right': 'px',
	  'margin-top': 'px',
	  'max-height': 'px',
	  'max-width': 'px',
	  'margin-end': 'px',
	  'margin-start': 'px',
	  'mask-position-x': 'px',
	  'mask-position-y': 'px',
	  'mask-size': 'px',
	  'max-logical-height': 'px',
	  'max-logical-width': 'px',
	  'min-height': 'px',
	  'min-width': 'px',
	  'min-logical-height': 'px',
	  'min-logical-width': 'px',
	  motion: 'px',
	  'motion-offset': 'px',
	  outline: 'px',
	  'outline-offset': 'px',
	  'outline-width': 'px',
	  padding: 'px',
	  'padding-bottom': 'px',
	  'padding-left': 'px',
	  'padding-right': 'px',
	  'padding-top': 'px',
	  'padding-after': 'px',
	  'padding-before': 'px',
	  'padding-end': 'px',
	  'padding-start': 'px',
	  'perspective-origin-x': '%',
	  'perspective-origin-y': '%',
	  perspective: 'px',
	  right: 'px',
	  'shape-margin': 'px',
	  size: 'px',
	  'text-indent': 'px',
	  'text-stroke': 'px',
	  'text-stroke-width': 'px',
	  top: 'px',
	  'transform-origin': '%',
	  'transform-origin-x': '%',
	  'transform-origin-y': '%',
	  'transform-origin-z': '%',
	  'transition-delay': 'ms',
	  'transition-duration': 'ms',
	  'vertical-align': 'px',
	  width: 'px',
	  'word-spacing': 'px',
	  // Not existing properties.
	  // Used to avoid issues with jss-expand intergration.
	  'box-shadow-x': 'px',
	  'box-shadow-y': 'px',
	  'box-shadow-blur': 'px',
	  'box-shadow-spread': 'px',
	  'font-line-height': 'px',
	  'text-shadow-x': 'px',
	  'text-shadow-y': 'px',
	  'text-shadow-blur': 'px'
	};
	});

	unwrapExports(defaultUnits);

	var lib$7 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports['default'] = defaultUnit;



	var _defaultUnits2 = _interopRequireDefault(defaultUnits);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Clones the object and adds a camel cased property version.
	 */
	function addCamelCasedVersion(obj) {
	  var regExp = /(-[a-z])/g;
	  var replace = function replace(str) {
	    return str[1].toUpperCase();
	  };
	  var newObj = {};
	  for (var key in obj) {
	    newObj[key] = obj[key];
	    newObj[key.replace(regExp, replace)] = obj[key];
	  }
	  return newObj;
	}

	var units = addCamelCasedVersion(_defaultUnits2['default']);

	/**
	 * Recursive deep style passing function
	 *
	 * @param {String} current property
	 * @param {(Object|Array|Number|String)} property value
	 * @param {Object} options
	 * @return {(Object|Array|Number|String)} resulting value
	 */
	function iterate(prop, value, options) {
	  if (!value) return value;

	  var convertedValue = value;

	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type === 'object' && Array.isArray(value)) type = 'array';

	  switch (type) {
	    case 'object':
	      if (prop === 'fallbacks') {
	        for (var innerProp in value) {
	          value[innerProp] = iterate(innerProp, value[innerProp], options);
	        }
	        break;
	      }
	      for (var _innerProp in value) {
	        value[_innerProp] = iterate(prop + '-' + _innerProp, value[_innerProp], options);
	      }
	      break;
	    case 'array':
	      for (var i = 0; i < value.length; i++) {
	        value[i] = iterate(prop, value[i], options);
	      }
	      break;
	    case 'number':
	      if (value !== 0) {
	        convertedValue = value + (options[prop] || units[prop] || '');
	      }
	      break;
	    default:
	      break;
	  }

	  return convertedValue;
	}

	/**
	 * Add unit to numeric values.
	 */
	function defaultUnit() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var camelCasedOptions = addCamelCasedVersion(options);

	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;

	    for (var prop in style) {
	      style[prop] = iterate(prop, style[prop], camelCasedOptions);
	    }

	    return style;
	  }

	  function onChangeValue(value, prop) {
	    return iterate(prop, value, camelCasedOptions);
	  }

	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}
	});

	unwrapExports(lib$7);

	var props = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A scheme for converting properties from array to regular style.
	 * All properties listed below will be transformed to a string separated by space.
	 */
	var propArray = exports.propArray = {
	  'background-size': true,
	  'background-position': true,
	  border: true,
	  'border-bottom': true,
	  'border-left': true,
	  'border-top': true,
	  'border-right': true,
	  'border-radius': true,
	  'border-image': true,
	  'border-width': true,
	  'border-style': true,
	  'border-color': true,
	  'box-shadow': true,
	  flex: true,
	  margin: true,
	  padding: true,
	  outline: true,
	  'transform-origin': true,
	  transform: true,
	  transition: true

	  /**
	   * A scheme for converting arrays to regular styles inside of objects.
	   * For e.g.: "{position: [0, 0]}" => "background-position: 0 0;".
	   */
	};var propArrayInObj = exports.propArrayInObj = {
	  position: true, // background-position
	  size: true // background-size


	  /**
	   * A scheme for parsing and building correct styles from passed objects.
	   */
	};var propObj = exports.propObj = {
	  padding: {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  },
	  margin: {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  },
	  background: {
	    attachment: null,
	    color: null,
	    image: null,
	    position: null,
	    repeat: null
	  },
	  border: {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-top': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-right': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-bottom': {
	    width: null,
	    style: null,
	    color: null
	  },
	  'border-left': {
	    width: null,
	    style: null,
	    color: null
	  },
	  outline: {
	    width: null,
	    style: null,
	    color: null
	  },
	  'list-style': {
	    type: null,
	    position: null,
	    image: null
	  },
	  transition: {
	    property: null,
	    duration: null,
	    'timing-function': null,
	    timingFunction: null, // Needed for avoiding comilation issues with jss-camel-case
	    delay: null
	  },
	  animation: {
	    name: null,
	    duration: null,
	    'timing-function': null,
	    timingFunction: null, // Needed to avoid compilation issues with jss-camel-case
	    delay: null,
	    'iteration-count': null,
	    iterationCount: null, // Needed to avoid compilation issues with jss-camel-case
	    direction: null,
	    'fill-mode': null,
	    fillMode: null, // Needed to avoid compilation issues with jss-camel-case
	    'play-state': null,
	    playState: null // Needed to avoid compilation issues with jss-camel-case
	  },
	  'box-shadow': {
	    x: 0,
	    y: 0,
	    blur: 0,
	    spread: 0,
	    color: null,
	    inset: null
	  },
	  'text-shadow': {
	    x: 0,
	    y: 0,
	    blur: null,
	    color: null
	  }

	  /**
	   * A scheme for converting non-standart properties inside object.
	   * For e.g.: include 'border-radius' property inside 'border' object.
	   */
	};var customPropObj = exports.customPropObj = {
	  border: {
	    radius: 'border-radius',
	    image: 'border-image',
	    width: 'border-width',
	    style: 'border-style',
	    color: 'border-color'
	  },
	  background: {
	    size: 'background-size',
	    image: 'background-image'
	  },
	  font: {
	    style: 'font-style',
	    variant: 'font-variant',
	    weight: 'font-weight',
	    stretch: 'font-stretch',
	    size: 'font-size',
	    family: 'font-family',
	    lineHeight: 'line-height', // Needed to avoid compilation issues with jss-camel-case
	    'line-height': 'line-height'
	  },
	  flex: {
	    grow: 'flex-grow',
	    basis: 'flex-basis',
	    direction: 'flex-direction',
	    wrap: 'flex-wrap',
	    flow: 'flex-flow',
	    shrink: 'flex-shrink'
	  },
	  align: {
	    self: 'align-self',
	    items: 'align-items',
	    content: 'align-content'
	  },
	  grid: {
	    'template-columns': 'grid-template-columns',
	    templateColumns: 'grid-template-columns',

	    'template-rows': 'grid-template-rows',
	    templateRows: 'grid-template-rows',

	    'template-areas': 'grid-template-areas',
	    templateAreas: 'grid-template-areas',

	    template: 'grid-template',

	    'auto-columns': 'grid-auto-columns',
	    autoColumns: 'grid-auto-columns',

	    'auto-rows': 'grid-auto-rows',
	    autoRows: 'grid-auto-rows',

	    'auto-flow': 'grid-auto-flow',
	    autoFlow: 'grid-auto-flow',

	    row: 'grid-row',
	    column: 'grid-column',

	    'row-start': 'grid-row-start',
	    rowStart: 'grid-row-start',
	    'row-end': 'grid-row-end',
	    rowEnd: 'grid-row-end',

	    'column-start': 'grid-column-start',
	    columnStart: 'grid-column-start',
	    'column-end': 'grid-column-end',
	    columnEnd: 'grid-column-end',

	    area: 'grid-area',
	    gap: 'grid-gap',

	    'row-gap': 'grid-row-gap',
	    rowGap: 'grid-row-gap',

	    'column-gap': 'grid-column-gap',
	    columnGap: 'grid-column-gap'
	  }
	};
	});

	unwrapExports(props);
	var props_1 = props.propArray;
	var props_2 = props.propArrayInObj;
	var props_3 = props.propObj;
	var props_4 = props.customPropObj;

	var lib$8 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = jssExpand;



	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Map values by given prop.
	 *
	 * @param {Array} array of values
	 * @param {String} original property
	 * @param {String} original rule
	 * @return {String} mapped values
	 */
	function mapValuesByProp(value, prop, rule) {
	  return value.map(function (item) {
	    return objectToArray(item, prop, rule, false, true);
	  });
	}

	/**
	 * Convert array to nested array, if needed
	 *
	 * @param {Array} array of values
	 * @param {String} original property
	 * @param {Object} sheme, for converting arrays in strings
	 * @param {Object} original rule
	 * @return {String} converted string
	 */
	function processArray(value, prop, scheme, rule) {
	  if (scheme[prop] == null) return value;
	  if (value.length === 0) return [];
	  if (Array.isArray(value[0])) return processArray(value[0], prop, scheme);
	  if (_typeof(value[0]) === 'object') {
	    return mapValuesByProp(value, prop, rule);
	  }

	  return [value];
	}

	/**
	 * Convert object to array.
	 *
	 * @param {Object} object of values
	 * @param {String} original property
	 * @param {Object} original rule
	 * @param {Boolean} is fallback prop
	 * @param {Boolean} object is inside array
	 * @return {String} converted string
	 */
	function objectToArray(value, prop, rule, isFallback, isInArray) {
	  if (!(props.propObj[prop] || props.customPropObj[prop])) return [];

	  var result = [];

	  // Check if exists any non-standart property
	  if (props.customPropObj[prop]) {
	    value = customPropsToStyle(value, rule, props.customPropObj[prop], isFallback);
	  }

	  // Pass throught all standart props
	  if (Object.keys(value).length) {
	    for (var baseProp in props.propObj[prop]) {
	      if (value[baseProp]) {
	        if (Array.isArray(value[baseProp])) {
	          result.push(props.propArrayInObj[baseProp] === null ? value[baseProp] : value[baseProp].join(' '));
	        } else result.push(value[baseProp]);
	        continue;
	      }

	      // Add default value from props config.
	      if (props.propObj[prop][baseProp] != null) {
	        result.push(props.propObj[prop][baseProp]);
	      }
	    }
	  }

	  if (!result.length || isInArray) return result;
	  return [result];
	}

	/**
	 * Convert custom properties values to styles adding them to rule directly
	 *
	 * @param {Object} object of values
	 * @param {Object} original rule
	 * @param {String} property, that contain partial custom properties
	 * @param {Boolean} is fallback prop
	 * @return {Object} value without custom properties, that was already added to rule
	 */
	function customPropsToStyle(value, rule, customProps, isFallback) {
	  for (var prop in customProps) {
	    var propName = customProps[prop];

	    // If current property doesn't exist already in rule - add new one
	    if (typeof value[prop] !== 'undefined' && (isFallback || !rule.prop(propName))) {
	      var appendedValue = styleDetector(_defineProperty({}, propName, value[prop]), rule)[propName];

	      // Add style directly in rule
	      if (isFallback) rule.style.fallbacks[propName] = appendedValue;else rule.style[propName] = appendedValue;
	    }
	    // Delete converted property to avoid double converting
	    delete value[prop];
	  }

	  return value;
	}

	/**
	 * Detect if a style needs to be converted.
	 *
	 * @param {Object} style
	 * @param {Object} rule
	 * @param {Boolean} is fallback prop
	 * @return {Object} convertedStyle
	 */
	function styleDetector(style, rule, isFallback) {
	  for (var prop in style) {
	    var value = style[prop];

	    if (Array.isArray(value)) {
	      // Check double arrays to avoid recursion.
	      if (!Array.isArray(value[0])) {
	        if (prop === 'fallbacks') {
	          for (var index = 0; index < style.fallbacks.length; index++) {
	            style.fallbacks[index] = styleDetector(style.fallbacks[index], rule, true);
	          }
	          continue;
	        }

	        style[prop] = processArray(value, prop, props.propArray);
	        // Avoid creating properties with empty values
	        if (!style[prop].length) delete style[prop];
	      }
	    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      if (prop === 'fallbacks') {
	        style.fallbacks = styleDetector(style.fallbacks, rule, true);
	        continue;
	      }

	      style[prop] = objectToArray(value, prop, rule, isFallback);
	      // Avoid creating properties with empty values
	      if (!style[prop].length) delete style[prop];
	    }

	    // Maybe a computed value resulting in an empty string
	    else if (style[prop] === '') delete style[prop];
	  }

	  return style;
	}

	/**
	 * Adds possibility to write expanded styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssExpand() {
	  function onProcessStyle(style, rule) {
	    if (!style || rule.type !== 'style') return style;

	    if (Array.isArray(style)) {
	      // Pass rules one by one and reformat them
	      for (var index = 0; index < style.length; index++) {
	        style[index] = styleDetector(style[index], rule);
	      }
	      return style;
	    }

	    return styleDetector(style, rule);
	  }

	  return { onProcessStyle: onProcessStyle };
	}
	});

	unwrapExports(lib$8);

	var prefix = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var js = ''; /**
	              * Export javascript style and css style vendor prefixes.
	              * Based on "transform" support test.
	              */

	var css = '';

	// We should not do anything if required serverside.
	if (_isInBrowser2['default']) {
	  // Order matters. We need to check Webkit the last one because
	  // other vendors use to add Webkit prefixes to some properties
	  var jsCssMap = {
	    Moz: '-moz-',
	    // IE did it wrong again ...
	    ms: '-ms-',
	    O: '-o-',
	    Webkit: '-webkit-'
	  };
	  var style = document.createElement('p').style;
	  var testProp = 'Transform';

	  for (var key in jsCssMap) {
	    if (key + testProp in style) {
	      js = key;
	      css = jsCssMap[key];
	      break;
	    }
	  }
	}

	/**
	 * Vendor prefix string for the current browser.
	 *
	 * @type {{js: String, css: String}}
	 * @api public
	 */
	exports['default'] = { js: js, css: css };
	});

	unwrapExports(prefix);

	var camelize_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = camelize;
	var regExp = /[-\s]+(.)?/g;

	/**
	 * Convert dash separated strings to camel cased.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function camelize(str) {
	  return str.replace(regExp, toUpper);
	}

	function toUpper(match, c) {
	  return c ? c.toUpperCase() : '';
	}
	});

	unwrapExports(camelize_1);

	var supportedProperty_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = supportedProperty;



	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



	var _prefix2 = _interopRequireDefault(prefix);



	var _camelize2 = _interopRequireDefault(camelize_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var el = void 0;
	var cache = {};

	if (_isInBrowser2['default']) {
	  el = document.createElement('p');

	  /**
	   * We test every property on vendor prefix requirement.
	   * Once tested, result is cached. It gives us up to 70% perf boost.
	   * http://jsperf.com/element-style-object-access-vs-plain-object
	   *
	   * Prefill cache with known css properties to reduce amount of
	   * properties we need to feature test at runtime.
	   * http://davidwalsh.name/vendor-prefix
	   */
	  var computed = window.getComputedStyle(document.documentElement, '');
	  for (var key in computed) {
	    if (!isNaN(key)) cache[computed[key]] = computed[key];
	  }
	}

	/**
	 * Test if a property is supported, returns supported property with vendor
	 * prefix if required. Returns `false` if not supported.
	 *
	 * @param {String} prop dash separated
	 * @return {String|Boolean}
	 * @api public
	 */
	function supportedProperty(prop) {
	  // For server-side rendering.
	  if (!el) return prop;

	  // We have not tested this prop yet, lets do the test.
	  if (cache[prop] != null) return cache[prop];

	  // Camelization is required because we can't test using
	  // css syntax for e.g. in FF.
	  // Test if property is supported as it is.
	  if ((0, _camelize2['default'])(prop) in el.style) {
	    cache[prop] = prop;
	  }
	  // Test if property is supported with vendor prefix.
	  else if (_prefix2['default'].js + (0, _camelize2['default'])('-' + prop) in el.style) {
	      cache[prop] = _prefix2['default'].css + prop;
	    } else {
	      cache[prop] = false;
	    }

	  return cache[prop];
	}
	});

	unwrapExports(supportedProperty_1);

	var supportedValue_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = supportedValue;



	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);



	var _prefix2 = _interopRequireDefault(prefix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var cache = {};
	var el = void 0;

	if (_isInBrowser2['default']) el = document.createElement('p');

	/**
	 * Returns prefixed value if needed. Returns `false` if value is not supported.
	 *
	 * @param {String} property
	 * @param {String} value
	 * @return {String|Boolean}
	 * @api public
	 */
	function supportedValue(property, value) {
	  // For server-side rendering.
	  if (!el) return value;

	  // It is a string or a number as a string like '1'.
	  // We want only prefixable values here.
	  if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value;

	  var cacheKey = property + value;

	  if (cache[cacheKey] != null) return cache[cacheKey];

	  // IE can even throw an error in some cases, for e.g. style.content = 'bar'
	  try {
	    // Test value as it is.
	    el.style[property] = value;
	  } catch (err) {
	    cache[cacheKey] = false;
	    return false;
	  }

	  // Value is supported as it is.
	  if (el.style[property] !== '') {
	    cache[cacheKey] = value;
	  } else {
	    // Test value with vendor prefix.
	    value = _prefix2['default'].css + value;

	    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
	    if (value === '-ms-flex') value = '-ms-flexbox';

	    el.style[property] = value;

	    // Value is supported with vendor prefix.
	    if (el.style[property] !== '') cache[cacheKey] = value;
	  }

	  if (!cache[cacheKey]) cache[cacheKey] = false;

	  // Reset style value.
	  el.style[property] = '';

	  return cache[cacheKey];
	}
	});

	unwrapExports(supportedValue_1);

	var lib$9 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.supportedValue = exports.supportedProperty = exports.prefix = undefined;



	var _prefix2 = _interopRequireDefault(prefix);



	var _supportedProperty2 = _interopRequireDefault(supportedProperty_1);



	var _supportedValue2 = _interopRequireDefault(supportedValue_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = {
	  prefix: _prefix2['default'],
	  supportedProperty: _supportedProperty2['default'],
	  supportedValue: _supportedValue2['default']
	}; /**
	    * CSS Vendor prefix detection and property feature testing.
	    *
	    * @copyright Oleg Slobodskoi 2015
	    * @website https://github.com/jsstyles/css-vendor
	    * @license MIT
	    */

	exports.prefix = _prefix2['default'];
	exports.supportedProperty = _supportedProperty2['default'];
	exports.supportedValue = _supportedValue2['default'];
	});

	unwrapExports(lib$9);
	var lib_1$1 = lib$9.supportedValue;
	var lib_2$1 = lib$9.supportedProperty;
	var lib_3$1 = lib$9.prefix;

	var lib$a = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = jssVendorPrefixer;



	var vendor = _interopRequireWildcard(lib$9);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/**
	 * Add vendor prefix to a property name when needed.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssVendorPrefixer() {
	  function onProcessRule(rule) {
	    if (rule.type === 'keyframes') {
	      rule.key = '@' + vendor.prefix.css + rule.key.substr(1);
	    }
	  }

	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;

	    for (var prop in style) {
	      var value = style[prop];

	      var changeProp = false;
	      var supportedProp = vendor.supportedProperty(prop);
	      if (supportedProp && supportedProp !== prop) changeProp = true;

	      var changeValue = false;
	      var supportedValue = vendor.supportedValue(supportedProp, value);
	      if (supportedValue && supportedValue !== value) changeValue = true;

	      if (changeProp || changeValue) {
	        if (changeProp) delete style[prop];
	        style[supportedProp || prop] = supportedValue || value;
	      }
	    }

	    return style;
	  }

	  function onChangeValue(value, prop) {
	    return vendor.supportedValue(prop, value);
	  }

	  return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}
	});

	unwrapExports(lib$a);

	var lib$b = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = jssPropsSort;
	/**
	 * Sort props by length.
	 */
	function jssPropsSort() {
	  function sort(prop0, prop1) {
	    return prop0.length - prop1.length;
	  }

	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;

	    var newStyle = {};
	    var props = Object.keys(style).sort(sort);
	    for (var prop in props) {
	      newStyle[props[prop]] = style[props[prop]];
	    }
	    return newStyle;
	  }

	  return { onProcessStyle: onProcessStyle };
	}
	});

	unwrapExports(lib$b);

	var lib$c = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _jssTemplate2 = _interopRequireDefault(lib$1);



	var _jssGlobal2 = _interopRequireDefault(lib$2);



	var _jssExtend2 = _interopRequireDefault(lib$3);



	var _jssNested2 = _interopRequireDefault(lib$4);



	var _jssCompose2 = _interopRequireDefault(lib$5);



	var _jssCamelCase2 = _interopRequireDefault(lib$6);



	var _jssDefaultUnit2 = _interopRequireDefault(lib$7);



	var _jssExpand2 = _interopRequireDefault(lib$8);



	var _jssVendorPrefixer2 = _interopRequireDefault(lib$a);



	var _jssPropsSort2 = _interopRequireDefault(lib$b);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return {
	    plugins: [(0, _jssTemplate2.default)(options.template), (0, _jssGlobal2.default)(options.global), (0, _jssExtend2.default)(options.extend), (0, _jssNested2.default)(options.nested), (0, _jssCompose2.default)(options.compose), (0, _jssCamelCase2.default)(options.camelCase), (0, _jssDefaultUnit2.default)(options.defaultUnit), (0, _jssExpand2.default)(options.expand), (0, _jssVendorPrefixer2.default)(options.vendorPrefixer), (0, _jssPropsSort2.default)(options.propsSort)]
	  };
	};
	});

	var jssPreset = unwrapExports(lib$c);

	// import jssCamelCase from 'jss-camel-case';
	// import jssCompose from 'jss-compose';
	// import jssUnit from 'jss-default-unit';
	// import jssExpand from 'jss-expand';
	// import jssExtend from 'jss-extend';
	// import jssGlobal from 'jss-global';
	// import jssSort from 'jss-props-sort';
	// import jssTemplate from 'jss-template';
	// import jssNested from 'jss-nested';
	// import jssPrefixer from 'jss-vendor-prefixer';

	// @todo  Create global stylesheet (inserted in <head>).
	// @todo  Create master styles cache (not inserted).

	// let styles = jss.use(
	// 	jssTemplate(),
	// 	jssGlobal(),
	// 	jssExtend(),
	// 	jssNested(),
	// 	jssCompose(),
	// 	jssCamelCase(),
	// 	jssUnit(),
	// 	jssExpand(),
	// 	jssSort(),
	// 	jssPrefixer()
	// );
	let styles = jss.setup(jssPreset());

	// styles.main = jss.createStyleSheet({}, { meta: 'brikcss', classNamePrefix: 'brik-' });
	// styles.main.attach();
	styles.sheets = {};

	class Page extends BrikElement {
		static get defaults() {
			return {};
		}

		// Create the Custom Element.
		created() {
			if (!document.querySelector('brik-page')) {
				throw new Error('Only one <brik-page/> element allowed on a page.');
			}
			this.attachShadow({ mode: 'open' });
			this.css = styles.createRule({
				display: 'flex',
				height: '100vh',
				width: '100vw',
				overflow: 'hidden'
			});
			this.css.applyTo(this);
			this.render();
		}

		// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
		// nodes, data or attributes that change. See
		// https://viperhtml.js.org/hyperhtml/documentation/.
		render() {
			return this.html`<slot></slot>`;
		}
	}

	class Viewport extends BrikElement {
		created() {
			this.attachShadow({ mode: 'open' });
			this.css = styles.createRule({
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				minHeight: '100vh',
				width: '100%',
				transform: 'translate3d(0, 0, 0)',
				transition: 'transform 350ms cubic-bezier(0.6, 0, 0.2, 1.2)'
			}).applyTo(this);
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render(activeSidebar = '') {
			this.css.prop('transform', activeSidebar === 'left' ? 'translate3d(var(--sidebar-left-push), 0, 0);' : activeSidebar === 'right' ? 'translate3d(calc(-1 * var(--sidebar-right-push)), 0, 0);' : '');
			return this.html`<slot></slot>`;
		}
	}

	class Content extends BrikElement {
		created() {
			this.css = styles.createStyleSheet({
				content: {
					boxSizing: 'border-box',
					overflowY: 'auto',
					overflowX: 'hidden',
					padding: props => props.padding
				}
			});
			this.classList.add(this.css.classes.content);
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render(content = '', padding = '4rem') {
			this.css.update({ padding });
			this.props.content = content;
			return this.html`${[content]}<style>${this.css.toString()}</style>`;
		}
	}

	class Overlay extends BrikElement {
		// Sets default props and observedAttributes.
		static get defaults() {
			return {
				active: false,
				styles: {
					backgroundColor: 'transparent',
					position: 'fixed',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
					zIndex: -1,
					transition: 'background-color 350ms, z-index 0ms 350ms'
				},
				activeStyles: {
					backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
					zIndex: 9,
					transition: 'background-color 350ms, z-index 350ms 0ms'
				}
			};
		}

		static get observedAttributes() {
			return ['active'];
		}

		created() {
			this.css = styles.createStyleSheet({
				overlay: this.props.styles,
				active: this.props.activeStyles
			}, { classNamePrefix: 'brik-' });
			this.classList.add(this.css.classes.overlay);
			this.render();
		}

		// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
		attributeChangedCallback() {
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.classList[this.active ? 'add' : 'remove'](this.css.classes.active);
			this.html`<style>${this.css.toString()}</style>`;
		}
	}

	var css = (props => {
		const styles = {
			sidebar: {
				display: 'block',
				backgroundColor: `var(--sidebar-${props.side}-bg)`,
				height: '100vh',
				width: `var(--sidebar-${props.side}-width)`,
				minWidth: `var(--sidebar-${props.side}-width)`,
				[`margin-${props.side}`]: `calc(-1 * var(--sidebar-${props.side}-width))`,
				position: 'relative',
				willChange: 'transform, box-shadow',
				transform: 'translate3d(0, 0, 0)',
				transitionProperty: 'transform, box-shadow',
				transitionDuration: '350ms',
				transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)',
				zIndex: '10',
				'&:before': {
					content: '""',
					backgroundColor: 'inherit',
					position: 'absolute',
					top: 0,
					bottom: 0,
					[props.side]: '-40px',
					width: '40px'
				}
			},
			active: {
				boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11)',
				transform: `translate3d(${props.side === 'right' ? 'calc(-1 * var(--sidebar-right-width))' : 'var(--sidebar-left-width)'}, 0, 0)`
			},
			pushed: {
				transform: `translate3d(${props.side === 'left' ? 'calc(-1 * var(--sidebar-left-push))' : 'var(--sidebar-right-push)'}, 0, 0)`
			}
		};

		if (props.miniAt) {
			const miniQuery = props.miniAt.indexOf('@') === 0 ? props.miniAt : `@media (min-width: ${props.miniAt})`;
			styles[miniQuery] = {
				sidebar: {
					width: 'var(--sidebar-mini-width)',
					minWidth: 'var(--sidebar-mini-width)',
					boxShadow: ['0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11)', '!important'],
					[`margin-${props.side}`]: 0,
					zIndex: 1,
					transform: ['none', '!important']
				}
			};
		}

		if (props.pinAt) {
			const pinQuery = props.pinAt.indexOf('@') === 0 ? props.pinAt : `@media (min-width: ${props.pinAt})`;
			styles[pinQuery] = {
				sidebar: {
					boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.12)',
					width: `var(--sidebar-${props.side}-width)`,
					minWidth: `var(--sidebar-${props.side}-width)`,
					[`margin-${props.side}`]: 0,
					zIndex: 1,
					transform: ['none', '!important']
				}
			};
		}

		return styles;
	});

	class Sidebar extends BrikElement {
		static get defaults() {
			return {
				side: 'left',
				active: false,
				group: 'page',
				pinAt: '',
				pinAtMax: '',
				miniAt: '',
				miniAtMax: '',
				state: '' // 'mini' || 'pinned' || 'off-canvas'
			};
		}

		static get observedAttributes() {
			return ['active'];
		}

		attributeChangedCallback() {
			const activeSidebar = window.brikcss.sidebars[this.props.group].active;
			if (activeSidebar && (activeSidebar.props.group !== this.props.group || activeSidebar.props.side !== this.props.side)) {
				activeSidebar.active = false;
				window.brikcss.sidebars[this.props.group].active = null;
			}
			// this.active = value === true || value === 'true';
			if (this.active) window.brikcss.sidebars[this.props.group].active = this;
			this.render();
			this.dom.overlay.active = this.active;
			this.dispatchEvent(this._toggleEvent);
		}

		// Element constructor.
		created() {
			// Set up.
			window.brikcss.sidebars = window.brikcss.sidebars || {};
			window.brikcss.sidebars[this.props.group] = window.brikcss.sidebars[this.props.group] || {
				active: null,
				all: []
			};
			// Create stylesheet and build dom.
			this.css = styles.createStyleSheet(css(this.props), { classNamePrefix: 'brik-' });
			this.attachShadow({ mode: 'open' });
			this.style.display = 'inline-flex';
			this.dom = {
				parent: this.parentNode,
				overlay: this.parentNode.querySelector('brik-overlay'),
				viewport: document.querySelector('brik-viewport')
			};
			if (!this.dom.overlay) {
				this.dom.overlay = document.createElement('brik-overlay');
				this.dom.parent.appendChild(this.dom.overlay);
			}
			// Cache this sidebar to the page element.
			if (this.tagName !== 'BRIK-SIDEBAR') {
				this.dom.parent.$.sidebars[this.props.side] = this;
			}
			// Update the state.
			this.updateState(true);
			// Add events.
			this._toggleEvent = new CustomEvent('on.toggle-' + this.props.side + '-sidebar', {
				detail: this.props.side,
				composed: true,
				bubbles: true
			});
			this.dom.overlay.addEventListener('click', this.handleOverlayClick);
			window.addEventListener('resize', this.handleWindowResize);
			window.addEventListener('sidebar.' + this.props.side + '.toggle', this.handleToggle);
			// Render to dom.
			this.render();
		}

		disconnectedCallback() {
			this.dom.overlay.removeEventListener('click', this.handleOverlayClick);
			window.removeEventListener('resize', this.handleWindowResize);
			window.removeEventListener('sidebar.' + this.props.side + '.toggle', this.handleToggle);
		}

		handleToggle(event) {
			this.active = typeof event.detail === 'boolean' ? event.detail : !this.active;
		}

		handleOverlayClick() {
			window.brikcss.sidebars[this.props.group].active.active = false;
		}

		handleWindowResize() {
			if (this._resizeTimeout) {
				clearTimeout(this._resizeTimeout);
			}
			this._resizeTimeout = setTimeout(() => {
				const wasMini = this.props.state === 'mini';
				this.updateState();
				if (this.active) this.active = false;
				if (this.props.state !== wasMini) {
					this.render();
					// @todo  For some reason, Firefox was not firing another window resize event listener in the supernav element, which is why this was moved here. This should really be moved back inside supernav somehow, but needs to work with Firefox.
					const supernav = this.querySelector('brik-super-nav') || this.shadowRoot.querySelector('brik-super-nav');
					if (supernav) {
						supernav.render();
					}
				}
			}, 200);
		}

		updateState(buildQueries) {
			const windowWidth = window.innerWidth;
			this.props.miniAtMax = this.props.miniAtMax || this.props.pinAt ? parseInt(this.props.pinAt, 10) - 1 + 'px' : undefined;
			// Build queries.
			if (buildQueries) {
				this.props.miniAtMax = this.props.miniAtMax || this.props.pinAt ? parseInt(this.props.pinAt, 10) - 1 + 'px' : undefined;
				['mini', 'pin'].forEach(key => {
					if (!this.props[key + 'At']) return;
					this.props[key + 'AtQuery'] = `@media (min-width: ${this.props[key + 'At']})${this.props[key + 'AtMax'] ? ` and (max-width: ${this.props[key + 'AtMax']})` : ''}`;
				});
			}
			// Determine current state.
			if (windowWidth >= parseInt(this.props.miniAt, 10) && (!this.props.miniAtMax || windowWidth <= parseInt(this.props.miniAtMax, 10))) {
				this.props.state = 'mini';
			} else if (windowWidth >= parseInt(this.props.pinAt, 10) && (!this.props.pinAtMax || windowWidth <= parseInt(this.props.pinAtMax, 10))) {
				this.props.state = 'pinned';
			} else {
				this.props.state = 'off-canvas';
			}
			// Determine if it is currently active.
			if (['mini', 'pinned'].includes(this.props.state)) {
				this.dom.viewport.width = `calc(100% - var(--sidebar-${this.props.state}-width))`;
			} else {
				this.dom.viewport.width = '100%';
			}
			// If active menu does not have focus, close it.
			// @todo Need to fix this.
			// this.props.links.filter((link) => link.active).map((link) => {
			// 	if (!link.focused || this.props.state === 'default') link.active = false;
			// 	return link;
			// });
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			return this.html`<div class="${`${this.css.classes.sidebar} ${this.active ? this.css.classes.active : ''}`}">
			<slot></slot>
		</div>
		<style>${this.css.toString()}</style>`;
		}
	}

	var tpl = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="${`${context.css.classes.supernav} ${context.css.classes['theme-' + (context.props.theme || 'dark')]} ${context.props.showSubmenus ? context.css.classes['show-menus'] : ''}`}">
	<div class="${context.css.classes.scroller}" onmouseenter="${() => {context.classList.remove(context.css.classes['inactive-menu']);}}">
		<!-- Profile header. -->
		<div class="${context.css.classes.header}" style="${{backgroundImage: `url(${context.props.headerBackground})`}}">
			<div class="${context.css.classes.toolbar}">
				<button type="button" class="${context.css.classes.close}" onclick="${context.handleClose}" tabindex="${context.props.active ? 0 : -1}">
					<brik-icon name="close" fill="var(--color__light)" size="4rem"></brik-icon>
				</button>
			</div>
			<slot name="header">
				<img class="${context.css.classes.avatar}" src="assets/images/avatar.jpg" alt="User photo." />
				<h2 class="${context.css.classes.username}">${context.props.user.name}</h2>
				<div>ID: ${context.props.user.id}</div>
			</slot>
		</div>

		<!-- Links and menus. -->
		<nav class="${`${context.css.classes.nav} ${context.props.active ? context.css.classes.active : ''}`}">
			${context.props.links.map((link, i) => hyperhtml.wire(link, ':link')`<div
				class="${`${context.css.classes.menu} ${link.active && !context.props.isMini ? context.css.classes['active-menu'] : ''}`}"
				style="${`height: ${link.children && link.active && !context.props.isMini ? `${(link.children.length + 1) * 6}rem;` : ''}`}">
				${link.children ? hyperhtml.wire(link, ':link-without-path')`<button
					type="button"
					class="${`${context.css.classes.link} ${link.separator ? context.css.classes.divider : ''}`}"
					onclick="${() => {
						if ((context.props.showSubmenus)) return;
						const lastActiveLink = context.props.links.find((link, n) => n !== i && link.active);
						if (lastActiveLink) lastActiveLink.active = false;
						link.active = !link.active;
						context.render();
					}}"
					onfocus="${() => {link.focused = true;}}"
					onblur="${() => {link.focused = false;}}"
					tabindex="${(context.props.state === 'off-canvas' && context.props.active) || (context.props.isPinned && !context.props.showSubmenus) ? 0 : -1}">
					<brik-icon class="${context.css.classes.icon}" name="${link.icon}"></brik-icon>
					<span class="${context.css.classes['link-label']}">${link.label}</span>
					${link.children ? hyperhtml.wire(link, ':link-no-path-button')`<brik-icon class="${context.css.classes.chevron}" name="chevron-down"></brik-icon>` : ''}
				</button>` : hyperhtml.wire(link, ':link-with-path')`<a class="${`${context.css.classes.link} ${link.separator ? context.css.classes.divider : ''}`}" href="${context.props.linkPrefix + link.path}" tabindex="${context.props.active ? 0 : -1}">
					<brik-icon class="${context.css.classes.icon}" name="${link.icon}"></brik-icon>
					<span>${link.label}</span>
					${link.children ? hyperhtml.wire(link, ':link-path-button')`<brik-icon class="${context.css.classes.chevron}" name="chevron-down"></brik-icon>` : ''}
				</a>`}
				${link.children ? context.test = hyperhtml.wire(link, ':menu')`<div class="${context.css.classes.submenu}">
					<div class="${context.css.classes.title}">${link.label}</div>
					${link.children.map((sublink, i) => hyperhtml.wire(sublink)`<a class="${`${context.css.classes.sublink} ${sublink.active ? context.css.classes.sublinkActive : ''}`}" href="${context.props.linkPrefix + [link.path, sublink.path].join('')}" onfocus="${() => {link.focused = true; if (!context.props.isMini) {return;} link.active = true; context.render();}}" onclick="${(event) => {
						if (context.props.activeMenuLink) context.props.activeMenuLink.active = false;
						sublink.active = true;
						context.props.activeMenuLink = sublink;
						if (context.props.isMini) {
							context.classList.add(context.css.classes['inactive-menu']);
							link.focused = false;
							event.target.blur();
							context.$.page.click();
						}
						context.render();
					}}" onblur="${() => {link.focused = false; if (!context.props.isMini) {return;} link.active = false; context.render();}}" tabindex="${context.props.active && (context.props.showSubmenus || context.props.isMini || link.active) ? 0 : -1}"> ${sublink.label} </a>`)}
				</div>` : ''}
			</div>`)}
		</nav>
	</div>

	<a class="${context.css.classes.logo}" href="${context.props.homePath}" tabindex="-1">
		<slot name="logo"><img src="assets/images/logo__directscale.png" /></slot>
	</a>
</div>

<style>${context.css ? context.css.toString() : ''}</style>
`;

	const link = {
		boxSizing: 'border-box',
		fontWeight: 400,
		fontSize: '1em',
		backgroundColor: 'transparent',
		border: 0,
		color: 'var(--color__dark, hsla(0, 0%, 0%, 0.87))',
		textDecoration: 'none',
		cursor: 'pointer',
		display: 'flex',
		padding: 0,
		alignItems: 'center',
		height: '6rem',
		outline: 0,
		transition: 'background-color 250ms, color 250ms, fill 250ms',
		width: '100%'
	};

	const styles$1 = {
		supernav: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			width: '100%'
		},
		scroller: {
			flex: 1,
			overflowY: 'auto'
		},
		header: {
			backgroundColor: 'var(--color__brand4)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'left top',
			color: 'var(--color__light)',
			minHeight: '14rem',
			padding: '2rem 2rem 1rem',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end'
		},
		close: {
			backgroundColor: 'transparent',
			border: 0,
			display: 'block',
			fill: 'var(--color__light)',
			padding: 0,
			'& brik-icon': {
				fill: 'inherit'
			}
		},
		avatar: {
			borderRadius: '50%',
			height: '8rem',
			width: '8rem',
			marginTop: '-2rem'
		},
		username: {
			margin: '0.5rem 0 0'
		},
		logo: {
			backgroundColor: 'var(--color__supernav)',
			color: 'hsl(0, 0%, 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '6rem',
			outline: 0,
			'& img': {
				maxHeight: '5rem',
				maxWidth: '90%'
			}
		},
		nav: {
			flex: 1
		},
		menu: {
			height: '6rem',
			willChange: 'height',
			transition: 'height 300ms cubic-bezier(0.6, 0, 0.2, 1.1), background-color 300ms',
			overflow: 'hidden',
			position: 'relative'
		},
		link: Object.assign({}, link, {
			position: 'relative'
		}),
		divider: {
			height: 'calc(6rem - 1px)',
			borderTop: '1px solid var(--color__dark4)'
		},
		'link-label': {},
		icon: {
			fill: 'var(--color__brand1)',
			height: '3rem',
			width: '3rem',
			marginLeft: '2rem',
			marginRight: '2.5rem',
			transition: 'fill 250ms'
		},
		submenu: {},
		sublink: Object.assign({}, link, {
			paddingLeft: '7.5rem',
			transition: 'color 250ms, background-color 250ms'
		}),
		chevron: {
			height: '2.5rem',
			width: '2.5rem',
			position: 'absolute',
			right: '2rem',
			top: 'calc(50% - 1.25rem)',
			willChange: 'transform',
			transition: 'transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3), fill 250ms'
		},
		title: {
			display: 'none'
		},
		active: {},
		'active-menu': {
			backgroundColor: 'hsla(0, 0%, 0%, 0.14)',
			'& $chevron': {
				fill: 'var(--color__light)',
				transform: 'rotate(180deg)'
			}
		},
		'show-menus': {
			'& $menu': {
				height: 'auto'
			},
			'& $sublink': {
				backgroundColor: 'transparent'
			},
			'& $chevron': {
				display: ['none', '!important']
			}
		},
		'theme-dark': {
			backgroundColor: 'var(--color__supernav)',
			color: 'var(--color__light)',
			'& $link, & $sublink': {
				color: 'var(--color__light2)',
				fill: 'var(--color__supernav--icon)',
				'&:hover, &:focus': {
					color: 'var(--color__light)'
				}
			},
			'& $link:hover, & $sublink:hover': {
				backgroundColor: 'hsla(0, 0%, 0%, 0.18)'
			},
			'& $link:focus, & $sublink:focus': {
				backgroundColor: 'hsla(0, 0%, 0%, 0.24)'
			},
			'& $icon': {
				fill: 'var(--color__light2)'
			},
			'& $chevron': {
				fill: 'var(--color__light2)'
			},

			'& $link:hover $icon, & $link:focus $icon': {
				fill: 'var(--color__light)'
			},
			'& $link:hover $chevron, & $link:focus $chevron': {
				fill: 'var(--color__light)'
			},
			// '& $link:before, &$showMenus $sublink:before': {
			'& $link:before': {
				content: '""',
				display: 'block',
				backgroundColor: 'var(--color__brand3)',
				position: 'absolute',
				left: '-0.5rem',
				top: 'calc(50% - 0.25rem)',
				width: '0.5rem',
				height: 0,
				transitionProperty: 'left, top, height',
				transitionDuration: '300ms',
				transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)'
			},
			'& $link:hover:before, & $link:focus:before, & $sublink:hover:before, & $sublink:focus:before': {
				left: 0,
				top: 'calc(50% - 3rem)',
				height: '6rem',
				transitionDuration: '400ms, 300ms, 300ms'
				// '&$showMenus $sublink': {
				// 	position: 'relative'
				// }
			} }
	};

	const pinnedNav = {
		close: {
			display: 'none'
		}
	};
	const miniNav = {
		supernav: {
			flexDirection: 'column-reverse'
		},
		header: {
			display: 'none'
		},
		menu: {
			height: ['9rem', '!important'],
			position: 'static'
		},
		link: {
			backgroundColor: 'var(--color__supernav)',
			color: 'var(--color__light2)',
			fill: 'var(--color__supernav--icon)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '1.5rem',
			height: '100%',
			position: 'relative',
			transition: 'color 350ms, background-color 350ms',
			'$menu:hover &, $menu:focus &': {
				backgroundColor: 'var(--color__supernav--dark)',
				color: 'var(--color__light)'
			},
			'&:before': {
				content: '""',
				display: 'block',
				backgroundColor: 'var(--color__brand3)',
				position: 'absolute',
				left: '-0.5rem',
				top: 'calc(50% - 0.25rem)',
				width: '0.5rem',
				height: 0,
				transitionProperty: 'left, top, height',
				transitionDuration: '300ms',
				transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)'
			},
			'$menu:hover &:before, &:focus:before': {
				left: 0,
				top: ['calc(50% - 4.5rem)', '!important'],
				height: ['9rem', '!important'],
				transitionDuration: '400ms, 300ms, 300ms'
			}
		},
		icon: {
			fill: 'inherit',
			height: '4rem',
			width: '4rem',
			transition: 'fill 350ms',
			'$menu:hover &, $menu:focus &': {
				fill: 'var(--color__light)'
			}
		},
		'link-label': {
			marginTop: '0.5rem'
		},
		logo: {
			height: '8rem',
			transition: 'background-color 250ms'
		},
		submenu: {
			backgroundColor: 'var(--color__supernav--dark)',
			height: '100vh',
			width: '30rem',
			position: 'absolute',
			top: 0,
			right: 0,
			zIndex: -1,
			willChange: 'transform',
			transform: 'translate3d(0, 0, 0)',
			transitionProperty: 'transform, box-shadow, color',
			transitionDuration: '350ms',
			transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.2, 1.2)',
			'&:before': {
				content: '""',
				backgroundColor: 'inherit',
				position: 'absolute',
				right: '100%',
				top: 0,
				width: '4rem',
				height: '100%'
			},
			'$menu:hover &, $menu:focus &': {
				boxShadow: '0 3rem 8rem hsla(0, 0%, 0%, 0.6)',
				transform: 'translate3d(30rem, 0, 0)'
			}
		},
		sublink: {
			paddingLeft: '2rem',
			paddingRight: '2rem',
			'&:hover, &:focus': {
				backgroundColor: ['var(--color__brand3)', '!important']
			}
		},
		chevron: {
			display: ['none', '!important']
		},
		title: {
			fontWeight: 300,
			display: 'flex',
			alignItems: 'center',
			height: '8rem',
			paddingLeft: '2rem',
			paddingRight: '2rem'
		}
	};

	// import baseStyles from './supernav.css';
	// import miniStyles from './supernav--mini.css';
	// import pinnedStyles from './supernav--pinned.css';

	class Supernav extends BrikElement {
		static get defaults() {
			return {
				showSubmenus: false,
				homePath: '#!/home',
				headerBackground: 'https://az706994.vo.msecnd.net/wakaya/images/3751a9f5-5ea2-4f60-8b9d-71ab358d59cd',
				user: {
					name: 'Sam Space',
					id: '16D21'
				},
				linkPrefix: '#!',
				links: [{
					name: 'Home',
					path: '#!/home',
					icon: 'home'
				}]
			};
		}

		static get observedAttributes() {
			return ['user', 'header-background', 'show-menus'];
		}

		// Element constructor.
		created() {
			if (document.querySelectorAll('brik-super-nav').length > 1) {
				throw new Error('Only one <brik-super-nav/> element allowed on a page.');
			}
			this.attachShadow({ mode: 'open' });
			this.$ = {
				sidebar: this.parentNode,
				page: this.parentNode.parentNode,
				viewport: document.querySelector('brik-viewport'),
				nav: this.shadowRoot.querySelector('.brik-supernav__item')
			};
			// Add events.
			this.$.sidebar.addEventListener('on.toggle-left-sidebar', this.handleToggle);
			// Create stylesheet.
			this.css = styles.createStyleSheet(styles$1, { classNamePrefix: 'brik-supernav-' });
			// Render it.
			this.render();
		}

		// Clean up.
		disconnectedCallback() {
			this.$.sidebar.removeEventListener('on.toggle-left-sidebar', this.handleToggle);
		}

		handleToggle() {
			this.render();
			if (this.props.active && !this.props.isMini) {
				this.shadowRoot.querySelector('.' + this.css.classes.close).focus();
			}
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			const sidebar = this.$.sidebar;
			this.props.active = sidebar.active;
			this.props.state = sidebar.props.state;
			this.props.isMini = sidebar.props.state === 'mini';
			this.props.isPinned = sidebar.props.state === 'pinned';
			// Add mini modifier.
			if (sidebar.props.miniAtQuery && sidebar.props.miniAtQuery !== this.props.miniAtRule) {
				if (this.props.miniAtRule) this.css.deleteRule(this.props.miniAtRule);
				this.props.miniAtRule = sidebar.props.miniAtQuery;
				this.css.addRule(this.props.miniAtRule, miniNav);
			}
			// Add pinned modifier.
			if (sidebar.props.pinAtQuery && sidebar.props.pinAtQuery !== this.props.pinAtRule) {
				if (this.props.pinAtRule) this.css.deleteRule(this.props.pinAtRule);
				this.props.pinAtRule = sidebar.props.pinAtQuery;
				this.css.addRule(this.props.pinAtRule, pinnedNav);
			}
			this.css.update(this.props);
			return tpl(this.html, this, { wire: BrikElement.wire });
		}

		buildLinks(links = []) {
			this.props.links = links;
			this.render();
		}

		handleClose() {
			this.$.sidebar.active = false;
		}
	}

	var css$1 = (props => {
		return {
			display: 'inline-flex',
			verticalAlign: 'text-bottom',
			height: props.size,
			width: props.size,
			fill: props.fill,
			stroke: props.stroke
		};
	});

	class Icon extends BrikElement {
		// Sets default props and observedAttributes.
		static get defaults() {
			return {
				name: '',
				size: null,
				fill: null,
				stroke: null
			};
		}

		// Element constructor.
		created() {
			window.brikcss.icons = window.brikcss.icons || {};
			this.props.name = this.getAttribute('name');
			this.attachShadow({ mode: 'open' });
			this.updateSvg();
			this.render();
		}

		// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
		attributeChangedCallback(prop, oldValue, value) {
			// Make sure created() has been called before this fires. For some icons, sometimes, there this fires before created() is called, which seems to be a bug in brik.js. This is intended as a temporary fix for that.
			if (!this.props.ready) return;
			// Update svg and render.
			if (prop === 'name' && value !== oldValue) {
				this.updateSvg();
			}
			this.render();
		}

		updateSvg() {
			let cachedSvg = window.brikcss.icons[this.props.name];
			this.props.svg = {
				placeholder: '',
				html: typeof cachedSvg === 'string' ? cachedSvg : cachedSvg ? cachedSvg : cachedSvg = fetch(new Request('./svg/' + this.props.name + '.svg', {
					method: 'GET',
					headers: new Headers({
						'Content-Type': 'text/plain'
					})
				})).then(result => {
					if (!result.ok) {
						return '';
					}
					return result.text();
				}).then(svg => {
					window.brikcss.icons[this.props.name] = svg.replace('<svg', '<svg style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; fill: inherit; stroke: inherit;"');
					this.props.ready = true;
					return window.brikcss.icons[this.props.name];
				})
			};

			return this.props.svg;
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			styles.createRule(css$1(this.props)).applyTo(this);
			return this.html`${this.props.svg}`;
		}
	}

	var tpl$1 = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="${context.props.css.classes.header}">
	<div class="${context.props.css.classes.left}">
		<brik-burger-button class="${context.props.css.classes.burger}" sidebar="left"></brik-burger-button>
		<div class="${context.props.css.classes.title}">${hyperhtml.wire()`${[context.props.title]}`}</div>
	</div>

	<slot name="content" class="${context.props.css.classes.content}"></slot>
</div>

${context.props.css ? [`<style type="text/css">${context.props.css.toString()}</style>`] : ''}
`;

	const header = hideAt => {
		const burgerStyles = {
			display: 'block',
			marginRight: '2rem'
		};
		if (hideAt) {
			burgerStyles[`@media (min-width: ${hideAt})`] = {
				display: ['none', '!important']
			};
		}
		return {
			header: {
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				height: 'var(--header-height, 8rem)',
				minHeight: 'var(--header-height, 8rem)',
				padding: 'var(--header-padding, 0 4rem)',
				backgroundColor: 'var(--header-fill, hsl(194, 76%, 65%))',
				color: 'var(--header-color, hsl(0, 0%, 100%))',
				boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.3)'
			},
			left: {
				display: 'flex',
				alignItems: 'center',
				flexGrow: 1
			},
			content: {
				display: 'flex',
				alignItems: 'center'
			},
			burger: burgerStyles,
			title: {
				fontWeight: 400,
				display: 'flex',
				alignItems: 'center',
				color: 'var(--color__light)'
			},
			icon: {
				fill: 'var(--color__light)'
			}
		};
	};

	class Header extends BrikElement {
		// Sets default props and observedAttributes.
		static get defaults() {
			return {
				title: 'Header',
				hideBurgerAt: '768px'
			};
		}

		attributeChangedCallback() {
			this.render();
		}

		// Element constructor.
		created() {
			this.attachShadow({ mode: 'open' });
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.css = jss.createStyleSheet(header(this.props.hideBurgerAt), {
				classNamePrefix: 'brik-'
			});
			return tpl$1(this.html, this, BrikElement);
		}
	}

	const bun = {
		backgroundColor: 'var(--burger-bg, hsla(0, 0%, 100%, 1))',
		display: 'block',
		height: 'var(--burger-line-size, 0.375rem)',
		width: 'var(--burger-size, 3rem)',
		position: 'absolute',
		left: 0,
		transition: 'all 200ms cubic-bezier(0.6, 0, 0.2, 1.2)'
	};
	const burger = {
		button: {
			backgroundColor: 'transparent',
			border: 'none',
			height: 'var(--burger-size, 3rem)',
			width: 'var(--burger-size, 3rem)',
			cursor: 'pointer',
			position: 'relative'
		},
		top: Object.assign({}, bun, {
			willChange: 'transform, top',
			top: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2) - (var(--burger-line-size, 0.375rem) * (var(--burger-line-spacing, 1.4) + 1)))'
		}),
		bottom: Object.assign({}, bun, {
			willChange: 'transform, bottom',
			bottom: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2) - (var(--burger-line-size, 0.375rem) * (var(--burger-line-spacing, 1.4) + 1)))'
		}),
		toppings: {
			position: 'absolute',
			backgroundColor: 'var(--burger-bg, hsla(0, 0%, 100%, 1))',
			width: '100%',
			height: 'var(--burger-line-size, 0.375rem)',
			top: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))',
			right: 0,
			opacity: 1,
			willChange: 'transform',
			transition: 'transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2)'
		},
		active: {
			transform: 'rotate(360deg)',
			'& $top': {
				transform: 'rotate(135deg)',
				top: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))'
			},
			'& $bottom': {
				transform: 'rotate(-135deg)',
				bottom: 'calc(50% - (var(--burger-line-size, 0.375rem) / 2))'
			},
			'& $toppings': {
				transform: 'scaleX(0)'
			}
		}
	};

	class BurgerButton extends BrikElement {
		static get defaults() {
			return {
				active: false,
				sidebar: 'left'
			};
		}

		// Element constructor.
		created() {
			this.attachShadow({ mode: 'open' });
			this.setAttribute('style', 'height: var(--burger-size, 3rem); width: var(--burger-size, 3rem); display: flex;');
			this.props.sheet = jss.createStyleSheet(burger, {
				meta: 'burger-button',
				classNamePrefix: 'brik-'
			});
			this.props.classes = this.props.sheet.classes;
			this.props.css = this.props.sheet.toString();
			window.addEventListener('on.toggle-' + this.props.sidebar + '-sidebar', this.handleToggle);
			this.render();
		}

		disconnectedCallback() {
			window.removeEventListener('on.toggle-' + this.props.sidebar + '-sidebar', this.handleToggle);
		}

		// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
		attributeChangedCallback() {
			this.render();
		}

		handleToggle() {
			this.active = !this.active;
			this.render();
		}

		onclick() {
			this.dispatchEvent(new CustomEvent('sidebar.' + this.props.sidebar + '.toggle', {
				detail: !this.active,
				composed: true,
				bubbles: true
			}));
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.sidebar = this.getAttribute('sidebar');
			return this.html`<button class="${this.props.classes.button + (this.active ? ` ${this.props.classes.active}` : '')}" type="button" onclick="${this}">
				<span class=${this.props.classes.top} />
				<span class=${this.props.classes.toppings} />
				<span class=${this.props.classes.bottom} />
			</button>
			<style>${this.props.css}</style>`;
		}
	}

	class Scroller extends BrikElement {
		// Element constructor.
		created() {
			this.attachShadow({ mode: 'open' });
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.css = ``;
			return this.html`<slot></slot><style>:host {
			overflow-y: auto;
		}</style>`;
		}
	}

	var tpl$2 = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="brik-tabs__buttons">
	${context.props.tabs.map(
		(tab) => hyperhtml.wire(tab)`<div class="${`brik-tabs__button-wrap ${
				tab.active ? 'brik-tabs__button--active' : ''
			}`}">
			<button class="brik-tabs__button" type="button" onclick="${() => {
				context.activateTab(tab);
			}}"><span class="brik-tabs__button-label">${tab.label || tab.id}</span></button>
		</div>
	`
	)}
</div>

<div class="brik-tabs__contents"><slot></slot></div>

<style type="text/css">${context.props.css}</style>
`;

	var css$2 = "/*! tabs.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n.brik-tabs__buttons {\n\tbackground-color: hsl(0, 0%, 100%);\n\tborder-bottom: 0.125rem solid var(--color__dark4);\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 6rem;\n\tposition: relative;\n}\n\n.brik-tabs__button-wrap {\n\tposition: relative;\n}\n\n.brik-tabs__button-wrap:before {\n\tcontent: ' ';\n\tborder-color: var(--color__brand1) transparent transparent transparent;\n\tborder-width: 0;\n\tborder-style: solid;\n\theight: 0;\n\twidth: 0;\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 0;\n\t-webkit-transition-property: border-width, left;\n\ttransition-property: border-width, left;\n\t-webkit-transition-duration: 250ms;\n\t        transition-duration: 250ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.3);\n\t        transition-timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.3);\n}\n\n.brik-tabs__button-wrap:after {\n\tcontent: ' ';\n\tbackground-color: transparent;\n\topacity: 0.7;\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\t-webkit-transition: background-color 200ms;\n\ttransition: background-color 200ms;\n}\n\n.brik-tabs__button--active:before {\n\tborder-width: 1.25rem 1rem 0;\n\tleft: calc(50% - 1rem);\n}\n\n.brik-tabs__button--active:after {\n\tbackground-color: var(--color__brand1);\n}\n\n.brik-tabs__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n\t-webkit-appearance: none;\n\t   -moz-appearance: none;\n\t        appearance: none;\n\tborder: none;\n\tcolor: var(--color__dark2, hsla(0, 0%, 0%, 0.54));\n\tbackground-color: transparent;\n\theight: 100%;\n\tpadding-left: 4rem;\n\tpadding-right: 4rem;\n\tposition: relative;\n\tmargin-left: 0;\n\tz-index: 1;\n\t-webkit-transition: color 200ms;\n\ttransition: color 200ms;\n}\n\n.brik-tabs__button:focus {\n\toutline-width: 0.25rem;\n\toutline-style: solid;\n}\n\n.brik-tabs__button--active .brik-tabs__button {\n\tcolor: var(--color__light, hsla(0, 0%, 100%, 1));\n}\n\n.brik-tabs__button-label {\n\tposition: relative;\n\tz-index: 1;\n}\n\n/* .page-tabs {\n\tmargin-left: -4rem;\n\tmargin-right: -4rem;\n\tmargin-top: -4rem;\n} */\n";

	class Tabs extends BrikElement {
		static get defaults() {
			return {
				tabs: [],
				activeTab: ''
			};
		}

		static get observedAttributes() {
			return ['active-tab'];
		}

		attributeChangedCallback(prop, oldValue, value) {
			if (prop === 'tabs') {
				this.props.tabs = this.parseTabs(value);
			}
			this.activateTab();
		}

		// Create the Custom Element.
		created() {
			// Create shadow dom.
			this.attachShadow({ mode: 'open' });
			// Render tabs/
			// this.render();
		}

		connectedCallback() {
			// Set the css.
			this.props.css = css$2;
			// Parse tabs.
			this.props.tabs = this.parseTabs(this.props.tabs);
			// Default active tab to the first one.
			if (!this.props.activeTab) {
				this.props.activeTab = this.props.tabs[0].id;
			}
			// Add class to tab content elements.
			Array.from(this.children).forEach(child => {
				child.classList.add('brik-tabs__content');
			});
			// Activate tab.
			if (this.props.tabs.length) {
				this.activateTab(this.props.activeTab);
			}
			// Render.
			this.render();
		}

		parseTabs(tabs) {
			// Cache tabs as an Array of Objects.
			tabs = tabs.split(/,\s+/);
			this.props.tabNames = [];
			tabs.forEach((tab, i) => {
				tab = tab.split(':');
				tabs[i] = {
					id: tab[0].toLowerCase(),
					label: tab[1] || tab[0]
				};
				this.props.tabNames.push(tabs[i].id);
			});
			return this.props.tabs = tabs;
		}

		activateTab(tab) {
			tab = this.getActiveTab(tab);
			this.props.activeTab = tab.id;
			const tabIndex = this.props.tabNames.indexOf(tab.id);
			const activeTab = this.props.tabs.find(tab => tab.active);
			const activeContentEl = this.querySelector('.brik-tabs__content--active');
			if (activeTab) activeTab.active = false;
			tab.active = true;
			if (activeContentEl) activeContentEl.classList.remove('brik-tabs__content--active');
			this.children[tabIndex].classList.add('brik-tabs__content--active');
			this.render();
		}

		getActiveTab(tab) {
			if (tab instanceof Object) return tab;
			if (typeof tab === 'string') tab = this.props.tabs.find(tab => tab.id === tab);
			if (!tab) {
				tab = this.props.activeTab ? this.props.tabs.find(tab => tab.id === this.props.activeTab) : this.props.tabs[0];
			}
			return tab;
		}

		// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
		// nodes, data or attributes that change. See
		// https://viperhtml.js.org/hyperhtml/documentation/.
		render() {
			return tpl$2(this.html, this, BrikElement);
		}
	}

	var tpl$3 = (render, context = {}, hyperhtml = {}, _ = {}) => render`${context.props.livePreview ? hyperhtml.wire(context.props, ':previewer')`<div class="${context.css.classes.preview}">
	${[context.props.liveMarkup]}
</div>` : ''}

<div class="${context.css.classes.header}">
	<div class="${context.css.classes.tabs}">
		${context.props.tabs.map((tab) => hyperhtml.wire(tab)`
			<button onclick="${() => {
				if (context.props.tabs.length > 1) context.activateTab(tab);
			}}" class="${`${context.css.classes.tab} ${context.props.activeTab[context.props.activeTab.label ? 'label' : 'id'] === tab[context.props.activeTab.label ? 'label' : 'id'] ? context.css.classes['tab--active'] : ''}`}" type="button">${tab.label}</button>
		`)}
	</div>

	${context.props.dirty ? hyperhtml.wire(context.props, ':dirty-note')`<div class="${context.css.classes.toolbar}"><button class="${context.css.classes.refresh}" type="button" onclick="${context.refreshPreview}">Refresh</button> <kbd>ctrl</kbd> | <kbd>cmd</kbd>+<kbd>enter</kbd> to refresh preview</div>` : ''}
</div>

<div class="${context.css.classes.window}"><slot></slot></div>

<style type="text/css">${context.css.toString()}</style>
`;

	var css$3 = {
		editor: {
			display: 'block'
		},
		header: {
			backgroundColor: 'var(--color__brand4, hsl(0, 0%, 40%))',
			color: 'var(--color__light, hsl(0, 0%, 100%))',
			borderColor: 'var(--color__dark4)',
			borderWidth: '1px 1px 0',
			borderStyle: 'solid',
			display: 'flex',
			alignItems: 'center',
			height: '3rem',
			padding: '0 1rem',
			position: 'relative',
			zIndex: 2
		},
		tabs: {
			flexGrow: 1
		},
		tab: {
			cursor: 'pointer',
			height: '3rem',
			appearance: 'none',
			backgroundColor: 'transparent',
			border: 'none',
			color: 'var(--color__light2)',
			fontSize: '1em',
			fontWeight: '400',
			textTransform: 'none',
			'& + $tab': {
				marginLeft: '0.25rem'
			},
			'&:focus': {
				outlineWidth: '2px',
				outlineStyle: 'solid'
			},
			'&:active': {
				outline: 'none'
			}
		},
		'tab--active': {
			color: 'var(--color__light1)'
		},
		preview: {
			borderColor: 'var(--color__dark4)',
			borderWidth: '1px 1px 0',
			borderStyle: 'solid',
			padding: 'calc(2rem - 1px) 2rem 2rem',
			position: 'relative'
		},
		window: {
			display: 'flex',
			backgroundColor: 'hsl(220, 13%, 18%)',
			color: 'var(--color__light)'
		},
		toolbar: {
			color: 'var(--color__light2)'
		},
		refresh: {}
	};

	const paneCss = props => {
		return {
			boxSizing: 'border-box',
			position: 'relative',
			width: '100%',
			minWidth: '100%',
			marginTop: 0,
			marginLeft: props.index === 0 ? 0 : '-100%',
			opacity: props.active ? 1 : 0,
			zIndex: props.active ? 0 : 1,
			transition: 'opacity 0.3s, transform 0.25s'
		};
	};

	class Editor extends BrikElement {
		static get defaults() {
			return {
				livePreview: false,
				editable: false
			};
		}

		static get observedAttributes() {
			return ['live-preview', 'editable', 'lang'];
		}

		// Create the Custom Element.
		created() {
			// Create dom, styles, and pre-render a skeleton screen.
			this.attachShadow({ mode: 'open' });
			this.props.tabs = [];
			this.props.liveMarkup = '';
			this.css = styles.createStyleSheet(css$3, { classNamePrefix: 'brik-' });
			this.render();

			// Cache dom.
			this.classList.add(this.css.classes.editor);
			this.dom = {
				previewer: this.shadowRoot.querySelector('.' + this.css.classes.preview),
				window: this.shadowRoot.querySelector('.' + this.css.classes.window),
				panes: Array.from(this.children)
			};
			if (this.props.editable) {
				this.dom.panes.forEach(pane => pane.editable = true);
			}

			// Set default props.
			this.props.ticking = false;
			this.props.throttled = false;
			this.props.live = {};
			this.props.dirty = false;

			// Create tabs.
			this.props.tabs = [];
			this.dom.panes.forEach((pane, i) => {
				if (this.dom.panes.length > 1) {
					styles.createRule(paneCss({ active: false, index: i })).applyTo(pane);
				}
				this.props.tabs.push({
					id: pane.lang,
					label: pane.label || pane.getAttribute('label') || pane.lang.toUpperCase(),
					index: i
				});
			});

			// Activate tab.
			this.activateTab(this.props.tabs[0]);

			// Live preview.
			if (this.props.livePreview) this.refreshPreview();

			// Render.
			this.render();
		}

		/**
	  *  Activate a tab.
	  *  @param   {String}  tab  Name of tab to activate.
	  */
		activateTab(tab) {
			// De-activate previously active tab.
			if (this.props.activeTab) {
				styles.createRule(paneCss({ active: false, index: this.props.activeTab.index })).applyTo(this.dom.panes[this.props.activeTab.index]);
			}
			// Activate new tab.
			this.props.activeTab = tab;
			styles.createRule(paneCss({ active: true, index: this.props.activeTab.index })).applyTo(this.dom.panes[this.props.activeTab.index]);
			// Re-render.
			this.render();
		}

		refreshPreview() {
			if (!this.props.livePreview) return;
			if (!this.props.throttled) {
				let insertScript = false;
				this.props.liveMarkup = '';
				this.dom.panes.forEach((pane, i) => {
					let code = pane.textContent || pane.props.raw;
					// Create new content.
					if (this.props.tabs[i].id === 'html') {
						this.props.liveMarkup += code;
					}
					if (this.props.tabs[i].id === 'css') {
						this.props.liveMarkup += '<style>' + code + '</style>';
					}
					if (this.props.tabs[i].id === 'js') {
						insertScript = code;
					}
				});
				// To re-execute a script, it must be removed and re-inserted into the dom. So we render
				// everything else first, then if JS exists we remove and append it.
				this.render();
				if (insertScript) {
					const currentScript = this.dom.previewer.querySelector('script');
					const script = document.createElement('script');
					try {
						script.appendChild(document.createElement(insertScript));
					} catch (e) {
						script.text = insertScript;
					}
					if (currentScript) this.dom.previewer.removeChild(currentScript);
					this.dom.previewer.appendChild(script);
				}
				this.props.throttled = true;
				setTimeout(() => {
					this.props.throttled = false;
				}, 200);
			}
		}

		// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
		// nodes, data or attributes that change. See
		// https://viperhtml.js.org/hyperhtml/documentation/.
		render() {
			return tpl$3(this.html, this, BrikElement);
		}
	}

	var prism = createCommonjsModule(function (module) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 * MIT license http://www.opensource.org/licenses/mit-license.php/
	 * @author Lea Verou http://lea.verou.me
	 */

	var Prism = (function(){

	// Private helper vars
	var lang = /\blang(?:uage)?-([\w-]+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		manual: _self.Prism && _self.Prism.manual,
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
		util: {
			encode: function (tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function (o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function (o, visited) {
				var type = _.util.type(o);
				visited = visited || {};

				switch (type) {
					case 'Object':
						if (visited[_.util.objId(o)]) {
							return visited[_.util.objId(o)];
						}
						var clone = {};
						visited[_.util.objId(o)] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key], visited);
							}
						}

						return clone;

					case 'Array':
						if (visited[_.util.objId(o)]) {
							return visited[_.util.objId(o)];
						}
						var clone = [];
						visited[_.util.objId(o)] = clone;

						o.forEach(function (v, i) {
							clone[i] = _.util.clone(v, visited);
						});

						return clone;
				}

				return o;
			}
		},

		languages: {
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Insert a token before another token in a language literal
			 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
			 * we cannot just provide an object, we need anobject and a key.
			 * @param inside The key (or language id) of the parent
			 * @param before The key to insert before. If not provided, the function appends instead.
			 * @param insert Object with the key/value pairs to insert
			 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function(key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function(o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						}
						else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function(async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		highlightAllUnder: function(container, async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || container.querySelectorAll(env.selector);

			for (var i=0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function(element, async, callback) {
			// Find language
			var language, grammar, parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [,''])[1].toLowerCase();
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			if (element.parentNode) {
				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			_.hooks.run('before-sanity-check', env);

			if (!env.code || !env.grammar) {
				if (env.code) {
					_.hooks.run('before-highlight', env);
					env.element.textContent = env.code;
					_.hooks.run('after-highlight', env);
				}
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function(evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			}
			else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
			var Token = _.Token;

			for (var token in grammar) {
				if(!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				if (token == target) {
					return;
				}

				var patterns = grammar[token];
				patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
						inside = pattern.inside,
						lookbehind = !!pattern.lookbehind,
						greedy = !!pattern.greedy,
						lookbehindLength = 0,
						alias = pattern.alias;

					if (greedy && !pattern.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
						pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
					}

					pattern = pattern.pattern || pattern;

					// Don’t cache length as it changes during the loop
					for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						if (greedy && i != strarr.length - 1) {
							pattern.lastIndex = pos;
							var match = pattern.exec(text);
							if (!match) {
								break;
							}

							var from = match.index + (lookbehind ? match[1].length : 0),
							    to = match.index + match[0].length,
							    k = i,
							    p = pos;

							for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
								p += strarr[k].length;
								// Move the index i to the element in strarr that is closest to from
								if (from >= p) {
									++i;
									pos = p;
								}
							}

							// If strarr[i] is a Token, then the match starts inside another Token, which is invalid
							if (strarr[i] instanceof Token) {
								continue;
							}

							// Number of tokens to delete and replace with the new match
							delNum = k - i;
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							pattern.lastIndex = 0;

							var match = pattern.exec(str),
								delNum = 1;
						}

						if (!match) {
							if (oneshot) {
								break;
							}

							continue;
						}

						if(lookbehind) {
							lookbehindLength = match[1] ? match[1].length : 0;
						}

						var from = match.index + lookbehindLength,
						    match = match[0].slice(lookbehindLength),
						    to = from + match.length,
						    before = str.slice(0, from),
						    after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							++i;
							pos += before.length;
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);

						if (delNum != 1)
							_.matchGrammar(text, strarr, grammar, i, pos, true, token);

						if (oneshot)
							break;
					}
				}
			}
		},

		tokenize: function(text, grammar, language) {
			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			_.matchGrammar(text, strarr, grammar, 0, 0, false);

			return strarr;
		},

		hooks: {
			all: {},

			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i=0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || "").length|0;
		this.greedy = !!greedy;
	};

	Token.stringify = function(o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function(element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = Object.keys(env.attributes).map(function(name) {
			return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}).join(' ');

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
					lang = message.language,
					code = message.code,
					immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (!_.manual && !script.hasAttribute('data-manual')) {
			if(document.readyState !== "loading") {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(_.highlightAll);
				} else {
					window.setTimeout(_.highlightAll, 16);
				}
			}
			else {
				document.addEventListener('DOMContentLoaded', _.highlightAll);
			}
		}
	}

	return _self.Prism;

	})();

	if (module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': /<!--[\s\S]*?-->/,
		'prolog': /<\?[\s\S]+?\?>/,
		'doctype': /<!DOCTYPE[\s\S]+?>/i,
		'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			greedy: true,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'attr-value': {
					pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
					inside: {
						'punctuation': [
							/^=/,
							{
								pattern: /(^|[^\\])["']/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': /&#?[\da-z]{1,8};/i
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function(env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Prism.languages.xml = Prism.languages.markup;
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
		'string': {
			pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		'important': /\B!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
				lookbehind: true,
				inside: Prism.languages.css,
				alias: 'language-css',
				greedy: true
			}
		});

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	}

	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /[.\\]/
			}
		},
		'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		'boolean': /\b(?:true|false)\b/,
		'function': /[a-z0-9_]+(?=\()/i,
		'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
		'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
		'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
	});

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
			alias: 'function'
		},
		'constant': /\b[A-Z][A-Z\d_]*\b/
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\$\{[^}]+\}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		}
	});

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript,
				alias: 'language-javascript',
				greedy: true
			}
		});
	}

	Prism.languages.js = Prism.languages.javascript;


	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {
		if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
			return;
		}

		self.Prism.fileHighlight = function() {

			var Extensions = {
				'js': 'javascript',
				'py': 'python',
				'rb': 'ruby',
				'ps1': 'powershell',
				'psm1': 'powershell',
				'sh': 'bash',
				'bat': 'batch',
				'h': 'c',
				'tex': 'latex'
			};

			Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
				var src = pre.getAttribute('data-src');

				var language, parent = pre;
				var lang = /\blang(?:uage)?-(?!\*)([\w-]+)\b/i;
				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (pre.className.match(lang) || [, ''])[1];
				}

				if (!language) {
					var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
					language = Extensions[extension] || extension;
				}

				var code = document.createElement('code');
				code.className = 'language-' + language;

				pre.textContent = '';

				code.textContent = 'Loading…';

				pre.appendChild(code);

				var xhr = new XMLHttpRequest();

				xhr.open('GET', src, true);

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {

						if (xhr.status < 400 && xhr.responseText) {
							code.textContent = xhr.responseText;

							Prism.highlightElement(code);
						}
						else if (xhr.status >= 400) {
							code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
						}
						else {
							code.textContent = '✖ Error: File does not exist or is empty';
						}
					}
				};

				if (pre.hasAttribute('data-download-link') && Prism.plugins.toolbar) {
					Prism.plugins.toolbar.registerButton('download-file', function () {
						var a = document.createElement('a');
						a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
						a.setAttribute('download', '');
						a.href = src;
						return a;
					});
				}

				xhr.send(null);
			});

		};

		document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

	})();
	});

	Prism.languages.scss = Prism.languages.extend('css', {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true
		},
		'atrule': {
			pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		// url, compassified
		'url': /(?:[-a-z]+-)*url(?=\()/i,
		// CSS selector regex is not appropriate for Sass
		// since there can be lot more things (var, @ directive, nesting..)
		// a selector must start at the end of a property or after a brace (end of other rules or nesting)
		// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
		// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
		// can "pass" as a selector- e.g: proper#{$erty})
		// this one was hard to do, so please be careful if you edit this one :)
		'selector': {
			// Initial look-ahead is used to prevent matching of blank selectors
			pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
			inside: {
				'parent': {
					pattern: /&/,
					alias: 'important'
				},
				'placeholder': /%[-\w]+/,
				'variable': /\$[-\w]+|#\{\$[-\w]+\}/
			}
		}
	});

	Prism.languages.insertBefore('scss', 'atrule', {
		'keyword': [
			/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
			{
				pattern: /( +)(?:from|through)(?= )/,
				lookbehind: true
			}
		]
	});

	Prism.languages.scss.property = {
		pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
		inside: {
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	};

	Prism.languages.insertBefore('scss', 'important', {
		// var and interpolated vars
		'variable': /\$[-\w]+|#\{\$[-\w]+\}/
	});

	Prism.languages.insertBefore('scss', 'function', {
		'placeholder': {
			pattern: /%[-\w]+/,
			alias: 'selector'
		},
		'statement': {
			pattern: /\B!(?:default|optional)\b/i,
			alias: 'keyword'
		},
		'boolean': /\b(?:true|false)\b/,
		'null': /\bnull\b/,
		'operator': {
			pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
			lookbehind: true
		}
	});

	Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;

	(function(Prism) {
		Prism.languages.sass = Prism.languages.extend('css', {
			// Sass comments don't need to be closed, only indented
			'comment': {
				pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
				lookbehind: true
			}
		});

		Prism.languages.insertBefore('sass', 'atrule', {
			// We want to consume the whole line
			'atrule-line': {
				// Includes support for = and + shortcuts
				pattern: /^(?:[ \t]*)[@+=].+/m,
				inside: {
					'atrule': /(?:@[\w-]+|[+=])/m
				}
			}
		});
		delete Prism.languages.sass.atrule;


		var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
		var operator = [
			/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
			{
				pattern: /(\s+)-(?=\s)/,
				lookbehind: true
			}
		];

		Prism.languages.insertBefore('sass', 'property', {
			// We want to consume the whole line
			'variable-line': {
				pattern: /^[ \t]*\$.+/m,
				inside: {
					'punctuation': /:/,
					'variable': variable,
					'operator': operator
				}
			},
			// We want to consume the whole line
			'property-line': {
				pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
				inside: {
					'property': [
						/[^:\s]+(?=\s*:)/,
						{
							pattern: /(:)[^:\s]+/,
							lookbehind: true
						}
					],
					'punctuation': /:/,
					'variable': variable,
					'operator': operator,
					'important': Prism.languages.sass.important
				}
			}
		});
		delete Prism.languages.sass.property;
		delete Prism.languages.sass.important;

		// Now that whole lines for other patterns are consumed,
		// what's left should be selectors
		delete Prism.languages.sass.selector;
		Prism.languages.insertBefore('sass', 'punctuation', {
			'selector': {
				pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
				lookbehind: true
			}
		});

	}(Prism));

	(function(Prism) {
		var insideString = {
			variable: [
				// Arithmetic Environment
				{
					pattern: /\$?\(\([\s\S]+?\)\)/,
					inside: {
						// If there is a $ sign at the beginning highlight $(( and )) as variable
						variable: [{
								pattern: /(^\$\(\([\s\S]+)\)\)/,
								lookbehind: true
							},
							/^\$\(\(/
						],
						number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
						// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
						operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
						// If there is no $ sign at the beginning highlight (( and )) as punctuation
						punctuation: /\(\(?|\)\)?|,|;/
					}
				},
				// Command Substitution
				{
					pattern: /\$\([^)]+\)|`[^`]+`/,
					greedy: true,
					inside: {
						variable: /^\$\(|^`|\)$|`$/
					}
				},
				/\$(?:[\w#?*!@]+|\{[^}]+\})/i
			]
		};

		Prism.languages.bash = {
			'shebang': {
				pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
				alias: 'important'
			},
			'comment': {
				pattern: /(^|[^"{\\])#.*/,
				lookbehind: true
			},
			'string': [
				//Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
				{
					pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
					lookbehind: true,
					greedy: true,
					inside: insideString
				},
				{
					pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
					greedy: true,
					inside: insideString
				}
			],
			'variable': insideString.variable,
			// Originally based on http://ss64.com/bash/
			'function': {
				pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'keyword': {
				pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'boolean': {
				pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
			'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
		};

		var inside = insideString.variable[1].inside;
		inside.string = Prism.languages.bash.string;
		inside['function'] = Prism.languages.bash['function'];
		inside.keyword = Prism.languages.bash.keyword;
		inside.boolean = Prism.languages.bash.boolean;
		inside.operator = Prism.languages.bash.operator;
		inside.punctuation = Prism.languages.bash.punctuation;
		
		Prism.languages.shell = Prism.languages.bash;
	})(Prism);

	var tpl$4 = (render, context = {}, hyperhtml = {}, _ = {}) => render`${
	context.props.label && context.props.showHeader
		? hyperhtml.wire()`<div class="${context.css.classes.header}">${context.props.label}</div>`
		: ''
}

<pre class="${`${context.css.classes.pre} language-${
	context.props.lang
}`}"><code class="${context.css.classes.code}" contenteditable="${context.props.editable}">${[context.props.text]}</code></pre>

<style>${context.cssString}</style>
`;

	var css$4 = {
		header: {
			backgroundColor: 'var(--color__brand4, hsl(0, 0%, 40%))',
			color: 'var(--color__light, hsl(0, 0%, 100%))',
			borderColor: 'var(--color__dark4)',
			borderWidth: '1px 1px 0',
			borderStyle: 'solid',
			display: 'flex',
			alignItems: 'center',
			height: '3rem',
			padding: '0 2rem'
		},
		pre: {
			lineHeight: '2rem',
			margin: '0 !important',
			padding: '2rem !important'
		},
		code: {
			padding: '0 !important',
			'&:focus': {
				outline: 'none'
			}
		}
	};

	var css$5 = "/**\n * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/chriskempson/tomorrow-theme\n * @author Rose Pritchard\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: #ccc;\n\tbackground: none;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #2d2d2d;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: #999;\n}\n\n.token.punctuation {\n\tcolor: #ccc;\n}\n\n.token.tag,\n.token.attr-name,\n.token.namespace,\n.token.deleted {\n\tcolor: #e2777a;\n}\n\n.token.function-name {\n\tcolor: #6196cc;\n}\n\n.token.boolean,\n.token.number,\n.token.function {\n\tcolor: #f08d49;\n}\n\n.token.property,\n.token.class-name,\n.token.constant,\n.token.symbol {\n\tcolor: #f8c555;\n}\n\n.token.selector,\n.token.important,\n.token.atrule,\n.token.keyword,\n.token.builtin {\n\tcolor: #cc99cd;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.regex,\n.token.variable {\n\tcolor: #7ec699;\n}\n\n.token.operator,\n.token.entity,\n.token.url {\n\tcolor: #67cdcc;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\n.token.inserted {\n\tcolor: green;\n}\n";

	class Code extends BrikElement {
		static get defaults() {
			return {
				editable: false,
				lang: '',
				label: '',
				text: '',
				showHeader: true
			};
		}

		static get observedAttributes() {
			return ['editable', 'lang', 'label', 'show-header'];
		}

		attributeChangedCallback(prop) {
			if (prop === 'editable') {
				this.updateEditability();
			}
			if (['editable', 'showHeader'].includes(prop) && typeof prop === 'string') prop = prop === 'true';
			this.render();
		}

		// Create the Custom Element.
		created() {
			// Create styles and dom.
			this.attachShadow({ mode: 'open' });
			this.css = styles.createStyleSheet(css$4, { classNamePrefix: 'brik-' });
			if (typeof this.props.showHeader === 'string') this.props.showHeader = this.props.showHeader === 'true';
			this.render();

			// Build dom.
			this.dom = {
				pre: this.shadowRoot.querySelector('pre'),
				code: this.shadowRoot.querySelector('code'),
				editor: this.parentNode.tagName === 'BRIK-EDITOR' ? this.parentNode : null
			};
			this.dataset.tab = this.props.lang;
			this.props.raw = this.textContent.trim();
			this.textContent = '';

			// Set default props.
			this.props.ticking = false;
			this.props.label = this.props.label || this.props.lang.toUpperCase();
			this.props.inputTimeout;

			// If this is part of an editor element, create a tab.
			if (this.dom.editor) {
				this.props.showHeader = false;
			}

			// Update editability.
			this.updateEditability();

			// Render.
			this.render();
		}

		disconnectedCallback() {
			this.updateEditability();
		}

		updateEditability() {
			this.props.editable = this.props.editable || this.dom.editor ? this.dom.editor.editable : false;
			if (!this.dom) return;
			if (this.props.editable) {
				this.dom.code.addEventListener('input', this.handleInput);
				this.dom.code.addEventListener('focus', this.handleFocus);
				this.dom.code.addEventListener('blur', this.handleBlur);
				this.dom.code.addEventListener('keydown', this.handleKeydown);
			} else {
				this.dom.code.removeEventListener('input', this.handleInput);
				this.dom.code.removeEventListener('focus', this.handleFocus);
				this.dom.code.removeEventListener('blur', this.handleBlur);
				this.dom.code.removeEventListener('keydown', this.handleKeydown);
			}
		}

		handleFocus() {
			this.props.text = this.props.raw;
			this.render();
		}

		handleBlur() {
			this.render();
		}

		handleInput() {
			if (this.dom.editor) {
				this.dom.editor.props.dirty = true;
				this.dom.editor.render();
			}
			this.props.raw = this.dom.code.textContent;
		}

		handleKeydown(event) {
			if ((event.ctrlKey || event.metaKey) && event.keyCode == 13) this.refreshPreview();
		}

		refreshPreview() {
			this.dom.editor.props.dirty = false;
			this.dom.editor.refreshPreview();
		}

		// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
		// nodes, data or attributes that change. See
		// https://viperhtml.js.org/hyperhtml/documentation/.
		render() {
			if (this.props.lang) {
				this.props.text = this.props.raw ? prism.highlight(this.props.raw, prism.languages[this.props.lang]) : '';
			} else {
				this.props.text = (this.props.raw || '').replace(/</g, '&lt;');
			}
			this.cssString = [css$5, this.css.toString()].join('\n');
			return tpl$4(this.html, this, BrikElement);
		}
	}

	var homePage = "<div class=\"markdown\"><h1>Welcome</h1>\n<h2>What to put here?</h2>\n<ul>\n<li>News and release notes?</li>\n<li>Why a UI Library?</li>\n<li>Getting Started?</li>\n</ul>\n</div>";

	var getStartedPage = "<div class=\"markdown\"><h1>Getting Started</h1>\n<p class=\"font__subtitle\">We’re working on documentation. Try back soon!</p>\n</div>";

	var workingWithNpmPage = "<div class=\"markdown\"><h1>Working with NPM</h1>\n<h2>What is NPM?</h2>\n<p><a href=\"https://docs.npmjs.com/\">Node Package Manager (<abbr title=\"Node Package Manager\">NPM</abbr>)</a> is the world’s largest software registry. NPM was originally created for <a href=\"https://nodejs.org/\">NodeJS</a>, but has since expanded to include the entire JavaScript ecosystem, as well as nearly any front end package known to mankind. It is considered the de facto standard for front end packages, as well for all types of Node packages.</p>\n<p>NPM consists of the software registry itself, but also a valuable set of tools. With NPM you can:</p>\n<ul>\n<li>Adapt packages of code to your apps, or incorporate packages as they are.</li>\n<li>Download standalone tools you can use right away.</li>\n<li>Run packages without downloading using <a href=\"https://www.npmjs.com/package/npx\">npx</a>.</li>\n<li>Easily manage multiple versions of code and code dependencies.</li>\n<li>Update applications easily when underlying code is updated.</li>\n<li>Discover multiple ways to solve the same puzzle.</li>\n<li>Create and manage organizations and virtual teams to coordinate package maintenance, coding, and developers.</li>\n<li>Run packages from the command line with “<a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a>” (see below).</li>\n<li>Run custom scripts with <a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a> (see below).</li>\n</ul>\n<p><strong>If you are not yet familiar with NPM, <a href=\"https://docs.npmjs.com/\">get familiar</a></strong>. <em>You won’t regret it!</em></p>\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/pa4dc480Apo?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>\n<h2>Getting Started with NPM</h2>\n<p><em>It is very easy to get started with NPM:</em></p>\n<ul>\n<li><a href=\"https://docs.npmjs.com/getting-started/installing-node\">Get set up</a>.</li>\n<li>Learn how to <a href=\"https://docs.npmjs.com/getting-started/installing-npm-packages-locally\">install NPM packages</a>.</li>\n<li>Learn how to work with <a href=\"https://docs.npmjs.com/getting-started/using-a-package.json\">package.json</a>.</li>\n<li>Learn how to use <a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a> (see below).</li>\n</ul>\n<p>The rest will come naturally over time. They have <a href=\"https://docs.npmjs.com/\">great documentation</a> to help you become a pro.</p>\n<h3>NPM Scripts</h3>\n<p>NPM Scripts is a very powerful (and underrated) feature of NPM. In the words of one user:</p>\n<blockquote>\n<p>“NPM scripts are among my favorite features of NPM. They are simple. They reduce the need for tools. Hence they reduce the number of configuration files and other things you need to keep track of. And they are very versatile.”</p>\n<p>“NPM scripts are, well, scripts [which we] use… to automate repetitive tasks. For example, building your project, minifying Cascading Style Sheets (CSS) and JavaScript (JS) files. Scripts are also used in deleting temporary files and folders, etc,. There are many ways to pull this off — you could write bash/batch scripts, or use a task runner like Gulp or Grunt. However, a lot of people are moving over to NPM scripts for their simplicity and versatility.”</p>\n<p>- Ajmal Siddiqui (<a href=\"https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633\">Introduction to NPM Scripts</a>)</p>\n</blockquote>\n<p><em>The possibilities of things you can do with NPM Scripts is endless.</em> However, one big downfall is that NPM itself does not provide great documentation about its wide variety of uses or how powerful it can be. Thankfully, due to its popularity, there is no shortage of information and tutorials from its users.</p>\n<h4>Getting Started with NPM Scripts</h4>\n<ul>\n<li><a href=\"https://css-tricks.com/why-npm-scripts/#article-header-id-0\">Why NPM Scripts?</a></li>\n<li><a href=\"https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633\">Introduction to NPM Scripts</a></li>\n<li><a href=\"https://medium.freecodecamp.org/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8\">Why I Left Gulp and Grunt for NPM Scripts</a></li>\n<li><a href=\"https://gist.github.com/elijahmanor/179e47828bf760c218bb3820d929836d\">Comparison of NPM Scripts vs something like Gulp</a></li>\n<li><a href=\"https://michael-kuehnel.de/tooling/2018/03/22/helpers-and-tips-for-npm-run-scripts.html\">Advice for working with NPM Scripts</a></li>\n<li><a href=\"https://deliciousbrains.com/npm-build-script/\">Using NPM Scripts as a Build Tool</a></li>\n<li><a href=\"https://docs.npmjs.com/misc/scripts\">NPM Scripts official docs</a></li>\n</ul>\n</div>";

	var monolithToMicroPage = "<div class=\"markdown\"><h1>Taking a Front End from Monolith to Micro</h1>\n<h2>The problem: The Monolith</h2>\n<p>Originally our Dev team was looking for a way to split up monolithic front end codebases into smaller, cohesive pieces. These pieces needed to be:</p>\n<ul>\n<li>Roll independent.</li>\n<li>Source control independent.</li>\n<li>Share infrastructure, where possible.</li>\n</ul>\n<p>Eventually I created my own wish list:</p>\n<ul>\n<li><em>Modular / self-contained</em>:\n<ul>\n<li>Fits into the microservice/modular approach. Each microservice does one thing well.</li>\n<li>Each piece deploys independently.</li>\n<li>If a library becomes obsolete, we only need to rewrite/replace the library, not the entire app or framework.</li>\n</ul>\n</li>\n<li><em>Interoperable</em>. Parts that might be reusable by other teams should be built in a way that allows other teams to use it and fit it into their technology/environment.\n<ul>\n<li>Works with any popular framework or environment.</li>\n<li>Perhaps even works with multiple frameworks on the same page with no reload.</li>\n</ul>\n</li>\n<li>Embraces <em>ES6/ES2015</em>. Take advantage of cool new features such as modules, promises, template literals, etc. Most ES6 features meet our browser support policy, and others can be polyfilled as needed.</li>\n<li>Favors <em>native</em> JS/DOM APIs over custom APIs.</li>\n<li>Embraces (or enables you to embrace) <em>web standards</em> and <a href=\"https://developers.google.com/web/progressive-web-apps/\">progressive web app standards</a>.</li>\n<li><em>Flexible</em> tooling. Not tied to a specific toolset.</li>\n</ul>\n<h2>The solution: Micro Front Ends</h2>\n<p>From my research, which mirrored the research of another Developer assigned to the researching this issue, the phrase “<a href=\"https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16\">Micro Front Ends</a>” kept appearing, and seemed to meet all of our criteria.</p>\n<h3>What is a Micro Front End?</h3>\n<p>The phrase is relatively new, and its definition seems to vary slightly from Developer to Developer. I will define it as:</p>\n<blockquote>\n<p>A larger front-end app or system which is composed of smaller, self-contained components or apps which can be developed and deployed independently of each other.</p>\n</blockquote>\n<h2>What makes up a Micro Front End?</h2>\n<p>There are <a href=\"https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16\">many ways to adopt a Micro Front End architecture</a>. Generally speaking, each approach has the following code layers:</p>\n<ul>\n<li><em>Page Composition:</em> Smaller components that make up a page.</li>\n<li><em>App Shell:</em> Provides an entry point to an app and organizes page components to present to a user.</li>\n<li><em>Page Transitions / Routing:</em> Enables and controls page transitions.</li>\n<li><em>The Build:</em> Bundles an app together, prepares for production, and deploys.</li>\n</ul>\n<h3>Part 1: Page Composition</h3>\n<p><em>Page Composition</em> is the biggest layer of an app. It consists of the various components that will reside on a page. These components must be:</p>\n<ul>\n<li>Independently packaged and deployed.</li>\n<li>Source control independent.</li>\n<li>Framework agnostic.</li>\n</ul>\n<h4>Web Components</h4>\n<p><strong>Web Components perfectly fit in with the Micro Front End architecture and fulfill all of our listed requirements.</strong></p>\n<p><a href=\"https://developer.mozilla.org/en-US/docs/Web/Web_Components\">Web Components</a> is a suite of native web technologies which allow you to create reusable custom elements (components) that can be reused anywhere. A Web Component can provide a public API for interacting with a component, which is abstracted away from everything else under the hood that its consumers do not need to know. Write once, share anywhere, easy to interact with, update as needed, isolated from everything else. Some benefits:</p>\n<ul>\n<li><a href=\"https://custom-elements-everywhere.com/\">Can be used anywhere</a>, regardless of framework or environment.</li>\n<li>Write once. Share anywhere. Update once. Deploy everywhere.</li>\n<li>Native technology. JS/DOM acts as the public API.</li>\n<li>Modular, self-contained, and independently deployable.</li>\n<li>Future proof.</li>\n<li>Works seamlessly with ES modules (ES6). Dependencies are imported, the build system glues it together.</li>\n<li>Embraces web standards, progressive web app standards, and native technologies.</li>\n</ul>\n<h4>Browser support</h4>\n<p>Currently Chrome and Safari (including mobile) support Web Components. Firefox has experimental support underneath a flag, which is set to be enabled soon. Edge is working on its implementation. There are polyfills available which have been used in production for some time – used by Polymer, GitHub, and others – which will bring browser support to our requirements.</p>\n<h4>JS Components</h4>\n<p>I am defining a JS component as an ES Module which exports certain functionality that can be imported elsewhere. JS Components also perfectly fit in with the Micro Front End architecture and fulfill all of our listed requirements.</p>\n<p>Web Components are instantiated as custom HTML elements, and they may rely on other JS scripts or components which you might want to reuse in multiple places. This includes any JS script that isn’t a Web Component, such as helper or utility scripts, and even libraries. Examples might be a merge utility, a virtual DOM library, or any other script that might be needed. Typically these scripts would be included globally (like in index.html), which would make them part of the App Shell. <em>However, in Micro Front Ends, including JS components in the App Shell layer should be avoided as much as possible.</em> Instead, JS components (scripts) should be included in the Page Composition layer. This is accomplished with ES Modules, by importing JS components into each Web Component that relies on it. The build system will de-duplicate components that are imported multiple times and glue it all together.</p>\n<p><em>See “Dependency handling” in “Part 5: Other Considerations” for more details.</em></p>\n<h3>Part 2: App Shell</h3>\n<p>The <em>App Shell</em> is a larger codebase which glues components together in an organized fashion to present to the user. The App Shell always includes:</p>\n<ul>\n<li>Entry point (index.html).</li>\n<li>Global CSS/JS.</li>\n</ul>\n<p>The App Shell <em>may or may not</em> include app-specific features such as:</p>\n<ul>\n<li>Routing</li>\n<li>User sessions</li>\n<li>Custom events bus</li>\n<li>etc.</li>\n</ul>\n<p>The App Shell should be thin. As thin as possible. Serious thought should be given before including anything in the App Shell. <strong>Always favor building a feature as a Web Component or reusable library over putting it into the App Shell. There should be good reasons for something to be part of the App Shell.</strong></p>\n<p>Remember, almost anything can be a component.</p>\n<h3>Part 3: Page Transitions / Routing</h3>\n<p>The router is a big part of any app since it enables and controls transitioning from page to page. In Micro Front Ends, the router might be part of the App Shell or it might be part of Page Composition (its own component). It might be created in-house or imported as a third party library. It might even be part of a larger framework.</p>\n<p>The reason this is listed out separately is because the router is a big enough part of any app that it deserves its own special considerations. How you implement the router should depend on the needs of the app, but <em>any routing solution should favor the native history API and work with Custom Elements (part of the Web Components spec).</em></p>\n<h3>Part 4: The Build System</h3>\n<p>The purpose of the build process is to glue everything together, prepare the app for production, and deploy. No specific build system is required, but, for our purposes, it must:</p>\n<ul>\n<li>Glue all of the components together, along with their dependencies.</li>\n<li>Compile ES6+ syntax to browser supported JS, and hopefully auto-include polyfills based on browser support policy (babel).</li>\n<li>Split the app into code bundles (code splitting / multiple entry files). This significantly helps app performance, especially on initial load.</li>\n<li>Be fast.</li>\n<li>Prepare the app for production.</li>\n</ul>\n<p>Most browsers now support most ES6 features (which is awesome). Browsers expect Web Components to be written using ES6 classes; ES5 syntax does not work. <a href=\"https://www.polymer-project.org/2.0/toolbox/build-for-production\">Polymer recommends compiling both an ES6 and an ES5 bundle for production</a>, and using browser feature detection to serve the correct bundle.</p>\n<p>Potential build tooling options:</p>\n<ul>\n<li><a href=\"https://webpack.js.org/\">Webpack</a></li>\n<li><a href=\"https://rollupjs.org/\">RollupJS</a></li>\n<li><a href=\"https://parceljs.org/\">ParcelJS</a></li>\n<li><a href=\"https://babeljs.io/\">Babel</a> (Note: Babel is typically used in tandem with another build tool to transpile from ES6 source to your list of supported browsers)</li>\n</ul>\n<h3>Part 5: Other Considerations</h3>\n<h4>Dependency handling</h4>\n<h5>Import dependencies to the Web Component which relies on it, not the App Shell</h5>\n<p>With the ES module system, dependencies can be easily imported to a Web Component or to the App Shell. However, dependencies should typically be imported to the Web Component which relies on it, not to the App Shell. The build system will de-duplicate code for you, so do not worry about the same dependency being imported to multiple Web Components in an App; the build system will make sure it is only included once.</p>\n<h5>Use extreme caution when importing dependencies</h5>\n<p><strong>A library or framework should only be included if it adds a feature we need that isn’t natively available.</strong> For example, Angular directives are unnecessary because Custom Elements (part of Web Components) do the same thing natively. This makes Angular less useful since it provides many features we don’t need. However, including a library for reactive data binding would be useful, since it is something we need that is not natively available.</p>\n<h5>Avoid importing dependencies to the App Shell</h5>\n<p>Remember, almost everything can be a Web Component or a library, and Web Components and libraries manage their own dependencies while the build system glues it all together. Just because a framework <em>can</em> live in the App Shell doesn’t mean it <em>should</em>. This is a shift in how we think about frameworks like Angular, React, or Vue, which or often the first thing to include in an app. Instead, these should be treated like any other library: as a Web Component or library dependency.</p>\n<h4>Shared events bus</h4>\n<p>Custom Elements (part of Web Components) can and should communicate via properties, attributes, and events. It may or may not be useful to include a <a href=\"https://www.quora.com/Is-there-a-micro-service-architecture-approach-for-front-end-development/answer/Mohamed-Abdel-Maksoud\">shared events bus</a> for components that need it. Something like <a href=\"https://github.com/chrisdavies/eev\">Eev</a>.</p>\n<h2>The Prototype</h2>\n<p><a href=\"https://github.com/brikcss/dsui-library-site\">Live code</a> | <a href=\"https://brikcss.github.io/dsui-library-site\">App repo</a></p>\n<p>Micro Front Ends sound great, on paper. But we wanted to prove it out with a prototype to see how that transitioned over to the real world. I started by building a single Web Component. It worked so well I built the UI Library entirely as Web Components.</p>\n<h3>File Structure</h3>\n<ul>\n<li><code>/node_modules</code>: Web Components imported as NPM Packages. Installed with <code>npm install</code>.</li>\n<li><code>/src/</code>\n<ul>\n<li><code>index.html</code>: Entry point.</li>\n<li><code>app.css</code>: App Shell styles.</li>\n<li><code>app.js</code>: App Shell scripts.</li>\n<li><code>routes.js</code>: Page / view routes.</li>\n</ul>\n</li>\n<li>Approximately 600 lines of JS/CSS in the App Shell, which mostly consist of the router setup and routes data.</li>\n</ul>\n<h3>The Tech</h3>\n<ul>\n<li><em>Custom Elements</em>: A set of JavaScript APIs that allow you to define custom elements and their behaviour, which can then be used as desired in your user interface.</li>\n<li><em>Shadow DOM</em>: A set of JavaScript APIs for attaching an encapsulated “shadow” DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way you can keep an element’s features private, so they can be scripted and styled without the fear of collision with other parts of the document.</li>\n<li><a href=\"http://cssinjs.org/\">JSS</a>: 6kb library which allows you to use CSS in JS. Used as a Shadow DOM fallback since it creates scoped CSS selectors. Once Shadow DOM is fully supported this will become less necessary.</li>\n<li><a href=\"https://viperhtml.js.org/hyperhtml/documentation/\">HyperHTML</a>: 4kb library. Think of it as an alternative to “virtual dom” made popular by React, only built with native JS/ES/DOM technologies.</li>\n<li><a href=\"https://router5.js.org/\">Router5</a>: A framework and library agnostic universal router.</li>\n<li>The build:\n<ul>\n<li><a href=\"https://rollupjs.org/guide/en\">RollupJS</a>: A JS module bundler, similar to Webpack.</li>\n<li><a href=\"https://github.com/postcss/postcss\">PostCSS</a>: A CSS post processor, allowing you to process CSS with JS plugins. You probably already use it with Autoprefixer.</li>\n<li>NPM with NPM scripts: Task runner which allows you to run JS scripts from the command line. Also provides access to NPM’s enormous JS ecosystem.</li>\n</ul>\n</li>\n</ul>\n<h3>Conclusions</h3>\n<p>Once you master the ins and outs and are familiar with the technologies, building Web Components is easy and straight forward. The most challenging part to it is creating the build system to tie it all together and achieve maximum browser support. Overall there are some tricky phases, but the end experience and outcome has been more than satisfying. <em>So satisfying, in fact, that I recommend we adopt this approach everywhere on the front end.</em></p>\n<h2>Step by step to adopting a Micro Front End</h2>\n<p>The thought of tearing down a Monolith and turning it into a Micro Front End is daunting. However, with some simple changes in how we all approach front end work in general, the Monolith can be broken down, over time, as part of your normal, everyday routine.</p>\n<h3>Step 1: Adopt a components-based approach to front end development</h3>\n<p>An app is no longer made up of “pages”. It consists of reusable components. The Platform Team has adopted <a href=\"https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit?usp=sharing\">Style Guide Driven Design and Development (SGDDD)</a>, a proven, components-based approach to front-end development based on the success and failures of other companies.</p>\n<p>A simplified step by step approach to SGDDD is as outlined in the two phases below.</p>\n<h4>Phase one: The Interface Inventory</h4>\n<ol>\n<li>Take screenshots of the entire UI (each screen where the UI changes).</li>\n<li>From the screenshots build a “master list” of UI patterns.</li>\n<li>Use the Master List to prioritize components to be built.</li>\n</ol>\n<h4>Phase two: Building the Style Guide</h4>\n<p>Phase two is about changing how UX Designers and Developers work together on a daily basis. <em>This process should be followed not only for every pattern in the components Master List, but also for every feature or page or design discussed or created in the future.</em></p>\n<ol>\n<li>Define the pattern / feature. Write down its purpose and requirements.</li>\n<li>Break the pattern down into components. Compare with existing Style Guide components and create a list:\n<ul>\n<li>What existing component(s) / patterns can be reused?</li>\n<li>What existing component(s) / patterns need to be extended?</li>\n<li>What component(s) need to be created?</li>\n<li>Create stories and tasks from this list of components.</li>\n</ul>\n</li>\n<li>Build a design prototype.</li>\n<li>Build a code prototype <em>in an isolated environment</em> (UI Library / Style Guide site). Iterate with UX until prototype is approved.</li>\n<li>Prepare component(s) for production and integrate.</li>\n</ol>\n<p>Each team should adopt this approach. <strong>This approach requires “buy in” from all of UX an Developers.</strong> Note: See the <a href=\"https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit#heading=h.8dazjiktil\">full detailed explanation of SGDDD here</a>.</p>\n<h4>Coordinating work with the Platform team</h4>\n<p>All teams should coordinate with and work together with the Platform team before building any component. This will prevent work from being duplicated, and also determine how each component or pattern fits in to the global UI. Components that should end up in the global UI Library can be prioritized into the Platform team’s work. At the same time, teams won’t have to wait for the Platform team’s limited resources to build a component they need. Components can be initially created by teams and later adopted into the UI Library by the Platform team.</p>\n<h4>Benefits of adopting this approach</h4>\n<ul>\n<li>Go from monolith to micro front end one small step at a time (eat the elephant one bite at a time).</li>\n<li>Speed up the work of creating the DS UI Library / Style Guide of components.</li>\n<li>Solve challenges which were identified in discovery such as:\n<ul>\n<li>Unnecessary time spent on front end development.</li>\n<li>Too much time fixing bugs. This often is related to inconsistent, hacky, or redundant front-end code. I call this the “whack-a-mole” affect, where it is difficult or impossible to know what other bugs will pop up as a result of fixing another.</li>\n<li>Slow and sluggish performance.</li>\n<li>Broken functionality. Some features don’t work as intended, especially on mobile.</li>\n<li>Inconsistent UI between apps.</li>\n<li>Mobile and responsive optimization. Many features are not optimized for mobile.</li>\n<li>Unmaintainable code. Code is frequently duplicated, not reusable. Code bloat.\n<ul>\n<li>Back Office on 6/15/2016 (Wakaya):\n<ul>\n<li>CSS = 827kb</li>\n<li>JS = 4.7mb</li>\n</ul>\n</li>\n<li>Back Office on 3/1/2017 (Wakaya):\n<ul>\n<li>CSS = 1.5mb</li>\n<li>JS = 7.4mb</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<h3>Step 2: Build the App Shell</h3>\n<p>Once a components-based approach to UI development is adopted, the App Shell must be created. This be a simple or more involved process, depending on the codebase. The goal of this step is to prepare the codebase for Web Components. It might be decided to build the App Shell before any component is integrated into the app, or in correlation with the integration of the first component. Either way, here are some considerations:</p>\n<ul>\n<li>Will a JS framework be used? It seems the main reason we would use it with the Web Components approach is for developer comfort and familiarity. Is that enough to add a framework? Or are there other benefits it may provide?</li>\n<li>Create global CSS and JS (app.css and app.js). At this point, these should both likely be extremely thin, possibly empty.</li>\n<li>Move temporary styles/scripts to a separate “temp” folder so they are “marked” for deprecation and eventual removal. No new styles or scripts should be added to these files anymore.</li>\n<li>Prepare entry file (index.html). Add app.css and app.js. Clean it up as needed. Mark sections for deprecation and removal. Mark what needs to be built as a component.</li>\n<li>Build out the router and/or any other pieces that will be included in the App Shell instead of integrated as its own component.</li>\n</ul>\n<h3>Step 3: Build the build</h3>\n<p>The build system should glue everything together and prepare the app for production. There are many ways this can be done. It is recommended to use NPM Scripts as the task runner, since it provides the most flexibility in building and running custom scripts, and also provides an enormous ecosystem of libraries, helpers, and build tools.</p>\n<h3>Step 4: Use the Master List to build one component at a time</h3>\n<p>This process is detailed in <a href=\"https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit#heading=h.8dazjiktil\">“Phase Two” of the SGDDD documentation</a>. The purpose is to phase out the old (the Monolith) and bring in the new (the Micro Front End). As each new Web Component is built, old code must be removed. Over time the old goes away completely, and the app morphs into something new and beautiful.</p>\n<h4>Suggestions on building components</h4>\n<ul>\n<li>Each component must reside in its own repo.</li>\n<li>Each component should be published to NPM.</li>\n<li>Each component should be tested in isolation, including unit tests and UI screenshot regression tests.</li>\n<li>In UI screenshot tests, make sure to remove unimportant elements before taking a screenshot so as to only test the things that are important and shouldn’t change frequently.</li>\n<li>Each component should also be cross browser tested in its own environment, such as the UI Library / Style Guide site.</li>\n</ul>\n<h2>References</h2>\n<h3>Why Web Components</h3>\n<ul>\n<li><a href=\"https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16\">A microservice approach to front end web development</a></li>\n<li><a href=\"https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133\">The Case for Custom Elements</a> (also <a href=\"https://medium.com/dev-channel/the-case-for-custom-elements-part-1-65d807b4b439\">part 1</a>)</li>\n<li><a href=\"https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/\">Complaints against Web Components</a> and <a href=\"https://robdodson.me/regarding-the-broken-promise-of-web-components/\">a rebuttle</a> (great conversation which outlines two different perspectives)</li>\n<li><a href=\"http://www.backalleycoder.com/2016/08/26/demythstifying-web-components/\">Demythstifying Web Components</a></li>\n<li><a href=\"https://micro-frontends.org/\">Micro Front-Ends</a> with Web Components</li>\n<li><a href=\"https://speakerdeck.com/naltatis/micro-frontends-building-a-modern-webapp-with-multiple-teams\">Slideshow on Micro Front-Ends</a></li>\n<li><a href=\"https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48\">Custom Elements that work anywhere</a></li>\n<li><a href=\"https://custom-elements-everywhere.com/\">Does framework “x” support custom elements?</a></li>\n</ul>\n<h3>Style Guide Driven Design and Development (SGDDD)</h3>\n<ul>\n<li><a href=\"https://docs.google.com/document/d/1XYjuG8ddnDezwP0ojcpLuDVgcUdCA_bWXInXvusio2Q/edit?usp=sharing\">Summary of SGDDD</a></li>\n<li><a href=\"https://drive.google.com/open?id=1ZMjUQOEDbX5t5AEZ6RQi5CPZrlvYPvu5\">Design Systems book</a></li>\n<li><a href=\"https://www.smashingmagazine.com/2016/06/designing-modular-ui-systems-via-style-guide-driven-development/\">Designing Modular UI Systems via SGDDD - Smashing Magazine</a></li>\n<li><a href=\"https://www.bitovi.com/blog/style-guide-driven-development\">Style Guide Driven Development - Bitovi</a></li>\n<li><a href=\"https://www.invisionapp.com/blog/guide-to-design-systems/\">Comprehensive Guide to Design Systems - Invision</a></li>\n<li><a href=\"http://standards.ancestry.com/\">Ancestry Style Guide site</a></li>\n<li><a href=\"https://www.ancestry.com/cs/standards/getting-started#try-it-out\">Illustration of problems that Ancestry’s Style Guide site resolves</a></li>\n<li><a href=\"http://design-system.pluralsight.com/\">PluralSight’s Style Guide site</a></li>\n<li><a href=\"http://atomicdesign.bradfrost.com/table-of-contents/\">Atomic Design System - Brad Frost</a></li>\n</ul>\n<h3>Working with Web Components</h3>\n<ul>\n<li><a href=\"https://developer.mozilla.org/en-US/docs/Web/Web_Components\">MDN Web Components with Tutorials</a></li>\n<li><a href=\"https://developers.google.com/web/fundamentals/web-components/\">Google Web Components Fundamentals</a></li>\n<li><a href=\"https://github.com/GoogleChromeLabs/ui-element-samples\">Google Web Component examples</a></li>\n<li><a href=\"https://alligator.io/web-components/\">Web Components tutorials</a></li>\n<li><a href=\"https://blog.revillweb.com/write-web-components-with-es2015-es6-75585e1f2584\">Write Web Components with ES5</a></li>\n<li><a href=\"https://philipwalton.com/articles/deploying-es2015-code-in-production-today/\">Deploying ES6 code in production</a></li>\n<li><a href=\"https://slides.com/sara_harkousse/web-components-talk-devoxx-france-2018#/\">Slideshow on Web Components</a></li>\n<li><a href=\"https://www.pluralsight.com/courses/vanilla-web-components-practical-guide?irgwc=1&amp;mpid=1216269&amp;utm_source=impactradius&amp;utm_medium=digital_affiliate&amp;utm_campaign=1216269&amp;aid=7010a000001xAKZAA2\">Guide to Web Components - PluralSight</a></li>\n<li><a href=\"https://github.com/shprink/web-components-todo\">Comparison of Web Components in different technologies</a></li>\n<li><a href=\"https://github.com/shawnbot/custom-elements\">Custom Elements helpful resources</a></li>\n<li><a href=\"https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48\">Favor a declarative API</a></li>\n</ul>\n<h3>The build</h3>\n<ul>\n<li><a href=\"https://www.polymer-project.org/2.0/toolbox/build-for-production\">How Polymer compiles for production</a></li>\n<li><a href=\"https://webpack.js.org/\">Webpack</a></li>\n<li><a href=\"https://rollupjs.org/\">RollupJS</a></li>\n<li><a href=\"https://parceljs.org/\">ParcelJS</a></li>\n<li><a href=\"https://babeljs.io/\">Babel</a> (Note: Babel is typically used in tandem with another build tool to transpile from ES6 source to your list of supported browsers)</li>\n</ul>\n<h3>Polyfills</h3>\n<ul>\n<li><a href=\"https://github.com/WebReflection/document-register-element\">Custom Elements polyfill</a> using mutation observers.</li>\n<li><a href=\"https://github.com/WebComponents/webcomponentsjs\">Suite of polyfills for Web Components</a> (can be automated) and a tutorial.</li>\n<li><a href=\"https://polyfill.io/v2/docs/\">On-demand automatic polyfill delivery system</a> for all the things.</li>\n<li><a href=\"https://www.polymer-project.org/\">Polymer</a> (Google)</li>\n<li><a href=\"http://x-tag.github.io/\">X-Tag</a> (Microsoft)</li>\n<li><a href=\"https://github.com/zloirock/core-js\">Core-js</a> suite of es6 polyfills</li>\n</ul>\n<h3>Potentially useful libraries</h3>\n<ul>\n<li>Web Component authoring libraries:\n<ul>\n<li><a href=\"http://skatejs.netlify.com/\">SkateJS</a></li>\n<li><a href=\"http://slimjs.com/\">SlimJS</a></li>\n<li><a href=\"https://stenciljs.com/\">StencilJS</a></li>\n</ul>\n</li>\n<li>Virtual DOM libraries:\n<ul>\n<li><a href=\"https://viperhtml.js.org/hyper.html\">HyperHTML</a></li>\n<li><a href=\"https://github.com/snabbdom/snabbdom\">Snabbdom</a></li>\n</ul>\n</li>\n<li>Universal routers:\n<ul>\n<li><a href=\"http://router5.github.io/\">Router5</a></li>\n<li><a href=\"https://github.com/krasimir/navigo\">Navigo</a></li>\n<li><a href=\"https://www.kriasoft.com/universal-router/\">Universal Router</a></li>\n</ul>\n</li>\n<li>Other libraries:\n<ul>\n<li><a href=\"https://github.com/chrisdavies/eev\">Eev</a> - Shared event bus.</li>\n</ul>\n</li>\n</ul>\n</div>";

	var customElementPage = "<div class=\"markdown\"><h1>Creating a Web Component</h1>\n<p class=\"font__subtitle\">Come back soon! This page is being worked on.</p>\n<!-- The task of creating a Web Component is fairly straight forward. The most challenging part is ensuring the Web Component is cross-browser compatible, and becoming familiar with the tools involved in doing so. The purpose of this document is to outline the process of how UI Library components are created, including the tools and libraries involved, so that other Developers can, on their own, create Web Components in a way that is cohesive with the global UI Library components. {.font__subtitle} -->\n</div>";

	var browserResetPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Browser Reset</h2>\n\t\t<p>Default styles for HTML elements can differ from browser to browser. The browser reset is a set of CSS rules that <em>resets</em> styles for all HTML elements so all browsers start with a consistent baseline.</p><p><em>Every DS app should include Browser Reset as the first stylesheet in their app.</em></p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/\">Links</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/spacing\">Spacing</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>IE</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon name=\"google-chrome\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"firefox\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"apple-safari\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> <div class=\"browsers-table__icon-label\">11</div></td>\n\t\t\t<td><brik-icon name=\"apple-ios\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"android\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Browser Reset with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Browser Reset as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/browser-reset --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include one of the following as the first stylesheet in your app:</p>\n\t\t\t<ol>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/browser-reset';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/browser-reset.min.css</code> for precompiled vanilla CSS.</li>\n\t\t\t\t<li><em>(optional) Customize</em> CSS variables in your app, as desired (see <a href=\"https://github.com/brikcss/browser-reset/blob/master/src/browser-reset.css\" title=\"browser-reset.css\">browser-reset.css</a> for available variables).</li>\n\t\t\t</ol>\n\n\t</div>\n</brik-tabs>\n";

	var typographyPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Typography</h2>\n\t\t<p>DSUI Typography closely follows <a href=\"https://material.io/design/typography/the-type-system.html\" title=\"Material Design type system\">Material Design's type system</a>, which defines a range of type sizes that may be used. DSUI Typography provides the mechanism for applying and managing typography based on MD specs.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/colors\">Colors</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/spacing\">Spacing</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/components/lists\">Lists</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/components/links\">Links</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Roboto font face</h3>\n\t\t<p><strong>Roboto</strong> is the <em>only</em> UX approved font family. <brik-icon name=\"alert\" size=\"1.2em\"></brik-icon> Any exceptions require UX approval.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Use only approved font styles</h3>\n\t\t<p><em>Only use approved font styles.</em> <brik-icon name=\"alert\" size=\"1.25em\"></brik-icon> Any exceptions require UX approval and should be added to this list.</p>\n\n\t\t<h4 class=\"font__subtitle\">Font style categories</h4>\n\t\t<dl class=\"list__indented\">\n\t\t\t<dt>Headlines and Titles</dt>\n\t\t\t<dd>Headlines and titles are the largest text on the screen, reserved for short, important text or numerals.</dd>\n\n\t\t\t<dt>Subtitles</dt>\n\t\t\t<dd>Subtitles are smaller than headlines but larger than body text, reserved for medium-emphasis text that is shorter in length.</dd>\n\n\t\t\t<dt>Body text</dt>\n\t\t\t<dd>Body text is used for long-form writing.</dd>\n\n\t\t\t<dt>Caption and Overline text</dt>\n\t\t\t<dd>Caption and overline text are the smallest font sizes, used sparingly to annotate imagery or introduce a headline.</dd>\n\n\t\t\t<dt>Button text</dt>\n\t\t\t<dd>Button text is a call to action, used in buttons, tabs, dialogs, and cards. Button text is all caps, but can be modified to sentence case.</dd>\n\t\t</dl>\n\n\t\t<h4 class=\"font__subtitle\">UX approved font styles:</h4>\n\t\t<table class=\"type__table\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Size / Weight</th>\n\t\t\t\t\t<th>Sample</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Overline</td>\n\t\t\t\t\t<td>10 / 400</td>\n\t\t\t\t\t<td class=\"font__overline\">Overline: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Caption</td>\n\t\t\t\t\t<td>12 / 400</td>\n\t\t\t\t\t<td class=\"font__caption\">Caption: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Button</td>\n\t\t\t\t\t<td>14 / 500</td>\n\t\t\t\t\t<td class=\"font__button\">Button: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Body2</td>\n\t\t\t\t\t<td>14 / 400</td>\n\t\t\t\t\t<td class=\"font__body2\">Body 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Body</td>\n\t\t\t\t\t<td>16 / 400</td>\n\t\t\t\t\t<td class=\"font__body\">Body (default): test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Subtitle2</td>\n\t\t\t\t\t<td>14 / 500</td>\n\t\t\t\t\t<td class=\"font__subtitle2\">Subitle 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Subtitle</td>\n\t\t\t\t\t<td>16 / 400</td>\n\t\t\t\t\t<td class=\"font__subtitle\">Subtitle: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title3</td>\n\t\t\t\t\t<td>20 / 500</td>\n\t\t\t\t\t<td class=\"font__title3\">Title 3: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title2</td>\n\t\t\t\t\t<td>24 / 400</td>\n\t\t\t\t\t<td class=\"font__title2\">Title 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title1</td>\n\t\t\t\t\t<td>34 / 300</td>\n\t\t\t\t\t<td class=\"font__title1\">Title 1: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H6</td>\n\t\t\t\t\t<td>20 / 500</td>\n\t\t\t\t\t<td class=\"font__h6\">Heading 6: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H5</td>\n\t\t\t\t\t<td>24 / 400</td>\n\t\t\t\t\t<td class=\"font__h5\">Heading 5: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H4</td>\n\t\t\t\t\t<td>34 / 400</td>\n\t\t\t\t\t<td class=\"font__h4\">Heading 4: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H3</td>\n\t\t\t\t\t<td>48 / 400</td>\n\t\t\t\t\t<td class=\"font__h3\">Heading 3: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H2</td>\n\t\t\t\t\t<td>60 / 300</td>\n\t\t\t\t\t<td class=\"font__h2\">Heading 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H1</td>\n\t\t\t\t\t<td>96 / 300</td>\n\t\t\t\t\t<td class=\"font__h1\">Heading 1: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Limit line length for readability</h3>\n\t\t<p>For best readability, lines of text should be no longer than ~60 characters. Shorter lines of text should wrap at ~30 characters or less.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Approved text colors</h3>\n\t\t<p>Refer to the <a href=\"#!/core/colors\">Colors component</a> for applying text colors.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Additional guidelines</h3>\n\t\t<p><a href=\"https://material.io/design/typography/\" title=\"Material Design type specs\"><abbr title=\"Material Design\">MD</abbr> type specs</a> are an extension of DSUI, and should be referred to for further guidance.</p>\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>IE</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon name=\"google-chrome\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"firefox\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"apple-safari\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> <div class=\"browsers-table__icon-label\">11</div></td>\n\t\t\t<td><brik-icon name=\"apple-ios\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"android\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Typography with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Typography as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/typography --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/typography';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/typography.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/typography.css</code> to create a custom build.</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\t\t<p>A class and a \"style set\" is provided for each named typography style (see \"About\" tab for list of named styles). Each class and style set follows a naming convention:</p>\n\t\t<pre><code>font__&lt;name></code></pre>\n\t\t<p><em>Note: See the \"About\" tab for a full list of available font styles and their names.</em></p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><em>Always</em> use font classes to apply a font style in markup.</li>\n\t\t\t<li><em>Always</em> use a font style set to apply a font style in CSS.</li>\n\t\t\t<li><em>Never</em> modify CSS <code>font-*</code> properties without UX approval.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Font classes</h3>\n\t\t<p>Use font classes to apply font styles in markup. For example:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"html\">&lt;h2 class=\"font__title1\"&gt;My awesome font in \"title\" style.&lt;/h2&gt;</brik-code>\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Font style sets</h3>\n\t\t<p>Use font style sets to apply font styles in CSS. For example:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"css\" label=\"PostCSS\">.my-heading {\n\t@apply --font__title1;\n}</brik-code>\n\t\t\t<brik-code lang=\"css\" label=\"Compiled\">/* Note: PostCSS converts all `px` values to `rem`s. */\n.my-heading {\n\tfont-size: 4.25rem;\n\tfont-weight: 400;\n\tline-height: 5rem;\n\tletter-spacing: 0.01471rem;\n\tfont-weight: 300;\n}</brik-code>\n\t\t</brik-editor>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Font classes</h2>\n\t\t<p>Edit the class in the editor below with one of the following: <code>overline</code>, <code>caption</code>, <code>body</code>, <code>body2</code>, <code>subtitle2</code>, <code>subtitle</code>, <code>title3</code>, <code>title2</code>, <code>title1</code></p>\n\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;p class=\"font__subtitle\">Subtitle: I am subtitle text. Wow.&lt;/p></brik-code>\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

	var colorsPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<!-- About. -->\n\t<div class=\"tabs__content\">\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Colors</h2>\n\t\t<p>DSUI Colors make it easy to apply and manage all of your app's colors. Define colors once and reuse them everywhere. Colors use native CSS variables, which offer many potential features such as live theming.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\t\t<p>Only approved colors should be used. <brik-icon name=\"alert\" size=\"1.2em\"></brik-icon> Any exception requires UX approval.</p>\n\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">Neutral colors (text, icons, borders)</h3>\n\t\t\t<p>Neutral colors are shades of black and white, each with an applied level of opacity. These colors can be used in text, icons, and borders on light backgrounds. Dark colors should only be used on light backgrounds, while light colors should only be used on dark backgrounds.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark1); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark1 (or dark)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark1)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 87% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.87)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark2 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark2)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 54% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.54)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Active dark icons, Secondary dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark3 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark3)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 38% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.38)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Inactive dark icons, Disabled / hint dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark4); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark4 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark4)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 12% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.12)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Dark borders / dividers</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light1); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light1 (or light)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light1)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 100% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 1)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light2 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light2)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 70% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.7)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Active light icons, Secondary light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light3 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light3)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 50% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.5)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Inactive light icons, Disabled / hint light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light4); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light4 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light4)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 12% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.12)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Light borders / dividers</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">App colors</h3>\n\t\t\t<p>Background colors with specific use cases.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__gray); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">gray </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__gray)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(0, 0%, 90%)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Neutral background</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__supernav); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">supernav </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__supernav)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#3a4d5f</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(209, 24%, 30%)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Sidebar header</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__supernav--icon); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">supernav--icon </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__supernav--icon)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#9ca6b0</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(208, 11%, 65%)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Sidebar icons</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">Theme colors</h3>\n\t\t\t<p>Theme colors are specific to a client and chosen by the client, with DirectScale theme colors provided as fallbacks. <em>Color values are not provided because they should not be used directly.</em> Only the color variables should be used.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand1); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand1 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand1)</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary app bar, text links, visual tree</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand2 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand2)</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Buttons, profile avatars</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand3 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand3)</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Selections, checkboxes, selected state for dropdowns, active tab underlines</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand4); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand4 </span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand4)</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Distributor profile avatars, selected item in sidebar list, secondary color for visual tree</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t</div>\n\n\t<!-- Install & Setup. -->\n\t<div class=\"tabs__content\">\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>IE</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon name=\"google-chrome\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"firefox\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"apple-safari\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> <div class=\"browsers-table__icon-label\">11</div></td>\n\t\t\t<td><brik-icon name=\"apple-ios\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"android\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Colors with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Colors as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/colors --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/colors';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/colors.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/colors.css</code> to create a custom build..</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<!-- Usage. -->\n\t<div class=\"tabs__content\">\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\t\t<p>A variable and class is created for each text and background color.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><em>Always</em> use color variables to apply colors in CSS.</li>\n\t\t\t<li><em>Always</em> use color classes to apply colors in markup.</li>\n\t\t\t<li><em>Never</em> manually apply <code>color</code> or <code>background-color</code> properties without UX approval.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Color variables</h3>\n\t\t<p>Use color variables to apply colors in CSS. Each color variable follows this naming convention:</p>\n\t\t<brik-code lang=\"css\">var(--color__&lt;name>)</brik-code>\n\t\t<p>For example, to apply a background theme color with light text:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"css\">.my-component {\n\tbackground-color: var(--color__theme3);\n\tcolor: var(--color__light);\n}</brik-code>\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Color classes</h3>\n\t\t<p>Use color classes to apply colors in markup. Each color class follows a naming convention.</p>\n\t\t<p>Text color classes:</p>\n\t\t<pre><code>c__&lt;name></code></pre>\n\t\t<p>Background color classes:</p>\n\t\t<pre><code>bg__&lt;name></code></pre>\n\t\t<p>For example, to apply a background theme color with light text:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"c__light bg__theme3\">...&lt;/div></brik-code>\n\t\t</brik-editor>\n\t</div>\n\n\t<!-- Examples. -->\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Color variables</h2>\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"my-awesome-component\">My awesome component.&lt;/div></brik-code>\n\t\t\t<brik-code lang=\"css\">.my-awesome-component {\n\tbackground-color: var(--color__brand2);\n\tcolor: var(--color__light);\n\n\t/* Helper styles (unimportant). */\n\tdisplay: flex;\n\talign-items: center;\n\ttext-align: center;\n\theight: 20rem;\n\twidth: 20rem;\n}</brik-code>\n\t\t</brik-editor>\n\n\t\t<h2 class=\"font__title2\">Color classes</h2>\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"color-light bg-brand2 my-awesome-component\">My awesome component.&lt;/div></brik-code>\n\t\t\t<brik-code lang=\"css\">.my-awesome-component {\n\theight: 20rem;\n\twidth: 20rem;\n}</brik-code>\n\t\t</brik-editor>\n\t</div>\n";

	var rhythmPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Rhythm</h2>\n\t\t<p>Rhythm offers an easy way to apply and manage vertical and horizontal spacing. Rhythm is foundational for mastering <a href=\"https://www.creativebloq.com/how-to/the-rules-of-responsive-web-typography\">typography</a> and <a href=\"https://webdesign.tutsplus.com/articles/improving-layout-with-vertical-rhythm--webdesign-14070\">layout</a>, as it fosters <a href=\"https://zellwk.com/blog/why-vertical-rhythms/\">repetition and familiarity</a> throughout the UI, making any layout more <a href=\"https://blog.alexdevero.com/6-simple-secrets-perfect-web-typography/#no5-focus-on-vertical-rhythm\">balanced, beautiful, and readable</a>.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Definitions</h3>\n\t\t<dl class=\"list__indented\">\n\t\t\t<dt>Dimensional properties</dt>\n\t\t\t<dd>Any CSS property which affects an element's dimensions and/or spacing, including but not limited to: <code>height</code>, <code>width</code>, <code>margin</code>, <code>padding</code>, <code>line-height</code>, <code>border</code>.</dd>\n\t\t\t<dt>1rem</dt>\n\t\t\t<dd>A <code>rem</code> is a CSS unit of measurement -- an alternative to <code>pixels</code> -- which can make any layout scaleable and responsive. In DSUI, equal to 8 pixels.</dd>\n\t\t</dl>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Use <code>rems</code> for all dimensional properties</h3>\n\t\t<p>DSUI uses <a href=\"https://www.sitepoint.com/understanding-and-using-rem-units-in-css/\" title=\"Understanding rem units in CSS\">CSS <code>rem</code> units</a> to apply rhythm and spacing. <em>Follow the \"rules of Rhythm\" below when applying <code>rems</code>.</em></p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Strictly follow the \"Rules of Rhythm\"</h3>\n\t\t<p>To ensure the layout and spacing grid always stays \"in rhythm\", follow these rules:</p>\n\t\t<ol>\n\t\t\t<li>\n\t\t\t\t<p><em>Always</em> use <code>rem</code> units for <em>dimensional properties</em>:</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Use a <strong>1rem grid</strong> (8 pixels) for components.</li>\n\t\t\t\t\t<li>A <strong>0.5rem grid</strong> (4 pixels) may be used for typography and iconography.</li>\n\t\t\t\t</ul></li>\n\t\t\t<li><p><em>Avoid</em> applying <code>rems</code> in fractions (except as noted above). This will break the Rhythm.</p></li>\n\t\t\t<li>\n\t\t\t\t<p><em>Always</em> \"fix\" the Rhythm if and when it's necessary to break it.</p>\n\t\t\t\t<p>Applying <code>rems</code> in fractions will break the Rhythm. There may be rare cases where this necessary, such as when an element needs a <code>1px</code> border, or an image needs a specific height in pixels.</p>\n\t\t\t\t<p>In such cases, you must manually put things back \"in rhythm\" by following this rule:</p>\n\t\t\t\t<blockquote>\n\t\t\t\t\t<p><em>The sum of vertical and horizontal dimensional property values for a given element, converted to <code>rems</code>, must each be an integer.</em></p>\n\t\t\t\t</blockquote>\n\t\t\t</li>\n\t\t</ol>\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>IE</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon name=\"google-chrome\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"firefox\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"apple-safari\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"edge\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> <div class=\"browsers-table__icon-label\">11</div></td>\n\t\t\t<td><brik-icon name=\"apple-ios\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t\t<td><brik-icon name=\"android\" size=\"4rem\" fill=\"hsla(0, 0%, 0%, 0.5\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Rhythm with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Rhythm as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/rhythm --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/spacing';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/spacing.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/spacing.css</code> to create a custom build..</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul>\n\t\t\t<li><em>Always</em> use CSS <code>rems</code> to apply dimensional properties (height, width, margins, padding, etc.) in CSS.</li>\n\t\t\t<li><em>Always</em> use Rhythm classes to apply Rhythm in markup.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Applying Rhythm with <code>rems</code></h3>\n\t\t<p>Applying Rhythm with <code>rems</code> is fairly self-explanatory. The important thing to remember is to <em>always follow the Rules of Rhythm</em> (see the \"About\" tab).</p>\n\t\t<p>Simple example:</p>\n\t\t<brik-code lang=\"css\">.my-component {\n\tborder: 1px solid var(--color__dark4);\n\tmargin-top: 2rem;\n\n\t/* Apply Rhythm fix to height/width dimensions since 1px top and bottom border throws it off */\n\theight: calc(10rem - 2px);\n\twidth: 14rem;\n}</brik-code>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Applying Rhythm with classes</h3>\n\t\t<p>DSUI Rhythm provides a series of utility classes to allow you to easily apply <code>padding</code> and <code>margin</code> to any element. Each Rhythm class follows these format:</p>\n\t\t<pre><code>.{p|m}{l|r|t|b|x|y}-{value}</code></pre>\n\t\t<p>where:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>value</code> is the rem value being applied</li>\n\t\t\t<li><code>p</code> applies <code>value</code> to padding</li>\n\t\t\t<li><code>m</code> applies <code>value</code> to margin</li>\n\t\t\t<li><code>l</code> applies <code>value</code> to left side</li>\n\t\t\t<li><code>r</code> applies <code>value</code> to right side</li>\n\t\t\t<li><code>t</code> applies <code>value</code> to top side</li>\n\t\t\t<li><code>b</code> applies <code>value</code> to bottom side</li>\n\t\t\t<li><code>x</code> applies <code>value</code> to left and right sides</li>\n\t\t\t<li><code>y</code> applies <code>value</code> to top and bottom sides</li>\n\t\t</ul>\n\t\t<h4 class=\"font__subtitle\">Examples of Rhythm utility classes</h4>\n\t\t<p>By default, Rhythm classes are created for the following <code>rem</code> values:</p>\n\t\t<blockquote>\n\t\t\t<code>0</code>, <code>0.5rem</code>, <code>1rem</code>, <code>1.5rem</code>, <code>2rem</code>, <code>3rem</code>, <code>4rem</code>\n\t\t</blockquote>\n\t\t<p>Some examples of valid Rhythm classes:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>.pl-1</code> applies 1rem of padding-left</li>\n\t\t\t<li><code>.mr-2</code> applies 2rem of margin-right</li>\n\t\t\t<li><code>.pb-1-5</code> applies 1.5rem of padding-bottom</li>\n\t\t\t<li><code>.mt-4</code> applies 4rem of margin-top</li>\n\t\t\t<li><code>.px-0-5</code> applies 0.5rem of padding-left and padding-right</li>\n\t\t\t<li><code>.my-1</code> applies 1rem of margin-top and margin-bottom</li>\n\t\t\t<li><code>.p-4</code> applies 4rem of padding</li>\n\t\t\t<li><code>.m-3</code> applies 3rem of margin</li>\n\t\t</ul>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2\">Examples</h2>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;px-1&quot;&gt;Padding left and right&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;m-4&quot;&gt;Margin on all sides&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;m-4 mb-0 pl-2 pt-1&quot;&gt;Margin on all sides except bottom with a left and top padding&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

	var spinnerPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Spinner</h2>\n\t\t<p>Spinner is a visual indicator that content on the page is loading. Spinner can optionally display the progress of an operation.</p>\n\t</div>\n\n\t\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<p class=\"font__subheading\">We are working on this page.</p>\n\t</div>\n\n\t<div>\n\t\t\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n\n<brik-code lang=\"bash\">npm install @brikcss/spinner --save-dev</brik-code>\n\n<h3 class=\"font__title2 heading__separator\">Setup</h3>\n<p>Make sure to <a ui-sref=\"including-assets\">include the appropriate assets in your app</a>.</p>\n\n\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">JS Usage</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Spinner API</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><strong><code>all</code></strong>: Access all spinner instances, grouped by ID.</li>\n\t\t\t<li><strong><code>Spinner.create(element, options)</code></strong>: Create a spinner instance.</li>\n\t\t\t<li><strong><code>Spinner.toggle(id)</code></strong>: Toggle a spinner instance.</li>\n\t\t\t<li><strong><code>Spinner.load(id)</code></strong>: Load / activate a spinner instance.</li>\n\t\t\t<li><strong><code>Spinner.unload(id)</code></strong>: Unload / deactivate a spinner instance.</li>\n\t\t\t<li><strong><code>Spinner.destroy(id)</code></strong>: Destroy a spinner instance.</li>\n\t\t</ul>\n\t\t<p><em>Note: Each method returns the spinner instance, except the <code>destroy</code> method, which returns a Boolean.</em></p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Spinner instance</h3>\n\t\t<p>Most of the same methods can be called on a spinner instance without knowing its ID.</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><strong><code>instance.toggle()</code></strong>: Toggle a spinner instance.</li>\n\t\t\t<li><strong><code>instance.load()</code></strong>: Load / activate a spinner instance.</li>\n\t\t\t<li><strong><code>instance.unload()</code></strong>: Unload / deactivate a spinner instance.</li>\n\t\t\t<li><strong><code>instance.destroy()</code></strong>: Destroy a spinner instance.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">AngularJS</h3>\n\t\t<p>The AngularJS <code>SpinnerService</code> is a thin AngularJS wrapper around the vanilla core Spinner service, with the following directives added for convenience in interacting with Spinner:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><strong><code>&lt;spinner options=\"{...}\"&gt;</code></strong>: Create a spinner element in the DOM.</li>\n\t\t\t<li><strong><code>[spinner-toggle=\"{{id}}\"]</code></strong>: Toggle the spinner that matches <code>id</code>.</li>\n\t\t</ul>\n\n\t\t<h2 class=\"font__title2\">CSS Usage</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Classes and selectors</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>.spinner</code>: Spinner base class. <em>Nothing will be displayed in the UI until the active modifier class is added.</em></li>\n\t\t\t<li><code>.spinner--is-spinning</code>: Active / spinning spinner.</li>\n\t\t\t<li><code>.spinner--inline</code>: Inline spinner, for display with surrounding inline elements such as text or buttons.</li>\n\t\t\t<li><code>.spinner--clean</code>: Cleans / removes background and padding for a clean spinner UI.</li>\n\t\t\t<li><code>.spinner--absolute</code>: Absolutely positioned spinner.</li>\n\t\t\t<li><code>.spinner--slide</code> Spinner which slides from the top of an element.</li>\n\t\t</ul>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2\">Examples</h2>\n\t\t<h3 class=\"font__title3 heading__separator\">Active Spinner</h3>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;spinner options=\"{mods: ['active']}\">&lt;/spinner></brik-code lang=\"html\">\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Toggling a Spinner</h3>\n\t\t<p>Use the <code>ng-class</code> directive to activate and deactivate a spinner.</p>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div data-ng-init=\"toggleableActive = true;\">\n\t&lt;spinner options=\"{mods: ['active']}\" data-ng-class=\"{'spinner--is-spinning': toggleableActive}\">&lt;/spinner>\n\t&lt;button class=\"font__button\" type=\"button\" data-ng-click=\"toggleableActive = !toggleableActive\">Toggle&lt;/button>\n&lt;/div></brik-code lang=\"html\">\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Inline Spinner</h3>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;button class=\"font__button my-inline-spinner\" type=\"button\" data-ng-click=\"inlineActive = !inlineActive\" data-ng-init=\"inlineActive = true\">\n\tInline Spinner\n\t&lt;spinner options=\"{mods: ['active', 'inline']}\" style=\"margin-left: 1rem;\" data-ng-class=\"{'spinner--is-spinning':  inlineActive}\">&lt;/spinner>\n&lt;/button>\n&lt;p>(Click to toggle spinner)&lt;/p></brik-code lang=\"html\">\n\t\t\t<brik-code lang=\"css\">.my-inline-spinner {\n\tbackground-color: hsla(0, 0%, 0%, 0.1);\n\tdisplay: inline-flex;\n\talign-items: center;\n\tpadding: 1rem 2rem;\n}\n\n.my-inline-spinner .spinner {\n\tmargin-left: 1rem;\n}</brik-code lang=\"html\">\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

	var iconsPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Icons</h2>\n\t\t<p>Icons communicate something without text.</p>\n\t</div>\n\n\t\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<p class=\"font__subheading\">We are working on this page.</p>\n\t</div>\n\n\t<div>\n\t\t\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n\n<brik-code lang=\"bash\">npm install @brikcss/icons --save-dev</brik-code>\n\n\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\t\t<p><code>&lt;icon/&gt;</code> is a <a ui-sref=\"web-components\">Custom Element</a> with the following API:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>name</code>: Gets or sets the icon name, which should be the path of the icon SVG file, relative to <code>../svg/</code>, which is where the SVG icon files should reside.</li>\n\t\t\t<li><code>size</code>: Gets or sets the size of the icon.</li>\n\t\t</ul>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Examples</h2>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;brik-icon name=\"twitter\">&lt;/brik-icon>\n&lt;brik-icon name=\"facebook\" size=\"8rem\">&lt;/brik-icon>\n&lt;brik-icon name=\"google\">&lt;/brik-icon>\n&lt;brik-icon name=\"instagram\">&lt;/brik-icon></brik-code>\n&lt;brik-icon name=\"linkedin\">&lt;/brik-icon></brik-code>\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

	/** ================================================================================================
	 *  Dependencies
	 ** ------------ */

	/** ================================================================================================
	 *  Routes
	 ** ------ */

	var routes = [{
		name: 'home',
		label: 'Home',
		path: '/',
		icon: 'home',
		render: app => app.content.render(homePage),
		data: {
			pageTitle: 'DS UI Library'
		}
	}, {
		name: '404',
		label: 'Error',
		path: '/error',
		hide: true,
		render: app => app.content.render('<h2 class="font__title2 mt-0">Uh oh... we couldn\'t find that page!</h2><p class="font__subtitle">Wanna try again?</p>')
	}, {
		name: 'getting-started',
		label: 'Get Started',
		path: '/getting-started',
		icon: 'clock-start',
		render: app => app.content.render(getStartedPage)
	}, {
		name: 'learn',
		label: 'Learn',
		path: '/learn',
		icon: 'school',
		children: [{
			name: 'npm',
			label: 'Working with NPM',
			path: '/working-with-npm',
			render: app => app.content.render(workingWithNpmPage)
		}, {
			name: 'monolith-to-micro',
			label: 'From Monolith to Micro',
			path: '/monolith-to-micro',
			render: app => app.content.render(monolithToMicroPage)
		}, {
			name: 'custom-element',
			label: 'Creating a custom element',
			path: '/creating-a-custom-element',
			render: app => app.content.render(customElementPage)
			// {
			// 	name: 'structure',
			// 	label: 'Package Structure',
			// 	path: '/package-structure',
			// 	render: (app) => app.content.render(packageStructurePage)
			// },
			// {
			// 	name: 'assets',
			// 	label: 'Including assets',
			// 	path: '/including-assets',
			// 	render: (app) => app.content.render(includingAssetsPage)
			// }
		}]
	}, {
		name: 'core',
		label: 'Core',
		path: '/core',
		icon: 'atom',
		children: [{
			name: 'reset',
			label: 'Browser Reset',
			path: '/browser-reset',
			render: app => app.content.render(browserResetPage, '0')
		}, {
			name: 'typography',
			label: 'Typography',
			path: '/typography',
			render: app => app.content.render(typographyPage, '0')
		}, {
			name: 'colors',
			label: 'Colors',
			path: '/colors',
			render: app => app.content.render(colorsPage, '0')
		}, {
			name: 'rhythm',
			label: 'Rhythm & Spacing',
			path: '/rhythm',
			render: app => app.content.render(rhythmPage, '0')
		}]
	}, {
		name: 'components',
		label: 'Components',
		path: '/components',
		icon: 'widgets',
		children: [{
			name: 'spinner',
			label: 'Spinner',
			path: '/spinner',
			render: app => app.content.render(spinnerPage, '0')
		}, {
			name: 'icons',
			label: 'Icons',
			path: '/icons',
			render: app => app.content.render(iconsPage, '0')
		}]
	}, {
		name: 'patterns',
		label: 'Patterns',
		path: '/patterns',
		icon: 'matrix'
	}];

	/** ------------------------------------------------------------------------------------------------
	 *  @filename  app.js
	 *  @author  brikcss  <https://github.com/brikcss>
	 *  @description  App entry for the vanillajs site.
	 *  @tutorial  There are a few ways to import and define a Custom Element. Each module exports two
	 *      methods, init(config) and define(tag, config). The init method configures the Custom Element
	 *      and returns a configured class. The default export simply runs the init method with the
	 *      default configuration. The define method calls the init method and then defines the Custom
	 *      Element. This means you can import the module any of the following ways:
	 *
	 *      ```js
	 *      // 1. Default export (custom config, auto definition):
	 *  	import * as element from './element.js';
	 *  	element.define({...});
	 *  	// OR:
	 *  	import {define as element} from './element.js';
	 *  	element({...});
	 *
	 *  	// 2. Config method (custom config, manual definition):
	 *  	import {config as element} from './element.js';
	 *  	customElements.define(<tag name>, element({...}));
	 *
	 *  	// 3. Default export (default config, manual definition):
	 *      import element from './element.js';
	 *      customElements.define(<tag name>, element);
	 *  	```
	 *  @note  Polyfills needed:
	 *         	- Custom Elements
	 *         	- Shadow DOM
	 *         	- Templates / slots
	 *         	- Fetch
	 *         	- Promise??
	 *         	- Proxy object (https://github.com/tvcutsem/harmony-reflect)
	 *         	- ES6 (Class?)
	 ** --------------------------------------------------------------------------------------------- */

	/** ================================================================================================
	 *  Global configuration
	 ** -------------------- */

	window.brikcss = window.brikcss || {};

	/** ================================================================================================
	 *  Set up app
	 ** ---------- */

	const app = {
		page: document.querySelector('brik-page'),
		header: document.querySelector('brik-header'),
		supernav: document.querySelector('brik-supernav'),
		leftbar: document.querySelector('brik-sidebar[side="left"]'),
		rightbar: document.querySelector('brik-sidebar[side="right"]'),
		rightSidebarToggle: document.querySelector('.toggle__right'),
		content: document.querySelector('brik-content')
	};

	/** ================================================================================================
	 *  Router
	 ** ------ */

	app.router = createRouter(routes, {
		// allowNotFound: true,
		// autoCleanUp: true,
		defaultRoute: '404',
		// defaultParams: {},
		queryParams: {
			arrayFormat: 'default',
			nullFormat: 'default',
			booleanFormat: 'default'
		},
		queryParamsMode: 'default',
		trailingSlashMode: 'default',
		strictTrailingSlash: false,
		caseSensitive: true
	});
	app.router.usePlugin(browserPlugin({
		useHash: true,
		hashPrefix: '!',
		// base:
		preserveHash: true,
		mergeState: false
	})).usePlugin(listenersPlugin()).start();

	routes.forEach(route => {
		// Add route listener for root routes, node listener for route that has children.
		let listenerType = 'addRouteListener';
		if (route.children) listenerType = 'addNodeListener';
		app.router[listenerType](route.name, (toState, fromState) => {
			renderRoute(route, toState, fromState);
		});
		// Add route listener for each child route.
		(route.children || []).forEach(child => {
			app.router.addRouteListener([route.name, child.name].join('.'), (toState, fromState) => {
				child.parent = route;
				renderRoute(child, toState, fromState);
			});
		});
	});

	function renderRoute(route, toState, fromState) {
		// Close sidebars.
		Object.keys(window.brikcss.sidebars).forEach(group => {
			if (window.brikcss.sidebars[group].active) {
				window.brikcss.sidebars[group].active.active = false;
			}
		});
		// Update header.
		app.header.title = `${route.parent ? (route.parent.title || route.parent.label) + ' <brik-icon name="chevron-right" size="1.2em" fill="hsl(0, 0%, 100%)"></brik-icon> ' : ''}${route.title || route.label || 'Unknown'}`;
		// Render route.
		if (typeof route.render === 'function') route.render(app, toState, fromState);
	}

	/** ================================================================================================
	 *  Define custom elements
	 ** ---------------------- */

	Page.define();
	Viewport.define();
	Content.define();
	Overlay.define();
	Sidebar.define();
	Supernav.define();
	Scroller.define();
	Tabs.define();
	Editor.define();
	Code.define();
	Icon.define({ size: '4rem' });
	BurgerButton.define();
	Header.define();

	/** ================================================================================================
	 *  Build supernav links
	 ** -------------------- */

	app.supernav.props.links = routes.filter(route => !route.hide);
	app.supernav.render();

	/** ================================================================================================
	 *  Temporary
	 ** --------- */

	// Add temporary right sidebar toggle.
	document.querySelectorAll('.toggle__right').forEach(element => {
		element.addEventListener('click', () => {
			app.rightbar.active = !app.rightbar.active;
		});
	});

	// Render initial state.
	const initialRoute = findRoute(routes, app.router.getState().name);
	if (initialRoute.render) renderRoute(initialRoute);

	function findRoute(routesArray, name) {
		let result;
		routesArray.find(route => {
			if (route.name === name) {
				result = route;
				return true;
			}
			if (name.includes('.') && name.split('.')[0] === route.name && route.children) {
				return route.children.find(child => {
					result = child;
					result.parent = route;
					return child.name === name.split('.')[1];
				});
			}
		});
		return result || routesArray[0];
	}

}());
