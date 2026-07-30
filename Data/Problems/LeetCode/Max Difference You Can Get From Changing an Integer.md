# 1432. Max Difference You Can Get From Changing an Integer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer](https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer)
**Companies:** Amazon, Bloomberg, Google, Mercari, Meta, Trexquant

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Digit Replacement — O(d)](#approach-greedy-digit-replacement--od-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer `num`, you will apply the following operation **exactly twice**:
- Pick a digit `d` (0–9) in `num` and a replacement digit `x` (0–9).
- Replace **all** occurrences of `d` with `x`. The result must not have leading zeros and must be positive.

Maximize the difference between the two resulting integers (`a - b`), where `a` is obtained from the first operation and `b` from the second.

**Constraints:**
- `1 ≤ num ≤ 10⁸`

---

## Examples

**Example 1:**
```
Input:  num = 555
Output: 888
Explanation: a = 999 (replace 5→9), b = 111 (replace 5→1) → 999 - 111 = 888
```

**Example 2:**
```
Input:  num = 9
Output: 8
Explanation: a = 9 (already max), b = 1 (replace 9→1) → 9 - 1 = 8
```

---

## Key Insight

> **To maximize `a`:** replace the first non-9 digit (and all its occurrences) with 9.
> **To minimize `b`:** if the leading digit isn't 1, replace it (and all its occurrences) with 1. Otherwise, find the first non-0, non-leading-digit character and replace it with 0 — this avoids leading zeros.

---

## Approach: Greedy Digit Replacement — O(d) ✅

```
FUNCTION maxDiff(num):
    s = str(num)
    // Maximize: replace first non-9 digit with 9
    high = s
    FOR d IN s:
        IF d != '9':
            high = s.replace(d, '9')
            BREAK

    // Minimize: replace first digit > 1 (if leading, use 1; else use 0)
    low = s
    FOR i, d IN enumerate(s):
        IF i == 0 AND d != '1':
            low = s.replace(d, '1')
            BREAK
        ELSE IF i > 0 AND d != '0' AND d != s[0]:
            low = s.replace(d, '0')
            BREAK

    RETURN int(high) - int(low)
```

---

## Walkthrough

```
num = 1101057
s   = "1101057"
```

**Maximize (→ high):**
- Scan digits: `1` ≠ 9 → replace all `1`'s with `9` → `"9909057"` → 9909057

**Minimize (→ low):**
- `i=0`, `d='1'` → already 1, skip.
- `i=1`, `d='1'` → same as `s[0]` ('1'), skip.
- `i=2`, `d='0'` → is '0', skip.
- `i=3`, `d='1'` → same as `s[0]`, skip.
- `i=4`, `d='0'` → is '0', skip.
- `i=5`, `d='5'` → not '0', not `s[0]` → replace all `5`'s with `0` → `"1101007"` → 1101007

**Result:** `9909057 - 1101007 = 8808050`

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(d)** | O(d) |

Where `d` is the number of digits (at most 9 for the given constraints).

---

## Follow-Up Questions

**Q1: Why check `d != s[0]` in the minimize step?**
If the non-leading digit equals the leading digit, replacing it with 0 would also change the leading digit to 0, creating an invalid number with a leading zero.

**Q2: What if `num` is already all 9's?**
Then `high = num`. The minimize step still replaces `9` → `1` giving `111...1`, so the difference is `999...9 - 111...1`.

**Q3: Could you do better than greedy?**
No — each replacement affects all occurrences of a digit uniformly. The greedy choice (9 for max, 1/0 for min) is provably optimal.

---

## Key Takeaway

> **Greedy digit manipulation:** to maximize a number, promote the first non-max digit; to minimize, demote the first non-min digit while respecting the leading-zero constraint.
