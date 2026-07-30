# 2449. Minimum Number of Operations to Make Arrays Similar

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar](https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar)
**Companies:** Amazon, Walmart Labs

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` of the same length `n`. In one operation you may choose an index `i` and replace `nums1[i]` with any integer that has the same parity (odd/even) as the original value. The goal is to make `nums1` a permutation of `nums2`. Return the minimum number of operations required.

---

## Examples

**Example 1:**
```
Input: nums1 = [1,2,3], nums2 = [2,1,3]
Output: 1
Explanation: Change nums1[0] from 1 (odd) to 2 (even) – parity matches the target value at that position. After one operation the arrays are permutations of each other.
```

**Example 2:**
```
Input: nums1 = [5,7,9], nums2 = [2,4,6]
Output: 3
Explanation: All three numbers must change parity to become even.
```

---

## Approach

**Greedy – Count Parity Mismatches (O(n log n))**

1. Separate the numbers of each array into odd and even groups.
2. The number of required operations equals the maximum of the mismatched odd‑to‑even counts because each operation can fix one mismatched element.
3. Sort the mismatched groups and pair them to minimize the number of changes (though count alone suffices for the minimum).

```text
FUNCTION minOperations(nums1, nums2):
    odd1 ← [x FOR x IN nums1 IF x MOD 2 = 1]
    even1← [x FOR x IN nums1 IF x MOD 2 = 0]
    odd2 ← [x FOR x IN nums2 IF x MOD 2 = 1]
    even2← [x FOR x IN nums2 IF x MOD 2 = 0]
    // mismatches: odd in nums1 that need to become even, and vice‑versa
    mismatchOddToEven ← MAX(0, LENGTH(odd1) - LENGTH(odd2))
    mismatchEvenToOdd ← MAX(0, LENGTH(even1) - LENGTH(even2))
    RETURN MAX(mismatchOddToEven, mismatchEvenToOdd)
```

---

## Walkthrough

For `nums1 = [1,2,3]`, `nums2 = [2,1,3]`:
| Group | count in nums1 | count in nums2 |
|-------|----------------|----------------|
| odd   | 2 (1,3)        | 1 (1)          |
| even  | 1 (2)          | 2 (2,?)        |
Mismatched odds = 2‑1 = 1, mismatched evens = 1‑2 = 0 → answer = 1.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Counting groups | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the algorithm change if you could only increase numbers, not replace arbitrarily?
2. Can you output the exact indices that need to be changed?
3. What if the arrays contain duplicate values and must become exactly equal (not just a permutation)?

---

## Key Takeaway

The minimum operations equal the larger of the odd‑to‑even and even‑to‑odd mismatches; fixing each mismatched parity resolves the permutation requirement.
