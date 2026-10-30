# 2449. Minimum Number of Operations to Make Arrays Similar

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar](https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar)
**Companies:** Amazon, Walmart Labs

---

## Problem Description

You are given two positive integer arrays `nums` and `target`, of the same length.

In one operation, you can choose any two **distinct** indices `i` and `j` where `0 <= i, j < nums.length` and:

- set `nums[i] = nums[i] + 2` and
- set `nums[j] = nums[j] - 2`.

Two arrays are considered to be **similar** if the frequency of each element is the same.

Return *the minimum number of operations required to make *`nums`* similar to *`target`. The test cases are generated such that `nums` can always be similar to `target`.

**Constraints:**
- `n == nums.length == target.length`
- `1 <= n <= 10^5`
- `1 <= nums[i], target[i] <= 10^6`
- It is possible to make `nums` similar to `target`.

---

## Examples

**Example 1:**
```
Input: nums = [8,12,6], target = [2,14,10]
Output: 2
Explanation: It is possible to make nums similar to target in two operations:
- Choose i = 0 and j = 2, nums = [10,12,4].
- Choose i = 1 and j = 2, nums = [10,14,2].
It can be shown that 2 is the minimum number of operations needed.
```

**Example 2:**
```
Input: nums = [1,2,5], target = [4,1,3]
Output: 1
Explanation: We can make nums similar to target in one operation:
- Choose i = 1 and j = 2, nums = [1,4,3].
```

**Example 3:**
```
Input: nums = [1,1,1,1,1], target = [1,1,1,1,1]
Output: 0
Explanation: The array nums is already similiar to target.
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
