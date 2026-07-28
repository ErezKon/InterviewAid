# 1437. Check If All 1's Are at Least Length K Places Away

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description
Given a binary array `nums` and an integer `k`, determine whether every pair of `1`s in the array is separated by at least `k` zeros. In other words, for any two indices `i` and `j` where `nums[i] = nums[j] = 1` and `i < j`, the condition `j - i - 1 >= k` must hold.

## Examples
**Example 1:**
```
Input: nums = [1,0,0,1,0,1], k = 2
Output: true
Explanation: The distances between consecutive 1's are 3 and 2, both ≥ k.
```
**Example 2:**
```
Input: nums = [1,0,1,0,1], k = 2
Output: false
Explanation: The first two 1's are only 1 zero apart, violating the requirement.
```

## Approach
Scan the array while remembering the index of the last seen `1`. For each new `1`, check the gap to the previous `1`. If the gap is smaller than `k`, return false; otherwise continue.

```text
FUNCTION KLengthApart(nums, k):
    SET lastOne ← -k - 1  // ensures first 1 passes the check
    FOR i ← 0 TO LEN(nums) - 1:
        IF nums[i] == 1:
            IF i - lastOne - 1 < k:
                RETURN false
            SET lastOne ← i
    RETURN true
```

## Walkthrough
| i | nums[i] | lastOne before | Gap (i - lastOne - 1) | Action |
|---|---------|----------------|----------------------|--------|
|0|1| -3 | 0 - (-3) - 1 = 2 ≥ k | set lastOne = 0 |
|1|0| 0 | — | continue |
|2|0| 0 | — | continue |
|3|1| 0 | 3 - 0 - 1 = 2 ≥ k | set lastOne = 3 |
|…|…|…|…|…|
All gaps satisfy the condition, so return true.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you adapt the solution for a circular array where the end connects to the start?
2. What if the array contained values other than 0/1 and you needed to enforce the distance rule for a specific value?
3. Can you solve the problem using a sliding‑window technique?

## Key Takeaway
A single linear scan tracking the previous `1` index is sufficient to verify the required minimum distance.
