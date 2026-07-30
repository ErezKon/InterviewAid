# 3524. Find X Value of Array I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-x-value-of-array-i](https://leetcode.com/problems/find-x-value-of-array-i)
**Companies:** Rubrik

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and an integer `k`, for each `x` in the range `[0, k-1]` count the number of subsequences whose product modulo `k` equals `x`.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `1 ≤ k ≤ 50`
- Elements of `nums` are positive integers.

---

## 2. Key Insight

> Track DP over product remainders modulo `k`. For each element, update the remainder counts by multiplying existing subsequence products by the new element.

---

## 3. Approach

```text
FUNCTION findXValue(nums, k):
    // dp[r] = number of subsequences with product % k == r
    dp ← array of k zeros
    dp[1 % k] ← 1  // empty subsequence contributes remainder 1
    result ← array of k zeros

    FOR num IN nums DO
        newDp ← array of k zeros
        FOR r ← 0 TO k-1 DO
            IF dp[r] > 0 THEN
                newR ← (r * num) % k
                newDp[newR] += dp[r]
        // include subsequence consisting of only current element
        newDp[num % k] += 1
        dp ← dp + newDp   // element‑wise addition
    END FOR

    RETURN dp   // dp now holds counts for each remainder x
```

---

## 4. Examples

**Example 1**
```
Input: nums = [2,3,4], k = 5
Output: [1,0,1,0,1]
Explanation: Subsequences and their products mod 5:
- [] → 1 (treated as remainder 1)
- [2] → 2
- [3] → 3
- [4] → 4
- [2,3] → 6 % 5 = 1
- [2,4] → 8 % 5 = 3
- [3,4] → 12 % 5 = 2
- [2,3,4] → 24 % 5 = 4
Counts for remainders 0‑4 are [1,0,1,0,1].
```

**Example 2**
```
Input: nums = [1,1,1], k = 2
Output: [4,4]
Explanation: Every subsequence product is 1, so remainder 1 occurs 4 times (including empty). Remainder 0 never occurs.
```

---

## 5. Walkthrough

Consider `nums = [2,3]`, `k = 4`.
| Step | Processed element | dp before | Updates performed | dp after |
|------|-------------------|-----------|-------------------|----------|
| 0    | –                 | [0,0,0,0] | –                 | [0,0,0,0] |
| 1    | 2                 | [0,0,0,0] | newDp[2] += 1     | [0,0,1,0] |
| 2    | 3                 | [0,0,1,0] | from r=2 → newR= (2*3)%4 = 2, newDp[2] +=1; also single 3 → newDp[3] +=1 | [0,0,2,1] |
Result: remainder 2 appears twice, remainder 3 once.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) |
| **Space** | O(k) |

---

## 7. Follow-Up Questions

- How would you extend the solution to handle negative numbers in `nums`?
- Can the approach be adapted to count subsequences with sum modulo `k` instead of product?
- What changes are needed if the query asks for a specific `x` rather than all remainders?

---

## 8. Key Takeaway

> **DP on product remainders** – maintain counts of subsequences for each remainder and update them multiplicatively for each new element.
