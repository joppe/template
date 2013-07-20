describe('The Template class', function () {
    it('to be defined as a global', function () {
        expect(Template).toBeDefined();
    });

    it('to have an static method called "create"', function () {
        expect(Template.createFromElement).toEqual(jasmine.any(Function));
    });

    it('to throw an exception on when the element is not found', function () {
        expect(function () {
            Template.createFromElement($('#foo'));
        }).toThrow('Template not found.');
    });

    describe('templates can be created from a string', function () {
        var t,
            data;

        beforeEach(function() {
            t = new Template('<p>{{ foo }}</p>');
            data = {foo: 'hello'};
        });

        it('the object should be of type Template', function () {
            expect(t instanceof Template).toBeTruthy();
        });

        it('the output is a string', function () {
            expect(t.render(data)).toBe('<p>hello</p>');
        });
    });
});