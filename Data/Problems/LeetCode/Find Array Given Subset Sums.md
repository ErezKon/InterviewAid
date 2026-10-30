# 1982. Find Array Given Subset Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-array-given-subset-sums](https://leetcode.com/problems/find-array-given-subset-sums)
**Companies:** Mindtickle

---

## Problem Description

You are given an integer `n` representing the length of an unknown array that you are trying to recover. You are also given an array `sums` containing the values of all `2^n` **subset sums** of the unknown array (in no particular order).

Return *the array *`ans`* of length *`n`* representing the unknown array. If **multiple** answers exist, return **any** of them*.

An array `sub` is a **subset** of an array `arr` if `sub` can be obtained from `arr` by deleting some (possibly zero or all) elements of `arr`. The sum of the elements in `sub` is one possible **subset sum** of `arr`. The sum of an empty array is considered to be `0`.

**Note:** Test cases are generated such that there will **always** be at least one correct answer.

**Constraints:**
- `1 <= n <= 15`
- `sums.length == 2^n`
- `-10^4 <= sums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: n = 3, sums = [-3,-2,-1,0,0,1,2,3]
Output: [1,2,-3]
Explanation: [1,2,-3] is able to achieve the given subset sums:
- []: sum is 0
- [1]: sum is 1
- [2]: sum is 2
- [1,2]: sum is 3
- [-3]: sum is -3
- [1,-3]: sum is -2
- [2,-3]: sum is -1
- [1,2,-3]: sum is 0
Note that any permutation of [1,2,-3] and also any permutation of [-1,-2,3] will also be accepted.
```

**Example 2:**
```
Input: n = 2, sums = [0,0,0,0]
Output: [0,0]
Explanation: The only correct answer is [0,0].
```

**Example 3:**
```
Input: n = 4, sums = [0,0,5,5,4,-1,4,9,9,-1,4,3,4,8,3,8]
Output: [0,-1,4,5]
Explanation: [0,-1,4,5] is able to achieve the given subset sums.
```

---

## Approach: Recursive Decomposition — O(2ⁿ × n) ✅

```text
FUNCTION recoverArray(n, sums):
    SORT sums ASCENDING
    result ← []
    WHILE LENGTH(sums) > 1:
        d ← sums[1] - sums[0]  // candidate element magnitude
        without ← []
        with_ ← []
        used ← multiset()
        FOR s IN sums:
            IF s IN used:
                with_.APPEND(s)
                used.REMOVE(s)
            ELSE:
                without.APPEND(s)
                used.ADD(s + d)
        IF 0 IN without:
            result.APPEND(d)
            sums ← without
        ELSE:
            result.APPEND(-d)
            sums ← with_
    RETURN result
```

The algorithm repeatedly extracts the smallest element by comparing the two smallest subset sums, partitions the sums into those that include the element and those that do not, and recurses on the appropriate half.

---

## Walkthrough

**Example** – `n = 2`, `sums = [0,1,2,3]`
1. Sort sums → `[0,1,2,3]`. `d = 1 - 0 = 1`.
2. Partition:
   - without = `[0,2]` (sums without `d`).
   - with_ = `[1,3]` (sums with `d`).
3. `0` is in `without`, so element `1` belongs to the array. Append `1` to result.
4. Set `sums = without = [0,2]` and repeat.
5. `d = 2 - 0 = 2`. Partition → `without = [0]`, `with_ = [2]`.
6. `0` in `without`, append `2`. Result `[1,2]`.
7. No more sums; return `[1,2]`.

---

## Complexity Analysis

- **Time:** O(2ⁿ × n) — sorting the 2ⁿ sums dominates, plus linear work per iteration.
- **Space:** O(2ⁿ) for storing the sums and auxiliary multisets.

---

## Follow-Up Questions

- How would the solution change if the array is guaranteed to contain only positive numbers?
- Can you recover the array when only a subset of the subset sums is provided?
- Extend the approach to output the array in sorted order.

---

## Key Takeaway

> **Iteratively extract elements from subset sums. The minimal difference reveals the smallest element, and multiset partitioning isolates sums that contain it.**