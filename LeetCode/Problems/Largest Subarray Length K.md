# 1708. Largest Subarray Length K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-subarray-length-k](https://leetcode.com/problems/largest-subarray-length-k)
**Companies:** Google

---

## 1. Problem Description

Given an array of **distinct** integers and integer `k`, return the lexicographically largest subarray of length `k`.

---

## 2. Examples

**Example 1:**
```
Input: nums = [3,5,2,6,4], k = 3
Output: [6,4]
Explanation: The possible subarrays of length 3 are [3,5,2], [5,2,6], [2,6,4]. The lexicographically largest starts with the maximum element 6, so the answer is [6,4].
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], k = 2
Output: [4,5]
Explanation: The subarray starting at the maximum element among valid starts (index 3) yields [4,5].
```

---

## 3. Approach: Find Max Start — O(n) ✅

Since all elements are distinct, the lexicographically largest subarray starts at the maximum element among valid starting positions.

```text
FUNCTION largestSubarray(nums, k):
    maxIdx ← 0
    FOR i ← 1 TO LENGTH(nums) - k:
        IF nums[i] > nums[maxIdx]:
            maxIdx ← i
    RETURN SLICE(nums, maxIdx, maxIdx + k)
```

---

## 4. Walkthrough

| Step | i (current index) | maxIdx | Reason |
|------|-------------------|--------|--------|
| Init | - | 0 | Start with first possible start |
| i=1 | 1 | 0 → 1 | nums[1]=5 > nums[0]=3 |
| i=2 | 2 | 1 | nums[2]=2 < nums[1]=5 |
| i=3 | 3 | 3 | nums[3]=6 > nums[1]=5 |
| i=4 | 4 | 3 | i exceeds n‑k (5‑3=2), stop |

Resulting subarray = SLICE(nums, 3, 6) = [6,4].

---

## 5. Complexity Analysis

| Time Complexity | O(n) – single pass to find max start |
| Space Complexity | O(k) – space for the returned subarray (output) |

---

## 6. Follow-Up Questions

- How would the solution change if the array could contain duplicate values?
- Can you extend the approach to return the *k* largest lexicographic subarrays?
- What if the subarray length `k` is not fixed but needs to be maximized under a sum constraint?

---

## Key Takeaway

> With distinct elements, lexicographic order is determined by the first element. Find the max among positions `[0, n‑k]` and return the subarray starting there.
