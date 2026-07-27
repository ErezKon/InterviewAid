# 1408. String Matching in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/string-matching-in-an-array](https://leetcode.com/problems/string-matching-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION stringMatching(words):
    RETURN [w for w in words if any(w in other for other in words if other != w)]
```
