# 1787. Make the XOR of All Segments Equal to Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero](https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero)
**Companies:** Google, Medianet

---

## 1. Problem Description

Change minimum elements so that every contiguous subarray of length `k` has XOR equal to 0.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,0,3,0], k = 2
Output: 2
Explanation: Change the second element to 1 and the fourth element to 1, resulting in [1,1,0,1,0].
All length‑2 subarrays now have XOR 0.
```

**Example 2:**
```
Input: nums = [5,5,5,5], k = 2
Output: 0
Explanation: The array already satisfies the condition because 5 XOR 5 = 0 for every adjacent pair.
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
1. Group indices by `i mod k`: Group 0 → positions 0,2,4 → values `[1,0,0]`; Group 1 → positions 1,3 → values `[2,3]`.
2. For each group we can either keep the most frequent value or change the whole group.
   - Group 0: most frequent is `0` (2 occurrences). Changing the `1` costs 1.
   - Group 1: both values appear once, so we may change both to a common value, costing 2.
3. DP explores XOR states across groups; the optimal combination yields total cost 2, matching the answer.

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
