import { List } from './List';

const lista = new List<person>();

lista.add( { name: 'Juancho', age: 28} );
lista.add( { name: 'Sabrina', age: 23} );
lista.add( { name: 'Cecilia', age: 60} );
lista.add( { name: 'Juan M.', age: 70} );
lista.add( { name: 'Florchu', age: 4} );

//console.log(lista.take(2).average(x => x+1));
//console.log(lista.select(t => t.age).toString());



console.log(lista.first())


const numList = new List<string>();
numList.add('1');
numList.add('a');
numList.add('7');

console.log(numList.max());

interface person {
  name: string,
  age: number;
}


console.log(!isNaN(3));