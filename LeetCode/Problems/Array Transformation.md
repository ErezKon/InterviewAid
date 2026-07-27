# 1243. Array Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-transformation](https://leetcode.com/problems/array-transformation)
**Companies:** Virtu

---

## 1. Problem Description

Given an array `arr`, repeatedly apply: for each element (not first/last), if it's less than both neighbors, increment it; if greater than both neighbors, decrement it. Stop when no changes occur. Return the final array.

---

## 2. Approach: Simulate Until Stable — O(n × max_val) ✅

```
FUNCTION transformArray(arr):
    WHILE true:
        changed = false
        newArr = copy of arr
        FOR i FROM 1 TO len(arr) - 2:
            IF arr[i] < arr[i-1] AND arr[i] < arr[i+1]:
                newArr[i] += 1
                changed = true
            ELSE IF arr[i] > arr[i-1] AND arr[i] > arr[i+1]:
                newArr[i] -= 1
                changed = true
        arr = newArr
        IF NOT changed: BREAK
    RETURN arr
```

| Time | Space |
|------|-------|
| O(n × max_val) worst case | O(n) |

---

## Key Takeaway

> Simulate the transformation on a copy each round to avoid in-place interference. Converges when all local extrema are eliminated.
