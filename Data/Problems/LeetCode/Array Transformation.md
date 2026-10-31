# 1243. Array Transformation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-transformation](https://leetcode.com/problems/array-transformation)
**Companies:** Virtu

---

## 1. Problem Description

Given an initial array `arr`, every day you produce a new array using the array of the previous day.

On the `i`-th day, you do the following operations on the array of day `i-1` to produce the array of day `i`:

- If an element is smaller than both its left neighbor and its right neighbor, then this element is incremented.
- If an element is bigger than both its left neighbor and its right neighbor, then this element is decremented.
- The first and last elements never change.

After some days, the array does not change. Return that final array.

**Constraints:**
- `3 <= arr.length <= 100`
- `1 <= arr[i] <= 100`

## 2. Examples

```
Example 1:
  Input: arr = [6,2,3,4]
  Output: [6,3,3,4]
  Explanation:
  On the first day, the array is changed from [6,2,3,4] to [6,3,3,4].
  No more operations can be done to this array.

Example 2:
  Input: arr = [1,6,3,4,3,5]
  Output: [1,4,4,4,4,5]
  Explanation:
  On the first day, the array is changed from [1,6,3,4,3,5] to [1,5,4,3,4,5].
  On the second day, the array is changed from [1,5,4,3,4,5] to [1,4,4,4,4,5].
  No more operations can be done to this array.
```

## 3. Approach

Simulate the transformation on a copy each round to avoid in-place interference. Continue until a round makes no changes.

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
1. Round 1: check indices 1-3.
   - i=1: 1 < 5 and 1 < 3 → increment → 2
   - i=2: 3 > 2 and 3 > 2 → decrement → 2
   - i=3: 2 < 3 and 2 < 4 → increment → 3
   Result `[5,2,2,3,4]`.
2. Round 2: no element satisfies the condition, stop.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n × k) where *k* is number of rounds (worst-case bounded by max value range) | O(n) |

## 6. Follow-Up Questions

- Can the process be optimized to run in O(n) without explicit simulation?
- How would you handle very large integer ranges?
- What if the rule applied to the first and last elements as well?

## Key Takeaway

> Simulate the transformation on a copy each round to avoid in-place interference. Converges when all local extrema are eliminated.
