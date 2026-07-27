# 1839. Longest Substring Of All Vowels in Order

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-substring-of-all-vowels-in-order](https://leetcode.com/problems/longest-substring-of-all-vowels-in-order)
**Companies:** Microsoft, Oracle, Paypal, Salesforce, Thomson Reuters

---

## 1. Problem Description

Find the longest "beautiful" substring: contains all 5 vowels (a, e, i, o, u) in non-decreasing order.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION longestBeautifulSubstring(word):
    maxLen = 0; currLen = 1; distinct = 1

    FOR i ← 1 TO len(word) - 1:
        IF word[i] >= word[i-1]:
            currLen += 1
            IF word[i] > word[i-1]: distinct += 1
        ELSE:
            currLen = 1; distinct = 1
        IF distinct == 5: maxLen = MAX(maxLen, currLen)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track current run length and distinct vowel count. Valid when distinct == 5. Reset both on any decrease in character order.
