# 1787. Make the XOR of All Segments Equal to Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero](https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero)
**Companies:** Google, Medianet

---

## 1. Problem Description

You are given an array `nums` and an integer `k`. The XOR of a segment `[left, right]` where `left <= right` is the `XOR` of all the elements with indices between `left` and `right`, inclusive: `nums[left] XOR nums[left+1] XOR ... XOR nums[right]`.

Return *the minimum number of elements to change in the array* such that the `XOR` of all segments of size `k` is equal to zero.

**Constraints:**

- `1 <= k <= nums.length <= 2000`
- `0 <= nums[i] < 2^10`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,2,0,3,0], k = 1
  Output: 3
  Explanation: Modify the array from [1,2,0,3,0] to from [0,0,0,0,0].
```

```
Example 2:
  Input: nums = [3,4,5,2,1,7,3,4,7], k = 3
  Output: 3
  Explanation: Modify the array from [3,4,5,2,1,7,3,4,7] to [3,4,7,3,4,7,3,4,7].
```

```
Example 3:
  Input: nums = [1,2,4,1,2,5,1,2,6], k = 3
  Output: 3
  Explanation: Modify the array from [1,2,4,1,2,5,1,2,6] to [1,2,3,1,2,3,1,2,3].
```

---

## 3. Approach: DP on Groups — O(n · 2^10) ✅

```
// XOR of subarray of length k = 0 implies arr is periodic with period k
// Elements at positions i mod k must satisfy XOR constraint
// DP over k groups, tracking XOR state
// For each group, either change all to a new value or keep common values
```

| Time | Space |
|------|-------|
| O(n · 1024) | O(1024) |

---

## 4. Walkthrough

Consider `nums = [1,2,0,3,0]` and `k = 2`.
1. Group indices by `i mod k`: Group 0 → positions 0,2,4 → values `[1,0,0]`; Group 1 → positions 1,3 → values `[2,3]`.
2. For each group we can either keep the most frequent value or change the whole group.
   - Group 0: most frequent is `0` (2 occurrences). Changing the `1` costs 1.
   - Group 1: both values appear once, so we may change both to a common value, costing 2.
3. DP explores XOR states across groups; the optimal combination yields total cost 2, matching the answer.

---

## 5. Complexity Analysis

- **Time:** O(n · 2^b) where `b` is the number of bits (≤10 for the constraint), effectively O(n·1024).
- **Space:** O(2^b) for the DP table.

---

## 6. Follow-Up Questions

- How would the solution change if the required XOR value for each segment were a given constant `x` instead of 0?
- Can the algorithm be adapted for a sliding window of varying length?
- What if we need to minimize the sum of changed values rather than the count of changes?

---

## Key Takeaway

> Periodicity means `arr[i] = arr[i+k]`. Group by `i mod k`. DP over XOR states across groups. Optimize by trying "change entire group" vs "keep most frequent value".
