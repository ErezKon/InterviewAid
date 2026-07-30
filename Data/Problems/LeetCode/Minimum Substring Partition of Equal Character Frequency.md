# 3144. Minimum Substring Partition of Equal Character Frequency

**Difficulty:** 🟡 Medium

**Companies:** Microsoft, Mitsogo, Morgan Stanley

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n² · 26)](#4-approach-dp--on²--26)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a string `s`, partition it into the **minimum** number of substrings such that each substring has **equal frequency** of all characters present in it (e.g., `"aabb"` is valid, `"aab"` is not).

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters

---

## 2. Examples

```
Example 1:
  Input: s = "fabccddg"
  Output: 3
  Explanation: "fab" (invalid) — try "f" + "abccdd" + "g" = 3 partitions.
    Actually: "f" | "abccdd" | "g" — "f" has f:1 (ok), "abccdd" has a:1,b:1,c:2,d:2 (not equal).
    Better: "f" | "ab" | "ccdd" | "g" = 4. Need to find optimal.
```

---

## 3. Key Insight

> **DP**: `dp[i]` = minimum partitions for `s[0..i-1]`. For each position `i`, try all `j < i` where `s[j..i-1]` has equal character frequencies. A substring has equal frequencies when all non-zero counts are the same.

---

## 4. Approach: DP — O(n² · 26) ✅

```
FUNCTION minPartitions(s):
    n = len(s)
    dp = [infinity] * (n + 1)
    dp[0] = 0

    FOR i ← 1 TO n:
        freq = [0] * 26
        FOR j ← i - 1 DOWN TO 0:
            freq[s[j] - 'a'] += 1
            // Check if all non-zero frequencies are equal
            vals = SET(f for f in freq if f > 0)
            IF len(vals) == 1:
                dp[i] = MIN(dp[i], dp[j] + 1)

    RETURN dp[n]
```

---

## 5. Walkthrough

```
s = "abab"

i=1: j=0: "a" → {a:1} equal ✅ dp[1]=1
i=2: j=1: "b" → equal ✅ dp[2]=2; j=0: "ab" → {a:1,b:1} equal ✅ dp[2]=1
i=3: j=2: "a" → equal ✅ dp[3]=2; j=1: "ba" → equal ✅ dp[3]=2; j=0: "aba" → {a:2,b:1} ✗
i=4: j=3: "b" → dp[4]=3; j=2: "ab" → dp[4]=2; j=0: "abab" → {a:2,b:2} ✅ dp[4]=1

Answer = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · 26) — check each substring's frequency |
| **Space** | O(n) — DP array |

---

## 7. Key Takeaway

> **Substring partition DP** — enumerate all valid partition points using a frequency check. A substring is "balanced" when all present characters have the same count.
