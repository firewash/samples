'use strict';
function decorator1(target, key, descriptor){
  debugger
  var method = descriptor.value;
  descriptor.value = function(){
    console.log(this.name);
    method();
  }
  return descriptor;
}

class Cat {
  constructor() {
    this.name='huahua'
  }

  @decorator1
  miao(){
    console.log('mmmmmiao');
  }

}

let c = new Cat();
c.miao();

///////////////////////

~function(){
  function decorator2(target, key, descriptor){
    var method = descriptor.value;
    descriptor.value = function(args){
      method(new Date(), ...args);
    }
    return descriptor;
  }

  @decorator2
  function log(info){
    console.log('一段log')
  }

}()