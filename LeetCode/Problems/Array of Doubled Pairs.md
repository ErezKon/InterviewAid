# 954. Array of Doubled Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/array-of-doubled-pairs](https://leetcode.com/problems/array-of-doubled-pairs)
**Companies:** Google

---

## 1. Problem Description

Given an integer array `arr` of even length, determine if it can be reordered such that `arr[2*i + 1] = 2 * arr[2*i]` for every `0 <= i < len(arr) / 2`.

---

## 2. Key Insight

> Sort by absolute value. Greedily pair each element `x` with `2x` using a frequency counter. Process smallest absolute values first so each element finds its double.

---

## 3. Approach: Sort + Greedy Matching — O(n log n) ✅

```
FUNCTION canReorderDoubled(arr):
    count = Counter(arr)
    FOR x IN sorted(arr, key=abs):
        IF count[x] == 0: CONTINUE
        IF count[2*x] == 0: RETURN false
        count[x] -= 1
        count[2*x] -= 1
    RETURN true
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> Sorting by absolute value ensures that for both positive and negative numbers, we always try to pair `x` with `2x` before `2x` gets consumed by something else.
