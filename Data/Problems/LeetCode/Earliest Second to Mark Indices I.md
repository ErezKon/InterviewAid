# 3048. Earliest Second to Mark Indices I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/earliest-second-to-mark-indices-i](https://leetcode.com/problems/earliest-second-to-mark-indices-i)
**Companies:** Mathworks

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search + Greedy Check](#approach-binary-search--greedy-check)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two **1-indexed** integer arrays, `nums` and, `changeIndices`, having lengths `n` and `m`, respectively.

Initially, all indices in `nums` are unmarked. Your task is to mark **all** indices in `nums`.

In each second, `s`, in order from `1` to `m` (**inclusive**), you can perform **one** of the following operations:

- Choose an index `i` in the range `[1, n]` and **decrement** `nums[i]` by `1`.
- If `nums[changeIndices[s]]` is **equal** to `0`, **mark** the index `changeIndices[s]`.
- Do nothing.

Return *an integer denoting the **earliest second** in the range *`[1, m]`* when **all** indices in *`nums`* can be marked by choosing operations optimally, or *`-1`* if it is impossible.*

**Constraints:**
- `1 <= n == nums.length <= 2000`
- `0 <= nums[i] <= 10^9`
- `1 <= m == changeIndices.length <= 2000`
- `1 <= changeIndices[i] <= n`

---

## Examples

**Example 1:**
```
Input: nums = [2,2,0], changeIndices = [2,2,2,2,3,2,2,1]
Output: 8
Explanation: In this example, we have 8 seconds. The following operations can be performed to mark all indices:
Second 1: Choose index 1 and decrement nums[1] by one. nums becomes [1,2,0].
Second 2: Choose index 1 and decrement nums[1] by one. nums becomes [0,2,0].
Second 3: Choose index 2 and decrement nums[2] by one. nums becomes [0,1,0].
Second 4: Choose index 2 and decrement nums[2] by one. nums becomes [0,0,0].
Second 5: Mark the index changeIndices[5], which is marking index 3, since nums[3] is equal to 0.
Second 6: Mark the index changeIndices[6], which is marking index 2, since nums[2] is equal to 0.
Second 7: Do nothing.
Second 8: Mark the index changeIndices[8], which is marking index 1, since nums[1] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 8th second.
Hence, the answer is 8.
```

**Example 2:**
```
Input: nums = [1,3], changeIndices = [1,1,1,2,1,1,1]
Output: 6
Explanation: In this example, we have 7 seconds. The following operations can be performed to mark all indices:
Second 1: Choose index 2 and decrement nums[2] by one. nums becomes [1,2].
Second 2: Choose index 2 and decrement nums[2] by one. nums becomes [1,1].
Second 3: Choose index 2 and decrement nums[2] by one. nums becomes [1,0].
Second 4: Mark the index changeIndices[4], which is marking index 2, since nums[2] is equal to 0.
Second 5: Choose index 1 and decrement nums[1] by one. nums becomes [0,0].
Second 6: Mark the index changeIndices[6], which is marking index 1, since nums[1] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 6th second.
Hence, the answer is 6.
```

**Example 3:**
```
Input: nums = [0,1], changeIndices = [2,2,2]
Output: -1
Explanation: In this example, it is impossible to mark all indices because index 1 isn't in changeIndices.
Hence, the answer is -1.
```

---

## Key Insight

> **Binary search on the answer.** For a given deadline `t`, check feasibility greedily: for each index, its **last occurrence** in `changeIndices[1..t]` is the latest moment to mark it. Reserve that second for marking. All other seconds are "free" for decrementing. Count if free seconds ≥ total decrements needed.

---

## Approach: Binary Search + Greedy Check

```
FUNCTION earliestSecondToMarkIndices(nums, changeIndices):
    FUNCTION canFinish(t):
        lastOccurrence = {} // index → last second it appears in changeIndices[1..t]
        FOR s ← 1 TO t:
            lastOccurrence[changeIndices[s]] = s

        IF any index not in lastOccurrence: RETURN false

        freeSeconds = 0
        FOR s ← 1 TO t:
            idx = changeIndices[s]
            IF s == lastOccurrence[idx]:
                // Must mark idx now — need nums[idx] free seconds before this
                freeSeconds -= nums[idx]
                IF freeSeconds < 0: RETURN false
            ELSE:
                freeSeconds += 1
        RETURN true

    lo = 1, hi = m, ans = -1
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF canFinish(mid): ans = mid; hi = mid - 1
        ELSE: lo = mid + 1
    RETURN ans
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(m × log m) | Binary search × O(m) feasibility check |
| **Space** | O(n) | Last occurrence map |

---

## Key Takeaway

> **Binary search on deadline + greedy feasibility: reserve the last occurrence of each index for marking, use remaining seconds for decrements. Classic "binary search on answer" pattern.**
