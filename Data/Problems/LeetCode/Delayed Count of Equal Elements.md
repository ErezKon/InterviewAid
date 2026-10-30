# 3837. Delayed Count of Equal Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delayed-count-of-equal-elements](https://leetcode.com/problems/delayed-count-of-equal-elements)
**Companies:** Mitsogo

---

## Problem Description

You are given an integer array `nums` of length `n` and an integer `k`.

For each index `i`, define the **delayed count** as the number of indices `j` such that:

- `i + k < j <= n - 1`, and
- `nums[j] == nums[i]`

Return an array `ans` where `ans[i]` is the **delayed count** of index `i`.

**Constraints:**

- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `0 <= k <= n - 1`

---

## Examples

```
Example 1:
  Input: nums = [1,2,1,1], k = 1
  Output: [2,0,0,0]
  Explanation:
  | i | nums[i] | possible j | nums[j] | satisfying nums[j] == nums[i] | ans[i] |
  |---|---------|------------|---------|-------------------------------|--------|
  | 0 | 1       | [2, 3]     | [1, 1]  | [2, 3]                        | 2      |
  | 1 | 2       | [3]        | [1]     | []                            | 0      |
  | 2 | 1       | []         | []      | []                            | 0      |
  | 3 | 1       | []         | []      | []                            | 0      |
  Thus, ans = [2, 0, 0, 0].
```

```
Example 2:
  Input: nums = [3,1,3,1], k = 0
  Output: [1,1,0,0]
  Explanation:
  | i | nums[i] | possible j | nums[j]   | satisfying nums[j] == nums[i] | ans[i] |
  |---|---------|------------|-----------|-------------------------------|--------|
  | 0 | 3       | [1, 2, 3]  | [1, 3, 1] | [2]                           | 1      |
  | 1 | 1       | [2, 3]     | [3, 1]    | [3]                           | 1      |
  | 2 | 3       | [3]        | [1]       | []                            | 0      |
  | 3 | 1       | []         | []        | []                            | 0      |
  Thus, ans = [1, 1, 0, 0].
```

---

## Approach

```
FUNCTION delayedCount(stream, d):
    // hashmap to store frequencies
    freq = {}
    // queue to hold elements waiting for delay
    waitQueue = []
    result = []
    FOR element IN stream:
        // add element to waiting queue
        waitQueue.APPEND(element)
        // if queue size exceeds delay, finalize count for oldest element
        IF LENGTH(waitQueue) > d:
            oldest = waitQueue.POP_FRONT()
            freq[oldest] = freq.get(oldest, 0) + 1
        // current count for this element is its frequency so far (excluding waiting ones)
        result.APPEND(freq.get(element, 0))
    // finalize remaining elements after stream ends (optional based on problem spec)
    RETURN result
```

---

## Walkthrough

1. Initialize empty hashmap `freq` and empty queue `waitQueue`.
2. For each incoming element, push it onto `waitQueue`.
3. When `waitQueue` length exceeds the delay `d`, pop the front element, increment its count in `freq`.
4. The output for the current element is the current frequency of that element in `freq` (i.e., counts that have already been finalized).
5. Continue until the stream ends; any remaining elements in the queue are not counted until their delay expires.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each element is processed a constant number of times |
| **Space** | O(m) – hashmap for distinct elements plus queue of size ≤ delay |

---

## Follow-Up Questions

- How would you adapt the solution if the delay is dynamic per element?
- Can you support decrement operations where an element’s count should be reduced after a certain condition?

---

## Key Takeaway

> **Use a hashmap for frequencies combined with a sliding‑window‑style queue to enforce the required delay before counts become visible.**