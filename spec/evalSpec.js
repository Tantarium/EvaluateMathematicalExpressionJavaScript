
describe("Comparing two poker hands to determine which one would win.", function() {

    it("'1+1' to equal 2.", function() {
        var expression = '1+1';
        expect(2).toEqual(calc(expression));
    });

    it("'1 - 1' to equal 0.", function() {
        var expression = '1 - 1';
        expect(0).toEqual(calc(expression));
    });

    it("'1* 1' to equal 1.", function() {
        var expression = '1* 1';
        expect(1).toEqual(calc(expression));
    });

    it("'1 /1' to equal 1.", function() {
        var expression = '1 /1';
        expect(1).toEqual(calc(expression));
    });

    it("'-123' to equal -123.", function() {
        var expression = '-123';
        expect(-123).toEqual(calc(expression));
    });

    it("'123' to equal 123.", function() {
        var expression = '123';
        expect(123).toEqual(calc(expression));
    });

    it("'2 /2+3 * 4.75- -6' to equal 21.25.", function() {
        var expression = '2 /2+3 * 4.75- -6';
        expect(21.25).toEqual(calc(expression));
    });

    it("'12* 123' to equal 1476.", function() {
        var expression = '12* 123';
        expect(1476).toEqual(calc(expression));
    });

    it("'2 / (2 + 3) * 4.33 - -6' to equal 7.732.", function() {
        var expression = '2 / (2 + 3) * 4.33 - -6';
        expect(7.732).toEqual(calc(expression));
    });

    it("'((80 - (19)))' to equal 61.", function() {
        var expression = '((80 - (19)))';
        expect(61).toEqual(calc(expression));
    });

    it("'(1 - 2) + -(-(-(-4)))' to equal 3.", function() {
        var expression = '(1 - 2) + -(-(-(-4)))';
        expect(3).toEqual(calc(expression));
    });

    it("'(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ' to equal 1.", function() {
        var expression = '(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ';
        expect(1).toEqual(calc(expression));
    });

});
