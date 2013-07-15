describe('a simple text template', function () {
    jasmine.getFixtures().fixturesPath = 'base';

    it('the js-template is loaded', function () {
        loadFixtures('test/fixtures/text.html');
        expect($('#text')).toExist();
    });

    it('the raw contents of the template', function () {
        loadFixtures('test/fixtures/text.html');
        expect($('#text')).toHaveHtml('<p>{{ text }}</p>');
    });

    it('the rendered template', function () {
        var $template,
            template;

        loadFixtures('test/fixtures/text.html');

        $template = $('#text');
        template = Template.create($template);
        expect(template.render({
            text: 'foo'
        })).toEqual('<p>foo</p>');
    });
});