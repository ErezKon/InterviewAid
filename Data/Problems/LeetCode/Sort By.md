# 2724. Sort By

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Bloomberg, Google
---

## Problem Description

Given an array `arr` and a function `fn`, return the array sorted by the values returned by `fn`. (JavaScript problem.)

### Examples

- **Input:** `arr = [5,4,1,2,3], fn = (x) => x` → **Output:** `[1,2,3,4,5]`
- **Input:** `arr = [{"x":1},{"x":0},{"x":-1}], fn = (d) => d.x` → **Output:** `[{"x":-1},{"x":0},{"x":1}]`

## Approach: Built-in Sort — O(n log n) ✅

```
var sortBy = function(arr, fn) {
    return arr.sort((a, b) => fn(a) - fn(b));
};
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
