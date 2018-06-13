(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
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
	let Event = G.Event;
	try {
	  new Event('Event');
	} catch(o_O) {
	  Event = function (type) {
	    const e = document.createEvent('Event');
	    e.initEvent(type, false, false);
	    return e;
	  };
	}

	// used to store template literals
	/* istanbul ignore next */
	const Map = G.Map || function Map() {
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
	    const info = new Map;
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
	const cloneNode = hasDoomedCloneNode ?
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
	      clone.appendChild(cloneNode(childNodes[i]));
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
	const importNode = hasImportNode ?
	  (doc$$1, node) => doc$$1.importNode(node, true) :
	  (doc$$1, node) => cloneNode(node);

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
	}

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
	        updates.push(setAttribute(node, info.name, info.node));
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
	const setAttribute = (node, name, original) => {
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
	    const event = new Event(type);
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
	const templates = WeakMap === G.WeakMap ? new WeakMap : new Map;

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
	  const fragment = importNode(this.ownerDocument, info.fragment);
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
	  content(type || 'html') :
	  weakly(obj, type || 'html');

	// A wire content is a virtual reference to one or more nodes.
	// It's represented by either a DOM node, or an Array.
	// In both cases, the wire content role is to simply update
	// all nodes through the list of related callbacks.
	// In few words, a wire content is like an invisible parent node
	// in charge of updating its content like a bound element would do.
	const content = type => {
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
	  return wire[id] || (wire[id] = content(type));
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
	setup(content);

	// by default, hyperHTML is a smart function
	// that "magically" understands what's the best
	// thing to do with passed arguments
	function hyper(HTML) {
	  return arguments.length < 2 ?
	    (HTML == null ?
	      content('html') :
	      (typeof HTML === 'string' ?
	        hyper.wire(null, HTML) :
	        ('raw' in HTML ?
	          content('html')(HTML) :
	          ('nodeType' in HTML ?
	            hyper.bind(HTML) :
	            weakly(HTML, 'html')
	          )
	        )
	      )) :
	    ('raw' in HTML ?
	      content('html') : hyper.wire
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
						if (oldValue !== value) {
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

	var tpl = (render, context = {}, hyperhtml = {}, _ = {}) => render`<slot></slot>

<brik-page-overlay class="brik-page__overlay" onclick="${context.handleOverlayClick}"></brik-page-overlay>

<style type="text/css">${context.props.css}</style>
`;

	class Page extends BrikElement {
		static get defaults() {
			return {
				activeSidebar: ''
			};
		}

		// Create the Custom Element.
		created() {
			if (!document.querySelector('brik-page')) {
				throw new Error('Only one <brik-page/> element allowed on a page.');
			}
			this.attachShadow({ mode: 'open' });
			this.render();
			// Create empty cache for sidebars. Sidebars will populate these as they are created.
			// @todo  Is there a better way to have the page cache sidebars itself? The problem is light DOM props are not available yet (on child sidebars).
			this.$ = {
				overlay: this.shadowRoot.querySelector('.brik-page__overlay'),
				sidebars: {}
			};
			Array.from(this.children).forEach(element => {
				if (element.tagName === 'BRIK-SIDEBAR') {
					this.$.sidebars[element.getAttribute('side')] = element;
				}
			});
			this.addEventListener('sidebars.toggle', this.toggleSidebar);
		}

		connectedCallback() {
			// setTimeout(() => {
			// 	this.toggleSidebar('right');
			// }, 1000);
			// setTimeout(() => {
			// 	this.toggleSidebar('');
			// }, 2000);
			// setTimeout(() => {
			// 	this.toggleSidebar('left');
			// }, 3000);
			// setTimeout(() => {
			// 	this.toggleSidebar('');
			// }, 4000);
		}

		disconnectedCallback() {
			this.removeEventListener('sidebars.toggle', this.toggleSidebar);
			this.$.overlay.removeEventListener('click', this.handleOverlayClick);
		}

		attributeChangedCallback(prop, oldValue, value) {
			const falsy = ['', null];
			if (oldValue === value || falsy.indexOf(oldValue) > -1 && falsy.indexOf(value) > -1) return;
			if (prop === 'activeSidebar') {
				this.dispatchEvent(new CustomEvent('on.sidebar-toggle', {
					detail: this.props.activeSidebar,
					composed: true,
					bubbles: true
				}));
			}
		}

		handleOverlayClick() {
			this.toggleSidebar('');
		}

		toggleSidebar(side) {
			// Side can come from event.detail or be passed explicitly as a string.
			side = typeof side === 'object' ? event.detail : side === undefined ? this.activeSidebar : side;
			// If side is already '', don't do anything.
			if (side === '' && this.activeSidebar === '') return;
			// Get values.
			const windowWidth = window.innerWidth;
			const sidebar = this.$.sidebars[side];
			const isPinned = sidebar && sidebar.pinAt && parseInt(sidebar.pinAt, 10) <= windowWidth;
			const isMini = sidebar && sidebar.miniAt && parseInt(sidebar.miniAt, 10) <= windowWidth;
			// Don't do anything if the sidebar is pinned.
			if (isPinned || isMini) {
				return;
			}
			// Otherwise set the active sidebar prop.
			this.activeSidebar = this.activeSidebar === side ? '' : side;
			if (this.activeSidebar === '') this.removeAttribute('active-sidebar');
		}

		// Render the DOM with hyperhtml, a native approach to virtual DOM which efficiently renders
		// nodes, data or attributes that change. See
		// https://viperhtml.js.org/hyperhtml/documentation/.
		render() {
			this.props.css = `:host {
			--sidebar-bg: hsl(0, 0%, 100%);
			--sidebar-width: 35rem;
			--sidebar-mini-width: 12rem;
			--sidebar-push-content: 0;
			--sidebar-left-bg: var(--sidebar-bg);
			--sidebar-left-width: var(--sidebar-width);
			--sidebar-left-push: var(--sidebar-push-content);
			--sidebar-right-bg: var(--sidebar-bg);
			--sidebar-right-width: var(--sidebar-width);
			--sidebar-right-push: var(--sidebar-push-content);
			display: flex;
			height: 100vh;
			width: 100vw;
			overflow: hidden;
		}`;
			return tpl(BrikElement.bind(this.shadowRoot), this);
		}
	}

	class PageViewport extends BrikElement {
		static get defaults() {
			return {
				width: '100%'
			};
		}

		created() {
			this.attachShadow({ mode: 'open' });
			this.render();
		}

		attributeChangedCallback() {
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			let css = `:host {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 100vh;
			width: ${this.props.width};
			transform: translate3d(0, 0, 0);
			transition: transform 350ms cubic-bezier(0.6, 0, 0.2, 1.2);
		}

		:host-context([active-sidebar='left']) {
			transform: translate3d(var(--sidebar-left-push), 0, 0);
		}

		:host-context([active-sidebar='right']) {
			transform: translate3d(calc(-1 * var(--sidebar-right-push)), 0, 0);
		}`;

			return this.html`<slot></slot><style>${css}</style>`;
		}
	}

	class PageContent extends BrikElement {
		created() {
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render(content = '', padding = '4rem') {
			let css = `brik-page-content {
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
			padding: ${padding};
		}`;
			this.props.content = content;
			return this.html`${[content]}<style>${css}</style>`;
		}
	}

	class PageOverlay extends BrikElement {
		// Sets default props and observedAttributes.
		static get defaults() {
			return {
				active: false
			};
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
			this.props.css = `:host {
			background-color: transparent;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;
			transition: background-color 350ms, z-index 0ms 350ms;
		}
		:host-context([active-sidebar="left"]),
		:host-context([active-sidebar="right"]) {
			background-color: hsla(0, 0%, 0%, 0.5);
			z-index: 9;
			transition: background-color 350ms, z-index 0ms 0ms;
		}`;
			return this.html`<slot></slot><style>${this.props.css}</style>`;
		}
	}

	class Sidebar extends BrikElement {
		static get defaults() {
			return {
				pinAt: '',
				miniAt: ''
			};
		}

		// Element constructor.
		created() {
			this.props.side = this.getAttribute('side');
			this.attachShadow({ mode: 'open' });
			this.classList.add('brik-sidebar', 'brik-sidebar__' + this.props.side);
			this.$ = {
				page: this.parentNode
			};
			if (this.tagName !== 'BRIK-SIDEBAR') {
				this.$.page.$.sidebars[this.props.side] = this;
			}
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			let css = `:host {
			background-color: var(--sidebar-${this.props.side}-bg);
			height: 100vh;
			width: var(--sidebar-${this.props.side}-width);
			min-width: var(--sidebar-${this.props.side}-width);
			margin-${this.props.side}: calc(-1 * var(--sidebar-${this.props.side}-width));
			position: relative;
			will-change: transform, box-shadow;
			transform: translate3d(0, 0, 0);
			transition-property: transform, box-shadow;
			transition-duration: 350ms;
			transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);
			z-index: 10;
		}

		:host:before {
			content: '';
			background-color: inherit;
			position: absolute;
			top: 0;
			bottom: 0;
			${this.props.side}: -40px;
			/* stylelint-disable-next-line declaration-property-unit-whitelist */
			width: 40px;
		}

		:host-context([active-sidebar='${this.props.side}']) {
			box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
			transform: translate3d(${this.props.side === 'right' ? 'calc(-1 * var(--sidebar-right-width))' : 'var(--sidebar-left-width)'}, 0, 0);
		}

		:host-context([active-sidebar='${this.props.side === 'left' ? 'right' : 'left'}']) {
			transform: translate3d(${this.props.side === 'left' ? 'calc(-1 * var(--sidebar-left-push))' : 'var(--sidebar-right-push)'}, 0, 0);
		}`;
			if (this.props.miniAt) {
				css += `@media (min-width: ${this.props.miniAt}) {
				:host {
					width: var(--sidebar-mini-width);
					min-width: var(--sidebar-mini-width);
					box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
					margin-${this.props.side}: 0;
					z-index: 1;
				}
				:host-context([active-sidebar]) {
					box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.18), 0 6px 9px 0 rgba(0, 0, 0, 0.13), 0 3px 11px 1px rgba(0, 0, 0, 0.11);
				}
				:host-context([active-sidebar='${this.props.side}']) {
					transform: none;
				}
			}`;
			}
			if (this.props.pinAt) {
				css += `@media (min-width: ${this.props.pinAt}) {
				:host {
					box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.12);
					width: var(--sidebar-${this.props.side}-width);
					min-width: var(--sidebar-${this.props.side}-width);
					margin-${this.props.side}: 0;
					z-index: 1;
				}
				:host-context([active-sidebar='${this.props.side}']) {
					transform: none;
				}
				:host-context([active-sidebar]) {
				}
			}`;
			}
			return this.html`<slot></slot><style>${css}</style>`;
		}
	}

	var tpl$1 = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="${`brik-supernav__scroller ${context.props.showMenus && 'brik-supernav--show-menus'}`}" onmouseenter="${() => {context.classList.remove('brik--menu-is-inactive');}}">
	<!-- Profile header. -->
	<div class="brik-supernav__header" style="${{backgroundImage: `url(${context.props.headerBackground})`}}">
		<div class="brik-supernav__toolbar">
			<button type="button" class="brik-supernav__close-button" onclick="${context.handleClose}" tabindex="${context.props.active ? 0 : -1}">
				<brik-icon name="close"></brik-icon>
			</button>
		</div>
		<slot name="header">
			<img class="brik-supernav__avatar" src="assets/images/avatar.jpg" alt="User photo." />
			<h2 class="brik-supernav__user-name">${context.props.user.name}</h2>
			<div class="brik-supernav__user-id">ID: ${context.props.user.id}</div>
		</slot>
	</div>

	<!-- Links and menus. -->
	<nav class="${`brik-supernav__nav ${context.props.active ? 'brik-supernav--active' : ''}`}">
		${context.props.links.filter(link => !link.hide).map((link, i) => hyperhtml.wire(link, ':link')`<div class="${`brik-supernav__item ${link.active ? 'brik--menu-is-active' : ''}`}" style="${`height: ${link.children && link.active && !context.props.isMini ? `${(link.children.length + 1) * 6}rem;` : ''}`}">
			${link.children ? hyperhtml.wire(link, ':link-without-path')`<button type="button" class="${link.separator ? 'brik-supernav__link brik-supernav__link-separator' : 'brik-supernav__link'}" onclick="${() => {
				if ((context.props.showMenus && context.props.isPinned) || context.props.isMini) return;
				const lastActiveLink = context.props.links.find((link, n) => n !== i && link.active);
				if (lastActiveLink) lastActiveLink.active = false;
				link.active = !link.active;
				context.render();
			}}" onfocus="${() => {link.focused = true;}}" onblur="${() => {link.focused = false;}}" tabindex="${(context.props.state === 'default' && context.props.active) || (context.props.isPinned && !context.props.showMenus) ? 0 : -1}">
				<brik-icon class="brik-supernav__link-icon" name="${link.icon}" size="3rem"></brik-icon>
				<span class="brik-supernav__link-label">${link.label}</span>
				${link.children ? hyperhtml.wire(link, ':link-no-path-button')`<brik-icon class="brik-supernav__menu-icon" name="chevron-down"></brik-icon>` : ''}
			</button>` : hyperhtml.wire(link, ':link-with-path')`<a class="${link.separator ? 'brik-supernav__link brik-supernav__link-separator' : 'brik-supernav__link'}" href="${context.props.linkPrefix + link.path}" tabindex="${context.props.active ? 0 : -1}">
				<brik-icon class="brik-supernav__link-icon" name="${link.icon}" size="3rem"></brik-icon>
				<span class="brik-supernav__link-label">${link.label}</span>
				${link.children ? hyperhtml.wire(link, ':link-path-button')`<brik-icon class="brik-supernav__menu-icon" name="chevron-down"></brik-icon>` : ''}
			</a>`}
			${link.children ? context.test = hyperhtml.wire(link, ':menu')`<div class="brik-supernav__menu">
				<div class="brik-supernav__menu-title">${link.label}</div>
				${link.children.map((sublink, i) => hyperhtml.wire(sublink)`<a class="${`brik-supernav__menu-link ${sublink.active ? 'brik--menu-link-is-active' : ''}`}" href="${context.props.linkPrefix + [link.path, sublink.path].join('')}" onfocus="${() => {link.focused = true; if (!context.props.isMini) {return;} link.active = true; context.render();}}" onclick="${(event) => {
					if (context.props.activeMenuLink) context.props.activeMenuLink.active = false;
					sublink.active = true;
					context.props.activeMenuLink = sublink;
					if (context.props.isMini) {
						context.classList.add('brik--menu-is-inactive');
						link.focused = false;
						event.target.blur();
						context.$.page.click();
					}
					context.render();
				}}" onblur="${() => {link.focused = false; if (!context.props.isMini) {return;} link.active = false; context.render();}}" tabindex="${context.props.active && (context.props.isMini || link.active) ? 0 : -1}"> ${sublink.label} </a>`)}
			</div>` : ''}
		</div>`)}
	</nav>
</div>

<a class="brik-supernav__logo-link" href="${context.props.homePath}" tabindex="-1">
	<slot name="logo"><img src="assets/images/logo__directscale.png" /></slot>
</a>

<style>${context.props.css}</style>
`;

	var css = "/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n:host {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.brik-supernav__scroller {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n\toverflow-y: auto;\n}\n\n.brik-supernav__header {\n\tbackground-color: var(--color__brand4);\n\tbackground-repeat: no-repeat;\n\tbackground-position: left top;\n\tcolor: var(--color__light);\n\tmin-height: 14rem;\n\tpadding: 2rem 2rem 1rem;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n\t-webkit-box-pack: end;\n\t    -ms-flex-pack: end;\n\t        justify-content: flex-end;\n}\n\n.brik-supernav__toolbar {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: end;\n\t    -ms-flex-pack: end;\n\t        justify-content: flex-end;\n}\n\n.brik-supernav__close-button {\n\tbackground-color: transparent;\n\tborder: 0;\n\tdisplay: block;\n\tfill: var(--color__light);\n\tpadding: 0;\n}\n\n/* stylelint-disable-next-line selector-max-type */\n\n.brik-supernav__close-button brik-icon {\n\tfill: inherit;\n}\n\n.brik-supernav__avatar {\n\tborder-radius: 50%;\n\theight: 8rem;\n\twidth: 8rem;\n\tmargin-top: -2rem;\n}\n\n.brik-supernav__user-name {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n\tmargin: 0.5rem 0 0;\n}\n\n.brik-supernav__logo-link {\n\tbackground-color: var(--color__supernav);\n\tcolor: hsl(0, 0%, 100%);\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n\theight: 6rem;\n\toutline: 0;\n}\n\n/* stylelint-disable-next-line selector-max-type */\n\n.brik-supernav__logo-link img {\n\tmax-height: 5rem;\n\tmax-width: 90%;\n}\n\n.brik-supernav__nav {\n\t-webkit-box-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n}\n\n.brik-supernav__item {\n\theight: 6rem;\n\twill-change: height;\n\t-webkit-transition: height 300ms cubic-bezier(0.6, 0, 0.2, 1.1);\n\ttransition: height 300ms cubic-bezier(0.6, 0, 0.2, 1.1);\n\toverflow: hidden;\n\tposition: relative;\n}\n\n.brik-supernav--show-menus .brik-supernav__item {\n\theight: auto;\n}\n\n.brik-supernav__link,\n.brik-supernav__menu-link {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.03571rem;\n\tfont-weight: 400;\n\tbackground-color: transparent;\n\tborder: 0;\n\tcolor: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n\ttext-decoration: none;\n\tcursor: pointer;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tpadding: 0;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\theight: 6rem;\n\toutline: 0;\n}\n\n.brik-supernav__link {\n\tposition: relative;\n\twidth: 100%;\n\t-webkit-transition: background-color 250ms;\n\ttransition: background-color 250ms;\n}\n\n.brik-supernav__link-separator {\n\t/* stylelint-disable-next-line declaration-property-unit-blacklist */\n\theight: calc(6rem - 0.125rem);\n\tborder-top: 0.125rem solid var(--color__dark4);\n}\n\n.brik-supernav__link-icon {\n\tfill: var(--color__brand1);\n\theight: 3rem;\n\twidth: 3rem;\n\tmargin-left: 2rem;\n\tmargin-right: 2.5rem;\n}\n\n.brik-supernav__menu-link {\n\tbackground-color: var(--color__dark4);\n\tpadding-left: 7.5rem;\n\t-webkit-transition: color 250ms, background-color 250ms;\n\ttransition: color 250ms, background-color 250ms;\n}\n\n.brik-supernav--show-menus .brik-supernav__menu-link {\n\tbackground-color: transparent;\n}\n\n/* stylelint-disable no-descending-specificity */\n\n.brik-supernav__link:hover,\n.brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\tbackground-color: hsla(0, 0%, 0%, 0.08);\n}\n\n.brik--menu-is-active .brik-supernav__link:hover {\n\tbackground-color: var(--color__dark4);\n}\n\n.brik-supernav__link:focus,\n.brik-supernav__menu-link:focus,\n.brik--menu-is-active .brik-supernav__link:focus,\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus {\n\tbackground-color: hsla(0, 0%, 0%, 0.16);\n}\n\n.brik-supernav__menu-link:hover,\n.brik-supernav__menu-link:focus {\n\tcolor: hsl(0, 0%, 0%);\n}\n\n.brik--menu-link-is-active {\n\tfont-weight: 500;\n}\n\n.brik-supernav__menu-icon {\n\theight: 2.5rem;\n\twidth: 2.5rem;\n\tposition: absolute;\n\tright: 2rem;\n\ttop: calc(50% - 1.25rem);\n\twill-change: transform;\n\t-webkit-transition: -webkit-transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3);\n\ttransition: -webkit-transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3);\n\ttransition: transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3);\n\ttransition: transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3), -webkit-transform 250ms cubic-bezier(0.6, 0, 0.2, 1.3);\n}\n\n.brik--menu-is-active .brik-supernav__menu-icon {\n\t-webkit-transform: rotate(180deg);\n\t        transform: rotate(180deg);\n}\n\n.brik-supernav--show-menus .brik-supernav__menu-icon {\n\tdisplay: none;\n}\n\n.brik-supernav__menu-title {\n\tdisplay: none;\n}\n\n/** ================================================================================================\n *  Dark theme.\n ** ----------- */\n\n/* stylelint-disable no-duplicate-selectors */\n\n:host {\n\tbackground-color: var(--color__supernav);\n\tcolor: var(--color__light);\n}\n\n.brik-supernav__link {\n\tcolor: var(--color__light2);\n\tfill: var(--color__supernav--icon);\n}\n\n.brik-supernav__menu-link,\n.brik-supernav__menu-title {\n\tcolor: var(--color__light);\n}\n\n.brik-supernav__link-icon,\n.brik-supernav__menu-icon {\n\tfill: var(--supernav__icon);\n}\n\n/** ================================================================================================\n *  Hover, focus, active states\n ** --------------------------- */\n\n.brik-supernav__link,\n.brik--menu-is-active .brik-supernav__link,\n.brik-supernav__menu-link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\t-webkit-transition: background-color 250ms, color 250ms, fill 250ms;\n\ttransition: background-color 250ms, color 250ms, fill 250ms;\n}\n\n.brik-supernav__link:hover,\n.brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\tbackground-color: hsla(0, 0%, 0%, 0.16);\n}\n\n.brik-supernav__link:focus,\n.brik-supernav__menu-link:focus,\n.brik--menu-is-active .brik-supernav__link:focus,\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus {\n\tbackground-color: hsla(0, 0%, 0%, 0.24);\n}\n\n.brik-supernav__link:hover,\n.brik-supernav__link:focus,\n.brik--menu-is-active .brik-supernav__link,\n.brik--menu-is-active .brik-supernav__link:focus,\n.brik-supernav__item:hover .brik-supernav__link,\n.brik-supernav__item:focus .brik-supernav__link {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n\tfill: var(--color__light);\n}\n\n.brik-supernav__menu-link:hover,\n.brik-supernav__menu-link:focus,\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n}\n\n/* stylelint-enable no-descending-specificity */\n\n.brik-supernav__link:before {\n\tcontent: '';\n\tdisplay: block;\n\tbackground-color: var(--color__brand3);\n\tposition: absolute;\n\tleft: -0.5rem;\n\ttop: calc(50% - 0.25rem);\n\twidth: 0.5rem;\n\theight: 0;\n\t-webkit-transition-property: left, top, height;\n\ttransition-property: left, top, height;\n\t-webkit-transition-duration: 300ms;\n\t        transition-duration: 300ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n\t        transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n.brik--menu-is-active .brik-supernav__link:before,\n.brik-supernav__link:hover:before,\n.brik-supernav__link:focus:before,\n.brik-supernav__item:hover .brik-supernav__link:before,\n.brik-supernav__item:focus .brik-supernav__link:before {\n\tleft: 0;\n\ttop: calc(50% - 3rem);\n\theight: 6rem;\n\t-webkit-transition-duration: 400ms, 300ms, 300ms;\n\t        transition-duration: 400ms, 300ms, 300ms;\n}\n";

	var css$1 = "/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n:host {\n\tbackground-color: var(--color__supernav);\n\tcolor: var(--color__light);\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: reverse;\n\t    -ms-flex-direction: column-reverse;\n\t        flex-direction: column-reverse;\n}\n\n.brik-supernav__header {\n\tdisplay: none;\n}\n\n.brik-supernav__item {\n\t/* stylelint-disable-next-line declaration-no-important */\n\theight: 9rem !important;\n\tposition: static;\n}\n\n.brik-supernav__link {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n\tcolor: var(--color__light2);\n\tfill: var(--color__supernav--icon);\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n\theight: 100%;\n\tposition: relative;\n\t-webkit-transition: color 350ms, background-color 350ms;\n\ttransition: color 350ms, background-color 350ms;\n}\n\n.brik-supernav__link-icon {\n\tfill: inherit;\n\theight: 4rem;\n\twidth: 4rem;\n\t-webkit-transition: fill 350ms;\n\ttransition: fill 350ms;\n}\n\n.brik-supernav__link-label {\n\tmargin-top: 0.5rem;\n}\n\n.brik-supernav__logo-link {\n\theight: 8rem;\n\t-webkit-transition: background-color 250ms;\n\ttransition: background-color 250ms;\n}\n\n.brik-supernav__menu-icon {\n\tdisplay: none;\n}\n\n.brik-supernav__menu {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n\tfill: var(--color__light);\n\theight: 100vh;\n\twidth: 30rem;\n\tpadding-left: 4rem;\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tz-index: -1;\n\twill-change: transform;\n\t-webkit-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n\t-webkit-transition-property: color, -webkit-transform, -webkit-box-shadow;\n\ttransition-property: color, -webkit-transform, -webkit-box-shadow;\n\ttransition-property: transform, box-shadow, color;\n\ttransition-property: transform, box-shadow, color, -webkit-transform, -webkit-box-shadow;\n\t-webkit-transition-duration: 350ms;\n\t        transition-duration: 350ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n\t        transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n.brik-supernav__menu-link,\n.brik-supernav__menu-title {\n\tcolor: var(--color__light);\n\tpadding-left: 2rem;\n}\n\n.brik-supernav__menu-title {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n\tfont-weight: 300;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\theight: 8rem;\n}\n\n.brik-supernav__menu-link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\tbackground-color: transparent;\n\t-webkit-box-pack: start;\n\t    -ms-flex-pack: start;\n\t        justify-content: flex-start;\n\t-webkit-transition: background-color 250ms;\n\ttransition: background-color 250ms;\n}\n\n.brik--menu-is-active .brik-supernav__menu,\n.brik-supernav__menu:hover,\n.brik-supernav__menu:focus,\n.brik-supernav__link:hover + .brik-supernav__menu,\n.brik-supernav__link:focus + .brik-supernav__menu,\n.brik-supernav__item:hover .brik-supernav__menu,\n.brik-supernav__item:focus .brik-supernav__menu {\n\t-webkit-box-shadow: 0 3rem 8rem hsla(0, 0%, 0%, 0.6);\n\t        box-shadow: 0 3rem 8rem hsla(0, 0%, 0%, 0.6);\n\t-webkit-transform: translate3d(30rem, 0, 0);\n\t        transform: translate3d(30rem, 0, 0);\n}\n\n:host-context(.brik--menu-is-inactive) .brik-supernav__menu,\n:host-context(.brik--menu-is-inactive) .brik-supernav__menu:hover,\n:host-context(.brik--menu-is-inactive) .brik-supernav__menu:focus,\n:host-context(.brik--menu-is-inactive) .brik-supernav__link:hover + .brik-supernav__menu,\n:host-context(.brik--menu-is-inactive) .brik-supernav__link:focus + .brik-supernav__menu,\n:host-context(.brik--menu-is-inactive) .brik-supernav__item:hover .brik-supernav__menu,\n:host-context(.brik--menu-is-inactive) .brik-supernav__item:focus .brik-supernav__menu {\n\t-webkit-box-shadow: none;\n\t        box-shadow: none;\n\t-webkit-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n}\n\n.brik-supernav__logo-link:hover,\n.brik-supernav__logo-link:focus {\n\tbackground-color: var(--color__supernav--dark);\n}\n\n.brik--menu-is-active .brik-supernav__link,\n.brik-supernav__link:hover,\n.brik-supernav__link:focus,\n.brik-supernav__item:hover .brik-supernav__link,\n.brik-supernav__item:focus .brik-supernav__link {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n\tfill: var(--color__light);\n}\n\n/* stylelint-disable no-descending-specificity */\n\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus,\n.brik-supernav__menu-link:hover,\n.brik-supernav__menu-link:focus {\n\tbackground-color: var(--color__brand3);\n\tcolor: var(--color__light);\n}\n\n.brik-supernav__link:before {\n\tcontent: '';\n\tdisplay: block;\n\tbackground-color: var(--color__brand3);\n\tposition: absolute;\n\tleft: -0.5rem;\n\ttop: calc(50% - 0.25rem);\n\twidth: 0.5rem;\n\theight: 0;\n\t-webkit-transition-property: left, top, height;\n\ttransition-property: left, top, height;\n\t-webkit-transition-duration: 300ms;\n\t        transition-duration: 300ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n\t        transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n.brik--menu-is-active .brik-supernav__link:before,\n.brik-supernav__link:hover:before,\n.brik-supernav__link:focus:before,\n.brik-supernav__item:hover .brik-supernav__link:before,\n.brik-supernav__item:focus .brik-supernav__link:before {\n\tleft: 0;\n\ttop: calc(50% - 4.5rem);\n\theight: 9rem;\n\t-webkit-transition-duration: 400ms, 300ms, 300ms;\n\t        transition-duration: 400ms, 300ms, 300ms;\n}\n";

	var css$2 = ":host {\n\tbackground-color: var(--color__supernav);\n\tcolor: var(--color__light);\n}\n\n.brik-supernav__close-button {\n\tdisplay: none;\n}\n\n.brik-supernav__link {\n\tcolor: var(--color__light2);\n\tfill: var(--color__supernav--icon);\n}\n\n.brik-supernav__menu-link,\n.brik-supernav__menu-title {\n\tcolor: var(--color__light);\n}\n\n.brik-supernav__link-icon,\n.brik-supernav__menu-icon {\n\tfill: var(--supernav__icon);\n}\n\n/** ================================================================================================\n *  Hover, focus, active states\n ** --------------------------- */\n\n.brik-supernav__link,\n.brik--menu-is-active .brik-supernav__link,\n.brik-supernav__menu-link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\t-webkit-transition: background-color 250ms, color 250ms, fill 250ms;\n\ttransition: background-color 250ms, color 250ms, fill 250ms;\n}\n\n.brik-supernav__link:hover,\n.brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__link,\n.brik--menu-is-active .brik-supernav__menu-link {\n\tbackground-color: hsla(0, 0%, 0%, 0.16);\n}\n\n.brik-supernav__link:focus,\n.brik-supernav__menu-link:focus,\n.brik--menu-is-active .brik-supernav__link:focus,\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus {\n\tbackground-color: hsla(0, 0%, 0%, 0.24);\n}\n\n/* stylelint-disable no-descending-specificity */\n\n.brik-supernav__link:hover,\n.brik-supernav__link:focus,\n.brik--menu-is-active .brik-supernav__link,\n.brik--menu-is-active .brik-supernav__link:focus,\n.brik-supernav__item:hover .brik-supernav__link,\n.brik-supernav__item:focus .brik-supernav__link {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n\tfill: var(--color__light);\n}\n\n.brik-supernav__menu-link:hover,\n.brik-supernav__menu-link:focus,\n.brik--menu-is-active .brik-supernav__menu-link:hover,\n.brik--menu-is-active .brik-supernav__menu-link:focus {\n\tbackground-color: var(--color__supernav--dark);\n\tcolor: var(--color__light);\n}\n\n/* stylelint-enable no-descending-specificity */\n\n.brik-supernav__link:before {\n\tcontent: '';\n\tdisplay: block;\n\tbackground-color: var(--color__brand3);\n\tposition: absolute;\n\tleft: -0.5rem;\n\ttop: calc(50% - 0.25rem);\n\twidth: 0.5rem;\n\theight: 0;\n\t-webkit-transition-property: left, top, height;\n\ttransition-property: left, top, height;\n\t-webkit-transition-duration: 300ms;\n\t        transition-duration: 300ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n\t        transition-timing-function: cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n.brik--menu-is-active .brik-supernav__link:before,\n.brik-supernav__link:hover:before,\n.brik-supernav__link:focus:before,\n.brik-supernav__item:hover .brik-supernav__link:before,\n.brik-supernav__item:focus .brik-supernav__link:before {\n\tleft: 0;\n\ttop: calc(50% - 3rem);\n\theight: 6rem;\n\t-webkit-transition-duration: 400ms, 300ms, 300ms;\n\t        transition-duration: 400ms, 300ms, 300ms;\n}\n";

	class SuperNav extends BrikElement {
		// Sets default props and observedAttributes.
		//
		// @param  {Boolean}  showMenus  Whether to permanently show supernav menus (false) or show them with a show/hide toggle.
		// @param  {String}  homePath  Path to home page.
		// @param  {String}  headerBackground  Path to header background-image.
		// @param  {Object}  user  User object to display in header, including user.name and user.id.
		// @param  {Objects Array}  links  Array of Objects which build the links and sublinks for the supernav.
		static get defaults() {
			return {
				showMenus: false,
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
				viewport: document.querySelector('brik-page-viewport'),
				nav: this.shadowRoot.querySelector('.brik-supernav__item')
			};
			const sidebar = this.$.sidebar;
			// Cache miniAt and pinAt min/max query values to create proper media queries.
			this.props.miniAt = {
				min: sidebar.miniAt ? parseInt(sidebar.miniAt, 10) : false,
				max: false
			};
			this.props.pinAt = {
				min: sidebar.pinAt ? parseInt(sidebar.pinAt, 10) : false,
				max: false
			};
			if (this.props.miniAt.min && this.props.pinAt.min > this.props.miniAt.min) {
				this.props.miniAt.max = this.props.pinAt.min - 1;
			}
			if (this.props.pinAt.min && this.props.miniAt.min > this.props.pinAt.min) {
				this.props.pinAt.max = this.props.miniAt.min - 1;
			}
			this.updateState();
			['miniAt', 'pinAt'].forEach(key => {
				const prop = this.props[key];
				prop.query = false;
				if (prop.min) {
					prop.query = `(min-width: ${prop.min}px)`;
					if (prop.max) {
						prop.query += ` and (max-width: ${prop.max}px)`;
					}
				}
			});
			// On window resize, if it's mini, remove any active state.
			window.addEventListener('resize', this.handleWindowResize);
			// Render it.
			this.render();
			this.$.page.addEventListener('on.sidebar-toggle', this.handleOnSidebarToggle);
		}

		// Clean up.
		disconnectedCallback() {
			window.removeEventListener('resize', this.handleWindowResize);
			this.$.page.removeEventListener('on.sidebar-toggle', this.handleOnSidebarToggle);
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.css = css;
			if (this.props.miniAt.query) {
				this.props.css += `@media ${this.props.miniAt.query} {${css$1}}`;
			}
			if (this.props.pinAt.query) {
				this.props.css += `@media ${this.props.pinAt.query} {${css$2}}`;
			}
			return tpl$1(this.html, this, { wire: BrikElement.wire });
		}

		buildLinks(links = []) {
			this.props.links = links;
			this.render();
		}

		updateState() {
			const wasMini = this.props.isMini;
			const wasPinned = this.props.isPinned;
			// isMini?
			if (this.props.miniAt.min) {
				const windowWidth = window.innerWidth;
				this.props.isMini = windowWidth >= this.props.miniAt.min && (this.props.miniAt.max === false || windowWidth <= this.props.miniAt.max);
			} else {
				this.props.isMini = false;
			}
			// isPinned?
			if (this.props.pinAt.min) {
				const windowWidth = window.innerWidth;
				this.props.isPinned = windowWidth >= this.props.pinAt.min && (this.props.pinAt.max === false || windowWidth <= this.props.pinAt.max);
			} else {
				this.props.isPinned = false;
			}
			// active?
			if (this.props.isMini || this.props.isPinned) {
				this.$.viewport.width = `calc(100% - var(--sidebar-${this.props.isMini ? 'mini' : 'pinned'}-width))`;
				this.props.active = true;
			} else if (wasMini && !this.props.isMini || wasPinned && !this.props.isPinned) {
				this.$.viewport.width = '100%';
				this.props.active = false;
			}
			// state?
			this.props.state = this.props.isPinned ? 'pinned' : this.props.isMini ? 'mini' : 'default';
			// If active menu does not have focus, close it.
			this.props.links.filter(link => link.active).map(link => {
				if (!link.focused || this.props.state === 'default') link.active = false;
				return link;
			});
		}

		handleOnSidebarToggle(event) {
			this.props.active = event.detail === 'left';
			if (this.props.active) {
				(this.$.activeLink || this.shadowRoot.querySelector('.brik-supernav__close-button')).focus();
			}
			this.render();
		}

		handleWindowResize() {
			if (this._resizeTimeout) {
				clearTimeout(this._resizeTimeout);
			}
			this._resizeTimeout = setTimeout(() => {
				const wasMini = this.props.isMini;
				this.updateState();
				if (this.props.isMini || this.props.isPinned) {
					this.$.page.toggleSidebar('');
				}
				if (this.props.isMini !== wasMini) {
					this.render();
				}
			}, 200);
		}

		handleClose() {
			this.$.page.toggleSidebar('');
		}
	}

	var tpl$2 = (render, context = {}, hyperhtml = {}, _ = {}) => render`${context.props.svg}
<style type="text/css">${context.props.css}</style>
`;

	class Icon extends BrikElement {
		// Sets default props and observedAttributes.
		static get defaults() {
			return {
				name: '',
				size: '2rem',
				svgDir: './svg/',
				fill: 'hsla(0, 0%, 0%, 0.54)',
				fillProp: '--icon-fill',
				stroke: 'transparent',
				strokeProp: '--icon-stroke'
			};
		}

		// Element constructor.
		created() {
			window.brikcss.icons = window.brikcss.icons || {};
			this.attachShadow({ mode: 'open' });
			this.props.name = this.getAttribute('name');
			this.render();
		}

		// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
		attributeChangedCallback(prop, oldValue, value) {
			if (prop === 'name' && value !== oldValue) this.updateSvg();
			if (!this._initialized) return;
			this.render();
		}

		updateSvg() {
			let cachedSvg = window.brikcss.icons[this.props.name];
			this.props.svg = {
				placeholder: '',
				html: typeof cachedSvg === 'string' ? cachedSvg : cachedSvg ? cachedSvg : cachedSvg = fetch(new Request(this.props.svgDir + this.props.name + '.svg', {
					method: 'GET',
					headers: new Headers({
						'Content-Type': 'text/plain'
					})
				})).then(result => {
					if (!result.ok) {
						return '';
					}
					return cachedSvg = result.text();
				})
			};

			return this.props.svg;
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.css = `:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: ${this.props.size};
			width: ${this.props.size};
			fill: var(${this.props.fillProp}, ${this.props.fill});
			stroke: var(${this.props.strokeProp}, ${this.props.stroke});
		}
		:host svg {
			height: 100%;
			width: 100%;
		}`;
			return tpl$2(BrikElement.bind(this.shadowRoot), this, BrikElement);
		}
	}

	var tpl$3 = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="brik-header__left">
	<brik-burger-button class="brik-burger" sidebar="left"></brik-burger-button>
	<div class="brik-header__title">${hyperhtml.wire()`${[context.props.title]}`}</div>
</div>

<div class="brik-header__center">
	<slot name="center"></slot>
</div>

<div class="brik-header__right">
	<slot name="right"></slot>
</div>

<style type="text/css">${context.props.css}</style>
`;

	var css$3 = "/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n:host {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\tposition: relative;\n\theight: var(--header-height, 8rem);\n\tmin-height: var(--header-height, 8rem);\n\tpadding: var(--header-padding, 0 4rem);\n\tbackground-color: var(--header-fill, hsl(194, 76%, 65%));\n\tcolor: var(--header-color, hsl(0, 0%, 100%));\n\t-webkit-box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.3);\n\t        box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.3);\n}\n\n.brik-header__left {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n}\n\n.brik-burger {\n\tmargin-right: 2rem;\n\t/* stylelint-disable-next-line declaration-property-unit-blacklist */\n\tpadding-top: 0.5rem;\n}\n\n.brik-header__title {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n\tfont-weight: 400;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\tcolor: var(--color__light);\n}\n\n/* stylelint-disable-next-line selector-max-type */\n\n.brik-header__title brik-icon {\n\tfill: var(--color__light);\n}\n";

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
			this.props.css = css$3;
			this.render();
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			if (this.props.hideBurgerAt) {
				this.props.css += `@media (min-width: ${this.props.hideBurgerAt}) {
				.brik-burger { display: none; }
			}`;
			}
			return tpl$3(this.html, this, BrikElement);
		}
	}

	var css$4 = ":host-context([active='left']) {\n\tdisplay: none;\n}\n\n.button {\n\t--burger-size: 3rem;\n\t--burger-bg: hsla(0, 0%, 100%, 1);\n\t--burger-line-spacing: 1.4;\n\t--burger-line-size: 0.375rem;\n\tbackground-color: transparent;\n\tborder: none;\n\theight: var(--burger-size);\n\twidth: var(--burger-size);\n\tcursor: pointer;\n\tposition: relative;\n}\n\n.top,\n.bottom {\n\tbackground-color: var(--burger-bg);\n\tdisplay: block;\n\theight: var(--burger-line-size);\n\twidth: var(--burger-size);\n\tposition: absolute;\n\tleft: 0;\n\t-webkit-transition: all 200ms cubic-bezier(0.6, 0, 0.2, 1.2);\n\ttransition: all 200ms cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n.top {\n\twill-change: transform, top;\n\ttop: calc(\n\t\t50% - (var(--burger-line-size) / 2) -\n\t\t\t(\n\t\t\t\tvar(--burger-line-size) * (var(--burger-line-spacing) + 1)\n\t\t\t)\n\t);\n}\n\n.bottom {\n\twill-change: transform, bottom;\n\tbottom: calc(\n\t\t50% - (var(--burger-line-size) / 2) -\n\t\t\t(\n\t\t\t\tvar(--burger-line-size) * (var(--burger-line-spacing) + 1)\n\t\t\t)\n\t);\n}\n\n.toppings {\n\tposition: absolute;\n\tbackground-color: var(--burger-bg);\n\twidth: 100%;\n\theight: var(--burger-line-size);\n\ttop: calc(50% - (var(--burger-line-size) / 2));\n\tright: 0;\n\topacity: 1;\n\twill-change: transform;\n\t-webkit-transition: -webkit-transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2);\n\ttransition: -webkit-transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2);\n\ttransition: transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2);\n\ttransition: transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2), -webkit-transform 300ms cubic-bezier(0.6, 0, 0.2, 1.2);\n}\n\n:host([active='true']) {\n\t-webkit-transform: rotate(360deg);\n\t        transform: rotate(360deg);\n}\n\n:host([active='true']) .top {\n\t-webkit-transform: rotate(135deg);\n\t        transform: rotate(135deg);\n\ttop: calc(50% - (var(--burger-line-size) / 2));\n}\n\n:host([active='true']) .bottom {\n\t-webkit-transform: rotate(-135deg);\n\t        transform: rotate(-135deg);\n\tbottom: calc(50% - (var(--burger-line-size) / 2));\n}\n\n:host([active='true']) .toppings {\n\t-webkit-transform: scaleX(0);\n\t        transform: scaleX(0);\n}\n";

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
			window.addEventListener('sidebars.toggled', this.handleToggle);
			this.render();
		}

		disconnectedCallback() {
			window.removeEventListener('sidebars.toggled', this.handleToggle);
		}

		// Called when an observedAttribute (which defaults to Object.keys(this.defaults)) changes.
		attributeChangedCallback() {
			this.render();
		}

		handleToggle(event) {
			const isActive = event && event.detail ? event.detail === this.props.sidebar : false;
			this.active = isActive;
		}

		onclick() {
			this.dispatchEvent(new CustomEvent('sidebars.toggle', {
				detail: this.props.sidebar,
				composed: true,
				bubbles: true
			}));
		}

		// Render the DOM efficiently with hyperhtml, a native react/preact/virtualdom alternative.
		// this.html = hyperhtml.bind. All hyperhtml methods are attached to BrikElement.
		// See https://viperhtml.js.org/hyperhtml/documentation/
		render() {
			this.props.sidebar = this.getAttribute('sidebar');
			return this.html`<button class="button" type="button" onclick="${this}">
				<span class=top />
				<span class=toppings />
				<span class=bottom />
			</button>
			<style>${css$4}</style>`;
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

	var tpl$4 = (render, context = {}, hyperhtml = {}, _ = {}) => render`<div class="brik-tabs__buttons">
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

	var css$5 = "/*! tabs.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n.brik-tabs__buttons {\n\tbackground-color: hsl(0, 0%, 100%);\n\tborder-bottom: 0.125rem solid var(--color__dark4);\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 6rem;\n\tposition: relative;\n}\n\n.brik-tabs__button-wrap {\n\tposition: relative;\n}\n\n.brik-tabs__button-wrap:before {\n\tcontent: ' ';\n\tborder-color: var(--color__brand1) transparent transparent transparent;\n\tborder-width: 0;\n\tborder-style: solid;\n\theight: 0;\n\twidth: 0;\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 0;\n\t-webkit-transition-property: border-width, left;\n\ttransition-property: border-width, left;\n\t-webkit-transition-duration: 250ms;\n\t        transition-duration: 250ms;\n\t-webkit-transition-timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.3);\n\t        transition-timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.3);\n}\n\n.brik-tabs__button-wrap:after {\n\tcontent: ' ';\n\tbackground-color: transparent;\n\topacity: 0.7;\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\t-webkit-transition: background-color 200ms;\n\ttransition: background-color 200ms;\n}\n\n.brik-tabs__button--active:before {\n\tborder-width: 1.25rem 1rem 0;\n\tleft: calc(50% - 1rem);\n}\n\n.brik-tabs__button--active:after {\n\tbackground-color: var(--color__brand1);\n}\n\n.brik-tabs__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n\t-webkit-appearance: none;\n\t   -moz-appearance: none;\n\t        appearance: none;\n\tborder: none;\n\tcolor: var(--color__dark2, hsla(0, 0%, 0%, 0.54));\n\tbackground-color: transparent;\n\theight: 100%;\n\tpadding-left: 4rem;\n\tpadding-right: 4rem;\n\tposition: relative;\n\tmargin-left: 0;\n\tz-index: 1;\n\t-webkit-transition: color 200ms;\n\ttransition: color 200ms;\n}\n\n.brik-tabs__button:focus {\n\toutline-width: 0.25rem;\n\toutline-style: solid;\n}\n\n.brik-tabs__button--active .brik-tabs__button {\n\tcolor: var(--color__light, hsla(0, 0%, 100%, 1));\n}\n\n.brik-tabs__button-label {\n\tposition: relative;\n\tz-index: 1;\n}\n\n/* .page-tabs {\n\tmargin-left: -4rem;\n\tmargin-right: -4rem;\n\tmargin-top: -4rem;\n} */\n";

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
			this.props.css = css$5;
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
			return tpl$4(this.html, this, BrikElement);
		}
	}

	var tpl$5 = (render, context = {}, hyperhtml = {}, _ = {}) => render`${context.props.livePreview ? hyperhtml.wire(context.props, ':previewer')`<div class="brik-editor__preview">
	${[context.props.liveMarkup]}
</div>` : ''}

<div class="brik-editor__tabs">
	<div class="brik-editor__tab-buttons">
		${context.props.tabs.map((tab) => hyperhtml.wire(tab)`
			<button onclick="${() => {
				if (context.props.tabs.length > 1) context.activateTab(tab);
			}}" class="${`brik-editor__tab-button font__button ${context.props.activeTab[context.props.activeTab.label ? 'label' : 'id'] === tab[context.props.activeTab.label ? 'label' : 'id'] ? 'brik--is-active' : ''}`}" type="button">${tab.label}</button>
		`)}
	</div>

	${context.props.dirty ? hyperhtml.wire(context.props, ':dirty-note')`<div class="brik-editor__dirty-note"><button class="brik-editor__refresh-button" type="button" onclick="${context.refreshPreview}">Refresh</button> <kbd>ctrl</kbd> | <kbd>cmd</kbd>+<kbd>enter</kbd> to refresh preview</div>` : ''}
</div>

<div class="brik-editor__window"><slot></slot></div>

<style type="text/css">${context.props.css}</style>
`;

	var css$6 = "/*! editor.shadow.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/*! typography.css | MIT License | brikcss  <https://github.com/brikcss> */\n\n/** Define font styles.\n    ============================================================================================= */\n\n/* stylelint-disable max-nesting-depth */\n\n/** Font defaults.\n    ============================================================================================= */\n\n/* stylelint-disable-next-line selector-max-type */\n\nhtml {\n\tfont-size: var(--base-rhythm, 8px);\n}\n\nbody {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-size: var(--base-font__size, 16px);\n}\n\n/** Font helper classes.\n    ============================================================================================= */\n\n.font__overline {\n  font-size: 1.25rem;\n  letter-spacing: 0.3rem;\n  line-height: 2rem;\n  text-transform: uppercase;\n}\n\n.font__caption {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n}\n\n.font__button {\n  font-size: 1.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 2rem;\n  letter-spacing: 0.10714rem;\n}\n\n.font__body2 {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.28571px;\n}\n\n.font__body {\n  color: var(--color__dark, hsla(0, 0%, 0%, 0.87));\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.5px;\n}\n\n.font__subtitle2 {\n  font-size: 1.75rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.01429rem;\n}\n\n.font__subtitle {\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 3rem;\n  letter-spacing: 0.01875rem;\n}\n\n.font__h6 {\n  font-size: 2.5rem;\n  font-weight: 500;\n  line-height: 3rem;\n  letter-spacing: 0.015rem;\n}\n\n.font__h5 {\n  font-size: 3rem;\n  font-weight: 400;\n  line-height: 4rem;\n}\n\n.font__h4 {\n  font-size: 4.25rem;\n  font-weight: 400;\n  line-height: 5rem;\n  letter-spacing: 0.01471rem;\n}\n\n.font__h3 {\n  font-size: 6rem;\n  font-weight: 400;\n  line-height: 6rem;\n}\n\n.font__h2 {\n  font-size: 7.5rem;\n  font-weight: 300;\n  line-height: 8rem;\n  letter-spacing: -0.01667rem;\n}\n\n.font__h1 {\n  font-size: 12rem;\n  font-weight: 300;\n  line-height: 12rem;\n  letter-spacing: -0.03125rem;\n}\n\n.hljs {\n\tline-height: 2rem;\n\tmargin: 0;\n\tpadding: 1rem 2rem;\n\t-moz-tab-size: 4;\n\t  -o-tab-size: 4;\n\t     tab-size: 4;\n}\n\n:host {\n\tdisplay: block;\n}\n\n.brik-editor__tabs {\n\tbackground-color: var(--color__brand4, hsl(0, 0%, 40%));\n\tcolor: var(--color__light, hsl(0, 0%, 100%));\n\tborder-color: var(--color__dark4);\n\tborder-width: 0.125rem 0.125rem 0;\n\tborder-style: solid;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\theight: 3rem;\n\tpadding: 0 1rem;\n}\n\n.brik-editor__tab-buttons {\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n}\n\n.brik-editor__tab-button {\n\tcursor: pointer;\n\theight: 3rem;\n\t-webkit-appearance: none;\n\t   -moz-appearance: none;\n\t        appearance: none;\n\tbackground-color: transparent;\n\tborder: none;\n\tcolor: var(--color__light2);\n\tfont-weight: 400;\n\ttext-transform: none;\n}\n\n.brik-editor__tab-button + .brik-editor__tab-button {\n\tmargin-left: 0.25rem;\n}\n\n.brik-editor__tab-button:focus {\n\toutline-width: 0.25rem;\n\toutline-style: solid;\n}\n\n.brik-editor__tab-button:active {\n\toutline: none;\n}\n\n.brik-editor__tab-button.brik--is-active {\n\tcolor: var(--color__light1);\n}\n\n.brik-editor__window {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tbackground-color: hsl(220, 13%, 18%);\n\tcolor: var(--color__light);\n}\n\n.brik-code--has-tabs {\n\t-webkit-box-sizing: border-box;\n\t        box-sizing: border-box;\n\tposition: relative;\n\twidth: 100%;\n\tmin-width: 100%;\n\tmargin-left: -100%;\n\topacity: 0;\n\t-webkit-transition: opacity 0.3s, -webkit-transform 0.25s;\n\ttransition: opacity 0.3s, -webkit-transform 0.25s;\n\ttransition: opacity 0.3s, transform 0.25s;\n\ttransition: opacity 0.3s, transform 0.25s, -webkit-transform 0.25s;\n}\n\n.brik-code--has-tabs:first-of-type {\n\tmargin-left: 0;\n}\n\n.brik-code--has-tabs.brik--is-active {\n\topacity: 1;\n\tz-index: 1;\n}\n\n.brik-editor__highlighted-code {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n}\n\n.brik-editor--read-only .brik-editor__highlighted-code {\n\tposition: static;\n}\n\n.brik-editor__dirty-note {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  letter-spacing: 0.06667rem;\n\tcolor: var(--color__light2);\n}\n\n/** ================================================================================================\n *  OLD\n ** --- */\n\n.brik-editor__raw-code {\n\twidth: 100%;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-text-fill-color: transparent;\n}\n\n.brik-editor__raw-code:focus {\n\t-webkit-text-fill-color: inherit;\n}\n\n.brik-editor__raw-code.hljs {\n\tbackground: transparent;\n}\n\n/* stylelint-disable-next-line selector-max-type */\n\n.brik-editor__raw-code code {\n\toutline: none;\n}\n\n.brik-editor__preview {\n\tborder-color: var(--color__dark4);\n\tborder-width: 0.125rem 0.125rem 0;\n\tborder-style: solid;\n\t/* stylelint-disable-next-line declaration-property-unit-blacklist */\n\tpadding: calc(2rem - 0.125rem) 2rem 2rem;\n\tposition: relative;\n}\n";

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
			// Create shadow dom and pre-render a skeleton screen.
			this.attachShadow({ mode: 'open' });
			this.props.tabs = [];
			this.props.liveMarkup = '';
			this.render();
		}

		connectedCallback() {
			// Cache dom.
			this.classList.add('brik-editor');
			this.dom = {
				previewer: this.shadowRoot.querySelector('.brik-editor__preview'),
				window: this.shadowRoot.querySelector('.brik-editor__window'),
				panes: Array.from(this.children)
			};
			if (this.props.editable) {
				this.dom.panes.forEach(pane => pane.editable = true);
			}

			// Set default props.
			this.props.ticking = false;
			this.props.throttled = false;
			this.props.css = css$6;
			this.props.live = {};
			this.props.dirty = false;

			// Create tabs.
			this.props.tabs = [];
			this.dom.panes.forEach((pane, i) => {
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
				this.dom.panes[this.props.activeTab.index].classList.remove('brik--is-active');
			}
			// Activate new tab.
			this.props.activeTab = tab;
			this.dom.panes[this.props.activeTab.index].classList.add('brik--is-active');
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
			return tpl$5(this.html, this, BrikElement);
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

	var tpl$6 = (render, context = {}, hyperhtml = {}, _ = {}) => render`${
	context.props.label && context.props.showHeader
		? hyperhtml.wire()`<div class="brik-code__header">${context.props.label}</div>`
		: ''
}

<pre class="${`brik-code__pre language-${
	context.props.lang
}`}"><code class="brik-code__code" contenteditable="${context.props.editable}">${[context.props.text]}</code></pre>

<style>${context.props.css}</style>
`;

	var css$7 = "/**\n * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/chriskempson/tomorrow-theme\n * @author Rose Pritchard\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: #ccc;\n\tbackground: none;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #2d2d2d;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: #999;\n}\n\n.token.punctuation {\n\tcolor: #ccc;\n}\n\n.token.tag,\n.token.attr-name,\n.token.namespace,\n.token.deleted {\n\tcolor: #e2777a;\n}\n\n.token.function-name {\n\tcolor: #6196cc;\n}\n\n.token.boolean,\n.token.number,\n.token.function {\n\tcolor: #f08d49;\n}\n\n.token.property,\n.token.class-name,\n.token.constant,\n.token.symbol {\n\tcolor: #f8c555;\n}\n\n.token.selector,\n.token.important,\n.token.atrule,\n.token.keyword,\n.token.builtin {\n\tcolor: #cc99cd;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.regex,\n.token.variable {\n\tcolor: #7ec699;\n}\n\n.token.operator,\n.token.entity,\n.token.url {\n\tcolor: #67cdcc;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\n.token.inserted {\n\tcolor: green;\n}\n\n.brik-code__header {\n\tbackground-color: var(--color__brand4, hsl(0, 0%, 40%));\n\tcolor: var(--color__light, hsl(0, 0%, 100%));\n\tborder-color: var(--color__dark4);\n\tborder-width: 0.125rem 0.125rem 0;\n\tborder-style: solid;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\theight: 3rem;\n\tpadding: 0 2rem;\n}\n\n/* stylelint-disable selector-no-qualifying-type, selector-max-type */\n\n.brik-code__pre,\npre[class*='language-'] {\n\tline-height: 2rem;\n\tmargin: 0;\n}\n\n/* stylelint-enable selector-no-qualifying-type, selector-max-type */\n\n.brik-code__code:focus {\n\toutline: none;\n}\n\n:host-context(.brik-code--has-tabs) {\n\t-webkit-box-sizing: border-box;\n\t        box-sizing: border-box;\n\tposition: relative;\n\twidth: 100%;\n\tmin-width: 100%;\n\tmargin-left: -100%;\n\topacity: 0;\n\t-webkit-transition: opacity 0.3s, -webkit-transform 0.25s;\n\ttransition: opacity 0.3s, -webkit-transform 0.25s;\n\ttransition: opacity 0.3s, transform 0.25s;\n\ttransition: opacity 0.3s, transform 0.25s, -webkit-transform 0.25s;\n}\n\n:host-context(.brik-code--has-tabs:first-of-type) {\n\tmargin-left: 0;\n}\n\n:host-context(.brik-code--has-tabs.brik--is-active) {\n\topacity: 1;\n\tz-index: 1;\n}\n";

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
			// Create shadow dom and pre-render a skeleton screen.
			this.attachShadow({ mode: 'open' });
			if (typeof this.props.showHeader === 'string') this.props.showHeader = this.props.showHeader === 'true';
			this.render();
		}

		connectedCallback() {
			// Build dom.
			this.dom = {
				pre: this.shadowRoot.querySelector('pre'),
				code: this.shadowRoot.querySelector('code'),
				editor: this.parentNode.tagName === 'BRIK-EDITOR' ? this.parentNode : null
			};
			this.classList.add('brik-code');
			this.dataset.tab = this.props.lang;
			this.props.raw = this.textContent.trim();
			this.textContent = '';

			// Set default props.
			this.props.ticking = false;
			this.props.css = css$7;
			this.props.label = this.props.label || this.props.lang.toUpperCase();
			this.props.inputTimeout;

			// If this is part of an editor element, create a tab.
			if (this.dom.editor) {
				this.props.showHeader = false;
				this.classList.add('brik-code--has-tabs');
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
			return tpl$6(this.html, this, BrikElement);
		}
	}

	var homePage = "<div class=\"markdown\"><h1>Welcome</h1>\n<h2>What to put here?</h2>\n<ul>\n<li>News and release notes?</li>\n<li>Why a UI Library?</li>\n<li>Getting Started?</li>\n</ul>\n</div>";

	var getStartedPage = "<div class=\"markdown\"><h1>Getting Started</h1>\n<p class=\"font__subtitle\">We’re working on documentation. Try back soon!</p>\n</div>";

	var workingWithNpmPage = "<div class=\"markdown\"><h1>Working with NPM</h1>\n<h2>What is NPM?</h2>\n<p><a href=\"https://docs.npmjs.com/\">Node Package Manager (<abbr title=\"Node Package Manager\">NPM</abbr>)</a> is the world’s largest software registry. NPM was originally created for <a href=\"https://nodejs.org/\">NodeJS</a>, but has since expanded to include the entire JavaScript ecosystem, as well as nearly any front end package known to mankind. It is considered the de facto standard for front end packages, as well for all types of Node packages.</p>\n<p>NPM consists of the software registry itself, but also a valuable set of tools. With NPM you can:</p>\n<ul>\n<li>Adapt packages of code to your apps, or incorporate packages as they are.</li>\n<li>Download standalone tools you can use right away.</li>\n<li>Run packages without downloading using <a href=\"https://www.npmjs.com/package/npx\">npx</a>.</li>\n<li>Easily manage multiple versions of code and code dependencies.</li>\n<li>Update applications easily when underlying code is updated.</li>\n<li>Discover multiple ways to solve the same puzzle.</li>\n<li>Create and manage organizations and virtual teams to coordinate package maintenance, coding, and developers.</li>\n<li>Run packages from the command line with “<a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a>” (see below).</li>\n<li>Run custom scripts with <a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a> (see below).</li>\n</ul>\n<p><strong>If you are not yet familiar with NPM, <a href=\"https://docs.npmjs.com/\">get familiar</a></strong>. <em>You won’t regret it!</em></p>\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/pa4dc480Apo?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>\n<h2>Getting Started with NPM</h2>\n<p><em>It is very easy to get started with NPM:</em></p>\n<ul>\n<li><a href=\"https://docs.npmjs.com/getting-started/installing-node\">Get set up</a>.</li>\n<li>Learn how to <a href=\"https://docs.npmjs.com/getting-started/installing-npm-packages-locally\">install NPM packages</a>.</li>\n<li>Learn how to work with <a href=\"https://docs.npmjs.com/getting-started/using-a-package.json\">package.json</a>.</li>\n<li>Learn how to use <a href=\"https://docs.npmjs.com/misc/scripts\">NPM scripts</a> (see below).</li>\n</ul>\n<p>The rest will come naturally over time. They have <a href=\"https://docs.npmjs.com/\">great documentation</a> to help you become a pro.</p>\n<h3>NPM Scripts</h3>\n<p>NPM Scripts is a very powerful (and underrated) feature of NPM. In the words of one user:</p>\n<blockquote>\n<p>“NPM scripts are among my favorite features of NPM. They are simple. They reduce the need for tools. Hence they reduce the number of configuration files and other things you need to keep track of. And they are very versatile.”</p>\n<p>“NPM scripts are, well, scripts [which we] use… to automate repetitive tasks. For example, building your project, minifying Cascading Style Sheets (CSS) and JavaScript (JS) files. Scripts are also used in deleting temporary files and folders, etc,. There are many ways to pull this off — you could write bash/batch scripts, or use a task runner like Gulp or Grunt. However, a lot of people are moving over to NPM scripts for their simplicity and versatility.”</p>\n<p>- Ajmal Siddiqui (<a href=\"https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633\">Introduction to NPM Scripts</a>)</p>\n</blockquote>\n<p><em>The possibilities of things you can do with NPM Scripts is endless.</em> However, one big downfall is that NPM itself does not provide great documentation about its wide variety of uses or how powerful it can be. Thankfully, due to its popularity, there is no shortage of information and tutorials from its users.</p>\n<h4>Getting Started with NPM Scripts</h4>\n<ul>\n<li><a href=\"https://css-tricks.com/why-npm-scripts/#article-header-id-0\">Why NPM Scripts?</a></li>\n<li><a href=\"https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633\">Introduction to NPM Scripts</a></li>\n<li><a href=\"https://medium.freecodecamp.org/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8\">Why I Left Gulp and Grunt for NPM Scripts</a></li>\n<li><a href=\"https://gist.github.com/elijahmanor/179e47828bf760c218bb3820d929836d\">Comparison of NPM Scripts vs something like Gulp</a></li>\n<li><a href=\"https://michael-kuehnel.de/tooling/2018/03/22/helpers-and-tips-for-npm-run-scripts.html\">Advice for working with NPM Scripts</a></li>\n<li><a href=\"https://deliciousbrains.com/npm-build-script/\">Using NPM Scripts as a Build Tool</a></li>\n<li><a href=\"https://docs.npmjs.com/misc/scripts\">NPM Scripts official docs</a></li>\n</ul>\n</div>";

	var browserResetPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Browser Reset</h2>\n\t\t<p>Default styles for HTML elements can differ from browser to browser. The browser reset is a set of CSS rules that <em>resets</em> styles for all HTML elements so all browsers start with a consistent baseline.</p><p><em>Every DS app should include Browser Reset as the first stylesheet in their app.</em></p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/\">Links</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/spacing\">Spacing</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"google-chrome\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"firefox\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-safari\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"edge\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-ios\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"android\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Browser Reset with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Browser Reset as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/browser-reset --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include one of the following as the first stylesheet in your app:</p>\n\t\t\t<ol>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/browser-reset';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/browser-reset.min.css</code> for precompiled vanilla CSS.</li>\n\t\t\t\t<li><em>(optional) Customize</em> CSS variables in your app, as desired (see <a href=\"https://github.com/brikcss/browser-reset/blob/master/src/browser-reset.css\" title=\"browser-reset.css\">browser-reset.css</a> for available variables).</li>\n\t\t\t</ol>\n\n\t</div>\n</brik-tabs>\n";

	var typographyPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Typography</h2>\n\t\t<p>DSUI Typography closely follows <a href=\"https://material.io/design/typography/the-type-system.html\" title=\"Material Design type system\">Material Design's type system</a>, which defines a range of type sizes that may be used. DSUI Typography provides the mechanism for applying and managing typography based on MD specs.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/colors\">Colors</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/spacing\">Spacing</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/components/lists\">Lists</a></li>\n\t\t\t\n\t\t\t\t<li><a href=\"#!/components/links\">Links</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Roboto font face</h3>\n\t\t<p><strong>Roboto</strong> is the <em>only</em> UX approved font family. <brik-icon name=\"alert\" size=\"1.2em\"></brik-icon> Any exceptions require UX approval.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Use only approved font styles</h3>\n\t\t<p><em>Only use approved font styles.</em> <brik-icon name=\"alert\" size=\"1.25em\"></brik-icon> Any exceptions require UX approval and should be added to this list.</p>\n\n\t\t<h4 class=\"font__subtitle\">Font style categories</h4>\n\t\t<dl class=\"list__indented\">\n\t\t\t<dt>Headlines and Titles</dt>\n\t\t\t<dd>Headlines and titles are the largest text on the screen, reserved for short, important text or numerals.</dd>\n\n\t\t\t<dt>Subtitles</dt>\n\t\t\t<dd>Subtitles are smaller than headlines but larger than body text, reserved for medium-emphasis text that is shorter in length.</dd>\n\n\t\t\t<dt>Body text</dt>\n\t\t\t<dd>Body text is used for long-form writing.</dd>\n\n\t\t\t<dt>Caption and Overline text</dt>\n\t\t\t<dd>Caption and overline text are the smallest font sizes, used sparingly to annotate imagery or introduce a headline.</dd>\n\n\t\t\t<dt>Button text</dt>\n\t\t\t<dd>Button text is a call to action, used in buttons, tabs, dialogs, and cards. Button text is all caps, but can be modified to sentence case.</dd>\n\t\t</dl>\n\n\t\t<h4 class=\"font__subtitle\">UX approved font styles:</h4>\n\t\t<table class=\"type__table\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Size / Weight</th>\n\t\t\t\t\t<th>Sample</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Overline</td>\n\t\t\t\t\t<td>10 / 400</td>\n\t\t\t\t\t<td class=\"font__overline\">Overline: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Caption</td>\n\t\t\t\t\t<td>12 / 400</td>\n\t\t\t\t\t<td class=\"font__caption\">Caption: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Button</td>\n\t\t\t\t\t<td>14 / 500</td>\n\t\t\t\t\t<td class=\"font__button\">Button: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Body2</td>\n\t\t\t\t\t<td>14 / 400</td>\n\t\t\t\t\t<td class=\"font__body2\">Body 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Body</td>\n\t\t\t\t\t<td>16 / 400</td>\n\t\t\t\t\t<td class=\"font__body\">Body (default): test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Subtitle2</td>\n\t\t\t\t\t<td>14 / 500</td>\n\t\t\t\t\t<td class=\"font__subtitle2\">Subitle 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Subtitle</td>\n\t\t\t\t\t<td>16 / 400</td>\n\t\t\t\t\t<td class=\"font__subtitle\">Subtitle: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title3</td>\n\t\t\t\t\t<td>20 / 500</td>\n\t\t\t\t\t<td class=\"font__title3\">Title 3: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title2</td>\n\t\t\t\t\t<td>24 / 400</td>\n\t\t\t\t\t<td class=\"font__title2\">Title 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Title1</td>\n\t\t\t\t\t<td>34 / 300</td>\n\t\t\t\t\t<td class=\"font__title1\">Title 1: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H6</td>\n\t\t\t\t\t<td>20 / 500</td>\n\t\t\t\t\t<td class=\"font__h6\">Heading 6: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H5</td>\n\t\t\t\t\t<td>24 / 400</td>\n\t\t\t\t\t<td class=\"font__h5\">Heading 5: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H4</td>\n\t\t\t\t\t<td>34 / 400</td>\n\t\t\t\t\t<td class=\"font__h4\">Heading 4: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H3</td>\n\t\t\t\t\t<td>48 / 400</td>\n\t\t\t\t\t<td class=\"font__h3\">Heading 3: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H2</td>\n\t\t\t\t\t<td>60 / 300</td>\n\t\t\t\t\t<td class=\"font__h2\">Heading 2: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>H1</td>\n\t\t\t\t\t<td>96 / 300</td>\n\t\t\t\t\t<td class=\"font__h1\">Heading 1: test test test test test test test test test</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Limit line length for readability</h3>\n\t\t<p>For best readability, lines of text should be no longer than ~60 characters. Shorter lines of text should wrap at ~30 characters or less.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Approved text colors</h3>\n\t\t<p>Refer to the <a href=\"#!/core/colors\">Colors component</a> for applying text colors.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Additional guidelines</h3>\n\t\t<p><a href=\"https://material.io/design/typography/\" title=\"Material Design type specs\"><abbr title=\"Material Design\">MD</abbr> type specs</a> are an extension of DSUI, and should be referred to for further guidance.</p>\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"google-chrome\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"firefox\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-safari\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"edge\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-ios\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"android\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Typography with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Typography as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/typography --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/typography';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/typography.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/typography.css</code> to create a custom build.</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\t\t<p>A class and a \"style set\" is provided for each named typography style (see \"About\" tab for list of named styles). Each class and style set follows a naming convention:</p>\n\t\t<pre><code>font__&lt;name></code></pre>\n\t\t<p><em>Note: See the \"About\" tab for a full list of available font styles and their names.</em></p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><em>Always</em> use font classes to apply a font style in markup.</li>\n\t\t\t<li><em>Always</em> use a font style set to apply a font style in CSS.</li>\n\t\t\t<li><em>Never</em> modify CSS <code>font-*</code> properties without UX approval.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Font classes</h3>\n\t\t<p>Use font classes to apply font styles in markup. For example:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"html\">&lt;h2 class=\"font__title1\"&gt;My awesome font in \"title\" style.&lt;/h2&gt;</brik-code>\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Font style sets</h3>\n\t\t<p>Use font style sets to apply font styles in CSS. For example:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"css\" label=\"PostCSS\">.my-heading {\n\t@apply --font__title1;\n}</brik-code>\n\t\t\t<brik-code lang=\"css\" label=\"Compiled\">/* Note: PostCSS converts all `px` values to `rem`s. */\n.my-heading {\n\tfont-size: 4.25rem;\n\tfont-weight: 400;\n\tline-height: 5rem;\n\tletter-spacing: 0.01471rem;\n\tfont-weight: 300;\n}</brik-code>\n\t\t</brik-editor>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Font classes</h2>\n\t\t<p>Edit the class in the editor below with one of the following: <code>overline</code>, <code>caption</code>, <code>body</code>, <code>body2</code>, <code>subtitle2</code>, <code>subtitle</code>, <code>title3</code>, <code>title2</code>, <code>title1</code></p>\n\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;p class=\"font__subtitle\">Subtitle: I am subtitle text. Wow.&lt;/p></brik-code>\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

	var colorsPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<!-- About. -->\n\t<div class=\"tabs__content\">\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Colors</h2>\n\t\t<p>DSUI Colors make it easy to apply and manage all of your app's colors. Define colors once and reuse them everywhere. Colors use native CSS variables, which offer many potential features such as live theming.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\t\t<p>Only approved colors should be used. <brik-icon name=\"alert\" size=\"1.2em\"></brik-icon> Any exception requires UX approval.</p>\n\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">Neutral colors (text, icons, borders)</h3>\n\t\t\t<p>Neutral colors are shades of black and white, each with an applied level of opacity. These colors can be used in text, icons, and borders on light backgrounds. Dark colors should only be used on light backgrounds, while light colors should only be used on dark backgrounds.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark1); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark1</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 87% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.87)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark1)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark2</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 54% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.54)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark2)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Active dark icons, Secondary dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark3</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 38% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.38)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark3)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Inactive dark icons, Disabled / hint dark text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__dark4); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">dark4</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000, 12% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 0%, 0.12)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__dark4)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Dark borders / dividers</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light1); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light1</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 100% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 1)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light1)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light2</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 70% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.7)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light2)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Active light icons, Secondary light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light3</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 50% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.5)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light3)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Inactive light icons, Disabled / hint light text</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color pg-colors__color--dark\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__light4); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">light4</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#ffffff, 12% opacity</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsla(0, 0%, 100%, 0.12)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__light4)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Light borders / dividers</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">App colors</h3>\n\t\t\t<p>Background colors with specific use cases.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__gray); color: var(--color__dark);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">gray</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#000000</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(0, 0%, 90%)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__gray)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Neutral background</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__supernav); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">supernav</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#3a4d5f</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(209, 24%, 30%)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__supernav)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Sidebar header</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__supernav--icon); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">supernav--icon</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hex\">#9ca6b0</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-hsl\">hsl(208, 11%, 65%)</span>\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__supernav--icon)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Sidebar icons</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t\t\t<h3 class=\"font__title3 heading__separator\">Theme colors</h3>\n\t\t\t<p>Theme colors are specific to a client and chosen by the client, with DirectScale theme colors provided as fallbacks. <em>Color values are not provided because they should not be used directly.</em> Only the color variables should be used.</p>\n\t\t\t<ul class=\"pg-colors__colors-list\">\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand1); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand1</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand1)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Primary app bar, text links, visual tree</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand2); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand2</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand2)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Buttons, profile avatars</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand3); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand3</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand3)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Selections, checkboxes, selected state for dropdowns, active tab underlines</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t\t\t<li class=\"pg-colors__color\">\n\t\t\t\t\t\t<div class=\"pg-colors__color-value\" style=\"background-color: var(--color__brand4); color: var(--color__light);\">\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-name\">brand4</span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<span class=\"pg-colors__color-var\">var(--color__brand4)</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pg-colors__color-meta\">Distributor profile avatars, selected item in sidebar list, secondary color for visual tree</div>\n\t\t\t\t\t</li>\n\t\t\t\t\n\t\t\t</ul>\n\t\t\n\t</div>\n\n\t<!-- Install & Setup. -->\n\t<div class=\"tabs__content\">\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"google-chrome\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"firefox\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-safari\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"edge\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-ios\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"android\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Colors with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Colors as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/colors --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/colors';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/colors.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/colors.css</code> to create a custom build..</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<!-- Usage. -->\n\t<div class=\"tabs__content\">\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\t\t<p>A variable and class is created for each text and background color.</p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><em>Always</em> use color variables to apply colors in CSS.</li>\n\t\t\t<li><em>Always</em> use color classes to apply colors in markup.</li>\n\t\t\t<li><em>Never</em> manually apply <code>color</code> or <code>background-color</code> properties without UX approval.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Color variables</h3>\n\t\t<p>Use color variables to apply colors in CSS. Each color variable follows this naming convention:</p>\n\t\t<brik-code lang=\"css\">var(--color__&lt;name>)</brik-code>\n\t\t<p>For example, to apply a background theme color with light text:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"css\">.my-component {\n\tbackground-color: var(--color__theme3);\n\tcolor: var(--color__light);\n}</brik-code>\n\t\t</brik-editor>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Color classes</h3>\n\t\t<p>Use color classes to apply colors in markup. Each color class follows a naming convention.</p>\n\t\t<p>Text color classes:</p>\n\t\t<pre><code>c__&lt;name></code></pre>\n\t\t<p>Background color classes:</p>\n\t\t<pre><code>bg__&lt;name></code></pre>\n\t\t<p>For example, to apply a background theme color with light text:</p>\n\t\t<brik-editor>\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"c__light bg__theme3\">...&lt;/div></brik-code>\n\t\t</brik-editor>\n\t</div>\n\n\t<!-- Examples. -->\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Color variables</h2>\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"my-awesome-component\">My awesome component.&lt;/div></brik-code>\n\t\t\t<brik-code lang=\"css\">.my-awesome-component {\n\tbackground-color: var(--color__brand2);\n\tcolor: var(--color__light);\n\n\t/* Helper styles (unimportant). */\n\tdisplay: flex;\n\talign-items: center;\n\ttext-align: center;\n\theight: 20rem;\n\twidth: 20rem;\n}</brik-code>\n\t\t</brik-editor>\n\n\t\t<h2 class=\"font__title2\">Color classes</h2>\n\t\t<brik-editor editable=\"true\" live-preview=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=\"color-light bg-brand2 my-awesome-component\">My awesome component.&lt;/div></brik-code>\n\t\t\t<brik-code lang=\"css\">.my-awesome-component {\n\theight: 20rem;\n\twidth: 20rem;\n}</brik-code>\n\t\t</brik-editor>\n\t</div>\n";

	var rhythmPage = "\n<brik-tabs class=\"page-tabs\" tabs=\"About, Setup, Usage, Playground\">\n\t<div>\n\t\t<div class=\"dsui-page__intro\">\n\t<div class=\"dsui-page__about\">\n\t\t<h2 class=\"font__title2 mt-0\">Rhythm</h2>\n\t\t<p>Rhythm offers an easy way to apply and manage vertical and horizontal spacing. Rhythm is foundational for mastering <a href=\"https://www.creativebloq.com/how-to/the-rules-of-responsive-web-typography\">typography</a> and <a href=\"https://webdesign.tutsplus.com/articles/improving-layout-with-vertical-rhythm--webdesign-14070\">layout</a>, as it fosters <a href=\"https://zellwk.com/blog/why-vertical-rhythms/\">repetition and familiarity</a> throughout the UI, making any layout more <a href=\"https://blog.alexdevero.com/6-simple-secrets-perfect-web-typography/#no5-focus-on-vertical-rhythm\">balanced, beautiful, and readable</a>.</p>\n\t</div>\n\n\t<div class=\"dsui-page__related\">\n\t\t<h2 class=\"font__title2 mt-0\">Related</h2>\n\t\t<ul class=\"bullets dsui-page__related-links\">\n\t\t\t\n\t\t\t\t<li><a href=\"#!/core/typography\">Typography</a></li>\n\t\t\t\n\t\t</ul>\n\t</div>\n</div>\n\n\n\t\t<h2 class=\"font__title2\">Guidelines</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Definitions</h3>\n\t\t<dl class=\"list__indented\">\n\t\t\t<dt>Dimensional properties</dt>\n\t\t\t<dd>Any CSS property which affects an element's dimensions and/or spacing, including but not limited to: <code>height</code>, <code>width</code>, <code>margin</code>, <code>padding</code>, <code>line-height</code>, <code>border</code>.</dd>\n\t\t\t<dt>1rem</dt>\n\t\t\t<dd>A <code>rem</code> is a CSS unit of measurement -- an alternative to <code>pixels</code> -- which can make any layout scaleable and responsive. In DSUI, equal to 8 pixels.</dd>\n\t\t</dl>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Use <code>rems</code> for all dimensional properties</h3>\n\t\t<p>DSUI uses <a href=\"https://www.sitepoint.com/understanding-and-using-rem-units-in-css/\" title=\"Understanding rem units in CSS\">CSS <code>rem</code> units</a> to apply rhythm and spacing. <em>Follow the \"rules of Rhythm\" below when applying <code>rems</code>.</em></p>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Strictly follow the \"Rules of Rhythm\"</h3>\n\t\t<p>To ensure the layout and spacing grid always stays \"in rhythm\", follow these rules:</p>\n\t\t<ol>\n\t\t\t<li>\n\t\t\t\t<p><em>Always</em> use <code>rem</code> units for <em>dimensional properties</em>:</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Use a <strong>1rem grid</strong> (8 pixels) for components.</li>\n\t\t\t\t\t<li>A <strong>0.5rem grid</strong> (4 pixels) may be used for typography and iconography.</li>\n\t\t\t\t</ul></li>\n\t\t\t<li><p><em>Avoid</em> applying <code>rems</code> in fractions (except as noted above). This will break the Rhythm.</p></li>\n\t\t\t<li>\n\t\t\t\t<p><em>Always</em> \"fix\" the Rhythm if and when it's necessary to break it.</p>\n\t\t\t\t<p>Applying <code>rems</code> in fractions will break the Rhythm. There may be rare cases where this necessary, such as when an element needs a <code>1px</code> border, or an image needs a specific height in pixels.</p>\n\t\t\t\t<p>In such cases, you must manually put things back \"in rhythm\" by following this rule:</p>\n\t\t\t\t<blockquote>\n\t\t\t\t\t<p><em>The sum of vertical and horizontal dimensional property values for a given element, converted to <code>rems</code>, must each be an integer.</em></p>\n\t\t\t\t</blockquote>\n\t\t\t</li>\n\t\t</ol>\n\t</div>\n\n\t<div>\n\t\t<h3 class=\"font__title2 mt-0 heading__separator\">Browser support</h3>\n<table class=\"browsers-table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Chrome</th>\n\t\t\t<th>Firefox</th>\n\t\t\t<th>Safari</th>\n\t\t\t<th>Edge</th>\n\t\t\t<th>iOS</th>\n\t\t\t<th>Android</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"google-chrome\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"firefox\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-safari\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"edge\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"apple-ios\"></brik-icon> </td>\n\t\t\t<td><brik-icon class=\"browsers-table__icon\" name=\"android\"></brik-icon> </td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<h3 class=\"font__title2 heading__separator\">Install</h3>\n\n<p>It is encouraged to install Rhythm with DSUI Core:</p>\n<brik-code lang=\"bash\">npm install @brikcss/core --save-dev</brik-code>\n\n<p>You may install Rhythm as a standalone package:</p>\n<brik-code lang=\"bash\">npm install @brikcss/rhythm --save-dev</brik-code>\n\n\n\t<h3 class=\"font__title2 heading__separator\">Setup</h3>\n\t<p>Include desired file(s) in your app:</p>\n\t\t\t<ul>\n\t\t\t\t<li><em>PostCSS</em>: <code>@import '@brikcss/spacing';</code> with <a href=\"https://github.com/postcss/postcss-import\" title=\"postcss-import\">postcss-import</a>.</li>\n\t\t\t\t<li><em>Precompiled</em>: <code>./dist/spacing.min.css</code> for vanilla CSS.</li>\n\t\t\t\t<li><em>Custom build</em>: Follow <code>./src/spacing.css</code> to create a custom build..</li>\n\t\t\t</ul>\n\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2 mt-0\">Usage</h2>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Rules of engagement</h3>\n\t\t<ul>\n\t\t\t<li><em>Always</em> use CSS <code>rems</code> to apply dimensional properties (height, width, margins, padding, etc.) in CSS.</li>\n\t\t\t<li><em>Always</em> use Rhythm classes to apply Rhythm in markup.</li>\n\t\t</ul>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Applying Rhythm with <code>rems</code></h3>\n\t\t<p>Applying Rhythm with <code>rems</code> is fairly self-explanatory. The important thing to remember is to <em>always follow the Rules of Rhythm</em> (see the \"About\" tab).</p>\n\t\t<p>Simple example:</p>\n\t\t<brik-code lang=\"css\">.my-component {\n\tborder: 1px solid var(--color__dark4);\n\tmargin-top: 2rem;\n\n\t/* Apply Rhythm fix to height/width dimensions since 1px top and bottom border throws it off */\n\theight: calc(10rem - 2px);\n\twidth: 14rem;\n}</brik-code>\n\n\t\t<h3 class=\"font__title3 heading__separator\">Applying Rhythm with classes</h3>\n\t\t<p>DSUI Rhythm provides a series of utility classes to allow you to easily apply <code>padding</code> and <code>margin</code> to any element. Each Rhythm class follows these format:</p>\n\t\t<pre><code>.{p|m}{l|r|t|b|x|y}-{value}</code></pre>\n\t\t<p>where:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>value</code> is the rem value being applied</li>\n\t\t\t<li><code>p</code> applies <code>value</code> to padding</li>\n\t\t\t<li><code>m</code> applies <code>value</code> to margin</li>\n\t\t\t<li><code>l</code> applies <code>value</code> to left side</li>\n\t\t\t<li><code>r</code> applies <code>value</code> to right side</li>\n\t\t\t<li><code>t</code> applies <code>value</code> to top side</li>\n\t\t\t<li><code>b</code> applies <code>value</code> to bottom side</li>\n\t\t\t<li><code>x</code> applies <code>value</code> to left and right sides</li>\n\t\t\t<li><code>y</code> applies <code>value</code> to top and bottom sides</li>\n\t\t</ul>\n\t\t<h4 class=\"font__subtitle\">Examples of Rhythm utility classes</h4>\n\t\t<p>By default, Rhythm classes are created for the following <code>rem</code> values:</p>\n\t\t<blockquote>\n\t\t\t<code>0</code>, <code>0.5rem</code>, <code>1rem</code>, <code>1.5rem</code>, <code>2rem</code>, <code>3rem</code>, <code>4rem</code>\n\t\t</blockquote>\n\t\t<p>Some examples of valid Rhythm classes:</p>\n\t\t<ul class=\"bullets\">\n\t\t\t<li><code>.pl-1</code> applies 1rem of padding-left</li>\n\t\t\t<li><code>.mr-2</code> applies 2rem of margin-right</li>\n\t\t\t<li><code>.pb-1-5</code> applies 1.5rem of padding-bottom</li>\n\t\t\t<li><code>.mt-4</code> applies 4rem of margin-top</li>\n\t\t\t<li><code>.px-0-5</code> applies 0.5rem of padding-left and padding-right</li>\n\t\t\t<li><code>.my-1</code> applies 1rem of margin-top and margin-bottom</li>\n\t\t\t<li><code>.p-4</code> applies 4rem of padding</li>\n\t\t\t<li><code>.m-3</code> applies 3rem of margin</li>\n\t\t</ul>\n\t</div>\n\n\t<div>\n\t\t<h2 class=\"font__title2\">Examples</h2>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;px-1&quot;&gt;Padding left and right&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;m-4&quot;&gt;Margin on all sides&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t\t<brik-editor live-preview=\"true\" editable=\"true\">\n\t\t\t<brik-code lang=\"html\">&lt;div class=&quot;m-4 mb-0 pl-2 pt-1&quot;&gt;Margin on all sides except bottom with a left and top padding&lt;/div&gt;</brik-code>\n\t\t</brik-editor>\n\t</div>\n</brik-tabs>\n";

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
		path: '/home',
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
		supernav: document.querySelector('brik-super-nav'),
		rightSidebarToggle: document.querySelector('.toggle__right'),
		content: document.querySelector('brik-page-content')
	};

	/** ================================================================================================
	 *  Router
	 ** ------ */

	app.router = createRouter(routes, {
		allowNotFound: false,
		autoCleanUp: true,
		defaultRoute: '404',
		defaultParams: {},
		queryParams: {
			arrayFormat: 'default',
			nullFormat: 'default',
			booleanFormat: 'default'
		},
		queryParamsMode: 'default',
		trailingSlashMode: 'default',
		strictTrailingSlash: false,
		caseSensitive: true
	}).usePlugin(browserPlugin({
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
		app.page.toggleSidebar('');
		// Update header.
		app.header.title = `${route.parent ? (route.parent.title || route.parent.label) + ' <brik-icon name="chevron-right" size="1.2em"></brik-icon> ' : ''}${route.title || route.label || 'Unknown'}`;
		// Render route.
		if (typeof route.render === 'function') route.render(app, toState, fromState);
	}

	/** ================================================================================================
	 *  Define custom elements
	 ** ---------------------- */

	Page.define();
	PageViewport.define();
	PageContent.define();
	PageOverlay.define();
	Sidebar.define();
	SuperNav.define();
	Scroller.define();
	Tabs.define();
	Editor.define();
	Code.define();
	// Icon.define({ size: '4rem' });
	BrikElement.define(class extends Icon {
		get defaults() {
			return Object.assign({}, Icon.defaults, {
				size: '4rem'
			});
		}
	});
	BurgerButton.define();

	BrikElement.define(class Test extends BrikElement {
		get defaults() {
			return {
				height: '40px',
				width: '100%',
				backgroundColor: 'yellow',
				color: 'red'
			};
		}
		// define(Class) {
		// 	console.log('THIS:', Class.name);
		// 	customElements.define('brik-test', Class);
		// }
		created() {
			this.render();
		}
		connectedCallback() {
			setTimeout(() => {
				this.backgroundColor = 'pink';
			}, 1000);
			setTimeout(() => {
				this.setAttribute('background-color', 'orange');
			}, 2000);
			setTimeout(() => {
				this.backgroundColor = 'green';
			}, 3000);
			setTimeout(() => {
				this.setAttribute('background-color', 'lightgray');
			}, 4000);
		}
		attributeChangedCallback() {
			this.render();
		}
		render() {
			this.style = `display: inline-flex; align-items: center; justify-content: center; background-color: ${this.props.backgroundColor}; color: ${this.props.color}; height: ${this.props.height}; width: ${this.props.width};`;
		}
	});
	Header.define();

	/** ================================================================================================
	 *  Build supernav links
	 ** -------------------- */

	app.supernav.props.links = routes;
	app.supernav.render();

	/** ================================================================================================
	 *  Temporary
	 ** --------- */

	// Add temporary right sidebar toggle.
	app.rightSidebarToggle.addEventListener('click', () => {
		app.page.toggleSidebar('right');
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
