# 1438. Longest Continuous Subarray With Absolute Diff ≤ Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit)
**Companies:** Amazon, Bloomberg, Capital One, Ebay, Google, Meta, Microsoft, Moloco, Nvidia, Phonepe, Salesforce, Sumologic, Uber, Visa, Yandex

---

## 1. Problem Description

You are given an array of integers `nums` and an integer `limit`.

Return the size of the **longest non-empty subarray** such that the **absolute** difference between **every pair of elements** in this **subarray** is **less than or equal** to `limit`*.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= limit <= 10^9`

## 2. Examples

**Example 1:**
```
Input: nums = [8,2,4,7], limit = 4
Output: 2
Explanation: Checking every subarray, where the absolute difference is taken over all pairs of its elements:
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |4-2| = 2 <= 4.
[2,4,7] with maximum absolute diff |7-2| = 5 > 4. Note that the pair (2, 7) is not adjacent, but it is still compared.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |7-4| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4.
Therefore, the size of the longest subarray is 2.
```

**Example 2:**
```
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4
Explanation: The subarray [2,4,7,2] is valid because every pair of its elements differs by at most 5, the largest being |7-2| = 5.
It cannot be extended to the left, since [1,2,4,7,2] contains the pair (1, 7) with |7-1| = 6 > 5. Therefore, the size of the longest subarray is 4.
```

**Example 3:**
```
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
Explanation: Since limit = 0, every pair of elements in the subarray must be equal, so only runs of identical values qualify.
The longest such run is [2,2,2], of size 3.
```

## 3. Approach: Sliding Window + Two Deques — O(n) ✅

```
FUNCTION longestSubarray(nums, limit):
    maxDeque ← deque()    // decreasing, stores potential max values
    minDeque ← deque()    // increasing, stores potential min values
    left ← 0
    maxLen ← 0

    FOR right ← 0 TO LENGTH(nums) - 1:
        // maintain decreasing maxDeque
        WHILE maxDeque NOT EMPTY AND nums[right] > maxDeque.BACK():
            maxDeque.POP_BACK()
        maxDeque.PUSH_BACK(nums[right])

        // maintain increasing minDeque
        WHILE minDeque NOT EMPTY AND nums[right] < minDeque.BACK():
            minDeque.POP_BACK()
        minDeque.PUSH_BACK(nums[right])

        // shrink window until condition holds
        WHILE maxDeque.FRONT() - minDeque.FRONT() > limit:
            IF maxDeque.FRONT() == nums[left]:
                maxDeque.POP_FRONT()
            IF minDeque.FRONT() == nums[left]:
                minDeque.POP_FRONT()
            left ← left + 1

        maxLen ← MAX(maxLen, right - left + 1)

    RETURN maxLen
```

## 4. Walkthrough

Take `nums = [10,1,2,4,7,2]`, `limit = 5`.
1. `right=0` → maxDeque=[10], minDeque=[10]; window `[10]`, length 1.
2. `right=1` → insert 1: maxDeque stays [10], minDeque becomes [1]; diff=9>5, shrink left: remove 10, left=1. Window `[1]`.
3. `right=2` → add 2: maxDeque=[2], minDeque=[1,2]; diff=1≤5, window `[1,2]`, length 2.
4. `right=3` → add 4: maxDeque=[4], minDeque=[1,2,4]; diff=3≤5, window `[1,2,4]`, length 3.
5. `right=4` → add 7: maxDeque=[7], minDeque=[1,2,4,7]; diff=6>5, shrink left (remove 1). New diff=6>5, shrink left (remove 2). New diff=5≤5, window `[4,7]`, length 2.
6. `right=5` → add 2: maxDeque=[7,2], minDeque=[2]; diff=5≤5, window `[4,7,2]` (indices 3‑5), length 3.
Maximum length observed is 4 for subarray `[2,4,7,2]`.

## 5. Complexity Analysis

- **Time**: O(n) – each element enters and leaves the deques at most once.
- **Space**: O(n) in the worst case for the two deques (actually O(window size)).

## 6. Follow-Up Questions

- How would the solution change if the array were streamed and you could only keep O(1) extra memory?
- Can you adapt the algorithm to return the actual subarray indices instead of just the length?
- What if the condition were `max - min < limit` (strict) or involved other statistics like sum?

## 7. Key Takeaway

> Two monotonic deques maintain the current window's maximum and minimum in O(1). Expand the right pointer, and shrink the left pointer whenever the range exceeds the limit, yielding a linear‑time solution.