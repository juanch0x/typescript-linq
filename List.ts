/**
 * Generic list
 */
export class List<T> {
  private array: T[] = [];  

  // constructor();
  constructor(baseArray?: T[]){
    if(baseArray){
      this.array = baseArray;
    }
  }

  //#region filtering
  firstOrDefault = (condition: ((t:T) => boolean)) : T | null => {
    for( const element of this.array ){
      if( condition(element) )
        return element;
    }
    return null;
  }

  first = (condition?: ((t:T) => boolean)) : T => {
    this.throwIfEmpty();
    if(condition){
      for( const element of this.array ){
        if( condition(element) )
          return element;
      }
      throw new Error("no elements");
    }
    return this.array[0];
  }

  lastOrDefault = (condition: ((t:T) => boolean)): T | null => {
    for( const element of [...this.array].reverse() ){
      if( condition(element) )
        return element;
    }
    return null;
  }

  last = (condition: ((t:T) => boolean)): T => {
    for( const element of [...this.array].reverse() ){
      if( condition(element) )
        return element;
    }
    throw new Error("no elements");    
  }
  
  where = (condition: ((t:T) => boolean)): List<T> => {
    return this.asList([...this.array].filter( condition ));
  }

  skip = (num: number): List<T> => {    
    if(num <= this.count() && num >= 0)
      return this.asList(this.array.slice(num));
    throw new Error(`You can't skip ${num} items if the list has ${this.count()}`);    
  }

  take = (num: number): List<T> => {
    const length = this.count();
    if(length <= 0)
      throw Error('invalid argument');
    else if(num > length)
      throw Error(`You can't take ${num} elements if the list has ${length}`)
    else if(length === num)
      return this;
    
    const newList = new List<T>();
    for(let i = 0; i < num; i++){
      newList.add(this.array[i]);
    }
    return newList;
  };

  count = (condition?: ((t:T) => boolean)): number => {
    if(!condition)
      return this.array.length;
    return this.where(condition).toArray().length;
  }

  any = (condition?: ((t:T) => boolean )) => {
    if(condition)
      return this.array.some(condition);
    return this.count() > 0;
  }
  
  all = (condition: ((t:T) => boolean )) => {
    return this.array.every(condition);
  }

  //#endregion filtering
  
  //#region aggregate
  sum = (nums: ((t:T) => number)) => {
    return this.array.reduce((ac: any ,v) => {
      return Number(ac) + nums(v);
    }, 0)
  }

  average = (nums: ((t:T) => number)) => {
    if(this.count() === 0) return 0;
    return this.array.reduce((ac: any ,v) => {
      return Number(ac) + nums(v);
    }, 0)/this.count()
  }
  max = (convertion?: ((t:T) => number)) => {
    if(convertion){
      return Math.max.apply( null, this.select(convertion).toArray() );
    }
    if(this.all(x => !isNaN(x as any))){      
      return Math.max.apply( null, this.select(x => Number(x)).toArray());}
  }

  //#endregion
  

  select = <S>(convertion: ((t:T) => S)) => {
    return new List<S>( this.array.map(convertion) );
  }


  //#region ordering
  orderBy = (condition: ((t:T) => boolean)) => {
      
  }

  
  //#endregion ordering
  
  //#region others

  add = (t:T) => {
    this.array.push(t);
  }  
  
  
  
  toArray = () => {
    return [...this.array];
  }
  
  asList = (t:T[]) => {
    return new List(t);
  }

  public toString = (): string => {
    return `[ ${this.array.join(' , ')} ]`;
  }

  //#endregion others
  
  //#region  localMethods
  private throwIfEmpty = () => {
    if(!this.array || this.count() === 0)
      throw Error('empty list');
  }
  //#endregion

}
