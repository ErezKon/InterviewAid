# 651. 4 Keys Keyboard

**Difficulty:** 🟡 Medium
**Companies:** Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n²) ✅](#4-approach-dp--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have a special keyboard with four keys:
- **Key 1:** Print `'A'` on screen
- **Key 2:** Select All (`Ctrl-A`)
- **Key 3:** Copy (`Ctrl-C`)
- **Key 4:** Paste (`Ctrl-V`)

Given `n` key presses, find the **maximum number of `'A'`s** you can produce.

**Constraints:**
- `1 ≤ n ≤ 50`

---

## 2. Examples

```
Example 1:
  Input:  n = 3
  Output: 3
  Explanation: A, A, A (just type 3 times)

Example 2:
  Input:  n = 7
  Output: 9
  Explanation: A,A,A, Ctrl-A, Ctrl-C, Ctrl-V, Ctrl-V
               → 3 A's, then select+copy+paste+paste = ×3 = 9
```

Visual for n=7:
```
Step: 1  2  3  4       5       6       7
Key:  A  A  A  Ctrl-A  Ctrl-C  Ctrl-V  Ctrl-V
Screen: A → AA → AAA → [AAA] → [AAA] → AAAAAA → AAAAAAAAA
Count:  1    2    3      3       3        6         9
```

---

## 3. Key Insight

> After `i` key presses, if we use Select All + Copy (2 presses), each subsequent Paste multiplies the count. So `j - i - 1` Pastes after position `i` multiply by `(j - i - 1)`. The optimal strategy is choosing the best "multiply point" — typically multiplying by 3, 4, or 5.

---

## 4. Approach: DP — O(n²) ✅

`dp[i]` = max A's achievable in `i` key presses.

For each position `i`, consider using `Ctrl-A, Ctrl-C` at step `i`, then pasting `(j - i - 1)` times to fill up to step `j`.

```
FUNCTION maxA(n):
    dp = [0] * (n + 1)
    FOR i ← 1 TO n: dp[i] = i
    FOR i ← 1 TO n:
        FOR j ← i + 3 TO n:
            dp[j] = MAX(dp[j], dp[i] * (j - i - 1))
    RETURN dp[n]
```

Why `i + 3`? You need at least 3 keys after position `i`: Select All, Copy, Paste (×2 multiply). Fewer keys are never better than just typing A's.

---

## 5. Walkthrough

```
n = 7
Initial: dp = [0, 1, 2, 3, 4, 5, 6, 7]

i=1 (dp[1]=1):
  j=4: dp[4] = max(4, 1×2) = 4
  j=5: dp[5] = max(5, 1×3) = 5
  j=6: dp[6] = max(6, 1×4) = 6
  j=7: dp[7] = max(7, 1×5) = 7

i=2 (dp[2]=2):
  j=5: dp[5] = max(5, 2×2) = 5
  j=6: dp[6] = max(6, 2×3) = 6
  j=7: dp[7] = max(7, 2×4) = 8

i=3 (dp[3]=3):
  j=6: dp[6] = max(6, 3×2) = 6
  j=7: dp[7] = max(8, 3×3) = 9  ←

i=4 (dp[4]=4):
  j=7: dp[7] = max(9, 4×2) = 9

Result: dp[7] = 9 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

### 7.1 What's the optimal multiplier?

For large `n`, the optimal strategy is repeatedly multiplying by **3** or **4**. Multiplying by 3 costs 4 keys (select+copy+paste+paste), multiplying by 4 costs 5 keys. The per-key efficiency: 3^(1/4) ≈ 1.316 vs 4^(1/5) ≈ 1.320 — almost identical, with 4 slightly better.

### 7.2 How does this relate to 2 Keys Keyboard (#650)?

| Feature | 2 Keys Keyboard | 4 Keys Keyboard |
|---------|-----------------|-----------------|
| Operations | Copy All, Paste | Print A, Ctrl-A, Ctrl-C, Ctrl-V |
| Goal | Reach exactly n | Maximize A's in n presses |
| Solution | Prime factorization | DP with multiply windows |

### 7.3 Is there a closed-form solution?

For large `n`, the answer grows as `O(3^(n/4))` or equivalently `O(4^(n/5))`. No simple closed form, but the exponential growth rate is clear.

---

## 8. Key Takeaway

> The key DP transition is: at any point `i`, you can "lock in" your current count and multiply it by `(j - i - 1)` using select+copy+paste×k. The optimal strategy balances typing A's early against multiplying later.
