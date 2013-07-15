describe('The Template class', function () {
    it('to be defined as a global', function () {
        expect(Template).toBeDefined();
    });

    it('to have an static method called "create"', function () {
        expect(Template.create).toEqual(jasmine.any(Function));
    });

    it('to throw an exception on when the template is not found', function () {
        expect(function () {
            Template.create($('#foo'));
        }).toThrow('Template not found.');
    });
});