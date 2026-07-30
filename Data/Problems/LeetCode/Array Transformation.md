# 1243. Array Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-transformation](https://leetcode.com/problems/array-transformation)
**Companies:** Virtu

---

## 1. Problem Description

Given an array `arr`, repeatedly apply: for each element (not first/last), if it's less than both neighbors, increment it; if greater than both neighbors, decrement it. Stop when no changes occur. Return the final array.

## 2. Examples

| Input | Output |
|-------|--------|
| `[5,1,3,2,4]` | `[5,2,2,3,4]` |
| Explanation: After first round, middle elements become `[5,2,3,3,4]`; second round stabilizes to `[5,2,2,3,4]` |
| `[1,2,3,4]` | `[1,2,3,4]` |
| Explanation: No element is a local extremum, so array stays unchanged |

## 3. Approach

Simulate the transformation on a copy each round to avoid in‑place interference. Continue until a round makes no changes.

```text
FUNCTION transformArray(arr):
    WHILE true:
        changed ← false
        newArr ← COPY(arr)
        FOR i ← 1 TO LENGTH(arr) - 2:
            IF arr[i] < arr[i-1] AND arr[i] < arr[i+1]:
                newArr[i] ← arr[i] + 1
                changed ← true
            ELSE IF arr[i] > arr[i-1] AND arr[i] > arr[i+1]:
                newArr[i] ← arr[i] - 1
                changed ← true
        IF NOT changed: BREAK
        arr ← newArr
    RETURN arr
```

## 4. Walkthrough

Take `[5,1,3,2,4]`:
1. Round 1: check indices 1‑3.
   - i=1: 1 < 5 and 1 < 3 → increment → 2
   - i=2: 3 > 2 and 3 > 2 → decrement → 2
   - i=3: 2 < 3 and 2 < 4 → increment → 3
   Result `[5,2,2,3,4]`.
2. Round 2: no element satisfies the condition, stop.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n × k) where *k* is number of rounds (worst‑case bounded by max value range) | O(n) |

## 6. Follow‑Up Questions

- Can the process be optimized to run in O(n) without explicit simulation?
- How would you handle very large integer ranges?
- What if the rule applied to the first and last elements as well?

## Key Takeaway

> Simulate the transformation on a copy each round to avoid in‑place interference. Converges when all local extrema are eliminated.
