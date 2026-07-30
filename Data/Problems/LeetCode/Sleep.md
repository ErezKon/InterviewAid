# 2621. Sleep

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sleep](https://leetcode.com/problems/sleep)
**Companies:** Amazon, Google

---

## Problem Description

Given a positive integer `millis`, write an asynchronous function that sleeps for `millis` milliseconds and then resolves.

### Examples

**Example 1:**
- **Input:** `millis = 100`
- **Output:** Resolves after 100ms

**Example 2:**
- **Input:** `millis = 200`
- **Output:** Resolves after 200ms

### Constraints

- `1 <= millis <= 1000`

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
