describe('the difference between interfaces and type aliases', () => {
  it('classes can be used as either a class or an interface', () => {
    const bob = new Customer();
    expect(bob.availableCredit).toBe(5000);
    bob.makePurchase(1000);
    expect(bob.availableCredit).toBe(4000);

    const sue: Customer = {
      id: '88',
      availableCredit: 9000,
      makePurchase: (amount: number) => {
        /*nothing */
      },
    };
    expect(sue.availableCredit).toBe(9000);
  });

  it('what is a type alias', () => {
    type ThingWithLettersAndStuff = string;
    type Iso8601Date = string;

    interface Transaction {
      posted: Iso8601Date;
    }

    let myName: ThingWithLettersAndStuff;

    // myName = 'Jeff';
    // myName = 99;

    type SortOptions = 'title' | 'artist' | 'album';

    const mySortPreferences: SortOptions = 'artist';
  });

  it('interfaces or types', () => {
    interface Song {
      title: string;
      artist: string;
      album?: string;
    }

    type Artist = {
      firstName: string;
      lastName: string;
      mi?: string;
    };

    interface Song {
      yearReleased: number;
    }
    const favoriteSong: Song = {
      title: 'I don\t get it',
      artist: 'Cowboy Junkies',
      album: 'Trinity Sessions',
      yearReleased: 2003,
    };

    type ArtistWithLabel = Artist & {
      label: string;
      currentlyTouring: boolean;
    };
    const artist: ArtistWithLabel = {
      firstName: 'Ludwig Von',
      lastName: 'Beethoven',
      label: 'Columbia',
      currentlyTouring: false,
    };

    type MyArtist = Pick<ArtistWithLabel, 'currentlyTouring' | 'mi'>;
  });

  it('structural typing again', () => {
    type Employee = { salary: number; name: string };
    function giveRaise(employee: Employee, amount: number) {
      employee.salary += amount;
      console.log(
        `Gave an raise to ${employee.name} of ${amount}. New Salary is ${employee.salary}`
      );
    }

    giveRaise({ salary: 100_000, name: 'Haroon' }, 99);
  });
});

class Customer {
  id = '';
  availableCredit = 5000;
  makePurchase(amount: number) {
    this.availableCredit -= amount;
  }
}
