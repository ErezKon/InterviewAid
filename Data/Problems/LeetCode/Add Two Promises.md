# 2723. Add Two Promises

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-two-promises](https://leetcode.com/problems/add-two-promises)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given two promises that resolve to numbers, return a promise that resolves to their **sum**.

---

## 2. Examples

**Example 1**
```javascript
const p1 = Promise.resolve(3);
const p2 = Promise.resolve(5);
addTwoPromises(p1, p2).then(console.log); // 8
```

**Example 2**
```javascript
const p1 = new Promise(r => setTimeout(() => r(10), 100));
const p2 = Promise.resolve(7);
addTwoPromises(p1, p2).then(console.log); // 17 after 100ms
```

---

## 3. Approach: Promise.all — O(1) ✅

```text
FUNCTION addTwoPromises(promise1, promise2):
    [val1, val2] ← AWAIT Promise.all([promise1, promise2])
    RETURN val1 + val2
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Call `Promise.all` with the two input promises. |
| 2 | `Promise.all` waits for both promises to settle and returns an array `[val1, val2]`. |
| 3 | Add the two resolved values and return the sum. |

---

## 5. Complexity Analysis

- **Time:** O(1) – the work after both promises resolve is a single addition.
- **Space:** O(1) – only a few temporary variables are used.

---

## 6. Follow-Up Questions

1. How would you handle rejection of one of the promises? |
2. How can you enforce a timeout for each promise? |
3. How would you sum more than two promises efficiently? |

---

## Key Takeaway

> `Promise.all` concurrently awaits multiple promises, then you can combine their results with a simple addition.
