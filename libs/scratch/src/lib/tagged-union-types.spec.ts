describe('Tagged Union Types', () => {
  it('defining and use them', () => {
    type SuccessResult<T> = {
      status: 'OK';
      value: T;
    };

    type ErrorResult = {
      status: 'ERROR';
      message?: string;
    };

    function ensureEven(x: number): SuccessResult<number> | ErrorResult {
      if (x % 2 === 0) {
        return {
          status: 'OK',
          value: 2,
        };
      } else {
        return {
          status: 'ERROR',
          message: `${x} is Odd`,
        };
      }
    }

    const result = ensureEven(4);

    if (result.status === 'OK') {
      expect(result.value).toBe(2);
    } else {
      // it is an error
    }

    const result2 = ensureEven(5);
    switch (result2.status) {
      case 'OK': {
        console.log(result2.value);
        break;
      }
      case 'ERROR': {
        console.log(result2.message);
      }
    }
  });
});
