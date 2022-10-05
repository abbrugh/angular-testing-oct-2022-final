describe('Some More Advanced Things in TypeScript', () => {
  it('Using Unknown instead of Any', () => {
    let x: unknown;

    x = 'Dog';
    if (typeof x === 'string') {
      console.log(`The length of x is ${x.length}`);
    }
    x = 12;
    if (typeof x === 'number') {
      const y = x * 3;
      console.log(`Y is now ${y}`);
    }

    x = new Monkey('george');

    if (x instanceof Monkey) {
      console.log(`This is a monkey and his name is ${x.name}`);
    }
  });
});

class Monkey {
  constructor(public readonly name: string) {}
}
