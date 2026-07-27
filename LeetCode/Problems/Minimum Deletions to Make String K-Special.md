# 3085. Minimum Deletions to Make String K-Special

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, De Shaw, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Enumerate Target Minimum — O(n)](#approach-enumerate-target-minimum--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A string is **k-special** if the difference between any two character frequencies is at most `k`. Given a string `s` and integer `k`, return the **minimum number of deletions** to make `s` k-special.

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `0 ≤ k ≤ 10⁵`
- `s` consists of lowercase English letters

---

## Examples

**Example 1:**
```
Input: s = "aabcaba", k = 0
Output: 3
Explanation: Frequencies: a=4, b=2, c=1. For k=0, all freqs must be equal.
  Delete 2 a's and 1 c → a=2, b=2. Deletions = 3.
```

**Example 2:**
```
Input: s = "dabdcbdcdcd", k = 2
Output: 2
Explanation: Frequencies: d=4, c=3, b=2, a=1. Delete 'a' (1 del) → freqs {4,3,2}. 
  Max-min=2 ≤ k=2. But also need to check: delete 'a' entirely (1 del) + nothing else. Total = 1? 
  Actually a=1: if we set min=2, delete a entirely (1) and done. Max diff = 4-2=2 ≤ k. Deletions=1.
```

---

## Key Insight

> Try each possible **minimum frequency** as the target floor. For each candidate minimum `m`, the allowed range is `[m, m+k]`. Characters with freq < `m` are deleted entirely, characters with freq > `m+k` are trimmed to `m+k`. Pick the `m` that minimizes total deletions.

Since there are at most 26 distinct frequencies, we try at most 26 candidates.

---

## Approach: Enumerate Target Minimum — O(n) ✅

```
FUNCTION minimumDeletions(s, k):
    freq ← sorted list of character frequencies (non-zero)
    minDeletions ← infinity

    FOR each f IN freq:   // try f as the minimum frequency
        deletions ← 0
        FOR each g IN freq:
            IF g < f:
                deletions ← deletions + g          // delete entire character
            ELSE IF g > f + k:
                deletions ← deletions + (g - f - k) // trim excess
        minDeletions ← MIN(minDeletions, deletions)

    RETURN minDeletions
```

---

## Walkthrough

```
s = "aabcaba", k = 0
freq: [1, 2, 4] (c=1, b=2, a=4)
```

| Target min | Range [m, m+k] | Deletions | Explanation |
|-----------|----------------|-----------|-------------|
| 1 | [1, 1] | (2-1)+(4-1) = 4 | Trim b and a |
| 2 | [2, 2] | 1+(4-2) = 3 | Delete c, trim a |
| 4 | [4, 4] | 1+2 = 3 | Delete c and b |

**Result:** min(4, 3, 3) = **3** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + 26²) — count frequencies O(n), try 26 minimums × 26 chars |
| **Space** | O(1) — frequency array of size 26 |

---

## Follow-Up Questions

1. **Why enumerate on existing frequencies?** The optimal minimum is always one of the existing frequencies — any value between them wouldn't help.
2. **What if k is very large?** If `k ≥ max_freq - min_freq`, answer is 0 (already k-special).
3. **Can we use binary search?** The cost function isn't monotonic in a single variable, so enumeration is more straightforward.

---

## Key Takeaway

> For "make all frequencies within range k" problems, **enumerate each frequency as the target floor** and compute the trimming cost — with at most 26 characters, this is effectively O(1).
