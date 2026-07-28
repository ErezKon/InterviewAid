# 1839. Longest Substring Of All Vowels in Order

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-substring-of-all-vowels-in-order](https://leetcode.com/problems/longest-substring-of-all-vowels-in-order)
**Companies:** Microsoft, Oracle, Paypal, Salesforce, Thomson Reuters

---

## 1. Problem Description

Find the longest "beautiful" substring: contains all 5 vowels (a, e, i, o, u) in non-decreasing order.

---

## 2. Approach: Linear Scan — O(n) ✅

```text
FUNCTION longestBeautifulSubstring(word):
    // maxLen stores longest beautiful substring length found
    SET maxLen ← 0
    // currLen tracks length of current non‑decreasing vowel run
    SET currLen ← 1
    // distinct counts how many different vowels appear in current run
    SET distinct ← 1

    FOR i ← 1 TO LEN(word) - 1:
        IF word[i] >= word[i-1]:
            SET currLen ← currLen + 1
            IF word[i] > word[i-1]:
                SET distinct ← distinct + 1
        ELSE:
            // reset when order breaks
            SET currLen ← 1
            SET distinct ← 1
        IF distinct == 5:
            SET maxLen ← MAX(maxLen, currLen)
    RETURN maxLen
```

---

## 3. Examples

**Example 1:**
```
word = "aeiouae"
output = 5
```
*Explanation:* The substring "aeiou" contains all five vowels in order, length 5. The trailing "ae" does not form a longer beautiful substring.

**Example 2:**
```
word = "aeeeiiiioooouuuuaeiou"
output = 13
```
*Explanation:* The longest beautiful substring is "aeiiiioooouuuu" (13 characters) where vowels appear in non‑decreasing order and all five distinct vowels are present.

---

## 4. Walkthrough

Consider the first example "aeiouae":
| Index | Char | currLen | distinct | maxLen |
|------|------|---------|----------|--------|
| 0 | a | 1 | 1 | 0 |
| 1 | e (>= a) | 2 | 2 | 0 |
| 2 | i (>= e) | 3 | 3 | 0 |
| 3 | o (>= i) | 4 | 4 | 0 |
| 4 | u (>= o) | 5 | 5 → update maxLen=5 |
| 5 | a (< u) | reset to 1 | reset to 1 | 5 |
| 6 | e (>= a) | 2 | 2 | 5 |
Result: maxLen = 5.

---

## 5. Complexity Analysis

- Time: O(n) – single pass through the string.
- Space: O(1) – only a few integer variables.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual longest beautiful substring, not just its length?
- Can the solution be extended to handle any custom ordered set of characters (e.g., "abc" order) instead of vowels?
- What changes are needed if the substring must contain each vowel at least twice?

---

## 7. Key Takeaway

> Track the length of the current non‑decreasing vowel run and the number of distinct vowels seen; update the answer when all five vowels appear.
