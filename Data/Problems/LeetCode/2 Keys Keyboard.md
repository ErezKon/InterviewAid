# 650. 2 Keys Keyboard

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/2-keys-keyboard](https://leetcode.com/problems/2-keys-keyboard)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prime Factorization — O(√n) ✅](#4-approach-prime-factorization--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There is only one character `'A'` on the screen. You can perform two operations:
- **Copy All:** Copy all characters on screen to clipboard.
- **Paste:** Paste the clipboard content.

Given an integer `n`, return the **minimum number of operations** to get exactly `n` `'A'`s on screen.

**Constraints:**
- `1 ≤ n ≤ 1000`

---

## 2. Examples

```
Example 1:
  Input:  n = 3
  Output: 3
  Explanation: Copy All (1 A on clipboard), Paste (2 A's), Paste (3 A's)

Example 2:
  Input:  n = 1
  Output: 0
  Explanation: Already have 1 A, no operations needed.

Example 3:
  Input:  n = 12
  Output: 7
  Explanation: Copy, Paste, Paste (3 A's = 3 ops)
               Copy, Paste, Paste, Paste (12 A's = 3+4 = 7 ops)
```

Visual for n=12:
```
A → Copy,Paste,Paste → AAA (3 ops, factor 3)
      → Copy,Paste,Paste,Paste → AAAAAAAAAAAA (4 ops, factor 4 = 2×2)
Total: 3 + 2 + 2 = 7 ops  (prime factors of 12: 2,2,3)
```

---

## 3. Key Insight

> The minimum operations to reach `n` A's equals the **sum of prime factors** of `n`. Each prime factor `p` contributes exactly `p` operations: 1 Copy + (p-1) Pastes, which multiplies the current count by `p`.

---

## 4. Approach: Prime Factorization — O(√n) ✅

```
FUNCTION minSteps(n):
    steps = 0
    d = 2
    WHILE n > 1:
        WHILE n % d == 0:
            steps += d
            n /= d
        d += 1
    RETURN steps
```

Each time we find a factor `d`, we add `d` to steps (1 copy + (d-1) pastes) and divide `n` by `d`.

---

## 5. Walkthrough

```
n = 12  (prime factorization: 2 × 2 × 3)

d=2: 12 % 2 == 0 → steps += 2 = 2, n = 6
     6 % 2 == 0  → steps += 2 = 4, n = 3
     3 % 2 ≠ 0   → move on
d=3: 3 % 3 == 0  → steps += 3 = 7, n = 1
     n == 1       → exit

Result: 7 ✅

Meaning: A → AA (copy,paste=2) → AAAA (copy,paste=2) → AAAAAAAAAAAA (copy,paste,paste=3)
         1     2                    4                      12
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(√n) — trial division up to √n |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 Why does sum of prime factors work?

To multiply current count by `k`, you need 1 Copy + (k-1) Pastes = `k` operations. The optimal strategy is to decompose `n` into prime factors and apply each multiplication. Non-prime factors are always worse: multiplying by 6 costs 6 ops, but multiplying by 2 then 3 costs 5 ops.

### 7.2 Can this be solved with DP?

Yes. `dp[i] = min operations to reach i A's`:

```
dp[1] = 0
FOR i ← 2 TO n:
    FOR j ← 2 TO i:
        IF i % j == 0:
            dp[i] = dp[i/j] + j
            BREAK
```

Time: O(n√n). The prime factorization approach is faster.

### 7.3 What about 4 Keys Keyboard (LeetCode #651)?

With additional `Ctrl-A` (select all) and `Ctrl-C` (copy), the strategy changes. For large `n`, the optimal approach involves sequences of select-copy-paste-paste-paste (multiply by 3-5 each time). Requires DP.

---

## 8. Key Takeaway

> The minimum operations to produce `n` A's is the sum of `n`'s prime factors. This elegant math insight transforms an apparent DP/BFS problem into simple prime factorization in O(√n).
