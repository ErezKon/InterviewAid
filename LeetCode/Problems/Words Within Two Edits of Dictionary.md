# 2452. Words Within Two Edits of Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/words-within-two-edits-of-dictionary](https://leetcode.com/problems/words-within-two-edits-of-dictionary)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION twoEditWords(queries, dictionary):
    result = []
    FOR q IN queries:
        FOR d IN dictionary:
            IF SUM(a != b for a, b in zip(q, d)) <= 2:
                result.ADD(q); BREAK
    RETURN result
```
