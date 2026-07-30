# 3713. Longest Balanced Substring I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-i](https://leetcode.com/problems/longest-balanced-substring-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Find the longest substring where each distinct character appears the same number of times.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"ababa"` | `4` | Substring `"abab"` has two `a` and two `b`.
| `"aaabbbccc"` | `9` | The whole string is balanced with three of each character.

---

## 3. Approach

**Sliding Window / Prefix State**

```text
FUNCTION longestBalanced(s):
    SET n ← LENGTH(s)
    SET maxLen ← 0
    FOR distinctCount ← 1 TO 26:
        SET freq[26] ← ARRAY OF 0
        SET left ← 0, right ← 0, unique ← 0, equalFreq ← 0
        WHILE right < n:
            SET idx ← ORD(s[right]) - ORD('a')
            INCREMENT freq[idx]
            IF freq[idx] = 1:
                INCREMENT unique
            IF freq[idx] = targetCount:
                INCREMENT equalFreq
            // shrink window if any freq exceeds targetCount
            WHILE unique > distinctCount OR any freq > targetCount:
                SET idxL ← ORD(s[left]) - ORD('a')
                IF freq[idxL] = targetCount:
                    DECREMENT equalFreq
                DECREMENT freq[idxL]
                IF freq[idxL] = 0:
                    DECREMENT unique
                INCREMENT left
            IF unique = distinctCount AND equalFreq = distinctCount:
                SET maxLen ← MAX(maxLen, right - left + 1)
            INCREMENT right
    RETURN maxLen
```

---

## 4. Walkthrough

Take `s = "ababa"`:

| left | right | window | freq(a) | freq(b) | balanced? |
|------|-------|--------|---------|---------|-----------|
|0|0|`a`|1|0|no|
|0|1|`ab`|1|1|yes → len=2|
|0|2|`aba`|2|1|no|
|1|3|`bab`|1|2|no|
|0|4|`ababa`|3|2|no|
|1|4|`baba`|2|2|yes → len=4|

The algorithm records the maximum length 4.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(26·n) = O(n) | O(26) = O(1) |

---

## 6. Follow-Up Questions

1. How would you handle Unicode characters beyond the English alphabet?
2. Can the solution be extended to require each character to appear at least *k* times?
3. What changes are needed if the string length is up to 10⁶?

---

## 7. Key Takeaway

> Either enumerate the target number of distinct characters with a sliding window, or use normalized prefix state hashing. Both yield O(n) overall.
