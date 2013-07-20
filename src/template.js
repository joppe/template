var Template = (function ($) {
    'use strict';

    var Template,
        createRenderFunction;

    /**
     * Create the render function
     *
     * @param {string} html
     * @returns {Function}
     */
    createRenderFunction = function (html) {
        // example string <p>{% if greet == true { %}Hello {% } %}{{ name }}</p>

        // remove the whitespace
        html = html.replace(/[\r\t\n]/g, ' ');

        // replace the print variable opening brackets: <p>{% if greet == true { %}Hello {% } %}', name }}</p>
        html = html.replace(/\{\{/g, '\',');

        // replace the print variable closing brackets: <p>{% if greet == true { %}Hello {% } %}', name ,'</p>
        html = html.replace(/\}\}/g, ',\'');

        // replace the statement opening bracket: <p>'); if greet == true { %}Hello '); } %}', name ,'</p>
        html = html.replace(/\{%/g, '\');');

        // replace the statement closing bracket: <p>'); if greet == true { lines.push('Hello '); } lines.push('', name ,'</p>
        html = html.replace(/%\}/g, 'lines.push(\'');

        // '<p>'); if greet == true { lines.push('Hello '); } lines.push('', name ,'</p>'
        html = '\'' + html + '\'';

        // lines.push('<p>'); if greet == true { lines.push('Hello '); } lines.push('', name ,'</p>');
        return new Function('_context',
            'var lines = [], trace = function () {lines.push.apply(lines, arguments);};' +
            'with (_context) {' +
                'lines.push(' + html + ');' +
            '}' +
            'return lines.join(\'\');'
        );
    };

    /**
     * @class Template
     * @param {string} html
     * @constructor
     */
    Template = function (html) {
        this.render = createRenderFunction(html);
    };

    /**
     * The created Template instances that are created from an element are cached
     *
     * @function createFromElement
     * @memberof Template
     * @static
     */
    Template.createFromElement = (function () {
        var cache = {};

        return function (selector) {
            var template,
                    $element;

            if (cache[selector] !== undefined) {
                template = cache[selector];
            } else {
                $element = $(selector);

                if ($element.size() === 0) {
                    throw 'Template not found.';
                } else {
                    template = new Template($element.html());
                }
            }

            return template;
        };
    }());

    return Template;
}(jQuery));