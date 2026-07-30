# 2937. Make Three Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-three-strings-equal](https://leetcode.com/problems/make-three-strings-equal)
**Companies:** Amazon

---

## 1. Problem Description

Remove suffixes from three strings to make them all equal. Minimize total characters removed. Return -1 if impossible.

---

## 2. Approach: Common Prefix — O(n) ✅

```text
FUNCTION findMinimumOperations(s1, s2, s3):
    i ← 0
    WHILE i < MIN(LEN(s1), LEN(s2), LEN(s3)):
        IF s1[i] == s2[i] == s3[i]:
            i ← i + 1
        ELSE:
            BREAK
    IF i == 0:
        RETURN -1
    RETURN (LEN(s1) - i) + (LEN(s2) - i) + (LEN(s3) - i)
```

---

## 3. Examples

**Example 1:**
```
s1 = "abcde", s2 = "abfgh", s3 = "abxyz"
```
- Longest common prefix is "ab" (length 2). Characters removed: (5-2)+(5-2)+(5-2)=9. **Output:** 9.

**Example 2:**
```
s1 = "abc", s2 = "def", s3 = "ghi"
```
- No common prefix, impossible to make equal. **Output:** -1.

---

## 4. Walkthrough

| Step | `i` (prefix length) | Condition | Action |
|------|--------------------|-----------|--------|
| 1 | 0 | `a == a == a` | `i` → 1 |
| 2 | 1 | `b == b == b` | `i` → 2 |
| 3 | 2 | `c != f` (mismatch) | BREAK |
| End | `i` = 2 | Compute removals → (3-2)+(5-2)+(5-2)=9 |

---

## 5. Complexity Analysis

- **Time:** Linear scan of the shortest string → O(n) where n = min(len(s1), len(s2), len(s3)).
- **Space:** Only constant extra variables → O(1).

---

## 6. Follow-Up Questions

- How would the solution change if you could delete characters from anywhere, not just suffixes?
- Can you extend the algorithm to handle more than three strings efficiently?

---

## 7. Key Takeaway

> The optimal result is the longest common prefix of all strings; total deletions equal the sum of suffix lengths beyond that prefix.
