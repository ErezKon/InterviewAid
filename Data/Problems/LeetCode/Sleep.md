# 2621. Sleep

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sleep](https://leetcode.com/problems/sleep)
**Companies:** Amazon, Google

---

## Problem Description

Given a positive integer `millis`, write an asynchronous function that sleeps for `millis` milliseconds. It can resolve any value.

**Note** that *minor* deviation from `millis` in the actual sleep duration is acceptable.

**Constraints:**
- `1 <= millis <= 1000`

**Examples:**

**Example 1:**
```
Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

**Example 2:**
```
Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
```

---

## Approach: Promise with setTimeout — O(1) ✅

```
FUNCTION sleep(millis):
    RETURN new Promise(resolve => setTimeout(resolve, millis))
```

Or using `async/await`:

```javascript
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
```

| Time | Space |
|------|-------|
| O(1) | O(1) |
