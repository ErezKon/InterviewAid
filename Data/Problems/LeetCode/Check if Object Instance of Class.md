# 2618. Check if Object Instance of Class

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-object-instance-of-class](https://leetcode.com/problems/check-if-object-instance-of-class)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Implement a function that checks if a value is an instance of a given class or any of its super‑classes, similar to JavaScript's `instanceof`. The function must also work for primitive values (e.g., `5` should be considered an instance of `Number`).

---

## 2. Examples

| Input | Class | Output |
|-------|-------|--------|
| `5`, `Number` | `Number` | `true` |
| `{}`, `Object` | `Object` | `true` |
| `null`, `Object` | `Object` | `false` |

*Explanation*: Primitive `5` is auto‑boxed to a `Number` object, so it matches `Number`. `null` has no prototype chain, thus never matches.

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
