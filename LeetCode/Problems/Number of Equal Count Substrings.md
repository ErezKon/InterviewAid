# 2067. Number of Equal Count Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-equal-count-substrings](https://leetcode.com/problems/number-of-equal-count-substrings)
**Companies:** Cisco

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window per Distinct Count — O(26n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count substrings where every character that appears has the same frequency `count`.

---

## 2. Key Insight

> For each possible number of distinct characters `d` (1..26), use a sliding window of size `d × count`. Check if exactly `d` characters appear each with frequency `count`.

---

## 3. Approach: Sliding Window per Distinct Count — O(26n) ✅

```
FUNCTION equalCountSubstrings(s, count):
    result = 0
    FOR d ← 1 TO 26:
        windowLen = d * count
        IF windowLen > len(s): BREAK
        freq = [0] * 26
        good = 0    // chars with freq == count
        FOR i ← 0 TO len(s) - 1:
            // Add s[i]
            freq[s[i]]++
            IF freq[s[i]] == count: good++
            ELIF freq[s[i]] == count + 1: good--
            // Remove s[i - windowLen]
            IF i >= windowLen:
                freq[s[i-windowLen]]--
                IF freq[s[i-windowLen]] == count: good++
                ELIF freq[s[i-windowLen]] == count - 1: good--
            IF good == d: result++
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(26 · n) |
| **Space** | O(26) |

---

## 5. Key Takeaway

> **Fixed window per distinct count.** Enumerate possible distinct character counts. Window size = `d × count`. Track "good" characters at exactly the target frequency.
