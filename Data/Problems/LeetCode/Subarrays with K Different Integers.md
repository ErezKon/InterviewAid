# 992. Subarrays with K Different Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarrays-with-k-different-integers](https://leetcode.com/problems/subarrays-with-k-different-integers)
**Companies:** Amazon, Bloomberg, Capital One, Google, Hashedin, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Oracle, Roblox, Salesforce, Servicenow, Squarepoint Capital, Tiktok, Uber

---

## Problem Description
Given an integer array `nums` and an integer `k`, return the number of (contiguous) subarrays that contain exactly `k` distinct integers.

## Examples
**Example 1:**
```
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays with exactly 2 distinct numbers are:
[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,3]
```
**Example 2:**
```
Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: The subarrays are [1,2,1,3], [2,1,3,4], [1,3,4].
```

## Approach
**At Most K – At Most (K‑1) Technique** – Count subarrays with at most `k` distinct integers using a sliding window and a frequency map. Subtract the count for `k‑1` to obtain the exact‑`k` result.

```text
FUNCTION subarraysWithKDistinct(nums, k):
    RETURN atMost(nums, k) - atMost(nums, k - 1)

FUNCTION atMost(nums, limit):
    SET freq ← empty map
    SET left ← 0
    SET result ← 0
    FOR right FROM 0 TO LENGTH(nums)-1:
        SET val ← nums[right]
        SET freq[val] ← freq.get(val, 0) + 1
        WHILE SIZE(freq) > limit:
            SET leftVal ← nums[left]
            SET freq[leftVal] ← freq[leftVal] - 1
            IF freq[leftVal] == 0:
                DELETE freq[leftVal]
            END IF
            SET left ← left + 1
        END WHILE
        SET result ← result + (right - left + 1)
    END FOR
    RETURN result
```

## Walkthrough
Consider `nums = [1,2,1,2,3]`, `k = 2`.
1. `atMost(nums,2)` counts all subarrays with ≤2 distinct numbers → 10.
2. `atMost(nums,1)` counts all subarrays with ≤1 distinct number → 3.
3. Subtract: 10‑3 = 7 exact‑2 subarrays.
The sliding window expands `right`, contracts `left` when distinct count exceeds the limit, and adds the number of valid subarrays ending at each `right`.

## Complexity Analysis
- **Time:** O(n) – each element enters and leaves the window at most once.
- **Space:** O(k) for the frequency map (at most `k+1` distinct keys).

## Follow-Up Questions
1. How would you modify the algorithm to handle queries for multiple values of `k` efficiently?
2. Can the technique be extended to count subarrays with at most `k` distinct *odd* numbers?
3. What changes are needed if the input is a stream and you must output the count after each new element?

## Key Takeaway
Counting subarrays with exactly `k` distinct integers reduces to the difference of two “at most k” sliding‑window counts, yielding a linear‑time solution.
