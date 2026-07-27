# 2914. Minimum Number of Changes to Make Binary String Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION minChanges(s):
    changes = 0
    FOR i ← 0 TO len(s) - 1 STEP 2:
        IF s[i] != s[i+1]: changes += 1
    RETURN changes
```

Beautiful = partitioned into even-length blocks of same char. Check pairs.
