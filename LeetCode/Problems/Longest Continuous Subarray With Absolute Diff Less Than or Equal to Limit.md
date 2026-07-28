# 1438. Longest Continuous Subarray With Absolute Diff ≤ Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit)
**Companies:** Amazon, Bloomberg, Capital One, Ebay, Google, Meta, Microsoft, Moloco, Nvidia, Phonepe, Salesforce, Sumologic, Uber, Visa, Yandex

---

## 1. Problem Description

Find the longest contiguous subarray where `max - min ≤ limit`.

## 2. Examples

| nums | limit | Output |
|------|-------|--------|
| [8,2,4,7] | 4 | 2 |
| [10,1,2,4,7,2] | 5 | 4 |
| [4,2,2,2,4,4,2,2] | 0 | 3 |

*Explanation*: In the first example, the longest subarray satisfying the condition is `[2,4]` (or `[4,7]`).

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