# 2398. Maximum Number of Robots Within Budget

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-robots-within-budget](https://leetcode.com/problems/maximum-number-of-robots-within-budget)
**Companies:** Amazon, Inmobi

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` robots. You are given two **0-indexed** integer arrays, `chargeTimes` and `runningCosts`, both of length `n`. The `i`th robot costs `chargeTimes[i]` units to charge and costs `runningCosts[i]` units to run. You are also given an integer `budget`.

The **total cost** of running `k` chosen robots is equal to `max(chargeTimes) + k * sum(runningCosts)`, where `max(chargeTimes)` is the largest charge cost among the `k` robots and `sum(runningCosts)` is the sum of running costs among the `k` robots.

Return *the **maximum** number of **consecutive** robots you can run such that the total cost **does not** exceed* `budget`.

**Constraints:**
- `chargeTimes.length == runningCosts.length == n`
- `1 <= n <= 5 × 10^4`
- `1 <= chargeTimes[i], runningCosts[i] <= 10^5`
- `1 <= budget <= 10^15`

---

## Examples

```
Example 1:
  Input: chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
  Output: 3
  Explanation:
    It is possible to run all individual and consecutive pairs of robots within budget.
    To obtain answer 3, consider the first 3 robots. The total cost will be max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 which is less than 25.
    It can be shown that it is not possible to run more than 3 consecutive robots within budget, so we return 3.
```

```
Example 2:
  Input: chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
  Output: 0
  Explanation: No robot can be run that does not exceed the budget, so we return 0.
```

---

## Key Insight

> **Sliding window** with a **monotonic deque** for the sliding max of `chargeTimes` and a running sum for `runningCosts`. Expand the window, and shrink from the left when cost exceeds budget.

---

## Approach

```
FUNCTION maximumRobots(chargeTimes, runningCosts, budget)
    deque ← monotonic deque (decreasing) for max charge time
    sumCost ← 0
    left ← 0
    result ← 0

    FOR right ← 0 TO n - 1 DO
        // Add right to window
        WHILE deque NOT EMPTY AND chargeTimes[deque.BACK] ≤ chargeTimes[right] DO
            deque.POP_BACK()
        deque.PUSH_BACK(right)
        sumCost ← sumCost + runningCosts[right]

        k ← right - left + 1
        // Shrink if over budget
        WHILE left ≤ right AND chargeTimes[deque.FRONT] + k × sumCost > budget DO
            sumCost ← sumCost - runningCosts[left]
            IF deque.FRONT = left THEN deque.POP_FRONT()
            left ← left + 1
            k ← right - left + 1

        result ← MAX(result, right - left + 1)

    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — each element enters/leaves deque once |
| Space  | **O(n)** — monotonic deque |

---

## Follow-Up Questions

1. **Why a monotonic deque?**
   It maintains the sliding window maximum in O(1) amortized per operation.

2. **Could we binary search on k instead?**
   Yes — binary search on window size, check each size with a sliding window. O(n log n) vs O(n).

---

## Key Takeaway

> **Sliding window + monotonic deque** — maintain max(chargeTimes) and sum(runningCosts) in a variable-width window, shrinking when the cost exceeds budget.
