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

You are given an array of **positive** integers `nums`, and a **positive** integer `k`.

You are allowed to perform an operation **once** on `nums`, where in each operation you can remove any **non-overlapping** prefix and suffix from `nums` such that `nums` remains **non-empty**.

You need to find the **x-value** of `nums`, which is the number of ways to perform this operation so that the **product** of the remaining elements leaves a *remainder* of `x` when divided by `k`.

Return an array `result` of size `k` where `result[x]` is the **x-value** of `nums` for `0 <= x <= k - 1`.

A **prefix** of an array is a subarray that starts from the beginning of the array and extends to any point within it.

A **suffix** of an array is a subarray that starts at any point within the array and extends to the end of the array.

**Note** that the prefix and suffix to be chosen for the operation can be **empty**.

**Constraints:**
- `1 <= nums[i] <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= k <= 5`

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

**Example 1:**
```
Input: nums = [1,2,3,4,5], k = 3
Output: [9,2,4]
Explanation: - For x = 0, the possible operations include all possible ways to remove non-overlapping prefix/suffix that do not remove nums[2] == 3.
- For x = 1, the possible operations are:
- Remove the empty prefix and the suffix [2, 3, 4, 5]. nums becomes [1].
- Remove the prefix [1, 2, 3] and the suffix [5]. nums becomes [4].
- For x = 2, the possible operations are:
- Remove the empty prefix and the suffix [3, 4, 5]. nums becomes [1, 2].
- Remove the prefix [1] and the suffix [3, 4, 5]. nums becomes [2].
- Remove the prefix [1, 2, 3] and the empty suffix. nums becomes [4, 5].
- Remove the prefix [1, 2, 3, 4] and the empty suffix. nums becomes [5].
```

**Example 2:**
```
Input: nums = [1,2,4,8,16,32], k = 4
Output: [18,1,2,0]
Explanation: - For x = 0, the only operations that do not result in x = 0 are:
- Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
- Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
- Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
- For x = 1, the only possible operation is:
- Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
- For x = 2, the possible operations are:
- Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
- Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
- For x = 3, there is no possible way to perform the operation.
```

**Example 3:**
```
Input: nums = [1,1,2,1,1], k = 2
Output: [9,6]
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
