var Template = (function ($) {
    'use strict';

    var Template,
        createRenderFunction;

    createRenderFunction = function (html) {
        html = html.replace(/[\r\t\n]/g, ' ');
        html = html.replace(/\{\{/g, '\',');
        html = html.replace(/\}\}/g, ',\'');
        html = html.replace(/\{%/g, '\');');
        html = html.replace(/%\}/g, 'lines.push(\'');
        html = '\'' + html + '\'';

        return new Function('_context',
            'var lines = [], trace = function () {lines.push.apply(lines, arguments);};' +
            'with (_context) {' +
            'lines.push(' + html + ');' +
            '}' +
            'return lines.join(\'\');'
        );
    };

    Template = function (html) {
        this.render = createRenderFunction(html);
    };

    Template.create = (function () {
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