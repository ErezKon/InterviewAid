# 1437. Check If All 1's Are at Least Length K Places Away

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description
Given an binary array `nums` and an integer `k`, return `true` *if all* `1`*'s are at least* `k` *places away from each other, otherwise return* `false`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= k <= nums.length`
- `nums[i]` is `0` or `1`

## Examples
```
Example 1:
  Input: nums = [1,0,0,0,1,0,0,1], k = 2
  Output: true
  Explanation: Each of the 1s are at least 2 places away from each other.
```

```
Example 2:
  Input: nums = [1,0,0,1,0,1], k = 2
  Output: false
  Explanation: The second 1 and third 1 are only one apart from each other.
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
