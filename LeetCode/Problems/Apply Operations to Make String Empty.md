# 3039. Apply Operations to Make String Empty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-string-empty](https://leetcode.com/problems/apply-operations-to-make-string-empty)
**Companies:** Virtusa

---

## 1. Problem Description

Given a string `s`, repeatedly remove one occurrence of every character that appears in `s` (in alphabetical order). Return the string just before it becomes empty — i.e., the last non-empty state.

---

## 2. Key Insight

> Characters with the maximum frequency survive the longest. The last non-empty string consists of the **last occurrence** of each character that has the maximum frequency, in their original order.

---

## 3. Approach: Frequency + Last Occurrence — O(n) ✅

```
FUNCTION lastNonEmptyString(s):
    freq = frequency count of each character
    maxFreq = MAX(freq.values())
    lastIdx = {c: i for i, c in enumerate(s)}  // last occurrence index
    
    // collect chars with max frequency, ordered by last occurrence
    candidates = [c for c in freq if freq[c] == maxFreq]
    candidates.SORT(by lastIdx[c])
    RETURN "".JOIN(candidates)
```

| Time | Space |
|------|-------|
| O(n) | O(26) = O(1) |

---

## Key Takeaway

> In repeated removal problems, characters with the highest frequency persist longest. Track last occurrence to reconstruct the final string order.
