# 470. Implement Rand10() Using Rand7()

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-rand10-using-rand7](https://leetcode.com/problems/implement-rand10-using-rand7)
**Companies:** Bloomberg, De Shaw, Google, Linkedin, Microsoft, Tencent, Tiktok, Yandex
---

## 1. Problem Description

Given the **API** `rand7()` that generates a uniform random integer in the range `[1, 7]`, write a function `rand10()` that generates a uniform random integer in the range `[1, 10]`. You can only call the API `rand7()`, and you shouldn't call any other API. Please **do not** use a language's built-in random API.

Each test case will have one **internal** argument `n`, the number of times that your implemented function `rand10()` will be called while testing. Note that this is **not an argument** passed to `rand10()`.

**Follow up:**

- What is the expected value for the number of calls to `rand7()` function?
- Could you minimize the number of calls to `rand7()`?

**Constraints:**
- `1 <= n <= 10^5`

---

## 2. Approach: Rejection Sampling — Expected O(1) ✅

Generate a uniform number in a larger range (1‑49) using two calls to `rand7()`. Accept numbers 1‑40 and map them to 1‑10; reject 41‑49 and retry.

```
FUNCTION rand10():
    WHILE true:
        // Uniform [1, 49]
        SET num ← (rand7() - 1) * 7 + rand7()
        IF num ≤ 40:
            RETURN (num - 1) % 10 + 1
```

---

## 3. Examples

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

---

## 4. Walkthrough

1. Call `rand7()` twice → 3 and 5 → compute `num = 19` (≤40). Return `(19‑1)%10+1 = 9`.
2. If `num` had been 44 (>40), the loop repeats until an accepted value is produced.

---

## 5. Complexity Analysis

- **Time**: Expected O(1) calls to `rand7()` (rejection probability 9/49). Worst‑case unbounded but rare.
- **Space**: O(1).

---

## 6. Follow‑Up Questions

- How to generate `rand10()` using only `rand5()`?
- Can you reduce the expected number of `rand7()` calls?
- How to generate numbers in a different range efficiently?

---

## Key Takeaway

> **Rejection sampling**: create a larger uniform range, accept only values that map evenly to the target range, and retry on rejects. This yields an expected constant number of base random calls.
