# 1624. Largest Substring Between Two Equal Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-substring-between-two-equal-characters](https://leetcode.com/problems/largest-substring-between-two-equal-characters)
**Companies:** Microsoft

---

## 1. Problem Description

Return the length of the longest substring between two equal characters (exclusive). Return -1 if no such substring exists.

---

## 2. Examples

**Example 1:**
```
Input: s = "aa"
Output: 0
Explanation: The two 'a' characters are adjacent, so the substring between them is empty with length 0.
```

**Example 2:**
```
Input: s = "abca"
Output: 2
Explanation: The 'a' at index 0 and index 3 enclose the substring "bc" of length 2, which is the longest.
```

**Example 3:**
```
Input: s = "cbzxy"
Output: -1
Explanation: No character appears twice, so return -1.
```

---

## 3. Approach: First Occurrence Map — O(n) ✅

```
FUNCTION maxLengthBetweenEqualCharacters(s):
    first ← {}
    result ← -1
    FOR i ← 0 TO LENGTH(s) - 1:
        c ← s[i]
        IF c IN first:
            result ← MAX(result, i - first[c] - 1)
        ELSE:
            first[c] ← i
    RETURN result
```

---

## 4. Walkthrough

Consider the string `"abca"`:
| Index | Char | first map after step | result |
|-------|------|----------------------|--------|
| 0 | a | {a:0} | -1 |
| 1 | b | {a:0, b:1} | -1 |
| 2 | c | {a:0, b:1, c:2} | -1 |
| 3 | a | {a:0, b:1, c:2} | max(-1, 3-0-1)=2 |

The final `result` is 2, matching the expected output.

---

## 5. Complexity Analysis

| Time Complexity | O(n) – single pass through the string |
| Space Complexity | O(σ) – at most one entry per distinct character (σ ≤ 26 for lowercase letters) |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual substring instead of its length?
- What if the string contains Unicode characters with a large alphabet size?
- Can you solve the problem in O(1) additional space using two passes?

---

## Key Takeaway

> Track the first occurrence of each character. For each subsequent occurrence, the distance minus 1 is the substring length between them.
