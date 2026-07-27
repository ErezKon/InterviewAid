# 2666. Allow One Function Call

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Yandex
---

```
var once = function(fn) {
    let called = false;
    return function(...args) {
        if (called) return undefined;
        called = true;
        return fn(...args);
    };
};
```
