# 2648. Generate Fibonacci Sequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-fibonacci-sequence](https://leetcode.com/problems/generate-fibonacci-sequence)
**Companies:** Bloomberg, Google

---

## 1. Problem Description

Write a generator function that yields the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ... (JavaScript problem)

## 2. Approach: Generator Function ✅

```javascript
var fibGenerator = function*() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
};
```

## Key Takeaway

> Use JavaScript `function*` with `yield` and destructuring swap for an infinite Fibonacci generator.
