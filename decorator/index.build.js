'use strict';

var _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function dec(target, key, descriptor) {
  var method = descriptor.value;
  descriptor.value = function () {
    console.log(this.name + ' mmmmmiao');
  };
  return descriptor;
}

let Cat = (_class = class Cat {
  constructor() {
    this.name = 'huahua';
  }

  miao() {
    console.log('mmmmmiao');
  }

}, (_applyDecoratedDescriptor(_class.prototype, 'miao', [dec], Object.getOwnPropertyDescriptor(_class.prototype, 'miao'), _class.prototype)), _class);


let c = new Cat();
c.miao();
