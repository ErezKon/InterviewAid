# 2811. Check if it is Possible to Split Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-possible-to-split-array](https://leetcode.com/problems/check-if-it-is-possible-to-split-array)
**Companies:** Moneylion

---

## 1. Problem Description

You are given an array `nums` of length `n` and an integer `m`. You need to determine if it is possible to split the array into `n` arrays of size 1 by performing a series of steps.

An array is called **good** if:

- The length of the array is **one**, or
- The sum of the elements of the array is **greater than or equal** to `m`.

In each step, you can select an existing array (which may be the result of previous steps) with a length of **at least two** and split it into **two** arrays, if both resulting arrays are good.

Return `true` if you can split the given array into `n` arrays, otherwise return `false`.

**Constraints:**
- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= m <= 200`

---

## 2. Key Insight

> If `n ≤ 2`, always true. Otherwise, we need at least one pair of adjacent elements with sum ≥ `m`. That pair can always be the last to split, and everything else can be peeled off one element at a time.

---

## 3. Approach: Check Adjacent Pairs — O(n) ✅

```text
FUNCTION canSplitArray(nums, m):
    IF len(nums) <= 2: RETURN true
    FOR i FROM 0 TO len(nums) - 2:
        IF nums[i] + nums[i+1] >= m:
            RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Examples

```
Example 1:
  Input: nums = [2, 2, 1], m = 4
  Output: true
  Explanation: Split [2, 2, 1] to [2, 2] and [1]. The array [1] has a length of one, and the array [2, 2] has the sum of its elements equal to 4 >= m, so both are good arrays.
  Split [2, 2] to [2] and [2]. Both arrays have the length of one, so both are good arrays.
```

```
Example 2:
  Input: nums = [2, 1, 3], m = 5
  Output: false
  Explanation: The first move has to be either of the following:
  - Split [2, 1, 3] to [2, 1] and [3]. The array [2, 1] has neither length of one nor sum of elements greater than or equal to m.
  - Split [2, 1, 3] to [2] and [1, 3]. The array [1, 3] has neither length of one nor sum of elements greater than or equal to m.
  So as both moves are invalid (they do not divide the array into two good arrays), we are unable to split nums into n arrays of size 1.
```

```
Example 3:
  Input: nums = [2, 3, 3, 2, 3], m = 6
  Output: true
  Explanation: Split [2, 3, 3, 2, 3] to [2] and [3, 3, 2, 3].
  Split [3, 3, 2, 3] to [3, 3, 2] and [3].
  Split [3, 3, 2] to [3, 3] and [2].
  Split [3, 3] to [3] and [3].
```

---

## 5. Walkthrough

Consider `nums = [1,2,3,4]`, `m = 5`.
| Step | Action | Remaining Array |
|------|--------|-----------------|
| 1 | Check adjacent pairs: (1,2)=3, (2,3)=5 → found ≥5 | `[1,2,3,4]` |
| 2 | Use pair (2,3) as final split. Peel off left element 1 → `[2,3,4]` |
| 3 | Peel off right element 4 → `[2,3]` |
| 4 | Split `[2,3]` (sum=5) into `[2]` and `[3]` → all singletons achieved.

---

## 6. Complexity Analysis

- **Time Complexity:** O(n) – one pass to check adjacent sums.
- **Space Complexity:** O(1) – only constant extra variables.

---

## 7. Follow-Up Questions

- How would the solution change if the subarray length requirement were ≥ k instead of 2?
- Can we extend the approach to handle circular arrays where the end connects to the start?
- What if we need to return the minimum number of splits required?

---

## Key Takeaway

> The splitting problem reduces to: does any adjacent pair sum to ≥ `m`? If so, we can always isolate elements by peeling from the ends, keeping that valid pair until last.
