# 2618. Check if Object Instance of Class

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-object-instance-of-class](https://leetcode.com/problems/check-if-object-instance-of-class)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the function. For example, the value or the class could be `undefined`.

---

## 2. Examples

```
Example 1:
  Input: func = () => checkIfInstanceOf(new Date(), Date)
  Output: true
  Explanation: The object returned by the Date constructor is, by definition, an instance of Date.
```

```
Example 2:
  Input: func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
  Output: true
  Explanation:
  class Animal {};
  class Dog extends Animal {};
  checkIfInstanceOf(new Dog(), Animal); // true
  Dog is a subclass of Animal. Therefore, a Dog object is an instance of both Dog and Animal.
```

```
Example 3:
  Input: func = () => checkIfInstanceOf(Date, Date)
  Output: false
  Explanation: A date constructor cannot logically be an instance of itself.
```

```
Example 4:
  Input: func = () => checkIfInstanceOf(5, Number)
  Output: true
  Explanation: 5 is a Number. Note that the "instanceof" keyword would return false. However, it is still considered an instance of Number because it accesses the Number methods. For example "toFixed()".
```

---

## 3. Approach: Prototype Chain Walk — O(depth) ✅

```text
FUNCTION checkIfInstanceOf(value, classFunction):
    IF value IS null OR value IS undefined OR TYPEOF classFunction ≠ "function":
        RETURN false
    // Auto‑box primitives so they have a prototype chain
    SET obj ← Object(value)
    SET proto ← GET_PROTOTYPE_OF(obj)
    WHILE proto IS NOT null:
        IF proto IS classFunction.prototype:
            RETURN true
        SET proto ← GET_PROTOTYPE_OF(proto)
    RETURN false
```

Key insight: By wrapping the value with `Object`, even primitives obtain a prototype chain that can be traversed.

---

## 4. Walkthrough

Consider `value = 5` and `classFunction = Number`.

1. `Object(5)` creates a temporary `Number` object.
2. Its prototype is `Number.prototype`.
3. The loop compares `proto` with `Number.prototype` → match → return `true`.

For `value = null`:

1. `Object(null)` returns `null`.
2. The initial check fails, returning `false` immediately.

---

## 5. Complexity Analysis

- **Time**: O(d) where *d* is the depth of the prototype chain (typically very small).
- **Space**: O(1) – only a few pointers are stored.

---

## 6. Follow‑Up Questions

- How would you modify the function to support custom `instanceof` semantics?
- Can you implement a similar check in languages without prototype chains?
- How does JavaScript's `Symbol.hasInstance` affect this behavior?

---

## Key Takeaway

> Walk the prototype chain via `Object.getPrototypeOf()`. Use `Object(value)` to auto‑box primitives so they have a prototype chain to traverse.
