# 1. Metaprogramming

## 1.1 Proxy & Reflect

```javascript
// === REACTIVE SYSTEM (Vue.js-style) ===
function reactive(target, onChange) {
  const handler = {
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);
      // Deep reactivity: wrap nested objects
      if (typeof value === "object" && value !== null) {
        return reactive(value, onChange);
      }
      return value;
    },
    
    set(obj, prop, value, receiver) {
      const oldValue = obj[prop];
      const result = Reflect.set(obj, prop, value, receiver);
      
      if (oldValue !== value) {
        onChange(prop, value, oldValue);
      }
      
      return result;
    },
    
    deleteProperty(obj, prop) {
      const result = Reflect.deleteProperty(obj, prop);
      onChange(prop, undefined, obj[prop]);
      return result;
    }
  };
  
  return new Proxy(target, handler);
}

const state = reactive({ count: 0, user: { name: "Alice" } }, (prop, newVal, oldVal) => {
  console.log(`${prop}: ${oldVal} → ${newVal}`);
});

state.count = 1;           // "count: 0 → 1"
state.user.name = "Bob";   // "name: Alice → Bob" (deep reactivity)


// === VALIDATION PROXY ===
function createValidated(schema) {
  return new Proxy({}, {
    set(obj, prop, value) {
      if (prop in schema) {
        const { type, validate, required } = schema[prop];
        
        if (type && typeof value !== type) {
          throw new TypeError(`${prop} must be of type ${type}, got ${typeof value}`);
        }
        
        if (validate && !validate(value)) {
          throw new RangeError(`Validation failed for ${prop}: ${value}`);
        }
      }
      return Reflect.set(obj, prop, value);
    }
  });
}

const user = createValidated({
  age: { type: "number", validate: v => v >= 0 && v <= 150 },
  email: { type: "string", validate: v => v.includes("@") },
});

user.age = 25;           // ✅
user.email = "a@b.com";  // ✅
// user.age = -5;         // ❌ RangeError
// user.age = "old";      // ❌ TypeError


// === SYMBOLS ===
// Well-known symbols customize language behavior

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  // Make iterable
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
  
  // Customize instanceof
  static [Symbol.hasInstance](instance) {
    return typeof instance?.start === "number" && typeof instance?.end === "number";
  }
  
  // Customize string tag
  get [Symbol.toStringTag]() {
    return "Range";
  }
  
  // Customize toPrimitive
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.end - this.start;
    return `Range(${this.start}..${this.end})`;
  }
}

const r = new Range(1, 5);
console.log([...r]);                // [1, 2, 3, 4, 5]
console.log(`${r}`);                // "Range(1..5)"
console.log(+r);                    // 4
console.log(Object.prototype.toString.call(r)); // "[object Range]"
```
