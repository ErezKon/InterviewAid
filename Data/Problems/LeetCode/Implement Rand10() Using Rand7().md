# 470. Implement Rand10() Using Rand7()

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-rand10-using-rand7](https://leetcode.com/problems/implement-rand10-using-rand7)
**Companies:** Bloomberg, De Shaw, Google, Linkedin, Microsoft, Tencent, Tiktok, Yandex

---

## Problem Description

Given the **API** `rand7()` that generates a uniform random integer in the range `[1, 7]`, write a function `rand10()` that generates a uniform random integer in the range `[1, 10]`. You can only call the API `rand7()`, and you shouldn't call any other API. Please **do not** use a language's built-in random API.

Each test case will have one **internal** argument `n`, the number of times that your implemented function `rand10()` will be called while testing. Note that this is **not an argument** passed to `rand10()`.

**Follow up:**

- What is the expected value for the number of calls to `rand7()` function?
- Could you minimize the number of calls to `rand7()`?

**Constraints:**
- `1 <= n <= 10^5`

## Examples

**Example 1:**
```
Input: n = 1
Output: [2]
```

**Example 2:**
```
Input: n = 2
Output: [2,8]
```

**Example 3:**
```
Input: n = 3
Output: [3,8,10]
```

## Approach
Apply rejection sampling to generate a larger uniform range and map it to `[1,10]`.
1. Generate a number in `[1,49]` using two calls to `rand7()`:
   `num = (rand7() - 1) * 7 + rand7()`.
2. If `num` ≤ 40, return `(num - 1) % 10 + 1`.
3. Otherwise reject and repeat.
The accepted range size (40) is a multiple of 10, ensuring uniformity.

```text
FUNCTION rand10():
    WHILE true:
        SET num ← (rand7() - 1) * 7 + rand7()  // uniform 1-49
        IF num ≤ 40:
            RETURN (num - 1) % 10 + 1
```

## Walkthrough
| Iteration | rand7() calls | num (1-49) | Accepted? | Output |
|-----------|---------------|------------|-----------|--------|
| 1        | 3, 5          |  (3-1)*7+5 = 19 | yes |  (19-1)%10+1 = 9 |
| 2        | 7, 7          |  (7-1)*7+7 = 49 | no  | repeat |
| 2 (retry)| 2, 4          |  (2-1)*7+4 = 11 | yes | (11-1)%10+1 = 1 |

## Complexity Analysis
- **Time:** Expected O(1) calls to `rand7()` (≈ 2.4 on average) due to rejection sampling.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you implement `rand10()` if only `rand5()` were available?
2. Can you design a method that guarantees O(1) worst-case time using a pre-computed table?
3. How would you extend the technique to generate `randM()` from `randN()` for arbitrary `M` and `N`?

## Key Takeaway
Rejection sampling expands a smaller uniform source into a larger range, discarding out-of-range values to achieve exact uniformity.
