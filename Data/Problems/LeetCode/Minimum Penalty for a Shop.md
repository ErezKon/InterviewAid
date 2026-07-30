# 2483. Minimum Penalty for a Shop

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-penalty-for-a-shop](https://leetcode.com/problems/minimum-penalty-for-a-shop)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Stripe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sum — O(n)](#4-approach-prefix-sum--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A shop has a string `customers` of `'Y'` (customer arrives) and `'N'` (no customer) for each hour. If you close at hour `j`:
- Penalty of `1` for each `'N'` before hour `j` (shop open but no customer)
- Penalty of `1` for each `'Y'` at or after hour `j` (customer arrives but shop closed)

Return the **earliest hour** at which the penalty is minimized.

**Constraints:**
- `1 <= customers.length <= 10⁵`
- `customers[i]` is `'Y'` or `'N'`

---

## 2. Examples

```
Example 1:
  Input: customers = "YYNY"
  Output: 2
  Explanation:
    Close at 0: 0 N's before + 3 Y's after = 3
    Close at 1: 0 N's + 2 Y's = 2
    Close at 2: 0 N's + 1 Y = 1  ← min
    Close at 3: 1 N + 1 Y = 2
    Close at 4: 1 N + 0 Y = 1 (tie, but 2 is earlier)

Example 2:
  Input: customers = "NNNNN"
  Output: 0
  Explanation: No customers at all, close immediately.
```

---

## 3. Key Insight

> Penalty at hour `j` = `(N's in [0..j-1]) + (Y's in [j..n-1])`. As we move the closing hour right by 1: if `customers[j] == 'Y'`, penalty decreases by 1 (one fewer missed customer); if `'N'`, penalty increases by 1 (one more wasted open hour).

Track the running penalty and record the minimum.

---

## 4. Approach: Prefix Sum — O(n) ✅

```
FUNCTION bestClosingTime(customers):
    // Penalty = Y's after closing + N's before closing
    totalY = COUNT('Y' in customers)
    minPenalty = totalY    // close at hour 0
    bestHour = 0
    penalty = totalY

    FOR i ← 0 TO n - 1:
        IF customers[i] == 'Y':
            penalty -= 1    // one less Y after
        ELSE:
            penalty += 1    // one more N before

        IF penalty < minPenalty:
            minPenalty = penalty
            bestHour = i + 1

    RETURN bestHour
```

---

## 5. Walkthrough

```
customers = "YYNY"
totalY = 3, penalty = 3, bestHour = 0

i=0: 'Y' → penalty=2, 2 < 3 → bestHour=1
i=1: 'Y' → penalty=1, 1 < 2 → bestHour=2
i=2: 'N' → penalty=2, not better
i=3: 'Y' → penalty=1, 1 == 1 → not strictly less, no update

Answer: bestHour = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: Why start penalty at totalY?**
Closing at hour 0 means the shop is never open, so all Y's are missed (penalty = totalY) and no N's are before closing (0).

**Q2: What if there are ties?**
We use strict `<` for the update, so we automatically pick the **earliest** hour with minimum penalty.

**Q3: How does this relate to prefix sums?**
The penalty at hour `j` = `prefixN[j] + suffixY[j]`. The running computation avoids materializing the prefix arrays.

---

## 8. Key Takeaway

> **Incremental penalty tracking** — instead of computing penalty independently for each closing hour, track how it changes as you advance: `'Y'` decreases it, `'N'` increases it. Classic prefix sum optimization.
