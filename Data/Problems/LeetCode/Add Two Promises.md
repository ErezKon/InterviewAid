# 2723. Add Two Promises

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-two-promises](https://leetcode.com/problems/add-two-promises)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given two promises `promise1` and `promise2`, return a new promise. `promise1` and `promise2` will both resolve with a number. The returned promise should resolve with the sum of the two numbers.

**Constraints:**
- `promise1` and `promise2` are promises that resolve with a number

---

## 2. Examples

```
Example 1:
  Input:
  promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
  promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
  Output: 7
  Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned
  promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not
  judged for this problem.
```
```
Example 2:
  Input:
  promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),
  promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
  Output: -2
  Explanation: The two input promises resolve with the values of 10 and -12 respectively. The
  returned promise should resolve with a value of 10 + -12 = -2.
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
